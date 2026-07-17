# Visual testing

Chrome theme rendering can change with browser updates, operating-system chrome, feature flags, and display scaling. Run this checklist on the version you intend to support before publishing a release.

## Quick release pass

1. Run `npm run release:check`.
2. Load the [`../theme`](../theme) directory through `chrome://extensions`.
3. Restart Chrome once.
4. Check the active tab at 100 percent display scaling.
5. Check an inactive window and an Incognito window.
6. Inspect common toolbar bubbles and the New Tab page.

## Tab strip

- One active tab
- Several active and inactive tabs
- Hovered inactive tab
- Pinned tab
- Tab with audio indicator
- Tab with unsaved-form indicator
- Narrow tabs with many pages open
- Tab groups in collapsed and expanded states
- Dragged tab and detached tab window
- New-tab button
- Window maximized, restored, and snapped

Acceptance criteria:

- The full active tab reads as one `#323436` surface.
- No horizontal split or darker overlay appears in the lower part of the active tab.
- Inactive tabs remain visibly darker than the active tab.
- Active and inactive labels remain readable.
- The tab-to-toolbar seam is clean at the tested scale.

## Navigation and bookmarks

- Address bar unfocused
- Address bar focused
- Selected URL text
- Omnibox suggestion list
- Site-information bubble
- Back, forward, reload, and home buttons
- Extension icons and extensions menu
- Profile menu
- Browser menu
- Bookmarks bar with text, folders, and overflow

Acceptance criteria:

- Toolbar icons are distinct without looking bright white.
- The active tab and address bar feel related but do not merge into one shape.
- Text remains readable in menus and bubbles controlled by the theme.

## Page-adjacent surfaces

- New Tab page
- Downloads bubble
- Find bar with Ctrl+F
- Password and payment prompts
- Permission prompt
- Full-screen notification
- Side panel, if enabled
- DevTools docked on each side

## Window states

- Active normal window
- Inactive normal window
- Incognito window
- Inactive Incognito window
- Chrome after restart
- Chrome after toggling another theme and reloading Chromet Dark

## Display matrix

Test the scaling factors and displays you actually use. A practical minimum on Windows is:

| Display | Scale | Window state | Result |
|---|---:|---|---|
| Primary monitor | 100% | Maximized | Pending |
| Primary monitor | 100% | Restored | Pending |
| High-DPI monitor | 125% or 150% | Maximized | Pending |
| Secondary monitor | Native setting | Restored | Pending |

## Reporting a rendering issue

Include:

- Chrome version from `chrome://version`
- Operating system and version
- Display scaling percentage
- Maximized or restored window state
- Normal or Incognito mode
- Screenshot of the full browser window
- Close crop of the affected area
- Whether the issue persists after restarting Chrome

Do not include private tabs, account details, bookmarks, or browsing history in public screenshots.
