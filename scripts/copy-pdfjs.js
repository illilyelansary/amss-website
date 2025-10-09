// scripts/copy-pdfjs.js
const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

const root = process.cwd();
const pdfjsWeb = path.join(root, 'node_modules', 'pdfjs-dist', 'web');
const pdfjsBuild = path.join(root, 'node_modules', 'pdfjs-dist', 'build');

// On copie le viewer (HTML/CSS/JS) + les fichiers build nécessaires
const dest = path.join(root, 'public', 'pdfjs');
copyDir(pdfjsWeb, path.join(dest, 'web'));
copyDir(pdfjsBuild, path.join(dest, 'build'));

console.log('PDF.js viewer copié dans public/pdfjs ✅');
