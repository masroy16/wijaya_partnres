import { describe, expect, test } from 'vitest';

const expectedSections = [
  'clients',
  'contact',
  'ethics',
  'expertise',
  'footer',
  'hero',
  'legacy',
  'meta',
  'navigation',
  'team',
];

const expectedSlugs = [
  'andi-cipta-lukmana',
  'arifan-sudaryanto',
  'diana-pangestu',
  'f-ebby-abraham',
  'herman-wijaya',
  'rani-sisco',
];

describe('bilingual content integrity', () => {
  test('keeps Indonesian and English homepage sections in parity', async () => {
    const module = await import('../../src/content/home').catch(() => undefined);
    const id = module?.getHomeContent('id');
    const en = module?.getHomeContent('en');

    expect(id?.locale).toBe('id');
    expect(en?.locale).toBe('en');
    expect(Object.keys(id ?? {}).filter((key) => key !== 'locale').sort()).toEqual(expectedSections);
    expect(Object.keys(en ?? {}).filter((key) => key !== 'locale').sort()).toEqual(expectedSections);
  });

  test.each(['id', 'en'] as const)('provides six stable team records for %s', async (locale) => {
    const module = await import('../../src/content/team').catch(() => undefined);
    const members = module?.getTeamMembers(locale) ?? [];

    expect(members.map(({ slug }) => slug).sort()).toEqual(expectedSlugs);
    expect(members.filter(({ profileStatus }) => profileStatus === 'complete-draft')).toHaveLength(2);
    expect(members.filter(({ profileStatus }) => profileStatus === 'pending')).toHaveLength(4);
  });

  test.each(['id', 'en'] as const)('does not invent detail for pending %s profiles', async (locale) => {
    const module = await import('../../src/content/team').catch(() => undefined);
    const pending = (module?.getTeamMembers(locale) ?? []).filter(
      ({ profileStatus }) => profileStatus === 'pending',
    );

    expect(pending).toHaveLength(4);
    for (const member of pending) {
      expect(member.biography).toEqual([]);
      expect(member.education).toEqual([]);
      expect(member.organizations).toEqual([]);
      expect(member.practiceAreas).toEqual([]);
    }
  });

  test('uses durable legacy wording instead of a stale year count', async () => {
    const homeModule = await import('../../src/content/home').catch(() => undefined);
    const teamModule = await import('../../src/content/team').catch(() => undefined);
    const serialized = JSON.stringify([
      homeModule?.getHomeContent('id'),
      homeModule?.getHomeContent('en'),
      teamModule?.getTeamMembers('id'),
      teamModule?.getTeamMembers('en'),
    ]);

    expect(serialized).not.toMatch(/37[- ]Year/i);
    expect(serialized).toContain('1988');
  });
});
