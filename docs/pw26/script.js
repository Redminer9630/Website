const API_URL="https://each-organ-selling-fraser.trycloudflare.com";

const promptInput=document.querySelector("#prompt");
const runButton=document.querySelector("#run");
const preview=document.querySelector("#preview");
const openButton=document.querySelector("#open-preview");
const emptyPreview=document.querySelector("#preview-empty");

const step1=document.querySelector("#step1");
const step2=document.querySelector("#step2");
const step3=document.querySelector("#step3");

const expiry=document.querySelector("#expiry");
const extendButton=document.querySelector("#extend");
const shareButton=document.querySelector("#share");

const idInput=document.querySelector("#preview-id-input");
const loadButton=document.querySelector("#load-preview");

const themeToggle=document.querySelector("#theme-toggle");
const themeIcon=document.querySelector("#theme-icon");

let currentPreviewId="";
let expiresAt=0;

const savedTheme=localStorage.getItem("vibe-theme");

if(savedTheme!=="dark"){
  document.body.classList.add("light");
  themeIcon.textContent="☀";
}else{
  themeIcon.textContent="☾";
}

themeToggle.addEventListener("click",()=>{
  const light=document.body.classList.toggle("light");

  localStorage.setItem("vibe-theme",light?"light":"dark");
  themeIcon.textContent=light?"☀":"☾";
});

document.querySelectorAll(".examples button").forEach(button=>{
  button.addEventListener("click",()=>{
    promptInput.value=button.dataset.prompt;
    promptInput.focus();
  });
});

function setStep(step,state,text){
  const element=[null,step1,step2,step3][step];

  if(!element)return;

  element.classList.toggle("active",state==="active");
  element.classList.toggle("done",state==="done");

  const small=element.querySelector("small");

  if(small&&text){
    small.textContent=text;
  }
}

function resetSteps(){
  setStep(1,"");
  setStep(2,"");
  setStep(3,"");

  step1.querySelector("small").textContent="Wartet auf Anfrage";
  step2.querySelector("small").textContent="HTML erstellen";
  step3.querySelector("small").textContent="Ergebnis laden";
}

function updateExpiry(){
  if(!expiresAt){
    expiry.textContent="Noch nicht erstellt";
    extendButton.hidden=true;
    return;
  }

  const remaining=expiresAt-Date.now();

  if(remaining<=0){
    expiry.textContent="Abgelaufen";
    extendButton.hidden=true;
    return;
  }

  const date=new Date(expiresAt);

  expiry.textContent=`Läuft bis ${date.toLocaleTimeString("de-DE",{
    hour:"2-digit",
    minute:"2-digit"
  })}`;

  extendButton.hidden=remaining>=5*60*1000;
}

async function loadPreview(id){
  if(!/^[A-Za-z0-9]{6}$/.test(id)){
    expiry.textContent="Ungültige ID";
    return;
  }

  const response=await fetch(`${API_URL}/api/preview/${id}`);

  if(!response.ok){
    expiry.textContent="Preview nicht gefunden";
    return;
  }

  currentPreviewId=id;

  const url=`${API_URL}/api/preview/${id}`;

  preview.src=url;
  emptyPreview.hidden=true;

  openButton.href=url;
  openButton.hidden=false;

  shareButton.hidden=false;

  idInput.value=id;

  try{
    const head=await fetch(url,{method:"HEAD"});
    const expires=head.headers.get("x-preview-expires");

    if(expires){
      expiresAt=Number(expires);
    }
  }catch{}

  updateExpiry();
}

runButton.addEventListener("click",async()=>{
  const prompt=promptInput.value.trim();

  if(!prompt)return;

  runButton.disabled=true;
  resetSteps();

  setStep(1,"active","Anfrage wird verarbeitet...");

  try{
    await new Promise(resolve=>setTimeout(resolve,300));

    setStep(1,"done","Prompt analysiert");
    setStep(2,"active","Gemini generiert HTML...");

    const response=await fetch(API_URL+"/api/vibe",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt})
    });

    if(!response.ok){
      throw new Error(`HTTP ${response.status}`);
    }

    const data=await response.json();

    if(!data.html){
      throw new Error("Keine HTML-Vorschau erhalten");
    }

    setStep(2,"done","HTML generiert");
    setStep(3,"active","Vorschau wird geladen...");

    preview.srcdoc=data.html;
    emptyPreview.hidden=true;

    if(data.previewId){
      currentPreviewId=data.previewId;
      idInput.value=data.previewId;

      const url=API_URL+"/api/preview/"+data.previewId;

      openButton.href=url;
      openButton.hidden=false;
      shareButton.hidden=false;

      expiresAt=data.expiresAt||Date.now()+15*60*1000;

      updateExpiry();
    }

    preview.onload=()=>{
      setStep(3,"done","Vorschau bereit");
    };

  }catch(error){
    console.error("VIBE ERROR:",error);

    setStep(2,"","Fehler: "+error.message);
    setStep(3,"","");
  }finally{
    runButton.disabled=false;
  }
});

loadButton.addEventListener("click",async()=>{
  const id=idInput.value.trim();

  if(!id)return;

  loadButton.disabled=true;

  try{
    await loadPreview(id);
  }catch(error){
    console.error(error);
    expiry.textContent="Fehler beim Laden";
  }finally{
    loadButton.disabled=false;
  }
});

idInput.addEventListener("input",()=>{
  idInput.value=idInput.value.replace(/[^A-Za-z0-9]/g,"").slice(0,6);
});

idInput.addEventListener("keydown",event=>{
  if(event.key==="Enter"){
    loadButton.click();
  }
});

shareButton.addEventListener("click",async()=>{
  if(!currentPreviewId)return;

  const url=API_URL+"/api/preview/"+currentPreviewId;

  try{
    await navigator.clipboard.writeText(url);

    const old=shareButton.textContent;
    shareButton.textContent="Kopiert";

    setTimeout(()=>{
      shareButton.textContent=old;
    },1500);
  }catch{
    prompt("Preview-Link:",url);
  }
});

extendButton.addEventListener("click",async()=>{
  if(!currentPreviewId)return;

  extendButton.disabled=true;

  try{
    const response=await fetch(
      `${API_URL}/api/preview/${currentPreviewId}/extend`,
      {method:"POST"}
    );

    if(!response.ok){
      throw new Error("Verlängerung fehlgeschlagen");
    }

    const data=await response.json();

    expiresAt=data.expiresAt;
    updateExpiry();

    extendButton.textContent="+5 Min.";
  }catch(error){
    console.error(error);
  }finally{
    extendButton.disabled=false;
  }
});

setInterval(updateExpiry,1000);
updateExpiry();
