import type { ClientRecord } from '../i18n/types';

export const CLIENT_SOURCE_COUNT = 28;

export const CLIENT_EXCLUSIONS = [
  {
    sourceFile: '1647487154998.jpeg',
    reason:
      'Composite image repeats the Richeese and PT Pinus Merah Abadi marks; both organizations are represented by clearer standalone source files.',
  },
] as const;

export const CLIENTS = [
  { id: 'kagum-group', displayName: 'Kagum Group', sourceFile: 'kagum-group.jpeg', featured: true, approval: 'draft' },
  { id: 'bozzetto-group', displayName: 'Bozzetto Group', sourceFile: 'bozzetto-group.jpeg', featured: true, approval: 'draft' },
  { id: 'nabati', displayName: 'Nabati', sourceFile: 'nabati.png', featured: true, approval: 'draft' },
  { id: 'perkebunan-nusantara-viii', displayName: 'PT Perkebunan Nusantara VIII', sourceFile: 'perkebunan-nusantara-viii.png', featured: true, approval: 'draft' },
  { id: 'dirgantara-indonesia', displayName: 'Dirgantara Indonesia', sourceFile: 'dirgantara-indonesia.jpeg', featured: true, approval: 'draft' },
  { id: 'tifico', displayName: 'PT Tifico Fiber Indonesia Tbk.', sourceFile: 'tifico.jpeg', featured: true, approval: 'draft' },
  { id: 'imedco', displayName: 'Imedco', sourceFile: 'imedco.webp', featured: true, approval: 'draft' },
  { id: 'conrad-bali', displayName: 'Conrad Bali', sourceFile: 'conrad-bali.png', featured: true, approval: 'draft' },
  { id: 'fujitex', displayName: 'Fujitex', sourceFile: 'fujitex.png', featured: true, approval: 'draft' },
  { id: 'hilton-bandung', displayName: 'Hilton Bandung', sourceFile: 'hilton-bandung.jpg', featured: true, approval: 'draft' },
  { id: 'sanders', displayName: 'Sanders', sourceFile: 'sanders.png', featured: true, approval: 'draft' },
  { id: 'ritz-carlton', displayName: 'The Ritz-Carlton', sourceFile: 'ritz-carlton.jpg', featured: true, approval: 'draft' },
  { id: 'nusa-sarana-indonesia', displayName: 'PT Nusa Sarana Indonesia', sourceFile: 'nusa-sarana-indonesia.jpeg', featured: true, approval: 'draft' },
  { id: 'rimba-insantek-mandiri', displayName: 'PT Rimba Insantek Mandiri', sourceFile: 'rimba-insantek-mandiri.png', featured: true, approval: 'draft' },
  { id: 'jaya-prima', displayName: 'Jaya Prima', sourceFile: 'jaya-prima.jpeg', featured: false, approval: 'draft' },
  { id: 'pinus-merah-abadi', displayName: 'PT Pinus Merah Abadi', sourceFile: 'pinus-merah-abadi.png', featured: false, approval: 'draft' },
  { id: 'china-railway-group', displayName: 'China Railway Group Limited', sourceFile: 'china-railway-group.jpeg', featured: false, approval: 'draft' },
  { id: 'kaldu-sari-nabati', displayName: 'PT Kaldu Sari Nabati Indonesia', sourceFile: 'kaldu-sari-nabati.jpeg', featured: false, approval: 'draft' },
  { id: 'leuwitex', displayName: 'Leuwitex', sourceFile: 'leuwitex.jpeg', featured: false, approval: 'draft' },
  { id: 'caffe-bene', displayName: 'Caffé Bene', sourceFile: 'caffe-bene.jpeg', featured: false, approval: 'draft' },
  { id: 'hermawan-megah-dana', displayName: 'PT Hermawan Megah Dana', sourceFile: 'hermawan-megah-dana.jpg', featured: false, approval: 'draft' },
  { id: 'bahana-sentral-fortisindo', displayName: 'PT Bahana Sentral Fortisindo', sourceFile: 'bahana-sentral-fortisindo.jpg', featured: false, approval: 'draft' },
  { id: 'investa-land', displayName: 'Investa Land', sourceFile: 'investa-land.webp', featured: false, approval: 'draft' },
  { id: 'pasir-ucing-timur', displayName: 'PT Pasir Ucing Timur', sourceFile: 'pasir-ucing-timur.jpg', featured: false, approval: 'draft' },
  { id: 'de-paviljoen', displayName: 'De Paviljoen Bandung', sourceFile: 'de-paviljoen.jpeg', featured: false, approval: 'draft' },
  { id: 'luxton-cirebon', displayName: 'The Luxton Cirebon Hotel & Convention', sourceFile: 'luxton-cirebon.png', featured: false, approval: 'draft' },
  { id: 'richeese-factory', displayName: 'Richeese Factory', sourceFile: 'richeese-factory.png', featured: false, approval: 'draft' },
] as const satisfies readonly ClientRecord[];

export function getFeaturedClients(): readonly ClientRecord[] {
  return CLIENTS.filter((client) => client.featured);
}
