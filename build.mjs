import { mkdir, readFile, writeFile } from 'node:fs/promises';

const villages = await readFile('worker/villages.js', 'utf8');
const sports = await readFile('worker/sports.js', 'utf8');
const shared = villages + '\n' + sports;
const icons = await readFile('worker/sport-icons.js', 'utf8');
const template = await readFile('worker/index.html', 'utf8');
const html = template.replace('/* SHARED_DATA */', () => shared + '\n' + icons);
const backend = await readFile('worker/backend.js', 'utf8');
await mkdir('dist/server', { recursive: true });
await writeFile('dist/server/index.js', 'const page = ' + JSON.stringify(html) + ';\n' + shared + '\n' + backend);
