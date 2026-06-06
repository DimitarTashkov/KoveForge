const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-categories]");
const projectCount = document.querySelector("[data-project-count]");

const updateProjectCount = () => {
  if (!projectCount) {
    return;
  }

  const visibleProjects = Array.from(projectCards).filter((card) => !card.hidden).length;
  const label = visibleProjects === 1 ? "проект" : "проекта";

  projectCount.textContent = `Показани са ${visibleProjects} ${label}`;
};

filterButtons.forEach((button) => {
  button.setAttribute("aria-pressed", button.classList.contains("active") ? "true" : "false");

  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";

    filterButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    projectCards.forEach((card) => {
      const categories = (card.dataset.categories || "").split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);

      card.hidden = !shouldShow;
    });

    updateProjectCount();
  });
});

updateProjectCount();
