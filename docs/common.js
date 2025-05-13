document.addEventListener('DOMContentLoaded', function() {
    const footer = document.createElement('footer');
    footer.innerHTML = `<span>© 2025 Offizielle Website von Redminer9630 - Alle Rechte vorbehalten. v1.4.2 Indev</span>`;
    document.body.appendChild(footer);
    const style = document.createElement('style');
    style.textContent = `
        footer {
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
    `;
    document.head.appendChild(style);
    
    const metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Offizielle Website von Redminer9630.');
    document.head.appendChild(metaDescription);

    const metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'Minecraft, Redminer9630');
    document.head.appendChild(metaKeywords);

    const metaVerification = document.createElement('meta');
    metaVerification.setAttribute('name', 'google-site-verification');
    metaVerification.setAttribute('content', 'gmFmXAdo3TqVXrXHctYX1m1PIEXtpeCAEsuD5MwA9CA');
    document.head.appendChild(metaVerification);

    const linkIcon = document.createElement('link');
    linkIcon.setAttribute('rel', 'icon');
    linkIcon.setAttribute('href', 'images/favicon.ico');
    document.head.appendChild(linkIcon);
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
