import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-tree-item.js';
import './ui-simple-tree-view.js';
import type { UiTreeItem } from './ui-tree-item.js';
import type { UiSimpleTreeView } from './ui-simple-tree-view.js';

// ─── UiTreeItem ───────────────────────────────────────────────────────────────

describe('UiTreeItem', () => {
    it('renders with label', async () => {
        const el = await fixture<UiTreeItem>(
            html`<ui-tree-item item-id="1" label="Hello"></ui-tree-item>`
        );
        const label = el.shadowRoot!.querySelector('.item-label');
        expect(label?.textContent).toBe('Hello');
    });

    it('sets role="treeitem" on host', async () => {
        const el = await fixture<UiTreeItem>(
            html`<ui-tree-item item-id="1" label="Item"></ui-tree-item>`
        );
        expect(el.getAttribute('role')).toBe('treeitem');
    });

    it('sets tabindex="-1" by default', async () => {
        const el = await fixture<UiTreeItem>(
            html`<ui-tree-item item-id="1" label="Item"></ui-tree-item>`
        );
        expect(el.getAttribute('tabindex')).toBe('-1');
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<UiTreeItem>(
            html`<ui-tree-item item-id="1" label="Item" disabled></ui-tree-item>`
        );
        expect(el.disabled).toBe(true);
        expect(el.hasAttribute('disabled')).toBe(true);
        expect(el.getAttribute('aria-disabled')).toBe('true');
    });

    it('reflects expanded attribute', async () => {
        const el = await fixture<UiTreeItem>(
            html`<ui-tree-item item-id="1" label="Item" expanded></ui-tree-item>`
        );
        expect(el.expanded).toBe(true);
        expect(el.hasAttribute('expanded')).toBe(true);
    });

    it('does not show expand button when no children', async () => {
        const el = await fixture<UiTreeItem>(
            html`<ui-tree-item item-id="1" label="Leaf"></ui-tree-item>`
        );
        const btn = el.shadowRoot!.querySelector('.expand-btn');
        expect(btn).toBeNull();
    });

    it('shows expand button when has children', async () => {
        const el = await fixture<UiTreeItem>(html`
      <ui-tree-item item-id="1" label="Parent">
        <ui-tree-item item-id="1-1" label="Child"></ui-tree-item>
      </ui-tree-item>
    `);
        await el.updateComplete;
        // Trigger slot change
        await new Promise(r => setTimeout(r, 10));
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('.expand-btn');
        expect(btn).not.toBeNull();
    });

    it('dispatches ui-tree-item-click on click', async () => {
        const el = await fixture<UiTreeItem>(
            html`<ui-tree-item item-id="my-id" label="Item"></ui-tree-item>`
        );
        const handler = vi.fn();
        el.addEventListener('ui-tree-item-click', handler);

        el.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();

        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail).toEqual({ itemId: 'my-id' });
    });

    it('does not dispatch click event when disabled', async () => {
        const el = await fixture<UiTreeItem>(
            html`<ui-tree-item item-id="1" label="Item" disabled></ui-tree-item>`
        );
        const handler = vi.fn();
        el.addEventListener('ui-tree-item-click', handler);

        el.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();

        expect(handler).not.toHaveBeenCalled();
    });

    it('hides children container when collapsed', async () => {
        const el = await fixture<UiTreeItem>(html`
      <ui-tree-item item-id="1" label="Parent">
        <ui-tree-item item-id="1-1" label="Child"></ui-tree-item>
      </ui-tree-item>
    `);
        const children = el.shadowRoot!.querySelector('.children-container')!;
        expect(children.hasAttribute('hidden')).toBe(true);
    });

    it('shows children container when expanded', async () => {
        const el = await fixture<UiTreeItem>(html`
      <ui-tree-item item-id="1" label="Parent" expanded>
        <ui-tree-item item-id="1-1" label="Child"></ui-tree-item>
      </ui-tree-item>
    `);
        const children = el.shadowRoot!.querySelector('.children-container')!;
        expect(children.hasAttribute('hidden')).toBe(false);
    });
});

// ─── UiSimpleTreeView ─────────────────────────────────────────────────────────

