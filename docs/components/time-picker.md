# Time Picker

<Demo label="Desktop (Digital Clock Popover)" html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap&quot;><flint-time-picker label=&quot;Time&quot; value=&quot;14:30:00&quot; style=&quot;width:200px&quot;></flint-time-picker><flint-time-picker label=&quot;With Seconds&quot; value=&quot;09:15:45&quot; seconds style=&quot;width:200px&quot;></flint-time-picker><flint-time-picker label=&quot;Disabled&quot; disabled value=&quot;08:00:00&quot; style=&quot;width:200px&quot;></flint-time-picker></div>" />

<Demo label="Mobile (Analog Clock Dialog)" html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap&quot;><flint-time-picker label=&quot;Tap to open clock&quot; variant=&quot;mobile&quot; value=&quot;10:30:00&quot; style=&quot;width:200px&quot;></flint-time-picker><flint-time-picker label=&quot;With Seconds&quot; variant=&quot;mobile&quot; value=&quot;15:45:30&quot; seconds style=&quot;width:200px&quot;></flint-time-picker></div>" />

<Demo label="Analog Clock (Standalone)" html="<div style=&quot;display:flex;gap:24px;flex-wrap:wrap;align-items:start&quot;><flint-time-clock value=&quot;10:10:00&quot; ampm></flint-time-clock><flint-time-clock value=&quot;15:45:00&quot;></flint-time-clock></div>" />

<Demo label="Digital Clock" html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap&quot;><flint-digital-clock value=&quot;14:30:00&quot; ampm></flint-digital-clock><flint-digital-clock value=&quot;09:15:00&quot;></flint-digital-clock></div>" />

<Demo label="Multi-Section Digital Clock" html="<flint-multi-section-digital-clock value=&quot;14:30:00&quot; ampm></flint-multi-section-digital-clock>" />

<Demo label="Static Time Picker" html="<flint-static-time-picker value=&quot;11:00:00&quot; ampm></flint-static-time-picker>" />

## `<flint-time-field>`

- **Tag**: `<flint-time-field>`
- **Class**: `FlintTimeField`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTimeField } from 'flint-ui';
```

### Usage

```html
<flint-time-field></flint-time-field>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Time value in HH:MM:SS format. |
| `label` | `label` | `string` | `''` | Label text displayed above the field. |
| `ampm` | `ampm` | `boolean` | `true` | Enables 12-hour format with AM/PM. |
| `seconds` | `seconds` | `boolean` | `false` | Shows the seconds segment. |
| `disabled` | `disabled` | `boolean` | `false` | Prevents user interaction. |
| `readonly` | `readonly` | `boolean` | `false` | Makes the field read-only. |
| `error` | `error` | `boolean` | `false` | Displays the field in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Help text displayed below the field. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-time-picker-clear` | — | Fired when the field value is cleared. |
| `change` | `{ value: v }` | Fired when the time value changes. |

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
| `clear()` | Clears the time field value and resets all segments. |

---

## `<flint-digital-clock>`

- **Tag**: `<flint-digital-clock>`
- **Class**: `FlintDigitalClock`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintDigitalClock } from 'flint-ui';
```

### Usage

```html
<flint-digital-clock></flint-digital-clock>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Selected time in HH:MM:SS format. |
| `step` | `step` | `number` | `30` | Interval in minutes between each time option. |
| `ampm` | `ampm` | `boolean` | `true` | Enables 12-hour format with AM/PM. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | `{ value: v }` | Fired when a time option is selected. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-digital-clock-height` | `300px` |

---

## `<flint-multi-section-digital-clock>`

- **Tag**: `<flint-multi-section-digital-clock>`
- **Class**: `FlintMultiSectionDigitalClock`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMultiSectionDigitalClock } from 'flint-ui';
```

### Usage

```html
<flint-multi-section-digital-clock></flint-multi-section-digital-clock>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Selected time in HH:MM:SS format. |
| `ampm` | `ampm` | `boolean` | `true` | Enables 12-hour format with AM/PM. |
| `seconds` | `seconds` | `boolean` | `false` | Shows the seconds column. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | `{ value: v }` | Fired when a time value is selected in any column. |

---

## `<flint-time-clock>`

