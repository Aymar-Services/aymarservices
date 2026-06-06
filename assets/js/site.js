(() => {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    const status = contactForm.querySelector("[data-form-status]");
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const defaultButtonText = submitButton ? submitButton.textContent : "Send request";

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      if (status) {
        status.hidden = true;
        status.className = "form-status";
      }

      const formData = new FormData(contactForm);
      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        service: formData.get("service"),
        budget: formData.get("budget"),
        message: formData.get("message"),
        _subject: "New contact request from Aymar website",
        _captcha: "false",
      };

      try {
        const response = await fetch("https://formsubmit.co/ajax/maryam98.riaz@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        contactForm.reset();

        if (status) {
          status.textContent = "Thank you. Your request was sent successfully.";
          status.className = "form-status form-status--success";
          status.hidden = false;
        }
      } catch {
        if (status) {
          status.textContent =
            "Sorry, something went wrong. Please email maryam98.riaz@gmail.com directly.";
          status.className = "form-status form-status--error";
          status.hidden = false;
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = defaultButtonText;
        }
      }
    });
  }

  const protectedRoot = document.querySelector("[data-copy-protect='true']");
  if (protectedRoot) {
    const allowEditable = (target) =>
      target.closest("input, textarea, select, [contenteditable='true']");

    ["copy", "cut", "dragstart", "contextmenu"].forEach((eventName) => {
      document.addEventListener(eventName, (event) => {
        if (!allowEditable(event.target)) {
          event.preventDefault();
        }
      });
    });
  }
})();