describe('UiSimpleTreeView', () => {
    let tree: UiSimpleTreeView;

    beforeEach(async () => {
        tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view>
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
          <ui-tree-item item-id="1-2" label="Gamma"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="2" label="Delta" disabled></ui-tree-item>
        <ui-tree-item item-id="3" label="Epsilon"></ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));
    });

    it('renders tree wrapper with role="tree"', async () => {
        const wrapper = tree.shadowRoot!.querySelector('.tree-root');
        expect(wrapper?.getAttribute('role')).toBe('tree');
    });

    it('makes the first non-disabled item tabindex=0', async () => {
        const first = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        expect(first.getAttribute('tabindex')).toBe('0');
    });

    it('disabled items default to tabindex=-1', async () => {
        const disabled = tree.querySelector('ui-tree-item[item-id="2"]') as UiTreeItem;
        expect(disabled.getAttribute('tabindex')).toBe('-1');
    });

    // ─── getItemDOMElement ──────────────────────────────────────────────────

    it('getItemDOMElement returns the correct element', async () => {
        const el = tree.getItemDOMElement('3');
        expect(el).not.toBeNull();
        expect(el?.itemId).toBe('3');
    });

    it('getItemDOMElement returns null for unknown id', async () => {
        expect(tree.getItemDOMElement('nonexistent')).toBeNull();
    });

    it('getItemDOMElement finds nested items', async () => {
        const el = tree.getItemDOMElement('1-2');
        expect(el).not.toBeNull();
        expect(el?.label).toBe('Gamma');
    });

    // ─── onItemClick callback ───────────────────────────────────────────────

    it('calls onItemClick when item is clicked', async () => {
        const handler = vi.fn();
        tree.onItemClick = handler;

        const item = tree.querySelector('ui-tree-item[item-id="3"]') as UiTreeItem;
        item.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();

        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith('3');
    });

    it('does not call onItemClick for disabled items', async () => {
        const handler = vi.fn();
        tree.onItemClick = handler;

        const item = tree.querySelector('ui-tree-item[item-id="2"]') as UiTreeItem;
        item.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();

        expect(handler).not.toHaveBeenCalled();
    });

    it('dispatches item-click event on the tree', async () => {
        const handler = vi.fn();
        tree.addEventListener('item-click', handler);

        const item = tree.querySelector('ui-tree-item[item-id="3"]') as UiTreeItem;
        item.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();

        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail).toEqual({ itemId: '3' });
    });

    // ─── Keyboard navigation ─────────────────────────────────────────────────

    it('ArrowDown moves focus to next focusable item (skipping disabled)', async () => {
        const first = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await tree.updateComplete;

        // item "2" is disabled and disabledItemsFocusable=false, so focus goes to "3"
        const third = tree.querySelector('ui-tree-item[item-id="3"]') as UiTreeItem;
        expect(document.activeElement).toBe(third);
    });

    it('ArrowUp moves focus to previous focusable item', async () => {
        const third = tree.querySelector('ui-tree-item[item-id="3"]') as UiTreeItem;
        third.setAttribute('tabindex', '0');
        third.focus();

        third.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await tree.updateComplete;

        // item "2" is disabled, so focus goes to "1"
        const first = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        expect(document.activeElement).toBe(first);
    });

    it('Home moves focus to first focusable item', async () => {
        const third = tree.querySelector('ui-tree-item[item-id="3"]') as UiTreeItem;
        third.setAttribute('tabindex', '0');
        third.focus();

        third.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
        await tree.updateComplete;

        const first = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        expect(document.activeElement).toBe(first);
    });

    it('End moves focus to last focusable item', async () => {
        const first = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
        await tree.updateComplete;

        const third = tree.querySelector('ui-tree-item[item-id="3"]') as UiTreeItem;
        expect(document.activeElement).toBe(third);
    });

    it('ArrowRight expands a collapsed item with children', async () => {
        const parent = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        parent.focus();
        expect(parent.expanded).toBe(false);

        parent.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await tree.updateComplete;

        expect(parent.expanded).toBe(true);
    });

    it('ArrowLeft collapses an expanded item', async () => {
        const parent = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        parent.expanded = true;
        await parent.updateComplete;
        parent.focus();

        parent.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await tree.updateComplete;

        expect(parent.expanded).toBe(false);
    });

    it('Enter triggers onItemClick for focused item', async () => {
        const handler = vi.fn();
        tree.onItemClick = handler;

        const first = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await tree.updateComplete;

        expect(handler).toHaveBeenCalledWith('1');
    });

    it('Space triggers onItemClick for focused item', async () => {
        const handler = vi.fn();
        tree.onItemClick = handler;

        const first = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await tree.updateComplete;

        expect(handler).toHaveBeenCalledWith('1');
    });

    // ─── disabledItemsFocusable ──────────────────────────────────────────────

    it('disabledItemsFocusable=true includes disabled items in navigation', async () => {
        tree.disabledItemsFocusable = true;
        await tree.updateComplete;

        const first = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await tree.updateComplete;

        // With disabledItemsFocusable=true, focus moves to disabled "2"
        const disabled = tree.querySelector('ui-tree-item[item-id="2"]') as UiTreeItem;
        expect(document.activeElement).toBe(disabled);
    });

    it('first-character navigation jumps to matching item', async () => {
        const first = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'e', bubbles: true }));
        await tree.updateComplete;

        const epsilon = tree.querySelector('ui-tree-item[item-id="3"]') as UiTreeItem;
        expect(document.activeElement).toBe(epsilon);
    });
});

