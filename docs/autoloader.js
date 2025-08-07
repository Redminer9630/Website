// Kopf-Meta & Title
(function () {
	const head = document.head;
	const tags = [
		{ tag: 'title', text: 'Redminer9630.ddns.net - Minecraft Tools, Generatoren und anderes' },
		{ tag: 'meta', attrs: { name: 'description', content: 'Offizielle Website von Redminer9630. - Minecraft Tools und Generatoren' }},
		{ tag: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }},
		{ tag: 'meta', attrs: { name: 'keywords', content: 'Minecraft, Redminer9630, Mods, Downloads, Tools, Generatoren, Wiki, Server' }},
		{ tag: 'meta', attrs: { name: 'robots', content: 'index, follow' }},
		{ tag: 'link', attrs: { rel: 'canonical', href: 'https://redminer9630.ddns.net/' }},
		{ tag: 'link', attrs: { rel: 'icon', type: 'image/x-icon', href: 'favicon/favicon.ico' }}
	];
	tags.forEach(({ tag, attrs, text }) => {
		if (tag === 'title' && !head.querySelector('title')) {
			const el = document.createElement('title'); el.textContent = text; head.appendChild(el);
		} else if (attrs && !head.querySelector(`${tag}${Object.entries(attrs).map(([k, v]) => `[${k}="${v}"]`).join('')}`)) {
			const el = document.createElement(tag);
			Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
			head.appendChild(el);
		}
	});
})();

// Load Font über CDN
function loadMinecraftFont(fontName, baseUrl) {
	const formats = [
		{ ext: ".woff2", format: "woff2" },
		{ ext: ".woff",  format: "woff" },
		{ ext: ".ttf",   format: "truetype" }
	];
	(function tryNext(index = 0) {
		if (index >= formats.length) return console.error("Minecraft-Font konnte nicht geladen werden.");
		const { ext, format } = formats[index];
		const url = baseUrl + ext;
		const font = new FontFace(fontName, `url(${url}) format('${format}')`, { display: "swap" });
		font.load().then(f => {
			document.fonts.add(f);
			document.body.style.fontFamily = `'${fontName}', sans-serif`;
			console.log(`Minecraft-Font (${format}) geladen.`);
		}).catch(() => tryNext(index + 1));
	})();
}
loadMinecraftFont("Minecraft", "https://cdn.jsdelivr.net/gh/Redminer9630/Website@v1.1.1/docs/minecraft_font");

// Umleitungen
if (location.hostname.startsWith("www.")) location.replace(location.href.replace("//www.", "//"));
if (location.protocol !== "https:") location.replace(location.href.replace("http:", "https:"));
if (location.pathname.endsWith("index.html")) location.replace(location.href.replace(/index\.html$/, ""));

// Logging & Version
const noti = (type, ...msg) => { const txt = msg.join(" "); const log = console[type] || console.log; log(txt); alert(txt); };
let debug = false;
window.CommonVersion = { version: "v1.1.0", key: "1.1.0", date: "3.8.25", time: "22:30" };

// CDN-Komponenten laden
import 'https://cdn.jsdelivr.net/gh/Redminer9630/Website@v1.1.1/docs/js_components/need_confirm.js';
import 'https://cdn.jsdelivr.net/gh/Redminer9630/Website@v1.1.1/docs/js_components/back_button.js';
import 'https://cdn.jsdelivr.net/gh/Redminer9630/Website@v1.1.1/docs/js_components/download.js';
import 'https://cdn.jsdelivr.net/gh/Redminer9630/Website@v1.1.1/docs/js_components/embed.js';
import 'https://cdn.jsdelivr.net/gh/Redminer9630/Website@v1.1.1/docs/js_components/mctooltip.js';
import 'https://cdn.jsdelivr.net/gh/Redminer9630/Website@v1.1.1/docs/js_components/cliper.js';
import 'https://cdn.jsdelivr.net/gh/Redminer9630/Website@v1.1.1/docs/js_components/theme.js';

