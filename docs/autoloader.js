(function() {
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
	tags.forEach(({ tag, attrs, text }) => {if (tag === 'title' && !head.querySelector('title')) {const el = document.createElement('title'); el.textContent = text; head.appendChild(el);} else if (attrs && !head.querySelector(`${tag}${Object.entries(attrs).map(([k, v]) => `[${k}="${v}"]`).join('')}`)) {const el = document.createElement(tag); Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v)); head.appendChild(el);}});
})();

if (location.hostname.startsWith('www.')) location.replace(location.href.replace('//www.', '//'));if (location.protocol !== 'https:') location.replace(location.href.replace('http:', 'https:'));if (location.pathname.endsWith('index.html')) location.replace(location.href.replace(/index\.html$/, ''));
const noti = (type, ...msg) => {const txt = msg.join(' ');const types = {error: console.error,warn: console.warn,info: console.info,log: console.log,debug: console.debug};(types[type] || console.debug)(txt);alert(txt);};

let debug = false;
window.CommonVersion = {
	version: 'v1.1.0',
    key: '1.1.0',
	date: '3.8.25',
	time: '22:30'
};

Promise.all([
	import('/js_components/elements.js'),
	import('/js_components/tooltip.js'),
	import('/js_components/firebase.js'),
	import('/js_components/need_confirm.js'),
	import('/js_components/back_button.js'),
	import('/js_components/download.js'),
	import('/js_components/embed.js'),
	import('/js_components/mctooltip.js'),
    import('/js_components/cliper.js'),
    import('/js_components/theme.js')
]).then(([elements, tooltip, firebase, back_button, need_confirm, download, embed, mctip, cliper, theme]) => {    
	const savedTheme = localStorage.getItem("theme");
	if (savedTheme === "light" || savedTheme === "dark") document.documentElement.setAttribute("data-theme", savedTheme);
	else document.documentElement.removeAttribute("data-theme");

	const savedFont = localStorage.getItem("font") || "Mojangles";document.documentElement.setAttribute("data-font", savedFont);

	document.querySelectorAll('[data-modal-open]').forEach(btn => {btn.addEventListener('click', () => {const id = btn.getAttribute('data-modal-open');if (typeof Modal?.open == 'function') Modal.open(id);else noti("error", "Modal.open nicht verfügbar");});});
    if(debug === true) {document.querySelectorAll("img").forEach(img => {if (!img.src.endsWith(".webp")) noti("warn", "Bild sollte in WebP vorliegen:", img.src);if (img.naturalWidth > 800) noti("warn", "Bild eventuell zu groß geladen:", img.src, img.naturalWidth + "px");});}
	mctip.initMinecraftTooltips();
}).catch(err => {noti("error", "Fehler beim Laden der Komponenten:", err);});

document.addEventListener('DOMContentLoaded', () => {
	const year = new Date().getFullYear();
	const footer = document.createElement('footer');
	footer.id = "main-footer";
    footer.setAttribute("role", "contentinfo");
	footer.innerHTML = `<span class="footer-text">© ${year} Offizielle Website von Redminer9630 – Alle Rechte vorbehalten. <a href="/version?v=${CommonVersion.key}">${CommonVersion.version} ${CommonVersion.date} ${CommonVersion.time}</a></span>`;
	footer.classList.add("fixed-footer");
	document.body.style.paddingBottom = "60px";
	document.body.appendChild(footer);
	document.querySelectorAll('br[height]').forEach(br => {const height = parseInt(br.getAttribute('height')) || 0;const spacer = document.createElement('div');spacer.style.height = `${height}px`;br.replaceWith(spacer);});
	
	const footerCSS = document.createElement('style');
	footerCSS.textContent = `footer .footer-text{font-size:14px;display:block;padding:0 10px;word-wrap:break-word}@media(max-width:480px){footer .footer-text{font-size:11px}}footer.fixed-footer{position:fixed;bottom:0;left:0;width:100%;background:#222;color:#fff;text-align:center}`;
	document.head.appendChild(footerCSS);
	
	const fontStyle = document.createElement("style");
	fontStyle.textContent = `@font-face{font-family:'Mojangles';src:url('minecraft_font.woff2') format('woff2'),url('minecraft_font.woff') format('woff'),url('minecraft_font.ttf') format('truetype');font-display:swap;} html[data-font="Mojangles"] body{font-family:'Mojangles', Arial;} html[data-font="Arial"] body{font-family:Arial, sans-serif;} html[data-font="Sans Serif"] body{font-family:sans-serif;}`;
	document.head.appendChild(fontStyle);

	if (location.pathname !== '/' && location.pathname !== '/index.html') {const backCSS = document.createElement('style');
		backCSS.textContent = `.header-link{font-family:'Mojangles';font-size:16px;text-decoration:none;padding:10px 20px;border-radius:8px;position:absolute;top:20px;right:20px;background-color:#f44336;color:white;cursor:pointer}.header-link:hover{background-color:#e53935}`;
		document.head.appendChild(backCSS);const backButton = document.createElement('div');backButton.className = 'header-link';backButton.textContent = 'Zurück';backButton.addEventListener('click', () => history.back());document.body.appendChild(backButton);
	}
});

