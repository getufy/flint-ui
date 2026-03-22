import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-list';
import { expectAccessible } from '../test-utils/axe.js';
import type { FlintList, FlintListItemButton, FlintListItemText } from './flint-list';

// ---------------------------------------------------------------------------
// flint-list
// ---------------------------------------------------------------------------
describe('flint-list', () => {
    it('is defined', () => {
        expect(document.createElement('flint-list')).toBeInstanceOf(HTMLElement);
    });

    it('renders a <ul> with a slot', async () => {
        const el = await fixture<FlintList>(html`
      <flint-list>
        <flint-list-item>Item 1</flint-list-item>
        <flint-list-item>Item 2</flint-list-item>
      </flint-list>
    `);
        expect(el.shadowRoot!.querySelector('ul')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('reflects disable-padding attribute', async () => {
        const el = await fixture<FlintList>(html`<flint-list disable-padding></flint-list>`);
        expect(el.disablePadding).toBe(true);
        expect(el.hasAttribute('disable-padding')).toBe(true);
    });

    it('reflects dense attribute', async () => {
        const el = await fixture<FlintList>(html`<flint-list dense></flint-list>`);
        expect(el.dense).toBe(true);
        expect(el.hasAttribute('dense')).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// flint-list-item
// ---------------------------------------------------------------------------
describe('flint-list-item', () => {
    it('is defined', () => {
        expect(document.createElement('flint-list-item')).toBeInstanceOf(HTMLElement);
    });

    it('renders a <li role="listitem"> with slot', async () => {
        const el = await fixture(html`<flint-list-item>Hello</flint-list-item>`);
        const li = el.shadowRoot!.querySelector('li');
        expect(li?.getAttribute('role')).toBe('listitem');
        expect(li?.querySelector('slot')).not.toBeNull();
    });
});

// ---------------------------------------------------------------------------
// flint-list-item-button
// ---------------------------------------------------------------------------
describe('flint-list-item-button', () => {
    it('is defined', () => {
        expect(document.createElement('flint-list-item-button')).toBeInstanceOf(HTMLElement);
    });

    it('renders with role=button and tabindex=0', async () => {
        const el = await fixture(html`<flint-list-item-button>Action</flint-list-item-button>`);
        const inner = el.shadowRoot!.querySelector('div[role="button"]');
        expect(inner?.getAttribute('role')).toBe('button');
        expect(inner?.getAttribute('tabindex')).toBe('0');
    });

    it('Enter key fires click on host', async () => {
        const el = await fixture<FlintListItemButton>(html`<flint-list-item-button>Action</flint-list-item-button>`);
        const handler = vi.fn();
        el.addEventListener('click', handler);
        const inner = el.shadowRoot!.querySelector('div[role="button"]')!;
        inner.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledOnce();
    });

    it('Space key fires click on host', async () => {
        const el = await fixture<FlintListItemButton>(html`<flint-list-item-button>Action</flint-list-item-button>`);
        const handler = vi.fn();
        el.addEventListener('click', handler);
        const inner = el.shadowRoot!.querySelector('div[role="button"]')!;
        inner.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledOnce();
    });

    it('disabled sets tabindex=-1 and aria-disabled', async () => {
        const el = await fixture<FlintListItemButton>(html`<flint-list-item-button disabled></flint-list-item-button>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('div[role="button"]')!;
        expect(inner.getAttribute('tabindex')).toBe('-1');
        expect(inner.getAttribute('aria-disabled')).toBe('true');
    });

    it('disabled suppresses keyboard click', async () => {
        const el = await fixture<FlintListItemButton>(html`<flint-list-item-button disabled></flint-list-item-button>`);
        const handler = vi.fn();
        el.addEventListener('click', handler);
        const inner = el.shadowRoot!.querySelector('div[role="button"]')!;
        inner.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('disabled suppresses mouse click', async () => {
        const el = await fixture<FlintListItemButton>(html`<flint-list-item-button disabled></flint-list-item-button>`);
        const handler = vi.fn();
        el.addEventListener('click', handler);
        const inner = el.shadowRoot!.querySelector('div[role="button"]')!;
        inner.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('selected reflects attribute and sets aria-current', async () => {
        const el = await fixture<FlintListItemButton>(html`<flint-list-item-button selected></flint-list-item-button>`);
        await el.updateComplete;
        expect(el.hasAttribute('selected')).toBe(true);
        const inner = el.shadowRoot!.querySelector('div[role="button"]')!;
        expect(inner.getAttribute('aria-current')).toBe('true');
    });

    it('non-selected has no aria-current', async () => {
        const el = await fixture<FlintListItemButton>(html`<flint-list-item-button></flint-list-item-button>`);
        const inner = el.shadowRoot!.querySelector('div[role="button"]')!;
        expect(inner.getAttribute('aria-current')).toBeNull();
    });

    it('non-disabled has no aria-disabled', async () => {
        const el = await fixture<FlintListItemButton>(html`<flint-list-item-button></flint-list-item-button>`);
        const inner = el.shadowRoot!.querySelector('div[role="button"]')!;
        expect(inner.getAttribute('aria-disabled')).toBeNull();
    });
});

// ---------------------------------------------------------------------------
// flint-list-item-icon
// ---------------------------------------------------------------------------
describe('flint-list-item-icon', () => {
    it('is defined', () => {
        expect(document.createElement('flint-list-item-icon')).toBeInstanceOf(HTMLElement);
    });

    it('renders slot', async () => {
        const el = await fixture(html`<flint-list-item-icon><span>icon</span></flint-list-item-icon>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

// ---------------------------------------------------------------------------
// flint-list-item-avatar
// ---------------------------------------------------------------------------
describe('flint-list-item-avatar', () => {
    it('is defined', () => {
        expect(document.createElement('flint-list-item-avatar')).toBeInstanceOf(HTMLElement);
    });

    it('renders slot', async () => {
        const el = await fixture(html`<flint-list-item-avatar><span>AV</span></flint-list-item-avatar>`);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

// ---------------------------------------------------------------------------
// flint-list-item-text
// ---------------------------------------------------------------------------
describe('flint-list-item-text', () => {
    it('is defined', () => {
        expect(document.createElement('flint-list-item-text')).toBeInstanceOf(HTMLElement);
    });

    it('renders primary prop text', async () => {
        const el = await fixture<FlintListItemText>(html`<flint-list-item-text primary="Title"></flint-list-item-text>`);
        expect(el.shadowRoot!.querySelector('.primary')?.textContent).toContain('Title');
    });

    it('renders secondary prop text', async () => {
        const el = await fixture<FlintListItemText>(html`
      <flint-list-item-text primary="Title" secondary="Subtitle"></flint-list-item-text>
    `);
        const secondary = el.shadowRoot!.querySelector('.secondary');
        expect(secondary?.getAttribute('style')).not.toContain('display:none');
        expect(secondary?.textContent).toContain('Subtitle');
    });

    it('hides secondary span when neither prop nor slot content', async () => {
        const el = await fixture<FlintListItemText>(html`<flint-list-item-text primary="Title"></flint-list-item-text>`);
        const secondary = el.shadowRoot!.querySelector('.secondary') as HTMLElement;
        expect(secondary.getAttribute('style')).toContain('display:none');
    });

    it('shows secondary span when slot content provided', async () => {
        const el = await fixture<FlintListItemText>(html`
      <flint-list-item-text primary="Title">
        <span slot="secondary">Slot subtitle</span>
      </flint-list-item-text>
    `);
        await el.updateComplete;
        const secondary = el.shadowRoot!.querySelector('.secondary') as HTMLElement;
        expect(secondary.getAttribute('style')).not.toContain('display:none');
    });

    it('renders primary slot content', async () => {
        const el = await fixture<FlintListItemText>(html`
      <flint-list-item-text>
        <span slot="primary">Slot primary</span>
      </flint-list-item-text>
    `);
        expect(el.shadowRoot!.querySelector('slot[name="primary"]')).not.toBeNull();
    });
});

// ---------------------------------------------------------------------------
// flint-list-subheader
// ---------------------------------------------------------------------------
describe('flint-list-subheader', () => {
    it('is defined', () => {
        expect(document.createElement('flint-list-subheader')).toBeInstanceOf(HTMLElement);
    });

    it('renders slotted text content', async () => {
        const el = await fixture(html`<flint-list-subheader>Section</flint-list-subheader>`);
        expect(el.textContent).toContain('Section');
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

describe('flint-list — accessibility', () => {
    it('should be accessible', async () => {
        const el = await fixture(html`<flint-list>Content</flint-list>`);
        await expectAccessible(el, { rules: { 'aria-required-children': { enabled: false } } });
    });
});
