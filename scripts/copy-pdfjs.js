// scripts/copy-pdfjs.js  (ESM, Node 20)
import { cp, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

async function exists(p) { try { await access(p); return true; } catch { return false; } }

async function main() {
  const root = process.cwd();
  const pdfjsWeb = path.join(root, 'node_modules', 'pdfjs-dist', 'web');
  const pdfjsBuild = path.join(root, 'node_modules', 'pdfjs-dist', 'build');
  const dest = path.join(root, 'public', 'pdfjs');

  const hasWeb = await exists(pdfjsWeb);
  const hasBuild = await exists(pdfjsBuild);
  if (!hasWeb || !hasBuild) {
    console.warn('⚠️ pdfjs-dist introuvable. Vérifie qu’il est dans dependencies.');
    return; // ne pas casser le build
  }

  await mkdir(dest, { recursive: true });
  await cp(pdfjsWeb, path.join(dest, 'web'),   { recursive: true });
  await cp(pdfjsBuild, path.join(dest, 'build'), { recursive: true });

  console.log('✅ PDF.js copié dans public/pdfjs');
}
main().catch((e) => { console.error(e); process.exit(1); });
