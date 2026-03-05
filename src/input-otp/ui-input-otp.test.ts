import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-input-otp.js';
import type {
    UiInputOtp,
    UiInputOtpSlot,
    UiInputOtpGroup,
    UiInputOtpSeparator,
} from './ui-input-otp.js';

/* ── helpers ─────────────────────────────────────────────────────── */

interface MakeOpts {
    value?: string;
    maxLength?: number;
    pattern?: string;
    disabled?: boolean;
    defaultValue?: string;
}

async function make({
    value = '',
    maxLength = 6,
    pattern = '',
    disabled = false,
    defaultValue = '',
}: MakeOpts = {}) {
    const el = await fixture<UiInputOtp>(html`
        <ui-input-otp
            .value=${value}
            .maxLength=${maxLength}
            .pattern=${pattern}
            .disabled=${disabled}
            .defaultValue=${defaultValue}
        >
            <ui-input-otp-group>
                <ui-input-otp-slot .index=${0}></ui-input-otp-slot>
                <ui-input-otp-slot .index=${1}></ui-input-otp-slot>
                <ui-input-otp-slot .index=${2}></ui-input-otp-slot>
            </ui-input-otp-group>
            <ui-input-otp-separator></ui-input-otp-separator>
            <ui-input-otp-group>
                <ui-input-otp-slot .index=${3}></ui-input-otp-slot>
                <ui-input-otp-slot .index=${4}></ui-input-otp-slot>
                <ui-input-otp-slot .index=${5}></ui-input-otp-slot>
            </ui-input-otp-group>
        </ui-input-otp>
    `);
    await el.updateComplete;
    return el;
}

function getSlots(el: UiInputOtp): UiInputOtpSlot[] {
    return Array.from(el.querySelectorAll('ui-input-otp-slot')) as UiInputOtpSlot[];
}

function getSlot(el: UiInputOtp, index: number): UiInputOtpSlot {
    return getSlots(el).find(s => s.index === index)!;
}

function getHiddenInput(el: UiInputOtp): HTMLInputElement {
    return el.shadowRoot!.querySelector('.hidden-input') as HTMLInputElement;
}

/** Simulate typing characters via keydown events (the component's primary input path). */
function typeChars(input: HTMLInputElement, chars: string) {
    for (const ch of chars) {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: ch, bubbles: true, cancelable: true }));
    }
}

