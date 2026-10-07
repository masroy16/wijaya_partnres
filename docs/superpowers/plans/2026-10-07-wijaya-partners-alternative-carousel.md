# Wijaya And Partners Alternative Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive bilingual Astro concept at `/alternative/` whose single opening carousel contains Hero, Expertise & Perspective, and Our Values while preserving the approved law-firm character.

**Architecture:** A static Astro shell renders localized typed content into one alternative route family. A single progressively enhanced carousel component owns all timing, navigation, pause, focus, swipe, and reduced-motion behavior; alternative styles and media remain isolated from the first design specification.

**Tech Stack:** Node.js 24, Astro 7.3.6, TypeScript 7.0.2, Vitest 5.0.3, Playwright 1.63.0, CSS custom properties, vanilla browser JavaScript.

**Spec:** `docs/superpowers/specs/2026-10-07-wijaya-partners-alternative-carousel-design.md`

## Global Constraints

- Preserve the existing first-design specification and source-material documents unchanged.
- Render one carousel with exactly three slides: Hero, Expertise & Perspective, and Our Values.
- Primary navigation contains exactly `About`, `Our Teams`, `Our Projects`, and `Contact` in English; localized Indonesian labels remain semantically equivalent.
- Use `/alternative/` for English and `/alternative/id/` for Indonesian.
- Advance every 6.5 seconds with a 700 ms transition; stop automatic movement for reduced motion, pause state, hover, focus-within, and active touch.
- Keep all unverified leadership, experience, matter, client, and contact claims visibly marked as draft concept content.
- Keep the site static, framework-runtime-free in the browser, responsive from 320 px upward, and usable without JavaScript.
- Do not introduce another carousel in Teams or Projects.

## File Structure

- `package.json`, `package-lock.json`, `.node-version`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts` — reproducible Astro and test foundation.
- `src/content/alternative.ts` — typed English and Indonesian page data, exactly three slides, team roster, projects, and contact labels.
- `src/lib/carousel-state.ts` — framework-free state transitions and timer eligibility rules.
- `src/components/alternative/AlternativeCarousel.astro` — semantic carousel markup and browser enhancement.
- `src/components/alternative/AlternativeHeader.astro` — four-link desktop/mobile navigation plus utility controls.
- `src/layouts/AlternativeLayout.astro` — metadata, theme bootstrap, global shell, and alternative CSS import.
- `src/pages/alternative/index.astro` and `src/pages/alternative/id/index.astro` — English and Indonesian entry routes.
- `src/styles/alternative.css` — namespaced visual system and responsive behavior.
- `public/assets/alternative/` — copied brand/Bandung assets and generated law-library/courtroom and marble assets.
- `tests/unit/alternative-content.test.ts`, `tests/unit/carousel-state.test.ts`, `tests/unit/alternative-assets.test.ts` — content, state, and asset contracts.
- `tests/e2e/alternative.spec.ts` — live route, navigation, controls, responsive, reduced-motion, and no-JavaScript checks.

## Review Focus

1. A stalled or invalid timer must never move beyond slide indices `0..2`; Task 2 tests wrapping and timer eligibility.
2. Hover, focus, touch, manual pause, and reduced motion must independently prevent automatic movement while leaving manual controls usable; Task 2 tests every condition.
3. Long Indonesian copy and long team credentials must not overlap controls or overflow at 320 px and 200% zoom; Task 4 covers both viewports.
4. Failed background images must preserve readable text and stable carousel height; Task 3 implements layered fallbacks and Task 4 exercises a blocked-image scenario.
5. JavaScript-disabled visitors must see all three carousel stories, navigation, Teams, Projects, and Contact in document order; Task 4 verifies the rendered page without JavaScript.

---

### Task 1: Establish The Static Alternative Foundation

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `.node-version`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/content/alternative.ts`
- Create: `tests/unit/alternative-content.test.ts`

