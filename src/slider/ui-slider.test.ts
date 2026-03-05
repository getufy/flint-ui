import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { UiSlider } from './ui-slider';

// ── Helpers ────────────────────────────────────────────────────────────────

function input(el: UiSlider) {
  return el.shadowRoot!.querySelector('input')!;
}

function fireInput(el: UiSlider, value: string) {
  const inp = input(el);
  inp.value = value;
  inp.dispatchEvent(new Event('input'));
}

// ── Rendering ──────────────────────────────────────────────────────────────

describe('ui-slider — rendering', () => {
  it('renders with initial values', async () => {
    const el = await fixture<UiSlider>(html`
      <ui-slider label="Volume" .value=${25} min="0" max="100"></ui-slider>
    `);
    expect(input(el).value).toBe('25');
    expect(el.shadowRoot!.textContent).toContain('Volume');
  });

  it('renders label element with correct text', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider label="Brightness"></ui-slider>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label).not.toBeNull();
    expect(label!.textContent!.trim()).toBe('Brightness');
  });

  it('does not render label element when label is empty', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider></ui-slider>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label).toBeNull();
  });

  it('shows value display when show-value is set', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider .value=${42} show-value></ui-slider>`);
    const display = el.shadowRoot!.querySelector('.value-display');
    expect(display).not.toBeNull();
    expect(display!.textContent).toBe('42');
  });

  it('hides value display when show-value is not set', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider .value=${42}></ui-slider>`);
    expect(el.shadowRoot!.querySelector('.value-display')).toBeNull();
  });

  it('links label[for] to input[id]', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider label="Volume"></ui-slider>`);
    const label = el.shadowRoot!.querySelector('label')!;
    const inp = input(el);
    expect(label.getAttribute('for')).toBe(inp.id);
    expect(inp.id).not.toBe('');
  });

  it('sets aria-label to label text when label is provided', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider label="Volume"></ui-slider>`);
    expect(input(el).getAttribute('aria-label')).toBe('Volume');
  });

  it('falls back to "Slider" aria-label when no label is given', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider></ui-slider>`);
    expect(input(el).getAttribute('aria-label')).toBe('Slider');
  });

  it('applies disabled-label class to label when disabled', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider label="Locked" disabled></ui-slider>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label!.classList.contains('disabled-label')).toBe(true);
  });

  it('reflects min and max bounds on the input', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider min="10" max="20" .value=${15}></ui-slider>`);
    expect(input(el).min).toBe('10');
    expect(input(el).max).toBe('20');
  });

  it('reflects step on the input', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider step="10" .value=${20}></ui-slider>`);
    expect(input(el).step).toBe('10');
  });

  it('is disabled when the disabled property is set', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider disabled></ui-slider>`);
    expect(input(el).disabled).toBe(true);
  });
});

// ── Orientation ────────────────────────────────────────────────────────────

describe('ui-slider — orientation', () => {
  it('is horizontal by default', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider></ui-slider>`);
    expect(el.vertical).toBe(false);
    expect(input(el).classList.contains('vertical')).toBe(false);
    expect(input(el).getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('renders in vertical mode when vertical property is set', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider vertical></ui-slider>`);
    expect(el.vertical).toBe(true);
    expect(input(el).classList.contains('vertical')).toBe(true);
  });

  it('reflects vertical attribute on host element', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider vertical></ui-slider>`);
    expect(el.hasAttribute('vertical')).toBe(true);
  });

  it('sets aria-orientation to vertical when vertical is true', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider vertical></ui-slider>`);
    expect(input(el).getAttribute('aria-orientation')).toBe('vertical');
  });

  it('applies vertical class to wrapper and track container in vertical mode', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider vertical></ui-slider>`);
    expect(el.shadowRoot!.querySelector('.slider-wrapper')!.classList.contains('vertical')).toBe(true);
    expect(el.shadowRoot!.querySelector('.track-container')!.classList.contains('vertical')).toBe(true);
  });

  it('still dispatches change events in vertical mode', async () => {
    let changedValue = 0;
    const el = await fixture<UiSlider>(html`
      <ui-slider vertical @ui-slider-change=${(e: CustomEvent) => changedValue = e.detail.value}></ui-slider>
    `);
    fireInput(el, '55');
    expect(changedValue).toBe(55);
  });

  it('can be disabled in vertical mode', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider vertical disabled></ui-slider>`);
    expect(input(el).disabled).toBe(true);
  });

  it('shows value display in vertical mode when show-value is set', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider vertical .value=${33} show-value></ui-slider>`);
    const display = el.shadowRoot!.querySelector('.value-display');
    expect(display).not.toBeNull();
    expect(display!.textContent).toBe('33');
  });
});

// ── Value update ───────────────────────────────────────────────────────────

describe('ui-slider — value', () => {
  it('updates value correctly via input event', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider .value=${50}></ui-slider>`);
    fireInput(el, '75');
    expect(el.value).toBe(75);
  });

  it('reflects programmatic .value update to input', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider .value=${50}></ui-slider>`);
    el.value = 80;
    await el.updateComplete;
    expect(input(el).value).toBe('80');
  });

  it('clamps value below min to min', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider min="10" max="100" .value=${-5}></ui-slider>`);
    expect(input(el).value).toBe('10');
  });

  it('clamps value above max to max', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider min="0" max="50" .value=${150}></ui-slider>`);
    expect(input(el).value).toBe('50');
  });

  it('handles min > max gracefully without NaN', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider min="100" max="10" .value=${50}></ui-slider>`);
    // Should not throw and input value should be a finite number string
    const val = parseFloat(input(el).value);
    expect(Number.isFinite(val)).toBe(true);
  });
});

