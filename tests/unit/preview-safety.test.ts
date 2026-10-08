import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const read = (path: string) => {
  try {
    return readFileSync(resolve(process.cwd(), path), 'utf8');
  } catch {
    return '';
  }
};

describe('temporary preview crawler policy', () => {
  test('blocks every crawler through the public robots file', () => {
    expect(read('public/robots.txt')).toBe('User-agent: *\nDisallow: /\n');
  });

  test('uses one shared noindex component in every HTML layout', () => {
    const component = read('src/components/meta/PreviewRobots.astro');
    const layouts = [
      read('src/layouts/ReviewLayout.astro'),
      read('src/layouts/BaseLayout.astro'),
      read('src/layouts/AlternativeLayout.astro'),
    ];

    expect(component).toContain('<meta name="robots" content="noindex, nofollow" />');
    for (const layout of layouts) {
      expect(layout).toContain("import PreviewRobots from '../components/meta/PreviewRobots.astro';");
      expect(layout).toContain('<PreviewRobots />');
      expect(layout).not.toContain('<meta name="robots"');
    }
  });

  test('keeps hosting static and applies noindex headers to every route', () => {
    const configuration = read('netlify.toml');

    expect(configuration).toContain('command = "npm run build"');
    expect(configuration).toContain('publish = "dist"');
    expect(configuration).toMatch(/\[\[headers\]\][\s\S]*for = "\/\*"[\s\S]*X-Robots-Tag = "noindex, nofollow"/);
    expect(configuration).not.toMatch(/^\s*\[(?:functions|identity|analytics)\]/m);
    expect(configuration).not.toMatch(/^\s*\[\[redirects\]\]/m);
  });

  test('does not publish a sitemap and ignores local Netlify state', () => {
    expect(read('astro.config.mjs')).not.toMatch(/sitemap\s*\(/);
    expect(read('.gitignore').split(/\r?\n/)).toContain('.netlify/');
  });
});
