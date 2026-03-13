# Date Range Picker

<Demo label="Basic" html="<ui-date-range-picker label=&quot;Date range&quot; style=&quot;width:340px&quot;></ui-date-range-picker>" />

<Demo label="With Shortcuts" html="<ui-date-range-picker label=&quot;Date range&quot; shortcuts style=&quot;width:340px&quot;></ui-date-range-picker>" />

<Demo label="Static with Shortcuts" html="<ui-date-range-picker variant=&quot;static&quot; shortcuts></ui-date-range-picker>" />

## `<ui-date-range-calendar>`

A dual-month calendar for range selection. Shows two months side-by-side (or stacked on narrow screens).

- **Tag**: `<ui-date-range-calendar>`
- **Class**: `UiDateRangeCalendar`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDateRangeCalendar } from 'storybook-lit';
```

### Usage

```html
<ui-date-range-calendar></ui-date-range-calendar>
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
| `--ui-font-family` | — |
| `--ui-surface-1` | — |
| `--ui-border-color` | — |
| `--ui-text-color` | — |
| `--ui-text-color-muted` | — |
| `--ui-hover-color` | — |
| `--ui-primary-color-light` | — |
| `--ui-primary-color` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-primary-color-hover` | — |
| `--ui-input-bg` | — |
| `--ui-border-radius-md` | — |
| `--ui-input-disabled-bg` | — |
| `--ui-input-placeholder-color` | — |
| `--ui-border-radius-xl` | — |
| `--ui-shadow-lg` | — |
| `--ui-shadow-sm` | — |
| `--ui-error-color` | — |
| `--ui-primary-focus-ring` | — |
| `--ui-error-focus-ring` | — |

### Methods

| Method | Description |
| --- | --- |
| `navigateTo(iso: string)` | Navigate the calendar view to the month containing the given ISO date. |

---

## `<ui-date-range-picker>`

A date range picker combining a segmented field and a dual-month calendar.

- **Tag**: `<ui-date-range-picker>`
- **Class**: `UiDateRangePicker`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDateRangePicker } from 'storybook-lit';
```

### Usage

```html
<ui-date-range-picker></ui-date-range-picker>
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

## `<ui-single-input-date-range-field>`

A single-input field for entering a date range (start → end). Renders as "MM/DD/YYYY – MM/DD/YYYY" with six independently editable segments.

- **Tag**: `<ui-single-input-date-range-field>`
- **Class**: `UiSingleInputDateRangeField`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiSingleInputDateRangeField } from 'storybook-lit';
```

### Usage

```html
<ui-single-input-date-range-field></ui-single-input-date-range-field>
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
