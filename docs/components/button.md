# Button

<Demo label="Variants" html='<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-button variant="primary">Primary</flint-button><flint-button variant="secondary">Secondary</flint-button><flint-button variant="destructive">Destructive</flint-button></div>' />

<Demo label="Sizes" html='<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><flint-button size="small">Small</flint-button><flint-button size="medium">Medium</flint-button><flint-button size="large">Large</flint-button></div>' />

<Demo label="States" html='<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><flint-button disabled>Disabled</flint-button><flint-button full-width>Full Width</flint-button></div>' />

<Demo label="Button Group" html='<flint-button-group>  <flint-button variant="secondary">Left</flint-button>  <flint-button variant="secondary">Center</flint-button>  <flint-button variant="secondary">Right</flint-button></flint-button-group>' />

<Demo label="Toggle Buttons" html='<flint-toggle-button-group exclusive>  <flint-toggle-button value="left">Left</flint-toggle-button>  <flint-toggle-button value="center" selected>Center</flint-toggle-button>  <flint-toggle-button value="right">Right</flint-toggle-button></flint-toggle-button-group>' />

## `<flint-button-group>`

- **Tag**: `<flint-button-group>`
- **Class**: `FlintButtonGroup`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintButtonGroup } from '@getufy/flint-ui';
```

### Usage

```html
<flint-button-group></flint-button-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | `Orientation` | `'horizontal'` | Layout direction of the group. |
| `size` | `size` | `ButtonSize \| ''` | `''` | Size propagated to child `flint-button` elements. |
| `appearance` | `appearance` | `ButtonAppearance \| ''` | `''` | Appearance propagated to child `flint-button` elements. |
| `color` | `color` | `ButtonColor \| ''` | `''` | Color propagated to child `flint-button` elements. |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-border-radius-md` | `6px` |
| `--flint-font-family` | — |
| `--flint-primary-color` | — |
| `--flint-primary-color-hover` | — |
| `--flint-primary-color-active` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-destructive-color` | — |
| `--flint-destructive-color-hover` | — |
| `--flint-destructive-color-active` | — |
| `--flint-success-color` | — |
| `--flint-success-color-hover` | — |
| `--flint-success-color-active` | — |
| `--flint-warning-color` | — |
| `--flint-warning-color-hover` | — |
| `--flint-warning-color-active` | — |
| `--flint-neutral-color` | — |
| `--flint-neutral-color-hover` | — |
| `--flint-neutral-color-active` | — |
| `--flint-shadow-sm` | — |
| `--flint-surface-1` | `transparent` |
| `--flint-text-color` | — |
| `--flint-input-border-color` | — |
| `--flint-hover-color` | — |
| `--flint-active-color` | — |

---

## `<flint-button>`

Button: a clickable element used for actions and navigation.

- **Tag**: `<flint-button>`
- **Class**: `FlintButton`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintButton } from '@getufy/flint-ui';
```

### Usage

```html
<flint-button></flint-button>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `appearance` | `appearance` | `ButtonAppearance` | `'filled'` | Visual appearance of the button (structural style). |
| `color` | `color` | `ButtonColor` | `'primary'` | Semantic color of the button. |
| `size` | `size` | `ButtonSize` | `'md'` | Size of the button. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the button and prevents interaction. |
| `fullWidth` | `full-width` | `boolean` | `false` | Whether the button stretches to fill its container width. |
| `type` | `type` | `ButtonType` | `'button'` | Button type attribute. When `submit` or `reset`, a hidden native |
| `label` | `label` | `string` | `''` | Accessible label for screen readers. Essential for icon-only buttons. |
| `loading` | `loading` | `boolean` | `false` | Shows a loading spinner and disables interaction. |
| `href` | `href` | `string` | `''` | When set, renders an `&lt;a&gt;` tag instead of a `&lt;button&gt;`. |
| `target` | `target` | `string` | `''` | Optional `target` attribute when `href` is set. |
| `shape` | `shape` | `ButtonShape` | `'default'` | Shape variant of the button. |
| `caret` | `caret` | `boolean` | `false` | Renders a dropdown caret (chevron-down) icon in the suffix area. |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The button's base wrapper element. |
| `prefix` | The container wrapping the prefix slot. |
| `label` | The container wrapping the default slot (label text). |
| `suffix` | The container wrapping the suffix slot. |
| `caret` | The caret icon container. |
| `spinner` | The loading spinner element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-button-border-radius` | `var(--flint-border-radius-md` |

---

## `<flint-toggle-button-group>`

Toggle Button Group: manages exclusive or multi-select toggle buttons.

- **Tag**: `<flint-toggle-button-group>`
- **Class**: `FlintToggleButtonGroup`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintToggleButtonGroup } from '@getufy/flint-ui';
```

### Usage

```html
<flint-toggle-button-group></flint-toggle-button-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `dependencies` | `dependencies` | `object` | `&#123; 'flint-toggle-button': FlintToggleButton as unknown as typeof FlintElement &#125;` |  |
| `value` | `value` | `string \| string[]` | `''` | Currently selected value(s). A string when exclusive, an array otherwise. |
| `defaultValue` | `default-value` | `string \| string[]` | `''` | Initial selected value(s) for uncontrolled usage. |
| `exclusive` | `exclusive` | `boolean` | `true` | Whether only one button can be selected at a time. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-toggle-button-group-change` | `&#123; value: string \| string[] &#125;` | Fired when the group's selected value(s) change. detail: `&#123; value: string \| string[] &#125;` |

---

## `<flint-toggle-button>`

Toggle Button: a button that can be toggled on/off.

- **Tag**: `<flint-toggle-button>`
- **Class**: `FlintToggleButton`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintToggleButton } from '@getufy/flint-ui';
```

### Usage

```html
<flint-toggle-button></flint-toggle-button>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `selected` | `selected` | `boolean` | `false` | Whether the button is currently selected (pressed). |
| `disabled` | `disabled` | `boolean` | `false` | Whether the button is disabled. |
| `value` | `value` | `string` | `''` | Value associated with this toggle button. |
| `size` | `size` | `Size` | `'md'` | Size variant of the toggle button. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-toggle-button-change` | `&#123; value: string, selected: boolean &#125;` | Fired when the button's selected state changes. detail: `&#123; value: string, selected: boolean &#125;` |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The inner button element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-toggle-button-font-size` | `14px` |
| `--flint-toggle-button-padding` | `8px 16px` |
| `--flint-toggle-button-gap` | `8px` |
| `--flint-toggle-button-border-radius` | `var(--flint-border-radius-md` |
| `--flint-toggle-button-selected-bg` | `var(--flint-active-color` |
| `--flint-toggle-button-selected-color` | `var(--flint-primary-color` |
| `--flint-toggle-button-selected-border-color` | `var(--flint-primary-color` |

---
