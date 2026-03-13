import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-circular-progress';
import './ui-linear-progress';
import type { UiCircularProgress } from './ui-circular-progress';
import type { UiLinearProgress } from './ui-linear-progress';

describe('ui-progress components', () => {
    describe('ui-circular-progress', () => {
        it('is defined', async () => {
            const el = document.createElement('ui-circular-progress');
            expect(el).toBeInstanceOf(HTMLElement);
        });

        it('renders as indeterminate by default', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root');
            expect(root?.classList.contains('indeterminate')).toBe(true);
            expect(el.variant).toBe('indeterminate');
        });

        it('renders as determinate with value', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress variant="determinate" .value="${50}"></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root');
            const circle = el.shadowRoot!.querySelector('circle') as SVGCircleElement;

            expect(root?.classList.contains('determinate')).toBe(true);
            expect(el.value).toBe(50);
            expect(circle.style.strokeDashoffset).toBeDefined();
        });

        it('supports size property', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress .size="${60}"></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root') as HTMLElement;
            expect(root.style.getPropertyValue('--ui-circular-progress-size')).toBe('60px');
        });

        it('indeterminate has .indeterminate class', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root')!;
            expect(root.classList.contains('indeterminate')).toBe(true);
            expect(root.classList.contains('determinate')).toBe(false);
        });

        it('determinate has .determinate class', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress variant="determinate" .value="${50}"></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root')!;
            expect(root.classList.contains('determinate')).toBe(true);
            expect(root.classList.contains('indeterminate')).toBe(false);
        });

        it('ARIA: indeterminate has no aria-valuenow', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root')!;
            expect(root.hasAttribute('aria-valuenow')).toBe(false);
            expect(root.getAttribute('aria-valuemin')).toBe('0');
            expect(root.getAttribute('aria-valuemax')).toBe('100');
        });

        it('ARIA: determinate has correct aria-valuenow', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress variant="determinate" .value="${75}"></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root')!;
            expect(root.getAttribute('aria-valuenow')).toBe('75');
        });

        it('ARIA: label prop sets aria-label', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress label="Loading data"></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root')!;
            expect(root.getAttribute('aria-label')).toBe('Loading data');
        });

        it('ARIA: empty label omits aria-label', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root')!;
            expect(root.hasAttribute('aria-label')).toBe(false);
        });

        it('clamps value below 0 to 0', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress variant="determinate" .value="${-10}"></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root')!;
            expect(root.getAttribute('aria-valuenow')).toBe('0');
        });

        it('clamps value above 100 to 100', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress variant="determinate" .value="${150}"></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root')!;
            expect(root.getAttribute('aria-valuenow')).toBe('100');
        });

        it('stroke-dashoffset at 0% equals circumference', async () => {
            const thickness = 3.6;
            const radius = 20 - thickness / 2;
            const circumference = 2 * Math.PI * radius;
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress variant="determinate" .value="${0}" .thickness="${thickness}"></ui-circular-progress>`);
            const circle = el.shadowRoot!.querySelector('circle') as SVGCircleElement;
            const offset = parseFloat(circle.style.strokeDashoffset);
            expect(offset).toBeCloseTo(circumference, 1);
        });

        it('stroke-dashoffset at 100% is 0', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress variant="determinate" .value="${100}"></ui-circular-progress>`);
            const circle = el.shadowRoot!.querySelector('circle') as SVGCircleElement;
            expect(parseFloat(circle.style.strokeDashoffset)).toBeCloseTo(0, 1);
        });

        it('stroke-dashoffset at 50% is half circumference', async () => {
            const thickness = 3.6;
            const radius = 20 - thickness / 2;
            const circumference = 2 * Math.PI * radius;
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress variant="determinate" .value="${50}" .thickness="${thickness}"></ui-circular-progress>`);
            const circle = el.shadowRoot!.querySelector('circle') as SVGCircleElement;
            const offset = parseFloat(circle.style.strokeDashoffset);
            expect(offset).toBeCloseTo(circumference / 2, 1);
        });

        it('thickness prop sets circle stroke-width', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress .thickness="${6}"></ui-circular-progress>`);
            const circle = el.shadowRoot!.querySelector('circle') as SVGCircleElement;
            expect(circle.getAttribute('stroke-width')).toBe('6');
        });

        it('radius shrinks with thickness to prevent clipping', async () => {
            const thickness = 10;
            const expectedRadius = 20 - thickness / 2; // 15
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress .thickness="${thickness}"></ui-circular-progress>`);
            const circle = el.shadowRoot!.querySelector('circle') as SVGCircleElement;
            expect(Number(circle.getAttribute('r'))).toBeCloseTo(expectedRadius, 5);
        });

        it('color prop sets CSS custom property on root', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress color="success"></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root') as HTMLElement;
            expect(root.style.getPropertyValue('--ui-circular-progress-color')).toBe('#22c55e');
        });

        it('reflects variant and value as attributes', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress variant="determinate" .value="${30}"></ui-circular-progress>`);
            await el.updateComplete;
            expect(el.getAttribute('variant')).toBe('determinate');
            expect(el.getAttribute('value')).toBe('30');
        });
    });

    describe('ui-linear-progress', () => {
        it('is defined', async () => {
            const el = document.createElement('ui-linear-progress');
            expect(el).toBeInstanceOf(HTMLElement);
        });

        it('renders as indeterminate by default', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress></ui-linear-progress>`);
            const root = el.shadowRoot!.querySelector('.root');
            expect(root?.classList.contains('indeterminate')).toBe(true);
            expect(el.variant).toBe('indeterminate');
        });

        it('renders as determinate with value', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress variant="determinate" .value="${40}"></ui-linear-progress>`);
            const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;

            expect(el.variant).toBe('determinate');
            expect(el.value).toBe(40);
            expect(bar.style.transform).toBe('scaleX(0.4)');
        });

        it('indeterminate renders two bars (.bar1 and .bar2)', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress></ui-linear-progress>`);
            expect(el.shadowRoot!.querySelector('.bar1')).not.toBeNull();
            expect(el.shadowRoot!.querySelector('.bar2')).not.toBeNull();
        });

        it('determinate renders exactly one bar', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress variant="determinate" .value="${50}"></ui-linear-progress>`);
            const bars = el.shadowRoot!.querySelectorAll('.bar');
            expect(bars.length).toBe(1);
            expect(el.shadowRoot!.querySelector('.bar1')).toBeNull();
            expect(el.shadowRoot!.querySelector('.bar2')).toBeNull();
        });

        it('ARIA: indeterminate has no aria-valuenow', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress></ui-linear-progress>`);
            const root = el.shadowRoot!.querySelector('.root')!;
            expect(root.hasAttribute('aria-valuenow')).toBe(false);
            expect(root.getAttribute('aria-valuemin')).toBe('0');
            expect(root.getAttribute('aria-valuemax')).toBe('100');
        });

        it('ARIA: determinate has correct aria-valuenow', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress variant="determinate" .value="${60}"></ui-linear-progress>`);
            const root = el.shadowRoot!.querySelector('.root')!;
            expect(root.getAttribute('aria-valuenow')).toBe('60');
        });

        it('ARIA: label prop sets aria-label', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress label="Upload progress"></ui-linear-progress>`);
            const root = el.shadowRoot!.querySelector('.root')!;
            expect(root.getAttribute('aria-label')).toBe('Upload progress');
        });

        it('ARIA: empty label omits aria-label', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress></ui-linear-progress>`);
            const root = el.shadowRoot!.querySelector('.root')!;
            expect(root.hasAttribute('aria-label')).toBe(false);
        });

        it('clamps value below 0 to 0', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress variant="determinate" .value="${-20}"></ui-linear-progress>`);
            const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
            expect(bar.style.transform).toBe('scaleX(0)');
        });

        it('clamps value above 100 to 100', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress variant="determinate" .value="${120}"></ui-linear-progress>`);
            const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
            expect(bar.style.transform).toBe('scaleX(1)');
        });

        it('reactive value update changes transform', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress variant="determinate" .value="${20}"></ui-linear-progress>`);
            const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
            expect(bar.style.transform).toBe('scaleX(0.2)');

            el.value = 80;
            await el.updateComplete;
            expect(bar.style.transform).toBe('scaleX(0.8)');
        });

        it('height prop sets CSS custom property on root', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress .height="${8}"></ui-linear-progress>`);
            const root = el.shadowRoot!.querySelector('.root') as HTMLElement;
            expect(root.style.getPropertyValue('--ui-linear-progress-height')).toBe('8px');
        });

        it('color prop sets CSS custom property on root', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress color="error"></ui-linear-progress>`);
            const root = el.shadowRoot!.querySelector('.root') as HTMLElement;
            expect(root.style.getPropertyValue('--ui-linear-progress-color')).toBe('#ef4444');
        });

        it('reflects variant and value as attributes', async () => {
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress variant="determinate" .value="${45}"></ui-linear-progress>`);
            await el.updateComplete;
            expect(el.getAttribute('variant')).toBe('determinate');
            expect(el.getAttribute('value')).toBe('45');
        });
    });
});
