# Date Range Picker

<Demo label="Basic" html="<flint-date-range-picker label=&quot;Date range&quot; style=&quot;width:340px&quot;></flint-date-range-picker>" />

<Demo label="With Shortcuts" html="<flint-date-range-picker label=&quot;Date range&quot; shortcuts style=&quot;width:340px&quot;></flint-date-range-picker>" />

<Demo label="Static with Shortcuts" html="<flint-date-range-picker variant=&quot;static&quot; shortcuts></flint-date-range-picker>" />

## `<flint-date-range-calendar>`

A dual-month calendar for range selection. Shows two months side-by-side (or stacked on narrow screens).

- **Tag**: `<flint-date-range-calendar>`
- **Class**: `FlintDateRangeCalendar`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintDateRangeCalendar } from 'flint-ui';
```

### Usage

```html
<flint-date-range-calendar></flint-date-range-calendar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `DateRange` | `[...EMPTY_RANGE]` | Current selected range [startISO, endISO]. |
| `min` | `min` | `string` | `''` |  |
| `max` | `max` | `string` | `''` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `range-select` | — | { detail: { value: DateRange } } on each click |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-font-family` | — |
| `--flint-surface-1` | — |
| `--flint-border-color` | — |
| `--flint-text-color` | — |
| `--flint-text-color-muted` | — |
| `--flint-hover-color` | — |
| `--flint-primary-color-light` | — |
| `--flint-primary-color` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-primary-color-hover` | — |
| `--flint-input-bg` | — |
| `--flint-border-radius-md` | — |
| `--flint-input-disabled-bg` | — |
| `--flint-input-placeholder-color` | — |
| `--flint-border-radius-xl` | — |
| `--flint-shadow-lg` | — |
| `--flint-shadow-sm` | — |
| `--flint-error-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-error-focus-ring` | — |

### Methods

| Method | Description |
| --- | --- |
| `navigateTo(iso: string)` | Navigate the calendar view to the month containing the given ISO date. |

---

## `<flint-date-range-picker>`

A date range picker combining a segmented field and a dual-month calendar.

- **Tag**: `<flint-date-range-picker>`
- **Class**: `FlintDateRangePicker`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintDateRangePicker } from 'flint-ui';
```

### Usage

```html
<flint-date-range-picker></flint-date-range-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `DateRange` | `[...EMPTY_RANGE]` | Selected range [startISO, endISO]. Empty strings mean unset. |
| `label` | `label` | `string` | `'Date Range'` | Label shown above the field. |
| `variant` | `variant` | `'desktop' \| 'mobile' \| 'static' \| 'auto'` | `'desktop'` | Variant: 'desktop' \| 'mobile' \| 'static' \| 'auto'. |
| `multiInput` | `multi-input` | `boolean` | `false` | Use a multi-input field (two separate fields) instead of single-input. Currently shows two simple text displays. |
| `shortcuts` | `shortcuts` | `boolean` | `false` | Show shortcuts panel. |
| `shortcutItems` | `shortcut-items` | `Shortcut[]` | `[]` | Custom shortcuts list. Defaults to built-in shortcuts when shortcuts=true. |
| `min` | `min` | `string` | `''` |  |
| `max` | `max` | `string` | `''` |  |
| `name` | `name` | `string` | `''` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `readonly` | `readonly` | `boolean` | `false` |  |
| `error` | `error` | `boolean` | `false` |  |
| `helperText` | `helper-text` | `string` | `''` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `range-change` | — | { detail: { value: DateRange } } when range is committed |

---

## `<flint-single-input-date-range-field>`

A single-input field for entering a date range (start → end). Renders as "MM/DD/YYYY – MM/DD/YYYY" with six independently editable segments.

- **Tag**: `<flint-single-input-date-range-field>`
- **Class**: `FlintSingleInputDateRangeField`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintSingleInputDateRangeField } from 'flint-ui';
```

### Usage

```html
<flint-single-input-date-range-field></flint-single-input-date-range-field>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `DateRange` | `[...EMPTY_RANGE]` | Controlled range value [startISO, endISO]. |
| `label` | `label` | `string` | `''` |  |
| `name` | `name` | `string` | `''` |  |
| `min` | `min` | `string` | `''` |  |
| `max` | `max` | `string` | `''` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `readonly` | `readonly` | `boolean` | `false` |  |
| `error` | `error` | `boolean` | `false` |  |
| `helperText` | `helper-text` | `string` | `''` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `range-change` | — | { detail: { value: DateRange } } when both dates are complete |
| `range-clear` | — | fired when all segments are cleared |

### Methods

| Method | Description |
| --- | --- |
| `setRange(range: DateRange)` |  |
| `clear()` |  |

---
