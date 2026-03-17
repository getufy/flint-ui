# Input Otp

<Demo label="6-digit code" html='<flint-input-otp length="6">  <flint-input-otp-group>    <flint-input-otp-slot index="0"></flint-input-otp-slot>    <flint-input-otp-slot index="1"></flint-input-otp-slot>    <flint-input-otp-slot index="2"></flint-input-otp-slot>  </flint-input-otp-group>  <flint-input-otp-separator></flint-input-otp-separator>  <flint-input-otp-group>    <flint-input-otp-slot index="3"></flint-input-otp-slot>    <flint-input-otp-slot index="4"></flint-input-otp-slot>    <flint-input-otp-slot index="5"></flint-input-otp-slot>  </flint-input-otp-group></flint-input-otp>' />

<Demo label="4-digit code" html='<flint-input-otp length="4">  <flint-input-otp-group>    <flint-input-otp-slot index="0"></flint-input-otp-slot>    <flint-input-otp-slot index="1"></flint-input-otp-slot>    <flint-input-otp-slot index="2"></flint-input-otp-slot>    <flint-input-otp-slot index="3"></flint-input-otp-slot>  </flint-input-otp-group></flint-input-otp>' />

## `<flint-input-otp-group>`

Visual grouping wrapper for `flint-input-otp-slot` elements.
Renders slots inline with shared borders.

- **Tag**: `<flint-input-otp-group>`
- **Class**: `FlintInputOtpGroup`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintInputOtpGroup } from '@getufy/flint-ui';
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
| `--flint-text-color` | — |
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

Visual separator between `flint-input-otp-group` elements.
Renders a short horizontal bar.

- **Tag**: `<flint-input-otp-separator>`
- **Class**: `FlintInputOtpSeparator`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintInputOtpSeparator } from '@getufy/flint-ui';
```

### Usage

```html
<flint-input-otp-separator></flint-input-otp-separator>
```

---

## `<flint-input-otp-slot>`

A single character cell in an OTP input.
Place inside `flint-input-otp-group`. State is managed by `flint-input-otp`.

- **Tag**: `<flint-input-otp-slot>`
- **Class**: `FlintInputOtpSlot`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintInputOtpSlot } from '@getufy/flint-ui';
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

Accessible one-time password input with copy/paste support.
Manages a hidden native `<input>` and syncs each `flint-input-otp-slot`
with the appropriate character and active-cursor state.

- **Tag**: `<flint-input-otp>`
- **Class**: `FlintInputOtp`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintInputOtp } from '@getufy/flint-ui';
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
| `pattern` | `pattern` | `string` | `''` | Per-character regex pattern string. Characters failing the test are |
| `disabled` | `disabled` | `boolean` | `false` | Disables the OTP input. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |
| `required` | `required` | `boolean` | `false` | Marks the OTP input as required for form validation. |
| `label` | `label` | `string` | `'One-time password'` | Accessible label for the hidden input (used as aria-label). |
| `description` | `description` | `string` | `''` | Optional description text for the hidden input (used as aria-describedby). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-otp-change` | `&#123; value: string &#125;` | Fired on every value change. `detail: &#123; value: string &#125;`. |
| `flint-otp-complete` | `&#123; value: string &#125;` | Fired when `maxLength` chars have been entered. `detail: &#123; value: string &#125;`. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Accepts `flint-input-otp-group`, `flint-input-otp-separator`, and `flint-input-otp-slot` elements. |

---
