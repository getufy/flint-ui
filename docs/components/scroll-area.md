# Scroll Area

<Demo html='<flint-scroll-area style="height:200px;width:100%;max-width:350px;border:1px solid #e5e7eb;border-radius:8px">  <div style="padding:16px">    <p style="margin:0 0 12px"><strong>Scrollable Content</strong></p>    <p style="margin:0 0 12px">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>    <p style="margin:0 0 12px">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>    <p style="margin:0 0 12px">Ut enim ad minim veniam, quis nostrud exercitation.</p>    <p style="margin:0 0 12px">Duis aute irure dolor in reprehenderit in voluptate.</p>    <p style="margin:0 0 12px">Excepteur sint occaecat cupidatat non proident.</p>    <p style="margin:0">Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>  </div></flint-scroll-area>' />

## `<flint-scroll-bar>`

Custom overlay scrollbar. Place inside `flint-scroll-area` with
`slot="scrollbar"` for an explicit horizontal or second-axis bar.

- **Tag**: `<flint-scroll-bar>`
- **Class**: `FlintScrollBar`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintScrollBar } from '@getufy/flint-ui';
```

### Usage

```html
<flint-scroll-bar></flint-scroll-bar>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | `Orientation` | `'vertical'` | Which axis this scrollbar controls. Reflects to attribute. |

### Slots

| Name | Description |
| --- | --- |
| `—` | none (fully shadow DOM) |

### CSS Parts

| Name | Description |
| --- | --- |
| `thumb` | The thumb/handle element. |
| `track` | The track element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-scrollbar-size` | — |
| `--flint-scrollbar-thumb-color` | — |
| `--flint-scrollbar-thumb-hover-color` | — |
| `--flint-scrollbar-thumb-radius` | — |
| `--flint-scrollbar-track-color` | — |

### Methods

| Method | Description |
| --- | --- |
| `setThumb(pos: number, size: number): void` | Push updated thumb geometry from the parent scroll area. |
| `setVisible(visible: boolean): void` | Show or hide the scrollbar (parent controls visibility). |

---

## `<flint-scroll-area>`

Augments native scroll with custom, cross-browser overlay scrollbars.
Native scrollbars are hidden; lightweight custom thumbs are rendered in
shadow DOM and synced to the viewport via scroll + ResizeObserver events.

- **Tag**: `<flint-scroll-area>`
- **Class**: `FlintScrollArea`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintScrollArea } from '@getufy/flint-ui';
```

### Usage

```html
<flint-scroll-area></flint-scroll-area>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | `type` | `'auto' \| 'always' \| 'scroll' \| 'hover'` | `'hover'` | Controls when the scrollbars appear. |
| `dir` | `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction. `'rtl'` flips the vertical bar to the left side. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Scrollable content. |
| `scrollbar` | Optional explicit `flint-scroll-bar` elements (e.g. horizontal). |

### CSS Parts

| Name | Description |
| --- | --- |
| `base` | The component's base wrapper element. |
| `viewport` | The viewport element. |
| `thumb` | The default scrollbar thumb element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-scrollbar-size` | — |
| `--flint-scrollbar-thumb-color` | — |
| `--flint-scrollbar-thumb-hover-color` | — |
| `--flint-scrollbar-thumb-radius` | — |
| `--flint-scrollbar-track-color` | — |

### Methods

| Method | Description |
| --- | --- |
| `scrollTo(options: ScrollToOptions): void` | Scroll the viewport to a position. |
| `scrollTo(x: number, y: number): void` |  |
| `scrollTo(optionsOrX: ScrollToOptions \| number, y: number): void` |  |
| `scrollBy(options: ScrollToOptions): void` | Scroll the viewport by a relative amount. |
| `scrollBy(x: number, y: number): void` |  |
| `scrollBy(optionsOrX: ScrollToOptions \| number, y: number): void` |  |

---
