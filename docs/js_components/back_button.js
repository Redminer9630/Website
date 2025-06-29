export function initHeaderButton() {
    if (location.pathname === '/' || location.pathname === '/index.html') return;

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
        }
        .header-link:hover { background-color: #e53935; }
    `;
    document.head.appendChild(style);

    const backButton = document.createElement('div');
    backButton.className = 'header-link';
    backButton.textContent = 'Zurück';
    backButton.addEventListener('click', () => history.back());
    document.body.appendChild(backButton);
}
