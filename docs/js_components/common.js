window.CommonVersion = {
    version: 'v1.0.0',
    date: '18.5.25',
    time: '11:03'
};

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
        } else { window.location.href = \`/versionsdata/\${version}.json\`; }
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
    appendFooter(CommonVersion.version, CommonVersion.date, CommonVersion.time);
    initCommonFeatures(document.body);
});
