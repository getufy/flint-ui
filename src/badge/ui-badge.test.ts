import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-badge';
import type { UiBadge } from './ui-badge';

describe('ui-badge', () => {
    it('is defined', async () => {
        const el = document.createElement('ui-badge');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders content correctly', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="5"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.textContent?.trim()).toBe('5');
    });

    it('handles max value', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="150" max="99"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.textContent?.trim()).toBe('99+');
    });

    it('handles custom max value', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="20" max="9"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.textContent?.trim()).toBe('9+');
    });

    it('does not truncate when content equals max', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="99" max="99"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.textContent?.trim()).toBe('99');
    });

    it('renders string content as-is', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="!"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.textContent?.trim()).toBe('!');
    });

    it('shows badge when content is "0"', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="0"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('hidden')).toBe(false);
        expect(badge?.textContent?.trim()).toBe('0');
    });

    it('hides badge when no content and not dot', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('hidden')).toBe(true);
    });

    it('renders as dot', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge dot></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('dot')).toBe(true);
        expect(badge?.textContent?.trim()).toBe('');
    });

    it('dot does not render content even when content is set', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge dot content="5"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.textContent?.trim()).toBe('');
    });

    it('hides when invisible property is true', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="5" invisible></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('hidden')).toBe(true);
    });

    it('invisible on dot also hides', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge dot invisible></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('hidden')).toBe(true);
    });

    it('does not hide the host element when invisible is set', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="5" invisible></ui-badge>`);
        expect(getComputedStyle(el).display).not.toBe('none');
    });

    it('sets aria-hidden true when badge is not shown', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="5" invisible></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.getAttribute('aria-hidden')).toBe('true');
    });

    it('sets aria-hidden false when badge is shown', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="5"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.getAttribute('aria-hidden')).toBe('false');
    });

    it('has role="status" on badge span', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="5"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.getAttribute('role')).toBe('status');
    });

    it('applies primary variant class by default', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="1"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('primary')).toBe(true);
    });

    it('applies secondary variant class', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="1" variant="secondary"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('secondary')).toBe(true);
    });

    it('applies error variant class', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="1" variant="error"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('error')).toBe(true);
    });

    it('applies success variant class', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="1" variant="success"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('success')).toBe(true);
    });

    it('applies warning variant class', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="1" variant="warning"></ui-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('warning')).toBe(true);
    });

    it('renders slotted children', async () => {
        const el = await fixture<UiBadge>(html`<ui-badge content="3"><span id="child">icon</span></ui-badge>`);
        const child = el.querySelector('#child');
        expect(child).toBeTruthy();
        expect(child?.textContent).toBe('icon');
    });
});
