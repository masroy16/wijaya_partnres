# Wijaya And Partners Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual, static-first Astro MVP for Wijaya And Partners that runs locally, deploys to Netlify Free, and meets the approved responsive, accessibility, performance, content-safety, and SEO requirements.

**Architecture:** Astro generates localized static routes from typed content records. Focused Astro components render the homepage and team profiles, while minimal browser scripts handle navigation, theme persistence, and client expansion. The resulting `dist` directory is portable and contains no backend, form processing, analytics, or runtime dependency on Netlify.

**Tech Stack:** Node.js 24, npm, Astro 7.3.6, TypeScript 7.0.2, `@astrojs/sitemap` 3.7.4, Vitest 5.0.3, Playwright 1.63.0, `@axe-core/playwright` 4.13.0, Lighthouse CI 0.15.1, CSS custom properties, Netlify Free.

**Spec:** `docs/superpowers/specs/2026-10-06-wijaya-partners-company-profile-design.md`

**Source material:** `docs/superpowers/specs/2026-10-06-wijaya-partners-source-material.md`

## Global Constraints

- Use `/id/` and `/en/` as equal first-class locale roots; default navigation points to `/id/`.
- Generate only static output; do not add a server adapter, API route, form handler, CMS, authentication, analytics, cookie, or tracker.
- Preserve the exact six-person roster and do not invent biography, credential, role, client, matter, or result data.
- Treat client logos, the IDR 1 trillion matter, contact details, profile transcriptions, and translations as draft content subject to approval.
- Use “Since 1988” or “nearly four decades”; do not publish “37-Year Legacy.”
- The online MVP must expose `noindex, nofollow` and an obvious “Concept Preview” label.
- Core content, navigation, and contact details must remain usable without JavaScript.
- Meet WCAG 2.2 AA practices and honor `prefers-reduced-motion`.
- Target mobile Lighthouse minimums of 0.90 Performance, 0.95 Accessibility, and 0.95 Best Practices; do not assert SEO score because `noindex` is intentional.
- Use the exact same `dist` artifact for local preview and Netlify Free.
- Preserve user-provided files in Downloads; copy required assets into the repository and never modify the originals.

## File Structure

### Project and tooling

- `package.json` — pinned scripts and dependencies.
- `package-lock.json` — reproducible dependency graph.
- `.node-version` — Node.js major `24` for local and Netlify parity.
- `astro.config.mjs` — static output, canonical concept-preview site URL, sitemap integration.
- `tsconfig.json` — strict Astro TypeScript configuration.
- `vitest.config.ts` — unit-test discovery and DOM-free defaults.
- `playwright.config.ts` — desktop and mobile browser projects using the local preview server.
- `lighthouserc.json` — mobile score assertions and three-run collection.
- `netlify.toml` — build command, publish directory, redirects, cache rules, and security headers.

### Content and configuration

- `src/config/site.ts` — immutable site identity, locale list, preview flag, and canonical-base placeholder.
- `src/i18n/types.ts` — `Locale`, localized content, contact, team, client, and route types.
- `src/i18n/routes.ts` — locale parsing and alternate-route mapping.
- `src/content/home.ts` — bilingual homepage copy and section labels.
- `src/content/contact.ts` — draft contact values and safe link targets.
- `src/content/team.ts` — six bilingual team records and completeness status.
- `src/content/clients.ts` — 28 draft client records, asset references, accessible names, and feature priority.

### Layout, routes, and components

