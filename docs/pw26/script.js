const API_URL="https://each-organ-selling-fraser.trycloudflare.com";

const promptInput=document.querySelector("#prompt");
const runButton=document.querySelector("#run");
const preview=document.querySelector("#preview");
const emptyPreview=document.querySelector("#preview-empty");

const step1=document.querySelector("#step1");
const step2=document.querySelector("#step2");
const step3=document.querySelector("#step3");

const expiry=document.querySelector("#expiry");
const extendButton=document.querySelector("#extend");
const shareButton=document.querySelector("#share");
const openButton=document.querySelector("#open-preview");

const idInput=document.querySelector("#preview-id-input");
const loadButton=document.querySelector("#load-preview");

const themeToggle=document.querySelector("#theme-toggle");
const themeIcon=document.querySelector("#theme-icon");

let currentId="";
let expiresAt=0;

function setTheme(light){
  document.body.classList.toggle("light",light);
  themeIcon.textContent=light?"☀":"☾";
  localStorage.setItem("vibe-theme",light?"light":"dark");
}

setTheme(localStorage.getItem("vibe-theme")!=="dark");

themeToggle.addEventListener("click",()=>{
  setTheme(!document.body.classList.contains("light"));
});

document.querySelectorAll(".examples button").forEach(button=>{
  button.addEventListener("click",()=>{
    promptInput.value=button.dataset.prompt;
    promptInput.focus();
    autoResize();
  });
});

function autoResize(){
  promptInput.style.height="auto";
  promptInput.style.height=Math.min(promptInput.scrollHeight,130)+"px";
}

promptInput.addEventListener("input",autoResize);

promptInput.addEventListener("keydown",event=>{
  if(event.key==="Enter"&&!event.shiftKey){
    event.preventDefault();
    runButton.click();
  }
});

function setStep(element,state,text){
  element.classList.remove("active","done");

  if(state){
    element.classList.add(state);
  }

  if(text){
    element.querySelector("small").textContent=text;
  }
}

function resetSteps(){
  setStep(step1,"","Wartet auf Anfrage");
  setStep(step2,"","HTML erstellen");
  setStep(step3,"","Ergebnis laden");
}

function showExpiry(){
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

  expiry.textContent="Läuft bis "+date.toLocaleTimeString("de-DE",{
    hour:"2-digit",
    minute:"2-digit"
  });

  extendButton.hidden=remaining>=5*60*1000;
}

function showPreview(id){
  const url=API_URL+"/api/preview/"+id;

  preview.src=url;
  emptyPreview.hidden=true;

  openButton.href=url;
  openButton.hidden=false;

  shareButton.hidden=false;

  currentId=id;
  idInput.value=id;
}

async function loadPreview(id){
  id=id.trim();

  if(!/^[A-Za-z0-9]{6}$/.test(id)){
    expiry.textContent="ID muss 6 Zeichen haben";
    return;
  }

  const response=await fetch(
    API_URL+"/api/preview-info/"+id
  );

  if(!response.ok){
    expiry.textContent="Preview nicht gefunden";
    return;
  }

  const data=await response.json();

  expiresAt=data.expiresAt;

  showPreview(id);
  showExpiry();
}

runButton.addEventListener("click",async()=>{
  const prompt=promptInput.value.trim();

  if(!prompt)return;

  runButton.disabled=true;
  resetSteps();

  setStep(
    step1,
    "active",
    "Anfrage wird verarbeitet..."
  );

  try{

    await new Promise(resolve=>setTimeout(resolve,250));

    setStep(
      step1,
      "done",
      "Prompt analysiert"
    );

    setStep(
      step2,
      "active",
      "Gemini generiert HTML..."
    );

    const response=await fetch(
      API_URL+"/api/vibe",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({prompt})
      }
    );

    const data=await response.json();

    if(!response.ok){
      throw new Error(
        data.error||`HTTP ${response.status}`
      );
    }

    if(!data.html){
      throw new Error("Keine HTML-Vorschau erhalten");
    }

    setStep(
      step2,
      "done",
      "HTML generiert"
    );

    setStep(
      step3,
      "active",
      "Vorschau wird geladen..."
    );

    preview.srcdoc=data.html;
    emptyPreview.hidden=true;

    if(data.previewId){
      currentId=data.previewId;
      expiresAt=data.expiresAt;

      idInput.value=data.previewId;

      const url=API_URL+"/api/preview/"+data.previewId;

      openButton.href=url;
      openButton.hidden=false;
      shareButton.hidden=false;

      showExpiry();
    }

    preview.onload=()=>{
      setStep(
        step3,
        "done",
        "Vorschau bereit"
      );
    };

  }catch(error){

    console.error("VIBE ERROR:",error);

    setStep(
      step2,
      "",
      error.message
    );

    setStep(
      step3,
      "",
      "Nicht geladen"
    );

  }finally{
    runButton.disabled=false;
  }
});

loadButton.addEventListener("click",async()=>{
  loadButton.disabled=true;

  try{
    await loadPreview(idInput.value);
  }catch(error){
    console.error(error);
    expiry.textContent="Fehler beim Laden";
  }

  loadButton.disabled=false;
});

idInput.addEventListener("input",()=>{
  idInput.value=idInput.value
    .replace(/[^A-Za-z0-9]/g,"")
    .slice(0,6);
});

idInput.addEventListener("keydown",event=>{
  if(event.key==="Enter"){
    loadButton.click();
  }
});

shareButton.addEventListener("click",async()=>{
  if(!currentId)return;

  const url=API_URL+"/api/preview/"+currentId;

  try{
    await navigator.clipboard.writeText(url);

    const old=shareButton.textContent;
    shareButton.textContent="Kopiert";

    setTimeout(()=>{
      shareButton.textContent=old;
    },1400);

  }catch{
    window.prompt("Preview-Link:",url);
  }
});

extendButton.addEventListener("click",async()=>{
  if(!currentId)return;

  extendButton.disabled=true;

  try{

    const response=await fetch(
      API_URL+"/api/preview/"+currentId+"/extend",
      {
        method:"POST"
      }
    );

    const data=await response.json();

    if(!response.ok){
      throw new Error(data.error||"Fehler");
    }

    expiresAt=data.expiresAt;
    showExpiry();

  }catch(error){
    console.error("EXTEND ERROR:",error);
  }

  extendButton.disabled=false;
});

setInterval(showExpiry,1000);

resetSteps();
showExpiry();
