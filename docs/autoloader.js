Promise.all([
    // <script type="module" src="autoloader.js"></script>
	// Automatisches Laden folgender Module
	import('/docs/lang.js'),
	import('/docs/elements.js'),
	import('/docs/embed.js'),
	import('/docs/tooltip.js'),
	import('/docs/firebase.js'),
	import('/docs/common.js'),
	import('/docs/modal.js')
]).then(([langModule, elements, embed, tooltip, firebase, common, modal]) => {
	const lang = langModule.default || {};
	document.querySelectorAll('[lang]').forEach(el => {
		const key = el.getAttribute('lang');
		el.innerText = lang[key] || `[[${key}]]`;
	});

	const savedTheme = localStorage.getItem("theme");
	if (savedTheme && savedTheme !== "system") {
		document.documentElement.setAttribute("data-theme", savedTheme);
	} else {
		document.documentElement.removeAttribute("data-theme");
	}
	const savedLang = localStorage.getItem("lang");
	if (savedLang && savedLang !== "de") {
		location.reload();
	}

	document.addEventListener("click", e => {
		let el = e.target.closest("[unstable]");
		if (!el) return;
		let u = el.getAttribute("href") || el.dataset.href;
		if (!u) return;
		e.preventDefault();
		if (confirm("Du verlässt jetzt den stabilen Bereich dieser Website.\nDiese Seite kann Fehler enthalten oder nicht richtig funktionieren.\nMöchtest du wirklich fortfahren?"))
			el.getAttribute("target") === "_blank" ? open(u, "_blank") : location.href = u;
	});
});

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('[data-modal-open]').forEach(btn => {
		btn.addEventListener('click', () => {
			Modal.open(btn.getAttribute('data-modal-open'));
		});
	});
});
