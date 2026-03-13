# Visually Hidden

<Demo>

<p style="margin:0;color:#374151">The link below has visually hidden text for screen readers:</p>
<a href="#" style="color:var(--ui-primary-color)">
  Download Report
  <ui-visually-hidden>(opens in a new tab)</ui-visually-hidden>
</a>

</Demo>

- **Tag**: `<ui-visually-hidden>`
- **Class**: `UiVisuallyHidden`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiVisuallyHidden } from 'storybook-lit';
```

### Usage

```html
<ui-visually-hidden></ui-visually-hidden>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `notFocusable` | `not-focusable` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---