- `src/layouts/BaseLayout.astro` — document shell, metadata, `hreflang`, noindex controls, theme bootstrap, header, and footer.
- `src/pages/index.astro` — accessible language entry with an Indonesian default link.
- `src/pages/[lang]/index.astro` — localized homepage static paths.
- `src/pages/[lang]/team/[slug].astro` — localized team-profile static paths.
- `src/pages/404.astro` — bilingual recovery page.
- `src/components/navigation/SiteHeader.astro` — desktop and mobile navigation.
- `src/components/navigation/ThemeToggle.astro` — accessible persisted theme control.
- `src/components/navigation/LocaleSwitcher.astro` — context-preserving locale links.
- `src/components/sections/HeroSection.astro` — hero content and responsive background.
- `src/components/sections/LegacySection.astro` — firm-history narrative.
- `src/components/sections/ExpertiseSection.astro` — practice-area content.
- `src/components/sections/EthicsSection.astro` — firm values.
- `src/components/sections/TeamSection.astro` — team-card grid.
- `src/components/sections/ClientsSection.astro` — featured and expandable client portfolio.
- `src/components/sections/ContactSection.astro` — direct contact details.
- `src/components/team/TeamCard.astro` — factual member summary.
- `src/components/team/TeamProfile.astro` — complete and pending profile states.
- `src/components/client/ClientLogo.astro` — stable logo boundary and image fallback.
- `src/components/contact/ContactItem.astro` — accessible direct-contact item.
- `src/components/SiteFooter.astro` — disclaimer, preview state, and secondary navigation.
- `src/components/FloatingWhatsApp.astro` — non-obstructive floating action.

### Styling and assets

- `src/styles/tokens.css` — colors, typography, spacing, radii, shadows, and theme variables.
- `src/styles/global.css` — reset, document defaults, focus, utilities, and reduced motion.
- `src/assets/brand/` — copied temporary firm-logo source.
- `src/assets/sections/` — supplied hero and three temporary section visuals.
- `src/assets/clients/` — copied client-logo sources.

### Tests

- `tests/unit/site-config.test.ts` — foundation invariants.
- `tests/unit/content-integrity.test.ts` — locale and factual-data contracts.
- `tests/unit/routes.test.ts` — localized path generation and fallbacks.
- `tests/unit/assets.test.ts` — referenced asset and client-record integrity.
- `tests/e2e/shell.spec.ts` — navigation, theme, and locale behavior.
- `tests/e2e/home.spec.ts` — section order, content, expansion, and contact actions.
- `tests/e2e/team.spec.ts` — team index-to-profile flows and pending states.
- `tests/e2e/accessibility.spec.ts` — axe, keyboard, reduced motion, and focus behavior.
- `tests/e2e/responsive.spec.ts` — mobile and desktop layout invariants.

## Interfaces

```ts
export type Locale = 'id' | 'en';
export type ContentStatus = 'draft' | 'confirmed';
export type ProfileStatus = 'complete-draft' | 'pending';
export type SectionId = 'hero' | 'legacy' | 'expertise' | 'ethics' | 'team' | 'clients' | 'contact';

export interface SiteConfig {
  name: 'Wijaya And Partners';
  defaultLocale: 'id';
  locales: readonly ['id', 'en'];
  preview: true;
  canonicalBase: string;
}

export interface HomeContent {
  locale: Locale;
  meta: { title: string; description: string };
  navigation: Readonly<Record<SectionId, string>>;
  hero: { headline: 'Absolute Loyalty. Strategic Action.'; body: string };
  legacy: { headline: string; paragraphs: readonly string[] };
  expertise: { headline: string; introduction: string; items: readonly { title: string; body: string }[] };
  ethics: { headline: string; introduction: string; values: readonly string[] };
  team: { headline: string; introduction: string; pendingLabel: string };
  clients: { headline: string; introduction: string; expandLabel: string; collapseLabel: string };
  contact: { headline: string; introduction: string; labels: Readonly<Record<'email' | 'phone' | 'whatsapp' | 'hours' | 'address' | 'map', string>> };
  footer: { disclaimer: string; previewLabel: string };
}

export interface ContactDetails {
  email: 'wnp@wijayapartners.com';
  phoneDisplay: '0898-6000-822';
  phoneE164: '+628986000822';
  whatsappE164: '628986000822';
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

export function getHomeContent(locale: Locale): HomeContent;
export function getTeamMembers(locale: Locale): readonly TeamMember[];
export function getTeamMember(locale: Locale, slug: string): TeamMember | undefined;
export function getAllTeamPaths(): readonly { params: { lang: Locale; slug: string }; props: { member: TeamMember } }[];
export function getAlternatePath(pathname: string, targetLocale: Locale): string;
export const CONTACT: ContactDetails;
export const CLIENTS: readonly ClientRecord[];
export function getFeaturedClients(): readonly ClientRecord[];
```

