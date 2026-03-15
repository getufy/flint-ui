import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-form-field';
import type { FlintFormField } from './flint-form-field';
import '../input/flint-input';
import '../switch/flint-switch';

describe('flint-form-field', () => {
    // ── Definition ──────────────────────────────────────────────────────────

    it('is defined', () => {
        const el = document.createElement('flint-form-field');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    // ── Default rendering ────────────────────────────────────────────────────

    it('renders with default values', async () => {
        const el = await fixture<FlintFormField>(html`<flint-form-field></flint-form-field>`);
        expect(el.label).toBe('');
        expect(el.helperText).toBe('');
        expect(el.errorMessage).toBe('');
        expect(el.error).toBe(false);
        expect(el.required).toBe(false);
        expect(el.disabled).toBe(false);
        expect(el.labelPosition).toBe('top');
    });

    // ── Label rendering ─────────────────────────────────────────────────────

    it('renders label text', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field label="Email Address"></flint-form-field>`
        );
        const label = el.shadowRoot!.querySelector('.label');
        expect(label).toBeTruthy();
        expect(label!.textContent!.trim()).toBe('Email Address');
    });

    it('does not render label element when label is empty', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field></flint-form-field>`
        );
        const label = el.shadowRoot!.querySelector('.label');
        expect(label).toBeNull();
    });

    it('syncs label to slotted control', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field label="Name">
                <flint-input></flint-input>
            </flint-form-field>`
        );
        await el.updateComplete;
        const input = el.querySelector('flint-input') as HTMLElement & { label: string };
        expect(input.label).toBe('Name');
    });

    // ── Helper text ─────────────────────────────────────────────────────────

    it('renders helper text', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field helper-text="Enter your email"></flint-form-field>`
        );
        const helperText = el.shadowRoot!.querySelector('.helper-text');
        expect(helperText).toBeTruthy();
        expect(helperText!.textContent!.trim()).toBe('Enter your email');
    });

    it('does not render helper text when empty', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field></flint-form-field>`
        );
        const helperText = el.shadowRoot!.querySelector('.helper-text');
        expect(helperText).toBeNull();
    });

    // ── Error state ─────────────────────────────────────────────────────────

    it('shows error message when error is true', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field error error-message="This field is required"></flint-form-field>`
        );
        const errorMsg = el.shadowRoot!.querySelector('.error-message');
        expect(errorMsg).toBeTruthy();
        expect(errorMsg!.textContent!.trim()).toBe('This field is required');
        expect(errorMsg!.getAttribute('role')).toBe('alert');
    });

    it('does not show error message when error is false', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field error-message="This field is required"></flint-form-field>`
        );
        const errorMsg = el.shadowRoot!.querySelector('.error-message');
        expect(errorMsg).toBeNull();
    });

    it('hides helper text when error message is shown', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field
                helper-text="Enter your email"
                error
                error-message="Invalid email"
            ></flint-form-field>`
        );
        const helperText = el.shadowRoot!.querySelector('.helper-text');
        const errorMsg = el.shadowRoot!.querySelector('.error-message');
        expect(helperText).toBeNull();
        expect(errorMsg).toBeTruthy();
    });

    // ── Required indicator ──────────────────────────────────────────────────

    it('shows required indicator when required', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field label="Email" required></flint-form-field>`
        );
        const indicator = el.shadowRoot!.querySelector('.required-indicator');
        expect(indicator).toBeTruthy();
        expect(indicator!.textContent!.trim()).toBe('*');
        expect(indicator!.getAttribute('aria-hidden')).toBe('true');
    });

    it('does not show required indicator when not required', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field label="Email"></flint-form-field>`
        );
        const indicator = el.shadowRoot!.querySelector('.required-indicator');
        expect(indicator).toBeNull();
    });

    // ── Disabled state ──────────────────────────────────────────────────────

    it('reflects disabled attribute', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field disabled></flint-form-field>`
        );
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    // ── Label position ──────────────────────────────────────────────────────

    it('defaults to top label position', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field label="Name"></flint-form-field>`
        );
        expect(el.labelPosition).toBe('top');
        expect(el.getAttribute('label-position')).toBe('top');
    });

    it('reflects start label position', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field label="Name" label-position="start"></flint-form-field>`
        );
        expect(el.labelPosition).toBe('start');
        expect(el.getAttribute('label-position')).toBe('start');
    });

    // ── Error attribute reflection ──────────────────────────────────────────

    it('reflects error attribute', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field error></flint-form-field>`
        );
        expect(el.hasAttribute('error')).toBe(true);
    });

    it('reflects required attribute', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field required></flint-form-field>`
        );
        expect(el.hasAttribute('required')).toBe(true);
    });

    // ── State sync to slotted controls ──────────────────────────────────────

    it('passes error state to slotted control', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field error>
                <flint-input></flint-input>
            </flint-form-field>`
        );
        await el.updateComplete;
        const input = el.querySelector('flint-input') as HTMLElement & { error: boolean };
        expect(input.error).toBe(true);
    });

    it('passes disabled state to slotted control', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field disabled>
                <flint-input></flint-input>
            </flint-form-field>`
        );
        await el.updateComplete;
        const input = el.querySelector('flint-input') as HTMLElement & { disabled: boolean };
        expect(input.disabled).toBe(true);
    });

    it('passes required state to slotted control', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field required>
                <flint-input></flint-input>
            </flint-form-field>`
        );
        await el.updateComplete;
        const input = el.querySelector('flint-input') as HTMLElement & { required: boolean };
        expect(input.required).toBe(true);
    });

    it('assigns generated id to slotted control', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field label="Email">
                <flint-input></flint-input>
            </flint-form-field>`
        );
        await el.updateComplete;
        const input = el.querySelector('flint-input')!;
        expect(input.id).toBeTruthy();
        expect(input.id).toContain('flint-form-field-');
    });

    it('does not overwrite existing id on slotted control', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field label="Email">
                <flint-input id="my-custom-id"></flint-input>
            </flint-form-field>`
        );
        await el.updateComplete;
        const input = el.querySelector('flint-input')!;
        expect(input.id).toBe('my-custom-id');
    });

    // ── Parts ───────────────────────────────────────────────────────────────

    it('exposes label part', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field label="Name"></flint-form-field>`
        );
        const part = el.shadowRoot!.querySelector('[part="label"]');
        expect(part).toBeTruthy();
    });

    it('exposes field part', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field></flint-form-field>`
        );
        const part = el.shadowRoot!.querySelector('[part="field"]');
        expect(part).toBeTruthy();
    });

    it('exposes helper-text part', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field helper-text="Help"></flint-form-field>`
        );
        const part = el.shadowRoot!.querySelector('[part="helper-text"]');
        expect(part).toBeTruthy();
    });

    it('exposes error-message part', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field error error-message="Error"></flint-form-field>`
        );
        const part = el.shadowRoot!.querySelector('[part="error-message"]');
        expect(part).toBeTruthy();
    });

    // ── Slot content overrides ──────────────────────────────────────────────

    it('renders slotted label content', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field label="Fallback">
                <span slot="label">Custom Label</span>
            </flint-form-field>`
        );
        const labelSlot = el.shadowRoot!.querySelector('slot[name="label"]') as HTMLSlotElement;
        expect(labelSlot).toBeTruthy();
        const assigned = labelSlot.assignedElements({ flatten: false });
        expect(assigned.length).toBe(1);
        expect(assigned[0].textContent!.trim()).toBe('Custom Label');
    });

    it('renders slotted helper text content', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field helper-text="Fallback">
                <span slot="helper-text">Custom Helper</span>
            </flint-form-field>`
        );
        const slot = el.shadowRoot!.querySelector('slot[name="helper-text"]') as HTMLSlotElement;
        expect(slot).toBeTruthy();
        const assigned = slot.assignedElements({ flatten: false });
        expect(assigned.length).toBe(1);
        expect(assigned[0].textContent!.trim()).toBe('Custom Helper');
    });

    it('renders slotted error message content', async () => {
        const el = await fixture<FlintFormField>(
            html`<flint-form-field error error-message="Fallback">
                <span slot="error-message">Custom Error</span>
            </flint-form-field>`
        );
        const slot = el.shadowRoot!.querySelector('slot[name="error-message"]') as HTMLSlotElement;
        expect(slot).toBeTruthy();
        const assigned = slot.assignedElements({ flatten: false });
        expect(assigned.length).toBe(1);
        expect(assigned[0].textContent!.trim()).toBe('Custom Error');
    });

    // ── Accessibility ─────────────────────────────────────────────────────────

    it('should pass automated a11y checks', async () => {
        const { expectAccessible } = await import('../test-utils/axe');
        const el = await fixture(
            html`<flint-form-field label="Email">
                <flint-input></flint-input>
            </flint-form-field>`
        );
        await expectAccessible(el);
    }, 15000);

    it('should pass a11y checks with error state', async () => {
        const { expectAccessible } = await import('../test-utils/axe');
        const el = await fixture(
            html`<flint-form-field label="Email" error error-message="Required field">
                <flint-input></flint-input>
            </flint-form-field>`
        );
        await expectAccessible(el);
    }, 15000);
});
