document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll("[data-contact-method]"));
  const panels = Array.from(document.querySelectorAll("[data-contact-panel]"));
  const layout = document.querySelector("[data-contact-layout]");

  if (!tabs.length || !panels.length || !layout) return;

  const activateMethod = (method, { focusTab = false } = {}) => {
    const activeTab = tabs.find((tab) => tab.dataset.contactMethod === method);
    const activePanel = panels.find((panel) => panel.dataset.contactPanel === method);

    if (!activeTab || !activePanel) return;

    tabs.forEach((tab) => {
      const isActive = tab === activeTab;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel !== activePanel;
    });

    layout.classList.toggle("is-consultation-mode", method === "consultation");

    if (focusTab) activeTab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateMethod(tab.dataset.contactMethod));

    tab.addEventListener("keydown", (event) => {
      let nextIndex;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      activateMethod(tabs[nextIndex].dataset.contactMethod, { focusTab: true });
    });
  });

  const activateFromHash = () => {
    if (window.location.hash === "#contact-consultation-panel") {
      activateMethod("consultation");
    } else if (window.location.hash === "#contact-form" || window.location.hash === "#contact-form-panel") {
      activateMethod("form");
    }
  };

  activateFromHash();
  window.addEventListener("hashchange", activateFromHash);
});
