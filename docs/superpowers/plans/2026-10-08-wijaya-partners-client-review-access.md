# Wijaya And Partners Client Review Access Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an isolated client-review portal at `/` that links to both bilingual MVP concepts through one stable Netlify URL without making the portal look like part of the company profile.

**Architecture:** A dedicated review layout and scoped stylesheet render two static concept cards from typed metadata. The existing company-profile layouts and routes remain independent; shared preview-safety metadata and deployment headers keep every review route non-indexable, while a static Netlify build provides the stable client URL.

**Tech Stack:** Node.js 24, npm, Astro 7.3.6, TypeScript 7.0.2, Vitest 5.0.3, Playwright 1.63.0, CSS custom properties, Netlify static hosting.

**Spec:** `docs/superpowers/specs/2026-10-08-wijaya-partners-client-review-access-design.md`

**Prerequisites:** Complete `docs/superpowers/plans/2026-10-06-wijaya-partners-website.md` and `docs/superpowers/plans/2026-10-07-wijaya-partners-alternative-carousel.md` first so all four destination routes exist before this integration plan begins.

## Global Constraints

- Keep `/` visibly and structurally separate from either company-profile concept.
- Preserve `/id/`, `/en/`, `/alternative/id/`, and `/alternative/` as the four concept destinations.
- Provide no password, login, account, form, feedback button, WhatsApp shortcut, email shortcut, analytics, cookie, tracker, or visitor-data collection on the review portal.
- Use `Internal Design Review` as the portal heading and state explicitly that the page is only for selecting a concept and is not part of the Wijaya And Partners website.
- Do not use the firm logo as the portal's primary visual element or reuse either concept's header, footer, navigation, hero, theme treatment, or brand-led layout.
- Emit `noindex, nofollow` for every review route and discourage all crawling through `robots.txt`; treat those directives as discovery controls, not access controls.
- Keep the build static and framework-runtime-free in the browser; all four destination links must work without JavaScript.
- Use one stable, non-obvious Netlify URL for client sharing and redeploy revisions to that same site.

## File Structure

- `src/content/review.ts` — typed metadata for exactly two concepts and their four localized routes.
- `src/layouts/ReviewLayout.astro` — minimal document shell for the review portal; no company-profile chrome.
- `src/pages/index.astro` — root concept selector rendered from `REVIEW_CONCEPTS`.
- `src/styles/review.css` — neutral, review-only visual system scoped under `.review-portal`.
- `src/assets/review/concept-01.png` — representative screenshot of the original concept.
- `src/assets/review/concept-02.png` — representative screenshot of the alternative carousel concept.
- `src/components/meta/PreviewRobots.astro` — shared static `noindex, nofollow` metadata for all review layouts.
- `public/robots.txt` — crawl discouragement for the complete temporary review deployment.
- `astro.config.mjs` — preview-build configuration with no sitemap output.
- `netlify.toml` — static build settings, preview headers, and security headers.
- `tests/unit/review-content.test.ts` — exact concept count, IDs, labels, and localized routes.
- `tests/unit/preview-safety.test.ts` — crawler-file and Netlify-header configuration contracts.
- `tests/e2e/review-portal.spec.ts` — portal separation, navigation, fallback, responsive, accessibility, and preview-safety behavior.
- `docs/deployment/netlify-mvp.md` — stable review URL workflow, revision procedure, and shutdown procedure.

## Interfaces

```ts
export type ReviewConceptId = 'concept-01' | 'concept-02';
export type ReviewLocale = 'id' | 'en';

export interface ReviewLink {
  locale: ReviewLocale;
  label: 'Bahasa Indonesia' | 'English';
  href: '/id/' | '/en/' | '/alternative/id/' | '/alternative/';
}

export interface ReviewConcept {
  id: ReviewConceptId;
  title: 'Concept 01' | 'Concept 02';
  description: string;
  thumbnail: ImageMetadata;
  links: readonly [ReviewLink, ReviewLink];
}

export const REVIEW_CONCEPTS: readonly [ReviewConcept, ReviewConcept];
```

## Review Focus

