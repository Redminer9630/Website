(function () {const head = document.head;const tags = [
		{ tag: 'title', text: 'Redminer9630.ddns.net - Minecraft Tools, Generatoren und anderes' },
		{ tag: 'meta', attrs: { name: 'description', content: 'Offizielle Website von Redminer9630. - Minecraft Tools und Generatoren' }},
		{ tag: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }},
		{ tag: 'meta', attrs: { name: 'keywords', content: 'Minecraft, Redminer9630, Mods, Downloads, Tools, Generatoren, Wiki, Server' }},
		{ tag: 'link', attrs: { rel: 'icon', type: 'image/x-icon', href: 'favicon/favicon.ico' }}
	];tags.forEach(({ tag, attrs, text }) => {if (tag === 'title' && !head.querySelector('title')) {const el = document.createElement('title'); el.textContent = text; head.appendChild(el);} else if (attrs && !head.querySelector(`${tag}${Object.entries(attrs).map(([k, v]) => `[${k}="${v}"]`).join('')}`)) {const el = document.createElement(tag);Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));head.appendChild(el);}});})();

function loadMinecraftFontMiniFirst() {const fontMiniURL = "https://cdn.jsdelivr.net/gh/Redminer9630/Website@t81/docs/mcmini.woff2";const fontFullURL = "https://cdn.jsdelivr.net/gh/Redminer9630/Website@t81/docs/minecraft_font.woff2";const fontMini = new FontFace("Minecraft",`url(${fontMiniURL}) format('woff2')`,{ display: "swap", unicodeRange: "U+0020-007E" });fontMini.load().then(f => {document.fonts.add(f);document.documentElement.style.fontFamily = "'Minecraft', sans-serif";console.log("Minecraft Mini-Font geladen (CLS-minimiert).");const fontFull = new FontFace("Minecraft",`url(${fontFullURL}) format('woff2')`,{ display: "swap" });fontFull.load().then(f2 => {document.fonts.add(f2);console.log("Minecraft Voll-Font geladen.");}).catch(err => console.warn("Fehler beim Laden des Voll-Fonts", err));}).catch(err => console.warn("Fehler beim Laden des Mini-Fonts", err));}loadMinecraftFontMiniFirst();
if (location.hostname.startsWith("www.")) location.replace(location.href.replace("//www.", "//"));if (location.protocol !== "https:") location.replace(location.href.replace("http:", "https:"));if (location.pathname.endsWith("index.html")) location.replace(location.href.replace(/index\.html$/, ""));
window.noti = (type, ...msg) => {const txt = msg.join(" ");const log = console[type] || console.log;log(txt);alert(txt);};

window.debug = false;
window.CommonVersion = { version: "v2.0", key: "2.0", date: " 25.08.31", time: " 9:00" };

const cdnBase = "https://cdn.jsdelivr.net/gh/Redminer9630/Website@t81/docs/js_components/";["back_button.js","mctooltip.js","theme.js","overrides.js"].forEach(file => import(cdnBase + file).catch(e => console.error("Fehler beim Laden:", file, e)));
const link = document.createElement("link");link.rel = "stylesheet";link.href = "https://cdn.jsdelivr.net/gh/Redminer9630/Website@t81/docs/js_components/framework.css";document.head.appendChild(link);

