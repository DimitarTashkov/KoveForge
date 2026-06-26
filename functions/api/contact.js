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

export async function onRequestPost(context) {
  try {
    if (!context.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");
      return jsonResponse({ error: "Email service is not configured." }, 500);
    }

    const formData = await context.request.formData();
    const name = fallback(formData.get("Име"), "Не е посочено");
    const email = fallback(formData.get("Имейл"), "Не е посочено");
    const projectType = fallback(formData.get("Тип проект"), "Не е посочен");
    const budget = fallback(formData.get("Бюджет"), "Не е уточнен");
    const message = fallback(formData.get("Съобщение"), "Няма съобщение");
    const messageHtml = escapeHtml(message).replace(/\r?\n/g, "<br>");

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
        subject: `Ново запитване от сайта: ${projectType}`,
        html: `
          <main style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.5;">
            <h1 style="margin: 0 0 24px;">Ново запитване от сайта</h1>
            <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
              <tr><td style="padding: 8px 16px 8px 0; font-weight: 700;">Име</td><td>${escapeHtml(name)}</td></tr>
              <tr><td style="padding: 8px 16px 8px 0; font-weight: 700;">Имейл</td><td>${escapeHtml(email)}</td></tr>
              <tr><td style="padding: 8px 16px 8px 0; font-weight: 700;">Тип проект</td><td>${escapeHtml(projectType)}</td></tr>
              <tr><td style="padding: 8px 16px 8px 0; font-weight: 700;">Бюджет</td><td>${escapeHtml(budget)}</td></tr>
            </table>
            <h2 style="margin: 28px 0 8px;">Съобщение</h2>
            <p style="margin: 0;">${messageHtml}</p>
          </main>
        `,
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
