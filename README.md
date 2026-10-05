# Moh — Portfolio

A product-focused portfolio built with React, TypeScript, Vite, and custom CSS for GitHub Pages.

## Development

Use Node.js 22.13+ (or Node.js 24).

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

The production output is in `dist/`. This site needs no backend or environment secrets.

## Design and features

- Responsive introduction with an authentic DentAxis screenshot.
- Featured product showcase, four secondary projects, and expandable project stories.
- Vaccine Track uses three Android screenshots with a navigable gallery; Checkmate Elite has a Windows chess showcase. Both have download placeholders ready for their release URLs.
- Full-resolution screenshot dialogs with keyboard focus management.
- Sticky section navigation, visible keyboard focus, skip link, and reduced-motion support.
- Self-hosted Manrope variable font (license in `public/fonts/`).
- Responsive WebP images with PNG fallbacks; full-size originals load only when opened.
- Lazy-loaded PDF.js planner preview with page navigation, direct page entry, zoom, loading/error states, and retry.
- Local planner PDF is about 31 MiB and loads only when its preview opens.
- Canonical URL, social sharing image, sitemap, and robots file.

The project descriptions use existing product details and screenshots. They do not claim unverified user counts, testimonials, or performance results.

## Editing content

| Content                                               | Location                                   |
| ----------------------------------------------------- | ------------------------------------------ |
| Profile, contact links, project copy and release URLs | `src/data/projects.ts`                     |
| Hero and section headings                             | Corresponding files in `src/components/`   |
| Colors, typography, shared styles                     | `src/index.css`                            |
| Component layouts                                     | Corresponding component CSS files          |
| Original screenshots and optimized variants           | `public/projects/`                         |
| Planner PDF preview                                   | `public/projects/2026-digital-planner.pdf` |
| Search and social metadata                            | `index.html`                               |
| Share image                                           | `public/social-preview.png`                |

Downloads are pinned to verified release versions. When publishing a new release, update the URL, version, and size together in the project data. Update the bundled planner PDF when its release changes. Email is hidden until `site.email` has a value.

To regenerate optimized images and the share image, install or supply Sharp and run:

```bash
node scripts/prepare-images.cjs /absolute/path/to/sharp
```

## GitHub Pages

1. Create the public repository `MohOneX/mohonex.github.io`.
2. Push this project to its `main` branch.
3. Choose **Settings → Pages → Build and deployment → GitHub Actions**.
4. The included workflow installs dependencies, builds, lints, and deploys `dist/`.

For a project repository such as `portfolio`, set Vite's `base` to `'/portfolio/'`. Asset URLs follow this base. Also update the canonical URL, Open Graph URLs, sitemap, and robots sitemap URL to the final public address. No deployment was performed as part of the local redesign.

## Browser verification

The optional browser check script uses Playwright and a Chromium executable:

```bash
node scripts/check-browser.cjs /path/to/playwright /path/to/chromium http://127.0.0.1:5173/
```

It checks seven viewport widths, images, dialog focus and Escape, project expansion, deferred PDF loading, real PDF bytes, page navigation/jump/zoom, retry after a failed request, section navigation, and the skip link. Screenshots go into the ignored `artifacts/` folder.

In the managed browser used during development, direct PDF fetches returned synthetic empty 204 responses while an HTTP client received the correct PDF. Appending `--pdf-fixture` serves the actual local HTTP response through Playwright for renderer tests. This validates the renderer separately from browser PDF transport; confirm a direct preview on the final deployed site.

Public GitHub project and installer URLs, the DentAxis site, and WhatsApp returned HTTP 200 during verification. LinkedIn rejected the automated HEAD request (405), so its profile was not confirmed.
