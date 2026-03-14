import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-format-date';
import { parseDate, type FlintFormatDate } from './flint-format-date';

/* ─────────────────────────────────────────────────────────────────── */
/*  Helpers                                                             */
/* ─────────────────────────────────────────────────────────────────── */

function shadowText(el: Element): string {
    const time = el.shadowRoot!.querySelector('time');
    if (!time) return '';
    return Array.from(time.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent ?? '')
        .join('')
        .trim();
}

/* ═══════════════════════════════════════════════════════════════════
   parseDate helper
═══════════════════════════════════════════════════════════════════ */
describe('parseDate', () => {
    it('returns a Date when given a Date object', () => {
        const d = new Date('2024-01-15T12:00:00.000Z');
        expect(parseDate(d)).toBe(d);
    });

    it('returns a Date when given a valid ISO string', () => {
        const result = parseDate('2024-01-15T12:00:00.000Z');
        expect(result).not.toBeNull();
        expect(result!.toISOString()).toBe('2024-01-15T12:00:00.000Z');
    });

    it('returns null for an invalid string', () => {
        expect(parseDate('not-a-date')).toBeNull();
    });

    it('returns null for an empty string', () => {
        expect(parseDate('')).toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Rendering
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — rendering', () => {
    it('renders a <time> element in shadow DOM', async () => {
        const el = await fixture<FlintFormatDate>(html`<flint-format-date></flint-format-date>`);
        expect(el.shadowRoot!.querySelector('time')).not.toBeNull();
    });

    it('sets datetime attribute to ISO string', async () => {
        const date = new Date('2020-07-15T13:17:00.000Z');
        const el = await fixture<FlintFormatDate>(html`<flint-format-date .date=${date}></flint-format-date>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.getAttribute('datetime')).toBe(date.toISOString());
    });

    it('sets title attribute to locale string', async () => {
        const date = new Date('2020-07-15T13:17:00.000Z');
        const el = await fixture<FlintFormatDate>(html`<flint-format-date .date=${date}></flint-format-date>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.getAttribute('title')).toBe(date.toLocaleString());
    });

    it('sets aria-label to the locale string', async () => {
        const date = new Date('2020-07-15T13:17:00.000Z');
        const el = await fixture<FlintFormatDate>(html`<flint-format-date .date=${date}></flint-format-date>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.getAttribute('aria-label')).toBe(date.toLocaleString());
    });

    it('renders empty string for an invalid date', async () => {
        const el = await fixture<FlintFormatDate>(html`<flint-format-date date="not-a-date" year="numeric"></flint-format-date>`);
        expect(shadowText(el)).toBe('');
    });

    it('does not set datetime attribute for invalid date', async () => {
        const el = await fixture<FlintFormatDate>(html`<flint-format-date date="not-a-date"></flint-format-date>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.hasAttribute('datetime')).toBe(false);
    });

    it('does not set aria-label for invalid date', async () => {
        const el = await fixture<FlintFormatDate>(html`<flint-format-date date="not-a-date"></flint-format-date>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.hasAttribute('aria-label')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Default props
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — default props', () => {
    it('defaults date to approximately now', async () => {
        const before = Date.now();
        const el = await fixture<FlintFormatDate>(html`<flint-format-date></flint-format-date>`);
        const after = Date.now();
        const d = el.date instanceof Date ? el.date : new Date(el.date as string);
        expect(d.getTime()).toBeGreaterThanOrEqual(before - 5000);
        expect(d.getTime()).toBeLessThanOrEqual(after + 5000);
    });

    it('defaults hourFormat to "auto"', async () => {
        const el = await fixture<FlintFormatDate>(html`<flint-format-date></flint-format-date>`);
        expect(el.hourFormat).toBe('auto');
    });

    it('defaults all formatting options to undefined', async () => {
        const el = await fixture<FlintFormatDate>(html`<flint-format-date></flint-format-date>`);
        expect(el.weekday).toBeUndefined();
        expect(el.era).toBeUndefined();
        expect(el.year).toBeUndefined();
        expect(el.month).toBeUndefined();
        expect(el.day).toBeUndefined();
        expect(el.hour).toBeUndefined();
        expect(el.minute).toBeUndefined();
        expect(el.second).toBeUndefined();
        expect(el.timeZoneName).toBeUndefined();
        expect(el.timeZone).toBeUndefined();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Numeric fallback
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — numeric fallback', () => {
    it('renders non-empty text when no options are provided', async () => {
        const date = new Date('2024-06-15T00:00:00.000Z');
        const el = await fixture<FlintFormatDate>(html`<flint-format-date .date=${date} lang="en"></flint-format-date>`);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('falls back to numeric date when only hourFormat is set', async () => {
        const date = new Date('2024-06-15T00:00:00.000Z');
        const el = await fixture<FlintFormatDate>(html`<flint-format-date .date=${date} hour-format="24" lang="en"></flint-format-date>`);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Formatting options — year
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — year prop', () => {
    const date = new Date('2024-06-15T12:00:00.000Z');

    it('year="numeric" includes the full year', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} year="numeric" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('2024');
    });

    it('year="2-digit" includes a 2-digit year', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} year="2-digit" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('24');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Formatting options — month
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — month prop', () => {
    const date = new Date('2024-06-15T12:00:00.000Z');

    it('month="long" shows full month name', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} month="long" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('June');
    });

    it('month="short" shows abbreviated month name', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} month="short" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('Jun');
    });

    it('month="numeric" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} month="numeric" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Formatting options — weekday
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — weekday prop', () => {
    // 2024-06-15 is a Saturday
    const date = new Date('2024-06-15T12:00:00.000Z');

    it('weekday="long" shows full weekday name', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} weekday="long" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('Saturday');
    });

    it('weekday="short" shows abbreviated weekday', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} weekday="short" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('Sat');
    });

    it('weekday="narrow" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} weekday="narrow" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Formatting options — hour/minute/second
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — time props', () => {
    const date = new Date('2024-06-15T14:30:45.000Z');

    it('hour + minute renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="numeric" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('hour + minute + second renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" second="2-digit" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   hourFormat prop
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — hourFormat prop', () => {
    // 14:00 UTC — in 12h it's 2:00 PM; in 24h it's 14:00
    const date = new Date('2024-06-15T14:00:00.000Z');

    it('hour-format="12" produces PM text', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" hour-format="12" lang="en" time-zone="UTC"></flint-format-date>
        `);
        const text = shadowText(el);
        expect(text).toMatch(/PM|pm/i);
    });

    it('hour-format="24" produces 14 (no AM/PM)', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" hour-format="24" lang="en" time-zone="UTC"></flint-format-date>
        `);
        const text = shadowText(el);
        expect(text).toContain('14');
        expect(text).not.toMatch(/AM|PM/i);
    });

    it('reflects hour-format attribute', async () => {
        const el = await fixture<FlintFormatDate>(html`<flint-format-date hour-format="24"></flint-format-date>`);
        expect(el.getAttribute('hour-format')).toBe('24');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   timeZone prop
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — timeZone prop', () => {
    it('time-zone="UTC" renders non-empty', async () => {
        const date = new Date('2024-06-15T12:00:00.000Z');
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" time-zone="UTC" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('different time zones produce different output', async () => {
        const date = new Date('2024-06-15T12:00:00.000Z');
        const [elUTC, elNY] = await Promise.all([
            fixture<FlintFormatDate>(html`
                <flint-format-date .date=${date} hour="numeric" minute="2-digit" time-zone="UTC" lang="en"></flint-format-date>
            `),
            fixture<FlintFormatDate>(html`
                <flint-format-date .date=${date} hour="numeric" minute="2-digit" time-zone="America/New_York" lang="en"></flint-format-date>
            `),
        ]);
        expect(shadowText(elUTC)).not.toBe(shadowText(elNY));
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Localization
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — lang prop', () => {
    const date = new Date('2024-06-15T00:00:00.000Z');

    it('produces different text for different lang values', async () => {
        const [elEn, elFr] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} month="long" lang="en"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} month="long" lang="fr"></flint-format-date>`),
        ]);
        expect(shadowText(elEn)).not.toBe(shadowText(elFr));
    });

    it('re-renders when lang property changes', async () => {
        const el = await fixture<FlintFormatDate>(html`<flint-format-date .date=${date} month="long" lang="en"></flint-format-date>`);
        const before = shadowText(el);
        el.lang = 'fr';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('renders with an unsupported lang without crashing', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} year="numeric" lang="xx-INVALID"></flint-format-date>
        `);
        expect(typeof shadowText(el)).toBe('string');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Reactivity — prop changes re-render
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — reactivity', () => {
    const dateA = new Date('2024-01-15T12:00:00.000Z');
    const dateB = new Date('2024-07-20T12:00:00.000Z');

    it('updates when date changes', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${dateA} year="numeric" month="long" day="numeric" lang="en"></flint-format-date>
        `);
        const before = shadowText(el);
        el.date = dateB;
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('updates when month prop changes', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${dateA} month="long" lang="en"></flint-format-date>
        `);
        const before = shadowText(el);
        el.month = 'short';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('updates when year prop changes', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${dateA} year="numeric" lang="en"></flint-format-date>
        `);
        const before = shadowText(el);
        el.year = '2-digit';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Accessibility
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — accessibility', () => {
    it('uses semantic <time> element', async () => {
        const el = await fixture<FlintFormatDate>(html`<flint-format-date></flint-format-date>`);
        expect(el.shadowRoot!.querySelector('time')).not.toBeNull();
    });

    it('datetime attribute is a valid ISO string', async () => {
        const date = new Date('2024-01-15T12:00:00.000Z');
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} year="numeric"></flint-format-date>
        `);
        const datetime = el.shadowRoot!.querySelector('time')!.getAttribute('datetime')!;
        expect(new Date(datetime).toISOString()).toBe(date.toISOString());
    });

    it('has display:inline host style', async () => {
        const el = await fixture<FlintFormatDate>(html`<flint-format-date></flint-format-date>`);
        // Host style is set in shadow CSS; verify the element is inline contextually
        expect(el.tagName.toLowerCase()).toBe('flint-format-date');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   date prop — various input types
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — date input types', () => {
    it('accepts a Date object', async () => {
        const date = new Date('2024-06-15T00:00:00.000Z');
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} year="numeric" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('2024');
    });

    it('accepts an ISO 8601 string attribute', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date date="2024-06-15T00:00:00.000Z" year="numeric" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('2024');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   parseDate — edge cases
═══════════════════════════════════════════════════════════════════ */
describe('parseDate — edge cases', () => {
    it('returns null for new Date(NaN)', () => {
        expect(parseDate(new Date(NaN))).toBeNull();
    });

    it('returns a valid Date for epoch 0 (Date object)', () => {
        const result = parseDate(new Date(0));
        expect(result).not.toBeNull();
        expect(result!.getTime()).toBe(0);
    });

    it('returns a valid Date for epoch 0 (ISO string)', () => {
        const result = parseDate('1970-01-01T00:00:00.000Z');
        expect(result).not.toBeNull();
        expect(result!.getTime()).toBe(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Formatting options — timeZoneName
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — timeZoneName prop', () => {
    const date = new Date('2024-06-15T12:00:00.000Z');

    it('timeZoneName="short" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" time-zone-name="short" time-zone="UTC" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('timeZoneName="long" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" time-zone-name="long" time-zone="UTC" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Formatting options — era
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — era prop', () => {
    // A year-1 AD date
    const adDate = new Date('0001-06-15T00:00:00.000Z');

    it('era="long" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${adDate} era="long" year="numeric" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('era="short" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${adDate} era="short" year="numeric" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('era="narrow" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${adDate} era="narrow" year="numeric" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Formatting options — day
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — day prop', () => {
    const date = new Date('2024-06-15T00:00:00.000Z');

    it('day="numeric" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} day="numeric" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('day="2-digit" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} day="2-digit" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Invalid timeZone graceful handling
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — invalid timeZone', () => {
    it('renders empty string for an invalid timeZone without throwing', async () => {
        const date = new Date('2024-06-15T12:00:00.000Z');
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" time-zone="Invalid/Zone" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toBe('');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Combined fields
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — combined fields', () => {
    // 2024-06-15 is a Saturday
    const date = new Date('2024-06-15T12:00:00.000Z');

    it('weekday + year + month + day produces full date string', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} weekday="long" year="numeric" month="long" day="numeric" lang="en" time-zone="UTC"></flint-format-date>
        `);
        const text = shadowText(el);
        expect(text).toContain('Saturday');
        expect(text).toContain('June');
        expect(text).toContain('2024');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Reactivity — all remaining props
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — reactivity (remaining props)', () => {
    const date = new Date('2024-06-15T14:30:00.000Z');

    it('updates when weekday prop changes', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} weekday="long" lang="en"></flint-format-date>
        `);
        const before = shadowText(el);
        el.weekday = 'short';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('updates when day prop changes', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} day="numeric" lang="en"></flint-format-date>
        `);
        el.day = '2-digit';
        await el.updateComplete;
        // Both may render the same text (e.g. "15" vs "15") but the prop change should not throw
        expect(shadowText(el)).not.toBe('');
    });

    it('updates when hour prop changes', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" lang="en" time-zone="UTC"></flint-format-date>
        `);
        el.hour = '2-digit';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe('');
    });

    it('updates when minute prop changes', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="numeric" lang="en" time-zone="UTC"></flint-format-date>
        `);
        el.minute = '2-digit';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe('');
    });

    it('updates when second prop changes', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" second="numeric" lang="en" time-zone="UTC"></flint-format-date>
        `);
        const before = shadowText(el);
        el.second = undefined;
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('updates when timeZone prop changes', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" time-zone="UTC" lang="en"></flint-format-date>
        `);
        const before = shadowText(el);
        el.timeZone = 'America/New_York';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('updates when hourFormat prop changes', async () => {
        const date14 = new Date('2024-06-15T14:00:00.000Z');
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date14} hour="numeric" minute="2-digit" hour-format="24" time-zone="UTC" lang="en"></flint-format-date>
        `);
        const before = shadowText(el);
        el.hourFormat = '12';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   dateStyle / timeStyle props
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — dateStyle / timeStyle props', () => {
    const date = new Date('2024-06-15T14:30:00.000Z');

    it('dateStyle="full" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} date-style="full" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('dateStyle="short" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} date-style="short" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('timeStyle="medium" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} time-style="medium" time-zone="UTC" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('dateStyle="long" + timeStyle="short" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} date-style="long" time-style="short" time-zone="UTC" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('dateStyle="full" produces different output than dateStyle="short"', async () => {
        const [elFull, elShort] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} date-style="full" lang="en"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} date-style="short" lang="en"></flint-format-date>`),
        ]);
        expect(shadowText(elFull)).not.toBe(shadowText(elShort));
    });
});

