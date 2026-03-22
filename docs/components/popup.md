# Popup

flint-popup

- **Tag**: `<flint-popup>`
- **Class**: `FlintPopup`

### Import

```ts
import '@getufy/flint-ui'; // auto-registers all
// or
import { FlintPopup } from '@getufy/flint-ui';
```

### Usage

```html
<flint-popup></flint-popup>
```

### Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `active` | `active` | `boolean` | `false` | Activates positioning. When false, Floating UI listeners are torn down. |
| `anchor` | `anchor` | `string \| Element` | `''` | The anchor element. Pass a CSS selector string (resolved from ownerDocument), |
| `placement` | `placement` | `Placement` | `'top'` | Preferred placement of the popup relative to its anchor. |
| `strategy` | `strategy` | `Strategy` | `'absolute'` | CSS positioning strategy. Use `'fixed'` to escape overflow containers. |
| `distance` | `distance` | `number` | `0` | Distance from the anchor on the main axis (px). |
| `skidding` | `skidding` | `number` | `0` | Offset along the cross axis (px). |
| `flip` | `flip` | `boolean` | `false` | Flip the popup when it would overflow the boundary. |
| `flipFallbackPlacements` | `flip-fallback-placements` | `string` | `''` | Space-separated fallback placements when flipping (e.g. `"bottom-start bottom-end"`). |
| `flipBoundary` | `flipBoundary` | `Element \| Element[] \| undefined` | — | Boundary element(s) for the flip middleware. |
| `flipPadding` | `flip-padding` | `number` | `0` | Padding from the flip boundary (px). |
| `shift` | `shift` | `boolean` | `false` | Shift the popup to stay within the boundary. |
| `shiftBoundary` | `shiftBoundary` | `Element \| Element[] \| undefined` | — | Boundary element(s) for the shift middleware. |
| `shiftPadding` | `shift-padding` | `number` | `0` | Padding from the shift boundary (px). |
| `autoSize` | `auto-size` | `'' \| 'horizontal' \| 'vertical' \| 'both'` | `''` | Constrain popup dimensions to available space: `'horizontal'`, `'vertical'`, or `'both'`. |
| `autoSizeBoundary` | `autoSizeBoundary` | `Element \| Element[] \| undefined` | — | Boundary element(s) for auto-size. |
| `autoSizePadding` | `auto-size-padding` | `number` | `0` | Padding from the auto-size boundary (px). |
| `sync` | `sync` | `'' \| 'width' \| 'height' \| 'both'` | `''` | Sync popup width, height, or both to match the anchor element. |
| `arrow` | `arrow` | `boolean` | `false` | Show the built-in arrow pointing toward the anchor. |
| `arrowPadding` | `arrow-padding` | `number` | `4` | Arrow padding from the edges of the popup (px). |
| `hoverBridge` | `hover-bridge` | `boolean` | `false` | Render a transparent bridge between anchor and popup for safe hover transitions. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `flint-reposition` | `&#123; placement &#125;` | Fired after the popup is repositioned. `detail: &#123; placement &#125;`. |

### Slots

| Name | Description |
| --- | --- |
| `(default)` | The popup content to be positioned. |
| `anchor` | The reference element the popup is positioned relative to. |

### CSS Parts

| Name | Description |
| --- | --- |
| `popup` | The popup container element. |
| `arrow` | The arrow element (rendered when `arrow` is true). |
| `hover-bridge` | The transparent hover bridge element. |

### CSS Custom Properties

| Property | Default |
| --- | --- |
| `--flint-popup-arrow-size` | `8px` |
| `--flint-popup-arrow-color` | `inherit` |
| `--auto-size-available-width` | — |
| `--auto-size-available-height` | — |

### Methods

| Method | Description |
| --- | --- |
| `reposition(): void` | Force a reposition of the popup. |

---