## Review Focus

1. Unknown, malformed, or missing locale segments must never produce a broken language-switch link; Task 2 pins deterministic fallback to the target-language homepage.
2. Missing, corrupt, or unusually shaped client images must not collapse the logo grid or remove the accessible client name; Task 6 tests source integrity and browser fallback behavior.
3. Long names, credentials, translations, and addresses must wrap without overflow at 320 px and 200% zoom; Tasks 5 and 8 test narrow layouts and zoomed content.
4. Invalid or unavailable `localStorage` theme values must fall back to the system preference without hiding the page or flashing unreadable colors; Task 3 tests storage failure and invalid values.
5. Draft contact values must render identically wherever used and generate valid `mailto`, `tel`, and WhatsApp targets; Tasks 2 and 7 assert centralized values and exact href formats.

---

### Task 1: Establish The Static Astro Foundation

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `.node-version`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `lighthouserc.json`
- Create: `src/config/site.ts`
- Create: `src/pages/index.astro`
- Create: `tests/unit/site-config.test.ts`

**Interfaces:**
- Consumes: approved spec and source-material documents.
- Produces: `SITE: SiteConfig`, npm scripts `dev`, `build`, `preview`, `test`, `test:unit`, `test:e2e`, `test:a11y`, and `test:lighthouse`.

- [ ] **Step 1: Create the package manifest and install the pinned toolchain**

Set Node `24`; install Astro `7.3.6`, TypeScript `7.0.2`, sitemap `3.7.4`, Vitest `5.0.3`, Playwright `1.63.0`, axe Playwright `4.13.0`, and Lighthouse CI `0.15.1`; install the Chromium, Firefox, and WebKit browser binaries through Playwright; commit the generated lockfile later with this task.

- [ ] **Step 2: Write the failing site-config test**

Assert that `SITE.name` is `Wijaya And Partners`, `SITE.defaultLocale` is `id`, locales equal `['id', 'en']`, `SITE.preview` is `true`, and the package scripts listed in this task exist.

- [ ] **Step 3: Run the focused unit test and verify failure**

Run: `npm run test:unit -- tests/unit/site-config.test.ts`

Expected: FAIL because `src/config/site.ts` and the test scripts do not yet resolve.

- [ ] **Step 4: Implement the project configuration and accessible root language entry**

Create strict static Astro configuration, the exact `SiteConfig` contract, and a root page containing normal links to `/id/` and `/en/`; Indonesian is visually identified as the default, with no JavaScript-only redirect.

- [ ] **Step 5: Run the foundation checks**

Run: `npm run test:unit -- tests/unit/site-config.test.ts && npm run build`

Expected: PASS and `dist/index.html` exists.

- [ ] **Step 6: Commit the foundation**

```bash
git add package.json package-lock.json .node-version astro.config.mjs tsconfig.json vitest.config.ts playwright.config.ts lighthouserc.json src/config/site.ts src/pages/index.astro tests/unit/site-config.test.ts
git commit -m "build: establish Astro MVP foundation"
```

### Task 2: Model Bilingual Content And Localized Routes

**Files:**
- Create: `src/i18n/types.ts`
- Create: `src/i18n/routes.ts`
- Create: `src/content/home.ts`
- Create: `src/content/contact.ts`
- Create: `src/content/team.ts`
- Create: `tests/unit/content-integrity.test.ts`
- Create: `tests/unit/routes.test.ts`

**Interfaces:**
- Consumes: `SITE: SiteConfig` from Task 1 and all draft facts from the source-material document.
- Produces: `getHomeContent`, `getTeamMembers`, `getTeamMember`, `getAllTeamPaths`, `getAlternatePath`, `CONTACT`, and the shared types declared above.

