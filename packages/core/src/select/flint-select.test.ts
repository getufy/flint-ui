import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-select';
import type { FlintSelect } from './flint-select';

const opts = [
  { label: 'Apple',  value: 'apple'  },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const optsWithDisabled = [
  { label: 'Apple',  value: 'apple'  },
  { label: 'Banana', value: 'banana', disabled: true },
  { label: 'Cherry', value: 'cherry' },
];

function getTrigger(el: FlintSelect) {
  return el.shadowRoot!.querySelector<HTMLElement>('.select-trigger')!;
}

function getDropdown(el: FlintSelect) {
  return el.shadowRoot!.querySelector<HTMLElement>('.dropdown')!;
}

function getOptions(el: FlintSelect) {
  return [...el.shadowRoot!.querySelectorAll<HTMLElement>('.option')];
}

async function open(el: FlintSelect) {
  getTrigger(el).click();
  await el.updateComplete;
}

function pressKey(el: FlintSelect, key: string) {
  getTrigger(el).dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true, cancelable: true }));
}

// ── Rendering ────────────────────────────────────────────────────────────────

describe('flint-select — rendering', () => {
  it('renders label when provided', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts} label="Fruit"></flint-select>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label).toBeTruthy();
    expect(label!.textContent).toBe('Fruit');
  });

  it('omits label element when label is empty', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    expect(el.shadowRoot!.querySelector('label')).toBeNull();
  });

  it('shows placeholder when value is empty', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts} placeholder="Pick one"></flint-select>`);
    const ph = el.shadowRoot!.querySelector('.placeholder');
    expect(ph).toBeTruthy();
    expect(ph!.textContent).toBe('Pick one');
  });

  it('hides placeholder and shows single-value after selection', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts} .value=${['apple']}></flint-select>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.placeholder')).toBeNull();
    expect(el.shadowRoot!.querySelector('.single-value')!.textContent).toBe('Apple');
  });

  it('renders chips in multiple mode', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select multiple .options=${opts} .value=${['apple', 'cherry']}></flint-select>
    `);
    await el.updateComplete;
    const chips = el.shadowRoot!.querySelectorAll('.chip');
    expect(chips.length).toBe(2);
  });

  it('renders all option elements', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    expect(getOptions(el).length).toBe(3);
  });

  it('renders "No options available" when options is empty', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${[]}></flint-select>`);
    expect(el.shadowRoot!.querySelector('.no-options')).toBeTruthy();
    expect(getOptions(el).length).toBe(0);
  });

  it('renders error message when error=true and errorMessage is set', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select ?error=${true} error-message="Required" .options=${opts}></flint-select>
    `);
    await el.updateComplete;
    const msg = el.shadowRoot!.querySelector('.error-message');
    expect(msg).toBeTruthy();
    expect(msg!.textContent?.trim()).toBe('Required');
  });

  it('renders error span with slot when error=true but errorMessage is empty', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select ?error=${true} .options=${opts}></flint-select>
    `);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.error-message')).toBeTruthy();
  });

  it('omits error message when error=false', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select error-message="Required" .options=${opts}></flint-select>
    `);
    expect(el.shadowRoot!.querySelector('.error-message')).toBeNull();
  });

  it('renders disabled option with option-disabled class', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${optsWithDisabled}></flint-select>`);
    const optEls = getOptions(el);
    expect(optEls[1].classList.contains('option-disabled')).toBe(true);
    expect(optEls[0].classList.contains('option-disabled')).toBe(false);
  });

  it('marks selected option with selected class', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts} .value=${['banana']}></flint-select>`);
    await el.updateComplete;
    const optEls = getOptions(el);
    expect(optEls[1].classList.contains('selected')).toBe(true);
    expect(optEls[0].classList.contains('selected')).toBe(false);
  });

  it('chip remove button has accessible aria-label', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select multiple .options=${opts} .value=${['apple']}></flint-select>
    `);
    await el.updateComplete;
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.chip-remove');
    expect(btn?.getAttribute('aria-label')).toBe('Remove Apple');
  });

  it('trigger has has-value class when value is set', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts} .value=${['apple']}></flint-select>`);
    await el.updateComplete;
    expect(getTrigger(el).classList.contains('has-value')).toBe(true);
  });

  it('trigger does not have has-value class when value is empty', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    expect(getTrigger(el).classList.contains('has-value')).toBe(false);
  });

  it('disabled option has aria-disabled attribute', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${optsWithDisabled}></flint-select>`);
    const optEls = getOptions(el);
    expect(optEls[1].getAttribute('aria-disabled')).toBe('true');
    expect(optEls[0].getAttribute('aria-disabled')).toBeNull();
  });
});

// ── Accessibility / ARIA ─────────────────────────────────────────────────────

describe('flint-select — accessibility', () => {
  it('trigger has role=combobox', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    expect(getTrigger(el).getAttribute('role')).toBe('combobox');
  });

  it('aria-expanded is false initially', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    expect(getTrigger(el).getAttribute('aria-expanded')).toBe('false');
  });

  it('aria-expanded is true when open', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    expect(getTrigger(el).getAttribute('aria-expanded')).toBe('true');
  });

  it('aria-haspopup is listbox', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    expect(getTrigger(el).getAttribute('aria-haspopup')).toBe('listbox');
  });

  it('aria-labelledby points to label id', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select label="My Label" .options=${opts}></flint-select>`);
    const labelId = el.shadowRoot!.querySelector('label')!.id;
    expect(getTrigger(el).getAttribute('aria-labelledby')).toBe(labelId);
  });

  it('aria-controls points to listbox id', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    const listboxId = el.shadowRoot!.querySelector('[role="listbox"]')!.id;
    expect(getTrigger(el).getAttribute('aria-controls')).toBe(listboxId);
  });

  it('listbox has role=listbox', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    expect(getDropdown(el).getAttribute('role')).toBe('listbox');
  });

  it('listbox has aria-multiselectable=false in single mode', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    expect(getDropdown(el).getAttribute('aria-multiselectable')).toBe('false');
  });

  it('listbox has aria-multiselectable=true in multiple mode', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select multiple .options=${opts}></flint-select>`);
    expect(getDropdown(el).getAttribute('aria-multiselectable')).toBe('true');
  });

  it('options have role=option and aria-selected', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts} .value=${['banana']}></flint-select>`);
    await el.updateComplete;
    const optEls = getOptions(el);
    expect(optEls[0].getAttribute('role')).toBe('option');
    expect(optEls[1].getAttribute('aria-selected')).toBe('true');
    expect(optEls[0].getAttribute('aria-selected')).toBe('false');
  });

  it('trigger has tabindex=0 when enabled', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    expect(getTrigger(el).getAttribute('tabindex')).toBe('0');
  });

  it('trigger has tabindex=-1 when disabled', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select ?disabled=${true} .options=${opts}></flint-select>`);
    expect(getTrigger(el).getAttribute('tabindex')).toBe('-1');
  });

  it('aria-required is set when required=true', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select ?required=${true} .options=${opts}></flint-select>`);
    expect(getTrigger(el).getAttribute('aria-required')).toBe('true');
  });

  it('chip-remove is a button element', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select multiple .options=${opts} .value=${['apple']}></flint-select>
    `);
    await el.updateComplete;
    const btn = el.shadowRoot!.querySelector('.chip-remove');
    expect(btn?.tagName.toLowerCase()).toBe('button');
    expect(btn?.getAttribute('type')).toBe('button');
  });

  it('aria-activedescendant is absent when no highlight', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    expect(getTrigger(el).hasAttribute('aria-activedescendant')).toBe(false);
  });
});

// ── Dropdown open/close ──────────────────────────────────────────────────────

describe('flint-select — dropdown open/close', () => {
  it('opens dropdown on trigger click', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    expect(getDropdown(el).classList.contains('open')).toBe(true);
  });

  it('closes dropdown on second trigger click', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    getTrigger(el).click();
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('disabled prevents opening', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select ?disabled=${true} .options=${opts}></flint-select>`);
    await open(el);
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('readonly prevents opening', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select ?readonly=${true} .options=${opts}></flint-select>`);
    await open(el);
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('closes on outside click', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);

    const outside = document.createElement('div');
    document.body.appendChild(outside);
    outside.click();
    await el.updateComplete;

    expect(getDropdown(el).classList.contains('open')).toBe(false);
    outside.remove();
  });

  it('falls back to contains() when composedPath is empty', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    const fakeEvent = {
      composedPath: () => [] as EventTarget[],
      target: document.body,
    } as unknown as MouseEvent;
    (el as unknown as { _handleOutsideClick: (e: MouseEvent) => void })._handleOutsideClick(fakeEvent);
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('stays open when composedPath includes the element', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    const fakeEvent = {
      composedPath: () => [el] as EventTarget[],
      target: el,
    } as unknown as MouseEvent;
    (el as unknown as { _handleOutsideClick: (e: MouseEvent) => void })._handleOutsideClick(fakeEvent);
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(true);
  });

  it('outside click when closed does nothing', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    // dropdown is already closed — click outside should not throw
    const outside = document.createElement('div');
    document.body.appendChild(outside);
    outside.click();
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(false);
    outside.remove();
  });

  it('single-select: closes dropdown after selecting an option', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    getOptions(el)[0].click();
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('multi-select: keeps dropdown open after selecting an option', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select multiple .options=${opts}></flint-select>`);
    await open(el);
    getOptions(el)[0].click();
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(true);
  });

  it('reopening dropdown pre-highlights first selected option', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts} .value=${['banana']}></flint-select>`);
    await open(el);
    // banana is index 1
    expect(getOptions(el)[1].classList.contains('highlighted')).toBe(true);
  });

  it('_opensUp is set when element is near bottom of viewport', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      bottom: window.innerHeight - 100,
      top: window.innerHeight - 140,
      left: 0, right: 400, width: 400, height: 40,
      toJSON: () => ({}),
    } as DOMRect);
    getTrigger(el).click();
    await el.updateComplete;
    expect((el as unknown as { _opensUp: boolean })._opensUp).toBe(true);
    vi.restoreAllMocks();
  });
});

// ── Selection logic ──────────────────────────────────────────────────────────

describe('flint-select — selection', () => {
  it('selects an option in single mode', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    getOptions(el)[1].click();
    await el.updateComplete;
    expect(el.value).toEqual(['banana']);
  });

  it('adds option in multi mode', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select multiple .options=${opts}></flint-select>`);
    await open(el);
    getOptions(el)[0].click();
    await el.updateComplete;
    getOptions(el)[2].click();
    await el.updateComplete;
    expect(el.value).toEqual(['apple', 'cherry']);
  });

  it('de-selects option in multi mode when clicked again', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select multiple .options=${opts} .value=${['apple', 'cherry']}></flint-select>
    `);
    await open(el);
    // Click apple (already selected) to deselect
    getOptions(el)[0].click();
    await el.updateComplete;
    expect(el.value).toEqual(['cherry']);
  });

  it('chip remove button removes that value', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select multiple .options=${opts} .value=${['apple', 'banana']}></flint-select>
    `);
    await el.updateComplete;
    const removeBtn = el.shadowRoot!.querySelector<HTMLElement>('.chip-remove')!;
    removeBtn.click();
    await el.updateComplete;
    expect(el.value).toEqual(['banana']);
  });

  it('clicking disabled option does nothing', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${optsWithDisabled}></flint-select>`);
    await open(el);
    // pointer-events: none in CSS, but test the handler directly
    el['_handleOptionClick'](optsWithDisabled[1], new MouseEvent('click'));
    await el.updateComplete;
    expect(el.value).toEqual([]);
  });

  it('defaultValue sets initial value in uncontrolled mode', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select default-value="banana" .options=${opts}></flint-select>
    `);
    await el.updateComplete;
    expect(el.value).toEqual(['banana']);
    expect(el.shadowRoot!.querySelector('.single-value')!.textContent).toBe('Banana');
  });

  it('defaultValue is ignored when value is already set', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select default-value="banana" .options=${opts} .value=${['apple']}></flint-select>
    `);
    await el.updateComplete;
    expect(el.value).toEqual(['apple']);
  });
});

// ── Change event ─────────────────────────────────────────────────────────────

describe('flint-select — change event', () => {
  it('fires change with string value in single mode', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    const spy = vi.fn();
    el.addEventListener('flint-select-change', spy);
    await open(el);
    getOptions(el)[0].click();
    await el.updateComplete;
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail).toEqual({ value: 'apple' });
  });

  it('fires change with array value in multi mode', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select multiple .options=${opts}></flint-select>`);
    const spy = vi.fn();
    el.addEventListener('flint-select-change', spy);
    await open(el);
    getOptions(el)[0].click();
    await el.updateComplete;
    expect(spy.mock.calls[0][0].detail).toEqual({ value: ['apple'] });
  });

  it('fires change with null when single-select is cleared', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    const spy = vi.fn();
    el.addEventListener('flint-select-change', spy);
    // Manually set value then clear it to test detail = null
    el.value = [];
    el['_dispatchChange']();
    expect(spy.mock.calls[0][0].detail).toEqual({ value: null });
  });

  it('chip remove fires change with updated array', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select multiple .options=${opts} .value=${['apple', 'banana']}></flint-select>
    `);
    await el.updateComplete;
    const spy = vi.fn();
    el.addEventListener('flint-select-change', spy);
    el.shadowRoot!.querySelector<HTMLElement>('.chip-remove')!.click();
    await el.updateComplete;
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail).toEqual({ value: ['banana'] });
  });
});

// ── Keyboard navigation ───────────────────────────────────────────────────────

describe('flint-select — keyboard navigation', () => {
  it('Enter opens dropdown when closed', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    pressKey(el, 'Enter');
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(true);
  });

  it('Space opens dropdown when closed', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    pressKey(el, ' ');
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(true);
  });

  it('Escape closes dropdown', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    pressKey(el, 'Escape');
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('Escape when closed does nothing', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    pressKey(el, 'Escape');
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('Tab closes dropdown', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    pressKey(el, 'Tab');
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('ArrowDown opens dropdown and highlights first option', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(true);
    expect(getOptions(el)[0].classList.contains('highlighted')).toBe(true);
  });

  it('ArrowDown moves highlight to next option', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    expect(getOptions(el)[1].classList.contains('highlighted')).toBe(true);
  });

  it('ArrowDown at last option does not move', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    // Move to last option (index 2)
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    // One more ArrowDown should not move past the last
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    expect(getOptions(el)[2].classList.contains('highlighted')).toBe(true);
  });

  it('ArrowUp moves highlight to previous option', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'ArrowUp');
    await el.updateComplete;
    expect(getOptions(el)[0].classList.contains('highlighted')).toBe(true);
  });

  it('ArrowUp when closed does nothing', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    pressKey(el, 'ArrowUp');
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('ArrowUp at first option does not move', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    pressKey(el, 'ArrowDown'); // move to first
    await el.updateComplete;
    pressKey(el, 'ArrowUp'); // already at first — should not crash or wrap
    await el.updateComplete;
    expect(getOptions(el)[0].classList.contains('highlighted')).toBe(true);
  });

  it('ArrowDown skips disabled options', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${optsWithDisabled}></flint-select>`);
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    // First enabled = index 0 (Apple)
    expect(getOptions(el)[0].classList.contains('highlighted')).toBe(true);
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    // Should skip index 1 (Banana disabled) → land on index 2 (Cherry)
    expect(getOptions(el)[2].classList.contains('highlighted')).toBe(true);
    expect(getOptions(el)[1].classList.contains('highlighted')).toBe(false);
  });

  it('Enter selects highlighted option', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'Enter');
    await el.updateComplete;
    expect(el.value).toEqual(['apple']);
  });

  it('Enter when open but no highlighted option does nothing', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    // No ArrowDown — highlightedIndex is -1
    pressKey(el, 'Enter');
    await el.updateComplete;
    expect(el.value).toEqual([]);
    // Dropdown should stay open
    expect(getDropdown(el).classList.contains('open')).toBe(true);
  });

  it('Space when open but no highlighted option does nothing', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    pressKey(el, ' ');
    await el.updateComplete;
    expect(el.value).toEqual([]);
  });

  it('Home jumps to first enabled option', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'Home');
    await el.updateComplete;
    expect(getOptions(el)[0].classList.contains('highlighted')).toBe(true);
  });

  it('End jumps to last enabled option', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    pressKey(el, 'End');
    await el.updateComplete;
    expect(getOptions(el)[2].classList.contains('highlighted')).toBe(true);
  });

  it('End skips disabled options at the end', async () => {
    const optsEndDisabled = [
      { label: 'Apple',  value: 'apple'  },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry', disabled: true },
    ];
    const el = await fixture<FlintSelect>(html`<flint-select .options=${optsEndDisabled}></flint-select>`);
    await open(el);
    pressKey(el, 'End');
    await el.updateComplete;
    expect(getOptions(el)[1].classList.contains('highlighted')).toBe(true);
  });

  it('Home/End do nothing when dropdown is closed', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    pressKey(el, 'Home');
    pressKey(el, 'End');
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('sets aria-activedescendant when option is highlighted', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    const activeId = getTrigger(el).getAttribute('aria-activedescendant');
    expect(activeId).toBeTruthy();
    const optEl = el.shadowRoot!.getElementById(activeId!);
    expect(optEl).toBeTruthy();
    expect(optEl!.classList.contains('highlighted')).toBe(true);
  });
});

