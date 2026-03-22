import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-skeleton';
import type { FlintSkeleton } from './flint-skeleton';
import { expectAccessible } from '../test-utils/axe.js';

/* ═══════════════════════════════════════════════════════════════════════════
   flint-skeleton — structure
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-skeleton — structure', () => {
    it('renders an inner span with class "skeleton"', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector('span.skeleton');
        expect(span).not.toBeNull();
    });

    it('inner span has aria-hidden="true"', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector('span.skeleton');
        expect(span!.getAttribute('aria-hidden')).toBe('true');
    });

    it('inner span exposes part="skeleton"', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        expect(el.shadowRoot!.querySelector('[part="skeleton"]')).not.toBeNull();
    });

    it('host has role="status"', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        expect((el as any)._internals?.role).toBe('status');
    });

    it('host has aria-label="Loading..." by default', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        expect((el as any)._internals?.ariaLabel).toBe('Loading...');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-skeleton — shape prop
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-skeleton — shape', () => {
    it('defaults to shape="text"', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector('span.skeleton')!;
        expect(span.classList.contains('text')).toBe(true);
    });

    it('shape="text" is reflected as attribute', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        expect(el.getAttribute('shape')).toBe('text');
    });

    it('shape="circular" adds .circular class', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton shape="circular"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector('span.skeleton')!;
        expect(span.classList.contains('circular')).toBe(true);
    });

    it('shape="rectangular" adds .rectangular class', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton shape="rectangular"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector('span.skeleton')!;
        expect(span.classList.contains('rectangular')).toBe(true);
    });

    it('shape="rounded" adds .rounded class', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton shape="rounded"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector('span.skeleton')!;
        expect(span.classList.contains('rounded')).toBe(true);
    });

    it('shape reflects to attribute when changed via property', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        el.shape = 'circular';
        await el.updateComplete;
        expect(el.getAttribute('shape')).toBe('circular');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-skeleton — animation prop
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-skeleton — animation', () => {
    it('defaults to animation="pulse" and adds .pulse class', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector('span.skeleton')!;
        expect(span.classList.contains('pulse')).toBe(true);
    });

    it('animation="pulse" is reflected as attribute', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        expect(el.getAttribute('animation')).toBe('pulse');
    });

    it('animation="wave" adds .wave class and not .pulse', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton animation="wave"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector('span.skeleton')!;
        expect(span.classList.contains('wave')).toBe(true);
        expect(span.classList.contains('pulse')).toBe(false);
    });

    it('animation="none" adds neither .pulse nor .wave class', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton animation="none"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector('span.skeleton')!;
        expect(span.classList.contains('pulse')).toBe(false);
        expect(span.classList.contains('wave')).toBe(false);
    });

    it('animation="none" does not add a "none" class', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton animation="none"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector('span.skeleton')!;
        expect(span.classList.contains('none')).toBe(false);
    });

    it('animation reflects to attribute when changed via property', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        el.animation = 'wave';
        await el.updateComplete;
        expect(el.getAttribute('animation')).toBe('wave');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-skeleton — text shape default dimensions
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-skeleton — text shape defaults', () => {
    it('text shape sets width: 100% by default', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton shape="text"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector<HTMLElement>('span.skeleton')!;
        expect(span.style.width).toBe('100%');
    });

    it('text shape sets height: 0.8em by default', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton shape="text"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector<HTMLElement>('span.skeleton')!;
        expect(span.style.height).toBe('0.8em');
    });

    it('text shape sets marginTop: 0.3em', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton shape="text"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector<HTMLElement>('span.skeleton')!;
        expect(span.style.marginTop).toBe('0.3em');
    });

    it('text shape sets marginBottom: 0.3em', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton shape="text"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector<HTMLElement>('span.skeleton')!;
        expect(span.style.marginBottom).toBe('0.3em');
    });

    it('non-text shapes have no default width or height', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton shape="circular"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector<HTMLElement>('span.skeleton')!;
        expect(span.style.width).toBe('');
        expect(span.style.height).toBe('');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-skeleton — width / height props
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-skeleton — width / height props', () => {
    it('width prop sets inline style on span', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton width="200px"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector<HTMLElement>('span.skeleton')!;
        expect(span.style.width).toBe('200px');
    });

    it('height prop sets inline style on span', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton height="80px"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector<HTMLElement>('span.skeleton')!;
        expect(span.style.height).toBe('80px');
    });

    it('explicit width overrides text-shape default', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton shape="text" width="50%"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector<HTMLElement>('span.skeleton')!;
        expect(span.style.width).toBe('50%');
    });

    it('explicit height overrides text-shape default', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton shape="text" height="2em"></flint-skeleton>`);
        const span = el.shadowRoot!.querySelector<HTMLElement>('span.skeleton')!;
        expect(span.style.height).toBe('2em');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-skeleton — dark prop
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-skeleton — dark prop', () => {
    it('dark=false by default — no dark attribute', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        expect(el.hasAttribute('dark')).toBe(false);
    });

    it('dark prop reflects to attribute', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton ?dark=${true}></flint-skeleton>`);
        await el.updateComplete;
        expect(el.hasAttribute('dark')).toBe(true);
    });

    it('setting dark=false removes attribute', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton ?dark=${true}></flint-skeleton>`);
        await el.updateComplete;
        el.dark = false;
        await el.updateComplete;
        expect(el.hasAttribute('dark')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-skeleton — label prop
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-skeleton — label prop', () => {
    it('custom label sets aria-label on host', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton label="Loading profile..."></flint-skeleton>`);
        expect((el as any)._internals?.ariaLabel).toBe('Loading profile...');
    });

    it('empty label removes aria-label from host', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        el.label = '';
        await el.updateComplete;
        expect((el as any)._internals?.ariaLabel).toBeNull();
    });

    it('label update is reflected on host', async () => {
        const el = await fixture<FlintSkeleton>(html`<flint-skeleton></flint-skeleton>`);
        el.label = 'Loading data...';
        await el.updateComplete;
        expect((el as any)._internals?.ariaLabel).toBe('Loading data...');
    });
});

describe('flint-skeleton — axe accessibility', () => {
    it('should be accessible', async () => {
        const el = await fixture(html`<flint-skeleton label="Loading"></flint-skeleton>`);
        await expectAccessible(el);
    });
});
