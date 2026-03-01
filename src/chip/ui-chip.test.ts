import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-chip';
import type { UiChip } from './ui-chip';

describe('ui-chip', () => {
    // ── Rendering ──────────────────────────────────────────────────────────

    it('renders label', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Test Chip"></ui-chip>`);
        expect(el.shadowRoot?.textContent).toContain('Test Chip');
    });

    it('applies outlined variant class', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Outlined" variant="outlined"></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('outlined')).toBe(true);
    });

    it('does not add outlined class for filled variant', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Filled" variant="filled"></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('outlined')).toBe(false);
    });

    it('applies primary color class', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Primary" color="primary"></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('primary')).toBe(true);
    });

    it('applies secondary color class', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Secondary" color="secondary"></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('secondary')).toBe(true);
    });

    it('does not add clickable class when not clickable', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Static"></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('clickable')).toBe(false);
    });

    it('adds disabled class when disabled', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Disabled" disabled></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('disabled')).toBe(true);
    });

    // ── Slots ──────────────────────────────────────────────────────────────

    it('supports slots for icons', async () => {
        const el = await fixture<UiChip>(html`
            <ui-chip label="Icon Chip">
                <span slot="icon" class="my-icon">🔥</span>
            </ui-chip>
        `);
        const slot = el.shadowRoot!.querySelector('slot[name="icon"]') as HTMLSlotElement;
        expect(slot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('supports avatar slot', async () => {
        const el = await fixture<UiChip>(html`
            <ui-chip label="Avatar Chip">
                <img slot="avatar" src="avatar.png" alt="user" />
            </ui-chip>
        `);
        const slot = el.shadowRoot!.querySelector('slot[name="avatar"]') as HTMLSlotElement;
        expect(slot.assignedNodes().length).toBeGreaterThan(0);
    });

    // ── ARIA / Accessibility attributes ────────────────────────────────────

    it('sets role=button on the inner div when clickable', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Click" clickable></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.getAttribute('role')).toBe('button');
    });

    it('does not set role on the inner div when not clickable', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Static"></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.hasAttribute('role')).toBe(false);
    });

    it('sets tabindex=0 when clickable and not disabled', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Click" clickable></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.getAttribute('tabindex')).toBe('0');
    });

    it('sets tabindex=-1 when clickable but disabled', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Click" clickable disabled></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.getAttribute('tabindex')).toBe('-1');
    });

    it('sets tabindex=-1 when not clickable', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Static"></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.getAttribute('tabindex')).toBe('-1');
    });

    it('reflects disabled as attribute on host', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Disabled" disabled></ui-chip>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    // ── Click behaviour ────────────────────────────────────────────────────

    it('dispatches click when clickable and chip is clicked', async () => {
        const handler = vi.fn();
        const el = await fixture<UiChip>(html`<ui-chip label="Click" clickable @click=${handler}></ui-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('does not fire click twice (no double-event from shadow DOM + re-dispatch)', async () => {
        const handler = vi.fn();
        const el = await fixture<UiChip>(html`<ui-chip label="Click" clickable @click=${handler}></ui-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('does not dispatch click when not clickable', async () => {
        const handler = vi.fn();
        const el = await fixture<UiChip>(html`<ui-chip label="Static" @click=${handler}></ui-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('does not dispatch click when disabled', async () => {
        const handler = vi.fn();
        const el = await fixture<UiChip>(html`<ui-chip label="Disabled" clickable disabled @click=${handler}></ui-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    // ── Keyboard behaviour ─────────────────────────────────────────────────

    it('dispatches click on Enter key when clickable', async () => {
        const handler = vi.fn();
        const el = await fixture<UiChip>(html`<ui-chip label="Click" clickable @click=${handler}></ui-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('dispatches click on Space key when clickable', async () => {
        const handler = vi.fn();
        const el = await fixture<UiChip>(html`<ui-chip label="Click" clickable @click=${handler}></ui-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('does not dispatch click on Enter when disabled', async () => {
        const handler = vi.fn();
        const el = await fixture<UiChip>(html`<ui-chip label="Click" clickable disabled @click=${handler}></ui-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('does not dispatch click on Enter when not clickable', async () => {
        const handler = vi.fn();
        const el = await fixture<UiChip>(html`<ui-chip label="Static" @click=${handler}></ui-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    // ── Delete behaviour ───────────────────────────────────────────────────

    it('renders delete icon when deletable', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Delete" deletable></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.delete-icon')).not.toBeNull();
    });

    it('does not render delete icon when not deletable', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="No delete"></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.delete-icon')).toBeNull();
    });

    it('dispatches delete event when delete icon is clicked', async () => {
        const handler = vi.fn();
        const el = await fixture<UiChip>(html`<ui-chip label="Delete" deletable @delete=${handler}></ui-chip>`);
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('does not dispatch delete when chip is disabled', async () => {
        const handler = vi.fn();
        const el = await fixture<UiChip>(html`<ui-chip label="Delete" deletable disabled @delete=${handler}></ui-chip>`);
        // pointer-events: none on delete-icon in CSS, but test the handler guard directly
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('deleting does not also trigger chip click', async () => {
        const clickHandler = vi.fn();
        const deleteHandler = vi.fn();
        const el = await fixture<UiChip>(html`
            <ui-chip label="Both" clickable deletable @click=${clickHandler} @delete=${deleteHandler}></ui-chip>
        `);
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(deleteHandler).toHaveBeenCalledTimes(1);
        expect(clickHandler).not.toHaveBeenCalled();
    });

    it('dispatches delete on Enter key on delete icon', async () => {
        const handler = vi.fn();
        const el = await fixture<UiChip>(html`<ui-chip label="Delete" deletable @delete=${handler}></ui-chip>`);
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('dispatches delete on Space key on delete icon', async () => {
        const handler = vi.fn();
        const el = await fixture<UiChip>(html`<ui-chip label="Delete" deletable @delete=${handler}></ui-chip>`);
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('delete icon has tabindex=0 when not disabled', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Delete" deletable></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.delete-icon')!.getAttribute('tabindex')).toBe('0');
    });

    it('delete icon has tabindex=-1 when disabled', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Delete" deletable disabled></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.delete-icon')!.getAttribute('tabindex')).toBe('-1');
    });

    it('delete icon has role=button', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="Delete" deletable></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.delete-icon')!.getAttribute('role')).toBe('button');
    });

    it('delete icon aria-label includes chip label', async () => {
        const el = await fixture<UiChip>(html`<ui-chip label="React" deletable></ui-chip>`);
        expect(el.shadowRoot!.querySelector('.delete-icon')!.getAttribute('aria-label')).toBe('Remove React');
    });
});
