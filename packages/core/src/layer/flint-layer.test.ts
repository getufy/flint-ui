import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-layer';
import type { FlintLayer } from './flint-layer';
import { expectAccessible } from '../test-utils/axe';

/* ── helpers ────────────────────────────────────────────────────────── */

async function make() {
    const el = await fixture<FlintLayer>(html`
        <flint-layer>
            <p>Layer content</p>
        </flint-layer>
    `);
    await el.updateComplete;
    return el;
}

/* ═══════════════════════════════════════════════════════════════════════════
   flint-layer — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-layer — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await make();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('renders slot content', async () => {
        const el = await make();
        const p = el.querySelector('p');
        expect(p).not.toBeNull();
        expect(p!.textContent).toBe('Layer content');
    });

    it('is defined as a custom element', async () => {
        const el = await make();
        expect(el.tagName.toLowerCase()).toBe('flint-layer');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-layer — styles
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-layer — styles', () => {
    it('host has display: contents in its static styles', async () => {
        const el = await make();
        // CSS custom properties and :host styles don't compute in jsdom,
        // but we can verify the style sheet text contains display: contents
        const styles = el.shadowRoot!.querySelectorAll('style');
        const styleText = Array.from(styles).map(s => s.textContent).join('');
        expect(styleText).toContain('display: contents');
    });

    it('declares --flint-surface-color in its static styles', async () => {
        const el = await make();
        const styles = el.shadowRoot!.querySelectorAll('style');
        const styleText = Array.from(styles).map(s => s.textContent).join('');
        expect(styleText).toContain('--flint-surface-color');
    });

    it('declares --flint-layer-surface-next in its static styles', async () => {
        const el = await make();
        const styles = el.shadowRoot!.querySelectorAll('style');
        const styleText = Array.from(styles).map(s => s.textContent).join('');
        expect(styleText).toContain('--flint-layer-surface-next');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-layer — nested layers
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-layer — nested layers', () => {
    it('can nest layers structurally', async () => {
        const el = await fixture<FlintLayer>(html`
            <flint-layer>
                <flint-layer>
                    <p>Inner content</p>
                </flint-layer>
            </flint-layer>
        `);
        await el.updateComplete;

        const inner = el.querySelector('flint-layer');
        expect(inner).not.toBeNull();
        expect(inner!.querySelector('p')!.textContent).toBe('Inner content');
    });

    it('supports triple nesting', async () => {
        const el = await fixture<FlintLayer>(html`
            <flint-layer>
                <flint-layer>
                    <flint-layer>
                        <span>Deep</span>
                    </flint-layer>
                </flint-layer>
            </flint-layer>
        `);
        await el.updateComplete;

        const layers = el.querySelectorAll('flint-layer');
        expect(layers.length).toBe(2); // 2 nested (not counting the root)
        expect(el.querySelector('span')!.textContent).toBe('Deep');
    });

    it('has ::slotted(flint-layer) rule for nested surface escalation', async () => {
        const el = await make();
        const styles = el.shadowRoot!.querySelectorAll('style');
        const styleText = Array.from(styles).map(s => s.textContent).join('');
        expect(styleText).toContain('::slotted(flint-layer)');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-layer — accessibility
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-layer — accessibility', () => {
    it('should pass automated a11y checks', async () => {
        const el = await fixture(html`
            <flint-layer>
                <p>Accessible content</p>
            </flint-layer>
        `);
        await expectAccessible(el);
    }, 15000);
});
