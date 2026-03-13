# Button

<Demo label="Variants">

<ui-button variant="primary">Primary</ui-button>
<ui-button variant="secondary">Secondary</ui-button>
<ui-button variant="destructive">Destructive</ui-button>

</Demo>

<Demo label="Sizes">

<ui-button size="small">Small</ui-button>
<ui-button size="medium">Medium</ui-button>
<ui-button size="large">Large</ui-button>

</Demo>

<Demo label="States">

<ui-button disabled>Disabled</ui-button>
<ui-button full-width>Full Width</ui-button>

</Demo>

<Demo label="Button Group">

<ui-button-group>
  <ui-button variant="secondary">Left</ui-button>
  <ui-button variant="secondary">Center</ui-button>
  <ui-button variant="secondary">Right</ui-button>
</ui-button-group>

</Demo>

<Demo label="Toggle Buttons">

<ui-toggle-button-group exclusive>
  <ui-toggle-button value="left">Left</ui-toggle-button>
  <ui-toggle-button value="center" selected>Center</ui-toggle-button>
  <ui-toggle-button value="right">Right</ui-toggle-button>
</ui-toggle-button-group>

</Demo>

## `<ui-button-group>`

- **Tag**: `<ui-button-group>`
- **Class**: `UiButtonGroup`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiButtonGroup } from 'storybook-lit';
```

### Usage

```html
<ui-button-group></ui-button-group>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-border-radius-md` | `6px` |
| `--ui-font-family` | — |
| `--ui-shadow-sm` | — |
| `--ui-primary-color` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-primary-color-hover` | — |
| `--ui-primary-color-active` | — |
| `--ui-surface-1` | — |
| `--ui-text-color` | — |
| `--ui-input-border-color` | — |
| `--ui-hover-color` | — |
| `--ui-active-color` | — |
| `--ui-destructive-color` | — |
| `--ui-destructive-color-hover` | — |
| `--ui-destructive-color-active` | — |

---

## `<ui-button>`

- **Tag**: `<ui-button>`
- **Class**: `UiButton`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiButton } from 'storybook-lit';
```

### Usage

```html
<ui-button></ui-button>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | `'primary' \| 'secondary' \| 'destructive'` | `'primary'` |  |
| `size` | `size` | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `fullWidth` | `full-width` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-button-border-radius` | `var(--ui-border-radius-md` |

---

## `<ui-toggle-button-group>`

- **Tag**: `<ui-toggle-button-group>`
- **Class**: `UiToggleButtonGroup`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiToggleButtonGroup } from 'storybook-lit';
```

### Usage

```html
<ui-toggle-button-group></ui-toggle-button-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string \| string[]` | `''` |  |
| `exclusive` | `exclusive` | `boolean` | `true` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-toggle-button-group-change` | `{ value: this.value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-toggle-button>`

- **Tag**: `<ui-toggle-button>`
- **Class**: `UiToggleButton`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiToggleButton } from 'storybook-lit';
```

### Usage

```html
<ui-toggle-button></ui-toggle-button>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `selected` | `selected` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `value` | `value` | `string` | `''` |  |
| `size` | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-toggle-button-change` | `{ value: this.value, selected: !this.selected }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-toggle-button-font-size` | `14px` |
| `--ui-toggle-button-padding` | `8px 16px` |
| `--ui-toggle-button-gap` | `8px` |
| `--ui-toggle-button-border-radius` | `var(--ui-border-radius-md` |
| `--ui-toggle-button-selected-bg` | `var(--ui-active-color` |
| `--ui-toggle-button-selected-color` | `var(--ui-primary-color` |
| `--ui-toggle-button-selected-border-color` | `var(--ui-primary-color` |

---
