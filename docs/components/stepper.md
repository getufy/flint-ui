# Stepper

<Demo label="Step 2 of 3" html="<div style=&quot;width:100%;max-width:500px&quot;><flint-stepper active-step=&quot;1&quot;>  <flint-step completed>    <flint-step-label>Account</flint-step-label>  </flint-step>  <flint-step>    <flint-step-label>Details</flint-step-label>  </flint-step>  <flint-step>    <flint-step-label>Review</flint-step-label>  </flint-step></flint-stepper></div>" />

<Demo label="All Complete" html="<div style=&quot;width:100%;max-width:500px&quot;><flint-stepper active-step=&quot;3&quot;>  <flint-step completed>    <flint-step-label>Account</flint-step-label>  </flint-step>  <flint-step completed>    <flint-step-label>Details</flint-step-label>  </flint-step>  <flint-step completed>    <flint-step-label>Review</flint-step-label>  </flint-step></flint-stepper></div>" />

<Demo label="Vertical" html="<div style=&quot;width:100%;max-width:400px&quot;><flint-stepper orientation=&quot;vertical&quot; active-step=&quot;1&quot;>  <flint-step completed>    <flint-step-label>Create account</flint-step-label>    <p style=&quot;margin:0;color:#6b7280;font-size:14px&quot;>Account created successfully.</p>  </flint-step>  <flint-step>    <flint-step-label>Personal details</flint-step-label>    <p style=&quot;margin:0;color:#6b7280;font-size:14px&quot;>Fill in your name, email, and phone number.</p>  </flint-step>  <flint-step>    <flint-step-label>Review & submit</flint-step-label>  </flint-step></flint-stepper></div>" />

## `<flint-step-connector>`

- **Tag**: `<flint-step-connector>`
- **Class**: `FlintStepConnector`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintStepConnector } from 'flint-ui';
```

### Usage

```html
<flint-step-connector></flint-step-connector>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |  |
| `completed` | `completed` | `boolean` | `false` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-surface-1` | — |
| `--flint-font-family` | — |
| `--flint-border-color` | — |
| `--flint-text-color-muted` | — |
| `--flint-input-border-color` | — |
| `--flint-primary-color` | — |
| `--flint-text-color` | — |
| `--flint-text-color-on-primary` | — |
| `--flint-error-color` | — |
| `--flint-primary-focus-ring` | — |

---

## `<flint-step-label>`

- **Tag**: `<flint-step-label>`
- **Class**: `FlintStepLabel`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintStepLabel } from 'flint-ui';
```

### Usage

```html
<flint-step-label></flint-step-label>
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

## `<flint-step-content>`

- **Tag**: `<flint-step-content>`
- **Class**: `FlintStepContent`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintStepContent } from 'flint-ui';
```

### Usage

```html
<flint-step-content></flint-step-content>
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

## `<flint-step>`

- **Tag**: `<flint-step>`
- **Class**: `FlintStep`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintStep } from 'flint-ui';
```

### Usage

```html
<flint-step></flint-step>
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
| `flint-step-click` | `{ index: this.stepIndex }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |
| `icon` |  |
| `label` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-stepper-connector-color` | — |
| `--flint-stepper-icon-size` | `32px` |

---

## `<flint-stepper>`

- **Tag**: `<flint-stepper>`
- **Class**: `FlintStepper`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintStepper } from 'flint-ui';
```

### Usage

```html
<flint-stepper></flint-stepper>
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
| `flint-step-change` | `{ step: e.detail.index }` |  |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-stepper-connector-color` | — |
| `--flint-stepper-icon-size` | `32px` |

---

## `<flint-mobile-stepper>`

- **Tag**: `<flint-mobile-stepper>`
- **Class**: `FlintMobileStepper`

### Import

```ts
import 'flint-ui'; // auto-registers all
// or
import { FlintMobileStepper } from 'flint-ui';
```

### Usage

```html
<flint-mobile-stepper></flint-mobile-stepper>
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

## Accessibility

- **ARIA**: steps marked with `aria-current="step"` for the active step.
- **Screen reader**: announces step labels and current position.
