# Netlify client-review deployment

## Before publishing

This build is an internal design-review selector plus two concept previews, not
an approved public website. Confirm that:

- the firm accepts a public, unlisted preview URL;
- draft client logos and contact details may appear in that preview;
- `SITE.canonicalBase` in `src/config/site.ts` and `site` in
  `astro.config.mjs` match the final Netlify URL; and
- the complete verification suite passes after any URL change.

The site includes page-level `noindex, nofollow` metadata, a blocking
`robots.txt`, and an `X-Robots-Tag` header. These reduce accidental indexing
but are not access control. There is deliberately no password or login: anyone
who receives the URL can open the review site.

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

Then open `http://127.0.0.1:4321/`. The root page is the review selector. It
links to both languages for Concept 01 and Concept 02.

Before upload, confirm that the exact artifact contains all five entry files:

```bash
test -f dist/index.html
test -f dist/id/index.html
test -f dist/en/index.html
test -f dist/alternative/index.html
test -f dist/alternative/id/index.html
test -f dist/_headers
```

## What to share with the client

Share only the stable root URL, for example
`https://<stable-site-name>.netlify.app/`, and describe it as an internal
design-review link. Do not send individual concept URLs, deploy permalinks,
local worktree paths, or Netlify administration links. Feedback remains in the
existing WhatsApp or email conversation; the review site has no feedback form
or contact shortcut.

Deploy every revision to this same Netlify site so the client-facing root URL
does not change. Keep unique deploy-preview and deploy-permalink URLs internal.

## Option A: Existing Git-connected site

Use this path when the stable site already has continuous deployment:

1. Open the site's deploy settings and confirm which production branch is
   connected.
2. Merge or push the approved review commit to that branch.
3. Wait for the production deploy and verify the stable root URL.
4. Do not make a separate manual production deploy: the next production-branch
   push would replace it.

## Option B: Stable manual site

1. Sign in to the Netlify account that should own the preview.
2. Open Netlify's manual deploy or drag-and-drop screen.
3. Drag the generated `dist` directory into the deploy area.
4. Choose a non-obvious site name if prompted.
5. Update the two canonical URL settings listed above if the assigned URL is
   different, rebuild, and upload the new `dist` directory.
6. Verify the root selector, all four concept entries, one profile in each
   concept, `robots.txt`, and the `X-Robots-Tag` response header.
7. For later revisions, open this same site and upload the rebuilt `dist`
   directory there. Do not create a new site.

The built `dist/_headers` file carries the same crawler and security headers as
`netlify.toml` for this prebuilt-folder workflow. Netlify documents this
publish-directory mechanism in its [custom headers guide](https://docs.netlify.com/manage/routing/headers/).

Manual deploys are suitable for an MVP hand-off because they do not require a
Git provider connection. A Netlify account is required to keep and manage a
persistent public URL.

If the Netlify CLI is already authenticated, the equivalent stable-site flow
is:

```bash
netlify status
netlify link
netlify deploy --prod --dir=dist
```

`netlify link` must point to the intended persistent site before the production
deploy. The command uploads the already verified `dist` directory; it does not
replace the local verification steps above.

No Functions, Forms, database, analytics, or runtime environment variables are
required.

## Free-plan discipline

Keep the temporary review site economical:

- publish production only for review-ready milestones;
- use local preview for routine work;
- avoid unnecessary rebuilds and repeated uploads;
- retain optimized images from the Astro build; and
- disable or delete the preview after approval if it is no longer needed.

The local `dist` artifact continues to work even if hosted access is paused.

## End the review safely

After the client approves a concept, open the temporary site in Netlify and
either disable publishing or delete the site. Confirm that the stable root URL
no longer serves the review. This hosting cleanup does not delete the Git
history or either preserved concept branch.
