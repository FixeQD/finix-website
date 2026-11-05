import { defineConfig, loadEnv, type Plugin } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Absolute URLs (canonical, og:url, sitemap) need the real address of the site.
// Set SITE_URL when building, for example: SITE_URL=https://finix.example npm run build
// Without it those tags are left out instead of guessing.
function seo(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '');
  let ssr = false;
  return {
    name: 'finix-seo',
    configResolved(config) { ssr = !!config.build.ssr; },
    transformIndexHtml(_html, ctx) {
      if (!base) return;
      const path = ctx.path.replace(/index\.html$/, '');
      const url = base + path;
      return [
        { tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: url }, injectTo: 'head' },
      ];
    },
    generateBundle() {
      if (ssr) return;
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}` });
      if (!base) return;
      const urls = ['/'].map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n');
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n` });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', ['SITE_URL', 'VITE_']);
  return {
    plugins: [svelte(), seo(env.SITE_URL ?? '')],
    build: {
      target: 'es2022',
      minify: 'oxc',
      cssMinify: 'lightningcss',
      assetsInlineLimit: 2048,
      reportCompressedSize: false,
    },
  };
});
