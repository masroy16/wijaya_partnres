export type AlternativeProfileLocale = 'en' | 'id';
export type AlternativeProfileStatus = 'source-draft' | 'placeholder';

export interface AlternativeProfileLabels {
  counselProfile: string;
  backToTeam: string;
  biography: string;
  education: string;
  organizations: string;
  practiceAreas: string;
  previous: string;
  next: string;
  contact: string;
}

export interface AlternativeTeamMember {
  slug: string;
  name: string;
  credentials: string;
  initials: string;
  country: string;
  profileStatus: AlternativeProfileStatus;
  summary: string;
  biography: readonly string[];
  education: readonly string[];
  organizations: readonly string[];
  practiceAreas: readonly string[];
  statusLabel: string;
  statusNote: string;
}

export const ALTERNATIVE_TEAM_SLUGS = [
  'herman-wijaya',
  'f-ebby-abraham',
  'rani-sisco',
  'arifan-sudaryanto',
  'diana-pangestu',
  'andi-cipta-lukmana',
] as const;

type SharedIdentity = Pick<AlternativeTeamMember, 'slug' | 'name' | 'credentials' | 'initials' | 'country'>;

const identities: readonly SharedIdentity[] = [
  { slug: 'herman-wijaya', name: 'Herman Wijaya', credentials: 'S.H.', initials: 'HW', country: 'Indonesia' },
  { slug: 'f-ebby-abraham', name: 'F. Ebby Abraham', credentials: 'S.H., M.Kn., CLA., CPL., ACIArb.', initials: 'FEA', country: 'Indonesia' },
  { slug: 'rani-sisco', name: 'Rani Sisco', credentials: 'S.H.', initials: 'RS', country: 'Indonesia' },
  { slug: 'arifan-sudaryanto', name: 'Arifan Sudaryanto', credentials: 'S.H.', initials: 'AS', country: 'Indonesia' },
  { slug: 'diana-pangestu', name: 'Diana Pangestu', credentials: 'S.H.', initials: 'DP', country: 'Indonesia' },
  { slug: 'andi-cipta-lukmana', name: 'Andi Cipta Lukmana', credentials: 'S.H.', initials: 'ACL', country: 'Indonesia' },
];

const labels: Record<AlternativeProfileLocale, AlternativeProfileLabels> = {
  en: {
    counselProfile: 'Counsel Profile',
    backToTeam: 'Back to our team',
    biography: 'Biography',
    education: 'Education',
    organizations: 'Professional organizations',
    practiceAreas: 'Practice areas',
    previous: 'Previous counsel',
    next: 'Next counsel',
    contact: 'Discuss a matter with our firm',
  },
  id: {
    counselProfile: 'Profil Penasihat',
    backToTeam: 'Kembali ke tim kami',
    biography: 'Biografi',
    education: 'Pendidikan',
    organizations: 'Organisasi profesional',
    practiceAreas: 'Bidang praktik',
    previous: 'Penasihat sebelumnya',
    next: 'Penasihat berikutnya',
    contact: 'Diskusikan perkara dengan firma kami',
  },
};

