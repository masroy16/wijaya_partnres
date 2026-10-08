import { describe, expect, test } from 'vitest';

describe('client review concepts', () => {
  test('exposes exactly two concepts with stable identifiers and labels', async () => {
    const module = await import('../../src/content/review').catch(() => undefined);
    const concepts = module?.REVIEW_CONCEPTS ?? [];

    expect(concepts).toHaveLength(2);
    expect(concepts.map(({ id, title }) => ({ id, title }))).toEqual([
      { id: 'concept-01', title: 'Concept 01' },
      { id: 'concept-02', title: 'Concept 02' },
    ]);
  });

  test('links each concept to one Indonesian and one English entry route', async () => {
    const module = await import('../../src/content/review').catch(() => undefined);
    const links = (module?.REVIEW_CONCEPTS ?? []).flatMap(({ links }) => links);

    expect(links).toHaveLength(4);
    expect(links).toEqual([
      { locale: 'id', label: 'Bahasa Indonesia', href: '/id/' },
      { locale: 'en', label: 'English', href: '/en/' },
      { locale: 'id', label: 'Bahasa Indonesia', href: '/alternative/id/' },
      { locale: 'en', label: 'English', href: '/alternative/' },
    ]);
    expect(new Set(links.map(({ href }) => href)).size).toBe(4);
  });
});
