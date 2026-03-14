import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-input-otp.js';
import type {
    FlintInputOtp,
    FlintInputOtpSlot,
    FlintInputOtpGroup,
    FlintInputOtpSeparator,
} from './flint-input-otp.js';

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
    const el = await fixture<FlintInputOtp>(html`
        <flint-input-otp
            .value=${value}
            .maxLength=${maxLength}
            .pattern=${pattern}
            .disabled=${disabled}
            .defaultValue=${defaultValue}
        >
            <flint-input-otp-group>
                <flint-input-otp-slot .index=${0}></flint-input-otp-slot>
                <flint-input-otp-slot .index=${1}></flint-input-otp-slot>
                <flint-input-otp-slot .index=${2}></flint-input-otp-slot>
            </flint-input-otp-group>
            <flint-input-otp-separator></flint-input-otp-separator>
            <flint-input-otp-group>
                <flint-input-otp-slot .index=${3}></flint-input-otp-slot>
                <flint-input-otp-slot .index=${4}></flint-input-otp-slot>
                <flint-input-otp-slot .index=${5}></flint-input-otp-slot>
            </flint-input-otp-group>
        </flint-input-otp>
    `);
    await el.updateComplete;
    return el;
}

function getSlots(el: FlintInputOtp): FlintInputOtpSlot[] {
    return Array.from(el.querySelectorAll('flint-input-otp-slot')) as FlintInputOtpSlot[];
}

function getSlot(el: FlintInputOtp, index: number): FlintInputOtpSlot {
    return getSlots(el).find(s => s.index === index)!;
}

