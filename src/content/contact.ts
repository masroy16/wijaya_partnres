import type { ContactDetails } from '../i18n/types';

export const CONTACT = {
  email: 'wnp@wijayapartners.com',
  emailHref: 'mailto:wnp@wijayapartners.com',
  phoneDisplay: '0898-6000-822',
  phoneE164: '+628986000822',
  phoneHref: 'tel:+628986000822',
  whatsappE164: '628986000822',
  whatsappHref: 'https://wa.me/628986000822',
  hours: '09:00–17:00',
  address: 'Komplek Surya Setra A3 (Jl. Ters. Dr. Ir. Sutami Raya No. 16), Bandung, West Java, Indonesia',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Komplek%20Surya%20Setra%20A3%20Jl.%20Ters.%20Dr.%20Ir.%20Sutami%20Raya%20No.%2016%20Bandung',
  status: 'draft',
} as const satisfies ContactDetails;
