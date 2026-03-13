import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-snackbar';
import { UiSnackbar } from './ui-snackbar';

async function make(props: Partial<{
    open: boolean;
    message: string;
    autoHideDuration: number;
    anchorOrigin: UiSnackbar['anchorOrigin'];
    pauseOnHover: boolean;
    closable: boolean;
    variant: UiSnackbar['variant'];
}> = {}): Promise<UiSnackbar> {
    const el = await fixture<UiSnackbar>(html`
        <ui-snackbar
            ?open=${props.open ?? false}
            .message=${props.message ?? ''}
            .autoHideDuration=${props.autoHideDuration ?? 5000}
            .anchorOrigin=${props.anchorOrigin ?? 'bottom-center'}
            .pauseOnHover=${props.pauseOnHover ?? true}
            ?closable=${props.closable ?? false}
            .variant=${props.variant ?? 'default'}
        ></ui-snackbar>
    `);
    return el;
}

function snackbarDiv(el: UiSnackbar) {
    return el.shadowRoot!.querySelector<HTMLElement>('.snackbar')!;
}

describe('ui-snackbar', () => {
    beforeEach(() => { vi.useFakeTimers(); });
    afterEach(() => { vi.useRealTimers(); });

    // --- Rendering ---

    it('renders closed by default', async () => {
        const el = await make();
        expect(el.open).toBe(false);
        expect(snackbarDiv(el).classList.contains('open')).toBe(false);
    });

    it('renders open when open=true', async () => {
        const el = await make({ open: true });
        expect(snackbarDiv(el).classList.contains('open')).toBe(true);
    });

    it('renders message in slot fallback', async () => {
        const el = await make({ message: 'Hello world' });
        const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('.message slot')!;
        // fallback text nodes
        const text = slot.textContent?.trim();
        expect(text).toBe('Hello world');
    });

    it('renders slotted content in default slot', async () => {
        const el = await fixture<UiSnackbar>(html`
            <ui-snackbar>Custom slotted content</ui-snackbar>
        `);
        const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('.message slot')!;
        const nodes = slot.assignedNodes({ flatten: true });
        const text = nodes.map(n => n.textContent).join('').trim();
        expect(text).toBe('Custom slotted content');
    });

    it('renders slotted action content', async () => {
        const el = await fixture<UiSnackbar>(html`
            <ui-snackbar open><button slot="action">UNDO</button></ui-snackbar>
        `);
        await el.updateComplete;
        const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="action"]')!;
        const nodes = slot.assignedElements();
        expect(nodes).toHaveLength(1);
        expect(nodes[0].textContent?.trim()).toBe('UNDO');
    });

    it('hides action wrapper when slot is empty', async () => {
        const el = await make({ open: true });
        await el.updateComplete;
        const actionDiv = el.shadowRoot!.querySelector<HTMLElement>('.action')!;
        expect(actionDiv.classList.contains('hidden')).toBe(true);
    });

    it('shows action wrapper when slot has content', async () => {
        const el = await fixture<UiSnackbar>(html`
            <ui-snackbar open><button slot="action">X</button></ui-snackbar>
        `);
        await el.updateComplete;
        const actionDiv = el.shadowRoot!.querySelector<HTMLElement>('.action')!;
        expect(actionDiv.classList.contains('hidden')).toBe(false);
    });

    // --- open / close ---

    it('adding open=true adds .open class', async () => {
        const el = await make();
        el.open = true;
        await el.updateComplete;
        expect(snackbarDiv(el).classList.contains('open')).toBe(true);
    });

    it('setting open=false removes .open class', async () => {
        const el = await make({ open: true });
        el.open = false;
        await el.updateComplete;
        expect(snackbarDiv(el).classList.contains('open')).toBe(false);
    });

    it('open reflects as attribute', async () => {
        const el = await make({ open: true });
        await el.updateComplete;
        expect(el.hasAttribute('open')).toBe(true);
        el.open = false;
        await el.updateComplete;
        expect(el.hasAttribute('open')).toBe(false);
    });

    // --- events ---

    it('fires ui-snackbar-open when opened', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('ui-snackbar-open', spy);
        el.open = true;
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        const event = spy.mock.calls[0][0] as CustomEvent;
        expect(event.bubbles).toBe(true);
        expect(event.composed).toBe(true);
    });

    it('fires ui-snackbar-close when closed via close()', async () => {
        const el = await make({ open: true, autoHideDuration: 0 });
        const spy = vi.fn();
        el.addEventListener('ui-snackbar-close', spy);
        el.close();
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        const event = spy.mock.calls[0][0] as CustomEvent;
        expect(event.bubbles).toBe(true);
        expect(event.composed).toBe(true);
    });

    it('fires ui-snackbar-close when open set to false directly', async () => {
        const el = await make({ open: true, autoHideDuration: 0 });
        const spy = vi.fn();
        el.addEventListener('ui-snackbar-close', spy);
        el.open = false;
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('does NOT fire open event again when already open and re-rendered', async () => {
        const el = await make({ open: true, autoHideDuration: 0 });
        const spy = vi.fn();
        el.addEventListener('ui-snackbar-open', spy);
        // trigger a re-render without changing open
        el.message = 'updated';
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    // --- auto-hide timer ---

    it('auto-hides after autoHideDuration ms', async () => {
        const el = await make({ open: true, autoHideDuration: 3000 });
        expect(el.open).toBe(true);
        vi.advanceTimersByTime(3000);
        await el.updateComplete;
        expect(el.open).toBe(false);
    });

    it('does not auto-hide when autoHideDuration=0', async () => {
        const el = await make({ open: true, autoHideDuration: 0 });
        vi.advanceTimersByTime(999999);
        await el.updateComplete;
        expect(el.open).toBe(true);
    });

    it('clears timer when closed before it fires', async () => {
        const el = await make({ open: true, autoHideDuration: 3000 });
        el.open = false;
        await el.updateComplete;
        // advance past original duration — should NOT reopen or throw
        vi.advanceTimersByTime(3000);
        await el.updateComplete;
        expect(el.open).toBe(false);
    });

    it('resets timer when reopened', async () => {
        const el = await make({ open: true, autoHideDuration: 3000 });
        vi.advanceTimersByTime(1000); // 1 s in
        el.open = false;
        await el.updateComplete;
        el.open = true;
        await el.updateComplete;
        // should NOT close before full 3000 ms from reopen
        vi.advanceTimersByTime(2999);
        await el.updateComplete;
        expect(el.open).toBe(true);
        vi.advanceTimersByTime(1);
        await el.updateComplete;
        expect(el.open).toBe(false);
    });

    // --- disconnectedCallback ---

    it('clears timer on disconnect', async () => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const el = await fixture<UiSnackbar>(
            html`<ui-snackbar .autoHideDuration=${3000} open></ui-snackbar>`,
            { parentNode: container }
        );
        expect(el.open).toBe(true);
        container.remove(); // triggers disconnectedCallback
        // advancing time should not cause errors or calls on a detached element
        expect(() => vi.advanceTimersByTime(3000)).not.toThrow();
    });

    // --- anchor-origin attribute ---

    it('reflects anchorOrigin as anchor-origin attribute', async () => {
        const el = await make({ anchorOrigin: 'top-right' });
        await el.updateComplete;
        expect(el.getAttribute('anchor-origin')).toBe('top-right');
    });

    it.each([
        'top-left', 'top-center', 'top-right',
        'bottom-left', 'bottom-center', 'bottom-right',
    ] as const)('accepts anchorOrigin="%s"', async (pos) => {
        const el = await make({ anchorOrigin: pos });
        await el.updateComplete;
        expect(el.getAttribute('anchor-origin')).toBe(pos);
    });

    // --- auto-hide-duration attribute (hyphenated HTML form) ---

    it('accepts auto-hide-duration attribute', async () => {
        const el = await fixture<UiSnackbar>(html`
            <ui-snackbar auto-hide-duration="2000"></ui-snackbar>
        `);
        expect(el.autoHideDuration).toBe(2000);
    });

    // --- closable ---

    it('renders close button when closable=true', async () => {
        const el = await make({ closable: true });
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.close-btn');
        expect(btn).not.toBeNull();
        expect(btn!.getAttribute('aria-label')).toBe('Close');
    });

    it('does not render close button when closable=false', async () => {
        const el = await make({ closable: false });
        expect(el.shadowRoot!.querySelector('.close-btn')).toBeNull();
    });

    it('clicking close button calls close()', async () => {
        const el = await make({ open: true, closable: true, autoHideDuration: 0 });
        const spy = vi.fn();
        el.addEventListener('ui-snackbar-close', spy);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.close-btn')!;
        btn.click();
        await el.updateComplete;
        expect(el.open).toBe(false);
        expect(spy).toHaveBeenCalledOnce();
    });

    // --- variant ---

    it('reflects variant attribute', async () => {
        const el = await make({ variant: 'success' });
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('success');
    });

    it.each(['default', 'info', 'success', 'warning', 'error'] as const)(
        'accepts variant="%s"',
        async (v) => {
            const el = await make({ variant: v });
            await el.updateComplete;
            expect(el.variant).toBe(v);
        }
    );

    // --- accessibility ---

    it('inner div has role="status" and aria-live="polite"', async () => {
        const el = await make();
        const div = snackbarDiv(el);
        expect(div.getAttribute('role')).toBe('status');
        expect(div.getAttribute('aria-live')).toBe('polite');
        expect(div.getAttribute('aria-atomic')).toBe('true');
    });

    // --- pause-on-hover ---

    it('pauses timer on mouseenter and resumes on mouseleave', async () => {
        const el = await make({ open: true, autoHideDuration: 4000, pauseOnHover: true });
        const div = snackbarDiv(el);

        // advance 1s then hover
        vi.advanceTimersByTime(1000);
        div.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, composed: true }));
        // advance past original expiry
        vi.advanceTimersByTime(4000);
        await el.updateComplete;
        // should still be open — timer was paused
        expect(el.open).toBe(true);

        // move out — remaining ~3s should restart
        div.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true, composed: true }));
        vi.advanceTimersByTime(2999);
        await el.updateComplete;
        expect(el.open).toBe(true);

        vi.advanceTimersByTime(1);
        await el.updateComplete;
        expect(el.open).toBe(false);
    });

    it('does not pause when pauseOnHover=false', async () => {
        const el = await make({ open: true, autoHideDuration: 3000, pauseOnHover: false });
        const div = snackbarDiv(el);

        vi.advanceTimersByTime(1000);
        div.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, composed: true }));
        vi.advanceTimersByTime(2000); // total 3s — timer should fire normally
        await el.updateComplete;
        expect(el.open).toBe(false);
    });
});
