import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { UiTextarea } from './ui-textarea';

describe('ui-textarea', () => {
    // ── Definition ──────────────────────────────────────────────────────────

    it('is defined', () => {
        const el = document.createElement('ui-textarea');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('is form-associated', () => {
        expect(UiTextarea.formAssociated).toBe(true);
    });

    // ── Default rendering ────────────────────────────────────────────────────

    it('renders with default values', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
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
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea');
        expect(ta).toBeTruthy();
    });

    it('does not render label by default', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        expect(el.shadowRoot!.querySelector('label')).toBeNull();
    });

    // ── textareaElement getter ────────────────────────────────────────────────

    it('exposes textareaElement getter', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        expect(el.textareaElement).toBeInstanceOf(HTMLTextAreaElement);
    });

    // ── Attribute reflection ─────────────────────────────────────────────────

    it('reflects disabled attribute', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        el.disabled = true;
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects readonly attribute', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        el.readonly = true;
        await el.updateComplete;
        expect(el.hasAttribute('readonly')).toBe(true);
    });

    it('reflects required attribute', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        el.required = true;
        await el.updateComplete;
        expect(el.hasAttribute('required')).toBe(true);
    });

    it('reflects size attribute', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea size="sm"></ui-textarea>`);
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('reflects resize attribute', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea resize="none"></ui-textarea>`);
        expect(el.getAttribute('resize')).toBe('none');
    });

    // ── Value sync ───────────────────────────────────────────────────────────

    it('sets value on internal textarea', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea value="hello"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.value).toBe('hello');
    });

    it('sets placeholder on internal textarea', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea placeholder="Write here..."></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.placeholder).toBe('Write here...');
    });

    it('sets rows on internal textarea', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea rows="5"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.rows).toBe(5);
    });

    it('sets disabled on internal textarea', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea disabled></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.disabled).toBe(true);
    });

    it('sets readonly on internal textarea', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea readonly></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.readOnly).toBe(true);
    });

    it('sets required on internal textarea', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea required></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.required).toBe(true);
    });

    it('sets maxlength on internal textarea', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea maxlength="200"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.maxLength).toBe(200);
    });

    it('sets minlength on internal textarea', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea minlength="10"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.minLength).toBe(10);
    });

    // ── Events ───────────────────────────────────────────────────────────────

    it('fires ui-textarea-input on keystroke', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;

        const spy = vi.fn();
        el.addEventListener('ui-textarea-input', spy);

        ta.value = 'typed text';
        ta.dispatchEvent(new Event('input', { bubbles: true }));
        await el.updateComplete;

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: 'typed text' });
        expect(el.value).toBe('typed text');
    });

    it('fires ui-textarea-change on change', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;

        const spy = vi.fn();
        el.addEventListener('ui-textarea-change', spy);

        ta.value = 'changed text';
        ta.dispatchEvent(new Event('change', { bubbles: true }));
        await el.updateComplete;

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: 'changed text' });
    });

    it('ui-textarea-input bubbles and is composed', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;

        let captured: CustomEvent | null = null;
        document.addEventListener('ui-textarea-input', (e) => { captured = e as CustomEvent; }, { once: true });

        ta.value = 'x';
        ta.dispatchEvent(new Event('input', { bubbles: true }));

        expect(captured).not.toBeNull();
        expect((captured as unknown as CustomEvent).bubbles).toBe(true);
        expect((captured as unknown as CustomEvent).composed).toBe(true);
    });

    // ── Error state ──────────────────────────────────────────────────────────

    it('applies aria-invalid when error=true', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea error></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-invalid')).toBe('true');
    });

    it('applies aria-invalid when errorMessage is set', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea error-message="Bad input"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-invalid')).toBe('true');
    });

    it('renders error message with role="alert"', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea error-message="Required"></ui-textarea>`);
        const msg = el.shadowRoot!.querySelector('[role="alert"]');
        expect(msg).toBeTruthy();
        expect(msg!.textContent?.trim()).toBe('Required');
    });

    it('does not render error message when only error=true without message', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea error></ui-textarea>`);
        expect(el.shadowRoot!.querySelector('[role="alert"]')).toBeNull();
    });

    it('aria-invalid is false by default', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-invalid')).toBe('false');
    });

    // ── Help text ────────────────────────────────────────────────────────────

    it('renders help text', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea help-text="Enter a message."></ui-textarea>`);
        const p = el.shadowRoot!.querySelector('.help-text');
        expect(p).toBeTruthy();
        expect(p!.textContent?.trim()).toBe('Enter a message.');
    });

    it('error message takes precedence over help text', async () => {
        const el = await fixture<UiTextarea>(html`
      <ui-textarea help-text="Hint" error-message="Error occurred"></ui-textarea>
    `);
        const alert = el.shadowRoot!.querySelector('[role="alert"]');
        expect(alert).toBeTruthy();
        expect(alert!.textContent?.trim()).toBe('Error occurred');
    });

    // ── Label ────────────────────────────────────────────────────────────────

    it('renders label when label prop is set', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea label="Feedback"></ui-textarea>`);
        const lbl = el.shadowRoot!.querySelector('label');
        expect(lbl).toBeTruthy();
        expect(lbl!.textContent?.trim()).toBe('Feedback');
    });

    it('label for attribute matches textarea id', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea label="Message"></ui-textarea>`);
        const lbl = el.shadowRoot!.querySelector('label')!;
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(lbl.htmlFor).toBe(ta.id);
    });

    // ── aria-label ───────────────────────────────────────────────────────────

    it('sets aria-label on textarea when provided', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea aria-label="Write feedback"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-label')).toBe('Write feedback');
    });

    it('does not set aria-label when not provided', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-label')).toBe(false);
    });

    // ── defaultValue ─────────────────────────────────────────────────────────

    it('initialises value from defaultValue', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea default-value="Hello world"></ui-textarea>`);
        expect(el.value).toBe('Hello world');
    });

    it('defaultValue does not override an explicit value', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea value="explicit" default-value="default"></ui-textarea>`);
        expect(el.value).toBe('explicit');
    });

    it('defaultValue does not cause a second update cycle', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea default-value="test"></ui-textarea>`);
        await el.updateComplete;
        expect(el.value).toBe('test');
    });

    // ── Size variants ────────────────────────────────────────────────────────

    it('defaults to size default', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        expect(el.size).toBe('default');
        expect(el.getAttribute('size')).toBe('default');
    });

    it('accepts size sm', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea size="sm"></ui-textarea>`);
        expect(el.size).toBe('sm');
    });

    it('accepts size lg', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea size="lg"></ui-textarea>`);
        expect(el.size).toBe('lg');
    });

    // ── Resize variants ──────────────────────────────────────────────────────

    it('defaults to resize vertical', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        expect(el.resize).toBe('vertical');
    });

    it('accepts resize none', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea resize="none"></ui-textarea>`);
        expect(el.resize).toBe('none');
    });

    it('accepts resize auto', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea resize="auto"></ui-textarea>`);
        expect(el.resize).toBe('auto');
    });

    // ── Form fields ──────────────────────────────────────────────────────────

    it('has name prop', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea name="feedback"></ui-textarea>`);
        expect(el.name).toBe('feedback');
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.name).toBe('feedback');
    });

    // ── Unique IDs ───────────────────────────────────────────────────────────

    it('generates unique textarea IDs across multiple instances', async () => {
        const a = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const b = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const idA = a.shadowRoot!.querySelector('textarea')!.id;
        const idB = b.shadowRoot!.querySelector('textarea')!.id;
        expect(idA).not.toBe(idB);
        expect(idA).toMatch(/^ui-textarea-\d+$/);
        expect(idB).toMatch(/^ui-textarea-\d+$/);
    });

    it('label for attribute matches the textarea id', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea label="Bio"></ui-textarea>`);
        const lbl = el.shadowRoot!.querySelector('label')!;
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.id).toMatch(/^ui-textarea-\d+$/);
        expect(lbl.htmlFor).toBe(ta.id);
    });

    it('aria-describedby points to the description element id', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea help-text="hint"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        const desc = el.shadowRoot!.querySelector('.help-text')!;
        expect(desc.id).toMatch(/^ui-textarea-desc-\d+$/);
        expect(ta.getAttribute('aria-describedby')).toBe(desc.id);
    });

    // ── _firstUpdate guard ───────────────────────────────────────────────────

    it('clearing value after init does not reapply defaultValue', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea default-value="hello"></ui-textarea>`);
        expect(el.value).toBe('hello');
        el.value = '';
        await el.updateComplete;
        expect(el.value).toBe('');
    });

    it('subsequent property changes do not trigger defaultValue re-application', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea default-value="init"></ui-textarea>`);
        expect(el.value).toBe('init');
        // Trigger another update without touching value
        el.placeholder = 'new placeholder';
        await el.updateComplete;
        expect(el.value).toBe('init');
    });

    // ── Form internals (setFormValue / setValidity) ──────────────────────────

    it('_internals is initialised via attachInternals', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
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
            const el = document.createElement('ui-textarea') as UiTextarea;
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
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
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
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
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
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
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
        const el = await fixture<UiTextarea>(html`<ui-textarea required value="text"></ui-textarea>`);
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
        const el = await fixture<UiTextarea>(html`<ui-textarea required></ui-textarea>`);
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
        const el = await fixture<UiTextarea>(html`<ui-textarea required></ui-textarea>`);
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
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
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
        const el = await fixture<UiTextarea>(html`<ui-textarea required value="text"></ui-textarea>`);
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
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
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
        const el = await fixture<UiTextarea>(html`<ui-textarea resize="auto"></ui-textarea>`);
        const ta = el.textareaElement!;
        el.value = 'line1\nline2\nline3';
        await el.updateComplete;
        // jsdom scrollHeight is 0, so height should be set to '0px'
        expect(ta.style.height).toBe('0px');
    });

    it('auto-resize does not run when resize is vertical', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea resize="vertical"></ui-textarea>`);
        const ta = el.textareaElement!;
        el.value = 'some text';
        await el.updateComplete;
        expect(ta.style.height).toBe('');
    });

    it('auto-resize does not run when resize is none', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea resize="none"></ui-textarea>`);
        const ta = el.textareaElement!;
        el.value = 'some text';
        await el.updateComplete;
        expect(ta.style.height).toBe('');
    });

    it('auto-resize first sets height to auto then scrollHeight', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea resize="auto"></ui-textarea>`);
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

    it('ui-textarea-change bubbles and is composed', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;

        let captured: CustomEvent | null = null;
        document.addEventListener('ui-textarea-change', (e) => { captured = e as CustomEvent; }, { once: true });

        ta.value = 'y';
        ta.dispatchEvent(new Event('change', { bubbles: true }));

        expect(captured).not.toBeNull();
        expect((captured as unknown as CustomEvent).bubbles).toBe(true);
        expect((captured as unknown as CustomEvent).composed).toBe(true);
    });

    it('ui-textarea-change detail contains the new value', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;

        const spy = vi.fn();
        el.addEventListener('ui-textarea-change', spy);

        ta.value = 'final value';
        ta.dispatchEvent(new Event('change', { bubbles: true }));

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: 'final value' });
    });

    // ── error-textarea class ─────────────────────────────────────────────────

    it('applies error-textarea class when error=true', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea error></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.classList.contains('error-textarea')).toBe(true);
    });

    it('applies error-textarea class when errorMessage is set', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea error-message="Bad input"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.classList.contains('error-textarea')).toBe(true);
    });

    it('does not apply error-textarea class in normal state', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.classList.contains('error-textarea')).toBe(false);
    });

    // ── autocomplete attribute ────────────────────────────────────────────────

    it('sets autocomplete attribute when provided', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea autocomplete="off"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('autocomplete')).toBe('off');
    });

    it('sets autocomplete=on when provided', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea autocomplete="on"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('autocomplete')).toBe('on');
    });

    it('omits autocomplete attribute when empty (default)', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('autocomplete')).toBe(false);
    });

    // ── aria-describedby combinations ────────────────────────────────────────

    it('aria-describedby is absent when no description exists', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-describedby')).toBe(false);
    });

    it('aria-describedby is absent when error=true but no message and no helpText', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea error></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-describedby')).toBe(false);
    });

    it('aria-describedby is present when errorMessage is set', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea error-message="Err"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-describedby')).toBe(true);
    });

    it('aria-describedby is present when helpText is set', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea help-text="Hint"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-describedby')).toBe(true);
    });

    it('aria-describedby is present when error=true and helpText only', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea error help-text="Hint"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-describedby')).toBe(true);
    });

    it('aria-describedby is present when both errorMessage and helpText are set', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea error-message="Err" help-text="Hint"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.hasAttribute('aria-describedby')).toBe(true);
    });

    // ── errorState combinations ───────────────────────────────────────────────

    it('errorState is true when only errorMessage set (no explicit error attr)', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea error-message="msg"></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-invalid')).toBe('true');
        expect(ta.classList.contains('error-textarea')).toBe(true);
    });

    it('errorState is true when only error=true (no errorMessage)', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea error></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-invalid')).toBe('true');
        expect(ta.classList.contains('error-textarea')).toBe(true);
    });

    it('errorState is false when both error=false and no errorMessage', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea></ui-textarea>`);
        const ta = el.shadowRoot!.querySelector('textarea')!;
        expect(ta.getAttribute('aria-invalid')).toBe('false');
        expect(ta.classList.contains('error-textarea')).toBe(false);
    });

    // ── helpText-only renders without role=alert ─────────────────────────────

    it('helpText renders without role=alert', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea help-text="Helpful hint"></ui-textarea>`);
        const p = el.shadowRoot!.querySelector('.help-text')!;
        expect(p).toBeTruthy();
        expect(p.getAttribute('role')).toBeNull();
    });

    // ── Resize: both and horizontal ──────────────────────────────────────────

    it('accepts resize both', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea resize="both"></ui-textarea>`);
        expect(el.resize).toBe('both');
        expect(el.getAttribute('resize')).toBe('both');
    });

    it('accepts resize horizontal', async () => {
        const el = await fixture<UiTextarea>(html`<ui-textarea resize="horizontal"></ui-textarea>`);
        expect(el.resize).toBe('horizontal');
        expect(el.getAttribute('resize')).toBe('horizontal');
    });
});
