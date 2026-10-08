# Alternative Team Profiles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add accessible, bilingual editorial profile pages for all six alternative-site team members.

**Architecture:** A dedicated typed content module owns localized member records and static-path helpers. Two localized dynamic Astro routes render one shared profile component, while existing team cards and header navigation link into and out of those routes. Profile-specific CSS extends the current alternative design system without changing the homepage carousel.

**Tech Stack:** Astro 7, TypeScript, Vitest, Playwright, CSS

**Spec:** `docs/superpowers/specs/2026-10-08-alternative-team-profiles-design.md`

## Global Constraints

- Generate twelve static profile routes: six English and six Indonesian.
- Keep the primary navigation limited to About, Our Teams, Our Projects, and Contact (localized in Indonesian).
- Use source-draft content for Herman Wijaya and F. Ebby Abraham; retain the “Franz” discrepancy note and do not publish the historical email address.
- Mark all invented content for the other four members as draft/placeholder in visible text.
- Use monograms rather than the low-resolution portraits from historical scans.
- Reflow without horizontal scrolling at 320 CSS pixels and preserve visible keyboard focus.
- Keep existing homepage and carousel behavior unchanged.

## Review Focus

- A profile opened from either locale must keep all back-navigation and primary-navigation links in that locale.
- Language switching must retain the current member slug instead of returning to a homepage.
- The first and last team members must wrap correctly in previous/next navigation.
- Placeholder profiles must never lose their visible placeholder disclosure even if content sections are populated.
- Long credentials and long practice-area labels must wrap at 320 pixels without horizontal overflow.

---

### Task 1: Localized team profile data

**Files:**
- Create: `src/content/alternative-team.ts`
- Modify: `src/content/alternative.ts`
- Create: `tests/unit/alternative-team.test.ts`

**Interfaces:**
- Consumes: Existing English and Indonesian alternative page records.
- Produces: `AlternativeTeamMember`, `AlternativeProfileStatus`, `AlternativeProfileLabels`, `ALTERNATIVE_TEAM_SLUGS`, `getAlternativeTeam(locale)`, `getAlternativeTeamMember(locale, slug)`, `getAlternativeProfileLabels(locale)`, and `getAlternativeTeamPaths()`.

- [ ] **Step 1: Write failing unit tests for the content contract**

Assert literal slugs and member order, six records per locale, two `source-draft` records, four `placeholder` records, non-empty localized sections, Herman's supplied education, Ebby's visible “Franz” source note, absence of `hwlawfirm@yahoo.com`, and twelve unique paths. Assert every placeholder record has a visible localized disclosure.

- [ ] **Step 2: Run the focused unit test and verify RED**

Run: `npm run test:unit -- tests/unit/alternative-team.test.ts`

Expected: FAIL because `src/content/alternative-team.ts` does not exist.

- [ ] **Step 3: Implement the typed localized profile module**

Define:

```ts
type AlternativeProfileStatus = 'source-draft' | 'placeholder';
interface AlternativeProfileLabels {
  counselProfile: string;
  backToTeam: string;
  biography: string;
  education: string;
  organizations: string;
  practiceAreas: string;
  previous: string;
  next: string;
  contact: string;
}
interface AlternativeTeamMember {
  slug: string;
  name: string;
  credentials: string;
  initials: string;
  country: string;
  profileStatus: AlternativeProfileStatus;
  summary: string;
  biography: readonly string[];
  education: readonly string[];
  organizations: readonly string[];
  practiceAreas: readonly string[];
  statusLabel: string;
  statusNote: string;
}
```

Use the supplied source records for Herman and Ebby. Add explicitly labeled, localized placeholder copy for Rani, Arifan, Diana, and Andi. Define all profile interface labels in `getAlternativeProfileLabels(locale)`. Update `AlternativePageContent.team` to consume these enriched records through `getAlternativeTeam(locale)`.

- [ ] **Step 4: Run the focused and existing content tests**

