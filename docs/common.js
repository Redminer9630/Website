document.addEventListener('DOMContentLoaded', function() {
    const footer = document.createElement('footer');
    footer.innerHTML = `<span>© 2025 Offizielle Website von Redminer9630 - Alle Rechte vorbehalten. <a id="version-link" href="#">v1.6.5 Beta 16.5.25 10:06</a></span>`;
    document.body.appendChild(footer);
    document.getElementById('version-link').addEventListener('click', function(e) {
        e.preventDefault();
        const version = 'v1.6.5'; // oder dynamisch generieren, falls nötig
        window.location.href = '/versionen.html?v=' + version;
    });

    const style = document.createElement('style');
    style.textContent = `
        @font-face {
            font-family: 'Minecraft';
            src: url('minecraft_font.woff') format('woff'), url('minecraft_font.ttf') format('truetype');
        }
        @font-face {
            font-family: 'MinecraftFont';
            src: url('minecraft_font.woff') format('woff'), url('minecraft_font.ttf') format('truetype');
        }
        footer {
            font-family: 'Minecraft';
            background-color: #2c3e50;
            color: white;
            text-align: center;
            padding: 10px 0;
            width: 100%;
            height: 20px;
            bottom: 0;
            left: 0;
            z-index: 998;
            position: fixed;
        }
        footer a {
            color: #00ffff;
            text-decoration: underline;
            cursor: pointer;
        }
        footer a:hover { color: #00ccff; }
    `;
    document.head.appendChild(style);
    
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'Offizielle Website von Redminer9630';
document.head.appendChild(metaDescription);

const metaKeywords = document.createElement('meta');
metaKeywords.name = 'keywords';
metaKeywords.content = 'Minecraft Java Edition, Redminer9630, Minecraft';
document.head.appendChild(metaKeywords);

const metaVerification = document.createElement('meta');
metaVerification.name = 'google-site-verification';
metaVerification.content = 'gmFmXAdo3TqVXrXHctYX1m1PIEXtpeCAEsuD5MwA9CA';
document.head.appendChild(metaVerification);

const existingIcons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], link[rel="manifest"]');
existingIcons.forEach(icon => icon.remove());

const timestamp = new Date().getTime();

const icons = [
    { rel: 'apple-touch-icon', sizes: '180x180', href: 'favicon/apple-touch-icon.png?v=' + timestamp },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'favicon/favicon-32x32.png?v=' + timestamp },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'favicon/favicon-16x16.png?v=' + timestamp },
    { rel: 'manifest', href: 'favicon/site.webmanifest?v=' + timestamp }
];

icons.forEach(data => {
    const link = document.createElement('link');
    Object.entries(data).forEach(([key, value]) => link.setAttribute(key, value));
    document.head.appendChild(link);
});
 
    function replaceUmlauts(element) {
        const umlautMap = {
            'ä': 'ae',
            'ö': 'oe',
            'ü': 'ue',
            'Ä': 'Ae',
            'Ö': 'Oe',
            'Ü': 'Ue'
        };
        let foundUmlaut = false;
        element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                let text = node.nodeValue;
                let replacedText = text.replace(/[äöüÄÖÜ]/g, function(match) { foundUmlaut = true; return umlautMap[match] || match; });
                if (text !== replacedText) { node.nodeValue = replacedText; }
            } else if (node.nodeType === Node.ELEMENT_NODE) { replaceUmlauts(node); }
        });
        if (foundUmlaut) { console.warn('Es wurde ein Character gefunden und ersetzt'); }
    }
    replaceUmlauts(document.body);
});

document.querySelectorAll('[class^="element"]').forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        const submenu = toggle.nextElementSibling;
        submenu.classList.toggle('show'); 
    });
});
