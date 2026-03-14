# Dialog

<Demo label="Basic" html="<flint-button onclick=&quot;var d=this.nextElementSibling;d.open=true;d.addEventListener('close',function(){d.open=false},{once:true})&quot;>Open Dialog</flint-button><flint-dialog>  <flint-dialog-title>Confirm Action</flint-dialog-title>  <flint-dialog-content>    <flint-dialog-content-text>Are you sure you want to proceed? This action cannot be undone.</flint-dialog-content-text>  </flint-dialog-content>  <flint-dialog-actions>    <flint-button variant=&quot;secondary&quot; onclick=&quot;this.closest('flint-dialog').open=false&quot;>Cancel</flint-button>    <flint-button onclick=&quot;this.closest('flint-dialog').open=false&quot;>Confirm</flint-button>  </flint-dialog-actions></flint-dialog>" />

<Demo label="Destructive" html="<flint-button variant=&quot;destructive&quot; onclick=&quot;var d=this.nextElementSibling;d.open=true;d.addEventListener('close',function(){d.open=false},{once:true})&quot;>Delete Account</flint-button><flint-dialog>  <flint-dialog-title>Delete Account?</flint-dialog-title>  <flint-dialog-content>    <flint-dialog-content-text>This will permanently delete your account and all associated data.</flint-dialog-content-text>  </flint-dialog-content>  <flint-dialog-actions>    <flint-button variant=&quot;secondary&quot; onclick=&quot;this.closest('flint-dialog').open=false&quot;>Cancel</flint-button>    <flint-button variant=&quot;destructive&quot; onclick=&quot;this.closest('flint-dialog').open=false&quot;>Delete</flint-button>  </flint-dialog-actions></flint-dialog>" />

## `<flint-dialog>`

flint-dialog: a modal dialog component.

- **Tag**: `<flint-dialog>`
- **Class**: `FlintDialog`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintDialog } from '@getufy/flint-ui';
```

### Usage

```html
<flint-dialog></flint-dialog>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `open` | `boolean` | `false` | Controls the open / closed state of the dialog. |
| `transition` | `transition` | `'scale' \| 'slide-up' \| 'slide-down'` | `'scale'` | Animation style: 'scale' (default), 'slide-up', or 'slide-down'. |
| `disableBackdropClose` | `disable-backdrop-close` | `boolean` | `false` | When true, clicking the backdrop will NOT close the dialog. Useful for confirmation dialogs where the user must make a deliberate choice. |

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
| `--flint-dialog-max-height` | `90vh` |
| `--flint-dialog-width` | `444px` |
| `--flint-border-color` | — |
| `--flint-font-family` | — |
| `--flint-text-color-muted` | — |
| `--flint-text-color` | — |
| `--flint-surface-background` | `white` |
| `--flint-border-radius-xl` | `12px` |
| `--flint-shadow-xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.1` |

### Methods

| Method | Description |
| --- | --- |
| `requestClose()` | Programmatically request the dialog to close (fires the 'close' event). |

---

## `<flint-dialog-title>`

flint-dialog-title: heading area of a dialog. Automatically assigned id="dialog-title" for aria-labelledby.

- **Tag**: `<flint-dialog-title>`
- **Class**: `FlintDialogTitle`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintDialogTitle } from '@getufy/flint-ui';
```

### Usage

```html
<flint-dialog-title></flint-dialog-title>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-dialog-content>`

flint-dialog-content: scrollable content area of a dialog.

- **Tag**: `<flint-dialog-content>`
- **Class**: `FlintDialogContent`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintDialogContent } from '@getufy/flint-ui';
```

### Usage

```html
<flint-dialog-content></flint-dialog-content>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-dialog-content-text>`

flint-dialog-content-text: body text inside a dialog content area.

- **Tag**: `<flint-dialog-content-text>`
- **Class**: `FlintDialogContentText`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintDialogContentText } from '@getufy/flint-ui';
```

### Usage

```html
<flint-dialog-content-text></flint-dialog-content-text>
```

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Default slot for content |

---

## `<flint-dialog-actions>`

flint-dialog-actions: footer button row for a dialog. Use the `align` prop to control button alignment.

- **Tag**: `<flint-dialog-actions>`
- **Class**: `FlintDialogActions`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintDialogActions } from '@getufy/flint-ui';
```

### Usage

```html
<flint-dialog-actions></flint-dialog-actions>
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
