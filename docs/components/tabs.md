# Tabs

<Demo label="Basic" html="<div style=&quot;width:100%;max-width:500px&quot;><flint-tabs value=&quot;one&quot;>  <flint-tab-list>    <flint-tab value=&quot;one&quot;>Tab One</flint-tab>    <flint-tab value=&quot;two&quot;>Tab Two</flint-tab>    <flint-tab value=&quot;three&quot;>Tab Three</flint-tab>  </flint-tab-list>  <flint-tab-panel value=&quot;one&quot;><p style=&quot;padding:16px;margin:0&quot;>Content for Tab One</p></flint-tab-panel>  <flint-tab-panel value=&quot;two&quot;><p style=&quot;padding:16px;margin:0&quot;>Content for Tab Two</p></flint-tab-panel>  <flint-tab-panel value=&quot;three&quot;><p style=&quot;padding:16px;margin:0&quot;>Content for Tab Three</p></flint-tab-panel></flint-tabs></div>" />

<Demo label="With Disabled Tab" html="<div style=&quot;width:100%;max-width:500px&quot;><flint-tabs value=&quot;first&quot;>  <flint-tab-list>    <flint-tab value=&quot;first&quot;>Active</flint-tab>    <flint-tab value=&quot;second&quot; disabled>Disabled</flint-tab>    <flint-tab value=&quot;third&quot;>Also Active</flint-tab>  </flint-tab-list>  <flint-tab-panel value=&quot;first&quot;><p style=&quot;padding:16px;margin:0&quot;>First panel content</p></flint-tab-panel>  <flint-tab-panel value=&quot;second&quot;><p style=&quot;padding:16px;margin:0&quot;>Disabled panel</p></flint-tab-panel>  <flint-tab-panel value=&quot;third&quot;><p style=&quot;padding:16px;margin:0&quot;>Third panel content</p></flint-tab-panel></flint-tabs></div>" />

## `<flint-tab>`

- **Tag**: `<flint-tab>`
- **Class**: `FlintTab`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTab } from 'flint-ui';
```

### Usage

```html
<flint-tab></flint-tab>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `selected` | `selected` | `boolean` | `false` |  |
| `iconPosition` | `icon-position` | `'top' \| 'bottom' \| 'start' \| 'end'` | `'start'` |  |
| `href` | `href` | `string` | `''` |  |
| `fullWidth` | `full-width` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tab-click` | `{ value: this.value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `icon` |  |

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
| `setTabIndex(n: number)` |  |
| `focusInner()` |  |

---

## `<flint-tab-panel>`

- **Tag**: `<flint-tab-panel>`
- **Class**: `FlintTabPanel`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTabPanel } from 'flint-ui';
```

### Usage

```html
<flint-tab-panel></flint-tab-panel>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

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
import 'flint-ui'; // auto-registers all
// or
import { FlintTabList } from 'flint-ui';
```

### Usage

```html
<flint-tab-list></flint-tab-list>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |  |
| `variant` | `variant` | `'standard' \| 'fullWidth' \| 'scrollable'` | `'standard'` |  |
| `centered` | `centered` | `boolean` | `false` |  |
| `scrollButtons` | `scroll-buttons` | `'auto' \| 'false'` | `'auto'` |  |
| `ariaLabel` | `aria-label` | `string` | `''` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tab-click` | `{ value: tabs[idx].value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### Methods

| Method | Description |
| --- | --- |
| `syncIndicator()` |  |

---

## `<flint-tabs>`

- **Tag**: `<flint-tabs>`
- **Class**: `FlintTabs`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTabs } from 'flint-ui';
```

### Usage

```html
<flint-tabs></flint-tabs>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |  |
| `variant` | `variant` | `'standard' \| 'fullWidth' \| 'scrollable'` | `'standard'` |  |
| `centered` | `centered` | `boolean` | `false` |  |
| `scrollButtons` | `scroll-buttons` | `'auto' \| 'false'` | `'auto'` |  |
| `textColor` | `text-color` | `string` | `'primary'` | 'primary' \| 'secondary' \| 'inherit' \| any CSS color |
| `indicatorColor` | `indicator-color` | `string` | `'primary'` | 'primary' \| 'secondary' \| any CSS color |
| `defaultValue` | `default-value` | `string` | `''` | Uncontrolled mode: initial value if `value` not set |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-tab-change` | `{ value: e.detail.value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## Accessibility

- **Keyboard**: Arrow keys navigate tabs, Home/End jump to first/last.
- **ARIA**: `role="tablist"`, `role="tab"` with `aria-selected`, `role="tabpanel"`. Roving tabindex pattern.
- **Screen reader**: announces tab label and selected state.
