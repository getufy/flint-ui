# Date Picker

<Demo label="States">

<div style="display:flex;gap:16px;flex-wrap:wrap">
<ui-date-picker label="Pick a date" style="width:260px"></ui-date-picker>
<ui-date-picker label="Disabled" disabled style="width:260px"></ui-date-picker>
</div>

</Demo>

## `<ui-date-picker-calendar>`

A standalone calendar grid — the core date-selection view. Used internally by ui-date-picker, but can also be used on its own.

- **Tag**: `<ui-date-picker-calendar>`
- **Class**: `UiDatePickerCalendar`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDatePickerCalendar } from 'storybook-lit';
```

### Usage

```html
<ui-date-picker-calendar></ui-date-picker-calendar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `disabled` | `boolean` | `false` | Disable all interaction. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `date-select` | — | { detail: { value: string } } ISO date YYYY-MM-DD |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-font-family` | — |
| `--ui-surface-1` | — |
| `--ui-border-radius-xl` | — |
| `--ui-text-color` | — |
| `--ui-hover-color` | — |
| `--ui-text-color-muted` | — |
| `--ui-primary-color` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-primary-color-hover` | — |
| `--ui-input-bg` | — |
| `--ui-border-color` | — |
| `--ui-border-radius-md` | — |
| `--ui-input-placeholder-color` | — |
| `--ui-primary-focus-ring` | — |
| `--ui-input-disabled-bg` | — |
| `--ui-error-color` | — |
| `--ui-error-focus-ring` | — |
| `--ui-shadow-lg` | — |
| `--ui-shadow-sm` | — |

### Methods

| Method | Description |
| --- | --- |
| `navigateTo(iso: string)` | Navigate to the month/year of a given ISO date programmatically. |

---

## `<ui-date-picker>`

A date picker with a text field and a calendar popover/modal. Variants: - 'desktop'  — calendar appears in a popover (default) - 'mobile'   — calendar appears in a full dialog/modal - 'static'   — calendar always visible, no field - 'auto'     — desktop on pointer:fine, mobile on pointer:coarse

- **Tag**: `<ui-date-picker>`
- **Class**: `UiDatePicker`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDatePicker } from 'storybook-lit';
```

### Usage

```html
<ui-date-picker></ui-date-picker>
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

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — | { detail: { value: string } } when the date changes |

---
