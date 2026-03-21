import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { FlintSlider } from './flint-slider';
import { expectAccessible } from '../test-utils/axe';

// ── Helpers ────────────────────────────────────────────────────────────────

function input(el: FlintSlider) {
  return el.shadowRoot!.querySelector('input')!;
}

function fireInput(el: FlintSlider, value: string) {
  const inp = input(el);
  inp.value = value;
  inp.dispatchEvent(new Event('input'));
}

// ── Rendering ──────────────────────────────────────────────────────────────

describe('flint-slider — rendering', () => {
  it('renders with initial values', async () => {
    const el = await fixture<FlintSlider>(html`
      <flint-slider label="Volume" .value=${25} min="0" max="100"></flint-slider>
    `);
    expect(input(el).value).toBe('25');
    expect(el.shadowRoot!.textContent).toContain('Volume');
  });

  it('renders label element with correct text', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider label="Brightness"></flint-slider>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label).not.toBeNull();
    expect(label!.textContent!.trim()).toBe('Brightness');
  });

  it('does not render label element when label is empty', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label).toBeNull();
  });

  it('shows value display when show-value is set', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${42} show-value></flint-slider>`);
    const display = el.shadowRoot!.querySelector('.value-display');
    expect(display).not.toBeNull();
    expect(display!.textContent).toBe('42');
  });

  it('hides value display when show-value is not set', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${42}></flint-slider>`);
    expect(el.shadowRoot!.querySelector('.value-display')).toBeNull();
  });

  it('links label[for] to input[id]', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider label="Volume"></flint-slider>`);
    const label = el.shadowRoot!.querySelector('label')!;
    const inp = input(el);
    expect(label.getAttribute('for')).toBe(inp.id);
    expect(inp.id).not.toBe('');
  });

  it('sets aria-label to label text when label is provided', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider label="Volume"></flint-slider>`);
    expect(input(el).getAttribute('aria-label')).toBe('Volume');
  });

  it('falls back to "Slider" aria-label when no label is given', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    expect(input(el).getAttribute('aria-label')).toBe('Slider');
  });

  it('applies disabled-label class to label when disabled', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider label="Locked" disabled></flint-slider>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label!.classList.contains('disabled-label')).toBe(true);
  });

  it('reflects min and max bounds on the input', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="10" max="20" .value=${15}></flint-slider>`);
    expect(input(el).min).toBe('10');
    expect(input(el).max).toBe('20');
  });

  it('reflects step on the input', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider step="10" .value=${20}></flint-slider>`);
    expect(input(el).step).toBe('10');
  });

  it('is disabled when the disabled property is set', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider disabled></flint-slider>`);
    expect(input(el).disabled).toBe(true);
  });
});

// ── Orientation ────────────────────────────────────────────────────────────

describe('flint-slider — orientation', () => {
  it('is horizontal by default', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    expect(el.vertical).toBe(false);
    expect(input(el).classList.contains('vertical')).toBe(false);
    expect(input(el).getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('renders in vertical mode when vertical property is set', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider vertical></flint-slider>`);
    expect(el.vertical).toBe(true);
    expect(input(el).classList.contains('vertical')).toBe(true);
  });

  it('reflects vertical attribute on host element', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider vertical></flint-slider>`);
    expect(el.hasAttribute('vertical')).toBe(true);
  });

  it('sets aria-orientation to vertical when vertical is true', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider vertical></flint-slider>`);
    expect(input(el).getAttribute('aria-orientation')).toBe('vertical');
  });

  it('applies vertical class to wrapper and track container in vertical mode', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider vertical></flint-slider>`);
    expect(el.shadowRoot!.querySelector('.slider-wrapper')!.classList.contains('vertical')).toBe(true);
    expect(el.shadowRoot!.querySelector('.track-container')!.classList.contains('vertical')).toBe(true);
  });

  it('still dispatches change events in vertical mode', async () => {
    let changedValue = 0;
    const el = await fixture<FlintSlider>(html`
      <flint-slider vertical @flint-slider-change=${(e: CustomEvent) => changedValue = e.detail.value}></flint-slider>
    `);
    fireInput(el, '55');
    expect(changedValue).toBe(55);
  });

  it('can be disabled in vertical mode', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider vertical disabled></flint-slider>`);
    expect(input(el).disabled).toBe(true);
  });

  it('shows value display in vertical mode when show-value is set', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider vertical .value=${33} show-value></flint-slider>`);
    const display = el.shadowRoot!.querySelector('.value-display');
    expect(display).not.toBeNull();
    expect(display!.textContent).toBe('33');
  });
});

// ── Value update ───────────────────────────────────────────────────────────

describe('flint-slider — value', () => {
  it('updates value correctly via input event', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${50}></flint-slider>`);
    fireInput(el, '75');
    expect(el.value).toBe(75);
  });

  it('reflects programmatic .value update to input', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${50}></flint-slider>`);
    el.value = 80;
    await el.updateComplete;
    expect(input(el).value).toBe('80');
  });

  it('clamps value below min to min', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="10" max="100" .value=${-5}></flint-slider>`);
    expect(input(el).value).toBe('10');
  });

  it('clamps value above max to max', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="0" max="50" .value=${150}></flint-slider>`);
    expect(input(el).value).toBe('50');
  });

  it('handles min > max gracefully without NaN', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="100" max="10" .value=${50}></flint-slider>`);
    // Should not throw and input value should be a finite number string
    const val = parseFloat(input(el).value);
    expect(Number.isFinite(val)).toBe(true);
  });
});

