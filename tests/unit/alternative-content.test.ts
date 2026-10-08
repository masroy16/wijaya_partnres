import { describe, expect, it } from 'vitest';

import { getAlternativeContent } from '../../src/content/alternative';

describe('alternative content contract', () => {
  it('keeps the English experience to one three-story carousel', () => {
    const content = getAlternativeContent('en');

    expect(content.slides.map((slide) => slide.id)).toEqual([
      'hero',
      'expertise',
      'values',
    ]);
    expect(content.slides).toHaveLength(3);
  });

  it('keeps the primary navigation limited to the four approved labels', () => {
    const content = getAlternativeContent('en');

    expect(content.navigation.map((item) => item.label)).toEqual([
      'About',
      'Our Teams',
      'Our Projects',
      'Contact',
    ]);
  });

  it('presents the three approved expertise labels', () => {
    const content = getAlternativeContent('en');
    const expertise = content.slides.find((slide) => slide.id === 'expertise');

    expect(expertise?.items).toEqual([
      'Commercial Litigation',
      'Insolvency & Debt Strategy',
      'Corporate Advisory',
    ]);
  });

  it('keeps the complete six-person roster in both locales', () => {
    const english = getAlternativeContent('en');
    const indonesian = getAlternativeContent('id');

    expect(english.team).toHaveLength(6);
    expect(indonesian.team.map((member) => member.name)).toEqual(
      english.team.map((member) => member.name),
    );
  });

  it('marks approval-dependent matter and contact content as draft', () => {
    for (const locale of ['en', 'id'] as const) {
      const content = getAlternativeContent(locale);

      expect(content.previewLabel.toLowerCase()).toContain('concept');
      expect(content.about.claimStatus).toBe('draft');
      expect(content.projects.claimStatus).toBe('draft');
      expect(content.contact.claimStatus).toBe('draft');
    }
  });

  it('provides equivalent localized slide identities and section anchors', () => {
    const english = getAlternativeContent('en');
    const indonesian = getAlternativeContent('id');

    expect(indonesian.slides.map((slide) => slide.id)).toEqual(
      english.slides.map((slide) => slide.id),
    );
    expect(indonesian.navigation.map((item) => item.href)).toEqual(
      english.navigation.map((item) => item.href),
    );
  });
});
