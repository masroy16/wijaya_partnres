import type { ImageMetadata } from 'astro';
import concept01 from '../assets/review/concept-01.png';
import concept02 from '../assets/review/concept-02.png';

export type ReviewConceptId = 'concept-01' | 'concept-02';
export type ReviewLocale = 'id' | 'en';

export interface ReviewLink {
  locale: ReviewLocale;
  label: string;
  href: string;
}

export interface ReviewConcept {
  id: ReviewConceptId;
  title: string;
  thumbnail: ImageMetadata;
  thumbnailAlt: string;
  links: readonly ReviewLink[];
}

export const REVIEW_CONCEPTS: readonly ReviewConcept[] = [
  {
    id: 'concept-01',
    title: 'Concept 01',
    thumbnail: concept01,
    thumbnailAlt: 'Tampilan awal Concept 01',
    links: [
      { locale: 'id', label: 'Bahasa Indonesia', href: '/id/' },
      { locale: 'en', label: 'English', href: '/en/' },
    ],
  },
  {
    id: 'concept-02',
    title: 'Concept 02',
    thumbnail: concept02,
    thumbnailAlt: 'Tampilan awal Concept 02',
    links: [
      { locale: 'id', label: 'Bahasa Indonesia', href: '/alternative/id/' },
      { locale: 'en', label: 'English', href: '/alternative/' },
    ],
  },
] as const;
