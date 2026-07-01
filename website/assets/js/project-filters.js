const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projectCards = [...document.querySelectorAll("[data-project-grid] [data-categories]")];
const projectCount = document.querySelector("[data-project-count]");
const featuredSection = document.querySelector(".featured-section");
const featuredGrid = featuredSection?.querySelector(".featured-grid");
const hideTimers = new WeakMap();

const featuredProjects = [
  "gocetransportapp",
  "dental-booking",
  "resurs11",
  "chat-app",
];

const getProjectSlug = (card) => {
  const link = card.querySelector('.project-actions a[href*="projects/"]');
  return link?.getAttribute("href")?.split("/").pop()?.replace(/\.html$/, "") ?? "";
};

const arrangeEditorialShowcase = () => {
  if (!featuredGrid) return;

  const cardsBySlug = new Map(projectCards.map((card) => [getProjectSlug(card), card]));
  const editorialCards = featuredProjects.map((slug) => cardsBySlug.get(slug)).filter(Boolean);

  if (editorialCards.length !== featuredProjects.length) return;

  featuredGrid.replaceChildren();
  editorialCards.forEach((card, index) => {
    card.classList.add("project-card--featured");
    card.dataset.featuredRank = String(index + 1);
    featuredGrid.append(card);
  });
};

const isVisible = (card) => !card.hidden && !card.classList.contains("is-hiding");

const updateProjectCount = () => {
  const count = projectCards.filter(isVisible).length;

  if (projectCount) {
    projectCount.textContent = `Показани са ${count} ${count === 1 ? "проект" : "проекта"}`;
  }

  if (featuredSection) {
    const hasVisibleFeatured = projectCards.some(
      (card) => card.classList.contains("project-card--featured") && isVisible(card),
    );
    featuredSection.hidden = !hasVisibleFeatured;
  }
};

const showCard = (card) => {
  window.clearTimeout(hideTimers.get(card));
  card.hidden = false;
  card.classList.remove("is-hiding");
  card.classList.add("is-showing");
};

const hideCard = (card) => {
  window.clearTimeout(hideTimers.get(card));
  card.classList.add("is-hiding");
  card.classList.remove("is-showing");

  const timer = window.setTimeout(() => {
    if (card.classList.contains("is-hiding")) {
      card.hidden = true;
      updateProjectCount();
    }
  }, 280);

  hideTimers.set(card, timer);
};

arrangeEditorialShowcase();

filterButtons.forEach((button) => {
  button.setAttribute("aria-pressed", button.classList.contains("active") ? "true" : "false");

  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const categories = (card.dataset.categories || "").split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);
      shouldShow ? showCard(card) : hideCard(card);
    });

    updateProjectCount();
  });
});

updateProjectCount();
