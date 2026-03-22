# Date Range Picker

<Demo label="Basic" html='<flint-date-range-picker label="Date range" style="width:340px"></flint-date-range-picker>' />

<Demo label="With Shortcuts" html='<flint-date-range-picker label="Date range" shortcuts style="width:340px"></flint-date-range-picker>' />

<Demo label="Static with Shortcuts" html='<flint-date-range-picker variant="static" shortcuts></flint-date-range-picker>' />

## `<flint-date-range-calendar>`

A dual-month calendar for range selection.
Shows two months side-by-side (or stacked on narrow screens).

- **Tag**: `<flint-date-range-calendar>`
- **Class**: `FlintDateRangeCalendar`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintDateRangeCalendar } from '@getufy/flint-ui';
```

### Usage

```html
<flint-date-range-calendar></flint-date-range-calendar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `DateRange` | `[...EMPTY_RANGE]` | Current selected range [startISO, endISO]. |
| `min` | `min` | `string` | `''` | Minimum selectable date (ISO YYYY-MM-DD). |
| `max` | `max` | `string` | `''` | Maximum selectable date (ISO YYYY-MM-DD). |
| `disabled` | `disabled` | `boolean` | `false` | Disables the calendar and prevents date selection. |
| `locale` | `locale` | `string` | `''` | BCP 47 locale for month/day names (e.g. "en-US", "fr"). Uses browser default when unset. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-date-range-picker-select` | `&#123; value: DateRange &#125;` | &#123; detail: &#123; value: DateRange &#125; &#125; on each click |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |

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
| `--flint-datepicker-z-index` | `1400` |
| `--flint-border-radius-xl` | — |
| `--flint-shadow-lg` | — |
| `--flint-shadow-sm` | — |
| `--flint-error-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-error-focus-ring` | — |

### Methods

| Method | Description |
| --- | --- |
| `navigateTo(iso: string): void` | Navigate the calendar view to the month containing the given ISO date. |

---

## `<flint-date-range-picker>`

A date range picker combining a segmented field and a dual-month calendar.

- **Tag**: `<flint-date-range-picker>`
- **Class**: `FlintDateRangePicker`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintDateRangePicker } from '@getufy/flint-ui';
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
| `shortcutItems` | `shortcutItems` | `Shortcut[]` | `[]` | Custom shortcuts list. Defaults to built-in shortcuts when shortcuts=true. |
| `min` | `min` | `string` | `''` | Minimum selectable date (ISO YYYY-MM-DD). |
| `max` | `max` | `string` | `''` | Maximum selectable date (ISO YYYY-MM-DD). |
| `name` | `name` | `string` | `''` | Form field name for hidden inputs. |
| `locale` | `locale` | `string` | `''` | BCP 47 locale for date formatting and month/day names (e.g. "en-US", "fr"). Uses browser default when unset. |
| `disabled` | `disabled` | `boolean` | `false` | Disables the picker and prevents interaction. |
| `readonly` | `readonly` | `boolean` | `false` | Makes the picker read-only (visible but not editable). |
| `error` | `error` | `boolean` | `false` | Displays the picker in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Helper text shown below the field. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the field when in error state. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-date-range-picker-change` | `&#123; value: DateRange &#125;` | &#123; detail: &#123; value: DateRange &#125; &#125; when range is committed |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |
| `popover` | The popover element. |
| `shortcuts` | The shortcuts element. |

---

## `<flint-single-input-date-range-field>`

A single-input field for entering a date range (start → end).
Renders as "MM/DD/YYYY – MM/DD/YYYY" with six independently editable segments.

- **Tag**: `<flint-single-input-date-range-field>`
- **Class**: `FlintSingleInputDateRangeField`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintSingleInputDateRangeField } from '@getufy/flint-ui';
```

### Usage

```html
<flint-single-input-date-range-field></flint-single-input-date-range-field>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `DateRange` | `[...EMPTY_RANGE]` | Controlled range value [startISO, endISO]. |
| `label` | `label` | `string` | `''` | Field label text. |
| `name` | `name` | `string` | `''` | Form field name used for hidden inputs. |
| `min` | `min` | `string` | `''` | Minimum allowed date (ISO YYYY-MM-DD). |
| `max` | `max` | `string` | `''` | Maximum allowed date (ISO YYYY-MM-DD). |
| `disabled` | `disabled` | `boolean` | `false` | Disables the field and prevents interaction. |
| `readonly` | `readonly` | `boolean` | `false` | Makes the field read-only (visible but not editable). |
| `error` | `error` | `boolean` | `false` | Displays the field in an error state. |
| `helperText` | `helper-text` | `string` | `''` | Helper text shown below the field. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the field when in error state. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-date-range-picker-clear` | — | fired when all segments are cleared |
| `flint-date-range-picker-change` | `&#123; value: DateRange &#125;` | &#123; detail: &#123; value: DateRange &#125; &#125; when both dates are complete |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |

### Methods

| Method | Description |
| --- | --- |
| `setRange(range: DateRange): void` |  |
| `clear(): void` |  |

---
