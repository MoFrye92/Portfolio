// THEME TOGGLE
const html = document.documentElement;
const themeSwitch = document.getElementById("themeSwitch");
const themeSwitchMobile = document.getElementById("themeSwitchMobile");

// Load saved theme or default to dark
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
  const isLight = savedTheme === "light";
  themeSwitch.checked = isLight;
  themeSwitchMobile.checked = isLight;
} else {
  html.setAttribute("data-theme", "dark");
}

// Toggle theme
function toggleTheme(isLight) {
  const newTheme = isLight ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeSwitch.checked = isLight;
  themeSwitchMobile.checked = isLight;
}

themeSwitch.addEventListener("change", (e) => toggleTheme(e.target.checked));
themeSwitchMobile.addEventListener("change", (e) => toggleTheme(e.target.checked));

// MOBILE MENU
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

openMenu.addEventListener("click", () => (mobileMenu.style.display = "flex"));
closeMenu.addEventListener("click", () => (mobileMenu.style.display = "none"));
mobileLinks.forEach((link) => link.addEventListener("click", () => (mobileMenu.style.display = "none")));

// SCROLL REVEAL
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.2 }
);
sections.forEach((sec) => observer.observe(sec));
