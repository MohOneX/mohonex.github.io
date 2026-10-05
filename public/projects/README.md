# Project assets

- `Vaacine Track 1.png`, `Vaacine Track 2.png`, and `Vaacine Track 3.png` are the original Vaccine Track screenshots. Their original filenames are preserved; optimized variants use `vaccine-track-1`, `vaccine-track-2`, and `vaccine-track-3`.
- `Checkmate Elite.jpg` is the original Windows chess screenshot; optimized variants use `checkmate-elite`.
- Vaccine Track's three screenshots appear together on its card and can be browsed in the enlarged preview with buttons or left/right arrow keys.
- Add the `download` URL (and optional `href` project link) to each new project in `src/data/projects.ts` when available. Its existing download button enables automatically; replace the “Coming soon” `downloadMeta` with release information then.

- `dentaxis.png`, `pdf-control.png`, and `digital-planner.png` are original screenshots used in full-resolution dialogs.
- `*-800.webp` and `*-1600.webp` are responsive display variants.
- `2026-digital-planner.pdf` is the real 606-page planner from the public v1.0.0 release. It loads only when the PDF preview is opened.

After replacing a screenshot, update its dimensions and alt text in `src/data/projects.ts`, then regenerate WebP variants using `scripts/prepare-images.cjs`. Keep the image basename in the data without an extension.

The PDF renderer is loaded as a separate JavaScript chunk and worker. Downloads link to the public GitHub release assets; preview uses the same-site PDF to avoid cross-origin embedding problems.
