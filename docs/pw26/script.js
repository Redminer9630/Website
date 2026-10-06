const API_URL="https://each-organ-selling-fraser.trycloudflare.com";

const promptInput=document.querySelector("#prompt");
const runButton=document.querySelector("#run");
const preview=document.querySelector("#preview");
const openButton=document.querySelector("#open-preview");
const emptyPreview=document.querySelector("#preview-empty");
const step1=document.querySelector("#step1");
const step2=document.querySelector("#step2");
const step3=document.querySelector("#step3");

document.querySelectorAll(".examples button").forEach(button=>{
  button.addEventListener("click",()=>{
    promptInput.value=button.dataset.prompt;
  });
});

runButton.addEventListener("click",async()=>{
  const prompt=promptInput.value.trim();

  if(!prompt)return;

  runButton.disabled=true;

  step1.classList.add("active");
  step1.classList.remove("done");
  step2.classList.remove("active","done");
  step3.classList.remove("active","done");

  step1.querySelector("small").textContent="Anfrage wird verarbeitet...";

  try{
    await new Promise(resolve=>setTimeout(resolve,300));

    step1.classList.remove("active");
    step1.classList.add("done");
    step1.querySelector("small").textContent="Prompt analysiert";

    step2.classList.add("active");
    step2.querySelector("small").textContent="Gemini generiert HTML...";

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

    step2.classList.remove("active");
    step2.classList.add("done");
    step2.querySelector("small").textContent="HTML generiert";

    step3.classList.add("active");
    step3.querySelector("small").textContent="Vorschau wird geladen...";

    preview.srcdoc=data.html;
    emptyPreview.hidden=true;

    if(data.previewId){
      openButton.href=API_URL+"/api/preview/"+data.previewId;
      openButton.hidden=false;
    }

    preview.onload=()=>{
      step3.classList.remove("active");
      step3.classList.add("done");
      step3.querySelector("small").textContent="Vorschau bereit";
    };
  }catch(error){
    console.error("VIBE ERROR:",error);

    step2.classList.remove("active");
    step2.querySelector("small").textContent="Fehler: "+error.message;

    step3.classList.remove("active");
  }finally{
    runButton.disabled=false;
  }
});
