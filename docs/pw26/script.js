const API_URL="https://each-organ-selling-fraser.trycloudflare.com";

const promptInput=document.querySelector("#prompt");
const runButton=document.querySelector("#run");
const preview=document.querySelector("#preview");
const openButton=document.querySelector("#open-preview");
const status=document.querySelector("#status");

document.querySelectorAll(".examples button").forEach(button=>{
  button.addEventListener("click",()=>{
    promptInput.value=button.dataset.prompt;
    promptInput.focus();
  });
});

runButton.addEventListener("click",async()=>{
  const prompt=promptInput.value.trim();

  if(!prompt){
    status.textContent="Bitte zuerst einen Prompt eingeben.";
    return;
  }

  runButton.disabled=true;
  status.textContent="KI generiert deine Anwendung...";
  openButton.hidden=true;

  try{
    const response=await fetch(`${API_URL}/api/vibe`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({prompt})
    });

    if(!response.ok){
      throw new Error(`HTTP ${response.status}`);
    }

    const data=await response.json();

    preview.srcdoc=data.html;
    status.textContent="Vorschau bereit";

    if(data.previewId){
      openButton.href=`${API_URL}/api/preview/${data.previewId}`;
      openButton.hidden=false;
    }
  }catch(error){
    console.error(error);
    status.textContent="Fehler bei der Generierung";
  }finally{
    runButton.disabled=false;
  }
});
