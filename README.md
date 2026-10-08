# Web Design

This project vendors [Superpowers](https://github.com/obra/superpowers) as a
repository-scoped Codex plugin.

The plugin package lives in `plugins/superpowers`, the local marketplace is
defined in `.agents/plugins/marketplace.json`, and the plugin is enabled for
this project in `.codex/config.toml`. No global Codex configuration is required.
The repository also exposes the bundled workflows through `.agents/skills`,
which is Codex's repository-scoped skill location.

After cloning or opening this repository for the first time:

1. Trust the project when Codex asks.
2. Restart the Codex app.
3. Start a new chat in this project so Superpowers can load its skills.

This repository currently contains Superpowers 6.4.2. Update the vendored
plugin directory and restart Codex when upgrading it.

## Wijaya & Partners concept preview

This repository also contains a bilingual, static-first Astro MVP for Wijaya &
Partners. It is a concept preview: supplied client logos, biographies, claims,
and contact details remain drafts until the firm approves them. The generated
site is intentionally marked `noindex, nofollow`.

### Requirements

- Node.js 24 (see `.node-version`)
- npm

### Install and run locally

```bash
npm ci
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:4321/id/` or `http://127.0.0.1:4321/en/`.

For an offline presentation using the same optimized output that Netlify will
serve:

```bash
npm run build
npm run preview -- --ignore-lock --host 127.0.0.1
```

### Verification

```bash
npm run test:unit
npm run test:e2e
npm run build
npm run test:lighthouse
```

The browser suite covers Chromium, mobile Chromium, Firefox, and WebKit.
Deployment instructions are in
[`docs/deployment/netlify-mvp.md`](docs/deployment/netlify-mvp.md).
