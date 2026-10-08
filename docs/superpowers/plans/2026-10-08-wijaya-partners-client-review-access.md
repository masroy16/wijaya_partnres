# Wijaya And Partners Client Review Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the two already-built Wijaya And Partners MVP concepts into one verified Astro project, add an isolated selector at `/`, and publish the combined build through one stable Netlify URL.

**Architecture:** Concept 01 is the canonical project foundation because it already contains the complete bilingual company profile, shared tooling, accessibility suite, Lighthouse configuration, and Netlify configuration. Concept 02 is imported from its clean feature branch through alternative-specific paths only, avoiding replacement of Concept 01's package, test, and deployment foundation. A dedicated review layout then owns `/`, while the two company-profile experiences remain isolated under their existing routes.

**Tech Stack:** Node.js 24, npm, Astro 7.3.6, TypeScript 7.0.2, Vitest 5.0.3, Playwright 1.63.0, `@axe-core/playwright` 4.13.0, Lighthouse CI 0.15.1, CSS custom properties, Netlify static hosting.

**Spec:** `docs/superpowers/specs/2026-10-08-wijaya-partners-client-review-access-design.md`

**Existing implementation sources:**

- Concept 01 worktree: `/Users/mekari/.codex/worktrees/wijaya-partners-mvp/web_design`, detached at `c8bf06b` with verified-intent QA and visual changes still uncommitted.
- Concept 02 worktree: `/Users/mekari/.codex/worktrees/wijaya-alternative-carousel/web_design`, clean branch `codex/wijaya-alternative-carousel` at `74b8921`.
- Integration base: current `master`, containing the approved specifications and this revised integration plan.

## Global Constraints

- Do not rebuild either concept from scratch or replace working components with new equivalents.
- Preserve every uncommitted Concept 01 file before integration; do not clean, reset, stash-and-drop, or overwrite its worktree.
- Keep Concept 01's `package.json`, `package-lock.json`, Astro configuration, Playwright configuration, Lighthouse configuration, and Netlify configuration as the canonical foundation unless a combined test proves a specific change is required.
- Import only Concept 02-specific routes, components, content, assets, styles, state helpers, tests, and supporting design documents from `codex/wijaya-alternative-carousel`.
- Preserve `/id/`, `/en/`, `/alternative/id/`, `/alternative/`, and all existing team-profile routes.
- Keep `/` visibly and structurally separate from either company-profile concept.
- Provide no password, login, account, form, feedback button, WhatsApp shortcut, email shortcut, analytics, cookie, tracker, or visitor-data collection on the review portal.
- Emit `noindex, nofollow` for every route, discourage crawling through `robots.txt`, and treat those directives as discovery controls rather than access controls.
- Use one stable, non-obvious Netlify production URL; revisions must replace that site's production deploy rather than generate a new client-facing URL.
- Add `.netlify/` to `.gitignore` before linking a local checkout to Netlify.

## File Structure

### Existing Concept 01 foundation retained

- `package.json`, `package-lock.json`, `.node-version` — canonical dependencies and scripts.
- `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`, `lighthouserc.json` — canonical build and verification configuration.
- `src/pages/[lang]/`, `src/layouts/BaseLayout.astro`, `src/components/`, `src/content/`, `src/i18n/`, `src/styles/global.css`, `src/styles/tokens.css` — Concept 01 implementation.
- `netlify.toml` — canonical static-hosting and security-header configuration.

### Existing Concept 02 feature paths imported

- `public/assets/alternative/` — Concept 02 media and client assets.
- `src/components/alternative/` — alternative carousel, header, page, and team-profile components.
- `src/content/alternative.ts`, `src/content/alternative-team.ts` — bilingual alternative content.
- `src/layouts/AlternativeLayout.astro` — isolated Concept 02 document shell.
- `src/lib/carousel-state.ts` — pure carousel state contract.
- `src/pages/alternative/` — Concept 02 pages and team routes.
- `src/styles/alternative.css` — namespaced Concept 02 styling.
- `tests/unit/alternative-*.test.ts`, `tests/unit/carousel-state.test.ts`, `tests/e2e/alternative*.spec.ts` — Concept 02 verification.

### New integration and review files

