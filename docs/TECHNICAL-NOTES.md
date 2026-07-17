# Technical notes

## The active-tab seam

Chrome does not expose a simple, reliable active-tab background color that behaves independently from the toolbar in every current desktop layout. When `theme_toolbar` is present, Chrome paints both the active tab and the toolbar from that image, but it samples the image at different vertical offsets.

Chromet Dark uses that behavior intentionally. [`../theme/images/toolbar.png`](../theme/images/toolbar.png) is a 512 by 200 PNG with two solid regions joined by a short vertical blend:

- Rows 0 through 47 are `#323436`.
- Rows 48 through 63 blend linearly from `#323436` to `#1F2121`.
- Rows 64 through 199 are `#1F2121`.

Chrome samples that image differently for the active tab and toolbar. Version 1.3.0 used a hard transition at row 56, which fixed an earlier misaligned lower-tab overlay but left a narrow, visually abrupt handoff. Version 1.4.0 replaces that edge with the 16-pixel blend. At the center of the transition, row 56 is `#282A2B`, midway between the two primary surfaces.

The validation script computes the expected color for every transition row and checks the left, center, and right sides of the image. This prevents an asset optimization, editor export, or later palette change from silently changing the blend or reintroducing the hard seam.

## Why the blend also appears in the toolbar

Chrome has no active-tab-only image or overlay slot. `theme_toolbar` is the active-tab fill and the toolbar artwork, so the same transition rows are reused in both places. Moving the blend fully into the active tab also moves it farther into the toolbar.

Other theme image fields do not solve this:

- `theme_tab_background` affects inactive tabs.
- `theme_frame_overlay` is fixed to the window frame and cannot follow the selected tab.
- Theme colors and tints change paint values but not the active-tab geometry or layer structure.

The 16-pixel blend is deliberately short. It softens the connected-tab handoff without making gradient treatment a general part of the interface.

## The divider below the bookmarks bar

Chrome owns the physical thickness of the line between the toolbar or bookmarks bar and page content. [`COLOR_TOOLBAR_CONTENT_AREA_SEPARATOR` is explicitly not overwritable by a user theme](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/chrome/browser/themes/theme_properties.h), so Chromet Dark cannot make that geometry thinner.

[Chrome derives the separator color](https://chromium.googlesource.com/chromium/src/+/8ee1cda058f1700bfa3b75a616acdcee21707d87/chrome/browser/themes/theme_helper.cc) by blending `toolbar_button_icon` into `toolbar` at an alpha of `0x3A`. Earlier Chromet Dark builds declared `toolbar` as `#434646` even though the opaque toolbar artwork settled at `#1F2121`. With the icon color at `#8C8D8C`, that mismatch produced an approximately `#545656` divider, which was much brighter than the visible bookmarks surface.

Version 1.4.0 aligns the declared toolbar fallback with the rendered lower surface:

- `toolbar`: `#1F2121`
- `toolbar_button_icon`: `#8C8D8C`
- Expected derived separator: `#383A39`

The divider retains Chrome's fixed layout thickness. At the scale captured during development it is one physical pixel. Its lower contrast makes it read as a finer, quieter boundary while leaving the toolbar icons unchanged.

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