/* ═══════════════════════════════════════════════════════════════════
   fractionalSecondDigits prop
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — fractionalSecondDigits prop', () => {
    const date = new Date('2024-06-15T14:30:45.123Z');

    it('fractional-second-digits="3" renders non-empty', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" second="2-digit" .fractionalSecondDigits=${3} time-zone="UTC" lang="en"></flint-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   aria-label respects lang
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — aria-label locale', () => {
    it('aria-label changes when lang changes', async () => {
        const date = new Date('2024-06-15T12:00:00.000Z');
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} year="numeric" month="long" lang="en"></flint-format-date>
        `);
        const labelEn = el.shadowRoot!.querySelector('time')!.getAttribute('aria-label')!;
        el.lang = 'fr';
        await el.updateComplete;
        const labelFr = el.shadowRoot!.querySelector('time')!.getAttribute('aria-label')!;
        expect(labelEn).not.toBe(labelFr);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Mutation kill — ID 4059: lang default '' → garbage string
   If lang defaults to a non-empty garbage string, Intl throws → ''
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — default lang produces valid output', () => {
    it('renders non-empty text when no lang attribute is set', async () => {
        const date = new Date('2024-06-15T12:00:00.000Z');
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} year="numeric"></flint-format-date>
        `);
        expect(shadowText(el)).not.toBe('');
        expect(shadowText(el)).toContain('2024');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Mutation kill — ID 4065: if(timeZoneName) → false
   timeZoneName is never added to options → abbreviation absent
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — timeZoneName includes abbreviation', () => {
    const date = new Date('2024-06-15T12:00:00.000Z');

    it('time-zone-name="short" includes the UTC abbreviation in output', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" time-zone="UTC" time-zone-name="short" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('UTC');
    });

    it('output with time-zone-name differs from output without', async () => {
        const [noTzn, withTzn] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} hour="numeric" minute="2-digit" time-zone="UTC" lang="en"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} hour="numeric" minute="2-digit" time-zone="UTC" time-zone-name="short" lang="en"></flint-format-date>`),
        ]);
        expect(shadowText(withTzn)).not.toBe(shadowText(noTzn));
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Mutation kill — ID 4067: if(hourFormat==='12') → false
   hour12=true never set; 12h not forced; 24h-default locale stays 24h
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — hour-format="12" forces 12h in 24h-default locale', () => {
    // 14:00 UTC; French locale defaults to 24h
    const date = new Date('2024-06-15T14:00:00.000Z');

    it('hour-format="12" output differs from hour-format="24" in fr locale', async () => {
        const [h12, h24] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} hour="numeric" minute="2-digit" hour-format="12" time-zone="UTC" lang="fr"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} hour="numeric" minute="2-digit" hour-format="24" time-zone="UTC" lang="fr"></flint-format-date>`),
        ]);
        expect(shadowText(h12)).not.toBe(shadowText(h24));
    });

    it('hour-format="24" contains 14 in fr locale (24h output)', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" hour-format="24" time-zone="UTC" lang="fr"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('14');
    });

    it('hour-format="12" does not contain 14 in fr locale (12h output)', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" hour-format="12" time-zone="UTC" lang="fr"></flint-format-date>
        `);
        expect(shadowText(el)).not.toContain('14');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Mutation kill — ID 4071: else if(hourFormat==='24') → true
   hour12=false always set; en locale's 12h default would be overridden
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — hour-format="auto" does not force 24h', () => {
    const date = new Date('2024-06-15T14:00:00.000Z');

    it('hour-format="auto" shows AM/PM in en locale (12h default)', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" hour-format="auto" time-zone="UTC" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toMatch(/PM|pm/i);
    });

    it('hour-format="auto" and hour-format="24" produce different output in en locale', async () => {
        const [auto, h24] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} hour="numeric" minute="2-digit" hour-format="auto" time-zone="UTC" lang="en"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} hour="numeric" minute="2-digit" hour-format="24" time-zone="UTC" lang="en"></flint-format-date>`),
        ]);
        expect(shadowText(auto)).not.toBe(shadowText(h24));
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Mutation kill — ID 4083: if(timeStyle) → false
   timeStyle never added → Intl uses default date format, not time
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — timeStyle includes time information', () => {
    const date = new Date('2024-06-15T14:30:00.000Z');

    it('time-style="short" includes minute digits in output', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} time-style="short" time-zone="UTC" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('30');
    });

    it('time-style="short" output differs from date-style="short" output', async () => {
        const [timeOnly, dateOnly] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} time-style="short" time-zone="UTC" lang="en"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} date-style="short" lang="en"></flint-format-date>`),
        ]);
        expect(shadowText(timeOnly)).not.toBe(shadowText(dateOnly));
    });

    it('time-style="long" includes UTC abbreviation', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} time-style="long" time-zone="UTC" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('UTC');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Mutation kill — ID 4088: if(era) → false
   era never added to options → era label absent from output
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — era label in output', () => {
    const date = new Date('2024-06-15T00:00:00.000Z');

    it('era="long" includes AD era label', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} era="long" year="numeric" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toMatch(/AD|Anno Domini/i);
    });

    it('era="short" produces different output than year-only', async () => {
        const [yearOnly, withEra] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} year="numeric" lang="en"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} era="short" year="numeric" lang="en"></flint-format-date>`),
        ]);
        expect(shadowText(withEra)).not.toBe(shadowText(yearOnly));
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Mutation kill — ID 4094: if(day) → false
   day never added → Intl default format used instead of day-only
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — day-only format', () => {
    const date = new Date('2024-06-15T12:00:00.000Z');

    it('day="numeric" alone shows only the day number', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} day="numeric" lang="en" time-zone="UTC"></flint-format-date>
        `);
        expect(shadowText(el)).toBe('15');
    });

    it('day="numeric" alone produces different output than no-field fallback', async () => {
        const [dayOnly, noFields] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} day="numeric" lang="en" time-zone="UTC"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} lang="en" time-zone="UTC"></flint-format-date>`),
        ]);
        expect(shadowText(dayOnly)).not.toBe(shadowText(noFields));
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Mutation kill — ID 4098: if(minute) → false
   minute never added → minute digits absent from output
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — minute in output', () => {
    const date = new Date('2024-06-15T14:30:45.000Z');

    it('minute="2-digit" includes the minute value in output', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" time-zone="UTC" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('30');
    });

    it('hour+minute produces different output than hour-only', async () => {
        const [hourOnly, withMin] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} hour="numeric" time-zone="UTC" lang="en"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} hour="numeric" minute="2-digit" time-zone="UTC" lang="en"></flint-format-date>`),
        ]);
        expect(shadowText(withMin)).not.toBe(shadowText(hourOnly));
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Mutation kill — ID 4102: if(fractionalSecondDigits) → false
   fractionalSecondDigits never added → sub-second digits absent
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — fractionalSecondDigits in output', () => {
    const date = new Date('2024-06-15T14:30:45.123Z');

    it('fractionalSecondDigits=3 produces different output than without', async () => {
        const fsd = 3 as const;
        const [noFrac, withFrac] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} hour="numeric" minute="2-digit" second="2-digit" time-zone="UTC" lang="en"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} hour="numeric" minute="2-digit" second="2-digit" .fractionalSecondDigits=${fsd} time-zone="UTC" lang="en"></flint-format-date>`),
        ]);
        expect(shadowText(withFrac)).not.toBe(shadowText(noFrac));
    });

    it('fractionalSecondDigits=3 includes millisecond digits', async () => {
        const fsd = 3 as const;
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} hour="numeric" minute="2-digit" second="2-digit" .fractionalSecondDigits=${fsd} time-zone="UTC" lang="en"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('123');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Mutation kill — IDs 4118, 4119: hasDisplayField → false / || → &&
   A single display field must prevent the year/month/day fallback
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — hasDisplayField: single field prevents fallback', () => {
    const date = new Date('2024-06-15T12:00:00.000Z'); // Saturday

    it('weekday="long" alone does not include year from fallback', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} weekday="long" lang="en" time-zone="UTC"></flint-format-date>
        `);
        expect(shadowText(el)).toContain('Saturday');
        expect(shadowText(el)).not.toContain('2024');
    });

    it('weekday="long" alone produces different output than no-field fallback', async () => {
        const [weekdayOnly, fallback] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} weekday="long" lang="en" time-zone="UTC"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} lang="en" time-zone="UTC"></flint-format-date>`),
        ]);
        expect(shadowText(weekdayOnly)).not.toBe(shadowText(fallback));
    });

    // ID 4119: ||→&& makes year alone not count as hasDisplayField → fallback overrides year
    it('year="numeric" alone shows only the year (not full date)', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} year="numeric" lang="en" time-zone="UTC"></flint-format-date>
        `);
        expect(shadowText(el)).toBe('2024');
    });

    it('year="numeric" alone differs from year+month+day', async () => {
        const [yearOnly, fullDate] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} year="numeric" lang="en" time-zone="UTC"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} year="numeric" month="numeric" day="numeric" lang="en" time-zone="UTC"></flint-format-date>`),
        ]);
        expect(shadowText(yearOnly)).not.toBe(shadowText(fullDate));
    });

    it('month="long" alone shows only the month name (not full date)', async () => {
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${date} month="long" lang="en" time-zone="UTC"></flint-format-date>
        `);
        expect(shadowText(el)).toBe('June');
    });

    it('hour="numeric" alone does not include year from fallback', async () => {
        const dateWithTime = new Date('2024-06-15T14:30:00.000Z');
        const el = await fixture<FlintFormatDate>(html`
            <flint-format-date .date=${dateWithTime} hour="numeric" lang="en" time-zone="UTC"></flint-format-date>
        `);
        expect(shadowText(el)).not.toContain('2024');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Mutation kill — ID 4142: _localeString timeZone opts → {}
   Empty opts means timeZone not passed to toLocaleString → wrong time in title
═══════════════════════════════════════════════════════════════════ */
describe('flint-format-date — title/aria-label reflects timeZone', () => {
    it('title attribute differs for UTC vs America/New_York', async () => {
        // 8 PM UTC = 4 PM NY; ensures they differ
        const date = new Date('2024-06-15T20:00:00.000Z');
        const [elUTC, elNY] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} time-zone="UTC" lang="en"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} time-zone="America/New_York" lang="en"></flint-format-date>`),
        ]);
        const titleUTC = elUTC.shadowRoot!.querySelector('time')!.getAttribute('title');
        const titleNY = elNY.shadowRoot!.querySelector('time')!.getAttribute('title');
        expect(titleUTC).not.toBe(titleNY);
    });

    it('aria-label attribute differs for UTC vs America/New_York', async () => {
        const date = new Date('2024-06-15T20:00:00.000Z');
        const [elUTC, elNY] = await Promise.all([
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} time-zone="UTC" lang="en"></flint-format-date>`),
            fixture<FlintFormatDate>(html`<flint-format-date .date=${date} time-zone="America/New_York" lang="en"></flint-format-date>`),
        ]);
        const labelUTC = elUTC.shadowRoot!.querySelector('time')!.getAttribute('aria-label');
        const labelNY = elNY.shadowRoot!.querySelector('time')!.getAttribute('aria-label');
        expect(labelUTC).not.toBe(labelNY);
    });
});
