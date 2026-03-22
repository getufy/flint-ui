import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './flint-stepper.js';
import type { FlintStepper, FlintStep, FlintMobileStepper, FlintStepConnector, FlintStepLabel, FlintStepContent } from './flint-stepper.js';
import { expectAccessible } from '../test-utils/axe.js';

/* ── helpers ─────────────────────────────────────────────────────── */
async function makeStepper(activeStep = 0) {
    return fixture<FlintStepper>(html`
        <flint-stepper active-step="${activeStep}">
            <flint-step id="s0"><span slot="label">Step 1</span></flint-step>
            <flint-step id="s1"><span slot="label">Step 2</span></flint-step>
            <flint-step id="s2"><span slot="label">Step 3</span></flint-step>
        </flint-stepper>
    `);
}

/* ================================================================== */
describe('flint-stepper', () => {
    it('is defined', () => {
        expect(document.createElement('flint-stepper')).toBeInstanceOf(HTMLElement);
    });

    it('defaults: orientation=horizontal, activeStep=0', async () => {
        const el = await fixture<FlintStepper>(html`<flint-stepper></flint-stepper>`);
        expect(el.orientation).toBe('horizontal');
        expect(el.activeStep).toBe(0);
    });

    it('syncs step index to child flint-step elements', async () => {
        const el = await makeStepper();
        const steps = Array.from(el.querySelectorAll<FlintStep>('flint-step'));
        expect(steps[0].stepIndex).toBe(0);
        expect(steps[1].stepIndex).toBe(1);
        expect(steps[2].stepIndex).toBe(2);
    });

    it('marks the correct step as active', async () => {
        const el = await makeStepper(1);
        const steps = Array.from(el.querySelectorAll<FlintStep>('flint-step'));
        expect(steps[0].active).toBe(false);
        expect(steps[1].active).toBe(true);
        expect(steps[2].active).toBe(false);
    });

    it('marks the last step as last=true', async () => {
        const el = await makeStepper();
        const steps = Array.from(el.querySelectorAll<FlintStep>('flint-step'));
        expect(steps[2].last).toBe(true);
        expect(steps[0].last).toBe(false);
    });

    it('in linear mode: disables steps after activeStep', async () => {
        const el = await makeStepper(0);
        const steps = Array.from(el.querySelectorAll<FlintStep>('flint-step'));
        expect(steps[0].disabled).toBe(false);
        expect(steps[1].disabled).toBe(true);
        expect(steps[2].disabled).toBe(true);
    });

    it('in linear mode: completed steps are NOT disabled even when beyond activeStep', async () => {
        const el = await fixture<FlintStepper>(html`
            <flint-stepper active-step="0">
                <flint-step><span slot="label">Step 1</span></flint-step>
                <flint-step completed><span slot="label">Step 2</span></flint-step>
                <flint-step><span slot="label">Step 3</span></flint-step>
            </flint-stepper>
        `);
        const steps = Array.from(el.querySelectorAll<FlintStep>('flint-step'));
        /* step[1] has completed=true → should not be disabled by linear logic */
        expect(steps[1].disabled).toBe(false);
        expect(steps[2].disabled).toBe(true);
    });

    it('in non-linear mode: all steps are enabled', async () => {
        const el = await fixture<FlintStepper>(html`
            <flint-stepper non-linear active-step="0">
                <flint-step id="s0"><span slot="label">Step 1</span></flint-step>
                <flint-step id="s1"><span slot="label">Step 2</span></flint-step>
            </flint-stepper>
        `);
        const steps = Array.from(el.querySelectorAll<FlintStep>('flint-step'));
        expect(steps[0].disabled).toBe(false);
        expect(steps[1].disabled).toBe(false);
    });

    it('in non-linear mode: steps are clickable', async () => {
        const el = await fixture<FlintStepper>(html`
            <flint-stepper non-linear active-step="0">
                <flint-step><span slot="label">A</span></flint-step>
                <flint-step><span slot="label">B</span></flint-step>
            </flint-stepper>
        `);
        const steps = Array.from(el.querySelectorAll<FlintStep>('flint-step'));
        expect(steps[0].clickable).toBe(true);
        expect(steps[1].clickable).toBe(true);
    });

    it('emits flint-step-change on non-linear step click', async () => {
        const el = await fixture<FlintStepper>(html`
            <flint-stepper non-linear active-step="0">
                <flint-step><span slot="label">A</span></flint-step>
                <flint-step><span slot="label">B</span></flint-step>
            </flint-stepper>
        `);
        const step1 = el.querySelectorAll<FlintStep>('flint-step')[1];
        setTimeout(() => step1.dispatchEvent(new CustomEvent('flint-step-click', {
            detail: { step: 1 }, bubbles: true, composed: true,
        })));
        const event = await oneEvent(el, 'flint-step-change') as CustomEvent;
        expect(event.detail.step).toBe(1);
        expect(el.activeStep).toBe(1);
    });

    it('passes orientation to child steps', async () => {
        const el = await fixture<FlintStepper>(html`
            <flint-stepper orientation="vertical">
                <flint-step><span slot="label">Step 1</span></flint-step>
            </flint-stepper>
        `);
        const step = el.querySelector<FlintStep>('flint-step')!;
        expect(step.orientation).toBe('vertical');
    });

    it('syncs alternativeLabel to child steps', async () => {
        const el = await fixture<FlintStepper>(html`
            <flint-stepper alternative-label>
                <flint-step><span slot="label">Step 1</span></flint-step>
                <flint-step><span slot="label">Step 2</span></flint-step>
            </flint-stepper>
        `);
        const steps = Array.from(el.querySelectorAll<FlintStep>('flint-step'));
        expect(steps[0].alternativeLabel).toBe(true);
        expect(steps[1].alternativeLabel).toBe(true);
    });

    it('sets prevCompleted correctly: step i gets prevCompleted=steps[i-1].completed', async () => {
        const el = await fixture<FlintStepper>(html`
            <flint-stepper active-step="1">
                <flint-step completed><span slot="label">A</span></flint-step>
                <flint-step><span slot="label">B</span></flint-step>
                <flint-step><span slot="label">C</span></flint-step>
            </flint-stepper>
        `);
        const [s0, s1, s2] = Array.from(el.querySelectorAll<FlintStep>('flint-step'));
        expect(s0.prevCompleted).toBe(false); /* no predecessor */
        expect(s1.prevCompleted).toBe(true);  /* s0 is completed */
        expect(s2.prevCompleted).toBe(false); /* s1 is NOT completed */
    });

    it('re-syncs when a step is dynamically added (slotchange)', async () => {
        const el = await fixture<FlintStepper>(html`
            <flint-stepper active-step="0">
                <flint-step><span slot="label">Step 1</span></flint-step>
            </flint-stepper>
        `);
        expect(el.querySelector<FlintStep>('flint-step')!.last).toBe(true);

        const newStep = document.createElement('flint-step') as FlintStep;
        newStep.innerHTML = '<span slot="label">Step 2</span>';
        el.appendChild(newStep);
        await el.updateComplete;
        await newStep.updateComplete;

        const steps = Array.from(el.querySelectorAll<FlintStep>('flint-step'));
        expect(steps[0].last).toBe(false);
        expect(steps[1].last).toBe(true);
        expect(steps[1].stepIndex).toBe(1);
    });

    it('removes flint-step-click listener on disconnectedCallback', async () => {
        const el = await fixture<FlintStepper>(html`
            <flint-stepper non-linear>
                <flint-step><span slot="label">A</span></flint-step>
            </flint-stepper>
        `);
        const spy = vi.fn();
        el.addEventListener('flint-step-change', spy);
        el.remove(); /* disconnects */
        el.dispatchEvent(new CustomEvent('flint-step-click', { detail: { step: 0 }, bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });

    it('renders role="list" and aria-label on the inner div', async () => {
        const el = await fixture<FlintStepper>(html`<flint-stepper label="checkout steps"></flint-stepper>`);
        const div = el.shadowRoot!.querySelector('[role="list"]');
        expect(div).toBeTruthy();
        expect(div!.getAttribute('aria-label')).toBe('checkout steps');
    });

    it('defaults aria-label to "steps"', async () => {
        const el = await fixture<FlintStepper>(html`<flint-stepper></flint-stepper>`);
        const div = el.shadowRoot!.querySelector('[role="list"]');
        expect(div!.getAttribute('aria-label')).toBe('steps');
    });
});

/* ================================================================== */
describe('flint-step', () => {
    it('is defined', () => {
        expect(document.createElement('flint-step')).toBeInstanceOf(HTMLElement);
    });

    it('has role="listitem"', async () => {
        const el = await fixture<FlintStep>(html`<flint-step><span slot="label">X</span></flint-step>`);
        expect((el as unknown as { _internals?: ElementInternals | null })._internals?.role).toBe('listitem');
    });

    it('shows completed checkmark via icon-circle.completed class', async () => {
        const el = await fixture<FlintStep>(html`<flint-step completed><span slot="label">Done</span></flint-step>`);
        await el.updateComplete;
        const circle = el.shadowRoot?.querySelector('.icon-circle');
        expect(circle?.classList.contains('completed')).toBe(true);
    });

    it('shows error state', async () => {
        const el = await fixture<FlintStep>(html`<flint-step error><span slot="label">Error</span></flint-step>`);
        await el.updateComplete;
        const circle = el.shadowRoot?.querySelector('.icon-circle');
        expect(circle?.classList.contains('error')).toBe(true);
    });

    it('error propagates to flint-step-label', async () => {
        const el = await fixture<FlintStep>(html`<flint-step error><span slot="label">Error</span></flint-step>`);
        await el.updateComplete;
        const label = el.shadowRoot?.querySelector<FlintStepLabel>('flint-step-label');
        expect(label?.error).toBe(true);
    });

    it('active propagates to flint-step-label', async () => {
        const el = await fixture<FlintStep>(html`<flint-step active><span slot="label">Active</span></flint-step>`);
        await el.updateComplete;
        const label = el.shadowRoot?.querySelector<FlintStepLabel>('flint-step-label');
        expect(label?.active).toBe(true);
    });

    it('fires flint-step-click when clickable and button is activated', async () => {
        const el = await fixture<FlintStep>(html`<flint-step clickable step-index="2"><span slot="label">Click me</span></flint-step>`);
        await el.updateComplete;
        const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('.step-btn');
        expect(btn).toBeTruthy();
        setTimeout(() => btn!.click());
        const event = await oneEvent(el, 'flint-step-click') as CustomEvent;
        expect(event.detail.step).toBe(2);
    });

    it('does NOT fire flint-step-click when disabled', async () => {
        const el = await fixture<FlintStep>(html`<flint-step clickable disabled step-index="1"><span slot="label">Disabled</span></flint-step>`);
        const spy = vi.fn();
        el.addEventListener('flint-step-click', spy);
        el.shadowRoot?.querySelector<HTMLButtonElement>('.step-btn')?.click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('active button has aria-current="step"', async () => {
        const el = await fixture<FlintStep>(html`<flint-step clickable active step-index="0"><span slot="label">Active</span></flint-step>`);
        await el.updateComplete;
        const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('.step-btn');
        expect(btn?.getAttribute('aria-current')).toBe('step');
    });

    it('non-active button has no aria-current attribute', async () => {
        const el = await fixture<FlintStep>(html`<flint-step clickable step-index="1"><span slot="label">Inactive</span></flint-step>`);
        await el.updateComplete;
        const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('.step-btn');
        expect(btn?.hasAttribute('aria-current')).toBe(false);
    });

    it('does not render a connector on the first step (stepIndex=0)', async () => {
        const el = await fixture<FlintStep>(html`<flint-step step-index="0"><span slot="label">First</span></flint-step>`);
        await el.updateComplete;
        const connector = el.shadowRoot?.querySelector('flint-step-connector');
        expect(connector).toBeNull();
    });

    it('renders a connector on steps with stepIndex > 0', async () => {
        const el = await fixture<FlintStep>(html`<flint-step step-index="1"><span slot="label">Second</span></flint-step>`);
        await el.updateComplete;
        const connector = el.shadowRoot?.querySelector('flint-step-connector');
        expect(connector).toBeTruthy();
    });

    it('connector.completed reflects prevCompleted prop', async () => {
        const el = await fixture<FlintStep>(html`<flint-step step-index="1" prev-completed><span slot="label">Second</span></flint-step>`);
        await el.updateComplete;
        const connector = el.shadowRoot?.querySelector<FlintStepConnector>('flint-step-connector');
        expect(connector?.completed).toBe(true);
    });

    it('renders vertical orientation with v-body and v-line', async () => {
        const el = await fixture<FlintStep>(html`<flint-step orientation="vertical"><span slot="label">Step</span></flint-step>`);
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('.v-body')).toBeTruthy();
        expect(el.shadowRoot?.querySelector('.v-line')).toBeTruthy();
    });

    it('renders optional label when optional=true', async () => {
        const el = await fixture<FlintStep>(html`
            <flint-step optional optional-label="Skip me"><span slot="label">Step</span></flint-step>
        `);
        await el.updateComplete;
        const label = el.shadowRoot?.querySelector<FlintStepLabel>('flint-step-label');
        expect(label?.textContent).toContain('Skip me');
    });

    it('renders custom icon slot content when not completed or error', async () => {
        const el = await fixture<FlintStep>(html`
            <flint-step step-index="0"><span slot="icon" id="custom-icon">★</span><span slot="label">Star</span></flint-step>
        `);
        await el.updateComplete;
        /* The slot element itself is in light DOM */
        expect(el.querySelector('#custom-icon')).toBeTruthy();
    });

    it('internals role is always listitem regardless of host attribute', async () => {
        const el = await fixture<FlintStep>(html`
            <flint-step role="presentation" step-index="0"><span slot="label">X</span></flint-step>
        `);
        expect((el as unknown as { _internals?: ElementInternals | null })._internals?.role).toBe('listitem');
    });

    it('clicking a disabled clickable step does not fire event', async () => {
        const el = await fixture<FlintStep>(html`
            <flint-step clickable disabled step-index="0"><span slot="label">D</span></flint-step>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('flint-step-click', spy);
        const btn = el.shadowRoot!.querySelector('button.step-btn') as HTMLButtonElement;
        btn?.click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('vertical + clickable inactive step has no aria-current', async () => {
        const el = await fixture<FlintStep>(html`
            <flint-step orientation="vertical" clickable step-index="0"><span slot="label">V</span></flint-step>
        `);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('button.step-btn');
        expect(btn).toBeTruthy();
        expect(btn!.hasAttribute('aria-current')).toBe(false);
    });

    it('alt-label + clickable inactive step has no aria-current', async () => {
        const el = await fixture<FlintStep>(html`
            <flint-step alternative-label clickable step-index="1"><span slot="label">A</span></flint-step>
        `);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('button.step-btn');
        expect(btn).toBeTruthy();
        expect(btn!.hasAttribute('aria-current')).toBe(false);
    });

    it('vertical + clickable renders a button', async () => {
        const el = await fixture<FlintStep>(html`
            <flint-step orientation="vertical" clickable step-index="0" active><span slot="label">V</span></flint-step>
        `);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('button.step-btn');
        expect(btn).toBeTruthy();
        expect(btn!.getAttribute('aria-current')).toBe('step');
    });

    it('vertical + non-clickable renders a div header', async () => {
        const el = await fixture<FlintStep>(html`
            <flint-step orientation="vertical" step-index="0"><span slot="label">V</span></flint-step>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.step-header')).toBeTruthy();
        expect(el.shadowRoot!.querySelector('button.step-btn')).toBeNull();
    });

    it('alt-label + clickable renders a button with icon only', async () => {
        const el = await fixture<FlintStep>(html`
            <flint-step alternative-label clickable step-index="1" active><span slot="label">A</span></flint-step>
        `);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('button.step-btn');
        expect(btn).toBeTruthy();
        expect(btn!.getAttribute('aria-current')).toBe('step');
    });

    it('alt-label + non-clickable renders icon without button', async () => {
        const el = await fixture<FlintStep>(html`
            <flint-step alternative-label step-index="1"><span slot="label">A</span></flint-step>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('button.step-btn')).toBeNull();
        expect(el.shadowRoot!.querySelector('.icon-circle')).toBeTruthy();
    });

    it('alt-label: renders two conn-fill divs for symmetric layout', async () => {
        const el = await fixture<FlintStep>(html`
            <flint-step alternative-label step-index="1"><span slot="label">Alt</span></flint-step>
        `);
        await el.updateComplete;
        const fills = el.shadowRoot?.querySelectorAll('.conn-fill');
        expect(fills?.length).toBe(2);
    });
});

/* ================================================================== */
describe('flint-step-connector', () => {
    it('is defined', () => {
        expect(document.createElement('flint-step-connector')).toBeInstanceOf(HTMLElement);
    });

    it('renders .line', async () => {
        const el = await fixture<FlintStepConnector>(html`<flint-step-connector></flint-step-connector>`);
        expect(el.shadowRoot?.querySelector('.line')).toBeTruthy();
    });

    it('adds .completed class when completed=true', async () => {
        const el = await fixture<FlintStepConnector>(html`<flint-step-connector completed></flint-step-connector>`);
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('.line')?.classList.contains('completed')).toBe(true);
    });

    it('does not have .completed class when completed=false', async () => {
        const el = await fixture<FlintStepConnector>(html`<flint-step-connector></flint-step-connector>`);
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('.line')?.classList.contains('completed')).toBe(false);
    });

    it('reflects orientation attribute', async () => {
        const el = await fixture<FlintStepConnector>(html`<flint-step-connector orientation="vertical"></flint-step-connector>`);
        expect(el.getAttribute('orientation')).toBe('vertical');
    });
});

/* ================================================================== */
describe('flint-step-label', () => {
    it('is defined', () => {
        expect(document.createElement('flint-step-label')).toBeInstanceOf(HTMLElement);
    });

    it('reflects active attribute', async () => {
        const el = await fixture<FlintStepLabel>(html`<flint-step-label active></flint-step-label>`);
        expect(el.hasAttribute('active')).toBe(true);
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<FlintStepLabel>(html`<flint-step-label disabled></flint-step-label>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects error attribute', async () => {
        const el = await fixture<FlintStepLabel>(html`<flint-step-label error></flint-step-label>`);
        expect(el.hasAttribute('error')).toBe(true);
    });
});

/* ================================================================== */
describe('flint-step-content', () => {
    it('is defined', () => {
        expect(document.createElement('flint-step-content')).toBeInstanceOf(HTMLElement);
    });

    it('defaults to open=true', async () => {
        const el = await fixture<FlintStepContent>(html`<flint-step-content>Content</flint-step-content>`);
        expect(el.open).toBe(true);
    });

    it('panel has .open class when open=true', async () => {
        const el = await fixture<FlintStepContent>(html`<flint-step-content>Content</flint-step-content>`);
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('.panel')?.classList.contains('open')).toBe(true);
    });

    it('panel does not have .open class when open=false', async () => {
        const el = await fixture<FlintStepContent>(html`<flint-step-content .open=${false}>Content</flint-step-content>`);
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('.panel')?.classList.contains('open')).toBe(false);
    });

    it('panel has aria-hidden="true" when open=false', async () => {
        const el = await fixture<FlintStepContent>(html`<flint-step-content .open=${false}>Content</flint-step-content>`);
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('.panel')?.getAttribute('aria-hidden')).toBe('true');
    });

    it('panel has aria-hidden="false" when open=true', async () => {
        const el = await fixture<FlintStepContent>(html`<flint-step-content>Content</flint-step-content>`);
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('.panel')?.getAttribute('aria-hidden')).toBe('false');
    });
});

/* ================================================================== */
describe('flint-mobile-stepper', () => {
    it('is defined', () => {
        expect(document.createElement('flint-mobile-stepper')).toBeInstanceOf(HTMLElement);
    });

    it('renders text variant correctly', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper variant="text" steps="5" active-step="2"></flint-mobile-stepper>
        `);
        expect(el.shadowRoot?.textContent).toContain('3');
        expect(el.shadowRoot?.textContent).toContain('5');
    });

    it('fires flint-mobile-step-next when Next clicked', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper variant="dots" steps="3" active-step="0"></flint-mobile-stepper>
        `);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn.next')!;
        setTimeout(() => btn.click());
        await oneEvent(el, 'flint-mobile-step-next');
    });

    it('fires flint-mobile-step-back when Back clicked', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper variant="dots" steps="3" active-step="2"></flint-mobile-stepper>
        `);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn.back')!;
        setTimeout(() => btn.click());
        await oneEvent(el, 'flint-mobile-step-back');
    });

    it('disables Back button on first step', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper steps="3" active-step="0"></flint-mobile-stepper>
        `);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn.back')!;
        expect(btn.disabled).toBe(true);
    });

    it('disables Next button on last step', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper steps="3" active-step="2"></flint-mobile-stepper>
        `);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn.next')!;
        expect(btn.disabled).toBe(true);
    });

    it('renders correct number of dots', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper variant="dots" steps="4" active-step="0"></flint-mobile-stepper>
        `);
        const dots = el.shadowRoot?.querySelectorAll('.dot');
        expect(dots?.length).toBe(4);
    });

    it('marks the active dot', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper variant="dots" steps="3" active-step="1"></flint-mobile-stepper>
        `);
        const dots = el.shadowRoot?.querySelectorAll('.dot');
        expect(dots?.[1].classList.contains('active')).toBe(true);
        expect(dots?.[0].classList.contains('active')).toBe(false);
    });

    it('renders progress variant with .bar-track and .bar-fill', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper variant="progress" steps="4" active-step="0"></flint-mobile-stepper>
        `);
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('.bar-track')).toBeTruthy();
        expect(el.shadowRoot?.querySelector('.bar-fill')).toBeTruthy();
    });

    it('progress bar is 0% at first step', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper variant="progress" steps="5" active-step="0"></flint-mobile-stepper>
        `);
        await el.updateComplete;
        const fill = el.shadowRoot?.querySelector<HTMLElement>('.bar-fill');
        expect(fill?.style.width).toBe('0%');
    });

    it('progress bar is 100% at last step', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper variant="progress" steps="5" active-step="4"></flint-mobile-stepper>
        `);
        await el.updateComplete;
        const fill = el.shadowRoot?.querySelector<HTMLElement>('.bar-fill');
        expect(fill?.style.width).toBe('100%');
    });

    it('does not crash when steps=0', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper variant="dots" steps="0" active-step="0"></flint-mobile-stepper>
        `);
        await el.updateComplete;
        /* Both buttons should be disabled for 0 or 1 steps */
        const next = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn.next')!;
        expect(next.disabled).toBe(true);
    });

    it('reflects position attribute', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper position="bottom" steps="3" active-step="0"></flint-mobile-stepper>
        `);
        expect(el.getAttribute('position')).toBe('bottom');
    });

    it('renders back-label and next-label props', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper
                steps="3" active-step="1"
                back-label="Zurück" next-label="Weiter"
            ></flint-mobile-stepper>
        `);
        await el.updateComplete;
        const back = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn.back')!;
        const next = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn.next')!;
        expect(back.textContent?.trim()).toBe('Zurück');
        expect(next.textContent?.trim()).toBe('Weiter');
    });

    it('nav buttons have aria-label attributes', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper steps="3" active-step="1"></flint-mobile-stepper>
        `);
        await el.updateComplete;
        const back = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn.back')!;
        const next = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn.next')!;
        expect(back.getAttribute('aria-label')).toBe('Go to previous step');
        expect(next.getAttribute('aria-label')).toBe('Go to next step');
    });

    it('renders custom back-button slot', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper steps="3" active-step="1">
                <button slot="back-button" id="custom-back">←</button>
            </flint-mobile-stepper>
        `);
        expect(el.querySelector('#custom-back')).toBeTruthy();
    });

    it('progress bar is 100% when steps=1', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper variant="progress" steps="1" active-step="0"></flint-mobile-stepper>
        `);
        await el.updateComplete;
        const fill = el.shadowRoot?.querySelector<HTMLElement>('.bar-fill');
        expect(fill?.style.width).toBe('100%');
    });

    it('renders custom next-button slot', async () => {
        const el = await fixture<FlintMobileStepper>(html`
            <flint-mobile-stepper steps="3" active-step="1">
                <button slot="next-button" id="custom-next">→</button>
            </flint-mobile-stepper>
        `);
        expect(el.querySelector('#custom-next')).toBeTruthy();
    });
});

describe('flint-stepper — accessibility', () => {
    it('should be accessible', async () => {
        const el = await fixture(html`
            <flint-stepper active-step="0">
                <flint-step><flint-step-label>Step 1</flint-step-label></flint-step>
                <flint-step><flint-step-label>Step 2</flint-step-label></flint-step>
            </flint-stepper>
        `);
        await expectAccessible(el);
    });
});
