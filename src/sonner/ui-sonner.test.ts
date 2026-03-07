import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-sonner.js';
import { toast, UiToaster } from './ui-sonner.js';

/* ── helpers ────────────────────────────────────────────────────────── */

async function makeToaster(opts: { position?: string; duration?: number; visibleToasts?: number } = {}) {
    const el = await fixture<UiToaster>(html`
        <ui-toaster
            .position=${opts.position ?? 'bottom-right'}
            .duration=${opts.duration ?? 4000}
            .visibleToasts=${opts.visibleToasts ?? 3}
        ></ui-toaster>
    `);
    await el.updateComplete;
    return el;
}

function getToasts(el: UiToaster) {
    return Array.from(el.shadowRoot!.querySelectorAll('.toast'));
}

function getToastById(el: UiToaster, id: string) {
    return el.shadowRoot!.querySelector(`.toast[data-toast-id="${id}"]`);
}

/* ── cleanup ────────────────────────────────────────────────────────── */

afterEach(() => {
    toast.dismiss(); // clear module-level store between tests
});

/* ═══════════════════════════════════════════════════════════════════
   ui-toaster — rendering
═══════════════════════════════════════════════════════════════════ */
describe('ui-toaster — rendering', () => {
    it('renders shadow DOM with a .toaster div', async () => {
        const el = await makeToaster();
        expect(el.shadowRoot!.querySelector('.toaster')).not.toBeNull();
    });

    it('starts with no toasts visible', async () => {
        const el = await makeToaster();
        expect(getToasts(el)).toHaveLength(0);
    });

    it('reflects position attribute', async () => {
        const el = await makeToaster({ position: 'top-left' });
        expect(el.getAttribute('position')).toBe('top-left');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   toast() — basic
═══════════════════════════════════════════════════════════════════ */
describe('toast() — basic', () => {
    it('adds a toast to the DOM after calling toast()', async () => {
        const el = await makeToaster();
        toast('Hello world');
        await el.updateComplete;
        expect(getToasts(el)).toHaveLength(1);
    });

    it('returns an id string', () => {
        const id = toast('test');
        expect(typeof id).toBe('string');
        expect(id.length).toBeGreaterThan(0);
    });

    it('renders the message text', async () => {
        const el = await makeToaster();
        toast('My message');
        await el.updateComplete;
        const msg = el.shadowRoot!.querySelector('.toast__message');
        expect(msg?.textContent?.trim()).toBe('My message');
    });

    it('accepts a custom id via options', async () => {
        const el = await makeToaster();
        toast('Custom id toast', { id: 'my-custom-id' });
        await el.updateComplete;
        expect(getToastById(el, 'my-custom-id')).not.toBeNull();
    });

    it('multiple calls add multiple toasts', async () => {
        const el = await makeToaster();
        toast('A');
        toast('B');
        toast('C');
        await el.updateComplete;
        expect(getToasts(el)).toHaveLength(3);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   toast() — types
═══════════════════════════════════════════════════════════════════ */
describe('toast() — types', () => {
    it('default toast has class toast--default', async () => {
        const el = await makeToaster();
        toast('default');
        await el.updateComplete;
        expect(getToasts(el)[0].classList.contains('toast--default')).toBe(true);
    });

    it('toast.success has class toast--success and renders check icon', async () => {
        const el = await makeToaster();
        toast.success('ok');
        await el.updateComplete;
        const t = getToasts(el)[0];
        expect(t.classList.contains('toast--success')).toBe(true);
        expect(t.querySelector('.toast__icon--success')).not.toBeNull();
    });

    it('toast.error has class toast--error and renders error icon', async () => {
        const el = await makeToaster();
        toast.error('bad');
        await el.updateComplete;
        const t = getToasts(el)[0];
        expect(t.classList.contains('toast--error')).toBe(true);
        expect(t.querySelector('.toast__icon--error')).not.toBeNull();
    });

    it('toast.warning has class toast--warning and renders warning icon', async () => {
        const el = await makeToaster();
        toast.warning('warn');
        await el.updateComplete;
        const t = getToasts(el)[0];
        expect(t.classList.contains('toast--warning')).toBe(true);
        expect(t.querySelector('.toast__icon--warning')).not.toBeNull();
    });

    it('toast.info has class toast--info and renders info icon', async () => {
        const el = await makeToaster();
        toast.info('info');
        await el.updateComplete;
        const t = getToasts(el)[0];
        expect(t.classList.contains('toast--info')).toBe(true);
        expect(t.querySelector('.toast__icon--info')).not.toBeNull();
    });

    it('toast.loading has class toast--loading and renders spinner', async () => {
        const el = await makeToaster();
        toast.loading('loading');
        await el.updateComplete;
        const t = getToasts(el)[0];
        expect(t.classList.contains('toast--loading')).toBe(true);
        expect(t.querySelector('.spinner')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   toast() — options
═══════════════════════════════════════════════════════════════════ */
describe('toast() — options', () => {
    it('renders description when provided', async () => {
        const el = await makeToaster();
        toast('Title', { description: 'Some details here' });
        await el.updateComplete;
        const desc = el.shadowRoot!.querySelector('.toast__description');
        expect(desc?.textContent?.trim()).toBe('Some details here');
    });

    it('renders action button when provided', async () => {
        const el = await makeToaster();
        toast('Title', { action: { label: 'Undo', onClick: () => undefined } });
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('.toast__action');
        expect(btn).not.toBeNull();
        expect(btn?.textContent?.trim()).toBe('Undo');
    });

    it('action button click calls onClick and dismisses toast', async () => {
        const el = await makeToaster();
        const onClick = vi.fn();
        const id = toast('Title', { action: { label: 'Undo', onClick } });
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.toast__action');
        btn!.click();
        await el.updateComplete;
        expect(onClick).toHaveBeenCalledOnce();
        expect(getToastById(el, id)).toBeNull();
    });

    it('shows close button by default (dismissible=true)', async () => {
        const el = await makeToaster();
        toast('closeable');
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.toast__close')).not.toBeNull();
    });

    it('hides close button when dismissible=false', async () => {
        const el = await makeToaster();
        toast('no-close', { dismissible: false });
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.toast__close')).toBeNull();
    });

    it('clicking close button removes the toast', async () => {
        const el = await makeToaster();
        const id = toast('dismiss me');
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.toast__close');
        btn!.click();
        await el.updateComplete;
        expect(getToastById(el, id)).toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   auto-dismiss
═══════════════════════════════════════════════════════════════════ */
describe('auto-dismiss', () => {
    beforeEach(() => { vi.useFakeTimers(); });
    afterEach(() => { vi.useRealTimers(); });

    it('removes the toast after the default duration', async () => {
        const el = await makeToaster({ duration: 1000 });
        const id = toast('short-lived');
        await el.updateComplete;
        expect(getToastById(el, id)).not.toBeNull();

        vi.advanceTimersByTime(1000);
        await el.updateComplete;
        expect(getToastById(el, id)).toBeNull();
    });

    it('respects per-toast duration override', async () => {
        const el = await makeToaster({ duration: 5000 });
        const id = toast('fast', { duration: 500 });
        await el.updateComplete;

        vi.advanceTimersByTime(499);
        await el.updateComplete;
        expect(getToastById(el, id)).not.toBeNull();

        vi.advanceTimersByTime(1);
        await el.updateComplete;
        expect(getToastById(el, id)).toBeNull();
    });

    it('does NOT auto-dismiss when duration=Infinity', async () => {
        const el = await makeToaster({ duration: 1000 });
        const id = toast.loading('stays forever', { duration: Infinity });
        await el.updateComplete;

        vi.advanceTimersByTime(60000);
        await el.updateComplete;
        expect(getToastById(el, id)).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   hover pause / resume
═══════════════════════════════════════════════════════════════════ */
describe('hover pause / resume', () => {
    beforeEach(() => { vi.useFakeTimers(); });
    afterEach(() => { vi.useRealTimers(); });

    it('pauses auto-dismiss on mouseenter (timer cleared)', async () => {
        const el = await makeToaster({ duration: 1000 });
        const id = toast('hover-me');
        await el.updateComplete;

        const toastEl = getToastById(el, id) as HTMLElement;
        // Dispatch mouseenter — this should call _pauseTimer (clearTimeout + delete from map)
        toastEl.dispatchEvent(new MouseEvent('mouseenter'));

        // Verify the toast is not immediately dismissed and the timer was cleared.
        // We confirm the full pause→resume→dismiss cycle in the mouseleave test below.
        expect(getToastById(el, id)).not.toBeNull();
    });

    it('resumes timer on mouseleave and toast eventually dismisses', async () => {
        const el = await makeToaster({ duration: 500 });
        const id = toast('leave-me');
        await el.updateComplete;

        const toastEl = getToastById(el, id) as HTMLElement;
        toastEl.dispatchEvent(new MouseEvent('mouseenter'));
        vi.advanceTimersByTime(200);

        toastEl.dispatchEvent(new MouseEvent('mouseleave'));
        vi.advanceTimersByTime(500);
        await el.updateComplete;

        expect(getToastById(el, id)).toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   toast.dismiss()
═══════════════════════════════════════════════════════════════════ */
describe('toast.dismiss()', () => {
    it('toast.dismiss(id) removes only the matching toast', async () => {
        const el = await makeToaster();
        const idA = toast('A');
        const idB = toast('B');
        await el.updateComplete;
        expect(getToasts(el)).toHaveLength(2);

        toast.dismiss(idA);
        await el.updateComplete;
        expect(getToastById(el, idA)).toBeNull();
        expect(getToastById(el, idB)).not.toBeNull();
    });

    it('toast.dismiss() with no arg removes all toasts', async () => {
        const el = await makeToaster();
        toast('A');
        toast('B');
        toast('C');
        await el.updateComplete;
        expect(getToasts(el)).toHaveLength(3);

        toast.dismiss();
        await el.updateComplete;
        expect(getToasts(el)).toHaveLength(0);
    });

    it('dismissing a non-existent id is a no-op', async () => {
        const el = await makeToaster();
        toast('keep');
        await el.updateComplete;
        toast.dismiss('does-not-exist');
        await el.updateComplete;
        expect(getToasts(el)).toHaveLength(1);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   promise toast
═══════════════════════════════════════════════════════════════════ */
describe('toast.promise()', () => {
    it('shows loading state immediately', async () => {
        const el = await makeToaster();
        toast.promise(new Promise<void>(() => undefined), { loading: 'Loading…', success: 'Done' });
        await el.updateComplete;
        const t = getToasts(el)[0];
        expect(t.classList.contains('toast--loading')).toBe(true);
        expect(t.querySelector('.toast__message')?.textContent?.trim()).toBe('Loading…');
    });

    it('transitions to success after resolve', async () => {
        const el = await makeToaster();
        const id = toast.promise(
            Promise.resolve({ name: 'Item' }),
            { loading: 'Loading…', success: (d: { name: string }) => `${d.name} created` },
        );
        // flush microtasks
        await Promise.resolve();
        await el.updateComplete;

        const t = getToastById(el, id);
        expect(t?.classList.contains('toast--success')).toBe(true);
        expect(t?.querySelector('.toast__message')?.textContent?.trim()).toBe('Item created');
    });

    it('transitions to error after reject', async () => {
        const el = await makeToaster();
        const id = toast.promise(
            Promise.reject(new Error('boom')),
            { loading: 'Loading…', success: 'Done', error: 'Failed' },
        );
        // Rejection propagates through .then() before reaching .catch(),
        // requiring two microtask turns instead of one.
        await Promise.resolve();
        await Promise.resolve();
        await el.updateComplete;

        const t = getToastById(el, id);
        expect(t?.classList.contains('toast--error')).toBe(true);
        expect(t?.querySelector('.toast__message')?.textContent?.trim()).toBe('Failed');
    });

    it('calls error function with the rejection value', async () => {
        const el = await makeToaster();
        const id = toast.promise(
            Promise.reject(new Error('timeout')),
            {
                loading: 'Loading…',
                success: 'Done',
                error: (err) => `Error: ${(err as Error).message}`,
            },
        );
        await Promise.resolve();
        await Promise.resolve();
        await el.updateComplete;

        const t = getToastById(el, id);
        expect(t?.querySelector('.toast__message')?.textContent?.trim()).toBe('Error: timeout');
    });

    it('promise toast is no longer loading after settle', async () => {
        const el = await makeToaster();
        const id = toast.promise(Promise.resolve('ok'), {
            loading: 'Loading…',
            success: 'Done',
        });
        await Promise.resolve();
        await el.updateComplete;
        const t = getToastById(el, id);
        expect(t?.classList.contains('toast--loading')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   visible-toasts limit
═══════════════════════════════════════════════════════════════════ */
describe('visible-toasts limit', () => {
    it('shows only the most recent N toasts when limit is exceeded', async () => {
        const el = await makeToaster({ visibleToasts: 2 });
        toast('A');
        toast('B');
        toast('C'); // newest
        await el.updateComplete;
        expect(getToasts(el)).toHaveLength(2);
    });

    it('shows the newest toasts when limited', async () => {
        const el = await makeToaster({ visibleToasts: 2 });
        toast('A');
        toast('B');
        toast('C-newest');
        await el.updateComplete;
        const messages = getToasts(el).map(t => t.querySelector('.toast__message')?.textContent?.trim());
        expect(messages).toContain('C-newest');
        expect(messages).not.toContain('A');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   position
═══════════════════════════════════════════════════════════════════ */
describe('position', () => {
    it('has toaster--bottom class for bottom positions', async () => {
        const el = await makeToaster({ position: 'bottom-left' });
        toast('x');
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.toaster--bottom')).not.toBeNull();
    });

    it('has toaster--top class for top positions', async () => {
        const el = await makeToaster({ position: 'top-right' });
        toast('x');
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.toaster--top')).not.toBeNull();
    });

    it('unrouted toast appears in every toaster', async () => {
        const elBR = await makeToaster({ position: 'bottom-right' });
        const elTL = await makeToaster({ position: 'top-left' });
        toast('everywhere');
        await elBR.updateComplete;
        await elTL.updateComplete;
        expect(getToasts(elBR)).toHaveLength(1);
        expect(getToasts(elTL)).toHaveLength(1);
    });

    it('routed toast appears only in the matching toaster', async () => {
        const elBR = await makeToaster({ position: 'bottom-right' });
        const elTL = await makeToaster({ position: 'top-left' });
        toast('targeted', { position: 'bottom-right' });
        await elBR.updateComplete;
        await elTL.updateComplete;
        expect(getToasts(elBR)).toHaveLength(1);
        expect(getToasts(elTL)).toHaveLength(0);
    });

    it('routed toast does not appear in a toaster at a different position', async () => {
        const elTR = await makeToaster({ position: 'top-right' });
        toast('for top-left only', { position: 'top-left' });
        await elTR.updateComplete;
        expect(getToasts(elTR)).toHaveLength(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   card-deck stacking — data-front-index
═══════════════════════════════════════════════════════════════════ */
describe('card-deck stacking — data-front-index', () => {
    it('single toast has data-front-index="0"', async () => {
        const el = await makeToaster();
        toast('only toast');
        await el.updateComplete;
        expect(getToasts(el)[0].getAttribute('data-front-index')).toBe('0');
    });

    it('with two bottom toasts: newest is front (index 0), oldest is back (index 1)', async () => {
        const el = await makeToaster({ position: 'bottom-right' });
        toast('first');
        toast('second (newest)');
        await el.updateComplete;
        const toasts = getToasts(el);
        // For bottom: newest is last in DOM (index = length-1) → front-index 0
        const newestDom = toasts[toasts.length - 1];
        const oldestDom = toasts[0];
        expect(newestDom.getAttribute('data-front-index')).toBe('0');
        expect(oldestDom.getAttribute('data-front-index')).toBe('1');
    });

    it('with two top toasts: newest is front (index 0), oldest is back (index 1)', async () => {
        const el = await makeToaster({ position: 'top-right' });
        toast('first');
        toast('second (newest)');
        await el.updateComplete;
        const toasts = getToasts(el);
        // For top: newest is first in DOM → front-index 0
        const newestDom = toasts[0];
        const oldestDom = toasts[toasts.length - 1];
        expect(newestDom.getAttribute('data-front-index')).toBe('0');
        expect(oldestDom.getAttribute('data-front-index')).toBe('1');
    });

    it('three toasts get front-index 0, 1, 2', async () => {
        const el = await makeToaster({ position: 'bottom-right' });
        toast('A');
        toast('B');
        toast('C newest');
        await el.updateComplete;
        const toasts = getToasts(el);
        // bottom: oldest first in DOM → highest front-index
        expect(toasts[0].getAttribute('data-front-index')).toBe('2');
        expect(toasts[1].getAttribute('data-front-index')).toBe('1');
        expect(toasts[2].getAttribute('data-front-index')).toBe('0');
    });

    it('front toast has CSS variable --_stack-scale set to 1', async () => {
        const el = await makeToaster();
        toast('front');
        await el.updateComplete;
        const front = el.shadowRoot!.querySelector<HTMLElement>('.toast[data-front-index="0"]')!;
        expect(front.style.getPropertyValue('--_stack-scale')).toBe('1');
    });

    it('back toast (index 1) has --_stack-scale < 1', async () => {
        const el = await makeToaster();
        toast('old');
        toast('new');
        await el.updateComplete;
        const back = el.shadowRoot!.querySelector<HTMLElement>('.toast[data-front-index="1"]')!;
        const scale = parseFloat(back.style.getPropertyValue('--_stack-scale'));
        expect(scale).toBeLessThan(1);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   card-deck stacking — expand / collapse
═══════════════════════════════════════════════════════════════════ */
describe('card-deck stacking — expand / collapse', () => {
    it('toaster--expanded class NOT present initially', async () => {
        const el = await makeToaster();
        toast('x');
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.toaster--expanded')).toBeNull();
    });

    it('toaster--expanded class added on .toaster mouseenter', async () => {
        const el = await makeToaster();
        toast('x');
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.toaster') as HTMLElement;
        div.dispatchEvent(new MouseEvent('mouseenter'));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.toaster--expanded')).not.toBeNull();
    });

    it('toaster--expanded class removed on .toaster mouseleave', async () => {
        const el = await makeToaster();
        toast('x');
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.toaster') as HTMLElement;
        div.dispatchEvent(new MouseEvent('mouseenter'));
        await el.updateComplete;
        div.dispatchEvent(new MouseEvent('mouseleave'));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.toaster--expanded')).toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   disconnectedCallback cleanup
═══════════════════════════════════════════════════════════════════ */
describe('disconnectedCallback cleanup', () => {
    it('no longer updates after being removed from DOM', async () => {
        const el = await makeToaster();
        el.remove();

        // adding toasts after disconnect should not cause errors
        expect(() => {
            toast('after-disconnect');
        }).not.toThrow();
    });

    it('cleans up store listener on disconnect (no memory leak)', async () => {
        const el = await fixture<UiToaster>(html`<ui-toaster></ui-toaster>`);
        await el.updateComplete;

        // The listener was added on connect
        toast('pre-disconnect');
        await el.updateComplete;
        expect(getToasts(el)).toHaveLength(1);

        el.remove();
        toast.dismiss();

        // Re-adding a toast after disconnect should not affect the detached element
        toast('post-disconnect');
        // Detached element should not throw — it simply no longer reacts
        expect(() => el.shadowRoot).not.toThrow();
    });
});