- `tests/e2e/concepts-integration.spec.ts` — route coexistence and shell-isolation contract.
- `src/content/review.ts` — typed metadata for exactly two concepts and their four localized entry routes.
- `src/layouts/ReviewLayout.astro` — minimal document shell for the selector.
- `src/pages/index.astro` — root selector replacing Concept 01's temporary language-entry page.
- `src/styles/review.css` — neutral styles scoped under `.review-portal`.
- `src/assets/review/concept-01.png`, `src/assets/review/concept-02.png` — representative concept screenshots.
- `src/components/meta/PreviewRobots.astro` — shared preview-only robot metadata.
- `public/robots.txt` — all-route crawl discouragement.
- `tests/unit/review-content.test.ts`, `tests/unit/preview-safety.test.ts` — selector data and deployment-safety contracts.
- `tests/e2e/review-portal.spec.ts` — selector behavior, isolation, responsiveness, and safety.
- `docs/deployment/netlify-mvp.md` — stable URL, update, and shutdown workflow.

## Interfaces

```ts
import type { ImageMetadata } from 'astro';

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

1. Concept 01's uncommitted QA work must survive source stabilization and integration byte-for-byte; Task 1 records and verifies the exact source state before any integration.
2. Importing Concept 02 must not replace Concept 01's dependency lockfile, test projects, global styles, or Netlify settings; Task 2 tests both route families from the canonical foundation.
3. Identically named global selectors or browser scripts must not leak between the two concepts; Task 2 opens both concepts sequentially and checks their distinct shells and interactions.
4. A missing review thumbnail must leave the concept name and both language links usable at 320 px and 200% zoom; Task 3 tests image failure and narrow rendering.
5. Meta robots, `robots.txt`, Netlify response headers, and sitemap output must agree across the root and both concepts; Tasks 4 and 5 test local configuration and the deployed route matrix.

---

### Task 1: Stabilize The Existing Concept Sources

**Files:**
- Modify in Concept 01 source: `.gitignore`, `lighthouserc.json`, `playwright.config.ts`
- Modify in Concept 01 source: `src/components/SiteFooter.astro`, `src/components/navigation/SiteHeader.astro`
- Modify in Concept 01 source: `src/components/sections/ClientsSection.astro`, `src/components/sections/ContactSection.astro`, `src/components/sections/EthicsSection.astro`, `src/components/sections/ExpertiseSection.astro`, `src/components/sections/HeroSection.astro`, `src/components/sections/LegacySection.astro`, `src/components/sections/TeamSection.astro`
- Modify in Concept 01 source: `src/components/team/TeamCard.astro`, `src/components/team/TeamProfile.astro`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `src/styles/tokens.css`
- Modify in Concept 01 source: `tests/e2e/home.spec.ts`, `tests/e2e/responsive.spec.ts`, `tests/e2e/shell.spec.ts`, `tests/e2e/team.spec.ts`
- Create in Concept 01 source: `README.md`, `docs/deployment/netlify-mvp.md`, `src/assets/brand/wijaya-partners-logo.png`, `src/assets/brand/wijaya-partners-mark.png`, `tests/e2e/accessibility.spec.ts`, `tests/e2e/transitions.spec.ts`
- Read only in Concept 02 source: all tracked files at `codex/wijaya-alternative-carousel@74b8921`

**Interfaces:**
- Consumes: Concept 01's detached `c8bf06b` worktree plus its current uncommitted changes, and clean Concept 02 commit `74b8921`.
- Produces: named, clean branch `codex/wijaya-partners-mvp-final` and two immutable verified source commits for Task 2.

- [ ] **Step 1: Record the Concept 01 source state before mutation**

Run `git status --short`, `git diff --stat`, `git diff --name-status`, and an untracked-file listing in the Concept 01 worktree. Confirm the result matches the files declared above; stop if unrelated or newly changed files appear so they are not silently absorbed.

- [ ] **Step 2: Attach the detached Concept 01 worktree to a preservation branch**

Run: `git switch -c codex/wijaya-partners-mvp-final`

Expected: the branch points at `c8bf06b` and every staged, unstaged, and untracked file remains present.

- [ ] **Step 3: Verify the existing Concept 01 changes**

Run: `npm run test:unit && npm run test:e2e && npm run build && npm run test:lighthouse`

Expected: PASS with zero failing tests and the configured Lighthouse thresholds met. If a check fails, invoke `superpowers:systematic-debugging`, fix only the owning Concept 01 file, and rerun the focused check before repeating this command.

- [ ] **Step 4: Commit the preserved Concept 01 completion state**

Stage only the files from this task's file list and commit them.

```bash
git add .gitignore lighthouserc.json playwright.config.ts README.md docs/deployment/netlify-mvp.md src/assets/brand/wijaya-partners-logo.png src/assets/brand/wijaya-partners-mark.png src/components/SiteFooter.astro src/components/navigation/SiteHeader.astro src/components/sections/ClientsSection.astro src/components/sections/ContactSection.astro src/components/sections/EthicsSection.astro src/components/sections/ExpertiseSection.astro src/components/sections/HeroSection.astro src/components/sections/LegacySection.astro src/components/sections/TeamSection.astro src/components/team/TeamCard.astro src/components/team/TeamProfile.astro src/layouts/BaseLayout.astro src/styles/global.css src/styles/tokens.css tests/e2e/accessibility.spec.ts tests/e2e/home.spec.ts tests/e2e/responsive.spec.ts tests/e2e/shell.spec.ts tests/e2e/team.spec.ts tests/e2e/transitions.spec.ts
git commit -m "test: finish Wijaya Partners MVP verification"
```

- [ ] **Step 5: Verify Concept 02 remains a clean source**

In the Concept 02 worktree, run `git status --short`, `npm run test:unit`, `npm run test:e2e`, and `npm run build`.

Expected: empty status before and after verification; all tests and the static build pass at commit `74b8921`.

- [ ] **Step 6: Record the two exact source commit IDs**

Run `git rev-parse HEAD` in each source worktree and use those immutable hashes in Task 2. Do not integrate from a moving worktree path or an uncommitted state.

### Task 2: Assemble Both Concepts In One Integration Worktree

**Files:**
- Create: `tests/e2e/concepts-integration.spec.ts`
- Create from Concept 02: `public/assets/alternative/`
- Create from Concept 02: `src/components/alternative/`, `src/content/alternative.ts`, `src/content/alternative-team.ts`
- Create from Concept 02: `src/layouts/AlternativeLayout.astro`, `src/lib/carousel-state.ts`, `src/pages/alternative/`, `src/styles/alternative.css`
- Create from Concept 02: `tests/unit/alternative-assets.test.ts`, `tests/unit/alternative-content.test.ts`, `tests/unit/alternative-team.test.ts`, `tests/unit/carousel-state.test.ts`
- Create from Concept 02: `tests/e2e/alternative.spec.ts`, `tests/e2e/alternative-team.spec.ts`
- Create from Concept 02: `docs/superpowers/specs/2026-10-08-alternative-team-profiles-design.md`, `docs/superpowers/plans/2026-10-08-alternative-team-profiles.md`
- Modify only if combined tests require it: `playwright.config.ts`, `tsconfig.json`

**Interfaces:**
- Consumes: `codex/wijaya-partners-mvp-final`, the immutable Concept 02 commit recorded in Task 1, and `master` documentation.
- Produces: branch `codex/wijaya-client-review` in a dedicated worktree, with both concepts sharing Concept 01's canonical tooling and no route overlap.

- [ ] **Step 1: Create the isolated integration worktree**

Use `superpowers:using-git-worktrees` to create and attach branch `codex/wijaya-client-review` from `master`. Run all remaining tasks only in the returned worktree path.

- [ ] **Step 2: Merge the finalized Concept 01 branch**

Run: `git merge --no-ff codex/wijaya-partners-mvp-final -m "feat: integrate primary Wijaya Partners concept"`

Expected: the documentation from `master` and the complete Concept 01 application coexist; no uncommitted source state remains outside history.

- [ ] **Step 3: Write the failing coexistence browser test**

Assert `/id/` and `/en/` render the Concept 01 shell; `/alternative/` and `/alternative/id/` render the Concept 02 shell; each route returns HTTP 200; Concept 01 does not render `.alternative-site`; Concept 02 does not render the Concept 01 site header; and both team-profile route families resolve without console errors.

- [ ] **Step 4: Run the coexistence test and verify the RED state**

Run: `npm run test:e2e -- tests/e2e/concepts-integration.spec.ts --project=chromium-desktop`

Expected: FAIL because the alternative-specific paths are not present in the integration worktree.

- [ ] **Step 5: Import only Concept 02-specific paths**

Use `git restore --source=74b892118caf355095d9603c02d1119320364442 --` with the exact Concept 02 paths in this task's file list. Do not restore `package.json`, `package-lock.json`, `.node-version`, `.gitignore`, `astro.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, or `tsconfig.json` from Concept 02.

