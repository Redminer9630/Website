const Modal = (() => {
	const modals = new Map(); // ID → Modal-Objekt
	const container = document.createElement('div');
	container.id = 'modal9630-container';
	container.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;z-index:10000;pointer-events:none;`;
	document.body.appendChild(container);

	// Sounds
	const sounds = {
		open: new Audio('/assets/sound/chest_open.mp3'),
		close: new Audio('/assets/sound/chest_close.mp3')
	};

	function createModal({
		id,
		title = '',
		content = '',
		width = '400px',
		height = 'auto',
		anchor = 'center',
		background = '#333',
		color = '#fff',
		bgImage = '',
		draggable = true,
		customStyle = '',
		onOpen = () => {},
		onClose = () => {}
	}) {
		if (modals.has(id)) {
			console.warn(`Modal mit ID "${id}" existiert bereits.`);
			return;
		}

		const wrap = document.createElement('div');
		wrap.className = 'modal9630';
		wrap.dataset.modalId = id;
		wrap.style.cssText = `
			position:absolute;max-width:90%;pointer-events:auto;
			width:${width};height:${height};background:${background};color:${color};
			${bgImage ? `background-image:url(${bgImage});background-size:cover;` : ''}
			border-radius:10px;padding:10px;box-shadow:0 0 20px #000;z-index:10001;
			${customStyle}
		`;

		const bar = document.createElement('div');
		bar.textContent = title;
		bar.style.cssText = `font-weight:bold;cursor:move;margin-bottom:10px;`;
		wrap.appendChild(bar);

		const body = document.createElement('div');
		body.innerHTML = content;
		wrap.appendChild(body);

		const closeBtn = document.createElement('button');
		closeBtn.textContent = '✖';
		closeBtn.style.cssText = `position:absolute;top:5px;right:10px;background:none;border:none;color:${color};font-size:18px;cursor:pointer;`;
		closeBtn.onclick = () => Modal.close(id);
		wrap.appendChild(closeBtn);

		positionModal(wrap, anchor);
		if (draggable) enableDrag(wrap, bar);
		container.appendChild(wrap);
		modals.set(id, { el: wrap, onClose });

		onOpen();
		sounds.open.play();
	}

	function positionModal(el, anchor) {
		const styles = {
			'top-left': 'top:10px;left:10px;',
			'top-center': 'top:10px;left:50%;transform:translateX(-50%);',
			'top-right': 'top:10px;right:10px;',
			'center-left': 'top:50%;left:10px;transform:translateY(-50%);',
			'center': 'top:50%;left:50%;transform:translate(-50%,-50%);',
			'center-right': 'top:50%;right:10px;transform:translateY(-50%);',
			'bottom-left': 'bottom:10px;left:10px;',
			'bottom-center': 'bottom:10px;left:50%;transform:translateX(-50%);',
			'bottom-right': 'bottom:10px;right:10px;'
		};
		el.style.cssText += styles[anchor] || styles['center'];
	}

	function enableDrag(modal, handle) {
		let offsetX = 0, offsetY = 0, dragging = false;

		handle.onmousedown = e => {
			dragging = true;
			offsetX = e.clientX - modal.offsetLeft;
			offsetY = e.clientY - modal.offsetTop;
			modal.style.transition = 'none';
			document.onmousemove = e => {
				if (!dragging) return;
				modal.style.left = `${e.clientX - offsetX}px`;
				modal.style.top = `${e.clientY - offsetY}px`;
				modal.style.transform = 'none';
			};
			document.onmouseup = () => {
				dragging = false;
				document.onmousemove = null;
				document.onmouseup = null;
			};
		};
	}

	function open(id) {
		const modal = modals.get(id);
		if (!modal) return console.warn(`Kein Modal mit ID "${id}" gefunden.`);
		modal.el.style.display = 'block';
		sounds.open.play();
	}

	function close(id) {
		const modal = modals.get(id);
		if (!modal) return;
		modal.el.style.display = 'none';
		if (typeof modal.onClose === 'function') modal.onClose();
		sounds.close.play();
	}

	return {
		create: createModal,
		open,
		close,
		getAll: () => [...modals.keys()],
		remove(id) {
			const modal = modals.get(id);
			if (!modal) return;
			modal.el.remove();
			modals.delete(id);
		}
	};
})();
