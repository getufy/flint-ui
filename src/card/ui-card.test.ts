import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-card';
import './ui-card-header';
import './ui-card-media';
import './ui-card-content';
import './ui-card-actions';
import './ui-card-action-area';
import type { UiCard } from './ui-card';
import type { UiCardHeader } from './ui-card-header';
import type { UiCardMedia } from './ui-card-media';
import type { UiCardContent } from './ui-card-content';
import type { UiCardActions } from './ui-card-actions';
import type { UiCardActionArea } from './ui-card-action-area';

describe('Card Components', () => {
    describe('ui-card', () => {
        it('applies classes based on properties', async () => {
            const el = await fixture<UiCard>(html`
                <ui-card variant="flat" interactive></ui-card>
            `);
            const cardDiv = el.shadowRoot!.querySelector('.card')!;

            expect(cardDiv.classList.contains('variant-flat')).toBe(true);
            expect(cardDiv.classList.contains('interactive')).toBe(true);
        });

        it('defaults to elevated, not interactive', async () => {
            const el = await fixture<UiCard>(html`<ui-card></ui-card>`);
            const cardDiv = el.shadowRoot!.querySelector('.card')!;

            expect(cardDiv.classList.contains('variant-elevated')).toBe(true);
            expect(cardDiv.classList.contains('interactive')).toBe(false);
        });

        it('applies variant-outlined class', async () => {
            const el = await fixture<UiCard>(html`<ui-card variant="outlined"></ui-card>`);
            const cardDiv = el.shadowRoot!.querySelector('.card')!;
            expect(cardDiv.classList.contains('variant-outlined')).toBe(true);
        });

        it('applies variant-flat class', async () => {
            const el = await fixture<UiCard>(html`<ui-card variant="flat"></ui-card>`);
            const cardDiv = el.shadowRoot!.querySelector('.card')!;
            expect(cardDiv.classList.contains('variant-flat')).toBe(true);
        });

        it('reflects variant to attribute', async () => {
            const el = await fixture<UiCard>(html`<ui-card variant="outlined"></ui-card>`);
            expect(el.getAttribute('variant')).toBe('outlined');
        });

        it('reflects interactive to attribute', async () => {
            const el = await fixture<UiCard>(html`<ui-card interactive></ui-card>`);
            expect(el.hasAttribute('interactive')).toBe(true);
        });

        it('exposes part="card" on inner div', async () => {
            const el = await fixture<UiCard>(html`<ui-card></ui-card>`);
            expect(el.shadowRoot!.querySelector('[part="card"]')).not.toBeNull();
        });
    });

    describe('ui-card-header', () => {
        it('renders title and subtitle', async () => {
            const el = await fixture<UiCardHeader>(html`<ui-card-header title="Test Title" subtitle="Test Subtitle"></ui-card-header>`);
            const title = el.shadowRoot!.querySelector('.title')!;
            const subtitle = el.shadowRoot!.querySelector('.subtitle')!;

            expect(title.textContent).toBe('Test Title');
            expect(subtitle.textContent).toBe('Test Subtitle');
        });

        it('renders only title when no subtitle', async () => {
            const el = await fixture<UiCardHeader>(html`<ui-card-header title="Only Title"></ui-card-header>`);
            expect(el.shadowRoot!.querySelector('.title')).not.toBeNull();
            expect(el.shadowRoot!.querySelector('.subtitle')).toBeNull();
        });

        it('renders only subtitle when no title', async () => {
            const el = await fixture<UiCardHeader>(html`<ui-card-header subtitle="Only Sub"></ui-card-header>`);
            expect(el.shadowRoot!.querySelector('.title')).toBeNull();
            expect(el.shadowRoot!.querySelector('.subtitle')).not.toBeNull();
        });

        it('renders nothing when title and subtitle are both empty', async () => {
            const el = await fixture<UiCardHeader>(html`<ui-card-header></ui-card-header>`);
            expect(el.shadowRoot!.querySelector('.title')).toBeNull();
            expect(el.shadowRoot!.querySelector('.subtitle')).toBeNull();
        });

        it('renders slotted avatar content', async () => {
            const el = await fixture<UiCardHeader>(html`
                <ui-card-header title="T">
                    <span slot="avatar" id="av">AV</span>
                </ui-card-header>
            `);
            expect(el.querySelector('#av')).not.toBeNull();
        });

        it('renders slotted action content', async () => {
            const el = await fixture<UiCardHeader>(html`
                <ui-card-header title="T">
                    <button slot="action" id="act">More</button>
                </ui-card-header>
            `);
            expect(el.querySelector('#act')).not.toBeNull();
        });
    });

    describe('ui-card-media', () => {
        it('renders image when provided', async () => {
            const el = await fixture<UiCardMedia>(html`<ui-card-media image="http://example.com/img.jpg" alt="Alt Text"></ui-card-media>`);
            const img = el.shadowRoot!.querySelector('.media img') as HTMLImageElement;

            expect(img).not.toBeNull();
            expect(img.src).toBe('http://example.com/img.jpg');
            expect(img.alt).toBe('Alt Text');
        });

        it('does not render image when image is missing', async () => {
            const el = await fixture<UiCardMedia>(html`<ui-card-media></ui-card-media>`);
            const mediaDiv = el.shadowRoot!.querySelector('.media');
            expect(mediaDiv).toBeNull();
        });

        it('renders slot fallback when no image prop', async () => {
            const el = await fixture<UiCardMedia>(html`
                <ui-card-media><div id="custom">Custom</div></ui-card-media>
            `);
            expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
            expect(el.querySelector('#custom')).not.toBeNull();
        });

        it('sets height with numeric value (appends px)', async () => {
            const el = await fixture<UiCardMedia>(html`<ui-card-media image="http://example.com/img.jpg" height="300"></ui-card-media>`);
            const mediaDiv = el.shadowRoot!.querySelector('.media') as HTMLElement;
            expect(mediaDiv.style.height).toBe('300px');
        });

        it('sets height with unit value (no double-px)', async () => {
            const el = await fixture<UiCardMedia>(html`<ui-card-media image="http://example.com/img.jpg" height="200px"></ui-card-media>`);
            const mediaDiv = el.shadowRoot!.querySelector('.media') as HTMLElement;
            expect(mediaDiv.style.height).toBe('200px');
        });

        it('sets height with percentage value', async () => {
            const el = await fixture<UiCardMedia>(html`<ui-card-media image="http://example.com/img.jpg" height="50%"></ui-card-media>`);
            const mediaDiv = el.shadowRoot!.querySelector('.media') as HTMLElement;
            expect(mediaDiv.style.height).toBe('50%');
        });

        it('img has loading=lazy attribute', async () => {
            const el = await fixture<UiCardMedia>(html`<ui-card-media image="http://example.com/img.jpg" alt="x"></ui-card-media>`);
            const img = el.shadowRoot!.querySelector('img') as HTMLImageElement;
            expect(img.getAttribute('loading')).toBe('lazy');
        });
    });

    describe('ui-card-content', () => {
        it('renders slotted content', async () => {
            const el = await fixture<UiCardContent>(html`<ui-card-content>Test Content</ui-card-content>`);
            expect(el.textContent).toContain('Test Content');
        });
    });

    describe('ui-card-actions', () => {
        it('renders slotted content', async () => {
            const el = await fixture<UiCardActions>(html`<ui-card-actions><button>Action</button></ui-card-actions>`);
            expect(el.querySelector('button')).not.toBeNull();
        });
    });

    describe('ui-card-action-area', () => {
        it('renders slotted content', async () => {
            const el = await fixture<UiCardActionArea>(html`<ui-card-action-area>Area Content</ui-card-action-area>`);
            expect(el.textContent).toContain('Area Content');
        });

        it('inner div has role="button"', async () => {
            const el = await fixture<UiCardActionArea>(html`<ui-card-action-area></ui-card-action-area>`);
            const div = el.shadowRoot!.querySelector('.action-area')!;
            expect(div.getAttribute('role')).toBe('button');
        });

        it('inner div has tabindex="0"', async () => {
            const el = await fixture<UiCardActionArea>(html`<ui-card-action-area></ui-card-action-area>`);
            const div = el.shadowRoot!.querySelector('.action-area')!;
            expect(div.getAttribute('tabindex')).toBe('0');
        });

        it('Enter key fires click on the host', async () => {
            const el = await fixture<UiCardActionArea>(html`<ui-card-action-area></ui-card-action-area>`);
            const div = el.shadowRoot!.querySelector('.action-area')!;
            const clickSpy = vi.fn();
            el.addEventListener('click', clickSpy);

            div.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
            expect(clickSpy).toHaveBeenCalledTimes(1);
        });

        it('Space key fires click on the host', async () => {
            const el = await fixture<UiCardActionArea>(html`<ui-card-action-area></ui-card-action-area>`);
            const div = el.shadowRoot!.querySelector('.action-area')!;
            const clickSpy = vi.fn();
            el.addEventListener('click', clickSpy);

            div.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
            expect(clickSpy).toHaveBeenCalledTimes(1);
        });

        it('unrelated key does not fire click', async () => {
            const el = await fixture<UiCardActionArea>(html`<ui-card-action-area></ui-card-action-area>`);
            const div = el.shadowRoot!.querySelector('.action-area')!;
            const clickSpy = vi.fn();
            el.addEventListener('click', clickSpy);

            div.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
            expect(clickSpy).not.toHaveBeenCalled();
        });

        it('mouse click propagates to host', async () => {
            const el = await fixture<UiCardActionArea>(html`<ui-card-action-area>Click me</ui-card-action-area>`);
            const clickSpy = vi.fn();
            el.addEventListener('click', clickSpy);

            el.click();
            expect(clickSpy).toHaveBeenCalledTimes(1);
        });
    });
});
