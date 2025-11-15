// ===============================
//  MAIN APP SCRIPT
//  - Theme toggle (with localStorage)
//  - Mobile menu
//  - Scroll reveal for sections
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  // ===============================
  //  THEME TOGGLE (Desktop + Mobile)
  // ===============================
  const themeSwitch = document.getElementById("themeSwitch");
  const themeSwitchMobile = document.getElementById("themeSwitchMobile");

  const applyTheme = (theme) => {
    html.setAttribute("data-theme", theme);
    const isLight = theme === "light";

    if (themeSwitch) themeSwitch.checked = isLight;
    if (themeSwitchMobile) themeSwitchMobile.checked = isLight;
  };

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme);
  } else {
    applyTheme("dark");
  }

  const handleThemeToggle = (e) => {
    const newTheme = e.target.checked ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (themeSwitch) {
    themeSwitch.addEventListener("change", handleThemeToggle);
  }

  if (themeSwitchMobile) {
    themeSwitchMobile.addEventListener("change", handleThemeToggle);
  }

  // ===============================
  //  MOBILE MENU
  // ===============================
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  const openMobileMenu = () => {
    if (mobileMenu) {
      mobileMenu.style.display = "flex";
    }
  };

  const closeMobileMenu = () => {
    if (mobileMenu) {
      mobileMenu.style.display = "none";
    }
  };

  if (openMenu && closeMenu && mobileMenu) {
    openMenu.addEventListener("click", openMobileMenu);
    closeMenu.addEventListener("click", closeMobileMenu);

    // Close when clicking a link inside the menu
    mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    // Optional: close when clicking outside the side panel
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) closeMobileMenu();
    });
  }

  // ===============================
  //  SCROLL REVEAL FOR SECTIONS
  // ===============================
  const sections = document.querySelectorAll("section");

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((sec) => observer.observe(sec));
  } else {
    // Fallback: if browser doesn't support IO, just show all sections
    sections.forEach((sec) => sec.classList.add("visible"));
  }
});
