import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('localized routes', () => {
  test('generates twelve unique localized team paths', async () => {
    const module = await import('../../src/content/team').catch(() => undefined);
    const paths = module?.getAllTeamPaths() ?? [];
    const keys = paths.map(({ params }) => `${params.lang}/${params.slug}`);

    expect(paths).toHaveLength(12);
    expect(new Set(keys).size).toBe(12);
  });

  test('preserves a known profile when switching languages', async () => {
    const module = await import('../../src/i18n/routes').catch(() => undefined);

    expect(module?.getAlternatePath('/id/team/herman-wijaya/', 'en')).toBe(
      '/en/team/herman-wijaya/',
    );
  });

  test('falls back to the target homepage for an unknown path', async () => {
    const module = await import('../../src/i18n/routes').catch(() => undefined);

    expect(module?.getAlternatePath('/id/not-a-real-page/', 'en')).toBe('/en/');
    expect(module?.getAlternatePath('/en/not-a-real-page/', 'id')).toBe('/id/');
  });
});

describe('draft contact targets', () => {
  test('centralizes valid email telephone and WhatsApp links', async () => {
    const module = await import('../../src/content/contact').catch(() => undefined);
    const contact = module?.CONTACT;

    expect(contact?.emailHref).toBe('mailto:wnp@wijayapartners.com');
    expect(contact?.phoneHref).toBe('tel:+628986000822');
    expect(contact?.phoneHref.replace('tel:+62', '')).toMatch(/^\d+$/);
    expect(contact?.whatsappHref).toBe('https://wa.me/628986000822');
  });
});

describe('static recovery and hosting safeguards', () => {
  test('provides bilingual recovery links on the 404 page', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/pages/404.astro'), 'utf8');

    expect(source).toContain('href="/id/"');
    expect(source).toContain('href="/en/"');
  });

  test('configures a static Netlify build with preview and security headers', () => {
    const configuration = readFileSync(resolve(process.cwd(), 'netlify.toml'), 'utf8');

    expect(configuration).toContain('command = "npm run build"');
    expect(configuration).toContain('publish = "dist"');
    expect(configuration).toMatch(/X-Robots-Tag.*noindex, nofollow/);
    expect(configuration).toMatch(/X-Content-Type-Options.*nosniff/);
    expect(configuration).toMatch(/X-Frame-Options.*DENY/);
    expect(configuration).toMatch(/Referrer-Policy.*strict-origin-when-cross-origin/);
    expect(configuration).toContain("frame-ancestors 'none'");
    expect(configuration).toContain("default-src 'self'");
  });
});
