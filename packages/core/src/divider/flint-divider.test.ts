import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-divider';
import type { FlintDivider } from './flint-divider';
import { expectAccessible } from '../test-utils/axe.js';

describe('flint-divider', () => {
    it('is defined', async () => {
        const el = document.createElement('flint-divider');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders horizontal by default', async () => {
        const el = await fixture<FlintDivider>(html`<flint-divider></flint-divider>`);
        expect(el.orientation).toBe('horizontal');
        const container = el.shadowRoot!.querySelector('.divider-container');
        expect(container?.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('supports vertical orientation', async () => {
        const el = await fixture<FlintDivider>(html`<flint-divider orientation="vertical"></flint-divider>`);
        expect(el.orientation).toBe('vertical');
        const container = el.shadowRoot!.querySelector('.divider-container');
        expect(container?.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('renders content in the slot', async () => {
        const el = await fixture<FlintDivider>(html`<flint-divider>Label</flint-divider>`);
        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).toBeDefined();
    });

    it('applies weight classes', async () => {
        const el = await fixture<FlintDivider>(html`<flint-divider weight="heavy"></flint-divider>`);
        const container = el.shadowRoot!.querySelector('.divider-container');
        expect(container?.classList.contains('weight-heavy')).toBe(true);
    });

    it('applies variant classes', async () => {
        const el = await fixture<FlintDivider>(html`<flint-divider variant="inset"></flint-divider>`);
        const container = el.shadowRoot!.querySelector('.divider-container');
        expect(container?.classList.contains('variant-inset')).toBe(true);
    });

    describe('divider-line rendering based on textAlign', () => {
        it('textAlign=center renders two divider-line elements (default)', async () => {
            const el = await fixture<FlintDivider>(html`<flint-divider .textAlign=${'center'}><span>OR</span></flint-divider>`);
            const lines = el.shadowRoot!.querySelectorAll('.divider-line');
            expect(lines.length).toBe(2);
            expect(lines[0].tagName.toLowerCase()).toBe('div');
            expect(lines[1].tagName.toLowerCase()).toBe('div');
        });

        it('textAlign=left hides the leading divider-line, shows only the trailing line', async () => {
            const el = await fixture<FlintDivider>(html`<flint-divider .textAlign=${'left'}><span>Label</span></flint-divider>`);
            const lines = el.shadowRoot!.querySelectorAll('.divider-line');
            expect(lines.length).toBe(1);
        });

        it('textAlign=right hides the trailing divider-line, shows only the leading line', async () => {
            const el = await fixture<FlintDivider>(html`<flint-divider .textAlign=${'right'}><span>Label</span></flint-divider>`);
            const lines = el.shadowRoot!.querySelectorAll('.divider-line');
            expect(lines.length).toBe(1);
        });

        it('default (no text content) renders two divider-line elements', async () => {
            const el = await fixture<FlintDivider>(html`<flint-divider></flint-divider>`);
            const lines = el.shadowRoot!.querySelectorAll('.divider-line');
            expect(lines.length).toBe(2);
        });
    });

    describe('vertical orientation overrides textAlign for divider-line rendering', () => {
        it('vertical + textAlign=left still renders two divider-line elements', async () => {
            const el = await fixture<FlintDivider>(html`<flint-divider orientation="vertical" .textAlign=${'left'}><span>X</span></flint-divider>`);
            const lines = el.shadowRoot!.querySelectorAll('.divider-line');
            expect(lines.length).toBe(2);
        });

        it('vertical + textAlign=right still renders two divider-line elements', async () => {
            const el = await fixture<FlintDivider>(html`<flint-divider orientation="vertical" .textAlign=${'right'}><span>X</span></flint-divider>`);
            const lines = el.shadowRoot!.querySelectorAll('.divider-line');
            expect(lines.length).toBe(2);
        });

        it('vertical + textAlign=center renders two divider-line elements', async () => {
            const el = await fixture<FlintDivider>(html`<flint-divider orientation="vertical" .textAlign=${'center'}><span>X</span></flint-divider>`);
            const lines = el.shadowRoot!.querySelectorAll('.divider-line');
            expect(lines.length).toBe(2);
        });
    });

    describe('weight variants', () => {
        it('default weight is light', async () => {
            const el = await fixture<FlintDivider>(html`<flint-divider></flint-divider>`);
            const container = el.shadowRoot!.querySelector('.divider-container');
            expect(container?.classList.contains('weight-light')).toBe(true);
        });

        it('applies weight-medium class', async () => {
            const el = await fixture<FlintDivider>(html`<flint-divider weight="medium"></flint-divider>`);
            const container = el.shadowRoot!.querySelector('.divider-container');
            expect(container?.classList.contains('weight-medium')).toBe(true);
        });
    });

    describe('variant rendering', () => {
        it('default variant is full', async () => {
            const el = await fixture<FlintDivider>(html`<flint-divider></flint-divider>`);
            const container = el.shadowRoot!.querySelector('.divider-container');
            expect(container?.classList.contains('variant-full')).toBe(true);
        });

        it('applies variant-middle class', async () => {
            const el = await fixture<FlintDivider>(html`<flint-divider variant="middle"></flint-divider>`);
            const container = el.shadowRoot!.querySelector('.divider-container');
            expect(container?.classList.contains('variant-middle')).toBe(true);
        });
    });

    it('has role="separator" on container', async () => {
        const el = await fixture<FlintDivider>(html`<flint-divider></flint-divider>`);
        const container = el.shadowRoot!.querySelector('.divider-container');
        expect(container?.getAttribute('role')).toBe('separator');
    });

    it('reflects orientation attribute on host', async () => {
        const el = await fixture<FlintDivider>(html`<flint-divider orientation="vertical"></flint-divider>`);
        expect(el.getAttribute('orientation')).toBe('vertical');
    });

    it('default variant is "full"', async () => {
        const el = await fixture<FlintDivider>(html`<flint-divider></flint-divider>`);
        expect(el.variant).toBe('full');
    });

    it('default textAlign is "center"', async () => {
        const el = await fixture<FlintDivider>(html`<flint-divider></flint-divider>`);
        expect(el.textAlign).toBe('center');
    });

    it('dynamic orientation change updates aria-orientation', async () => {
        const el = await fixture<FlintDivider>(html`<flint-divider></flint-divider>`);
        const container = el.shadowRoot!.querySelector('.divider-container');
        expect(container?.getAttribute('aria-orientation')).toBe('horizontal');

        el.orientation = 'vertical';
        await el.updateComplete;
        expect(container?.getAttribute('aria-orientation')).toBe('vertical');
    });

    describe('accessibility', () => {
        it('should be accessible', async () => {
            const el = await fixture(html`<flint-divider></flint-divider>`);
            await expectAccessible(el);
        });
    });
});
