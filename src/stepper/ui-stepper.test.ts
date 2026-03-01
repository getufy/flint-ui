import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-stepper.js';
import type { UiStepper, UiStep, UiMobileStepper } from './ui-stepper.js';

/* ── helpers ─────────────────────────────────────────────────────── */
async function makeStepper(activeStep = 0) {
    return fixture<UiStepper>(html`
        <ui-stepper active-step="${activeStep}">
            <ui-step id="s0"><span slot="label">Step 1</span></ui-step>
            <ui-step id="s1"><span slot="label">Step 2</span></ui-step>
            <ui-step id="s2"><span slot="label">Step 3</span></ui-step>
        </ui-stepper>
    `);
}

/* ================================================================== */
describe('ui-stepper', () => {
    it('is defined', () => {
        expect(document.createElement('ui-stepper')).toBeInstanceOf(HTMLElement);
    });

    it('defaults: orientation=horizontal, activeStep=0', async () => {
        const el = await fixture<UiStepper>(html`<ui-stepper></ui-stepper>`);
        expect(el.orientation).toBe('horizontal');
        expect(el.activeStep).toBe(0);
    });

    it('syncs step index to child ui-step elements', async () => {
        const el = await makeStepper();
        const steps = Array.from(el.querySelectorAll<UiStep>('ui-step'));
        expect(steps[0].stepIndex).toBe(0);
        expect(steps[1].stepIndex).toBe(1);
        expect(steps[2].stepIndex).toBe(2);
    });

    it('marks the correct step as active', async () => {
        const el = await makeStepper(1);
        const steps = Array.from(el.querySelectorAll<UiStep>('ui-step'));
        expect(steps[0].active).toBe(false);
        expect(steps[1].active).toBe(true);
        expect(steps[2].active).toBe(false);
    });

    it('marks the last step as last=true', async () => {
        const el = await makeStepper();
        const steps = Array.from(el.querySelectorAll<UiStep>('ui-step'));
        expect(steps[2].last).toBe(true);
        expect(steps[0].last).toBe(false);
    });

    it('in linear mode: disables steps after activeStep', async () => {
        const el = await makeStepper(0);
        const steps = Array.from(el.querySelectorAll<UiStep>('ui-step'));
        expect(steps[0].disabled).toBe(false);
        expect(steps[1].disabled).toBe(true);
        expect(steps[2].disabled).toBe(true);
    });

    it('in non-linear mode: all steps are enabled', async () => {
        const el = await fixture<UiStepper>(html`
            <ui-stepper non-linear active-step="0">
                <ui-step id="s0"><span slot="label">Step 1</span></ui-step>
                <ui-step id="s1"><span slot="label">Step 2</span></ui-step>
            </ui-stepper>
        `);
        const steps = Array.from(el.querySelectorAll<UiStep>('ui-step'));
        expect(steps[0].disabled).toBe(false);
        expect(steps[1].disabled).toBe(false);
    });

    it('emits ui-step-change on non-linear step click', async () => {
        const el = await fixture<UiStepper>(html`
            <ui-stepper non-linear active-step="0">
                <ui-step><span slot="label">A</span></ui-step>
                <ui-step><span slot="label">B</span></ui-step>
            </ui-stepper>
        `);
        const step1 = el.querySelectorAll<UiStep>('ui-step')[1];
        setTimeout(() => step1.dispatchEvent(new CustomEvent('ui-step-click', {
            detail: { index: 1 }, bubbles: true, composed: true,
        })));
        const event = await oneEvent(el, 'ui-step-change') as CustomEvent;
        expect(event.detail.step).toBe(1);
        expect(el.activeStep).toBe(1);
    });

    it('passes orientation to child steps', async () => {
        const el = await fixture<UiStepper>(html`
            <ui-stepper orientation="vertical">
                <ui-step><span slot="label">Step 1</span></ui-step>
            </ui-stepper>
        `);
        const step = el.querySelector<UiStep>('ui-step')!;
        expect(step.orientation).toBe('vertical');
    });
});