- [ ] **Step 6: Reconcile the tests with the canonical project configuration**

Keep Concept 01's port `4321`, project names, four-browser matrix, dependencies, and lockfile. Remove assumptions in imported tests about Concept 02's former port `4174` or project names `desktop-chromium` and `mobile-chromium`; do not weaken any carousel, accessibility, responsive, or team-profile assertion.

- [ ] **Step 7: Run focused integration verification**

Run: `npm run test:unit -- tests/unit/alternative-assets.test.ts tests/unit/alternative-content.test.ts tests/unit/alternative-team.test.ts tests/unit/carousel-state.test.ts && npm run test:e2e -- tests/e2e/concepts-integration.spec.ts tests/e2e/alternative.spec.ts tests/e2e/alternative-team.spec.ts --project=chromium-desktop && npm run build`

Expected: PASS; all Concept 01 and Concept 02 entry and team-profile pages exist in the same `dist` output.

- [ ] **Step 8: Commit the integrated Concept 02 feature**

```bash
git add public/assets/alternative src/components/alternative src/content/alternative.ts src/content/alternative-team.ts src/layouts/AlternativeLayout.astro src/lib/carousel-state.ts src/pages/alternative src/styles/alternative.css tests/unit/alternative-assets.test.ts tests/unit/alternative-content.test.ts tests/unit/alternative-team.test.ts tests/unit/carousel-state.test.ts tests/e2e/alternative.spec.ts tests/e2e/alternative-team.spec.ts tests/e2e/concepts-integration.spec.ts docs/superpowers/specs/2026-10-08-alternative-team-profiles-design.md docs/superpowers/plans/2026-10-08-alternative-team-profiles.md playwright.config.ts tsconfig.json
git commit -m "feat: integrate alternative Wijaya Partners concept"
```

