# Dialog

<Demo label="Basic" html='<flint-button onclick="var d=this.nextElementSibling;d.open=true;d.addEventListener(&#39;flint-dialog-close&#39;,function(){d.open=false},{once:true})">Open Dialog</flint-button><flint-dialog>  <flint-dialog-title>Confirm Action</flint-dialog-title>  <flint-dialog-content>    <flint-dialog-content-text>Are you sure you want to proceed? This action cannot be undone.</flint-dialog-content-text>  </flint-dialog-content>  <flint-dialog-actions>    <flint-button appearance="outlined" color="neutral" onclick="this.closest(&#39;flint-dialog&#39;).open=false">Cancel</flint-button>    <flint-button onclick="this.closest(&#39;flint-dialog&#39;).open=false">Confirm</flint-button>  </flint-dialog-actions></flint-dialog>' />

<Demo label="Destructive" html='<flint-button color="destructive" onclick="var d=this.nextElementSibling;d.open=true;d.addEventListener(&#39;flint-dialog-close&#39;,function(){d.open=false},{once:true})">Delete Account</flint-button><flint-dialog>  <flint-dialog-title>Delete Account?</flint-dialog-title>  <flint-dialog-content>    <flint-dialog-content-text>This will permanently delete your account and all associated data.</flint-dialog-content-text>  </flint-dialog-content>  <flint-dialog-actions>    <flint-button appearance="outlined" color="neutral" onclick="this.closest(&#39;flint-dialog&#39;).open=false">Cancel</flint-button>    <flint-button color="destructive" onclick="this.closest(&#39;flint-dialog&#39;).open=false">Delete</flint-button>  </flint-dialog-actions></flint-dialog>' />

## `<flint-dialog>`

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
| `open` | `open` | `boolean` | `false` | Current open state (controlled). When set, the component reflects this state and does not manage its own state. |
| `defaultOpen` | `default-open` | `boolean` | `false` | Initial open state (uncontrolled). Only used on first render; ignored after mount. |
| `size` | `size` | `DialogSize` | `'md'` | Size variant of the dialog panel. |
| `transition` | `transition` | `'scale' \| 'slide-up' \| 'slide-down'` | `'scale'` | Animation style for open/close. |
| `disableBackdropClose` | `disable-backdrop-close` | `boolean` | `false` | When true, clicking the backdrop will NOT close the dialog. |
| `initialFocus` | `initial-focus` | `string` | `''` | CSS selector for the element to focus when the dialog opens. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-dialog-open` | — |  |
| `flint-dialog-close` | — |  |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-dialog-max-height` | `90vh` |
| `--flint-dialog-width` | `600px` |
| `--flint-border-color` | — |
| `--flint-font-family` | — |
| `--flint-text-color-muted` | — |
| `--flint-text-color` | — |
| `--flint-surface-background` | — |
| `--flint-border-radius-xl` | — |
| `--flint-shadow-xl` | — |

### Methods

| Method | Description |
| --- | --- |
| `requestClose(): void` | Programmatically request the dialog to close (fires the 'flint-dialog-close' event). |

---

## `<flint-dialog-title>`

flint-dialog-title: heading area of a dialog.
The parent `<flint-dialog>` reads this element's text content via slotchange
to set `aria-label` on the dialog panel.

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

---

## `<flint-dialog-actions>`

flint-dialog-actions: footer button row for a dialog.
Use the `align` prop to control button alignment.

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

---
