import http from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { projects } from '../gallery/projects.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1024 || port > 65535 - projects.length) throw new Error('PORT must be between 1024 and 65526.');
const servers = [];
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon' };
const bundles = new Map();

// Compile in memory: never install, build, or write inside an archived project.
for (const project of projects.filter(p => p.react)) {
  const result = await build({
    entryPoints: [path.join(root, 'misc-projects', project.root, 'src/main.jsx')],
    bundle: true, write: false, outdir: 'archive-build', format: 'esm', jsx: 'automatic',
    nodePaths: [path.join(root, 'node_modules')], define: { 'process.env.NODE_ENV': '"production"' },
    loader: { '.png': 'dataurl', '.jpg': 'dataurl', '.svg': 'dataurl' },
  });
  bundles.set(project.id, result.outputFiles);
}

function respond(res, status, body, type = 'text/plain') {
  res.writeHead(status, { 'Content-Type': `${type}; charset=utf-8`, 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
  res.end(body);
}

async function serveFile(req, res, base, entry, project) {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { return respond(res, 400, 'Invalid URL'); }
  if (project?.react && ['/__archive/main.js', '/__archive/main.css'].includes(pathname)) {
    const ext = path.extname(pathname);
    const file = bundles.get(project.id).find(f => f.path.endsWith(ext));
    return respond(res, file ? 200 : 404, file?.contents || 'Not found', mime[ext]);
  }
  const segments = pathname.split('/');
  if (segments.some(s => s.startsWith('.') || s === 'node_modules' || s === 'package-lock.json')) return respond(res, 403, 'Forbidden');
  const relative = pathname === '/' ? entry : pathname.slice(1);
  let target = path.resolve(base, relative);
  if (!target.startsWith(base + path.sep)) return respond(res, 403, 'Forbidden');
  try {
    // Vite serves public assets both at / and at their original /public/ paths.
    if (project?.react) {
      try { await stat(target); } catch { target = path.join(base, 'public', relative); }
    }
    if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
    target = await realpath(target);
    if (!target.startsWith(base + path.sep)) return respond(res, 403, 'Forbidden');
    let content = await readFile(target);
    if (project?.react && target.endsWith('/index.html')) {
      content = content.toString().replace('src="/src/main.jsx"', 'src="/__archive/main.js"')
        .replace('</head>', '<link rel="stylesheet" href="/__archive/main.css"></head>');
    }
    respond(res, 200, content, mime[path.extname(target)] || 'application/octet-stream');
  } catch (error) {
    respond(res, error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : 500, error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 'Not found' : 'Unable to read file');
  }
}

async function listen(server, serverPort) {
  servers.push(server);
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(serverPort, '127.0.0.1', resolve); });
}
try {
  for (const [index, project] of projects.entries()) {
    project.url = `http://127.0.0.1:${port + index + 1}/${project.entry}`;
    const base = path.join(root, 'misc-projects', project.root);
    await listen(http.createServer((req, res) => {
      if (!['GET', 'HEAD'].includes(req.method)) return respond(res, 405, 'Method not allowed');
      void serveFile(req, res, base, project.entry, project);
    }), port + index + 1);
  }
  await listen(http.createServer((req, res) => {
    if (req.url === '/api/projects') return respond(res, 200, JSON.stringify(projects), 'application/json');
    void serveFile(req, res, path.join(root, 'gallery'), 'index.html');
  }), port);
  console.log(`Scrimba archive → http://127.0.0.1:${port}\n${projects.length} original projects ready. Press Ctrl+C to stop.`);
} catch (error) {
  servers.forEach(server => server.close());
  console.error(error.code === 'EADDRINUSE' ? `A required port is busy. Try PORT=${port + 20} npm start.` : error);
  process.exitCode = 1;
}
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => { servers.forEach(server => server.close()); process.exit(0); });