### Task 3: Add The Isolated Review Portal

**Files:**
- Create: `src/content/review.ts`
- Create: `src/layouts/ReviewLayout.astro`
- Modify: `src/pages/index.astro`
- Create: `src/styles/review.css`
- Create: `src/assets/review/concept-01.png`, `src/assets/review/concept-02.png`
- Create: `tests/unit/review-content.test.ts`
- Create: `tests/e2e/review-portal.spec.ts`

**Interfaces:**
- Consumes: the four integrated concept entry routes from Task 2.
- Produces: `ReviewConceptId`, `ReviewLocale`, `ReviewLink`, `ReviewConcept`, `REVIEW_CONCEPTS`, and a neutral selector at `/`.

- [ ] **Step 1: Write the failing selector data contract**

Assert exactly two records with IDs `concept-01` and `concept-02`, titles `Concept 01` and `Concept 02`, and the exact unique hrefs `/id/`, `/en/`, `/alternative/id/`, and `/alternative/`.

- [ ] **Step 2: Write the failing portal browser contract**

Assert `/` exposes `Internal Design Review`, the sentence `Halaman ini hanya untuk memilih konsep dan bukan bagian dari website Wijaya And Partners.`, two cards, two thumbnails, and four links. Assert absence of company header, footer, primary navigation, firm-logo image, theme control, `mailto:`, `tel:`, `wa.me`, form, and feedback control.

- [ ] **Step 3: Add failing resilience checks**

At 320×568 and 200% zoom, assert no horizontal overflow and all links remain keyboard reachable. Block both thumbnail requests and assert stable fallback surfaces plus usable links. Disable JavaScript and assert the selector remains complete.

- [ ] **Step 4: Run the selector tests and verify the RED state**

Run: `npm run test:unit -- tests/unit/review-content.test.ts && npm run test:e2e -- tests/e2e/review-portal.spec.ts --project=chromium-desktop`

Expected: FAIL because the root still contains Concept 01's temporary language entry.

