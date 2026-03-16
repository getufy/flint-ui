# Tabs: `<flint-tab-list>` Wrapper Requirement and `label` Attribute Removal

This guide covers two breaking changes to the `flint-tabs` component family:

1. Tab elements must now be wrapped in a `<flint-tab-list>` container.
2. The `label` attribute on `<flint-tab>` has been removed. Tab labels are now provided as slotted content (the default slot).

## Why these changes were made

**Structural accuracy.** The [WAI-ARIA Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) requires tabs to live inside a `role="tablist"` container. Previously, `<flint-tabs>` rendered a flat list of `<flint-tab>` elements and tried to apply `role="tablist"` internally. Introducing `<flint-tab-list>` as an explicit wrapper gives the tablist its own shadow root with the correct ARIA role, keyboard navigation, scroll buttons, and an animated indicator -- all scoped to the element that actually holds the tabs.

**Flexible labels.** The old `label` attribute limited tab labels to plain text. Using the default slot instead means you can include icons, badges, rich markup, or any other content inside a tab.

## Before / After: HTML (Lit / Vanilla)

### Before (flat structure with `label` attribute)

```html
<flint-tabs value="tab1" variant="standard" orientation="horizontal">
  <flint-tab value="tab1" label="Dashboard"></flint-tab>
  <flint-tab value="tab2" label="Settings"></flint-tab>
  <flint-tab value="tab3" label="Profile"></flint-tab>
  <flint-tab-panel value="tab1">Dashboard content</flint-tab-panel>
  <flint-tab-panel value="tab2">Settings content</flint-tab-panel>
  <flint-tab-panel value="tab3">Profile content</flint-tab-panel>
</flint-tabs>
```

### After (nested structure with `<flint-tab-list>` and slotted labels)

```html
<flint-tabs value="tab1">
  <flint-tab-list aria-label="Main navigation">
    <flint-tab value="tab1">Dashboard</flint-tab>
    <flint-tab value="tab2">Settings</flint-tab>
    <flint-tab value="tab3">Profile</flint-tab>
  </flint-tab-list>
  <flint-tab-panel value="tab1">Dashboard content</flint-tab-panel>
  <flint-tab-panel value="tab2">Settings content</flint-tab-panel>
  <flint-tab-panel value="tab3">Profile content</flint-tab-panel>
</flint-tabs>
```

### Rich label content (icons + text)

Because tab labels are now slotted content, you can include icons alongside text:

```html
<flint-tab value="settings">
  <svg slot="icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14,12.94c0.04-0.3 ..."></path>
  </svg>
  Settings
</flint-tab>
```

Use the `icon-position` attribute (`start`, `end`, `top`, `bottom`) on `<flint-tab>` to control icon placement relative to the label text.

## Before / After: React

### Before

```tsx
import { FlintTabs, FlintTab, FlintTabPanel } from '@getufy/flint-ui-react/tabs';

function App() {
  return (
    <FlintTabs value="tab1" variant="standard" orientation="horizontal">
      <FlintTab value="tab1" label="Dashboard" />
      <FlintTab value="tab2" label="Settings" />
      <FlintTab value="tab3" label="Profile" />
      <FlintTabPanel value="tab1">Dashboard content</FlintTabPanel>
      <FlintTabPanel value="tab2">Settings content</FlintTabPanel>
      <FlintTabPanel value="tab3">Profile content</FlintTabPanel>
    </FlintTabs>
  );
}
```

### After

```tsx
import {
  FlintTabs,
  FlintTab,
  FlintTabList,
  FlintTabPanel,
} from '@getufy/flint-ui-react/tabs';

function App() {
  return (
    <FlintTabs value="tab1">
      <FlintTabList aria-label="Main navigation">
        <FlintTab value="tab1">Dashboard</FlintTab>
        <FlintTab value="tab2">Settings</FlintTab>
        <FlintTab value="tab3">Profile</FlintTab>
      </FlintTabList>
      <FlintTabPanel value="tab1">Dashboard content</FlintTabPanel>
      <FlintTabPanel value="tab2">Settings content</FlintTabPanel>
      <FlintTabPanel value="tab3">Profile content</FlintTabPanel>
    </FlintTabs>
  );
}
```

### React event handling (unchanged)

The `flint-tab-change` event on `<FlintTabs>` still works the same way:

