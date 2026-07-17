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
| Rendered active tab | Upper band of `theme_toolbar` | `#323436` |
| Rendered toolbar | Lower band of `theme_toolbar` | `#1F2121` |
| Active text | `tab_text`, `tab_background_text`, `toolbar_text`, `bookmark_text` | `#D6D5D4` |
| Inactive tab text | `tab_background_text_inactive` | `#7D7E7D` |
| Toolbar icons | `toolbar_button_icon` | `#8C8D8C` |
| Address bar | `omnibox_background` | `#1F2121` |
| Address bar text | `omnibox_text` | `#D6D5D4` |
| New Tab page | `ntp_background`, `ntp_header`, `ntp_text`, `ntp_link` | Graphite scale plus cyan |

## Why `toolbar` is different from the rendered toolbar

The manifest declares `toolbar` as `#434646`, but the image-backed theme renders the actual toolbar from the lower band of `images/toolbar.png`, which is `#1F2121`. The declared value is a compatibility fallback for Chrome surfaces that consult the color field instead of the image.

The image-free variant at [`../variants/colors-only/manifest.json`](../variants/colors-only/manifest.json) declares `toolbar` directly as `#1F2121` because it does not use the vertical image offset technique.

## Contrast intent

The active tab is deliberately lighter than the frame but still darker than most page content. Inactive tab text is muted without becoming illegible. Cyan is reserved for small accents, so it stays recognizable and does not turn the browser chrome into a neon interface.
