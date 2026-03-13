# Time Picker

<Demo label="Desktop (Digital Clock Popover)" html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap&quot;><ui-time-picker label=&quot;Time&quot; value=&quot;14:30:00&quot; style=&quot;width:200px&quot;></ui-time-picker><ui-time-picker label=&quot;With Seconds&quot; value=&quot;09:15:45&quot; seconds style=&quot;width:200px&quot;></ui-time-picker><ui-time-picker label=&quot;Disabled&quot; disabled value=&quot;08:00:00&quot; style=&quot;width:200px&quot;></ui-time-picker></div>" />

<Demo label="Mobile (Analog Clock Dialog)" html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap&quot;><ui-time-picker label=&quot;Tap to open clock&quot; variant=&quot;mobile&quot; value=&quot;10:30:00&quot; style=&quot;width:200px&quot;></ui-time-picker><ui-time-picker label=&quot;With Seconds&quot; variant=&quot;mobile&quot; value=&quot;15:45:30&quot; seconds style=&quot;width:200px&quot;></ui-time-picker></div>" />

<Demo label="Analog Clock (Standalone)" html="<div style=&quot;display:flex;gap:24px;flex-wrap:wrap;align-items:start&quot;><ui-time-clock value=&quot;10:10:00&quot; ampm></ui-time-clock><ui-time-clock value=&quot;15:45:00&quot;></ui-time-clock></div>" />

<Demo label="Digital Clock" html="<div style=&quot;display:flex;gap:16px;flex-wrap:wrap&quot;><ui-digital-clock value=&quot;14:30:00&quot; ampm></ui-digital-clock><ui-digital-clock value=&quot;09:15:00&quot;></ui-digital-clock></div>" />

<Demo label="Multi-Section Digital Clock" html="<ui-multi-section-digital-clock value=&quot;14:30:00&quot; ampm></ui-multi-section-digital-clock>" />

<Demo label="Static Time Picker" html="<ui-static-time-picker value=&quot;11:00:00&quot; ampm></ui-static-time-picker>" />

## `<ui-time-field>`

- **Tag**: `<ui-time-field>`
- **Class**: `UiTimeField`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTimeField } from 'storybook-lit';
```

### Usage

```html
<ui-time-field></ui-time-field>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |
| `label` | `label` | `string` | `''` |  |
| `ampm` | `ampm` | `boolean` | `true` |  |
| `seconds` | `seconds` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `readonly` | `readonly` | `boolean` | `false` |  |
| `error` | `error` | `boolean` | `false` |  |
| `helperText` | `helper-text` | `string` | `''` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `clear` | — |  |
| `change` | `{ value: v }` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-time-field-height` | `44px` |
| `--ui-time-field-min-width` | `160px` |
| `--ui-font-family` | — |
| `--ui-text-color` | — |
| `--ui-hover-color` | — |
| `--ui-primary-color` | — |
| `--ui-text-color-on-primary` | — |
| `--ui-border-radius-xl` | — |
| `--ui-msdc-height` | `240px` |
| `--ui-surface-1` | — |
| `--ui-border-color` | — |
| `--ui-text-color-muted` | — |
| `--ui-error-color` | — |
| `--ui-input-bg` | — |
| `--ui-border-radius-md` | — |
| `--ui-primary-focus-ring` | — |
| `--ui-input-disabled-bg` | — |

### Methods

| Method | Description |
| --- | --- |
| `clear()` |  |

---

## `<ui-digital-clock>`

- **Tag**: `<ui-digital-clock>`
- **Class**: `UiDigitalClock`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDigitalClock } from 'storybook-lit';
```

### Usage

```html
<ui-digital-clock></ui-digital-clock>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |
| `step` | `step` | `number` | `30` |  |
| `ampm` | `ampm` | `boolean` | `true` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | `{ value: v }` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-digital-clock-height` | `300px` |

---

## `<ui-multi-section-digital-clock>`