// ─── Expansion features ───────────────────────────────────────────────────────

describe('UiSimpleTreeView — defaultExpandedItems (uncontrolled)', () => {
    it('expands items listed in defaultExpandedItems on mount', async () => {
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view .defaultExpandedItems=${['1', '3']}>
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="2" label="Delta"></ui-tree-item>
        <ui-tree-item item-id="3" label="Epsilon">
          <ui-tree-item item-id="3-1" label="Zeta"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        const item1 = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        const item2 = tree.querySelector('ui-tree-item[item-id="2"]') as UiTreeItem;
        const item3 = tree.querySelector('ui-tree-item[item-id="3"]') as UiTreeItem;

        expect(item1.expanded).toBe(true);
        expect(item2.expanded).toBe(false);
        expect(item3.expanded).toBe(true);
    });

    it('further expansion is managed internally after defaultExpandedItems', async () => {
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view .defaultExpandedItems=${['1']}>
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="2" label="Delta">
          <ui-tree-item item-id="2-1" label="Gamma"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        const item2 = tree.querySelector('ui-tree-item[item-id="2"]') as UiTreeItem;
        item2.focus();
        item2.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await tree.updateComplete;

        expect(item2.expanded).toBe(true);
    });
});

describe('UiSimpleTreeView — expandedItems (controlled)', () => {
    it('expandedItems controls which items are expanded', async () => {
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view .expandedItems=${['1']}>
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="2" label="Delta">
          <ui-tree-item item-id="2-1" label="Gamma"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        const item1 = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        const item2 = tree.querySelector('ui-tree-item[item-id="2"]') as UiTreeItem;

        expect(item1.expanded).toBe(true);
        expect(item2.expanded).toBe(false);
    });

    it('changing expandedItems prop syncs to items', async () => {
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view .expandedItems=${[] as string[]}>
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="2" label="Delta">
          <ui-tree-item item-id="2-1" label="Gamma"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        const item1 = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        const item2 = tree.querySelector('ui-tree-item[item-id="2"]') as UiTreeItem;

        expect(item1.expanded).toBe(false);

        tree.expandedItems = ['1', '2'];
        await tree.updateComplete;

        expect(item1.expanded).toBe(true);
        expect(item2.expanded).toBe(true);

        tree.expandedItems = [];
        await tree.updateComplete;

        expect(item1.expanded).toBe(false);
        expect(item2.expanded).toBe(false);
    });

    it('onExpandedItemsChange fires with the proposed new array', async () => {
        const handler = vi.fn();
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view .expandedItems=${[] as string[]} .onExpandedItemsChange=${handler}>
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        // Click the expand button on item "1"
        const item1 = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        item1.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith(['1']);
    });

    it('dispatches expanded-items-change event', async () => {
        const handler = vi.fn();
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view .expandedItems=${[] as string[]}>
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));
        tree.addEventListener('expanded-items-change', handler);

        const item1 = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        item1.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail).toEqual({ expandedItems: ['1'] });
    });

    it('controlled mode reverts toggle when parent does not update expandedItems', async () => {
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view .expandedItems=${[] as string[]}>
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        const item1 = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;

        // Parent never updates expandedItems → toggle should revert
        item1.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(item1.expanded).toBe(false);
    });
});