```tsx
<FlintTabs
  value={activeTab}
  onFlintTabChange={(e) => setActiveTab(e.detail.value)}
>
  <FlintTabList>
    <FlintTab value="one">One</FlintTab>
    <FlintTab value="two">Two</FlintTab>
  </FlintTabList>
  <FlintTabPanel value="one">...</FlintTabPanel>
  <FlintTabPanel value="two">...</FlintTabPanel>
</FlintTabs>
```

## `label` attribute removal

| Before | After |
|--------|-------|
| `<flint-tab value="x" label="My Tab"></flint-tab>` | `<flint-tab value="x">My Tab</flint-tab>` |
| `<FlintTab value="x" label="My Tab" />` | `<FlintTab value="x">My Tab</FlintTab>` |

The `label` attribute no longer exists on `FlintTab`. All tab labels are provided as children (the default slot). This enables rich content such as icons, badges, and custom markup inside tabs.

## Properties that moved to `<flint-tab-list>`

The following properties are now owned by `<flint-tab-list>`. They can still be set on `<flint-tabs>` for convenience -- `FlintTabs` pushes them down to its child `<flint-tab-list>` via `_syncAll()` -- but the canonical owner is the tab list.

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the tabs |
| `variant` | `variant` | `'standard' \| 'fullWidth' \| 'scrollable'` | `'standard'` | Display variant (sizing / scrollability) |
| `centered` | `centered` | `boolean` | `false` | Center tabs within the list |
| `scrollButtons` | `scroll-buttons` | `'auto' \| 'false'` | `'auto'` | Show scroll buttons in scrollable mode |

`<flint-tab-list>` also accepts an `aria-label` attribute for the `role="tablist"` container, which you should set for accessibility.

Properties that remain on `<flint-tabs>` only:

| Property | Attribute | Type | Default |
|----------|-----------|------|---------|
| `value` | `value` | `string` | `''` |
| `defaultValue` | `default-value` | `string` | `''` |
| `textColor` | `text-color` | `string` | `'primary'` |
| `indicatorColor` | `indicator-color` | `string` | `'primary'` |

## Search-and-replace guidance

### 1. Add the `<flint-tab-list>` wrapper

Find every `<flint-tabs` opening tag and wrap the `<flint-tab>` children in `<flint-tab-list>`:

**HTML / Lit templates:**

Find:
```
<flint-tabs ...>
  <flint-tab value="...">...</flint-tab>
  ...
  <flint-tab-panel ...>
```

Replace with:
```
<flint-tabs ...>
  <flint-tab-list aria-label="...">
    <flint-tab value="...">...</flint-tab>
    ...
  </flint-tab-list>
  <flint-tab-panel ...>
```

**React (JSX/TSX):**

Find:
```tsx
<FlintTabs ...>
  <FlintTab .../>
```

Replace with:
```tsx
<FlintTabs ...>
  <FlintTabList>
    <FlintTab .../>
```

And close the `</FlintTabList>` before the first `<FlintTabPanel>`.

Add `FlintTabList` to your import:
```tsx
// Before
import { FlintTabs, FlintTab, FlintTabPanel } from '@getufy/flint-ui-react/tabs';

// After
import { FlintTabs, FlintTab, FlintTabList, FlintTabPanel } from '@getufy/flint-ui-react/tabs';
```

### 2. Replace `label` attribute with slotted content

**Regex (HTML / Lit):**

Find: `<flint-tab value="([^"]*)" label="([^"]*)"(?: /)?>(?:</flint-tab>)?`

Replace: `<flint-tab value="$1">$2</flint-tab>`

**Regex (JSX/TSX):**

Find: `<FlintTab value="([^"]*)" label="([^"]*)"(?: /)?>`

Replace: `<FlintTab value="$1">$2</FlintTab>`

### 3. Optionally move layout properties to `<flint-tab-list>`

If you prefer explicit control at the tab-list level rather than relying on `FlintTabs` to push properties down, move `orientation`, `variant`, `centered`, and `scroll-buttons` from `<flint-tabs>` to `<flint-tab-list>`:

```html
<!-- Before -->
<flint-tabs value="a" variant="scrollable" scroll-buttons="auto">
  <flint-tab-list>...</flint-tab-list>
  ...
</flint-tabs>

<!-- After (explicit) -->
<flint-tabs value="a">
  <flint-tab-list variant="scrollable" scroll-buttons="auto">...</flint-tab-list>
  ...
</flint-tabs>
```

Both approaches work. Setting them on `<flint-tabs>` is the simpler migration path since the parent automatically syncs these values to its child tab list.
