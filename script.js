let toggleList = document.querySelectorAll(".state");

toggleList.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    let data = element.classList.item(1);

    document.querySelector(`.${data}-data`).scrollIntoView({
      behavior: "smooth",
    });
  });
});
