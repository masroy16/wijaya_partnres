# Wijaya And Partners Client Review Access Design

## Purpose

This specification defines how the client accesses and compares the two Wijaya And Partners MVP design concepts. The review experience must be simple enough to open from one shared link while remaining visibly separate from either company-profile concept.

The review site is a temporary concept-review environment. It is not the firm's production website, does not require authentication, and does not collect feedback or visitor data.

## Success Criteria

The access experience succeeds when:

- The client receives one stable URL and can reach both design concepts from it.
- The root page is unmistakably an internal design-review portal rather than part of the company profile.
- Both concepts remain available in Indonesian and English.
- The client can move from the review portal into any concept without encountering login, password, or feedback controls.
- Revisions can be deployed without changing the URL shared with the client.
- Search engines are instructed not to index the portal or either concept.
- The review environment can be disabled or removed after the review period.

## Access Model

The MVP is hosted as one static Netlify site at a stable, non-obvious `netlify.app` URL. Anyone who has the URL can open it. There is no password, login, account, or other access-control layer.

The absence of authentication is intentional. `noindex` directives and a non-obvious URL reduce accidental discovery but are not security controls. Content placed in the review environment must therefore be appropriate for link-based sharing and must retain the existing draft and concept-preview disclosures.

## Route Structure

The site uses the following route structure:

- `/` — internal design-review portal.
- `/id/` — Concept 01 in Indonesian.
- `/en/` — Concept 01 in English.
- `/alternative/id/` — Concept 02 in Indonesian.
- `/alternative/` — Concept 02 in English.

The root route is a review utility only. It is not a localized company-profile homepage and must not be represented as part of either concept's information architecture.

## Review Portal Experience

### Identity and messaging

The portal uses the heading `Internal Design Review` and includes an explicit notice stating that the page is only for selecting a concept and is not part of the Wijaya And Partners website.

The portal identifies the project by name but does not use the firm's logo as its primary visual element. It uses neutral white, gray, and restrained utility styling rather than either concept's burgundy editorial visual system.

### Concept selection

The portal presents two clearly separate cards:

1. `Concept 01` — the original company-profile direction.
2. `Concept 02` — the alternative carousel direction.

Each card contains:

- A representative preview thumbnail.
- A short neutral description that distinguishes the concept without promoting one over the other.
- A Bahasa Indonesia link.
- An English link.

The links navigate directly to the corresponding routes. The portal does not appear in either concept's primary navigation, footer navigation, or content sequence. The company-profile pages do not need a dedicated return control; normal browser navigation remains available.

### Responsive behavior

The cards appear side by side when space permits and stack vertically on narrow screens. Links and cards use visible keyboard focus, readable contrast, semantic headings, and practical touch-target sizes.

## Separation From The Company Profiles

The review portal must have its own page shell and scoped styles. It must not reuse either company profile's site header, footer, primary navigation, hero, theme treatment, or page-section layout.

Shared low-level utilities are acceptable only when they do not transfer company-profile branding or navigation into the portal. The implementation should make this boundary explicit through a dedicated review layout or an isolated root page rather than conditional company-profile markup.

The portal is excluded from the XML sitemap. Neither concept links to it as a public-facing website destination.

## Feedback And Communication

The review environment contains no feedback form, feedback button, contact shortcut, annotation system, or additional communication channel. The client already knows how to contact the project owner and will send feedback through the existing WhatsApp or email relationship.

No visitor input is collected, stored, or transmitted.

## Deployment And Revision Workflow

The complete static build is deployed to one stable Netlify site. The client receives only the stable root URL.

Approved review revisions are deployed to the same site so the shared URL does not change. Internal deployment records or immutable deploy permalinks may be retained to identify review milestones, but they are not the primary links sent to the client.

The deployment must remain portable and must not depend on Netlify functions, forms, identity, analytics, or other runtime services. When the review period ends, the site can be disabled or removed without affecting a future production website.

## Indexing And Preview Safety

Every review route includes `noindex, nofollow` robot directives. The deployment also provides a `robots.txt` rule that discourages crawling of all routes.

The review portal and concept routes are omitted from any production-oriented sitemap. The site includes no analytics, trackers, cookies, or external feedback embeds.

Because robot directives do not restrict access, confidential or unsuitable material must not be placed in this deployment. Existing draft labels, claim caveats, and concept-preview notices remain required within the company-profile concepts.

## Data Flow And Dependencies

The review portal contains static concept metadata: concept label, description, thumbnail reference, and localized route targets. It renders these records into semantic links without client-side state or external data.

The concept pages continue to use their existing localized content and component boundaries. The portal does not modify their content records or introduce a dependency from a company-profile layout back to the review portal.

## Failure Handling

- A missing thumbnail falls back to a neutral placeholder without removing the concept name or language links.
- A failed image does not change card dimensions or block navigation.
- The selection links remain usable without JavaScript.
- Invalid routes use the existing localized 404 behavior where available.
- A deployment failure leaves the last successful stable deployment available until a replacement succeeds.

## Verification Strategy

Verification must confirm:

- The root route contains exactly two concept choices and four valid localized destination links.
- The portal visibly states that it is not part of the company-profile website.
- The portal does not render either concept's site header, primary navigation, footer, or brand-led hero treatment.
- All four concept routes remain reachable from the portal.
- The portal is usable at 320-pixel mobile width, common tablet widths, and desktop widths.
- Keyboard focus, heading order, link names, contrast, and touch-target sizing meet the project's accessibility expectations.
- The portal remains usable without JavaScript and with failed thumbnails.
- All review pages emit `noindex, nofollow` and the portal is absent from the sitemap.
- The production static build succeeds and the deployed stable URL resolves correctly.

## Non-Goals

This design does not include:

- Authentication, passwords, or user accounts.
- Feedback forms or feedback buttons.
- WhatsApp or email shortcuts on the review portal.
- Analytics, visitor tracking, or review-session recording.
- A CMS or client-editing interface.
- A permanent public website homepage.
- A third design concept or a generic portfolio of unrelated projects.

## Completion Conditions

The client-review access work is complete when one stable shared URL opens the isolated review portal, both concepts and both languages are reachable, the portal cannot reasonably be mistaken for part of the company profile, preview-safety directives are present, and the deployed experience passes responsive and accessibility checks.