// ─── expansionTrigger ─────────────────────────────────────────────────────────

describe('UiSimpleTreeView — expansionTrigger', () => {
    it('content mode: clicking the row toggles expansion', async () => {
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view expansion-trigger="content">
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        const item1 = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        expect(item1.expanded).toBe(false);

        // Click the row (not the expand button)
        item1.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();
        await tree.updateComplete;

        expect(item1.expanded).toBe(true);
    });

    it('iconContainer mode: clicking the row does NOT toggle expansion', async () => {
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view expansion-trigger="iconContainer">
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        const item1 = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        expect(item1.expanded).toBe(false);

        // Click the row (not the icon)
        item1.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();
        await tree.updateComplete;

        expect(item1.expanded).toBe(false); // still collapsed
    });

    it('iconContainer mode: clicking the expand icon DOES toggle expansion', async () => {
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view expansion-trigger="iconContainer">
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        const item1 = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        item1.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(item1.expanded).toBe(true);
    });

    it('content mode: expand button also toggles (via icon click)', async () => {
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view expansion-trigger="content">
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        const item1 = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        item1.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(item1.expanded).toBe(true);
    });

    it('iconContainer mode: row click still fires onItemClick', async () => {
        const handler = vi.fn();
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view expansion-trigger="iconContainer" .onItemClick=${handler}>
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        const item1 = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        item1.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();
        await tree.updateComplete;

        expect(handler).toHaveBeenCalledWith('1');
    });
});

// ─── Keyboard: disabled item branches ─────────────────────────────────────────

describe('UiSimpleTreeView — keyboard on disabled items (disabledItemsFocusable=true)', () => {
    let tree: UiSimpleTreeView;
    let disabledItem: UiTreeItem;
    let disabledParent: UiTreeItem;

    beforeEach(async () => {
        tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view disabled-items-focusable>
        <ui-tree-item item-id="1" label="Alpha" disabled>
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="2" label="Delta" disabled>
          <ui-tree-item item-id="2-1" label="Gamma" disabled></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="3" label="Epsilon"></ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));
        disabledItem = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        disabledParent = tree.querySelector('ui-tree-item[item-id="2"]') as UiTreeItem;
    });

    it('ArrowRight on disabled item does nothing (no expand)', async () => {
        disabledItem.focus();
        expect(disabledItem.expanded).toBe(false);
        disabledItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await tree.updateComplete;
        expect(disabledItem.expanded).toBe(false);
    });

    it('ArrowLeft on disabled expanded item does nothing (no collapse)', async () => {
        disabledParent.expanded = true;
        await disabledParent.updateComplete;
        disabledParent.focus();

        disabledParent.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await tree.updateComplete;
        expect(disabledParent.expanded).toBe(true);
    });

    it('Enter on disabled item does NOT fire onItemClick', async () => {
        const handler = vi.fn();
        tree.onItemClick = handler;
        disabledItem.focus();

        disabledItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await tree.updateComplete;

        expect(handler).not.toHaveBeenCalled();
    });

    it('Space on disabled item does NOT fire onItemClick', async () => {
        const handler = vi.fn();
        tree.onItemClick = handler;
        disabledItem.focus();

        disabledItem.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await tree.updateComplete;

        expect(handler).not.toHaveBeenCalled();
    });
});

// ─── Keyboard: boundary navigation ────────────────────────────────────────────

describe('UiSimpleTreeView — keyboard boundary navigation', () => {
    let tree: UiSimpleTreeView;

    beforeEach(async () => {
        tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view>
        <ui-tree-item item-id="1" label="Alpha"></ui-tree-item>
        <ui-tree-item item-id="2" label="Beta"></ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));
    });

    it('ArrowDown at last item keeps focus on last item', async () => {
        const last = tree.querySelector('ui-tree-item[item-id="2"]') as UiTreeItem;
        last.setAttribute('tabindex', '0');
        last.focus();

        last.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await tree.updateComplete;

        expect(document.activeElement).toBe(last);
    });

    it('ArrowUp at first item keeps focus on first item', async () => {
        const first = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await tree.updateComplete;

        expect(document.activeElement).toBe(first);
    });

    it('ArrowLeft on root-level collapsed item does nothing (no parent)', async () => {
        const first = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await tree.updateComplete;

        expect(document.activeElement).toBe(first); // focus stays
    });

    it('first-character navigation with no match does not change focus', async () => {
        const first = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', bubbles: true }));
        await tree.updateComplete;

        expect(document.activeElement).toBe(first);
    });
});

