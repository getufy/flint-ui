import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-theme';
import type { FlintTheme } from './flint-theme';
import { expectAccessible } from '../test-utils/axe';

/* ── helpers ────────────────────────────────────────────────────────── */

async function make(attrs: Partial<{ mode: string; palette: string }> = {}) {
    const el = await fixture<FlintTheme>(html`
        <flint-theme
            .mode=${(attrs.mode ?? 'auto') as FlintTheme['mode']}
            .palette=${attrs.palette}
        >
            <p>Themed content</p>
        </flint-theme>
    `);
    await el.updateComplete;
    return el;
}

/* ═══════════════════════════════════════════════════════════════════════════
   flint-theme — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-theme — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await make();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('renders slot content', async () => {
        const el = await make();
        const p = el.querySelector('p');
        expect(p).not.toBeNull();
        expect(p!.textContent).toBe('Themed content');
    });

    it('is defined as a custom element', async () => {
        const el = await make();
        expect(el.tagName.toLowerCase()).toBe('flint-theme');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-theme — mode property
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-theme — mode property', () => {
    it('defaults mode to "auto"', async () => {
        const el = await make();
        expect(el.mode).toBe('auto');
    });

    it('mode reflects to attribute', async () => {
        const el = await make();
        await el.updateComplete;
        expect(el.getAttribute('mode')).toBe('auto');
    });

    it('setting mode="dark" adds the attribute', async () => {
        const el = await make({ mode: 'dark' });
        await el.updateComplete;
        expect(el.getAttribute('mode')).toBe('dark');
    });

    it('setting mode="light" adds the attribute', async () => {
        const el = await make({ mode: 'light' });
        await el.updateComplete;
        expect(el.getAttribute('mode')).toBe('light');
    });

    it('can change mode dynamically', async () => {
        const el = await make({ mode: 'light' });
        el.mode = 'dark';
        await el.updateComplete;
        expect(el.getAttribute('mode')).toBe('dark');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-theme — palette property
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-theme — palette property', () => {
    it('palette is undefined by default', async () => {
        const el = await make();
        expect(el.palette).toBeUndefined();
    });

    it('setting palette="rose" reflects to attribute', async () => {
        const el = await make({ palette: 'rose' });
        await el.updateComplete;
        expect(el.getAttribute('palette')).toBe('rose');
    });

    it('setting palette="teal" reflects to attribute', async () => {
        const el = await make({ palette: 'teal' });
        await el.updateComplete;
        expect(el.getAttribute('palette')).toBe('teal');
    });

    it('setting palette="violet" reflects to attribute', async () => {
        const el = await make({ palette: 'violet' });
        await el.updateComplete;
        expect(el.getAttribute('palette')).toBe('violet');
    });

    it('setting palette="amber" reflects to attribute', async () => {
        const el = await make({ palette: 'amber' });
        await el.updateComplete;
        expect(el.getAttribute('palette')).toBe('amber');
    });

    it('setting palette="emerald" reflects to attribute', async () => {
        const el = await make({ palette: 'emerald' });
        await el.updateComplete;
        expect(el.getAttribute('palette')).toBe('emerald');
    });

    it('setting palette="slate" reflects to attribute', async () => {
        const el = await make({ palette: 'slate' });
        await el.updateComplete;
        expect(el.getAttribute('palette')).toBe('slate');
    });

    it('can change palette dynamically', async () => {
        const el = await make({ palette: 'rose' });
        el.palette = 'teal';
        await el.updateComplete;
        expect(el.getAttribute('palette')).toBe('teal');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-theme — styles
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-theme — styles', () => {
    it('host has display: contents in its static styles', async () => {
        const el = await make();
        const styles = el.shadowRoot!.querySelectorAll('style');
        const styleText = Array.from(styles).map(s => s.textContent).join('');
        expect(styleText).toContain('display: contents');
    });

    it('has dark mode styles defined for [mode="dark"]', async () => {
        const el = await make();
        const styles = el.shadowRoot!.querySelectorAll('style');
        const styleText = Array.from(styles).map(s => s.textContent).join('');
        expect(styleText).toContain('[mode="dark"]');
    });

    it('has light mode styles defined for [mode="light"]', async () => {
        const el = await make();
        const styles = el.shadowRoot!.querySelectorAll('style');
        const styleText = Array.from(styles).map(s => s.textContent).join('');
        expect(styleText).toContain('[mode="light"]');
    });

    it('has palette="rose" styles defined', async () => {
        const el = await make();
        const styles = el.shadowRoot!.querySelectorAll('style');
        const styleText = Array.from(styles).map(s => s.textContent).join('');
        expect(styleText).toContain('[palette="rose"]');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-theme — accessibility
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-theme — accessibility', () => {
    it('should pass automated a11y checks', async () => {
        const el = await fixture(html`
            <flint-theme mode="dark">
                <p>Dark themed content</p>
            </flint-theme>
        `);
        await expectAccessible(el);
    }, 15000);
});
