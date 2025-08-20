export const functionsData = [
  {
    title: "Taschenrechner",
    desc: "Ein einfacher und schneller Taschenrechner in der Suche",
    alias: ["calculator", "rechner", "calc"],
    url: "#",
    run: () => {
      const container = document.createElement("div");
      container.innerHTML = `
        <h3>Taschenrechner</h3>
        <input type="text" id="calc-input" placeholder="z.B. 5+7*2" style="width:200px; padding:4px;" />
        <button id="calc-btn">=</button>
        <span id="calc-output"></span>
      `;
      document.getElementById("results").appendChild(container);

      const input = container.querySelector("#calc-input");
      const output = container.querySelector("#calc-output");
      const btn = container.querySelector("#calc-btn");

      btn.addEventListener("click", () => {
        try {
          const result = Function(`"use strict"; return (${input.value})`)();
          output.textContent = " " + result;
        } catch {
          output.textContent = " Fehler";
        }
      });
    }
  }
  }
];
