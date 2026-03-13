import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-empty';
import type { UiEmpty, UiEmptyHeader, UiEmptyMedia, UiEmptyContent } from './ui-empty';

/* ═══════════════════════════════════════════════════════════════════════════
   ui-empty — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-empty — rendering', () => {
    it('renders a .container div via shadow DOM', async () => {
        const el = await fixture<UiEmpty>(html`<ui-empty></ui-empty>`);
        expect(el.shadowRoot!.querySelector('.container')).not.toBeNull();
    });

    it('exposes a "container" part on the inner div', async () => {
        const el = await fixture<UiEmpty>(html`<ui-empty></ui-empty>`);
        expect(el.shadowRoot!.querySelector('[part="container"]')).not.toBeNull();
    });

    it('has a slot inside the container', async () => {
        const el = await fixture<UiEmpty>(html`<ui-empty></ui-empty>`);
        expect(el.shadowRoot!.querySelector('.container slot')).not.toBeNull();
    });

    it('slots children into the container', async () => {
        const el = await fixture<UiEmpty>(html`
            <ui-empty>
                <ui-empty-header></ui-empty-header>
                <ui-empty-content></ui-empty-content>
            </ui-empty>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-empty-header')).not.toBeNull();
        expect(el.querySelector('ui-empty-content')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-empty-header — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-empty-header — rendering', () => {
    it('renders a slot', async () => {
        const el = await fixture<UiEmptyHeader>(html`<ui-empty-header></ui-empty-header>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots title and description', async () => {
        const el = await fixture<UiEmptyHeader>(html`
            <ui-empty-header>
                <ui-empty-title>My Title</ui-empty-title>
                <ui-empty-description>My Desc</ui-empty-description>
            </ui-empty-header>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-empty-title')!.textContent).toBe('My Title');
        expect(el.querySelector('ui-empty-description')!.textContent).toBe('My Desc');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-empty-media — variant prop
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-empty-media — variant prop', () => {
    it('defaults to variant="default"', async () => {
        const el = await fixture<UiEmptyMedia>(html`<ui-empty-media></ui-empty-media>`);
        expect(el.variant).toBe('default');
        expect(el.getAttribute('variant')).toBe('default');
    });

    it('reflects variant="icon" attribute', async () => {
        const el = await fixture<UiEmptyMedia>(html`<ui-empty-media variant="icon"></ui-empty-media>`);
        expect(el.variant).toBe('icon');
        expect(el.getAttribute('variant')).toBe('icon');
    });

    it('applies .media--icon class when variant is "icon"', async () => {
        const el = await fixture<UiEmptyMedia>(html`<ui-empty-media variant="icon"></ui-empty-media>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.media');
        expect(div!.classList.contains('media--icon')).toBe(true);
    });

    it('does NOT apply .media--icon class when variant is "default"', async () => {
        const el = await fixture<UiEmptyMedia>(html`<ui-empty-media variant="default"></ui-empty-media>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.media');
        expect(div!.classList.contains('media--icon')).toBe(false);
    });

    it('updates class when variant property changes', async () => {
        const el = await fixture<UiEmptyMedia>(html`<ui-empty-media></ui-empty-media>`);
        el.variant = 'icon';
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--icon')).not.toBeNull();
        el.variant = 'default';
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.media--icon')).toBeNull();
    });

    it('slots media content', async () => {
        const el = await fixture<UiEmptyMedia>(html`
            <ui-empty-media variant="icon">
                <span id="icon">SVG</span>
            </ui-empty-media>
        `);
        await el.updateComplete;
        expect(el.querySelector('#icon')).not.toBeNull();
    });

    it('renders a .media div in shadow DOM', async () => {
        const el = await fixture<UiEmptyMedia>(html`<ui-empty-media></ui-empty-media>`);
        expect(el.shadowRoot!.querySelector('.media')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-empty-title — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-empty-title — rendering', () => {
    it('renders slotted text', async () => {
        const el = await fixture(html`<ui-empty-title>No Data</ui-empty-title>`);
        expect(el.textContent!.trim()).toBe('No Data');
    });

    it('renders a slot in shadow DOM', async () => {
        const el = await fixture(html`<ui-empty-title>T</ui-empty-title>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-empty-description — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-empty-description — rendering', () => {
    it('renders slotted text', async () => {
        const el = await fixture(html`<ui-empty-description>No items found.</ui-empty-description>`);
        expect(el.textContent!.trim()).toBe('No items found.');
    });

    it('renders a slot in shadow DOM', async () => {
        const el = await fixture(html`<ui-empty-description>D</ui-empty-description>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-empty-content — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-empty-content — rendering', () => {
    it('renders a slot', async () => {
        const el = await fixture<UiEmptyContent>(html`<ui-empty-content></ui-empty-content>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('slots action elements', async () => {
        const el = await fixture<UiEmptyContent>(html`
            <ui-empty-content>
                <button>Create</button>
                <button>Import</button>
            </ui-empty-content>
        `);
        await el.updateComplete;
        const buttons = el.querySelectorAll('button');
        expect(buttons.length).toBe(2);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-empty — composition
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-empty — composition', () => {
    it('renders a full empty state with all sub-components', async () => {
        const el = await fixture<UiEmpty>(html`
            <ui-empty>
                <ui-empty-header>
                    <ui-empty-media variant="icon">
                        <span>icon</span>
                    </ui-empty-media>
                    <ui-empty-title>No Projects Yet</ui-empty-title>
                    <ui-empty-description>
                        You haven't created any projects yet.
                    </ui-empty-description>
                </ui-empty-header>
                <ui-empty-content>
                    <button>Create Project</button>
                </ui-empty-content>
            </ui-empty>
        `);
        await el.updateComplete;

        expect(el.querySelector('ui-empty-header')).not.toBeNull();
        expect(el.querySelector('ui-empty-media')).not.toBeNull();
        expect(el.querySelector('ui-empty-title')!.textContent!.trim()).toBe('No Projects Yet');
        expect(el.querySelector('ui-empty-description')!.textContent!.trim()).toContain("You haven't created any projects yet.");
        expect(el.querySelector('ui-empty-content')!.querySelector('button')!.textContent).toBe('Create Project');
    });

    it('allows extra elements (e.g. links) as direct children of ui-empty', async () => {
        const el = await fixture<UiEmpty>(html`
            <ui-empty>
                <ui-empty-header>
                    <ui-empty-title>Empty</ui-empty-title>
                </ui-empty-header>
                <a id="link" href="#">Learn More</a>
            </ui-empty>
        `);
        await el.updateComplete;
        expect(el.querySelector('#link')).not.toBeNull();
    });

    it('renders without media (no EmptyMedia required)', async () => {
        const el = await fixture<UiEmpty>(html`
            <ui-empty>
                <ui-empty-header>
                    <ui-empty-title>404 Not Found</ui-empty-title>
                    <ui-empty-description>Page does not exist.</ui-empty-description>
                </ui-empty-header>
            </ui-empty>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-empty-media')).toBeNull();
        expect(el.querySelector('ui-empty-title')!.textContent!.trim()).toBe('404 Not Found');
    });

    it('renders without content (only header)', async () => {
        const el = await fixture<UiEmpty>(html`
            <ui-empty>
                <ui-empty-header>
                    <ui-empty-title>Empty State</ui-empty-title>
                </ui-empty-header>
            </ui-empty>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-empty-content')).toBeNull();
        expect(el.querySelector('ui-empty-title')!.textContent!.trim()).toBe('Empty State');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-empty — shadow DOM structure
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-empty — shadow DOM structure', () => {
    it('container has a slot as its only child', async () => {
        const el = await fixture<UiEmpty>(html`<ui-empty></ui-empty>`);
        const container = el.shadowRoot!.querySelector('.container')!;
        const children = Array.from(container.childNodes).filter(n => n.nodeType === Node.ELEMENT_NODE);
        expect(children.length).toBe(1);
        expect((children[0] as Element).tagName.toLowerCase()).toBe('slot');
    });

    it('media shadow root contains a .media wrapper with a slot', async () => {
        const el = await fixture<UiEmptyMedia>(html`<ui-empty-media></ui-empty-media>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.media')!;
        expect(wrapper.querySelector('slot')).not.toBeNull();
    });
});
