const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const successMessage = document.getElementById("contact-success");
  const errorMessage = contactForm.querySelector("[data-contact-error]");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!submitButton) {
      return;
    }

    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Изпращане...";
    submitButton.disabled = true;
    if (errorMessage) {
      errorMessage.hidden = true;
    }

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

      contactForm.reset();
      contactForm.hidden = true;
      if (successMessage) {
        successMessage.hidden = false;
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      if (errorMessage) {
        errorMessage.hidden = false;
      }
    } finally {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  });
}
