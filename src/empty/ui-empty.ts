import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiEmptyTitleStyles from './ui-empty-title.css?inline';
import uiEmptyDescriptionStyles from './ui-empty-description.css?inline';
import uiEmptyMediaStyles from './ui-empty-media.css?inline';
import uiEmptyHeaderStyles from './ui-empty-header.css?inline';
import uiEmptyContentStyles from './ui-empty-content.css?inline';
import uiEmptyStyles from './ui-empty.css?inline';

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-empty-title                                                      */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays the heading of an empty state.
 *
 * @slot - Title text.
 */
@customElement('ui-empty-title')
export class UiEmptyTitle extends LitElement {
    static styles = unsafeCSS(uiEmptyTitleStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-empty-description                                                */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays the descriptive text of an empty state.
 *
 * @slot - Description text.
 */
@customElement('ui-empty-description')
export class UiEmptyDescription extends LitElement {
    static styles = unsafeCSS(uiEmptyDescriptionStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-empty-media                                                      */
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
@customElement('ui-empty-media')
export class UiEmptyMedia extends LitElement {
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
/*  ui-empty-header                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Groups the media, title, and description of an empty state.
 *
 * @slot - Accepts `ui-empty-media`, `ui-empty-title`, `ui-empty-description`.
 */
@customElement('ui-empty-header')
export class UiEmptyHeader extends LitElement {
    static styles = unsafeCSS(uiEmptyHeaderStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-empty-content                                                    */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays action content for an empty state (buttons, inputs, links).
 *
 * @slot - Action elements such as buttons or inputs.
 */
@customElement('ui-empty-content')
export class UiEmptyContent extends LitElement {
    static styles = unsafeCSS(uiEmptyContentStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-empty                                                            */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Root container for an empty state. Wraps `ui-empty-header` and
 * `ui-empty-content` in a vertically centred flex column.
 *
 * @slot - Accepts `ui-empty-header`, `ui-empty-content`, and any extra
 *         elements (e.g. a "Learn More" link).
 *
 * @csspart container - The inner flex container.
 *
 * @cssprop --ui-empty-padding   - Internal padding (default: `32px`).
 * @cssprop --ui-empty-gap       - Gap between header / content / extras (default: `16px`).
 * @cssprop --ui-empty-max-width - Max width of the container (default: `480px`).
 */
@customElement('ui-empty')
export class UiEmpty extends LitElement {
    static styles = unsafeCSS(uiEmptyStyles);

    render() {
        return html`
            <div class="container" part="container">
                <slot></slot>
            </div>
        `;
    }
}
