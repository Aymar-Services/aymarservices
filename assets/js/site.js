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