const englishSourceProfiles: readonly AlternativeTeamMember[] = [
  {
    ...identities[0]!,
    profileStatus: 'source-draft',
    summary: 'Founder of Wijaya & Partners with experience across civil and criminal law, litigation, corporate matters, labor, bankruptcy, and intellectual property.',
    biography: ['Herman Wijaya was born in Sukabumi in 1952. He founded Wijaya & Partners in 1988 on a commitment to rigor, integrity, and accessible legal counsel.'],
    education: ['Faculty of Law, Parahyangan Catholic University, S.H., 1973.'],
    organizations: ['Asosiasi Advokat Indonesia (AAI).', 'Perhimpunan Advokat Indonesia (PERADI).'],
    practiceAreas: [
      'Civil and criminal law',
      'Civil and criminal litigation',
      'Labor law',
      'Drafting and reviewing business agreements',
      'General corporate',
      'Bankruptcy law',
      'Intellectual property rights',
      'Build, operate and transfer',
      'Family law',
      'Plantation law',
      'State-owned corporation law',
    ],
    statusLabel: 'Source Draft',
    statusNote: 'Draft profile transcribed from supplied historical material. All details require firm approval before publication.',
  },
  {
    ...identities[1]!,
    profileStatus: 'source-draft',
    summary: 'A practitioner across commercial litigation, corporate matters, insolvency, project finance, banking, construction, and consumer protection.',
    biography: ['F. Ebby Abraham was born in Bandung in 1979 and works across contentious and transactional commercial matters.'],
    education: [
      'Faculty of Law, Parahyangan Catholic University, S.H., 1999.',
      'Master of Notarial Law, Padjadjaran University, M.Kn., 2006.',
      'Asosiasi Kurator dan Pengurus Indonesia, 2012.',
      'Jimly School of Law and Government, 2015.',
    ],
    organizations: [
      'Deputy Chairman, Kongres Advokat Indonesia West Java.',
      'Member, Asosiasi Kurator dan Pengurus Indonesia.',
      'Member, Asosiasi Auditor Hukum Indonesia.',
      'Member, Asosiasi Pengacara Pengadaan Indonesia.',
    ],
    practiceAreas: [
      'Civil and commercial litigation',
      'General corporate and business law',
      'Drafting and reviewing business agreements',
      'Project finance and banking',
      'Construction and plantation law',
      'State-owned corporation law',
      'Labor and bankruptcy law',
      'Tourism law',
      'Build, operate and transfer',
      'Consumer protection law',
    ],
    statusLabel: 'Source Draft',
    statusNote: 'The supplied source narrative uses the name “Franz” while the roster uses “F. Ebby Abraham.” This and all profile details require firm confirmation.',
  },
];

const indonesianSourceProfiles: readonly AlternativeTeamMember[] = [
  {
    ...identities[0]!,
    profileStatus: 'source-draft',
    summary: 'Pendiri Wijaya & Partners dengan pengalaman pada hukum perdata dan pidana, litigasi, korporasi, ketenagakerjaan, kepailitan, serta hak kekayaan intelektual.',
    biography: ['Herman Wijaya lahir di Sukabumi pada 1952. Ia mendirikan Wijaya & Partners pada 1988 dengan landasan ketelitian, integritas, dan pendampingan hukum yang dekat dengan klien.'],
    education: ['Fakultas Hukum Universitas Katolik Parahyangan, S.H., 1973.'],
    organizations: ['Asosiasi Advokat Indonesia (AAI).', 'Perhimpunan Advokat Indonesia (PERADI).'],
    practiceAreas: [
      'Hukum perdata dan pidana',
      'Litigasi perdata dan pidana',
      'Hukum ketenagakerjaan',
      'Penyusunan dan penelaahan perjanjian bisnis',
      'Korporasi umum',
      'Hukum kepailitan',
      'Hak kekayaan intelektual',
      'Build, operate and transfer',
      'Hukum keluarga',
      'Hukum perkebunan',
      'Hukum badan usaha milik negara',
    ],
    statusLabel: 'Draf Sumber',
    statusNote: 'Profil draf ditranskripsikan dari materi historis yang diberikan. Seluruh detail memerlukan persetujuan firma sebelum publikasi.',
  },
  {
    ...identities[1]!,
    profileStatus: 'source-draft',
    summary: 'Praktisi litigasi komersial, korporasi, insolvensi, keuangan proyek, perbankan, konstruksi, dan perlindungan konsumen.',
    biography: ['F. Ebby Abraham lahir di Bandung pada 1979 dan menangani perkara sengketa maupun transaksi komersial.'],
    education: [
      'Fakultas Hukum Universitas Katolik Parahyangan, S.H., 1999.',
      'Magister Kenotariatan Universitas Padjadjaran, M.Kn., 2006.',
      'Asosiasi Kurator dan Pengurus Indonesia, 2012.',
      'Jimly School of Law and Government, 2015.',
    ],
    organizations: [
      'Wakil Ketua Kongres Advokat Indonesia Jawa Barat.',
      'Anggota Asosiasi Kurator dan Pengurus Indonesia.',
      'Anggota Asosiasi Auditor Hukum Indonesia.',
      'Anggota Asosiasi Pengacara Pengadaan Indonesia.',
    ],
    practiceAreas: [
      'Litigasi perdata dan komersial',
      'Korporasi umum dan hukum bisnis',
      'Penyusunan dan penelaahan perjanjian bisnis',
      'Keuangan proyek dan perbankan',
      'Hukum konstruksi dan perkebunan',
      'Hukum badan usaha milik negara',
      'Hukum ketenagakerjaan dan kepailitan',
      'Hukum pariwisata',
      'Build, operate and transfer',
      'Hukum perlindungan konsumen',
    ],
    statusLabel: 'Draf Sumber',
    statusNote: 'Narasi sumber menggunakan nama “Franz”, sedangkan daftar anggota menggunakan “F. Ebby Abraham.” Hal ini dan seluruh detail profil memerlukan konfirmasi firma.',
  },
];

