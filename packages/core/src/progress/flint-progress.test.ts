import { fixture, html, expect } from '@open-wc/testing';
import { describe, it } from 'vitest';
import './flint-linear-progress.js';
import './flint-circular-progress.js';
import type { FlintLinearProgress } from './flint-linear-progress.js';
import type { FlintCircularProgress } from './flint-circular-progress.js';

describe('FlintLinearProgress', () => {
    // --- Default render (indeterminate) ---

    it('is defined as a custom element', async () => {
        const el = document.createElement('flint-linear-progress');
        expect(el).to.be.instanceOf(HTMLElement);
    });

    it('renders with indeterminate variant by default', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root')!;
        expect(root).to.exist;
        expect(root.classList.contains('indeterminate')).to.equal(true);
        expect(root.classList.contains('determinate')).to.equal(false);
        expect(el.variant).to.equal('indeterminate');
    });

    it('renders two bars (bar1 and bar2) in indeterminate mode', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress></flint-linear-progress>`);
        expect(el.shadowRoot!.querySelector('.bar1')).to.not.be.null;
        expect(el.shadowRoot!.querySelector('.bar2')).to.not.be.null;
        const bars = el.shadowRoot!.querySelectorAll('.bar');
        expect(bars.length).to.equal(2);
    });

    it('does not set aria-valuenow in indeterminate mode', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root')!;
        expect(root.hasAttribute('aria-valuenow')).to.equal(false);
    });

    // --- Determinate variant ---

    it('renders determinate variant with correct class', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress variant="determinate" .value=${50}></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root')!;
        expect(root.classList.contains('determinate')).to.equal(true);
        expect(root.classList.contains('indeterminate')).to.equal(false);
    });

    it('renders exactly one bar in determinate mode', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress variant="determinate" .value=${50}></flint-linear-progress>`);
        const bars = el.shadowRoot!.querySelectorAll('.bar');
        expect(bars.length).to.equal(1);
        expect(el.shadowRoot!.querySelector('.bar1')).to.be.null;
        expect(el.shadowRoot!.querySelector('.bar2')).to.be.null;
    });

    it('applies correct scaleX transform based on value', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress variant="determinate" .value=${75}></flint-linear-progress>`);
        const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
        expect(bar.style.transform).to.equal('scaleX(0.75)');
    });

    it('updates transform reactively when value changes', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress variant="determinate" .value=${20}></flint-linear-progress>`);
        const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
        expect(bar.style.transform).to.equal('scaleX(0.2)');

        el.value = 80;
        await el.updateComplete;
        const updatedBar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
        expect(updatedBar.style.transform).to.equal('scaleX(0.8)');
    });

    // --- ARIA attributes ---

    it('sets role=progressbar', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root')!;
        expect(root.getAttribute('role')).to.equal('progressbar');
    });

    it('sets aria-valuemin=0 and aria-valuemax=100', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root')!;
        expect(root.getAttribute('aria-valuemin')).to.equal('0');
        expect(root.getAttribute('aria-valuemax')).to.equal('100');
    });

    it('sets aria-valuenow in determinate mode', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress variant="determinate" .value=${60}></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root')!;
        expect(root.getAttribute('aria-valuenow')).to.equal('60');
    });

    it('sets aria-label when label is provided', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress label="Upload progress"></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root')!;
        expect(root.getAttribute('aria-label')).to.equal('Upload progress');
    });

    it('omits aria-label when label is empty', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root')!;
        expect(root.hasAttribute('aria-label')).to.equal(false);
    });

    // --- Color property ---

    it('defaults to primary color', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress></flint-linear-progress>`);
        expect(el.color).to.equal('primary');
        await el.updateComplete;
        expect(el.getAttribute('color')).to.equal('primary');
    });

    it('sets CSS custom property for primary color', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root') as HTMLElement;
        expect(root.style.getPropertyValue('--flint-linear-progress-color')).to.equal('var(--flint-primary-color, #3b82f6)');
    });

    it('sets CSS custom property for success color', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress color="success"></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root') as HTMLElement;
        expect(root.style.getPropertyValue('--flint-linear-progress-color')).to.equal('var(--flint-success-color, #22c55e)');
    });

    it('sets CSS custom property for error color', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress color="error"></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root') as HTMLElement;
        expect(root.style.getPropertyValue('--flint-linear-progress-color')).to.equal('var(--flint-error-color, #ef4444)');
    });

    it('sets CSS custom property for warning color', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress color="warning"></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root') as HTMLElement;
        expect(root.style.getPropertyValue('--flint-linear-progress-color')).to.equal('var(--flint-warning-color, #f59e0b)');
    });

    // --- Value clamping ---

    it('clamps value above 100 to 100', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress variant="determinate" .value=${150}></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root')!;
        expect(root.getAttribute('aria-valuenow')).to.equal('100');
        const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
        expect(bar.style.transform).to.equal('scaleX(1)');
    });

    it('clamps value below 0 to 0', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress variant="determinate" .value=${-20}></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root')!;
        expect(root.getAttribute('aria-valuenow')).to.equal('0');
        const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
        expect(bar.style.transform).to.equal('scaleX(0)');
    });

    // --- Custom height ---

    it('defaults to 4px height', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root') as HTMLElement;
        expect(root.style.getPropertyValue('--flint-linear-progress-height')).to.equal('4px');
    });

    it('applies custom height via CSS custom property', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress .height=${8}></flint-linear-progress>`);
        const root = el.shadowRoot!.querySelector('.root') as HTMLElement;
        expect(root.style.getPropertyValue('--flint-linear-progress-height')).to.equal('8px');
    });

    // --- Reflected attributes ---

    it('reflects variant and value as attributes', async () => {
        const el = await fixture<FlintLinearProgress>(html`<flint-linear-progress variant="determinate" .value=${45}></flint-linear-progress>`);
        await el.updateComplete;
        expect(el.getAttribute('variant')).to.equal('determinate');
        expect(el.getAttribute('value')).to.equal('45');
    });
});

