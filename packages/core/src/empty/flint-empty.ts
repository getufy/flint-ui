import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiEmptyTitleStyles from './flint-empty-title.css?inline';
import uiEmptyDescriptionStyles from './flint-empty-description.css?inline';
import uiEmptyMediaStyles from './flint-empty-media.css?inline';
import uiEmptyHeaderStyles from './flint-empty-header.css?inline';
import uiEmptyContentStyles from './flint-empty-content.css?inline';
import uiEmptyStyles from './flint-empty.css?inline';

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-empty-title                                                      */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays the heading of an empty state.
 *
 * @slot - Title text.
 */
@customElement('flint-empty-title')
export class FlintEmptyTitle extends LitElement {
    static styles = unsafeCSS(uiEmptyTitleStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-empty-description                                                */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays the descriptive text of an empty state.
 *
 * @slot - Description text.
 */
@customElement('flint-empty-description')
export class FlintEmptyDescription extends LitElement {
    static styles = unsafeCSS(uiEmptyDescriptionStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-empty-media                                                      */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays the media area of an empty state (icon, image, or avatar).
 *
 * @slot - Media content: icon, image, or avatar elements.
 *
 * @attr {'default'|'icon'} variant - Visual treatment:
 *   - `default` — plain wrapper, no background.
 *   - `icon` — adds a rounded background + padding suited for icons.
 */
@customElement('flint-empty-media')
export class FlintEmptyMedia extends LitElement {
    static styles = unsafeCSS(uiEmptyMediaStyles);

    /** Visual treatment for the media container. */
    @property({ reflect: true })
    variant: 'default' | 'icon' = 'default';

    render() {
        return html`
            <div class=${classMap({ media: true, 'media--icon': this.variant === 'icon' })}>
                <slot></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-empty-header                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Groups the media, title, and description of an empty state.
 *
 * @slot - Accepts `flint-empty-media`, `flint-empty-title`, `flint-empty-description`.
 */
@customElement('flint-empty-header')
export class FlintEmptyHeader extends LitElement {
    static styles = unsafeCSS(uiEmptyHeaderStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-empty-content                                                    */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays action content for an empty state (buttons, inputs, links).
 *
 * @slot - Action elements such as buttons or inputs.
 */
@customElement('flint-empty-content')
export class FlintEmptyContent extends LitElement {
    static styles = unsafeCSS(uiEmptyContentStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-empty                                                            */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Root container for an empty state. Wraps `flint-empty-header` and
 * `flint-empty-content` in a vertically centred flex column.
 *
 * @slot - Accepts `flint-empty-header`, `flint-empty-content`, and any extra
 *         elements (e.g. a "Learn More" link).
 *
 * @csspart container - The inner flex container.
 *
 * @cssprop --flint-empty-padding   - Internal padding (default: `32px`).
 * @cssprop --flint-empty-gap       - Gap between header / content / extras (default: `16px`).
 * @cssprop --flint-empty-max-width - Max width of the container (default: `480px`).
 */
@customElement('flint-empty')
export class FlintEmpty extends LitElement {
    static styles = unsafeCSS(uiEmptyStyles);

    render() {
        return html`
            <div class="container" part="container">
                <slot></slot>
            </div>
        `;
    }
}
