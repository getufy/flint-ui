# Date Picker

<Demo label="States" html='<div style="display:flex;gap:16px;flex-wrap:wrap"><flint-date-picker label="Pick a date" style="width:260px"></flint-date-picker><flint-date-picker label="Disabled" disabled style="width:260px"></flint-date-picker></div>' />

## `<flint-date-picker-calendar>`

A standalone calendar grid — the core date-selection view.
Used internally by flint-date-picker, but can also be used on its own.

- **Tag**: `<flint-date-picker-calendar>`
- **Class**: `FlintDatePickerCalendar`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintDatePickerCalendar } from '@getufy/flint-ui';
```

### Usage

```html
<flint-date-picker-calendar></flint-date-picker-calendar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string \| undefined` | — | Currently selected value as ISO string (YYYY-MM-DD). |
| `min` | `min` | `string \| undefined` | — | Minimum selectable date (ISO). |
| `max` | `max` | `string \| undefined` | — | Maximum selectable date (ISO). |
| `disabled` | `disabled` | `boolean` | `false` | Disable all interaction. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-date-picker-select` | `&#123; value: string &#125;` | &#123; detail: &#123; value: string &#125; &#125; ISO date YYYY-MM-DD |

### CSS Parts

| Name | Description |
| --- | --- |
| `calendar` | The calendar element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-font-family` | — |
| `--flint-surface-1` | — |
| `--flint-border-radius-xl` | — |
| `--flint-text-color` | — |
| `--flint-hover-color` | — |
| `--flint-text-color-muted` | — |
| `--flint-primary-color` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-primary-color-hover` | — |
| `--flint-input-bg` | — |
| `--flint-border-color` | — |
| `--flint-border-radius-md` | — |
| `--flint-input-placeholder-color` | — |
| `--flint-primary-focus-ring` | — |
| `--flint-input-disabled-bg` | — |
| `--flint-error-color` | — |
| `--flint-error-focus-ring` | — |
| `--flint-datepicker-z-index` | `1400` |
| `--flint-shadow-lg` | — |
| `--flint-shadow-sm` | — |

### Methods

| Method | Description |
| --- | --- |
| `navigateTo(iso: string): void` | Navigate to the month/year of a given ISO date programmatically. |

---

## `<flint-date-picker>`

A date picker with a text field and a calendar popover/modal.

- **Tag**: `<flint-date-picker>`
- **Class**: `FlintDatePicker`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintDatePicker } from '@getufy/flint-ui';
```

### Usage

```html
<flint-date-picker></flint-date-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` | Selected date as ISO string (YYYY-MM-DD). |
| `label` | `label` | `string` | `'Date'` | Label shown above the field. |
| `placeholder` | `placeholder` | `string` | `'MM/DD/YYYY'` | Placeholder shown in the empty field. |
| `name` | `name` | `string` | `''` | Form field name attribute. |
| `variant` | `variant` | `'desktop' \| 'mobile' \| 'static' \| 'auto'` | `'desktop'` | Variant: 'desktop' \| 'mobile' \| 'static' \| 'auto'. |
| `min` | `min` | `string` | `''` | Minimum selectable date (ISO). |
| `max` | `max` | `string` | `''` | Maximum selectable date (ISO). |
| `disabled` | `disabled` | `boolean` | `false` | Disables the picker. |
| `readonly` | `readonly` | `boolean` | `false` | Makes the field read-only (auto-opens a picker when clicked). |
| `error` | `error` | `boolean` | `false` | Shows error styling. |
| `helperText` | `helper-text` | `string` | `''` | Helper/error text below the field. |
| `errorMessage` | `error-message` | `string` | `''` | Error message displayed below the field when in error state. |
| `required` | `required` | `boolean` | `false` | Marks the date picker as required for form validation. |
| `defaultValue` | `default-value` | `string` | `''` | Initial value for uncontrolled usage (ISO string). |
| `hoist` | `hoist` | `boolean` | `false` | When true, the calendar popover uses `position: fixed` instead of `position: absolute` |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-date-picker-change` | `&#123; value: string &#125;` | Fired when the date changes. detail: `&#123; value: string &#125;` |

---
