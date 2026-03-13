# Format Date

<Demo label="Formats" html="<div style=&quot;display:flex;flex-direction:column;gap:8px&quot;><span>Default: <ui-format-date></ui-format-date></span><span>Long: <ui-format-date date-style=&quot;long&quot;></ui-format-date></span><span>Full: <ui-format-date date-style=&quot;full&quot;></ui-format-date></span></div>" />

- **Tag**: `<ui-format-date>`
- **Class**: `UiFormatDate`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiFormatDate } from 'storybook-lit';
```

### Usage

```html
<ui-format-date></ui-format-date>
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
| `--ui-format-date-color` | `inherit` |
| `--ui-format-date-font-size` | `inherit` |

---
