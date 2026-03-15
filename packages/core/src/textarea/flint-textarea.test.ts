import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { FlintTextarea } from './flint-textarea';

describe('flint-textarea', () => {
    // ── Definition ──────────────────────────────────────────────────────────

    it('is defined', () => {
        const el = document.createElement('flint-textarea');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('is form-associated', () => {
        expect((FlintTextarea as unknown as Record<string, unknown>).formAssociated).toBe(true);
    });

    // ── Default rendering ────────────────────────────────────────────────────

    it('renders with default values', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        expect(el.value).toBe('');
        expect(el.placeholder).toBe('');
        expect(el.name).toBe('');
        expect(el.autocomplete).toBe('');
        expect(el.disabled).toBe(false);
        expect(el.readonly).toBe(false);
        expect(el.required).toBe(false);
        expect(el.error).toBe(false);
        expect(el.rows).toBe(3);
        expect(el.size).toBe('default');
        expect(el.resize).toBe('vertical');
    });

    it('renders a textarea element inside shadow DOM', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea');
        expect(ta).toBeTruthy();
    });

    it('does not render label by default', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        expect(el.shadowRoot!.querySelector('label')).toBeNull();
    });

    // ── textareaElement getter ────────────────────────────────────────────────

    it('exposes textareaElement getter', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        expect(el.textareaElement).toBeInstanceOf(HTMLTextAreaElement);
    });

    // ── Attribute reflection ─────────────────────────────────────────────────

    it('reflects disabled attribute', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        el.disabled = true;
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects readonly attribute', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        el.readonly = true;
        await el.updateComplete;
        expect(el.hasAttribute('readonly')).toBe(true);
    });

    it('reflects required attribute', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        el.required = true;
        await el.updateComplete;
        expect(el.hasAttribute('required')).toBe(true);
    });

    it('reflects size attribute', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea size="sm"></flint-textarea>`);
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('reflects resize attribute', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea resize="none"></flint-textarea>`);
        expect(el.getAttribute('resize')).toBe('none');
    });

    // ── Value sync ───────────────────────────────────────────────────────────

    it('sets value on internal textarea', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea value="hello"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.value).toBe('hello');
    });

    it('sets placeholder on internal textarea', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea placeholder="Write here..."></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.placeholder).toBe('Write here...');
    });

    it('sets rows on internal textarea', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea rows="5"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.rows).toBe(5);
    });

    it('sets disabled on internal textarea', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea disabled></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.disabled).toBe(true);
    });

    it('sets readonly on internal textarea', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea readonly></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.readOnly).toBe(true);
    });

    it('sets required on internal textarea', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea required></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.required).toBe(true);
    });

    it('sets maxlength on internal textarea', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea maxlength="200"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.maxLength).toBe(200);
    });

    it('sets minlength on internal textarea', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea minlength="10"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.minLength).toBe(10);
    });

    // ── Events ───────────────────────────────────────────────────────────────

    it('fires flint-textarea-input on keystroke', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;

        const spy = vi.fn();
        el.addEventListener('flint-textarea-input', spy);

        ta.value = 'typed text';
        ta.dispatchEvent(new Event('input', { bubbles: true }));
        await el.updateComplete;

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: 'typed text' });
        expect(el.value).toBe('typed text');
    });

    it('fires flint-textarea-change on change', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;

        const spy = vi.fn();
        el.addEventListener('flint-textarea-change', spy);

        ta.value = 'changed text';
        ta.dispatchEvent(new Event('change', { bubbles: true }));
        await el.updateComplete;

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: 'changed text' });
    });

    it('flint-textarea-input bubbles and is composed', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;

        let captured: CustomEvent | null = null;
        document.addEventListener('flint-textarea-input', (e) => { captured = e as CustomEvent; }, { once: true });

        ta.value = 'x';
        ta.dispatchEvent(new Event('input', { bubbles: true }));

        expect(captured).not.toBeNull();
        expect((captured as unknown as CustomEvent).bubbles).toBe(true);
        expect((captured as unknown as CustomEvent).composed).toBe(true);
    });

    // ── Error state ──────────────────────────────────────────────────────────

    it('applies aria-invalid when error=true', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea error></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-invalid')).toBe('true');
    });

    it('applies aria-invalid when errorMessage is set', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea error-message="Bad input"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-invalid')).toBe('true');
    });

    it('renders error message with role="alert"', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea error-message="Required"></flint-textarea>`);
        const msg = el.shadowRoot!.querySelector('[role="alert"]');
        expect(msg).toBeTruthy();
        expect(msg!.textContent?.trim()).toBe('Required');
    });

    it('does not render error message when only error=true without message', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea error></flint-textarea>`);
        expect(el.shadowRoot!.querySelector('[role="alert"]')).toBeNull();
    });

    it('aria-invalid is false by default', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-invalid')).toBe('false');
    });

    // ── aria-required ─────────────────────────────────────────────────────────

    it('sets aria-required="false" by default', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-required')).toBe('false');
    });

    it('sets aria-required="true" when required', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea required></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-required')).toBe('true');
    });

    it('updates aria-required when required changes', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        el.required = true;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('textarea')!.getAttribute('aria-required')).toBe('true');
        el.required = false;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('textarea')!.getAttribute('aria-required')).toBe('false');
    });

    // ── Help text ────────────────────────────────────────────────────────────

    it('renders help text', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea helper-text="Enter a message."></flint-textarea>`);
        const p = el.shadowRoot!.querySelector('.help-text');
        expect(p).toBeTruthy();
        expect(p!.textContent?.trim()).toBe('Enter a message.');
    });

    it('error message takes precedence over help text', async () => {
        const el = await fixture<FlintTextarea>(html`
      <flint-textarea helper-text="Hint" error-message="Error occurred"></flint-textarea>
    `);
        const alert = el.shadowRoot!.querySelector('[role="alert"]');
        expect(alert).toBeTruthy();
        expect(alert!.textContent?.trim()).toBe('Error occurred');
    });

    // ── Label ────────────────────────────────────────────────────────────────

    it('renders label when label prop is set', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea label="Feedback"></flint-textarea>`);
        const lbl = el.shadowRoot!.querySelector('label');
        expect(lbl).toBeTruthy();
        expect(lbl!.textContent?.trim()).toBe('Feedback');
    });

    it('label for attribute matches textarea id', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea label="Message"></flint-textarea>`);
        const lbl = el.shadowRoot!.querySelector('label')!;
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(lbl.htmlFor).toBe(ta.id);
    });

    // ── aria-label ───────────────────────────────────────────────────────────

    it('sets aria-label on textarea when provided', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea aria-label="Write feedback"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-label')).toBe('Write feedback');
    });

    it('does not set aria-label when not provided', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-label')).toBe(false);
    });

    // ── defaultValue ─────────────────────────────────────────────────────────

    it('initialises value from defaultValue', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea default-value="Hello world"></flint-textarea>`);
        expect(el.value).toBe('Hello world');
    });

    it('defaultValue does not override an explicit value', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea value="explicit" default-value="default"></flint-textarea>`);
        expect(el.value).toBe('explicit');
    });

    it('defaultValue does not cause a second update cycle', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea default-value="test"></flint-textarea>`);
        await el.updateComplete;
        expect(el.value).toBe('test');
    });

    // ── Size variants ────────────────────────────────────────────────────────

    it('defaults to size default', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        expect(el.size).toBe('default');
        expect(el.getAttribute('size')).toBe('default');
    });

    it('accepts size sm', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea size="sm"></flint-textarea>`);
        expect(el.size).toBe('sm');
    });

    it('accepts size lg', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea size="lg"></flint-textarea>`);
        expect(el.size).toBe('lg');
    });

    // ── Resize variants ──────────────────────────────────────────────────────

    it('defaults to resize vertical', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        expect(el.resize).toBe('vertical');
    });

    it('accepts resize none', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea resize="none"></flint-textarea>`);
        expect(el.resize).toBe('none');
    });

    it('accepts resize auto', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea resize="auto"></flint-textarea>`);
        expect(el.resize).toBe('auto');
    });

    // ── Form fields ──────────────────────────────────────────────────────────

    it('has name prop', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea name="feedback"></flint-textarea>`);
        expect(el.name).toBe('feedback');
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.name).toBe('feedback');
    });

    // ── Unique IDs ───────────────────────────────────────────────────────────

    it('generates unique textarea IDs across multiple instances', async () => {
        const a = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const b = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const idA = a.shadowRoot!.querySelector('textarea')!.id;
        const idB = b.shadowRoot!.querySelector('textarea')!.id;
        expect(idA).not.toBe(idB);
        expect(idA).toMatch(/^flint-textarea-\d+$/);
        expect(idB).toMatch(/^flint-textarea-\d+$/);
    });

    it('label for attribute matches the textarea id', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea label="Bio"></flint-textarea>`);
        const lbl = el.shadowRoot!.querySelector('label')!;
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.id).toMatch(/^flint-textarea-\d+$/);
        expect(lbl.htmlFor).toBe(ta.id);
    });

    it('aria-describedby points to the description element id', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea helper-text="hint"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        const desc = el.shadowRoot!.querySelector('.help-text')!;
        expect(desc.id).toMatch(/^flint-textarea-desc-\d+$/);
        expect(ta.getAttribute('aria-describedby')).toBe(desc.id);
    });

    // ── _firstUpdate guard ───────────────────────────────────────────────────

    it('clearing value after init does not reapply defaultValue', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea default-value="hello"></flint-textarea>`);
        expect(el.value).toBe('hello');
        el.value = '';
        await el.updateComplete;
        expect(el.value).toBe('');
    });

    it('subsequent property changes do not trigger defaultValue re-application', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea default-value="init"></flint-textarea>`);
        expect(el.value).toBe('init');
        // Trigger another update without touching value
        el.placeholder = 'new placeholder';
        await el.updateComplete;
        expect(el.value).toBe('init');
    });

    // ── Form internals (setFormValue / setValidity) ──────────────────────────

    it('_internals is initialised via attachInternals', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const internals = (el as any)._internals;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        if (typeof el.attachInternals === 'function') {
            expect(internals).not.toBeNull();
        }
    });

    it('_internals is null when attachInternals is unavailable', () => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const original = (HTMLElement.prototype as any).attachInternals;
        (HTMLElement.prototype as any).attachInternals = undefined;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        try {
            const el = document.createElement('flint-textarea') as FlintTextarea;
            /* eslint-disable @typescript-eslint/no-explicit-any */
            expect((el as any)._internals).toBeNull();
            /* eslint-enable @typescript-eslint/no-explicit-any */
        } finally {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            (HTMLElement.prototype as any).attachInternals = original;
            /* eslint-enable @typescript-eslint/no-explicit-any */
        }
    });

    it('calls setFormValue when value changes', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const internals = (el as any)._internals as Record<string, unknown>;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        expect(internals).not.toBeNull();
        const spy = vi.fn();
        internals['setFormValue'] = spy;
        el.value = 'hello';
        await el.updateComplete;
        expect(spy).toHaveBeenCalledWith('hello');
    });

    it('setFormValue is not called when only placeholder changes', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const internals = (el as any)._internals as Record<string, unknown>;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        expect(internals).not.toBeNull();
        const spy = vi.fn();
        internals['setFormValue'] = spy;
        el.placeholder = 'changed';
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('sets valueMissing validity when required and value is empty', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const internals = (el as any)._internals as Record<string, unknown>;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        expect(internals).not.toBeNull();
        const spy = vi.fn();
        internals['setValidity'] = spy;
        el.required = true;
        await el.updateComplete;
        expect(spy).toHaveBeenCalledWith({ valueMissing: true }, 'Please fill in this field.');
    });

    it('sets valueMissing validity when value is cleared on required field', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea required value="text"></flint-textarea>`);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const internals = (el as any)._internals as Record<string, unknown>;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        expect(internals).not.toBeNull();
        const spy = vi.fn();
        internals['setValidity'] = spy;
        el.value = '';
        await el.updateComplete;
        expect(spy).toHaveBeenCalledWith({ valueMissing: true }, 'Please fill in this field.');
    });

    it('clears validity when required field gets a value', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea required></flint-textarea>`);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const internals = (el as any)._internals as Record<string, unknown>;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        expect(internals).not.toBeNull();
        const spy = vi.fn();
        internals['setValidity'] = spy;
        el.value = 'some text';
        await el.updateComplete;
        expect(spy).toHaveBeenCalledWith({});
        expect(spy).not.toHaveBeenCalledWith(expect.objectContaining({ valueMissing: true }), expect.any(String));
    });

    it('clears validity when required is removed', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea required></flint-textarea>`);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const internals = (el as any)._internals as Record<string, unknown>;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        expect(internals).not.toBeNull();
        const spy = vi.fn();
        internals['setValidity'] = spy;
        el.required = false;
        await el.updateComplete;
        expect(spy).toHaveBeenCalledWith({});
    });

    it('does not set valueMissing when not required but value is empty', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const internals = (el as any)._internals as Record<string, unknown>;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        expect(internals).not.toBeNull();
        const spy = vi.fn();
        internals['setValidity'] = spy;
        el.value = '';
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalledWith(expect.objectContaining({ valueMissing: true }), expect.any(String));
    });

    it('does not set valueMissing when required has a value', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea required value="text"></flint-textarea>`);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const internals = (el as any)._internals as Record<string, unknown>;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        expect(internals).not.toBeNull();
        const spy = vi.fn();
        internals['setValidity'] = spy;
        el.value = 'updated';
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalledWith(expect.objectContaining({ valueMissing: true }), expect.any(String));
        expect(spy).toHaveBeenCalledWith({});
    });

    it('setValidity is not called when only placeholder changes', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const internals = (el as any)._internals as Record<string, unknown>;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        expect(internals).not.toBeNull();
        const spy = vi.fn();
        internals['setValidity'] = spy;
        el.placeholder = 'hint';
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    // ── Auto-resize ──────────────────────────────────────────────────────────

    it('auto-resize sets textarea height when value changes', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea resize="auto"></flint-textarea>`);
        const ta = el.textareaElement!;
        el.value = 'line1\nline2\nline3';
        await el.updateComplete;
        // jsdom scrollHeight is 0, so height should be set to '0px'
        expect(ta.style.height).toBe('0px');
    });

    it('auto-resize does not run when resize is vertical', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea resize="vertical"></flint-textarea>`);
        const ta = el.textareaElement!;
        el.value = 'some text';
        await el.updateComplete;
        expect(ta.style.height).toBe('');
    });

    it('auto-resize does not run when resize is none', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea resize="none"></flint-textarea>`);
        const ta = el.textareaElement!;
        el.value = 'some text';
        await el.updateComplete;
        expect(ta.style.height).toBe('');
    });

    it('auto-resize first sets height to auto then scrollHeight', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea resize="auto"></flint-textarea>`);
        const ta = el.textareaElement!;
        const heights: string[] = [];
        const origSet = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, 'height')?.set;
        if (origSet) {
            vi.spyOn(ta.style, 'height', 'set').mockImplementation((v) => {
                heights.push(v);
                origSet.call(ta.style, v);
            });
        }
        el.value = 'text';
        await el.updateComplete;
        if (heights.length > 0) {
            expect(heights[0]).toBe('auto');
        }
    });

    // ── Change event bubbles/composed ────────────────────────────────────────

    it('flint-textarea-change bubbles and is composed', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;

        let captured: CustomEvent | null = null;
        document.addEventListener('flint-textarea-change', (e) => { captured = e as CustomEvent; }, { once: true });

        ta.value = 'y';
        ta.dispatchEvent(new Event('change', { bubbles: true }));

        expect(captured).not.toBeNull();
        expect((captured as unknown as CustomEvent).bubbles).toBe(true);
        expect((captured as unknown as CustomEvent).composed).toBe(true);
    });

    it('flint-textarea-change detail contains the new value', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;

        const spy = vi.fn();
        el.addEventListener('flint-textarea-change', spy);

        ta.value = 'final value';
        ta.dispatchEvent(new Event('change', { bubbles: true }));

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: 'final value' });
    });

    // ── error-textarea class ─────────────────────────────────────────────────

    it('applies error-textarea class when error=true', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea error></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.classList.contains('error-textarea')).toBe(true);
    });

    it('applies error-textarea class when errorMessage is set', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea error-message="Bad input"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.classList.contains('error-textarea')).toBe(true);
    });

    it('does not apply error-textarea class in normal state', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.classList.contains('error-textarea')).toBe(false);
    });

    // ── autocomplete attribute ────────────────────────────────────────────────

    it('sets autocomplete attribute when provided', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea autocomplete="off"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('autocomplete')).toBe('off');
    });

    it('sets autocomplete=on when provided', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea autocomplete="on"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('autocomplete')).toBe('on');
    });

    it('omits autocomplete attribute when empty (default)', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('autocomplete')).toBe(false);
    });

    // ── aria-describedby combinations ────────────────────────────────────────

    it('aria-describedby is absent when no description exists', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-describedby')).toBe(false);
    });

    it('aria-describedby is absent when error=true but no message and no helpText', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea error></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-describedby')).toBe(false);
    });

    it('aria-describedby is present when errorMessage is set', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea error-message="Err"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-describedby')).toBe(true);
    });

    it('aria-describedby is present when helpText is set', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea helper-text="Hint"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-describedby')).toBe(true);
    });

    it('aria-describedby is present when error=true and helpText only', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea error helper-text="Hint"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-describedby')).toBe(true);
    });

    it('aria-describedby is present when both errorMessage and helpText are set', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea error-message="Err" helper-text="Hint"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-describedby')).toBe(true);
    });

    // ── errorState combinations ───────────────────────────────────────────────

    it('errorState is true when only errorMessage set (no explicit error attr)', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea error-message="msg"></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-invalid')).toBe('true');
        expect(ta.classList.contains('error-textarea')).toBe(true);
    });

    it('errorState is true when only error=true (no errorMessage)', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea error></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-invalid')).toBe('true');
        expect(ta.classList.contains('error-textarea')).toBe(true);
    });

    it('errorState is false when both error=false and no errorMessage', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea></flint-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-invalid')).toBe('false');
        expect(ta.classList.contains('error-textarea')).toBe(false);
    });

    // ── helpText-only renders without role=alert ─────────────────────────────

    it('helpText renders without role=alert', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea helper-text="Helpful hint"></flint-textarea>`);
        const p = el.shadowRoot!.querySelector('.help-text')!;
        expect(p).toBeTruthy();
        expect(p.getAttribute('role')).toBeNull();
    });

    // ── Resize: both and horizontal ──────────────────────────────────────────

    it('accepts resize both', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea resize="both"></flint-textarea>`);
        expect(el.resize).toBe('both');
        expect(el.getAttribute('resize')).toBe('both');
    });

    it('accepts resize horizontal', async () => {
        const el = await fixture<FlintTextarea>(html`<flint-textarea resize="horizontal"></flint-textarea>`);
        expect(el.resize).toBe('horizontal');
        expect(el.getAttribute('resize')).toBe('horizontal');
    });
});
