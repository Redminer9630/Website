Promise.all([
    // <script type="module" src="autoloader.js"></script>
	// Automatisches Laden folgender Module
	import('/js_components/lang.js'),
	import('/js_components/elements.js'),
	import('/js_components/embed.js'),
	import('/js_components/tooltip.js'),
	import('/js_components/firebase.js'),
	import('/js_components/common.js'),
	import('/js_components/modal.js'),
    import('/js_components/need-confirm.js'),
    import('/js_components/download.js')
]).then(([langModule, elements, embed, tooltip, firebase, common, modal, need-confirm, download]) => {
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

// URL Canonicalization Fix
if(location.hostname==="www.redminer9630.ddns.net") location.href=location.href.replace("//www.","//");

// Keywords in <title> und <meta description> automatisch anpassen
const pageTitle = document.title;
document.querySelector('meta[name="description"]')?.setAttribute('content', pageTitle + " - Infos, Downloads und mehr von Redminer9630");

// Render-blocking Ressourcen eliminieren Hinweis
window.addEventListener("load", () => {
	console.log("Alle Ressourcen geladen – Render-Blocking optimiert durch <link rel='preload'> empfohlen.");
});

// Modern Image Format Hinweis für Entwickler
document.querySelectorAll("img").forEach(img => {
	if(!img.src.endsWith(".webp")) console.warn("Bild sollte in WebP vorliegen:", img.src);
});

// Social API Integration (Beispiel, AddThis ersetzt durch eigenen Link)
console.log("Social Integration empfohlen. Beispiel-Link: https://addthis.com oder eigene API");

// JS Error Logging
window.addEventListener('error', e => console.warn("JS Error:", e.message));

// Responsive Images Hinweis
document.querySelectorAll("img").forEach(img=>{
	if(img.naturalWidth>800) console.warn("Bild eventuell zu groß geladen:", img.src);
});
