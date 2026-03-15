# Radio

<Demo label="Basic" html='<flint-radio-group value="a">  <flint-radio value="a" label="Option A"></flint-radio>  <flint-radio value="b" label="Option B"></flint-radio>  <flint-radio value="c" label="Option C"></flint-radio></flint-radio-group>' />

<Demo label="Disabled" html='<flint-radio-group value="x">  <flint-radio value="x" label="Selected" disabled></flint-radio>  <flint-radio value="y" label="Disabled" disabled></flint-radio></flint-radio-group>' />

## `<flint-radio-group>`

Radio Group: manages a set of radio buttons with single selection.

- **Tag**: `<flint-radio-group>`
- **Class**: `FlintRadioGroup`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintRadioGroup } from '@getufy/flint-ui';
```

### Usage

```html
<flint-radio-group></flint-radio-group>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | `string` | `''` | Accessible label for the radio group. |
| `name` | `name` | `string` | `''` | Form field name for all radios in the group. |
| `value` | `value` | `string` | `''` | Currently selected radio value. |
| `defaultValue` | `default-value` | `string` | `''` | Initial value for uncontrolled usage. |
| `disabled` | `disabled` | `boolean` | `false` | Disables all radios in the group. |
| `required` | `required` | `boolean` | `false` | Marks the group as required for form validation. |
| `orientation` | `orientation` | `RadioOrientation` | `'vertical'` | Layout direction of the radio buttons. |
| `size` | `size` | `RadioSize` | `'md'` | Size of the radio buttons. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-radio-group-change` | — | Fired when the selected radio value changes. |

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

Radio: a single radio button within a radio group.

- **Tag**: `<flint-radio>`
- **Class**: `FlintRadio`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintRadio } from '@getufy/flint-ui';
```

### Usage

```html
<flint-radio></flint-radio>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `checked` | `checked` | `boolean` | `false` | Whether this radio is selected. |
| `disabled` | `disabled` | `boolean` | `false` | Disables this radio and prevents interaction. |
| `required` | `required` | `boolean` | `false` | Whether this radio is required. |
| `name` | `name` | `string` | `''` | Form field name (usually set by the parent group). |
| `value` | `value` | `string` | `''` | Value associated with this radio option. |
| `label` | `label` | `string` | `''` | Visible label text for this radio option. |
| `size` | `size` | `RadioSize` | `'md'` | Size of the radio button. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-radio-select` | — | Fired when this radio is selected. |

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

---