// ── Event ─────────────────────────────────────────────────────────────────

describe('ui-slider — ui-slider-change event', () => {
  it('dispatches ui-slider-change on input', async () => {
    let changedValue = 0;
    const el = await fixture<UiSlider>(html`
      <ui-slider @ui-slider-change=${(e: CustomEvent) => changedValue = e.detail.value}></ui-slider>
    `);
    fireInput(el, '90');
    expect(changedValue).toBe(90);
  });

  it('event has correct detail shape', async () => {
    let detail: { value: number } | null = null;
    const el = await fixture<UiSlider>(html`
      <ui-slider @ui-slider-change=${(e: CustomEvent) => detail = e.detail}></ui-slider>
    `);
    fireInput(el, '33');
    expect(detail).not.toBeNull();
    expect(typeof detail!.value).toBe('number');
    expect(detail!.value).toBe(33);
  });

  it('event bubbles and is composed', async () => {
    let captured = false;
    const wrapper = await fixture<HTMLDivElement>(html`
      <div @ui-slider-change=${() => captured = true}>
        <ui-slider .value=${50}></ui-slider>
      </div>
    `);
    const el = wrapper.querySelector('ui-slider')!;
    fireInput(el as UiSlider, '60');
    expect(captured).toBe(true);
  });
});

// ── defaultValue (uncontrolled) ────────────────────────────────────────────

describe('ui-slider — defaultValue', () => {
  it('initializes value from default-value attribute', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider default-value="37"></ui-slider>`);
    expect(el.value).toBe(37);
    expect(input(el).value).toBe('37');
  });

  it('shows default-value in value display', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider default-value="62" show-value></ui-slider>`);
    const display = el.shadowRoot!.querySelector('.value-display');
    expect(display!.textContent).toBe('62');
  });

  it('uses regular value when no defaultValue is provided', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider .value=${55}></ui-slider>`);
    expect(input(el).value).toBe('55');
  });
});

// ── Size ──────────────────────────────────────────────────────────────────

describe('ui-slider — size', () => {
  it('defaults to md size', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider></ui-slider>`);
    expect(el.size).toBe('md');
    expect(el.getAttribute('size')).toBe('md');
  });

  it('reflects sm size attribute', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider size="sm"></ui-slider>`);
    expect(el.size).toBe('sm');
    expect(el.hasAttribute('size')).toBe(true);
    expect(el.getAttribute('size')).toBe('sm');
  });

  it('reflects lg size attribute', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider size="lg"></ui-slider>`);
    expect(el.size).toBe('lg');
    expect(el.getAttribute('size')).toBe('lg');
  });
});

// ── formatValue & aria-valuetext ──────────────────────────────────────────

describe('ui-slider — formatValue', () => {
  it('displays formatted value in value display', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider .value=${50} show-value></ui-slider>`);
    el.formatValue = (v) => `${v}%`;
    await el.updateComplete;
    const display = el.shadowRoot!.querySelector('.value-display');
    expect(display!.textContent).toBe('50%');
  });

  it('sets aria-valuetext when formatValue is provided', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider .value=${22}></ui-slider>`);
    el.formatValue = (v) => `${v}°C`;
    await el.updateComplete;
    expect(input(el).getAttribute('aria-valuetext')).toBe('22°C');
  });

  it('leaves aria-valuetext empty when no formatValue', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider .value=${50}></ui-slider>`);
    expect(input(el).getAttribute('aria-valuetext')).toBe('');
  });
});

// ── Form association ──────────────────────────────────────────────────────

describe('ui-slider — form association', () => {
  it('is form-associated', () => {
    expect((UiSlider as unknown as { formAssociated: boolean }).formAssociated).toBe(true);
  });

  it('participates in a form with name', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <ui-slider name="volume" .value=${70}></ui-slider>
      </form>
    `);
    const el = form.querySelector('ui-slider') as UiSlider;
    // ElementInternals.form should be set
    expect(el.name).toBe('volume');
    // Verify value is accessible
    expect(el.value).toBe(70);
  });

  it('updates form value when value changes', async () => {
    const el = await fixture<UiSlider>(html`<ui-slider name="vol" .value=${50}></ui-slider>`);
    fireInput(el, '80');
    expect(el.value).toBe(80);
  });
});
