import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-item-title                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays the title of an item.
 *
 * @slot - Title text.
 */
@customElement('ui-item-title')
export class UiItemTitle extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            line-height: 1.4;
            color: var(--ui-text-color, #111827);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `;
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-item-description                                                 */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays the description of an item.
 *
 * @slot - Description text.
 */
@customElement('ui-item-description')
export class UiItemDescription extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-size: 0.8125rem;
            line-height: 1.5;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `;
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-item-media                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Media container for an item (icon, avatar, or image).
 *
 * @slot - Media content: SVG icon, avatar element, or image.
 *
 * @attr {'default'|'icon'|'image'} variant
 *   - `default` — plain flex wrapper, no background.
 *   - `icon`    — rounded box with muted background, sized for icons.
 *   - `image`   — fixed 40×40 clipping box for thumbnails.
 *
 * @cssprop --ui-item-media-icon-bg    - Icon variant background (default: `#f3f4f6`).
 * @cssprop --ui-item-media-icon-color - Icon variant foreground (default: `#6b7280`).
 */
@customElement('ui-item-media')
export class UiItemMedia extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
        }

        .media {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .media--icon {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background: var(--ui-item-media-icon-bg, #f3f4f6);
            color: var(--ui-item-media-icon-color, #6b7280);
        }

        .media--image {
            width: 40px;
            height: 40px;
            border-radius: 6px;
            overflow: hidden;
            flex-shrink: 0;
        }

        ::slotted(svg),
        ::slotted([data-icon]) {
            width: 20px;
            height: 20px;
        }

        ::slotted(img) {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    `;

    /** Visual treatment for the media container. */
    @property({ reflect: true })
    variant: 'default' | 'icon' | 'image' = 'default';

    render() {
        return html`
            <div class=${classMap({
                media: true,
                'media--icon': this.variant === 'icon',
                'media--image': this.variant === 'image',
            })}>
                <slot></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-item-content                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Flex-column wrapper for an item's title and description.
 *
 * @slot - Accepts `ui-item-title`, `ui-item-description`, or any content.
 */
@customElement('ui-item-content')
export class UiItemContent extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            min-width: 0;
            gap: 2px;
        }
    `;
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-item-actions                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Container for action buttons or other interactive elements.
 * Aligns itself to the trailing edge of the item row.
 *
 * @slot - Buttons, icons, or any interactive elements.
 */
@customElement('ui-item-actions')
export class UiItemActions extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            gap: 8px;
            margin-left: auto;
        }
    `;
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-item-header                                                      */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Full-bleed header that spans the top of the item, cancelling the
 * item's padding so media (images) appear flush with the border.
 * Always place as the first child of `ui-item`.
 *
 * @slot - Header content, typically an image or decorative element.
 */
@customElement('ui-item-header')
export class UiItemHeader extends LitElement {
    static styles = css`
        :host {
            display: block;
            /* Stretch to fill item width including its padding */
            flex: 0 0 calc(100% + 2 * var(--ui-item-padding, 16px));
            margin-left: calc(-1 * var(--ui-item-padding, 16px));
            margin-right: calc(-1 * var(--ui-item-padding, 16px));
            margin-top: calc(-1 * var(--ui-item-padding, 16px));
            margin-bottom: 0;
            overflow: hidden;
            line-height: 0;
        }

        ::slotted(img) {
            width: 100%;
            display: block;
            object-fit: cover;
        }
    `;
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-item-footer                                                      */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Full-bleed footer that spans the bottom of the item, cancelling the
 * item's padding so the footer appears flush with the border.
 * Always place as the last child of `ui-item`.
 *
 * @slot - Footer content: metadata, links, supplementary actions.
 */
@customElement('ui-item-footer')
export class UiItemFooter extends LitElement {
    static styles = css`
        :host {
            display: block;
            flex: 0 0 calc(100% + 2 * var(--ui-item-padding, 16px));
            margin-left: calc(-1 * var(--ui-item-padding, 16px));
            margin-right: calc(-1 * var(--ui-item-padding, 16px));
            margin-bottom: calc(-1 * var(--ui-item-padding, 16px));
            margin-top: 0;
            padding: 10px var(--ui-item-padding, 16px);
            border-top: 1px solid var(--ui-border-color, #e5e7eb);
            background: var(--ui-item-footer-bg, transparent);
            box-sizing: border-box;
            font-size: 0.8125rem;
            color: var(--ui-text-color-muted, #6b7280);
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }
    `;
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-item-separator                                                   */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Visual separator between items in a group.
 *
 * @cssprop --ui-border-color - Separator color (default: `#e5e7eb`).
 */
@customElement('ui-item-separator')
export class UiItemSeparator extends LitElement {
    static styles = css`
        :host {
            display: block;
            height: 1px;
            background: var(--ui-border-color, #e5e7eb);
        }
    `;

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) this.setAttribute('role', 'separator');
        if (!this.hasAttribute('aria-orientation')) this.setAttribute('aria-orientation', 'horizontal');
    }

    render() { return html``; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-item-group                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Container for grouping related items together.
 *
 * @slot - Accepts `ui-item`, `ui-item-separator`, and any other elements.
 *
 * @cssprop --ui-item-group-gap - Spacing between items (default: `4px`).
 */
@customElement('ui-item-group')
export class UiItemGroup extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            gap: var(--ui-item-group-gap, 4px);
        }
    `;
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-item                                                             */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Root container for displaying content with media, title,
 * description, and actions. A versatile flex row that adapts to
 * icons, avatars, images, and action buttons.
 *
 * @slot - Accepts `ui-item-header`, `ui-item-media`, `ui-item-content`,
 *         `ui-item-actions`, `ui-item-footer`, and any other elements.
 *
 * @attr {'default'|'outline'|'muted'} variant - Visual style.
 * @attr {'default'|'sm'|'xs'} size - Size preset.
 *
 * @cssprop --ui-item-padding          - Internal padding (default: `16px`; `12px` sm; `8px` xs).
 * @cssprop --ui-item-gap              - Gap between flex children (default: `12px`).
 * @cssprop --ui-item-media-icon-bg    - Icon media background.
 * @cssprop --ui-item-media-icon-color - Icon media foreground.
 * @cssprop --ui-border-color          - Outline variant border color (default: `#e5e7eb`).
 * @cssprop --ui-muted-bg              - Muted variant background (default: `#f9fafb`).
 */
@customElement('ui-item')
export class UiItem extends LitElement {
    static styles = css`
        :host {
            /* Sizing custom properties — read by sub-components too */
            --ui-item-padding: 16px;
            --ui-item-gap: 12px;

            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: var(--ui-item-gap);
            padding: var(--ui-item-padding);
            border-radius: 8px;
            box-sizing: border-box;
            overflow: hidden;
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }

        /* Size variants — override sizing custom properties */
        :host([size='sm']) {
            --ui-item-padding: 12px;
            --ui-item-gap: 8px;
        }

        :host([size='xs']) {
            --ui-item-padding: 8px;
            --ui-item-gap: 6px;
        }

        /* Visual variants */
        :host([variant='outline']) {
            border: 1px solid var(--ui-border-color, #e5e7eb);
        }

        :host([variant='muted']) {
            background: var(--ui-muted-bg, #f9fafb);
        }
    `;

    /**
     * Visual style of the item.
     * - `default`  — no border, transparent background.
     * - `outline`  — visible border.
     * - `muted`    — muted background fill.
     */
    @property({ reflect: true })
    variant: 'default' | 'outline' | 'muted' = 'default';

    /**
     * Size preset controlling padding and gap.
     * - `default` — 16px padding, 12px gap.
     * - `sm`      — 12px padding, 8px gap.
     * - `xs`      — 8px padding, 6px gap.
     */
    @property({ reflect: true })
    size: 'default' | 'sm' | 'xs' = 'default';

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-item': UiItem;
        'ui-item-group': UiItemGroup;
        'ui-item-separator': UiItemSeparator;
        'ui-item-media': UiItemMedia;
        'ui-item-content': UiItemContent;
        'ui-item-title': UiItemTitle;
        'ui-item-description': UiItemDescription;
        'ui-item-actions': UiItemActions;
        'ui-item-header': UiItemHeader;
        'ui-item-footer': UiItemFooter;
    }
}
