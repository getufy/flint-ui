import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-chip';
import type { FlintChip } from './flint-chip';

describe('flint-chip', () => {
    // ── Rendering ──────────────────────────────────────────────────────────

    it('renders label', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Test Chip"></flint-chip>`);
        expect(el.shadowRoot?.textContent).toContain('Test Chip');
    });

    it('renders empty label by default', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip></flint-chip>`);
        const label = el.shadowRoot!.querySelector('.label')!;
        const text = Array.from(label.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent)
            .join('');
        expect(text.trim()).toBe('');
    });

    it('applies outlined variant class', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Outlined" variant="outlined"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('outlined')).toBe(true);
    });

    it('does not add outlined class for filled variant', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Filled" variant="filled"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('outlined')).toBe(false);
    });

    it('applies primary color class', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Primary" color="primary"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('primary')).toBe(true);
    });

    it('does not add primary class for default color', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Default"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('primary')).toBe(false);
    });

    it('does not add primary class when color is secondary', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Secondary" color="secondary"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('primary')).toBe(false);
    });

    it('applies secondary color class', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Secondary" color="secondary"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('secondary')).toBe(true);
    });

    it('does not add secondary class for default color', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Default"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('secondary')).toBe(false);
    });

    it('does not add secondary class when color is primary', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Primary" color="primary"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('secondary')).toBe(false);
    });

    it('does not add clickable class when not clickable', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Static"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('clickable')).toBe(false);
    });

    it('adds clickable class when clickable', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Click" clickable></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('clickable')).toBe(true);
    });

    it('adds disabled class when disabled', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Disabled" disabled></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('disabled')).toBe(true);
    });

    it('does not add disabled class when not disabled', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Active"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('disabled')).toBe(false);
    });

    // ── Size ──────────────────────────────────────────────────────────────

    it('defaults to size md (no size-sm or size-lg class)', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Default Size"></flint-chip>`);
        const chip = el.shadowRoot!.querySelector('.chip')!;
        expect(chip.classList.contains('size-sm')).toBe(false);
        expect(chip.classList.contains('size-lg')).toBe(false);
    });

    it('adds size-sm class when size is sm', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Small" size="sm"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('size-sm')).toBe(true);
    });

    it('does not add size-lg class when size is sm', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Small" size="sm"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('size-lg')).toBe(false);
    });

    it('adds size-lg class when size is lg', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Large" size="lg"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('size-lg')).toBe(true);
    });

    it('does not add size-sm class when size is lg', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Large" size="lg"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.classList.contains('size-sm')).toBe(false);
    });

    it('reflects size attribute on host', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Small" size="sm"></flint-chip>`);
        expect(el.getAttribute('size')).toBe('sm');
    });

    // ── Slots ──────────────────────────────────────────────────────────────

    it('supports slots for icons', async () => {
        const el = await fixture<FlintChip>(html`
            <flint-chip label="Icon Chip">
                <span slot="icon" class="my-icon">🔥</span>
            </flint-chip>
        `);
        const slot = el.shadowRoot!.querySelector('slot[name="icon"]') as HTMLSlotElement;
        expect(slot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('supports avatar slot', async () => {
        const el = await fixture<FlintChip>(html`
            <flint-chip label="Avatar Chip">
                <img slot="avatar" src="avatar.png" alt="user" />
            </flint-chip>
        `);
        const slot = el.shadowRoot!.querySelector('slot[name="avatar"]') as HTMLSlotElement;
        expect(slot.assignedNodes().length).toBeGreaterThan(0);
    });

    // ── ARIA / Accessibility attributes ────────────────────────────────────

    it('sets role=button on the inner div when clickable', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Click" clickable></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.getAttribute('role')).toBe('button');
    });

    it('does not set role on the inner div when not clickable', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Static"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.hasAttribute('role')).toBe(false);
    });

    it('sets tabindex=0 when clickable and not disabled', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Click" clickable></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.getAttribute('tabindex')).toBe('0');
    });

    it('sets tabindex=-1 when clickable but disabled', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Click" clickable disabled></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.getAttribute('tabindex')).toBe('-1');
    });

    it('sets tabindex=-1 when not clickable', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Static"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.getAttribute('tabindex')).toBe('-1');
    });

    it('sets aria-disabled="false" when not disabled', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Active"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.getAttribute('aria-disabled')).toBe('false');
    });

    it('sets aria-disabled="true" when disabled', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Disabled" disabled></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.chip')!.getAttribute('aria-disabled')).toBe('true');
    });

    it('reflects disabled as attribute on host', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Disabled" disabled></flint-chip>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    // ── Click behaviour ────────────────────────────────────────────────────

    it('dispatches click when clickable and chip is clicked', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Click" clickable @click=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('does not fire click twice (no double-event from shadow DOM + re-dispatch)', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Click" clickable @click=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('does not dispatch click when not clickable', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Static" @click=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('does not dispatch click when disabled', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Disabled" clickable disabled @click=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('click event bubbles to parent element', async () => {
        const wrapper = document.createElement('div');
        document.body.appendChild(wrapper);
        const handler = vi.fn();
        wrapper.addEventListener('click', handler);
        const el = await fixture<FlintChip>(html`<flint-chip label="Bubble" clickable></flint-chip>`, { parentNode: wrapper });
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
        wrapper.remove();
    });

    // ── Keyboard behaviour ─────────────────────────────────────────────────

    it('dispatches click on Enter key when clickable', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Click" clickable @click=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('dispatches click on Space key when clickable', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Click" clickable @click=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('does not dispatch click on Enter when disabled', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Click" clickable disabled @click=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('does not dispatch click on Enter when not clickable', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Static" @click=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('does not dispatch click on ArrowDown key (non-activation key)', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Click" clickable @click=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('does not dispatch click on Tab key', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Click" clickable @click=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.chip')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    // ── Delete behaviour ───────────────────────────────────────────────────

    it('renders delete icon when deletable', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Delete" deletable></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.delete-icon')).not.toBeNull();
    });

    it('does not render delete icon when not deletable', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="No delete"></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.delete-icon')).toBeNull();
    });

    it('dispatches delete event when delete icon is clicked', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Delete" deletable @delete=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('does not dispatch delete when chip is disabled', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Delete" deletable disabled @delete=${handler}></flint-chip>`);
        // pointer-events: none on delete-icon in CSS, but test the handler guard directly
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('deleting does not also trigger chip click', async () => {
        const clickHandler = vi.fn();
        const deleteHandler = vi.fn();
        const el = await fixture<FlintChip>(html`
            <flint-chip label="Both" clickable deletable @click=${clickHandler} @delete=${deleteHandler}></flint-chip>
        `);
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(deleteHandler).toHaveBeenCalledTimes(1);
        expect(clickHandler).not.toHaveBeenCalled();
    });

    it('delete event bubbles to parent element', async () => {
        const wrapper = document.createElement('div');
        document.body.appendChild(wrapper);
        const handler = vi.fn();
        wrapper.addEventListener('delete', handler);
        const el = await fixture<FlintChip>(html`<flint-chip label="Delete Bubble" deletable></flint-chip>`, { parentNode: wrapper });
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
        wrapper.remove();
    });

    it('dispatches delete on Enter key on delete icon', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Delete" deletable @delete=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('dispatches delete on Space key on delete icon', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Delete" deletable @delete=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('does not dispatch delete on Enter key when chip is disabled', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Delete" deletable disabled @delete=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('does not dispatch delete on Space key when chip is disabled', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Delete" deletable disabled @delete=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('does not dispatch delete on ArrowDown key on delete icon', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintChip>(html`<flint-chip label="Delete" deletable @delete=${handler}></flint-chip>`);
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('delete Enter keydown does not also trigger chip click', async () => {
        const clickHandler = vi.fn();
        const deleteHandler = vi.fn();
        const el = await fixture<FlintChip>(html`
            <flint-chip label="Both" clickable deletable @click=${clickHandler} @delete=${deleteHandler}></flint-chip>
        `);
        el.shadowRoot!.querySelector('.delete-icon')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(deleteHandler).toHaveBeenCalledTimes(1);
        expect(clickHandler).not.toHaveBeenCalled();
    });

    it('delete icon has tabindex=0 when not disabled', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Delete" deletable></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.delete-icon')!.getAttribute('tabindex')).toBe('0');
    });

    it('delete icon has tabindex=-1 when disabled', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Delete" deletable disabled></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.delete-icon')!.getAttribute('tabindex')).toBe('-1');
    });

    it('delete icon has role=button', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="Delete" deletable></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.delete-icon')!.getAttribute('role')).toBe('button');
    });

    it('delete icon aria-label includes chip label', async () => {
        const el = await fixture<FlintChip>(html`<flint-chip label="React" deletable></flint-chip>`);
        expect(el.shadowRoot!.querySelector('.delete-icon')!.getAttribute('aria-label')).toBe('Remove React');
    });
});
