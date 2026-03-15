import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-card';
import './flint-card-header';
import './flint-card-media';
import './flint-card-content';
import './flint-card-actions';
import './flint-card-action-area';
import type { FlintCard } from './flint-card';
import type { FlintCardHeader } from './flint-card-header';
import type { FlintCardMedia } from './flint-card-media';
import type { FlintCardContent } from './flint-card-content';
import type { FlintCardActions } from './flint-card-actions';
import type { FlintCardActionArea } from './flint-card-action-area';

describe('Card Components', () => {
    describe('flint-card', () => {
        it('applies classes based on properties', async () => {
            const el = await fixture<FlintCard>(html`
                <flint-card variant="flat" interactive></flint-card>
            `);
            const cardDiv = el.shadowRoot!.querySelector('.card')!;

            expect(cardDiv.classList.contains('variant-flat')).toBe(true);
            expect(cardDiv.classList.contains('interactive')).toBe(true);
        });

        it('defaults to elevated, not interactive', async () => {
            const el = await fixture<FlintCard>(html`<flint-card></flint-card>`);
            const cardDiv = el.shadowRoot!.querySelector('.card')!;

            expect(cardDiv.classList.contains('variant-elevated')).toBe(true);
            expect(cardDiv.classList.contains('interactive')).toBe(false);
        });

        it('applies variant-outlined class', async () => {
            const el = await fixture<FlintCard>(html`<flint-card variant="outlined"></flint-card>`);
            const cardDiv = el.shadowRoot!.querySelector('.card')!;
            expect(cardDiv.classList.contains('variant-outlined')).toBe(true);
        });

        it('applies variant-flat class', async () => {
            const el = await fixture<FlintCard>(html`<flint-card variant="flat"></flint-card>`);
            const cardDiv = el.shadowRoot!.querySelector('.card')!;
            expect(cardDiv.classList.contains('variant-flat')).toBe(true);
        });

        it('reflects variant to attribute', async () => {
            const el = await fixture<FlintCard>(html`<flint-card variant="outlined"></flint-card>`);
            expect(el.getAttribute('variant')).toBe('outlined');
        });

        it('reflects interactive to attribute', async () => {
            const el = await fixture<FlintCard>(html`<flint-card interactive></flint-card>`);
            expect(el.hasAttribute('interactive')).toBe(true);
        });

        it('exposes part="base" on inner div', async () => {
            const el = await fixture<FlintCard>(html`<flint-card></flint-card>`);
            expect(el.shadowRoot!.querySelector('[part="base"]')).not.toBeNull();
        });
    });

    describe('flint-card-header', () => {
        it('renders title and subtitle', async () => {
            const el = await fixture<FlintCardHeader>(html`<flint-card-header title="Test Title" subtitle="Test Subtitle"></flint-card-header>`);
            const title = el.shadowRoot!.querySelector('.title')!;
            const subtitle = el.shadowRoot!.querySelector('.subtitle')!;

            expect(title.textContent).toBe('Test Title');
            expect(subtitle.textContent).toBe('Test Subtitle');
        });

        it('renders only title when no subtitle', async () => {
            const el = await fixture<FlintCardHeader>(html`<flint-card-header title="Only Title"></flint-card-header>`);
            expect(el.shadowRoot!.querySelector('.title')).not.toBeNull();
            expect(el.shadowRoot!.querySelector('.subtitle')).toBeNull();
        });

        it('renders only subtitle when no title', async () => {
            const el = await fixture<FlintCardHeader>(html`<flint-card-header subtitle="Only Sub"></flint-card-header>`);
            expect(el.shadowRoot!.querySelector('.title')).toBeNull();
            expect(el.shadowRoot!.querySelector('.subtitle')).not.toBeNull();
        });

        it('renders nothing when title and subtitle are both empty', async () => {
            const el = await fixture<FlintCardHeader>(html`<flint-card-header></flint-card-header>`);
            expect(el.shadowRoot!.querySelector('.title')).toBeNull();
            expect(el.shadowRoot!.querySelector('.subtitle')).toBeNull();
        });

        it('renders slotted avatar content', async () => {
            const el = await fixture<FlintCardHeader>(html`
                <flint-card-header title="T">
                    <span slot="avatar" id="av">AV</span>
                </flint-card-header>
            `);
            expect(el.querySelector('#av')).not.toBeNull();
        });

        it('renders slotted action content', async () => {
            const el = await fixture<FlintCardHeader>(html`
                <flint-card-header title="T">
                    <button slot="action" id="act">More</button>
                </flint-card-header>
            `);
            expect(el.querySelector('#act')).not.toBeNull();
        });
    });

    describe('flint-card-media', () => {
        it('renders image when provided', async () => {
            const el = await fixture<FlintCardMedia>(html`<flint-card-media image="http://example.com/img.jpg" alt="Alt Text"></flint-card-media>`);
            const img = el.shadowRoot!.querySelector('.media img') as HTMLImageElement;

            expect(img).not.toBeNull();
            expect(img.src).toBe('http://example.com/img.jpg');
            expect(img.alt).toBe('Alt Text');
        });

        it('does not render image when image is missing', async () => {
            const el = await fixture<FlintCardMedia>(html`<flint-card-media></flint-card-media>`);
            const mediaDiv = el.shadowRoot!.querySelector('.media');
            expect(mediaDiv).toBeNull();
        });

        it('renders slot fallback when no image prop', async () => {
            const el = await fixture<FlintCardMedia>(html`
                <flint-card-media><div id="custom">Custom</div></flint-card-media>
            `);
            expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
            expect(el.querySelector('#custom')).not.toBeNull();
        });

        it('sets height with numeric value (appends px)', async () => {
            const el = await fixture<FlintCardMedia>(html`<flint-card-media image="http://example.com/img.jpg" height="300"></flint-card-media>`);
            const mediaDiv = el.shadowRoot!.querySelector('.media') as HTMLElement;
            expect(mediaDiv.style.height).toBe('300px');
        });

        it('sets height with unit value (no double-px)', async () => {
            const el = await fixture<FlintCardMedia>(html`<flint-card-media image="http://example.com/img.jpg" height="200px"></flint-card-media>`);
            const mediaDiv = el.shadowRoot!.querySelector('.media') as HTMLElement;
            expect(mediaDiv.style.height).toBe('200px');
        });

        it('sets height with percentage value', async () => {
            const el = await fixture<FlintCardMedia>(html`<flint-card-media image="http://example.com/img.jpg" height="50%"></flint-card-media>`);
            const mediaDiv = el.shadowRoot!.querySelector('.media') as HTMLElement;
            expect(mediaDiv.style.height).toBe('50%');
        });

        it('img has loading=lazy attribute', async () => {
            const el = await fixture<FlintCardMedia>(html`<flint-card-media image="http://example.com/img.jpg" alt="x"></flint-card-media>`);
            const img = el.shadowRoot!.querySelector('img') as HTMLImageElement;
            expect(img.getAttribute('loading')).toBe('lazy');
        });
    });

    describe('flint-card-content', () => {
        it('renders slotted content', async () => {
            const el = await fixture<FlintCardContent>(html`<flint-card-content>Test Content</flint-card-content>`);
            expect(el.textContent).toContain('Test Content');
        });
    });

    describe('flint-card-actions', () => {
        it('renders slotted content', async () => {
            const el = await fixture<FlintCardActions>(html`<flint-card-actions><button>Action</button></flint-card-actions>`);
            expect(el.querySelector('button')).not.toBeNull();
        });
    });

    describe('flint-card-action-area', () => {
        it('renders slotted content', async () => {
            const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area>Area Content</flint-card-action-area>`);
            expect(el.textContent).toContain('Area Content');
        });

        it('inner div has role="button"', async () => {
            const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
            const div = el.shadowRoot!.querySelector('.action-area')!;
            expect(div.getAttribute('role')).toBe('button');
        });

        it('inner div has tabindex="0"', async () => {
            const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
            const div = el.shadowRoot!.querySelector('.action-area')!;
            expect(div.getAttribute('tabindex')).toBe('0');
        });

        it('Enter key fires click on the host', async () => {
            const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
            const div = el.shadowRoot!.querySelector('.action-area')!;
            const clickSpy = vi.fn();
            el.addEventListener('click', clickSpy);

            div.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
            expect(clickSpy).toHaveBeenCalledTimes(1);
        });

        it('Space key fires click on the host', async () => {
            const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
            const div = el.shadowRoot!.querySelector('.action-area')!;
            const clickSpy = vi.fn();
            el.addEventListener('click', clickSpy);

            div.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
            expect(clickSpy).toHaveBeenCalledTimes(1);
        });

        it('unrelated key does not fire click', async () => {
            const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
            const div = el.shadowRoot!.querySelector('.action-area')!;
            const clickSpy = vi.fn();
            el.addEventListener('click', clickSpy);

            div.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
            expect(clickSpy).not.toHaveBeenCalled();
        });

        it('mouse click propagates to host', async () => {
            const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area>Click me</flint-card-action-area>`);
            const clickSpy = vi.fn();
            el.addEventListener('click', clickSpy);

            el.click();
            expect(clickSpy).toHaveBeenCalledTimes(1);
        });
    });
});
