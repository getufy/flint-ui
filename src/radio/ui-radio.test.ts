import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-radio';
import type { UiRadioGroup, UiRadio } from './ui-radio';

function getRadios(el: UiRadioGroup): UiRadio[] {
    return Array.from(el.querySelectorAll('ui-radio')) as UiRadio[];
}

function getInput(radio: UiRadio): HTMLInputElement {
    return radio.shadowRoot!.querySelector('input')!;
}

describe('ui-radio-group', () => {
    // ── Rendering ──────────────────────────────────────────────────────────────

    it('renders radios and sets initial checked state', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="test" value="1">
                <ui-radio value="1" label="One"></ui-radio>
                <ui-radio value="2" label="Two"></ui-radio>
            </ui-radio-group>
        `);
        const [r1, r2] = getRadios(el);
        expect(r1.checked).toBe(true);
        expect(r2.checked).toBe(false);
    });

    it('renders role="radiogroup" on the container', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="a11y">
                <ui-radio value="a" label="A"></ui-radio>
            </ui-radio-group>
        `);
        const container = el.shadowRoot!.querySelector('.group-container')!;
        expect(container.getAttribute('role')).toBe('radiogroup');
    });

    it('sets aria-label on container when label prop is provided', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group label="Choose a plan" name="plan">
                <ui-radio value="a" label="A"></ui-radio>
            </ui-radio-group>
        `);
        const container = el.shadowRoot!.querySelector('.group-container')!;
        expect(container.getAttribute('aria-label')).toBe('Choose a plan');
    });

    it('omits aria-label when label prop is empty', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="plan">
                <ui-radio value="a" label="A"></ui-radio>
            </ui-radio-group>
        `);
        const container = el.shadowRoot!.querySelector('.group-container')!;
        expect(container.hasAttribute('aria-label')).toBe(false);
    });

    // ── Value / checked sync ───────────────────────────────────────────────────

    it('updates value and checked state when a radio is clicked', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="test" value="1">
                <ui-radio value="1" label="One"></ui-radio>
                <ui-radio value="2" label="Two"></ui-radio>
            </ui-radio-group>
        `);
        const [r1, r2] = getRadios(el);
        getInput(r2).click();
        await el.updateComplete;
        expect(el.value).toBe('2');
        expect(r2.checked).toBe(true);
        expect(r1.checked).toBe(false);
    });

    it('syncs checked when group value prop changes externally', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="test" value="1">
                <ui-radio value="1" label="One"></ui-radio>
                <ui-radio value="2" label="Two"></ui-radio>
            </ui-radio-group>
        `);
        el.value = '2';
        await el.updateComplete;
        const [r1, r2] = getRadios(el);
        expect(r1.checked).toBe(false);
        expect(r2.checked).toBe(true);
    });

    // ── Event ──────────────────────────────────────────────────────────────────

    it('dispatches ui-radio-group-change with correct detail', async () => {
        const handler = vi.fn();
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group @ui-radio-group-change=${handler} name="ev">
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B"></ui-radio>
            </ui-radio-group>
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
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group @ui-radio-group-change=${handler} name="noop" value="a">
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B"></ui-radio>
            </ui-radio-group>
        `);
        // Click the already-checked radio — _handleChange early-returns
        getInput(getRadios(el)[0]).click();
        expect(handler).not.toHaveBeenCalled();
    });

    // ── Name propagation ───────────────────────────────────────────────────────

    it('propagates name to all children on init', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="group1" value="a">
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B"></ui-radio>
            </ui-radio-group>
        `);
        getRadios(el).forEach(r => expect(r.name).toBe('group1'));
    });

    it('propagates name change to existing children', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="old" value="a">
                <ui-radio value="a" label="A"></ui-radio>
            </ui-radio-group>
        `);
        el.name = 'new';
        await el.updateComplete;
        expect(getRadios(el)[0].name).toBe('new');
    });

    it('syncs name to dynamically added radios via slotchange', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="dynamic">
                <ui-radio value="a" label="A"></ui-radio>
            </ui-radio-group>
        `);
        const newRadio = document.createElement('ui-radio') as UiRadio;
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
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group value="a">
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B" disabled></ui-radio>
            </ui-radio-group>
        `);
        getInput(getRadios(el)[1]).click();
        await el.updateComplete;
        expect(el.value).toBe('a');
        expect(getRadios(el)[1].checked).toBe(false);
    });

    it('group disabled reflects attribute', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group disabled>
                <ui-radio value="a" label="A"></ui-radio>
            </ui-radio-group>
        `);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('group disabled blocks ui-radio-select events', async () => {
        const handler = vi.fn();
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group disabled value="a" @ui-radio-group-change=${handler}>
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B"></ui-radio>
            </ui-radio-group>
        `);
        // Dispatch ui-radio-select directly — pointer-events:none blocks mouse,
        // but the guard in _handleRadioSelect covers the functional path
        getRadios(el)[1].dispatchEvent(new CustomEvent('ui-radio-select', {
            detail: { value: 'b' }, bubbles: true, composed: true,
        }));
        await el.updateComplete;
        expect(el.value).toBe('a');
        expect(handler).not.toHaveBeenCalled();
    });

    it('group disabled sets aria-disabled on container', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group disabled>
                <ui-radio value="a" label="A"></ui-radio>
            </ui-radio-group>
        `);
        const container = el.shadowRoot!.querySelector('.group-container')!;
        expect(container.getAttribute('aria-disabled')).toBe('true');
    });

    // ── Required ───────────────────────────────────────────────────────────────

    it('propagates required to all children', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group required name="req">
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B"></ui-radio>
            </ui-radio-group>
        `);
        await el.updateComplete;
        getRadios(el).forEach(r => {
            expect(r.required).toBe(true);
            expect(getInput(r).required).toBe(true);
        });
    });

    it('sets aria-required on container when required', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group required>
                <ui-radio value="a" label="A"></ui-radio>
            </ui-radio-group>
        `);
        const container = el.shadowRoot!.querySelector('.group-container')!;
        expect(container.getAttribute('aria-required')).toBe('true');
    });

    // ── Size propagation ───────────────────────────────────────────────────────

    it('propagates size to all children', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group size="lg" name="sz">
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B"></ui-radio>
            </ui-radio-group>
        `);
        await el.updateComplete;
        getRadios(el).forEach(r => expect(r.size).toBe('lg'));
    });

    it('reflects size change to children', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group size="md" name="sz">
                <ui-radio value="a" label="A"></ui-radio>
            </ui-radio-group>
        `);
        el.size = 'sm';
        await el.updateComplete;
        expect(getRadios(el)[0].size).toBe('sm');
    });

    // ── defaultValue (uncontrolled) ────────────────────────────────────────────

    it('uses defaultValue when no value is set', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="uncontrolled" default-value="b">
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B"></ui-radio>
                <ui-radio value="c" label="C"></ui-radio>
            </ui-radio-group>
        `);
        expect(el.value).toBe('b');
        const [ra, rb] = getRadios(el);
        expect(ra.checked).toBe(false);
        expect(rb.checked).toBe(true);
    });

    it('ignores defaultValue when value is already set', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="both" value="a" default-value="b">
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B"></ui-radio>
            </ui-radio-group>
        `);
        expect(el.value).toBe('a');
        expect(getRadios(el)[0].checked).toBe(true);
    });

    // ── Keyboard navigation ────────────────────────────────────────────────────

    it('ArrowDown moves to next enabled radio and fires event', async () => {
        const handler = vi.fn();
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="kb" value="a" @ui-radio-group-change=${handler}>
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B"></ui-radio>
                <ui-radio value="c" label="C"></ui-radio>
            </ui-radio-group>
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
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="kb2" value="b">
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B"></ui-radio>
                <ui-radio value="c" label="C"></ui-radio>
            </ui-radio-group>
        `);
        getInput(getRadios(el)[1]).focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('a');
    });

    it('ArrowDown wraps from last to first', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="wrap" value="c">
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B"></ui-radio>
                <ui-radio value="c" label="C"></ui-radio>
            </ui-radio-group>
        `);
        getInput(getRadios(el)[2]).focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('a');
    });

    it('ArrowUp wraps from first to last', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="wrap2" value="a">
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B"></ui-radio>
                <ui-radio value="c" label="C"></ui-radio>
            </ui-radio-group>
        `);
        getInput(getRadios(el)[0]).focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('c');
    });

    it('keyboard navigation skips disabled radios', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="skip" value="a">
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B" disabled></ui-radio>
                <ui-radio value="c" label="C"></ui-radio>
            </ui-radio-group>
        `);
        getInput(getRadios(el)[0]).focus();
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe('c');
    });

    it('keyboard navigation does nothing when group is disabled', async () => {
        const handler = vi.fn();
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="kbdisabled" value="a" disabled @ui-radio-group-change=${handler}>
                <ui-radio value="a" label="A"></ui-radio>
                <ui-radio value="b" label="B"></ui-radio>
            </ui-radio-group>
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
                <ui-radio-group name="lifecycle" value="a" @ui-radio-group-change=${handler}>
                    <ui-radio value="a" label="A"></ui-radio>
                    <ui-radio value="b" label="B"></ui-radio>
                </ui-radio-group>
            </div>
        `);
        const group = container.querySelector('ui-radio-group')!;

        // Detach and re-attach
        container.removeChild(group);
        container.appendChild(group);
        await (group as UiRadioGroup).updateComplete;

        getInput(getRadios(group as UiRadioGroup)[1]).click();
        expect(handler).toHaveBeenCalledOnce();
    });
});

describe('ui-radio', () => {
    // ── Rendering ──────────────────────────────────────────────────────────────

    it('renders label prop as text', async () => {
        const el = await fixture<UiRadio>(html`<ui-radio value="a" label="Apple"></ui-radio>`);
        const text = Array.from(el.shadowRoot!.querySelector('.label')!.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent?.trim())
            .join('');
        expect(text).toBe('Apple');
    });

    it('renders slot when no label prop is set', async () => {
        const el = await fixture<UiRadio>(html`
            <ui-radio value="a"><span id="slotted">Slot content</span></ui-radio>
        `);
        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).not.toBeNull();
        // The slotted element should be in light DOM
        expect(el.querySelector('#slotted')).not.toBeNull();
    });

    // ── Disabled reflect ───────────────────────────────────────────────────────

    it('reflects disabled to attribute', async () => {
        const el = await fixture<UiRadio>(html`<ui-radio value="a" disabled></ui-radio>`);
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects checked to attribute', async () => {
        const el = await fixture<UiRadio>(html`<ui-radio value="a" checked></ui-radio>`);
        await el.updateComplete;
        expect(el.hasAttribute('checked')).toBe(true);
    });

    // ── Size reflects ──────────────────────────────────────────────────────────

    it('reflects size to attribute', async () => {
        const el = await fixture<UiRadio>(html`<ui-radio value="a" size="sm"></ui-radio>`);
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('sm');
    });

    // ── Focus delegation ───────────────────────────────────────────────────────

    it('focus() delegates to inner input', async () => {
        const el = await fixture<UiRadio>(html`<ui-radio value="a" label="A"></ui-radio>`);
        el.focus();
        expect(el.shadowRoot!.activeElement).toBe(getInput(el));
    });

    // ── Disabled prevents event ────────────────────────────────────────────────

    it('disabled radio does not dispatch ui-radio-select', async () => {
        const handler = vi.fn();
        const el = await fixture<UiRadio>(html`
            <ui-radio value="a" label="A" disabled @ui-radio-select=${handler}></ui-radio>
        `);
        getInput(el).click();
        expect(handler).not.toHaveBeenCalled();
    });
});
