import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-paper';
import type { UiPaper } from './ui-paper';

describe('Paper Component', () => {
    it('is defined', async () => {
        const el = document.createElement('ui-paper');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders with default property values', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper>Default Paper</ui-paper>`);
        expect(el.elevation).toBe(1);
        expect(el.square).toBe(false);
        expect(el.variant).toBe('elevated');
        expect(el.getAttribute('elevation')).toBe('1');
        expect(el.hasAttribute('square')).toBe(false);
        expect(el.getAttribute('variant')).toBe('elevated');
    });

    it('reflects property changes to attributes', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper elevation="4" square variant="outlined"></ui-paper>`);

        expect(el.elevation).toBe(4);
        expect(el.square).toBe(true);
        expect(el.variant).toBe('outlined');

        expect(el.getAttribute('elevation')).toBe('4');
        expect(el.hasAttribute('square')).toBe(true);
        expect(el.getAttribute('variant')).toBe('outlined');
    });

    it('renders slotted content', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper>Paper Content</ui-paper>`);
        expect(el.textContent).toBe('Paper Content');
    });

    it('applies styles through css parts or internal classes', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper elevation="8">Elevated</ui-paper>`);
        const paperDiv = el.shadowRoot!.querySelector('.paper');
        expect(paperDiv).not.toBeNull();
    });
});