1. A missing or blocked thumbnail must leave the concept title, description, and both language links visible in a stable card; Task 1 tests the image-failure fallback.
2. Long portal copy and browser zoom must not overflow at 320 px or 200%; Task 1 tests both narrow and zoomed rendering.
3. A later refactor must not accidentally add the company header, footer, primary navigation, firm logo, or feedback controls to `/`; Task 1 pins their absence.
4. Meta robots, response headers, `robots.txt`, and sitemap behavior must agree for the root and all four destinations; Task 2 tests the complete route matrix.
5. A stale or mistyped destination must fail automated verification instead of sending the client to a 404 page; Tasks 1 and 3 request every configured href and require successful responses.

---

### Task 1: Build The Isolated Review Portal

**Files:**
- Create: `src/content/review.ts`
- Create: `src/layouts/ReviewLayout.astro`
- Modify: `src/pages/index.astro`
- Create: `src/styles/review.css`
- Create: `src/assets/review/concept-01.png`
- Create: `src/assets/review/concept-02.png`
- Create: `tests/unit/review-content.test.ts`
- Create: `tests/e2e/review-portal.spec.ts`

**Interfaces:**
- Consumes: the completed pages at `/id/`, `/en/`, `/alternative/id/`, and `/alternative/`.
- Produces: `ReviewConceptId`, `ReviewLocale`, `ReviewLink`, `ReviewConcept`, `REVIEW_CONCEPTS`, and an isolated static selector at `/`.

- [ ] **Step 1: Write the failing review-content contract**

Assert that `REVIEW_CONCEPTS` contains exactly `concept-01` and `concept-02`; titles are exactly `Concept 01` and `Concept 02`; each concept has exactly one `Bahasa Indonesia` link and one `English` link; and the four href values are exactly `/id/`, `/en/`, `/alternative/id/`, and `/alternative/` with no duplicates.

- [ ] **Step 2: Write the failing portal-separation browser tests**

Assert `/` exposes one `Internal Design Review` heading, the sentence `Halaman ini hanya untuk memilih konsep dan bukan bagian dari website Wijaya And Partners.`, two concept cards, two thumbnails, and four reachable language links. Assert the root contains no company-profile header, footer, primary navigation, firm-logo image, `mailto:`, `tel:`, `wa.me`, form, feedback control, theme control, or company-profile section anchor.

- [ ] **Step 3: Add failing resilience and layout assertions**

At 320×568 and 200% zoom, assert no horizontal overflow and all four links remain visible and keyboard reachable. Block both thumbnail requests and assert card dimensions remain stable, neutral fallback surfaces appear, and the four links still work. Disable JavaScript and assert the complete selector remains usable.

- [ ] **Step 4: Run the focused tests and verify the RED state**

Run: `npm run test:unit -- tests/unit/review-content.test.ts && npm run test:e2e -- tests/e2e/review-portal.spec.ts --project=chromium-desktop`

Expected: FAIL because the review content, isolated layout, and final root portal do not exist.

- [ ] **Step 5: Implement typed review metadata**

Create the exact interfaces above. Use neutral descriptions: Concept 01 is the original editorial company-profile direction; Concept 02 is the alternative narrative-carousel direction. Import the two thumbnail files as Astro `ImageMetadata` and keep the localized href values literal.

- [ ] **Step 6: Capture representative concept thumbnails**

Run the completed local preview at a 1440×900 viewport. Capture the opening view of `/id/` as `concept-01.png` and `/alternative/id/` as `concept-02.png`; crop consistently, preserve readable representative composition, and do not add text or branding outside the captured concept itself.

- [ ] **Step 7: Implement the dedicated review layout and root selector**

`ReviewLayout` accepts `{ title: string; description: string }`, imports only `review.css`, and renders document metadata plus its slot without company-profile components. Render the exact heading and notice, then map `REVIEW_CONCEPTS` into semantic article cards with Astro images and normal anchor links.

- [ ] **Step 8: Implement the neutral responsive visual system**

Scope every selector under `.review-portal`; use white, neutral gray, and dark text rather than the company burgundy system; render two columns when space permits and one column on narrow screens; provide stable thumbnail aspect ratios, visible focus, readable contrast, and practical touch targets.

