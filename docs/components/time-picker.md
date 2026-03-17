# Time Picker

<Demo label="Desktop (Digital Clock Popover)" html='<div style="display:flex;gap:16px;flex-wrap:wrap"><flint-time-picker label="Time" value="14:30:00" style="width:200px"></flint-time-picker><flint-time-picker label="With Seconds" value="09:15:45" seconds style="width:200px"></flint-time-picker><flint-time-picker label="Disabled" disabled value="08:00:00" style="width:200px"></flint-time-picker></div>' />

<Demo label="Mobile (Analog Clock Dialog)" html='<div style="display:flex;gap:16px;flex-wrap:wrap"><flint-time-picker label="Tap to open clock" variant="mobile" value="10:30:00" style="width:200px"></flint-time-picker><flint-time-picker label="With Seconds" variant="mobile" value="15:45:30" seconds style="width:200px"></flint-time-picker></div>' />

<Demo label="Analog Clock (Standalone)" html='<div style="display:flex;gap:24px;flex-wrap:wrap;align-items:start"><flint-time-clock value="10:10:00" ampm></flint-time-clock><flint-time-clock value="15:45:00"></flint-time-clock></div>' />

<Demo label="Digital Clock" html='<div style="display:flex;gap:16px;flex-wrap:wrap"><flint-digital-clock value="14:30:00" ampm></flint-digital-clock><flint-digital-clock value="09:15:00"></flint-digital-clock></div>' />

<Demo label="Multi-Section Digital Clock" html='<flint-multi-section-digital-clock value="14:30:00" ampm></flint-multi-section-digital-clock>' />

<Demo label="Static Time Picker" html='<flint-static-time-picker value="11:00:00" ampm></flint-static-time-picker>' />

## `<flint-time-field>`

Time Field: a segmented time input with keyboard navigation.

- **Tag**: `<flint-time-field>`
- **Class**: `FlintTimeField`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTimeField } from '@getufy/flint-ui';
```

### Usage

```html
<flint-time-field></flint-time-field>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `shadowRootOptions` | `shadowRootOptions` | `object` | `&#123; ...LitElement.shadowRootOptions, delegatesFocus: true &#125;` |  |
| `value` | `value` | `string` | `''` | Time value in HH:MM:SS format. |
| `label` | `label` | `string` | `''` | Field label text. |
| `ampm` | `ampm` | `boolean` | `true` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| `seconds` | `seconds` | `boolean` | `false` | Whether to show a seconds segment. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the field and prevents interaction. |
| `readonly` | `readonly` | `boolean` | `false` | Makes the field read-only (visible but not editable). |
| `error` | `error` | `boolean` | `false` | Displays the field in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Helper text shown below the field. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the field when in error state. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-time-picker-clear` | — | Fired when the clear button is clicked. |
| `flint-time-field-change` | `&#123; value: string &#125;` | Fired when the time value changes. detail: `&#123; value: string &#125;` |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-time-field-height` | `44px` |
| `--flint-time-field-min-width` | `160px` |
| `--flint-font-family` | — |
| `--flint-text-color` | — |
| `--flint-hover-color` | — |
| `--flint-primary-color` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-border-radius-xl` | — |
| `--flint-msdc-height` | `240px` |
| `--flint-surface-1` | — |
| `--flint-border-color` | — |
| `--flint-text-color-muted` | — |
| `--flint-error-color` | — |
| `--flint-input-bg` | — |
| `--flint-border-radius-md` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-input-disabled-bg` | — |

### Methods

| Method | Description |
| --- | --- |
| `clear(): void` |  |

---

## `<flint-digital-clock>`

Digital Clock: a scrollable time-slot picker.

- **Tag**: `<flint-digital-clock>`
- **Class**: `FlintDigitalClock`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintDigitalClock } from '@getufy/flint-ui';
```

### Usage

```html
<flint-digital-clock></flint-digital-clock>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Time value in HH:MM:SS format. |
| `step` | `step` | `number` | `30` | Step interval in minutes between selectable times. |
| `ampm` | `ampm` | `boolean` | `true` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-digital-clock-change` | `&#123; value: string &#125;` | Fired when a time slot is selected. detail: `&#123; value: string &#125;` |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-digital-clock-height` | `300px` |

---

## `<flint-multi-section-digital-clock>`

Multi Section Digital Clock: hours, minutes, and optional seconds columns.

- **Tag**: `<flint-multi-section-digital-clock>`
- **Class**: `FlintMultiSectionDigitalClock`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMultiSectionDigitalClock } from '@getufy/flint-ui';
```

### Usage

```html
<flint-multi-section-digital-clock></flint-multi-section-digital-clock>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Time value in HH:MM:SS format. |
| `ampm` | `ampm` | `boolean` | `true` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| `seconds` | `seconds` | `boolean` | `false` | Whether to show a seconds column. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-multi-section-digital-clock-change` | `&#123; value: string &#125;` | Fired when the time value changes. detail: `&#123; value: string &#125;` |

---

## `<flint-time-clock>`

Time Clock: an analog clock face for selecting hours, minutes, and seconds.

