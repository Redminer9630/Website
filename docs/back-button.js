document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @font-face { font-family: 'MinecraftFont'; src: url('minecraft_font.woff') format('woff'), url('minecraft_font.tff') format('truetype'); }  
        .header-link {
            font-family: 'MinecraftFont';
            font-size: 16px;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 8px;
            position: absolute;
            top: 20px;
            right: 20px;
        }
    `;
    document.head.appendChild(style);
    const backButton = document.createElement('a');
    backButton.setAttribute('href', 'https://redminer9630.ddns.net');
    backButton.setAttribute('class', 'header-link');
    backButton.textContent = 'Zurück';
    document.body.appendChild(backButton);
});
