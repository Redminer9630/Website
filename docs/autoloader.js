(function(){
	const head=document.head;
	const tags=[
		{tag:'title',text:'Redminer9630.ddns.net - Minecraft Tools, Generatoren und anderes'},
		{tag:'meta',attrs:{name:'description',content:'Offizielle Website von Redminer9630. - Minecraft Tools und Generatoren'}},
		{tag:'meta',attrs:{name:'viewport',content:'width=device-width, initial-scale=1.0'}},
		{tag:'meta',attrs:{name:'keywords',content:'Minecraft, Redminer9630, Mods, Downloads, Tools, Generatoren, Wiki, Server'}},
		{tag:'meta',attrs:{name:'robots',content:'index, follow'}},
		{tag:'link',attrs:{rel:'canonical',href:'https://redminer9630.ddns.net/'}},
		{tag:'link',attrs:{rel:'icon',type:'image/x-icon',href:'images/favicon.ico'}}
	];
	tags.forEach(({tag,attrs,text})=>{if(tag==='title'&&!head.querySelector('title')){const el=document.createElement('title'); el.textContent=text; head.appendChild(el);}else if(attrs&&!head.querySelector(`${tag}${Object.entries(attrs).map(([k,v])=>`[${k}="${v}"]`).join('')}`)){const el=document.createElement(tag); Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v)); head.appendChild(el);}});
})();
if(location.hostname.startsWith('www.')) location.replace(location.href.replace('//www.','//'));if(location.protocol!=='https:') location.replace(location.href.replace('http:','https:'));if(location.pathname.endsWith('index.html')) location.replace(location.href.replace(/index\.html$/, ''));

const error = Symbol("error"); const warn = Symbol("warn"); const info = Symbol("info"); const log = Symbol("log"); function noti(type, ...msgParts) { const msg = msgParts.join(' '); switch(type) { case error: console.error(msg); alert(msg); break; case warn: console.warn(msg); alert(msg); break; case info: console.info(msg); alert(msg); break; case log: console.log(msg); alert(msg); break; case debug: console.debug(msg); alert(msg); break; default: console.debug("Unknown msg type:", msg);}}

window.CommonVersion = {
    version: 'v1.0.0',
    date: '18.5.25',
    time: '11:03'
};

const loader=document.createElement('div');document.addEventListener("DOMContentLoaded", () => {setTimeout(() => { if (document.getElementById('loader')) loader.remove(); }, 3000);});
Promise.all([
	import('/js_components/elements.js'),
	import('/js_components/embed.js'),
	import('/js_components/tooltip.js'),
	import('/js_components/firebase.js'),
	import('/js_components/need_confirm.js'),
	import('/js_components/download.js'),
	import('/js_components/modal9630.js'),
	import('/js_components/modals.js')
]).then(([elements, embed, tooltip, firebase, need_confirm, download, modal9630, modals]) => {
	loader.remove();
	/*const lang = lang_module.default ?? lang_module ?? {};
	document.querySelectorAll('[lang]').forEach(el=>{
		const key=el.getAttribute('lang');
		el.innerText=lang[key]||`[[${key}]]`;
	}); */

	const savedTheme=localStorage.getItem("theme");
	if(savedTheme==="light"||savedTheme==="dark") document.documentElement.setAttribute("data-theme",savedTheme);
	else document.documentElement.removeAttribute("data-theme");

	/*const savedLang=localStorage.getItem("lang");
	if(savedLang&&savedLang!=="de"&&savedLang!==document.documentElement.lang) location.reload();*/

	document.querySelectorAll('[data-modal-open]').forEach(btn=>{
		btn.addEventListener('click',()=>{
			const id=btn.getAttribute('data-modal-open');
			if(typeof Modal?.open==='function') Modal.open(id);
			else noti(error, ("Modal.open nicht verfügbar"));
		});
	});

	document.querySelectorAll("img").forEach(img=>{ if(!img.src.endsWith(".webp")) noti(warn, ("Bild sollte in WebP vorliegen:",img.src)); if(img.naturalWidth>800) noti(warn("Bild eventuell zu groß geladen:",img.src,img.naturalWidth+"px")); });
	noti(info, ("Social Integration empfohlen → Beispiel: https://addthis.com/get/share/"));
}).catch(err=>{
	loader.remove();
	noti(error, ("Fehler beim Laden der Komponenten:",err))
});

document.addEventListener('DOMContentLoaded', () => { if (location.pathname === '/' || location.pathname === '/index.html') return; const style = document.createElement('style'); style.textContent = ` .header-link { font-family: 'Mojangles'; font-size: 16px; text-decoration: none; padding: 10px 20px; border-radius: 8px; position: absolute; top: 20px; right: 20px; background-color: #f44336; color: white; cursor: pointer; } .header-link:hover { background-color: #e53935; } `; document.head.appendChild(style); const backButton = document.createElement('div'); backButton.className = 'header-link'; backButton.textContent = 'Zurück'; backButton.addEventListener('click', () => history.back()); document.body.appendChild(backButton); });

function loadCaptcha(callback) { if (window.grecaptcha) { if (callback) callback(window.grecaptcha); return; } const script = document.createElement('script'); script.src = 'https://www.google.com/recaptcha/api.js?onload=onCaptchaLoad&render=explicit'; script.async = true; script.defer = true; window.onCaptchaLoad = () => { if (callback) callback(window.grecaptcha); }; document.head.appendChild(script); }

function appendFooter(version, date, time) {
    if (document.getElementById("main-footer")) return; const year = new Date().getFullYear(); const footer = document.createElement('footer'); footer.id = "main-footer";
    footer.innerHTML = `<span class="footer-text">© ${year} Offizielle Website von Redminer9630 – Alle Rechte vorbehalten. ${version} Pre ${date} ${time}</span>`;
    
    const isIndex = location.pathname.endsWith("/") || location.pathname.endsWith("/index") || location.pathname.endsWith("/index.html");
    footer.classList.add(isIndex ? "index-footer" : "fixed-footer"); document.body.style.paddingBottom = isIndex ? "100px" : "60px";
    document.body.appendChild(footer); const responsiveStyle = document.createElement('style');
    responsiveStyle.textContent=`footer .footer-text{font-size:14px;display:block;padding:0 10px;word-wrap:break-word}@media(max-width:480px){footer .footer-text{font-size:11px}}footer.fixed-footer{position:fixed;bottom:0;left:0;width:100%;background:#222;color:#fff;text-align:center}footer.index-footer{position:relative;margin-top:40px;background:#222;color:#fff;text-align:center}`;
    document.head.appendChild(responsiveStyle);
}

document.addEventListener('DOMContentLoaded', () => { 
    appendFooter(CommonVersion.version, CommonVersion.date, CommonVersion.time); 
    const style=document.createElement("style");
    style.textContent=`@font-face{font-family:'Mojangles';src:url('minecraft_font.woff2') format('woff2'),url('minecraft_font.woff') format('woff'),url('minecraft_font.ttf') format('truetype');font-display:swap;} body{font-family:'Mojangles', Arial;}`;
    document.head.append(style);
});
