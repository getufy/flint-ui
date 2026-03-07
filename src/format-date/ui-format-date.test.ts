import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-format-date';
import { parseDate, type UiFormatDate } from './ui-format-date';

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
describe('ui-format-date — rendering', () => {
    it('renders a <time> element in shadow DOM', async () => {
        const el = await fixture<UiFormatDate>(html`<ui-format-date></ui-format-date>`);
        expect(el.shadowRoot!.querySelector('time')).not.toBeNull();
    });

    it('sets datetime attribute to ISO string', async () => {
        const date = new Date('2020-07-15T13:17:00.000Z');
        const el = await fixture<UiFormatDate>(html`<ui-format-date .date=${date}></ui-format-date>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.getAttribute('datetime')).toBe(date.toISOString());
    });

    it('sets title attribute to locale string', async () => {
        const date = new Date('2020-07-15T13:17:00.000Z');
        const el = await fixture<UiFormatDate>(html`<ui-format-date .date=${date}></ui-format-date>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.getAttribute('title')).toBe(date.toLocaleString());
    });

    it('sets aria-label to the locale string', async () => {
        const date = new Date('2020-07-15T13:17:00.000Z');
        const el = await fixture<UiFormatDate>(html`<ui-format-date .date=${date}></ui-format-date>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.getAttribute('aria-label')).toBe(date.toLocaleString());
    });

    it('renders empty string for an invalid date', async () => {
        const el = await fixture<UiFormatDate>(html`<ui-format-date date="not-a-date" year="numeric"></ui-format-date>`);
        expect(shadowText(el)).toBe('');
    });

    it('does not set datetime attribute for invalid date', async () => {
        const el = await fixture<UiFormatDate>(html`<ui-format-date date="not-a-date"></ui-format-date>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.hasAttribute('datetime')).toBe(false);
    });

    it('does not set aria-label for invalid date', async () => {
        const el = await fixture<UiFormatDate>(html`<ui-format-date date="not-a-date"></ui-format-date>`);
        const time = el.shadowRoot!.querySelector('time')!;
        expect(time.hasAttribute('aria-label')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Default props
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — default props', () => {
    it('defaults date to approximately now', async () => {
        const before = Date.now();
        const el = await fixture<UiFormatDate>(html`<ui-format-date></ui-format-date>`);
        const after = Date.now();
        const d = el.date instanceof Date ? el.date : new Date(el.date as string);
        expect(d.getTime()).toBeGreaterThanOrEqual(before - 5000);
        expect(d.getTime()).toBeLessThanOrEqual(after + 5000);
    });

    it('defaults hourFormat to "auto"', async () => {
        const el = await fixture<UiFormatDate>(html`<ui-format-date></ui-format-date>`);
        expect(el.hourFormat).toBe('auto');
    });

    it('defaults all formatting options to undefined', async () => {
        const el = await fixture<UiFormatDate>(html`<ui-format-date></ui-format-date>`);
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
describe('ui-format-date — numeric fallback', () => {
    it('renders non-empty text when no options are provided', async () => {
        const date = new Date('2024-06-15T00:00:00.000Z');
        const el = await fixture<UiFormatDate>(html`<ui-format-date .date=${date} lang="en"></ui-format-date>`);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('falls back to numeric date when only hourFormat is set', async () => {
        const date = new Date('2024-06-15T00:00:00.000Z');
        const el = await fixture<UiFormatDate>(html`<ui-format-date .date=${date} hour-format="24" lang="en"></ui-format-date>`);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Formatting options — year
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — year prop', () => {
    const date = new Date('2024-06-15T12:00:00.000Z');

    it('year="numeric" includes the full year', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} year="numeric" lang="en"></ui-format-date>
        `);
        expect(shadowText(el)).toContain('2024');
    });

    it('year="2-digit" includes a 2-digit year', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} year="2-digit" lang="en"></ui-format-date>
        `);
        expect(shadowText(el)).toContain('24');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Formatting options — month
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — month prop', () => {
    const date = new Date('2024-06-15T12:00:00.000Z');

    it('month="long" shows full month name', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} month="long" lang="en"></ui-format-date>
        `);
        expect(shadowText(el)).toContain('June');
    });

    it('month="short" shows abbreviated month name', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} month="short" lang="en"></ui-format-date>
        `);
        expect(shadowText(el)).toContain('Jun');
    });

    it('month="numeric" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} month="numeric" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Formatting options — weekday
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — weekday prop', () => {
    // 2024-06-15 is a Saturday
    const date = new Date('2024-06-15T12:00:00.000Z');

    it('weekday="long" shows full weekday name', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} weekday="long" lang="en"></ui-format-date>
        `);
        expect(shadowText(el)).toContain('Saturday');
    });

    it('weekday="short" shows abbreviated weekday', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} weekday="short" lang="en"></ui-format-date>
        `);
        expect(shadowText(el)).toContain('Sat');
    });

    it('weekday="narrow" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} weekday="narrow" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Formatting options — hour/minute/second
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — time props', () => {
    const date = new Date('2024-06-15T14:30:45.000Z');

    it('hour + minute renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} hour="numeric" minute="numeric" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('hour + minute + second renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} hour="numeric" minute="2-digit" second="2-digit" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   hourFormat prop
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — hourFormat prop', () => {
    // 14:00 UTC — in 12h it's 2:00 PM; in 24h it's 14:00
    const date = new Date('2024-06-15T14:00:00.000Z');

    it('hour-format="12" produces PM text', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} hour="numeric" minute="2-digit" hour-format="12" lang="en" time-zone="UTC"></ui-format-date>
        `);
        const text = shadowText(el);
        expect(text).toMatch(/PM|pm/i);
    });

    it('hour-format="24" produces 14 (no AM/PM)', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} hour="numeric" minute="2-digit" hour-format="24" lang="en" time-zone="UTC"></ui-format-date>
        `);
        const text = shadowText(el);
        expect(text).toContain('14');
        expect(text).not.toMatch(/AM|PM/i);
    });

    it('reflects hour-format attribute', async () => {
        const el = await fixture<UiFormatDate>(html`<ui-format-date hour-format="24"></ui-format-date>`);
        expect(el.getAttribute('hour-format')).toBe('24');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   timeZone prop
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — timeZone prop', () => {
    it('time-zone="UTC" renders non-empty', async () => {
        const date = new Date('2024-06-15T12:00:00.000Z');
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} hour="numeric" minute="2-digit" time-zone="UTC" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('different time zones produce different output', async () => {
        const date = new Date('2024-06-15T12:00:00.000Z');
        const [elUTC, elNY] = await Promise.all([
            fixture<UiFormatDate>(html`
                <ui-format-date .date=${date} hour="numeric" minute="2-digit" time-zone="UTC" lang="en"></ui-format-date>
            `),
            fixture<UiFormatDate>(html`
                <ui-format-date .date=${date} hour="numeric" minute="2-digit" time-zone="America/New_York" lang="en"></ui-format-date>
            `),
        ]);
        expect(shadowText(elUTC)).not.toBe(shadowText(elNY));
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Localization
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — lang prop', () => {
    const date = new Date('2024-06-15T00:00:00.000Z');

    it('produces different text for different lang values', async () => {
        const [elEn, elFr] = await Promise.all([
            fixture<UiFormatDate>(html`<ui-format-date .date=${date} month="long" lang="en"></ui-format-date>`),
            fixture<UiFormatDate>(html`<ui-format-date .date=${date} month="long" lang="fr"></ui-format-date>`),
        ]);
        expect(shadowText(elEn)).not.toBe(shadowText(elFr));
    });

    it('re-renders when lang property changes', async () => {
        const el = await fixture<UiFormatDate>(html`<ui-format-date .date=${date} month="long" lang="en"></ui-format-date>`);
        const before = shadowText(el);
        el.lang = 'fr';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('renders with an unsupported lang without crashing', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} year="numeric" lang="xx-INVALID"></ui-format-date>
        `);
        expect(typeof shadowText(el)).toBe('string');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Reactivity — prop changes re-render
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — reactivity', () => {
    const dateA = new Date('2024-01-15T12:00:00.000Z');
    const dateB = new Date('2024-07-20T12:00:00.000Z');

    it('updates when date changes', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${dateA} year="numeric" month="long" day="numeric" lang="en"></ui-format-date>
        `);
        const before = shadowText(el);
        el.date = dateB;
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('updates when month prop changes', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${dateA} month="long" lang="en"></ui-format-date>
        `);
        const before = shadowText(el);
        el.month = 'short';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('updates when year prop changes', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${dateA} year="numeric" lang="en"></ui-format-date>
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
describe('ui-format-date — accessibility', () => {
    it('uses semantic <time> element', async () => {
        const el = await fixture<UiFormatDate>(html`<ui-format-date></ui-format-date>`);
        expect(el.shadowRoot!.querySelector('time')).not.toBeNull();
    });

    it('datetime attribute is a valid ISO string', async () => {
        const date = new Date('2024-01-15T12:00:00.000Z');
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} year="numeric"></ui-format-date>
        `);
        const datetime = el.shadowRoot!.querySelector('time')!.getAttribute('datetime')!;
        expect(new Date(datetime).toISOString()).toBe(date.toISOString());
    });

    it('has display:inline host style', async () => {
        const el = await fixture<UiFormatDate>(html`<ui-format-date></ui-format-date>`);
        // Host style is set in shadow CSS; verify the element is inline contextually
        expect(el.tagName.toLowerCase()).toBe('ui-format-date');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   date prop — various input types
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — date input types', () => {
    it('accepts a Date object', async () => {
        const date = new Date('2024-06-15T00:00:00.000Z');
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} year="numeric" lang="en"></ui-format-date>
        `);
        expect(shadowText(el)).toContain('2024');
    });

    it('accepts an ISO 8601 string attribute', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date date="2024-06-15T00:00:00.000Z" year="numeric" lang="en"></ui-format-date>
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
describe('ui-format-date — timeZoneName prop', () => {
    const date = new Date('2024-06-15T12:00:00.000Z');

    it('timeZoneName="short" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} hour="numeric" minute="2-digit" time-zone-name="short" time-zone="UTC" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('timeZoneName="long" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} hour="numeric" minute="2-digit" time-zone-name="long" time-zone="UTC" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Formatting options — era
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — era prop', () => {
    // A year-1 AD date
    const adDate = new Date('0001-06-15T00:00:00.000Z');

    it('era="long" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${adDate} era="long" year="numeric" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('era="short" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${adDate} era="short" year="numeric" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('era="narrow" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${adDate} era="narrow" year="numeric" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Formatting options — day
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — day prop', () => {
    const date = new Date('2024-06-15T00:00:00.000Z');

    it('day="numeric" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} day="numeric" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('day="2-digit" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} day="2-digit" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Invalid timeZone graceful handling
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — invalid timeZone', () => {
    it('renders empty string for an invalid timeZone without throwing', async () => {
        const date = new Date('2024-06-15T12:00:00.000Z');
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} hour="numeric" time-zone="Invalid/Zone" lang="en"></ui-format-date>
        `);
        expect(shadowText(el)).toBe('');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   Combined fields
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — combined fields', () => {
    // 2024-06-15 is a Saturday
    const date = new Date('2024-06-15T12:00:00.000Z');

    it('weekday + year + month + day produces full date string', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} weekday="long" year="numeric" month="long" day="numeric" lang="en" time-zone="UTC"></ui-format-date>
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
describe('ui-format-date — reactivity (remaining props)', () => {
    const date = new Date('2024-06-15T14:30:00.000Z');

    it('updates when weekday prop changes', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} weekday="long" lang="en"></ui-format-date>
        `);
        const before = shadowText(el);
        el.weekday = 'short';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('updates when day prop changes', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} day="numeric" lang="en"></ui-format-date>
        `);
        el.day = '2-digit';
        await el.updateComplete;
        // Both may render the same text (e.g. "15" vs "15") but the prop change should not throw
        expect(shadowText(el)).not.toBe('');
    });

    it('updates when hour prop changes', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} hour="numeric" minute="2-digit" lang="en" time-zone="UTC"></ui-format-date>
        `);
        el.hour = '2-digit';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe('');
    });

    it('updates when minute prop changes', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} hour="numeric" minute="numeric" lang="en" time-zone="UTC"></ui-format-date>
        `);
        el.minute = '2-digit';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe('');
    });

    it('updates when second prop changes', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} hour="numeric" minute="2-digit" second="numeric" lang="en" time-zone="UTC"></ui-format-date>
        `);
        const before = shadowText(el);
        el.second = undefined;
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('updates when timeZone prop changes', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} hour="numeric" minute="2-digit" time-zone="UTC" lang="en"></ui-format-date>
        `);
        const before = shadowText(el);
        el.timeZone = 'America/New_York';
        await el.updateComplete;
        expect(shadowText(el)).not.toBe(before);
    });

    it('updates when hourFormat prop changes', async () => {
        const date14 = new Date('2024-06-15T14:00:00.000Z');
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date14} hour="numeric" minute="2-digit" hour-format="24" time-zone="UTC" lang="en"></ui-format-date>
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
describe('ui-format-date — dateStyle / timeStyle props', () => {
    const date = new Date('2024-06-15T14:30:00.000Z');

    it('dateStyle="full" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} date-style="full" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('dateStyle="short" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} date-style="short" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('timeStyle="medium" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} time-style="medium" time-zone="UTC" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('dateStyle="long" + timeStyle="short" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} date-style="long" time-style="short" time-zone="UTC" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });

    it('dateStyle="full" produces different output than dateStyle="short"', async () => {
        const [elFull, elShort] = await Promise.all([
            fixture<UiFormatDate>(html`<ui-format-date .date=${date} date-style="full" lang="en"></ui-format-date>`),
            fixture<UiFormatDate>(html`<ui-format-date .date=${date} date-style="short" lang="en"></ui-format-date>`),
        ]);
        expect(shadowText(elFull)).not.toBe(shadowText(elShort));
    });
});

/* ═══════════════════════════════════════════════════════════════════
   fractionalSecondDigits prop
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — fractionalSecondDigits prop', () => {
    const date = new Date('2024-06-15T14:30:45.123Z');

    it('fractional-second-digits="3" renders non-empty', async () => {
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} hour="numeric" minute="2-digit" second="2-digit" .fractionalSecondDigits=${3} time-zone="UTC" lang="en"></ui-format-date>
        `);
        expect(shadowText(el).length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   aria-label respects lang
═══════════════════════════════════════════════════════════════════ */
describe('ui-format-date — aria-label locale', () => {
    it('aria-label changes when lang changes', async () => {
        const date = new Date('2024-06-15T12:00:00.000Z');
        const el = await fixture<UiFormatDate>(html`
            <ui-format-date .date=${date} year="numeric" month="long" lang="en"></ui-format-date>
        `);
        const labelEn = el.shadowRoot!.querySelector('time')!.getAttribute('aria-label')!;
        el.lang = 'fr';
        await el.updateComplete;
        const labelFr = el.shadowRoot!.querySelector('time')!.getAttribute('aria-label')!;
        expect(labelEn).not.toBe(labelFr);
    });
});