**Interfaces:**
- Consumes: approved alternative design spec and source-material record.
- Produces: `Locale`, `AlternativeSlide`, `AlternativePageContent`, `getAlternativeContent(locale)`, npm scripts `dev`, `build`, `preview`, `test`, `test:unit`, and `test:e2e`.

- [ ] **Step 1: Write the failing localized-content contract**

Create tests asserting English and Indonesian variants, exactly three slide IDs `hero`, `expertise`, `values`, the three exact English practice labels, the four exact English navigation labels, six team members, and visible draft labels around approval-dependent content.

- [ ] **Step 2: Run the content test and verify the RED state**

Run: `npm run test:unit -- tests/unit/alternative-content.test.ts`

Expected: FAIL because project configuration and `src/content/alternative.ts` do not exist.

- [ ] **Step 3: Add the pinned Astro/Vitest/Playwright foundation**

Create the exact scripts and configuration named above, install pinned dependencies, and keep Astro output static.

- [ ] **Step 4: Implement typed localized content**

Implement `getAlternativeContent(locale: Locale): AlternativePageContent` with hand-authored English and Indonesian records, the approved About copy, exact roster credentials, centralized contact data, and no invented facts.

- [ ] **Step 5: Run foundation verification**

Run: `npm run test:unit -- tests/unit/alternative-content.test.ts`

Expected: PASS with all localized content contract tests green.

- [ ] **Step 6: Commit the foundation**

```bash
git add package.json package-lock.json .node-version astro.config.mjs tsconfig.json vitest.config.ts playwright.config.ts src/content/alternative.ts tests/unit/alternative-content.test.ts
git commit -m "build: establish alternative site foundation"
```

### Task 2: Implement The Carousel State Contract

**Files:**
- Create: `src/lib/carousel-state.ts`
- Create: `tests/unit/carousel-state.test.ts`

**Interfaces:**
- Consumes: a fixed slide count of `3` from Task 1.
- Produces: `wrapSlide(index, count)`, `nextSlide(index, count)`, `previousSlide(index, count)`, and `canAutoAdvance(state: CarouselInteractionState)`.

- [ ] **Step 1: Write failing carousel behavior tests**

Test forward and backward wrapping, arbitrary invalid index normalization, and independent auto-advance blocking for manual pause, hover, focus-within, active touch, hidden document, and reduced motion. Assert manual navigation remains a separate operation.

- [ ] **Step 2: Run the state tests and verify the RED state**

Run: `npm run test:unit -- tests/unit/carousel-state.test.ts`

Expected: FAIL because `src/lib/carousel-state.ts` does not exist.

- [ ] **Step 3: Implement minimal pure carousel state functions**

Use modulo normalization for all integer indices. `canAutoAdvance` returns true only when every blocking flag is false.

- [ ] **Step 4: Run unit verification**

Run: `npm run test:unit -- tests/unit/carousel-state.test.ts`

Expected: PASS with all wrapping and pause-condition cases green.

- [ ] **Step 5: Commit carousel state**

```bash
git add src/lib/carousel-state.ts tests/unit/carousel-state.test.ts
git commit -m "feat: add accessible carousel state model"
```

### Task 3: Build The Alternative Page And Visual Assets

**Files:**
- Create: `src/components/alternative/AlternativeHeader.astro`
- Create: `src/components/alternative/AlternativeCarousel.astro`
- Create: `src/layouts/AlternativeLayout.astro`
- Create: `src/pages/alternative/index.astro`
- Create: `src/pages/alternative/id/index.astro`
- Create: `src/styles/alternative.css`
- Create: `public/assets/alternative/brand.jpeg`
- Create: `public/assets/alternative/bandung-heritage.jpeg`
- Create: `public/assets/alternative/expertise-library-courtroom.png`
- Create: `public/assets/alternative/values-marble.png`
- Create: selected files under `public/assets/alternative/clients/`
- Create: `tests/unit/alternative-assets.test.ts`

