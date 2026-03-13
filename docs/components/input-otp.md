# Input Otp

<Demo label="6-digit code">

<ui-input-otp length="6">
  <ui-input-otp-group>
    <ui-input-otp-slot index="0"></ui-input-otp-slot>
    <ui-input-otp-slot index="1"></ui-input-otp-slot>
    <ui-input-otp-slot index="2"></ui-input-otp-slot>
  </ui-input-otp-group>
  <ui-input-otp-separator></ui-input-otp-separator>
  <ui-input-otp-group>
    <ui-input-otp-slot index="3"></ui-input-otp-slot>
    <ui-input-otp-slot index="4"></ui-input-otp-slot>
    <ui-input-otp-slot index="5"></ui-input-otp-slot>
  </ui-input-otp-group>
</ui-input-otp>

</Demo>

<Demo label="4-digit code">

<ui-input-otp length="4">
  <ui-input-otp-group>
    <ui-input-otp-slot index="0"></ui-input-otp-slot>
    <ui-input-otp-slot index="1"></ui-input-otp-slot>
    <ui-input-otp-slot index="2"></ui-input-otp-slot>
    <ui-input-otp-slot index="3"></ui-input-otp-slot>
  </ui-input-otp-group>
</ui-input-otp>

</Demo>

## `<ui-input-otp-group>`

Visual grouping wrapper for `ui-input-otp-slot` elements. Renders slots inline with shared borders.

- **Tag**: `<ui-input-otp-group>`
- **Class**: `UiInputOtpGroup`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiInputOtpGroup } from 'storybook-lit';
```

### Usage

```html
<ui-input-otp-group></ui-input-otp-group>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `ui-input-otp-slot` elements. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-text-color` | `#111827` |
| `--ui-otp-slot-width` | `40px` |
| `--ui-otp-slot-height` | `48px` |
| `--ui-otp-slot-font-size` | `1.25rem` |
| `--ui-font-family` | — |
| `--ui-input-bg` | — |
| `--ui-input-border-color` | — |
| `--ui-otp-slot-radius` | `6px` |
| `--ui-primary-color` | — |
| `--ui-primary-focus-ring` | — |
| `--ui-error-color` | — |
| `--ui-error-focus-ring` | — |
| `--ui-otp-gap` | `8px` |

---

## `<ui-input-otp-separator>`

Visual separator between `ui-input-otp-group` elements. Renders a short horizontal bar.

- **Tag**: `<ui-input-otp-separator>`
- **Class**: `UiInputOtpSeparator`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiInputOtpSeparator } from 'storybook-lit';
```

### Usage

```html
<ui-input-otp-separator></ui-input-otp-separator>
```

---

## `<ui-input-otp-slot>`

A single character cell in an OTP input. Place inside `ui-input-otp-group`. State is managed by `ui-input-otp`.

- **Tag**: `<ui-input-otp-slot>`
- **Class**: `UiInputOtpSlot`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiInputOtpSlot } from 'storybook-lit';
```

### Usage

```html
<ui-input-otp-slot></ui-input-otp-slot>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `index` | `index` | `number` | `0` | Zero-based position index of this slot. |
| `char` | `char` | `string` | `''` | Character displayed. Set by the parent `ui-input-otp`. |
| `active` | `active` | `boolean` | `false` | Whether the cursor is at this position. Set by the parent `ui-input-otp`. |
| `invalid` | `invalid` | `boolean` | `false` | Error / invalid state. |

---

## `<ui-input-otp>`

- **Tag**: `<ui-input-otp>`
- **Class**: `UiInputOtp`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiInputOtp } from 'storybook-lit';
```

### Usage

```html
<ui-input-otp></ui-input-otp>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Current OTP value. Reflects to attribute for external observation. |
| `defaultValue` | `default-value` | `string` | `''` | Initial uncontrolled value. Has no effect after the first render. |
| `maxLength` | `max-length` | `number` | `6` | Total number of character slots. |
| `pattern` | `pattern` | `string` | `''` |  |
| `disabled` | `disabled` | `boolean` | `false` | Disables the OTP input. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-otp-change` | `{ value: newVal }` |  |
| `ui-otp-complete` | `{ value: newVal }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---