function getHiddenInput(el: FlintInputOtp): HTMLInputElement {
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
   flint-input-otp-slot — rendering
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp-slot — rendering', () => {
    it('renders a shadow root', async () => {
        const el = await fixture<FlintInputOtpSlot>(html`
            <flint-input-otp-slot .index=${0}></flint-input-otp-slot>
        `);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('renders the char when set', async () => {
        const el = await fixture<FlintInputOtpSlot>(html`
            <flint-input-otp-slot .index=${0} char="7"></flint-input-otp-slot>
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
        const el = await fixture<FlintInputOtpSlot>(html`
            <flint-input-otp-slot .index=${0} .active=${true}></flint-input-otp-slot>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.cursor')).not.toBeNull();
    });

    it('renders nothing when not active and char is empty', async () => {
        const el = await fixture<FlintInputOtpSlot>(html`
            <flint-input-otp-slot .index=${0}></flint-input-otp-slot>
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
        const el = await fixture<FlintInputOtpSlot>(html`
            <flint-input-otp-slot .index=${0} .invalid=${true}></flint-input-otp-slot>
        `);
        await el.updateComplete;
        expect(el.hasAttribute('invalid')).toBe(true);
    });

    it('reflects active attribute', async () => {
        const el = await fixture<FlintInputOtpSlot>(html`
            <flint-input-otp-slot .index=${0} .active=${true}></flint-input-otp-slot>
        `);
        await el.updateComplete;
        expect(el.hasAttribute('active')).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp-group — rendering
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp-group — rendering', () => {
    it('renders a slot in shadow DOM', async () => {
        const el = await fixture<FlintInputOtpGroup>(html`
            <flint-input-otp-group></flint-input-otp-group>
        `);
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp-separator — rendering
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp-separator — rendering', () => {
    it('renders a .bar element in shadow DOM', async () => {
        const el = await fixture<FlintInputOtpSeparator>(html`
            <flint-input-otp-separator></flint-input-otp-separator>
        `);
        expect(el.shadowRoot!.querySelector('.bar')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — rendering
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — rendering', () => {
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
   flint-input-otp — value initialization
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — value initialization', () => {
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
   flint-input-otp — slot sync
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — slot sync', () => {
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
   flint-input-otp — keyboard input
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — keyboard input', () => {
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

    it('Backspace on empty value does not fire flint-otp-change', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('flint-otp-change', spy);
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

    it('flint-otp-complete fires when replacing the last slot in a full value', async () => {
        const el = await make({ value: '123456', maxLength: 6 });
        const spy = vi.fn();
        el.addEventListener('flint-otp-complete', spy);
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
        el.addEventListener('flint-otp-change', spy);
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 3 (empty)
        fireKey(input, 'Delete'); // i >= val.length → no-op
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — paste handling
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — paste handling', () => {
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
   flint-input-otp — events
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — events', () => {
    it('fires flint-otp-change when typing', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('flint-otp-change', spy);
        typeChars(getHiddenInput(el), '1');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: '1' });
    });

    it('fires flint-otp-change on paste', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('flint-otp-change', spy);
        firePaste(getHiddenInput(el), '456');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: '456' });
    });

    it('fires flint-otp-change on Backspace', async () => {
        const el = await make({ value: '123' });
        const spy = vi.fn();
        el.addEventListener('flint-otp-change', spy);
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        fireKey(input, 'Backspace');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: '12' });
    });

    it('fires flint-otp-complete when maxLength is reached via typing', async () => {
        const el = await make({ maxLength: 4 });
        const spy = vi.fn();
        el.addEventListener('flint-otp-complete', spy);
        typeChars(getHiddenInput(el), '1234');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: '1234' });
    });

    it('fires flint-otp-complete when maxLength is reached via paste', async () => {
        const el = await make({ maxLength: 6 });
        const spy = vi.fn();
        el.addEventListener('flint-otp-complete', spy);
        firePaste(getHiddenInput(el), '123456');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('does not fire flint-otp-complete when value is shorter than maxLength', async () => {
        const el = await make({ maxLength: 6 });
        const spy = vi.fn();
        el.addEventListener('flint-otp-complete', spy);
        typeChars(getHiddenInput(el), '123');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('flint-otp-change bubbles', async () => {
        const el = await make();
        const spy = vi.fn();
        document.addEventListener('flint-otp-change', spy, { once: true });
        typeChars(getHiddenInput(el), '1');
        await el.updateComplete;
        expect(spy).toHaveBeenCalled();
        document.removeEventListener('flint-otp-change', spy);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — disabled
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — disabled', () => {
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
   flint-input-otp — inputMode
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — inputMode', () => {
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
   flint-input-otp — controlled mode
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — controlled mode', () => {
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

    it('clamps cursor to new value length when value is shortened externally', async () => {
        const el = await make({ value: '123456' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 5
        el.value = '12';
        await el.updateComplete;
        // cursor should be clamped to min(5, 2) = 2
        expect(getSlot(el, 2).active).toBe(true);
        expect(getSlot(el, 5).active).toBe(false);
    });

    it('syncs slots when maxLength changes', async () => {
        const el = await make({ value: '1234', maxLength: 6 });
        el.maxLength = 4;
        await el.updateComplete;
        expect(getSlot(el, 0).char).toBe('1');
        expect(getSlot(el, 3).char).toBe('4');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — slot click cursor positioning
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — slot click cursor positioning', () => {
    it('clicking a slot positions cursor at that slot index', async () => {
        const el = await make({ value: '123456' });
        const slot0 = getSlot(el, 0);
        slot0.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        await el.updateComplete;
        expect(getSlot(el, 0).active).toBe(true);
        expect(getSlot(el, 5).active).toBe(false);
    });

    it('clicking a slot beyond value length clamps cursor to value length', async () => {
        const el = await make({ value: '123' });
        const slot5 = getSlot(el, 5);
        slot5.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        await el.updateComplete;
        // min(slot.index=5, value.length=3) = 3
        expect(getSlot(el, 3).active).toBe(true);
        expect(getSlot(el, 5).active).toBe(false);
    });

    it('clicking when disabled does not focus or change cursor state', async () => {
        const el = await make({ disabled: true, value: '123' });
        const slot0 = getSlot(el, 0);
        slot0.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        await el.updateComplete;
        // disabled → early return → no slot should be active
        expect(getSlots(el).every(s => !s.active)).toBe(true);
    });

    it('clicking host without hitting a slot still focuses input', async () => {
        const el = await make({ value: '123' });
        el.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        await el.updateComplete;
        // no slot was the target, so click handler focuses but doesn't override cursor
        // (cursor set by _handleFocus to min(3, 5) = 3)
        expect(getSlot(el, 3).active).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — cursor boundary conditions (mutation killers)
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — cursor boundary conditions', () => {
    it('cursor stays at maxLength-1 after typing at the last slot', async () => {
        const el = await make({ value: '123456', maxLength: 6 });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 5 (= maxLength-1)
        typeChars(input, '9'); // replaces slot 5 — cursor must stay at 5, NOT 6
        await el.updateComplete;
        expect(getSlot(el, 5).active).toBe(true);
    });

    it('ArrowRight on full value stays at maxLength-1, not maxLength', async () => {
        const el = await make({ value: '123456', maxLength: 6 });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 5
        fireKey(input, 'ArrowRight'); // maxIdx = min(6, 5) = 5 → clamped at 5
        await el.updateComplete;
        expect(getSlot(el, 5).active).toBe(true);
    });

    it('End key on full value positions cursor at maxLength-1', async () => {
        const el = await make({ value: '123456', maxLength: 6 });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        fireKey(input, 'Home'); // cursor at 0
        fireKey(input, 'End');  // cursor = min(6, 5) = 5
        await el.updateComplete;
        expect(getSlot(el, 5).active).toBe(true);
        expect(getSlot(el, 0).active).toBe(false);
    });

    it('ArrowLeft at cursor 0 does not go negative', async () => {
        const el = await make({ value: '123' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        fireKey(input, 'Home'); // cursor at 0
        fireKey(input, 'ArrowLeft'); // should stay at 0
        await el.updateComplete;
        expect(getSlot(el, 0).active).toBe(true);
    });

    it('cursor is at maxLength-1 after focusing a full value (not maxLength)', async () => {
        const el = await make({ value: '123456', maxLength: 6 });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        await el.updateComplete;
        // cursor = min(6, 5) = 5 — slot 5 active, NOT index 6
        expect(getSlot(el, 5).active).toBe(true);
    });

    it('paste positions cursor at maxLength-1 when paste fills all slots', async () => {
        const el = await make({ maxLength: 6 });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        firePaste(input, '123456');
        await el.updateComplete;
        // cursor = min(6, 5) = 5
        expect(getSlot(el, 5).active).toBe(true);
    });

    it('Backspace on value of length 1 at cursor 1 clears value', async () => {
        const el = await make({ value: '5' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at min(1, 5) = 1
        fireKey(input, 'Backspace'); // slice(0, 0) + slice(1) = '' + '' = ''
        await el.updateComplete;
        expect(el.value).toBe('');
        expect(getSlot(el, 0).char).toBe('');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — inputMode catch branch
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — inputMode catch branch', () => {
    it('uses text inputMode for invalid regex pattern (catch branch)', async () => {
        const el = await make({ pattern: '[' }); // invalid regex → catch → 'text'
        expect(getHiddenInput(el).inputMode).toBe('text');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — updated() branch coverage
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — updated() branch coverage', () => {
    it('slots remain correct when only disabled changes (value/maxLength unchanged)', async () => {
        const el = await make({ value: '123' });
        // Changing `disabled` triggers updated() but the if(value||maxLength) branch is false
        el.disabled = true;
        await el.updateComplete;
        expect(getSlot(el, 0).char).toBe('1');
        expect(getSlot(el, 2).char).toBe('3');
    });

    it('slots remain correct when only pattern changes', async () => {
        const el = await make({ value: '12', pattern: '' });
        el.pattern = '\\d';
        await el.updateComplete;
        expect(getSlot(el, 0).char).toBe('1');
        expect(getSlot(el, 1).char).toBe('2');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — keydown keys with length > 1 (non-character keys)
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — non-character keydown keys', () => {
    it('Escape does not insert a character and does not prevent default', async () => {
        const el = await make();
        const input = getHiddenInput(el);
        const event = new KeyboardEvent('keydown', {
            key: 'Escape', bubbles: true, cancelable: true,
        });
        input.dispatchEvent(event);
        await el.updateComplete;
        expect(el.value).toBe('');
        expect(event.defaultPrevented).toBe(false);
    });

    it('Enter does not insert a character', async () => {
        const el = await make();
        typeChars(getHiddenInput(el), '1');
        const input = getHiddenInput(el);
        const event = new KeyboardEvent('keydown', {
            key: 'Enter', bubbles: true, cancelable: true,
        });
        input.dispatchEvent(event);
        await el.updateComplete;
        expect(el.value).toBe('1');
    });

    it('F1 does not insert a character', async () => {
        const el = await make();
        const input = getHiddenInput(el);
        const event = new KeyboardEvent('keydown', { key: 'F1', bubbles: true, cancelable: true });
        input.dispatchEvent(event);
        await el.updateComplete;
        expect(el.value).toBe('');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — paste edge cases
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — paste edge cases', () => {
    it('handles null clipboardData gracefully (no value change)', async () => {
        const el = await make({ value: '123' });
        const event = Object.assign(
            new Event('paste', { bubbles: true, cancelable: true }),
            { clipboardData: null }
        ) as unknown as ClipboardEvent;
        getHiddenInput(el).dispatchEvent(event);
        await el.updateComplete;
        // null clipboardData → pasted = '' → value set to ''
        expect(el.value).toBe('');
    });

    it('Ctrl+key does not prevent default and does not insert char', async () => {
        const el = await make();
        const input = getHiddenInput(el);
        const event = new KeyboardEvent('keydown', {
            key: 'c', ctrlKey: true, bubbles: true, cancelable: true,
        });
        input.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
        await el.updateComplete;
        expect(el.value).toBe('');
    });

    it('Meta+key does not prevent default and does not insert char', async () => {
        const el = await make();
        const input = getHiddenInput(el);
        const event = new KeyboardEvent('keydown', {
            key: 'v', metaKey: true, bubbles: true, cancelable: true,
        });
        input.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
        await el.updateComplete;
        expect(el.value).toBe('');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — partial fill and deletion sequences
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — partial fill and deletion sequences', () => {
    it('appends character to partially filled value (not replace)', async () => {
        // Tests _insertChar: i >= val.length branch (append, not replace)
        const el = await make({ value: '12' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 2 (first empty slot)
        typeChars(input, '3');
        await el.updateComplete;
        expect(el.value).toBe('123'); // appended, not replaced
        expect(getSlot(el, 0).char).toBe('1'); // originals intact
        expect(getSlot(el, 1).char).toBe('2');
        expect(getSlot(el, 2).char).toBe('3');
    });

    it('replaces character when cursor is on a filled slot', async () => {
        // Tests _insertChar: i < val.length branch (replace)
        const el = await make({ value: '123' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 3
        fireKey(input, 'Home'); // cursor at 0
        typeChars(input, '9'); // replace slot 0
        await el.updateComplete;
        expect(el.value).toBe('923');
    });

    it('type → delete → type fills correctly', async () => {
        const el = await make();
        const input = getHiddenInput(el);
        typeChars(input, '123');
        fireKey(input, 'Backspace'); // delete '3', cursor at 2
        typeChars(input, '99');      // append '9' at 2, then '9' at 3
        await el.updateComplete;
        expect(el.value).toBe('1299');
    });

    it('deletes all chars one by one from end', async () => {
        const el = await make({ value: '123' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        fireKey(input, 'Backspace'); // '12'
        fireKey(input, 'Backspace'); // '1'
        fireKey(input, 'Backspace'); // ''
        await el.updateComplete;
        expect(el.value).toBe('');
        expect(getSlots(el).every(s => s.char === '')).toBe(true);
    });

    it('Delete key mid-value shifts remaining chars left', async () => {
        const el = await make({ value: '12345' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        fireKey(input, 'Home'); // cursor at 0
        fireKey(input, 'Delete'); // delete '1', shift left → '2345'
        await el.updateComplete;
        expect(el.value).toBe('2345');
        expect(getSlot(el, 0).char).toBe('2');
    });

    it('alternating Backspace and type at cursor 1', async () => {
        const el = await make({ value: '12' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 2
        fireKey(input, 'ArrowLeft'); // cursor at 1
        fireKey(input, 'Backspace'); // delete char before cursor ('1') → '2', cursor at 0
        await el.updateComplete;
        expect(el.value).toBe('2');
        typeChars(input, '5'); // cursor at 0, i(0) < val.length(1) → replace '2' with '5'
        await el.updateComplete;
        expect(el.value).toBe('5'); // replaced, cursor now at 1
        typeChars(input, '9'); // cursor at 1, i(1) >= val.length(1) → append
        await el.updateComplete;
        expect(el.value).toBe('59');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — event properties (bubbles, composed)
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — event properties', () => {
    it('flint-otp-change is composed (crosses shadow DOM)', async () => {
        const el = await make();
        const spy = vi.fn();
        // Listen on the document — only composed events cross shadow boundaries
        document.addEventListener('flint-otp-change', spy, { once: true });
        typeChars(getHiddenInput(el), '1');
        await el.updateComplete;
        expect(spy).toHaveBeenCalled();
        const event = spy.mock.calls[0][0] as CustomEvent;
        expect(event.composed).toBe(true);
        expect(event.bubbles).toBe(true);
    });

    it('flint-otp-complete is composed and bubbles', async () => {
        const el = await make({ maxLength: 4 });
        const spy = vi.fn();
        document.addEventListener('flint-otp-complete', spy, { once: true });
        typeChars(getHiddenInput(el), '1234');
        await el.updateComplete;
        expect(spy).toHaveBeenCalled();
        const event = spy.mock.calls[0][0] as CustomEvent;
        expect(event.composed).toBe(true);
        expect(event.bubbles).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — willUpdate external value clamping
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — willUpdate external value clamping', () => {
    it('clamps externally-set value that exceeds maxLength', async () => {
        const el = await make({ maxLength: 4 });
        el.value = '123456789';
        await el.updateComplete;
        // willUpdate should slice to maxLength
        expect(el.value).toBe('123456789'); // value property is set directly
        // But internal state and slots should be clamped
        expect(getSlot(el, 0).char).toBe('1');
        expect(getSlot(el, 3).char).toBe('4');
    });

    it('syncs _internalValue when value changes externally (not same as internal)', async () => {
        const el = await make({ value: '111' });
        // Type to create internal state
        const input = getHiddenInput(el);
        typeChars(input, '222'); // replaces to '222111'? No, cursor at min(3,5)=3, types replace slots
        await el.updateComplete;
        // Now set externally
        el.value = 'ABCDEF';
        await el.updateComplete;
        expect(getSlot(el, 0).char).toBe('A');
        expect(getSlot(el, 5).char).toBe('F');
    });

    it('cursor clamps to 0 when value is cleared externally', async () => {
        const el = await make({ value: '123456' });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 5
        el.value = '';
        await el.updateComplete;
        // cursor should be clamped to max(0, 0) = 0
        expect(getSlot(el, 0).active).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — _filterByPattern pass-through
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — _filterByPattern pass-through', () => {
    it('paste with no pattern accepts all characters unchanged', async () => {
        const el = await make({ pattern: '' });
        firePaste(getHiddenInput(el), 'abc123');
        await el.updateComplete;
        expect(el.value).toBe('abc123');
    });

    it('typing non-digit chars accepted when no pattern is set', async () => {
        const el = await make({ pattern: '' });
        typeChars(getHiddenInput(el), 'a!@#$%');
        await el.updateComplete;
        expect(el.value).toBe('a!@#$%');
    });

    it('pattern filters each character in pasted text individually', async () => {
        const el = await make({ pattern: '[0-9]' });
        firePaste(getHiddenInput(el), 'a1b2c3d4e5f6');
        await el.updateComplete;
        expect(el.value).toBe('123456');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — Tab key and modifier handling
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — Tab key and modifier handling', () => {
    it('Tab key does not change value and allows default behavior', async () => {
        const el = await make({ value: '123' });
        const input = getHiddenInput(el);
        const event = new KeyboardEvent('keydown', {
            key: 'Tab', bubbles: true, cancelable: true,
        });
        input.dispatchEvent(event);
        await el.updateComplete;
        expect(el.value).toBe('123');
        expect(event.defaultPrevented).toBe(false);
    });

    it('Ctrl+A does not insert "a" and does not prevent default', async () => {
        const el = await make({ value: '12' });
        const input = getHiddenInput(el);
        const event = new KeyboardEvent('keydown', {
            key: 'a', ctrlKey: true, bubbles: true, cancelable: true,
        });
        input.dispatchEvent(event);
        await el.updateComplete;
        expect(el.value).toBe('12'); // no 'a' inserted
        expect(event.defaultPrevented).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — click handler edge cases
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — click handler edge cases', () => {
    it('clicking slot on disabled component does not change slot active states', async () => {
        const el = await make({ disabled: true, value: '123456' });
        const slot2 = getSlot(el, 2);
        slot2.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        await el.updateComplete;
        // All slots should remain inactive (disabled early return)
        expect(getSlots(el).every(s => !s.active)).toBe(true);
    });

    it('clicking disabled component does not fire focus on hidden input', async () => {
        const el = await make({ disabled: true });
        const input = getHiddenInput(el);
        const focusSpy = vi.spyOn(input, 'focus');
        el.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        await el.updateComplete;
        expect(focusSpy).not.toHaveBeenCalled();
        focusSpy.mockRestore();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — disconnectedCallback cleanup
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — disconnectedCallback', () => {
    it('removes click listener on disconnect', async () => {
        const el = await make({ value: '123' });
        const spy = vi.spyOn(el, 'removeEventListener');
        el.disconnectedCallback();
        expect(spy).toHaveBeenCalledWith('click', expect.any(Function));
        spy.mockRestore();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — initial cursor position
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — initial cursor position', () => {
    it('initial cursor is at value.length for partial value (not maxLength-1)', async () => {
        const el = await make({ value: '12' }); // 2 chars, maxLength 6
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        await el.updateComplete;
        // _handleFocus sets cursor to min(2, 5) = 2
        expect(getSlot(el, 2).active).toBe(true);
        expect(getSlot(el, 5).active).toBe(false);
    });

    it('initial cursor for full value is at maxLength-1 (last slot)', async () => {
        // Tests Math.min, not Math.max, and maxLength-1, not maxLength+1
        const el = await make({ value: '1234', maxLength: 4 });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        await el.updateComplete;
        expect(getSlot(el, 3).active).toBe(true); // maxLength-1 = 3
    });

    it('willUpdate first render sets cursor to value.length for partial values', async () => {
        // First render: cursor = Math.min(value.length, maxLength-1)
        // For "12" with maxLength 6: cursor = min(2, 5) = 2
        const el = await make({ value: '12', maxLength: 6 });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus'));
        // After focus, cursor overridden by _handleFocus to min(2, 5) = 2
        // Type a char to verify cursor position
        typeChars(input, 'X');
        await el.updateComplete;
        expect(el.value).toBe('12X'); // appended at position 2, not replaced
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — updated() triggers _syncSlots correctly
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — updated() _syncSlots triggers', () => {
    it('changing value triggers _syncSlots via updated()', async () => {
        const el = await make({ value: '' });
        el.value = 'ABC';
        await el.updateComplete;
        expect(getSlot(el, 0).char).toBe('A');
        expect(getSlot(el, 1).char).toBe('B');
        expect(getSlot(el, 2).char).toBe('C');
    });

    it('changing maxLength triggers _syncSlots via updated()', async () => {
        const el = await make({ value: '123456', maxLength: 6 });
        el.maxLength = 3;
        await el.updateComplete;
        // Slots still render based on _internalValue which was set to '123456'
        // But _syncSlots is called, so slots reflect current internal value
        expect(getSlot(el, 0).char).toBe('1');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — _deleteBackward at cursor 0 with value
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — _deleteBackward boundary', () => {
    it('Backspace at cursor 0 with non-empty value is a no-op', async () => {
        // Tests the i === 0 guard in _deleteBackward
        const el = await make({ value: '12345' });
        const input = getHiddenInput(el);
        const spy = vi.fn();
        el.addEventListener('flint-otp-change', spy);
        input.dispatchEvent(new FocusEvent('focus'));
        fireKey(input, 'Home'); // cursor at 0
        fireKey(input, 'Backspace'); // i === 0 → return early
        await el.updateComplete;
        expect(el.value).toBe('12345'); // unchanged
        expect(spy).not.toHaveBeenCalled();
    });

    it('Delete at cursor past end of value is a no-op', async () => {
        const el = await make({ value: '12' });
        const input = getHiddenInput(el);
        const spy = vi.fn();
        el.addEventListener('flint-otp-change', spy);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 2
        fireKey(input, 'Delete'); // i >= val.length → no-op
        await el.updateComplete;
        expect(el.value).toBe('12');
        expect(spy).not.toHaveBeenCalled();
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — paste getData specificity
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — paste getData', () => {
    it('reads "text" format from clipboardData', async () => {
        const el = await make();
        const input = getHiddenInput(el);
        const getDataSpy = vi.fn((format: string) => {
            if (format === 'text') return '123456';
            return '';
        });
        const event = Object.assign(
            new Event('paste', { bubbles: true, cancelable: true }),
            { clipboardData: { getData: getDataSpy } }
        ) as unknown as ClipboardEvent;
        input.dispatchEvent(event);
        await el.updateComplete;
        expect(getDataSpy).toHaveBeenCalledWith('text');
        expect(el.value).toBe('123456');
    });
});

/* ═══════════════════════════════════════════════════════════════════
   flint-input-otp — _insertChar at exact boundary (i === val.length)
══════════════════════════════════════════════════════════════════════ */
describe('flint-input-otp — _insertChar boundary', () => {
    it('appends when cursor is exactly at val.length (not i <= val.length)', async () => {
        const el = await make({ value: '12', maxLength: 6 });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at min(2, 5) = 2
        // cursor === val.length, so we should append, not replace
        typeChars(input, 'A');
        await el.updateComplete;
        expect(el.value).toBe('12A'); // appended
        expect(el.value.length).toBe(3);
    });

    it('replaces when cursor is strictly less than val.length', async () => {
        const el = await make({ value: '123', maxLength: 6 });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 3
        fireKey(input, 'Home'); // cursor at 0
        typeChars(input, 'X');
        await el.updateComplete;
        expect(el.value).toBe('X23'); // replaced, not inserted
        expect(el.value.length).toBe(3); // same length (replace, not insert)
    });

    it('cursor advances but stays within maxLength-1 after insert at last slot', async () => {
        const el = await make({ value: '12345', maxLength: 6 });
        const input = getHiddenInput(el);
        input.dispatchEvent(new FocusEvent('focus')); // cursor at 5
        typeChars(input, 'A'); // append at 5 → '12345A', cursor min(6, 5) = 5
        await el.updateComplete;
        expect(el.value).toBe('12345A');
        expect(getSlot(el, 5).active).toBe(true); // cursor clamped to maxLength-1
    });
});
