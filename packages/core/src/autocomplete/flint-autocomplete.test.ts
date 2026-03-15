import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-autocomplete';
import type { FlintAutocomplete } from './flint-autocomplete';
import { expectAccessible } from '../test-utils/axe';

const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
];

describe('flint-autocomplete', () => {
    // ─── Rendering & Structure ────────────────────────────────────────────────

    it('renders input', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input');
        expect(input).not.toBeNull();
    });

    it('has combobox role and aria attributes', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.getAttribute('role')).toBe('combobox');
        expect(input.getAttribute('aria-autocomplete')).toBe('list');
        expect(input.getAttribute('aria-haspopup')).toBe('listbox');
        expect(input.getAttribute('aria-expanded')).toBe('false');
    });

    it('renders placeholder on input', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete placeholder="Search..."></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.getAttribute('placeholder')).toBe('Search...');
    });

    it('renders listbox role on dropdown', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const dropdown = el.shadowRoot!.querySelector('[role="listbox"]');
        expect(dropdown).not.toBeNull();
    });

    // ─── Filtering & Display ─────────────────────────────────────────────────

    it('filters options on input (case-insensitive)', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.value = 'app';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;
        const renderedOptions = el.shadowRoot!.querySelectorAll('.option');
        expect(renderedOptions.length).toBe(1);
        expect(renderedOptions[0].textContent).toContain('Apple');
    });

    it('shows all options on focus', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;
        const renderedOptions = el.shadowRoot!.querySelectorAll('.option');
        expect(renderedOptions.length).toBe(2);
    });

    it('shows no-options message when no matches found', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.value = 'zzz';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.no-options')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.no-options')!.textContent).toContain('No options');
    });

    // ─── Dropdown Open / Close ────────────────────────────────────────────────

    it('opens dropdown and updates aria-expanded on focus', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();
        expect(input.getAttribute('aria-expanded')).toBe('true');
    });

    it('closes dropdown on outside click', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();

        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
    });

    it('click inside element does not close dropdown', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();

        // e.target = el → this.contains(el) = true → handler does nothing
        el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();
    });

    it('outside click with freeSolo=true does not reset inputValue', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options} ?freeSolo=${true}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.value = 'my custom value';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;

        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await el.updateComplete;
        expect(input.value).toBe('my custom value');
    });

    it('outside click resets inputValue to empty when no option is selected', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        input.value = 'xyz';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;

        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await el.updateComplete;
        expect(input.value).toBe('');
    });

    it('outside click resets inputValue to selected label when option is selected', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options} value="apple"></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        input.value = 'xyz';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;

        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await el.updateComplete;
        expect(input.value).toBe('Apple');
    });

    // ─── disconnectedCallback ─────────────────────────────────────────────────

    it('removes outside click listener on disconnect', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();

        // disconnectedCallback removes the listener
        el.remove();

        // Clicking outside no longer triggers _handleOutsideClick → _isOpen stays true
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        // Element is detached; DOM reflects last render (dropdown still open)
        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();
    });

    // ─── Selection ───────────────────────────────────────────────────────────

    it('selects option on click', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        const firstOption = el.shadowRoot!.querySelector('.option') as HTMLElement;
        firstOption.click();
        await el.updateComplete;

        expect(input.value).toBe('Apple');
        expect(el.value).toBe('apple');
        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
    });

    it('dispatches change event with value and label on selection', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const handler = vi.fn();
        el.addEventListener('flint-autocomplete-change', handler);

        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        (el.shadowRoot!.querySelector('.option') as HTMLElement).click();
        await el.updateComplete;

        expect(handler).toHaveBeenCalledOnce();
        expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({ value: 'apple', label: 'Apple' });
    });

    it('mousedown on option prevents default to avoid focus loss', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        const option = el.shadowRoot!.querySelector('.option') as HTMLElement;
        const mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
        option.dispatchEvent(mousedownEvent);
        expect(mousedownEvent.defaultPrevented).toBe(true);
    });

    // ─── Keyboard Navigation ─────────────────────────────────────────────────

    it('opens dropdown with ArrowDown when closed, highlights first option', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();
        const optionEls = el.shadowRoot!.querySelectorAll('.option');
        expect(optionEls[0].classList.contains('active')).toBe(true);
    });

    it('opens dropdown with ArrowUp when closed, highlights last option', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();
        const optionEls = el.shadowRoot!.querySelectorAll('.option');
        expect(optionEls[optionEls.length - 1].classList.contains('active')).toBe(true);
    });

    it('non-arrow key when closed does nothing', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
    });

    it('navigates options with ArrowDown', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        const optionEls = el.shadowRoot!.querySelectorAll('.option');
        expect(optionEls[0].classList.contains('active')).toBe(true);
        expect(optionEls[0].getAttribute('aria-selected')).toBe('true');
    });

    it('ArrowDown at last option does not go out of bounds', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        // 3 presses for 2 options — clamps at index 1
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        const optionEls = el.shadowRoot!.querySelectorAll('.option');
        expect(optionEls[1].classList.contains('active')).toBe(true);
        expect(optionEls[0].classList.contains('active')).toBe(false);
    });

    it('navigates options with ArrowUp', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await el.updateComplete;

        const optionEls = el.shadowRoot!.querySelectorAll('.option');
        expect(optionEls[0].classList.contains('active')).toBe(true);
    });

    it('ArrowUp from first option deactivates selection (activeIndex → -1, triggers _scrollActiveIntoView early return)', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        // ArrowUp from index 0 → index -1 → _scrollActiveIntoView early return
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await el.updateComplete;

        const optionEls = el.shadowRoot!.querySelectorAll('.option');
        expect(Array.from(optionEls).every(opt => !opt.classList.contains('active'))).toBe(true);
    });

    it('calls scrollIntoView on active option when available', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        // Attach a scrollIntoView mock to all option elements
        const scrollMock = vi.fn();
        const attachMock = async () => {
            await el.updateComplete;
            el.shadowRoot!.querySelectorAll('.option').forEach(opt => {
                (opt as HTMLElement).scrollIntoView = scrollMock;
            });
        };
        await attachMock();

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        // Wait for updateComplete + the inner .then() callback
        await el.updateComplete;
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(scrollMock).toHaveBeenCalledWith({ block: 'nearest' });
    });

    it('aria-activedescendant reflects active option index', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        expect(input.getAttribute('aria-activedescendant')).toBe('');

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(input.getAttribute('aria-activedescendant')).toBe('option-0');
    });

    it('selects highlighted option with Enter', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;

        expect(el.value).toBe('apple');
        expect(input.value).toBe('Apple');
        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
    });

    it('Enter with no active option (activeIndex=-1) does not select or close', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        // activeIndex = -1 → Enter should be a no-op
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;

        expect(el.value).toBe('');
        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();
    });

    it('closes dropdown on Escape and resets input to selected value', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options} value="apple"></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        input.value = 'xyz';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
        expect(input.value).toBe('Apple');
    });

    it('Escape with no selected value resets inputValue to empty', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        input.value = 'xyz';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await el.updateComplete;

        expect(input.value).toBe('');
        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
    });

    it('Escape in freeSolo mode does not reset inputValue', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options} ?freeSolo=${true}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.value = 'my typed value';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await el.updateComplete;

        expect(input.value).toBe('my typed value');
        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
    });

    it('Tab closes the dropdown', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
    });

    it('unhandled key when open does not close dropdown (default case)', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();
        expect(el.value).toBe('');
    });

    // ─── Free Solo ───────────────────────────────────────────────────────────

    it('freeSolo: typing updates value and dispatches change event', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete freeSolo></flint-autocomplete>`);
        const handler = vi.fn();
        el.addEventListener('flint-autocomplete-change', handler);

        const input = el.shadowRoot!.querySelector('input')!;
        input.value = 'Custom Value';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;

        expect(el.value).toBe('Custom Value');
        expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({ value: 'Custom Value', label: 'Custom Value' });
    });

    it('freeSolo with no matching options keeps dropdown closed', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options} ?freeSolo=${true}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.value = 'zzz';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;

        // freeSolo=true + filteredOptions.length=0 → dropdownOpen=false
        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
    });

    it('freeSolo with matching options shows dropdown', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options} ?freeSolo=${true}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.value = 'app';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();
    });

    // ─── Disabled ────────────────────────────────────────────────────────────

    it('disables the input when disabled prop is set', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete disabled></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.disabled).toBe(true);
    });

    it('does not open dropdown on focus when disabled', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options} disabled></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
    });

    // ─── External Value Changes / willUpdate ─────────────────────────────────

    it('syncs _inputValue when value prop changes to matching option', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        el.value = 'banana';
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.value).toBe('Banana');
    });

    it('syncs _inputValue to value when freeSolo=true and no matching option', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options} ?freeSolo=${true}></flint-autocomplete>`);
        el.value = 'custom text';
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.value).toBe('custom text');
    });

    it('clears _inputValue when value set to unknown value in non-freeSolo mode', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        el.value = 'unknown-value';
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.value).toBe('');
    });

    it('resets filtered options when options prop changes', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.option').length).toBe(2);

        // Replace options wholesale — filter reruns with empty query → shows all new options
        el.options = [{ label: 'Cherry', value: 'cherry' }];
        await el.updateComplete;

        const opts = el.shadowRoot!.querySelectorAll('.option');
        expect(opts.length).toBe(1);
        expect(opts[0].textContent).toContain('Cherry');
    });

    it('options change while dropdown open resets activeIndex to -1', async () => {
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options}></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        // Change options — activeIndex should reset
        el.options = [{ label: 'Cherry', value: 'cherry' }, { label: 'Date', value: 'date' }];
        await el.updateComplete;

        const opts = el.shadowRoot!.querySelectorAll('.option');
        expect(Array.from(opts).every(o => !o.classList.contains('active'))).toBe(true);
    });

    it('initializes _inputValue from value attribute via connectedCallback', async () => {
        // connectedCallback sets _inputValue = this.value (the raw value string),
        // so the input shows the raw value on first render before any external update
        const el = await fixture<FlintAutocomplete>(html`<flint-autocomplete .options=${options} value="apple"></flint-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        // connectedCallback: _inputValue = 'apple'; willUpdate skips sync because _inputValue also changed
        expect(input.value).toBe('apple');
    });
});

// ── Accessibility ─────────────────────────────────────────────────────────

describe('flint-autocomplete — accessibility', () => {
    it('should pass automated a11y checks', async () => {
        const el = await fixture(html`<flint-autocomplete label="Search" .options=${[{label:'A',value:'a'}]}></flint-autocomplete>`);
        await expectAccessible(el, { rules: { 'aria-input-field-name': { enabled: false }, 'label': { enabled: false } } });
    }, 15000);
});
