const API_URL="https://each-organ-selling-fraser.trycloudflare.com";
const promptInput=document.querySelector("#prompt");
const runButton=document.querySelector("#run");
const preview=document.querySelector("#preview");
const openButton=document.querySelector("#open-preview");
const status=document.querySelector("#statusText");
const previewEmpty=document.querySelector("#preview-empty");

const steps=[
  document.querySelector("#step1"),
  document.querySelector("#step2"),
  document.querySelector("#step3")
];

function setStep(index){
  steps.forEach((step,i)=>{
    step.classList.toggle("active",i===index);
    step.classList.toggle("done",i<index);
  });
}

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
  openButton.hidden=true;
  previewEmpty.hidden=false;
  status.textContent="KI analysiert deinen Prompt...";
  setStep(0);

  await new Promise(resolve=>setTimeout(resolve,400));

  status.textContent="Code wird generiert...";
  setStep(1);

  try{
    const response=await fetch(`${API_URL}/api/vibe`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt})
    });

    if(!response.ok) throw new Error(`HTTP ${response.status}`);

    const data=await response.json();

    preview.srcdoc=data.html;
    previewEmpty.hidden=true;

    setStep(2);
    status.textContent="Vorschau bereit";

    if(data.previewId){
      openButton.href=`${API_URL}/api/preview/${data.previewId}`;
      openButton.hidden=false;
    }
  }catch(error){
    console.error(error);
    status.textContent="Fehler bei der Generierung";
    previewEmpty.hidden=false;
  }finally{
    runButton.disabled=false;
  }
});
