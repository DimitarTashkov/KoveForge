const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const siteHeader = document.querySelector(".site-header");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");

    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (siteHeader) {
  const scrollThreshold = 120;
  const scrollDeltaThreshold = 8;
  let lastScrollY = window.scrollY;
  let isTicking = false;

  const isNavigationOpen = () => navLinks?.classList.contains("is-open") ?? false;

  const updateHeaderVisibility = () => {
    const currentScrollY = Math.max(window.scrollY, 0);
    const scrollDelta = currentScrollY - lastScrollY;

    if (currentScrollY <= scrollThreshold || isNavigationOpen()) {
      siteHeader.classList.remove("is-hidden");
      siteHeader.classList.toggle("is-scrolled", currentScrollY > 10);
      lastScrollY = currentScrollY;
      isTicking = false;
      return;
    }

    if (Math.abs(scrollDelta) < scrollDeltaThreshold) {
      isTicking = false;
      return;
    }

    siteHeader.classList.toggle("is-hidden", scrollDelta > 0);
    siteHeader.classList.add("is-scrolled");
    lastScrollY = currentScrollY;
    isTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!isTicking) {
        window.requestAnimationFrame(updateHeaderVisibility);
        isTicking = true;
      }
    },
    { passive: true },
  );

  siteHeader.addEventListener("focusin", () => {
    siteHeader.classList.remove("is-hidden");
  });
}
