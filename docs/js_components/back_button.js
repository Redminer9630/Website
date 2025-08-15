export function initHeaderButton() {
    if (location.pathname === "/" || location.pathname === "/index.html") return;

    const backBtnHost = document.createElement("div");
    const shadow = backBtnHost.attachShadow({ mode: "open" });

    shadow.innerHTML = `
        <style>
            :host {all: initial;}
            button {
                all: unset;
                font-family: Mojangles;
                font-size: 16px;
                background-color: #1a1a1a;
                color: white;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                transition: background-color 0.2s ease, transform 0.2s ease;
            }
            button:hover { background-color: #323232; transform: scale(1.05); }
            @media (max-width: 768px) {button {font-size: 14px; padding: 8px 16px;}}
            @media (max-width: 480px) {button {font-size: 12px; padding: 6px 12px;}}
        </style>
        <button id="backBtn" aria-label="Zurück zur vorherigen Seite">Zurück</button>
    `;

    document.body.appendChild(backBtnHost);

    shadow.querySelector("#backBtn").addEventListener("click", () => {
        history.back();
    });
}
