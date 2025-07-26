(function () {
	window.clipboard = function (text) { if (typeof text !== "string") return;	};

	const tick = "data:image/svg+xml;base64," + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`);
	const copy = "data:image/svg+xml;base64," + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`);

	function applyAutoCopy(el) {
		let img;
		if (el.dataset.icon === "true") {
			img = document.createElement("img");
			img.src = copy;
			img.style.width = "8px";
			img.style.height = "8px";
			img.style.cursor = "pointer";
			el.appendChild(img);
		}

		el.addEventListener("click", () => {
			let value = el.dataset.copy ?? null;

			if (!value) {
				if (el.tagName === "INPUT") value = el.value;
				else value = el.innerText;
			}

			navigator.clipboard.writeText(value).then(() => {
				if (img) {
					const old = img.src;
					img.src = tick;
					setTimeout(() => (img.src = old), 3000);
				}
			});
		});
	}

	window.addEventListener("DOMContentLoaded", () => {
		document.querySelectorAll('input[type="clipboard"]').forEach(input => {
			let value = input.value || input.getAttribute("text") || "";
			let img = document.createElement("img");
			img.style.width = "8px";
			img.style.height = "8px";
			img.style.cursor = "pointer";
			img.src = copy;
			img.onclick = () => {
				navigator.clipboard.writeText(value).then(() => {
					const old = img.src;
					img.src = tick;
					setTimeout(() => (img.src = old), 3000);
				});
			};
			input.parentNode.replaceChild(img, input);
		});

		document.querySelectorAll('[data-copy], [data-copy-auto]').forEach(el => {applyAutoCopy(el);});
	});
})();