function fireKey(input: HTMLInputElement, key: string) {
    input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

function firePaste(input: HTMLInputElement, text: string) {
    const event = Object.assign(
        new Event('paste', { bubbles: true, cancelable: true }),
        { clipboardData: { getData: () => text } }
    ) as unknown as ClipboardEvent;
    input.dispatchEvent(event);
}

/* ═══════════════════════════════════════════════════════════════════
   ui-input-otp-slot — rendering
══════════════════════════════════════════════════════════════════════ */
describe('ui-input-otp-slot — rendering', () => {
    it('renders a shadow root', async () => {
        const el = await fixture<UiInputOtpSlot>(html`
            <ui-input-otp-slot .index=${0}></ui-input-otp-slot>
        `);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('renders the char when set', async () => {
        const el = await fixture<UiInputOtpSlot>(html`
            <ui-input-otp-slot .index=${0} char="7"></ui-input-otp-slot>
        `);
        await el.updateComplete;
        // textContent includes <style> block — filter to text nodes only
        const text = Array.from(el.shadowRoot!.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent ?? '')
            .join('')
            .trim();
        expect(text).toBe('7');
    });

    it('renders a cursor div when active and char is empty', async () => {
        const el = await fixture<UiInputOtpSlot>(html`
            <ui-input-otp-slot .index=${0} .active=${true}></ui-input-otp-slot>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.cursor')).not.toBeNull();
    });

    it('renders nothing when not active and char is empty', async () => {
        const el = await fixture<UiInputOtpSlot>(html`
            <ui-input-otp-slot .index=${0}></ui-input-otp-slot>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.cursor')).toBeNull();
        // Only the <style> element should be present — no text nodes with content
        const text = Array.from(el.shadowRoot!.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent ?? '')
            .join('')
            .trim();
        expect(text).toBe('');
    });

    it('reflects invalid attribute', async () => {
        const el = await fixture<UiInputOtpSlot>(html`
            <ui-input-otp-slot .index=${0} .invalid=${true}></ui-input-otp-slot>
        `);
        await el.updateComplete;
        expect(el.hasAttribute('invalid')).toBe(true);
    });

    it('reflects active attribute', async () => {
        const el = await fixture<UiInputOtpSlot>(html`
            <ui-input-otp-slot .index=${0} .active=${true}></ui-input-otp-slot>
        `);
        await el.updateComplete;
        expect(el.hasAttribute('active')).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   ui-input-otp-group — rendering
══════════════════════════════════════════════════════════════════════ */
describe('ui-input-otp-group — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<UiInputOtpGroup>(html`
            <ui-input-otp-group></ui-input-otp-group>
        `);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   ui-input-otp-separator — rendering
══════════════════════════════════════════════════════════════════════ */
describe('ui-input-otp-separator — rendering', () => {
    it('renders a .bar element in shadow DOM', async () => {
        const el = await fixture<UiInputOtpSeparator>(html`
            <ui-input-otp-separator></ui-input-otp-separator>
        `);
        expect(el.shadowRoot!.querySelector('.bar')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   ui-input-otp — rendering
══════════════════════════════════════════════════════════════════════ */
describe('ui-input-otp — rendering', () => {
    it('renders a hidden input and a slot in shadow DOM', async () => {
        const el = await make();
        expect(el.shadowRoot!.querySelector('.hidden-input')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('hidden input has autocomplete="one-time-code"', async () => {
        const el = await make();
        expect(getHiddenInput(el).autocomplete).toBe('one-time-code');
    });

    it('hidden input has correct maxLength', async () => {
        const el = await make({ maxLength: 4 });
        expect(getHiddenInput(el).maxLength).toBe(4);
    });

    it('hidden input is disabled when component is disabled', async () => {
        const el = await make({ disabled: true });
        expect(getHiddenInput(el).disabled).toBe(true);
    });

    it('reflects disabled attribute on host', async () => {
        const el = await make({ disabled: true });
        expect(el.hasAttribute('disabled')).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   ui-input-otp — value initialization
══════════════════════════════════════════════════════════════════════ */
describe('ui-input-otp — value initialization', () => {
    it('starts with empty value by default', async () => {
        const el = await make();
        expect(el.value).toBe('');
    });

    it('initializes from the value prop', async () => {
        const el = await make({ value: '123' });
        expect(el.value).toBe('123');
    });

    it('initializes from defaultValue (uncontrolled)', async () => {
        const el = await make({ defaultValue: '456789' });
        await el.updateComplete;
        expect(el.value).toBe('456789');
    });

    it('clamps defaultValue to maxLength', async () => {
        const el = await make({ defaultValue: '12345678', maxLength: 6 });
        await el.updateComplete;
        expect(el.value).toBe('123456');
    });

    it('explicit value takes precedence over defaultValue', async () => {
        const el = await make({ value: '111', defaultValue: '999999' });
        await el.updateComplete;
        expect(el.value).toBe('111');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   ui-input-otp — slot sync
══════════════════════════════════════════════════════════════════════ */
describe('ui-input-otp — slot sync', () => {
    it('sets slot chars from initial value', async () => {
        const el = await make({ value: '123456' });
        await el.updateComplete;
        const slots = getSlots(el);
        for (const slot of slots) {
            expect(slot.char).toBe(String(slot.index + 1));
        }
    });

    it('empty slots have empty char', async () => {
        const el = await make({ value: '12' });
        expect(getSlot(el, 0).char).toBe('1');
        expect(getSlot(el, 1).char).toBe('2');
        expect(getSlot(el, 2).char).toBe('');
        expect(getSlot(el, 5).char).toBe('');
    });

    it('no slot is active when not focused', async () => {
        const el = await make({ value: '123' });
        const slots = getSlots(el);
        expect(slots.every(s => !s.active)).toBe(true);
    });

    it('slot at value.length is active when focused', async () => {
        const el = await make({ value: '123' });
        getHiddenInput(el).dispatchEvent(new FocusEvent('focus'));
        await el.updateComplete;
        expect(getSlot(el, 3).active).toBe(true);
        expect(getSlot(el, 2).active).toBe(false);
    });

    it('slot 0 is active when focused and value is empty', async () => {
        const el = await make();
        getHiddenInput(el).dispatchEvent(new FocusEvent('focus'));
        await el.updateComplete;
        expect(getSlot(el, 0).active).toBe(true);
    });

    it('last slot is active when value is full and focused', async () => {
        const el = await make({ value: '123456' });
        getHiddenInput(el).dispatchEvent(new FocusEvent('focus'));
        await el.updateComplete;
        expect(getSlot(el, 5).active).toBe(true);
    });

    it('no slot is active after blur', async () => {
        const el = await make({ value: '123' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        input.dispatchEvent(new FocusEvent('blur'));
        await el.updateComplete;
        expect(getSlots(el).every(s => !s.active)).toBe(true);
    });

    it('syncs slots when value is set externally (controlled)', async () => {
        const el = await make();
        el.value = '654321';
        await el.updateComplete;
        expect(getSlot(el, 0).char).toBe('6');
        expect(getSlot(el, 5).char).toBe('1');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   ui-input-otp — keyboard input
══════════════════════════════════════════════════════════════════════ */
describe('ui-input-otp — keyboard input', () => {
    it('updates value when typing characters', async () => {
        const el = await make();
        typeChars(getHiddenInput(el), '1234');
        await el.updateComplete;
        expect(el.value).toBe('1234');
    });

    it('fills all slots sequentially', async () => {
        const el = await make();
        typeChars(getHiddenInput(el), '123456');
        await el.updateComplete;
        expect(el.value).toBe('123456');
    });

    it('replaces the last slot when typing beyond maxLength', async () => {
        const el = await make({ maxLength: 4 });
        typeChars(getHiddenInput(el), '12345');
        await el.updateComplete;
        // 5th char replaces slot 3 (last slot)
        expect(el.value.length).toBe(4);
        expect(el.value.slice(0, 3)).toBe('123');
    });

    it('filters non-matching characters with a pattern', async () => {
        const el = await make({ pattern: '\\d' });
        typeChars(getHiddenInput(el), '1a2b3');
        await el.updateComplete;
        expect(el.value).toBe('123');
    });

    it('resets hidden input value after pattern filtering', async () => {
        const el = await make({ pattern: '\\d' });
        typeChars(getHiddenInput(el), '1a2b3');
        await el.updateComplete;
        expect(getHiddenInput(el).value).toBe('123');
    });

    it('updates slot chars after typing', async () => {
        const el = await make();
        typeChars(getHiddenInput(el), '42');
        await el.updateComplete;
        expect(getSlot(el, 0).char).toBe('4');
        expect(getSlot(el, 1).char).toBe('2');
        expect(getSlot(el, 2).char).toBe('');
    });

    it('replaces character at cursor when typing mid-value', async () => {
        // Pre-fill "123456", focus, move cursor to slot 2 (ArrowLeft x3), type "7"
        const el = await make({ value: '123456' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 5
        fireKey(input, 'ArrowLeft');
        fireKey(input, 'ArrowLeft');
        fireKey(input, 'ArrowLeft'); // cursor at 2
        typeChars(input, '7');       // replace slot 2 ("3") with "7"
        await el.updateComplete;
        expect(el.value).toBe('127456');
    });

    it('Backspace deletes the last char when cursor is at end', async () => {
        const el = await make({ value: '123' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 3
        fireKey(input, 'Backspace');
        await el.updateComplete;
        expect(el.value).toBe('12');
    });

    it('Backspace at cursor 0 does nothing', async () => {
        const el = await make({ value: '12' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 2
        fireKey(input, 'ArrowLeft');
        fireKey(input, 'ArrowLeft'); // cursor at 0
        fireKey(input, 'Backspace');
        await el.updateComplete;
        expect(el.value).toBe('12');
    });

    it('Delete removes the char at cursor position', async () => {
        const el = await make({ value: '123456' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 5
        fireKey(input, 'ArrowLeft');
        fireKey(input, 'ArrowLeft');
        fireKey(input, 'ArrowLeft'); // cursor at 2
        fireKey(input, 'Delete');    // delete slot 2 ("3")
        await el.updateComplete;
        expect(el.value).toBe('12456');
    });

    it('ArrowLeft moves cursor to the left', async () => {
        const el = await make({ value: '123' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 3
        fireKey(input, 'ArrowLeft');                  // cursor at 2
        // Now type to confirm cursor is at slot 2 (replaces '3')
        typeChars(input, '9');
        await el.updateComplete;
        expect(el.value).toBe('129');
    });

    it('ArrowRight moves cursor to the right', async () => {
        const el = await make({ value: '123' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));  // cursor at 3
        fireKey(input, 'ArrowLeft');
        fireKey(input, 'ArrowLeft'); // cursor at 1
        fireKey(input, 'ArrowRight'); // cursor at 2
        typeChars(input, '9');        // replace slot 2 ("3")
        await el.updateComplete;
        expect(el.value).toBe('129');
    });

    it('ArrowRight does not move past the end of the value', async () => {
        const el = await make({ value: '12' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 2
        fireKey(input, 'ArrowRight'); // should stay at 2
        // Slot 2 should still be active
        await el.updateComplete;
        expect(getSlot(el, 2).active).toBe(true);
    });

    it('Home key moves cursor to slot 0', async () => {
        const el = await make({ value: '123' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 3
        fireKey(input, 'Home');
        await el.updateComplete;
        expect(getSlot(el, 0).active).toBe(true);
        expect(getSlot(el, 1).active).toBe(false);
    });

    it('End key moves cursor to last filled position', async () => {
        const el = await make({ value: '123' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 3
        fireKey(input, 'Home'); // cursor at 0
        fireKey(input, 'End');  // cursor at 3 (min(3, 5))
        await el.updateComplete;
        expect(getSlot(el, 3).active).toBe(true);
        expect(getSlot(el, 0).active).toBe(false);
    });

    it('Backspace mid-value shifts chars left', async () => {
        // "123456" cursor at 2 → Backspace → deletes "2", shifts → "13456", cursor at 1
        const el = await make({ value: '123456' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 5
        fireKey(input, 'ArrowLeft');
        fireKey(input, 'ArrowLeft');
        fireKey(input, 'ArrowLeft'); // cursor at 2
        fireKey(input, 'Backspace'); // delete char at 1 ("2"), shift → "13456"
        await el.updateComplete;
        expect(el.value).toBe('13456');
        expect(getSlot(el, 1).active).toBe(true); // cursor moved to 1
    });

    it('Backspace on empty value does not fire ui-otp-change', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('ui-otp-change', spy);
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        fireKey(input, 'Backspace');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('Tab key is not intercepted (default not prevented)', async () => {
        const el = await make();
        const input = getHiddenInput(el);
        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        input.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
    });

    it('ui-otp-complete fires when replacing the last slot in a full value', async () => {
        const el = await make({ value: '123456', maxLength: 6 });
        const spy = vi.fn();
        el.addEventListener('ui-otp-complete', spy);
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 5
        typeChars(input, '9'); // replaces slot 5 ("6") → "123459"
        await el.updateComplete;
        expect(el.value).toBe('123459');
        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: '123459' });
    });

    it('Delete on empty-past-end does nothing', async () => {
        const el = await make({ value: '123' });
        const spy = vi.fn();
        el.addEventListener('ui-otp-change', spy);
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 3 (empty)
        fireKey(input, 'Delete'); // i >= val.length → no-op
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   ui-input-otp — paste handling
══════════════════════════════════════════════════════════════════════ */
describe('ui-input-otp — paste handling', () => {
    it('pastes a full value', async () => {
        const el = await make();
        firePaste(getHiddenInput(el), '123456');
        await el.updateComplete;
        expect(el.value).toBe('123456');
    });

    it('clamps pasted value to maxLength', async () => {
        const el = await make({ maxLength: 4 });
        firePaste(getHiddenInput(el), '12345678');
        await el.updateComplete;
        expect(el.value).toBe('1234');
    });

    it('filters paste through pattern', async () => {
        const el = await make({ pattern: '\\d' });
        firePaste(getHiddenInput(el), 'abc123def456');
        await el.updateComplete;
        expect(el.value).toBe('123456');
    });

    it('syncs slot chars after paste', async () => {
        const el = await make();
        firePaste(getHiddenInput(el), '987654');
        await el.updateComplete;
        expect(getSlot(el, 0).char).toBe('9');
        expect(getSlot(el, 5).char).toBe('4');
    });

    it('cursor is at min(filtered.length, maxLength-1) after paste', async () => {
        const el = await make({ maxLength: 6 });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        firePaste(input, '123'); // partial paste, 3 chars
        await el.updateComplete;
        // cursor should be at 3 (first empty slot)
        expect(getSlot(el, 3).active).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   ui-input-otp — events
══════════════════════════════════════════════════════════════════════ */
describe('ui-input-otp — events', () => {
    it('fires ui-otp-change when typing', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('ui-otp-change', spy);
        typeChars(getHiddenInput(el), '1');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: '1' });
    });

    it('fires ui-otp-change on paste', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('ui-otp-change', spy);
        firePaste(getHiddenInput(el), '456');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: '456' });
    });

    it('fires ui-otp-change on Backspace', async () => {
        const el = await make({ value: '123' });
        const spy = vi.fn();
        el.addEventListener('ui-otp-change', spy);
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        fireKey(input, 'Backspace');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: '12' });
    });

    it('fires ui-otp-complete when maxLength is reached via typing', async () => {
        const el = await make({ maxLength: 4 });
        const spy = vi.fn();
        el.addEventListener('ui-otp-complete', spy);
        typeChars(getHiddenInput(el), '1234');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: '1234' });
    });

    it('fires ui-otp-complete when maxLength is reached via paste', async () => {
        const el = await make({ maxLength: 6 });
        const spy = vi.fn();
        el.addEventListener('ui-otp-complete', spy);
        firePaste(getHiddenInput(el), '123456');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('does not fire ui-otp-complete when value is shorter than maxLength', async () => {
        const el = await make({ maxLength: 6 });
        const spy = vi.fn();
        el.addEventListener('ui-otp-complete', spy);
        typeChars(getHiddenInput(el), '123');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('ui-otp-change bubbles', async () => {
        const el = await make();
        const spy = vi.fn();
        document.addEventListener('ui-otp-change', spy, { once: true });
        typeChars(getHiddenInput(el), '1');
        await el.updateComplete;
        expect(spy).toHaveBeenCalled();
        document.removeEventListener('ui-otp-change', spy);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   ui-input-otp — disabled
══════════════════════════════════════════════════════════════════════ */
describe('ui-input-otp — disabled', () => {
    it('hidden input is disabled when component is disabled', async () => {
        const el = await make({ disabled: true });
        expect(getHiddenInput(el).disabled).toBe(true);
    });

    it('host has disabled attribute when disabled=true', async () => {
        const el = await make({ disabled: true });
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('host does not have disabled attribute when disabled=false', async () => {
        const el = await make({ disabled: false });
        expect(el.hasAttribute('disabled')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   ui-input-otp — inputMode
══════════════════════════════════════════════════════════════════════ */
describe('ui-input-otp — inputMode', () => {
    it('uses numeric inputMode when no pattern is set', async () => {
        const el = await make();
        expect(getHiddenInput(el).inputMode).toBe('numeric');
    });

    it('uses numeric inputMode for digit-only pattern', async () => {
        const el = await make({ pattern: '\\d' });
        expect(getHiddenInput(el).inputMode).toBe('numeric');
    });

    it('uses text inputMode for alphanumeric pattern', async () => {
        const el = await make({ pattern: '[a-zA-Z0-9]' });
        expect(getHiddenInput(el).inputMode).toBe('text');
    });

    it('uses text inputMode for letters-only pattern', async () => {
        const el = await make({ pattern: '[a-z]' });
        expect(getHiddenInput(el).inputMode).toBe('text');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   ui-input-otp — controlled mode
══════════════════════════════════════════════════════════════════════ */
describe('ui-input-otp — controlled mode', () => {
    it('updates slots when value changes externally', async () => {
        const el = await make({ value: '111' });
        el.value = '999';
        await el.updateComplete;
        expect(getSlot(el, 0).char).toBe('9');
        expect(getSlot(el, 1).char).toBe('9');
        expect(getSlot(el, 2).char).toBe('9');
    });

    it('clears all slot chars when value is set to empty', async () => {
        const el = await make({ value: '123456' });
        el.value = '';
        await el.updateComplete;
        expect(getSlots(el).every(s => s.char === '')).toBe(true);
    });

    it('syncs hidden input value when value is set externally', async () => {
        const el = await make();
        el.value = '777';
        await el.updateComplete;
        expect(getHiddenInput(el).value).toBe('777');
    });
});
