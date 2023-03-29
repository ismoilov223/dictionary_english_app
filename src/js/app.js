// dom elemnts start!
const fontsEl = document.querySelectorAll("#font-one, #font-two, #font-three");
const fontNameEl = document.querySelector("#font-name");
const bodyEl = document.body;
// dom elemnts end!
// Theme change start!
const theme_change = document.querySelector("#theme-toggle");
const theme_switchEl = document.querySelector("#theme-swichEl");
const color_theme = localStorage.getItem("color-theme");
if (color_theme == "dark") {
  document.documentElement.classList.add("dark");
  theme_switchEl.classList.add("after:translate-x-full");
  theme_switchEl.classList.add("after:border-white");
  theme_switchEl.classList.add("bg-[#A445ED]");
} else {
  document.documentElement.classList.remove("dark");
}
theme_change.addEventListener("click", () => {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    theme_change.classList == "sr-only peer light" &&
    color_theme == "light"
  ) {
    theme_change.classList.remove("light");
    theme_change.classList.add("dark");
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
  } else {
    theme_change.classList.remove("dark");
    theme_change.classList.add("light");
    document.documentElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
  }
});
// Theme change end!
// Font change start!
fontsEl.forEach((el) => {
  el.addEventListener("click", () => {
    switch (el.textContent) {
      case "Sans Serif":
        bodyEl.classList.add("font-sans")
        fontNameEl.textContent = "Sans Serif";
        break;
      case "Serif":
        bodyEl.style.fontFamily = "Serif";
        fontNameEl.textContent = "Serif";
        break;
      case "Mono":
        bodyEl.style.fontFamily = "Roboto Mono";
        fontNameEl.textContent = "Mono";
        break;

      default:
        bodyEl.style.fontFamily = "sans serif";
        break;
    }
  });
});
//  }

// function demo(i){
// }
// Font change end!
console.log(color_theme);
