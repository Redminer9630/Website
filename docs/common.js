window.CommonVersion = {
    version: 'v1.0.0',
    date: '18.5.25',
    time: '11:03'
};

function appendThemeSupport() {
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
}

function appendFonts() {
    const style = document.createElement('style');
    style.textContent = `
        @font-face {
            font-family: 'Minecraft';
            src: url('/fonts/minecraft_font.woff2') format('woff2'),
                 url('/fonts/minecraft_font.woff') format('woff'),
                 url('/fonts/minecraft_font.ttf') format('truetype');
        }
        @font-face {
            font-family: 'MinecraftFont';
            src: url('/fonts/minecraft_font.woff2') format('woff2'),
                 url('/fonts/minecraft_font.woff') format('woff'),
                 url('/fonts/minecraft_font.ttf') format('truetype');
        }
        :root[data-theme='dark'] body { background-color: #1a1a1a; color: #f5f5f5; }
        :root[data-theme='light'] body { background-color: #eaeaea; color: #333; }
    `;
    document.head.appendChild(style);
}
function appendFooter(version, date, time) {
    if (document.getElementById("main-footer")) return;

    const year = new Date().getFullYear();
    const footer = document.createElement('footer');
    footer.id = "main-footer";
    footer.innerHTML = `
        <span class="footer-text">
            © ${year} Offizielle Website von Redminer9630 – Alle Rechte vorbehalten. 
            <a id="footer-version" href="#">${version} Pre ${date} ${time}</a>
        </span>
    `;

    const isIndex = location.pathname.endsWith("/") || location.pathname.endsWith("/index") || location.pathname.endsWith("/index.html");
    footer.classList.add(isIndex ? "index-footer" : "fixed-footer");
    document.body.style.paddingBottom = isIndex ? "100px" : "60px";

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
        footer.fixed-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #222;
            color: #fff;
            text-align: center;
        }
        footer.index-footer {
            position: relative;
            margin-top: 40px;
            background: #222;
            color: #fff;
            text-align: center;
        }
    `;
    document.head.appendChild(responsiveStyle);

    const versionLink = footer.querySelector("#footer-version");
    versionLink.addEventListener('click', e => {
        e.preventDefault();
        if (typeof Modal !== "undefined" && Modal.open) {
            Modal.open("modal-version", {
                content: `
                    <h2>Systemversion</h2>
                    <p>Version von <code>modal.js</code>:</p>
                    <div style="font-weight:bold;font-size:1.2em">${Modal.version}</div>
                    <p><a href="/versionsdata/${version}.json" target="_blank">Versions-Webseite öffnen</a></p>
                `,
                type: "info",
                width: "350px",
                height: "200px",
                focus: true,
                draggable: true
            });
        } else {
            window.location.href = \`/versionsdata/\${version}.json\`;
        }
    });
}

function appendMetaTags() {
    const metaTags = [
        { name: 'description', content: 'Offizielle Website von Redminer9630' },
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

function appendCanonicalLink() {
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', window.location.href.split('?')[0]);
    document.head.appendChild(canonical);
}

function replaceUmlauts(element) {
    const umlautMap = { ä: 'ae', ö: 'oe', ü: 'ue', Ä: 'Ae', Ö: 'Oe', Ü: 'Ue', ß: 'ss' };
    if (!element) return;
    [...element.childNodes].forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = node.nodeValue.replace(/[äöüÄÖÜß]/g, m => umlautMap[m] || m);
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

document.addEventListener('DOMContentLoaded', () => {
    appendThemeSupport();
    appendFonts();
    appendMetaTags();
    appendFaviconLinks();
    appendFooter(CommonVersion.version, CommonVersion.date, CommonVersion.time);
    appendCanonicalLink();
    initCommonFeatures(document.body);
});
