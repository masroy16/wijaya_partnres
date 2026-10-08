import type { Locale, TeamMember } from '../i18n/types';

export const TEAM_SLUGS = [
  'herman-wijaya',
  'f-ebby-abraham',
  'rani-sisco',
  'arifan-sudaryanto',
  'diana-pangestu',
  'andi-cipta-lukmana',
] as const;

const sharedPending = [
  ['rani-sisco', 'Rani Sisco', 'S.H.'],
  ['arifan-sudaryanto', 'Arifan Sudaryanto', 'S.H.'],
  ['diana-pangestu', 'Diana Pangestu', 'S.H.'],
  ['andi-cipta-lukmana', 'Andi Cipta Lukmana', 'S.H.'],
] as const;

const completeProfiles: Record<Locale, readonly TeamMember[]> = {
  id: [
    {
      slug: 'herman-wijaya',
      name: 'Herman Wijaya',
      credentials: 'S.H.',
      profileStatus: 'complete-draft',
      locale: 'id',
      country: 'Indonesia',
      summary:
        'Pendiri Wijaya And Partners dengan pengalaman pada hukum perdata dan pidana, litigasi, korporasi, ketenagakerjaan, kepailitan, serta hak kekayaan intelektual.',
      biography: [
        'Herman Wijaya lahir di Sukabumi pada 1952. Ia mendirikan Wijaya And Partners pada 1988 dengan landasan ketelitian, integritas, dan pendampingan hukum yang dekat dengan klien.',
      ],
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
    },
    {
      slug: 'f-ebby-abraham',
      name: 'F. Ebby Abraham',
      credentials: 'S.H., M.Kn., CLA., CPL., ACIArb.',
      profileStatus: 'complete-draft',
      locale: 'id',
      country: 'Indonesia',
      summary:
        'Praktisi litigasi komersial, korporasi, insolvensi, keuangan proyek, perbankan, konstruksi, dan perlindungan konsumen.',
      biography: [
        'F. Ebby Abraham lahir di Bandung pada 1979. Materi profil sumber menggunakan nama “Franz”; ejaan nama lengkap ini masih memerlukan konfirmasi sebelum publikasi produksi.',
      ],
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
    },
  ],
  en: [
    {
      slug: 'herman-wijaya',
      name: 'Herman Wijaya',
      credentials: 'S.H.',
      profileStatus: 'complete-draft',
      locale: 'en',
      country: 'Indonesia',
      summary:
        'Founder of Wijaya And Partners with experience across civil and criminal law, litigation, corporate matters, labor, bankruptcy, and intellectual property.',
      biography: [
        'Herman Wijaya was born in Sukabumi in 1952. He founded Wijaya And Partners in 1988 on a commitment to rigor, integrity, and accessible legal counsel.',
      ],
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
    },
    {
      slug: 'f-ebby-abraham',
      name: 'F. Ebby Abraham',
      credentials: 'S.H., M.Kn., CLA., CPL., ACIArb.',
      profileStatus: 'complete-draft',
      locale: 'en',
      country: 'Indonesia',
      summary:
        'A practitioner across commercial litigation, corporate matters, insolvency, project finance, banking, construction, and consumer protection.',
      biography: [
        'F. Ebby Abraham was born in Bandung in 1979. The supplied source profile uses the name “Franz”; his full-name styling requires confirmation before production publication.',
      ],
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
    },
  ],
};

function pendingProfiles(locale: Locale): readonly TeamMember[] {
  const summary = locale === 'id' ? 'Profil lengkap sedang disiapkan.' : 'A complete profile is being prepared.';

  return sharedPending.map(([slug, name, credentials]) => ({
    slug,
    name,
    credentials,
    profileStatus: 'pending' as const,
    locale,
    country: 'Indonesia',
    summary,
    biography: [],
    education: [],
    organizations: [],
    practiceAreas: [],
  }));
}

export function getTeamMembers(locale: Locale): readonly TeamMember[] {
  return [...completeProfiles[locale], ...pendingProfiles(locale)];
}

export function getTeamMember(locale: Locale, slug: string): TeamMember | undefined {
  return getTeamMembers(locale).find((member) => member.slug === slug);
}

export function getAllTeamPaths(): readonly {
  params: { lang: Locale; slug: string };
  props: { member: TeamMember };
}[] {
  return (['id', 'en'] as const).flatMap((locale) =>
    getTeamMembers(locale).map((member) => ({
      params: { lang: locale, slug: member.slug },
      props: { member },
    })),
  );
}
