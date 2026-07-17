# Technical notes

## The active-tab seam

Chrome does not expose a simple, reliable active-tab background color that behaves independently from the toolbar in every current desktop layout. When `theme_toolbar` is present, Chrome paints both the active tab and the toolbar from that image, but it samples the image at different vertical offsets.

Chromet Dark uses that behavior intentionally. [`../theme/images/toolbar.png`](../theme/images/toolbar.png) is a 512 by 200 PNG with two solid bands:

- Rows 0 through 55 are `#323436`.
- Rows 56 through 199 are `#1F2121`.

Chrome offsets the active-tab sample by 16 source pixels. As a result, the source transition at row 56 appears at the visible seam between the active tab and toolbar. An earlier transition made the lower half of the selected tab inherit the toolbar color, which looked like a misaligned overlay. Version 1.3.0 moved the transition to the correct row.

The validation script checks pixels at rows 0, 55, 56, and 199. This prevents an asset optimization, editor export, or later palette change from silently reintroducing the seam.

## Why not use a tab background image

A dedicated `theme_tab_background` image affects inactive tabs and introduces additional tiling and alignment variables. The current combination keeps inactive tabs flat and uses only the toolbar image for the selected-tab lift.

## Why keep a colors-only variant

[`../variants/colors-only/manifest.json`](../variants/colors-only/manifest.json) is a diagnostic fallback. It avoids all theme images and uses only supported color fields. It will not reproduce the lifted active tab as accurately, but it is useful if a future Chrome version changes toolbar-image sampling.

The colors-only variant is not included in the Chrome Web Store ZIP.

## Generated assets

Run `npm run build` to regenerate icons, toolbar art, the repository preview, and store artwork. The SVG source is embedded in [`../scripts/build-assets.mjs`](../scripts/build-assets.mjs), while the installable theme contains only PNG output.

Generated files are committed so someone can load the theme without installing Node.js. Continuous integration rebuilds them and fails if the committed output is stale.

## Theme-package boundary

Only [`../theme/`](../theme/) is packaged for the Chrome Web Store. It contains:

- `manifest.json`
- Four PNG icons
- One PNG toolbar image

There is no JavaScript, HTML, remote code, permission request, or host access in the installable package.

## Chrome rendering limitations

Chrome owns the shape of tabs, context menus, settings pages, extension bubbles, profile surfaces, and most New Tab page content. A theme can color many of those surfaces, but it cannot replace Chrome's component geometry or guarantee identical rendering across Chrome versions, operating systems, display scaling factors, and feature flags.

That is why visual testing remains part of the release process even though the manifest and assets are machine-validated.
