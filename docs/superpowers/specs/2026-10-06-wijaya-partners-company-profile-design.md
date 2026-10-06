# Wijaya And Partners Company Profile MVP Design

## Purpose

This specification defines a bilingual company profile MVP for Wijaya And Partners Law Firm. The MVP will be used as a concept preview for the firm before a production engagement. It must demonstrate a credible visual direction and complete user experience without presenting unapproved content as an official public statement.

The site must explain the firm, its values, areas of practice, team, representative clients, and contact channels. It must help business owners, directors, in-house legal teams, and international companies or investors understand the firm and feel confident contacting it.

## Success Criteria

The MVP succeeds when it:

- Presents Wijaya And Partners as professional, pragmatic, responsive, and commercially aware.
- Works in Bahasa Indonesia and English with equivalent routes and content coverage.
- Provides clear access to email, telephone, WhatsApp, office hours, office address, and map directions.
- Runs locally for an offline presentation and can be shared through a Netlify Free URL.
- Is responsive, keyboard-accessible, fast, and usable in light and dark modes.
- Uses only supplied or clearly identified draft content and does not invent legal credentials, experience, clients, or case outcomes.
- Gives the firm a structured content-intake document for converting the MVP into a production website.

## Scope

### Included

- A static-first Astro website.
- Bilingual Indonesian and English routes.
- A section-based homepage.
- Individual profile pages for six team members.
- Light and dark themes.
- Responsive desktop, tablet, and mobile layouts.
- Twelve to sixteen featured client logos on the homepage and an inline way to reveal the remaining supplied logos.
- Direct contact links without a message form.
- A floating WhatsApp action and WhatsApp in the contact section.
- Temporary visual assets and team placeholders where official assets are unavailable.
- SEO metadata and structured data prepared for later production use.
- A professionally formatted content-intake DOCX.
- Automated testing, code review, and browser verification.
- Local preview and a Netlify Free deployment.

### Excluded

- A content management system.
- A blog, news, or publication system.
- A contact form or backend.
- Authentication or user accounts.
- Analytics, cookies, or third-party tracking.
- Public-indexing readiness for unapproved draft content.
- Invented team biographies, titles, practice claims, client relationships, or case results.

## Audience

The site serves three equally important audience groups:

1. Business owners and company directors.
2. In-house legal teams and corporate counsel.
3. International companies and investors operating in Indonesia.

The writing must remain authoritative for legal professionals while being understandable to non-lawyers and business decision-makers.

## Information Architecture

The root experience routes visitors into a complete Indonesian or English version. The primary locale routes are `/id/` and `/en/`. Language switching preserves page context whenever a matching translation exists.

### Homepage sequence

1. Floating header with brand, section navigation, language switching, and theme control.
2. Hero with the promise “Absolute Loyalty. Strategic Action.”
3. Legacy narrative beginning in 1988.
4. Expertise covering commercial litigation, insolvency and debt strategy, corporate advisory, and nationwide reach.
5. Ethics and perspective using the firm’s own values rather than an external quotation.
6. Team overview with six member cards.
7. Clients and key matters with featured logos and expandable full portfolio.
8. Contact details and direct communication actions.
9. Footer with concise navigation, draft status, informational disclaimer, and copyright.

### Team profile routes

Each team member receives a stable localized route. Herman Wijaya and F. Ebby Abraham receive edited profiles based on supplied source material. Rani Sisco, Arifan Sudaryanto, Diana Pangestu, and Andi Cipta Lukmana receive factual name-and-credential profiles with a clear note that complete information is being prepared.

No missing profile field may be replaced with invented copy.

## Visual Direction

The visual character is a refined interpretation of the supplied references: a modern editorial law-firm identity rooted in Bandung and described as “Humble but Powerful.” It must avoid both generic corporate styling and excessive luxury cues.

### Design system

- Primary colors are burgundy or maroon derived from the logo, near-black, warm white, and stone gray.
- Strong sans-serif headlines echo the supplied concepts. A restrained editorial serif may be used for quotations or select narrative moments. Body and interface text use a highly readable sans-serif.
- Generous spacing, a consistent content grid, and responsive type create authority without visual clutter.
- Focus indicators, selected states, borders, and text must meet accessible contrast requirements in both themes.

### Navigation and interaction

- Desktop navigation uses the floating pill form shown in the references but with clearer spacing and focus behavior.
- Mobile navigation condenses to brand, theme control, language control, and a menu trigger.
- The theme defaults to the operating-system preference on first visit, supports manual switching, and persists the visitor’s choice.
- The floating WhatsApp control remains accessible and never covers important content at narrow viewport sizes.
- Motion is limited to subtle entrance and state transitions. No autoplay carousel or heavy parallax is allowed. Reduced-motion preferences disable nonessential animation.

