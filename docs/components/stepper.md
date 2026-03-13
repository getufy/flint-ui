# Stepper

<Demo label="Step 2 of 3" html="<div style=&quot;width:100%;max-width:500px&quot;><ui-stepper active-step=&quot;1&quot;>  <ui-step completed>    <ui-step-label>Account</ui-step-label>  </ui-step>  <ui-step>    <ui-step-label>Details</ui-step-label>  </ui-step>  <ui-step>    <ui-step-label>Review</ui-step-label>  </ui-step></ui-stepper></div>" />

<Demo label="All Complete" html="<div style=&quot;width:100%;max-width:500px&quot;><ui-stepper active-step=&quot;3&quot;>  <ui-step completed>    <ui-step-label>Account</ui-step-label>  </ui-step>  <ui-step completed>    <ui-step-label>Details</ui-step-label>  </ui-step>  <ui-step completed>    <ui-step-label>Review</ui-step-label>  </ui-step></ui-stepper></div>" />

<Demo label="Vertical" html="<div style=&quot;width:100%;max-width:400px&quot;><ui-stepper orientation=&quot;vertical&quot; active-step=&quot;1&quot;>  <ui-step completed>    <ui-step-label>Create account</ui-step-label>    <p style=&quot;margin:0;color:#6b7280;font-size:14px&quot;>Account created successfully.</p>  </ui-step>  <ui-step>    <ui-step-label>Personal details</ui-step-label>    <p style=&quot;margin:0;color:#6b7280;font-size:14px&quot;>Fill in your name, email, and phone number.</p>  </ui-step>  <ui-step>    <ui-step-label>Review & submit</ui-step-label>  </ui-step></ui-stepper></div>" />

## `<ui-step-connector>`

- **Tag**: `<ui-step-connector>`
- **Class**: `UiStepConnector`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiStepConnector } from 'storybook-lit';
```

### Usage

```html
<ui-step-connector></ui-step-connector>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |  |
| `completed` | `completed` | `boolean` | `false` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-surface-1` | — |
| `--ui-font-family` | — |
| `--ui-border-color` | — |
| `--ui-text-color-muted` | — |
| `--ui-input-border-color` | — |
| `--ui-primary-color` | — |
| `--ui-text-color` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-error-color` | — |
| `--ui-primary-focus-ring` | — |

---

## `<ui-step-label>`

- **Tag**: `<ui-step-label>`
- **Class**: `UiStepLabel`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiStepLabel } from 'storybook-lit';
```

### Usage

```html
<ui-step-label></ui-step-label>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `active` | `active` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `error` | `error` | `boolean` | `false` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `optional` |  |

---

## `<ui-step-content>`

- **Tag**: `<ui-step-content>`
- **Class**: `UiStepContent`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiStepContent } from 'storybook-lit';
```

### Usage

```html
<ui-step-content></ui-step-content>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `true` | Whether the content is visible. Defaults true so standalone usage always shows. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-step>`

- **Tag**: `<ui-step>`
- **Class**: `UiStep`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiStep } from 'storybook-lit';
```

### Usage

```html
<ui-step></ui-step>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `active` | `active` | `boolean` | `false` |  |
| `completed` | `completed` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `optional` | `optional` | `boolean` | `false` |  |
| `error` | `error` | `boolean` | `false` |  |
| `last` | `last` | `boolean` | `false` |  |
| `clickable` | `clickable` | `boolean` | `false` |  |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |  |
| `alternativeLabel` | `alternative-label` | `boolean` | `false` |  |
| `stepIndex` | `step-index` | `number` | `0` |  |
| `optionalLabel` | `optional-label` | `string` | `'Optional'` |  |
| `prevCompleted` | `prev-completed` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-step-click` | `{ index: this.stepIndex }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `icon` |  |
| `label` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-stepper-connector-color` | — |
| `--ui-stepper-icon-size` | `32px` |

---

## `<ui-stepper>`

- **Tag**: `<ui-stepper>`
- **Class**: `UiStepper`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiStepper } from 'storybook-lit';
```

### Usage

```html
<ui-stepper></ui-stepper>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `activeStep` | `active-step` | `number` | `0` |  |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |  |
| `alternativeLabel` | `alternative-label` | `boolean` | `false` |  |
| `nonLinear` | `non-linear` | `boolean` | `false` |  |
| `label` | `label` | `string` | `'steps'` | Accessible label for the stepper landmark (maps to aria-label on the list element). |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `ui-step-change` | `{ step: e.detail.index }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-stepper-connector-color` | — |
| `--ui-stepper-icon-size` | `32px` |

---

## `<ui-mobile-stepper>`

- **Tag**: `<ui-mobile-stepper>`
- **Class**: `UiMobileStepper`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMobileStepper } from 'storybook-lit';
```

### Usage

```html
<ui-mobile-stepper></ui-mobile-stepper>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `steps` | `steps` | `number` | `0` |  |
| `activeStep` | `active-step` | `number` | `0` |  |
| `variant` | `variant` | `'text' \| 'dots' \| 'progress'` | `'dots'` |  |
| `position` | `position` | `'top' \| 'bottom' \| 'static'` | `'static'` |  |
| `backLabel` | `back-label` | `string` | `'Back'` | Label text for the Back navigation button (supports i18n). |
| `nextLabel` | `next-label` | `string` | `'Next'` | Label text for the Next navigation button (supports i18n). |

### Slots

| Name | Description |
| --- | --- |
| `back-button` |  |
| `next-button` |  |

---
