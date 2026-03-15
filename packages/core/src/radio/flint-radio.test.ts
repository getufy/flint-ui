import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-radio';
import type { FlintRadioGroup, FlintRadio } from './flint-radio';
import { expectAccessible } from '../test-utils/axe';

function getRadios(el: FlintRadioGroup): FlintRadio[] {
    return Array.from(el.querySelectorAll('flint-radio')) as FlintRadio[];
}

function getInput(radio: FlintRadio): HTMLInputElement {
    return radio.shadowRoot!.querySelector('input')!;
}

describe('flint-radio-group', () => {
    // ── Rendering ──────────────────────────────────────────────────────────────

    it('renders radios and sets initial checked state', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="test" value="1">
                <flint-radio value="1" label="One"></flint-radio>
                <flint-radio value="2" label="Two"></flint-radio>
            </flint-radio-group>
        `);
        const [r1, r2] = getRadios(el);
        expect(r1.checked).toBe(true);
        expect(r2.checked).toBe(false);
    });

    it('renders role="radiogroup" on the container', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="a11y">
                <flint-radio value="a" label="A"></flint-radio>
            </flint-radio-group>
        `);
        const container = el.shadowRoot!.querySelector('.group-container')!;
        expect(container.getAttribute('role')).toBe('radiogroup');
    });

    it('sets aria-label on container when label prop is provided', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group label="Choose a plan" name="plan">
                <flint-radio value="a" label="A"></flint-radio>
            </flint-radio-group>
        `);
        const container = el.shadowRoot!.querySelector('.group-container')!;
        expect(container.getAttribute('aria-label')).toBe('Choose a plan');
    });

    it('omits aria-label when label prop is empty', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="plan">
                <flint-radio value="a" label="A"></flint-radio>
            </flint-radio-group>
        `);
        const container = el.shadowRoot!.querySelector('.group-container')!;
        expect(container.hasAttribute('aria-label')).toBe(false);
    });

    // ── Value / checked sync ───────────────────────────────────────────────────

    it('updates value and checked state when a radio is clicked', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="test" value="1">
                <flint-radio value="1" label="One"></flint-radio>
                <flint-radio value="2" label="Two"></flint-radio>
            </flint-radio-group>
        `);
        const [r1, r2] = getRadios(el);
        getInput(r2).click();
        await el.updateComplete;
        expect(el.value).toBe('2');
        expect(r2.checked).toBe(true);
        expect(r1.checked).toBe(false);
    });

    it('syncs checked when group value prop changes externally', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="test" value="1">
                <flint-radio value="1" label="One"></flint-radio>
                <flint-radio value="2" label="Two"></flint-radio>
            </flint-radio-group>
        `);
        el.value = '2';
        await el.updateComplete;
        const [r1, r2] = getRadios(el);
        expect(r1.checked).toBe(false);
        expect(r2.checked).toBe(true);
    });

    // ── Event ──────────────────────────────────────────────────────────────────

    it('dispatches flint-radio-group-change with correct detail', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group @flint-radio-group-change=${handler} name="ev">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        getInput(getRadios(el)[1]).click();
        expect(handler).toHaveBeenCalledOnce();
        const event: CustomEvent = handler.mock.calls[0][0];
        expect(event.bubbles).toBe(true);
        expect(event.composed).toBe(true);
        expect(event.detail.value).toBe('b');
    });

    it('does not fire event when clicking the already-checked radio', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group @flint-radio-group-change=${handler} name="noop" value="a">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        // Click the already-checked radio — _handleChange early-returns
        getInput(getRadios(el)[0]).click();
        expect(handler).not.toHaveBeenCalled();
    });

    // ── Name propagation ───────────────────────────────────────────────────────

    it('propagates name to all children on init', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="group1" value="a">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        getRadios(el).forEach(r => expect(r.name).toBe('group1'));
    });

    it('propagates name change to existing children', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="old" value="a">
                <flint-radio value="a" label="A"></flint-radio>
            </flint-radio-group>
        `);
        el.name = 'new';
        await el.updateComplete;
        expect(getRadios(el)[0].name).toBe('new');
    });

    it('syncs name to dynamically added radios via slotchange', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="dynamic">
                <flint-radio value="a" label="A"></flint-radio>
            </flint-radio-group>
        `);
        const newRadio = document.createElement('flint-radio') as FlintRadio;
        newRadio.value = 'b';
        newRadio.label = 'B';
        el.appendChild(newRadio);
        // Wait for slotchange + update
        await newRadio.updateComplete;
        await el.updateComplete;
        expect(newRadio.name).toBe('dynamic');
    });

    // ── Disabled ───────────────────────────────────────────────────────────────

    it('respects disabled state on individual radio', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group value="a">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B" disabled></flint-radio>
            </flint-radio-group>
        `);
        getInput(getRadios(el)[1]).click();
        await el.updateComplete;
        expect(el.value).toBe('a');
        expect(getRadios(el)[1].checked).toBe(false);
    });

    it('group disabled reflects attribute', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group disabled>
                <flint-radio value="a" label="A"></flint-radio>
            </flint-radio-group>
        `);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('group disabled blocks flint-radio-select events', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group disabled value="a" @flint-radio-group-change=${handler}>
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        // Dispatch flint-radio-select directly — pointer-events:none blocks mouse,
        // but the guard in _handleRadioSelect covers the functional path
        getRadios(el)[1].dispatchEvent(new CustomEvent('flint-radio-select', {
            detail: { value: 'b' }, bubbles: true, composed: true,
        }));
        await el.updateComplete;
        expect(el.value).toBe('a');
        expect(handler).not.toHaveBeenCalled();
    });

    it('group disabled sets aria-disabled on container', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group disabled>
                <flint-radio value="a" label="A"></flint-radio>
            </flint-radio-group>
        `);
        const container = el.shadowRoot!.querySelector('.group-container')!;
        expect(container.getAttribute('aria-disabled')).toBe('true');
    });

    // ── Required ───────────────────────────────────────────────────────────────

    it('propagates required to all children', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group required name="req">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        await el.updateComplete;
        getRadios(el).forEach(r => {
            expect(r.required).toBe(true);
            expect(getInput(r).required).toBe(true);
        });
    });

    it('sets aria-required on container when required', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group required>
                <flint-radio value="a" label="A"></flint-radio>
            </flint-radio-group>
        `);
        const container = el.shadowRoot!.querySelector('.group-container')!;
        expect(container.getAttribute('aria-required')).toBe('true');
    });

    // ── Size propagation ───────────────────────────────────────────────────────

    it('propagates size to all children', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group size="lg" name="sz">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        await el.updateComplete;
        getRadios(el).forEach(r => expect(r.size).toBe('lg'));
    });

    it('reflects size change to children', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group size="md" name="sz">
                <flint-radio value="a" label="A"></flint-radio>
            </flint-radio-group>
        `);
        el.size = 'sm';
        await el.updateComplete;
        expect(getRadios(el)[0].size).toBe('sm');
    });

    // ── defaultValue (uncontrolled) ────────────────────────────────────────────

    it('uses defaultValue when no value is set', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="uncontrolled" default-value="b">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
                <flint-radio value="c" label="C"></flint-radio>
            </flint-radio-group>
        `);
        expect(el.value).toBe('b');
        const [ra, rb] = getRadios(el);
        expect(ra.checked).toBe(false);
        expect(rb.checked).toBe(true);
    });

    it('ignores defaultValue when value is already set', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="both" value="a" default-value="b">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        expect(el.value).toBe('a');
        expect(getRadios(el)[0].checked).toBe(true);
    });

    // ── Keyboard navigation ────────────────────────────────────────────────────

    it('ArrowDown moves to next enabled radio and fires event', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="kb" value="a" @flint-radio-group-change=${handler}>
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
                <flint-radio value="c" label="C"></flint-radio>
            </flint-radio-group>
        `);
        // Focus first radio so composedPath includes it
        getInput(getRadios(el)[0]).focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('b');
        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.value).toBe('b');
    });

    it('ArrowUp moves to previous enabled radio', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="kb2" value="b">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
                <flint-radio value="c" label="C"></flint-radio>
            </flint-radio-group>
        `);
        getInput(getRadios(el)[1]).focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('a');
    });

    it('ArrowDown wraps from last to first', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="wrap" value="c">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
                <flint-radio value="c" label="C"></flint-radio>
            </flint-radio-group>
        `);
        getInput(getRadios(el)[2]).focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('a');
    });

    it('ArrowUp wraps from first to last', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="wrap2" value="a">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
                <flint-radio value="c" label="C"></flint-radio>
            </flint-radio-group>
        `);
        getInput(getRadios(el)[0]).focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('c');
    });

    it('keyboard navigation skips disabled radios', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="skip" value="a">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B" disabled></flint-radio>
                <flint-radio value="c" label="C"></flint-radio>
            </flint-radio-group>
        `);
        getInput(getRadios(el)[0]).focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('c');
    });

    it('keyboard navigation does nothing when group is disabled', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="kbdisabled" value="a" disabled @flint-radio-group-change=${handler}>
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('a');
        expect(handler).not.toHaveBeenCalled();
    });

    // ── Lifecycle ──────────────────────────────────────────────────────────────

    it('removing and re-attaching does not cause duplicate event handlers', async () => {
        const handler = vi.fn();
        const container = await fixture<HTMLDivElement>(html`
            <div>
                <flint-radio-group name="lifecycle" value="a" @flint-radio-group-change=${handler}>
                    <flint-radio value="a" label="A"></flint-radio>
                    <flint-radio value="b" label="B"></flint-radio>
                </flint-radio-group>
            </div>
        `);
        const group = container.querySelector('flint-radio-group')!;

        // Detach and re-attach
        container.removeChild(group);
        container.appendChild(group);
        await (group as FlintRadioGroup).updateComplete;

        getInput(getRadios(group as FlintRadioGroup)[1]).click();
        expect(handler).toHaveBeenCalledOnce();
    });

    it('disconnectedCallback removes event listeners so detached group fires no event', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="dc" value="a" @flint-radio-group-change=${handler}>
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        el.remove();
        // Dispatch flint-radio-select directly — after disconnect the handler should be gone
        el.dispatchEvent(new CustomEvent('flint-radio-select', {
            detail: { value: 'b' }, bubbles: true, composed: true,
        }));
        expect(handler).not.toHaveBeenCalled();
        // Also verify keydown listener is gone
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(el.value).toBe('a');
    });

    // ── defaultValue edge cases ────────────────────────────────────────────────

    it('does not apply defaultValue when defaultValue is empty string', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="dv-empty" default-value="">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        expect(el.value).toBe('');
        getRadios(el).forEach(r => expect(r.checked).toBe(false));
    });

    it('defaultValue is only applied on first render and not on subsequent updates', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="dv-once" default-value="a">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        expect(el.value).toBe('a');
        // Manually change value, then trigger another update — defaultValue must not re-apply
        el.value = 'b';
        await el.updateComplete;
        // Force another willUpdate cycle by changing an unrelated property
        el.label = 'New Label';
        await el.updateComplete;
        expect(el.value).toBe('b');
        expect(getRadios(el)[1].checked).toBe(true);
    });

    // ── required change triggers sync ─────────────────────────────────────────

    it('syncs children when required property changes', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="req-change">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        getRadios(el).forEach(r => expect(r.required).toBe(false));
        el.required = true;
        await el.updateComplete;
        getRadios(el).forEach(r => expect(r.required).toBe(true));
        el.required = false;
        await el.updateComplete;
        getRadios(el).forEach(r => expect(r.required).toBe(false));
    });

    // ── Keyboard navigation edge cases ────────────────────────────────────────

    it('keyboard navigation does nothing when all radios are disabled', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="alldis" value="a" @flint-radio-group-change=${handler}>
                <flint-radio value="a" label="A" disabled></flint-radio>
                <flint-radio value="b" label="B" disabled></flint-radio>
            </flint-radio-group>
        `);
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('a');
        expect(handler).not.toHaveBeenCalled();
    });

    it('ArrowRight moves to next enabled radio', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="kb-right" value="a" @flint-radio-group-change=${handler}>
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
                <flint-radio value="c" label="C"></flint-radio>
            </flint-radio-group>
        `);
        getInput(getRadios(el)[0]).focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('b');
        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.value).toBe('b');
    });

    it('ArrowLeft moves to previous enabled radio', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="kb-left" value="b">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
                <flint-radio value="c" label="C"></flint-radio>
            </flint-radio-group>
        `);
        getInput(getRadios(el)[1]).focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('a');
    });

    it('keyboard navigation uses current value when no radio is focused', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="kb-nofocus" value="b">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
                <flint-radio value="c" label="C"></flint-radio>
            </flint-radio-group>
        `);
        // No radio focused — should navigate from value="b" (index 1) → c
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('c');
    });

    it('keyboard navigation resolves focused radio via composedPath when event originates from input', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="kb-path" value="a">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
                <flint-radio value="c" label="C"></flint-radio>
            </flint-radio-group>
        `);
        // Dispatch from the shadow input of radio "b" (index 1) with composed:true
        // so composedPath includes the flint-radio host → focused branch is taken
        getInput(getRadios(el)[1]).dispatchEvent(
            new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true })
        );
        await el.updateComplete;
        expect(el.value).toBe('c');
    });

    it('keyboard navigation starts from index 0 when no radio focused and value not found', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="kb-notfound" value="z">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
                <flint-radio value="c" label="C"></flint-radio>
            </flint-radio-group>
        `);
        // value "z" doesn't match any radio → startIndex = 0 → ArrowDown goes to index 1 (b)
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('b');
    });

    it('ignores non-arrow keys', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="kb-ignore" value="a" @flint-radio-group-change=${handler}>
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Space', bubbles: true }));
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('a');
        expect(handler).not.toHaveBeenCalled();
    });

    it('flint-radio-group-change via keyboard has bubbles=true and composed=true', async () => {
        let captured: CustomEvent | null = null;
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="kb-flags" value="a">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        el.addEventListener('flint-radio-group-change', (e) => { captured = e as CustomEvent; });
        getInput(getRadios(el)[0]).focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(captured).not.toBeNull();
        expect((captured as unknown as CustomEvent).bubbles).toBe(true);
        expect((captured as unknown as CustomEvent).composed).toBe(true);
        expect((captured as unknown as CustomEvent).detail.value).toBe('b');
    });

    it('does not propagate name to children when group name is empty string', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="" value="a">
                <flint-radio value="a" label="A" name="own"></flint-radio>
                <flint-radio value="b" label="B" name="own"></flint-radio>
            </flint-radio-group>
        `);
        // Group name is '' so _syncChildren should not overwrite individual names
        getRadios(el).forEach(r => expect(r.name).toBe('own'));
    });
});

