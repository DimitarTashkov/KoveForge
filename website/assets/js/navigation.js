const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const siteHeader = document.querySelector(".site-header");
const mainContent = document.querySelector("main");

if (mainContent) {
  mainContent.id ||= "main-content";
  mainContent.tabIndex = -1;

  if (!document.querySelector(".skip-link")) {
    const skipLink = document.createElement("a");
    skipLink.className = "skip-link";
    skipLink.href = `#${mainContent.id}`;
    skipLink.textContent = "Към основното съдържание";
    document.body.prepend(skipLink);
  }
}

if (navToggle && navLinks) {
  const desktopNavigation = window.matchMedia("(min-width: 64rem)");
  navLinks.id ||= "site-navigation";
  navToggle.setAttribute("aria-controls", navLinks.id);

  const setNavigationState = (isOpen, { returnFocus = false } = {}) => {
    navLinks.classList.toggle("is-open", isOpen);
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Затвори меню" : "Отвори меню");

    const isMobile = !desktopNavigation.matches;
    navLinks.inert = isMobile && !isOpen;
    navLinks.toggleAttribute("aria-hidden", isMobile && !isOpen);

    if (returnFocus) {
      navToggle.focus();
    }
  };

  const syncNavigationMode = () => {
    if (desktopNavigation.matches) {
      navLinks.inert = false;
      navLinks.removeAttribute("aria-hidden");
      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Отвори меню");
      return;
    }

    setNavigationState(navLinks.classList.contains("is-open"));
  };

  navToggle.addEventListener("click", () => {
    setNavigationState(!navLinks.classList.contains("is-open"));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setNavigationState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
      setNavigationState(false, { returnFocus: true });
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (
      !desktopNavigation.matches &&
      navLinks.classList.contains("is-open") &&
      event.target instanceof Node &&
      !navLinks.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      setNavigationState(false);
    }
  });

  desktopNavigation.addEventListener("change", syncNavigationMode);
  syncNavigationMode();
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
