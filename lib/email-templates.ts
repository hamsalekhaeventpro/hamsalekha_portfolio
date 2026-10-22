import type { EnquiryFormValues } from "@/lib/form-schema";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cleanPhoneForWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  // If Indian number without country code (10 digits), prepend 91
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export interface EmailPayload {
  subject: string;
  text: string;
  html: string;
}

/**
 * Generate business notification email sent to ENQUIRY_TO_EMAIL
 */
export function generateBusinessNotificationEmail(
  data: EnquiryFormValues,
  referenceId: string
): EmailPayload {
  const safeName = escapeHtml(data.name);
  const safePhone = escapeHtml(data.phone);
  const safeEmail = data.email?.trim() ? escapeHtml(data.email.trim()) : "";
  const safeClientType = escapeHtml(data.clientType);
  const safeEventType = escapeHtml(data.eventType);
  const safeEventDate = escapeHtml(data.eventDate);
  const safeVenue = escapeHtml(data.venue);
  const safeGuestCount = escapeHtml(data.guestCount);
  const safeServices = data.services.map(escapeHtml).join(", ");
  const safeMessage = data.message?.trim() ? escapeHtml(data.message.trim()).replace(/\n/g, "<br />") : "";

  const waNumber = cleanPhoneForWhatsApp(data.phone);
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${data.name}, thank you for your enquiry with Hamsalekha Event Production regarding your ${data.eventType}.`)}`;

  const subject = `New Event Enquiry: ${data.name} — ${data.eventType} (${data.eventDate})`;

  const text = `
===============================================================
HAMSALEKHA EVENT PRODUCTION — NEW WEBSITE ENQUIRY
Reference ID: ${referenceId}
===============================================================

CLIENT CONTACT:
- Name:         ${data.name}
- Phone:        ${data.phone}
- Email:        ${data.email?.trim() || "Not provided"}
- Client Role:  ${data.clientType}

EVENT DETAILS:
- Event Type:   ${data.eventType}
- Event Date:   ${data.eventDate}
- Venue & City: ${data.venue}
- Guest Count:  ${data.guestCount}
- Services:     ${data.services.join(", ")}

CLIENT MESSAGE:
${data.message?.trim() || "No additional message provided."}

DIRECT ACTIONS:
- Call Client: tel:${data.phone.replace(/\s+/g, "")}
- WhatsApp:    ${waUrl}
${data.email?.trim() ? `- Email:       mailto:${data.email.trim()}` : ""}

===============================================================
Sent from Hamsalekha Event Production Website Enquiry Form
  `.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B1F3A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0B1F3A; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; background-color: #FFFFFF; border-radius: 4px; overflow: hidden; border: 1px solid #D4AF37;">

          <!-- Header Banner -->
          <tr>
            <td style="background-color: #071527; padding: 28px 32px; border-bottom: 2px solid #C09B30;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 700; color: #C09B30; display: block; margin-bottom: 6px;">
                      WEBSITE ENQUIRY
                    </span>
                    <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: 700; color: #FBF9F5; letter-spacing: -0.02em;">
                      New Event Brief Received
                    </h1>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <span style="font-size: 11px; color: #94A3B8; font-family: monospace;">
                      #${escapeHtml(referenceId.slice(0, 8))}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Actions Bar -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 14px 32px; border-bottom: 1px solid #E2E8F0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size: 12px; color: #64748B; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">
                    Quick Actions:
                  </td>
                  <td align="right">
                    <a href="${waUrl}" style="display: inline-block; background-color: #15803D; color: #FFFFFF; text-decoration: none; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.08em; margin-right: 6px;">
                      WhatsApp Client
                    </a>
                    <a href="tel:${escapeHtml(data.phone.replace(/\s+/g, ""))}" style="display: inline-block; background-color: #0B1F3A; color: #FFFFFF; text-decoration: none; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.08em;">
                      Call
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px;">

              <!-- Client Overview -->
              <h2 style="margin: 0 0 16px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.18em; color: #C09B30; font-weight: 700;">
                Client Information
              </h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-size: 13px; width: 140px;">Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #0B1F3A; font-size: 14px; font-weight: 700;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-size: 13px;">Phone</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #0B1F3A; font-size: 14px; font-weight: 600;">
                    <a href="tel:${escapeHtml(data.phone.replace(/\s+/g, ""))}" style="color: #0B1F3A; text-decoration: underline;">${safePhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-size: 13px;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #0B1F3A; font-size: 14px;">
                    ${safeEmail ? `<a href="mailto:${safeEmail}" style="color: #0B1F3A; text-decoration: underline;">${safeEmail}</a>` : `<span style="color: #94A3B8; font-style: italic;">Not provided</span>`}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748B; font-size: 13px;">Client Role</td>
                  <td style="padding: 10px 0; color: #0B1F3A; font-size: 14px; font-weight: 600;">${safeClientType}</td>
                </tr>
              </table>

              <!-- Event Overview -->
              <h2 style="margin: 0 0 16px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.18em; color: #C09B30; font-weight: 700;">
                Event Details
              </h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-size: 13px; width: 140px;">Event Type</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #0B1F3A; font-size: 14px; font-weight: 700;">${safeEventType}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-size: 13px;">Date</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #0B1F3A; font-size: 14px; font-weight: 700;">${safeEventDate}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-size: 13px;">Venue & City</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #0B1F3A; font-size: 14px; font-weight: 600;">${safeVenue}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-size: 13px;">Guest Count</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #0B1F3A; font-size: 14px;">${safeGuestCount}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748B; font-size: 13px;">Services Needed</td>
                  <td style="padding: 10px 0; color: #0B1F3A; font-size: 14px; font-weight: 600;">${safeServices}</td>
                </tr>
              </table>

              <!-- Message / Brief -->
              <h2 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.18em; color: #C09B30; font-weight: 700;">
                Message / Brief Notes
              </h2>
              <div style="background-color: #F8FAFC; border-left: 3px solid #C09B30; padding: 16px; border-radius: 2px; font-size: 14px; line-height: 1.6; color: #334155;">
                ${safeMessage || "<span style='color: #94A3B8; font-style: italic;'>No additional message provided.</span>"}
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 20px 32px; border-top: 1px solid #E2E8F0; font-size: 11px; color: #94A3B8; text-align: center;">
              Submitted on ${escapeHtml(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))} IST &middot; Hamsalekha Event Production Pvt. Ltd.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return { subject, text, html };
}

