document.addEventListener('DOMContentLoaded', function () {
    const version = 'v1.0.0';
    const versiondate = '17.5.25';
    const versiontime = '18:45';
    const wdesc = 'Offizielle Website von Redminer9630';

    const footer = document.createElement('footer');
    document.body.appendChild(footer);

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
            height: auto;
            line-height: 24px;
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
        footer a:hover {
            color: #00ccff;
        }

        @media (max-width: 768px) {
            footer span.full { display: none; }
        }

        @media (min-width: 769px) {
            footer span.short { display: none; }
        }
    `;
    document.head.appendChild(style);

    footer.innerHTML = `
        <span class="short">${wdesc} Pre ${version}</span>
        <span class="full">© 2025 ${wdesc} – Alle Rechte vorbehalten. <a id="version-link" href="#">${version} Pre ${versiondate} ${versiontime}</a></span>
    `;

    const versionLink = document.getElementById('version-link');
    if (versionLink) {
        versionLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = '/version.html?v=' + version;
        });
    }

    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = '${wdesc}';
    document.head.appendChild(metaDescription);

    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'Redminer9630, Gaming, Community, Minecraft';
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
            'ä': 'ae', 'ö': 'oe', 'ü': 'ue',
            'Ä': 'Ae', 'Ö': 'Oe', 'Ü': 'Ue',
            'ß': 's'
        };
        let foundUmlaut = false;
        element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                let text = node.nodeValue;
                let replacedText = text.replace(/[äöüÄÖÜß]/g, match => { foundUmlaut = true; return umlautMap[match] || match; });
                if (text !== replacedText) node.nodeValue = replacedText;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                replaceUmlauts(node);
            }
        });
        if (foundUmlaut) console.warn('Es wurde ein Char gefunden und ersetzt');
    }
    replaceUmlauts();
    document.querySelectorAll('[class^="element"]').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            const submenu = toggle.nextElementSibling;
            submenu.classList.toggle('show');
        });
    });
});
