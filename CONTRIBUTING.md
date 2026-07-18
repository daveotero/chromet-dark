# Contributing to Chromet Dark

Thanks for taking the time to improve the theme.

## Before opening an issue

Visual behavior can vary with Chrome version, operating system, window state, and display scaling. Please include:

- Chromet Dark version
- Chrome version from `chrome://version`
- Operating system
- Display scaling percentage
- Whether the window is maximized, restored, active, or inactive
- A full-resolution screenshot
- A short description of the expected result

## Development setup

```bash
npm install
npm run build
npm run validate
```

Load the [`theme`](theme) folder through `chrome://extensions` with Developer mode enabled.

## Editing colors

The public palette is intentionally small. Avoid adding extra accent colors unless they solve a specific contrast or platform problem.

When changing a manifest color:

1. Update `theme/manifest.json`.
2. Update the matching token in `docs/PALETTE.md`.
3. Rebuild any affected artwork.
4. Test the normal and inactive-window states.
5. Run `npm run release:check`.

## Editing toolbar artwork

The toolbar PNG is functional, not decorative. Its vertical boundary compensates for Chrome's active-tab image offset. Change it through `scripts/build-assets.mjs`, not by editing the generated PNG directly.

If the boundary changes, include a screenshot with pixel coordinates showing both the incorrect transition and the intended tab/toolbar seam.

## Pull requests

- Keep the installable `theme/` directory free of scripts and documentation.
- Do not commit `Cached Theme.pak`, CRX files, PEM keys, `node_modules`, or `dist` output.
- Update the changelog for user-visible changes.
- Keep `package.json` and manifest versions synchronized.
- Do not add copied third-party promotional artwork or imply affiliation with another browser vendor.
- Make sure generated files are current. CI will fail if `npm run build` creates a diff.

## Commit style

Short, direct commit subjects are preferred:

```text
Fix active-tab image alignment
Add high-DPI testing notes
Update store promo tile
```
