import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-card-content';
import './flint-card-media';
import './flint-card-header';
import './flint-card-actions';
import './flint-card-action-area';
import type { FlintCardContent } from './flint-card-content';
import type { FlintCardMedia } from './flint-card-media';
import type { FlintCardHeader } from './flint-card-header';
import type { FlintCardActions } from './flint-card-actions';
import type { FlintCardActionArea } from './flint-card-action-area';

describe('flint-card-content', () => {
    it('renders and creates a shadow root', async () => {
        const el = await fixture<FlintCardContent>(html`<flint-card-content></flint-card-content>`);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('projects default slot content', async () => {
        const el = await fixture<FlintCardContent>(html`
            <flint-card-content><p id="inner">Hello</p></flint-card-content>
        `);
        const slot = el.shadowRoot!.querySelector('slot') as HTMLSlotElement;
        expect(slot).not.toBeNull();
        expect(el.querySelector('#inner')).not.toBeNull();
        expect(el.querySelector('#inner')!.textContent).toBe('Hello');
    });

    it('has a default slot with no name attribute', async () => {
        const el = await fixture<FlintCardContent>(html`<flint-card-content></flint-card-content>`);
        const slot = el.shadowRoot!.querySelector('slot') as HTMLSlotElement;
        expect(slot).not.toBeNull();
        expect(slot.hasAttribute('name')).toBe(false);
    });
});

describe('flint-card-media', () => {
    it('renders and creates a shadow root', async () => {
        const el = await fixture<FlintCardMedia>(html`<flint-card-media></flint-card-media>`);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('renders an img when image prop is set', async () => {
        const el = await fixture<FlintCardMedia>(html`
            <flint-card-media image="https://example.com/photo.jpg" alt="A photo"></flint-card-media>
        `);
        const img = el.shadowRoot!.querySelector('img') as HTMLImageElement;
        expect(img).not.toBeNull();
        expect(img.src).toBe('https://example.com/photo.jpg');
        expect(img.alt).toBe('A photo');
    });

    it('renders a slot fallback when no image prop', async () => {
        const el = await fixture<FlintCardMedia>(html`
            <flint-card-media><video id="vid"></video></flint-card-media>
        `);
        expect(el.shadowRoot!.querySelector('.media')).toBeNull();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
        expect(el.querySelector('#vid')).not.toBeNull();
    });

    it('sets height as px when given a numeric string', async () => {
        const el = await fixture<FlintCardMedia>(html`
            <flint-card-media image="https://example.com/img.jpg" height="250"></flint-card-media>
        `);
        const media = el.shadowRoot!.querySelector('.media') as HTMLElement;
        expect(media.style.height).toBe('250px');
    });

    it('preserves unit when height already has one', async () => {
        const el = await fixture<FlintCardMedia>(html`
            <flint-card-media image="https://example.com/img.jpg" height="10rem"></flint-card-media>
        `);
        const media = el.shadowRoot!.querySelector('.media') as HTMLElement;
        expect(media.style.height).toBe('10rem');
    });

    it('does not set height style when height is empty', async () => {
        const el = await fixture<FlintCardMedia>(html`
            <flint-card-media image="https://example.com/img.jpg"></flint-card-media>
        `);
        const media = el.shadowRoot!.querySelector('.media') as HTMLElement;
        expect(media.style.height).toBe('');
    });

    it('img has loading="lazy"', async () => {
        const el = await fixture<FlintCardMedia>(html`
            <flint-card-media image="https://example.com/img.jpg"></flint-card-media>
        `);
        const img = el.shadowRoot!.querySelector('img')!;
        expect(img.getAttribute('loading')).toBe('lazy');
    });

    it('exposes part="media" on the container div', async () => {
        const el = await fixture<FlintCardMedia>(html`
            <flint-card-media image="https://example.com/img.jpg"></flint-card-media>
        `);
        expect(el.shadowRoot!.querySelector('[part="media"]')).not.toBeNull();
    });

    it('exposes part="img" on the image element', async () => {
        const el = await fixture<FlintCardMedia>(html`
            <flint-card-media image="https://example.com/img.jpg"></flint-card-media>
        `);
        expect(el.shadowRoot!.querySelector('[part="img"]')).not.toBeNull();
    });

    it('defaults alt to empty string', async () => {
        const el = await fixture<FlintCardMedia>(html`
            <flint-card-media image="https://example.com/img.jpg"></flint-card-media>
        `);
        const img = el.shadowRoot!.querySelector('img') as HTMLImageElement;
        expect(img.alt).toBe('');
    });
});

describe('flint-card-header', () => {
    it('renders and creates a shadow root', async () => {
        const el = await fixture<FlintCardHeader>(html`<flint-card-header></flint-card-header>`);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('renders a .header wrapper div', async () => {
        const el = await fixture<FlintCardHeader>(html`<flint-card-header></flint-card-header>`);
        expect(el.shadowRoot!.querySelector('.header')).not.toBeNull();
    });

    it('renders title as h3 when title prop is set', async () => {
        const el = await fixture<FlintCardHeader>(html`
            <flint-card-header title="Card Title"></flint-card-header>
        `);
        const h3 = el.shadowRoot!.querySelector('h3.title');
        expect(h3).not.toBeNull();
        expect(h3!.textContent).toBe('Card Title');
    });

    it('renders subtitle as p when subtitle prop is set', async () => {
        const el = await fixture<FlintCardHeader>(html`
            <flint-card-header subtitle="Sub text"></flint-card-header>
        `);
        const p = el.shadowRoot!.querySelector('p.subtitle');
        expect(p).not.toBeNull();
        expect(p!.textContent).toBe('Sub text');
    });

    it('does not render title element when title is empty', async () => {
        const el = await fixture<FlintCardHeader>(html`<flint-card-header></flint-card-header>`);
        expect(el.shadowRoot!.querySelector('.title')).toBeNull();
    });

    it('does not render subtitle element when subtitle is empty', async () => {
        const el = await fixture<FlintCardHeader>(html`<flint-card-header></flint-card-header>`);
        expect(el.shadowRoot!.querySelector('.subtitle')).toBeNull();
    });

    it('renders both title and subtitle together', async () => {
        const el = await fixture<FlintCardHeader>(html`
            <flint-card-header title="T" subtitle="S"></flint-card-header>
        `);
        expect(el.shadowRoot!.querySelector('.title')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.subtitle')).not.toBeNull();
    });

    it('projects avatar slot content', async () => {
        const el = await fixture<FlintCardHeader>(html`
            <flint-card-header>
                <img slot="avatar" id="av" src="avatar.png" />
            </flint-card-header>
        `);
        const avatarSlot = el.shadowRoot!.querySelector('slot[name="avatar"]');
        expect(avatarSlot).not.toBeNull();
        expect(el.querySelector('#av')).not.toBeNull();
    });

    it('projects action slot content', async () => {
        const el = await fixture<FlintCardHeader>(html`
            <flint-card-header>
                <button slot="action" id="btn">X</button>
            </flint-card-header>
        `);
        const actionSlot = el.shadowRoot!.querySelector('slot[name="action"]');
        expect(actionSlot).not.toBeNull();
        expect(el.querySelector('#btn')).not.toBeNull();
    });

    it('projects default slot content inside .content', async () => {
        const el = await fixture<FlintCardHeader>(html`
            <flint-card-header><span id="extra">Extra info</span></flint-card-header>
        `);
        const defaultSlot = el.shadowRoot!.querySelector('.content slot:not([name])');
        expect(defaultSlot).not.toBeNull();
        expect(el.querySelector('#extra')).not.toBeNull();
    });

    it('exposes part="header" on wrapper', async () => {
        const el = await fixture<FlintCardHeader>(html`<flint-card-header></flint-card-header>`);
        expect(el.shadowRoot!.querySelector('[part="header"]')).not.toBeNull();
    });

    it('exposes part="title" on the h3', async () => {
        const el = await fixture<FlintCardHeader>(html`
            <flint-card-header title="T"></flint-card-header>
        `);
        expect(el.shadowRoot!.querySelector('[part="title"]')).not.toBeNull();
    });

    it('exposes part="subtitle" on the p', async () => {
        const el = await fixture<FlintCardHeader>(html`
            <flint-card-header subtitle="S"></flint-card-header>
        `);
        expect(el.shadowRoot!.querySelector('[part="subtitle"]')).not.toBeNull();
    });

    it('exposes part="content" on the inner content div', async () => {
        const el = await fixture<FlintCardHeader>(html`<flint-card-header></flint-card-header>`);
        expect(el.shadowRoot!.querySelector('[part="content"]')).not.toBeNull();
    });
});

describe('flint-card-actions', () => {
    it('renders and creates a shadow root', async () => {
        const el = await fixture<FlintCardActions>(html`<flint-card-actions></flint-card-actions>`);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('projects slotted button content', async () => {
        const el = await fixture<FlintCardActions>(html`
            <flint-card-actions>
                <button id="save">Save</button>
                <button id="cancel">Cancel</button>
            </flint-card-actions>
        `);
        expect(el.querySelector('#save')).not.toBeNull();
        expect(el.querySelector('#cancel')).not.toBeNull();
    });

    it('has a default slot', async () => {
        const el = await fixture<FlintCardActions>(html`<flint-card-actions></flint-card-actions>`);
        const slot = el.shadowRoot!.querySelector('slot') as HTMLSlotElement;
        expect(slot).not.toBeNull();
        expect(slot.hasAttribute('name')).toBe(false);
    });
});

describe('flint-card-action-area', () => {
    it('renders and creates a shadow root', async () => {
        const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('renders a .action-area wrapper div', async () => {
        const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
        expect(el.shadowRoot!.querySelector('.action-area')).not.toBeNull();
    });

    it('projects default slot content', async () => {
        const el = await fixture<FlintCardActionArea>(html`
            <flint-card-action-area><span id="child">Content</span></flint-card-action-area>
        `);
        expect(el.querySelector('#child')).not.toBeNull();
    });

    it('action-area div has role="button"', async () => {
        const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
        const div = el.shadowRoot!.querySelector('.action-area')!;
        expect(div.getAttribute('role')).toBe('button');
    });

    it('action-area div has tabindex="0"', async () => {
        const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
        const div = el.shadowRoot!.querySelector('.action-area')!;
        expect(div.getAttribute('tabindex')).toBe('0');
    });

    it('exposes part="action-area" on the inner div', async () => {
        const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
        expect(el.shadowRoot!.querySelector('[part="action-area"]')).not.toBeNull();
    });

    it('Enter key dispatches click event on host', async () => {
        const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
        const div = el.shadowRoot!.querySelector('.action-area')!;
        const clickSpy = vi.fn();
        el.addEventListener('click', clickSpy);

        div.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('Space key dispatches click event on host', async () => {
        const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
        const div = el.shadowRoot!.querySelector('.action-area')!;
        const clickSpy = vi.fn();
        el.addEventListener('click', clickSpy);

        div.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
        expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('other keys do not dispatch click', async () => {
        const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
        const div = el.shadowRoot!.querySelector('.action-area')!;
        const clickSpy = vi.fn();
        el.addEventListener('click', clickSpy);

        div.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true }));
        div.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
        expect(clickSpy).not.toHaveBeenCalled();
    });

    it('has a slot inside the action-area div', async () => {
        const el = await fixture<FlintCardActionArea>(html`<flint-card-action-area></flint-card-action-area>`);
        const slot = el.shadowRoot!.querySelector('.action-area slot');
        expect(slot).not.toBeNull();
    });
});