- [ ] **Step 5: Capture the two existing concepts**

At a 1440×900 viewport, capture the opening view of `/id/` as `concept-01.png` and `/alternative/id/` as `concept-02.png`. Use the same crop and aspect ratio without adding overlay text outside the captured page.

- [ ] **Step 6: Implement the typed selector and isolated layout**

Create the exact interfaces in this plan. `ReviewLayout` accepts `{ title: string; description: string }`, imports only `review.css`, and renders no company-profile components. Map `REVIEW_CONCEPTS` into semantic article cards with Astro images and normal links.

- [ ] **Step 7: Implement the neutral responsive styling**

Scope every selector under `.review-portal`; use white, neutral gray, and dark text; render two columns when space permits and one column on narrow screens; provide fixed thumbnail ratios, visible focus, readable contrast, and practical touch targets.

- [ ] **Step 8: Run and commit portal verification**

Run: `npm run test:unit -- tests/unit/review-content.test.ts && npm run test:e2e -- tests/e2e/review-portal.spec.ts --project=chromium-desktop && npm run build`

Expected: PASS with `dist/index.html` as the selector and all four destination outputs present.

```bash
git add src/content/review.ts src/layouts/ReviewLayout.astro src/pages/index.astro src/styles/review.css src/assets/review tests/unit/review-content.test.ts tests/e2e/review-portal.spec.ts
git commit -m "feat: add isolated client review portal"
```

### Task 4: Align Preview Safety And Netlify Configuration

**Files:**
- Create: `src/components/meta/PreviewRobots.astro`, `public/robots.txt`, `tests/unit/preview-safety.test.ts`
- Modify: `src/layouts/ReviewLayout.astro`, `src/layouts/BaseLayout.astro`, `src/layouts/AlternativeLayout.astro`
- Modify: `astro.config.mjs`, `netlify.toml`, `.gitignore`
- Modify: `tests/e2e/review-portal.spec.ts`, `tests/e2e/home.spec.ts`, `tests/e2e/alternative.spec.ts`

**Interfaces:**
- Consumes: all three layouts and Concept 01's existing Netlify security configuration.
- Produces: one `PreviewRobots` component, `noindex, nofollow` metadata on every HTML route, `X-Robots-Tag` configuration for `/*`, `robots.txt` with `User-agent: *` and `Disallow: /`, no review sitemap, and ignored `.netlify/` state.

- [ ] **Step 1: Write the failing preview-safety tests**

For `/`, `/id/`, `/en/`, `/alternative/id/`, and `/alternative/`, assert successful response and exactly one `meta[name="robots"]` with `noindex, nofollow`. Read `robots.txt`, `netlify.toml`, and `.gitignore`; assert the all-route crawler rule, the global `X-Robots-Tag`, absence of authentication/runtime services, and ignored `.netlify/` state.

- [ ] **Step 2: Run the safety tests and verify the RED state**

Run: `npm run test:unit -- tests/unit/preview-safety.test.ts && npm run test:e2e -- tests/e2e/review-portal.spec.ts --grep "preview safety" --project=chromium-desktop`

Expected: FAIL until all three layouts share the same preview contract.

- [ ] **Step 3: Implement the shared preview metadata and crawler policy**

Import `PreviewRobots` into all three layouts and remove duplicate robot tags. Add the exact two-line `robots.txt`. Disable sitemap generation for this temporary review build; keep `@astrojs/sitemap` installed only if documented future production configuration still needs it.

- [ ] **Step 4: Align the Netlify configuration**

Keep `[build] command = "npm run build"` and `publish = "dist"`. Apply `X-Robots-Tag = "noindex, nofollow"` plus the existing security headers to `/*`. Add no redirects, Identity, functions, forms, analytics, login gating, or password protection.

- [ ] **Step 5: Run and commit safety verification**

Run: `npm run test:unit -- tests/unit/preview-safety.test.ts && npm run build && test ! -e dist/sitemap-index.xml && test ! -e dist/sitemap-0.xml && npm run test:e2e -- tests/e2e/review-portal.spec.ts --grep "preview safety" --project=chromium-desktop`

Expected: PASS with consistent local metadata and no generated sitemap.