(function() {const preload = document.createElement("link");preload.rel = "preload";preload.href = "https://cdn.jsdelivr.net/gh/Redminer9630/Website@t81/docs/js_components/framework.css";preload.as = "style";preload.onload = () => { preload.rel = "stylesheet"; };document.head.appendChild(preload);})();
(function() {
    function ensureThemeMeta() {
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "theme-color";
            document.head.appendChild(meta);
        }
        return meta;
    }

    function getBodyBgColor() {return getComputedStyle(document.body).backgroundColor;}

    function updateThemeColor() {
        const meta = ensureThemeMeta();
        const theme = document.documentElement.getAttribute("data-theme");
        let color;
        if (theme === "dark") {color = getBodyBgColor() || "#1a1a1a";
        } else if (theme === "light") {color = getBodyBgColor() || "#eaeaea";
        } else {color = getBodyBgColor() || "#eaeaea";}
        meta.setAttribute("content", color);
    }
    document.addEventListener("DOMContentLoaded", updateThemeColor);
    const observer = new MutationObserver(muts => {for (const m of muts) {if (m.type === "attributes" && m.attributeName === "data-theme") {updateThemeColor();}}});
    observer.observe(document.documentElement, { attributes: true });
    const bodyObserver = new MutationObserver(updateThemeColor);
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["style", "class"] });
    window.updateThemeColor = updateThemeColor;
})();

document.addEventListener("DOMContentLoaded", () => {
    const year = new Date().getFullYear();
    const footer = document.createElement("div");
    footer.id = "main-footer";
    footer.className = "fixed-footer";

    const footerText = `© ${year} Offizielle Website von Redminer9630 – Alle Rechte vorbehalten. <a style="color: #fff;" href="/version?v=${window.CommonVersion.key}">${window.CommonVersion.version}${window.CommonVersion.date}${window.CommonVersion.time}</a>`;

    footer.innerHTML = `<span class="footer-text">${footerText}</span>`;
    document.body.appendChild(footer);
    function adjustFooterPadding() {const footerHeight = footer.offsetHeight;document.body.style.paddingBottom = footerHeight + "px";}
    adjustFooterPadding();
    window.addEventListener("resize", adjustFooterPadding);

    const css = document.createElement("style");
    css.textContent = `
        #main-footer .footer-text { font-size: 14px; padding: 0 10px; }
        @media(max-width: 480px) { 
            #main-footer .footer-text {font-size: 11px;}
            #main-footer .footer-text {display: inline-block;}
            #main-footer .footer-text:before {content: "";}
            #main-footer .footer-text {white-space: normal;}
            #main-footer .footer-text {display: block;text-align: center;}
            #main-footer .footer-text {font-size: 11px;display: block;text-align: center;white-space: normal;}
        }
        #main-footer {position: fixed;left: 0;right: 0;bottom: 0;z-index: 1000;}
        #main-footer .footer-text { font-size: 14px; padding: 0 10px; }
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
    const fontPreload = document.createElement("link");fontPreload.rel = "preload";fontPreload.as = "font";fontPreload.href = "https://cdn.jsdelivr.net/gh/Redminer9630/Website@t79/docs/minecraft_font.woff2";fontPreload.type = "font/woff2";fontPreload.crossOrigin = "anonymous";document.head.appendChild(fontPreload);

    const fontCSS = document.createElement("style");
    fontCSS.textContent = `@font-face {font-family: 'Mojangles';src: url('https://cdn.jsdelivr.net/gh/Redminer9630/Website@t79/docs/minecraft_font.woff2') format('woff2');font-display: swap;}html[data-font="Mojangles"] body {font-family: 'Mojangles', Arial;}html[data-font="Arial"] body {font-family: Arial, sans-serif;}html[data-font="Sans Serif"] body {font-family: sans-serif;}`;
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

function applyFont(font) {
    const html = document.documentElement;
    switch(font.toLowerCase()) {
        case "mojangles": html.setAttribute("data-font", "Mojangles"); break;
        case "arial": html.setAttribute("data-font", "Arial"); break;
        case "verdana": html.setAttribute("data-font", "Verdana"); break;
        case "georgia": html.setAttribute("data-font", "Georgia"); break;
        case "courier": html.setAttribute("data-font", "Courier"); break;
        case "system-ui": html.setAttribute("data-font", "Sans Serif"); break;
        default: html.setAttribute("data-font", "Mojangles");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedFont = localStorage.getItem("font") || "mojangles";
    applyFont(savedFont);
    window.applyFont = applyFont;
});

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
