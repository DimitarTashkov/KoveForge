const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!submitButton) {
      return;
    }

    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Изпращане...";
    submitButton.disabled = true;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(contactForm),
      });

      if (!response.ok) {
        throw new Error(`Contact form request failed with status ${response.status}`);
      }

      alert("Успешно изпратихте запитването! Ще се свържем с вас скоро.");
      contactForm.reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);
      alert("Не успяхме да изпратим запитването. Моля, опитайте отново или ни пишете директно по имейл.");
    } finally {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  });
}
