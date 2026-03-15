import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiItemTitleStyles from './flint-item-title.css?inline';
import uiItemDescriptionStyles from './flint-item-description.css?inline';
import uiItemMediaStyles from './flint-item-media.css?inline';
import uiItemContentStyles from './flint-item-content.css?inline';
import uiItemActionsStyles from './flint-item-actions.css?inline';
import uiItemHeaderStyles from './flint-item-header.css?inline';
import uiItemFooterStyles from './flint-item-footer.css?inline';
import uiItemSeparatorStyles from './flint-item-separator.css?inline';
import uiItemGroupStyles from './flint-item-group.css?inline';
import uiItemStyles from './flint-item.css?inline';
import { FlintElement } from '../flint-element.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-item-title                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays the title of an item.
 *
 * @slot - Title text.
 */
export class FlintItemTitle extends FlintElement {
    static styles = unsafeCSS(uiItemTitleStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-item-description                                                 */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays the description of an item.
 *
 * @slot - Description text.
 */
export class FlintItemDescription extends FlintElement {
    static styles = unsafeCSS(uiItemDescriptionStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-item-media                                                       */
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
 * @cssprop --flint-item-media-icon-bg    - Icon variant background (default: `#f3f4f6`).
 * @cssprop --flint-item-media-icon-color - Icon variant foreground (default: `#4b5563`).
 */
export class FlintItemMedia extends FlintElement {
    static styles = unsafeCSS(uiItemMediaStyles);

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
/*  flint-item-content                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Flex-column wrapper for an item's title and description.
 *
 * @slot - Accepts `flint-item-title`, `flint-item-description`, or any content.
 */
export class FlintItemContent extends FlintElement {
    static styles = unsafeCSS(uiItemContentStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-item-actions                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Container for action buttons or other interactive elements.
 * Aligns itself to the trailing edge of the item row.
 *
 * @slot - Buttons, icons, or any interactive elements.
 */
export class FlintItemActions extends FlintElement {
    static styles = unsafeCSS(uiItemActionsStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-item-header                                                      */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Full-bleed header that spans the top of the item, cancelling the
 * item's padding so media (images) appear flush with the border.
 * Always place as the first child of `flint-item`.
 *
 * @slot - Header content, typically an image or decorative element.
 */
export class FlintItemHeader extends FlintElement {
    static styles = unsafeCSS(uiItemHeaderStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-item-footer                                                      */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Full-bleed footer that spans the bottom of the item, cancelling the
 * item's padding so the footer appears flush with the border.
 * Always place as the last child of `flint-item`.
 *
 * @slot - Footer content: metadata, links, supplementary actions.
 */
export class FlintItemFooter extends FlintElement {
    static styles = unsafeCSS(uiItemFooterStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-item-separator                                                   */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Visual separator between items in a group.
 *
 * @cssprop --flint-border-color - Separator color (default: `#e5e7eb`).
 */
export class FlintItemSeparator extends FlintElement {
    static styles = unsafeCSS(uiItemSeparatorStyles);

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) this.setAttribute('role', 'separator');
        if (!this.hasAttribute('aria-orientation')) this.setAttribute('aria-orientation', 'horizontal');
    }

    render() { return html``; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-item-group                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Container for grouping related items together.
 *
 * @slot - Accepts `flint-item`, `flint-item-separator`, and any other elements.
 *
 * @cssprop --flint-item-group-gap - Spacing between items (default: `4px`).
 */
export class FlintItemGroup extends FlintElement {
    static styles = unsafeCSS(uiItemGroupStyles);
    render() { return html`<slot></slot>`; }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-item                                                             */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Root container for displaying content with media, title,
 * description, and actions. A versatile flex row that adapts to
 * icons, avatars, images, and action buttons.
 *
 * @slot - Accepts `flint-item-header`, `flint-item-media`, `flint-item-content`,
 *         `flint-item-actions`, `flint-item-footer`, and any other elements.
 *
 * @attr {'default'|'outline'|'muted'} variant - Visual style.
 * @attr {'default'|'sm'|'xs'} size - Size preset.
 *
 * @cssprop --flint-item-padding          - Internal padding (default: `16px`; `12px` sm; `8px` xs).
 * @cssprop --flint-item-gap              - Gap between flex children (default: `12px`).
 * @cssprop --flint-item-media-icon-bg    - Icon media background.
 * @cssprop --flint-item-media-icon-color - Icon media foreground.
 * @cssprop --flint-border-color          - Outline variant border color (default: `#e5e7eb`).
 * @cssprop --flint-muted-bg              - Muted variant background (default: `#f9fafb`).
 */
export class FlintItem extends FlintElement {
    static styles = unsafeCSS(uiItemStyles);

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
        'flint-item': FlintItem;
        'flint-item-group': FlintItemGroup;
        'flint-item-separator': FlintItemSeparator;
        'flint-item-media': FlintItemMedia;
        'flint-item-content': FlintItemContent;
        'flint-item-title': FlintItemTitle;
        'flint-item-description': FlintItemDescription;
        'flint-item-actions': FlintItemActions;
        'flint-item-header': FlintItemHeader;
        'flint-item-footer': FlintItemFooter;
    }
}
