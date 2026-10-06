const prompt = document.querySelector("#prompt");
const run = document.querySelector("#run");
const previewStatus = document.querySelector("#previewStatus");
const statusText = document.querySelector("#statusText");
const preview = document.querySelector("#preview");

document.querySelectorAll(".examples button").forEach(button => {
  button.addEventListener("click", () => {
    prompt.value = button.dataset.prompt;
    prompt.focus();
  });
});

document.querySelector("#demoButton").addEventListener("click", event => {
  const page = event.target.closest(".demo-page");
  page.style.background = page.style.background ? "" : "#dfffa8";
});

run.addEventListener("click", async () => {
  const value = prompt.value.trim();
  if (!value) return;

  // Später ersetzen durch:
  // const response = await fetch("https://DEIN-BACKEND/api/vibe", {
  //   method: "POST",
  //   headers: {"Content-Type":"application/json"},
  //   body: JSON.stringify({prompt:value})
  // });
  // const result = await response.json();

  run.disabled = true;
  previewStatus.textContent = "KI arbeitet …";
  statusText.textContent = "Demo läuft";

  const stages = [
    ["Prompt analysieren …", 700],
    ["Projekt planen …", 800],
    ["Code generieren …", 1100],
    ["Vorschau vorbereiten …", 700]
  ];

  for (const [text, delay] of stages) {
    previewStatus.textContent = text;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  const title = value.match(/["„]([^"”]+)["”]/)?.[1] || "Deine Website";
  preview.innerHTML = `
    <div class="demo-page">
      <div class="demo-dot"></div>
      <h3>${escapeHtml(title)}</h3>
      <p>Diese Vorschau wurde aus deinem Prompt erzeugt.</p>
      <button onclick="alert('Das ist die Demo-Vorschau. Später kommt hier dein echtes KI-generiertes Projekt hin.')">Ausprobieren</button>
      <small>Vibe Coding · Demo</small>
    </div>
  `;

  previewStatus.textContent = "Fertig";
  statusText.textContent = "Demo-Modus";
  run.disabled = false;
});

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
