(function () {const head = document.head;const tags = [
		{ tag: 'title', text: 'Redminer9630.ddns.net - Minecraft Tools, Generatoren und anderes' },
		{ tag: 'meta', attrs: { name: 'description', content: 'Offizielle Website von Redminer9630. - Minecraft Tools und Generatoren' }},
		{ tag: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }},
		{ tag: 'meta', attrs: { name: 'keywords', content: 'Minecraft, Redminer9630, Mods, Downloads, Tools, Generatoren, Wiki, Server' }},
		{ tag: 'meta', attrs: { name: 'robots', content: 'index, follow' }},
		{ tag: 'link', attrs: { rel: 'icon', type: 'image/x-icon', href: 'favicon/favicon.ico' }}
	];tags.forEach(({ tag, attrs, text }) => {if (tag === 'title' && !head.querySelector('title')) {const el = document.createElement('title'); el.textContent = text; head.appendChild(el);} else if (attrs && !head.querySelector(`${tag}${Object.entries(attrs).map(([k, v]) => `[${k}="${v}"]`).join('')}`)) {const el = document.createElement(tag);Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));head.appendChild(el);}});})();

function loadMinecraftFontMiniFirst() {const fontMiniURL = "https://cdn.jsdelivr.net/gh/Redminer9630/Website@t36/docs/mcmini.woff2";const fontFullURL = "https://cdn.jsdelivr.net/gh/Redminer9630/Website@t36/docs/minecraft_font.woff2";const fontMini = new FontFace("Minecraft",`url(${fontMiniURL}) format('woff2')`,{ display: "swap", unicodeRange: "U+0020-007E" });fontMini.load().then(f => {document.fonts.add(f);document.documentElement.style.fontFamily = "'Minecraft', sans-serif";console.log("Minecraft Mini-Font geladen (CLS-minimiert).");const fontFull = new FontFace("Minecraft",`url(${fontFullURL}) format('woff2')`,{ display: "swap" });fontFull.load().then(f2 => {document.fonts.add(f2);console.log("Minecraft Voll-Font geladen.");}).catch(err => console.warn("Fehler beim Laden des Voll-Fonts", err));}).catch(err => console.warn("Fehler beim Laden des Mini-Fonts", err));}loadMinecraftFontMiniFirst();
if (location.hostname.startsWith("www.")) location.replace(location.href.replace("//www.", "//"));if (location.protocol !== "https:") location.replace(location.href.replace("http:", "https:"));if (location.pathname.endsWith("index.html")) location.replace(location.href.replace(/index\.html$/, ""));
window.noti = (type, ...msg) => {const txt = msg.join(" ");const log = console[type] || console.log;log(txt);alert(txt);};

window.debug = false;
window.CommonVersion = { version: "v1.3.0", key: "1.3.0", date: "15.8.25", time: "18:30" };

const cdnBase = "https://cdn.jsdelivr.net/gh/Redminer9630/Website@t36/docs/js_components/";["back_button.js","mctooltip.js","theme.js"].forEach(file => import(cdnBase + file).catch(e => console.error("Fehler beim Laden:", file, e)));

(function() {const preload = document.createElement("link");preload.rel = "preload";preload.href = "https://cdn.jsdelivr.net/gh/Redminer9630/Website@t36/docs/js_components/framework.css";preload.as = "style";preload.onload = () => { preload.rel = "stylesheet"; };document.head.appendChild(preload);})();
(function(){const canonical=document.querySelector('link[rel="canonical"]')||document.createElement('link');canonical.rel="canonical";canonical.href=location.origin+location.pathname;if(!canonical.parentNode)document.head.appendChild(canonical);})();

