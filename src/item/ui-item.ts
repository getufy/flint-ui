import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiItemTitleStyles from './ui-item-title.css?inline';
import uiItemDescriptionStyles from './ui-item-description.css?inline';
import uiItemMediaStyles from './ui-item-media.css?inline';
import uiItemContentStyles from './ui-item-content.css?inline';
import uiItemActionsStyles from './ui-item-actions.css?inline';
import uiItemHeaderStyles from './ui-item-header.css?inline';
import uiItemFooterStyles from './ui-item-footer.css?inline';
import uiItemSeparatorStyles from './ui-item-separator.css?inline';
import uiItemGroupStyles from './ui-item-group.css?inline';
import uiItemStyles from './ui-item.css?inline';

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
    static styles = unsafeCSS(uiItemTitleStyles);
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
    static styles = unsafeCSS(uiItemDescriptionStyles);
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
/*  ui-item-content                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Flex-column wrapper for an item's title and description.
 *
 * @slot - Accepts `ui-item-title`, `ui-item-description`, or any content.
 */
@customElement('ui-item-content')
export class UiItemContent extends LitElement {
    static styles = unsafeCSS(uiItemContentStyles);
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
    static styles = unsafeCSS(uiItemActionsStyles);
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
    static styles = unsafeCSS(uiItemHeaderStyles);
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
    static styles = unsafeCSS(uiItemFooterStyles);
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
    static styles = unsafeCSS(uiItemSeparatorStyles);

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
    static styles = unsafeCSS(uiItemGroupStyles);
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
