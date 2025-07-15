export function initHeaderButton() {
  if (location.hostname === 'redminer9630.ddns.net') {
    if (location.pathname === '/' || location.pathname === '/index.html') return;

    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('showButton') !== '1') return;
  }

const style = document.createElement('style');
style.textContent = `
    .header-link {
        font-family: 'Mojangles';
        font-size: 16px;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 8px;
        position: absolute;
        top: 20px;
        right: 20px;
        background-color: #f44336;
        color: white;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: auto;
        height: auto;
    }

    .header-link:hover {
        background-color: #e53935;
    }

    @media (max-width: 768px) {
        .header-link {
            font-size: 12px;
            width: 80px;
            height: 32px;
            padding: 0;
            top: 10px;
            right: 10px;
            border-radius: 6px;
        }
    }
`;
  document.head.appendChild(style);

  const backButton = document.createElement('div');
  backButton.className = 'header-link';
  backButton.textContent = 'Zurück';
  backButton.addEventListener('click', () => history.back());
  document.body.appendChild(backButton);
}
