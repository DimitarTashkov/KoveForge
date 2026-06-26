const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-categories]");
const projectCount = document.querySelector("[data-project-count]");

const updateProjectCount = () => {
  if (!projectCount) {
    return;
  }

  const visibleProjects = Array.from(projectCards).filter(
    (card) => !card.hidden && !card.classList.contains("is-hiding")
  ).length;
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

      if (shouldShow) {
        card.hidden = false;
        card.classList.remove("is-hiding");
        card.classList.add("is-showing");
      } else {
        card.classList.add("is-hiding");
        card.classList.remove("is-showing");
        // Wait for transition to finish, then hide
        setTimeout(() => {
          if (card.classList.contains("is-hiding")) {
            card.hidden = true;
          }
        }, 280);
      }
    });

    updateProjectCount();
  });
});

updateProjectCount();