describe('FlintCircularProgress', () => {
    // --- Default render (indeterminate) ---

    it('is defined as a custom element', async () => {
        const el = document.createElement('flint-circular-progress');
        expect(el).to.be.instanceOf(HTMLElement);
    });

    it('renders with indeterminate variant by default', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root')!;
        expect(root).to.exist;
        expect(root.classList.contains('indeterminate')).to.equal(true);
        expect(root.classList.contains('determinate')).to.equal(false);
        expect(el.variant).to.equal('indeterminate');
    });

    it('renders an SVG with a circle element', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress></flint-circular-progress>`);
        const svg = el.shadowRoot!.querySelector('svg');
        expect(svg).to.exist;
        const circle = svg!.querySelector('circle');
        expect(circle).to.exist;
    });

    it('does not set aria-valuenow in indeterminate mode', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root')!;
        expect(root.hasAttribute('aria-valuenow')).to.equal(false);
    });

    it('does not apply stroke-dash styles in indeterminate mode', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress></flint-circular-progress>`);
        const circle = el.shadowRoot!.querySelector('circle') as SVGCircleElement;
        const style = circle.getAttribute('style') ?? '';
        expect(style).to.equal('');
    });

    // --- Determinate variant ---

    it('renders determinate variant with correct class', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress variant="determinate" .value=${50}></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root')!;
        expect(root.classList.contains('determinate')).to.equal(true);
        expect(root.classList.contains('indeterminate')).to.equal(false);
    });

    it('applies stroke-dasharray and stroke-dashoffset in determinate mode', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress variant="determinate" .value=${50}></flint-circular-progress>`);
        const circle = el.shadowRoot!.querySelector('circle') as SVGCircleElement;
        const style = circle.getAttribute('style') ?? '';
        expect(style).to.contain('stroke-dasharray');
        expect(style).to.contain('stroke-dashoffset');
    });

    it('stroke-dashoffset at 0% equals full circumference', async () => {
        const thickness = 3.6;
        const radius = 20 - thickness / 2;
        const circumference = 2 * Math.PI * radius;
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress variant="determinate" .value=${0} .thickness=${thickness}></flint-circular-progress>`);
        const circle = el.shadowRoot!.querySelector('circle') as SVGCircleElement;
        const offset = parseFloat(circle.style.strokeDashoffset);
        expect(offset).to.be.closeTo(circumference, 0.1);
    });

    it('stroke-dashoffset at 100% is 0', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress variant="determinate" .value=${100}></flint-circular-progress>`);
        const circle = el.shadowRoot!.querySelector('circle') as SVGCircleElement;
        expect(parseFloat(circle.style.strokeDashoffset)).to.be.closeTo(0, 0.1);
    });

    it('stroke-dashoffset at 50% is half circumference', async () => {
        const thickness = 3.6;
        const radius = 20 - thickness / 2;
        const circumference = 2 * Math.PI * radius;
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress variant="determinate" .value=${50} .thickness=${thickness}></flint-circular-progress>`);
        const circle = el.shadowRoot!.querySelector('circle') as SVGCircleElement;
        const offset = parseFloat(circle.style.strokeDashoffset);
        expect(offset).to.be.closeTo(circumference / 2, 0.1);
    });

    // --- ARIA attributes ---

    it('sets role=progressbar', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root')!;
        expect(root.getAttribute('role')).to.equal('progressbar');
    });

    it('sets aria-valuemin=0 and aria-valuemax=100', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root')!;
        expect(root.getAttribute('aria-valuemin')).to.equal('0');
        expect(root.getAttribute('aria-valuemax')).to.equal('100');
    });

    it('sets aria-valuenow in determinate mode', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress variant="determinate" .value=${75}></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root')!;
        expect(root.getAttribute('aria-valuenow')).to.equal('75');
    });

    it('sets aria-label when label is provided', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress label="Loading data"></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root')!;
        expect(root.getAttribute('aria-label')).to.equal('Loading data');
    });

    it('omits aria-label when label is empty', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root')!;
        expect(root.hasAttribute('aria-label')).to.equal(false);
    });

    // --- Color property ---

    it('defaults to primary color', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress></flint-circular-progress>`);
        expect(el.color).to.equal('primary');
        await el.updateComplete;
        expect(el.getAttribute('color')).to.equal('primary');
    });

    it('sets CSS custom property for primary color', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root') as HTMLElement;
        expect(root.style.getPropertyValue('--flint-circular-progress-color')).to.equal('var(--flint-primary-color, #3b82f6)');
    });

    it('sets CSS custom property for success color', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress color="success"></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root') as HTMLElement;
        expect(root.style.getPropertyValue('--flint-circular-progress-color')).to.equal('var(--flint-success-color, #22c55e)');
    });

    it('sets CSS custom property for error color', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress color="error"></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root') as HTMLElement;
        expect(root.style.getPropertyValue('--flint-circular-progress-color')).to.equal('var(--flint-error-color, #ef4444)');
    });

    it('sets CSS custom property for warning color', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress color="warning"></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root') as HTMLElement;
        expect(root.style.getPropertyValue('--flint-circular-progress-color')).to.equal('var(--flint-warning-color, #f59e0b)');
    });

    // --- Value clamping ---

    it('clamps value above 100 to 100', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress variant="determinate" .value=${200}></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root')!;
        expect(root.getAttribute('aria-valuenow')).to.equal('100');
    });

    it('clamps value below 0 to 0', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress variant="determinate" .value=${-50}></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root')!;
        expect(root.getAttribute('aria-valuenow')).to.equal('0');
    });

    // --- Custom size and thickness ---

    it('defaults to size 40', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress></flint-circular-progress>`);
        expect(el.size).to.equal(40);
        const root = el.shadowRoot!.querySelector('.circular-root') as HTMLElement;
        expect(root.style.getPropertyValue('--flint-circular-progress-size')).to.equal('40px');
    });

    it('applies custom size via CSS custom property', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress .size=${64}></flint-circular-progress>`);
        const root = el.shadowRoot!.querySelector('.circular-root') as HTMLElement;
        expect(root.style.getPropertyValue('--flint-circular-progress-size')).to.equal('64px');
    });

    it('defaults to thickness 3.6', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress></flint-circular-progress>`);
        expect(el.thickness).to.equal(3.6);
    });

    it('applies custom thickness as stroke-width on circle', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress .thickness=${5}></flint-circular-progress>`);
        const circle = el.shadowRoot!.querySelector('circle')!;
        expect(circle.getAttribute('stroke-width')).to.equal('5');
    });

    it('computes correct radius based on thickness (radius = 20 - thickness/2)', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress .thickness=${4}></flint-circular-progress>`);
        const circle = el.shadowRoot!.querySelector('circle')!;
        // radius = 20 - 4/2 = 18
        expect(circle.getAttribute('r')).to.equal('18');
    });

    it('radius shrinks with larger thickness to prevent clipping', async () => {
        const thickness = 10;
        const expectedRadius = 20 - thickness / 2; // 15
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress .thickness=${thickness}></flint-circular-progress>`);
        const circle = el.shadowRoot!.querySelector('circle')!;
        expect(Number(circle.getAttribute('r'))).to.be.closeTo(expectedRadius, 0.001);
    });

    // --- Reflected attributes ---

    it('reflects variant and value as attributes', async () => {
        const el = await fixture<FlintCircularProgress>(html`<flint-circular-progress variant="determinate" .value=${30}></flint-circular-progress>`);
        await el.updateComplete;
        expect(el.getAttribute('variant')).to.equal('determinate');
        expect(el.getAttribute('value')).to.equal('30');
    });
});
