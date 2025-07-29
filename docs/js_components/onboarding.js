export function startOnboarding(steps) {
  if (localStorage.getItem("onboardingSeen")) return;

  let step = 0;

  const overlay = document.createElement("div");
  overlay.id = "onboarding-overlay";
  overlay.innerHTML = `
    <div id="onboarding-highlight"></div>
    <div id="onboarding-tooltip">
      <div id="onboarding-text"></div>
      <button id="onboarding-next">Weiter</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const css = document.createElement("style");
  css.textContent = `
    #onboarding-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.7);
      z-index: 9999;
    }
    #onboarding-highlight {
      position: absolute;
      border: 3px solid #00ffff;
      border-radius: 8px;
      box-shadow: 0 0 15px #00ffff;
      pointer-events: none;
      z-index: 10000;
    }
    #onboarding-tooltip {
      position: absolute;
      display: none;
      background: white;
      color: black;
      padding: 12px 16px;
      border-radius: 10px;
      max-width: 300px;
      z-index: 10001;
      box-shadow: 0 0 10px rgba(0,0,0,0.4);
    }
    #onboarding-tooltip button {
      margin-top: 10px;
      padding: 5px 10px;
    }
  `;
  document.head.appendChild(css);

  const highlight = overlay.querySelector("#onboarding-highlight");
  const tooltip = overlay.querySelector("#onboarding-tooltip");
  const text = overlay.querySelector("#onboarding-text");
  const btnNext = overlay.querySelector("#onboarding-next");

  function nextStep() {
    if (step >= steps.length) {
      overlay.remove();
      localStorage.setItem("onboardingSeen", "true");
      return;
    }

    const { selector, message } = steps[step];
    const target = document.querySelector(selector);

    if (!target) {
      step++;
      nextStep();
      return;
    }

    const rect = target.getBoundingClientRect();
    const offset = 8;
    highlight.style.top = (rect.top - offset) + "px";
    highlight.style.left = (rect.left - offset) + "px";
    highlight.style.width = (rect.width + offset * 2) + "px";
    highlight.style.height = (rect.height + offset * 2) + "px";

    tooltip.style.top = (rect.bottom + 12) + "px";
    tooltip.style.left = rect.left + "px";
    text.textContent = message;
    tooltip.style.display = "block";

    step++;
  }

  btnNext.addEventListener("click", nextStep);
  nextStep();
}
