import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-empty';
import type { FlintEmpty, FlintEmptyHeader, FlintEmptyMedia, FlintEmptyContent } from './flint-empty';

/* ═══════════════════════════════════════════════════════════════════════════
   flint-empty — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-empty — rendering', () => {
    it('renders a .container div via shadow DOM', async () => {
        const el = await fixture<FlintEmpty>(html`<flint-empty></flint-empty>`);
        expect(el.shadowRoot!.querySelector('.container')).not.toBeNull();
    });

    it('exposes a "container" part on the inner div', async () => {
        const el = await fixture<FlintEmpty>(html`<flint-empty></flint-empty>`);
        expect(el.shadowRoot!.querySelector('[part="container"]')).not.toBeNull();
    });

    it('has a slot inside the container', async () => {
        const el = await fixture<FlintEmpty>(html`<flint-empty></flint-empty>`);
        expect(el.shadowRoot!.querySelector('.container slot')).not.toBeNull();
    });

    it('slots children into the container', async () => {
        const el = await fixture<FlintEmpty>(html`
            <flint-empty>
                <flint-empty-header></flint-empty-header>
                <flint-empty-content></flint-empty-content>
            </flint-empty>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-empty-header')).not.toBeNull();
        expect(el.querySelector('flint-empty-content')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-empty-header — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-empty-header — rendering', () => {
    it('renders a slot', async () => {
        const el = await fixture<FlintEmptyHeader>(html`<flint-empty-header></flint-empty-header>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots title and description', async () => {
        const el = await fixture<FlintEmptyHeader>(html`
            <flint-empty-header>
                <flint-empty-title>My Title</flint-empty-title>
                <flint-empty-description>My Desc</flint-empty-description>
            </flint-empty-header>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-empty-title')!.textContent).toBe('My Title');
        expect(el.querySelector('flint-empty-description')!.textContent).toBe('My Desc');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-empty-media — variant prop
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-empty-media — variant prop', () => {
    it('defaults to variant="default"', async () => {
        const el = await fixture<FlintEmptyMedia>(html`<flint-empty-media></flint-empty-media>`);
        expect(el.variant).toBe('default');
        expect(el.getAttribute('variant')).toBe('default');
    });

    it('reflects variant="icon" attribute', async () => {
        const el = await fixture<FlintEmptyMedia>(html`<flint-empty-media variant="icon"></flint-empty-media>`);
        expect(el.variant).toBe('icon');
        expect(el.getAttribute('variant')).toBe('icon');
    });

    it('applies .media--icon class when variant is "icon"', async () => {
        const el = await fixture<FlintEmptyMedia>(html`<flint-empty-media variant="icon"></flint-empty-media>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.media');
        expect(div!.classList.contains('media--icon')).toBe(true);
    });

    it('does NOT apply .media--icon class when variant is "default"', async () => {
        const el = await fixture<FlintEmptyMedia>(html`<flint-empty-media variant="default"></flint-empty-media>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.media');
        expect(div!.classList.contains('media--icon')).toBe(false);
    });

    it('updates class when variant property changes', async () => {
        const el = await fixture<FlintEmptyMedia>(html`<flint-empty-media></flint-empty-media>`);
        el.variant = 'icon';
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--icon')).not.toBeNull();
        el.variant = 'default';
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--icon')).toBeNull();
    });

    it('slots media content', async () => {
        const el = await fixture<FlintEmptyMedia>(html`
            <flint-empty-media variant="icon">
                <span id="icon">SVG</span>
            </flint-empty-media>
        `);
        await el.updateComplete;
        expect(el.querySelector('#icon')).not.toBeNull();
    });

    it('renders a .media div in shadow DOM', async () => {
        const el = await fixture<FlintEmptyMedia>(html`<flint-empty-media></flint-empty-media>`);
        expect(el.shadowRoot!.querySelector('.media')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-empty-title — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-empty-title — rendering', () => {
    it('renders slotted text', async () => {
        const el = await fixture(html`<flint-empty-title>No Data</flint-empty-title>`);
        expect(el.textContent!.trim()).toBe('No Data');
    });

    it('renders a slot in shadow DOM', async () => {
        const el = await fixture(html`<flint-empty-title>T</flint-empty-title>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-empty-description — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-empty-description — rendering', () => {
    it('renders slotted text', async () => {
        const el = await fixture(html`<flint-empty-description>No items found.</flint-empty-description>`);
        expect(el.textContent!.trim()).toBe('No items found.');
    });

    it('renders a slot in shadow DOM', async () => {
        const el = await fixture(html`<flint-empty-description>D</flint-empty-description>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-empty-content — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-empty-content — rendering', () => {
    it('renders a slot', async () => {
        const el = await fixture<FlintEmptyContent>(html`<flint-empty-content></flint-empty-content>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots action elements', async () => {
        const el = await fixture<FlintEmptyContent>(html`
            <flint-empty-content>
                <button>Create</button>
                <button>Import</button>
            </flint-empty-content>
        `);
        await el.updateComplete;
        const buttons = el.querySelectorAll('button');
        expect(buttons.length).toBe(2);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-empty — composition
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-empty — composition', () => {
    it('renders a full empty state with all sub-components', async () => {
        const el = await fixture<FlintEmpty>(html`
            <flint-empty>
                <flint-empty-header>
                    <flint-empty-media variant="icon">
                        <span>icon</span>
                    </flint-empty-media>
                    <flint-empty-title>No Projects Yet</flint-empty-title>
                    <flint-empty-description>
                        You haven't created any projects yet.
                    </flint-empty-description>
                </flint-empty-header>
                <flint-empty-content>
                    <button>Create Project</button>
                </flint-empty-content>
            </flint-empty>
        `);
        await el.updateComplete;

        expect(el.querySelector('flint-empty-header')).not.toBeNull();
        expect(el.querySelector('flint-empty-media')).not.toBeNull();
        expect(el.querySelector('flint-empty-title')!.textContent!.trim()).toBe('No Projects Yet');
        expect(el.querySelector('flint-empty-description')!.textContent!.trim()).toContain("You haven't created any projects yet.");
        expect(el.querySelector('flint-empty-content')!.querySelector('button')!.textContent).toBe('Create Project');
    });

    it('allows extra elements (e.g. links) as direct children of flint-empty', async () => {
        const el = await fixture<FlintEmpty>(html`
            <flint-empty>
                <flint-empty-header>
                    <flint-empty-title>Empty</flint-empty-title>
                </flint-empty-header>
                <a id="link" href="#">Learn More</a>
            </flint-empty>
        `);
        await el.updateComplete;
        expect(el.querySelector('#link')).not.toBeNull();
    });

    it('renders without media (no EmptyMedia required)', async () => {
        const el = await fixture<FlintEmpty>(html`
            <flint-empty>
                <flint-empty-header>
                    <flint-empty-title>404 Not Found</flint-empty-title>
                    <flint-empty-description>Page does not exist.</flint-empty-description>
                </flint-empty-header>
            </flint-empty>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-empty-media')).toBeNull();
        expect(el.querySelector('flint-empty-title')!.textContent!.trim()).toBe('404 Not Found');
    });

    it('renders without content (only header)', async () => {
        const el = await fixture<FlintEmpty>(html`
            <flint-empty>
                <flint-empty-header>
                    <flint-empty-title>Empty State</flint-empty-title>
                </flint-empty-header>
            </flint-empty>
        `);
        await el.updateComplete;
        expect(el.querySelector('flint-empty-content')).toBeNull();
        expect(el.querySelector('flint-empty-title')!.textContent!.trim()).toBe('Empty State');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-empty — shadow DOM structure
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-empty — shadow DOM structure', () => {
    it('container has a slot as its only child', async () => {
        const el = await fixture<FlintEmpty>(html`<flint-empty></flint-empty>`);
        const container = el.shadowRoot!.querySelector('.container')!;
        const children = Array.from(container.childNodes).filter(n => n.nodeType === Node.ELEMENT_NODE);
        expect(children.length).toBe(1);
        expect((children[0] as Element).tagName.toLowerCase()).toBe('slot');
    });

    it('media shadow root contains a .media wrapper with a slot', async () => {
        const el = await fixture<FlintEmptyMedia>(html`<flint-empty-media></flint-empty-media>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.media')!;
        expect(wrapper.querySelector('slot')).not.toBeNull();
    });
});
