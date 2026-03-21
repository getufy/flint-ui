import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-badge';
import type { FlintBadge } from './flint-badge';
import { expectAccessible } from '../test-utils/axe.js';

describe('flint-badge', () => {
    it('is defined', async () => {
        const el = document.createElement('flint-badge');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders content correctly', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="5"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.textContent?.trim()).toBe('5');
    });

    it('handles max value', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="150" max="99"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.textContent?.trim()).toBe('99+');
    });

    it('handles custom max value', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="20" max="9"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.textContent?.trim()).toBe('9+');
    });

    it('does not truncate when content equals max', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="99" max="99"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.textContent?.trim()).toBe('99');
    });

    it('renders string content as-is', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="!"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.textContent?.trim()).toBe('!');
    });

    it('shows badge when content is "0"', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="0"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('hidden')).toBe(false);
        expect(badge?.textContent?.trim()).toBe('0');
    });

    it('hides badge when no content and not dot', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('hidden')).toBe(true);
    });

    it('renders as dot', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge dot></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('dot')).toBe(true);
        expect(badge?.textContent?.trim()).toBe('');
    });

    it('dot does not render content even when content is set', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge dot content="5"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.textContent?.trim()).toBe('');
    });

    it('hides when invisible property is true', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="5" invisible></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('hidden')).toBe(true);
    });

    it('invisible on dot also hides', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge dot invisible></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('hidden')).toBe(true);
    });

    it('does not hide the host element when invisible is set', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="5" invisible></flint-badge>`);
        expect(getComputedStyle(el).display).not.toBe('none');
    });

    it('sets aria-hidden true when badge is not shown', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="5" invisible></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.getAttribute('aria-hidden')).toBe('true');
    });

    it('sets aria-hidden false when badge is shown', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="5"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.getAttribute('aria-hidden')).toBe('false');
    });

    it('has role="status" on badge span', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="5"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.getAttribute('role')).toBe('status');
    });

    it('applies primary variant class by default', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="1"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('primary')).toBe(true);
    });

    it('applies secondary variant class', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="1" variant="secondary"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('secondary')).toBe(true);
    });

    it('applies error variant class', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="1" variant="error"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('error')).toBe(true);
    });

    it('applies success variant class', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="1" variant="success"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('success')).toBe(true);
    });

    it('applies warning variant class', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="1" variant="warning"></flint-badge>`);
        const badge = el.shadowRoot!.querySelector('.badge');
        expect(badge?.classList.contains('warning')).toBe(true);
    });

    it('renders slotted children', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="3"><span id="child">icon</span></flint-badge>`);
        const child = el.querySelector('#child');
        expect(child).toBeTruthy();
        expect(child?.textContent).toBe('icon');
    });

    it('reflects variant attribute to host', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge content="1" variant="error"></flint-badge>`);
        expect(el.getAttribute('variant')).toBe('error');
    });

    it('reflects dot attribute to host', async () => {
        const el = await fixture<FlintBadge>(html`<flint-badge dot></flint-badge>`);
        expect(el.hasAttribute('dot')).toBe(true);
    });

    describe('accessibility', () => {
        it('should be accessible', async () => {
            const el = await fixture(html`<flint-badge content="5"><span>Notifications</span></flint-badge>`);
            await expectAccessible(el);
        });
    });
});
