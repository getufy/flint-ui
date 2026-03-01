import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-avatar.js';
import type { UiAvatar } from './ui-avatar.js';

describe('ui-avatar', () => {
    it('is defined', () => {
        const el = document.createElement('ui-avatar');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders image when src is provided', async () => {
        const el = await fixture<UiAvatar>(html`
      <ui-avatar src="test.jpg" alt="test"></ui-avatar>
    `);
        const img = el.shadowRoot?.querySelector('img');
        expect(img).not.toBeNull();
        expect(img?.src).toContain('test.jpg');
        expect(img?.alt).toBe('test');
    });

    it('shows loading skeleton while image loads', async () => {
        const el = await fixture<UiAvatar>(html`<ui-avatar src="test.jpg"></ui-avatar>`);
        const base = el.shadowRoot?.querySelector('.avatar');
        expect(base?.classList.contains('loading')).toBe(true);
        const img = el.shadowRoot?.querySelector('img');
        expect(img?.style.display).toBe('none');
    });

    it('clears loading state after image loads', async () => {
        const el = await fixture<UiAvatar>(html`<ui-avatar src="test.jpg"></ui-avatar>`);
        const img = el.shadowRoot!.querySelector('img')!;
        img.dispatchEvent(new Event('load'));
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('.avatar')?.classList.contains('loading')).toBe(false);
        expect(img.getAttribute('style')).toBeNull();
    });

    it('renders initials when src is missing', async () => {
        const el = await fixture<UiAvatar>(html`
      <ui-avatar initials="JD"></ui-avatar>
    `);
        expect(el.shadowRoot?.textContent).toContain('JD');
    });

    it('truncates initials to 2 characters', async () => {
        const el = await fixture<UiAvatar>(html`<ui-avatar initials="ABC"></ui-avatar>`);
        const span = el.shadowRoot?.querySelector('.initials');
        expect(span?.textContent?.trim()).toBe('AB');
    });

    it('renders fallback icon when no src or initials', async () => {
        const el = await fixture<UiAvatar>(html`<ui-avatar></ui-avatar>`);
        const svg = el.shadowRoot?.querySelector('svg');
        expect(svg).not.toBeNull();
    });

    it('applies variant classes correctly', async () => {
        const elCircle = await fixture<UiAvatar>(html`<ui-avatar variant="circle"></ui-avatar>`);
        expect(elCircle.shadowRoot?.querySelector('.avatar')?.classList.contains('circle')).toBe(false);

        const elSquare = await fixture<UiAvatar>(html`<ui-avatar variant="square"></ui-avatar>`);
        expect(elSquare.shadowRoot?.querySelector('.avatar')?.classList.contains('square')).toBe(true);

        const elRounded = await fixture<UiAvatar>(html`<ui-avatar variant="rounded"></ui-avatar>`);
        expect(elRounded.shadowRoot?.querySelector('.avatar')?.classList.contains('rounded')).toBe(true);
    });

    it('reflects size attribute', async () => {
        const el = await fixture<UiAvatar>(html`<ui-avatar size="large"></ui-avatar>`);
        expect(el.getAttribute('size')).toBe('large');
    });

    it('handles image error by showing initials', async () => {
        const el = await fixture<UiAvatar>(html`
      <ui-avatar src="invalid-image.png" initials="JD"></ui-avatar>
    `);
        const img = el.shadowRoot!.querySelector('img')!;

        img.dispatchEvent(new Event('error'));
        await el.updateComplete;

        expect(el.shadowRoot?.querySelector('img')).toBeNull();
        expect(el.shadowRoot?.textContent).toContain('JD');
    });

    it('shows fallback icon when image errors and no initials', async () => {
        const el = await fixture<UiAvatar>(html`<ui-avatar src="invalid.png"></ui-avatar>`);
        el.shadowRoot!.querySelector('img')!.dispatchEvent(new Event('error'));
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('svg')).not.toBeNull();
    });

    it('resets error state when src changes', async () => {
        const el = await fixture<UiAvatar>(html`
      <ui-avatar src="invalid.png" initials="JD"></ui-avatar>
    `);
        el.shadowRoot!.querySelector('img')!.dispatchEvent(new Event('error'));
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('img')).toBeNull();

        el.src = 'new-image.jpg';
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('img')).not.toBeNull();
    });
});
