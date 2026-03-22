# Animations

Flint UI uses the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) for all component animations. Every animation can be customized, replaced, or disabled globally or per-element.

## How It Works

Components like `flint-dialog`, `flint-drawer`, and `flint-tooltip` look up their animations by name from a global registry. You can override any animation by registering a new definition for that name.

## Customizing Animations

### Change an Animation Globally

Use `setDefaultAnimation()` to replace an animation for all instances of a component:

```ts
import { setDefaultAnimation } from '@getufy/flint-ui';

// Make all dialogs slide in from the top
setDefaultAnimation('dialog.show', {
  keyframes: [
    { opacity: 0, transform: 'translateY(-20px)' },
    { opacity: 1, transform: 'translateY(0)' },
  ],
  options: { duration: 300, easing: 'ease-out' },
});
```

### Change an Animation for One Element

Use `setAnimation()` to override an animation on a specific element:

```ts
import { setAnimation } from '@getufy/flint-ui';

const myDialog = document.querySelector('#my-dialog');

setAnimation(myDialog, 'dialog.show', {
  keyframes: [
    { opacity: 0, transform: 'scale(0.8) rotate(-2deg)' },
    { opacity: 1, transform: 'scale(1) rotate(0)' },
  ],
  options: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
});
```

Per-element overrides take precedence over global defaults.

### Disable an Animation

Pass `null` to disable an animation entirely:

```ts
import { setDefaultAnimation, setAnimation } from '@getufy/flint-ui';

// Disable all tooltip animations
setDefaultAnimation('tooltip.show', null);
setDefaultAnimation('tooltip.hide', null);

// Disable animation for one specific drawer
const drawer = document.querySelector('#quick-drawer');
setAnimation(drawer, 'drawer.show', null);
setAnimation(drawer, 'drawer.hide', null);
```

### Read the Current Animation

Use `getAnimation()` to inspect what animation is registered:

```ts
import { getAnimation } from '@getufy/flint-ui';

const el = document.querySelector('flint-dialog');
const anim = getAnimation(el, 'dialog.show');
// Returns the ElementAnimation object, or null if disabled/unset
```

Resolution order: per-element override > global default > `null`.

## Animation Names

Each animated component registers a set of named animations. Here are all built-in animation names:

### Dialog

| Name | Description | Duration |
|------|-------------|----------|
| `dialog.show` | Panel scales in | 200ms ease-out |
| `dialog.hide` | Panel scales out | 150ms ease-in |
| `dialog.overlay.show` | Backdrop fades in | 200ms |
| `dialog.overlay.hide` | Backdrop fades out | 150ms |

### Drawer

| Name | Description | Duration |
|------|-------------|----------|
| `drawer.show` | Panel slides in from left (or right in RTL) | 250ms ease-out |
| `drawer.hide` | Panel slides out to left (or right in RTL) | 200ms ease-in |
| `drawer.show.right` | Panel slides in from right (or left in RTL) | 250ms ease-out |
| `drawer.hide.right` | Panel slides out to right (or left in RTL) | 200ms ease-in |
| `drawer.show.top` | Panel slides in from top | 250ms ease-out |
| `drawer.hide.top` | Panel slides out to top | 200ms ease-in |
| `drawer.show.bottom` | Panel slides in from bottom | 250ms ease-out |
| `drawer.hide.bottom` | Panel slides out to bottom | 200ms ease-in |
| `drawer.overlay.show` | Backdrop fades in | 250ms |
| `drawer.overlay.hide` | Backdrop fades out | 200ms |

### Tooltip

| Name | Description | Duration |
|------|-------------|----------|
| `tooltip.show` | Tooltip scales in | 120ms ease-out |
| `tooltip.hide` | Tooltip scales out | 100ms ease-in |

### Snackbar

| Name | Description | Duration |
|------|-------------|----------|
| `snackbar.show` | Slides up from bottom | 200ms ease-out |
| `snackbar.hide` | Slides down | 150ms ease-in |

### Dropdown (Select, Date Picker, etc.)

| Name | Description | Duration |
|------|-------------|----------|
| `dropdown.show` | Slides down into position | 150ms ease-out |
| `dropdown.hide` | Slides up and fades | 100ms ease-in |

## RTL Support

Animations that involve directional movement (like drawer slides) automatically use RTL-aware keyframes. When the computed `direction` of the element is `rtl`, the animation uses `rtlKeyframes` if defined.

You can provide RTL-specific keyframes in your custom animations:

```ts
import { setDefaultAnimation } from '@getufy/flint-ui';

setDefaultAnimation('drawer.show', {
  keyframes: [
    { transform: 'translateX(-100%)' },
    { transform: 'translateX(0)' },
  ],
  rtlKeyframes: [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(0)' },
  ],
  options: { duration: 250, easing: 'ease-out' },
});
```

If `rtlKeyframes` is not provided, the regular `keyframes` are used in both directions.

## Reduced Motion

Flint UI respects the user's `prefers-reduced-motion` setting. When reduced motion is enabled, all animations complete instantly -- the final frame is applied without any visible transition.

This happens automatically. No configuration is needed.

```css
/* The system checks this media query */
@media (prefers-reduced-motion: reduce) {
  /* All Flint animations run with duration: 0 */
}
```

You can test this by enabling "Reduce motion" in your OS accessibility settings or in Chrome DevTools (Rendering > Emulate CSS media feature `prefers-reduced-motion`).

## Animating Height Auto

Animating to/from `height: auto` is a common challenge with the Web Animations API. Use `shimKeyframesHeightAuto()` to replace `'auto'` values with a calculated pixel height:

```ts
import { shimKeyframesHeightAuto } from '@getufy/flint-ui';

const el = document.querySelector('.expandable');
const height = `${el.scrollHeight}px`;

const keyframes = shimKeyframesHeightAuto(
  [
    { height: '0', opacity: 0, overflow: 'hidden' },
    { height: 'auto', opacity: 1, overflow: 'hidden' },
  ],
  height,
);
// Result: [{ height: '0', ... }, { height: '142px', ... }]
```

## API Reference

### `setDefaultAnimation(name, animation)`

Register a global default animation. Pass `null` to disable.

```ts
function setDefaultAnimation(name: string, animation: ElementAnimation | null): void
```

### `setAnimation(el, name, animation)`

Override an animation for a specific element. Pass `null` to disable.

```ts
function setAnimation(el: Element, name: string, animation: ElementAnimation | null): void
```

### `getAnimation(el, name)`

Get the resolved animation for an element. Returns `null` if none is set.

```ts
function getAnimation(el: Element, name: string): ElementAnimation | null
```

### `animateTo(el, keyframes, options)`

Run an animation using the Web Animations API. Returns a Promise that resolves when the animation finishes. Respects `prefers-reduced-motion`.

```ts
function animateTo(
  el: HTMLElement,
  keyframes: Keyframe[],
  options?: KeyframeAnimationOptions,
): Promise<Animation | undefined>
```

### `stopAnimations(el)`

Cancel all running animations on an element.

```ts
function stopAnimations(el: HTMLElement): Promise<void>
```

### `shimKeyframesHeightAuto(keyframes, calculatedHeight)`

Replace `height: 'auto'` in keyframes with a pixel value.

```ts
function shimKeyframesHeightAuto(keyframes: Keyframe[], calculatedHeight: string): Keyframe[]
```

### `ElementAnimation`

The shape of an animation definition:

```ts
interface ElementAnimation {
  keyframes: Keyframe[];
  rtlKeyframes?: Keyframe[];
  options?: KeyframeAnimationOptions;
}
```
