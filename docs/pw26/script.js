const API_URL="https://each-organ-selling-fraser.trycloudflare.com";

const promptInput=document.querySelector("#prompt");
const runButton=document.querySelector("#run");
const preview=document.querySelector("#preview");
const openButton=document.querySelector("#open-preview");
const emptyPreview=document.querySelector("#preview-empty");

const step1=document.querySelector("#step1");
const step2=document.querySelector("#step2");
const step3=document.querySelector("#step3");

const themeToggle=document.querySelector("#theme-toggle");
const themeIcon=document.querySelector("#theme-icon");

const savedTheme=localStorage.getItem("vibe-theme");

if(savedTheme==="light"){
  document.body.classList.add("light");
  themeIcon.textContent="☀";
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
  setStep(1,"","");
  setStep(2,"","");
  setStep(3,"");

  step1.querySelector("small").textContent="Wartet auf Anfrage";
  step2.querySelector("small").textContent="HTML erstellen";
  step3.querySelector("small").textContent="Ergebnis laden";
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
      openButton.href=API_URL+"/api/preview/"+data.previewId;
      openButton.hidden=false;
    }

    preview.onload=()=>{
      setStep(3,"done","Vorschau bereit");
    };
  }catch(error){
    console.error("VIBE ERROR:",error);

    setStep(2,"","Fehler: "+error.message);
    setStep(3,"","");

    if(error.message.startsWith("HTTP")){
      step2.querySelector("small").textContent="Serverfehler";
    }
  }finally{
    runButton.disabled=false;
  }
});
