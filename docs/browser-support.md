# Browser Support

Flint UI is built on [LitElement](https://lit.dev/) and standard Web Components APIs:

- **Custom Elements v1** -- defining custom HTML elements
- **Shadow DOM v1** -- style and DOM encapsulation
- **ES Modules** -- native JavaScript module loading

All modern evergreen browsers support these APIs natively. No polyfills are required for the baseline feature set.

## Support Matrix

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | Full support |
| Edge | 90+ | Full support (Chromium-based) |
| Firefox | 90+ | Full support |
| Safari | 15.4+ | Full support |
| IE 11 | -- | Not supported |

Safari 15.4 is the minimum because it introduced `ElementInternals` and form-associated custom elements, which Flint UI's form components (`flint-switch`, `flint-input-otp`, etc.) rely on.

## Web APIs Used

| API | Chrome | Firefox | Safari | Notes |
|-----|--------|---------|--------|-------|
| Custom Elements v1 | 67+ | 63+ | 10.1+ | Core requirement |
| Shadow DOM v1 | 53+ | 63+ | 10+ | Core requirement |
| CSS Custom Properties | 49+ | 31+ | 9.1+ | All `--flint-*` theming tokens |
| ElementInternals | 77+ | 93+ | 16.4+ | Form-associated custom elements |
| Constructable Stylesheets | 73+ | 101+ | 16.4+ | Polyfilled by Lit when unavailable |
| ResizeObserver | 64+ | 69+ | 13.1+ | Used by `flint-split-panel`, `flint-scroll-area` |
| MutationObserver | 26+ | 14+ | 7+ | Used for child synchronization |
| Popover API | 114+ | 125+ | 17+ | Used by some overlay components |

## Lit's Built-in Polyfill Handling

Lit automatically handles browser differences for several APIs:

- **Constructable Stylesheets**: Lit falls back to `<style>` injection in browsers that lack `adoptedStyleSheets` support. No action needed on your part.
- **ShadyCSS / ShadyDOM**: Lit includes optional polyfill support for older browsers via `@webcomponents/polyfills`, but Flint UI does not target browsers that need them.
- **Template polyfills**: Not required -- all supported browsers have native `<template>` support.

You do not need to load any polyfills for the browsers listed in the support matrix above.

## SSR Considerations

Flint UI components can be server-rendered using [Lit SSR](https://lit.dev/docs/ssr/overview/):

- **Declarative Shadow DOM (DSD)**: Lit SSR outputs `<template shadowrootmode="open">` for each component's shadow root. Chrome 90+, Edge 90+, and Firefox 123+ support DSD natively. Safari added support in 16.4.
- **Hydration**: On the client, Lit hydrates the server-rendered DOM without re-rendering, preserving the initial paint. Import `lit/experimental-hydrate-support.js` before component definitions.
- **Fallback**: For browsers without native DSD support, include the [`@webcomponents/template-shadowroot`](https://github.com/webcomponents/template-shadowroot) ponyfill. It upgrades declarative shadow roots before Lit hydration runs.

If you are not using SSR, none of this applies -- components render entirely on the client via their standard `connectedCallback` lifecycle.
