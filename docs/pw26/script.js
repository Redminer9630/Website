const API_URL="https://each-organ-selling-fraser.trycloudflare.com";

const promptInput=document.querySelector("#prompt");
const runButton=document.querySelector("#run");
const preview=document.querySelector("#preview");
const previewEmpty=document.querySelector("#preview-empty");

const status=document.querySelector("#status");
const statusText=document.querySelector("#status-text");

const previewId=document.querySelector("#preview-id");
const expiry=document.querySelector("#expiry");

const extendButton=document.querySelector("#extend");
const publishButton=document.querySelector("#publish");
const shareButton=document.querySelector("#share");
const openButton=document.querySelector("#open-preview");

const examplesToggle=document.querySelector("#examples-toggle");
const examplesMenu=document.querySelector("#examples-menu");

const previewIdInput=document.querySelector("#preview-id-input");
const loadPreviewButton=document.querySelector("#load-preview");

const themeButton=document.querySelector("#theme");

const discoverButton=document.querySelector("#discover");
const discoverTopButton=document.querySelector("#discover-top");
const backToLab=document.querySelector("#back-to-lab");

const labSection=document.querySelector("#lab");
const discoverSection=document.querySelector("#discover-section");
const discoverList=document.querySelector("#discover-list");

let currentId=null;
let currentExpiresAt=null;
let currentPublished=false;
let currentPublicId=null;

function setStatus(text,busy=false){
  statusText.textContent=text;
  status.classList.toggle("busy",busy);
}

function setTheme(light){
  document.body.classList.toggle("light",light);
  themeButton.textContent=light?"☾":"☀";
  localStorage.setItem("vibe-theme",light?"light":"dark");
}

const savedTheme=localStorage.getItem("vibe-theme");
setTheme(savedTheme!=="dark");

themeButton.addEventListener("click",()=>{
  setTheme(!document.body.classList.contains("light"));
});

document.querySelectorAll(".examples-menu button").forEach(button=>{
  button.addEventListener("click",()=>{
    promptInput.value=button.dataset.prompt;
    autoResize();
    examplesMenu.classList.remove("open");
    promptInput.focus();
  });
});

examplesToggle.addEventListener("click",event=>{
  event.stopPropagation();
  examplesMenu.classList.toggle("open");
});

document.addEventListener("click",event=>{
  if(!examplesMenu.contains(event.target)&&!examplesToggle.contains(event.target)){
    examplesMenu.classList.remove("open");
  }
});

function autoResize(){
  promptInput.style.height="auto";
  promptInput.style.height=Math.min(promptInput.scrollHeight,180)+"px";
}

promptInput.addEventListener("input",autoResize);

promptInput.addEventListener("keydown",event=>{
  if(event.key==="Enter"&&!event.shiftKey){
    event.preventDefault();
    createWebsite();
  }
});

function formatCountdown(ms){
  if(ms<=0)return "00:00";

  const totalSeconds=Math.ceil(ms/1000);
  const minutes=Math.floor(totalSeconds/60);
  const seconds=totalSeconds%60;

  return String(minutes).padStart(2,"0")+":"+String(seconds).padStart(2,"0");
}

function updateTimer(){
  if(!currentId){
    expiry.innerHTML="Läuft ab in <strong>--:--</strong>";
    extendButton.hidden=true;
    return;
  }

  if(currentPublished){
    expiry.innerHTML="<strong>Unbegrenzt</strong>";
    extendButton.hidden=true;
    return;
  }

  if(!currentExpiresAt){
    expiry.innerHTML="Läuft ab in <strong>--:--</strong>";
    extendButton.hidden=true;
    return;
  }

  const remaining=currentExpiresAt-Date.now();

  if(remaining<=0){
    expiry.innerHTML="<strong>Abgelaufen</strong>";
    extendButton.hidden=true;
    publishButton.hidden=true;
    setStatus("Preview abgelaufen");
    return;
  }

  expiry.innerHTML=`Läuft ab in <strong>${formatCountdown(remaining)}</strong>`;

  extendButton.hidden=remaining>=5*60*1000;
}

setInterval(updateTimer,1000);

function resetPreviewControls(){
  previewId.textContent="—";
  expiry.innerHTML="Läuft ab in <strong>--:--</strong>";

  extendButton.hidden=true;
  publishButton.hidden=true;
  shareButton.hidden=true;
  openButton.hidden=true;

  currentId=null;
  currentExpiresAt=null;
  currentPublished=false;
  currentPublicId=null;
}

