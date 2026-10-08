export type Locale = 'id' | 'en';
export type ContentStatus = 'draft' | 'confirmed';
export type ProfileStatus = 'complete-draft' | 'pending';
export type SectionId =
  | 'hero'
  | 'legacy'
  | 'expertise'
  | 'ethics'
  | 'team'
  | 'clients'
  | 'contact';

export interface HomeContent {
  locale: Locale;
  meta: { title: string; description: string };
  navigation: Readonly<Record<SectionId, string>>;
  hero: { headline: 'Absolute Loyalty. Strategic Action.'; body: string };
  legacy: { headline: string; paragraphs: readonly string[] };
  expertise: {
    headline: string;
    introduction: string;
    items: readonly { title: string; body: string }[];
  };
  ethics: { headline: string; introduction: string; values: readonly string[] };
  team: { headline: string; introduction: string; pendingLabel: string };
  clients: {
    headline: string;
    introduction: string;
    expandLabel: string;
    collapseLabel: string;
  };
  contact: {
    headline: string;
    introduction: string;
    labels: Readonly<
      Record<'email' | 'phone' | 'whatsapp' | 'hours' | 'address' | 'map', string>
    >;
  };
  footer: { disclaimer: string; previewLabel: string };
}

export interface ContactDetails {
  email: 'wnp@wijayapartners.com';
  emailHref: 'mailto:wnp@wijayapartners.com';
  phoneDisplay: '0898-6000-822';
  phoneE164: '+628986000822';
  phoneHref: 'tel:+628986000822';
  whatsappE164: '628986000822';
  whatsappHref: 'https://wa.me/628986000822';
  hours: '09:00–17:00';
  address: string;
  mapUrl: string;
  status: 'draft';
}

export interface TeamMember {
  slug: string;
  name: string;
  credentials: string;
  profileStatus: ProfileStatus;
  locale: Locale;
  country: string;
  summary: string;
  biography: readonly string[];
  education: readonly string[];
  organizations: readonly string[];
  practiceAreas: readonly string[];
}

export interface ClientRecord {
  id: string;
  displayName: string;
  sourceFile: string;
  featured: boolean;
  approval: 'draft';
}
