# Wijaya And Partners Alternative Carousel Design

## Purpose

This specification defines a second visual direction for the Wijaya And Partners company-profile concept. It is an alternative to the approved first design, not a replacement. The first design specification and its visual references remain unchanged.

The alternative must preserve the firm's established, professional, and Bandung-rooted character while presenting its positioning through one prominent, automatically advancing carousel. It must work comfortably on desktop and mobile and remain clearly recognizable as the website of an experienced law firm rather than a general creative agency.

## Success Criteria

The alternative succeeds when it:

- Is available at `/alternative/` without overwriting the first design or its documentation.
- Uses only `About`, `Our Teams`, `Our Projects`, and `Contact` as primary navigation items.
- Presents one opening carousel containing exactly three slides: Hero, Expertise & Perspective, and Our Values.
- Communicates an established, rooted, elite, wise, honest, strategic, modern, ethical, solid, and professional character.
- Works at narrow mobile widths, supports touch gestures, and remains usable with keyboard and assistive technology.
- Preserves the first concept's burgundy, charcoal, warm-ivory, editorial, and “Humble but Powerful” design values.
- Keeps unverified claims visibly within a draft concept-preview context.

## Relationship To The First Design

The first design specification at `docs/superpowers/specs/2026-10-06-wijaya-partners-company-profile-design.md` remains the source of truth for firm facts, content safety, accessibility, localization, and overall company-profile scope. This alternative introduces an isolated presentation layer and route. It must not edit, rename, or remove the first design specification or its source-material record.

The repository does not currently contain an implemented first website. Building this alternative therefore establishes the shared Astro foundation while keeping alternative-specific components, styles, and assets isolated so a future implementation of the first design can coexist without visual regressions.

## Audience And Intended Impression

The audience remains business owners, company directors, in-house legal teams, corporate counsel, and international companies or investors operating in Indonesia.

The experience should convey:

- A firm established in 1988 and rooted in Bandung.
- Institutional wisdom and traditional professional standards.
- Assertive, commercially aware litigation and advisory capability.
- Ethical stability, precision, and partner-led service.

The experience must avoid playful startup styling, generic agency presentation, excessive luxury cues, and literal legal clichés such as gavels or scales of justice.

## Information Architecture

### Routes

- `/alternative/` is the English default for this visual alternative.
- `/alternative/id/` is the Indonesian counterpart.
- The language control is a utility control and not a primary navigation item.
- Theme control is also a utility control and not a primary navigation item.

### Primary navigation

The header contains exactly four primary links:

1. `About`
2. `Our Teams`
3. `Our Projects`
4. `Contact`

The links navigate to sections on the current localized page. On mobile, the same four links appear in a compact menu. No additional primary navigation labels are introduced.

### Page sequence

1. Header and three-slide opening carousel.
2. Complete About narrative.
3. Our Teams.
4. Our Projects and client portfolio.
5. Contact.
6. Footer with concept-preview state and informational disclaimer.

Expertise & Perspective and Our Values are presented inside the opening carousel rather than as separate page sections or separate carousels.

## Opening Carousel

The page contains one opening carousel with exactly three slides. It is an editorial storytelling device rather than a promotional banner.

### Slide 1: Hero / About The Firm

**Visual content:** Bandung landmarks and heritage architecture.

**Intended mood:** Established, Rooted, Elite.

**Content emphasis:**

- “Absolute Loyalty. Strategic Action.”
- “Since 1988.”
- A concise introduction to the firm's Bandung roots and national capability.
- A clear path to the complete About narrative.

### Slide 2: Expertise & Perspective

**Visual content:** A restrained composition combining a law library or fine legal details with modern architecture or a courtroom.

**Intended mood:** Wise, Traditional, Honest, Aggressive, Strategic, Modern.

**Heading:** “Strategic Capability Across the Archipelago.”

**Practice areas:**

- Commercial Litigation.
- Insolvency & Debt Strategy.
- Corporate Advisory.

The word “aggressive” describes visual confidence and decisive advocacy; the copy must not imply unethical conduct or unverified outcomes.

### Slide 3: Our Values

**Visual content:** Marble or stone texture with subtle architectural detail.

**Intended mood:** Ethical, Solid, Professional.

**Value emphasis:**

- Integrity.
- Absolute Loyalty.
- Clear Communication.
- Practical Solutions.

Additional approved values may appear in the supporting copy, but the slide remains concise.

### Carousel behavior

- The carousel advances automatically every 6.5 seconds.
- The visual transition uses a calm crossfade with restrained positional movement lasting 700 milliseconds.
- Previous and next controls, position indicators, and a pause/resume control are always available.
- Automatic advancement pauses while the carousel is hovered, focused, or actively touched.
- Mobile visitors can swipe between slides.
- Keyboard visitors can operate all controls without unexpected focus movement.
- Screen-reader announcements identify the current slide without repeatedly interrupting the visitor.
- With `prefers-reduced-motion: reduce`, automatic advancement and nonessential transitions are disabled.
- Core slide content remains present and readable without JavaScript; enhancement initializes only after the document is usable.

## About Content

The complete About section uses the supplied narrative in edited, legible English. The intended copy is:

> Founded in 1988 by Mr. Herman Wijaya, our firm was built on a foundation of intellectual rigor and deep-rooted integrity. From our offices in Bandung, we have spent nearly four decades navigating the complexities of the Indonesian legal landscape.
>
> Today, under the leadership of Francis Ebby, we combine this institutional wisdom with specialized litigation experience. We are a boutique firm by choice, allowing us to offer the personal attention of a partner-led team with the capabilities of a major institution.
>
> Our “Strategic Action” approach is battle-tested. We recently navigated a landmark IDR 1 trillion bankruptcy dispute at the Central Jakarta District Court—demonstrating that, from our Bandung roots, we deliver results that resonate on a national scale.

