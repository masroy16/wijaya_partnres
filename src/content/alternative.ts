import { getAlternativeTeam, type AlternativeTeamMember } from './alternative-team';

export type Locale = 'en' | 'id';
export type SlideId = 'hero' | 'expertise' | 'values';
export type ClaimStatus = 'draft';

export interface NavigationItem {
  label: string;
  href: '#about' | '#team' | '#projects' | '#contact';
}

export interface AlternativeSlide {
  id: SlideId;
  eyebrow: string;
  title: string;
  body: string;
  items: readonly string[];
  image: string;
  imageAlt: string;
  mood: string;
  cta?: { label: string; href: string };
}

export interface ProjectMark {
  name: string;
  image: string;
}

export interface AlternativePageContent {
  locale: Locale;
  meta: { title: string; description: string };
  previewLabel: string;
  navigation: readonly NavigationItem[];
  utilities: {
    menu: string;
    close: string;
    theme: string;
    language: string;
    skip: string;
  };
  carousel: {
    label: string;
    previous: string;
    next: string;
    pause: string;
    resume: string;
    slideLabel: string;
  };
  slides: readonly AlternativeSlide[];
  about: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    claimStatus: ClaimStatus;
    draftNote: string;
    stats: readonly { value: string; label: string }[];
  };
  teamSection: { eyebrow: string; title: string; introduction: string };
  team: readonly AlternativeTeamMember[];
  projects: {
    eyebrow: string;
    title: string;
    introduction: string;
    claimStatus: ClaimStatus;
    draftNote: string;
    marks: readonly ProjectMark[];
  };
  contact: {
    eyebrow: string;
    title: string;
    introduction: string;
    email: string;
    phoneDisplay: string;
    phoneHref: string;
    whatsappHref: string;
    hours: string;
    address: string;
    mapHref: string;
    labels: {
      email: string;
      phone: string;
      whatsapp: string;
      hours: string;
      address: string;
      map: string;
    };
    claimStatus: ClaimStatus;
    draftNote: string;
  };
  footer: { disclaimer: string; copyright: string };
}

const PROJECT_MARKS: readonly ProjectMark[] = [
  { name: 'Fujitex', image: '/assets/alternative/clients/fujitex.png' },
  { name: 'The Ritz-Carlton', image: '/assets/alternative/clients/ritz-carlton.jpg' },
  { name: 'De Paviljoen Bandung', image: '/assets/alternative/clients/de-paviljoen.jpeg' },
  { name: 'Hilton Bandung', image: '/assets/alternative/clients/hilton-bandung.jpg' },
  { name: 'Caffé Bene', image: '/assets/alternative/clients/caffe-bene.jpeg' },
  { name: 'PT RIM', image: '/assets/alternative/clients/pt-rim.png' },
  { name: 'Conrad Bali', image: '/assets/alternative/clients/conrad-bali.png' },
  { name: 'Richeese Factory', image: '/assets/alternative/clients/richeese-factory.png' },
  { name: 'Investa Land Indonesia', image: '/assets/alternative/clients/investa-land.webp' },
  { name: 'Sanders', image: '/assets/alternative/clients/sanders.png' },
];