**Interfaces:**
- Consumes: `getAlternativeContent`, the carousel state functions, the supplied brand/Bandung references, and generated supporting imagery.
- Produces: complete static pages at `/alternative/` and `/alternative/id/` with one enhanced three-slide carousel and the About, Teams, Projects, Contact, and footer sections.

- [ ] **Step 1: Write the failing asset and build contract**

Test that every referenced alternative asset exists, is non-empty, and has an allowed raster extension; assert English and Indonesian page data reference the same three visual asset IDs.

- [ ] **Step 2: Run the asset test and verify the RED state**

Run: `npm run test:unit -- tests/unit/alternative-assets.test.ts`

Expected: FAIL because the project assets do not yet exist.

- [ ] **Step 3: Prepare project assets**

Copy the supplied logo and Bandung photograph non-destructively. Generate two text-free wide editorial backgrounds: one combining a traditional law library with modern courtroom architecture, and one using ivory marble/stone with restrained burgundy detail. Inspect both and copy the selected results into `public/assets/alternative/`.

- [ ] **Step 4: Implement the semantic page and enhancement**

Render all content server-side. Enhance the one carousel with the Task 2 state rules, 6.5-second timing, 700 ms CSS transition, previous/next, indicators, pause/resume, touch swipe, focus/hover handling, visibility handling, and reduced-motion detection. Use an inline icon system with accessible names and no extra browser framework.

- [ ] **Step 5: Implement the isolated responsive visual system**

Namespace all selectors under `.alternative-site`; implement the approved burgundy, charcoal, ivory, stone, and restrained brass tokens; editorial serif/sans typography; asymmetric desktop slides; vertical mobile slides; stable image fallbacks; three-column desktop team grid; single-column mobile team list; responsive project logo grid; and non-obstructive contact actions.

- [ ] **Step 6: Run page and asset verification**

Run: `npm run test:unit && npm run build`

Expected: PASS; Astro generates `/alternative/index.html` and `/alternative/id/index.html` without errors.

- [ ] **Step 7: Commit the complete page**

```bash
git add src public/assets/alternative tests/unit/alternative-assets.test.ts
git commit -m "feat: build Wijaya Partners alternative carousel"
```

### Task 4: Verify Browser Behavior And Responsive Presentation

**Files:**
- Create: `tests/e2e/alternative.spec.ts`
- Modify: page or styles only when a failing browser test exposes a defect.

**Interfaces:**
- Consumes: built routes and interactions from Task 3.
- Produces: automated browser evidence and inspected desktop/mobile previews.

- [ ] **Step 1: Write failing browser scenarios**

Cover one carousel with three slides, exact primary navigation, automatic advancement, previous/next wrapping, pause/resume, focus pause, reduced-motion static behavior, language switching, mobile menu, 320 px overflow, 200% zoom, blocked background images, and complete no-JavaScript document content.

- [ ] **Step 2: Run browser tests and observe the RED state**

Run: `npm run test:e2e -- tests/e2e/alternative.spec.ts`

Expected: At least one scenario fails before browser-specific defects are addressed; if all pass immediately, verify each test can fail through a deliberate local mutation before accepting it.

- [ ] **Step 3: Fix browser-specific defects through RED-GREEN cycles**

For every failure, preserve the failing test, make the smallest page/style change, rerun the focused case, then run the complete browser file.

- [ ] **Step 4: Perform visual inspection**

Inspect English and Indonesian routes at mobile and desktop widths, all three slides, light and dark themes, menu states, and carousel controls. Correct blocking visual defects and add a regression test when the defect has an observable behavior.

- [ ] **Step 5: Run final project verification**

Run: `npm run test && npm run build`

Expected: PASS with zero failing tests and a successful static build.

- [ ] **Step 6: Commit browser verification changes**

```bash
git add tests/e2e/alternative.spec.ts src
git commit -m "test: verify alternative experience"
```

## Handoff

After Task 4, start the local Astro preview server, open `/alternative/` in the Codex browser, and leave the preview running so the user can inspect the completed alternative on desktop and mobile.