- **Tag**: `<flint-time-clock>`
- **Class**: `FlintTimeClock`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTimeClock } from 'flint-ui';
```

### Usage

```html
<flint-time-clock></flint-time-clock>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Selected time in HH:MM:SS format. |
| `ampm` | `ampm` | `boolean` | `true` | Enables 12-hour format with AM/PM toggle. |
| `seconds` | `seconds` | `boolean` | `false` | Enables the seconds dial on the clock face. |
| `view` | `view` | `TimeView` | `'hours'` | Currently displayed clock face (hours, minutes, or seconds). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | `{ value: v }` | Fired when the selected time changes. |
| `flint-time-clock-view-change` | `{ view: v }` | Fired when the clock face view changes. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-time-clock-face-bg` | `var(--flint-surface-variant, #f1f5f9` |
| `--flint-time-clock-inner-bg` | `rgba(0,0,0,.04` |
| `--flint-time-clock-inner-border` | `var(--flint-border-color, #e5e7eb` |
| `--flint-time-clock-hand-color` | `var(--flint-primary-color, #3b82f6` |
| `--flint-time-clock-num-size` | `14px` |
| `--flint-time-clock-inner-num-size` | `12px` |
| `--flint-time-clock-ampm-radius` | `20px` |

---

## `<flint-desktop-time-picker>`

- **Tag**: `<flint-desktop-time-picker>`
- **Class**: `FlintDesktopTimePicker`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintDesktopTimePicker } from 'flint-ui';
```

### Usage

```html
<flint-desktop-time-picker></flint-desktop-time-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Selected time in HH:MM:SS format. |
| `label` | `label` | `string` | `'Time'` | Label text displayed above the time field. |
| `ampm` | `ampm` | `boolean` | `true` | Enables 12-hour format with AM/PM. |
| `seconds` | `seconds` | `boolean` | `false` | Shows the seconds segment. |
| `disabled` | `disabled` | `boolean` | `false` | Prevents user interaction. |
| `readonly` | `readonly` | `boolean` | `false` | Makes the field read-only. |
| `error` | `error` | `boolean` | `false` | Displays the field in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Help text displayed below the field. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | `{ value: v }` | Fired when a time is confirmed via the OK button. |

---

## `<flint-mobile-time-picker>`

- **Tag**: `<flint-mobile-time-picker>`
- **Class**: `FlintMobileTimePicker`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMobileTimePicker } from 'flint-ui';
```

### Usage

```html
<flint-mobile-time-picker></flint-mobile-time-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Selected time in HH:MM:SS format. |
| `label` | `label` | `string` | `'Time'` | Label text displayed above the time field. |
| `ampm` | `ampm` | `boolean` | `true` | Enables 12-hour format with AM/PM. |
| `seconds` | `seconds` | `boolean` | `false` | Shows the seconds dial on the analog clock. |
| `disabled` | `disabled` | `boolean` | `false` | Prevents user interaction. |
| `error` | `error` | `boolean` | `false` | Displays the field in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Help text displayed below the field. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — | Fired when a time is confirmed via the OK button. |

---

## `<flint-static-time-picker>`

- **Tag**: `<flint-static-time-picker>`
- **Class**: `FlintStaticTimePicker`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintStaticTimePicker } from 'flint-ui';
```

### Usage

```html
<flint-static-time-picker></flint-static-time-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Selected time in HH:MM:SS format. |
| `ampm` | `ampm` | `boolean` | `true` | Enables 12-hour format with AM/PM. |
| `seconds` | `seconds` | `boolean` | `false` | Shows the seconds column. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — | Fired when the selected time changes. |

---

## `<flint-time-picker>`

- **Tag**: `<flint-time-picker>`
- **Class**: `FlintTimePicker`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintTimePicker } from 'flint-ui';
```

### Usage

```html
<flint-time-picker></flint-time-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Selected time in HH:MM:SS format. |
| `label` | `label` | `string` | `'Time'` | Label text displayed above the time field. |
| `variant` | `variant` | `'desktop' \| 'mobile' \| 'static' \| 'auto'` | `'desktop'` | Picker variant; 'auto' selects based on pointer type. |
| `ampm` | `ampm` | `boolean` | `true` | Enables 12-hour format with AM/PM. |
| `seconds` | `seconds` | `boolean` | `false` | Shows the seconds segment. |
| `disabled` | `disabled` | `boolean` | `false` | Prevents user interaction. |
| `error` | `error` | `boolean` | `false` | Displays the field in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Help text displayed below the field. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — | Fired when the selected time changes. |

---
