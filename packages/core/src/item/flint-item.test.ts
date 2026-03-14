import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-item';
import type {
    FlintItem,
    FlintItemGroup,
    FlintItemMedia,
    FlintItemContent,
    FlintItemTitle,
    FlintItemDescription,
    FlintItemActions,
    FlintItemHeader,
    FlintItemFooter,
    FlintItemSeparator,
} from './flint-item';

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<FlintItem>(html`<flint-item></flint-item>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('defaults variant to "default"', async () => {
        const el = await fixture<FlintItem>(html`<flint-item></flint-item>`);
        expect(el.variant).toBe('default');
    });

    it('defaults size to "default"', async () => {
        const el = await fixture<FlintItem>(html`<flint-item></flint-item>`);
        expect(el.size).toBe('default');
    });

    it('slots child elements', async () => {
        const el = await fixture<FlintItem>(html`
            <flint-item>
                <flint-item-content><flint-item-title>Hello</flint-item-title></flint-item-content>
            </flint-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-item-title')).not.toBeNull();
    });

    it('slots multiple children', async () => {
        const el = await fixture<FlintItem>(html`
            <flint-item>
                <flint-item-media></flint-item-media>
                <flint-item-content></flint-item-content>
                <flint-item-actions></flint-item-actions>
            </flint-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-item-media')).not.toBeNull();
        expect(el.querySelector('flint-item-content')).not.toBeNull();
        expect(el.querySelector('flint-item-actions')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item — variant prop
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item — variant prop', () => {
    it('reflects variant="outline" attribute', async () => {
        const el = await fixture<FlintItem>(html`<flint-item variant="outline"></flint-item>`);
        expect(el.variant).toBe('outline');
        expect(el.getAttribute('variant')).toBe('outline');
    });

    it('reflects variant="muted" attribute', async () => {
        const el = await fixture<FlintItem>(html`<flint-item variant="muted"></flint-item>`);
        expect(el.variant).toBe('muted');
        expect(el.getAttribute('variant')).toBe('muted');
    });

    it('updates reflected attribute when variant property changes', async () => {
        const el = await fixture<FlintItem>(html`<flint-item></flint-item>`);
        el.variant = 'outline';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('outline');
    });

    it('reflects variant change from outline to muted', async () => {
        const el = await fixture<FlintItem>(html`<flint-item variant="outline"></flint-item>`);
        el.variant = 'muted';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('muted');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item — size prop
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item — size prop', () => {
    it('reflects size="sm" attribute', async () => {
        const el = await fixture<FlintItem>(html`<flint-item size="sm"></flint-item>`);
        expect(el.size).toBe('sm');
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('reflects size="xs" attribute', async () => {
        const el = await fixture<FlintItem>(html`<flint-item size="xs"></flint-item>`);
        expect(el.size).toBe('xs');
        expect(el.getAttribute('size')).toBe('xs');
    });

    it('updates reflected attribute when size property changes', async () => {
        const el = await fixture<FlintItem>(html`<flint-item></flint-item>`);
        el.size = 'sm';
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('can change from sm to xs', async () => {
        const el = await fixture<FlintItem>(html`<flint-item size="sm"></flint-item>`);
        el.size = 'xs';
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('xs');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item-group — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item-group — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<FlintItemGroup>(html`<flint-item-group></flint-item-group>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('groups multiple items', async () => {
        const el = await fixture<FlintItemGroup>(html`
            <flint-item-group>
                <flint-item id="a"></flint-item>
                <flint-item id="b"></flint-item>
            </flint-item-group>
        `);
        await el.updateComplete;
        expect(el.querySelectorAll('flint-item').length).toBe(2);
    });

    it('accepts separators between items', async () => {
        const el = await fixture<FlintItemGroup>(html`
            <flint-item-group>
                <flint-item></flint-item>
                <flint-item-separator></flint-item-separator>
                <flint-item></flint-item>
            </flint-item-group>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-item-separator')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item-separator — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item-separator — rendering', () => {
    it('renders without error', async () => {
        const el = await fixture<FlintItemSeparator>(html`<flint-item-separator></flint-item-separator>`);
        expect(el).not.toBeNull();
    });

    it('has a shadow root', async () => {
        const el = await fixture<FlintItemSeparator>(html`<flint-item-separator></flint-item-separator>`);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('has role="separator"', async () => {
        const el = await fixture<FlintItemSeparator>(html`<flint-item-separator></flint-item-separator>`);
        expect(el.getAttribute('role')).toBe('separator');
    });

    it('has aria-orientation="horizontal"', async () => {
        const el = await fixture<FlintItemSeparator>(html`<flint-item-separator></flint-item-separator>`);
        expect(el.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('renders empty shadow DOM (no slot, purely decorative)', async () => {
        const el = await fixture<FlintItemSeparator>(html`<flint-item-separator></flint-item-separator>`);
        expect(el.shadowRoot!.querySelector('slot')).toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item-media — variant prop
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item-media — variant prop', () => {
    it('defaults to variant="default"', async () => {
        const el = await fixture<FlintItemMedia>(html`<flint-item-media></flint-item-media>`);
        expect(el.variant).toBe('default');
        expect(el.getAttribute('variant')).toBe('default');
    });

    it('reflects variant="icon" attribute', async () => {
        const el = await fixture<FlintItemMedia>(html`<flint-item-media variant="icon"></flint-item-media>`);
        expect(el.variant).toBe('icon');
    });

    it('reflects variant="image" attribute', async () => {
        const el = await fixture<FlintItemMedia>(html`<flint-item-media variant="image"></flint-item-media>`);
        expect(el.variant).toBe('image');
    });

    it('applies .media--icon class when variant is "icon"', async () => {
        const el = await fixture<FlintItemMedia>(html`<flint-item-media variant="icon"></flint-item-media>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--icon')).not.toBeNull();
    });

    it('applies .media--image class when variant is "image"', async () => {
        const el = await fixture<FlintItemMedia>(html`<flint-item-media variant="image"></flint-item-media>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--image')).not.toBeNull();
    });

    it('does NOT apply .media--icon when variant is "default"', async () => {
        const el = await fixture<FlintItemMedia>(html`<flint-item-media></flint-item-media>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--icon')).toBeNull();
    });

    it('does NOT apply .media--image when variant is "default"', async () => {
        const el = await fixture<FlintItemMedia>(html`<flint-item-media></flint-item-media>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--image')).toBeNull();
    });

    it('updates class when variant property changes', async () => {
        const el = await fixture<FlintItemMedia>(html`<flint-item-media></flint-item-media>`);
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
        const el = await fixture<FlintItemMedia>(html`<flint-item-media></flint-item-media>`);
        expect(el.shadowRoot!.querySelector('.media')).not.toBeNull();
    });

    it('renders a slot inside .media', async () => {
        const el = await fixture<FlintItemMedia>(html`<flint-item-media></flint-item-media>`);
        expect(el.shadowRoot!.querySelector('.media slot')).not.toBeNull();
    });

    it('slots media content', async () => {
        const el = await fixture<FlintItemMedia>(html`
            <flint-item-media><span id="ic">icon</span></flint-item-media>
        `);
        await el.updateComplete;
        expect(el.querySelector('#ic')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item-content — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item-content — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<FlintItemContent>(html`<flint-item-content></flint-item-content>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots title and description', async () => {
        const el = await fixture<FlintItemContent>(html`
            <flint-item-content>
                <flint-item-title>My Title</flint-item-title>
                <flint-item-description>My Desc</flint-item-description>
            </flint-item-content>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-item-title')!.textContent).toBe('My Title');
        expect(el.querySelector('flint-item-description')!.textContent).toBe('My Desc');
    });

    it('accepts arbitrary child elements', async () => {
        const el = await fixture<FlintItemContent>(html`
            <flint-item-content><span id="custom">custom</span></flint-item-content>
        `);
        await el.updateComplete;
        expect(el.querySelector('#custom')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item-title — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item-title — rendering', () => {
    it('renders slotted text', async () => {
        const el = await fixture<FlintItemTitle>(html`<flint-item-title>My Title</flint-item-title>`);
        expect(el.textContent!.trim()).toBe('My Title');
    });

    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<FlintItemTitle>(html`<flint-item-title>T</flint-item-title>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('updates text content reactively', async () => {
        const el = await fixture<FlintItemTitle>(html`<flint-item-title>Old</flint-item-title>`);
        el.textContent = 'New';
        await el.updateComplete;
        expect(el.textContent!.trim()).toBe('New');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item-description — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item-description — rendering', () => {
    it('renders slotted text', async () => {
        const el = await fixture<FlintItemDescription>(html`<flint-item-description>Some desc.</flint-item-description>`);
        expect(el.textContent!.trim()).toBe('Some desc.');
    });

    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<FlintItemDescription>(html`<flint-item-description>D</flint-item-description>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('renders empty without error', async () => {
        const el = await fixture<FlintItemDescription>(html`<flint-item-description></flint-item-description>`);
        expect(el).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item-actions — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item-actions — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<FlintItemActions>(html`<flint-item-actions></flint-item-actions>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots action buttons', async () => {
        const el = await fixture<FlintItemActions>(html`
            <flint-item-actions>
                <button id="btn1">Action 1</button>
                <button id="btn2">Action 2</button>
            </flint-item-actions>
        `);
        await el.updateComplete;
        expect(el.querySelectorAll('button').length).toBe(2);
    });

    it('slots icon elements', async () => {
        const el = await fixture<FlintItemActions>(html`
            <flint-item-actions>
                <span id="icon">→</span>
            </flint-item-actions>
        `);
        await el.updateComplete;
        expect(el.querySelector('#icon')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item-header — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item-header — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<FlintItemHeader>(html`<flint-item-header></flint-item-header>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots header content', async () => {
        const el = await fixture<FlintItemHeader>(html`
            <flint-item-header>
                <img id="hero" src="hero.jpg" alt="hero" />
            </flint-item-header>
        `);
        await el.updateComplete;
        expect(el.querySelector('#hero')).not.toBeNull();
    });

    it('renders empty without error', async () => {
        const el = await fixture<FlintItemHeader>(html`<flint-item-header></flint-item-header>`);
        expect(el).not.toBeNull();
        expect(el.shadowRoot).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item-footer — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item-footer — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<FlintItemFooter>(html`<flint-item-footer></flint-item-footer>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots footer content', async () => {
        const el = await fixture<FlintItemFooter>(html`
            <flint-item-footer>
                <span id="meta">Added 3 days ago</span>
            </flint-item-footer>
        `);
        await el.updateComplete;
        expect(el.querySelector('#meta')).not.toBeNull();
    });

    it('renders empty without error', async () => {
        const el = await fixture<FlintItemFooter>(html`<flint-item-footer></flint-item-footer>`);
        expect(el).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item — composition
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item — composition', () => {
    it('renders a full item with all sub-components', async () => {
        const el = await fixture<FlintItem>(html`
            <flint-item variant="outline">
                <flint-item-media variant="icon">
                    <span>icon</span>
                </flint-item-media>
                <flint-item-content>
                    <flint-item-title>Security Alert</flint-item-title>
                    <flint-item-description>New login detected.</flint-item-description>
                </flint-item-content>
                <flint-item-actions>
                    <button>Review</button>
                </flint-item-actions>
            </flint-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-item-media')).not.toBeNull();
        expect(el.querySelector('flint-item-title')!.textContent!.trim()).toBe('Security Alert');
        expect(el.querySelector('flint-item-description')!.textContent!.trim()).toBe('New login detected.');
        expect(el.querySelector('flint-item-actions button')!.textContent).toBe('Review');
    });

    it('renders an item with header and footer', async () => {
        const el = await fixture<FlintItem>(html`
            <flint-item variant="outline">
                <flint-item-header>
                    <img id="hero" src="hero.jpg" alt="hero" />
                </flint-item-header>
                <flint-item-content>
                    <flint-item-title>Card Title</flint-item-title>
                </flint-item-content>
                <flint-item-footer>
                    <span id="meta">Updated today</span>
                </flint-item-footer>
            </flint-item>
        `);
        await el.updateComplete;
        const header = el.querySelector('flint-item-header') as FlintItemHeader;
        expect(header).not.toBeNull();
        // check header has at least one child element slotted in
        expect(header.childElementCount).toBeGreaterThan(0);
        const footer = el.querySelector('flint-item-footer') as FlintItemFooter;
        expect(footer).not.toBeNull();
        expect(footer.childElementCount).toBeGreaterThan(0);
    });

    it('works without media (content + actions only)', async () => {
        const el = await fixture<FlintItem>(html`
            <flint-item variant="outline">
                <flint-item-content>
                    <flint-item-title>No Media</flint-item-title>
                    <flint-item-description>Simple layout.</flint-item-description>
                </flint-item-content>
                <flint-item-actions>
                    <button>Click</button>
                </flint-item-actions>
            </flint-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-item-media')).toBeNull();
        expect(el.querySelector('flint-item-title')!.textContent!.trim()).toBe('No Media');
    });

    it('works with title only (minimal item)', async () => {
        const el = await fixture<FlintItem>(html`
            <flint-item>
                <flint-item-title>Minimal</flint-item-title>
            </flint-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-item-title')!.textContent!.trim()).toBe('Minimal');
    });

    it('renders empty item without error', async () => {
        const el = await fixture<FlintItem>(html`<flint-item variant="outline"></flint-item>`);
        expect(el).not.toBeNull();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-item-group — composition with separator
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item-group — composition', () => {
    it('renders all children in correct order', async () => {
        const el = await fixture<FlintItemGroup>(html`
            <flint-item-group>
                <flint-item id="item-a">
                    <flint-item-title>Alice</flint-item-title>
                </flint-item>
                <flint-item-separator></flint-item-separator>
                <flint-item id="item-b">
                    <flint-item-title>Bob</flint-item-title>
                </flint-item>
            </flint-item-group>
        `);
        await el.updateComplete;

        const children = Array.from(el.children);
        expect(children[0].id).toBe('item-a');
        expect(children[1].tagName.toLowerCase()).toBe('flint-item-separator');
        expect(children[2].id).toBe('item-b');
    });

    it('accepts items without separators', async () => {
        const el = await fixture<FlintItemGroup>(html`
            <flint-item-group>
                <flint-item><flint-item-title>One</flint-item-title></flint-item>
                <flint-item><flint-item-title>Two</flint-item-title></flint-item>
                <flint-item><flint-item-title>Three</flint-item-title></flint-item>
            </flint-item-group>
        `);
        await el.updateComplete;
        expect(el.querySelectorAll('flint-item').length).toBe(3);
        expect(el.querySelector('flint-item-separator')).toBeNull();
    });

    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<FlintItemGroup>(html`<flint-item-group></flint-item-group>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   corner cases
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-item — corner cases', () => {
    it('allows multiple flint-item-content side by side (e.g. duration column)', async () => {
        const el = await fixture<FlintItem>(html`
            <flint-item>
                <flint-item-content id="main">
                    <flint-item-title>Song Title</flint-item-title>
                </flint-item-content>
                <flint-item-content id="side">
                    <flint-item-description>3:45</flint-item-description>
                </flint-item-content>
            </flint-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('#main')).not.toBeNull();
        expect(el.querySelector('#side')).not.toBeNull();
    });

    it('allows non-component children inside flint-item', async () => {
        const el = await fixture<FlintItem>(html`
            <flint-item>
                <span id="raw">raw text</span>
            </flint-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('#raw')!.textContent).toBe('raw text');
    });

    it('flint-item-media with no children renders without error', async () => {
        const el = await fixture<FlintItemMedia>(html`<flint-item-media variant="icon"></flint-item-media>`);
        expect(el.shadowRoot!.querySelector('.media--icon')).not.toBeNull();
    });

    it('flint-item-actions with no children renders without error', async () => {
        const el = await fixture<FlintItemActions>(html`<flint-item-actions></flint-item-actions>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('dynamically changing variant updates the reflected attribute', async () => {
        const el = await fixture<FlintItem>(html`<flint-item></flint-item>`);
        const variants = ['outline', 'muted', 'default'] as const;
        for (const v of variants) {
            el.variant = v;
            await el.updateComplete;
            expect(el.getAttribute('variant')).toBe(v);
        }
    });

    it('flint-item size="default" reflects attribute at init', async () => {
        const el = await fixture<FlintItem>(html`<flint-item></flint-item>`);
        expect(el.size).toBe('default');
        expect(el.getAttribute('size')).toBe('default');
    });

    it('flint-item variant changes via setAttribute', async () => {
        const el = await fixture<FlintItem>(html`<flint-item></flint-item>`);
        el.setAttribute('variant', 'outline');
        await el.updateComplete;
        expect(el.variant).toBe('outline');
    });

    it('flint-item-group renders empty without error', async () => {
        const el = await fixture<FlintItemGroup>(html`<flint-item-group></flint-item-group>`);
        expect(el).not.toBeNull();
        expect(el.children.length).toBe(0);
    });

    it('flint-item-media slots an img in image variant', async () => {
        const el = await fixture<FlintItemMedia>(html`
            <flint-item-media variant="image">
                <img id="thumb" src="thumb.jpg" alt="thumb" />
            </flint-item-media>
        `);
        await el.updateComplete;
        expect(el.querySelector('#thumb')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.media--image')).not.toBeNull();
    });

    it('full composition: header + media + content + actions + footer', async () => {
        const el = await fixture<FlintItem>(html`
            <flint-item variant="outline">
                <flint-item-header><img id="hdr" src="h.jpg" alt="h" /></flint-item-header>
                <flint-item-media variant="icon"><span>ic</span></flint-item-media>
                <flint-item-content>
                    <flint-item-title>Full Item</flint-item-title>
                    <flint-item-description>All parts.</flint-item-description>
                </flint-item-content>
                <flint-item-actions><button id="act">Go</button></flint-item-actions>
                <flint-item-footer><span id="ftr">Footer</span></flint-item-footer>
            </flint-item>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-item-header')).not.toBeNull();
        expect(el.querySelector('flint-item-media')).not.toBeNull();
        expect(el.querySelector('flint-item-title')!.textContent!.trim()).toBe('Full Item');
        expect(el.querySelector('#act')).not.toBeNull();
        expect(el.querySelector('flint-item-footer')).not.toBeNull();
    });

    it('does not override role if already set on separator', async () => {
        const el = await fixture<FlintItemSeparator>(html`<flint-item-separator role="none"></flint-item-separator>`);
        expect(el.getAttribute('role')).toBe('none');
    });

    it('does not override aria-orientation if already set on separator', async () => {
        const el = await fixture<FlintItemSeparator>(html`<flint-item-separator aria-orientation="vertical"></flint-item-separator>`);
        expect(el.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('dynamically adding children to flint-item-group is reflected', async () => {
        const el = await fixture<FlintItemGroup>(html`
            <flint-item-group>
                <flint-item id="existing"></flint-item>
            </flint-item-group>
        `);
        await el.updateComplete;

        const newItem = document.createElement('flint-item') as FlintItem;
        newItem.id = 'dynamic';
        el.appendChild(newItem);
        await el.updateComplete;

        expect(el.querySelector('#dynamic')).not.toBeNull();
        expect(el.querySelectorAll('flint-item').length).toBe(2);
    });
});
