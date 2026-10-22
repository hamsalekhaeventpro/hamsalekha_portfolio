import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/form-schema";
import { Resend } from "resend";
import {
  generateBusinessNotificationEmail,
  generateCustomerConfirmationEmail,
} from "@/lib/email-templates";

// ── In-Memory Abuse Protection & Idempotency ─────────────────────
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const ipRateLimits = new Map<string, RateLimitRecord>();

interface IdempotencyRecord {
  messageId: string;
  createdAt: number;
}
const submissionCache = new Map<string, IdempotencyRecord>();

function pruneStores() {
  const now = Date.now();
  if (ipRateLimits.size > 200) {
    for (const [key, record] of ipRateLimits.entries()) {
      if (now > record.resetAt) ipRateLimits.delete(key);
    }
  }
  if (submissionCache.size > 200) {
    for (const [key, record] of submissionCache.entries()) {
      if (now - record.createdAt > 60_000) submissionCache.delete(key);
    }
  }
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

export async function POST(request: Request) {
  pruneStores();

  try {
    // 1. Payload size guard (max 32KB)
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 32768) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    // 2. Safe JSON parsing
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    // 3. Server-side validation via Zod
    const result = enquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", issues: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // 4. Honeypot check (silent rejection for automated bots)
    if (data.honeypot && data.honeypot.trim() !== "") {
      return NextResponse.json({ success: true, ref: "bot-filtered" });
    }

    // 5. Basic IP Rate Limiting (max 5 submissions per 10 minutes per IP)
    const clientIp = getClientIp(request);
    const now = Date.now();
    const ipRecord = ipRateLimits.get(clientIp);

    if (ipRecord) {
      if (now < ipRecord.resetAt) {
        if (ipRecord.count >= 5) {
          return NextResponse.json(
            { error: "Too many requests. Please wait a few moments or contact us via WhatsApp." },
            { status: 429 }
          );
        }
        ipRecord.count += 1;
      } else {
        ipRateLimits.set(clientIp, { count: 1, resetAt: now + 10 * 60 * 1000 });
      }
    } else {
      ipRateLimits.set(clientIp, { count: 1, resetAt: now + 10 * 60 * 1000 });
    }

    // 6. Idempotency / Retry Deduplication (within 60-second window)
    const normalizedDigits = data.phone.replace(/\D/g, "");
    const sortedServices = data.services.slice().sort().join(",");
    const idempotencyKey = `${normalizedDigits}:${data.eventDate}:${sortedServices}`;

    const cachedSubmission = submissionCache.get(idempotencyKey);
    if (cachedSubmission && now - cachedSubmission.createdAt < 60_000) {
      return NextResponse.json({
        success: true,
        messageId: cachedSubmission.messageId,
        idempotent: true,
      });
    }

    // 7. Cloudflare Turnstile Verification (if configured)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();
    if (turnstileSecret && turnstileSecret !== "dummy" && turnstileSecret.length > 5) {
      if (!data.turnstileToken) {
        return NextResponse.json({ error: "Missing verification token" }, { status: 400 });
      }

      try {
        const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(data.turnstileToken)}`,
        });
        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          return NextResponse.json({ error: "Spam verification failed" }, { status: 400 });
        }
      } catch (turnstileErr) {
        console.error(
          "[Enquiry API] Turnstile verify error:",
          turnstileErr instanceof Error ? turnstileErr.message : "Network error"
        );
        return NextResponse.json(
          { error: "Verification service temporarily unavailable" },
          { status: 503 }
        );
      }
    }

    // 8. Production Email Configuration Verification
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const toEmail = process.env.ENQUIRY_TO_EMAIL?.trim();
    const fromEmail = process.env.ENQUIRY_FROM_EMAIL?.trim();

    if (
      !apiKey ||
      apiKey.startsWith("your_") ||
      apiKey.includes("placeholder") ||
      !toEmail ||
      !fromEmail
    ) {
      console.error(
        "[Enquiry API] Missing or unconfigured email settings (RESEND_API_KEY, ENQUIRY_TO_EMAIL, or ENQUIRY_FROM_EMAIL)"
      );
      return NextResponse.json(
        { error: "Email delivery service is currently unconfigured. Please contact us via phone or WhatsApp." },
        { status: 500 }
      );
    }

    // 9. Format Sender, Recipients & References
    const formattedFrom = fromEmail.includes("<")
      ? fromEmail
      : `Hamsalekha Event Production <${fromEmail}>`;
    const toList = toEmail.split(",").map((e) => e.trim()).filter(Boolean);

    // Customer email: use only if non-empty, trimmed, and valid
    const customerEmail =
      data.email && typeof data.email === "string" && data.email.trim() !== ""
        ? data.email.trim()
        : undefined;

    const referenceId = `HL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    // 10. Send Business Notification
    const resend = new Resend(apiKey);
    const businessEmail = generateBusinessNotificationEmail(data, referenceId);

    let resendResult;
    try {
      resendResult = await resend.emails.send({
        from: formattedFrom,
        to: toList,
        subject: businessEmail.subject,
        text: businessEmail.text,
        html: businessEmail.html,
        replyTo: customerEmail ? customerEmail : undefined,
        headers: {
          "X-Entity-Ref-ID": referenceId,
        },
      });
    } catch (sendErr) {
      console.error(
        "[Enquiry API] Resend request exception:",
        sendErr instanceof Error ? sendErr.message : "Unknown error"
      );
      return NextResponse.json(
        { error: "Failed to transmit enquiry to email provider" },
        { status: 502 }
      );
    }

    if (resendResult.error || !resendResult.data?.id) {
      console.error(
        "[Enquiry API] Email rejected by provider:",
        resendResult.error?.message || "Missing message ID"
      );
      return NextResponse.json(
        { error: "Email provider rejected the message" },
        { status: 502 }
      );
    }

    const businessMessageId = resendResult.data.id;
    console.log(
      `[Enquiry API] Business notification accepted by provider: ID ${businessMessageId} (Ref: ${referenceId})`
    );

    // Cache successful submission for idempotency deduplication
    submissionCache.set(idempotencyKey, {
      messageId: businessMessageId,
      createdAt: Date.now(),
    });

    // 11. Optional Customer Confirmation Email (Non-blocking)
    let confirmationMessageId: string | null = null;
    if (customerEmail) {
      try {
        const customerEmailPayload = generateCustomerConfirmationEmail(data, referenceId);
        const confirmResult = await resend.emails.send({
          from: formattedFrom,
          to: [customerEmail],
          subject: customerEmailPayload.subject,
          text: customerEmailPayload.text,
          html: customerEmailPayload.html,
          headers: {
            "X-Entity-Ref-ID": `${referenceId}-confirm`,
          },
        });

        if (confirmResult.error || !confirmResult.data?.id) {
          console.warn(
            "[Enquiry API] Customer confirmation rejected by provider:",
            confirmResult.error?.message || "No ID returned"
          );
        } else {
          confirmationMessageId = confirmResult.data.id;
          console.log(
            `[Enquiry API] Customer confirmation accepted by provider: ID ${confirmationMessageId}`
          );
        }
      } catch (confirmErr) {
        console.warn(
          "[Enquiry API] Customer confirmation exception:",
          confirmErr instanceof Error ? confirmErr.message : "Unknown error"
        );
      }
    }

    // 12. Success response with provider message ID
    return NextResponse.json({
      success: true,
      messageId: businessMessageId,
      confirmationId: confirmationMessageId,
    });
  } catch (err) {
    console.error(
      "[Enquiry API] Unexpected handler error:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