The leadership statement, experience description, court reference, amount, outcome wording, and permission to publish remain draft claims. The concept must label them accordingly and must not present them as approved production facts.

The Indonesian variant must be a faithful professional translation with the same draft status and no added claims.

## Visual System

### Color

- Deep burgundy is the primary strategic accent.
- Charcoal or near-black provides authority and high-contrast typography.
- Warm ivory provides the primary light surface.
- Stone gray supports borders, captions, and secondary information.
- Brass may be used sparingly for fine rules or indicators, never as a dominant luxury treatment.

### Typography

- An editorial serif conveys authority in major statements and selected slide titles.
- A modern, highly legible sans-serif supports navigation, controls, body copy, and metadata.
- Responsive type sizing prevents headline clipping at 320 px and at 200% zoom.
- The typography must remain disciplined and avoid decorative display treatments that undermine credibility.

### Composition

- The opening carousel uses an asymmetric editorial grid on desktop.
- Vertical rules, index numbers, and precise alignment reference legal dossiers and structured case work without imitating official documents.
- Images use layered overlays to preserve legibility while retaining architectural and material detail.
- Desktop layouts use generous negative space and controlled density.
- Mobile layouts stack text and imagery vertically and keep controls within comfortable thumb reach.

## Remaining Sections

### Our Teams

The section presents the six supplied team members without inventing roles, biographies, or credentials. Desktop uses a disciplined three-column editorial grid. Mobile uses a single-column list so information is never hidden behind another interaction.

### Our Projects

This section presents the supplied client and representative-matter material as a concept portfolio. Client logos and case references remain draft and subject to permission. It uses a responsive logo grid and is not another carousel.

### Contact

Contact information remains centralized and includes email, telephone, WhatsApp, office hours, address, and map directions. The treatment is visually prominent but restrained. A floating WhatsApp control must not cover carousel controls or page content at narrow widths.

## Responsive And Accessible Behavior

- The layout must remain usable from 320 px through wide desktop displays.
- Mobile navigation exposes only the four approved primary links plus separate language and theme utilities.
- Interactive targets are at least 44 by 44 CSS pixels where practical.
- Focus states remain visible against every slide background.
- Overlay contrast meets WCAG 2.2 AA expectations in both themes.
- Carousel position is not communicated by color alone.
- Text never depends on image content for meaning.
- A failed or unavailable image leaves a stable slide with its text, color treatment, and descriptive fallback intact.
- JavaScript failure must not hide navigation, carousel content, contact details, or subsequent sections.

## Technical Architecture

The implementation follows the first design's static Astro direction. It establishes the shared static foundation if that foundation is still absent when implementation begins.

Alternative-specific code is isolated by route, component boundary, and CSS scope:

- An alternative page template owns the localized page sequence.
- A single carousel component owns carousel state and behavior.
- Slide content is supplied as typed data rather than duplicated markup.
- Separate slide presentation components may be used when their content structures differ, while the carousel controls and state remain shared.
- Alternative design tokens and styles are namespaced so future first-design components do not inherit them accidentally.
- Team, client, contact, and localized content records remain reusable across both visual directions.

Client-side JavaScript is limited to carousel enhancement, the mobile menu, theme persistence, and language assistance. No framework runtime, backend, form handler, analytics, or tracking is required.

## Data Flow

Localized typed content records provide the three slides, About copy, team records, project records, and contact values. The alternative page template renders them into semantic HTML. The carousel enhancement reads stable slide markup, updates active state, and manages timers and interaction state without rewriting the content source.

The same content records feed English and Indonesian variants. Asset records identify image source, alternative text, focal position, and fallback treatment. A missing image does not remove the corresponding message.

## Failure Handling

- Missing or failed imagery falls back to a solid or textured surface without layout collapse.
- Invalid carousel state returns to the first slide.
- Timer errors leave manual controls operational.
- When JavaScript is unavailable, all three slide contents remain readable in document order.
- Long translations wrap safely without overlapping controls.
- Unavailable local storage falls back to system theme preference and the route's current language.
- Unverified factual claims retain visible draft status.

## Verification Strategy

### Automated verification

- Content tests assert exactly three carousel slides and the required slide identities.
- Navigation tests assert exactly the four approved primary labels.
- Route tests cover `/alternative/` and `/alternative/id/`.
- Interaction tests cover automatic advancement, previous/next controls, indicators, pause/resume, focus pause, hover pause, touch/swipe behavior, and reduced-motion behavior.
- Accessibility tests cover keyboard operation, focus visibility, accessible control names, slide announcements, heading order, landmarks, and color contrast.
- Responsive tests cover 320 px mobile, common phone widths, tablet, desktop, and 200% zoom.
- Build and link checks reject broken assets, routes, anchors, and contact targets.

### Visual verification

- Inspect every slide on mobile and desktop in light and dark themes.
- Confirm that the law-firm character remains authoritative across all three visual moods.
- Verify that overlays preserve both image detail and text readability.
- Confirm that controls remain reachable, visible, and non-obstructive.
- Inspect transitions and static reduced-motion rendering.
- Confirm that About, Teams, Projects, and Contact retain a coherent editorial rhythm after the carousel.

## Completion Conditions

The alternative is complete only when:

- The Astro production build succeeds.
- The route is available at `/alternative/` with its Indonesian counterpart at `/alternative/id/`.
- The opening contains one carousel with exactly three approved slides.
- Automated and browser checks pass.
- Desktop and mobile visual inspection finds no blocking readability, interaction, accessibility, or overflow defects.
- The first design specification and source-material documentation remain unchanged.
- Draft and approval-dependent content is visibly and accurately represented.
