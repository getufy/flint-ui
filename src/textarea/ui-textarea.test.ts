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
});
