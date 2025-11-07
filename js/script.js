document.addEventListener("DOMContentLoaded", () => {
  // Smooth reveal
  const sections = document.querySelectorAll("section");
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  sections.forEach((sec) => revealObserver.observe(sec));

  // Theme toggle (desktop + mobile)
  const html = document.documentElement;
  const themeSwitch = document.getElementById("themeSwitch");
  const themeSwitchMobile = document.getElementById("themeSwitchMobile");

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    const isLight = theme === "light";
    if (themeSwitch) themeSwitch.checked = isLight;
    if (themeSwitchMobile) themeSwitchMobile.checked = isLight;
  }

  // Load saved or default
  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme || "dark");

  [themeSwitch, themeSwitchMobile].forEach((t) => {
    if (!t) return;
    t.addEventListener("change", (e) => {
      applyTheme(e.target.checked ? "light" : "dark");
    });
  });

  // Mobile menu
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (openMenu && closeMenu && mobileMenu) {
    const setMenu = (open) => {
      mobileMenu.style.display = open ? "flex" : "none";
      openMenu.setAttribute("aria-expanded", String(open));
    };
    openMenu.addEventListener("click", () => setMenu(true));
    closeMenu.addEventListener("click", () => setMenu(false));
    mobileLinks.forEach((l) => l.addEventListener("click", () => setMenu(false)));
  }
});