// ── Props / attributes ───────────────────────────────────────────────────────

describe('flint-select — props', () => {
  it('disabled reflects as attribute', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select ?disabled=${true} .options=${opts}></flint-select>`);
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('readonly reflects as attribute', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select ?readonly=${true} .options=${opts}></flint-select>`);
    expect(el.hasAttribute('readonly')).toBe(true);
  });

  it('error reflects as attribute', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select ?error=${true} .options=${opts}></flint-select>`);
    expect(el.hasAttribute('error')).toBe(true);
  });

  it('size reflects as attribute', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select size="lg" .options=${opts}></flint-select>`);
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('trigger gets disabled class when disabled', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select ?disabled=${true} .options=${opts}></flint-select>`);
    expect(getTrigger(el).classList.contains('disabled')).toBe(true);
  });

  it('trigger gets readonly class when readonly', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select ?readonly=${true} .options=${opts}></flint-select>`);
    expect(getTrigger(el).classList.contains('readonly')).toBe(true);
  });
});

// ── Focus / blur ─────────────────────────────────────────────────────────────

describe('flint-select — focus / blur', () => {
  it('focused class is applied on focus', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    getTrigger(el).dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    await el.updateComplete;
    expect(getTrigger(el).classList.contains('focused')).toBe(true);
  });

  it('focused class is removed on blur', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    getTrigger(el).dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    await el.updateComplete;
    getTrigger(el).dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    await el.updateComplete;
    expect(getTrigger(el).classList.contains('focused')).toBe(false);
  });
});

