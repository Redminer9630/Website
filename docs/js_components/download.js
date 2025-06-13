import JSZip from "https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm";

export async function download(DATA) {
	// Unterstützte Optionen: filename, filedata, encoding, multiple (Array)
	const encoding = DATA.encoding || "utf-8";

	showDownloadModal("Download läuft...", DATA.filename || "Kein Name");

	if (Array.isArray(DATA.multiple)) {
		const zip = new JSZip();
		DATA.multiple.forEach(file => {
			let content = typeof file.filedata === "object" ? JSON.stringify(file.filedata, null, 2) : file.filedata;
			zip.file(file.filename || `file_${Date.now()}.txt`, content);
		});
		const blob = await zip.generateAsync({ type: "blob" }, updateProgress);
		triggerDownload(blob, DATA.filename || `download_${Date.now()}.zip`);
	} else {
		let filename = DATA.filename || `download_${Date.now()}.txt`;
		let filedata = typeof DATA.filedata === "object" ? JSON.stringify(DATA.filedata, null, 2) : DATA.filedata;
		const mimeType = getMimeType(filename, encoding);
		const blob = new Blob([filedata], { type: mimeType });
		triggerDownload(blob, filename);
	}

	hideDownloadModal();
}

function triggerDownload(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

function getMimeType(filename, encoding = "utf-8") {
  const ext = filename.split('.').pop().toLowerCase();
  const types = {
    txt: "text/plain",
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    json: "application/json",
    xml: "application/xml",
    csv: "text/csv",
    md: "text/markdown",
    mht: "multipart/related",
    mhtml: "multipart/related",
    png: "image/png",
    jpg: "image/jpeg", jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    webp: "image/webp",
    ico: "image/vnd.microsoft.icon",
    mp3: "audio/mpeg",
    ogg: "audio/ogg",
    wav: "audio/wav",
    mp4: "video/mp4",
    webm: "video/webm",
    mkv: "video/x-matroska",
    zip: "application/zip",
    gz: "application/gzip",
    rar: "application/x-rar-compressed",
    tar: "application/x-tar",
    ttf: "font/ttf",
    otf: "font/otf",
    woff: "font/woff",
    woff2: "font/woff2",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    mcworld: "application/zip",
    mcpack: "application/zip",
    mcaddon: "application/zip",
    mcproject: "application/zip",
    mctemplate: "application/zip",
    mcstructure: "application/zip",
    mcmeta: "application/json",
    mcfunction: "text/plain",
    obj: "model/obj",
    default: "application/octet-stream"
  };
  const mime = types[ext] || types.default;
  return `${mime};charset=${encoding}`;
}

function updateProgress(metadata) {
	const modal = document.getElementById("download-modal");
	if (modal) modal.querySelector(".progress").textContent = `Fortschritt: ${Math.floor(metadata.percent)}%`;
}

function showDownloadModal(title, filename) {
	let modal = document.getElementById("download-modal");
	if (!modal) {
		modal = document.createElement("div");
		modal.id = "download-modal";
		modal.style.cssText = `
			position: fixed; top: 0; left: 0; width: 100%; height: 100%;
			background: rgba(0,0,0,0.5); color: #fff; display: flex; justify-content: center; align-items: center;
			font-family: sans-serif; z-index: 9999; pointer-events: none;
		`;
		modal.innerHTML = `<div style="background:#222; padding:20px; border-radius:8px; text-align:center;">
			<h2>${title}</h2>
			<p>Datei: ${filename}</p>
			<p class="progress">Wird vorbereitet...</p>
		</div>`;
		document.body.appendChild(modal);
	} else {
		modal.querySelector("h2").textContent = title;
		modal.querySelector("p").textContent = `Datei: ${filename}`;
	}
}

function hideDownloadModal() {
	const modal = document.getElementById("download-modal");
	if (modal) modal.remove();
}
