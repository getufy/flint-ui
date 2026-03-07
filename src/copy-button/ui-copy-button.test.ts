import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { UiCopyButton } from './ui-copy-button';

describe('ui-copy-button', () => {
    let writeTextMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        writeTextMock = vi.fn().mockResolvedValue(undefined);
        Object.assign(navigator, {
            clipboard: { writeText: writeTextMock },
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // ── Definition ──────────────────────────────────────────────
    it('is defined', () => {
        const el = document.createElement('ui-copy-button');
        expect(el).toBeInstanceOf(UiCopyButton);
    });

    // ── Default rendering ───────────────────────────────────────
    it('renders with default values', async () => {
        const el = await fixture<UiCopyButton>(html`<ui-copy-button></ui-copy-button>`);
        expect(el.value).toBe('');
        expect(el.from).toBe('');
        expect(el.disabled).toBe(false);
        expect(el.copyLabel).toBe('Copy');
        expect(el.successLabel).toBe('Copied!');
        expect(el.errorLabel).toBe('Error');
        expect(el.feedbackDuration).toBe(1000);
        expect(el.tooltipPlacement).toBe('top');

        const btn = el.shadowRoot!.querySelector('button');
        expect(btn).toBeTruthy();
        expect(btn!.getAttribute('aria-label')).toBe('Copy');
    });

    // ── Disabled ────────────────────────────────────────────────
    it('reflects disabled attribute', async () => {
        const el = await fixture<UiCopyButton>(html`<ui-copy-button disabled></ui-copy-button>`);
        expect(el.disabled).toBe(true);
        expect(el.hasAttribute('disabled')).toBe(true);

        const btn = el.shadowRoot!.querySelector('button');
        expect(btn!.disabled).toBe(true);
    });

    it('does not copy when disabled', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test" disabled></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        expect(writeTextMock).not.toHaveBeenCalled();
    });

    // ── Copy from value ─────────────────────────────────────────
    it('copies the value property', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="hello world"></ui-copy-button>`,
        );
        const spy = vi.fn();
        el.addEventListener('ui-copy', spy);

        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;

        // Give the async clipboard call time to resolve
        await new Promise((r) => setTimeout(r, 0));

        expect(writeTextMock).toHaveBeenCalledWith('hello world');
        expect(spy).toHaveBeenCalledOnce();
    });

    // ── Copy from element textContent ───────────────────────────
    it('copies textContent from referenced element', async () => {
        const target = document.createElement('span');
        target.id = 'copy-target';
        target.textContent = 'Target text';
        document.body.appendChild(target);

        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button from="copy-target"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        expect(writeTextMock).toHaveBeenCalledWith('Target text');
        target.remove();
    });

    // ── Copy from element attribute ─────────────────────────────
    it('copies attribute from referenced element', async () => {
        const target = document.createElement('a');
        target.id = 'link-target';
        target.setAttribute('href', 'https://example.com');
        document.body.appendChild(target);

        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button from="link-target[href]"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        expect(writeTextMock).toHaveBeenCalledWith('https://example.com');
        target.remove();
    });

    // ── Copy from element property ──────────────────────────────
    it('copies property from referenced element', async () => {
        const target = document.createElement('input');
        target.id = 'input-target';
        target.value = 'Input value';
        document.body.appendChild(target);

        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button from="input-target.value"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        expect(writeTextMock).toHaveBeenCalledWith('Input value');
        target.remove();
    });

    // ── from takes precedence over value ────────────────────────
    it('from takes precedence over value', async () => {
        const target = document.createElement('span');
        target.id = 'precedence-target';
        target.textContent = 'From text';
        document.body.appendChild(target);

        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="Value text" from="precedence-target"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        expect(writeTextMock).toHaveBeenCalledWith('From text');
        target.remove();
    });

    // ── Error: empty value ──────────────────────────────────────
    it('fires ui-copy-error on empty value', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value=""></ui-copy-button>`,
        );
        const spy = vi.fn();
        el.addEventListener('ui-copy-error', spy);

        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        expect(writeTextMock).not.toHaveBeenCalled();
        expect(spy).toHaveBeenCalledOnce();
    });

    // ── Error: missing from target ──────────────────────────────
    it('fires ui-copy-error when from target does not exist', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button from="nonexistent-id"></ui-copy-button>`,
        );
        const spy = vi.fn();
        el.addEventListener('ui-copy-error', spy);

        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        expect(writeTextMock).not.toHaveBeenCalled();
        expect(spy).toHaveBeenCalledOnce();
    });

    // ── Error: clipboard rejection ──────────────────────────────
    it('fires ui-copy-error when clipboard rejects', async () => {
        writeTextMock.mockRejectedValueOnce(new Error('Not allowed'));

        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="fail"></ui-copy-button>`,
        );
        const spy = vi.fn();
        el.addEventListener('ui-copy-error', spy);

        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        expect(spy).toHaveBeenCalledOnce();
    });

    // ── Feedback states ─────────────────────────────────────────
    it('shows success icon after copy', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));
        await el.updateComplete;

        const successIcon = el.shadowRoot!.querySelector('.icon--success');
        expect(successIcon).toBeTruthy();
    });

    it('shows error icon on failure', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value=""></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;

        const errorIcon = el.shadowRoot!.querySelector('.icon--error');
        expect(errorIcon).toBeTruthy();
    });

    it('restores idle state after feedback duration', async () => {
        vi.useFakeTimers();

        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test" feedback-duration="200"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await vi.advanceTimersByTimeAsync(0);
        await el.updateComplete;

        // Should be in success state
        expect(el.shadowRoot!.querySelector('.icon--success')).toBeTruthy();

        // Advance past feedback duration
        await vi.advanceTimersByTimeAsync(250);
        await el.updateComplete;

        // Should be back to idle
        expect(el.shadowRoot!.querySelector('.icon--success')).toBeFalsy();
        expect(el.shadowRoot!.querySelector('.icon--error')).toBeFalsy();

        vi.useRealTimers();
    });

    // ── Tooltip ─────────────────────────────────────────────────
    it('shows tooltip on hover', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;

        btn.dispatchEvent(new MouseEvent('mouseenter'));
        await el.updateComplete;

        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip).toBeTruthy();
        expect(tooltip!.classList.contains('tooltip--visible')).toBe(true);
        expect(tooltip!.textContent).toBe('Copy');

        btn.dispatchEvent(new MouseEvent('mouseleave'));
        await el.updateComplete;

        expect(tooltip!.classList.contains('tooltip--visible')).toBe(false);
    });

    it('shows tooltip on focus', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;

        btn.dispatchEvent(new FocusEvent('focus'));
        await el.updateComplete;

        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip!.classList.contains('tooltip--visible')).toBe(true);

        btn.dispatchEvent(new FocusEvent('blur'));
        await el.updateComplete;

        expect(tooltip!.classList.contains('tooltip--visible')).toBe(false);
    });

    // ── Tooltip placement ───────────────────────────────────────
    it('applies tooltip placement class', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test" tooltip-placement="bottom"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.dispatchEvent(new MouseEvent('mouseenter'));
        await el.updateComplete;

        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip!.classList.contains('tooltip--bottom')).toBe(true);
    });

    // ── Custom labels ───────────────────────────────────────────
    it('uses custom copy label', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test" copy-label="Click to copy"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        expect(btn.getAttribute('aria-label')).toBe('Click to copy');

        btn.dispatchEvent(new MouseEvent('mouseenter'));
        await el.updateComplete;
        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip!.textContent).toBe('Click to copy');
    });

    it('uses custom success label after copy', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test" success-label="Done!"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));
        await el.updateComplete;

        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip!.textContent).toBe('Done!');
    });

    it('uses custom error label on failure', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="" error-label="Failed!"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;

        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip!.textContent).toBe('Failed!');
    });

    // ── Slots ───────────────────────────────────────────────────
    it('renders copy-icon slot', async () => {
        const el = await fixture<UiCopyButton>(html`
            <ui-copy-button value="test">
                <span slot="copy-icon" class="custom-copy">C</span>
            </ui-copy-button>
        `);
        const slot = el.shadowRoot!.querySelector('slot[name="copy-icon"]') as HTMLSlotElement;
        expect(slot).toBeTruthy();
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect(assigned[0].textContent).toBe('C');
    });

    // ── Part attribute ──────────────────────────────────────────
    it('exposes button part', async () => {
        const el = await fixture<UiCopyButton>(html`<ui-copy-button></ui-copy-button>`);
        const btn = el.shadowRoot!.querySelector('[part="button"]');
        expect(btn).toBeTruthy();
    });

    it('exposes copy-icon part', async () => {
        const el = await fixture<UiCopyButton>(html`<ui-copy-button></ui-copy-button>`);
        const icon = el.shadowRoot!.querySelector('[part="copy-icon"]');
        expect(icon).toBeTruthy();
    });

    // ── Accessibility ───────────────────────────────────────────
    it('has role=tooltip on tooltip element', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.dispatchEvent(new MouseEvent('mouseenter'));
        await el.updateComplete;

        const tooltip = el.shadowRoot!.querySelector('[role="tooltip"]');
        expect(tooltip).toBeTruthy();
    });

    it('updates aria-label based on current state', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test" copy-label="Copy it" success-label="Done"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        expect(btn.getAttribute('aria-label')).toBe('Copy it');

        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));
        await el.updateComplete;

        expect(btn.getAttribute('aria-label')).toBe('Done');
    });

    // ── Disconnect cleanup ──────────────────────────────────────
    it('cleans up feedback timer on disconnect', async () => {
        vi.useFakeTimers();

        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test" feedback-duration="5000"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await vi.advanceTimersByTimeAsync(0);

        // Disconnect while feedback timer is active
        el.remove();

        // Should not throw when timer fires
        await vi.advanceTimersByTimeAsync(6000);

        vi.useRealTimers();
    });

    // ── Events bubble and are composed ──────────────────────────
    it('ui-copy event bubbles and is composed', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test"></ui-copy-button>`,
        );
        const spy = vi.fn();
        el.addEventListener('ui-copy', spy);

        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        const event = spy.mock.calls[0][0] as CustomEvent;
        expect(event.bubbles).toBe(true);
        expect(event.composed).toBe(true);
    });

    it('ui-copy-error event bubbles and is composed', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value=""></ui-copy-button>`,
        );
        const spy = vi.fn();
        el.addEventListener('ui-copy-error', spy);

        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        const event = spy.mock.calls[0][0] as CustomEvent;
        expect(event.bubbles).toBe(true);
        expect(event.composed).toBe(true);
    });

    // ── Event detail ─────────────────────────────────────────────
    it('ui-copy event includes copied value in detail', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="detail-test"></ui-copy-button>`,
        );
        const spy = vi.fn();
        el.addEventListener('ui-copy', spy);

        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        const event = spy.mock.calls[0][0] as CustomEvent;
        expect(event.detail).toEqual({ value: 'detail-test' });
    });

    it('ui-copy-error event includes reason "empty" for empty value', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value=""></ui-copy-button>`,
        );
        const spy = vi.fn();
        el.addEventListener('ui-copy-error', spy);

        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        const event = spy.mock.calls[0][0] as CustomEvent;
        expect(event.detail).toEqual({ reason: 'empty' });
    });

    it('ui-copy-error event includes reason "clipboard" on clipboard rejection', async () => {
        writeTextMock.mockRejectedValueOnce(new Error('Not allowed'));

        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="fail"></ui-copy-button>`,
        );
        const spy = vi.fn();
        el.addEventListener('ui-copy-error', spy);

        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        const event = spy.mock.calls[0][0] as CustomEvent;
        expect(event.detail).toEqual({ reason: 'clipboard' });
    });

    // ── Slots: success-icon and error-icon ───────────────────────
    it('renders success-icon slot after copy', async () => {
        const el = await fixture<UiCopyButton>(html`
            <ui-copy-button value="test">
                <span slot="success-icon" class="custom-success">OK</span>
            </ui-copy-button>
        `);
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));
        await el.updateComplete;

        const slot = el.shadowRoot!.querySelector('slot[name="success-icon"]') as HTMLSlotElement;
        expect(slot).toBeTruthy();
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect(assigned[0].textContent).toBe('OK');
    });

    it('renders error-icon slot on error', async () => {
        const el = await fixture<UiCopyButton>(html`
            <ui-copy-button value="">
                <span slot="error-icon" class="custom-error">X</span>
            </ui-copy-button>
        `);
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;

        const slot = el.shadowRoot!.querySelector('slot[name="error-icon"]') as HTMLSlotElement;
        expect(slot).toBeTruthy();
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect(assigned[0].textContent).toBe('X');
    });

    // ── Parts: success-icon and error-icon ───────────────────────
    it('exposes success-icon part after copy', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));
        await el.updateComplete;

        const part = el.shadowRoot!.querySelector('[part="success-icon"]');
        expect(part).toBeTruthy();
    });

    it('exposes error-icon part on error', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value=""></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;

        const part = el.shadowRoot!.querySelector('[part="error-icon"]');
        expect(part).toBeTruthy();
    });

    // ── Rapid double-click ───────────────────────────────────────
    it('resets feedback timer on rapid double-click', async () => {
        vi.useFakeTimers();

        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test" feedback-duration="300"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;

        // First click
        btn.click();
        await el.updateComplete;
        await vi.advanceTimersByTimeAsync(0);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.icon--success')).toBeTruthy();

        // Second click at 200ms (before 300ms duration expires)
        await vi.advanceTimersByTimeAsync(200);
        btn.click();
        await el.updateComplete;
        await vi.advanceTimersByTimeAsync(0);
        await el.updateComplete;

        // Should still be in success state (timer restarted)
        expect(el.shadowRoot!.querySelector('.icon--success')).toBeTruthy();

        // At 200ms after second click, still in success
        await vi.advanceTimersByTimeAsync(200);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.icon--success')).toBeTruthy();

        // At 350ms after second click, should be back to idle
        await vi.advanceTimersByTimeAsync(150);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.icon--success')).toBeFalsy();

        vi.useRealTimers();
    });

    // ── from edge cases ──────────────────────────────────────────
    it('fires error when from element exists but attribute does not', async () => {
        const target = document.createElement('span');
        target.id = 'attr-missing';
        document.body.appendChild(target);

        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button from="attr-missing[data-nonexistent]"></ui-copy-button>`,
        );
        const spy = vi.fn();
        el.addEventListener('ui-copy-error', spy);

        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        expect(writeTextMock).not.toHaveBeenCalled();
        expect(spy).toHaveBeenCalledOnce();
        target.remove();
    });

    it('fires error when from element property is null', async () => {
        const target = document.createElement('div');
        target.id = 'prop-null';
        document.body.appendChild(target);

        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button from="prop-null.nonexistentProp"></ui-copy-button>`,
        );
        const spy = vi.fn();
        el.addEventListener('ui-copy-error', spy);

        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));

        expect(writeTextMock).not.toHaveBeenCalled();
        expect(spy).toHaveBeenCalledOnce();
        target.remove();
    });

    // ── Tooltip during feedback ──────────────────────────────────
    it('tooltip stays visible during feedback state', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));
        await el.updateComplete;

        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip).toBeTruthy();
        expect(tooltip!.classList.contains('tooltip--visible')).toBe(true);
        expect(tooltip!.textContent).toBe('Copied!');
    });

    it('tooltip does not hide on mouseleave during feedback', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;

        btn.click();
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, 0));
        await el.updateComplete;

        // Mouseleave while in success state should NOT hide tooltip
        btn.dispatchEvent(new MouseEvent('mouseleave'));
        await el.updateComplete;

        const tooltip = el.shadowRoot!.querySelector('.tooltip');
        expect(tooltip!.classList.contains('tooltip--visible')).toBe(true);
    });

    // ── aria-describedby ─────────────────────────────────────────
    it('sets aria-describedby when tooltip is visible', async () => {
        const el = await fixture<UiCopyButton>(
            html`<ui-copy-button value="test"></ui-copy-button>`,
        );
        const btn = el.shadowRoot!.querySelector('button') as HTMLButtonElement;

        // Not set when tooltip is hidden
        expect(btn.hasAttribute('aria-describedby')).toBe(false);

        // Show tooltip via hover
        btn.dispatchEvent(new MouseEvent('mouseenter'));
        await el.updateComplete;

        expect(btn.hasAttribute('aria-describedby')).toBe(true);
        const tooltipId = btn.getAttribute('aria-describedby')!;
        const tooltip = el.shadowRoot!.getElementById(tooltipId);
        expect(tooltip).toBeTruthy();
        expect(tooltip!.getAttribute('role')).toBe('tooltip');
    });
});