- [ ] **Step 1: Write failing content-integrity tests**

Assert two complete homepage locales, identical section keys, exactly six stable team slugs per locale, two `complete-draft` profiles, four `pending` profiles, no occurrence of `37-Year`, and no nonempty biography or practice-area list on pending profiles.

- [ ] **Step 2: Write failing route and contact tests**

Assert all twelve localized profile paths are unique; `/id/team/herman-wijaya/` maps to `/en/team/herman-wijaya/`; an unknown path maps to `/{targetLocale}/`; email href is `mailto:wnp@wijayapartners.com`; telephone href contains digits only after `tel:+62`; and WhatsApp href is `https://wa.me/628986000822`.

- [ ] **Step 3: Run the focused tests and verify failure**

Run: `npm run test:unit -- tests/unit/content-integrity.test.ts tests/unit/routes.test.ts`

Expected: FAIL because the content and route modules do not exist.

- [ ] **Step 4: Implement the content types and route helpers**

Use the interfaces in this plan exactly. Normalize display capitalization without adding credentials. Keep every approval-dependent claim marked `draft`, and make route fallback behavior deterministic.

- [ ] **Step 5: Implement the bilingual content records**

Adapt the supplied English copy, write the reviewed-quality Indonesian draft, centralize contact data, and transcribe only the approved source fields for Herman Wijaya and F. Ebby Abraham. Keep the four incomplete profiles explicitly pending.

- [ ] **Step 6: Run content and route verification**

Run: `npm run test:unit -- tests/unit/content-integrity.test.ts tests/unit/routes.test.ts`

Expected: PASS with 12 unique profile routes and no stale year headline.

- [ ] **Step 7: Commit the content domain**

```bash
git add src/i18n src/content/home.ts src/content/contact.ts src/content/team.ts tests/unit/content-integrity.test.ts tests/unit/routes.test.ts
git commit -m "feat: add bilingual content model"
```

### Task 3: Build The Accessible Site Shell

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/navigation/SiteHeader.astro`
- Create: `src/components/navigation/ThemeToggle.astro`
- Create: `src/components/navigation/LocaleSwitcher.astro`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/pages/[lang]/index.astro`
- Create: `tests/e2e/shell.spec.ts`

**Interfaces:**
- Consumes: `SITE`, `Locale`, `getHomeContent`, and `getAlternatePath` from Tasks 1 and 2.
- Produces: `BaseLayout` props `{ locale, title, description, pathname, image?, type? }` and a usable localized page shell for later sections.

- [ ] **Step 1: Write failing shell browser tests**

Test both locale routes, skip-link focus, desktop section links, mobile menu expanded state, context-preserving language switch, system dark preference, persisted manual theme, invalid theme value fallback, unavailable `localStorage`, and JavaScript-disabled visibility of core navigation.

- [ ] **Step 2: Run the shell test and verify failure**

Run: `npm run test:e2e -- tests/e2e/shell.spec.ts --project=chromium-desktop`

Expected: FAIL because localized pages and shell controls do not exist.

- [ ] **Step 3: Implement tokens, global styles, and no-flash theme bootstrap**

Use approved burgundy, near-black, warm-white, and stone-gray tokens; ensure the bootstrap accepts only `light` or `dark`, catches storage access errors, and applies a readable system fallback before first paint.

- [ ] **Step 4: Implement the layout and navigation components**

Add semantic landmarks, skip link, floating desktop navigation, progressively enhanced mobile navigation, accessible names and states, and alternate-locale links derived from the current pathname.

- [ ] **Step 5: Implement localized homepage route generation**

Generate only `id` and `en` paths, render temporary section anchors for navigation, and supply localized title, description, canonical, and reciprocal `hreflang` values through `BaseLayout`.

- [ ] **Step 6: Run shell checks**