- **Tag**: `<flint-time-clock>`
- **Class**: `FlintTimeClock`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTimeClock } from '@getufy/flint-ui';
```

### Usage

```html
<flint-time-clock></flint-time-clock>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Time value in HH:MM:SS format. |
| `ampm` | `ampm` | `boolean` | `true` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| `seconds` | `seconds` | `boolean` | `false` | Whether to show a seconds face on the clock. |
| `view` | `view` | `TimeView` | `'hours'` | Currently active clock face view. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-time-clock-change` | `&#123; value: string &#125;` | Fired when the time value changes. detail: `&#123; value: string &#125;` |
| `flint-time-clock-view-change` | — | Fired when the clock face view switches. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-time-clock-face-bg` | `var(--flint-surface-variant, #f1f5f9` |
| `--flint-time-clock-inner-bg` | `rgba(0,0,0,.04` |
| `--flint-time-clock-inner-border` | `var(--flint-border-color, #e5e7eb` |
| `--flint-time-clock-hand-color` | `var(--flint-primary-color, #2563eb` |
| `--flint-time-clock-num-size` | `14px` |
| `--flint-time-clock-inner-num-size` | `12px` |
| `--flint-time-clock-ampm-radius` | `20px` |

---

## `<flint-desktop-time-picker>`

Desktop Time Picker: a time field with a dropdown clock.

- **Tag**: `<flint-desktop-time-picker>`
- **Class**: `FlintDesktopTimePicker`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintDesktopTimePicker } from '@getufy/flint-ui';
```

### Usage

```html
<flint-desktop-time-picker></flint-desktop-time-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Time value in HH:MM:SS format. |
| `label` | `label` | `string` | `'Time'` | Field label text. |
| `ampm` | `ampm` | `boolean` | `true` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| `seconds` | `seconds` | `boolean` | `false` | Whether to show a seconds segment. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the picker and prevents interaction. |
| `readonly` | `readonly` | `boolean` | `false` | Makes the field read-only (visible but not editable). |
| `error` | `error` | `boolean` | `false` | Displays the field in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Helper text shown below the field. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the field when in error state. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-desktop-time-picker-change` | `&#123; value: string &#125;` | Fired when the time value changes. detail: `&#123; value: string &#125;` |

---

## `<flint-mobile-time-picker>`

Mobile Time Picker: a time field with a modal clock dialog.

- **Tag**: `<flint-mobile-time-picker>`
- **Class**: `FlintMobileTimePicker`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintMobileTimePicker } from '@getufy/flint-ui';
```

### Usage

```html
<flint-mobile-time-picker></flint-mobile-time-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `dependencies` | `dependencies` | `object` | `&#123; 'flint-dialog': FlintDialog as unknown as typeof FlintElement, 'flint-dialog-title': FlintDialogTitle as unknown as typeof FlintElement, 'flint-dialog-content': FlintDialogContent as unknown as typeof FlintElement, 'flint-dialog-actions': FlintDialogActions as unknown as typeof FlintElement, &#125;` |  |
| `value` | `value` | `string` | `''` | Time value in HH:MM:SS format. |
| `label` | `label` | `string` | `'Time'` | Field label text. |
| `ampm` | `ampm` | `boolean` | `true` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| `seconds` | `seconds` | `boolean` | `false` | Whether to show a seconds segment. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the picker and prevents interaction. |
| `error` | `error` | `boolean` | `false` | Displays the picker in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Helper text shown below the field. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the field when in error state. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-mobile-time-picker-change` | `&#123; value: string &#125;` | Fired when the time value changes. detail: `&#123; value: string &#125;` |

---

## `<flint-static-time-picker>`

Static Time Picker: an always-visible inline clock.

- **Tag**: `<flint-static-time-picker>`
- **Class**: `FlintStaticTimePicker`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintStaticTimePicker } from '@getufy/flint-ui';
```

### Usage

```html
<flint-static-time-picker></flint-static-time-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Time value in HH:MM:SS format. |
| `ampm` | `ampm` | `boolean` | `true` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| `seconds` | `seconds` | `boolean` | `false` | Whether to show a seconds section. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-static-time-picker-change` | `&#123; value: string &#125;` | Fired when the time value changes. detail: `&#123; value: string &#125;` |

---

## `<flint-time-picker>`

Time Picker: a configurable time input supporting desktop, mobile, and static variants.

- **Tag**: `<flint-time-picker>`
- **Class**: `FlintTimePicker`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintTimePicker } from '@getufy/flint-ui';
```

### Usage

```html
<flint-time-picker></flint-time-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `shadowRootOptions` | `shadowRootOptions` | `object` | `&#123; ...LitElement.shadowRootOptions, delegatesFocus: true &#125;` |  |
| `value` | `value` | `string` | `''` | Time value in HH:MM:SS format. |
| `label` | `label` | `string` | `'Time'` | Field label text. |
| `variant` | `variant` | `'desktop' \| 'mobile' \| 'static' \| 'auto'` | `'desktop'` | Picker variant controlling the UI style. |
| `ampm` | `ampm` | `boolean` | `true` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| `seconds` | `seconds` | `boolean` | `false` | Whether to show a seconds segment. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the picker and prevents interaction. |
| `error` | `error` | `boolean` | `false` | Displays the picker in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Helper text shown below the field. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the field when in error state. |
| `name` | `name` | `string` | `''` | Form field name used when submitting form data. |
| `required` | `required` | `boolean` | `false` | Marks the time picker as required for form validation. |
| `defaultValue` | `default-value` | `string` | `''` | Initial value for uncontrolled usage (HH:MM:SS format). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-time-picker-change` | `&#123; value: string &#125;` | Fired when the time value changes. detail: `&#123; value: string &#125;` |

---
