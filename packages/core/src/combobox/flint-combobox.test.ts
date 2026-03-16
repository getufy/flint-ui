import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-combobox.js';
import type { FlintCombobox, ComboboxOption } from './flint-combobox.js';
import { expectAccessible } from '../test-utils/axe.js';

/* ── helpers ─────────────────────────────────────────────────────── */

const fruits: ComboboxOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Apricot', value: 'apricot' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Date', value: 'date' },
];

interface MakeOpts {
    options?: ComboboxOption[];
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    defaultValue?: string;
}

async function make({
    options = fruits,
    value = '',
    placeholder = '',
    disabled = false,
    required = false,
    name = '',
    defaultValue = '',
}: MakeOpts = {}) {
    const el = await fixture<FlintCombobox>(html`
        <flint-combobox
            .options=${options}
            .value=${value}
            .placeholder=${placeholder}
            .disabled=${disabled}
            .required=${required}
            .name=${name}
            default-value=${defaultValue}
        ></flint-combobox>
    `);
    await el.updateComplete;
    return el;
}

function getInput(el: FlintCombobox): HTMLInputElement {
    return el.shadowRoot!.querySelector('input')!;
}

function getListbox(el: FlintCombobox): HTMLElement {
    return el.shadowRoot!.querySelector('[role="listbox"]')!;
}

function getOptions(el: FlintCombobox): NodeListOf<HTMLElement> {
    return el.shadowRoot!.querySelectorAll('[role="option"]');
}

function focusInput(el: FlintCombobox) {
    const input = getInput(el);
    input.dispatchEvent(new Event('focus'));
}

function typeText(el: FlintCombobox, text: string) {
    const input = getInput(el);
    input.value = text;
    input.dispatchEvent(new Event('input', { bubbles: true }));
}