### Section imagery

- Hero uses one of the supplied Bandung building photographs with responsive cropping and a readability overlay.
- Legacy uses a temporary close-up legal-book or fountain-pen visual.
- Expertise uses a temporary abstract courthouse corridor or modern business-architecture visual.
- Ethics uses a temporary stone or marble texture.
- Temporary assets contain no embedded text and must use a consistent restrained treatment.
- The supplied firm logo is presented temporarily on a neutral field that works in both themes. The production version requires an official vector or transparent master asset.
- Team members without approved portraits use consistent monogram placeholders, not synthetic human portraits.

## Content Strategy

The supplied English narrative is the source content. It may be lightly edited for grammar, clarity, consistency, and accessibility without creating new factual claims. The Indonesian copy is a professional draft translation that requires firm review.

### Claim handling

- Prefer durable wording such as “Since 1988” and “nearly four decades.” Do not use “37-Year Legacy” because it is stale in 2026.
- Treat the IDR 1 trillion dispute claim, client relationships, and client logos as draft content subject to approval.
- Contact details taken from supplied screenshots remain draft until confirmed.
- Clearly label the online MVP as a concept preview.
- Add an informational footer disclaimer stating that website content is general information and not legal advice.

### Firm values

The ethics section is based on the firm’s supplied values: integrity, absolute loyalty, clear communication, practical solutions, responsiveness, collaboration across practice areas, proactive risk assessment, transparent fee structures, and long-term client relationships.

### Client presentation

The supplied client-logo directory currently contains 28 heterogeneous JPEG, PNG, and WebP assets. The homepage shows twelve to sixteen logos selected for source quality and layout balance. Logos are normalized through consistent visual bounding boxes and a restrained monochrome treatment without changing their underlying shapes. Remaining logos are revealed inline through an explicit user action.

## Localization

- Indonesian and English are first-class variants, not machine-translated browser overlays.
- Navigation, metadata, alternate links, UI labels, error pages, profiles, and accessibility text are localized.
- The language switcher points to the equivalent route in the alternate locale.
- If an equivalent route cannot be resolved, the switcher falls back to the alternate-language homepage rather than a broken page.
- Dates, telephone labels, address conventions, and other locale-sensitive text are formatted appropriately.

## Technical Architecture

Astro generates a static `dist` output. The same artifact supports local preview and Netlify deployment. The site uses TypeScript-backed content records and focused Astro components. Client-side JavaScript is reserved for the mobile menu, theme persistence, language assistance, and the client-list expansion interaction.

### Component boundaries

- Site shell owns document metadata, global navigation, footer, theme initialization, and locale context.
- Homepage sections own their local layout and receive content as data.
- Team data generates homepage cards and individual profile routes.
- Client data stores source path, display name, accessible alternative text, feature priority, and approval status.
- Contact data supplies all contact renderings and link targets from one source.
- Reusable primitives include section headings, cards, logo tiles, contact items, and link or button treatments.

Each component must have one clear purpose and must not own unrelated content or page-level behavior.

## Data Flow

Localized content and prepared assets feed typed Astro collections. Page templates render those records through focused components. Astro outputs static HTML, CSS, optimized assets, and minimal enhancement scripts. The resulting `dist` directory is served by either a local preview server or Netlify Free.

No user-submitted data is collected, stored, or transmitted by the MVP.

## Failure Handling and Progressive Enhancement

- Core content and contact information remain readable when JavaScript is unavailable.
- A failed image shows a stable neutral fallback without collapsing layout.
- Meaningful alternative text remains available when an image fails.
- Missing team content is disclosed explicitly rather than producing an empty or misleading profile.
- Theme and mobile-menu failures do not hide navigation or page content.
- Invalid routes return a localized 404 page with a clear path back to the homepage.
- Contact links use valid `mailto`, `tel`, WhatsApp, and map URLs and visibly retain the human-readable details.

## Accessibility

The implementation targets WCAG 2.2 AA practices. It includes semantic landmarks and headings, a skip link, visible keyboard focus, logical tab order, accessible names for icon-only controls, sufficient color contrast, appropriately sized touch targets, responsive text without clipping, reduced-motion support, and descriptive alternative text.

Theme controls expose their current state. The mobile menu manages expanded state and focus correctly. Language changes identify the destination language. Decorative imagery uses empty alternative text and does not duplicate nearby content.

## Performance

