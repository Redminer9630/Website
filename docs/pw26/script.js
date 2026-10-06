const API_URL = "https://each-organ-selling-fraser.trycloudflare.com";

const promptInput = document.querySelector("#prompt");
const runButton = document.querySelector("#run");
const preview = document.querySelector("#preview");
const openButton = document.querySelector("#open-preview");
const status = document.querySelector("#status");

runButton.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    status.textContent = "Bitte beschreibe zuerst, was erstellt werden soll.";
    return;
  }

  runButton.disabled = true;
  openButton.hidden = true;
  status.textContent = "KI prüft die Anfrage...";

  try {
    const response = await fetch(`${API_URL}/api/vibe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    preview.srcdoc = data.html;

    if (data.previewId) {
      openButton.href = `${API_URL}/api/preview/${data.previewId}`;
      openButton.hidden = false;
    }

    status.textContent = "Fertig.";
  } catch (error) {
    console.error(error);
    status.textContent = "Verbindung zum Vibe-Coding-Server fehlgeschlagen.";
  } finally {
    runButton.disabled = false;
  }
});
