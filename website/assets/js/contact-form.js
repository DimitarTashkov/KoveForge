const contactForm = document.querySelector("[data-contact-form]");
const contactSuccess = document.querySelector("#contact-success");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = data.get("Име") || "";
    const email = data.get("Имейл") || "";
    const businessType = data.get("Тип бизнес") || "";
    const projectType = data.get("Тип проект") || "";
    const budget = data.get("Бюджет") || "";
    const message = data.get("Съобщение") || "";

    const subject = `Запитване от сайта - ${projectType || "нов проект"}`;
    const body = [
      `Име: ${name}`,
      `Имейл: ${email}`,
      `Тип бизнес: ${businessType}`,
      `Тип проект: ${projectType}`,
      `Бюджет: ${budget || "Не е уточнен"}`,
      "",
      "Съобщение:",
      message,
    ].join("\n");

    if (contactSuccess) {
      contactForm.hidden = true;
      contactSuccess.style.display = "";
    }

    window.location.href = `mailto:studio@koveforge.tech?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
