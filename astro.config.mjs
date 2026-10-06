import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://wijaya-partners-concept-preview.netlify.app',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
