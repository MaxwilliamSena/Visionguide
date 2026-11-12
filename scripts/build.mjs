import { copyFile, cp, mkdir, stat, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const destination = join(root, 'dist');

await mkdir(destination, { recursive: true });
await copyFile(join(root, 'index.html'), join(destination, 'index.html'));

// Pastas opcionais para futuros arquivos locais do site.
for (const folder of ['assets', 'css', 'js', 'images', 'img']) {
  const from = join(root, folder);
  try {
    if ((await stat(from)).isDirectory()) {
      await cp(from, join(destination, folder), { recursive: true });
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

for (const filename of ['favicon.ico', 'robots.txt', 'CNAME']) {
  const from = join(root, filename);
  try {
    if ((await stat(from)).isFile()) {
      await copyFile(from, join(destination, filename));
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

await writeFile(join(destination, '.nojekyll'), '');
console.log('Build concluido: dist/index.html e .nojekyll prontos para publicar.');
