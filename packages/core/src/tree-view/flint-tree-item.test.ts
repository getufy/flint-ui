import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-tree-item.js';
import type { FlintTreeItem } from './flint-tree-item.js';

describe('flint-tree-item', () => {
    // ── Rendering ──────────────────────────────────────────────────────────────

    it('creates a shadow root', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item"></flint-tree-item>
        `);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('renders item-row with label text', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Hello World"></flint-tree-item>
        `);
        const label = el.shadowRoot!.querySelector('.item-label');
        expect(label).not.toBeNull();
        expect(label!.textContent).toBe('Hello World');
    });

    it('renders a label slot when label prop is empty', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1">
                <span slot="label">Custom Label</span>
            </flint-tree-item>
        `);
        const labelSlot = el.shadowRoot!.querySelector('slot[name="label"]');
        expect(labelSlot).not.toBeNull();
    });

    it('does not render label slot when label prop is set', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Text"></flint-tree-item>
        `);
        const labelSlot = el.shadowRoot!.querySelector('slot[name="label"]');
        expect(labelSlot).toBeNull();
    });

    it('renders children-container with default slot', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Parent"></flint-tree-item>
        `);
        const container = el.shadowRoot!.querySelector('.children-container');
        expect(container).not.toBeNull();
        expect(container!.getAttribute('role')).toBe('group');

        const slot = container!.querySelector('slot:not([name])');
        expect(slot).not.toBeNull();
    });

    it('hides children-container when not expanded', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Parent">
                <flint-tree-item item-id="2" label="Child"></flint-tree-item>
            </flint-tree-item>
        `);
        const container = el.shadowRoot!.querySelector('.children-container') as HTMLElement;
        expect(container.hidden).toBe(true);
    });

    it('shows children-container when expanded', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Parent" expanded>
                <flint-tree-item item-id="2" label="Child"></flint-tree-item>
            </flint-tree-item>
        `);
        const container = el.shadowRoot!.querySelector('.children-container') as HTMLElement;
        expect(container.hidden).toBe(false);
    });

    // ── Properties / defaults ──────────────────────────────────────────────────

    it('defaults itemId to empty string', () => {
        const el = document.createElement('flint-tree-item') as FlintTreeItem;
        expect(el.itemId).toBe('');
    });

    it('defaults label to empty string', () => {
        const el = document.createElement('flint-tree-item') as FlintTreeItem;
        expect(el.label).toBe('');
    });

    it('defaults disabled to false', () => {
        const el = document.createElement('flint-tree-item') as FlintTreeItem;
        expect(el.disabled).toBe(false);
    });

    it('defaults expanded to false', () => {
        const el = document.createElement('flint-tree-item') as FlintTreeItem;
        expect(el.expanded).toBe(false);
    });

    it('defaults hasChildren to false', () => {
        const el = document.createElement('flint-tree-item') as FlintTreeItem;
        expect(el.hasChildren).toBe(false);
    });

    it('defaults dropPosition to null', () => {
        const el = document.createElement('flint-tree-item') as FlintTreeItem;
        expect(el.dropPosition).toBeNull();
    });

    it('defaults showDragHandle to false', () => {
        const el = document.createElement('flint-tree-item') as FlintTreeItem;
        expect(el.showDragHandle).toBe(false);
    });

    // ── Reflected attributes ───────────────────────────────────────────────────

    it('reflects item-id attribute', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="my-node" label="Node"></flint-tree-item>
        `);
        await el.updateComplete;
        expect(el.getAttribute('item-id')).toBe('my-node');
        expect(el.itemId).toBe('my-node');
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item" disabled></flint-tree-item>
        `);
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(true);
        expect(el.disabled).toBe(true);
    });

    it('reflects expanded attribute', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item" expanded></flint-tree-item>
        `);
        await el.updateComplete;
        expect(el.hasAttribute('expanded')).toBe(true);
        expect(el.expanded).toBe(true);
    });

    it('reflects has-children attribute', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item" has-children></flint-tree-item>
        `);
        await el.updateComplete;
        expect(el.hasAttribute('has-children')).toBe(true);
        expect(el.hasChildren).toBe(true);
    });

    it('reflects drop-position attribute', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item" drop-position="before"></flint-tree-item>
        `);
        await el.updateComplete;
        expect(el.getAttribute('drop-position')).toBe('before');
    });

    // ── ARIA ───────────────────────────────────────────────────────────────────

    it('sets role="treeitem" on host', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item"></flint-tree-item>
        `);
        expect(el.getAttribute('role')).toBe('treeitem');
    });

    it('sets tabindex="-1" by default', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item"></flint-tree-item>
        `);
        expect(el.getAttribute('tabindex')).toBe('-1');
    });

    it('sets aria-disabled based on disabled property', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item"></flint-tree-item>
        `);
        await el.updateComplete;
        expect(el.getAttribute('aria-disabled')).toBe('false');

        el.disabled = true;
        await el.updateComplete;
        expect(el.getAttribute('aria-disabled')).toBe('true');
    });

    it('sets aria-expanded when item has children', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Parent">
                <flint-tree-item item-id="2" label="Child"></flint-tree-item>
            </flint-tree-item>
        `);
        await el.updateComplete;
        // Wait for slotchange
        await new Promise(r => setTimeout(r, 10));
        await el.updateComplete;

        expect(el.hasAttribute('aria-expanded')).toBe(true);
        expect(el.getAttribute('aria-expanded')).toBe('false');

        el.expanded = true;
        await el.updateComplete;
        expect(el.getAttribute('aria-expanded')).toBe('true');
    });

    it('sets aria-expanded when has-children is set (no actual children)', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Lazy Node" has-children></flint-tree-item>
        `);
        await el.updateComplete;
        expect(el.hasAttribute('aria-expanded')).toBe(true);
        expect(el.getAttribute('aria-expanded')).toBe('false');
    });

    it('does not set aria-expanded when no children and no has-children', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Leaf"></flint-tree-item>
        `);
        await el.updateComplete;
        expect(el.hasAttribute('aria-expanded')).toBe(false);
    });

    // ── Expand button ──────────────────────────────────────────────────────────

    it('shows expand button when has slotted children', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Parent">
                <flint-tree-item item-id="2" label="Child"></flint-tree-item>
            </flint-tree-item>
        `);
        await el.updateComplete;
        await new Promise(r => setTimeout(r, 10));
        await el.updateComplete;

        const btn = el.shadowRoot!.querySelector('.expand-btn');
        expect(btn).not.toBeNull();
    });

    it('shows expand button when has-children is set', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Lazy" has-children></flint-tree-item>
        `);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('.expand-btn');
        expect(btn).not.toBeNull();
    });

    it('does not show expand button for leaf items', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Leaf"></flint-tree-item>
        `);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('.expand-btn');
        expect(btn).toBeNull();
    });

    it('shows expand-placeholder when no children', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Leaf"></flint-tree-item>
        `);
        const placeholder = el.shadowRoot!.querySelector('.expand-placeholder');
        expect(placeholder).not.toBeNull();
    });

    it('expand button has aria-hidden="true"', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Parent" has-children></flint-tree-item>
        `);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('.expand-btn');
        expect(btn!.getAttribute('aria-hidden')).toBe('true');
    });

    it('expand button has expanded class when expanded', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Parent" has-children expanded></flint-tree-item>
        `);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('.expand-btn');
        expect(btn!.classList.contains('expanded')).toBe(true);
    });

    // ── Events ─────────────────────────────────────────────────────────────────

    it('dispatches flint-tree-item-click on row click', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="my-id" label="Item"></flint-tree-item>
        `);
        const spy = vi.fn();
        el.addEventListener('flint-tree-item-click', spy);

        el.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0]![0].detail).toEqual({ itemId: 'my-id' });
    });

    it('does not dispatch flint-tree-item-click when disabled', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item" disabled></flint-tree-item>
        `);
        const spy = vi.fn();
        el.addEventListener('flint-tree-item-click', spy);

        el.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();

        expect(spy).not.toHaveBeenCalled();
    });

    it('dispatches flint-tree-item-toggle on expand button click', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="my-id" label="Parent" has-children></flint-tree-item>
        `);
        await el.updateComplete;

        const spy = vi.fn();
        el.addEventListener('flint-tree-item-toggle', spy);

        const btn = el.shadowRoot!.querySelector('.expand-btn') as HTMLElement;
        btn.click();

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0]![0].detail).toEqual({ itemId: 'my-id', expanded: true });
    });

    it('does not dispatch flint-tree-item-toggle when disabled', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Parent" has-children disabled></flint-tree-item>
        `);
        await el.updateComplete;

        const spy = vi.fn();
        el.addEventListener('flint-tree-item-toggle', spy);

        const btn = el.shadowRoot!.querySelector('.expand-btn') as HTMLElement;
        btn.click();

        expect(spy).not.toHaveBeenCalled();
    });

    it('flint-tree-item-click event is composed and bubbles', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item"></flint-tree-item>
        `);
        const spy = vi.fn();
        el.addEventListener('flint-tree-item-click', spy);

        el.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();

        const event = spy.mock.calls[0]![0] as CustomEvent;
        expect(event.bubbles).toBe(true);
        expect(event.composed).toBe(true);
    });

    it('flint-tree-item-toggle event is composed and bubbles', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Parent" has-children></flint-tree-item>
        `);
        await el.updateComplete;

        const spy = vi.fn();
        el.addEventListener('flint-tree-item-toggle', spy);

        el.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();

        const event = spy.mock.calls[0]![0] as CustomEvent;
        expect(event.bubbles).toBe(true);
        expect(event.composed).toBe(true);
    });

    // ── Drag handle ────────────────────────────────────────────────────────────

    it('does not render drag handle by default', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item"></flint-tree-item>
        `);
        expect(el.shadowRoot!.querySelector('.drag-handle')).toBeNull();
    });

    it('renders drag handle when show-drag-handle is set', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item" show-drag-handle></flint-tree-item>
        `);
        const handle = el.shadowRoot!.querySelector('.drag-handle');
        expect(handle).not.toBeNull();
        expect(handle!.getAttribute('data-drag-handle')).toBe('true');
    });

    // ── setDraggable API ───────────────────────────────────────────────────────

    it('setDraggable(true) makes item-row draggable', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item"></flint-tree-item>
        `);
        el.setDraggable(true);
        await el.updateComplete;

        const row = el.shadowRoot!.querySelector('.item-row') as HTMLElement;
        expect(row.getAttribute('draggable')).toBe('true');
        expect(row.classList.contains('is-draggable')).toBe(true);
    });

    it('setDraggable(true, true) enables handle-only drag mode', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item" show-drag-handle></flint-tree-item>
        `);
        el.setDraggable(true, true);
        await el.updateComplete;

        const row = el.shadowRoot!.querySelector('.item-row') as HTMLElement;
        expect(row.getAttribute('draggable')).toBe('false');
        expect(row.classList.contains('is-draggable')).toBe(false);

        const handle = el.shadowRoot!.querySelector('.drag-handle') as HTMLElement;
        expect(handle.getAttribute('draggable')).toBe('true');
    });

    it('setDraggable(false) disables dragging', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Item"></flint-tree-item>
        `);
        el.setDraggable(true);
        await el.updateComplete;
        el.setDraggable(false);
        await el.updateComplete;

        const row = el.shadowRoot!.querySelector('.item-row') as HTMLElement;
        expect(row.getAttribute('draggable')).toBe('false');
    });

    // ── Indentation ────────────────────────────────────────────────────────────

    it('applies 8px padding for top-level item', async () => {
        const el = await fixture<FlintTreeItem>(html`
            <flint-tree-item item-id="1" label="Root"></flint-tree-item>
        `);
        const row = el.shadowRoot!.querySelector('.item-row') as HTMLElement;
        expect(row.style.paddingLeft).toBe('8px');
    });
});