export function applyTheme(theme) {
  if (window._systemThemeListener) {window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", window._systemThemeListener);window._systemThemeListener = null;}

  if (theme === "sys") {
    const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", systemIsDark ? "dark" : "light");
      
    const listener = e => {document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");};
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listener);
    window._systemThemeListener = listener;
  } else {document.documentElement.setAttribute("data-theme", theme);}
}

function applyFont(font) {
  localStorage.setItem("font", font);
  document.documentElement.setAttribute("data-font", font);

  let fontFamily = "sans-serif";
  let fontSize = "1em";

  switch (font.toLowerCase()) {
    case "mojangles":
      fontFamily = "Mojangles, Arial, sans-serif";
      fontSize = "1.05em";
      break;
    case "arial":
      fontFamily = "Arial, sans-serif";
      break;
    case "verdana":
      fontFamily = "Verdana, sans-serif";
      fontSize = "0.95em";
      break;
    case "georgia":
      fontFamily = "Georgia, serif";
      break;
    case "courier":
      fontFamily = "'Courier New', monospace";
      fontSize = "0.95em";
      break;
    case "system-ui":
      fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
      break;
  }

  document.body.style.fontFamily = fontFamily;
  document.documentElement.style.fontSize = fontSize;
}

document.addEventListener("DOMContentLoaded", () => {
  const activeFont = localStorage.getItem("font") || "Mojangles";

  if (activeFont.toLowerCase() !== "mojangles") {
    document.querySelectorAll('[style]').forEach(el => {if (el.style.fontFamily?.includes("Mojangles")) {el.style.fontFamily = el.style.fontFamily.replace(/Mojangles/gi, "sans-serif");} });

    document.querySelectorAll("style").forEach(styleTag => {styleTag.textContent = styleTag.textContent.replace(/font-family:\s*["']?Mojangles["']?/gi, "font-family: sans-serif");});

    for (const sheet of document.styleSheets) {try {const rules = sheet.cssRules || sheet.rules;for (const rule of rules) {if (rule.style && rule.style.fontFamily?.includes("Mojangles")) {rule.style.fontFamily = rule.style.fontFamily.replace(/Mojangles/gi, "sans-serif");}}} catch (e) {continue; }}
  }
});


function loadCaptcha(callback) {
	if (window.grecaptcha) {if (callback) callback(window.grecaptcha);return;}
	const script = document.createElement('script');
	script.src = 'https://www.google.com/recaptcha/api.js?onload=onCaptchaLoad&render=explicit';
	script.async = true;
	script.defer = true;
	window.onCaptchaLoad = () => { if (callback) callback(window.grecaptcha); };
	document.head.appendChild(script);
}

function adjustContentSpacingGlobally() {
	if (window.innerWidth > 768) return;

	const content = document.getElementById("content");
	if (!content) return;

	while (content.lastChild && content.lastChild.tagName === 'BR') {content.removeChild(content.lastChild);}

	const bottomOffset = 65;
	let contentRect = content.getBoundingClientRect();
	const viewportHeight = window.innerHeight;

	while (contentRect.bottom > (viewportHeight - bottomOffset)) {
		content.appendChild(document.createElement('br'));
		const newRect = content.getBoundingClientRect();
		if (newRect.bottom === contentRect.bottom) break;
		contentRect = newRect;
	}
}

window.addEventListener('load', adjustContentSpacingGlobally);
window.addEventListener('resize', adjustContentSpacingGlobally);
