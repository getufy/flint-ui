import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-rating';
import type { UiRating } from './ui-rating';

// ─── helpers ────────────────────────────────────────────────────────────────

function getStar(el: UiRating, index: number): HTMLElement {
    return el.shadowRoot!.querySelectorAll<HTMLElement>('.star-wrapper')[index];
}

function countClass(el: UiRating, cls: string): number {
    return el.shadowRoot!.querySelectorAll(`.${cls}`).length;
}

// ─── rendering ──────────────────────────────────────────────────────────────

describe('ui-rating — rendering', () => {
    it('renders correct number of stars for default max', async () => {
        const el = await fixture<UiRating>(html`<ui-rating></ui-rating>`);
        expect(el.shadowRoot!.querySelectorAll('.star-wrapper').length).toBe(5);
    });

    it('renders correct number of stars when max changes', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .max=${3}></ui-rating>`);
        expect(el.shadowRoot!.querySelectorAll('.star-wrapper').length).toBe(3);
    });

    it('sets initial active stars from value prop', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${3}></ui-rating>`);
        expect(countClass(el, 'active')).toBe(3);
    });

    it('defaultValue sets initial value in uncontrolled mode', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .defaultValue=${4}></ui-rating>`);
        expect(el.value).toBe(4);
        expect(countClass(el, 'active')).toBe(4);
    });
});

// ─── ARIA ────────────────────────────────────────────────────────────────────

describe('ui-rating — ARIA', () => {
    it('container has role="radiogroup"', async () => {
        const el = await fixture<UiRating>(html`<ui-rating></ui-rating>`);
        const container = el.shadowRoot!.querySelector('.rating-container');
        expect(container?.getAttribute('role')).toBe('radiogroup');
    });

    it('each star has role="radio"', async () => {
        const el = await fixture<UiRating>(html`<ui-rating></ui-rating>`);
        const stars = el.shadowRoot!.querySelectorAll('.star-wrapper');
        stars.forEach(s => expect(s.getAttribute('role')).toBe('radio'));
    });

    it('aria-label on container matches label prop', async () => {
        const el = await fixture<UiRating>(html`<ui-rating label="Product rating"></ui-rating>`);
        const container = el.shadowRoot!.querySelector('.rating-container');
        expect(container?.getAttribute('aria-label')).toBe('Product rating');
    });

    it('default aria-label is "Rating"', async () => {
        const el = await fixture<UiRating>(html`<ui-rating></ui-rating>`);
        const container = el.shadowRoot!.querySelector('.rating-container');
        expect(container?.getAttribute('aria-label')).toBe('Rating');
    });

    it('aria-checked reflects which stars are selected', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${3}></ui-rating>`);
        const stars = el.shadowRoot!.querySelectorAll<HTMLElement>('.star-wrapper');
        expect(stars[0].getAttribute('aria-checked')).toBe('true');
        expect(stars[2].getAttribute('aria-checked')).toBe('true');
        expect(stars[3].getAttribute('aria-checked')).toBe('false');
    });

    it('aria-disabled on container when disabled', async () => {
        const el = await fixture<UiRating>(html`<ui-rating disabled></ui-rating>`);
        const container = el.shadowRoot!.querySelector('.rating-container');
        expect(container?.getAttribute('aria-disabled')).toBe('true');
    });

    it('aria-readonly on container when readonly', async () => {
        const el = await fixture<UiRating>(html`<ui-rating readonly></ui-rating>`);
        const container = el.shadowRoot!.querySelector('.rating-container');
        expect(container?.getAttribute('aria-readonly')).toBe('true');
    });
});

// ─── interaction ─────────────────────────────────────────────────────────────

describe('ui-rating — interaction', () => {
    it('updates value on star click', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${0}></ui-rating>`);
        getStar(el, 3).click();
        await el.updateComplete;
        expect(el.value).toBe(4);
        expect(countClass(el, 'active')).toBe(4);
    });

    it('shows hover class on mouseenter', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${1}></ui-rating>`);
        getStar(el, 2).dispatchEvent(new MouseEvent('mouseenter'));
        await el.updateComplete;
        expect(countClass(el, 'hover')).toBe(3);
    });

    it('clears hover state on container mouseleave', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${1}></ui-rating>`);
        getStar(el, 2).dispatchEvent(new MouseEvent('mouseenter'));
        await el.updateComplete;
        el.shadowRoot!.querySelector('.rating-container')!
            .dispatchEvent(new MouseEvent('mouseleave'));
        await el.updateComplete;
        expect(countClass(el, 'hover')).toBe(0);
    });

    it('dispatches ui-rating-change with correct value', async () => {
        const spy = vi.fn();
        const el = await fixture<UiRating>(html`<ui-rating @ui-rating-change=${spy}></ui-rating>`);
        getStar(el, 2).click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe(3);
    });

    it('clearable: clicking same star twice resets to 0', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${3} .clearable=${true}></ui-rating>`);
        getStar(el, 2).click();
        await el.updateComplete;
        expect(el.value).toBe(0);
    });

    it('clearable=false (default): clicking same star keeps value', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${3}></ui-rating>`);
        getStar(el, 2).click();
        await el.updateComplete;
        expect(el.value).toBe(3);
    });
});

// ─── readonly ─────────────────────────────────────────────────────────────────

describe('ui-rating — readonly', () => {
    it('reflects readonly attribute on host', async () => {
        const el = await fixture<UiRating>(html`<ui-rating readonly></ui-rating>`);
        expect(el.hasAttribute('readonly')).toBe(true);
    });

    it('does not change value on click', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${2} readonly></ui-rating>`);
        getStar(el, 4).click();
        await el.updateComplete;
        expect(el.value).toBe(2);
    });

    it('does not show hover on mouseenter', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${1} readonly></ui-rating>`);
        getStar(el, 2).dispatchEvent(new MouseEvent('mouseenter'));
        await el.updateComplete;
        expect(countClass(el, 'hover')).toBe(0);
    });

    it('does not fire ui-rating-change on click', async () => {
        const spy = vi.fn();
        const el = await fixture<UiRating>(html`<ui-rating .value=${2} readonly @ui-rating-change=${spy}></ui-rating>`);
        getStar(el, 4).click();
        expect(spy).not.toHaveBeenCalled();
    });
});

// ─── disabled ─────────────────────────────────────────────────────────────────

describe('ui-rating — disabled', () => {
    it('reflects disabled attribute on host', async () => {
        const el = await fixture<UiRating>(html`<ui-rating disabled></ui-rating>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('does not change value on click', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${2} disabled></ui-rating>`);
        getStar(el, 4).click();
        await el.updateComplete;
        expect(el.value).toBe(2);
    });

    it('does not show hover on mouseenter', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${1} disabled></ui-rating>`);
        getStar(el, 2).dispatchEvent(new MouseEvent('mouseenter'));
        await el.updateComplete;
        expect(countClass(el, 'hover')).toBe(0);
    });

    it('does not fire ui-rating-change on click', async () => {
        const spy = vi.fn();
        const el = await fixture<UiRating>(html`<ui-rating .value=${2} disabled @ui-rating-change=${spy}></ui-rating>`);
        getStar(el, 4).click();
        expect(spy).not.toHaveBeenCalled();
    });
});

