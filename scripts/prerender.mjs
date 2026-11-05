// Runs after the client and server builds. Writes the rendered page into each dist HTML file
// and adds structured data, so the content is in the HTML before any JavaScript runs.
import { readdir, readFile, writeFile } from 'node:fs/promises';

const { renderPage, homeJsonLd } = await import('../dist-server/entry-server.js');

const file = 'dist/index.html';

let html = await readFile(file, 'utf8');
if (!html.includes('<div id="app"></div>')) throw new Error(`${file}: no empty #app to fill`);

// Preload the two fonts that draw the headline (LCP); the rest load on demand via unicode-range.
const assets = await readdir('dist/assets');
const preloads = assets
  .filter((n) => /caveat-latin-(600|700)-normal.*woff2/.test(n))
  .map((n) => `<link rel="preload" href="/assets/${n}" as="font" type="font/woff2" crossorigin>`)
  .join('\n');
html = html.replace('</head>', () => `${preloads}\n</head>`);

html = html.replace('<div id="app"></div>', () => `<div id="app">${renderPage()}</div>`);
const json = JSON.stringify(homeJsonLd()).replace(/</g, '\\u003c');
html = html.replace('</head>', () => `<script type="application/ld+json">${json}</script></head>`);
await writeFile(file, html);
console.log(`prerendered ${file} (${html.length} bytes)`);