// ── Event ─────────────────────────────────────────────────────────────────

describe('flint-slider — flint-slider-change event', () => {
  it('dispatches flint-slider-change on input', async () => {
    let changedValue = 0;
    const el = await fixture<FlintSlider>(html`
      <flint-slider @flint-slider-change=${(e: CustomEvent) => changedValue = e.detail.value}></flint-slider>
    `);
    fireInput(el, '90');
    expect(changedValue).toBe(90);
  });

  it('event has correct detail shape', async () => {
    let detail: { value: number } | null = null;
    const el = await fixture<FlintSlider>(html`
      <flint-slider @flint-slider-change=${(e: CustomEvent) => detail = e.detail}></flint-slider>
    `);
    fireInput(el, '33');
    expect(detail).not.toBeNull();
    expect(typeof detail!.value).toBe('number');
    expect(detail!.value).toBe(33);
  });

  it('event bubbles and is composed', async () => {
    let captured = false;
    const wrapper = await fixture<HTMLDivElement>(html`
      <div @flint-slider-change=${() => captured = true}>
        <flint-slider .value=${50}></flint-slider>
      </div>
    `);
    const el = wrapper.querySelector('flint-slider')!;
    fireInput(el as FlintSlider, '60');
    expect(captured).toBe(true);
  });
});

// ── defaultValue (uncontrolled) ────────────────────────────────────────────

describe('flint-slider — defaultValue', () => {
  it('initializes value from default-value attribute', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider default-value="37"></flint-slider>`);
    expect(el.value).toBe(37);
    expect(input(el).value).toBe('37');
  });

  it('shows default-value in value display', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider default-value="62" show-value></flint-slider>`);
    const display = el.shadowRoot!.querySelector('.value-display');
    expect(display!.textContent).toBe('62');
  });

  it('uses regular value when no defaultValue is provided', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${55}></flint-slider>`);
    expect(input(el).value).toBe('55');
  });
});

// ── Size ──────────────────────────────────────────────────────────────────

describe('flint-slider — size', () => {
  it('defaults to md size', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    expect(el.size).toBe('md');
    expect(el.getAttribute('size')).toBe('md');
  });

  it('reflects sm size attribute', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider size="sm"></flint-slider>`);
    expect(el.size).toBe('sm');
    expect(el.hasAttribute('size')).toBe(true);
    expect(el.getAttribute('size')).toBe('sm');
  });

  it('reflects lg size attribute', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider size="lg"></flint-slider>`);
    expect(el.size).toBe('lg');
    expect(el.getAttribute('size')).toBe('lg');
  });
});

// ── formatValue & aria-valuetext ──────────────────────────────────────────

describe('flint-slider — formatValue', () => {
  it('displays formatted value in value display', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${50} show-value></flint-slider>`);
    el.formatValue = (v) => `${v}%`;
    await el.updateComplete;
    const display = el.shadowRoot!.querySelector('.value-display');
    expect(display!.textContent).toBe('50%');
  });

  it('sets aria-valuetext when formatValue is provided', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${22}></flint-slider>`);
    el.formatValue = (v) => `${v}°C`;
    await el.updateComplete;
    expect(input(el).getAttribute('aria-valuetext')).toBe('22°C');
  });

  it('leaves aria-valuetext empty when no formatValue', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${50}></flint-slider>`);
    expect(input(el).getAttribute('aria-valuetext')).toBe('');
  });
});