document.addEventListener("DOMContentLoaded", () => {
    const year = new Date().getFullYear();
    const footer = document.createElement("div");
    footer.id = "main-footer";
    footer.className = "fixed-footer";

    const footerText = `© ${year} Offizielle Website von Redminer9630 – Alle Rechte vorbehalten. 
        <a style="color: #fff;" href="/version?v=${window.CommonVersion.key}">${window.CommonVersion.version} ${window.CommonVersion.date} ${window.CommonVersion.time}</a>`;

    footer.innerHTML = `<span class="footer-text">${footerText}</span>`;
    document.body.appendChild(footer);

    const css = document.createElement("style");
    css.textContent = `
        #main-footer .footer-text { font-size: 14px; padding: 0 10px; }
        @media(max-width: 480px) { 
            #main-footer .footer-text {font-size: 11px;}
            #main-footer .footer-text {display: inline-block;}
            #main-footer .footer-text:before {content: "";}
            #main-footer .footer-text {white-space: normal;}
            #main-footer .footer-text {display: block;text-align: center;}
        }
        .fixed-footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            background: #1a1a1a;
            color: #fff;
            text-align: center;
            padding: 5px 0;
        }`;
    document.head.appendChild(css);
    const fontPreload = document.createElement("link");fontPreload.rel = "preload";fontPreload.as = "font";fontPreload.href = "https://cdn.jsdelivr.net/gh/Redminer9630/Website@t36/docs/minecraft_font.woff2";fontPreload.type = "font/woff2";fontPreload.crossOrigin = "anonymous";document.head.appendChild(fontPreload);

    const fontCSS = document.createElement("style");
    fontCSS.textContent = `@font-face {font-family: 'Mojangles';src: url('https://cdn.jsdelivr.net/gh/Redminer9630/Website@t36/docs/minecraft_font.woff2') format('woff2');font-display: swap;}html[data-font="Mojangles"] body {font-family: 'Mojangles', Arial;}html[data-font="Arial"] body {font-family: Arial, sans-serif;}html[data-font="Sans Serif"] body {font-family: sans-serif;}`;
    document.head.appendChild(fontCSS);

    const savedTheme = localStorage.getItem("theme");if (savedTheme === "light" || savedTheme === "dark") {document.documentElement.setAttribute("data-theme", savedTheme);} else {document.documentElement.removeAttribute("data-theme");}

    const savedFont = localStorage.getItem("font") || "Mojangles";document.documentElement.setAttribute("data-font", savedFont);

    if (typeof window.mctip?.initMinecraftTooltips === "function") {window.mctip.initMinecraftTooltips();}

    document.querySelectorAll('[data-modal-open]').forEach(btn =>btn.addEventListener('click', () => {const id = btn.getAttribute('data-modal-open');if (typeof window.Modal?.open === 'function') {window.Modal.open(id);} else {window.noti("error", "Modal.open nicht verfügbar");}}));

    if (window.debug) {document.querySelectorAll("img").forEach(img => {if (!img.src.endsWith(".webp")) {window.noti("warn", "Bild sollte WebP sein:", img.src);}if (img.naturalWidth > 800) {window.noti("warn", "Bild evtl. zu groß:", img.src, img.naturalWidth + "px");}});}
});

window.applyTheme = function(theme) {
	if (window._systemThemeListener) {
		window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", window._systemThemeListener);
		window._systemThemeListener = null;
	}
	if (theme === "sys") {
		const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		document.documentElement.setAttribute("data-theme", systemDark ? "dark" : "light");
		const listener = e => document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listener);
		window._systemThemeListener = listener;
	} else {
		document.documentElement.setAttribute("data-theme", theme);
	}
};

window.applyFont = function(font) {
	localStorage.setItem("font", font);
	document.documentElement.setAttribute("data-font", font);
	let family = "sans-serif", size = "1em";
	switch (font.toLowerCase()) {
		case "mojangles": family = "Mojangles, Arial"; size = "1.05em"; break;
		case "arial": family = "Arial"; break;
		case "verdana": family = "Verdana"; size = "0.95em"; break;
		case "georgia": family = "Georgia"; break;
		case "courier": family = "'Courier New', monospace"; size = "0.95em"; break;
		case "system-ui": family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"; break;
	}
	document.body.style.fontFamily = family;
	document.documentElement.style.fontSize = size;
};

window.loadCaptcha = function(callback) {
	if (window.grecaptcha) return callback?.(window.grecaptcha);
	const s = document.createElement('script');
	s.src = 'https://www.google.com/recaptcha/api.js?onload=onCaptchaLoad&render=explicit';
	s.async = s.defer = true;
	window.onCaptchaLoad = () => callback?.(window.grecaptcha);
	document.head.appendChild(s);
};

window.adjustContentSpacingGlobally = function() {
	if (window.innerWidth > 768) return;
	const content = document.getElementById('main-content') || document.body;
	content.style.paddingBottom = "4rem";
};
window.addEventListener("resize", window.adjustContentSpacingGlobally);
window.adjustContentSpacingGlobally();