describe('flint-radio', () => {
    // ── Rendering ──────────────────────────────────────────────────────────────

    it('renders label prop as text', async () => {
        const el = await fixture<FlintRadio>(html`<flint-radio value="a" label="Apple"></flint-radio>`);
        const text = Array.from(el.shadowRoot!.querySelector('.label')!.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent?.trim())
            .join('');
        expect(text).toBe('Apple');
    });

    it('renders slot when no label prop is set', async () => {
        const el = await fixture<FlintRadio>(html`
            <flint-radio value="a"><span id="slotted">Slot content</span></flint-radio>
        `);
        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).not.toBeNull();
        // The slotted element should be in light DOM
        expect(el.querySelector('#slotted')).not.toBeNull();
    });

    // ── Disabled reflect ───────────────────────────────────────────────────────

    it('reflects disabled to attribute', async () => {
        const el = await fixture<FlintRadio>(html`<flint-radio value="a" disabled></flint-radio>`);
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects checked to attribute', async () => {
        const el = await fixture<FlintRadio>(html`<flint-radio value="a" checked></flint-radio>`);
        await el.updateComplete;
        expect(el.hasAttribute('checked')).toBe(true);
    });

    // ── Size reflects ──────────────────────────────────────────────────────────

    it('reflects size to attribute', async () => {
        const el = await fixture<FlintRadio>(html`<flint-radio value="a" size="sm"></flint-radio>`);
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('sm');
    });

    // ── Focus delegation ───────────────────────────────────────────────────────

    it('focus() delegates to inner input', async () => {
        const el = await fixture<FlintRadio>(html`<flint-radio value="a" label="A"></flint-radio>`);
        el.focus();
        expect(el.shadowRoot!.activeElement).toBe(getInput(el));
    });

    // ── Disabled prevents event ────────────────────────────────────────────────

    it('disabled radio does not dispatch flint-radio-select', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintRadio>(html`
            <flint-radio value="a" label="A" disabled @flint-radio-select=${handler}></flint-radio>
        `);
        getInput(el).click();
        expect(handler).not.toHaveBeenCalled();
    });

    it('_handleChange guard: dispatching change event directly on disabled radio fires no flint-radio-select', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintRadio>(html`
            <flint-radio value="a" label="A" disabled @flint-radio-select=${handler}></flint-radio>
        `);
        // Bypass browser disabled check by dispatching 'change' directly
        getInput(el).dispatchEvent(new Event('change'));
        expect(handler).not.toHaveBeenCalled();
    });

    // ── Event flags ────────────────────────────────────────────────────────────

    it('flint-radio-select event has bubbles=true and composed=true', async () => {
        let captured: CustomEvent | null = null;
        const el = await fixture<FlintRadio>(html`<flint-radio value="x" label="X"></flint-radio>`);
        el.addEventListener('flint-radio-select', (e) => { captured = e as CustomEvent; });
        // Trigger via direct change event (not click, to avoid browser disabled guard)
        getInput(el).dispatchEvent(new Event('change'));
        expect(captured).not.toBeNull();
        expect((captured as unknown as CustomEvent).bubbles).toBe(true);
        expect((captured as unknown as CustomEvent).composed).toBe(true);
        expect((captured as unknown as CustomEvent).detail.value).toBe('x');
    });

    // ── CSS classes ────────────────────────────────────────────────────────────

    it('wrapper has disabled class when radio is disabled', async () => {
        const el = await fixture<FlintRadio>(html`<flint-radio value="a" label="A" disabled></flint-radio>`);
        const wrapper = el.shadowRoot!.querySelector('.wrapper')!;
        expect(wrapper.classList.contains('disabled')).toBe(true);
    });

    it('wrapper does not have disabled class when radio is enabled', async () => {
        const el = await fixture<FlintRadio>(html`<flint-radio value="a" label="A"></flint-radio>`);
        const wrapper = el.shadowRoot!.querySelector('.wrapper')!;
        expect(wrapper.classList.contains('disabled')).toBe(false);
    });

    it('radio-circle has checked class when radio is checked', async () => {
        const el = await fixture<FlintRadio>(html`<flint-radio value="a" checked></flint-radio>`);
        const circle = el.shadowRoot!.querySelector('.radio-circle')!;
        expect(circle.classList.contains('checked')).toBe(true);
    });

    it('radio-circle does not have checked class when radio is unchecked', async () => {
        const el = await fixture<FlintRadio>(html`<flint-radio value="a"></flint-radio>`);
        const circle = el.shadowRoot!.querySelector('.radio-circle')!;
        expect(circle.classList.contains('checked')).toBe(false);
    });

    it('radio-circle gains checked class when checked prop is set to true', async () => {
        const el = await fixture<FlintRadio>(html`<flint-radio value="a"></flint-radio>`);
        el.checked = true;
        await el.updateComplete;
        const circle = el.shadowRoot!.querySelector('.radio-circle')!;
        expect(circle.classList.contains('checked')).toBe(true);
    });

    // ── Inner input reflects properties ───────────────────────────────────────

    it('inner input has required attribute when required prop is set', async () => {
        const el = await fixture<FlintRadio>(html`<flint-radio value="a" label="A" required></flint-radio>`);
        expect(getInput(el).required).toBe(true);
    });

    it('inner input reflects name property', async () => {
        const el = await fixture<FlintRadio>(html`<flint-radio value="a" label="A" name="mygroup"></flint-radio>`);
        expect(getInput(el).name).toBe('mygroup');
    });

    it('inner input value matches the radio value property', async () => {
        const el = await fixture<FlintRadio>(html`<flint-radio value="option-1" label="Option 1"></flint-radio>`);
        expect(getInput(el).value).toBe('option-1');
    });

    it('renders slot content when label prop is empty string', async () => {
        const el = await fixture<FlintRadio>(html`
            <flint-radio value="a" label=""><span id="slotted">Fallback</span></flint-radio>
        `);
        // Empty string is falsy so the slot branch is taken
        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).not.toBeNull();
    });
});

