import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve(process.env.SERVE_DIR || '.');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.json':'application/json; charset=utf-8'};
const publicFiles = new Set(['index.html', 'styles.css', 'app.js', 'config.js', 'assets/skyline.svg', 'email.html', 'email-ghl.html', 'tijuana.html', 'cdmx.html', 'tijuana-ghl-block.html', 'cdmx-ghl-block.html', ...['cdmx','tijuana','valle','sf','lisbon','ruta-ciudades'].flatMap(city => ['svg','png'].map(ext => `assets/skylines/${city}.${ext}`))]);
for(const cover of ['xesco-tech-week','summit','startup-world-cup','deeptech','milken','websummit'])for(const ext of ['jpg','jpeg','png','webp'])publicFiles.add(`assets/covers/${cover}.${ext}`);
const server = http.createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const relative = path === '/' ? 'index.html' : path.slice(1);
    const file = resolve(root, relative);
    if (!file.startsWith(root + sep) || !publicFiles.has(relative)) { res.writeHead(404); res.end('No encontrado'); return; }
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, {Allow:'GET, HEAD'}); res.end(); return; }
    const info = await stat(file); if (!info.isFile()) throw new Error('not a file');
    const content = await readFile(file);
    res.writeHead(200, {'Content-Type':mime[extname(file)] || 'application/octet-stream','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control':'no-store'});
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch { res.writeHead(404); res.end('No encontrado'); }
});
server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log(`FemTech: puerto ${server.address().port}`));
