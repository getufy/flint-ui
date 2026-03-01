import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-fab';
import { UiFab } from './ui-fab';

describe('UiFab', () => {
    it('is defined', () => {
        const el = document.createElement('ui-fab');
        expect(el).toBeInstanceOf(UiFab);
    });

    it('renders with default values', async () => {
        const el = await fixture<UiFab>(html`<ui-fab></ui-fab>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button).toBeDefined();
        expect(el.extended).toBe(false);
    });

    it('renders extended variant', async () => {
        const el = await fixture<UiFab>(html`<ui-fab extended></ui-fab>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.classList.contains('extended')).toBe(true);
        expect(el.shadowRoot!.querySelector('.label-slot')).toBeDefined();
    });

    it('changes position', async () => {
        const el = await fixture<UiFab>(html`<ui-fab position="bottom-left"></ui-fab>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.getAttribute('style')).toContain('bottom: 24px; left: 24px;');
    });

    it('renders slots correctly', async () => {
        const el = await fixture<UiFab>(html`
      <ui-fab extended>
        <span slot="icon" id="test-icon">+</span>
        <span slot="label" id="test-label">Add</span>
      </ui-fab>
    `);
        const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]') as HTMLSlotElement;
        const labelSlot = el.shadowRoot!.querySelector('slot[name="label"]') as HTMLSlotElement;

        expect(iconSlot).toBeDefined();
        expect(labelSlot).toBeDefined();
        expect(iconSlot.assignedElements()[0].id).toBe('test-icon');
        expect(labelSlot.assignedElements()[0].id).toBe('test-label');
    });
});

