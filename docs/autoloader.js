Promise.all([
// Folgende Dateien werden Automatisch geladen wenn im HTML Dokument folgender Script Tag im <head> angegeben wurde:
// <script type="module" src="autoloader.js"></script>
  import('/docs/lang.js'),
  import('/docs/elements.js'),
  import('/docs/embed.js'),
  import('/docs/tooltip.js'),
  import('/docs/firebase.js')
]).then(([langModule]) => { const lang = langModule.default || {}; document.querySelectorAll('[lang]').forEach(el => { const key = el.getAttribute('lang'); el.innerText = lang[key] || `[[${key}]]`; }); const savedTheme = localStorage.getItem("theme"); if (savedTheme && savedTheme !== "system") { document.documentElement.setAttribute("data-theme", savedTheme);  } else { document.documentElement.removeAttribute("data-theme"); } const savedLang = localStorage.getItem("lang"); if (savedLang && savedLang !== "de") { location.reload(); } });
