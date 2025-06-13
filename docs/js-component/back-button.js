document.addEventListener('DOMContentLoaded', () => {
    if (location.pathname === '/' || location.pathname === '/index.html') return;

    const style = document.createElement('style');
    style.textContent = `
        @font-face {
            font-family: 'MinecraftFont';
            src: url('https://redminer9630.ddns.net/minecraft_font.woff') format('woff'),
                 url('https://redminer9630.ddns.net/minecraft_font.ttf') format('truetype');
        }
        .header-link {
            font-family: 'MinecraftFont';
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
});