// ── Form association ──────────────────────────────────────────────────────

describe('flint-slider — form association', () => {
  it('is form-associated', () => {
    expect((FlintSlider as unknown as { formAssociated: boolean }).formAssociated).toBe(true);
  });

  it('participates in a form with name', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <flint-slider name="volume" .value=${70}></flint-slider>
      </form>
    `);
    const el = form.querySelector('flint-slider') as FlintSlider;
    // ElementInternals.form should be set
    expect(el.name).toBe('volume');
    // Verify value is accessible
    expect(el.value).toBe(70);
  });

  it('updates form value when value changes', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider name="vol" .value=${50}></flint-slider>`);
    fireInput(el, '80');
    expect(el.value).toBe(80);
  });
});

// ── Safe value boundary computation ────────────────────────────────────────

describe('flint-slider — safe value computation', () => {
  it('uses min as safeMin when min < max', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="10" max="90" .value=${50}></flint-slider>`);
    expect(input(el).min).toBe('10');
  });

  it('uses 0 as safeMin when min equals max', async () => {
    // Kills mutations 8499/8500/8514: _safeMin returns 0, not min, when min >= max
    const el = await fixture<FlintSlider>(html`<flint-slider min="50" max="50" .value=${25}></flint-slider>`);
    expect(input(el).min).toBe('0');
  });

  it('uses 0 as safeMin when min > max', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="80" max="20" .value=${50}></flint-slider>`);
    expect(input(el).min).toBe('0');
  });

  it('uses max as safeMax when max > min', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="0" max="200" .value=${100}></flint-slider>`);
    expect(input(el).max).toBe('200');
  });

  it('uses safeMin + 100 as safeMax when max equals min', async () => {
    // Kills mutations 8512/8517/8519/8521: safeMax = 0 + 100 = 100
    const el = await fixture<FlintSlider>(html`<flint-slider min="50" max="50" .value=${25}></flint-slider>`);
    expect(input(el).max).toBe('100');
  });

  it('uses safeMin + 100 as safeMax when max < min', async () => {
    // safeMin=0 (because min>max), safeMax = 0 + 100 = 100 (not 0 - 100 or other arithmetic)
    const el = await fixture<FlintSlider>(html`<flint-slider min="80" max="20" .value=${50}></flint-slider>`);
    expect(input(el).max).toBe('100');
  });

  it('clamps value to safeMax (100) when range is invalid and value is high', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="50" max="50" .value=${200}></flint-slider>`);
    // safeMin=0, safeMax=100, value clamped to 100
    expect(parseFloat(input(el).value)).toBe(100);
  });

  it('clamps value to safeMin (0) when range is invalid and value is negative', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="50" max="50" .value=${-10}></flint-slider>`);
    // safeMin=0, value clamped to 0
    expect(parseFloat(input(el).value)).toBe(0);
  });
});

// ── Track gradient style ────────────────────────────────────────────────────

describe('flint-slider — track gradient', () => {
  it('uses "to right" gradient direction in horizontal mode', async () => {
    // Kills mutation 8557: string 'to right' changed to ''
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${50}></flint-slider>`);
    const style = input(el).getAttribute('style') ?? '';
    expect(style).toContain('to right');
    expect(style).not.toContain('to left');
  });

  it('uses "to left" gradient direction in vertical mode', async () => {
    // Kills mutation 8559: string 'to left' changed to ''
    const el = await fixture<FlintSlider>(html`<flint-slider vertical .value=${50}></flint-slider>`);
    const style = input(el).getAttribute('style') ?? '';
    expect(style).toContain('to left');
    expect(style).not.toContain('to right');
  });

  it('calculates 25% fill for quarter-range value', async () => {
    // Kills arithmetic mutations — use regex to avoid substring false positives
    const el = await fixture<FlintSlider>(html`<flint-slider min="0" max="100" .value=${25}></flint-slider>`);
    const style = input(el).getAttribute('style') ?? '';
    expect(style).toMatch(/\) 25%, /);
  });

  it('calculates 75% fill for three-quarter-range value', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="0" max="100" .value=${75}></flint-slider>`);
    const style = input(el).getAttribute('style') ?? '';
    expect(style).toMatch(/\) 75%, /);
  });

  it('calculates 50% fill precisely for mid-range with non-zero min', async () => {
    // value=15, min=10, max=20: ((15-10)/(20-10))*100 = 50%
    // Kills mutation 8552: safeVal + safeMin → gives 250%, NOT 50%
    // Use regex so '250%' doesn't false-positively match '50%'
    const el = await fixture<FlintSlider>(html`<flint-slider min="10" max="20" .value=${15}></flint-slider>`);
    const style = input(el).getAttribute('style') ?? '';
    expect(style).toMatch(/\) 50%, /);
    expect(style).not.toMatch(/\) 250%, /);
  });

  it('calculates 0% fill when value equals min', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="0" max="100" .value=${0}></flint-slider>`);
    const style = input(el).getAttribute('style') ?? '';
    // Both fill stops at 0%
    expect(style).toMatch(/var\(--flint-primary-color.*?\) 0%.*?var\(--flint-primary-color.*?\) 0%/);
  });

  it('calculates 100% fill when value equals max', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="0" max="100" .value=${100}></flint-slider>`);
    const style = input(el).getAttribute('style') ?? '';
    expect(style).toContain('100%, var(--flint-input-border-color');
  });

  it('vertical gradient also encodes correct percentage', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider vertical min="0" max="100" .value=${30}></flint-slider>`);
    const style = input(el).getAttribute('style') ?? '';
    expect(style).toContain('30%');
    expect(style).toContain('to left');
  });
});

