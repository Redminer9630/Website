
const API_URL="https://each-organ-selling-fraser.trycloudflare.com";

const promptInput=document.querySelector("#prompt");
const runButton=document.querySelector("#run");
const preview=document.querySelector("#preview");
const openButton=document.querySelector("#open-preview");
const emptyPreview=document.querySelector("#preview-empty");
const steps=[1,2,3].map(n=>document.querySelector("#step"+n));
const progressFill=document.querySelector("#progress-fill");
const generationLabel=document.querySelector("#generation-label");

function setProgress(current,label){
  const percentage=[0,35,70,100][current]??0;
  progressFill.style.width=percentage+"%";
  generationLabel.textContent=label;

  steps.forEach((step,index)=>{
    step.classList.toggle("active",index+1===current);
    step.classList.toggle("done",index+1<current);
  });
}

function setStepText(index,title,detail){
  const step=steps[index];
  step.querySelector("b").textContent=title;
  step.querySelector("small").textContent=detail;
}

document.querySelectorAll(".examples button").forEach(button=>{
  button.addEventListener("click",()=>{
    promptInput.value=button.dataset.prompt;
    promptInput.focus();
  });
});

runButton.addEventListener("click",async()=>{
  const prompt=promptInput.value.trim();
  if(!prompt)return;

  runButton.disabled=true;
  openButton.hidden=true;

  setStepText(0,"Analysieren","Anfrage wird verarbeitet...");
  setStepText(1,"Generieren","Wartet auf Gemini");
  setStepText(2,"Vorschau","Wartet auf HTML");
  setProgress(1,"Analysiere deine Idee...");

  try{
    setStepText(0,"Analysieren","Prompt wird geprüft");

    const response=await fetch(API_URL+"/api/vibe",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt})
    });

    if(!response.ok)throw new Error("HTTP "+response.status);

    setProgress(2,"HTML wird generiert...");
    setStepText(0,"Analysieren","Abgeschlossen");
    setStepText(1,"Generieren","Gemini erstellt HTML...");

    const data=await response.json();
    if(!data.html)throw new Error("Keine HTML-Vorschau erhalten");

    setStepText(1,"Generieren","HTML erfolgreich erstellt");
    setStepText(2,"Vorschau","Vorschau wird geladen...");
    setProgress(3,"Lade deine Vorschau...");

    preview.onload=()=>{
      setProgress(0,"Vorschau bereit");
      progressFill.style.width="100%";
      steps.forEach(step=>{
        step.classList.remove("active");
        step.classList.add("done");
      });
      setStepText(2,"Vorschau","Bereit");
    };

    preview.srcdoc=data.html;
    emptyPreview.hidden=true;

    if(data.previewId){
      openButton.href=API_URL+"/api/preview/"+data.previewId;
      openButton.hidden=false;
    }
  }catch(error){
    console.error("VIBE ERROR:",error);
    setProgress(2,"Fehler: "+error.message);
    setStepText(1,"Generieren","Fehler: "+error.message);
    steps[1].classList.add("active");
    steps[1].classList.remove("done");
    steps[2].classList.remove("active");
  }finally{
    runButton.disabled=false;
  }
});