function showPreviewControls(data){
  currentId=data.previewId;
  currentExpiresAt=data.expiresAt;
  currentPublished=Boolean(data.published);
  currentPublicId=data.publicId||null;

  previewId.textContent=currentPublished
    ? currentPublicId
    : currentId;

  publishButton.hidden=currentPublished;
  shareButton.hidden=false;
  openButton.hidden=false;

  const url=currentPublished
    ? `${API_URL}/api/public/${currentPublicId}`
    : `${API_URL}/api/preview/${currentId}`;

  openButton.href=url;

  updateTimer();
}

async function createWebsite(){
  const prompt=promptInput.value.trim();

  if(!prompt)return;

  runButton.disabled=true;
  resetPreviewControls();

  previewEmpty.hidden=false;
  preview.srcdoc="";

  setStatus("Anfrage wird analysiert...",true);

  try{
    const response=await fetch(API_URL+"/api/vibe",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({prompt})
    });

    let data;

    try{
      data=await response.json();
    }catch{
      throw new Error(`HTTP ${response.status}`);
    }

    if(!response.ok){
      throw new Error(data.error||`HTTP ${response.status}`);
    }

    if(!data.html){
      throw new Error("Keine HTML-Vorschau erhalten");
    }

    setStatus("HTML generiert",true);

    preview.srcdoc=data.html;
    previewEmpty.hidden=true;

    showPreviewControls({
      previewId:data.previewId,
      expiresAt:data.expiresAt,
      published:false,
      publicId:null
    });

    preview.onload=()=>{
      setStatus("Vorschau bereit");
    };

    setTimeout(()=>{
      if(statusText.textContent==="HTML generiert"){
        setStatus("Vorschau wird geladen...",true);
      }
    },150);

  }catch(error){
    console.error("VIBE ERROR:",error);

    previewEmpty.hidden=false;
    setStatus("Fehler: "+error.message);
  }finally{
    runButton.disabled=false;
  }
}

runButton.addEventListener("click",createWebsite);

async function loadPreview(id){
  id=id.trim();

  if(!/^[A-Za-z0-9]{4,12}$/.test(id)){
    setStatus("Ungültiger Code");
    return;
  }

  setStatus("Preview wird geladen...",true);

  try{
    const response=await fetch(
      `${API_URL}/api/preview-info/${encodeURIComponent(id)}`
    );

    const data=await response.json();

    if(!response.ok){
      throw new Error(data.error||"Preview nicht gefunden");
    }

    const url=data.published
      ? `${API_URL}/api/public/${data.publicId}`
      : `${API_URL}/api/preview/${data.previewId}`;

    preview.src=url;
    previewEmpty.hidden=true;

    showPreviewControls(data);

    preview.onload=()=>{
      setStatus("Vorschau bereit");
    };

  }catch(error){
    setStatus(error.message);
  }
}

loadPreviewButton.addEventListener("click",()=>{
  loadPreview(previewIdInput.value);
});

previewIdInput.addEventListener("keydown",event=>{
  if(event.key==="Enter"){
    loadPreview(previewIdInput.value);
  }
});

extendButton.addEventListener("click",async()=>{
  if(!currentId||currentPublished)return;

  extendButton.disabled=true;

  try{
    const response=await fetch(
      `${API_URL}/api/preview/${currentId}/extend`,
      {method:"POST"}
    );

    const data=await response.json();

    if(!response.ok){
      throw new Error(data.error||"Verlängern fehlgeschlagen");
    }

    currentExpiresAt=data.expiresAt;
    updateTimer();

  }catch(error){
    setStatus(error.message);
  }finally{
    extendButton.disabled=false;
  }
});

