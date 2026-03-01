import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-list';
import type { UiList, UiListItemText } from './ui-list';

describe('ui-list', () => {
    it('is defined', async () => {
        const el = document.createElement('ui-list');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders a list with items', async () => {
        const el = await fixture<UiList>(html`
      <ui-list>
        <ui-list-item>Item 1</ui-list-item>
        <ui-list-item>Item 2</ui-list-item>
      </ui-list>
    `);
        const items = el.shadowRoot!.querySelectorAll('slot');
        expect(items).toBeDefined();
    });

    it('renders list item text with primary and secondary strings', async () => {
        const el = await fixture<UiListItemText>(html`
      <ui-list-item-text primary="Title" secondary="Subtitle"></ui-list-item-text>
    `);
        const primary = el.shadowRoot!.querySelector('.primary');
        const secondary = el.shadowRoot!.querySelector('.secondary');

        expect(primary?.textContent).toContain('Title');
        expect(secondary?.textContent).toContain('Subtitle');
    });

    it('renders list subheader', async () => {
        const el = await fixture(html`<ui-list-subheader>Header</ui-list-subheader>`);
        expect(el.textContent).toContain('Header');
    });

    it('list item button is accessible', async () => {
        const el = await fixture(html`<ui-list-item-button>Action</ui-list-item-button>`);
        const li = el.shadowRoot!.querySelector('li');
        expect(li?.getAttribute('role')).toBe('button');
        expect(li?.getAttribute('tabindex')).toBe('0');
    });
});
