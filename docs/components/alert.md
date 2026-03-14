# Alert

<Demo label="Severities" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%&quot;><flint-alert severity=&quot;info&quot; title=&quot;Info&quot;>This is an informational message.</flint-alert><flint-alert severity=&quot;success&quot; title=&quot;Success&quot;>Operation completed successfully.</flint-alert><flint-alert severity=&quot;warning&quot; title=&quot;Warning&quot;>Please review before continuing.</flint-alert><flint-alert severity=&quot;error&quot; title=&quot;Error&quot;>Something went wrong.</flint-alert></div>" />

<Demo label="Dismissible" html="<div style=&quot;width:100%&quot;><flint-alert severity=&quot;info&quot; title=&quot;Dismissible&quot; dismissible>Click the close button to dismiss this alert.</flint-alert></div>" />

<Demo label="Without Title" html="<div style=&quot;width:100%&quot;><flint-alert severity=&quot;success&quot;>A simple success alert without a title.</flint-alert></div>" />

Alerts display brief messages for the user without interrupting their use of the app.

- **Tag**: `<flint-alert>`
- **Class**: `FlintAlert`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintAlert } from 'flint-ui';
```

### Usage

```html
<flint-alert></flint-alert>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `severity` | `severity` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | * The severity level of the alert. |
| `title` | `title` | `string` | `''` | * An optional title for the alert. |
| `dismissible` | `dismissible` | `boolean` | `false` | * Whether the alert can be dismissed by the user. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-alert-close` | `{ severity: this.severity }` | Fired when the dismiss button is clicked. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | The message content of the alert. |
| `icon` | Optional icon to display instead of the default severity icon. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-font-family` | — |
| `--flint-border-radius-md` | — |
| `--flint-info-bg` | — |
| `--flint-info-border-color` | — |
| `--flint-info-text-color` | — |
| `--flint-info-icon-color` | — |
| `--flint-success-bg` | — |
| `--flint-success-border-color` | — |
| `--flint-success-text-color` | — |
| `--flint-success-icon-color` | — |
| `--flint-warning-bg` | — |
| `--flint-warning-border-color` | — |
| `--flint-warning-text-color` | — |
| `--flint-warning-icon-color` | — |
| `--flint-error-bg` | — |
| `--flint-error-border-color` | — |
| `--flint-error-text-color` | — |
| `--flint-error-icon-color` | — |
| `--flint-active-color` | — |

---
