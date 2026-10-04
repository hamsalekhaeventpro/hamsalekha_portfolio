import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/form-schema";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate server-side with Zod
    const result = enquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", issues: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // ── Spam Protection: Honeypot ─────────────────────────────
    if (data.honeypot) {
      console.warn("Honeypot filled, rejecting silently");
      return NextResponse.json({ success: true });
    }

    // ── Spam Protection: Turnstile ────────────────────────────
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    const isProd = process.env.NODE_ENV === "production";

    if (!turnstileSecret) {
      if (isProd) {
        console.error("Missing TURNSTILE_SECRET_KEY in production");
        return NextResponse.json({ error: "Configuration error" }, { status: 500 });
      } else {
        console.warn("Bypassing Turnstile in development (TURNSTILE_SECRET_KEY missing)");
      }
    } else {
      if (!data.turnstileToken) {
        return NextResponse.json({ error: "Missing CAPTCHA token" }, { status: 400 });
      }
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(data.turnstileToken)}`,
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        console.warn("Turnstile verification failed:", verifyData);
        return NextResponse.json({ error: "Spam verification failed" }, { status: 400 });
      }
    }

    // ── Production Configuration Check ────────────────────────
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.ENQUIRY_TO_EMAIL;
    const fromEmail = process.env.ENQUIRY_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error("Missing required email configuration (RESEND_API_KEY, ENQUIRY_TO_EMAIL, or ENQUIRY_FROM_EMAIL)");
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    // ── Send via Resend SDK ───────────────────────────────────
    const resend = new Resend(apiKey);

    const emailBody = `
New enquiry from the Hamsalekha website

Name:         ${data.name}
Phone:        ${data.phone}
Email:        ${data.email || "—"}
I am a:       ${data.clientType}
Event type:   ${data.eventType}
Event date:   ${data.eventDate}
Venue:        ${data.venue}
Guest count:  ${data.guestCount}
Services:     ${data.services.join(", ")}

Message:
${data.message || "—"}
    `.trim();

    const { error: sendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Hamsalekha Event Enquiry — ${data.eventType}`,
      text: emailBody,
      replyTo: data.email ? data.email : undefined,
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return NextResponse.json({ error: "Email send failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Enquiry API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
