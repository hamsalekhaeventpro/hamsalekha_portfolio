import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/form-schema";

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

    // ── Send via Resend ──────────────────────────────────────────
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.ENQUIRY_TO_EMAIL || "hello@hamsalekha.com";
    const fromEmail = process.env.ENQUIRY_FROM_EMAIL || "enquiries@hamsalekha.com";

    if (!apiKey) {
      console.warn("RESEND_API_KEY not set — logging enquiry to console");
      console.log("New enquiry:", JSON.stringify(data, null, 2));
      return NextResponse.json({ success: true });
    }

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

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `New Enquiry — ${data.name} · ${data.eventType} · ${data.eventDate}`,
        text: emailBody,
        reply_to: data.email || data.phone,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      return NextResponse.json({ error: "Email send failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Enquiry API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