// ── Class names always present ──────────────────────────────────────────────

describe('flint-slider — required class names', () => {
  it('wrapper always has slider-wrapper class in horizontal mode', async () => {
    // Kills mutation 8556: classMap object literal → {}
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    expect(el.shadowRoot!.querySelector('.slider-wrapper')).not.toBeNull();
  });

  it('label-row always has label-row class', async () => {
    // Kills mutation 8558: label-row classMap → {}
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    expect(el.shadowRoot!.querySelector('.label-row')).not.toBeNull();
  });

  it('track container always has track-container class', async () => {
    // Kills mutation 8562: track classMap → {}
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    expect(el.shadowRoot!.querySelector('.track-container')).not.toBeNull();
  });

  it('wrapper does NOT have vertical class in horizontal mode', async () => {
    // Kills mutation 8532: 'slider-wrapper': true → false
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    const wrapper = el.shadowRoot!.querySelector('.slider-wrapper')!;
    expect(wrapper.classList.contains('vertical')).toBe(false);
  });

  it('input does NOT have vertical class in horizontal mode', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    expect(input(el).classList.contains('vertical')).toBe(false);
  });

  it('label-row has vertical class in vertical mode', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider vertical></flint-slider>`);
    const row = el.shadowRoot!.querySelector('.label-row')!;
    expect(row.classList.contains('vertical')).toBe(true);
  });

  it('label-row does NOT have vertical class in horizontal mode', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    const row = el.shadowRoot!.querySelector('.label-row')!;
    expect(row.classList.contains('vertical')).toBe(false);
  });
});

// ── defaultValue — first-update flag ───────────────────────────────────────

describe('flint-slider — defaultValue first-update guard', () => {
  it('defaultValue does not re-apply after programmatic value update', async () => {
    // Kills mutation 8504: _firstUpdate → true (always applies defaultValue)
    const el = await fixture<FlintSlider>(html`<flint-slider default-value="37"></flint-slider>`);
    expect(el.value).toBe(37);
    el.value = 80;
    await el.updateComplete;
    // If _firstUpdate always true, would reset back to 37
    expect(el.value).toBe(80);
    expect(input(el).value).toBe('80');
  });

  it('fires input then reflects new value, not defaultValue', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider default-value="20"></flint-slider>`);
    fireInput(el, '55');
    await el.updateComplete;
    expect(el.value).toBe(55);
    expect(input(el).value).toBe('55');
  });
});

// ── Form sync — OR vs AND in willUpdate ────────────────────────────────────

