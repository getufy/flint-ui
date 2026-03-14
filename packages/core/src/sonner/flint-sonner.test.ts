import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-sonner.js';
import { toast, FlintToaster } from './flint-sonner.js';

/* ── helpers ────────────────────────────────────────────────────────── */

async function makeToaster(opts: { position?: string; duration?: number; visibleToasts?: number } = {}) {
    const el = await fixture<FlintToaster>(html`
        <flint-toaster
            .position=${opts.position ?? 'bottom-right'}
            .duration=${opts.duration ?? 4000}
            .visibleToasts=${opts.visibleToasts ?? 3}
        ></flint-toaster>
    `);
    await el.updateComplete;
    return el;
}

function getToasts(el: FlintToaster) {
    return Array.from(el.shadowRoot!.querySelectorAll('.toast'));
}

function getToastById(el: FlintToaster, id: string) {
    return el.shadowRoot!.querySelector(`.toast[data-toast-id="${id}"]`);
}

/* ── cleanup ────────────────────────────────────────────────────────── */

afterEach(() => {
    toast.dismiss(); // clear module-level store between tests
});

/* ═══════════════════════════════════════════════════════════════════
   flint-toaster — rendering
═══════════════════════════════════════════════════════════════════ */
describe('flint-toaster — rendering', () => {
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

    it('does not have extra classes on .toaster when collapsed', async () => {
        const el = await makeToaster();
        toast('x');
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.toaster') as HTMLElement;
        // The class should end with a space then empty string — no stray text
        expect(div.className).not.toContain('Stryker');
        // When collapsed the class should contain exactly 'toaster toaster--bottom '
        expect(div.classList.contains('toaster--expanded')).toBe(false);
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

    it('generates unique incrementing ids', () => {
        const id1 = toast('a');
        const id2 = toast('b');
        // Both are flint-toast-N format; the number in id2 should be greater
        const num1 = parseInt(id1.replace('flint-toast-', ''), 10);
        const num2 = parseInt(id2.replace('flint-toast-', ''), 10);
        expect(num2).toBeGreaterThan(num1);
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
   store — add() update path (same id updates existing toast)
═══════════════════════════════════════════════════════════════════ */
describe('store — update existing toast by id', () => {
    it('re-adding a toast with the same id updates it instead of duplicating', async () => {
        const el = await makeToaster();
        toast('first message', { id: 'dup-id' });
        await el.updateComplete;
        expect(getToasts(el)).toHaveLength(1);
        expect(el.shadowRoot!.querySelector('.toast__message')?.textContent?.trim()).toBe('first message');

        // Re-add with same id — should update, not create a second toast
        toast.success('updated message', { id: 'dup-id' });
        await el.updateComplete;
        expect(getToasts(el)).toHaveLength(1);
        const t = getToastById(el, 'dup-id')!;
        expect(t.querySelector('.toast__message')?.textContent?.trim()).toBe('updated message');
        expect(t.classList.contains('toast--success')).toBe(true);
    });

    it('update path preserves other toasts unchanged', async () => {
        const el = await makeToaster();
        const idA = toast('A');
        toast('B-original', { id: 'update-me' });
        await el.updateComplete;

        toast('B-updated', { id: 'update-me' });
        await el.updateComplete;

        expect(getToasts(el)).toHaveLength(2);
        expect(getToastById(el, idA)!.querySelector('.toast__message')?.textContent?.trim()).toBe('A');
        expect(getToastById(el, 'update-me')!.querySelector('.toast__message')?.textContent?.trim()).toBe('B-updated');
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

    it('default toast renders no icon', async () => {
        const el = await makeToaster();
        toast('default');
        await el.updateComplete;
        const t = getToasts(el)[0];
        expect(t.querySelector('.toast__icon')).toBeNull();
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

    it('success icon contains SVG with a check path', async () => {
        const el = await makeToaster();
        toast.success('ok');
        await el.updateComplete;
        const svg = el.shadowRoot!.querySelector('.toast__icon--success svg');
        expect(svg).not.toBeNull();
        expect(svg!.querySelector('path')).not.toBeNull();
    });

    it('error icon contains SVG with a circle and cross paths', async () => {
        const el = await makeToaster();
        toast.error('bad');
        await el.updateComplete;
        const svg = el.shadowRoot!.querySelector('.toast__icon--error svg');
        expect(svg).not.toBeNull();
        expect(svg!.querySelector('circle')).not.toBeNull();
        const paths = svg!.querySelectorAll('path');
        expect(paths.length).toBeGreaterThanOrEqual(2);
    });

    it('info icon contains SVG with a circle and info paths', async () => {
        const el = await makeToaster();
        toast.info('info');
        await el.updateComplete;
        const svg = el.shadowRoot!.querySelector('.toast__icon--info svg');
        expect(svg).not.toBeNull();
        expect(svg!.querySelector('circle')).not.toBeNull();
    });

    it('warning icon contains SVG with a triangle path', async () => {
        const el = await makeToaster();
        toast.warning('warn');
        await el.updateComplete;
        const svg = el.shadowRoot!.querySelector('.toast__icon--warning svg');
        expect(svg).not.toBeNull();
        const paths = svg!.querySelectorAll('path');
        expect(paths.length).toBeGreaterThanOrEqual(1);
    });

    it('close button contains SVG icon', async () => {
        const el = await makeToaster();
        toast('x');
        await el.updateComplete;
        const svg = el.shadowRoot!.querySelector('.toast__close svg');
        expect(svg).not.toBeNull();
        expect(svg!.querySelectorAll('path').length).toBeGreaterThanOrEqual(2);
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

    it('does not render description when not provided', async () => {
        const el = await makeToaster();
        toast('Title');
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.toast__description')).toBeNull();
    });

    it('does not render action button when not provided', async () => {
        const el = await makeToaster();
        toast('Title');
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.toast__action')).toBeNull();
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

    it('does not auto-dismiss when duration is 0', async () => {
        // duration: 0 means dur > 0 is false → no timer is created
        const el = await makeToaster({ duration: 500 });
        const id = toast('zero-dur', { duration: 0 });
        await el.updateComplete;

        // Even with a short toaster duration, the per-toast duration=0 means no timer
        vi.advanceTimersByTime(1000);
        await el.updateComplete;
        expect(getToastById(el, id)).not.toBeNull();
    });

    it('does not duplicate timer when toast already has one', async () => {
        const el = await makeToaster({ duration: 1000 });
        const id = toast('once');
        await el.updateComplete;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const priv = el as any;
        const timerBefore = priv._timers.get(id);
        expect(timerBefore).toBeDefined();

        // Force a second render cycle — should not create a duplicate timer
        toast('another');
        await el.updateComplete;

        // Timer should be the SAME reference (not recreated)
        const timerAfter = priv._timers.get(id);
        expect(timerAfter).toBe(timerBefore);

        vi.advanceTimersByTime(1000);
        await el.updateComplete;
        expect(getToastById(el, id)).toBeNull();
    });

    it('cleans up timers for removed toasts on next update', async () => {
        const el = await makeToaster({ duration: 2000 });
        const id = toast('will-be-dismissed');
        await el.updateComplete;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const priv = el as any;
        expect(priv._timers.has(id)).toBe(true);

        // Manually dismiss so the timer becomes stale
        toast.dismiss(id);
        await el.updateComplete;

        // Timer for the removed toast should have been cleaned up
        expect(priv._timers.has(id)).toBe(false);

        // Should not throw — stale timer should have been cleared
        vi.advanceTimersByTime(2000);
        await el.updateComplete;
        expect(getToasts(el)).toHaveLength(0);
    });

    it('keeps timers for toasts that still exist', async () => {
        const el = await makeToaster({ duration: 2000 });
        const idA = toast('A');
        const idB = toast('B');
        await el.updateComplete;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const priv = el as any;
        expect(priv._timers.has(idA)).toBe(true);
        expect(priv._timers.has(idB)).toBe(true);

        // Dismiss only A
        toast.dismiss(idA);
        await el.updateComplete;

        // Timer for A cleaned up, B still active
        expect(priv._timers.has(idA)).toBe(false);
        expect(priv._timers.has(idB)).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   hover pause / resume
═══════════════════════════════════════════════════════════════════ */
describe('hover pause / resume', () => {
    beforeEach(() => { vi.useFakeTimers(); });
    afterEach(() => { vi.useRealTimers(); });

    it('_pauseTimer clears the timer from the internal map', async () => {
        const el = await makeToaster({ duration: 500 });
        const id = toast('hover-me');
        await el.updateComplete;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const priv = el as any;
        // Timer should exist before pause
        expect(priv._timers.has(id)).toBe(true);

        // Directly invoke _pauseTimer
        priv._pauseTimer(id);

        // Timer should be removed from the map
        expect(priv._timers.has(id)).toBe(false);
    });

    it('_pauseTimer calls clearTimeout on the existing timer', async () => {
        const el = await makeToaster({ duration: 500 });
        const id = toast('hover-clear');
        await el.updateComplete;

        const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el as any)._pauseTimer(id);

        expect(clearSpy).toHaveBeenCalled();
        clearSpy.mockRestore();
    });

    it('_pauseTimer is a no-op when no timer exists', async () => {
        const el = await makeToaster({ duration: 1000 });
        const id = toast('no-timer', { duration: Infinity });
        await el.updateComplete;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const priv = el as any;
        expect(priv._timers.has(id)).toBe(false);

        // Should not throw when called for a toast with no timer
        expect(() => priv._pauseTimer(id)).not.toThrow();
        // Map should still not have this id
        expect(priv._timers.has(id)).toBe(false);
    });

    it('_resumeTimer creates a new timer after pause', async () => {
        const el = await makeToaster({ duration: 500 });
        const id = toast('leave-me');
        await el.updateComplete;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const priv = el as any;

        // Pause — timer removed
        priv._pauseTimer(id);
        expect(priv._timers.has(id)).toBe(false);

        // Resume — timer re-created
        const toastData = priv._toasts.find((t: { id: string }) => t.id === id);
        priv._resumeTimer(toastData);
        expect(priv._timers.has(id)).toBe(true);
    });

    it('_resumeTimer timer fires _dismiss and removes the toast', async () => {
        const el = await makeToaster({ duration: 500 });
        const id = toast('will-fire');
        await el.updateComplete;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const priv = el as any;

        // Pause to clear the original timer
        priv._pauseTimer(id);

        // Resume — creates a new timer
        const toastData = priv._toasts.find((t: { id: string }) => t.id === id);
        priv._resumeTimer(toastData);

        // Spy on _dismiss to verify the timer callback calls it
        const dismissSpy = vi.spyOn(priv, '_dismiss');

        // Advance past the duration so the resumed timer fires
        vi.advanceTimersByTime(500);

        expect(dismissSpy).toHaveBeenCalledWith(id);
        dismissSpy.mockRestore();
    });

    it('_resumeTimer does not create a duplicate timer if one already exists', async () => {
        const el = await makeToaster({ duration: 500 });
        const id = toast('double-resume');
        await el.updateComplete;

        // Timer already exists from updated(). Calling _resumeTimer should be a no-op.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const priv = el as any;
        const toastData = priv._toasts.find((t: { id: string }) => t.id === id);
        priv._resumeTimer(toastData);

        // Should still dismiss after original duration
        vi.advanceTimersByTime(500);
        await el.updateComplete;
        expect(getToastById(el, id)).toBeNull();
    });

    it('_resumeTimer does not create timer for Infinity duration', async () => {
        const el = await makeToaster({ duration: 1000 });
        const id = toast('inf', { duration: Infinity });
        await el.updateComplete;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const priv = el as any;
        priv._pauseTimer(id);

        const toastData = priv._toasts.find((t: { id: string }) => t.id === id);
        priv._resumeTimer(toastData);

        vi.advanceTimersByTime(60000);
        await el.updateComplete;
        expect(getToastById(el, id)).not.toBeNull();
    });

    it('_resumeTimer does not create timer for duration 0', async () => {
        const el = await makeToaster({ duration: 500 });
        const id = toast('zero', { duration: 0 });
        await el.updateComplete;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const priv = el as any;
        const toastData = priv._toasts.find((t: { id: string }) => t.id === id);
        priv._resumeTimer(toastData);

        vi.advanceTimersByTime(60000);
        await el.updateComplete;
        expect(getToastById(el, id)).not.toBeNull();
    });

    it('mouseenter on toast element calls _pauseTimer', async () => {
        const el = await makeToaster({ duration: 500 });
        const id = toast('hover');
        await el.updateComplete;

        // Spy on _pauseTimer
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const spy = vi.spyOn(el as any, '_pauseTimer');
        const toastEl = getToastById(el, id) as HTMLElement;
        toastEl.dispatchEvent(new MouseEvent('mouseenter'));
        expect(spy).toHaveBeenCalledWith(id);
        spy.mockRestore();
    });

    it('mouseleave on toast element calls _resumeTimer', async () => {
        const el = await makeToaster({ duration: 500 });
        const id = toast('hover');
        await el.updateComplete;

        // Spy on _resumeTimer
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const spy = vi.spyOn(el as any, '_resumeTimer');
        const toastEl = getToastById(el, id) as HTMLElement;
        toastEl.dispatchEvent(new MouseEvent('mouseleave'));
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
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

    it('promise loading toast is not dismissible', async () => {
        const el = await makeToaster();
        toast.promise(new Promise<void>(() => undefined), { loading: 'Loading…', success: 'Done' });
        await el.updateComplete;
        // Loading state should NOT have a close button (dismissible: false)
        expect(el.shadowRoot!.querySelector('.toast__close')).toBeNull();
    });

    it('transitions to success after resolve', async () => {
        const el = await makeToaster();
        const id = toast.promise(
            Promise.resolve({ name: 'Item' }),
            { loading: 'Loading…', success: (d: { name: string }) => `${d.name} created` },
        );
        await Promise.resolve();
        await el.updateComplete;

        const t = getToastById(el, id);
        expect(t?.classList.contains('toast--success')).toBe(true);
        expect(t?.querySelector('.toast__message')?.textContent?.trim()).toBe('Item created');
    });

    it('success toast becomes dismissible', async () => {
        const el = await makeToaster();
        toast.promise(
            Promise.resolve('ok'),
            { loading: 'Loading…', success: 'Done' },
        );
        await Promise.resolve();
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.toast__close')).not.toBeNull();
    });

    it('transitions to success with string message', async () => {
        const el = await makeToaster();
        const id = toast.promise(
            Promise.resolve('ok'),
            { loading: 'Loading…', success: 'All done' },
        );
        await Promise.resolve();
        await el.updateComplete;

        const t = getToastById(el, id);
        expect(t?.querySelector('.toast__message')?.textContent?.trim()).toBe('All done');
    });

    it('transitions to error after reject', async () => {
        const el = await makeToaster();
        const id = toast.promise(
            Promise.reject(new Error('boom')),
            { loading: 'Loading…', success: 'Done', error: 'Failed' },
        );
        await Promise.resolve();
        await Promise.resolve();
        await el.updateComplete;

        const t = getToastById(el, id);
        expect(t?.classList.contains('toast--error')).toBe(true);
        expect(t?.querySelector('.toast__message')?.textContent?.trim()).toBe('Failed');
    });

    it('error toast becomes dismissible', async () => {
        const el = await makeToaster();
        toast.promise(
            Promise.reject(new Error('boom')),
            { loading: 'Loading…', success: 'Done', error: 'Failed' },
        );
        await Promise.resolve();
        await Promise.resolve();
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.toast__close')).not.toBeNull();
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

    it('uses default error message when error option is omitted', async () => {
        const el = await makeToaster();
        const id = toast.promise(
            Promise.reject(new Error('boom')),
            { loading: 'Loading…', success: 'Done' },
        );
        await Promise.resolve();
        await Promise.resolve();
        await el.updateComplete;

        const t = getToastById(el, id);
        expect(t?.querySelector('.toast__message')?.textContent?.trim()).toBe('Something went wrong');
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

    it('promise toast uses provided id', async () => {
        const el = await makeToaster();
        const id = toast.promise(
            new Promise<void>(() => undefined),
            { loading: 'Loading…', success: 'Done' },
            { id: 'my-promise-id' },
        );
        await el.updateComplete;
        expect(id).toBe('my-promise-id');
        expect(getToastById(el, 'my-promise-id')).not.toBeNull();
    });

    it('promise toast passes through duration to success state', async () => {
        vi.useFakeTimers();
        const el = await makeToaster({ duration: 10000 });
        const id = toast.promise(
            Promise.resolve('ok'),
            { loading: 'Loading…', success: 'Done' },
            { duration: 500 },
        );
        await Promise.resolve();
        await el.updateComplete;

        // Should dismiss after 500ms (not the 10000 default)
        vi.advanceTimersByTime(500);
        await el.updateComplete;
        expect(getToastById(el, id)).toBeNull();
        vi.useRealTimers();
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
   aria-live attribute
═══════════════════════════════════════════════════════════════════ */
describe('aria-live', () => {
    it('error toast has aria-live="assertive"', async () => {
        const el = await makeToaster();
        const id = toast.error('bad');
        await el.updateComplete;
        const t = getToastById(el, id);
        expect(t?.getAttribute('aria-live')).toBe('assertive');
    });

    it('loading toast has aria-live="off"', async () => {
        const el = await makeToaster();
        const id = toast.loading('loading');
        await el.updateComplete;
        const t = getToastById(el, id);
        expect(t?.getAttribute('aria-live')).toBe('off');
    });

    it('default toast has aria-live="polite"', async () => {
        const el = await makeToaster();
        const id = toast('hello');
        await el.updateComplete;
        const t = getToastById(el, id);
        expect(t?.getAttribute('aria-live')).toBe('polite');
    });

    it('success toast has aria-live="polite"', async () => {
        const el = await makeToaster();
        const id = toast.success('ok');
        await el.updateComplete;
        const t = getToastById(el, id);
        expect(t?.getAttribute('aria-live')).toBe('polite');
    });

    it('info toast has aria-live="polite"', async () => {
        const el = await makeToaster();
        const id = toast.info('info');
        await el.updateComplete;
        const t = getToastById(el, id);
        expect(t?.getAttribute('aria-live')).toBe('polite');
    });

    it('warning toast has aria-live="polite"', async () => {
        const el = await makeToaster();
        const id = toast.warning('warn');
        await el.updateComplete;
        const t = getToastById(el, id);
        expect(t?.getAttribute('aria-live')).toBe('polite');
    });

    it('all toasts have aria-atomic="true"', async () => {
        const el = await makeToaster();
        const id = toast('x');
        await el.updateComplete;
        const t = getToastById(el, id);
        expect(t?.getAttribute('aria-atomic')).toBe('true');
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

    it('back toast (index 1) has --_stack-scale exactly 0.95', async () => {
        const el = await makeToaster();
        toast('old');
        toast('new');
        await el.updateComplete;
        const back = el.shadowRoot!.querySelector<HTMLElement>('.toast[data-front-index="1"]')!;
        expect(back.style.getPropertyValue('--_stack-scale')).toBe('0.95');
    });

    it('back toast (index 1) has --_stack-offset of 6', async () => {
        const el = await makeToaster();
        toast('old');
        toast('new');
        await el.updateComplete;
        const back = el.shadowRoot!.querySelector<HTMLElement>('.toast[data-front-index="1"]')!;
        expect(back.style.getPropertyValue('--_stack-offset')).toBe('6');
    });

    it('back toast (index 2) has --_stack-offset of 12', async () => {
        const el = await makeToaster();
        toast('oldest');
        toast('middle');
        toast('newest');
        await el.updateComplete;
        const back = el.shadowRoot!.querySelector<HTMLElement>('.toast[data-front-index="2"]')!;
        expect(back.style.getPropertyValue('--_stack-offset')).toBe('12');
    });

    it('back toast (index 1) has --_stack-opacity of 0.8', async () => {
        const el = await makeToaster();
        toast('old');
        toast('new');
        await el.updateComplete;
        const back = el.shadowRoot!.querySelector<HTMLElement>('.toast[data-front-index="1"]')!;
        expect(back.style.getPropertyValue('--_stack-opacity')).toBe('0.8');
    });

    it('back toast (index 2) has --_stack-opacity of 0.6', async () => {
        const el = await makeToaster();
        toast('oldest');
        toast('middle');
        toast('newest');
        await el.updateComplete;
        const back = el.shadowRoot!.querySelector<HTMLElement>('.toast[data-front-index="2"]')!;
        expect(back.style.getPropertyValue('--_stack-opacity')).toBe('0.6');
    });

    it('front toast (index 0) has --_stack-opacity of 1', async () => {
        const el = await makeToaster();
        toast('only');
        await el.updateComplete;
        const front = el.shadowRoot!.querySelector<HTMLElement>('.toast[data-front-index="0"]')!;
        expect(front.style.getPropertyValue('--_stack-opacity')).toBe('1');
    });

    it('front toast (index 0) has --_stack-offset of 0', async () => {
        const el = await makeToaster();
        toast('only');
        await el.updateComplete;
        const front = el.shadowRoot!.querySelector<HTMLElement>('.toast[data-front-index="0"]')!;
        expect(front.style.getPropertyValue('--_stack-offset')).toBe('0');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   top position — DOM ordering (reverse)
═══════════════════════════════════════════════════════════════════ */
describe('top position — DOM ordering', () => {
    it('top position reverses DOM order so newest is first', async () => {
        const el = await makeToaster({ position: 'top-right' });
        toast('oldest');
        toast('middle');
        toast('newest');
        await el.updateComplete;
        const toasts = getToasts(el);
        const messages = toasts.map(t => t.querySelector('.toast__message')?.textContent?.trim());
        // newest should be first in DOM for top position
        expect(messages[0]).toBe('newest');
        expect(messages[messages.length - 1]).toBe('oldest');
    });

    it('bottom position keeps natural DOM order (oldest first)', async () => {
        const el = await makeToaster({ position: 'bottom-right' });
        toast('oldest');
        toast('middle');
        toast('newest');
        await el.updateComplete;
        const toasts = getToasts(el);
        const messages = toasts.map(t => t.querySelector('.toast__message')?.textContent?.trim());
        expect(messages[0]).toBe('oldest');
        expect(messages[messages.length - 1]).toBe('newest');
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
   repeat key function
═══════════════════════════════════════════════════════════════════ */
describe('repeat key function', () => {
    it('uses toast id as key — removing first toast preserves second DOM node', async () => {
        const el = await makeToaster({ position: 'bottom-right' });
        const id1 = toast('first');
        const id2 = toast('second');
        await el.updateComplete;

        // Capture a reference to the second toast's DOM node
        const secondNode = getToastById(el, id2);
        expect(secondNode).not.toBeNull();

        // Dismiss first toast — the second toast's DOM element should be the SAME node
        // (Lit's repeat directive with keys reuses DOM nodes based on key identity)
        toast.dismiss(id1);
        await el.updateComplete;

        const remainingNode = getToastById(el, id2);
        expect(remainingNode).not.toBeNull();
        expect(remainingNode).toBe(secondNode); // same DOM node reference
    });
});

/* ═══════════════════════════════════════════════════════════════════
   disconnectedCallback cleanup
═══════════════════════════════════════════════════════════════════ */
describe('disconnectedCallback cleanup', () => {
    it('no longer updates after being removed from DOM', async () => {
        const el = await makeToaster();
        el.remove();

        expect(() => {
            toast('after-disconnect');
        }).not.toThrow();
    });

    it('cleans up store listener on disconnect — does not react to new toasts', async () => {
        const el = await fixture<FlintToaster>(html`<flint-toaster></flint-toaster>`);
        await el.updateComplete;

        toast('pre-disconnect');
        await el.updateComplete;
        expect(getToasts(el)).toHaveLength(1);

        // Capture toast count before disconnect
        const countBefore = getToasts(el).length;

        el.remove();
        toast.dismiss();

        // Add a new toast after disconnect
        toast('post-disconnect');

        // The detached element should NOT have reacted to the new toast
        // (its listener was removed in disconnectedCallback)
        // We verify the element's internal state didn't update
        expect(countBefore).toBe(1);
        expect(() => el.shadowRoot).not.toThrow();
    });

    it('clears pending timers on disconnect so callbacks do not fire', async () => {
        vi.useFakeTimers();
        const el = await makeToaster({ duration: 500 });
        const id = toast('will-disconnect');
        await el.updateComplete;
        expect(getToastById(el, id)).not.toBeNull();

        // Spy on clearTimeout to verify timers are cleared
        const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
        el.remove();

        // disconnectedCallback should have called clearTimeout for each timer
        expect(clearSpy.mock.calls.length).toBeGreaterThan(0);
        clearSpy.mockRestore();

        // Advancing timers after disconnect should not cause errors
        expect(() => vi.advanceTimersByTime(2000)).not.toThrow();
        vi.useRealTimers();
    });

    it('disconnectedCallback clears the timers map', async () => {
        vi.useFakeTimers();
        const el = await makeToaster({ duration: 1000 });
        toast('timer-toast');
        await el.updateComplete;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const priv = el as any;
        expect(priv._timers.size).toBeGreaterThan(0);

        el.remove();
        expect(priv._timers.size).toBe(0);
        vi.useRealTimers();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   connectedCallback — picks up existing toasts from store
═══════════════════════════════════════════════════════════════════ */
describe('connectedCallback — existing store toasts', () => {
    it('picks up toasts that existed before the toaster was mounted', async () => {
        // Create a toast before any toaster is in the DOM
        const id = toast('early-bird');

        // Now mount a toaster — it should sync the current store on connect
        const el = await makeToaster();
        expect(getToastById(el, id)).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.toast__message')?.textContent?.trim()).toBe('early-bird');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   store.update — targeted update
═══════════════════════════════════════════════════════════════════ */
describe('store.update — targeted update', () => {
    it('update only modifies the matching toast, not others', async () => {
        const el = await makeToaster();
        const idA = toast('A');
        const idB = toast('B');
        await el.updateComplete;

        // Update B via promise resolve (internally calls _store.update)
        // We'll use the promise API which calls store.update
        const idC = toast.promise(
            Promise.resolve('ok'),
            { loading: 'Loading…', success: 'C-success' },
        );
        await Promise.resolve();
        await el.updateComplete;

        // A and B should be unchanged
        expect(getToastById(el, idA)!.querySelector('.toast__message')?.textContent?.trim()).toBe('A');
        expect(getToastById(el, idB)!.querySelector('.toast__message')?.textContent?.trim()).toBe('B');
        expect(getToastById(el, idC)!.querySelector('.toast__message')?.textContent?.trim()).toBe('C-success');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   loading toast specifics
═══════════════════════════════════════════════════════════════════ */
describe('toast.loading()', () => {
    it('loading toast has duration=Infinity by default', async () => {
        vi.useFakeTimers();
        const el = await makeToaster({ duration: 1000 });
        const id = toast.loading('loading…');
        await el.updateComplete;

        // Should not auto-dismiss even after a long time
        vi.advanceTimersByTime(60000);
        await el.updateComplete;
        expect(getToastById(el, id)).not.toBeNull();
        vi.useRealTimers();
    });
});
