const fallback = (value, fallbackValue) => {
  if (typeof value !== "string") {
    return fallbackValue;
  }

  const trimmedValue = value.trim();
  return trimmedValue || fallbackValue;
};

const escapeHtml = (value) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

const jsonResponse = (body, status) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

const buildEmailHtml = ({ name, email, message }) => {
  const messageHtml = escapeHtml(message).replace(/\r?\n/g, "<br>");
  const replyToUrl = encodeURIComponent(email);

  return `
    <!doctype html>
    <html lang="bg">
      <body style="margin:0; padding:0; background-color:#f1f5f9; color:#0f172a; font-family:Arial, Helvetica, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#f1f5f9;">
          <tr><td align="center" style="padding:32px 16px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:640px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(15,23,42,.12);">
              <tr><td style="padding:28px 32px; background-color:#312e81; background-image:linear-gradient(135deg,#4f46e5,#6366f1 55%,#0ea5e9); color:#ffffff;">
                <p style="margin:0 0 10px; color:#c7d2fe; font-size:12px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase;">KoveForge · Ново запитване</p>
                <h1 style="margin:0; color:#ffffff; font-size:26px; line-height:1.25; font-weight:700;">Ново запитване за система</h1>
              </td></tr>
              <tr><td style="padding:32px;">
                <p style="margin:0 0 24px; color:#475569; font-size:16px; line-height:1.6;">Изпратено е ново запитване през контактната форма на сайта.</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; border:1px solid #e2e8f0; border-radius:12px; border-collapse:separate; overflow:hidden;">
                  <tr><td style="width:38%; padding:14px 16px; border-bottom:1px solid #e2e8f0; background-color:#f8fafc; color:#64748b; font-size:13px; font-weight:700;">Име</td><td style="padding:14px 16px; border-bottom:1px solid #e2e8f0; color:#0f172a; font-size:15px; font-weight:600;">${escapeHtml(name)}</td></tr>
                  <tr><td style="padding:14px 16px; background-color:#f8fafc; color:#64748b; font-size:13px; font-weight:700;">Имейл</td><td style="padding:14px 16px; color:#0f172a; font-size:15px; font-weight:600;"><a href="mailto:${replyToUrl}" style="color:#4f46e5; text-decoration:none;">${escapeHtml(email)}</a></td></tr>
                </table>
                <div style="margin-top:28px;"><p style="margin:0 0 10px; color:#64748b; font-size:13px; font-weight:700; letter-spacing:.5px; text-transform:uppercase;">Съобщение</p><div style="padding:20px; border-left:4px solid #6366f1; border-radius:0 10px 10px 0; background-color:#f8fafc; color:#334155; font-size:15px; line-height:1.65;">${messageHtml}</div></div>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;"><tr><td style="border-radius:8px; background-color:#4f46e5;"><a href="mailto:${replyToUrl}" style="display:inline-block; padding:13px 20px; color:#ffffff; font-size:15px; font-weight:700; text-decoration:none;">Отговори на ${escapeHtml(name)}</a></td></tr></table>
              </td></tr>
              <tr><td style="padding:20px 32px; border-top:1px solid #e2e8f0; color:#94a3b8; font-size:12px; line-height:1.5;">Това съобщение е изпратено автоматично от контактната форма на koveforge.tech.</td></tr>
            </table>
          </td></tr>
        </table>
      </body>
    </html>
  `;
};

export async function onRequestPost(context) {
  try {
    if (!context.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");
      return jsonResponse({ error: "Email service is not configured." }, 500);
    }

    const formData = await context.request.formData();
    const name = fallback(formData.get("Име"), "");
    const email = fallback(formData.get("Имейл"), "");
    const message = fallback(formData.get("Съобщение"), "Няма допълнително съобщение.");

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: "Name and a valid email are required." }, 400);
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Website Form <studio@koveforge.tech>",
        to: ["studio@koveforge.tech", "hello@koveforge.tech"],
        reply_to: email,
        subject: "Ново запитване от сайта за система",
        html: buildEmailHtml({ name, email, message }),
        text: `Ново запитване от сайта за система\n\nИме: ${name}\nИмейл: ${email}\n\nСъобщение:\n${message}`,
      }),
    });

    if (!resendResponse.ok) {
      console.error("Resend API error:", await resendResponse.text());
      return jsonResponse({ error: "Unable to send email." }, 500);
    }

    return jsonResponse({ success: true }, 200);
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return jsonResponse({ error: "Unable to send email." }, 500);
  }
}