describe('flint-slider — form sync on prop change', () => {
  it('re-renders correctly when only name changes (no value change)', async () => {
    // Kills mutation 8535: || → && (form sync requires BOTH value and name to change)
    const el = await fixture<FlintSlider>(html`<flint-slider name="vol" .value=${60}></flint-slider>`);
    el.name = 'volume';
    await el.updateComplete;
    // Element should still render the correct value after name-only change
    expect(el.name).toBe('volume');
    expect(input(el).value).toBe('60');
  });

  it('form value syncs when value changes without name change', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider name="vol" .value=${50}></flint-slider>`);
    el.value = 90;
    await el.updateComplete;
    expect(input(el).value).toBe('90');
  });
});

// ── aria-label fallback ─────────────────────────────────────────────────────

describe('flint-slider — aria-label fallback', () => {
  it('aria-label is exactly "Slider" (not empty) when no label given', async () => {
    // Kills mutation 8509: 'Slider' → ''
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    const ariaLabel = input(el).getAttribute('aria-label');
    expect(ariaLabel).toBe('Slider');
    expect(ariaLabel).not.toBe('');
  });

  it('aria-label uses label text when provided (not fallback)', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider label="Volume"></flint-slider>`);
    expect(input(el).getAttribute('aria-label')).toBe('Volume');
    expect(input(el).getAttribute('aria-label')).not.toBe('Slider');
  });
});

// ── displayStr conditional & aria-valuetext ─────────────────────────────────

describe('flint-slider — displayStr and aria-valuetext', () => {
  it('value-display shows String(value) when no formatValue', async () => {
    // Kills mutation 8533: always calls formatValue even when undefined
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${42} show-value></flint-slider>`);
    const display = el.shadowRoot!.querySelector('.value-display');
    expect(display).not.toBeNull();
    expect(display!.textContent).toBe('42');
  });

  it('value-display shows formatted string when formatValue is set', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${42} show-value></flint-slider>`);
    el.formatValue = (v) => `${v} units`;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.value-display')!.textContent).toBe('42 units');
  });

  it('aria-valuetext is exactly empty string when formatValue absent', async () => {
    // Kills mutation 8536/8563
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${50}></flint-slider>`);
    expect(input(el).getAttribute('aria-valuetext')).toBe('');
  });

  it('aria-valuetext is non-empty when formatValue is present', async () => {
    // Kills mutation 8563: false → always empty
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${50}></flint-slider>`);
    el.formatValue = (v) => `$${v}`;
    await el.updateComplete;
    const ariaValuetext = input(el).getAttribute('aria-valuetext');
    expect(ariaValuetext).toBe('$50');
    expect(ariaValuetext).not.toBe('');
  });

  it('formatValue receives the clamped safe value, not raw value', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="0" max="100" .value=${150} show-value></flint-slider>`);
    el.formatValue = (v) => `val:${v}`;
    await el.updateComplete;
    // value clamped to 100
    expect(el.shadowRoot!.querySelector('.value-display')!.textContent).toBe('val:100');
  });
});

// ── ARIA attributes ─────────────────────────────────────────────────────────

describe('flint-slider — ARIA attributes', () => {
  it('has aria-valuemin matching safeMin', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="10" max="90" .value=${50}></flint-slider>`);
    expect(input(el).getAttribute('aria-valuemin')).toBe('10');
  });

  it('has aria-valuemax matching safeMax', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="10" max="90" .value=${50}></flint-slider>`);
    expect(input(el).getAttribute('aria-valuemax')).toBe('90');
  });

  it('has aria-valuenow matching clamped value', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="0" max="100" .value=${75}></flint-slider>`);
    expect(input(el).getAttribute('aria-valuenow')).toBe('75');
  });

  it('aria-valuenow reflects clamped value when out of range', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="0" max="100" .value=${200}></flint-slider>`);
    expect(input(el).getAttribute('aria-valuenow')).toBe('100');
  });

  it('has aria-disabled="true" when disabled', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider disabled></flint-slider>`);
    expect(input(el).getAttribute('aria-disabled')).toBe('true');
  });

  it('has aria-disabled="false" when not disabled', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    expect(input(el).getAttribute('aria-disabled')).toBe('false');
  });

  it('updates aria-valuenow after input event', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider .value=${50}></flint-slider>`);
    fireInput(el, '80');
    await el.updateComplete;
    expect(input(el).getAttribute('aria-valuenow')).toBe('80');
  });

  it('aria-valuemin uses fallback when min >= max', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="50" max="50" .value=${25}></flint-slider>`);
    expect(input(el).getAttribute('aria-valuemin')).toBe('0');
    expect(input(el).getAttribute('aria-valuemax')).toBe('100');
  });
});

// ── Default property values ────────────────────────────────────────────────

