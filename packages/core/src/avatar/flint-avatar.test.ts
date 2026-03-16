import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-avatar.js';
import type { FlintAvatar } from './flint-avatar.js';

describe('flint-avatar', () => {
    it('is defined', () => {
        const el = document.createElement('flint-avatar');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders image when src is provided', async () => {
        const el = await fixture<FlintAvatar>(html`
      <flint-avatar src="test.jpg" alt="test"></flint-avatar>
    `);
        const img = el.shadowRoot?.querySelector('img');
        expect(img).not.toBeNull();
        expect(img?.src).toContain('test.jpg');
        expect(img?.alt).toBe('test');
    });

    it('shows loading skeleton while image loads', async () => {
        const el = await fixture<FlintAvatar>(html`<flint-avatar src="test.jpg"></flint-avatar>`);
        const base = el.shadowRoot?.querySelector('.avatar');
        expect(base?.classList.contains('loading')).toBe(true);
        const img = el.shadowRoot?.querySelector('img');
        expect(img?.style.display).toBe('none');
    });

    it('clears loading state after image loads', async () => {
        const el = await fixture<FlintAvatar>(html`<flint-avatar src="test.jpg"></flint-avatar>`);
        const img = el.shadowRoot!.querySelector('img')!;
        img.dispatchEvent(new Event('load'));
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('.avatar')?.classList.contains('loading')).toBe(false);
        expect(img.getAttribute('style')).toBeNull();
    });

    it('renders initials when src is missing', async () => {
        const el = await fixture<FlintAvatar>(html`
      <flint-avatar initials="JD"></flint-avatar>
    `);
        expect(el.shadowRoot?.textContent).toContain('JD');
    });

    it('truncates initials to 2 characters', async () => {
        const el = await fixture<FlintAvatar>(html`<flint-avatar initials="ABC"></flint-avatar>`);
        const span = el.shadowRoot?.querySelector('.initials');
        expect(span?.textContent?.trim()).toBe('AB');
    });

    it('renders fallback icon when no src or initials', async () => {
        const el = await fixture<FlintAvatar>(html`<flint-avatar></flint-avatar>`);
        const svg = el.shadowRoot?.querySelector('svg');
        expect(svg).not.toBeNull();
    });

    it('applies variant classes correctly', async () => {
        const elCircle = await fixture<FlintAvatar>(html`<flint-avatar variant="circle"></flint-avatar>`);
        expect(elCircle.shadowRoot?.querySelector('.avatar')?.classList.contains('circle')).toBe(false);

        const elSquare = await fixture<FlintAvatar>(html`<flint-avatar variant="square"></flint-avatar>`);
        expect(elSquare.shadowRoot?.querySelector('.avatar')?.classList.contains('square')).toBe(true);

        const elRounded = await fixture<FlintAvatar>(html`<flint-avatar variant="rounded"></flint-avatar>`);
        expect(elRounded.shadowRoot?.querySelector('.avatar')?.classList.contains('rounded')).toBe(true);
    });

    it('reflects size attribute', async () => {
        const el = await fixture<FlintAvatar>(html`<flint-avatar size="lg"></flint-avatar>`);
        expect(el.getAttribute('size')).toBe('lg');
    });

    it('handles image error by showing initials', async () => {
        const el = await fixture<FlintAvatar>(html`
      <flint-avatar src="invalid-image.png" initials="JD"></flint-avatar>
    `);
        const img = el.shadowRoot!.querySelector('img')!;

        img.dispatchEvent(new Event('error'));
        await el.updateComplete;

        expect(el.shadowRoot?.querySelector('img')).toBeNull();
        expect(el.shadowRoot?.textContent).toContain('JD');
    });

    it('shows fallback icon when image errors and no initials', async () => {
        const el = await fixture<FlintAvatar>(html`<flint-avatar src="invalid.png"></flint-avatar>`);
        el.shadowRoot!.querySelector('img')!.dispatchEvent(new Event('error'));
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('svg')).not.toBeNull();
    });

    it('resets error state when src changes', async () => {
        const el = await fixture<FlintAvatar>(html`
      <flint-avatar src="invalid.png" initials="JD"></flint-avatar>
    `);
        el.shadowRoot!.querySelector('img')!.dispatchEvent(new Event('error'));
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('img')).toBeNull();

        el.src = 'new-image.jpg';
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('img')).not.toBeNull();
    });

    it('ARIA: role="img" on avatar container', async () => {
        const el = await fixture<FlintAvatar>(html`<flint-avatar></flint-avatar>`);
        const base = el.shadowRoot?.querySelector('.avatar');
        expect(base?.getAttribute('role')).toBe('img');
    });

    it('ARIA: aria-label uses alt text', async () => {
        const el = await fixture<FlintAvatar>(html`<flint-avatar alt="John"></flint-avatar>`);
        const base = el.shadowRoot?.querySelector('.avatar');
        expect(base?.getAttribute('aria-label')).toBe('John');
    });

    it('ARIA: aria-label falls back to initials', async () => {
        const el = await fixture<FlintAvatar>(html`<flint-avatar initials="JD"></flint-avatar>`);
        const base = el.shadowRoot?.querySelector('.avatar');
        expect(base?.getAttribute('aria-label')).toBe('JD');
    });

    it('ARIA: aria-label falls back to "avatar"', async () => {
        const el = await fixture<FlintAvatar>(html`<flint-avatar></flint-avatar>`);
        const base = el.shadowRoot?.querySelector('.avatar');
        expect(base?.getAttribute('aria-label')).toBe('avatar');
    });

    it('default size is md', async () => {
        const el = await fixture<FlintAvatar>(html`<flint-avatar></flint-avatar>`);
        expect(el.size).toBe('md');
    });

    it('supports xl size', async () => {
        const el = await fixture<FlintAvatar>(html`<flint-avatar size="xl"></flint-avatar>`);
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('xl');
    });

    it('image has correct alt attribute', async () => {
        const el = await fixture<FlintAvatar>(html`
      <flint-avatar src="photo.jpg" alt="Profile photo"></flint-avatar>
    `);
        const img = el.shadowRoot?.querySelector('img');
        expect(img?.alt).toBe('Profile photo');
    });

    it('renders custom slot content when no src or initials', async () => {
        const el = await fixture<FlintAvatar>(html`
      <flint-avatar><span class="custom-icon">★</span></flint-avatar>
    `);
        const slot = el.shadowRoot?.querySelector('slot');
        const assigned = slot?.assignedNodes({ flatten: true });
        expect(assigned?.length).toBeGreaterThan(0);
        const custom = el.querySelector('.custom-icon');
        expect(custom).not.toBeNull();
        expect(custom?.textContent).toBe('★');
    });
});
