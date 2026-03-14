# Relative Time

<Demo label="Dates" html="<div style=&quot;display:flex;flex-direction:column;gap:8px&quot;><span>1 day ago: <flint-relative-time datetime=&quot;2026-03-13T13:19:56.906Z&quot;></flint-relative-time></span><span>1 week ago: <flint-relative-time datetime=&quot;2026-03-07T13:19:56.907Z&quot;></flint-relative-time></span><span>1 month ago: <flint-relative-time datetime=&quot;2026-02-12T13:19:56.907Z&quot;></flint-relative-time></span></div>" />

Displays a localized time phrase relative to the current date and time. Uses the browser's `Intl.RelativeTimeFormat` API — no language packs needed.

- **Tag**: `<flint-relative-time>`
- **Class**: `FlintRelativeTime`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintRelativeTime } from 'flint-ui';
```

### Usage

```html
<flint-relative-time></flint-relative-time>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `date` | `date` | `Date \| string \| number` | `new Date()` | The date to calculate time from. Accepts a Date, ISO string, or Unix ms timestamp. Defaults to the current date/time. |
| `format` | `format` | `'long' \| 'short' \| 'narrow'` | `'long'` | The formatting style to use. |
| `numeric` | `numeric` | `'always' \| 'auto'` | `'auto'` |  |
| `sync` | `sync` | `boolean` | `false` | Keep the displayed value up to date as time passes. |
| `lang` | `lang` | `string` | `''` | BCP 47 language tag for formatting (e.g. "en", "de", "ja"). Inherits from the document when unset. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-relative-time-cursor` | `text` |
| `--flint-relative-time-color` | `inherit` |
| `--flint-relative-time-font-size` | `inherit` |
| `--flint-relative-time-font-weight` | `inherit` |
| `--flint-relative-time-text-decoration` | `none` |
| `--flint-relative-time-white-space` | `nowrap` |

---