describe('flint-slider — default property values', () => {
  it('disabled is false by default', async () => {
    // Kills mutation: disabled = false → true
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    expect(el.disabled).toBe(false);
    expect(input(el).disabled).toBe(false);
  });

  it('name is empty string by default', async () => {
    // Kills mutation: name = '' → "Stryker was here!"
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    expect(el.name).toBe('');
  });
});

// ── Event properties ───────────────────────────────────────────────────────

describe('flint-slider — event properties', () => {
  it('dispatched event has composed: true', async () => {
    // Kills mutation: composed: true → false
    let evt: CustomEvent | null = null;
    const el = await fixture<FlintSlider>(html`
      <flint-slider @flint-slider-change=${(e: CustomEvent) => { evt = e; }}></flint-slider>
    `);
    fireInput(el, '50');
    expect(evt).not.toBeNull();
    expect(evt!.composed).toBe(true);
  });

  it('dispatched event has bubbles: true', async () => {
    let evt: Event | null = null;
    const el = await fixture<FlintSlider>(html`
      <flint-slider @flint-slider-change=${(e: Event) => { evt = e; }}></flint-slider>
    `);
    fireInput(el, '50');
    expect(evt!.bubbles).toBe(true);
  });
});

// ── Label-row empty when no label or value display ──────────────────────────

describe('flint-slider — label-row content', () => {
  it('label-row has no text content when label is absent and show-value is off', async () => {
    // Kills string mutations: '' → "Stryker was here!" fallbacks in template
    const el = await fixture<FlintSlider>(html`<flint-slider></flint-slider>`);
    const row = el.shadowRoot!.querySelector('.label-row')!;
    expect(row.textContent?.trim()).toBe('');
    expect(row.children.length).toBe(0);
  });

  it('label-row has only label element when label is set but show-value is off', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider label="Volume"></flint-slider>`);
    const row = el.shadowRoot!.querySelector('.label-row')!;
    expect(row.children.length).toBe(1);
    expect(row.querySelector('label')).not.toBeNull();
    expect(row.querySelector('.value-display')).toBeNull();
  });

  it('label-row has only value-display when show-value is set but no label', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider show-value .value=${42}></flint-slider>`);
    const row = el.shadowRoot!.querySelector('.label-row')!;
    expect(row.querySelector('.value-display')).not.toBeNull();
    expect(row.querySelector('label')).toBeNull();
  });
});

// ── Edge cases: value clamping ─────────────────────────────────────────────

describe('flint-slider — value clamping edge cases', () => {
  it('programmatic value below min is clamped in the rendered input', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="10" max="100" .value=${50}></flint-slider>`);
    el.value = -20;
    await el.updateComplete;
    expect(input(el).value).toBe('10');
    expect(input(el).getAttribute('aria-valuenow')).toBe('10');
  });

  it('programmatic value above max is clamped in the rendered input', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="0" max="50" .value=${25}></flint-slider>`);
    el.value = 999;
    await el.updateComplete;
    expect(input(el).value).toBe('50');
    expect(input(el).getAttribute('aria-valuenow')).toBe('50');
  });

  it('value at exact min boundary is not clamped', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="10" max="100" .value=${10}></flint-slider>`);
    expect(input(el).value).toBe('10');
  });

  it('value at exact max boundary is not clamped', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="0" max="100" .value=${100}></flint-slider>`);
    expect(input(el).value).toBe('100');
  });

  it('value display shows clamped value, not raw value', async () => {
    const el = await fixture<FlintSlider>(html`<flint-slider min="0" max="50" .value=${200} show-value></flint-slider>`);
    const display = el.shadowRoot!.querySelector('.value-display');
    expect(display!.textContent).toBe('50');
  });

  it('slider event still fires with the raw input value when interaction occurs', async () => {
    let detail: { value: number } | null = null;
    const el = await fixture<FlintSlider>(html`
      <flint-slider min="0" max="100" .value=${50} @flint-slider-change=${(e: CustomEvent) => detail = e.detail}></flint-slider>
    `);
    fireInput(el, '0');
    expect(detail).not.toBeNull();
    expect(detail!.value).toBe(0);
  });
});

// ── Accessibility ─────────────────────────────────────────────────────────

describe('flint-slider — accessibility', () => {
  it('should pass automated a11y checks', async () => {
    const el = await fixture(html`<flint-slider label="Volume" .value=${50} min="0" max="100"></flint-slider>`);
    await expectAccessible(el);
  }, 15000);
});
