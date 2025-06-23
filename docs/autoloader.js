(function(){
	const head=document.head;
	const tags=[
		{tag:'title',text:'Redminer9630.ddns.net - Minecraft Tools und Generatoren'},
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

window.CommonVersion = {
    version: 'v1.0.0',
    date: '18.5.25',
    time: '11:03'
};

const loader=document.createElement('div');
loader.id='loader'; loader.textContent='Lade...'; loader.style.cssText='position:fixed;top:0;left:0;width:100%;background:#000;color:#fff;text-align:center;padding:.5em;font-family:sans-serif;z-index:9999;';
document.body.appendChild(loader);

Promise.all([
	import('/js_components/modal.js'),
	import('/js_components/lang/lang.js'),
	import('/js_components/elements.js'),
	import('/js_components/embed.js'),
	import('/js_components/tooltip.js'),
	import('/js_components/firebase.js'),
	import('/js_components/need_confirm.js'),
	import('/js_components/download.js'),
	import('/js_components/back_button.js'),
    import('https://www.google.com/recaptcha/api.js')
]).then(([lang_module,elements,embed,tooltip,firebase,common,modal,need_confirm,download,back_button,captcha])=>{
	loader.remove();
	const lang=lang_module.default||{};
	document.querySelectorAll('[lang]').forEach(el=>{
		const key=el.getAttribute('lang');
		el.innerText=lang[key]||`[[${key}]]`;
	});

	const savedTheme=localStorage.getItem("theme");
	if(savedTheme==="light"||savedTheme==="dark") document.documentElement.setAttribute("data-theme",savedTheme);
	else document.documentElement.removeAttribute("data-theme");

	const savedLang=localStorage.getItem("lang");
	if(savedLang&&savedLang!=="de"&&savedLang!==document.documentElement.lang) location.reload();

	document.addEventListener("click",e=>{
		const el=e.target.closest("[unstable]");
		if(!el) return;
		const u=el.getAttribute("href")||el.dataset.href;
		if(!u) return;
		e.preventDefault();
		if(confirm("Du verlässt jetzt den stabilen Bereich dieser Website.\nDiese Seite kann Fehler enthalten oder nicht richtig funktionieren.\nMöchtest du wirklich fortfahren?"))
			el.getAttribute("target")==="_blank"?open(u,"_blank"):location.href=u;
	});

	document.querySelectorAll('[data-modal-open]').forEach(btn=>{
		btn.addEventListener('click',()=>{
			const id=btn.getAttribute('data-modal-open');
			if(typeof Modal?.open==='function') Modal.open(id);
			else console.warn("Modal.open nicht verfügbar");
		});
	});

	document.querySelectorAll("img").forEach(img=>{
		if(!img.src.endsWith(".webp")) console.warn("Bild sollte in WebP vorliegen:",img.src);
		if(img.naturalWidth>800) console.warn("Bild eventuell zu groß geladen:",img.src,img.naturalWidth+"px");
	});

	console.info("Social Integration empfohlen → Beispiel: https://addthis.com/get/share/");
}).catch(err=>{
	loader.remove();
	console.error("Fehler beim Laden der Komponenten:",err);
});

function appendFooter(version, date, time) {
    if (document.getElementById("main-footer")) return; const year = new Date().getFullYear(); const footer = document.createElement('footer'); footer.id = "main-footer";
    footer.innerHTML = `<span class="footer-text">© ${year} Offizielle Website von Redminer9630 – Alle Rechte vorbehalten. <a id="footer-version" href="#">${version} Pre ${date} ${time}</a></span>`;
    const isIndex = location.pathname.endsWith("/") || location.pathname.endsWith("/index") || location.pathname.endsWith("/index.html");
    footer.classList.add(isIndex ? "index-footer" : "fixed-footer"); document.body.style.paddingBottom = isIndex ? "100px" : "60px";
    document.body.appendChild(footer); const responsiveStyle = document.createElement('style');
    responsiveStyle.textContent = `footer .footer-text { font-size: 14px; display: block; padding: 0 10px; word-wrap: break-word; } @media (max-width: 480px) { footer .footer-text { font-size: 11px; } } footer.fixed-footer { position: fixed; bottom: 0; left: 0; width: 100%; background: #222; color: #fff; text-align: center; } footer.index-footer { position: relative; margin-top: 40px; background: #222; color: #fff; text-align: center; } `;
    document.head.appendChild(responsiveStyle);

    const versionLink = footer.querySelector("#footer-version");
    versionLink.addEventListener('click', e => {
        e.preventDefault();
        if (typeof Modal !== "undefined" && Modal.open) {
            Modal.open("modal-version", {
                content: `
                    <h2>Systemversion</h2>
                    <p>Version von <code>modal.js</code>:</p>
                    <div style="font-weight:bold;font-size:1.2em">${Modal.version}</div>
                    <p><a href="/versionsdata/${version}.json" target="_blank">Versions-Webseite öffnen</a></p>
                `,
                type: "info",
                width: "350px",
                height: "200px",
                focus: true,
                draggable: true
            });
        } else { window.location.href = \`/versionsdata/\${version}.json\`; }
    });
}

function initCommonFeatures(scope = document) { replaceUmlauts(scope); scope.querySelectorAll('[class^="element"]').forEach(toggle => { toggle.addEventListener('click', () => { toggle.classList.toggle('open'); const submenu = toggle.nextElementSibling; if (submenu) submenu.classList.toggle('show'); }); }); }
document.addEventListener('DOMContentLoaded', () => { appendFooter(CommonVersion.version, CommonVersion.date, CommonVersion.time); initCommonFeatures(document.body); });

document.addEventListener("DOMContentLoaded",()=>{const style=document.createElement("style");style.textContent=`@font-face{font-family:'Mojangles';src:url('minecraft_font.woff2') format('woff2'),url('minecraft_font.woff') format('woff'),url('minecraft_font.ttf') format('truetype');font-display:swap;}`;document.head.append(style);});
