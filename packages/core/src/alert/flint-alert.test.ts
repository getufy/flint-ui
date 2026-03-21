import { describe, it, expect, vi, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-alert.js';
import type { FlintAlert } from './flint-alert.js';
import { expectAccessible } from '../test-utils/axe.js';

async function settle(el: Element) {
    await (el as FlintAlert).updateComplete;
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('FlintAlert — rendering', () => {
    it('renders the alert div with role="alert"', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert>Message</flint-alert>`);
        await settle(el);
        const alertDiv = el.shadowRoot!.querySelector('.alert');
        expect(alertDiv?.getAttribute('role')).toBe('alert');
    });

    it('defaults to info severity', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert>Message</flint-alert>`);
        await settle(el);
        expect(el.severity).toBe('info');
        expect(el.shadowRoot!.querySelector('.alert')?.classList.contains('info')).toBe(true);
    });

    it.each(['info', 'success', 'warning', 'error'] as const)(
        'applies the %s severity class',
        async (severity) => {
            const el = await fixture<FlintAlert>(
                html`<flint-alert .severity=${severity}>Message</flint-alert>`
            );
            await settle(el);
            const alertDiv = el.shadowRoot!.querySelector('.alert');
            expect(alertDiv?.classList.contains(severity)).toBe(true);
        }
    );

    it('renders icon container', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert>Message</flint-alert>`);
        await settle(el);
        expect(el.shadowRoot!.querySelector('.icon')).not.toBeNull();
    });

    it('renders content container with default slot', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert>Hello world</flint-alert>`);
        await settle(el);
        expect(el.shadowRoot!.querySelector('.content')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.message slot')).not.toBeNull();
    });

    it('renders title when provided', async () => {
        const el = await fixture<FlintAlert>(
            html`<flint-alert .title=${'Alert title'}>Message</flint-alert>`
        );
        await settle(el);
        const titleEl = el.shadowRoot!.querySelector('.title');
        expect(titleEl?.textContent).toBe('Alert title');
    });

    it('omits title element when title is empty', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert>Message</flint-alert>`);
        await settle(el);
        expect(el.shadowRoot!.querySelector('.title')).toBeNull();
    });

    it('does not render close button when not dismissible', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert>Message</flint-alert>`);
        await settle(el);
        expect(el.shadowRoot!.querySelector('.close-button')).toBeNull();
    });

    it('renders close button with aria-label when dismissible', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert dismissible>Message</flint-alert>`);
        await settle(el);
        const btn = el.shadowRoot!.querySelector('.close-button');
        expect(btn).not.toBeNull();
        expect(btn?.getAttribute('aria-label')).toBe('Close');
    });
});

// ─── Severity Icons ───────────────────────────────────────────────────────────

describe('FlintAlert — severity icons', () => {
    it.each(['info', 'success', 'warning', 'error'] as const)(
        'renders an SVG icon for %s severity',
        async (severity) => {
            const el = await fixture<FlintAlert>(
                html`<flint-alert .severity=${severity}>Message</flint-alert>`
            );
            await settle(el);
            expect(el.shadowRoot!.querySelector('.icon svg')).not.toBeNull();
        }
    );
});

// ─── Dismissible / Close ──────────────────────────────────────────────────────

describe('FlintAlert — dismissible', () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it('dispatches flint-alert-close with correct severity detail', async () => {
        const el = await fixture<FlintAlert>(
            html`<flint-alert dismissible severity="warning">Message</flint-alert>`
        );
        await settle(el);

        const handler = vi.fn();
        el.addEventListener('flint-alert-close', handler);

        el.shadowRoot!.querySelector<HTMLButtonElement>('.close-button')!.click();

        expect(handler).toHaveBeenCalledOnce();
        const evt = handler.mock.calls[0][0] as CustomEvent;
        expect(evt.detail).toEqual({ open: false, severity: 'warning' });
    });

    it('flint-alert-close event bubbles and is composed', async () => {
        const el = await fixture<FlintAlert>(
            html`<flint-alert dismissible severity="error">Message</flint-alert>`
        );
        await settle(el);

        let captured: CustomEvent | null = null;
        document.addEventListener('flint-alert-close', (e) => { captured = e as CustomEvent; }, { once: true });

        el.shadowRoot!.querySelector<HTMLButtonElement>('.close-button')!.click();

        expect(captured).not.toBeNull();
        expect(captured!.bubbles).toBe(true);
        expect(captured!.composed).toBe(true);
    });

    it('applies exit animation styles immediately on close', async () => {
        vi.useFakeTimers();
        const el = await fixture<FlintAlert>(html`<flint-alert dismissible>Message</flint-alert>`);
        await settle(el);

        el.shadowRoot!.querySelector<HTMLButtonElement>('.close-button')!.click();

        expect(el.style.opacity).toBe('0');
        expect(el.style.transform).toBe('translateY(-4px)');
        expect(el.style.transition).toContain('opacity');
    });

    it('removes element from DOM after 200 ms', async () => {
        vi.useFakeTimers();
        const container = document.createElement('div');
        document.body.appendChild(container);
        container.innerHTML = '<flint-alert dismissible>Message</flint-alert>';
        const el = container.querySelector<FlintAlert>('flint-alert')!;
        await settle(el);

        el.shadowRoot!.querySelector<HTMLButtonElement>('.close-button')!.click();

        expect(container.contains(el)).toBe(true);
        vi.advanceTimersByTime(210);
        expect(container.contains(el)).toBe(false);

        container.remove();
    });
});

// ─── Property Updates ─────────────────────────────────────────────────────────

describe('FlintAlert — property updates', () => {
    it('switches severity class on property change', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert severity="info">Message</flint-alert>`);
        await settle(el);

        el.severity = 'error';
        await settle(el);

        const alertDiv = el.shadowRoot!.querySelector('.alert');
        expect(alertDiv?.classList.contains('error')).toBe(true);
        expect(alertDiv?.classList.contains('info')).toBe(false);
    });

    it('shows title when title property is set after render', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert>Message</flint-alert>`);
        await settle(el);

        expect(el.shadowRoot!.querySelector('.title')).toBeNull();

        el.title = 'Late Title';
        await settle(el);

        expect(el.shadowRoot!.querySelector('.title')?.textContent).toBe('Late Title');
    });

    it('shows close button when dismissible is set after render', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert>Message</flint-alert>`);
        await settle(el);

        expect(el.shadowRoot!.querySelector('.close-button')).toBeNull();

        el.dismissible = true;
        await settle(el);

        expect(el.shadowRoot!.querySelector('.close-button')).not.toBeNull();
    });
});

