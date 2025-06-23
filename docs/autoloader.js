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
	tags.forEach(({tag,attrs,text})=>{
		if(tag==='title'&&!head.querySelector('title')){
			const el=document.createElement('title'); el.textContent=text; head.appendChild(el);
		}else if(attrs&&!head.querySelector(`${tag}${Object.entries(attrs).map(([k,v])=>`[${k}="${v}"]`).join('')}`)){
			const el=document.createElement(tag); Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v)); head.appendChild(el);
		}
	});
})();

if(location.hostname.startsWith('www.')) location.replace(location.href.replace('//www.','//'));
if(location.protocol!=='https:') location.replace(location.href.replace('http:','https:'));
if(location.pathname.endsWith('index.html')) location.replace(location.href.replace(/index\.html$/, ''));

const loader=document.createElement('div');
loader.id='loader'; loader.textContent='Lade...'; loader.style.cssText='position:fixed;top:0;left:0;width:100%;background:#000;color:#fff;text-align:center;padding:.5em;font-family:sans-serif;z-index:9999;';
document.body.appendChild(loader);

Promise.all([
	import('/js_components/common.js'),
	import('/js_components/modal.js'),
	import('/js_components/lang/lang.js'),
	import('/js_components/elements.js'),
	import('/js_components/embed.js'),
	import('/js_components/tooltip.js'),
	import('/js_components/firebase.js'),
	import('/js_components/need-confirm.js'),
	import('/js_components/download.js'),
	import('/js_components/back-button.js')
]).then(([langModule,elements,embed,tooltip,firebase,common,modal,needConfirm,download,backButton])=>{
	loader.remove();
	const lang=langModule.default||{};
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