```bash
git add src/components/meta/PreviewRobots.astro src/layouts/ReviewLayout.astro src/layouts/BaseLayout.astro src/layouts/AlternativeLayout.astro public/robots.txt astro.config.mjs netlify.toml .gitignore tests/unit/preview-safety.test.ts tests/e2e/review-portal.spec.ts tests/e2e/home.spec.ts tests/e2e/alternative.spec.ts
git commit -m "feat: align client review preview safeguards"
```

### Task 5: Verify And Publish The Stable Review Site

**Files:**
- Modify: `tests/e2e/concepts-integration.spec.ts`, `tests/e2e/review-portal.spec.ts`
- Modify: `docs/deployment/netlify-mvp.md`

**Interfaces:**
- Consumes: the combined static project and authenticated Netlify access when available.
- Produces: one verified `dist` artifact and either a stable live `netlify.app` root URL or a deployment-ready artifact with exact owner instructions.

- [ ] **Step 1: Complete cross-browser acceptance coverage**

Run the selector and both concept families in Chromium, Firefox, and WebKit. Assert all entry and team-profile routes return HTTP 200, the two visual systems remain isolated, keyboard order is Concept 01 Indonesian, Concept 01 English, Concept 02 Indonesian, Concept 02 English, and no page emits a console error.

- [ ] **Step 2: Run the complete local verification suite**

Run: `npm run test:unit && npm run test:e2e && npm run build && npm run test:lighthouse`

Expected: PASS with zero failing tests, a successful static build, and the existing Lighthouse thresholds met. If a check fails, return the defect to its owning earlier task and complete that task's focused red-green cycle before resuming Task 5.

- [ ] **Step 3: Inspect the complete review flow**

Open `/` at 390×844 and 1440×900, inspect the neutral selector, follow all four entry links, inspect one profile route from each concept, use browser Back to return, and repeat the selector with JavaScript disabled.

- [ ] **Step 4: Document sharing and lifecycle**

Update `docs/deployment/netlify-mvp.md`: share only the stable root URL; deploy revisions to the same site; keep deploy permalinks internal; state that anyone with the link can open it; and document how to disable or delete the temporary review site after approval.

- [ ] **Step 5: Rebuild the exact deployment artifact**

Run: `npm ci && npm run build && test -f dist/index.html && test -f dist/id/index.html && test -f dist/en/index.html && test -f dist/alternative/index.html && test -f dist/alternative/id/index.html`

Expected: PASS with the selector and both concepts in one `dist` directory.

- [ ] **Step 6: Determine the safe Netlify publication path**

Use `netlify:netlify-deploy` and `netlify:netlify-config`. Run `netlify status` and inspect whether the site is linked and whether Git continuous deployment is configured. If Git CD exists, publish by pushing the approved production branch; warn before any manual production deploy because the next production-branch push would replace it. If no Git CD exists but authenticated CLI access is available, link or create one non-obviously named site and run `netlify deploy --prod --dir=dist`; the CLI uploads the already-built artifact and does not run the build command.

- [ ] **Step 7: Stop safely when authentication is unavailable**

If Netlify access is unavailable, preserve the verified `dist` artifact and finish the deployment document with exact owner steps. Do not invent credentials, claim a live URL, or use an anonymous temporary URL as the client-facing stable address.

- [ ] **Step 8: Verify the remote deployment when one exists**

Request the stable root URL, all four concept entries, one profile from each concept, `robots.txt`, and response headers. Confirm `X-Robots-Tag`, both thumbnails, mobile navigation, and the absence of an exposed sitemap. Record only the stable root URL in client-facing instructions.

- [ ] **Step 9: Run completion verification and commit documentation**

Use `superpowers:requesting-code-review`, resolve findings through `superpowers:receiving-code-review`, then use `superpowers:verification-before-completion` and rerun Step 2 before claiming completion.

```bash
git add tests/e2e/concepts-integration.spec.ts tests/e2e/review-portal.spec.ts docs/deployment/netlify-mvp.md
git commit -m "test: verify integrated client review site"
```

## Handoff

Share only the stable Netlify root URL and describe it as an internal design-review link. Do not send the two source-worktree paths, deploy permalinks, or Netlify administration details to the client. After review concludes, disable or delete the temporary Netlify site without altering the preserved Git history of either concept.