const placeholderFocus: Record<AlternativeProfileLocale, readonly string[][]> = {
  en: [
    ['Commercial advisory', 'Contract review', 'Dispute support'],
    ['Corporate advisory', 'Employment matters', 'Commercial agreements'],
    ['Business law', 'Regulatory research', 'Dispute resolution'],
    ['Corporate support', 'Contract drafting', 'Litigation support'],
  ],
  id: [
    ['Konsultasi komersial', 'Penelaahan kontrak', 'Dukungan sengketa'],
    ['Konsultasi korporasi', 'Ketenagakerjaan', 'Perjanjian komersial'],
    ['Hukum bisnis', 'Riset regulasi', 'Penyelesaian sengketa'],
    ['Dukungan korporasi', 'Penyusunan kontrak', 'Dukungan litigasi'],
  ],
};

function getPlaceholderProfiles(locale: AlternativeProfileLocale): readonly AlternativeTeamMember[] {
  return identities.slice(2).map((identity, index) => ({
    ...identity,
    profileStatus: 'placeholder',
    summary: locale === 'en'
      ? 'Draft placeholder summary for a member of the firm’s focused legal team.'
      : 'Ringkasan placeholder untuk anggota tim hukum firma yang terfokus.',
    biography: [locale === 'en'
      ? 'Placeholder biography awaiting verified professional background and role information from the firm.'
      : 'Biografi placeholder menunggu informasi latar belakang profesional dan peran yang telah diverifikasi firma.'],
    education: [locale === 'en'
      ? 'Placeholder — education details to be confirmed.'
      : 'Placeholder — detail pendidikan akan dikonfirmasi.'],
    organizations: [locale === 'en'
      ? 'Placeholder — professional memberships to be confirmed.'
      : 'Placeholder — keanggotaan organisasi profesional akan dikonfirmasi.'],
    practiceAreas: placeholderFocus[locale][index]!,
    statusLabel: locale === 'en' ? 'Draft / Placeholder Content' : 'Draf / Konten Placeholder',
    statusNote: locale === 'en'
      ? 'Dummy placeholder content for design review only. Replace every profile detail with firm-approved information before publication.'
      : 'Konten dummy placeholder hanya untuk peninjauan desain. Ganti seluruh detail profil dengan informasi yang disetujui firma sebelum publikasi.',
  }));
}

export function getAlternativeTeam(locale: AlternativeProfileLocale): readonly AlternativeTeamMember[] {
  const sourceProfiles = locale === 'id' ? indonesianSourceProfiles : englishSourceProfiles;
  return [...sourceProfiles, ...getPlaceholderProfiles(locale)];
}

export function getAlternativeTeamMember(
  locale: AlternativeProfileLocale,
  slug: string,
): AlternativeTeamMember | undefined {
  return getAlternativeTeam(locale).find((member) => member.slug === slug);
}

export function getAlternativeProfileLabels(locale: AlternativeProfileLocale): AlternativeProfileLabels {
  return labels[locale];
}

export function getAlternativeTeamPaths(): readonly {
  locale: AlternativeProfileLocale;
  member: AlternativeTeamMember;
}[] {
  return (['en', 'id'] as const).flatMap((locale) =>
    getAlternativeTeam(locale).map((member) => ({ locale, member })),
  );
}
