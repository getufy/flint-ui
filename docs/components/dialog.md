# Dialog

<Demo>

<ui-button onclick="this.nextElementSibling.open=true">Open Dialog</ui-button>
<ui-dialog>
  <ui-dialog-title>Dialog Title</ui-dialog-title>
  <ui-dialog-content>
    <ui-dialog-content-text>This is a dialog. Click outside or press Escape to close.</ui-dialog-content-text>
  </ui-dialog-content>
  <ui-dialog-actions>
    <ui-button variant="secondary" onclick="this.closest('ui-dialog').open=false">Cancel</ui-button>
    <ui-button onclick="this.closest('ui-dialog').open=false">Confirm</ui-button>
  </ui-dialog-actions>
</ui-dialog>

</Demo>

## `<ui-dialog>`

ui-dialog: a modal dialog component.

- **Tag**: `<ui-dialog>`
- **Class**: `UiDialog`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDialog } from 'storybook-lit';
```

### Usage

```html
<ui-dialog></ui-dialog>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Controls the open / closed state of the dialog. |
| `transition` | `transition` | `'scale' \| 'slide-up' \| 'slide-down'` | `'scale'` | Animation style: 'scale' (default), 'slide-up', or 'slide-down'. |
| `disableBackdropClose` | `disable-backdrop-close` | `boolean` | `false` |  |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `close` | — | Dispatched when the dialog requests to be closed (backdrop click or |
| `confirm` | — | Dispatched by confirmation dialogs when the user clicked "confirm". |
| `cancel` | — | Dispatched by confirmation dialogs when the user clicked "cancel". |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for dialog content (title, content, actions sub-components). |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--ui-dialog-max-height` | `90vh` |
| `--ui-dialog-width` | `444px` |
| `--ui-border-color` | — |
| `--ui-font-family` | — |
| `--ui-text-color-muted` | — |
| `--ui-text-color` | — |
| `--ui-surface-background` | `white` |
| `--ui-border-radius-xl` | `12px` |
| `--ui-shadow-xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.1` |

### Methods

| Method | Description |
| --- | --- |
| `requestClose()` | Programmatically request the dialog to close (fires the 'close' event). |

---

## `<ui-dialog-title>`

ui-dialog-title: heading area of a dialog. Automatically assigned id="dialog-title" for aria-labelledby.

- **Tag**: `<ui-dialog-title>`
- **Class**: `UiDialogTitle`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDialogTitle } from 'storybook-lit';
```

### Usage

```html
<ui-dialog-title></ui-dialog-title>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-dialog-content>`

ui-dialog-content: scrollable content area of a dialog.

- **Tag**: `<ui-dialog-content>`
- **Class**: `UiDialogContent`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDialogContent } from 'storybook-lit';
```

### Usage

```html
<ui-dialog-content></ui-dialog-content>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-dialog-content-text>`

ui-dialog-content-text: body text inside a dialog content area.

- **Tag**: `<ui-dialog-content-text>`
- **Class**: `UiDialogContentText`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDialogContentText } from 'storybook-lit';
```

### Usage

```html
<ui-dialog-content-text></ui-dialog-content-text>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<ui-dialog-actions>`

ui-dialog-actions: footer button row for a dialog. Use the `align` prop to control button alignment.

- **Tag**: `<ui-dialog-actions>`
- **Class**: `UiDialogActions`

### Import

```ts
import 'storybook-lit'; // auto-registers all
// or
import { UiDialogActions } from 'storybook-lit';
```

### Usage

```html
<ui-dialog-actions></ui-dialog-actions>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `align` | `align` | `'start' \| 'center' \| 'end' \| 'space-between'` | `'end'` | Alignment of action buttons: 'end' (default), 'start', 'center', 'space-between'. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---
