import { describe, expect, it } from 'vitest';

import {
  ALTERNATIVE_TEAM_SLUGS,
  getAlternativeProfileLabels,
  getAlternativeTeam,
  getAlternativeTeamMember,
  getAlternativeTeamPaths,
} from '../../src/content/alternative-team';

const expectedSlugs = [
  'herman-wijaya',
  'f-ebby-abraham',
  'rani-sisco',
  'arifan-sudaryanto',
  'diana-pangestu',
  'andi-cipta-lukmana',
];

describe('alternative team profile content', () => {
  it('keeps one stable six-person order in both locales', () => {
    expect(ALTERNATIVE_TEAM_SLUGS).toEqual(expectedSlugs);

    for (const locale of ['en', 'id'] as const) {
      expect(getAlternativeTeam(locale).map((member) => member.slug)).toEqual(expectedSlugs);
    }
  });

  it('separates supplied source drafts from disclosed placeholders', () => {
    for (const locale of ['en', 'id'] as const) {
      const members = getAlternativeTeam(locale);
      expect(members.filter((member) => member.profileStatus === 'source-draft')).toHaveLength(2);
      expect(members.filter((member) => member.profileStatus === 'placeholder')).toHaveLength(4);

      for (const member of members) {
        expect(member.summary.length).toBeGreaterThan(20);
        expect(member.biography.length).toBeGreaterThan(0);
        expect(member.education.length).toBeGreaterThan(0);
        expect(member.organizations.length).toBeGreaterThan(0);
        expect(member.practiceAreas.length).toBeGreaterThan(0);
        expect(member.statusLabel.length).toBeGreaterThan(3);
        expect(member.statusNote.length).toBeGreaterThan(20);
      }

      for (const member of members.filter((profile) => profile.profileStatus === 'placeholder')) {
        expect(`${member.statusLabel} ${member.statusNote}`.toLowerCase()).toMatch(/placeholder|dummy/);
      }
    }
  });

  it('preserves the supplied Herman and Ebby source facts and caveats', () => {
    const herman = getAlternativeTeamMember('en', 'herman-wijaya');
    const ebby = getAlternativeTeamMember('en', 'f-ebby-abraham');

    expect(herman?.education).toContain('Faculty of Law, Parahyangan Catholic University, S.H., 1973.');
    expect(herman?.practiceAreas).toContain('Civil and criminal litigation');
    expect(ebby?.education).toContain('Master of Notarial Law, Padjadjaran University, M.Kn., 2006.');
    expect(ebby?.statusNote).toContain('Franz');
    expect(JSON.stringify([herman, ebby])).not.toContain('hwlawfirm@yahoo.com');
  });

  it('provides localized interface labels and twelve unique static paths', () => {
    expect(getAlternativeProfileLabels('en').backToTeam).toBe('Back to our team');
    expect(getAlternativeProfileLabels('id').backToTeam).toBe('Kembali ke tim kami');

    const paths = getAlternativeTeamPaths();
    expect(paths).toHaveLength(12);
    expect(new Set(paths.map(({ locale, member }) => `${locale}/${member.slug}`)).size).toBe(12);
  });

  it('returns undefined for an unknown profile slug', () => {
    expect(getAlternativeTeamMember('en', 'unknown-member')).toBeUndefined();
  });
});
