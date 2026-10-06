console.log("VIBE SCRIPT LOADED");

const API_URL="https://each-organ-selling-fraser.trycloudflare.com";

const promptInput=document.querySelector("#prompt");
const runButton=document.querySelector("#run");
const preview=document.querySelector("#preview");
const openButton=document.querySelector("#open-preview");
const status=document.querySelector("#status");

console.log("BUTTON:",runButton);
console.log("PROMPT:",promptInput);

runButton.addEventListener("click",async()=>{
  console.log("BUTTON CLICK");

  const prompt=promptInput.value.trim();

  if(!prompt){
    status.textContent="Bitte zuerst einen Prompt eingeben.";
    return;
  }

  runButton.disabled=true;
  status.textContent="KI generiert...";

  try{
    console.log("SENDING REQUEST");

    const response=await fetch(API_URL+"/api/vibe",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt})
    });

    console.log("RESPONSE:",response.status);

    const data=await response.json();

    console.log("DATA:",data);

    preview.srcdoc=data.html;
    status.textContent="Vorschau bereit";

    if(data.previewId){
      openButton.href=API_URL+"/api/preview/"+data.previewId;
      openButton.hidden=false;
    }
  }catch(error){
    console.error("VIBE ERROR:",error);
    status.textContent="Fehler: "+error.message;
  }finally{
    runButton.disabled=false;
  }
});
