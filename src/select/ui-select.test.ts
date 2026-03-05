import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-select';
import type { UiSelect } from './ui-select';

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

function getTrigger(el: UiSelect) {
  return el.shadowRoot!.querySelector<HTMLElement>('.select-trigger')!;
}

function getDropdown(el: UiSelect) {
  return el.shadowRoot!.querySelector<HTMLElement>('.dropdown')!;
}

function getOptions(el: UiSelect) {
  return [...el.shadowRoot!.querySelectorAll<HTMLElement>('.option')];
}

async function open(el: UiSelect) {
  getTrigger(el).click();
  await el.updateComplete;
}

function pressKey(el: UiSelect, key: string) {
  getTrigger(el).dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true, cancelable: true }));
}

// ── Rendering ────────────────────────────────────────────────────────────────

describe('ui-select — rendering', () => {
  it('renders label when provided', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts} label="Fruit"></ui-select>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label).toBeTruthy();
    expect(label!.textContent).toBe('Fruit');
  });

  it('omits label element when label is empty', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    expect(el.shadowRoot!.querySelector('label')).toBeNull();
  });

  it('shows placeholder when value is empty', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts} placeholder="Pick one"></ui-select>`);
    const ph = el.shadowRoot!.querySelector('.placeholder');
    expect(ph).toBeTruthy();
    expect(ph!.textContent).toBe('Pick one');
  });

  it('hides placeholder and shows single-value after selection', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts} .value=${['apple']}></ui-select>`);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.placeholder')).toBeNull();
    expect(el.shadowRoot!.querySelector('.single-value')!.textContent).toBe('Apple');
  });

  it('renders chips in multiple mode', async () => {
    const el = await fixture<UiSelect>(html`
      <ui-select multiple .options=${opts} .value=${['apple', 'cherry']}></ui-select>
    `);
    await el.updateComplete;
    const chips = el.shadowRoot!.querySelectorAll('.chip');
    expect(chips.length).toBe(2);
  });

  it('renders all option elements', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    expect(getOptions(el).length).toBe(3);
  });

  it('renders "No options available" when options is empty', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${[]}></ui-select>`);
    expect(el.shadowRoot!.querySelector('.no-options')).toBeTruthy();
    expect(getOptions(el).length).toBe(0);
  });

  it('renders error message when error=true and errorMessage is set', async () => {
    const el = await fixture<UiSelect>(html`
      <ui-select ?error=${true} error-message="Required" .options=${opts}></ui-select>
    `);
    await el.updateComplete;
    const msg = el.shadowRoot!.querySelector('.error-message');
    expect(msg).toBeTruthy();
    expect(msg!.textContent?.trim()).toBe('Required');
  });

  it('omits error message when error=false', async () => {
    const el = await fixture<UiSelect>(html`
      <ui-select error-message="Required" .options=${opts}></ui-select>
    `);
    expect(el.shadowRoot!.querySelector('.error-message')).toBeNull();
  });

  it('renders disabled option with option-disabled class', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${optsWithDisabled}></ui-select>`);
    const optEls = getOptions(el);
    expect(optEls[1].classList.contains('option-disabled')).toBe(true);
    expect(optEls[0].classList.contains('option-disabled')).toBe(false);
  });

  it('marks selected option with selected class', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts} .value=${['banana']}></ui-select>`);
    await el.updateComplete;
    const optEls = getOptions(el);
    expect(optEls[1].classList.contains('selected')).toBe(true);
    expect(optEls[0].classList.contains('selected')).toBe(false);
  });

  it('chip remove button has accessible aria-label', async () => {
    const el = await fixture<UiSelect>(html`
      <ui-select multiple .options=${opts} .value=${['apple']}></ui-select>
    `);
    await el.updateComplete;
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.chip-remove');
    expect(btn?.getAttribute('aria-label')).toBe('Remove Apple');
  });
});

// ── Accessibility / ARIA ─────────────────────────────────────────────────────

describe('ui-select — accessibility', () => {
  it('trigger has role=combobox', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    expect(getTrigger(el).getAttribute('role')).toBe('combobox');
  });

  it('aria-expanded is false initially', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    expect(getTrigger(el).getAttribute('aria-expanded')).toBe('false');
  });

  it('aria-expanded is true when open', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    await open(el);
    expect(getTrigger(el).getAttribute('aria-expanded')).toBe('true');
  });

  it('aria-haspopup is listbox', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    expect(getTrigger(el).getAttribute('aria-haspopup')).toBe('listbox');
  });

  it('aria-labelledby points to label id', async () => {
    const el = await fixture<UiSelect>(html`<ui-select label="My Label" .options=${opts}></ui-select>`);
    const labelId = el.shadowRoot!.querySelector('label')!.id;
    expect(getTrigger(el).getAttribute('aria-labelledby')).toBe(labelId);
  });

  it('aria-controls points to listbox id', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    const listboxId = el.shadowRoot!.querySelector('[role="listbox"]')!.id;
    expect(getTrigger(el).getAttribute('aria-controls')).toBe(listboxId);
  });

  it('listbox has role=listbox', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    expect(getDropdown(el).getAttribute('role')).toBe('listbox');
  });

  it('options have role=option and aria-selected', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts} .value=${['banana']}></ui-select>`);
    await el.updateComplete;
    const optEls = getOptions(el);
    expect(optEls[0].getAttribute('role')).toBe('option');
    expect(optEls[1].getAttribute('aria-selected')).toBe('true');
    expect(optEls[0].getAttribute('aria-selected')).toBe('false');
  });

  it('trigger has tabindex=0 when enabled', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    expect(getTrigger(el).getAttribute('tabindex')).toBe('0');
  });

  it('trigger has tabindex=-1 when disabled', async () => {
    const el = await fixture<UiSelect>(html`<ui-select ?disabled=${true} .options=${opts}></ui-select>`);
    expect(getTrigger(el).getAttribute('tabindex')).toBe('-1');
  });

  it('aria-required is set when required=true', async () => {
    const el = await fixture<UiSelect>(html`<ui-select ?required=${true} .options=${opts}></ui-select>`);
    expect(getTrigger(el).getAttribute('aria-required')).toBe('true');
  });

  it('chip-remove is a button element', async () => {
    const el = await fixture<UiSelect>(html`
      <ui-select multiple .options=${opts} .value=${['apple']}></ui-select>
    `);
    await el.updateComplete;
    const btn = el.shadowRoot!.querySelector('.chip-remove');
    expect(btn?.tagName.toLowerCase()).toBe('button');
    expect(btn?.getAttribute('type')).toBe('button');
  });
});

