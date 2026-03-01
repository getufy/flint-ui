import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-divider';
import type { UiDivider } from './ui-divider';

describe('ui-divider', () => {
    it('is defined', async () => {
        const el = document.createElement('ui-divider');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders horizontal by default', async () => {
        const el = await fixture<UiDivider>(html`<ui-divider></ui-divider>`);
        expect(el.orientation).toBe('horizontal');
        const container = el.shadowRoot!.querySelector('.divider-container');
        expect(container?.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('supports vertical orientation', async () => {
        const el = await fixture<UiDivider>(html`<ui-divider orientation="vertical"></ui-divider>`);
        expect(el.orientation).toBe('vertical');
        const container = el.shadowRoot!.querySelector('.divider-container');
        expect(container?.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('renders content in the slot', async () => {
        const el = await fixture<UiDivider>(html`<ui-divider>Label</ui-divider>`);
        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).toBeDefined();
    });

    it('applies weight classes', async () => {
        const el = await fixture<UiDivider>(html`<ui-divider weight="heavy"></ui-divider>`);
        const container = el.shadowRoot!.querySelector('.divider-container');
        expect(container?.classList.contains('weight-heavy')).toBe(true);
    });

    it('applies variant classes', async () => {
        const el = await fixture<UiDivider>(html`<ui-divider variant="inset"></ui-divider>`);
        const container = el.shadowRoot!.querySelector('.divider-container');
        expect(container?.classList.contains('variant-inset')).toBe(true);
    });
});