Run: `npm run test:unit -- tests/unit/alternative-team.test.ts tests/unit/alternative-content.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the data layer**

```bash
git add src/content/alternative-team.ts src/content/alternative.ts tests/unit/alternative-team.test.ts
git commit -m "feat: add localized alternative team profiles"
```

### Task 2: Profile routes, page component, and navigation

**Files:**
- Create: `src/components/alternative/AlternativeTeamProfile.astro`
- Create: `src/pages/alternative/team/[slug].astro`
- Create: `src/pages/alternative/id/team/[slug].astro`
- Modify: `src/components/alternative/AlternativeHeader.astro`
- Modify: `src/components/alternative/AlternativePage.astro`
- Create: `tests/e2e/alternative-team.spec.ts`

**Interfaces:**
- Consumes: Task 1 member records and path helpers.
- Produces: Twelve static routes, localized team-card links, profile-aware header anchors, same-member language switching, and wrapping previous/next member navigation.

- [ ] **Step 1: Write failing browser tests for route and navigation behavior**

Cover opening Herman from the English team card, the localized `h1`, source-draft sections for Herman and Ebby, visible placeholder disclosure for Rani, same-slug language switching, localized primary-navigation anchors back to the homepage, and first/last previous-next wrapping.

- [ ] **Step 2: Run the focused browser tests and verify RED**

Run: `npx playwright test tests/e2e/alternative-team.spec.ts --project=desktop-chromium`

Expected: FAIL because team cards are not links and profile routes return 404.

- [ ] **Step 3: Implement profile-aware header and linked team cards**

Add optional `profileSlug?: string` to `AlternativeHeader`. When present, prefix the four navigation anchors with the localized alternative homepage and build the language link for the same slug. Wrap each team card's identity content in one descriptive link to its localized profile route.

- [ ] **Step 4: Implement `AlternativeTeamProfile.astro`**

Props: `{ content: AlternativePageContent; member: AlternativeTeamMember; members: readonly AlternativeTeamMember[]; labels: AlternativeProfileLabels; index: number }`.

Render one `h1`, monogram identity rail, summary, status badge and note, semantic biography/education/organizations/practice-area sections, localized back/contact actions, and previous/next links derived with modular index wrapping.

- [ ] **Step 5: Implement both dynamic Astro routes**

Each `getStaticPaths()` filters `getAlternativeTeamPaths()` by locale and passes the member into `AlternativeLayout` plus the shared profile component. Page title is `${member.name} — Wijaya & Partners`; description is `member.summary`.

- [ ] **Step 6: Run focused browser and full unit tests**

Run: `npx playwright test tests/e2e/alternative-team.spec.ts --project=desktop-chromium && npm run test:unit`

Expected: PASS.

- [ ] **Step 7: Commit functional profile pages**

```bash
git add src/components/alternative/AlternativeHeader.astro src/components/alternative/AlternativePage.astro src/components/alternative/AlternativeTeamProfile.astro src/pages/alternative/team/[slug].astro src/pages/alternative/id/team/[slug].astro tests/e2e/alternative-team.spec.ts
git commit -m "feat: add alternative team profile pages"
```

### Task 3: Responsive editorial styling and production verification

**Files:**
- Modify: `src/styles/alternative.css`
- Modify: `tests/e2e/alternative-team.spec.ts`

**Interfaces:**
- Consumes: Task 2 semantic profile markup and stable class names.
- Produces: Desktop two-column editorial profiles, mobile single-column reflow, visible focus states, and stable long-copy wrapping.

- [ ] **Step 1: Extend the browser tests with responsive and disclosure assertions**

At 320×760, assert the profile has no horizontal overflow, long credentials remain within the viewport, profile sections appear in the intended document order, and the placeholder badge/note is visible. Assert all profile links have a visible focus indicator and at least 40-pixel touch height where they are standalone controls.

- [ ] **Step 2: Run the responsive tests and verify RED**

Run: `npx playwright test tests/e2e/alternative-team.spec.ts -g "mobile|focus|placeholder"`

Expected: FAIL because profile-specific responsive styles do not exist.

- [ ] **Step 3: Add profile styling to the existing alternative stylesheet**

Create focused `.profile-*` rules for the intro band, identity rail, monogram, content sections, status treatment, member navigation, and contact action. Reuse current tokens and breakpoints; do not introduce a new dependency or global reset.

- [ ] **Step 4: Run full verification**

Run: `npm test && npm run build && git diff --check`

Expected: 0 failures; build output includes fourteen pages (two homepages plus twelve profiles); diff check is clean.

- [ ] **Step 5: Commit styling and verification coverage**

```bash
git add src/styles/alternative.css tests/e2e/alternative-team.spec.ts
git commit -m "style: complete responsive team profiles"
```
