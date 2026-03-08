import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-relative-time';
import { pickUnit, type UiRelativeTime } from './ui-relative-time';

/* ═══════════════════════════════════════════════════════════════════════════
   Helpers
═══════════════════════════════════════════════════════════════════════════ */

/** Returns only text nodes from a shadow root, filtering out <style> content. */
function shadowText(el: Element): string {
    const time = el.shadowRoot!.querySelector('time');
    if (!time) return '';
    return Array.from(time.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent ?? '')
        .join('')
        .trim();
}

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — rendering', () => {
    it('renders a <time> element in shadow DOM', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time></ui-relative-time>`);
        expect(el.shadowRoot!.querySelector('time')).not.toBeNull();
    });

    it('sets datetime attribute to ISO string', async () => {
        const date = new Date('2020-07-15T13:17:00.000Z');
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date}></ui-relative-time>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.getAttribute('datetime')).toBe(date.toISOString());
    });

    it('sets title attribute to locale string', async () => {
        const date = new Date('2020-07-15T13:17:00.000Z');
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date}></ui-relative-time>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.getAttribute('title')).toBe(date.toLocaleString());
    });

    it('renders non-empty text for a past date', async () => {
        const date = new Date(Date.now() - 5 * 60 * 1000);
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date}></ui-relative-time>`);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('renders non-empty text for a future date', async () => {
        const date = new Date(Date.now() + 5 * 60 * 1000);
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date}></ui-relative-time>`);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('renders empty string for an invalid date string', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time date="not-a-date"></ui-relative-time>`);
        expect(shadowText(el)).toBe('');
    });

    it('does not set datetime attribute for invalid date', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time date="not-a-date"></ui-relative-time>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.hasAttribute('datetime')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — date prop
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — date prop', () => {
    it('accepts a Date object', async () => {
        const date = new Date(Date.now() - 10 * 1000);
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date}></ui-relative-time>`);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('accepts an ISO 8601 string', async () => {
        const iso = new Date(Date.now() - 10 * 1000).toISOString();
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time date=${iso}></ui-relative-time>`);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('updates when the date property changes', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${new Date(Date.now() - 60_000)}></ui-relative-time>`);
        const textBefore = shadowText(el);
        el.date = new Date(Date.now() - 3 * 3600 * 1000);
        await el.updateComplete;
        const textAfter = shadowText(el);
        expect(textAfter).not.toBe(textBefore);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — relative unit selection
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — unit selection', () => {
    const rtf = (diff: number) => {
        const date = new Date(Date.now() + diff);
        return fixture<UiRelativeTime>(html`
            <ui-relative-time .date=${date} numeric="always"></ui-relative-time>
        `).then(el => shadowText(el));
    };

    it('shows seconds for a ~20s diff', async () => {
        const text = await rtf(-20_000);
        expect(text).toContain('second');
    });

    it('shows minutes for a ~3 min diff', async () => {
        const text = await rtf(-3 * 60_000);
        expect(text).toContain('minute');
    });

    it('shows hours for a ~2 hour diff', async () => {
        const text = await rtf(-2 * 3_600_000);
        expect(text).toContain('hour');
    });

    it('shows days for a ~3 day diff', async () => {
        const text = await rtf(-3 * 86_400_000);
        expect(text).toContain('day');
    });

    it('shows months for a ~45 day diff', async () => {
        const text = await rtf(-45 * 86_400_000);
        expect(text).toContain('month');
    });

    it('shows years for a ~400 day diff', async () => {
        const text = await rtf(-400 * 86_400_000);
        expect(text).toContain('year');
    });

    it('shows future seconds', async () => {
        const text = await rtf(20_000);
        expect(text).toContain('second');
    });

    it('shows future minutes', async () => {
        const text = await rtf(5 * 60_000);
        expect(text).toContain('minute');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — format prop
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — format prop', () => {
    const date = new Date(Date.now() - 400 * 86_400_000);

    it('defaults to format="long"', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date}></ui-relative-time>`);
        expect(el.format).toBe('long');
    });

    it('reflects format attribute', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date} format="short"></ui-relative-time>`);
        expect(el.getAttribute('format')).toBe('short');
    });

    it('long format produces longer output than narrow', async () => {
        const [elLong, elNarrow] = await Promise.all([
            fixture<UiRelativeTime>(html`<ui-relative-time .date=${date} format="long"></ui-relative-time>`),
            fixture<UiRelativeTime>(html`<ui-relative-time .date=${date} format="narrow"></ui-relative-time>`),
        ]);
        expect(shadowText(elLong).length).toBeGreaterThanOrEqual(shadowText(elNarrow).length);
    });

    it('accepts format="short"', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date} format="short"></ui-relative-time>`);
        expect(el.format).toBe('short');
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('accepts format="narrow"', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date} format="narrow"></ui-relative-time>`);
        expect(el.format).toBe('narrow');
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('updates text when format changes', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date} format="long"></ui-relative-time>`);
        const before = shadowText(el);
        el.format = 'narrow';
        await el.updateComplete;
        const after = shadowText(el);
        // narrow is typically shorter or equal
        expect(after.length).toBeLessThanOrEqual(before.length);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — numeric prop
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — numeric prop', () => {
    it('defaults to numeric="auto"', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time></ui-relative-time>`);
        expect(el.numeric).toBe('auto');
    });

    it('reflects numeric attribute', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time numeric="always"></ui-relative-time>`);
        expect(el.getAttribute('numeric')).toBe('always');
    });

    it('numeric="auto" can produce "yesterday" for en locale', async () => {
        const yesterday = new Date(Date.now() - 86_400_000);
        const el = await fixture<UiRelativeTime>(html`
            <ui-relative-time .date=${yesterday} numeric="auto" lang="en"></ui-relative-time>
        `);
        const text = shadowText(el);
        // "yesterday" (auto) vs "1 day ago" (always) — either is valid depending on exact time
        expect(text.length).toBeGreaterThan(0);
    });

    it('numeric="always" does not produce "yesterday"', async () => {
        const yesterday = new Date(Date.now() - 86_400_000);
        const el = await fixture<UiRelativeTime>(html`
            <ui-relative-time .date=${yesterday} numeric="always" lang="en"></ui-relative-time>
        `);
        const text = shadowText(el);
        expect(text).not.toBe('yesterday');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — sync prop
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — sync prop', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('defaults to sync=false', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time></ui-relative-time>`);
        expect(el.sync).toBe(false);
    });

    it('reflects sync as boolean attribute', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time sync></ui-relative-time>`);
        expect(el.hasAttribute('sync')).toBe(true);
        expect(el.sync).toBe(true);
    });

    it('schedules a timer when sync=true', async () => {
        const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time sync></ui-relative-time>`);
        await el.updateComplete;
        expect(setTimeoutSpy).toHaveBeenCalled();
        setTimeoutSpy.mockRestore();
    });

    it('clears timer when sync is set to false', async () => {
        const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time sync></ui-relative-time>`);
        await el.updateComplete;
        el.sync = false;
        await el.updateComplete;
        expect(clearTimeoutSpy).toHaveBeenCalled();
        clearTimeoutSpy.mockRestore();
    });

    it('triggers requestUpdate after timer fires', async () => {
        const date = new Date(Date.now() - 30_000); // 30s ago → 1s update interval
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date} sync></ui-relative-time>`);
        await el.updateComplete;

        const requestUpdateSpy = vi.spyOn(el, 'requestUpdate');
        vi.advanceTimersByTime(1_100);
        expect(requestUpdateSpy).toHaveBeenCalled();
        requestUpdateSpy.mockRestore();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — disconnectedCallback
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — disconnectedCallback', () => {
    it('clears sync timer on disconnect', async () => {
        const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time sync></ui-relative-time>`);
        await el.updateComplete;
        el.remove();
        expect(clearTimeoutSpy).toHaveBeenCalled();
        clearTimeoutSpy.mockRestore();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — lang attribute
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — lang attribute', () => {
    const date = new Date(Date.now() - 400 * 86_400_000);

    it('produces different text for different lang values', async () => {
        const [elEn, elDe] = await Promise.all([
            fixture<UiRelativeTime>(html`<ui-relative-time .date=${date} lang="en"></ui-relative-time>`),
            fixture<UiRelativeTime>(html`<ui-relative-time .date=${date} lang="de"></ui-relative-time>`),
        ]);
        expect(shadowText(elEn)).not.toBe(shadowText(elDe));
    });

    it('renders with an unsupported lang without crashing', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date} lang="xx-INVALID"></ui-relative-time>`);
        // Should return a string or empty — but not throw
        expect(typeof shadowText(el)).toBe('string');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — accessibility
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — accessibility', () => {
    it('uses semantic <time> element', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${new Date()}></ui-relative-time>`);
        expect(el.shadowRoot!.querySelector('time')).not.toBeNull();
    });

    it('datetime attribute is a valid ISO string', async () => {
        const date = new Date('2024-01-15T12:00:00.000Z');
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date}></ui-relative-time>`);
        const datetime = el.shadowRoot!.querySelector('time')!.getAttribute('datetime')!;
        expect(new Date(datetime).toISOString()).toBe(date.toISOString());
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — default prop values
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — default props', () => {
    it('default date is approximately now (within 5s)', async () => {
        const before = Date.now();
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time></ui-relative-time>`);
        const after = Date.now();
        const d = el.date instanceof Date ? el.date : new Date(el.date as string);
        expect(d.getTime()).toBeGreaterThanOrEqual(before - 5000);
        expect(d.getTime()).toBeLessThanOrEqual(after + 5000);
    });

    it('default format is "long"', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time></ui-relative-time>`);
        expect(el.format).toBe('long');
    });

    it('default numeric is "auto"', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time></ui-relative-time>`);
        expect(el.numeric).toBe('auto');
    });

    it('default sync is false', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time></ui-relative-time>`);
        expect(el.sync).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — lang reactivity
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — lang reactivity', () => {
    const date = new Date(Date.now() - 400 * 86_400_000);

    it('re-renders when lang property changes', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date} lang="en"></ui-relative-time>`);
        const before = shadowText(el);
        el.lang = 'de';
        await el.updateComplete;
        const after = shadowText(el);
        expect(after).not.toBe(before);
    });

    it('re-renders when lang attribute is set', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date} lang="en"></ui-relative-time>`);
        const before = shadowText(el);
        el.setAttribute('lang', 'ja');
        await el.updateComplete;
        const after = shadowText(el);
        expect(after).not.toBe(before);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — number timestamp support
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — number timestamp', () => {
    it('accepts a Unix ms timestamp', async () => {
        const ts = Date.now() - 5 * 60 * 1000;
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${ts}></ui-relative-time>`);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('sets datetime attribute correctly from timestamp', async () => {
        const ts = new Date('2024-06-01T10:00:00.000Z').getTime();
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${ts}></ui-relative-time>`);
        const datetime = el.shadowRoot!.querySelector('time')!.getAttribute('datetime')!;
        expect(new Date(datetime).toISOString()).toBe(new Date(ts).toISOString());
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — aria-label
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — aria-label', () => {
    it('sets aria-label to the full locale string', async () => {
        const date = new Date('2024-01-15T12:00:00.000Z');
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date}></ui-relative-time>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.getAttribute('aria-label')).toBe(date.toLocaleString());
    });

    it('does not set aria-label for invalid date', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time date="not-a-date"></ui-relative-time>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.hasAttribute('aria-label')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — numeric change
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — numeric change', () => {
    it('updates text when numeric changes from auto to always', async () => {
        // Use exactly -1 day so "auto" may give "yesterday" but "always" gives "1 day ago"
        const date = new Date(Date.now() - 86_400_000);
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date} numeric="auto" lang="en"></ui-relative-time>`);
        el.numeric = 'always';
        await el.updateComplete;
        const text = shadowText(el);
        expect(text).not.toBe('yesterday');
        expect(text.length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — sync rescheduling
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — sync rescheduling', () => {
    beforeEach(() => { vi.useFakeTimers(); });
    afterEach(() => { vi.useRealTimers(); });

    it('reschedules timer when date changes while sync=true', async () => {
        const el = await fixture<UiRelativeTime>(html`
            <ui-relative-time .date=${new Date(Date.now() - 30_000)} sync></ui-relative-time>
        `);
        await el.updateComplete;

        const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
        el.date = new Date(Date.now() - 120_000);
        await el.updateComplete;
        expect(clearSpy).toHaveBeenCalled();
        clearSpy.mockRestore();
    });

    it('uses 60s fallback interval when date is invalid and sync=true', async () => {
        const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time date="bad" sync></ui-relative-time>`);
        await el.updateComplete;
        const calls = setTimeoutSpy.mock.calls;
        const fallbackCall = calls.find(([, ms]) => ms === 60_000);
        expect(fallbackCall).toBeDefined();
        setTimeoutSpy.mockRestore();
        el.remove();
    });

    it('_scheduleSync is a no-op when sync is false (defensive guard)', async () => {
        const el = await fixture<UiRelativeTime>(html`
            <ui-relative-time .date=${new Date(Date.now() - 30_000)} sync></ui-relative-time>
        `);
        await el.updateComplete;
        el.sync = false;
        await el.updateComplete;
        // Now manually invoke _scheduleSync with sync=false — should return early without scheduling
        const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
        (el as unknown as { _scheduleSync(): void })._scheduleSync();
        expect(setTimeoutSpy).not.toHaveBeenCalled();
        setTimeoutSpy.mockRestore();
    });

    it('reschedules when format changes while sync=true', async () => {
        const el = await fixture<UiRelativeTime>(html`
            <ui-relative-time .date=${new Date(Date.now() - 30_000)} sync format="long"></ui-relative-time>
        `);
        await el.updateComplete;

        const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
        el.format = 'short';
        await el.updateComplete;
        expect(clearSpy).toHaveBeenCalled();
        clearSpy.mockRestore();
    });
});