publishButton.addEventListener("click",async()=>{
  if(!currentId||currentPublished)return;

  const confirmed=confirm(
    "Code veröffentlichen?\n\n"+
    "Dein Code und der zugehörige Prompt werden öffentlich zugänglich. "+
    "Jeder kann das Projekt über Entdecken finden und öffnen.\n\n"+
    "Der Code wird für die Veröffentlichung verkürzt und läuft danach nicht mehr ab."
  );

  if(!confirmed)return;

  publishButton.disabled=true;
  setStatus("Projekt wird veröffentlicht...",true);

  try{
    const response=await fetch(
      `${API_URL}/api/preview/${currentId}/publish`,
      {method:"POST"}
    );

    const data=await response.json();

    if(!response.ok){
      throw new Error(data.error||"Veröffentlichung fehlgeschlagen");
    }

    currentPublished=true;
    currentPublicId=data.publicId;
    currentExpiresAt=null;

    previewId.textContent=data.publicId;

    expiry.innerHTML="<strong>Unbegrenzt</strong>";

    publishButton.hidden=true;
    extendButton.hidden=true;

    const publicUrl=
      `${API_URL}/api/public/${data.publicId}`;

    openButton.href=publicUrl;
    openButton.hidden=false;

    shareButton.hidden=false;

    setStatus("Projekt veröffentlicht");

  }catch(error){
    setStatus(error.message);
  }finally{
    publishButton.disabled=false;
  }
});

shareButton.addEventListener("click",async()=>{
  let url;

  if(currentPublished&&currentPublicId){
    url=`${API_URL}/api/public/${currentPublicId}`;
  }else if(currentId){
    url=`${API_URL}/api/preview/${currentId}`;
  }else{
    return;
  }

  try{
    await navigator.clipboard.writeText(url);

    const oldText=shareButton.textContent;
    shareButton.textContent="Kopiert";

    setTimeout(()=>{
      shareButton.textContent=oldText;
    },1500);

  }catch{
    window.prompt("Link kopieren:",url);
  }
});

function showLab(){
  discoverSection.hidden=true;
  labSection.hidden=false;

  window.location.hash="lab";
  window.scrollTo({
    top:labSection.offsetTop-80,
    behavior:"smooth"
  });
}

async function showDiscover(){
  labSection.hidden=true;
  discoverSection.hidden=false;

  window.location.hash="discover";

  discoverList.innerHTML=
    `<div class="discover-loading">Lade Projekte...</div>`;

  try{
    const response=await fetch(API_URL+"/api/discover");
    const projects=await response.json();

    if(!response.ok){
      throw new Error(projects.error||"Laden fehlgeschlagen");
    }

    if(!projects.length){
      discoverList.innerHTML=
        `<div class="discover-empty">
          Noch keine veröffentlichten Projekte.
        </div>`;
      return;
    }

    discoverList.innerHTML="";

    projects.forEach(project=>{
      const card=document.createElement("article");
      card.className="discover-card";

      const top=document.createElement("div");
      top.className="discover-card-top";

      const id=document.createElement("span");
      id.className="discover-card-id";
      id.textContent=project.publicId;

      const date=document.createElement("span");
      date.className="discover-card-id";
      date.textContent=formatDate(project.publishedAt);

      top.append(id,date);

      const title=document.createElement("h3");
      title.textContent=createTitle(project.prompt);

      const description=document.createElement("p");
      description.textContent=project.prompt;

      const open=document.createElement("a");
      open.className="discover-open";
      open.textContent="Öffnen";
      open.target="_blank";
      open.rel="noopener";
      open.href=
        `${API_URL}/api/public/${encodeURIComponent(project.publicId)}`;

      card.append(top,title,description,open);
      discoverList.appendChild(card);
    });

  }catch(error){
    discoverList.innerHTML=
      `<div class="discover-empty">
        ${escapeHtml(error.message)}
      </div>`;
  }
}

function createTitle(prompt){
  const words=prompt.trim().split(/\s+/);

  if(words.length<=7)return prompt;

  return words.slice(0,7).join(" ")+"…";
}

function formatDate(timestamp){
  if(!timestamp)return "";

  const diff=Date.now()-timestamp;
  const minutes=Math.floor(diff/60000);

  if(minutes<1)return "gerade eben";
  if(minutes<60)return `vor ${minutes} Min.`;

  const hours=Math.floor(minutes/60);

  if(hours<24)return `vor ${hours} Std.`;

  const days=Math.floor(hours/24);

  if(days<7)return `vor ${days} Tg.`;

  return new Date(timestamp).toLocaleDateString("de-DE");
}

function escapeHtml(text){
  const div=document.createElement("div");
  div.textContent=text;
  return div.innerHTML;
}

discoverButton.addEventListener("click",showDiscover);
discoverTopButton.addEventListener("click",showDiscover);
backToLab.addEventListener("click",showLab);

if(window.location.hash==="#discover"){
  showDiscover();
}

resetPreviewControls();
setStatus("Bereit");
