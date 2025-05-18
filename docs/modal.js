function showModal(options) {
    const {
        title = '',
        content = '',
        buttons = [],
        width = '400px',
        height = 'auto',
        top = '10%',
        left = '50%',
        transform = 'translateX(-50%)',
        background = '#fff',
        overlayClose = true
    } = options;

    if (!document.getElementById('modal-style')) {
        const style = document.createElement('style');
        style.id = 'modal-style';
        style.textContent = `
        .common-modal-overlay {
            position: fixed; z-index: 2000;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.4);
            display: flex; justify-content: center; align-items: flex-start;
            padding-top: 50px;
        }
        .common-modal {
            position: absolute;
            background: ${background};
            padding: 20px;
            border-radius: 6px;
            box-shadow: 0 0 20px rgba(0,0,0,0.3);
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
        }
        .common-modal-title { margin: 0 0 10px 0; font-size: 1.4em; }
        .common-modal-content { margin-bottom: 20px; }
        .common-modal-buttons { text-align: right; }
        .common-modal-buttons button {
            margin-left: 8px;
            padding: 6px 14px;
            border: none;
            border-radius: 4px;
            background: #0066cc;
            color: white;
            cursor: pointer;
        }
        .common-modal-buttons button:hover { background: #004c99; }`;
        document.head.appendChild(style);
    }

    const overlay = document.createElement('div');
    overlay.className = 'common-modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'common-modal';
    Object.assign(modal.style, { width, height, top, left, transform });

    if (title) {
        const header = document.createElement('h2');
        header.className = 'common-modal-title';
        header.textContent = title;
        modal.appendChild(header);
    }

    const contentBox = document.createElement('div');
    contentBox.className = 'common-modal-content';
    if (typeof content === 'string') contentBox.innerHTML = content;
    else contentBox.appendChild(content);
    modal.appendChild(contentBox);

    const btnBox = document.createElement('div');
    btnBox.className = 'common-modal-buttons';
    buttons.forEach(({ text, onclick, className }) => {
        const btn = document.createElement('button');
        btn.textContent = text;
        if (className) btn.className = className;
        btn.onclick = () => { if (onclick) onclick(); document.body.removeChild(overlay); };
        btnBox.appendChild(btn);
    });
    modal.appendChild(btnBox);

    overlay.appendChild(modal);
    if (overlayClose) { overlay.onclick = e => { if (e.target === overlay) document.body.removeChild(overlay); }; }
    document.body.appendChild(overlay);
}
