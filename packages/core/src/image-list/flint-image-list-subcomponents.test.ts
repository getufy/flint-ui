import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-image-list-item.js';
import './flint-image-list-item-bar.js';
import type { FlintImageListItem } from './flint-image-list-item.js';
import type { FlintImageListItemBar } from './flint-image-list-item-bar.js';

// ═══════════════════════════════════════════════════════════════════════════════
// flint-image-list-item
// ═══════════════════════════════════════════════════════════════════════════════

describe('flint-image-list-item', () => {
    // ── Rendering ──────────────────────────────────────────────────────────────

    it('creates a shadow root', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item></flint-image-list-item>
        `);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('renders item-wrapper div and both slots', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item></flint-image-list-item>
        `);
        const wrapper = el.shadowRoot!.querySelector('.item-wrapper');
        expect(wrapper).not.toBeNull();

        const defaultSlot = wrapper!.querySelector('slot:not([name])');
        expect(defaultSlot).not.toBeNull();

        const barSlot = el.shadowRoot!.querySelector('slot[name="bar"]');
        expect(barSlot).not.toBeNull();
    });

    it('projects default slot content', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item>
                <img src="test.jpg" alt="test" />
            </flint-image-list-item>
        `);
        const slot = el.shadowRoot!.querySelector('.item-wrapper slot:not([name])') as HTMLSlotElement;
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect(assigned[0].tagName).toBe('IMG');
    });

    it('projects bar slot content', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item>
                <flint-image-list-item-bar slot="bar"></flint-image-list-item-bar>
            </flint-image-list-item>
        `);
        const barSlot = el.shadowRoot!.querySelector('slot[name="bar"]') as HTMLSlotElement;
        const assigned = barSlot.assignedElements();
        expect(assigned.length).toBe(1);
        expect(assigned[0].tagName).toBe('FLINT-IMAGE-LIST-ITEM-BAR');
    });

    // ── Properties / defaults ──────────────────────────────────────────────────

    it('defaults rows to 1', () => {
        const el = document.createElement('flint-image-list-item') as FlintImageListItem;
        expect(el.rows).toBe(1);
    });

    it('defaults cols to 1', () => {
        const el = document.createElement('flint-image-list-item') as FlintImageListItem;
        expect(el.cols).toBe(1);
    });

    it('defaults barPosition to "overlay"', () => {
        const el = document.createElement('flint-image-list-item') as FlintImageListItem;
        expect(el.barPosition).toBe('overlay');
    });

    it('defaults fit to "cover"', () => {
        const el = document.createElement('flint-image-list-item') as FlintImageListItem;
        expect(el.fit).toBe('cover');
    });

    it('defaults aspectRatio to "auto"', () => {
        const el = document.createElement('flint-image-list-item') as FlintImageListItem;
        expect(el.aspectRatio).toBe('auto');
    });

    it('defaults weave to "odd"', () => {
        const el = document.createElement('flint-image-list-item') as FlintImageListItem;
        expect(el.weave).toBe('odd');
    });

    // ── Host style application ─────────────────────────────────────────────────

    it('sets grid-row span when rows > 1', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item .rows=${2}></flint-image-list-item>
        `);
        expect(el.style.gridRow).toBe('span 2');
    });

    it('clears grid-row when rows is 1', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item .rows=${1}></flint-image-list-item>
        `);
        expect(el.style.gridRow).toBe('');
    });

    it('sets grid-column span when cols > 1', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item .cols=${3}></flint-image-list-item>
        `);
        expect(el.style.gridColumn).toBe('span 3');
    });

    it('clears grid-column when cols is 1', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item .cols=${1}></flint-image-list-item>
        `);
        expect(el.style.gridColumn).toBe('');
    });

    it('sets aspect-ratio on host when not auto', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item aspect-ratio="4/3"></flint-image-list-item>
        `);
        expect(el.style.aspectRatio).toBe('4/3');
    });

    it('clears aspect-ratio on host when set to auto', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item aspect-ratio="auto"></flint-image-list-item>
        `);
        expect(el.style.aspectRatio).toBe('');
    });

    it('sets --flint-image-fit CSS custom property', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item .fit=${'contain'}></flint-image-list-item>
        `);
        expect(el.style.getPropertyValue('--flint-image-fit')).toBe('contain');
    });

    it('reflects bar-position attribute', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item bar-position="below"></flint-image-list-item>
        `);
        await el.updateComplete;
        expect(el.barPosition).toBe('below');
        expect(el.getAttribute('bar-position')).toBe('below');
    });

    it('reflects aspect-ratio attribute', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item aspect-ratio="16/9"></flint-image-list-item>
        `);
        await el.updateComplete;
        expect(el.getAttribute('aspect-ratio')).toBe('16/9');
    });

    it('updates host styles when properties change', async () => {
        const el = await fixture<FlintImageListItem>(html`
            <flint-image-list-item></flint-image-list-item>
        `);
        expect(el.style.gridRow).toBe('');

        el.rows = 3;
        await el.updateComplete;
        expect(el.style.gridRow).toBe('span 3');
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// flint-image-list-item-bar
// ═══════════════════════════════════════════════════════════════════════════════

describe('flint-image-list-item-bar', () => {
    // ── Rendering ──────────────────────────────────────────────────────────────

    it('creates a shadow root', async () => {
        const el = await fixture<FlintImageListItemBar>(html`
            <flint-image-list-item-bar></flint-image-list-item-bar>
        `);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('renders bar-inner with bar-text and bar-action sections', async () => {
        const el = await fixture<FlintImageListItemBar>(html`
            <flint-image-list-item-bar></flint-image-list-item-bar>
        `);
        expect(el.shadowRoot!.querySelector('.bar-inner')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.bar-text')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.bar-title')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.bar-subtitle')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.bar-action')).not.toBeNull();
    });

    it('has a default slot inside bar-title for title text', async () => {
        const el = await fixture<FlintImageListItemBar>(html`
            <flint-image-list-item-bar></flint-image-list-item-bar>
        `);
        const titleDiv = el.shadowRoot!.querySelector('.bar-title');
        const slot = titleDiv!.querySelector('slot:not([name])');
        expect(slot).not.toBeNull();
    });

    it('has a subtitle named slot', async () => {
        const el = await fixture<FlintImageListItemBar>(html`
            <flint-image-list-item-bar></flint-image-list-item-bar>
        `);
        const slot = el.shadowRoot!.querySelector('slot[name="subtitle"]');
        expect(slot).not.toBeNull();
    });

    it('has an action named slot', async () => {
        const el = await fixture<FlintImageListItemBar>(html`
            <flint-image-list-item-bar></flint-image-list-item-bar>
        `);
        const slot = el.shadowRoot!.querySelector('slot[name="action"]');
        expect(slot).not.toBeNull();
    });

    // ── Slot content projection ────────────────────────────────────────────────

    it('projects title text into default slot', async () => {
        const el = await fixture<FlintImageListItemBar>(html`
            <flint-image-list-item-bar>My Title</flint-image-list-item-bar>
        `);
        const slot = el.shadowRoot!.querySelector('.bar-title slot:not([name])') as HTMLSlotElement;
        const nodes = slot.assignedNodes();
        const text = nodes.map(n => n.textContent).join('').trim();
        expect(text).toBe('My Title');
    });

    it('projects subtitle slot content', async () => {
        const el = await fixture<FlintImageListItemBar>(html`
            <flint-image-list-item-bar>
                Title
                <span slot="subtitle">Sub</span>
            </flint-image-list-item-bar>
        `);
        const slot = el.shadowRoot!.querySelector('slot[name="subtitle"]') as HTMLSlotElement;
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect(assigned[0].textContent).toBe('Sub');
    });

    it('projects action slot content', async () => {
        const el = await fixture<FlintImageListItemBar>(html`
            <flint-image-list-item-bar>
                Title
                <button slot="action">Action</button>
            </flint-image-list-item-bar>
        `);
        const slot = el.shadowRoot!.querySelector('slot[name="action"]') as HTMLSlotElement;
        const assigned = slot.assignedElements();
        expect(assigned.length).toBe(1);
        expect(assigned[0].textContent).toBe('Action');
    });

    // ── Properties ─────────────────────────────────────────────────────────────

    it('defaults position to "bottom"', () => {
        const el = document.createElement('flint-image-list-item-bar') as FlintImageListItemBar;
        expect(el.position).toBe('bottom');
    });

    it('accepts position="top"', async () => {
        const el = await fixture<FlintImageListItemBar>(html`
            <flint-image-list-item-bar position="top"></flint-image-list-item-bar>
        `);
        expect(el.position).toBe('top');
    });

    it('accepts position="below"', async () => {
        const el = await fixture<FlintImageListItemBar>(html`
            <flint-image-list-item-bar position="below"></flint-image-list-item-bar>
        `);
        expect(el.position).toBe('below');
    });

    it('reflects position attribute', async () => {
        const el = await fixture<FlintImageListItemBar>(html`
            <flint-image-list-item-bar position="top"></flint-image-list-item-bar>
        `);
        await el.updateComplete;
        expect(el.getAttribute('position')).toBe('top');
    });
});
