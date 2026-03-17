# Tabs

<Demo label="Basic" html='<div style="width:100%;max-width:500px"><flint-tabs value="one">  <flint-tab-list>    <flint-tab value="one">Tab One</flint-tab>    <flint-tab value="two">Tab Two</flint-tab>    <flint-tab value="three">Tab Three</flint-tab>  </flint-tab-list>  <flint-tab-panel value="one"><p style="padding:16px;margin:0">Content for Tab One</p></flint-tab-panel>  <flint-tab-panel value="two"><p style="padding:16px;margin:0">Content for Tab Two</p></flint-tab-panel>  <flint-tab-panel value="three"><p style="padding:16px;margin:0">Content for Tab Three</p></flint-tab-panel></flint-tabs></div>' />

<Demo label="With Disabled Tab" html='<div style="width:100%;max-width:500px"><flint-tabs value="first">  <flint-tab-list>    <flint-tab value="first">Active</flint-tab>    <flint-tab value="second" disabled>Disabled</flint-tab>    <flint-tab value="third">Also Active</flint-tab>  </flint-tab-list>  <flint-tab-panel value="first"><p style="padding:16px;margin:0">First panel content</p></flint-tab-panel>  <flint-tab-panel value="second"><p style="padding:16px;margin:0">Disabled panel</p></flint-tab-panel>  <flint-tab-panel value="third"><p style="padding:16px;margin:0">Third panel content</p></flint-tab-panel></flint-tabs></div>' />

## `<flint-tab>`

Tab: an individual tab button within a tab list.

- **Tag**: `<flint-tab>`
- **Class**: `FlintTab`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTab } from '@getufy/flint-ui';
```

### Usage

```html
<flint-tab></flint-tab>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Unique identifier for this tab. |
| `disabled` | `disabled` | `boolean` | `false` | Whether the tab is disabled. |
| `selected` | `selected` | `boolean` | `false` | Whether the tab is currently selected. |
| `iconPosition` | `icon-position` | `'top' \| 'bottom' \| 'start' \| 'end'` | `'start'` | Position of the icon slot relative to the label. |
| `href` | `href` | `string` | `''` | URL to navigate to, renders the tab as a link. |
| `fullWidth` | `full-width` | `boolean` | `false` | Whether the tab stretches to fill available width. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tab-click` | — | Fired when the tab is clicked or activated via keyboard. |

### CSS Parts

| Name | Description |
| --- | --- |
| `tab` | The tab button or anchor element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-tab-border-color` | `var(--flint-border-color` |
| `--flint-tab-scroll-btn-size` | `40px` |
| `--flint-tab-indicator-color` | `var(--flint-tabs-ind-color, var(--flint-primary-color` |
| `--flint-tab-indicator-radius` | `3px` |
| `--flint-tab-indicator-height` | `3px` |
| `--flint-tab-indicator-width` | `3px` |
| `--flint-tab-panel-padding` | `24px` |
| `--flint-tab-padding-y` | `10px` |
| `--flint-tab-padding-x` | `16px` |
| `--flint-tab-min-height` | `48px` |
| `--flint-tab-font-size` | `0.875rem` |
| `--flint-tab-font-weight` | `500` |
| `--flint-tab-inactive-color` | — |
| `--flint-tab-active-color` | — |
| `--flint-tab-hover-bg` | `var(--flint-primary-color-light` |
| `--flint-tab-font-weight-active` | `600` |
| `--flint-tab-disabled-opacity` | `0.38` |
| `--flint-tab-icon-min-height` | `72px` |
| `--flint-border-color` | — |
| `--flint-primary-color` | — |
| `--flint-background` | — |
| `--flint-text-color-muted` | — |
| `--flint-text-color` | — |
| `--flint-hover-color` | — |
| `--flint-font-family` | — |
| `--flint-primary-color-light` | — |

### Methods

| Method | Description |
| --- | --- |
| `focusInner(): void` |  |

---

## `<flint-tab-panel>`

Tab Panel: content container shown when its corresponding tab is active.

- **Tag**: `<flint-tab-panel>`
- **Class**: `FlintTabPanel`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTabPanel } from '@getufy/flint-ui';
```

### Usage

```html
<flint-tab-panel></flint-tab-panel>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Identifier linking this panel to its corresponding tab. |

### CSS Parts

| Name | Description |
| --- | --- |
| `panel` | The panel content wrapper element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-tab-panel-padding` | `24px` |

---

## `<flint-tab-list>`

- **Tag**: `<flint-tab-list>`
- **Class**: `FlintTabList`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTabList } from '@getufy/flint-ui';
```

### Usage

```html
<flint-tab-list></flint-tab-list>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | `Orientation` | `'horizontal'` | Layout direction of the tab list. |
| `variant` | `variant` | `'standard' \| 'fullWidth' \| 'scrollable'` | `'standard'` | Display variant controlling tab sizing and scrollability. |
| `centered` | `centered` | `boolean` | `false` | Whether to center the tabs within the tab list. |
| `scrollButtons` | `scroll-buttons` | `'auto' \| 'false'` | `'auto'` | Whether to show scroll buttons in scrollable mode. |
| `ariaLabel` | `aria-label` | `string` | `''` | Accessible label for the tab list. |

### Methods

| Method | Description |
| --- | --- |
| `syncIndicator(): void` |  |

---

## `<flint-tabs>`

Tabs: container that coordinates tab selection and panel visibility.

- **Tag**: `<flint-tabs>`
- **Class**: `FlintTabs`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTabs } from '@getufy/flint-ui';
```

### Usage

```html
<flint-tabs></flint-tabs>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Current active tab value (controlled). When set, the component reflects this value and does not manage its own state. |
| `orientation` | `orientation` | `Orientation` | `'horizontal'` | Layout direction of the tabs. |
| `variant` | `variant` | `'standard' \| 'fullWidth' \| 'scrollable'` | `'standard'` | Display variant controlling tab sizing and scrollability. |
| `centered` | `centered` | `boolean` | `false` | Whether to center the tabs. |
| `scrollButtons` | `scroll-buttons` | `'auto' \| 'false'` | `'auto'` | Whether to show scroll buttons in scrollable mode. |
| `textColor` | `text-color` | `string` | `'primary'` | Text color: 'primary' \| 'secondary' \| 'inherit' \| any CSS color. |
| `indicatorColor` | `indicator-color` | `string` | `'primary'` | Indicator color: 'primary' \| 'secondary' \| any CSS color. |
| `defaultValue` | `default-value` | `string` | `''` | Initial value (uncontrolled). Only used on first render; ignored after mount. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tab-change` | `&#123; value: string &#125;` | Fired when the active tab changes. detail: `&#123; value: string &#125;` |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The tabs root container. |
| `nav` | The tab navigation container. |
| `indicator` | The active tab indicator element. |

---
