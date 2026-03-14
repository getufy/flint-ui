# Relative Time

<Demo label="Dates" html="<div style=&quot;display:flex;flex-direction:column;gap:8px&quot;><span>1 day ago: <ui-relative-time datetime=&quot;2026-03-13T08:34:53.114Z&quot;></ui-relative-time></span><span>1 week ago: <ui-relative-time datetime=&quot;2026-03-07T08:34:53.114Z&quot;></ui-relative-time></span><span>1 month ago: <ui-relative-time datetime=&quot;2026-02-12T08:34:53.114Z&quot;></ui-relative-time></span></div>" />

Displays a localized time phrase relative to the current date and time. Uses the browser's `Intl.RelativeTimeFormat` API — no language packs needed.

- **Tag**: `<ui-relative-time>`
- **Class**: `UiRelativeTime`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiRelativeTime } from 'storybook-lit';
```

### Usage

```html
<ui-relative-time></ui-relative-time>
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
| `--ui-relative-time-cursor` | `text` |
| `--ui-relative-time-color` | `inherit` |
| `--ui-relative-time-font-size` | `inherit` |
| `--ui-relative-time-font-weight` | `inherit` |
| `--ui-relative-time-text-decoration` | `none` |
| `--ui-relative-time-white-space` | `nowrap` |

---
