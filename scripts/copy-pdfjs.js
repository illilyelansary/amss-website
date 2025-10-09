// scripts/copy-pdfjs.js  (ESM)
import { cp, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function main() {
  const root = process.cwd();
  const pdfjsWeb = path.join(root, 'node_modules', 'pdfjs-dist', 'web');
  const pdfjsBuild = path.join(root, 'node_modules', 'pdfjs-dist', 'build');
  const dest = path.join(root, 'public', 'pdfjs');

  const hasWeb = await exists(pdfjsWeb);
  const hasBuild = await exists(pdfjsBuild);
  if (!hasWeb || !hasBuild) {
    console.warn('⚠️  pdfjs-dist introuvable dans node_modules. As-tu bien ajouté "pdfjs-dist" dans dependencies ?');
    // ne pas faire échouer le build si l’app peut fonctionner sans
    return;
  }

  await mkdir(dest, { recursive: true });
  await cp(pdfjsWeb, path.join(dest, 'web'), { recursive: true });
  await cp(pdfjsBuild, path.join(dest, 'build'), { recursive: true });

  console.log('✅ PDF.js viewer copié dans public/pdfjs');
}

main().catch((err) => {
  console.error('Erreur copy-pdfjs:', err);
  process.exit(1);
});