const english: AlternativePageContent = {
  locale: 'en',
  meta: {
    title: 'Wijaya & Partners — Alternative Concept',
    description: 'A rooted, strategic, and modern law-firm concept from Bandung.',
  },
  previewLabel: 'Concept Preview · Draft Content',
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Our Teams', href: '#team' },
    { label: 'Our Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  utilities: {
    menu: 'Open menu',
    close: 'Close menu',
    theme: 'Toggle color theme',
    language: 'View in Indonesian',
    skip: 'Skip to content',
  },
  carousel: {
    label: 'Firm introduction',
    previous: 'Previous story',
    next: 'Next story',
    pause: 'Pause automatic slides',
    resume: 'Resume automatic slides',
    slideLabel: 'Go to story',
  },
  slides: [
    {
      id: 'hero',
      eyebrow: 'Bandung · Since 1988',
      title: 'Absolute Loyalty. Strategic Action.',
      body: 'Nearly four decades of institutional wisdom, partner-led attention, and decisive legal strategy.',
      items: [],
      image: '/assets/alternative/bandung-heritage.jpeg',
      imageAlt: 'Heritage civic architecture in Bandung',
      mood: 'Established · Rooted · Elite',
      cta: { label: 'Discover our legacy', href: '#about' },
    },
    {
      id: 'expertise',
      eyebrow: 'Expertise & Perspective',
      title: 'Strategic Capability Across the Archipelago.',
      body: 'Focused legal counsel for complex commercial mandates and consequential disputes.',
      items: [
        'Commercial Litigation',
        'Insolvency & Debt Strategy',
        'Corporate Advisory',
      ],
      image: '/assets/alternative/expertise-library-courtroom.png',
      imageAlt: 'Traditional law library opening into modern courtroom architecture',
      mood: 'Wise · Strategic · Modern',
      cta: { label: 'Meet the team', href: '#team' },
    },
    {
      id: 'values',
      eyebrow: 'Our Values',
      title: 'Principles That Hold Under Pressure.',
      body: 'The standards behind every recommendation, negotiation, and courtroom decision.',
      items: ['Integrity', 'Absolute Loyalty', 'Clear Communication', 'Practical Solutions'],
      image: '/assets/alternative/values-marble.png',
      imageAlt: 'Ivory marble and stone with restrained burgundy architectural detail',
      mood: 'Ethical · Solid · Professional',
      cta: { label: 'Start a conversation', href: '#contact' },
    },
  ],
  about: {
    eyebrow: 'About the Firm',
    title: 'Institutional wisdom. Modern strategic action.',
    paragraphs: [
      'Founded in 1988 by Mr. Herman Wijaya, our firm was built on a foundation of intellectual rigor and deep-rooted integrity. From our offices in Bandung, we have spent nearly four decades navigating the complexities of the Indonesian legal landscape.',
      'Today, under the leadership of Francis Ebby, we combine this institutional wisdom with specialized litigation experience. We are a boutique firm by choice, allowing us to offer the personal attention of a partner-led team with the capabilities of a major institution.',
      'Our “Strategic Action” approach is battle-tested. We recently navigated a landmark IDR 1 trillion bankruptcy dispute at the Central Jakarta District Court—demonstrating that, from our Bandung roots, we deliver results that resonate on a national scale.',
    ],
    claimStatus: 'draft',
    draftNote: 'Draft concept: leadership, experience, matter value, venue, and outcome require firm approval.',
    stats: [
      { value: '1988', label: 'Founded in Bandung' },
      { value: '6', label: 'Partner-led professionals' },
      { value: 'ID', label: 'Nationwide perspective' },
    ],
  },
  teamSection: {
    eyebrow: 'Our Teams',
    title: 'Direct access to experienced counsel.',
    introduction: 'A focused team working with clarity, responsiveness, and shared accountability.',
  },
  team: getAlternativeTeam('en'),
  projects: {
    eyebrow: 'Our Projects',
    title: 'Trusted across industries and complex mandates.',
    introduction: 'A selected concept portfolio drawn from the supplied client materials.',
    claimStatus: 'draft',
    draftNote: 'Draft concept: client relationships and logo permissions require confirmation.',
    marks: PROJECT_MARKS,
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Bring the matter to our table.',
    introduction: 'Based in Bandung, serving clients across Indonesia with direct partner attention.',
    email: 'wnp@wijayapartners.com',
    phoneDisplay: '0898-6000-822',
    phoneHref: 'tel:+628986000822',
    whatsappHref: 'https://wa.me/628986000822',
    hours: '09:00–17:00',
    address: 'Komplek Surya Setra A3 (Jl. Ters. Dr. Ir. Sutami Raya No. 16), Bandung, West Java, Indonesia',
    mapHref: 'https://www.google.com/maps/search/?api=1&query=Komplek%20Surya%20Setra%20A3%20Bandung',
    labels: {
      email: 'Email',
      phone: 'Telephone',
      whatsapp: 'WhatsApp',
      hours: 'Office hours',
      address: 'Office',
      map: 'Open directions',
    },
    claimStatus: 'draft',
    draftNote: 'Draft concept: contact details require confirmation.',
  },
  footer: {
    disclaimer: 'This concept contains general information and does not constitute legal advice.',
    copyright: '© 2026 Wijaya & Partners. All rights reserved.',
  },
};

