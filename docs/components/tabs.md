# Tabs

<Demo>

<div style="width:100%;max-width:500px">
<ui-tabs>
  <ui-tab-list>
    <ui-tab>Tab One</ui-tab>
    <ui-tab>Tab Two</ui-tab>
    <ui-tab>Tab Three</ui-tab>
  </ui-tab-list>
  <ui-tab-panel><p style="padding:16px;margin:0">Content for Tab One</p></ui-tab-panel>
  <ui-tab-panel><p style="padding:16px;margin:0">Content for Tab Two</p></ui-tab-panel>
  <ui-tab-panel><p style="padding:16px;margin:0">Content for Tab Three</p></ui-tab-panel>
</ui-tabs>
</div>

</Demo>

## `<ui-tab>`

- **Tag**: `<ui-tab>`
- **Class**: `UiTab`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTab } from 'storybook-lit';
```

### Usage

```html
<ui-tab></ui-tab>
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
| `ui-tab-click` | `{ value: this.value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `icon` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-tab-border-color` | `var(--ui-border-color` |
| `--ui-tab-scroll-btn-size` | `40px` |
| `--ui-tab-indicator-color` | `var(--ui-tabs-ind-color, var(--ui-primary-color` |
| `--ui-tab-indicator-radius` | `3px` |
| `--ui-tab-indicator-height` | `3px` |
| `--ui-tab-indicator-width` | `3px` |
| `--ui-tab-panel-padding` | `24px` |
| `--ui-tab-padding-y` | `10px` |
| `--ui-tab-padding-x` | `16px` |
| `--ui-tab-min-height` | `48px` |
| `--ui-tab-font-size` | `0.875rem` |
| `--ui-tab-font-weight` | `500` |
| `--ui-tab-inactive-color` | — |
| `--ui-tab-active-color` | — |
| `--ui-tab-hover-bg` | `var(--ui-primary-color-light` |
| `--ui-tab-font-weight-active` | `600` |
| `--ui-tab-disabled-opacity` | `0.38` |
| `--ui-tab-icon-min-height` | `72px` |
| `--ui-border-color` | — |
| `--ui-primary-color` | — |
| `--ui-background` | — |
| `--ui-text-color-muted` | — |
| `--ui-text-color` | — |
| `--ui-hover-color` | — |
| `--ui-font-family` | — |
| `--ui-primary-color-light` | — |

### Methods

| Method | Description |
| --- | --- |
| `setTabIndex(n: number)` |  |
| `focusInner()` |  |

---

## `<ui-tab-panel>`

- **Tag**: `<ui-tab-panel>`
- **Class**: `UiTabPanel`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTabPanel } from 'storybook-lit';
```

### Usage

```html
<ui-tab-panel></ui-tab-panel>
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
| `--ui-tab-panel-padding` | `24px` |

---

## `<ui-tab-list>`

- **Tag**: `<ui-tab-list>`
- **Class**: `UiTabList`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTabList } from 'storybook-lit';
```

### Usage

```html
<ui-tab-list></ui-tab-list>
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
| `ui-tab-click` | `{ value: tabs[idx].value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### Methods

| Method | Description |
| --- | --- |
| `syncIndicator()` |  |

---

## `<ui-tabs>`

- **Tag**: `<ui-tabs>`
- **Class**: `UiTabs`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTabs } from 'storybook-lit';
```

### Usage

```html
<ui-tabs></ui-tabs>
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
| `ui-tab-change` | `{ value: e.detail.value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---
