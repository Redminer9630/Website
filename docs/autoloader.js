(function(){
  const head = document.head;
  function exists(s){return head.querySelector(s)!==null;}
  if(!exists('title')){
    const t=document.createElement('title');
    t.textContent='Redminer9630.ddns.net - Minecraft Tools und Generatoren';
    head.appendChild(t);
  }
  if(!exists('meta[name="description"]')){
    const m=document.createElement('meta');
    m.name='description';
    m.content='Offizielle Website von Redminer9630. - Minecraft Tools und Generatoren';
    head.appendChild(m);
  }
  if(!exists('meta[name="viewport"]')){
    const m=document.createElement('meta');
    m.name='viewport';
    m.content='width=device-width, initial-scale=1.0';
    head.appendChild(m);
  }
  if(!exists('meta[name="keywords"]')){
    const m=document.createElement('meta');
    m.name='keywords';
    m.content='Minecraft, Redminer9630, Mods, Downloads, Tools, Generatoren, Wiki, Server';
    head.appendChild(m);
  }
  if(!exists('meta[name="robots"]')){
    const m=document.createElement('meta');
    m.name='robots';
    m.content='index, follow';
    head.appendChild(m);
  }
  if(!exists('link[rel="canonical"]')){
    const l=document.createElement('link');
    l.rel='canonical';
    l.href='https://redminer9630.ddns.net/';
    head.appendChild(l);
  }
  if(!exists('link[rel="icon"]')){
    const l=document.createElement('link');
    l.rel='icon';
    l.type='image/x-icon';
    l.href='images/favicon.ico';
    head.appendChild(l);
  }
})();

if(location.hostname.startsWith('www.')) location.href=location.href.replace('//www.','//');
if(location.protocol!=='https:') location.href=location.href.replace('http:','https:');
if(location.pathname.endsWith('index.html')) location.href=location.href.replace('index.html','');

Promise.all([
	import('/js_components/lang/lang.js'),
	import('/js_components/elements.js'),
	import('/js_components/embed.js'),
	import('/js_components/tooltip.js'),
	import('/js_components/firebase.js'),
	import('/js_components/common.js'),
	import('/js_components/modal.js'),
	import('/js_components/need-confirm.js'),
	import('/js_components/download.js'),
	import('/js_components/back-button.js'),
	import('/js_components/anti-hack.js')
]).then(([langModule,elements,embed,tooltip,firebase,common,modal,needConfirm,download,backButtom,antoHack])=>{
	const lang=langModule.default||{};
	document.querySelectorAll('[lang]').forEach(el=>{
		const key=el.getAttribute('lang');
		el.innerText=lang[key]||`[[${key}]]`;
	});
	const savedTheme=localStorage.getItem("theme");
	if(savedTheme&&savedTheme!=="system") document.documentElement.setAttribute("data-theme",savedTheme);
	else document.documentElement.removeAttribute("data-theme");
	const savedLang=localStorage.getItem("lang");
	if(savedLang&&savedLang!=="de") location.reload();
	document.addEventListener("click",e=>{
		let el=e.target.closest("[unstable]");
		if(!el) return;
		let u=el.getAttribute("href")||el.dataset.href;
		if(!u) return;
		e.preventDefault();
		if(confirm("Du verlässt jetzt den stabilen Bereich dieser Website.\nDiese Seite kann Fehler enthalten oder nicht richtig funktionieren.\nMöchtest du wirklich fortfahren?"))
			el.getAttribute("target")==="_blank"?open(u,"_blank"):location.href=u;
	});
});

document.addEventListener('DOMContentLoaded',()=>{ document.querySelectorAll('[data-modal-open]').forEach(btn=>{ btn.addEventListener('click',()=>{ Modal.open(btn.getAttribute('data-modal-open')); }); }); });
document.querySelectorAll("img").forEach(img=>{ if(!img.src.endsWith(".webp")) console.warn("Bild sollte in WebP vorliegen:",img.src); });
console.log("Social Integration empfohlen. Beispiel-Link: https://addthis.com oder eigene API");
document.querySelectorAll("img").forEach(img=>{ if(img.naturalWidth>800) console.warn("Bild eventuell zu groß geladen:",img.src); });
