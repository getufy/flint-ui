# Radio

## `<ui-radio-group>`

- **Tag**: `<ui-radio-group>`
- **Class**: `UiRadioGroup`
- **Form Associated**: Yes

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiRadioGroup } from 'storybook-lit';
```

### Usage

```html
<ui-radio-group></ui-radio-group>
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
| `ui-radio-group-change` | `{ value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-radio-group-gap` | `8px` |
| `--ui-font-family` | — |
| `--ui-text-color` | — |
| `--ui-input-border-color` | — |
| `--ui-surface-1` | — |
| `--ui-primary-color` | — |
| `--ui-primary-focus-ring` | — |

---

## `<ui-radio>`

- **Tag**: `<ui-radio>`
- **Class**: `UiRadio`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiRadio } from 'storybook-lit';
```

### Usage

```html
<ui-radio></ui-radio>
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
| `ui-radio-select` | `{ value: this.value }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-radio-disabled-opacity` | `0.5` |
| `--ui-radio-group-gap` | `8px` |
| `--ui-radio-size` | `18px` |
| `--ui-radio-gap` | `8px` |
| `--ui-radio-size-sm` | `14px` |
| `--ui-radio-size-lg` | `22px` |
| `--ui-radio-dot-size` | `8px` |
| `--ui-radio-dot-size-sm` | `6px` |
| `--ui-radio-dot-size-lg` | `10px` |
| `--ui-radio-label-font-size` | `14px` |
| `--ui-radio-label-font-size-sm` | `12px` |
| `--ui-radio-label-font-size-lg` | `16px` |

### Methods

| Method | Description |
| --- | --- |
| `focus(options?: FocusOptions)` |  |

---
