import { describe, expect, test } from 'vitest';

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
