/* ═══════════════════════════════════════════════════════
   KOVEFORGE — CONCURRENT VIEW JS
   Shared filter, sector selector, counter animation,
   stepper reveal
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── ELEMENTS ───
  const filterButtons = document.querySelectorAll('[data-cv-filter]');
  const sectorButtons = document.querySelectorAll('[data-sector]');
  const projectCards = document.querySelectorAll('#concurrent-view .cv-project-card');
  const serviceCards = document.querySelectorAll('#concurrent-view .cv-service-card');
  const statNumbers = document.querySelectorAll('.cv-stat-number');
  const stepper = document.querySelector('[data-cv-stepper]');
  const concurrentView = document.getElementById('concurrent-view');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Early exit if concurrent-view section doesn't exist on this page
  if (!concurrentView) return;

  // ─── ACTIVE FILTERS (Set for multi-select support) ───
  const activeFilters = new Set();
  let activeSector = 'all';

  // ─── SECTOR → CATEGORY MAPPING ───
  const sectorMap = {
    'клиники':    ['booking', 'business'],
    'салони':     ['booking', 'websites'],
    'ресторанти': ['booking', 'websites'],
    'хотели':     ['booking', 'business', 'ecommerce'],
    'строителни': ['websites'],
    'магазини':   ['ecommerce', 'websites'],
    'локални':    ['websites']
  };

  // ─── SHARED FILTER LOGIC ───
  function applyFilter() {
    const hasCategoryFilters = activeFilters.size > 0;
    const hasSectorFilter = activeSector !== 'all';

    // Filter project cards
    projectCards.forEach(card => {
      const cats = (card.dataset.categories || '').split(' ');
      const sectors = (card.dataset.sectors || '').split(' ');

      let shouldShow = true;
      if (hasSectorFilter) {
        shouldShow = sectors.includes(activeSector);
      } else if (hasCategoryFilters) {
        shouldShow = cats.some(c => activeFilters.has(c));
      }

      if (shouldShow) {
        card.hidden = false;
        card.classList.remove('is-hiding');
        card.classList.add('is-showing');
      } else {
        card.classList.add('is-hiding');
        card.classList.remove('is-showing');
        setTimeout(() => {
          if (card.classList.contains('is-hiding')) {
            card.hidden = true;
          }
        }, 280);
      }
    });

    // Highlight/dim service cards
    let highlightFilters = new Set(activeFilters);
    if (hasSectorFilter) {
      const mappedCats = sectorMap[activeSector] || [];
      mappedCats.forEach(c => highlightFilters.add(c));
    }
    const hasHighlights = highlightFilters.size > 0;

    serviceCards.forEach(card => {
      const cat = card.dataset.category;
      const isMatch = !hasHighlights || cat === 'all' || highlightFilters.has(cat);

      card.classList.toggle('cv-service-card--active', isMatch && hasHighlights);
      card.classList.toggle('cv-service-card--dimmed', !isMatch && hasHighlights);
    });

    // Update filter button states
    filterButtons.forEach(btn => {
      const filter = btn.dataset.cvFilter;
      const isActive = (!hasCategoryFilters && filter === 'all') || activeFilters.has(filter);
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Update counters
    updateCounters();
  }

  // ─── FILTER BUTTON CLICK ───
  filterButtons.forEach(btn => {
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');

    btn.addEventListener('click', () => {
      const filter = btn.dataset.cvFilter;

      if (filter === 'all') {
        activeFilters.clear();
      } else {
        // Remove 'all' if present, toggle the clicked category
        if (activeFilters.has(filter)) {
          activeFilters.delete(filter);
        } else {
          activeFilters.add(filter);
        }
      }

      // Clear sector active state
      sectorButtons.forEach(s => {
        s.classList.remove('is-active');
        s.setAttribute('aria-pressed', String(s.dataset.sector === 'all'));
      });
      activeSector = 'all';

      applyFilter();
    });
  });

  // ─── SECTOR BUTTON CLICK ───
  sectorButtons.forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.sector === 'all'));

    btn.addEventListener('click', () => {
      const sector = btn.dataset.sector;

      // Clear all sector active states
      sectorButtons.forEach(s => {
        s.classList.remove('is-active');
        s.setAttribute('aria-pressed', 'false');
      });

      if (sector === 'all') {
        activeFilters.clear();
        activeSector = 'all';
      } else {
        btn.classList.add('is-active');
        activeFilters.clear();
        activeSector = sector;
      }

      btn.setAttribute('aria-pressed', 'true');

      applyFilter();

      // Smooth scroll to concurrent view
      concurrentView.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  // ─── COUNTER ANIMATION ───
  function animateCounter(el, target, duration) {
    const start = parseInt(el.textContent) || 0;
    const startTime = performance.now();
    el.classList.add('is-animating');

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
        el.classList.remove('is-animating');
      }
    }

    requestAnimationFrame(tick);
  }

  function updateCounters() {
    // Count visible projects
    const visibleProjects = Array.from(projectCards).filter(
      c => !c.hidden && !c.classList.contains('is-hiding')
    ).length;

    // Count active services
    const hasFilters = activeFilters.size > 0;
    const visibleServices = hasFilters
      ? Array.from(serviceCards).filter(
          c => !c.classList.contains('cv-service-card--dimmed')
        ).length
      : serviceCards.length;

    // Count unique tech stacks in visible projects
    const stacks = new Set();
    projectCards.forEach(card => {
      if (!card.hidden && !card.classList.contains('is-hiding')) {
        card.querySelectorAll('.tech-tag').forEach(tag => {
          // Extract tech class name
          const cls = Array.from(tag.classList).find(c => c.startsWith('tech-tag--'));
          if (cls) stacks.add(cls);
        });
      }
    });

    statNumbers.forEach(el => {
      const stat = el.dataset.cvStat;
      let target;

      switch (stat) {
        case 'projects': target = visibleProjects; break;
        case 'services': target = visibleServices; break;
        case 'stacks':   target = stacks.size || parseInt(el.dataset.cvTarget); break;
        default:         target = parseInt(el.dataset.cvTarget);
      }

      animateCounter(el, target, 500);
    });
  }

  // ─── INITIAL COUNTER ANIMATION (on scroll) ───
  let countersInitialised = false;
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersInitialised) {
        countersInitialised = true;
        statNumbers.forEach(el => {
          const target = parseInt(el.dataset.cvTarget) || 0;
          animateCounter(el, target, 800);
        });
      }
    });
  }, { threshold: 0.2 });

  const statsBar = document.querySelector('.cv-stats-bar');
  if (statsBar) counterObserver.observe(statsBar);

  // ─── STEPPER REVEAL ANIMATION ───
  if (stepper) {
    const steps = stepper.querySelectorAll('.cv-step');
    let stepperRevealed = false;

    const stepperObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !stepperRevealed) {
          stepperRevealed = true;
          steps.forEach((step, i) => {
            setTimeout(() => {
              step.classList.add('is-revealed');
            }, i * 150);
          });
        }
      });
    }, { threshold: 0.3 });

    stepperObserver.observe(stepper);
  }

})();
