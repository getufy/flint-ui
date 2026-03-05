import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-list';
import type { UiList, UiListItemButton, UiListItemText } from './ui-list';

// ---------------------------------------------------------------------------
// ui-list
// ---------------------------------------------------------------------------
describe('ui-list', () => {
    it('is defined', () => {
        expect(document.createElement('ui-list')).toBeInstanceOf(HTMLElement);
    });

    it('renders a <ul> with a slot', async () => {
        const el = await fixture<UiList>(html`
      <ui-list>
        <ui-list-item>Item 1</ui-list-item>
        <ui-list-item>Item 2</ui-list-item>
      </ui-list>
    `);
        expect(el.shadowRoot!.querySelector('ul')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('reflects disable-padding attribute', async () => {
        const el = await fixture<UiList>(html`<ui-list disable-padding></ui-list>`);
        expect(el.disablePadding).toBe(true);
        expect(el.hasAttribute('disable-padding')).toBe(true);
    });

    it('reflects dense attribute', async () => {
        const el = await fixture<UiList>(html`<ui-list dense></ui-list>`);
        expect(el.dense).toBe(true);
        expect(el.hasAttribute('dense')).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// ui-list-item
// ---------------------------------------------------------------------------
describe('ui-list-item', () => {
    it('is defined', () => {
        expect(document.createElement('ui-list-item')).toBeInstanceOf(HTMLElement);
    });

    it('renders a <li role="listitem"> with slot', async () => {
        const el = await fixture(html`<ui-list-item>Hello</ui-list-item>`);
        const li = el.shadowRoot!.querySelector('li');
        expect(li?.getAttribute('role')).toBe('listitem');
        expect(li?.querySelector('slot')).not.toBeNull();
    });
});

// ---------------------------------------------------------------------------
// ui-list-item-button
// ---------------------------------------------------------------------------
describe('ui-list-item-button', () => {
    it('is defined', () => {
        expect(document.createElement('ui-list-item-button')).toBeInstanceOf(HTMLElement);
    });

    it('renders with role=button and tabindex=0', async () => {
        const el = await fixture(html`<ui-list-item-button>Action</ui-list-item-button>`);
        const li = el.shadowRoot!.querySelector('li');
        expect(li?.getAttribute('role')).toBe('button');
        expect(li?.getAttribute('tabindex')).toBe('0');
    });

    it('Enter key fires click on host', async () => {
        const el = await fixture<UiListItemButton>(html`<ui-list-item-button>Action</ui-list-item-button>`);
        const handler = vi.fn();
        el.addEventListener('click', handler);
        const li = el.shadowRoot!.querySelector('li')!;
        li.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledOnce();
    });

    it('Space key fires click on host', async () => {
        const el = await fixture<UiListItemButton>(html`<ui-list-item-button>Action</ui-list-item-button>`);
        const handler = vi.fn();
        el.addEventListener('click', handler);
        const li = el.shadowRoot!.querySelector('li')!;
        li.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledOnce();
    });

    it('disabled sets tabindex=-1 and aria-disabled', async () => {
        const el = await fixture<UiListItemButton>(html`<ui-list-item-button disabled></ui-list-item-button>`);
        await el.updateComplete;
        const li = el.shadowRoot!.querySelector('li')!;
        expect(li.getAttribute('tabindex')).toBe('-1');
        expect(li.getAttribute('aria-disabled')).toBe('true');
    });

    it('disabled suppresses keyboard click', async () => {
        const el = await fixture<UiListItemButton>(html`<ui-list-item-button disabled></ui-list-item-button>`);
        const handler = vi.fn();
        el.addEventListener('click', handler);
        const li = el.shadowRoot!.querySelector('li')!;
        li.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('selected reflects attribute and sets aria-current', async () => {
        const el = await fixture<UiListItemButton>(html`<ui-list-item-button selected></ui-list-item-button>`);
        await el.updateComplete;
        expect(el.hasAttribute('selected')).toBe(true);
        const li = el.shadowRoot!.querySelector('li')!;
        expect(li.getAttribute('aria-current')).toBe('true');
    });

    it('non-selected has no aria-current', async () => {
        const el = await fixture<UiListItemButton>(html`<ui-list-item-button></ui-list-item-button>`);
        const li = el.shadowRoot!.querySelector('li')!;
        expect(li.getAttribute('aria-current')).toBeNull();
    });

    it('non-disabled has no aria-disabled', async () => {
        const el = await fixture<UiListItemButton>(html`<ui-list-item-button></ui-list-item-button>`);
        const li = el.shadowRoot!.querySelector('li')!;
        expect(li.getAttribute('aria-disabled')).toBeNull();
    });
});

// ---------------------------------------------------------------------------
// ui-list-item-icon
// ---------------------------------------------------------------------------
describe('ui-list-item-icon', () => {
    it('is defined', () => {
        expect(document.createElement('ui-list-item-icon')).toBeInstanceOf(HTMLElement);
    });

    it('renders slot', async () => {
        const el = await fixture(html`<ui-list-item-icon><span>icon</span></ui-list-item-icon>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

// ---------------------------------------------------------------------------
// ui-list-item-avatar
// ---------------------------------------------------------------------------
describe('ui-list-item-avatar', () => {
    it('is defined', () => {
        expect(document.createElement('ui-list-item-avatar')).toBeInstanceOf(HTMLElement);
    });

    it('renders slot', async () => {
        const el = await fixture(html`<ui-list-item-avatar><span>AV</span></ui-list-item-avatar>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

// ---------------------------------------------------------------------------
// ui-list-item-text
// ---------------------------------------------------------------------------
describe('ui-list-item-text', () => {
    it('is defined', () => {
        expect(document.createElement('ui-list-item-text')).toBeInstanceOf(HTMLElement);
    });

    it('renders primary prop text', async () => {
        const el = await fixture<UiListItemText>(html`<ui-list-item-text primary="Title"></ui-list-item-text>`);
        expect(el.shadowRoot!.querySelector('.primary')?.textContent).toContain('Title');
    });

    it('renders secondary prop text', async () => {
        const el = await fixture<UiListItemText>(html`
      <ui-list-item-text primary="Title" secondary="Subtitle"></ui-list-item-text>
    `);
        const secondary = el.shadowRoot!.querySelector('.secondary');
        expect(secondary?.getAttribute('style')).not.toContain('display:none');
        expect(secondary?.textContent).toContain('Subtitle');
    });

    it('hides secondary span when neither prop nor slot content', async () => {
        const el = await fixture<UiListItemText>(html`<ui-list-item-text primary="Title"></ui-list-item-text>`);
        const secondary = el.shadowRoot!.querySelector('.secondary') as HTMLElement;
        expect(secondary.getAttribute('style')).toContain('display:none');
    });

    it('shows secondary span when slot content provided', async () => {
        const el = await fixture<UiListItemText>(html`
      <ui-list-item-text primary="Title">
        <span slot="secondary">Slot subtitle</span>
      </ui-list-item-text>
    `);
        await el.updateComplete;
        const secondary = el.shadowRoot!.querySelector('.secondary') as HTMLElement;
        expect(secondary.getAttribute('style')).not.toContain('display:none');
    });

    it('renders primary slot content', async () => {
        const el = await fixture<UiListItemText>(html`
      <ui-list-item-text>
        <span slot="primary">Slot primary</span>
      </ui-list-item-text>
    `);
        expect(el.shadowRoot!.querySelector('slot[name="primary"]')).not.toBeNull();
    });
});

// ---------------------------------------------------------------------------
// ui-list-subheader
// ---------------------------------------------------------------------------
describe('ui-list-subheader', () => {
    it('is defined', () => {
        expect(document.createElement('ui-list-subheader')).toBeInstanceOf(HTMLElement);
    });

    it('renders slotted text content', async () => {
        const el = await fixture(html`<ui-list-subheader>Section</ui-list-subheader>`);
        expect(el.textContent).toContain('Section');
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});
