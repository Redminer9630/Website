document.addEventListener('DOMContentLoaded', () => {
    const version = 'v1.0.0';
    const versiondate = '17.5.25';
    const versiontime = '18:45';
    const wdesc = 'Offizielle Website von Redminer9630';

    appendFonts();
    appendMetaTags(wdesc);
    appendFaviconLinks();
    appendFooter(version, versiondate, versiontime, wdesc);

    initCommonFeatures(document.body);
});

function appendFonts() {
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
    `;
    document.head.appendChild(style);
}

function appendFooter(version, date, time, desc) {
    const year = new Date().getFullYear();
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <span class="footer-text">
            © ${year} ${desc} – Alle Rechte vorbehalten. 
            <a id="version-link" href="#">${version} Pre ${date} ${time}</a>
        </span>
    `;
    footer.style = `
        font-family: 'Minecraft';
        background-color: #2c3e50;
        color: white;
        text-align: center;
        padding: 10px 10px;
        width: 100%;
        box-sizing: border-box;
        line-height: 1.5;
        bottom: 0;
        left: 0;
        z-index: 998;
        position: fixed;
    `;
    document.body.appendChild(footer);

    const responsiveStyle = document.createElement('style');
    responsiveStyle.textContent = `
        footer .footer-text {
            font-size: 14px;
            display: block;
            padding: 0 10px;
            word-wrap: break-word;
        }
        @media (max-width: 480px) { footer .footer-text { font-size: 11px; } }
    `;
    document.head.appendChild(responsiveStyle);

    document.getElementById('version-link').addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = '/version.html?v=' + version;
    });
}

function appendMetaTags(desc) {
    const metaTags = [
        { name: 'description', content: desc },
        { name: 'keywords', content: 'Redminer9630, Gaming, Community, Minecraft' },
        { name: 'google-site-verification', content: 'gmFmXAdo3TqVXrXHctYX1m1PIEXtpeCAEsuD5MwA9CA' }
    ];
    metaTags.forEach(data => {
        const meta = document.createElement('meta');
        Object.entries(data).forEach(([key, value]) => meta.setAttribute(key, value));
        document.head.appendChild(meta);
    });
}

function appendFaviconLinks() {
    const timestamp = Date.now();
    document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], link[rel="manifest"]').forEach(e => e.remove());

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
}

function replaceUmlauts(element) {
    const umlautMap = {
        'ä': 'ae', 'ö': 'oe', 'ü': 'ue',
        'Ä': 'Ae', 'Ö': 'Oe', 'Ü': 'Ue',
        'ß': 's'
    };
    element.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const replaced = node.nodeValue.replace(/[äöüÄÖÜß]/g, match => umlautMap[match] || match);
            if (node.nodeValue !== replaced) node.nodeValue = replaced;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            replaceUmlauts(node);
        }
    });
}

function initCommonFeatures(scope = document) {
    replaceUmlauts(scope);
    scope.querySelectorAll('[class^="element"]').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            const submenu = toggle.nextElementSibling;
            if (submenu) submenu.classList.toggle('show');
        });
    });
}