// ── Dropdown open/close ──────────────────────────────────────────────────────

describe('ui-select — dropdown open/close', () => {
  it('opens dropdown on trigger click', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    await open(el);
    expect(getDropdown(el).classList.contains('open')).toBe(true);
  });

  it('closes dropdown on second trigger click', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    await open(el);
    getTrigger(el).click();
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('disabled prevents opening', async () => {
    const el = await fixture<UiSelect>(html`<ui-select ?disabled=${true} .options=${opts}></ui-select>`);
    await open(el);
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('readonly prevents opening', async () => {
    const el = await fixture<UiSelect>(html`<ui-select ?readonly=${true} .options=${opts}></ui-select>`);
    await open(el);
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('closes on outside click', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    await open(el);

    const outside = document.createElement('div');
    document.body.appendChild(outside);
    outside.click();
    await el.updateComplete;

    expect(getDropdown(el).classList.contains('open')).toBe(false);
    outside.remove();
  });

  it('single-select: closes dropdown after selecting an option', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    await open(el);
    getOptions(el)[0].click();
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('multi-select: keeps dropdown open after selecting an option', async () => {
    const el = await fixture<UiSelect>(html`<ui-select multiple .options=${opts}></ui-select>`);
    await open(el);
    getOptions(el)[0].click();
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(true);
  });
});

// ── Selection logic ──────────────────────────────────────────────────────────

describe('ui-select — selection', () => {
  it('selects an option in single mode', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    await open(el);
    getOptions(el)[1].click();
    await el.updateComplete;
    expect(el.value).toEqual(['banana']);
  });

  it('adds option in multi mode', async () => {
    const el = await fixture<UiSelect>(html`<ui-select multiple .options=${opts}></ui-select>`);
    await open(el);
    getOptions(el)[0].click();
    await el.updateComplete;
    getOptions(el)[2].click();
    await el.updateComplete;
    expect(el.value).toEqual(['apple', 'cherry']);
  });

  it('de-selects option in multi mode when clicked again', async () => {
    const el = await fixture<UiSelect>(html`
      <ui-select multiple .options=${opts} .value=${['apple', 'cherry']}></ui-select>
    `);
    await open(el);
    // Click apple (already selected) to deselect
    getOptions(el)[0].click();
    await el.updateComplete;
    expect(el.value).toEqual(['cherry']);
  });

  it('chip remove button removes that value', async () => {
    const el = await fixture<UiSelect>(html`
      <ui-select multiple .options=${opts} .value=${['apple', 'banana']}></ui-select>
    `);
    await el.updateComplete;
    const removeBtn = el.shadowRoot!.querySelector<HTMLElement>('.chip-remove')!;
    removeBtn.click();
    await el.updateComplete;
    expect(el.value).toEqual(['banana']);
  });

  it('clicking disabled option does nothing', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${optsWithDisabled}></ui-select>`);
    await open(el);
    // pointer-events: none in CSS, but test the handler directly
    el['_handleOptionClick'](optsWithDisabled[1], new MouseEvent('click'));
    await el.updateComplete;
    expect(el.value).toEqual([]);
  });

  it('defaultValue sets initial value in uncontrolled mode', async () => {
    const el = await fixture<UiSelect>(html`
      <ui-select default-value="banana" .options=${opts}></ui-select>
    `);
    await el.updateComplete;
    expect(el.value).toEqual(['banana']);
    expect(el.shadowRoot!.querySelector('.single-value')!.textContent).toBe('Banana');
  });

  it('defaultValue is ignored when value is already set', async () => {
    const el = await fixture<UiSelect>(html`
      <ui-select default-value="banana" .options=${opts} .value=${['apple']}></ui-select>
    `);
    await el.updateComplete;
    expect(el.value).toEqual(['apple']);
  });
});

// ── Change event ─────────────────────────────────────────────────────────────

describe('ui-select — change event', () => {
  it('fires change with string value in single mode', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    const spy = vi.fn();
    el.addEventListener('change', spy);
    await open(el);
    getOptions(el)[0].click();
    await el.updateComplete;
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail).toEqual({ value: 'apple' });
  });

  it('fires change with array value in multi mode', async () => {
    const el = await fixture<UiSelect>(html`<ui-select multiple .options=${opts}></ui-select>`);
    const spy = vi.fn();
    el.addEventListener('change', spy);
    await open(el);
    getOptions(el)[0].click();
    await el.updateComplete;
    expect(spy.mock.calls[0][0].detail).toEqual({ value: ['apple'] });
  });

  it('fires change with null when single-select is cleared', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    const spy = vi.fn();
    el.addEventListener('change', spy);
    // Manually set value then clear it to test detail = null
    el.value = [];
    el['_dispatchChange']();
    expect(spy.mock.calls[0][0].detail).toEqual({ value: null });
  });

  it('chip remove fires change with updated array', async () => {
    const el = await fixture<UiSelect>(html`
      <ui-select multiple .options=${opts} .value=${['apple', 'banana']}></ui-select>
    `);
    await el.updateComplete;
    const spy = vi.fn();
    el.addEventListener('change', spy);
    el.shadowRoot!.querySelector<HTMLElement>('.chip-remove')!.click();
    await el.updateComplete;
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail).toEqual({ value: ['banana'] });
  });
});

// ── Keyboard navigation ───────────────────────────────────────────────────────

describe('ui-select — keyboard navigation', () => {
  it('Enter opens dropdown when closed', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    pressKey(el, 'Enter');
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(true);
  });

  it('Space opens dropdown when closed', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    pressKey(el, ' ');
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(true);
  });

  it('Escape closes dropdown', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    await open(el);
    pressKey(el, 'Escape');
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('Tab closes dropdown', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    await open(el);
    pressKey(el, 'Tab');
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(false);
  });

  it('ArrowDown opens dropdown and highlights first option', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    expect(getDropdown(el).classList.contains('open')).toBe(true);
    expect(getOptions(el)[0].classList.contains('highlighted')).toBe(true);
  });

  it('ArrowDown moves highlight to next option', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    await open(el);
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    expect(getOptions(el)[1].classList.contains('highlighted')).toBe(true);
  });

  it('ArrowUp moves highlight to previous option', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    await open(el);
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'ArrowUp');
    await el.updateComplete;
    expect(getOptions(el)[0].classList.contains('highlighted')).toBe(true);
  });

  it('ArrowDown skips disabled options', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${optsWithDisabled}></ui-select>`);
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
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    await open(el);
    pressKey(el, 'ArrowDown');
    await el.updateComplete;
    pressKey(el, 'Enter');
    await el.updateComplete;
    expect(el.value).toEqual(['apple']);
  });

  it('sets aria-activedescendant when option is highlighted', async () => {
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
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

describe('ui-select — props', () => {
  it('disabled reflects as attribute', async () => {
    const el = await fixture<UiSelect>(html`<ui-select ?disabled=${true} .options=${opts}></ui-select>`);
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('readonly reflects as attribute', async () => {
    const el = await fixture<UiSelect>(html`<ui-select ?readonly=${true} .options=${opts}></ui-select>`);
    expect(el.hasAttribute('readonly')).toBe(true);
  });

  it('error reflects as attribute', async () => {
    const el = await fixture<UiSelect>(html`<ui-select ?error=${true} .options=${opts}></ui-select>`);
    expect(el.hasAttribute('error')).toBe(true);
  });

  it('size reflects as attribute', async () => {
    const el = await fixture<UiSelect>(html`<ui-select size="lg" .options=${opts}></ui-select>`);
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('trigger gets disabled class when disabled', async () => {
    const el = await fixture<UiSelect>(html`<ui-select ?disabled=${true} .options=${opts}></ui-select>`);
    expect(getTrigger(el).classList.contains('disabled')).toBe(true);
  });

  it('trigger gets readonly class when readonly', async () => {
    const el = await fixture<UiSelect>(html`<ui-select ?readonly=${true} .options=${opts}></ui-select>`);
    expect(getTrigger(el).classList.contains('readonly')).toBe(true);
  });
});

// ── Lifecycle ────────────────────────────────────────────────────────────────

describe('ui-select — lifecycle', () => {
  it('removes document click listener on disconnect', async () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const el = await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    el.remove();
    expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function));
    removeSpy.mockRestore();
  });

  it('adds document click listener on connect', async () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    await fixture<UiSelect>(html`<ui-select .options=${opts}></ui-select>`);
    expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function));
    addSpy.mockRestore();
  });
});

// ── Slot ────────────────────────────────────────────────────────────────────

describe('ui-select — icon slot', () => {
  it('renders slotted icon content', async () => {
    const el = await fixture<UiSelect>(html`
      <ui-select .options=${opts}>
        <span slot="icon" id="test-icon">★</span>
      </ui-select>
    `);
    const slotted = el.querySelector('#test-icon');
    expect(slotted).toBeTruthy();
    expect(slotted!.textContent).toBe('★');
  });
});
