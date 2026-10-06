import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

describe('site foundation', () => {
  test('exposes the approved site identity and locale policy', async () => {
    const loaded = await import('../../src/config/site').catch(() => ({ SITE: undefined }));

    expect(loaded.SITE).toEqual({
      name: 'Wijaya And Partners',
      defaultLocale: 'id',
      locales: ['id', 'en'],
      preview: true,
      canonicalBase: 'https://wijaya-partners-concept-preview.netlify.app',
    });
  });

  test('provides every quality and development command used by the plan', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8')) as {
      scripts?: Record<string, string>;
    };

    expect(Object.keys(packageJson.scripts ?? {})).toEqual(
      expect.arrayContaining([
        'dev',
        'build',
        'preview',
        'test',
        'test:unit',
        'test:e2e',
        'test:a11y',
        'test:lighthouse',
      ]),
    );
  });
});
