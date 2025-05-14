// generate-wiki-index.js
const fs = require("fs");
const path = require("path");

const wikiDir = path.join(__dirname, "wiki");
const outputFile = path.join(wikiDir, "wiki-index.js");

const files = fs.readdirSync(wikiDir).filter(f => f.endsWith(".html"));

const entries = files.map(f => {
    const title = f.replace(/_/g, " ").replace(".html", "");
    return `{ title: "${title}", url: "/wiki/${f}" }`;
});

const content = `const wikiPages = [\n  ${entries.join(",\n  ")}\n];\n`;

fs.writeFileSync(outputFile, content);
console.log("wiki-index.js erfolgreich erstellt.");
