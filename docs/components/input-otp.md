# Input Otp

<Demo label="6-digit code" html="<flint-input-otp length=&quot;6&quot;>  <flint-input-otp-group>    <flint-input-otp-slot index=&quot;0&quot;></flint-input-otp-slot>    <flint-input-otp-slot index=&quot;1&quot;></flint-input-otp-slot>    <flint-input-otp-slot index=&quot;2&quot;></flint-input-otp-slot>  </flint-input-otp-group>  <flint-input-otp-separator></flint-input-otp-separator>  <flint-input-otp-group>    <flint-input-otp-slot index=&quot;3&quot;></flint-input-otp-slot>    <flint-input-otp-slot index=&quot;4&quot;></flint-input-otp-slot>    <flint-input-otp-slot index=&quot;5&quot;></flint-input-otp-slot>  </flint-input-otp-group></flint-input-otp>" />

<Demo label="4-digit code" html="<flint-input-otp length=&quot;4&quot;>  <flint-input-otp-group>    <flint-input-otp-slot index=&quot;0&quot;></flint-input-otp-slot>    <flint-input-otp-slot index=&quot;1&quot;></flint-input-otp-slot>    <flint-input-otp-slot index=&quot;2&quot;></flint-input-otp-slot>    <flint-input-otp-slot index=&quot;3&quot;></flint-input-otp-slot>  </flint-input-otp-group></flint-input-otp>" />

## `<flint-input-otp-group>`

Visual grouping wrapper for `flint-input-otp-slot` elements. Renders slots inline with shared borders.

- **Tag**: `<flint-input-otp-group>`
- **Class**: `FlintInputOtpGroup`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintInputOtpGroup } from 'flint-ui';
```

### Usage

```html
<flint-input-otp-group></flint-input-otp-group>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `flint-input-otp-slot` elements. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-text-color` | `#111827` |
| `--flint-otp-slot-width` | `40px` |
| `--flint-otp-slot-height` | `48px` |
| `--flint-otp-slot-font-size` | `1.25rem` |
| `--flint-font-family` | — |
| `--flint-input-bg` | — |
| `--flint-input-border-color` | — |
| `--flint-otp-slot-radius` | `6px` |
| `--flint-primary-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-error-color` | — |
| `--flint-error-focus-ring` | — |
| `--flint-otp-gap` | `8px` |

---

## `<flint-input-otp-separator>`

Visual separator between `flint-input-otp-group` elements. Renders a short horizontal bar.

- **Tag**: `<flint-input-otp-separator>`
- **Class**: `FlintInputOtpSeparator`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintInputOtpSeparator } from 'flint-ui';
```

### Usage

```html
<flint-input-otp-separator></flint-input-otp-separator>
```

---

## `<flint-input-otp-slot>`

A single character cell in an OTP input. Place inside `flint-input-otp-group`. State is managed by `flint-input-otp`.

- **Tag**: `<flint-input-otp-slot>`
- **Class**: `FlintInputOtpSlot`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintInputOtpSlot } from 'flint-ui';
```

### Usage

```html
<flint-input-otp-slot></flint-input-otp-slot>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `index` | `index` | `number` | `0` | Zero-based position index of this slot. |
| `char` | `char` | `string` | `''` | Character displayed. Set by the parent `flint-input-otp`. |
| `active` | `active` | `boolean` | `false` | Whether the cursor is at this position. Set by the parent `flint-input-otp`. |
| `invalid` | `invalid` | `boolean` | `false` | Error / invalid state. |

---

## `<flint-input-otp>`

- **Tag**: `<flint-input-otp>`
- **Class**: `FlintInputOtp`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintInputOtp } from 'flint-ui';
```

### Usage

```html
<flint-input-otp></flint-input-otp>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Current OTP value. Reflects to attribute for external observation. |
| `defaultValue` | `default-value` | `string` | `''` | Initial uncontrolled value. Has no effect after the first render. |
| `maxLength` | `max-length` | `number` | `6` | Total number of character slots. |
| `pattern` | `pattern` | `string` | `''` |  |
| `disabled` | `disabled` | `boolean` | `false` | Disables the OTP input. |
| `label` | `label` | `string` | `'One-time password'` | Accessible label for the hidden input (used as aria-label). |
| `description` | `description` | `string` | `''` | Optional description text for the hidden input (used as aria-describedby). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-otp-change` | `{ value: newVal }` |  |
| `flint-otp-complete` | `{ value: newVal }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---