Run: `npm run test:e2e -- tests/e2e/shell.spec.ts --project=chromium-desktop && npm run build`

Expected: PASS with two localized homepage outputs and no browser console errors.

- [ ] **Step 7: Commit the shell**

```bash
git add src/layouts src/components/navigation src/styles src/pages/'[lang]'/index.astro tests/e2e/shell.spec.ts
git commit -m "feat: add accessible localized site shell"
```

### Task 4: Implement The Narrative Homepage Sections

**Files:**
- Create: `src/components/sections/HeroSection.astro`
- Create: `src/components/sections/LegacySection.astro`
- Create: `src/components/sections/ExpertiseSection.astro`
- Create: `src/components/sections/EthicsSection.astro`
- Create: `src/assets/brand/firm-logo-source.jpeg`
- Create: `src/assets/sections/hero-gedung-merdeka.jpeg`
- Create: `src/assets/sections/legacy-law-book.webp`
- Create: `src/assets/sections/expertise-architecture.webp`
- Create: `src/assets/sections/ethics-stone.webp`
- Modify: `src/pages/[lang]/index.astro`
- Create: `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes: `HomeContent`, `Locale`, `BaseLayout`, approved asset paths, and Astro image services.
- Produces: section anchors `hero`, `legacy`, `expertise`, and `ethics`, with no client-only dependency for reading the narrative.

- [ ] **Step 1: Write failing narrative-flow tests**

Assert the four section landmarks appear in order in both languages, the H1 is exactly `Absolute Loyalty. Strategic Action.`, no page contains `37-Year Legacy`, each practice item is present, imagery has fixed dimensions, and the page remains readable with JavaScript disabled.

- [ ] **Step 2: Run the focused home test and verify failure**

Run: `npm run test:e2e -- tests/e2e/home.spec.ts --grep "narrative" --project=chromium-desktop`

Expected: FAIL because narrative components and assets do not exist.

- [ ] **Step 3: Prepare temporary image assets**

Copy the supplied logo and selected hero photograph without modifying the originals. Use the `imagegen` skill to create the three approved temporary bitmap concepts without embedded text, then optimize them to WebP with sufficient source resolution for a 1440 px presentation.

- [ ] **Step 4: Implement the four focused section components**

Use semantic headings, Astro responsive images, reserved aspect ratios, approved overlays, and content received only through typed props. Mark decorative imagery with empty alternative text.

- [ ] **Step 5: Replace temporary anchors with the narrative components**

Keep the exact section order from the design and ensure anchor offsets account for the floating header.

- [ ] **Step 6: Run narrative verification**

Run: `npm run test:e2e -- tests/e2e/home.spec.ts --grep "narrative" --project=chromium-desktop && npm run build`

Expected: PASS; built HTML contains all four narratives and optimized image variants.

- [ ] **Step 7: Commit the narrative experience**

```bash
git add src/components/sections src/assets/brand src/assets/sections src/pages/'[lang]'/index.astro tests/e2e/home.spec.ts
git commit -m "feat: add narrative homepage experience"
```

### Task 5: Implement Team Cards And Profile Pages

**Files:**
- Create: `src/components/sections/TeamSection.astro`
- Create: `src/components/team/TeamCard.astro`
- Create: `src/components/team/TeamProfile.astro`
- Create: `src/pages/[lang]/team/[slug].astro`
- Modify: `src/pages/[lang]/index.astro`
- Create: `tests/e2e/team.spec.ts`
- Create: `tests/e2e/responsive.spec.ts`

**Interfaces:**
- Consumes: `getTeamMembers`, `getAllTeamPaths`, `TeamMember`, and `BaseLayout`.
- Produces: `team` homepage anchor and twelve localized static profile pages.

- [ ] **Step 1: Write failing team-flow tests**

Assert six cards per locale, stable member links, exact names and supplied credentials, complete draft sections only for Herman and F. Ebby, explicit pending copy for the other four, reciprocal locale links, and a working return link to the team section.

- [ ] **Step 2: Add failing narrow-layout assertions**

At 320 px and at browser zoom equivalent to 200%, assert every name and credential block stays within its card and no horizontal document overflow occurs.

- [ ] **Step 3: Run the team tests and verify failure**

Run: `npm run test:e2e -- tests/e2e/team.spec.ts tests/e2e/responsive.spec.ts --project=chromium-mobile`

Expected: FAIL because team UI and profile routes do not exist.

- [ ] **Step 4: Implement monogram team cards and the homepage section**

Use deterministic initials, visible country labeling only if sourced, and natural wrapping for long credentials. Do not synthesize portrait photography.

- [ ] **Step 5: Implement localized profile route generation and profile states**

Render complete-draft fields only when present; render a concise localized pending notice otherwise. Add localized metadata without `Person` structured data for pending profiles.

- [ ] **Step 6: Run team verification**

Run: `npm run test:e2e -- tests/e2e/team.spec.ts tests/e2e/responsive.spec.ts --project=chromium-mobile && npm run build`

Expected: PASS and exactly twelve profile HTML pages are generated.

- [ ] **Step 7: Commit the team experience**

```bash
git add src/components/sections/TeamSection.astro src/components/team src/pages/'[lang]'/team src/pages/'[lang]'/index.astro tests/e2e/team.spec.ts tests/e2e/responsive.spec.ts
git commit -m "feat: add bilingual team profiles"
```

### Task 6: Curate And Implement The Client Portfolio

**Files:**
- Create: `src/content/clients.ts`
- Create: `src/components/sections/ClientsSection.astro`
- Create: `src/components/client/ClientLogo.astro`
- Create: `src/assets/clients/*`
- Modify: `src/pages/[lang]/index.astro`
- Create: `tests/unit/assets.test.ts`
- Modify: `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes: the 28 files in `/Users/mekari/Downloads/logo klien/`, `ClientRecord`, and localized client-section copy.
- Produces: `CLIENTS: readonly ClientRecord[]`, `getFeaturedClients(): readonly ClientRecord[]`, and the `clients` homepage anchor.

- [ ] **Step 1: Inventory and visually inspect all supplied logo files**

Record the visible organization name for each usable logo, note duplicates or unreadable assets, and choose twelve to sixteen featured records based on source quality and balanced aspect ratios. Do not infer a client relationship beyond the supplied directory.

- [ ] **Step 2: Write failing client and asset tests**

Assert 28 source records or an explicit documented exclusion for each unreadable duplicate, twelve to sixteen featured records, unique IDs, nonempty display names, existing source files, `approval: 'draft'`, and no filename used as user-facing alternative text.

- [ ] **Step 3: Add failing browser tests for progressive expansion and fallback**

Assert featured logos are visible without JavaScript, the explicit expand control reveals the remaining usable logos when JavaScript is available, an intercepted 404 response for one image does not collapse its tile, and the accessible name remains visible.

- [ ] **Step 4: Run client tests and verify failure**

Run: `npm run test:unit -- tests/unit/assets.test.ts && npm run test:e2e -- tests/e2e/home.spec.ts --grep "clients" --project=chromium-desktop`

Expected: FAIL because client records and components do not exist.

- [ ] **Step 5: Copy assets and implement client records**

Preserve source files, use stable descriptive repository filenames, apply layout normalization through CSS containment and Astro image output, and use a reversible monochrome filter without editing logo geometry.

- [ ] **Step 6: Implement the client logo and portfolio components**

Show draft status in nearby explanatory copy, keep all client names available to assistive technology, and make expansion progressively enhanced with a no-JavaScript full-list fallback.

- [ ] **Step 7: Run client verification**

Run: `npm run test:unit -- tests/unit/assets.test.ts && npm run test:e2e -- tests/e2e/home.spec.ts --grep "clients" --project=chromium-desktop && npm run build`

Expected: PASS with no missing asset warnings.

- [ ] **Step 8: Commit the client portfolio**

```bash
git add src/content/clients.ts src/components/sections/ClientsSection.astro src/components/client src/assets/clients src/pages/'[lang]'/index.astro tests/unit/assets.test.ts tests/e2e/home.spec.ts
git commit -m "feat: add draft client portfolio"
```

### Task 7: Complete Contact SEO Preview Safety And Hosting Configuration

**Files:**
- Create: `src/components/sections/ContactSection.astro`
- Create: `src/components/contact/ContactItem.astro`
- Create: `src/components/FloatingWhatsApp.astro`
- Create: `src/components/SiteFooter.astro`
- Create: `src/pages/404.astro`
- Create: `netlify.toml`
- Modify: `astro.config.mjs`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/[lang]/index.astro`
- Modify: `src/pages/[lang]/team/[slug].astro`
- Modify: `tests/e2e/home.spec.ts`
- Modify: `tests/unit/routes.test.ts`

**Interfaces:**
- Consumes: centralized contact data, `SITE.preview`, current locale and metadata props.
- Produces: `contact` anchor, safe external links, JSON-LD, sitemap output, `X-Robots-Tag`, static security headers, and Netlify build settings `command = "npm run build"`, `publish = "dist"`.

- [ ] **Step 1: Write failing contact and metadata tests**

Assert visible email, telephone, WhatsApp, hours, address, safe map link, matching floating WhatsApp href, localized title and description, canonical and reciprocal `hreflang`, `robots` noindex meta, concept-preview label, informational legal disclaimer, and `LegalService` or `Organization` JSON-LD.

- [ ] **Step 2: Write failing 404 and Netlify configuration tests**

Assert 404 includes Indonesian and English recovery links; `netlify.toml` publishes `dist`, runs `npm run build`, adds `X-Robots-Tag: noindex, nofollow`, `X-Content-Type-Options: nosniff`, a restrictive frame policy, conservative referrer policy, and a CSP that permits only required static assets.

- [ ] **Step 3: Run focused tests and verify failure**

Run: `npm run test:unit -- tests/unit/routes.test.ts && npm run test:e2e -- tests/e2e/home.spec.ts --grep "contact|metadata|preview" --project=chromium-desktop`

Expected: FAIL because final contact, metadata, footer, 404, and hosting configuration are absent.

- [ ] **Step 4: Implement contact components and direct actions**

Render human-readable values beside every link, use the centralized targets, open map directions safely, and position the floating WhatsApp control so it does not cover mobile content or focus targets.

- [ ] **Step 5: Implement footer, preview labeling, metadata, and structured data**

Keep the preview label visible, use draft-safe descriptions, add the informational disclaimer, exclude pending profiles from `Person` JSON-LD, and generate the sitemap while retaining noindex controls.

- [ ] **Step 6: Implement localized 404 and Netlify configuration**

Add the exact static build settings and security headers. Do not add Netlify Functions or form processing.

- [ ] **Step 7: Run integration verification**

Run: `npm run test:unit && npm run test:e2e -- tests/e2e/home.spec.ts --project=chromium-desktop && npm run build`

Expected: PASS; `dist/sitemap-index.xml` or the configured sitemap output exists and all HTML remains marked noindex.

- [ ] **Step 8: Commit contact and deployment readiness**

```bash
git add src/components/sections/ContactSection.astro src/components/contact src/components/FloatingWhatsApp.astro src/components/SiteFooter.astro src/pages/404.astro src/layouts/BaseLayout.astro src/pages astro.config.mjs netlify.toml tests
git commit -m "feat: complete contact SEO and preview safeguards"
```

### Task 8: Verify Accessibility Responsiveness Performance And Deployment Output

**Files:**
- Create: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `playwright.config.ts`
- Modify: `lighthouserc.json`
- Create: `README.md` or update the existing project README without removing the Superpowers setup information.
- Create: `docs/deployment/netlify-mvp.md`
- Modify: any implementation file required to resolve discovered defects.

**Interfaces:**
- Consumes: the complete website and all test scripts.
- Produces: verified `dist`, local-preview instructions, Netlify Free deployment instructions, and browser-review evidence in command output.

- [ ] **Step 1: Complete failing accessibility tests**

Run axe on both locales, both themes, the two complete team profiles, one pending profile, and 404; separately assert skip-link behavior, full keyboard reachability, 44 px minimum interactive targets where applicable, reduced-motion behavior, and logical focus after opening and closing the mobile menu.

- [ ] **Step 2: Complete failing responsive tests**

Test 320×568, 390×844, 768×1024, 1440×900, and 1920×1080; assert no horizontal overflow, no overlap by floating controls, readable hero crops, visible contact details, and wrapped long credentials and address text. Repeat critical mobile pages at 200% zoom.

- [ ] **Step 3: Run cross-browser tests and capture initial failures**

Run: `npm run test:e2e`

Expected: Any remaining accessibility, responsive, or browser-specific defects fail in Chromium, Firefox, or WebKit before repair.

- [ ] **Step 4: Fix failures with the smallest scoped changes**

Change only the owning component, styles, or content mapping for each reproduced failure; do not weaken assertions or remove supported browser projects.

- [ ] **Step 5: Run the complete automated verification suite**

Run: `npm run test:unit && npm run test:e2e && npm run build && npm run test:lighthouse`

Expected: all tests pass; Lighthouse medians meet 0.90 Performance, 0.95 Accessibility, and 0.95 Best Practices.

- [ ] **Step 6: Inspect the site directly in a browser**

Open the built preview through browser automation, inspect Indonesian and English homepages plus complete and pending profiles at desktop and mobile sizes, toggle themes and menus, follow contact links without completing external actions, and confirm no console errors or visual defects.

- [ ] **Step 7: Document local and Netlify workflows**

Preserve the repository’s Superpowers setup notes while adding exact commands for `npm ci`, `npm run dev`, `npm run build`, `npm run preview`, and Netlify drag-and-drop or Git deployment. State that a Netlify account is required for a persistent public URL and that production publishes should be minimized to conserve credits.

- [ ] **Step 8: Request final code review and resolve findings**

Use `superpowers:requesting-code-review` for a whole-branch review against the approved spec and both implementation plans. Apply `superpowers:receiving-code-review` before accepting any requested change, then repeat the owning tests.

- [ ] **Step 9: Run verification before completion**

Use `superpowers:verification-before-completion`; rerun the exact complete suite from Step 5 and record fresh output before making any completion claim.

- [ ] **Step 10: Commit verified website delivery**

```bash
git add README.md docs/deployment tests playwright.config.ts lighthouserc.json src netlify.toml astro.config.mjs package.json package-lock.json
git commit -m "test: verify Wijaya Partners MVP"
```

### Task 9: Publish Or Prepare The Netlify Demo

**Files:**
- Modify: `docs/deployment/netlify-mvp.md` only if deployment reveals an undocumented required step.

**Interfaces:**
- Consumes: verified `dist` output and user-authorized Netlify account access.
- Produces: a public `netlify.app` concept-preview URL, or a verified manual-deployment package when account authentication is unavailable.

- [ ] **Step 1: Confirm the deploy artifact rather than rebuilding through an unverified path**

Run: `npm ci && npm run build && test -f dist/index.html`

Expected: PASS with the same tested static artifact shape.

- [ ] **Step 2: Deploy only with available account authorization**

If authenticated Netlify access is available, use Git integration or drag-and-drop for the verified `dist`; otherwise stop at the prepared artifact and the exact documented user steps without inventing credentials or claiming a live URL.

- [ ] **Step 3: Verify the remote deployment when one exists**

Check both locale roots, one complete profile, one pending profile, response security headers, `X-Robots-Tag`, theme persistence, mobile navigation, and asset loading on the real URL.

- [ ] **Step 4: Commit documentation changes only when needed**

```bash
git add docs/deployment/netlify-mvp.md
git commit -m "docs: finalize Netlify MVP deployment"
```