- [ ] **Step 9: Run portal verification**

Run: `npm run test:unit -- tests/unit/review-content.test.ts && npm run test:e2e -- tests/e2e/review-portal.spec.ts --project=chromium-desktop && npm run build`

Expected: PASS; `dist/index.html` is the review portal and all four linked static outputs exist.

- [ ] **Step 10: Commit the isolated portal**

```bash
git add src/content/review.ts src/layouts/ReviewLayout.astro src/pages/index.astro src/styles/review.css src/assets/review tests/unit/review-content.test.ts tests/e2e/review-portal.spec.ts
git commit -m "feat: add isolated client review portal"
```

### Task 2: Enforce Preview Safety Across Every Route

**Files:**
- Create: `src/components/meta/PreviewRobots.astro`
- Create: `public/robots.txt`
- Modify: `src/layouts/ReviewLayout.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/layouts/AlternativeLayout.astro`
- Modify: `astro.config.mjs`
- Modify: `netlify.toml`
- Create: `tests/unit/preview-safety.test.ts`
- Modify: `tests/e2e/review-portal.spec.ts`
- Modify: `tests/e2e/home.spec.ts`
- Modify: `tests/e2e/alternative.spec.ts`

**Interfaces:**
- Consumes: the three layout shells and static Netlify configuration.
- Produces: `PreviewRobots` with no props, `<meta name="robots" content="noindex, nofollow">` on every HTML route, Netlify configuration for `X-Robots-Tag: noindex, nofollow`, `robots.txt` with `User-agent: *` and `Disallow: /`, and no generated sitemap in the temporary review build.

- [ ] **Step 1: Extend the browser tests with the complete preview-safety matrix**

For `/`, `/id/`, `/en/`, `/alternative/id/`, and `/alternative/`, assert successful response and `meta[name="robots"]` content exactly `noindex, nofollow`. Request `/robots.txt` and assert `User-agent: *` plus `Disallow: /`.

- [ ] **Step 2: Write the failing deployment-configuration tests**

Read `public/robots.txt` and `netlify.toml` as text. Assert the crawler file contains exactly the all-agent, all-route disallow policy; the Netlify `/*` header block contains `X-Robots-Tag = "noindex, nofollow"`; and the configuration contains no identity, functions, forms, analytics, login redirect, or password-protection setup.

- [ ] **Step 3: Run the safety tests and verify the RED state**

Run: `npm run test:unit -- tests/unit/preview-safety.test.ts && npm run test:e2e -- tests/e2e/review-portal.spec.ts --grep "preview safety" --project=chromium-desktop`

Expected: FAIL because the review portal and alternative layout do not yet share one preview-metadata contract and sitemap behavior still reflects the earlier MVP plan.

- [ ] **Step 4: Implement shared preview metadata**

Create `PreviewRobots.astro` with the exact robots meta element and import it into `ReviewLayout`, `BaseLayout`, and `AlternativeLayout`. Remove duplicate robots elements from the owning layouts so each built page has one authoritative directive.

- [ ] **Step 5: Implement crawl and sitemap policy**

Add the exact two-line crawler rule to `public/robots.txt`. Update `astro.config.mjs` so the temporary review build produces no sitemap; retain the sitemap package only if it remains required by a documented future production mode.

- [ ] **Step 6: Align Netlify headers**

Ensure `netlify.toml` applies `X-Robots-Tag = "noindex, nofollow"` and the existing static security headers to `/*`; do not add identity, functions, forms, analytics, redirects to login, or password protection.

- [ ] **Step 7: Run preview-safety verification**

Run: `npm run test:unit -- tests/unit/preview-safety.test.ts && npm run build && test ! -e dist/sitemap-index.xml && test ! -e dist/sitemap-0.xml && npm run test:e2e -- tests/e2e/review-portal.spec.ts --grep "preview safety" --project=chromium-desktop`

Expected: PASS; all five routes agree on noindex behavior, `robots.txt` disallows all crawling, and no sitemap advertises review routes.

- [ ] **Step 8: Commit preview safeguards**

