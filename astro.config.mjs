// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// satoshinguyen.com — static site for Cloudflare Pages.
// Apex is canonical; www -> apex 301 is configured at the Cloudflare edge (Redirect Rule),
// not here. The print/QR redirect /b/pyai1 lives in public/_redirects (NEVER 404).
export default defineConfig({
  // output: 'static' (default) — Cloudflare Pages serves dist/ directly, no adapter needed.
  // build.format: 'directory' (default) — /books/<slug>/ -> .../index.html
  site: 'https://satoshinguyen.com',

  adapter: cloudflare()
});