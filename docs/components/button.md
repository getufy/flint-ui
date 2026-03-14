# Button

<Demo label="Variants" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap&quot;><flint-button variant=&quot;primary&quot;>Primary</flint-button><flint-button variant=&quot;secondary&quot;>Secondary</flint-button><flint-button variant=&quot;destructive&quot;>Destructive</flint-button></div>" />

<Demo label="Sizes" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap;align-items:center&quot;><flint-button size=&quot;small&quot;>Small</flint-button><flint-button size=&quot;medium&quot;>Medium</flint-button><flint-button size=&quot;large&quot;>Large</flint-button></div>" />

<Demo label="States" html="<div style=&quot;display:flex;gap:8px;flex-wrap:wrap;align-items:center&quot;><flint-button disabled>Disabled</flint-button><flint-button full-width>Full Width</flint-button></div>" />

<Demo label="Button Group" html="<flint-button-group>  <flint-button variant=&quot;secondary&quot;>Left</flint-button>  <flint-button variant=&quot;secondary&quot;>Center</flint-button>  <flint-button variant=&quot;secondary&quot;>Right</flint-button></flint-button-group>" />

<Demo label="Toggle Buttons" html="<flint-toggle-button-group exclusive>  <flint-toggle-button value=&quot;left&quot;>Left</flint-toggle-button>  <flint-toggle-button value=&quot;center&quot; selected>Center</flint-toggle-button>  <flint-toggle-button value=&quot;right&quot;>Right</flint-toggle-button></flint-toggle-button-group>" />

## `<flint-button-group>`

- **Tag**: `<flint-button-group>`
- **Class**: `FlintButtonGroup`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintButtonGroup } from 'flint-ui';
```

### Usage

```html
<flint-button-group></flint-button-group>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-border-radius-md` | `6px` |
| `--flint-font-family` | — |
| `--flint-shadow-sm` | — |
| `--flint-primary-color` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-primary-color-hover` | — |
| `--flint-primary-color-active` | — |
| `--flint-surface-1` | — |
| `--flint-text-color` | — |
| `--flint-input-border-color` | — |
| `--flint-hover-color` | — |
| `--flint-active-color` | — |
| `--flint-destructive-color` | — |
| `--flint-destructive-color-hover` | — |
| `--flint-destructive-color-active` | — |

---

## `<flint-button>`

- **Tag**: `<flint-button>`
- **Class**: `FlintButton`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintButton } from 'flint-ui';
```

### Usage

```html
<flint-button></flint-button>
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
| `--flint-button-border-radius` | `var(--flint-border-radius-md` |

---

## `<flint-toggle-button-group>`

- **Tag**: `<flint-toggle-button-group>`
- **Class**: `FlintToggleButtonGroup`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintToggleButtonGroup } from 'flint-ui';
```

### Usage

```html
<flint-toggle-button-group></flint-toggle-button-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string \| string[]` | `''` |  |
| `exclusive` | `exclusive` | `boolean` | `true` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-toggle-button-group-change` | `{ value: this.value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-toggle-button>`

- **Tag**: `<flint-toggle-button>`
- **Class**: `FlintToggleButton`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintToggleButton } from 'flint-ui';
```

### Usage

```html
<flint-toggle-button></flint-toggle-button>
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
| `flint-toggle-button-change` | `{ value: this.value, selected: !this.selected }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

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
