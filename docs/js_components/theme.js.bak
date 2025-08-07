function applyTheme(theme) {const root = document.documentElement;
  if (theme === "dark") {root.setAttribute("data-theme", "dark");} else if (theme === "light") {root.setAttribute("data-theme", "light");} else {
    root.removeAttribute("data-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {root.setAttribute("data-theme", e.matches ? "dark" : "light");});}}
const savedTheme = localStorage.getItem("theme") || "sys";applyTheme(savedTheme);
