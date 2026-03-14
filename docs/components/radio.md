# Radio

<Demo label="Basic" html="<flint-radio-group value=&quot;a&quot;>  <flint-radio value=&quot;a&quot; label=&quot;Option A&quot;></flint-radio>  <flint-radio value=&quot;b&quot; label=&quot;Option B&quot;></flint-radio>  <flint-radio value=&quot;c&quot; label=&quot;Option C&quot;></flint-radio></flint-radio-group>" />

<Demo label="Disabled" html="<flint-radio-group value=&quot;x&quot;>  <flint-radio value=&quot;x&quot; label=&quot;Selected&quot; disabled></flint-radio>  <flint-radio value=&quot;y&quot; label=&quot;Disabled&quot; disabled></flint-radio></flint-radio-group>" />

## `<flint-radio-group>`

- **Tag**: `<flint-radio-group>`
- **Class**: `FlintRadioGroup`
- **Form Associated**: Yes

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintRadioGroup } from 'flint-ui';
```

### Usage

```html
<flint-radio-group></flint-radio-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` |  |
| `name` | `name` | `string` | `''` |  |
| `value` | `value` | `string` | `''` |  |
| `defaultValue` | `default-value` | `string` | `''` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `required` | `required` | `boolean` | `false` |  |
| `orientation` | `orientation` | `RadioOrientation` | `'vertical'` |  |
| `size` | `size` | `RadioSize` | `'md'` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-radio-group-change` | `{ value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-radio-group-gap` | `8px` |
| `--flint-font-family` | — |
| `--flint-text-color` | — |
| `--flint-input-border-color` | — |
| `--flint-surface-1` | — |
| `--flint-primary-color` | — |
| `--flint-primary-focus-ring` | — |

---

## `<flint-radio>`

- **Tag**: `<flint-radio>`
- **Class**: `FlintRadio`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintRadio } from 'flint-ui';
```

### Usage

```html
<flint-radio></flint-radio>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `checked` | `checked` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `required` | `required` | `boolean` | `false` |  |
| `name` | `name` | `string` | `''` |  |
| `value` | `value` | `string` | `''` |  |
| `label` | `label` | `string` | `''` |  |
| `size` | `size` | `RadioSize` | `'md'` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-radio-select` | `{ value: this.value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-radio-disabled-opacity` | `0.5` |
| `--flint-radio-group-gap` | `8px` |
| `--flint-radio-size` | `18px` |
| `--flint-radio-gap` | `8px` |
| `--flint-radio-size-sm` | `14px` |
| `--flint-radio-size-lg` | `22px` |
| `--flint-radio-dot-size` | `8px` |
| `--flint-radio-dot-size-sm` | `6px` |
| `--flint-radio-dot-size-lg` | `10px` |
| `--flint-radio-label-font-size` | `14px` |
| `--flint-radio-label-font-size-sm` | `12px` |
| `--flint-radio-label-font-size-lg` | `16px` |

### Methods

| Method | Description |
| --- | --- |
| `focus(options?: FocusOptions)` |  |

---

## Accessibility

- **Keyboard**: Arrow keys navigate between options, Space selects.
- **ARIA**: `role="radiogroup"` on group, `role="radio"` with `aria-checked` on items.
- **Screen reader**: announces selected state and group label.
