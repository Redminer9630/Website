export function initHeaderButton() {
  const pathname = location.pathname.toLowerCase().replace(/\/+$/, ''); // Slashes am Ende entfernen

  // Domainspezifische Startseiten-Erkennung:
  const isRoot = (
    pathname === '' ||
    pathname === '/' ||
    pathname.endsWith('/index') ||
    pathname.endsWith('/index.html')
  );

  if (isRoot) return; // Abbrechen, wenn Startseite

  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.top = '20px';
  wrapper.style.right = '20px';
  wrapper.style.zIndex = '999999999';
  const shadow = wrapper.attachShadow({ mode: 'open' });

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
      button:hover {
        background-color: #323232;
        transform: scale(1.05);
      }
      @media (max-width: 768px) {
        button {font-size: 14px; padding: 8px 16px;}
      }
      @media (max-width: 480px) {
        button {font-size: 12px; padding: 6px 12px;}
      }
    </style>
    <button id="backBtn" aria-label="Zurück zur vorherigen Seite">Zurück</button>
  `;

  shadow.querySelector('#backBtn')?.addEventListener('click', () => history.back());
  document.body.appendChild(wrapper);
}