- Generate responsive image sizes and modern formats where practical.
- Lazy-load below-the-fold imagery and keep the hero image deliberately prioritized.
- Avoid large animation libraries and general-purpose client frameworks.
- Limit font families and weights and use robust fallbacks.
- Prevent layout shift by reserving image and component dimensions.
- Target mobile Lighthouse scores of at least 90 for Performance and at least 95 for Accessibility and Best Practices.

## SEO and Preview Safety

Each localized page includes a unique title, description, canonical reference, Open Graph metadata, and reciprocal `hreflang` links. Production-oriented structure includes sitemap generation, semantic heading order, crawlable internal links, and `LegalService` or `Organization` structured data. Verified profiles may include `Person` structured data.

The MVP deployment includes `noindex, nofollow` metadata and an obvious “Concept Preview” label. This reduces accidental discovery but is not access control. Anyone with the public Netlify URL can view the site. The URL should use a non-obvious project name and the deployment may be removed after the review period.

## Contact Experience

The MVP contains no form. It displays and links:

- Email address.
- Telephone number.
- WhatsApp number.
- Office hours.
- Physical office address.
- Map directions.

These values remain draft until confirmed by the firm. The WhatsApp action appears both as a floating control and as an explicit contact item.

## Netlify Free Deployment

Netlify Free is the selected MVP host. The project remains a portable static build and does not depend on Netlify-specific runtime services.

Deployment practices minimize the 300-credit monthly hard limit:

- Use free Deploy Previews for review iterations.
- Publish to production only when a milestone is ready.
- Optimize imagery to control bandwidth.
- Do not use serverless functions, AI inference, forms, or database services.

If the account exhausts its monthly credit pool, Netlify may pause all projects in the account until the next cycle. The local preview remains available regardless of hosting status.

## Security and Privacy

- Add appropriate static security headers, including content type protection, frame restrictions, a conservative referrer policy, and a content security policy compatible with the final asset set.
- Do not include trackers, analytics, cookies, or external embeds that transmit visitor data.
- Map directions open as an external link rather than embedding a tracking-heavy map.
- External links disclose their behavior and use safe opener isolation where applicable.
- Do not include secrets or private case materials in the static output.

## Content Intake Document

A separate DOCX form will collect the information required to replace the MVP with an approved production company profile. It covers:

1. Company identity, legal naming, description, history, and positioning.
2. Approved values, headline language, and brand voice.
3. Practice areas and service descriptions.
4. Team names, roles, credentials, biographies, practice areas, admissions, memberships, languages, contact permissions, and professional photographs.
5. Approved client names and logo-use permissions.
6. Representative matter descriptions, confidentiality limits, outcome wording, and publication approval.
7. Confirmed email, telephone, WhatsApp, office hours, address, and map location.
8. Official logo files, brand colors, fonts, photography, and image rights.
9. Indonesian and English copy approval.
10. Legal disclaimer, privacy requirements, domain, hosting ownership, and final sign-off.

The form is designed as a readable questionnaire with generous response space and clear approval fields. It is delivered as a visually verified DOCX.

## Testing Strategy

### Automated checks

- Content integrity tests verify required locale fields, routes, metadata, alternative text, and approval-state labeling.
- Component tests cover theme switching, language switching, mobile navigation, client expansion, and contact targets.
- End-to-end tests cover homepage-to-profile navigation, localized route parity, theme persistence, keyboard interaction, direct contact links, and the 404 experience.
- Automated accessibility auditing checks common WCAG violations.
- Link and build checks reject broken internal paths, missing assets, relevant build warnings, and browser console errors.

### Browser and visual verification

- Capture and inspect mobile, tablet, desktop, and wide-desktop layouts.
- Verify both themes and both languages.
- Run end-to-end checks in Chromium, Firefox, and WebKit.
- Inspect the completed site directly in a browser at representative desktop and mobile viewport sizes.
- Verify responsive typography, logo balance, image crops, fixed controls, focus behavior, and reduced-motion handling.

### Document verification

Render the content-intake DOCX into page images, inspect every page for layout defects, revise as necessary, and deliver only the final DOCX unless another format is requested.

## Review and Completion Gates

Implementation is complete only when:

- The production build succeeds without relevant warnings.
- Automated tests pass.
- Browser verification finds no blocking responsive, accessibility, or interaction defects.
- Code review findings have been resolved or explicitly documented.
- All draft, placeholder, and approval-dependent content is visibly and accurately represented.
- The local preview instructions and Netlify-ready build are verified.
- The content-intake document passes visual QA.

Deployment requires access to a Netlify account. If account access is not available during implementation, the verified `dist` output and deployment instructions remain the deliverable, and the actual public URL is completed when the user provides or performs account authentication.