// ─── ARIA & CSS Parts ─────────────────────────────────────────────────────────

describe('FlintAlert — ARIA & CSS parts', () => {
    it('sets aria-live="polite" for info severity', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert severity="info">Msg</flint-alert>`);
        await settle(el);
        expect(el.shadowRoot!.querySelector('.alert')?.getAttribute('aria-live')).toBe('polite');
    });

    it('sets aria-live="assertive" for error severity', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert severity="error">Msg</flint-alert>`);
        await settle(el);
        expect(el.shadowRoot!.querySelector('.alert')?.getAttribute('aria-live')).toBe('assertive');
    });

    it('exposes part="title" on the title element', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert .title=${'Test'}>Msg</flint-alert>`);
        await settle(el);
        expect(el.shadowRoot!.querySelector('[part="title"]')).not.toBeNull();
    });

    it('exposes part="close-button" when dismissible', async () => {
        const el = await fixture<FlintAlert>(html`<flint-alert dismissible>Msg</flint-alert>`);
        await settle(el);
        expect(el.shadowRoot!.querySelector('[part="close-button"]')).not.toBeNull();
    });
});

// ─── Accessibility ───────────────────────────────────────────────────────────────

describe('FlintAlert — accessibility', () => {
    it('should be accessible', async () => {
        const el = await fixture(html`<flint-alert>Alert message</flint-alert>`);
        await expectAccessible(el);
    });
});
