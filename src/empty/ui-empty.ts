import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

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
    static styles = css`
        :host {
            display: block;
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.4;
            color: var(--ui-text-color, #111827);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            margin: 0;
        }
    `;
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
    static styles = css`
        :host {
            display: block;
            font-size: 0.875rem;
            line-height: 1.5;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            margin: 0;
        }
    `;
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
    static styles = css`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .media {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .media--icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: var(--ui-empty-media-bg, #f3f4f6);
            color: var(--ui-empty-media-color, #6b7280);
        }

        ::slotted(svg),
        ::slotted([data-icon]) {
            width: 24px;
            height: 24px;
        }
    `;

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
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            text-align: center;
        }
    `;
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
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
    `;
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
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--ui-empty-gap, 16px);
            padding: var(--ui-empty-padding, 32px);
            max-width: var(--ui-empty-max-width, 480px);
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `;

    render() {
        return html`
            <div class="container" part="container">
                <slot></slot>
            </div>
        `;
    }
}
