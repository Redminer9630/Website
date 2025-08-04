export function initHeaderButton() {
  const ref = document.referrer;
  const urlParams = new URLSearchParams(location.search);
  const fromParam = urlParams.get('from');

  if (!ref.includes('redminer9630.ddns.net') && fromParam !== 'main') return;

  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.top = '20px';
  wrapper.style.right = '20px';
  wrapper.style.zIndex = '999999999';
  const shadow = wrapper.attachShadow({ mode: 'open' });

  shadow.innerHTML = `
    <style>
      :host {all: initial;}
      button {all: unset;font-family: Arial;font-size: 16px;background-color: #f44336;color: white;padding: 10px 20px;border-radius: 8px;cursor: pointer;transition: background-color 0.2s ease, transform 0.2s ease;}
      button:hover {background-color: #e53935;transform: scale(1.05);}
      @media (max-width: 768px) {button {font-size: 14px;padding: 8px 16px;}}
      @media (max-width: 480px) {button {font-size: 12px;padding: 6px 12px;}}
    </style>
    <button id="backBtn" aria-label="Zurück zur vorherigen Seite">Zurück</button>
  `;

  shadow.querySelector('#backBtn')?.addEventListener('click', () => history.back());
  document.body.appendChild(wrapper);
}
