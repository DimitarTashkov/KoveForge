/*
 * scroll-reveal.js — generic entrance animations on scroll.
 *
 * Markup:
 *   <section data-reveal> ... </section>
 *       Fades/slides in when it is scrolled into view.
 *
 *   <div data-reveal-group> <div>..</div> <div>..</div> </div>
 *       Its direct children fade in with a gentle staggered cascade.
 *
 *   <div data-reveal style="--reveal-index:2">
 *       Optional manual stagger index (otherwise assigned automatically).
 *
 * All motion (duration, easing, offset) lives in style.css and reuses the
 * existing --dur- and --ease- tokens; prefers-reduced-motion is handled there
 * too. This script only toggles the .is-revealed class — it introduces no
 * timing or easing of its own.
 */
(function () {
  "use strict";

  // Auto-number the direct children of each group so lists cascade without
  // hand-written indices. A manually set --reveal-index on a child is kept.
  document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
    for (var i = 0; i < group.children.length; i++) {
      var child = group.children[i];
      if (!child.style.getPropertyValue("--reveal-index")) {
        child.style.setProperty("--reveal-index", i);
      }
    }
  });

  var targets = document.querySelectorAll("[data-reveal], [data-reveal-group]");
  if (!targets.length) return;

  // Older browsers without IntersectionObserver: reveal everything immediately.
  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-revealed"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target); // reveal once, then stop watching
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(function (el) { observer.observe(el); });
})();
