const Modal = (() => {
    const state = { openModals: [], zIndex: 2000 };

    const Modal = {
        version: (typeof Common !== 'undefined' && Common.version) || '1.0',

        open(id, opts = {}) {
            const modal = createModal(id, opts);
            modal.style.display = 'flex';
            return modal;
        },

        close(id) {
            const modal = document.getElementById(`modal-${id}`);
            if (modal) {
                modal.remove();
                state.openModals = state.openModals.filter(m => m !== modal);
            }
        },

        toast(message, duration = 7000) {
            const toast = document.createElement('div');
            toast.className = 'modal-toast';
            toast.innerText = message;
            toast.style.zIndex = state.zIndex++;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), duration);
        }
    };

    function createModal(id, options = {}) {
        const existing = document.getElementById(`modal-${id}`);
        if (existing) return existing;

        const modal = document.createElement('div');
        modal.className = 'modal-container';
        modal.id = `modal-${id}`;
        modal.style.zIndex = state.zIndex++;

        const content = document.createElement('div');
        content.className = 'modal-content';

        if (options.width) content.style.width = options.width;
        if (options.height) content.style.height = options.height;

        if (options.position) {
            const [top, left] = options.position;
            content.style.position = 'absolute';
            content.style.top = top;
            content.style.left = left;
        }

        if (options.draggable) makeDraggable(content);
        if (options.focus) content.setAttribute('tabindex', '-1');

        const closeBtn = document.createElement('button');
        closeBtn.innerText = '×';
        closeBtn.className = 'modal-close';
        closeBtn.onclick = () => Modal.close(id);
        content.appendChild(closeBtn);

        if (typeof options.content === 'string') {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = options.content;
            content.appendChild(wrapper);
        } else if (options.content instanceof HTMLElement) {
            content.appendChild(options.content);
        }

        modal.appendChild(content);
        document.body.appendChild(modal);

        if (options.focus) content.focus();
        state.openModals.push(modal);

        return modal;
    }

    function makeDraggable(el) {
        let offsetX = 0, offsetY = 0, dragging = false;

        el.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('modal-close')) return;
            dragging = true;
            offsetX = e.clientX - el.getBoundingClientRect().left;
            offsetY = e.clientY - el.getBoundingClientRect().top;
            el.style.position = 'absolute';
            el.style.cursor = 'move';
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!dragging) return;
            el.style.left = `${e.clientX - offsetX}px`;
            el.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener('mouseup', () => {
            dragging = false;
            el.style.cursor = 'default';
            document.body.style.userSelect = '';
        });
    }

    // 🧩 Modal-Styles injizieren
    const style = document.createElement('style');
    style.textContent = `
        .modal-container {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            display: flex;
            align-items: center; justify-content: center;
            background-color: rgba(0,0,0,0.5);
        }
        .modal-content {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            position: relative;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            font-family: sans-serif;
            max-width: 90vw;
            max-height: 90vh;
            overflow: auto;
        }
        .modal-close {
            position: absolute;
            top: 5px; right: 8px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
        }
        .modal-toast {
            position: fixed;
            bottom: 20px; left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-family: sans-serif;
            z-index: 9999;
        }
    `;
    document.head.appendChild(style);

    return Modal;
})();
window.Modal = Modal;