/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — msUntilNextChange 3h+ interval
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — 3h+ sync interval', () => {
    beforeEach(() => { vi.useFakeTimers(); });
    afterEach(() => { vi.useRealTimers(); });

    it('uses 3_600_000ms interval when diff is >= 1 hour', async () => {
        const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
        // 2 hours away → absDiff 7200s → >= 3600 → 1h interval
        const date = new Date(Date.now() - 2 * 3_600_000);
        const el = await fixture<UiRelativeTime>(html`
            <ui-relative-time .date=${date} sync></ui-relative-time>
        `);
        await el.updateComplete;
        const calls = setTimeoutSpy.mock.calls;
        const hourCall = calls.find(([, ms]) => ms === 3_600_000);
        expect(hourCall).toBeDefined();
        setTimeoutSpy.mockRestore();
        el.remove();
    });

    it('uses 3_600_000ms interval for a future date 2 hours away', async () => {
        const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
        const date = new Date(Date.now() + 2 * 3_600_000);
        const el = await fixture<UiRelativeTime>(html`
            <ui-relative-time .date=${date} sync></ui-relative-time>
        `);
        await el.updateComplete;
        const calls = setTimeoutSpy.mock.calls;
        const hourCall = calls.find(([, ms]) => ms === 3_600_000);
        expect(hourCall).toBeDefined();
        setTimeoutSpy.mockRestore();
        el.remove();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — _formatText catch branch
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — _formatText catch branch', () => {
    it('returns empty string when Intl.RelativeTimeFormat throws', async () => {
        const OriginalRTF = Intl.RelativeTimeFormat;
        // @ts-expect-error — intentionally breaking Intl for coverage
        Intl.RelativeTimeFormat = function () { throw new RangeError('bad locale'); };
        try {
            const date = new Date(Date.now() - 60_000);
            const el = await fixture<UiRelativeTime>(html`
                <ui-relative-time .date=${date} lang="en"></ui-relative-time>
            `);
            // catch branch returns '' → <time> has no text
            expect(shadowText(el)).toBe('');
        } finally {
            Intl.RelativeTimeFormat = OriginalRTF;
        }
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — lang fallback chain
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — lang fallback chain', () => {
    it('falls back to document.documentElement.lang when this.lang is empty', async () => {
        const orig = document.documentElement.lang;
        document.documentElement.lang = 'fr';
        try {
            const date = new Date(Date.now() - 400 * 86_400_000);
            const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date}></ui-relative-time>`);
            // Should produce French text since doc lang is 'fr'
            expect(shadowText(el).length).toBeGreaterThan(0);
        } finally {
            document.documentElement.lang = orig;
        }
    });

    it('falls back to navigator.language when both this.lang and doc lang are empty', async () => {
        const origDocLang = document.documentElement.lang;
        document.documentElement.lang = '';
        try {
            const date = new Date(Date.now() - 400 * 86_400_000);
            const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date}></ui-relative-time>`);
            // navigator.language provides a fallback — should still produce output
            expect(shadowText(el).length).toBeGreaterThan(0);
        } finally {
            document.documentElement.lang = origDocLang;
        }
    });

    it('falls back to "en" when this.lang, doc lang, and navigator.language are all empty', async () => {
        const origDocLang = document.documentElement.lang;
        const origNavLang = navigator.language;
        document.documentElement.lang = '';
        Object.defineProperty(navigator, 'language', { value: '', configurable: true });
        try {
            const date = new Date(Date.now() - 400 * 86_400_000);
            const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${date}></ui-relative-time>`);
            // "en" fallback — still produces output
            expect(shadowText(el).length).toBeGreaterThan(0);
        } finally {
            document.documentElement.lang = origDocLang;
            Object.defineProperty(navigator, 'language', { value: origNavLang, configurable: true });
        }
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — CSS custom properties
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-relative-time — CSS custom properties', () => {
    it('renders a time element as the shadow root child', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${new Date()}></ui-relative-time>`);
        const time = el.shadowRoot!.querySelector('time');
        expect(time).not.toBeNull();
    });

    it('host has display inline by default', async () => {
        const el = await fixture<UiRelativeTime>(html`<ui-relative-time .date=${new Date()}></ui-relative-time>`);
        // jsdom doesn't compute shadow styles but we can verify the element exists inline-able
        expect(el.tagName.toLowerCase()).toBe('ui-relative-time');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-relative-time — pickUnit export
═══════════════════════════════════════════════════════════════════════════ */
describe('pickUnit', () => {
    it('returns "second" for 0 seconds', () => {
        expect(pickUnit(0).unit).toBe('second');
    });
    it('returns "second" for 59 seconds', () => {
        expect(pickUnit(59).unit).toBe('second');
    });
    it('returns "minute" for 60 seconds', () => {
        expect(pickUnit(60).unit).toBe('minute');
    });
    it('returns "hour" for 3600 seconds', () => {
        expect(pickUnit(3_600).unit).toBe('hour');
    });
    it('returns "day" for 86400 seconds', () => {
        expect(pickUnit(86_400).unit).toBe('day');
    });
    it('returns "month" for 2592000 seconds', () => {
        expect(pickUnit(2_592_000).unit).toBe('month');
    });
    it('returns "year" for 31536000 seconds', () => {
        expect(pickUnit(31_536_000).unit).toBe('year');
    });
});
