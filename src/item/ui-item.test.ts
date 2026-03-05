import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-item';
import type {
    UiItem,
    UiItemGroup,
    UiItemMedia,
    UiItemContent,
    UiItemTitle,
    UiItemDescription,
    UiItemActions,
    UiItemHeader,
    UiItemFooter,
    UiItemSeparator,
} from './ui-item';

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<UiItem>(html`<ui-item></ui-item>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('defaults variant to "default"', async () => {
        const el = await fixture<UiItem>(html`<ui-item></ui-item>`);
        expect(el.variant).toBe('default');
    });

    it('defaults size to "default"', async () => {
        const el = await fixture<UiItem>(html`<ui-item></ui-item>`);
        expect(el.size).toBe('default');
    });

    it('slots child elements', async () => {
        const el = await fixture<UiItem>(html`
            <ui-item>
                <ui-item-content><ui-item-title>Hello</ui-item-title></ui-item-content>
            </ui-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-item-title')).not.toBeNull();
    });

    it('slots multiple children', async () => {
        const el = await fixture<UiItem>(html`
            <ui-item>
                <ui-item-media></ui-item-media>
                <ui-item-content></ui-item-content>
                <ui-item-actions></ui-item-actions>
            </ui-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-item-media')).not.toBeNull();
        expect(el.querySelector('ui-item-content')).not.toBeNull();
        expect(el.querySelector('ui-item-actions')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item — variant prop
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item — variant prop', () => {
    it('reflects variant="outline" attribute', async () => {
        const el = await fixture<UiItem>(html`<ui-item variant="outline"></ui-item>`);
        expect(el.variant).toBe('outline');
        expect(el.getAttribute('variant')).toBe('outline');
    });

    it('reflects variant="muted" attribute', async () => {
        const el = await fixture<UiItem>(html`<ui-item variant="muted"></ui-item>`);
        expect(el.variant).toBe('muted');
        expect(el.getAttribute('variant')).toBe('muted');
    });

    it('updates reflected attribute when variant property changes', async () => {
        const el = await fixture<UiItem>(html`<ui-item></ui-item>`);
        el.variant = 'outline';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('outline');
    });

    it('reflects variant change from outline to muted', async () => {
        const el = await fixture<UiItem>(html`<ui-item variant="outline"></ui-item>`);
        el.variant = 'muted';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('muted');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item — size prop
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item — size prop', () => {
    it('reflects size="sm" attribute', async () => {
        const el = await fixture<UiItem>(html`<ui-item size="sm"></ui-item>`);
        expect(el.size).toBe('sm');
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('reflects size="xs" attribute', async () => {
        const el = await fixture<UiItem>(html`<ui-item size="xs"></ui-item>`);
        expect(el.size).toBe('xs');
        expect(el.getAttribute('size')).toBe('xs');
    });

    it('updates reflected attribute when size property changes', async () => {
        const el = await fixture<UiItem>(html`<ui-item></ui-item>`);
        el.size = 'sm';
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('can change from sm to xs', async () => {
        const el = await fixture<UiItem>(html`<ui-item size="sm"></ui-item>`);
        el.size = 'xs';
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('xs');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item-group — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item-group — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<UiItemGroup>(html`<ui-item-group></ui-item-group>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('groups multiple items', async () => {
        const el = await fixture<UiItemGroup>(html`
            <ui-item-group>
                <ui-item id="a"></ui-item>
                <ui-item id="b"></ui-item>
            </ui-item-group>
        `);
        await el.updateComplete;
        expect(el.querySelectorAll('ui-item').length).toBe(2);
    });

    it('accepts separators between items', async () => {
        const el = await fixture<UiItemGroup>(html`
            <ui-item-group>
                <ui-item></ui-item>
                <ui-item-separator></ui-item-separator>
                <ui-item></ui-item>
            </ui-item-group>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-item-separator')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item-separator — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item-separator — rendering', () => {
    it('renders without error', async () => {
        const el = await fixture<UiItemSeparator>(html`<ui-item-separator></ui-item-separator>`);
        expect(el).not.toBeNull();
    });

    it('has a shadow root', async () => {
        const el = await fixture<UiItemSeparator>(html`<ui-item-separator></ui-item-separator>`);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('has role="separator"', async () => {
        const el = await fixture<UiItemSeparator>(html`<ui-item-separator></ui-item-separator>`);
        expect(el.getAttribute('role')).toBe('separator');
    });

    it('has aria-orientation="horizontal"', async () => {
        const el = await fixture<UiItemSeparator>(html`<ui-item-separator></ui-item-separator>`);
        expect(el.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('renders empty shadow DOM (no slot, purely decorative)', async () => {
        const el = await fixture<UiItemSeparator>(html`<ui-item-separator></ui-item-separator>`);
        expect(el.shadowRoot!.querySelector('slot')).toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item-media — variant prop
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item-media — variant prop', () => {
    it('defaults to variant="default"', async () => {
        const el = await fixture<UiItemMedia>(html`<ui-item-media></ui-item-media>`);
        expect(el.variant).toBe('default');
        expect(el.getAttribute('variant')).toBe('default');
    });

    it('reflects variant="icon" attribute', async () => {
        const el = await fixture<UiItemMedia>(html`<ui-item-media variant="icon"></ui-item-media>`);
        expect(el.variant).toBe('icon');
    });

    it('reflects variant="image" attribute', async () => {
        const el = await fixture<UiItemMedia>(html`<ui-item-media variant="image"></ui-item-media>`);
        expect(el.variant).toBe('image');
    });

    it('applies .media--icon class when variant is "icon"', async () => {
        const el = await fixture<UiItemMedia>(html`<ui-item-media variant="icon"></ui-item-media>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--icon')).not.toBeNull();
    });

    it('applies .media--image class when variant is "image"', async () => {
        const el = await fixture<UiItemMedia>(html`<ui-item-media variant="image"></ui-item-media>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--image')).not.toBeNull();
    });

    it('does NOT apply .media--icon when variant is "default"', async () => {
        const el = await fixture<UiItemMedia>(html`<ui-item-media></ui-item-media>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--icon')).toBeNull();
    });

    it('does NOT apply .media--image when variant is "default"', async () => {
        const el = await fixture<UiItemMedia>(html`<ui-item-media></ui-item-media>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--image')).toBeNull();
    });

    it('updates class when variant property changes', async () => {
        const el = await fixture<UiItemMedia>(html`<ui-item-media></ui-item-media>`);
        el.variant = 'icon';
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--icon')).not.toBeNull();
        el.variant = 'image';
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--icon')).toBeNull();
        expect(el.shadowRoot!.querySelector('.media--image')).not.toBeNull();
        el.variant = 'default';
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--image')).toBeNull();
    });

    it('renders a .media wrapper div in shadow DOM', async () => {
        const el = await fixture<UiItemMedia>(html`<ui-item-media></ui-item-media>`);
        expect(el.shadowRoot!.querySelector('.media')).not.toBeNull();
    });

    it('renders a slot inside .media', async () => {
        const el = await fixture<UiItemMedia>(html`<ui-item-media></ui-item-media>`);
        expect(el.shadowRoot!.querySelector('.media slot')).not.toBeNull();
    });

    it('slots media content', async () => {
        const el = await fixture<UiItemMedia>(html`
            <ui-item-media><span id="ic">icon</span></ui-item-media>
        `);
        await el.updateComplete;
        expect(el.querySelector('#ic')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item-content — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item-content — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<UiItemContent>(html`<ui-item-content></ui-item-content>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots title and description', async () => {
        const el = await fixture<UiItemContent>(html`
            <ui-item-content>
                <ui-item-title>My Title</ui-item-title>
                <ui-item-description>My Desc</ui-item-description>
            </ui-item-content>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-item-title')!.textContent).toBe('My Title');
        expect(el.querySelector('ui-item-description')!.textContent).toBe('My Desc');
    });

    it('accepts arbitrary child elements', async () => {
        const el = await fixture<UiItemContent>(html`
            <ui-item-content><span id="custom">custom</span></ui-item-content>
        `);
        await el.updateComplete;
        expect(el.querySelector('#custom')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item-title — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item-title — rendering', () => {
    it('renders slotted text', async () => {
        const el = await fixture<UiItemTitle>(html`<ui-item-title>My Title</ui-item-title>`);
        expect(el.textContent!.trim()).toBe('My Title');
    });

    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<UiItemTitle>(html`<ui-item-title>T</ui-item-title>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('updates text content reactively', async () => {
        const el = await fixture<UiItemTitle>(html`<ui-item-title>Old</ui-item-title>`);
        el.textContent = 'New';
        await el.updateComplete;
        expect(el.textContent!.trim()).toBe('New');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item-description — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item-description — rendering', () => {
    it('renders slotted text', async () => {
        const el = await fixture<UiItemDescription>(html`<ui-item-description>Some desc.</ui-item-description>`);
        expect(el.textContent!.trim()).toBe('Some desc.');
    });

    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<UiItemDescription>(html`<ui-item-description>D</ui-item-description>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('renders empty without error', async () => {
        const el = await fixture<UiItemDescription>(html`<ui-item-description></ui-item-description>`);
        expect(el).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item-actions — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item-actions — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<UiItemActions>(html`<ui-item-actions></ui-item-actions>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots action buttons', async () => {
        const el = await fixture<UiItemActions>(html`
            <ui-item-actions>
                <button id="btn1">Action 1</button>
                <button id="btn2">Action 2</button>
            </ui-item-actions>
        `);
        await el.updateComplete;
        expect(el.querySelectorAll('button').length).toBe(2);
    });

    it('slots icon elements', async () => {
        const el = await fixture<UiItemActions>(html`
            <ui-item-actions>
                <span id="icon">→</span>
            </ui-item-actions>
        `);
        await el.updateComplete;
        expect(el.querySelector('#icon')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item-header — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item-header — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<UiItemHeader>(html`<ui-item-header></ui-item-header>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots header content', async () => {
        const el = await fixture<UiItemHeader>(html`
            <ui-item-header>
                <img id="hero" src="hero.jpg" alt="hero" />
            </ui-item-header>
        `);
        await el.updateComplete;
        expect(el.querySelector('#hero')).not.toBeNull();
    });

    it('renders empty without error', async () => {
        const el = await fixture<UiItemHeader>(html`<ui-item-header></ui-item-header>`);
        expect(el).not.toBeNull();
        expect(el.shadowRoot).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item-footer — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item-footer — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<UiItemFooter>(html`<ui-item-footer></ui-item-footer>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots footer content', async () => {
        const el = await fixture<UiItemFooter>(html`
            <ui-item-footer>
                <span id="meta">Added 3 days ago</span>
            </ui-item-footer>
        `);
        await el.updateComplete;
        expect(el.querySelector('#meta')).not.toBeNull();
    });

    it('renders empty without error', async () => {
        const el = await fixture<UiItemFooter>(html`<ui-item-footer></ui-item-footer>`);
        expect(el).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item — composition
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item — composition', () => {
    it('renders a full item with all sub-components', async () => {
        const el = await fixture<UiItem>(html`
            <ui-item variant="outline">
                <ui-item-media variant="icon">
                    <span>icon</span>
                </ui-item-media>
                <ui-item-content>
                    <ui-item-title>Security Alert</ui-item-title>
                    <ui-item-description>New login detected.</ui-item-description>
                </ui-item-content>
                <ui-item-actions>
                    <button>Review</button>
                </ui-item-actions>
            </ui-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-item-media')).not.toBeNull();
        expect(el.querySelector('ui-item-title')!.textContent!.trim()).toBe('Security Alert');
        expect(el.querySelector('ui-item-description')!.textContent!.trim()).toBe('New login detected.');
        expect(el.querySelector('ui-item-actions button')!.textContent).toBe('Review');
    });

    it('renders an item with header and footer', async () => {
        const el = await fixture<UiItem>(html`
            <ui-item variant="outline">
                <ui-item-header>
                    <img id="hero" src="hero.jpg" alt="hero" />
                </ui-item-header>
                <ui-item-content>
                    <ui-item-title>Card Title</ui-item-title>
                </ui-item-content>
                <ui-item-footer>
                    <span id="meta">Updated today</span>
                </ui-item-footer>
            </ui-item>
        `);
        await el.updateComplete;
        const header = el.querySelector('ui-item-header') as UiItemHeader;
        expect(header).not.toBeNull();
        // check header has at least one child element slotted in
        expect(header.childElementCount).toBeGreaterThan(0);
        const footer = el.querySelector('ui-item-footer') as UiItemFooter;
        expect(footer).not.toBeNull();
        expect(footer.childElementCount).toBeGreaterThan(0);
    });

    it('works without media (content + actions only)', async () => {
        const el = await fixture<UiItem>(html`
            <ui-item variant="outline">
                <ui-item-content>
                    <ui-item-title>No Media</ui-item-title>
                    <ui-item-description>Simple layout.</ui-item-description>
                </ui-item-content>
                <ui-item-actions>
                    <button>Click</button>
                </ui-item-actions>
            </ui-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-item-media')).toBeNull();
        expect(el.querySelector('ui-item-title')!.textContent!.trim()).toBe('No Media');
    });

    it('works with title only (minimal item)', async () => {
        const el = await fixture<UiItem>(html`
            <ui-item>
                <ui-item-title>Minimal</ui-item-title>
            </ui-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-item-title')!.textContent!.trim()).toBe('Minimal');
    });

    it('renders empty item without error', async () => {
        const el = await fixture<UiItem>(html`<ui-item variant="outline"></ui-item>`);
        expect(el).not.toBeNull();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-item-group — composition with separator
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item-group — composition', () => {
    it('renders all children in correct order', async () => {
        const el = await fixture<UiItemGroup>(html`
            <ui-item-group>
                <ui-item id="item-a">
                    <ui-item-title>Alice</ui-item-title>
                </ui-item>
                <ui-item-separator></ui-item-separator>
                <ui-item id="item-b">
                    <ui-item-title>Bob</ui-item-title>
                </ui-item>
            </ui-item-group>
        `);
        await el.updateComplete;

        const children = Array.from(el.children);
        expect(children[0].id).toBe('item-a');
        expect(children[1].tagName.toLowerCase()).toBe('ui-item-separator');
        expect(children[2].id).toBe('item-b');
    });

    it('accepts items without separators', async () => {
        const el = await fixture<UiItemGroup>(html`
            <ui-item-group>
                <ui-item><ui-item-title>One</ui-item-title></ui-item>
                <ui-item><ui-item-title>Two</ui-item-title></ui-item>
                <ui-item><ui-item-title>Three</ui-item-title></ui-item>
            </ui-item-group>
        `);
        await el.updateComplete;
        expect(el.querySelectorAll('ui-item').length).toBe(3);
        expect(el.querySelector('ui-item-separator')).toBeNull();
    });

    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<UiItemGroup>(html`<ui-item-group></ui-item-group>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   corner cases
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-item — corner cases', () => {
    it('allows multiple ui-item-content side by side (e.g. duration column)', async () => {
        const el = await fixture<UiItem>(html`
            <ui-item>
                <ui-item-content id="main">
                    <ui-item-title>Song Title</ui-item-title>
                </ui-item-content>
                <ui-item-content id="side">
                    <ui-item-description>3:45</ui-item-description>
                </ui-item-content>
            </ui-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('#main')).not.toBeNull();
        expect(el.querySelector('#side')).not.toBeNull();
    });

    it('allows non-component children inside ui-item', async () => {
        const el = await fixture<UiItem>(html`
            <ui-item>
                <span id="raw">raw text</span>
            </ui-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('#raw')!.textContent).toBe('raw text');
    });

    it('ui-item-media with no children renders without error', async () => {
        const el = await fixture<UiItemMedia>(html`<ui-item-media variant="icon"></ui-item-media>`);
        expect(el.shadowRoot!.querySelector('.media--icon')).not.toBeNull();
    });

    it('ui-item-actions with no children renders without error', async () => {
        const el = await fixture<UiItemActions>(html`<ui-item-actions></ui-item-actions>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('dynamically changing variant updates the reflected attribute', async () => {
        const el = await fixture<UiItem>(html`<ui-item></ui-item>`);
        const variants = ['outline', 'muted', 'default'] as const;
        for (const v of variants) {
            el.variant = v;
            await el.updateComplete;
            expect(el.getAttribute('variant')).toBe(v);
        }
    });

    it('ui-item size="default" reflects attribute at init', async () => {
        const el = await fixture<UiItem>(html`<ui-item></ui-item>`);
        expect(el.size).toBe('default');
        expect(el.getAttribute('size')).toBe('default');
    });

    it('ui-item variant changes via setAttribute', async () => {
        const el = await fixture<UiItem>(html`<ui-item></ui-item>`);
        el.setAttribute('variant', 'outline');
        await el.updateComplete;
        expect(el.variant).toBe('outline');
    });

    it('ui-item-group renders empty without error', async () => {
        const el = await fixture<UiItemGroup>(html`<ui-item-group></ui-item-group>`);
        expect(el).not.toBeNull();
        expect(el.children.length).toBe(0);
    });

    it('ui-item-media slots an img in image variant', async () => {
        const el = await fixture<UiItemMedia>(html`
            <ui-item-media variant="image">
                <img id="thumb" src="thumb.jpg" alt="thumb" />
            </ui-item-media>
        `);
        await el.updateComplete;
        expect(el.querySelector('#thumb')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.media--image')).not.toBeNull();
    });

    it('full composition: header + media + content + actions + footer', async () => {
        const el = await fixture<UiItem>(html`
            <ui-item variant="outline">
                <ui-item-header><img id="hdr" src="h.jpg" alt="h" /></ui-item-header>
                <ui-item-media variant="icon"><span>ic</span></ui-item-media>
                <ui-item-content>
                    <ui-item-title>Full Item</ui-item-title>
                    <ui-item-description>All parts.</ui-item-description>
                </ui-item-content>
                <ui-item-actions><button id="act">Go</button></ui-item-actions>
                <ui-item-footer><span id="ftr">Footer</span></ui-item-footer>
            </ui-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-item-header')).not.toBeNull();
        expect(el.querySelector('ui-item-media')).not.toBeNull();
        expect(el.querySelector('ui-item-title')!.textContent!.trim()).toBe('Full Item');
        expect(el.querySelector('#act')).not.toBeNull();
        expect(el.querySelector('ui-item-footer')).not.toBeNull();
    });

    it('dynamically adding children to ui-item-group is reflected', async () => {
        const el = await fixture<UiItemGroup>(html`
            <ui-item-group>
                <ui-item id="existing"></ui-item>
            </ui-item-group>
        `);
        await el.updateComplete;

        const newItem = document.createElement('ui-item') as UiItem;
        newItem.id = 'dynamic';
        el.appendChild(newItem);
        await el.updateComplete;

        expect(el.querySelector('#dynamic')).not.toBeNull();
        expect(el.querySelectorAll('ui-item').length).toBe(2);
    });
});
