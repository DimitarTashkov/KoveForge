const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-categories]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = (card.dataset.categories || "").split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);

      card.hidden = !shouldShow;
    });
  });
});
