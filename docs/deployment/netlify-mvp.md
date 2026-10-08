# Netlify Free MVP deployment

## Before publishing

This build is a concept preview, not an approved public website. Confirm that:

- the firm accepts a public, unlisted preview URL;
- draft client logos and contact details may appear in that preview;
- `SITE.canonicalBase` in `src/config/site.ts` and `site` in
  `astro.config.mjs` match the final Netlify URL; and
- the complete verification suite passes after any URL change.

The site includes page-level `noindex, nofollow` metadata and an
`X-Robots-Tag` header. These reduce accidental indexing but are not access
control. Anyone who receives the URL can view the preview.

## Prepare the static artifact

Use Node.js 24 and build from a clean dependency install:

```bash
npm ci
npm run test:unit
npm run test:e2e
npm run build
npm run test:lighthouse
```

The deployable artifact is the generated `dist` directory. To inspect it
locally, including without internet access:

```bash
npm run preview -- --ignore-lock --host 127.0.0.1
```

Then open `http://127.0.0.1:4321/id/`.

## Option A: Netlify drag-and-drop

1. Sign in to the Netlify account that should own the preview.
2. Open Netlify's manual deploy or drag-and-drop screen.
3. Drag the generated `dist` directory into the deploy area.
4. Choose a non-obvious site name if prompted.
5. Update the two canonical URL settings listed above if the assigned URL is
   different, rebuild, and upload the new `dist` directory.
6. Verify the Indonesian and English URLs, one team profile, the theme switch,
   and all contact links on the deployed site.

Manual deploys are suitable for an MVP hand-off because they do not require a
Git provider connection. A Netlify account is required to keep and manage a
persistent public URL.

## Option B: Git-connected deployment

1. Push this repository to the Git provider owned by the project.
2. In Netlify, create a site from that repository.
3. Confirm the settings read from `netlify.toml`:
   - build command: `npm run build`
   - publish directory: `dist`
4. Set Node.js to version 24 if the Netlify project does not honor
   `.node-version` automatically.
5. Deploy and repeat the canonical-URL verification from Option A.

No Functions, Forms, database, analytics, or runtime environment variables are
required.

## Free-plan discipline

The selected Netlify Free account has a shared monthly credit allowance and a
hard stop when that allowance is exhausted. Keep the MVP economical:

- publish production only for review-ready milestones;
- use local preview for routine work;
- avoid unnecessary rebuilds and repeated uploads;
- retain optimized images from the Astro build; and
- remove or pause the preview after the review period if it is no longer
  needed.

The local `dist` artifact continues to work even if hosted access is paused.
