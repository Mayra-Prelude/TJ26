import { mkdir, copyFile, rm } from 'node:fs/promises';
await rm('dist', {recursive:true, force:true});
await mkdir('dist/assets', {recursive:true});
for (const file of ['index.html','styles.css','app.js','config.js','assets/skyline.svg']) await copyFile(file, `dist/${file}`);
console.log('Build estático generado en dist/');
