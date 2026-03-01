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
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress variant="determinate" value="50"></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root');
            const circle = el.shadowRoot!.querySelector('circle') as SVGCircleElement;

            expect(root?.classList.contains('determinate')).toBe(true);
            expect(el.value).toBe(50);
            expect(circle.style.strokeDashoffset).toBeDefined();
        });

        it('supports size property', async () => {
            const el = await fixture<UiCircularProgress>(html`<ui-circular-progress size="60"></ui-circular-progress>`);
            const root = el.shadowRoot!.querySelector('.circular-root') as HTMLElement;
            expect(root.style.getPropertyValue('--ui-circular-progress-size')).toBe('60px');
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
            const el = await fixture<UiLinearProgress>(html`<ui-linear-progress variant="determinate" value="40"></ui-linear-progress>`);
            const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;

            expect(el.variant).toBe('determinate');
            expect(el.value).toBe(40);
            expect(bar.style.transform).toBe('scaleX(0.4)');
        });
    });
});
