import type { ImageMetadata } from 'astro';
import concept01 from '../assets/review/concept-01.png';
import concept02 from '../assets/review/concept-02.png';

export type ReviewConceptId = 'concept-01' | 'concept-02';
export type ReviewLocale = 'id' | 'en';

export interface ReviewLink {
  locale: ReviewLocale;
  label: 'Bahasa Indonesia' | 'English';
  href: '/id/' | '/en/' | '/alternative/id/' | '/alternative/';
}

export interface ReviewConcept {
  id: ReviewConceptId;
  title: 'Concept 01' | 'Concept 02';
  description: string;
  thumbnail: ImageMetadata;
  links: readonly [ReviewLink, ReviewLink];
}

export const REVIEW_CONCEPTS: readonly [ReviewConcept, ReviewConcept] = [
  {
    id: 'concept-01',
    title: 'Concept 01',
    description: 'Profil perusahaan dengan tampilan terang dan alur konten berbasis bagian.',
    thumbnail: concept01,
    links: [
      { locale: 'id', label: 'Bahasa Indonesia', href: '/id/' },
      { locale: 'en', label: 'English', href: '/en/' },
    ],
  },
  {
    id: 'concept-02',
    title: 'Concept 02',
    description: 'Profil perusahaan dengan tampilan editorial gelap dan pembuka berbasis carousel.',
    thumbnail: concept02,
    links: [
      { locale: 'id', label: 'Bahasa Indonesia', href: '/alternative/id/' },
      { locale: 'en', label: 'English', href: '/alternative/' },
    ],
  },
];
