# Wijaya & Partners Alternative Team Profiles — Design Specification

## Purpose

Add a dedicated, localized profile page for each of the six team members shown on the alternative Wijaya & Partners site. The pages extend the existing editorial legal-firm identity without changing the approved homepage carousel, primary navigation labels, or content order.

## Audience and outcome

The profiles help prospective clients understand who may lead or support a matter. A successful result lets visitors open any team card, recognize the same firm identity, scan the member's background and practice areas, and return to the team or contact section on desktop and mobile.

## Routes and navigation

The site generates twelve static profile routes:

- English: `/alternative/team/[slug]/`
- Indonesian: `/alternative/id/team/[slug]/`

The six stable slugs are `herman-wijaya`, `f-ebby-abraham`, `rani-sisco`, `arifan-sudaryanto`, `diana-pangestu`, and `andi-cipta-lukmana`.

Every homepage team card becomes a semantic link to its localized route. Profile pages reuse the alternative header and keep only the four approved primary navigation items. On a profile page those items point back to the corresponding localized homepage anchors. The language switcher opens the same member's profile in the other language. A visible back-to-team link returns to the localized `#team` section.

## Content model

Each localized member record contains:

- slug, name, credentials, initials, and country;
- profile status (`source-draft` or `placeholder`);
- professional summary and biography paragraphs;
- education, professional organizations, and practice areas;
- localized status note and interface labels.

Herman Wijaya and F. Ebby Abraham use the previously supplied profile material. Those records remain draft until the firm verifies the transcriptions. F. Ebby Abraham's record must retain a discreet note that the source narrative uses “Franz” while the roster uses “F. Ebby Abraham.” No individual email from the historical source is published.

Rani Sisco, Arifan Sudaryanto, Diana Pangestu, and Andi Cipta Lukmana use clearly disclosed placeholder copy. Their names and supplied credentials remain factual; all invented biography, education, organization, and practice-area content is visually and semantically labeled `Draft / Placeholder Content` in English and `Draf / Konten Placeholder` in Indonesian. Placeholder copy must not be presented as verified firm information.

## Page composition

The profile page uses an editorial two-column composition beneath the fixed header:

1. A restrained introductory band with the profile number, `Counsel Profile` label, name, credentials, summary, status badge, and back-to-team link.
2. A left identity rail with an oversized monogram, country, draft status, and firm contact link.
3. A right content column with biography, education, professional organizations, and practice areas.
4. A closing navigation band linking to the previous and next team members plus a call to contact the firm.

The visual language remains burgundy, charcoal, ivory, serif display typography, fine rules, large numeric indexes, and stone-like surfaces. Monograms replace portraits because the supplied portraits are small extracts from historical scans and do not meet the quality of the alternative design.

At narrow widths the layout becomes one column in this order: identity, summary, biography, education, organizations, practice areas, member navigation, and contact call to action. Content must reflow without horizontal scrolling at 320 CSS pixels.

## Components and data flow

- The alternative content module owns the localized member records and exposes functions for listing members, finding a member, and generating all localized static paths.
- The homepage receives the same enriched member records and uses each slug to build profile links.
- A shared profile component renders one member record and the localized page-level labels.
- A dynamic English route and a dynamic Indonesian route call the shared path/data helpers and render the same profile component.
- The alternative header accepts an optional page context so anchor navigation and language switching remain correct on profile pages without changing homepage behavior.

## Accessibility and resilience

- Each page has one visible `h1` containing the member's name.
- Team cards remain articles but contain a single descriptive profile link.
- Lists use semantic headings and list markup.
- Draft and placeholder status is text, not color alone.
- Previous/next links include member names.
- Keyboard focus remains visible, touch targets remain at least 40 pixels, and layouts have no horizontal overflow at 320 pixels.
- Static generation guarantees only known slugs produce pages; unknown paths use the host's normal 404 behavior.

## Verification

Unit tests cover localized member counts, stable slugs, source-draft versus placeholder status, and path generation for all twelve routes. Browser tests cover card-to-profile navigation, English/Indonesian route switching, verified source sections for Herman and Ebby, placeholder disclosure for the other four members, previous/next navigation, semantic headings, and 320-pixel reflow. The production build must emit all twelve profile pages plus the two existing alternative homepages.

## Publication caveats

All profile material remains concept content. The firm must approve names, credentials, biographies, education, organizations, practice areas, and placeholder replacement copy before production publication. The source discrepancy between “Franz” and “F. Ebby Abraham” remains unresolved and must be confirmed.
