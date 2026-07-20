# Changelog

All notable changes to Chromet Dark are documented here.

The project follows [Semantic Versioning](https://semver.org/).

The `0.0.x` entries record internal development milestones. They were not published or tagged releases.

## 0.1.1 - 2026-07-20

### Changed

- Clarified the Chrome Web Store copy and replaced the ambiguous phrase "clear tabs" with a description of the distinct active tab.
- Added Store screenshots with a close-up of the tabs and address bar and the theme shown during normal browsing.

## 0.1.0 - 2026-07-18

### Added

- Prepared the first public Chrome Web Store release of Chromet Dark.

### Documentation

- Relabeled unpublished development milestones from `1.x` to `0.0.x` ahead of the first public `0.1.0` release.
- Clarified that the MIT License covers the repository's source, documentation, icons, and theme artwork.
- Aligned public copy with the theme's graphite-first appearance.
- Replaced the generated browser illustration with a real Chrome Web Store screenshot and stopped asset builds from overwriting it.

## 0.0.5 - 2026-07-17

### Changed

- Replaced the hard active-tab-to-toolbar color boundary with a 16-pixel graphite blend.
- Softened the visible seam and reduced the visual weight of Chrome's connected active-tab shape.
- Aligned the declared toolbar fallback with the rendered toolbar, reducing the contrast of Chrome's derived content divider.
- Expanded validation to verify every row of the generated toolbar transition.
- Documented Chrome's shared active-tab and toolbar image constraint.

## 0.0.4 - 2026-07-17

### Fixed

- Moved the toolbar-image color transition by 16 pixels so it aligns with the visible active-tab and toolbar seam.
- Prevented the lower half of the active tab from inheriting the toolbar color.

### Added

- Reproducible asset build and validation scripts.
- Chrome Web Store listing assets and publication notes.
- GitHub Actions validation and tagged-release workflows.

## 0.0.3 - 2026-07-17

### Changed

- Renamed the theme to Chromet Dark.
- Matched the active tab to the rendered address-bar color, `#323436`.
- Introduced the vertically banded toolbar image.

## 0.0.2 - 2026-07-17

### Changed

- Increased selected-tab contrast.

## 0.0.1 - 2026-07-17

### Added

- Initial dark graphite theme.
- Manifest V3 color mappings, icons, toolbar artwork, documentation, and local installation package.