// ─── keyboard ─────────────────────────────────────────────────────────────────

describe('ui-rating — keyboard', () => {
    it('ArrowRight increments value', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${2}></ui-rating>`);
        getStar(el, 1).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe(3);
    });

    it('ArrowLeft decrements value', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${3}></ui-rating>`);
        getStar(el, 2).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe(2);
    });

    it('ArrowUp increments value', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${1}></ui-rating>`);
        getStar(el, 0).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe(2);
    });

    it('ArrowDown decrements value', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${4}></ui-rating>`);
        getStar(el, 3).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe(3);
    });

    it('Home sets value to 0', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${4}></ui-rating>`);
        getStar(el, 3).dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe(0);
    });

    it('End sets value to max', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${1} .max=${5}></ui-rating>`);
        getStar(el, 0).dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe(5);
    });

    it('ArrowRight clamps at max', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${5} .max=${5}></ui-rating>`);
        getStar(el, 4).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe(5);
    });

    it('ArrowLeft clamps at 0', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${0}></ui-rating>`);
        getStar(el, 0).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe(0);
    });

    it('keyboard fires ui-rating-change', async () => {
        const spy = vi.fn();
        const el = await fixture<UiRating>(html`<ui-rating .value=${2} @ui-rating-change=${spy}></ui-rating>`);
        getStar(el, 1).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe(3);
    });

    it('keyboard does nothing when disabled', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${2} disabled></ui-rating>`);
        getStar(el, 1).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe(2);
    });

    it('keyboard does nothing when readonly', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${2} readonly></ui-rating>`);
        getStar(el, 1).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe(2);
    });

    it('Enter key fires click on focused star', async () => {
        const spy = vi.fn();
        const el = await fixture<UiRating>(html`<ui-rating .value=${1} @ui-rating-change=${spy}></ui-rating>`);
        getStar(el, 2).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe(3);
    });
});

// ─── precision / half-star ───────────────────────────────────────────────────

describe('ui-rating — precision', () => {
    it('precision=0.5: half class applied for fractional value', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${2.5} .precision=${0.5 as const}></ui-rating>`);
        expect(countClass(el, 'half')).toBe(1);
        expect(countClass(el, 'active')).toBe(2);
    });

    it('precision=0.5: ArrowRight increments by 0.5', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${2} .precision=${0.5 as const}></ui-rating>`);
        getStar(el, 1).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe(2.5);
    });

    it('precision=0.5: ArrowLeft decrements by 0.5', async () => {
        const el = await fixture<UiRating>(html`<ui-rating .value=${3} .precision=${0.5 as const}></ui-rating>`);
        getStar(el, 2).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await el.updateComplete;
        expect(el.value).toBe(2.5);
    });
});

// ─── size ─────────────────────────────────────────────────────────────────────

describe('ui-rating — size', () => {
    it('reflects size attribute on host (default md)', async () => {
        const el = await fixture<UiRating>(html`<ui-rating></ui-rating>`);
        expect(el.getAttribute('size')).toBe('md');
    });

    it('reflects size="sm" attribute', async () => {
        const el = await fixture<UiRating>(html`<ui-rating size="sm"></ui-rating>`);
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('reflects size="lg" attribute', async () => {
        const el = await fixture<UiRating>(html`<ui-rating size="lg"></ui-rating>`);
        expect(el.getAttribute('size')).toBe('lg');
    });
});

// ─── form / name ──────────────────────────────────────────────────────────────

describe('ui-rating — form / name', () => {
    it('hidden input is present in shadow DOM', async () => {
        const el = await fixture<UiRating>(html`<ui-rating name="score"></ui-rating>`);
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('.hidden-input');
        expect(input).toBeTruthy();
        expect(input!.type).toBe('hidden');
    });

    it('hidden input name reflects name prop', async () => {
        const el = await fixture<UiRating>(html`<ui-rating name="score"></ui-rating>`);
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('.hidden-input');
        expect(input!.name).toBe('score');
    });

    it('hidden input value updates when rating changes', async () => {
        const el = await fixture<UiRating>(html`<ui-rating name="score" .value=${0}></ui-rating>`);
        getStar(el, 2).click();
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('.hidden-input');
        expect(input!.value).toBe('3');
    });
});
