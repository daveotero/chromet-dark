# Chrome Web Store release guide

This document contains ready-to-use listing copy and a release checklist for Chromet Dark.

## Listing copy

### Name

Chromet Dark

### Summary

A quiet graphite and cyan theme for Google Chrome with clear tabs and restrained contrast.

### Detailed description

Chromet Dark gives Google Chrome a calm, near-black frame with a clearly lifted active tab, warm off-white text, muted controls, and a small cyan accent.

The palette is intentionally restrained. Inactive tabs stay dark, the selected tab matches the visual weight of the address bar, and the toolbar remains distinct without becoming a bright gray band.

Chromet Dark is a theme only. It contains no JavaScript, permissions, analytics, tracking, or network requests.

### Single purpose

Apply the Chromet Dark visual theme to Google Chrome.

### Category

Themes

### Language

English

## Privacy responses

Use the exact dashboard wording available at submission time, with these answers as the source of truth:

| Question | Answer |
|---|---|
| Does the item collect or use user data? | No |
| Does the item request permissions? | No |
| Does the item use remote code? | No |
| Does the item sell or transfer user data? | No |
| Single purpose | Apply the Chromet Dark visual theme to Google Chrome. |

The public privacy statement is [`../PRIVACY.md`](../PRIVACY.md).

## Prepared artwork

| File | Dimensions | Purpose |
|---|---:|---|
| `theme/icons/icon-128.png` | 128 by 128 | Store icon |
| `assets/store/screenshot-1280x800.png` | 1280 by 800 | Store screenshot |
| `assets/store/promo-small-440x280.png` | 440 by 280 | Small promotional tile |
| `assets/store/promo-marquee-1400x560.png` | 1400 by 560 | Optional marquee tile |

The generated preview is brand-neutral artwork. Before submission, consider adding one real Chrome screenshot from the final release build, with personal bookmarks, tabs, profiles, and account details removed. A real screenshot is the best proof of the selected-tab treatment.

## Positioning and attribution

Public copy should describe Chromet Dark by its own visual qualities. Keep the light solar-system wink in the repository introduction, but do not name, tag, compare against, or use the screenshots, logos, icons, or trademarks of another browser.

This keeps the listing clear, independent, and focused on what users receive.

## Build the upload package

```bash
npm ci
npm run release:check
```

Upload `dist/chromet-dark-1.4.0.zip`. Its `manifest.json` is at the archive root.

## Pre-submission checklist

- [ ] Finish the visual matrix in [`TESTING.md`](TESTING.md).
- [ ] Confirm `theme/manifest.json` and `package.json` use the same version.
- [ ] Add the release entry to [`../CHANGELOG.md`](../CHANGELOG.md).
- [ ] Run `npm run release:check` with no errors.
- [ ] Open the ZIP and confirm `manifest.json` is at the root.
- [ ] Load the unpacked `theme/` directory in the current stable Chrome release.
- [ ] Verify normal, inactive-window, and Incognito states.
- [ ] Review artwork at full size for accidental personal information.
- [ ] Confirm listing copy contains no unsupported comparisons or third-party marks.
- [ ] Complete the dashboard privacy and distribution fields.
- [ ] Add a support URL and homepage after the GitHub repository is public.
- [ ] Save a copy of the submitted ZIP and listing text with the release tag.

## Publication sequence

1. Merge the final tested version to `main`.
2. Create and push a matching tag, such as `v1.4.0`.
3. Let the GitHub release workflow attach the generated ZIP.
4. Upload the same ZIP in the Chrome Web Store developer dashboard.
5. Complete the listing, privacy, distribution, and test-instruction sections.
6. Submit for review.
7. After approval, add the public store URL to the README and repository metadata.

## Official references

- [Prepare an extension for distribution](https://developer.chrome.com/docs/webstore/prepare)
- [Store listing fields and screenshots](https://developer.chrome.com/docs/webstore/cws-dashboard-listing)
- [Image guidelines and promotional dimensions](https://developer.chrome.com/docs/webstore/images)
- [Privacy practices fields](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy)
- [Publish in the Chrome Web Store](https://developer.chrome.com/docs/webstore/publish)
- [Listing requirements](https://developer.chrome.com/docs/webstore/program-policies/listing-requirements)

Review these pages again at submission time because dashboard fields and policies can change.
