# Alert

<Demo label="Severities" html="<div style=&quot;display:flex;flex-direction:column;gap:12px;width:100%&quot;><ui-alert severity=&quot;info&quot; title=&quot;Info&quot;>This is an informational message.</ui-alert><ui-alert severity=&quot;success&quot; title=&quot;Success&quot;>Operation completed successfully.</ui-alert><ui-alert severity=&quot;warning&quot; title=&quot;Warning&quot;>Please review before continuing.</ui-alert><ui-alert severity=&quot;error&quot; title=&quot;Error&quot;>Something went wrong.</ui-alert></div>" />

<Demo label="Dismissible" html="<div style=&quot;width:100%&quot;><ui-alert severity=&quot;info&quot; title=&quot;Dismissible&quot; dismissible>Click the close button to dismiss this alert.</ui-alert></div>" />

<Demo label="Without Title" html="<div style=&quot;width:100%&quot;><ui-alert severity=&quot;success&quot;>A simple success alert without a title.</ui-alert></div>" />

Alerts display brief messages for the user without interrupting their use of the app.

- **Tag**: `<ui-alert>`
- **Class**: `UiAlert`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiAlert } from 'storybook-lit';
```

### Usage

```html
<ui-alert></ui-alert>
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
| `ui-alert-close` | `{ severity: this.severity }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | The message content of the alert. |
| `icon` | Optional icon to display instead of the default severity icon. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-font-family` | — |
| `--ui-border-radius-md` | — |
| `--ui-info-bg` | — |
| `--ui-info-border-color` | — |
| `--ui-info-text-color` | — |
| `--ui-info-icon-color` | — |
| `--ui-success-bg` | — |
| `--ui-success-border-color` | — |
| `--ui-success-text-color` | — |
| `--ui-success-icon-color` | — |
| `--ui-warning-bg` | — |
| `--ui-warning-border-color` | — |
| `--ui-warning-text-color` | — |
| `--ui-warning-icon-color` | — |
| `--ui-error-bg` | — |
| `--ui-error-border-color` | — |
| `--ui-error-text-color` | — |
| `--ui-error-icon-color` | — |
| `--ui-active-color` | — |

---