const indonesian: AlternativePageContent = {
  ...english,
  locale: 'id',
  meta: {
    title: 'Wijaya & Partners — Konsep Alternatif',
    description: 'Konsep firma hukum yang berakar, strategis, dan modern dari Bandung.',
  },
  previewLabel: 'Concept Preview · Konten Draf',
  navigation: [
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Tim Kami', href: '#team' },
    { label: 'Proyek Kami', href: '#projects' },
    { label: 'Kontak', href: '#contact' },
  ],
  utilities: {
    menu: 'Buka menu',
    close: 'Tutup menu',
    theme: 'Ubah tema warna',
    language: 'Lihat dalam bahasa Inggris',
    skip: 'Langsung ke konten',
  },
  carousel: {
    label: 'Pengantar firma',
    previous: 'Cerita sebelumnya',
    next: 'Cerita berikutnya',
    pause: 'Jeda pergantian otomatis',
    resume: 'Lanjutkan pergantian otomatis',
    slideLabel: 'Buka cerita',
  },
  slides: [
    {
      ...english.slides[0],
      eyebrow: 'Bandung · Sejak 1988',
      title: 'Loyalitas Mutlak. Langkah Strategis.',
      body: 'Hampir empat dekade kebijaksanaan institusional, perhatian langsung partner, dan strategi hukum yang tegas.',
      mood: 'Mapan · Berakar · Berkelas',
      cta: { label: 'Kenali perjalanan kami', href: '#about' },
    },
    {
      ...english.slides[1],
      eyebrow: 'Keahlian & Perspektif',
      title: 'Kapabilitas Strategis di Seluruh Nusantara.',
      body: 'Pendampingan hukum terfokus untuk mandat komersial kompleks dan sengketa penting.',
      items: ['Litigasi Komersial', 'Strategi Insolvensi & Utang', 'Konsultasi Korporasi'],
      mood: 'Bijak · Strategis · Modern',
      cta: { label: 'Temui tim kami', href: '#team' },
    },
    {
      ...english.slides[2],
      eyebrow: 'Nilai Kami',
      title: 'Prinsip yang Kokoh dalam Tekanan.',
      body: 'Standar yang mendasari setiap rekomendasi, negosiasi, dan keputusan di ruang sidang.',
      items: ['Integritas', 'Loyalitas Mutlak', 'Komunikasi Jelas', 'Solusi Praktis'],
      mood: 'Etis · Kokoh · Profesional',
      cta: { label: 'Mulai berdiskusi', href: '#contact' },
    },
  ],
  about: {
    eyebrow: 'Tentang Firma',
    title: 'Kebijaksanaan institusional. Langkah strategis modern.',
    paragraphs: [
      'Didirikan pada tahun 1988 oleh Bapak Herman Wijaya, firma kami dibangun di atas landasan ketajaman intelektual dan integritas yang mengakar. Dari kantor kami di Bandung, hampir empat dekade telah kami lalui dalam menavigasi kompleksitas lanskap hukum Indonesia.',
      'Kini, di bawah kepemimpinan Francis Ebby, kami memadukan kebijaksanaan institusional tersebut dengan pengalaman khusus di bidang litigasi. Kami memilih menjadi firma butik agar dapat menawarkan perhatian personal dari tim yang dipimpin langsung oleh partner, dengan kapabilitas setara institusi besar.',
      'Pendekatan “Strategic Action” kami telah teruji. Kami baru-baru ini menangani sengketa kepailitan bernilai IDR 1 triliun di Pengadilan Negeri Jakarta Pusat—menunjukkan bahwa dari akar kami di Bandung, kami menghadirkan hasil yang berdampak pada skala nasional.',
    ],
    claimStatus: 'draft',
    draftNote: 'Konsep draf: kepemimpinan, pengalaman, nilai perkara, lokasi, dan hasil memerlukan persetujuan firma.',
    stats: [
      { value: '1988', label: 'Berdiri di Bandung' },
      { value: '6', label: 'Profesional dipimpin partner' },
      { value: 'ID', label: 'Perspektif nasional' },
    ],
  },
  teamSection: {
    eyebrow: 'Tim Kami',
    title: 'Akses langsung kepada penasihat berpengalaman.',
    introduction: 'Tim terfokus yang bekerja dengan kejelasan, responsivitas, dan tanggung jawab bersama.',
  },
  team: getAlternativeTeam('id'),
  projects: {
    ...english.projects,
    eyebrow: 'Proyek Kami',
    title: 'Dipercaya lintas industri dan mandat kompleks.',
    introduction: 'Pilihan portofolio konsep berdasarkan materi klien yang diberikan.',
    draftNote: 'Konsep draf: hubungan klien dan izin penggunaan logo memerlukan konfirmasi.',
  },
  contact: {
    ...english.contact,
    eyebrow: 'Kontak',
    title: 'Bawa persoalan Anda ke meja kami.',
    introduction: 'Berbasis di Bandung, melayani klien di seluruh Indonesia dengan perhatian langsung partner.',
    labels: {
      email: 'Email',
      phone: 'Telepon',
      whatsapp: 'WhatsApp',
      hours: 'Jam kantor',
      address: 'Kantor',
      map: 'Buka petunjuk arah',
    },
    draftNote: 'Konsep draf: detail kontak memerlukan konfirmasi.',
  },
  footer: {
    disclaimer: 'Konsep ini memuat informasi umum dan bukan merupakan nasihat hukum.',
    copyright: '© 2026 Wijaya & Partners. Seluruh hak dilindungi.',
  },
};

export function getAlternativeContent(locale: Locale): AlternativePageContent {
  return locale === 'id' ? indonesian : english;
}
