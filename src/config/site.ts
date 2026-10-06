export interface SiteConfig {
  name: 'Wijaya And Partners';
  defaultLocale: 'id';
  locales: readonly ['id', 'en'];
  preview: true;
  canonicalBase: string;
}

export const SITE = {
  name: 'Wijaya And Partners',
  defaultLocale: 'id',
  locales: ['id', 'en'],
  preview: true,
  canonicalBase: 'https://wijaya-partners-concept-preview.netlify.app',
} as const satisfies SiteConfig;
