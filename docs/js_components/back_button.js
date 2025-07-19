export function initHeaderButton() {
  if (location.hostname === 'redminer9630.ddns.net') {
    if (location.pathname === '/' || location.pathname === '/index.html') return;
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('showButton') !== '1') return;
  }

  const getCookie = (key) => {
    const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const btnColor = getCookie('backBtnColor') || '#f44336';
  const btnHoverColor = getCookie('backBtnHover') || '#e53935';
  const btnTextColor = getCookie('backBtnText') || '#ffffff';
  const btnVisible = getCookie('backBtnVisible') !== 'false';

  if (!btnVisible) return;

  const style = document.createElement('style');
  style.textContent = `
    :root {
      --btn-color: ${btnColor};
      --btn-hover-color: ${btnHoverColor};
      --btn-text-color: ${btnTextColor};
    }

    .header-link {
      font-family: 'Mojangles';
      font-size: 16px;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 8px;
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: var(--btn-color);
      color: var(--btn-text-color);
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .header-link:hover { background-color: var(--btn-hover-color); transform: scale(1.05); }

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

  const backButton = document.createElement('button');
  backButton.className = 'header-link';
  backButton.textContent = 'Zurück';
  backButton.setAttribute('aria-label', 'Zurück zur vorherigen Seite');
  backButton.addEventListener('click', () => history.back());
  document.body.appendChild(backButton);
}
