# Chromet Dark palette

Chromet Dark is built around a narrow graphite scale, warm off-white text, and one cool cyan accent. The palette was tuned from a dark browser reference, then adjusted for Chrome's own rendering behavior.

## Core colors

| Token | Hex | RGB | Use |
|---|---:|---:|---|
| Frame | `#191A1A` | 25, 26, 26 | Window frame and inactive tabs |
| Inactive frame | `#161717` | 22, 23, 23 | Unfocused windows and inactive states |
| Active surface | `#323436` | 50, 52, 54 | Selected tab and rendered address bar |
| Toolbar | `#1F2121` | 31, 33, 33 | Navigation and bookmarks surfaces |
| Border | `#3D3F40` | 61, 63, 64 | Fine separators and icon outline |
| Content divider | `#383A39` | 56, 58, 57 | Derived line below the bookmarks surface |
| Primary text | `#D6D5D4` | 214, 213, 212 | Active tab, toolbar, and bookmark text |
| New Tab text | `#CDCBC8` | 205, 203, 200 | New Tab page text |
| Muted control | `#8C8D8C` | 140, 141, 140 | Toolbar buttons and secondary marks |
| Inactive text | `#7D7E7D` | 125, 126, 125 | Inactive tab labels |
| Cyan accent | `#1FB8CD` | 31, 184, 205 | Links, focus treatment, and identity mark |
| New Tab background | `#171615` | 23, 22, 21 | New Tab page canvas |

## Chrome field map

The installable values live in [`../theme/manifest.json`](../theme/manifest.json). This table groups the important fields by visible role.

| Visible role | Manifest fields | Value |
|---|---|---:|
| Window frame | `frame`, `background_tab` | `#191A1A` |
| Unfocused frame | `frame_inactive`, `background_tab_inactive` | `#161717` |
| Incognito frame | `frame_incognito`, `background_tab_incognito` | `#191A1A` |
| Incognito inactive frame | `frame_incognito_inactive`, `background_tab_incognito_inactive` | `#161717` |
| Rendered active tab | Upper region of `theme_toolbar` | `#323436` with a short lower blend |
| Tab-to-toolbar handoff | Rows 48 through 63 of `theme_toolbar` | `#323436` to `#1F2121` |
| Rendered toolbar | Lower region of `theme_toolbar` | `#1F2121` |
| Active text | `tab_text`, `tab_background_text`, `toolbar_text`, `bookmark_text` | `#D6D5D4` |
| Inactive tab text | `tab_background_text_inactive` | `#7D7E7D` |
| Toolbar icons | `toolbar_button_icon` | `#8C8D8C` |
| Address bar | `omnibox_background` | `#1F2121` |
| Address bar text | `omnibox_text` | `#D6D5D4` |
| New Tab page | `ntp_background`, `ntp_header`, `ntp_text`, `ntp_link` | Graphite scale plus cyan |

## Why `toolbar` matches the lower rendered surface

The manifest declares `toolbar` as `#1F2121`, matching the solid lower region of `images/toolbar.png`. Chrome uses this field as a compatibility fallback and as an input when it derives several secondary colors.

One of those secondary colors is the line below the toolbar and bookmarks surface. Chrome does not let themes set that line directly. It blends the toolbar-button icon color into the declared toolbar color at a low opacity. With `toolbar` at `#1F2121` and `toolbar_button_icon` at `#8C8D8C`, the expected divider is approximately `#383A39`. The previous `#434646` toolbar fallback produced the much brighter `#545656` line visible in early screenshots.

The divider remains Chrome's fixed line geometry and appears as one pixel at the scale captured during development. Version 1.4.0 makes it feel thinner by reducing contrast rather than trying to change dimensions Chrome does not expose.

## Contrast intent

The active tab is deliberately lighter than the frame but still darker than most page content. Its short lower blend reduces the abruptness of Chrome's connected tab shape without making gradients a broad design element. Chrome reuses those pixels in part of the toolbar, which is a platform constraint rather than a separate visual effect. Inactive tab text is muted without becoming illegible. Cyan is reserved for small accents, so it stays recognizable and does not turn the browser chrome into a neon interface.
