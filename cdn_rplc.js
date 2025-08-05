const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
const cdnBaseURL = 'https://cdn.jsdelivr.net/gh/Redminer9630/Website/';

function replaceLinksInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/(href|src)="\/(css|js|img)\/([^"]+)"/g, (match, attr, folder, file) => {
    const cdnURL = `${cdnBaseURL}${folder}/${file}`;
    return `${attr}="${cdnURL}"`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Datei aktualisiert: ${filePath}`);
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.html')) {
      replaceLinksInFile(fullPath);
    }
  });
}

walkDir(docsDir);
