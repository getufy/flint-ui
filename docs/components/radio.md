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
| `label` | `label` | `string` | `''` | Accessible label for the radio group (aria-label). |
| `name` | `name` | `string` | `''` | Form control name, propagated to child radios. |
| `value` | `value` | `string` | `''` | Currently selected radio value. |
| `defaultValue` | `default-value` | `string` | `''` | Initial value for uncontrolled mode; ignored after first render. |
| `disabled` | `disabled` | `boolean` | `false` | Disables all radios in the group. |
| `required` | `required` | `boolean` | `false` | Marks the group as required for form validation. |
| `orientation` | `orientation` | `RadioOrientation` | `'vertical'` | Layout direction of the radio items. |
| `size` | `size` | `RadioSize` | `'md'` | Size of the radio buttons (sm, md, or lg). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-radio-group-change` | `{ value }` | Fired when the selected radio value changes. |

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
| `checked` | `checked` | `boolean` | `false` | Whether this radio is currently selected. |
| `disabled` | `disabled` | `boolean` | `false` | Disables this radio option. |
| `required` | `required` | `boolean` | `false` | Marks this radio as required for form validation. |
| `name` | `name` | `string` | `''` | Form control name for the underlying input. |
| `value` | `value` | `string` | `''` | Value submitted when this radio is selected. |
| `label` | `label` | `string` | `''` | Visible text label displayed next to the radio. |
| `size` | `size` | `RadioSize` | `'md'` | Size of the radio button (sm, md, or lg). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-radio-select` | `{ value: this.value }` | Fired when this radio is selected by the user. |

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
| `focus(options?: FocusOptions)` | Moves focus to the internal radio input element. |

---
