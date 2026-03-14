# Time Picker

<Demo label="Desktop (Digital Clock Popover)" html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap&quot;><flint-time-picker label=&quot;Time&quot; value=&quot;14:30:00&quot; style=&quot;width:200px&quot;></flint-time-picker><flint-time-picker label=&quot;With Seconds&quot; value=&quot;09:15:45&quot; seconds style=&quot;width:200px&quot;></flint-time-picker><flint-time-picker label=&quot;Disabled&quot; disabled value=&quot;08:00:00&quot; style=&quot;width:200px&quot;></flint-time-picker></div>" />

<Demo label="Mobile (Analog Clock Dialog)" html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap&quot;><flint-time-picker label=&quot;Tap to open clock&quot; variant=&quot;mobile&quot; value=&quot;10:30:00&quot; style=&quot;width:200px&quot;></flint-time-picker><flint-time-picker label=&quot;With Seconds&quot; variant=&quot;mobile&quot; value=&quot;15:45:30&quot; seconds style=&quot;width:200px&quot;></flint-time-picker></div>" />

<Demo label="Analog Clock (Standalone)" html="<div style=&quot;display:flex;gap:24px;flex-wrap:wrap;align-items:start&quot;><flint-time-clock value=&quot;10:10:00&quot; ampm></flint-time-clock><flint-time-clock value=&quot;15:45:00&quot;></flint-time-clock></div>" />

<Demo label="Digital Clock" html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap&quot;><flint-digital-clock value=&quot;14:30:00&quot; ampm></flint-digital-clock><flint-digital-clock value=&quot;09:15:00&quot;></flint-digital-clock></div>" />

<Demo label="Multi-Section Digital Clock" html="<flint-multi-section-digital-clock value=&quot;14:30:00&quot; ampm></flint-multi-section-digital-clock>" />

<Demo label="Static Time Picker" html="<flint-static-time-picker value=&quot;11:00:00&quot; ampm></flint-static-time-picker>" />

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
| `value` | `value` | `string` | `''` | Time value in HH:MM:SS format. |
| `label` | `label` | `string` | `''` | Field label text. |
| `ampm` | `ampm` | `boolean` | `true` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| `seconds` | `seconds` | `boolean` | `false` | Whether to show a seconds segment. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the field and prevents interaction. |
| `readonly` | `readonly` | `boolean` | `false` | Makes the field read-only (visible but not editable). |
| `error` | `error` | `boolean` | `false` | Displays the field in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Helper text shown below the field. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — | Fired when the time value changes. |
| `flint-time-picker-clear` | — | Fired when the clear button is clicked. |

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
| `clear()` |  |

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
| `change` | — | Fired when a time slot is selected. |

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
| `change` | — | Fired when the time value changes. |

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
| `change` | — | Fired when the time value changes. |
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

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — | Fired when the time value changes. |

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
| `value` | `value` | `string` | `''` | Time value in HH:MM:SS format. |
| `label` | `label` | `string` | `'Time'` | Field label text. |
| `ampm` | `ampm` | `boolean` | `true` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| `seconds` | `seconds` | `boolean` | `false` | Whether to show a seconds segment. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the picker and prevents interaction. |
| `error` | `error` | `boolean` | `false` | Displays the picker in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Helper text shown below the field. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — | Fired when the time value changes. |

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
| `change` | — | Fired when the time value changes. |

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
| `value` | `value` | `string` | `''` | Time value in HH:MM:SS format. |
| `label` | `label` | `string` | `'Time'` | Field label text. |
| `variant` | `variant` | `'desktop' \| 'mobile' \| 'static' \| 'auto'` | `'desktop'` | Picker variant controlling the UI style. |
| `ampm` | `ampm` | `boolean` | `true` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| `seconds` | `seconds` | `boolean` | `false` | Whether to show a seconds segment. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the picker and prevents interaction. |
| `error` | `error` | `boolean` | `false` | Displays the picker in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Helper text shown below the field. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — | Fired when the time value changes. |

---