// CSS preload
const preload = document.createElement("link");
preload.rel = "preload";
preload.href = "https://cdn.jsdelivr.net/gh/Redminer9630/Website@v1.1.1/docs/js_components/framework.css";
preload.as = "style";
preload.onload = () => { preload.rel = "stylesheet"; };
document.head.appendChild(preload);

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
	const year = new Date().getFullYear();
	const footer = document.createElement("footer");
	footer.id = "main-footer";
	footer.setAttribute("role", "contentinfo");
	footer.className = "fixed-footer";
	footer.innerHTML = `<span class="footer-text">© ${year} Offizielle Website von Redminer9630 – Alle Rechte vorbehalten. <a href="/version?v=${CommonVersion.key}">${CommonVersion.version} ${CommonVersion.date} ${CommonVersion.time}</a></span>`;
	document.body.appendChild(footer);

	const css = document.createElement("style");
	css.textContent = `footer .footer-text{font-size:14px;padding:0 10px}@media(max-width:480px){footer .footer-text{font-size:11px}}footer.fixed-footer{position:fixed;bottom:0;width:100%;background:#222;color:#fff;text-align:center}`;
	document.head.appendChild(css);

	const fontCSS = document.createElement("style");
	fontCSS.textContent = `@font-face{font-family:'Mojangles';src:url('minecraft_font.woff2') format('woff2');font-display:swap;} html[data-font="Mojangles"] body{font-family:'Mojangles', Arial;} html[data-font="Arial"] body{font-family:Arial, sans-serif;} html[data-font="Sans Serif"] body{font-family:sans-serif;}`;
	document.head.appendChild(fontCSS);

	const savedTheme = localStorage.getItem("theme");
	if (savedTheme === "light" || savedTheme === "dark") document.documentElement.setAttribute("data-theme", savedTheme);
	else document.documentElement.removeAttribute("data-theme");

	const savedFont = localStorage.getItem("font") || "Mojangles";
	document.documentElement.setAttribute("data-font", savedFont);

	if (typeof mctip?.initMinecraftTooltips === "function") mctip.initMinecraftTooltips();
	document.querySelectorAll('[data-modal-open]').forEach(btn => btn.addEventListener('click', () => {
		const id = btn.getAttribute('data-modal-open');
		if (typeof Modal?.open === 'function') Modal.open(id); else noti("error", "Modal.open nicht verfügbar");
	}));

	if (debug) {
		document.querySelectorAll("img").forEach(img => {
			if (!img.src.endsWith(".webp")) noti("warn", "Bild sollte WebP sein:", img.src);
			if (img.naturalWidth > 800) noti("warn", "Bild evtl. zu groß:", img.src, img.naturalWidth + "px");
		});
	}

	if (location.pathname !== '/' && location.pathname !== '/index.html') {
		const backBtn = document.createElement("div");
		backBtn.className = "header-link";
		backBtn.textContent = "Zurück";
		backBtn.style = "font-family:'Mojangles';font-size:16px;position:absolute;top:20px;right:20px;background:#f44336;color:#fff;padding:10px 20px;border-radius:8px;cursor:pointer";
		backBtn.addEventListener("click", () => history.back());
		document.body.appendChild(backBtn);
	}
});

// Theme-System
export function applyTheme(theme) {
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
}

// Font-Wechsler
function applyFont(font) {
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
}

// Optional: Captcha & Mobile-Footer-Space
function loadCaptcha(callback) {
	if (window.grecaptcha) return callback?.(window.grecaptcha);
	const s = document.createElement('script');
	s.src = 'https://www.google.com/recaptcha/api.js?onload=onCaptchaLoad&render=explicit';
	s.async = s.defer = true;
	window.onCaptchaLoad = () => callback?.(window.grecaptcha);
	document.head.appendChild(s);
}

function adjustContentSpacingGlobally() {
	if (window.innerWidth > 768) return;
	const content = document.getElementById("content");
	if (!content) return;
	while (content.lastChild?.tagName === 'BR') content.removeChild(content.lastChild);
	const bottomOffset = 65;
	let rect = content.getBoundingClientRect(), h = window.innerHeight;
	while (rect.bottom > h - bottomOffset) {
		content.appendChild(document.createElement('br'));
		const newRect = content.getBoundingClientRect();
		if (newRect.bottom === rect.bottom) break;
		rect = newRect;
	}
}
window.addEventListener("load", adjustContentSpacingGlobally);
window.addEventListener("resize", adjustContentSpacingGlobally);
