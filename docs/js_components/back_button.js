export function initHeaderButton() {
  if (location.hostname === 'redminer9630.ddns.net') {if (location.pathname === '/' || location.pathname === '/index.html') return;}
  
  const getCookie = (key) => {
    const m = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
    return m ? decodeURIComponent(m[2]) : null;
  };

  const btnColor = getCookie('backBtnColor') || '#f44336';
  const btnHoverColor = getCookie('backBtnHover') || '#e53935';
  const btnTextColor = getCookie('backBtnText') || '#ffffff';
  const visible = getCookie('backBtnVisible');
  if (visible === 'false') return;

  const style = document.createElement('style');
  style.textContent = `
    .header-link {
      font-family: 'Mojangles';
      font-size: 16px;
      padding: 10px 20px;
      border-radius: 8px;
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: ${btnColor};
      color: ${btnTextColor};
      cursor: pointer;
      transition: background-color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .header-link:hover {
      background-color: ${btnHoverColor};
      transform: scale(1.05);
    }
    @media (max-width: 768px) {
      .header-link {
        font-size: 14px;
        padding: 8px 16px;
        top: 12px;
        right: 12px;
        border-radius: 6px;
      }
    }
    @media (max-width: 480px) {
      .header-link {
        font-size: 12px;
        padding: 6px 12px;
        top: 10px;
        right: 10px;
      }
    }
  `;
  document.head.appendChild(style);

  const existing = document.querySelector('.header-link');
  if (existing) {
    existing.style.backgroundColor = btnColor;
    existing.style.color = btnTextColor;
    existing.addEventListener('mouseover', () => existing.style.backgroundColor = btnHoverColor);
    existing.addEventListener('mouseout', () => existing.style.backgroundColor = btnColor);
    return;
  }

  const btn = document.createElement('button');
  btn.className = 'header-link';
  btn.textContent = 'Zurück';
  btn.setAttribute('aria-label', 'Zurück zur vorherigen Seite');
  btn.addEventListener('click', () => history.back());
  document.body.appendChild(btn);
}
