# Format Date

<Demo label="Formats" html="<div style=&quot;display:flex;flex-direction:column;gap:8px&quot;><span>Default: <flint-format-date></flint-format-date></span><span>Long: <flint-format-date date-style=&quot;long&quot;></flint-format-date></span><span>Full: <flint-format-date date-style=&quot;full&quot;></flint-format-date></span></div>" />

- **Tag**: `<flint-format-date>`
- **Class**: `FlintFormatDate`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintFormatDate } from 'flint-ui';
```

### Usage

```html
<flint-format-date></flint-format-date>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `date` | `date` | `Date \| string` | `new Date()` |  |
| `weekday` | `weekday` | `'narrow' \| 'short' \| 'long' \| undefined` | `undefined` | The format for displaying the weekday. |
| `era` | `era` | `'narrow' \| 'short' \| 'long' \| undefined` | `undefined` | The format for displaying the era. |
| `year` | `year` | `'numeric' \| '2-digit' \| undefined` | `undefined` | The format for displaying the year. |
| `month` | `month` | `'numeric' \| '2-digit' \| 'narrow' \| 'short' \| 'long' \| undefined` | `undefined` | The format for displaying the month. |
| `day` | `day` | `'numeric' \| '2-digit' \| undefined` | `undefined` | The format for displaying the day. |
| `hour` | `hour` | `'numeric' \| '2-digit' \| undefined` | `undefined` | The format for displaying the hour. |
| `minute` | `minute` | `'numeric' \| '2-digit' \| undefined` | `undefined` | The format for displaying the minute. |
| `second` | `second` | `'numeric' \| '2-digit' \| undefined` | `undefined` | The format for displaying the second. |
| `timeZoneName` | `time-zone-name` | `'short' \| 'long' \| 'shortOffset' \| 'longOffset' \| 'shortGeneric' \| 'longGeneric' \| undefined` | `undefined` | The format for displaying the time zone name. |
| `timeZone` | `time-zone` | `string \| undefined` | `undefined` | The time zone to express the time in (e.g. "UTC", "America/New_York"). |
| `fractionalSecondDigits` | `fractional-second-digits` | `1 \| 2 \| 3 \| undefined` | `undefined` | Number of fractional second digits to display (1–3). |
| `dateStyle` | `date-style` | `'full' \| 'long' \| 'medium' \| 'short' \| undefined` | `undefined` |  |
| `timeStyle` | `time-style` | `'full' \| 'long' \| 'medium' \| 'short' \| undefined` | `undefined` |  |
| `hourFormat` | `hour-format` | `'auto' \| '12' \| '24'` | `'auto'` |  |
| `lang` | `lang` | `string` | `''` | BCP 47 language tag for formatting locale (e.g. "en", "fr", "ru"). Inherits from the document when unset. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-format-date-color` | `inherit` |
| `--flint-format-date-font-size` | `inherit` |

---