- **Tag**: `<ui-multi-section-digital-clock>`
- **Class**: `UiMultiSectionDigitalClock`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMultiSectionDigitalClock } from 'storybook-lit';
```

### Usage

```html
<ui-multi-section-digital-clock></ui-multi-section-digital-clock>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |
| `ampm` | `ampm` | `boolean` | `true` |  |
| `seconds` | `seconds` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | `{ value: v }` |  |

---

## `<ui-time-clock>`

- **Tag**: `<ui-time-clock>`
- **Class**: `UiTimeClock`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTimeClock } from 'storybook-lit';
```

### Usage

```html
<ui-time-clock></ui-time-clock>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |
| `ampm` | `ampm` | `boolean` | `true` |  |
| `seconds` | `seconds` | `boolean` | `false` |  |
| `view` | `view` | `TimeView` | `'hours'` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | `{ value: v }` |  |
| `view-change` | `{ view: v }` |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-time-clock-face-bg` | `var(--ui-surface-variant, #f1f5f9` |
| `--ui-time-clock-inner-bg` | `rgba(0,0,0,.04` |
| `--ui-time-clock-inner-border` | `var(--ui-border-color, #e5e7eb` |
| `--ui-time-clock-hand-color` | `var(--ui-primary-color, #3b82f6` |
| `--ui-time-clock-num-size` | `14px` |
| `--ui-time-clock-inner-num-size` | `12px` |
| `--ui-time-clock-ampm-radius` | `20px` |

---

## `<ui-desktop-time-picker>`

- **Tag**: `<ui-desktop-time-picker>`
- **Class**: `UiDesktopTimePicker`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDesktopTimePicker } from 'storybook-lit';
```

### Usage

```html
<ui-desktop-time-picker></ui-desktop-time-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |
| `label` | `label` | `string` | `'Time'` |  |
| `ampm` | `ampm` | `boolean` | `true` |  |
| `seconds` | `seconds` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `readonly` | `readonly` | `boolean` | `false` |  |
| `error` | `error` | `boolean` | `false` |  |
| `helperText` | `helper-text` | `string` | `''` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | `{ value: v }` |  |

---

## `<ui-mobile-time-picker>`

- **Tag**: `<ui-mobile-time-picker>`
- **Class**: `UiMobileTimePicker`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiMobileTimePicker } from 'storybook-lit';
```

### Usage

```html
<ui-mobile-time-picker></ui-mobile-time-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |
| `label` | `label` | `string` | `'Time'` |  |
| `ampm` | `ampm` | `boolean` | `true` |  |
| `seconds` | `seconds` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `error` | `error` | `boolean` | `false` |  |
| `helperText` | `helper-text` | `string` | `''` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — |  |

---

## `<ui-static-time-picker>`

- **Tag**: `<ui-static-time-picker>`
- **Class**: `UiStaticTimePicker`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiStaticTimePicker } from 'storybook-lit';
```

### Usage

```html
<ui-static-time-picker></ui-static-time-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |
| `ampm` | `ampm` | `boolean` | `true` |  |
| `seconds` | `seconds` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — |  |

---

## `<ui-time-picker>`

- **Tag**: `<ui-time-picker>`
- **Class**: `UiTimePicker`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiTimePicker } from 'storybook-lit';
```

### Usage

```html
<ui-time-picker></ui-time-picker>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `value` | `string` | `''` |  |
| `label` | `label` | `string` | `'Time'` |  |
| `variant` | `variant` | `'desktop' \| 'mobile' \| 'static' \| 'auto'` | `'desktop'` |  |
| `ampm` | `ampm` | `boolean` | `true` |  |
| `seconds` | `seconds` | `boolean` | `false` |  |
| `disabled` | `disabled` | `boolean` | `false` |  |
| `error` | `error` | `boolean` | `false` |  |
| `helperText` | `helper-text` | `string` | `''` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `change` | — |  |

---
