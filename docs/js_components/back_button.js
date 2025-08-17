(function() {
  const path = window.location.pathname.replace(/\/+$/, ""); // /index.html → /index.html, / → ""
  if (path === "" || path === "/index.html") return;

  const style = document.createElement("style");
  style.textContent = `
    .global-back-btn {
      all: unset;
      font-family: Mojangles;
      font-size: 16px;
      background-color: #1a1a1a;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.2s ease;
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
    }
    .global-back-btn:hover {
      background-color: #323232;
      transform: scale(1.05);
    }
    @media (max-width: 768px) {
      .global-back-btn {font-size: 14px; padding: 8px 16px;}
    }
    @media (max-width: 480px) {
      .global-back-btn {font-size: 12px; padding: 6px 12px;}
    }
  `;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.textContent = "Zurück";
  btn.className = "global-back-btn";
  btn.setAttribute("aria-label", "Zurück zur vorherigen Seite");

  btn.addEventListener("click", () => {
    if (document.referrer && document.referrer !== location.href) {
      history.back();
    } else {
      window.location.href = "/";
    }
  });

  document.body.appendChild(btn);
})();
