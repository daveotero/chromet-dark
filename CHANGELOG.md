# Changelog

All notable changes to Chromet Dark are documented here.

The project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.4.0] - 2026-07-17

### Changed

- Replaced the hard active-tab-to-toolbar color boundary with a 16-pixel graphite blend.
- Softened the visible seam and reduced the visual weight of Chrome's connected active-tab shape.
- Aligned the declared toolbar fallback with the rendered toolbar, reducing the contrast of Chrome's derived content divider.
- Expanded validation to verify every row of the generated toolbar transition.
- Documented Chrome's shared active-tab and toolbar image constraint.

## [1.3.0] - 2026-07-17

### Fixed

- Moved the toolbar-image color transition by 16 pixels so it aligns with the visible active-tab and toolbar seam.
- Prevented the lower half of the active tab from inheriting the toolbar color.

### Added

- Reproducible asset build and validation scripts.
- Chrome Web Store listing assets and publication notes.
- GitHub Actions validation and tagged-release workflows.

## [1.2.0] - 2026-07-17

### Changed

- Renamed the theme to Chromet Dark.
- Matched the active tab to the rendered address-bar color, `#323436`.
- Introduced the vertically banded toolbar image.

## [1.1.0] - 2026-07-17

### Changed

- Increased selected-tab contrast.

## [1.0.0] - 2026-07-17

### Added

- Initial graphite and cyan theme.
- Manifest V3 color mappings, icons, toolbar artwork, documentation, and local installation package.

[Unreleased]: https://github.com/daveotero/chromet-dark/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/daveotero/chromet-dark/releases/tag/v1.4.0
[1.3.0]: https://github.com/daveotero/chromet-dark/releases/tag/v1.3.0
[1.2.0]: https://github.com/daveotero/chromet-dark/releases/tag/v1.2.0
[1.1.0]: https://github.com/daveotero/chromet-dark/releases/tag/v1.1.0
[1.0.0]: https://github.com/daveotero/chromet-dark/releases/tag/v1.0.0