// ─── disconnectedCallback / event cleanup ─────────────────────────────────────

describe('UiSimpleTreeView — disconnectedCallback', () => {
    it('removes keydown listener after disconnect (no errors)', async () => {
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view>
        <ui-tree-item item-id="1" label="Alpha"></ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;

        // Disconnecting and reconnecting should not throw
        tree.remove();
        expect(() => {
            tree.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        }).not.toThrow();
    });
});

// ─── focusin on non-tree-item ──────────────────────────────────────────────────

describe('UiSimpleTreeView — focusin on non-tree-item', () => {
    it('focusin from a non-tree-item element does not throw', async () => {
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view>
        <ui-tree-item item-id="1" label="Alpha"></ui-tree-item>
        <button id="btn">Click</button>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;

        const btn = tree.querySelector('#btn') as HTMLElement;
        expect(() => {
            btn.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        }).not.toThrow();
    });
});

// ─── _initRovingTabindex edge cases ───────────────────────────────────────────

describe('UiSimpleTreeView — _initRovingTabindex edge cases', () => {
    it('when all items are disabled and disabledItemsFocusable=false, no item gets tabindex=0', async () => {
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view>
        <ui-tree-item item-id="1" label="Alpha" disabled></ui-tree-item>
        <ui-tree-item item-id="2" label="Beta" disabled></ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        const allItems = Array.from(tree.querySelectorAll('ui-tree-item')) as UiTreeItem[];
        const hasFocusable = allItems.some(i => i.getAttribute('tabindex') === '0');
        expect(hasFocusable).toBe(false);
    });

    it('when disabledItemsFocusable changes to true, first item gets tabindex=0', async () => {
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view>
        <ui-tree-item item-id="1" label="Alpha" disabled></ui-tree-item>
        <ui-tree-item item-id="2" label="Beta" disabled></ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        tree.disabledItemsFocusable = true;
        await tree.updateComplete;

        const first = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        expect(first.getAttribute('tabindex')).toBe('0');
    });
});

// ─── Controlled mode collapse ─────────────────────────────────────────────────

describe('UiSimpleTreeView — controlled mode collapse', () => {
    it('controlled collapse fires onExpandedItemsChange without the item', async () => {
        const handler = vi.fn();
        const tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view .expandedItems=${['1']} .onExpandedItemsChange=${handler}>
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        // Item '1' is currently expanded; clicking expand button collapses it
        const item1 = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        item1.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith([]); // '1' removed
    });
});

// ─── ArrowRight on expanded / ArrowLeft to parent ─────────────────────────────

describe('UiSimpleTreeView — ArrowRight focus to first child / ArrowLeft to parent', () => {
    let tree: UiSimpleTreeView;
    let parent: UiTreeItem;

    beforeEach(async () => {
        tree = await fixture<UiSimpleTreeView>(html`
      <ui-simple-tree-view>
        <ui-tree-item item-id="1" label="Alpha">
          <ui-tree-item item-id="1-1" label="Beta"></ui-tree-item>
          <ui-tree-item item-id="1-2" label="Gamma"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="2" label="Delta"></ui-tree-item>
      </ui-simple-tree-view>
    `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));

        // Expand parent so children are visible
        parent = tree.querySelector('ui-tree-item[item-id="1"]') as UiTreeItem;
        parent.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 10));
        expect(parent.expanded).toBe(true);
    });

    it('ArrowRight on expanded item moves focus to its first child', async () => {
        parent.focus();
        parent.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await tree.updateComplete;

        const firstChild = tree.querySelector('ui-tree-item[item-id="1-1"]') as UiTreeItem;
        expect(document.activeElement).toBe(firstChild);
    });

    it('ArrowLeft on child moves focus to its parent', async () => {
        const child = tree.querySelector('ui-tree-item[item-id="1-1"]') as UiTreeItem;
        child.focus();
        child.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await tree.updateComplete;

        expect(document.activeElement).toBe(parent);
    });
});