function pressKey(el: FlintCombobox, key: string) {
    const input = getInput(el);
    input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

/* ── tests ───────────────────────────────────────────────────────── */

describe('flint-combobox', () => {
    /* ── default rendering ──────────────────────────────────────── */

    describe('default rendering', () => {
        it('should render a shadow root', async () => {
            const el = await make();
            expect(el.shadowRoot).not.toBeNull();
        });

        it('should render an input element', async () => {
            const el = await make();
            expect(getInput(el)).not.toBeNull();
        });

        it('should render a listbox', async () => {
            const el = await make();
            expect(getListbox(el)).not.toBeNull();
        });

        it('should render the base wrapper with part="base"', async () => {
            const el = await make();
            const base = el.shadowRoot!.querySelector('[part="base"]');
            expect(base).not.toBeNull();
        });

        it('should have input with role="combobox"', async () => {
            const el = await make();
            expect(getInput(el).getAttribute('role')).to.equal('combobox');
        });
    });

    /* ── value property ─────────────────────────────────────────── */

    describe('value property', () => {
        it('should default to empty string', async () => {
            const el = await make();
            expect(el.value).to.equal('');
        });

        it('should accept an initial value', async () => {
            const el = await make({ value: 'banana' });
            expect(el.value).to.equal('banana');
        });

        it('should reflect value to the input element', async () => {
            const el = await make({ value: 'cherry' });
            expect(getInput(el).value).to.equal('cherry');
        });

        it('should update input when value changes programmatically', async () => {
            const el = await make();
            el.value = 'date';
            await el.updateComplete;
            expect(getInput(el).value).to.equal('date');
        });
    });

    /* ── placeholder ────────────────────────────────────────────── */

    describe('placeholder', () => {
        it('should render placeholder text', async () => {
            const el = await make({ placeholder: 'Search fruits...' });
            expect(getInput(el).getAttribute('placeholder')).to.equal('Search fruits...');
        });

        it('should default to empty string', async () => {
            const el = await make();
            expect(getInput(el).getAttribute('placeholder')).to.equal('');
        });
    });

    /* ── disabled state ─────────────────────────────────────────── */

    describe('disabled state', () => {
        it('should set disabled attribute on input', async () => {
            const el = await make({ disabled: true });
            expect(getInput(el).disabled).toBe(true);
        });

        it('should reflect disabled attribute on host', async () => {
            const el = await make({ disabled: true });
            await el.updateComplete;
            expect(el.hasAttribute('disabled')).toBe(true);
        });

        it('should not open dropdown on focus when disabled', async () => {
            const el = await make({ disabled: true });
            focusInput(el);
            await el.updateComplete;
            expect(getInput(el).getAttribute('aria-expanded')).to.equal('false');
        });
    });

    /* ── required state ─────────────────────────────────────────── */

    describe('required state', () => {
        it('should reflect required attribute on host', async () => {
            const el = await make({ required: true });
            await el.updateComplete;
            expect(el.hasAttribute('required')).toBe(true);
        });
    });

    /* ── opening dropdown on focus ──────────────────────────────── */

    describe('opening dropdown', () => {
        it('should open on focus', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;
            expect(getInput(el).getAttribute('aria-expanded')).to.equal('true');
        });

        it('should show all options when input is empty', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;
            expect(getOptions(el).length).to.equal(5);
        });

        it('should not open if there are no options', async () => {
            const el = await make({ options: [] });
            focusInput(el);
            await el.updateComplete;
            expect(getInput(el).getAttribute('aria-expanded')).to.equal('false');
        });
    });

    /* ── filtering ──────────────────────────────────────────────── */

    describe('filtering options', () => {
        it('should filter options based on input text', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;
            typeText(el, 'ap');
            await el.updateComplete;
            const opts = getOptions(el);
            expect(opts.length).to.equal(2); // Apple, Apricot
        });

        it('should be case-insensitive', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;
            typeText(el, 'AP');
            await el.updateComplete;
            expect(getOptions(el).length).to.equal(2);
        });

        it('should show all options when filter is cleared', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;
            typeText(el, 'ap');
            await el.updateComplete;
            typeText(el, '');
            await el.updateComplete;
            expect(getOptions(el).length).to.equal(5);
        });

        it('should show no options element when nothing matches', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;
            typeText(el, 'zzz');
            await el.updateComplete;
            const noOpts = el.shadowRoot!.querySelector('.no-options');
            expect(noOpts).not.toBeNull();
            expect(getOptions(el).length).to.equal(0);
        });
    });

    /* ── selecting an option (click) ────────────────────────────── */

    describe('selecting an option', () => {
        it('should select option on click', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;

            const opts = getOptions(el);
            opts[2]!.click(); // Banana
            await el.updateComplete;

            expect(el.value).to.equal('banana');
            expect(getInput(el).value).to.equal('Banana');
        });

        it('should close dropdown after selection', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;

            getOptions(el)[0]!.click();
            await el.updateComplete;

            expect(getInput(el).getAttribute('aria-expanded')).to.equal('false');
        });
    });

    /* ── keyboard navigation ────────────────────────────────────── */

    describe('keyboard navigation', () => {
        it('should open dropdown and highlight first option on ArrowDown when closed', async () => {
            const el = await make();
            pressKey(el, 'ArrowDown');
            await el.updateComplete;
            expect(getInput(el).getAttribute('aria-expanded')).to.equal('true');
            const opts = getOptions(el);
            expect(opts[0]!.getAttribute('aria-selected')).to.equal('true');
        });

        it('should open and highlight last option on ArrowUp when closed', async () => {
            const el = await make();
            pressKey(el, 'ArrowUp');
            await el.updateComplete;
            expect(getInput(el).getAttribute('aria-expanded')).to.equal('true');
            const opts = getOptions(el);
            expect(opts[opts.length - 1]!.getAttribute('aria-selected')).to.equal('true');
        });

        it('should move active index down with ArrowDown', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;

            pressKey(el, 'ArrowDown');
            await el.updateComplete;
            expect(getOptions(el)[0]!.getAttribute('aria-selected')).to.equal('true');

            pressKey(el, 'ArrowDown');
            await el.updateComplete;
            expect(getOptions(el)[1]!.getAttribute('aria-selected')).to.equal('true');
        });

        it('should move active index up with ArrowUp', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;

            pressKey(el, 'ArrowDown');
            pressKey(el, 'ArrowDown');
            await el.updateComplete;

            pressKey(el, 'ArrowUp');
            await el.updateComplete;
            expect(getOptions(el)[0]!.getAttribute('aria-selected')).to.equal('true');
        });

        it('should not go below the last option', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;

            for (let i = 0; i < 10; i++) pressKey(el, 'ArrowDown');
            await el.updateComplete;

            const opts = getOptions(el);
            expect(opts[opts.length - 1]!.getAttribute('aria-selected')).to.equal('true');
        });

        it('should select active option on Enter', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;

            pressKey(el, 'ArrowDown'); // Apple (index 0)
            await el.updateComplete;

            pressKey(el, 'Enter');
            await el.updateComplete;

            expect(el.value).to.equal('apple');
            expect(getInput(el).value).to.equal('Apple');
        });

        it('should close dropdown on Escape', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;
            expect(getInput(el).getAttribute('aria-expanded')).to.equal('true');

            pressKey(el, 'Escape');
            await el.updateComplete;
            expect(getInput(el).getAttribute('aria-expanded')).to.equal('false');
        });

        it('should close dropdown on Tab', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;

            pressKey(el, 'Tab');
            await el.updateComplete;
            expect(getInput(el).getAttribute('aria-expanded')).to.equal('false');
        });
    });

    /* ── flint-combobox-change event ────────────────────────────── */

    describe('flint-combobox-change event', () => {
        it('should dispatch event on input', async () => {
            const el = await make();
            const handler = vi.fn();
            el.addEventListener('flint-combobox-change', handler);

            focusInput(el);
            await el.updateComplete;
            typeText(el, 'ban');
            await el.updateComplete;

            expect(handler).toHaveBeenCalledOnce();
            expect(handler.mock.calls[0]![0].detail.value).to.equal('ban');
        });

        it('should dispatch event on option selection', async () => {
            const el = await make();
            const handler = vi.fn();
            el.addEventListener('flint-combobox-change', handler);

            focusInput(el);
            await el.updateComplete;
            getOptions(el)[0]!.click(); // Apple
            await el.updateComplete;

            expect(handler).toHaveBeenCalledOnce();
            expect(handler.mock.calls[0]![0].detail.value).to.equal('apple');
        });

        it('should dispatch event on keyboard selection', async () => {
            const el = await make();
            const handler = vi.fn();
            el.addEventListener('flint-combobox-change', handler);

            focusInput(el);
            await el.updateComplete;
            pressKey(el, 'ArrowDown');
            await el.updateComplete;
            pressKey(el, 'Enter');
            await el.updateComplete;

            expect(handler).toHaveBeenCalledOnce();
            expect(handler.mock.calls[0]![0].detail.value).to.equal('apple');
        });
    });

    /* ── outside click closes dropdown ──────────────────────────── */

    describe('outside click', () => {
        it('should close dropdown when clicking outside', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;
            expect(getInput(el).getAttribute('aria-expanded')).to.equal('true');

            document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            await el.updateComplete;
            expect(getInput(el).getAttribute('aria-expanded')).to.equal('false');
        });
    });

    /* ── form association ───────────────────────────────────────── */

    describe('form association', () => {
        it('should expose name property', async () => {
            const el = await make({ name: 'fruit' });
            expect(el.name).to.equal('fruit');
        });

        it('should expose value for form submission', async () => {
            const el = await make({ name: 'fruit', value: 'banana' });
            expect(el.value).to.equal('banana');
        });

        it('should reset to default value on formResetCallback', async () => {
            const el = await make({ value: 'cherry', defaultValue: 'apple' });
            expect(el.value).to.equal('cherry');

            el.formResetCallback();
            await el.updateComplete;
            expect(el.value).to.equal('apple');
            expect(getInput(el).value).to.equal('apple');
        });

        it('should reset to empty when no default value', async () => {
            const el = await make({ value: 'cherry' });
            el.formResetCallback();
            await el.updateComplete;
            expect(el.value).to.equal('');
        });
    });

    /* ── default-value attribute ────────────────────────────────── */

    describe('default-value attribute', () => {
        it('should set initial value from default-value when value is empty', async () => {
            const el = await fixture<FlintCombobox>(html`
                <flint-combobox
                    .options=${fruits}
                    default-value="banana"
                ></flint-combobox>
            `);
            await el.updateComplete;
            expect(el.value).to.equal('banana');
            expect(getInput(el).value).to.equal('banana');
        });

        it('should not override an explicitly set value', async () => {
            const el = await fixture<FlintCombobox>(html`
                <flint-combobox
                    .options=${fruits}
                    .value=${'cherry'}
                    default-value="banana"
                ></flint-combobox>
            `);
            await el.updateComplete;
            expect(el.value).to.equal('cherry');
        });
    });

    /* ── ARIA attributes ────────────────────────────────────────── */

    describe('ARIA attributes', () => {
        it('should have role="combobox" on input', async () => {
            const el = await make();
            expect(getInput(el).getAttribute('role')).to.equal('combobox');
        });

        it('should have aria-expanded="false" when closed', async () => {
            const el = await make();
            expect(getInput(el).getAttribute('aria-expanded')).to.equal('false');
        });

        it('should have aria-expanded="true" when open with options', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;
            expect(getInput(el).getAttribute('aria-expanded')).to.equal('true');
        });

        it('should have aria-autocomplete="list"', async () => {
            const el = await make();
            expect(getInput(el).getAttribute('aria-autocomplete')).to.equal('list');
        });

        it('should have aria-haspopup="listbox"', async () => {
            const el = await make();
            expect(getInput(el).getAttribute('aria-haspopup')).to.equal('listbox');
        });

        it('should have listbox with role="listbox"', async () => {
            const el = await make();
            expect(getListbox(el).getAttribute('role')).to.equal('listbox');
        });

        it('should have options with role="option"', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;
            const opts = getOptions(el);
            for (const opt of opts) {
                expect(opt.getAttribute('role')).to.equal('option');
            }
        });

        it('should set aria-activedescendant when an option is active', async () => {
            const el = await make();
            focusInput(el);
            await el.updateComplete;
            pressKey(el, 'ArrowDown');
            await el.updateComplete;
            expect(getInput(el).getAttribute('aria-activedescendant')).to.equal('combobox-opt-0');
        });

        it('should clear aria-activedescendant when no option is active', async () => {
            const el = await make();
            expect(getInput(el).getAttribute('aria-activedescendant')).to.equal('');
        });
    });

    /* ── accessibility (axe-core) ───────────────────────────────── */

    describe('accessibility', () => {
        it('should pass a11y checks (closed state)', async () => {
            const el = await make({ placeholder: 'Search...' });
            await expectAccessible(el);
        });

        it('should pass a11y checks (open state)', async () => {
            const el = await make({ placeholder: 'Search...' });
            focusInput(el);
            await el.updateComplete;
            await expectAccessible(el);
        });
    });
});