/**
 * Generate customer confirmation email sent to data.email when provided
 */
export function generateCustomerConfirmationEmail(
  data: EnquiryFormValues,
  referenceId: string
): EmailPayload {
  const safeName = escapeHtml(data.name);
  const safeEventType = escapeHtml(data.eventType);
  const safeEventDate = escapeHtml(data.eventDate);
  const safeVenue = escapeHtml(data.venue);
  const safeServices = data.services.map(escapeHtml).join(", ");
  const safePhone = escapeHtml(data.phone);

  const subject = `We've received your enquiry — Hamsalekha Event Production`;

  const text = `
Dear ${data.name},

Thank you for reaching out to Hamsalekha Event Production.

We have received your event brief and our production team is reviewing your requirements for the upcoming ${data.eventType}.

YOUR EVENT BRIEF:
- Event:    ${data.eventType}
- Date:     ${data.eventDate}
- Venue:    ${data.venue}
- Services: ${data.services.join(", ")}

WHAT HAPPENS NEXT:
Our team will review date availability and technical staging specifications, and will contact you directly via phone or WhatsApp at ${data.phone}.

For immediate queries or urgent scheduling, you can reach us directly:
- Call: +91 99725 44316
- WhatsApp: https://wa.me/919972544316
- Email: info@hamsalekha.com

Warm regards,
The Production Team
Hamsalekha Event Production Pvt. Ltd.
Bengaluru, India · Since 2006
Reference: ${referenceId}
  `.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B1F3A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0B1F3A; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 4px; overflow: hidden; border: 1px solid #D4AF37;">

          <!-- Header -->
          <tr>
            <td style="background-color: #071527; padding: 32px; border-bottom: 2px solid #C09B30; text-align: center;">
              <span style="font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; font-weight: 700; color: #C09B30; display: block; margin-bottom: 8px;">
                HAMSALEKHA EVENT PRODUCTION
              </span>
              <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: 700; color: #FBF9F5; letter-spacing: -0.01em;">
                We have received your brief.
              </h1>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 36px 32px 24px 32px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #0B1F3A;">
                Dear <strong>${safeName}</strong>,
              </p>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.65; color: #475569;">
                Thank you for contacting us. We have successfully received your enquiry for your upcoming <strong>${safeEventType}</strong>. Our production team is reviewing your schedule, venue parameters, and staging requirements.
              </p>

              <!-- Brief Summary Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 4px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px;">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #C09B30; font-weight: 700; display: block; margin-bottom: 12px;">
                      Your Submitted Brief
                    </span>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #64748B; width: 110px;">Event:</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #0B1F3A; font-weight: 600;">${safeEventType}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #64748B;">Date:</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #0B1F3A; font-weight: 600;">${safeEventDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #64748B;">Venue:</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #0B1F3A; font-weight: 600;">${safeVenue}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #64748B;">Services:</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #0B1F3A; font-weight: 600;">${safeServices}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.65; color: #475569;">
                We will contact you directly via phone or WhatsApp at <strong>${safePhone}</strong> to discuss concepts, technical execution, and next steps.
              </p>

              <!-- Urgent Contact Banner -->
              <div style="background-color: #FEF9C3; border-left: 3px solid #C09B30; padding: 14px 16px; border-radius: 2px; margin-bottom: 8px;">
                <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #713F12;">
                  <strong>Need immediate coordination?</strong> Call or WhatsApp our warehouse desk directly on <a href="tel:+919972544316" style="color: #0B1F3A; font-weight: 700; text-decoration: underline;">+91 99725 44316</a>.
                </p>
              </div>

            </td>
          </tr>

          <!-- Signoff & Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 24px 32px; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 600; color: #0B1F3A;">
                Hamsalekha Event Production Pvt. Ltd.
              </p>
              <p style="margin: 0; font-size: 11px; color: #94A3B8;">
                Kothanur, Bengaluru, Karnataka, India &middot; Guiding stages since 2006
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return { subject, text, html };
}