/* ================================================================== */
describe('ui-step', () => {
    it('is defined', () => {
        expect(document.createElement('ui-step')).toBeInstanceOf(HTMLElement);
    });

    it('shows completed checkmark via icon-circle.completed class', async () => {
        const el = await fixture<UiStep>(html`<ui-step completed><span slot="label">Done</span></ui-step>`);
        await el.updateComplete;
        const circle = el.shadowRoot?.querySelector('.icon-circle');
        expect(circle?.classList.contains('completed')).toBe(true);
    });

    it('shows error state', async () => {
        const el = await fixture<UiStep>(html`<ui-step error><span slot="label">Error</span></ui-step>`);
        await el.updateComplete;
        const circle = el.shadowRoot?.querySelector('.icon-circle');
        expect(circle?.classList.contains('error')).toBe(true);
    });

    it('fires ui-step-click when clickable and button is activated', async () => {
        const el = await fixture<UiStep>(html`<ui-step clickable step-index="2"><span slot="label">Click me</span></ui-step>`);
        await el.updateComplete;
        const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('.step-btn');
        expect(btn).toBeTruthy();
        setTimeout(() => btn!.click());
        const event = await oneEvent(el, 'ui-step-click') as CustomEvent;
        expect(event.detail.index).toBe(2);
    });

    it('does NOT fire ui-step-click when disabled', async () => {
        const el = await fixture<UiStep>(html`<ui-step clickable disabled step-index="1"><span slot="label">Disabled</span></ui-step>`);
        const spy = vi.fn();
        el.addEventListener('ui-step-click', spy);
        el.shadowRoot?.querySelector<HTMLButtonElement>('.step-btn')?.click();
        expect(spy).not.toHaveBeenCalled();
    });
});

/* ================================================================== */
describe('ui-mobile-stepper', () => {
    it('is defined', () => {
        expect(document.createElement('ui-mobile-stepper')).toBeInstanceOf(HTMLElement);
    });

    it('renders text variant correctly', async () => {
        const el = await fixture<UiMobileStepper>(html`
            <ui-mobile-stepper variant="text" steps="5" active-step="2"></ui-mobile-stepper>
        `);
        expect(el.shadowRoot?.textContent).toContain('3');
        expect(el.shadowRoot?.textContent).toContain('5');
    });

    it('fires ui-mobile-step-next when Next clicked', async () => {
        const el = await fixture<UiMobileStepper>(html`
            <ui-mobile-stepper variant="dots" steps="3" active-step="0"></ui-mobile-stepper>
        `);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn.next')!;
        setTimeout(() => btn.click());
        await oneEvent(el, 'ui-mobile-step-next');
    });

    it('fires ui-mobile-step-back when Back clicked', async () => {
        const el = await fixture<UiMobileStepper>(html`
            <ui-mobile-stepper variant="dots" steps="3" active-step="2"></ui-mobile-stepper>
        `);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn.back')!;
        setTimeout(() => btn.click());
        await oneEvent(el, 'ui-mobile-step-back');
    });

    it('disables Back button on first step', async () => {
        const el = await fixture<UiMobileStepper>(html`
            <ui-mobile-stepper steps="3" active-step="0"></ui-mobile-stepper>
        `);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn.back')!;
        expect(btn.disabled).toBe(true);
    });

    it('disables Next button on last step', async () => {
        const el = await fixture<UiMobileStepper>(html`
            <ui-mobile-stepper steps="3" active-step="2"></ui-mobile-stepper>
        `);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn.next')!;
        expect(btn.disabled).toBe(true);
    });

    it('renders correct number of dots', async () => {
        const el = await fixture<UiMobileStepper>(html`
            <ui-mobile-stepper variant="dots" steps="4" active-step="0"></ui-mobile-stepper>
        `);
        const dots = el.shadowRoot?.querySelectorAll('.dot');
        expect(dots?.length).toBe(4);
    });

    it('marks the active dot', async () => {
        const el = await fixture<UiMobileStepper>(html`
            <ui-mobile-stepper variant="dots" steps="3" active-step="1"></ui-mobile-stepper>
        `);
        const dots = el.shadowRoot?.querySelectorAll('.dot');
        expect(dots?.[1].classList.contains('active')).toBe(true);
        expect(dots?.[0].classList.contains('active')).toBe(false);
    });
});
