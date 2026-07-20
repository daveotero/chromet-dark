# Chrome Web Store release guide

This document contains ready-to-use listing copy and a release checklist for Chromet Dark.

## Listing copy

### Name

Chromet Dark

### Summary

A graphite Chrome theme with a distinct active tab, warm text, and balanced contrast.

### Detailed description

Chromet Dark wraps Google Chrome in deep graphite, with warm off-white text, soft gray controls, and a selected tab matched to the address bar.

The current tab is easy to spot, while inactive tabs recede into the near-black frame. Subtle tonal shifts separate the tab strip, toolbar, and bookmarks bar without heavy outlines or bright gray bands.

The palette stays dark regardless of Chrome or your operating system's appearance setting. It changes browser surfaces only, not websites.

It is a theme only, with no JavaScript, permissions, analytics, tracking, or network requests.

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

### Public URLs

Use these after the repository is public:

- Homepage: `https://github.com/daveotero/chromet-dark`
- Support: `https://github.com/daveotero/chromet-dark/issues`
- Privacy policy: `https://github.com/daveotero/chromet-dark/blob/main/PRIVACY.md`

## Prepared artwork

| File | Dimensions | Purpose |
|---|---:|---|
| `theme/icons/icon-128.png` | 128 by 128 | Store icon |
| `assets/store/screenshot-1280x800.png` | 1280 by 800 | Full-window Store screenshot |
| `assets/store/screenshot-tabs-1280x800.png` | 1280 by 800 | Close-up of the tabs and address bar |
| `assets/store/promo-small-440x280.png` | 440 by 280 | Small promotional tile |
| `assets/store/promo-marquee-1400x560.png` | 1400 by 560 | Optional marquee tile |

Keep the original full-window screenshot first and upload the tab close-up second. Both are real Chrome captures. Recheck them before submission for personal bookmarks, tabs, profiles, account details, or browser prompts. The Chrome Web Store requires screenshots to demonstrate the actual user experience.

## Positioning and attribution

Public copy should describe Chromet Dark by its own visual qualities. Keep the light solar-system wink in the repository introduction, but do not name, tag, compare against, or use the screenshots, logos, icons, or trademarks of another browser.

This keeps the listing clear, independent, and focused on what users receive.

## Build the upload package

```bash
npm ci
npm run release:check
```

For the first public submission, update the project version to `0.1.0`, rerun the release check, and upload `dist/chromet-dark-0.1.0.zip`. Its `manifest.json` must be at the archive root.

## Pre-submission checklist

- [ ] Finish the visual matrix in [`TESTING.md`](TESTING.md).
- [ ] Set the first public release version to `0.1.0`.
- [ ] Confirm `theme/manifest.json` and `package.json` use the same version.
- [ ] Add the release entry to [`../CHANGELOG.md`](../CHANGELOG.md).
- [ ] Run `npm run release:check` with no errors.
- [ ] Open the ZIP and confirm `manifest.json` is at the root.
- [ ] Load the unpacked `theme/` directory in the current stable Chrome release.
- [ ] Verify normal and inactive-window states.
- [ ] Confirm both real Store screenshots are full-bleed, 1280 by 800, and accurately show the final theme.
- [ ] Review artwork at full size for accidental personal information.
- [ ] Confirm listing copy contains no unsupported comparisons or third-party marks.
- [ ] Complete the dashboard privacy and distribution fields.
- [ ] Add a support URL and homepage after the GitHub repository is public.
- [ ] Save a copy of the submitted ZIP and listing text with the release tag.

## Publication sequence

1. Merge the final tested version to `main`.
2. Create and push the matching `v0.1.0` tag.
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
