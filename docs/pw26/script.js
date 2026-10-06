const API_URL="https://each-organ-selling-fraser.trycloudflare.com";

const promptInput=document.querySelector("#prompt");
const runButton=document.querySelector("#run");
const preview=document.querySelector("#preview");
const openButton=document.querySelector("#open-preview");
const statusText=document.querySelector("#statusText");

runButton.addEventListener("click",async()=>{
  console.log("BUTTON CLICK");

  const prompt=promptInput.value.trim();

  if(!prompt){
    statusText.textContent="Bitte zuerst einen Prompt eingeben.";
    return;
  }

  runButton.disabled=true;
  statusText.textContent="KI generiert...";

  try{
    console.log("SENDING REQUEST");

    const response=await fetch(API_URL+"/api/vibe",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt})
    });

    console.log("RESPONSE:",response.status);

    if(!response.ok){
      throw new Error(`HTTP ${response.status}`);
    }

    const data=await response.json();

    console.log("DATA:",data);

    preview.srcdoc=data.html;
    statusText.textContent="Vorschau bereit";

    if(data.previewId){
      openButton.href=API_URL+"/api/preview/"+data.previewId;
      openButton.hidden=false;
    }
  }catch(error){
    console.error("VIBE ERROR:",error);
    statusText.textContent="Fehler: "+error.message;
  }finally{
    runButton.disabled=false;
  }
});
