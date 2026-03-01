import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-rating';
import type { UiRating } from './ui-rating';

describe('ui-rating', () => {
    it('renders correct number of stars', async () => {
        const el = await fixture<UiRating>(html`<ui-rating max="5"></ui-rating>`);
        const stars = el.shadowRoot!.querySelectorAll('.star-wrapper');
        expect(stars.length).toBe(5);
    });

    it('sets initial value correctly', async () => {
        const el = await fixture<UiRating>(html`<ui-rating value="3"></ui-rating>`);
        const activeStars = el.shadowRoot!.querySelectorAll('.active');
        expect(activeStars.length).toBe(3);
    });

    it('updates value on click', async () => {
        const el = await fixture<UiRating>(html`<ui-rating value="0"></ui-rating>`);
        const stars = el.shadowRoot!.querySelectorAll('.star-wrapper');

        (stars[3] as HTMLElement).click(); // Click 4th star
        await el.updateComplete;

        expect(el.value).toBe(4);
        const activeStars = el.shadowRoot!.querySelectorAll('.active');
        expect(activeStars.length).toBe(4);
    });

    it('shows hover preview', async () => {
        const el = await fixture<UiRating>(html`<ui-rating value="1"></ui-rating>`);
        const stars = el.shadowRoot!.querySelectorAll('.star-wrapper');

        // Dispatch mouseenter on 3rd star
        stars[2].dispatchEvent(new MouseEvent('mouseenter'));
        await el.updateComplete;

        const hoveredStars = el.shadowRoot!.querySelectorAll('.hover');
        expect(hoveredStars.length).toBe(3);
    });

    it('respects readonly mode', async () => {
        const el = await fixture<UiRating>(html`<ui-rating value="2" readonly></ui-rating>`);
        const stars = el.shadowRoot!.querySelectorAll('.star-wrapper');

        (stars[4] as HTMLElement).click();
        await el.updateComplete;

        expect(el.value).toBe(2); // Should not change
    });

    it('dispatches change event', async () => {
        let selectedValue = 0;
        const el = await fixture<UiRating>(html`
            <ui-rating @change=${(e: CustomEvent) => selectedValue = e.detail.value}></ui-rating>
        `);

        const stars = el.shadowRoot!.querySelectorAll('.star-wrapper');
        (stars[2] as HTMLElement).click();

        expect(selectedValue).toBe(3);
    });
});