```bash
git add src/components/meta/PreviewRobots.astro src/layouts/ReviewLayout.astro src/layouts/BaseLayout.astro src/layouts/AlternativeLayout.astro public/robots.txt astro.config.mjs netlify.toml tests/unit/preview-safety.test.ts tests/e2e/review-portal.spec.ts tests/e2e/home.spec.ts tests/e2e/alternative.spec.ts
git commit -m "feat: enforce review preview safeguards"
```

### Task 3: Verify And Prepare The Stable Client URL

**Files:**
- Modify: `tests/e2e/review-portal.spec.ts`
- Modify: `docs/deployment/netlify-mvp.md`
- Modify if verification exposes a defect: `src/pages/index.astro`
- Modify if verification exposes a defect: `src/styles/review.css`
- Modify if verification exposes a defect: `src/layouts/ReviewLayout.astro`
- Modify if verification exposes a defect: `src/content/review.ts`
- Modify if verification exposes a defect: `src/components/meta/PreviewRobots.astro`
- Modify if verification exposes a defect: `astro.config.mjs`
- Modify if verification exposes a defect: `netlify.toml`

**Interfaces:**
- Consumes: the complete static site, Netlify build configuration, and an existing authenticated Netlify site when available.
- Produces: one verified `dist` artifact, documented stable-URL workflow, and either a live client-review URL or a deployment-ready artifact with exact owner steps.

- [ ] **Step 1: Complete the cross-browser acceptance scenarios**

Assert all four configured destinations return HTTP 200 and preserve their own company-profile shells; the root remains visually neutral; keyboard order follows Concept 01 Indonesian, Concept 01 English, Concept 02 Indonesian, Concept 02 English; and no browser console error occurs in Chromium, Firefox, or WebKit.

- [ ] **Step 2: Run the complete automated verification suite**

Run: `npm run test:unit && npm run test:e2e && npm run build && npm run test:lighthouse`

Expected: PASS with zero failing tests, a successful static build, and the existing project Lighthouse thresholds met.

- [ ] **Step 3: Inspect the review flow directly**

Open `/` at 390×844 and 1440×900, inspect the neutral portal and both thumbnails, follow every language link, use browser Back to return, disable JavaScript once, and confirm the portal never resembles a fifth company-profile page.

- [ ] **Step 4: Document the client-sharing workflow**

Update `docs/deployment/netlify-mvp.md` to state: share only the stable root URL; deploy revisions to the same Netlify site; keep immutable deploy permalinks internal; use no password; remind collaborators that link possession grants access; and disable or delete the review site when review ends.

- [ ] **Step 5: Build the exact deployment artifact**

Run: `npm ci && npm run build && test -f dist/index.html && test -f dist/id/index.html && test -f dist/en/index.html && test -f dist/alternative/index.html && test -f dist/alternative/id/index.html`

Expected: PASS with the portal and all four destinations in the same `dist` directory.

- [ ] **Step 6: Publish only when authenticated Netlify access is available**

Redeploy the verified artifact to the existing review site so its URL remains stable. If no site exists, create one with a Netlify-generated or otherwise non-obvious site name. If account authentication is unavailable, stop with the verified `dist` artifact and the documented deployment steps without claiming a live URL.

- [ ] **Step 7: Verify the remote review site when deployment occurs**

Request the stable root URL and all four destinations, verify the `X-Robots-Tag` header and `robots.txt`, confirm both thumbnails load, and repeat one mobile navigation pass. Record the stable root URL in the deployment document without adding deploy permalinks to client-facing instructions.

- [ ] **Step 8: Run completion verification and commit delivery documentation**

Use `superpowers:verification-before-completion`, rerun the complete command from Step 2 against the final files, then commit only the verified changes.

```bash
git add docs/deployment/netlify-mvp.md tests/e2e/review-portal.spec.ts src/pages/index.astro src/styles/review.css src/layouts/ReviewLayout.astro src/content/review.ts src/components/meta/PreviewRobots.astro astro.config.mjs netlify.toml
git commit -m "test: verify client review access"
```

## Handoff

Share only the stable root URL with the client. Describe it as an internal design-review link, not the company's website. Keep deploy-specific permalinks and deployment administration internal, and remove the temporary site after the review period ends.
