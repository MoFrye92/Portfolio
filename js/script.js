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

  // --- Mood → playlist wiring (VibeCheckr-specific) ---

  const spotifyPlaylists = {
    calm: "https://open.spotify.com/playlist/…",
    focused: "https://open.spotify.com/playlist/…",
    hype: "https://open.spotify.com/playlist/…",
    sad: "https://open.spotify.com/playlist/…",
  };

  const applePlaylists = {
    calm: "https://music.apple.com/us/station/relax/ra.q-MK3VCQ",
    focused: "https://music.apple.com/us/station/feel-good/ra.q-MLzEBw",
    hype: "https://music.apple.com/us/station/energy/ra.q-MI4G",
    sad: "https://music.apple.com/us/station/feeling-blue/ra.q-MKvEBw",
  };

  const playSpotifyBtn = document.getElementById("playSpotify");
  const playAppleBtn = document.getElementById("playApple");
  let currentMood = null;

  function setMood(moodKey) {
    if (!moodKey) return;
    currentMood = moodKey;
    console.log("Current mood set to:", currentMood);

    const hasSpotify = spotifyPlaylists[moodKey];
    const hasApple = applePlaylists[moodKey];

    if (playSpotifyBtn) playSpotifyBtn.disabled = !hasSpotify;
    if (playAppleBtn) playAppleBtn.disabled = !hasApple;
  }

  if (playSpotifyBtn) {
    playSpotifyBtn.addEventListener("click", () => {
      if (!currentMood) {
        alert("Pick or log a mood first ✨");
        return;
      }
      const url = spotifyPlaylists[currentMood];
      if (!url) {
        alert("No Spotify playlist set for this mood yet.");
        return;
      }
      window.open(url, "_blank");
    });
  }

  if (playAppleBtn) {
    playAppleBtn.addEventListener("click", () => {
      if (!currentMood) {
        alert("Pick or log a mood first ✨");
        return;
      }
      const url = applePlaylists[currentMood];
      if (!url) {
        alert("No Apple Music playlist set for this mood yet.");
        return;
      }
      window.open(url, "_blank");
    });
  }

  // expose setMood globally if needed:
  window.setMood = setMood;
});