// ═══════════════════════════════════════════════════════════════════════
// flint-radio-group — formResetCallback & edge cases
// ═══════════════════════════════════════════════════════════════════════
describe('flint-radio-group — formResetCallback', () => {
    it('formResetCallback resets value to defaultValue', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="reset" default-value="b">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        // Initial value set from defaultValue
        expect(el.value).toBe('b');
        // Change value
        el.value = 'a';
        await el.updateComplete;
        expect(getRadios(el)[0].checked).toBe(true);

        // Call formResetCallback directly (since jsdom can't do real form reset)
        (el as unknown as { formResetCallback: () => void }).formResetCallback();
        await el.updateComplete;
        expect(el.value).toBe('b');
        expect(getRadios(el)[1].checked).toBe(true);
    });

    it('formResetCallback resets to empty when no defaultValue', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="reset2" value="a">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B"></flint-radio>
            </flint-radio-group>
        `);
        (el as unknown as { formResetCallback: () => void }).formResetCallback();
        await el.updateComplete;
        expect(el.value).toBe('');
        getRadios(el).forEach(r => expect(r.checked).toBe(false));
    });

    it('keyboard navigation with single enabled radio wraps to itself', async () => {
        const el = await fixture<FlintRadioGroup>(html`
            <flint-radio-group name="single" value="a">
                <flint-radio value="a" label="A"></flint-radio>
                <flint-radio value="b" label="B" disabled></flint-radio>
                <flint-radio value="c" label="C" disabled></flint-radio>
            </flint-radio-group>
        `);
        getInput(getRadios(el)[0]).focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        // Only one enabled radio, so it wraps to itself
        expect(el.value).toBe('a');
    });
});

// ── Accessibility ─────────────────────────────────────────────────────────

describe('flint-radio-group — accessibility', () => {
    it('should pass automated a11y checks', async () => {
        const el = await fixture(html`
            <flint-radio-group name="test" value="1">
                <flint-radio value="1" label="One"></flint-radio>
                <flint-radio value="2" label="Two"></flint-radio>
            </flint-radio-group>
        `);
        await expectAccessible(el);
    }, 15000);
});