// ── Mouseenter ───────────────────────────────────────────────────────────────

describe('flint-select — mouseenter', () => {
  it('mouseenter on enabled option highlights it', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    const optEl = getOptions(el)[1];
    optEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await el.updateComplete;
    expect(optEl.classList.contains('highlighted')).toBe(true);
  });

  it('mouseenter on disabled option does not highlight it', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${optsWithDisabled}></flint-select>`);
    await open(el);
    const disabledOpt = getOptions(el)[1];
    disabledOpt.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await el.updateComplete;
    expect(disabledOpt.classList.contains('highlighted')).toBe(false);
  });
});

// ── Form integration ─────────────────────────────────────────────────────────

describe('flint-select — form integration', () => {
  it('_updateFormValue: single — sets value string', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (el as unknown as { _internals: typeof mockInternals })._internals = mockInternals;
    el.value = ['banana'];
    el['_updateFormValue']();
    expect(mockInternals.setFormValue).toHaveBeenCalledWith('banana');
    expect(mockInternals.setValidity).toHaveBeenCalledWith({});
  });

  it('_updateFormValue: single — empty value sets empty string', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (el as unknown as { _internals: typeof mockInternals })._internals = mockInternals;
    el.value = [];
    el['_updateFormValue']();
    expect(mockInternals.setFormValue).toHaveBeenCalledWith('');
  });

  it('_updateFormValue: multiple — sets FormData', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select multiple name="fruit" .options=${opts}></flint-select>`);
    const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (el as unknown as { _internals: typeof mockInternals })._internals = mockInternals;
    el.value = ['apple', 'cherry'];
    el['_updateFormValue']();
    const fd: FormData = mockInternals.setFormValue.mock.calls[0][0];
    expect(fd instanceof FormData).toBe(true);
    expect(fd.getAll('fruit')).toEqual(['apple', 'cherry']);
  });

  it('_updateFormValue: multiple — uses "select" as key when name is empty', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select multiple .options=${opts}></flint-select>`);
    const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (el as unknown as { _internals: typeof mockInternals })._internals = mockInternals;
    el.value = ['apple'];
    el['_updateFormValue']();
    const fd: FormData = mockInternals.setFormValue.mock.calls[0][0];
    expect(fd.getAll('select')).toEqual(['apple']);
  });

  it('_updateFormValue: required + empty value sets valueMissing validity', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select ?required=${true} .options=${opts}></flint-select>`);
    const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (el as unknown as { _internals: typeof mockInternals })._internals = mockInternals;
    el.value = [];
    el['_updateFormValue']();
    expect(mockInternals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please select an option'
    );
  });

  it('_updateFormValue: required + value present clears validity', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select ?required=${true} .options=${opts}></flint-select>`);
    const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (el as unknown as { _internals: typeof mockInternals })._internals = mockInternals;
    el.value = ['apple'];
    el['_updateFormValue']();
    expect(mockInternals.setValidity).toHaveBeenCalledWith({});
  });

  it('_updateFormValue: no-op when _internals is undefined', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    (el as unknown as { _internals: undefined })._internals = undefined;
    // Should not throw
    expect(() => el['_updateFormValue']()).not.toThrow();
  });

  it('formResetCallback resets to defaultValue', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select default-value="banana" .options=${opts} .value=${['cherry']}></flint-select>
    `);
    await el.updateComplete;
    el.formResetCallback();
    await el.updateComplete;
    expect(el.value).toEqual(['banana']);
  });

  it('formResetCallback resets to empty when no defaultValue', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select .options=${opts} .value=${['cherry']}></flint-select>
    `);
    await el.updateComplete;
    el.formResetCallback();
    await el.updateComplete;
    expect(el.value).toEqual([]);
  });
});

// ── scrollIntoView ───────────────────────────────────────────────────────────

describe('flint-select — scrollIntoView', () => {
  it('calls scrollIntoView when available on option element', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    // Highlight index 0 first (no scrollIntoView triggered on open → _highlightedIndex starts at -1)
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));

    // Attach spy on option 1 — the next ArrowDown will call _scrollOptionIntoView(1)
    const opt1 = getOptions(el)[1];
    const scrollSpy = vi.fn();
    opt1.scrollIntoView = scrollSpy;

    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));

    expect(scrollSpy).toHaveBeenCalledWith({ block: 'nearest' });
  });

  it('skips scrollIntoView when not a function', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    await open(el);
    // Remove scrollIntoView from options to hit the guard branch
    getOptions(el).forEach(o => {
      (o as unknown as { scrollIntoView: unknown }).scrollIntoView = undefined;
    });
    // Should not throw
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    expect(getOptions(el)[0].classList.contains('highlighted')).toBe(true);
  });
});

// ── Lifecycle ────────────────────────────────────────────────────────────────

describe('flint-select — lifecycle', () => {
  it('removes document click listener on disconnect', async () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    el.remove();
    expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function));
    removeSpy.mockRestore();
  });

  it('adds document click listener on connect', async () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function));
    addSpy.mockRestore();
  });
});

// ── Slot ────────────────────────────────────────────────────────────────────

describe('flint-select — slots', () => {
  it('renders slotted icon content', async () => {
    const el = await fixture<FlintSelect>(html`
      <flint-select .options=${opts}>
        <span slot="icon" id="test-icon">★</span>
      </flint-select>
    `);
    const slotted = el.querySelector('#test-icon');
    expect(slotted).toBeTruthy();
    expect(slotted!.textContent).toBe('★');
  });

  it('error-message slot is present in shadow DOM when error=true', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select ?error=${true} .options=${opts}></flint-select>`);
    await el.updateComplete;
    const slot = el.shadowRoot!.querySelector('slot[name="error-message"]');
    expect(slot).toBeTruthy();
  });

  it('error-message slot is absent when error=false', async () => {
    const el = await fixture<FlintSelect>(html`<flint-select .options=${opts}></flint-select>`);
    const slot = el.shadowRoot!.querySelector('slot[name="error-message"]');
    expect(slot).toBeNull();
  });
});
