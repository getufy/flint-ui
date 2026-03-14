import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-tree-item.js';
import './flint-rich-tree-view.js';
import type { FlintTreeItem } from './flint-tree-item.js';
import type { FlintRichTreeView, RichTreeItem } from './flint-rich-tree-view.js';

// ─── jsdom polyfills ──────────────────────────────────────────────────────────
//
// jsdom (used by Vitest) does not implement DragEvent or DataTransfer.
// We polyfill both globally before any tests run so drag simulations work.

if (typeof DataTransfer === 'undefined') {
    class DataTransferPolyfill {
        effectAllowed = 'uninitialized';
        dropEffect = 'none';
        private _data: Record<string, string> = {};
        setData(format: string, data: string) { this._data[format] = data; }
        getData(format: string) { return this._data[format] ?? ''; }
        clearData(format?: string) {
            if (format) delete this._data[format];
            else this._data = {};
        }
        setDragImage() { }
        get types() { return Object.keys(this._data); }
        get files() { return [] as unknown as FileList; }
        get items() { return [] as unknown as DataTransferItemList; }
    }
    (globalThis as Record<string, unknown>).DataTransfer = DataTransferPolyfill;
}

if (typeof DragEvent === 'undefined') {
    class DragEventPolyfill extends MouseEvent {
        readonly dataTransfer: DataTransfer | null;
        constructor(type: string, init: DragEventInit = {}) {
            super(type, init);
            this.dataTransfer = init.dataTransfer ?? null;
        }
    }
    (globalThis as Record<string, unknown>).DragEvent = DragEventPolyfill;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Items are rendered inside shadow DOM — query from shadowRoot. */
function getItem(tree: FlintRichTreeView, id: string): FlintTreeItem | null {
    return tree.shadowRoot!.querySelector(`flint-tree-item[item-id="${id}"]`) as FlintTreeItem | null;
}

function getAllItems(tree: FlintRichTreeView): FlintTreeItem[] {
    return Array.from(tree.shadowRoot!.querySelectorAll('flint-tree-item')) as FlintTreeItem[];
}

async function settle(tree: FlintRichTreeView, ms = 20) {
    await tree.updateComplete;
    await new Promise(r => setTimeout(r, ms));
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const BASIC_ITEMS: RichTreeItem[] = [
    {
        id: '1', label: 'Alpha', children: [
            { id: '1-1', label: 'Beta' },
            { id: '1-2', label: 'Gamma' },
        ],
    },
    { id: '2', label: 'Delta', children: [{ id: '2-1', label: 'Epsilon' }] },
    { id: '3', label: 'Zeta' },
];

const FLAT_ITEMS: RichTreeItem[] = [
    { id: 'a', label: 'Alpha' },
    { id: 'b', label: 'Beta' },
    { id: 'c', label: 'Gamma' },
];

// ─── Basic rendering ───────────────────────────────────────────────────────────

describe('FlintRichTreeView — basic rendering', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${BASIC_ITEMS}></flint-rich-tree-view>
    `);
        await settle(tree);
    });

    it('renders a tree-root with role="tree"', () => {
        const root = tree.shadowRoot!.querySelector('.tree-root');
        expect(root?.getAttribute('role')).toBe('tree');
    });

    it('renders top-level items', () => {
        const item1 = getItem(tree, '1');
        const item3 = getItem(tree, '3');
        expect(item1).not.toBeNull();
        expect(item3).not.toBeNull();
        expect(item1?.label).toBe('Alpha');
        expect(item3?.label).toBe('Zeta');
    });

    it('renders nested items', () => {
        const item11 = getItem(tree, '1-1');
        expect(item11).not.toBeNull();
        expect(item11?.label).toBe('Beta');
    });

    it('makes the first item tabindex=0 (roving tabindex)', () => {
        const first = getItem(tree, '1');
        expect(first?.getAttribute('tabindex')).toBe('0');
    });

    it('sets role="treeitem" on rendered items', () => {
        const item = getItem(tree, '1');
        expect(item?.getAttribute('role')).toBe('treeitem');
    });

    it('re-renders when items prop changes', async () => {
        expect(getItem(tree, 'x')).toBeNull();

        tree.items = [{ id: 'x', label: 'X-Item' }];
        await settle(tree);

        expect(getItem(tree, 'x')).not.toBeNull();
        expect(getItem(tree, '1')).toBeNull(); // old items gone
    });
});

// ─── Custom property accessors ────────────────────────────────────────────────

describe('FlintRichTreeView — custom property accessors', () => {
    it('getItemId maps a custom id field', async () => {
        const items: RichTreeItem[] = [
            { internalId: 'foo', label: 'Foo', children: [{ internalId: 'bar', label: 'Bar' }] },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view
        .items=${items}
        .getItemId=${(item: RichTreeItem) => item['internalId'] as string}
      ></flint-rich-tree-view>
    `);
        await settle(tree);

        expect(getItem(tree, 'foo')).not.toBeNull();
        expect(getItem(tree, 'bar')).not.toBeNull();
    });

    it('getItemLabel maps a custom label field', async () => {
        const items: RichTreeItem[] = [{ id: '1', name: 'Custom Name' }];
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view
        .items=${items}
        .getItemLabel=${(item: RichTreeItem) => item['name'] as string}
      ></flint-rich-tree-view>
    `);
        await settle(tree);

        const domItem = getItem(tree, '1');
        expect(domItem?.label).toBe('Custom Name');
    });

    it('getItemChildren maps a custom children field', async () => {
        const items: RichTreeItem[] = [
            { id: '1', label: 'Parent', nodes: [{ id: '1-1', label: 'Child', nodes: [] }] },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view
        .items=${items}
        .getItemChildren=${(item: RichTreeItem) => item['nodes'] as RichTreeItem[] | undefined}
      ></flint-rich-tree-view>
    `);
        await settle(tree);

        expect(getItem(tree, '1-1')).not.toBeNull();
    });
});

// ─── isItemDisabled ───────────────────────────────────────────────────────────

describe('FlintRichTreeView — isItemDisabled', () => {
    it('marks items as disabled when isItemDisabled returns true', async () => {
        const items: RichTreeItem[] = [
            { id: '1', label: 'Enabled' },
            { id: '2', label: 'Disabled' },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view
        .items=${items}
        .isItemDisabled=${(item: RichTreeItem) => item['id'] === '2'}
      ></flint-rich-tree-view>
    `);
        await settle(tree);

        expect(getItem(tree, '1')?.disabled).toBe(false);
        expect(getItem(tree, '2')?.disabled).toBe(true);
        expect(getItem(tree, '2')?.getAttribute('aria-disabled')).toBe('true');
    });

    it('disabled items default to tabindex=-1', async () => {
        const items: RichTreeItem[] = [
            { id: '1', label: 'Enabled' },
            { id: '2', label: 'Disabled' },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view
        .items=${items}
        .isItemDisabled=${(item: RichTreeItem) => item['id'] === '2'}
      ></flint-rich-tree-view>
    `);
        await settle(tree);

        expect(getItem(tree, '2')?.getAttribute('tabindex')).toBe('-1');
    });
});

// ─── Public API: getItem ──────────────────────────────────────────────────────

describe('FlintRichTreeView — getItem()', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${BASIC_ITEMS}></flint-rich-tree-view>
    `);
        await settle(tree);
    });

    it('returns the data item for a top-level id', () => {
        const item = tree.getItem('1');
        expect(item).not.toBeNull();
        expect(item?.['label']).toBe('Alpha');
    });

    it('returns the data item for a nested id', () => {
        const item = tree.getItem('1-2');
        expect(item).not.toBeNull();
        expect(item?.['label']).toBe('Gamma');
    });

    it('returns null for an unknown id', () => {
        expect(tree.getItem('nonexistent')).toBeNull();
    });
});

// ─── Public API: getItemDOMElement ────────────────────────────────────────────

describe('FlintRichTreeView — getItemDOMElement()', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${BASIC_ITEMS}></flint-rich-tree-view>
    `);
        await settle(tree);
    });

    it('returns the correct DOM element for a top-level item', () => {
        const el = tree.getItemDOMElement('3');
        expect(el).not.toBeNull();
        expect(el?.itemId).toBe('3');
    });

    it('returns the correct DOM element for a nested item', () => {
        const el = tree.getItemDOMElement('1-1');
        expect(el).not.toBeNull();
        expect(el?.label).toBe('Beta');
    });

    it('returns null for an unknown id', () => {
        expect(tree.getItemDOMElement('nonexistent')).toBeNull();
    });
});

// ─── Public API: getItemTree ──────────────────────────────────────────────────

describe('FlintRichTreeView — getItemTree()', () => {
    it('returns the items array', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${BASIC_ITEMS}></flint-rich-tree-view>
    `);
        await settle(tree);
        expect(tree.getItemTree()).toBe(BASIC_ITEMS);
    });

    it('reflects updated items after assignment', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${BASIC_ITEMS}></flint-rich-tree-view>
    `);
        await settle(tree);

        const newItems: RichTreeItem[] = [{ id: 'x', label: 'X' }];
        tree.items = newItems;
        await settle(tree);

        expect(tree.getItemTree()).toBe(newItems);
    });
});

// ─── Public API: setIsItemDisabled ────────────────────────────────────────────

describe('FlintRichTreeView — setIsItemDisabled()', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${FLAT_ITEMS}></flint-rich-tree-view>
    `);
        await settle(tree);
    });

    it('disables an item imperatively', async () => {
        expect(getItem(tree, 'b')?.disabled).toBe(false);

        tree.setIsItemDisabled('b', true);
        await settle(tree);

        expect(getItem(tree, 'b')?.disabled).toBe(true);
    });

    it('re-enables an item imperatively', async () => {
        tree.setIsItemDisabled('b', true);
        await settle(tree);
        expect(getItem(tree, 'b')?.disabled).toBe(true);

        tree.setIsItemDisabled('b', false);
        await settle(tree);
        expect(getItem(tree, 'b')?.disabled).toBe(false);
    });

    it('override takes precedence over isItemDisabled prop', async () => {
        tree.isItemDisabled = () => true; // everything disabled
        await settle(tree);

        tree.setIsItemDisabled('a', false); // re-enable 'a' via override
        await settle(tree);

        expect(getItem(tree, 'a')?.disabled).toBe(false);
        expect(getItem(tree, 'b')?.disabled).toBe(true);
    });
});

// ─── onItemClick ──────────────────────────────────────────────────────────────

describe('FlintRichTreeView — onItemClick', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${FLAT_ITEMS}></flint-rich-tree-view>
    `);
        await settle(tree);
    });

    it('calls onItemClick when a leaf item is clicked', async () => {
        const handler = vi.fn();
        tree.onItemClick = handler;

        const item = getItem(tree, 'b')!;
        item.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();

        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith('b');
    });

    it('dispatches flint-tree-view-item-click event on the host', async () => {
        const handler = vi.fn();
        tree.addEventListener('flint-tree-view-item-click', handler);

        const item = getItem(tree, 'a')!;
        item.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();

        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail).toEqual({ itemId: 'a' });
    });

    it('does not call onItemClick for disabled items', async () => {
        tree.isItemDisabled = (i) => i['id'] === 'b';
        await settle(tree);

        const handler = vi.fn();
        tree.onItemClick = handler;

        const item = getItem(tree, 'b')!;
        item.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();

        expect(handler).not.toHaveBeenCalled();
    });
});

// ─── Expansion (uncontrolled) ─────────────────────────────────────────────────

describe('FlintRichTreeView — expansion (uncontrolled)', () => {
    it('defaultExpandedItems expands items on mount', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view
        .items=${BASIC_ITEMS}
        .defaultExpandedItems=${['1', '2']}
      ></flint-rich-tree-view>
    `);
        await settle(tree);

        expect(getItem(tree, '1')?.expanded).toBe(true);
        expect(getItem(tree, '2')?.expanded).toBe(true);
        expect(getItem(tree, '3')?.expanded).toBe(false);
    });

    it('clicking expand button toggles expansion in uncontrolled mode', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${BASIC_ITEMS}></flint-rich-tree-view>
    `);
        await settle(tree);

        const item1 = getItem(tree, '1')!;
        expect(item1.expanded).toBe(false);

        item1.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(item1.expanded).toBe(true);
    });
});

// ─── Expansion (controlled) ───────────────────────────────────────────────────

describe('FlintRichTreeView — expansion (controlled)', () => {
    it('expandedItems controls which items are expanded', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${BASIC_ITEMS} .expandedItems=${['1']}></flint-rich-tree-view>
    `);
        await settle(tree);

        expect(getItem(tree, '1')?.expanded).toBe(true);
        expect(getItem(tree, '2')?.expanded).toBe(false);
    });

    it('changing expandedItems prop syncs to DOM items', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${BASIC_ITEMS} .expandedItems=${[] as string[]}></flint-rich-tree-view>
    `);
        await settle(tree);

        expect(getItem(tree, '1')?.expanded).toBe(false);

        tree.expandedItems = ['1', '2'];
        await tree.updateComplete;

        expect(getItem(tree, '1')?.expanded).toBe(true);
        expect(getItem(tree, '2')?.expanded).toBe(true);
    });

    it('onExpandedItemsChange fires with proposed new array', async () => {
        const handler = vi.fn();
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view
        .items=${BASIC_ITEMS}
        .expandedItems=${[] as string[]}
        .onExpandedItemsChange=${handler}
      ></flint-rich-tree-view>
    `);
        await settle(tree);

        getItem(tree, '1')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith(['1']);
    });

    it('dispatches flint-tree-view-expanded-items-change event', async () => {
        const handler = vi.fn();
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${BASIC_ITEMS} .expandedItems=${[] as string[]}></flint-rich-tree-view>
    `);
        await settle(tree);
        tree.addEventListener('flint-tree-view-expanded-items-change', handler);

        getItem(tree, '1')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail).toEqual({ expandedItems: ['1'] });
    });

    it('controlled mode reverts toggle when parent does not update expandedItems', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${BASIC_ITEMS} .expandedItems=${[] as string[]}></flint-rich-tree-view>
    `);
        await settle(tree);

        const item1 = getItem(tree, '1')!;
        item1.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(item1.expanded).toBe(false); // reverted
    });
});

// ─── Keyboard navigation ──────────────────────────────────────────────────────

describe('FlintRichTreeView — keyboard navigation', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${FLAT_ITEMS}></flint-rich-tree-view>
    `);
        await settle(tree);
    });

    it('ArrowDown moves focus to next item', async () => {
        const first = getItem(tree, 'a')!;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(getItem(tree, 'b'));
    });

    it('ArrowUp moves focus to previous item', async () => {
        const second = getItem(tree, 'b')!;
        second.setAttribute('tabindex', '0');
        second.focus();

        second.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(getItem(tree, 'a'));
    });

    it('Home moves focus to first item', async () => {
        const last = getItem(tree, 'c')!;
        last.setAttribute('tabindex', '0');
        last.focus();

        last.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(getItem(tree, 'a'));
    });

    it('End moves focus to last item', async () => {
        const first = getItem(tree, 'a')!;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(getItem(tree, 'c'));
    });

    it('Enter fires onItemClick', async () => {
        const handler = vi.fn();
        tree.onItemClick = handler;

        const first = getItem(tree, 'a')!;
        first.focus();
        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await tree.updateComplete;

        expect(handler).toHaveBeenCalledWith('a');
    });

    it('Space fires onItemClick', async () => {
        const handler = vi.fn();
        tree.onItemClick = handler;

        const first = getItem(tree, 'a')!;
        first.focus();
        first.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await tree.updateComplete;

        expect(handler).toHaveBeenCalledWith('a');
    });

    it('first-character navigation jumps to matching item', async () => {
        const first = getItem(tree, 'a')!;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'g', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(getItem(tree, 'c')); // 'Gamma'
    });

    it('ArrowDown skips disabled items when disabledItemsFocusable=false', async () => {
        tree.isItemDisabled = (item) => item['id'] === 'b';
        await settle(tree);

        const first = getItem(tree, 'a')!;
        first.focus();
        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(getItem(tree, 'c'));
    });

    it('ArrowDown includes disabled items when disabledItemsFocusable=true', async () => {
        tree.isItemDisabled = (item) => item['id'] === 'b';
        tree.disabledItemsFocusable = true;
        await settle(tree);

        const first = getItem(tree, 'a')!;
        first.focus();
        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(getItem(tree, 'b'));
    });
});

// ─── Keyboard: expansion with nested items ────────────────────────────────────

describe('FlintRichTreeView — keyboard expansion', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view .items=${BASIC_ITEMS}></flint-rich-tree-view>
    `);
        await settle(tree);
    });

    it('ArrowRight expands a collapsed item with children', async () => {
        const parent = getItem(tree, '1')!;
        parent.focus();
        expect(parent.expanded).toBe(false);

        parent.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await tree.updateComplete;

        expect(parent.expanded).toBe(true);
    });

    it('ArrowLeft collapses an expanded item', async () => {
        getItem(tree, '1')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        const parent = getItem(tree, '1')!;
        expect(parent.expanded).toBe(true);
        parent.focus();

        parent.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await tree.updateComplete;

        expect(parent.expanded).toBe(false);
    });

    it('ArrowRight on expanded item moves focus to first child', async () => {
        getItem(tree, '1')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        const parent = getItem(tree, '1')!;
        parent.focus();

        parent.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(getItem(tree, '1-1'));
    });

    it('ArrowLeft on collapsed child moves focus to parent', async () => {
        getItem(tree, '1')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        const child = getItem(tree, '1-1')!;
        child.focus();

        child.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(getItem(tree, '1'));
    });
});

// ─── disabledItemsFocusable ───────────────────────────────────────────────────

describe('FlintRichTreeView — disabledItemsFocusable', () => {
    it('true: disabled items included in roving tabindex', async () => {
        const items: RichTreeItem[] = [
            { id: '1', label: 'Alpha' },
            { id: '2', label: 'Beta' },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
      <flint-rich-tree-view
        .items=${items}
        .isItemDisabled=${(i: RichTreeItem) => i['id'] === '2'}
        disabled-items-focusable
      ></flint-rich-tree-view>
    `);
        await settle(tree);

        const all = getAllItems(tree);
        expect(all[0].getAttribute('tabindex')).toBe('0');
        expect(all[1].getAttribute('tabindex')).not.toBeNull();
    });
});

// =============================================================================
// ─── Drag & Drop / Ordering ───────────────────────────────────────────────────
// =============================================================================

/**
 * Simulate the full drag lifecycle between two tree items.
 *
 * Events are dispatched on the `flint-tree-item` HOST elements (not their inner
 * shadow DOM rows) because jsdom does not populate `composedPath()` correctly
 * for events that cross shadow boundaries. The component's `_getTreeItemFromEvent`
 * has a matching fallback that reads `e.target` directly for this case.
 *
 * `getBoundingClientRect` is stubbed on the host element because that is the
 * element returned by `_getTreeItemFromEvent` and used in `_handleDragOver`.
 */
function simulateDrop(
    tree: FlintRichTreeView,
    fromId: string,
    toId: string,
    position: 'before' | 'after' | 'inside' = 'after'
) {
    const fromEl = getItem(tree, fromId)!;
    const toEl = getItem(tree, toId)!;

    // Stub getBoundingClientRect on the HOST element (what _getTreeItemFromEvent returns)
    const height = 36;
    const top = 100;
    const yByPosition = {
        before: top + height * 0.1,   // top 25% → before
        after: top + height * 0.9,   // bottom 25% → after
        inside: top + height * 0.5,   // middle → inside
    };
    toEl.getBoundingClientRect = () => ({
        top, bottom: top + height, height, left: 0, right: 200, width: 200,
        x: 0, y: top, toJSON: () => ({}),
    } as DOMRect);

    const dt = new DataTransfer();
    const clientY = yByPosition[position];

    // Dispatch on the flint-tree-item HOST so e.target is the host element,
    // letting _getTreeItemFromEvent find it via the e.target fallback.
    fromEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true, dataTransfer: dt }));
    toEl.dispatchEvent(new DragEvent('dragover', { bubbles: true, composed: true, dataTransfer: dt, clientY }));
    toEl.dispatchEvent(new DragEvent('drop', { bubbles: true, composed: true, dataTransfer: dt, clientY }));
    fromEl.dispatchEvent(new DragEvent('dragend', { bubbles: true, composed: true }));
}

// ─── itemsReordering prop ─────────────────────────────────────────────────────

describe('FlintRichTreeView — itemsReordering prop', () => {
    it('items are not draggable by default (itemsReordering=false)', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS}></flint-rich-tree-view>
        `);
        await settle(tree);

        const row = getItem(tree, 'a')!.shadowRoot!.querySelector<HTMLElement>('.item-row')!;
        expect(row.getAttribute('draggable')).not.toBe('true');
    });

    it('items are draggable when itemsReordering=true', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);

        const row = getItem(tree, 'a')!.shadowRoot!.querySelector<HTMLElement>('.item-row')!;
        expect(row.getAttribute('draggable')).toBe('true');
    });

    it('getItemTree() returns original items when no reordering has occurred', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);
        // Before any drag, should still be the original reference
        expect(tree.getItemTree()).toBe(FLAT_ITEMS);
    });
});

// ─── Basic reordering ─────────────────────────────────────────────────────────

describe('FlintRichTreeView — basic reordering', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);
    });

    it('moving item after another reorders getItemTree() correctly', async () => {
        simulateDrop(tree, 'a', 'c', 'after');
        await settle(tree);

        const ids = tree.getItemTree().map(i => i['id']);
        // 'a' moved after 'c': b, c, a
        expect(ids).toEqual(['b', 'c', 'a']);
    });

    it('moving item before another reorders getItemTree() correctly', async () => {
        simulateDrop(tree, 'c', 'a', 'before');
        await settle(tree);

        const ids = tree.getItemTree().map(i => i['id']);
        // 'c' moved before 'a': c, a, b
        expect(ids).toEqual(['c', 'a', 'b']);
    });

    it('dropping item inside a parent adds it as a child', async () => {
        const items: RichTreeItem[] = [
            { id: 'p', label: 'Parent', children: [] },
            { id: 'x', label: 'Orphan' },
        ];
        const innerTree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items} items-reordering></flint-rich-tree-view>
        `);
        await settle(innerTree);

        simulateDrop(innerTree, 'x', 'p', 'inside');
        await settle(innerTree);

        const parent = innerTree.getItemTree().find(i => i['id'] === 'p')!;
        const children = (parent['children'] as RichTreeItem[]);
        expect(children.map(c => c['id'])).toContain('x');
    });

    it('item cannot be dropped on itself (no change)', async () => {
        const before = tree.getItemTree().map(i => i['id']);
        simulateDrop(tree, 'b', 'b', 'after');
        await settle(tree);

        // getItemTree still returns original — no _orderedItems created for self-drop
        const after = tree.getItemTree().map(i => i['id']);
        expect(after).toEqual(before);
    });

    it('parent cannot be dropped into its own descendant', async () => {
        const items: RichTreeItem[] = [
            {
                id: 'parent', label: 'Parent', children: [
                    { id: 'child', label: 'Child' },
                ],
            },
        ];
        const innerTree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items} items-reordering></flint-rich-tree-view>
        `);
        await settle(innerTree);

        // Expand so 'child' is visible
        getItem(innerTree, 'parent')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await settle(innerTree);

        const before = innerTree.getItemOrderedChildrenIds('parent');
        simulateDrop(innerTree, 'parent', 'child', 'inside');
        await settle(innerTree);

        // Tree should be unchanged — can't drop parent into child
        expect(innerTree.getItemOrderedChildrenIds('parent')).toEqual(before);
    });
});

// ─── flint-tree-view-item-position-change event ───────────────────────────────────────────────

describe('FlintRichTreeView — flint-tree-view-item-position-change event', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);
    });

    it('fires flint-tree-view-item-position-change with correct itemId and newIndex', async () => {
        const handler = vi.fn();
        tree.addEventListener('flint-tree-view-item-position-change', handler);

        simulateDrop(tree, 'a', 'c', 'after');
        await settle(tree);

        expect(handler).toHaveBeenCalledOnce();
        const detail = handler.mock.calls[0][0].detail;
        expect(detail.itemId).toBe('a');
        expect(detail.newParentId).toBeNull(); // root level
        expect(typeof detail.newIndex).toBe('number');
    });

    it('calls onItemPositionChange callback prop', async () => {
        const handler = vi.fn();
        tree.onItemPositionChange = handler;

        simulateDrop(tree, 'b', 'a', 'before');
        await settle(tree);

        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].itemId).toBe('b');
    });

    it('reports correct newParentId when dropping inside a parent', async () => {
        const items: RichTreeItem[] = [
            { id: 'folder', label: 'Folder', children: [] },
            { id: 'file', label: 'File' },
        ];
        const innerTree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items} items-reordering></flint-rich-tree-view>
        `);
        await settle(innerTree);

        const handler = vi.fn();
        innerTree.addEventListener('flint-tree-view-item-position-change', handler);

        simulateDrop(innerTree, 'file', 'folder', 'inside');
        await settle(innerTree);

        expect(handler.mock.calls[0][0].detail.newParentId).toBe('folder');
    });

    it('does not fire when drag is cancelled (dragend with no drop)', async () => {
        const handler = vi.fn();
        tree.addEventListener('flint-tree-view-item-position-change', handler);

        const fromEl = getItem(tree, 'a')!;
        fromEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true }));
        fromEl.dispatchEvent(new DragEvent('dragend', { bubbles: true, composed: true }));
        await settle(tree);

        expect(handler).not.toHaveBeenCalled();
    });
});

// ─── getItemOrderedChildrenIds ────────────────────────────────────────────────

describe('FlintRichTreeView — getItemOrderedChildrenIds()', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${BASIC_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);
    });

    it('returns root-level ids when called with null', () => {
        expect(tree.getItemOrderedChildrenIds(null)).toEqual(['1', '2', '3']);
    });

    it('returns children ids for a parent item', () => {
        expect(tree.getItemOrderedChildrenIds('1')).toEqual(['1-1', '1-2']);
    });

    it('returns empty array for a leaf item', () => {
        expect(tree.getItemOrderedChildrenIds('3')).toEqual([]);
    });

    it('returns empty array for an unknown id', () => {
        expect(tree.getItemOrderedChildrenIds('nonexistent')).toEqual([]);
    });

    it('reflects updated order after a reorder', async () => {
        simulateDrop(tree, '1-2', '1-1', 'before');
        await settle(tree);

        // Gamma (1-2) moved before Beta (1-1)
        expect(tree.getItemOrderedChildrenIds('1')).toEqual(['1-2', '1-1']);
    });
});

// ─── isItemReorderable ────────────────────────────────────────────────────────

describe('FlintRichTreeView — isItemReorderable', () => {
    it('non-reorderable items have draggable=false on their row', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view
                .items=${FLAT_ITEMS}
                items-reordering
                .isItemReorderable=${(id: string) => id !== 'b'}
            ></flint-rich-tree-view>
        `);
        await settle(tree);

        const rowA = getItem(tree, 'a')!.shadowRoot!.querySelector<HTMLElement>('.item-row')!;
        const rowB = getItem(tree, 'b')!.shadowRoot!.querySelector<HTMLElement>('.item-row')!;

        expect(rowA.getAttribute('draggable')).toBe('true');
        expect(rowB.getAttribute('draggable')).not.toBe('true');
    });

    it('dragging a non-reorderable item does not change the tree', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view
                .items=${FLAT_ITEMS}
                items-reordering
                .isItemReorderable=${(id: string) => id !== 'b'}
            ></flint-rich-tree-view>
        `);
        await settle(tree);

        const before = tree.getItemTree().map(i => i['id']);
        simulateDrop(tree, 'b', 'c', 'after');
        await settle(tree);

        expect(tree.getItemTree().map(i => i['id'])).toEqual(before);
    });
});

// ─── canMoveItemToNewPosition ─────────────────────────────────────────────────

describe('FlintRichTreeView — canMoveItemToNewPosition', () => {
    it('blocks moves that fail the validator, leaving tree unchanged', async () => {
        // Only allow reordering within the same parent (root-only rule for simplicity)
        const canMove = vi.fn().mockReturnValue(false);

        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view
                .items=${FLAT_ITEMS}
                items-reordering
                .canMoveItemToNewPosition=${canMove}
            ></flint-rich-tree-view>
        `);
        await settle(tree);

        const before = tree.getItemTree().map(i => i['id']);
        simulateDrop(tree, 'a', 'c', 'after');
        await settle(tree);

        // Validator rejected — tree unchanged
        expect(tree.getItemTree().map(i => i['id'])).toEqual(before);
    });

    it('calls canMoveItemToNewPosition with itemId, targetId, and position', async () => {
        const canMove = vi.fn().mockReturnValue(true);

        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view
                .items=${FLAT_ITEMS}
                items-reordering
                .canMoveItemToNewPosition=${canMove}
            ></flint-rich-tree-view>
        `);
        await settle(tree);

        simulateDrop(tree, 'a', 'c', 'after');
        await settle(tree);

        expect(canMove).toHaveBeenCalledWith(
            expect.objectContaining({ itemId: 'a', targetId: 'c', position: 'after' })
        );
    });
});

// ─── Visual drop state ────────────────────────────────────────────────────────

describe('FlintRichTreeView — drop position visual state', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);
    });

    it('sets drop-position attribute on target item during dragover', async () => {
        const fromEl = getItem(tree, 'a')!;
        const toEl = getItem(tree, 'c')!;

        toEl.getBoundingClientRect = () => ({
            top: 100, bottom: 136, height: 36, left: 0, right: 200, width: 200,
            x: 0, y: 100, toJSON: () => ({}),
        } as DOMRect);

        fromEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true, dataTransfer: new DataTransfer() }));
        toEl.dispatchEvent(new DragEvent('dragover', {
            bubbles: true, composed: true,
            dataTransfer: new DataTransfer(),
            clientY: 130, // bottom 25% → 'after'
        }));
        await settle(tree);

        expect(toEl.getAttribute('drop-position')).toBe('after');
    });

    it('clears drop-position on all items after dragend', async () => {
        const fromEl = getItem(tree, 'a')!;
        const toEl = getItem(tree, 'c')!;

        toEl.getBoundingClientRect = () => ({
            top: 100, bottom: 136, height: 36, left: 0, right: 200, width: 200,
            x: 0, y: 100, toJSON: () => ({}),
        } as DOMRect);

        fromEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true, dataTransfer: new DataTransfer() }));
        toEl.dispatchEvent(new DragEvent('dragover', {
            bubbles: true, composed: true, dataTransfer: new DataTransfer(), clientY: 130,
        }));
        await settle(tree);
        expect(toEl.getAttribute('drop-position')).toBe('after');

        fromEl.dispatchEvent(new DragEvent('dragend', { bubbles: true, composed: true }));
        await settle(tree);

        getAllItems(tree).forEach(item => {
            expect(item.getAttribute('drop-position')).toBeNull();
        });
    });

    it('sets dragging attribute on the source item during drag', async () => {
        const fromEl = getItem(tree, 'a')!;

        fromEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true, dataTransfer: new DataTransfer() }));
        await settle(tree);

        expect(fromEl.hasAttribute('dragging')).toBe(true);
    });

    it('removes dragging attribute after dragend', async () => {
        const fromEl = getItem(tree, 'a')!;

        fromEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true, dataTransfer: new DataTransfer() }));
        await settle(tree);
        fromEl.dispatchEvent(new DragEvent('dragend', { bubbles: true, composed: true }));
        await settle(tree);

        expect(fromEl.hasAttribute('dragging')).toBe(false);
    });
});

// ─── itemsReorderingHandle ────────────────────────────────────────────────────

describe('FlintRichTreeView — itemsReorderingHandle', () => {
    it('shows drag handle icon when itemsReorderingHandle=true', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering items-reordering-handle></flint-rich-tree-view>
        `);
        await settle(tree);

        const handle = getItem(tree, 'a')!.shadowRoot!.querySelector('[data-drag-handle]');
        expect(handle).not.toBeNull();
    });

    it('does not show drag handle when itemsReorderingHandle=false', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);

        const handle = getItem(tree, 'a')!.shadowRoot!.querySelector('[data-drag-handle]');
        expect(handle).toBeNull();
    });

    it('row is NOT draggable when handle mode is on (only handle is)', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering items-reordering-handle></flint-rich-tree-view>
        `);
        await settle(tree);

        const row = getItem(tree, 'a')!.shadowRoot!.querySelector<HTMLElement>('.item-row')!;
        const handle = getItem(tree, 'a')!.shadowRoot!.querySelector<HTMLElement>('[data-drag-handle]')!;

        expect(row.getAttribute('draggable')).not.toBe('true');
        expect(handle.getAttribute('draggable')).toBe('true');
    });
});

// ─── getItemTree() after reorder ──────────────────────────────────────────────

describe('FlintRichTreeView — getItemTree() after reordering', () => {
    it('returns reordered clone, not original items reference', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);

        simulateDrop(tree, 'a', 'c', 'after');
        await settle(tree);

        // After a reorder, getItemTree() returns the internal clone, not FLAT_ITEMS
        expect(tree.getItemTree()).not.toBe(FLAT_ITEMS);
        expect(tree.getItemTree().map(i => i['id'])).toEqual(['b', 'c', 'a']);
    });

    it('preserves nested structure in getItemTree() after child reorder', async () => {
        const items: RichTreeItem[] = [
            {
                id: 'root', label: 'Root', children: [
                    { id: 'c1', label: 'Child 1' },
                    { id: 'c2', label: 'Child 2' },
                    { id: 'c3', label: 'Child 3' },
                ],
            },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);

        // Expand root so children are visible
        getItem(tree, 'root')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await settle(tree);

        simulateDrop(tree, 'c3', 'c1', 'before');
        await settle(tree);

        const root = tree.getItemTree()[0];
        const childIds = (root['children'] as RichTreeItem[]).map(c => c['id']);
        expect(childIds).toEqual(['c3', 'c1', 'c2']);
    });
});

// ─── Keyboard on disabled items ───────────────────────────────────────────────

describe('FlintRichTreeView — keyboard on disabled items (disabledItemsFocusable=true)', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        const items: RichTreeItem[] = [
            { id: '1', label: 'Alpha', children: [{ id: '1-1', label: 'Beta' }] },
            { id: '2', label: 'Delta', children: [{ id: '2-1', label: 'Gamma' }] },
            { id: '3', label: 'Zeta' },
        ];
        tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view
                .items=${items}
                .isItemDisabled=${(i: RichTreeItem) => i['id'] === '1' || i['id'] === '2'}
                disabled-items-focusable
            ></flint-rich-tree-view>
        `);
        await settle(tree);
    });

    it('ArrowRight on disabled item does not expand', async () => {
        const item1 = getItem(tree, '1')!;
        item1.focus();
        expect(item1.expanded).toBe(false);

        item1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await tree.updateComplete;

        expect(item1.expanded).toBe(false);
    });

    it('ArrowLeft on disabled expanded item does not collapse', async () => {
        // Expand item 2 first via uncontrolled toggle
        const item2 = getItem(tree, '2')!;
        // Use the expand button from shadow root (we can click expand btn from the item)
        item2.shadowRoot!.querySelector<HTMLElement>('.expand-btn')?.click();
        await settle(tree);
        // Since isItemDisabled returns true for '2', expansion should be controlled separately
        // Force expansion for this test:
        item2.expanded = true;
        await item2.updateComplete;
        item2.focus();

        item2.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await tree.updateComplete;

        expect(item2.expanded).toBe(true);
    });

    it('Enter on disabled item does NOT fire onItemClick', async () => {
        const handler = vi.fn();
        tree.onItemClick = handler;
        const item1 = getItem(tree, '1')!;
        item1.focus();

        item1.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await tree.updateComplete;

        expect(handler).not.toHaveBeenCalled();
    });

    it('Space on disabled item does NOT fire onItemClick', async () => {
        const handler = vi.fn();
        tree.onItemClick = handler;
        const item1 = getItem(tree, '1')!;
        item1.focus();

        item1.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await tree.updateComplete;

        expect(handler).not.toHaveBeenCalled();
    });
});

// ─── Keyboard: Enter/Space on items with children ─────────────────────────────

describe('FlintRichTreeView — Enter/Space toggles parent items', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${BASIC_ITEMS}></flint-rich-tree-view>
        `);
        await settle(tree);
    });

    it('Enter on parent item expands it', async () => {
        const parent = getItem(tree, '1')!;
        parent.focus();
        expect(parent.expanded).toBe(false);

        parent.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await tree.updateComplete;

        expect(parent.expanded).toBe(true);
    });

    it('Space on parent item expands it', async () => {
        const parent = getItem(tree, '1')!;
        parent.focus();
        expect(parent.expanded).toBe(false);

        parent.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await tree.updateComplete;

        expect(parent.expanded).toBe(true);
    });

    it('Enter on already expanded parent collapses it', async () => {
        const parent = getItem(tree, '1')!;
        parent.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;
        expect(parent.expanded).toBe(true);

        parent.focus();
        parent.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await tree.updateComplete;

        expect(parent.expanded).toBe(false);
    });
});

// ─── Item click on items with children (content mode) ─────────────────────────

describe('FlintRichTreeView — item click expansion in content mode', () => {
    it('clicking item row expands parent in content mode', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${BASIC_ITEMS} expansion-trigger="content"></flint-rich-tree-view>
        `);
        await settle(tree);

        const parent = getItem(tree, '1')!;
        expect(parent.expanded).toBe(false);

        parent.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();
        await tree.updateComplete;

        expect(parent.expanded).toBe(true);
    });

    it('clicking item row in iconContainer mode does not expand', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${BASIC_ITEMS} expansion-trigger="iconContainer"></flint-rich-tree-view>
        `);
        await settle(tree);

        const parent = getItem(tree, '1')!;
        expect(parent.expanded).toBe(false);

        parent.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();
        await tree.updateComplete;

        expect(parent.expanded).toBe(false);
    });
});

// ─── Keyboard boundary navigation ─────────────────────────────────────────────

describe('FlintRichTreeView — keyboard boundary navigation', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS}></flint-rich-tree-view>
        `);
        await settle(tree);
    });

    it('ArrowDown at last item keeps focus on last item', async () => {
        const last = getItem(tree, 'c')!;
        last.setAttribute('tabindex', '0');
        last.focus();

        last.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(last);
    });

    it('ArrowUp at first item keeps focus on first item', async () => {
        const first = getItem(tree, 'a')!;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(first);
    });

    it('ArrowLeft on root-level collapsed item does nothing', async () => {
        const first = getItem(tree, 'a')!;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(first);
    });

    it('first-character navigation with no match keeps focus', async () => {
        const first = getItem(tree, 'a')!;
        first.focus();

        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(first);
    });

    it('non-character keys are ignored silently', async () => {
        const first = getItem(tree, 'a')!;
        first.focus();

        // Shift key alone → length > 1, should be ignored
        expect(() => {
            first.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift', bubbles: true }));
        }).not.toThrow();
    });
});

// ─── disconnectedCallback ─────────────────────────────────────────────────────

describe('FlintRichTreeView — disconnectedCallback', () => {
    it('removes event listeners after disconnect (no errors)', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS}></flint-rich-tree-view>
        `);
        await settle(tree);

        tree.remove();
        // After removing, dispatching events to the shadow root should not throw
        expect(() => {
            tree.shadowRoot!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        }).not.toThrow();
    });
});

// ─── Lazy loading ─────────────────────────────────────────────────────────────

describe('FlintRichTreeView — lazy loading (dataSource)', () => {
    it('renders root loading indicator while fetching root items', async () => {
        let resolveRoot!: (items: RichTreeItem[]) => void;
        const rootPromise = new Promise<RichTreeItem[]>(res => { resolveRoot = res; });

        const dataSource = {
            getTreeItems: () => rootPromise,
            getChildrenCount: () => 0,
        };

        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${[] as RichTreeItem[]} .dataSource=${dataSource}></flint-rich-tree-view>
        `);
        await tree.updateComplete;
        // Allow microtask for _loadChildren to kick off
        await new Promise(r => setTimeout(r, 10));
        await tree.updateComplete;

        const spinner = tree.shadowRoot!.querySelector('.lazy-root');
        expect(spinner).not.toBeNull();

        // Resolve to complete the loading
        resolveRoot([{ id: 'r1', label: 'Root 1' }]);
        await settle(tree, 50);
    });

    it('renders items after root lazy load completes', async () => {
        const rootItems: RichTreeItem[] = [
            { id: 'r1', label: 'Lazy Root' },
            { id: 'r2', label: 'Lazy Root 2' },
        ];
        const dataSource = {
            getTreeItems: async () => rootItems,
            getChildrenCount: () => 0,
        };

        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${[] as RichTreeItem[]} .dataSource=${dataSource}></flint-rich-tree-view>
        `);
        await settle(tree, 100);

        expect(getItem(tree, 'r1')).not.toBeNull();
        expect(getItem(tree, 'r2')).not.toBeNull();
    });

    it('renders child loading indicator while fetching children', async () => {
        let resolveChild!: (items: RichTreeItem[]) => void;
        const childPromise = new Promise<RichTreeItem[]>(res => { resolveChild = res; });

        const parentItems: RichTreeItem[] = [{ id: 'p1', label: 'Parent' }];
        const dataSource = {
            getTreeItems: async (id: string | null) => {
                if (id === null) return parentItems;
                return childPromise;
            },
            getChildrenCount: () => 1, // indicate has children
        };

        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${parentItems} .dataSource=${dataSource}></flint-rich-tree-view>
        `);
        await settle(tree, 50);

        // Expand p1 to trigger child lazy load
        const p1 = getItem(tree, 'p1')!;
        p1.shadowRoot!.querySelector<HTMLElement>('.expand-btn')?.click();
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 10));
        await tree.updateComplete;

        const loadingEl = tree.shadowRoot!.querySelector('.lazy-indicator');
        expect(loadingEl).not.toBeNull();

        resolveChild([{ id: 'c1', label: 'Child 1' }]);
        await settle(tree, 50);
    });

    it('handles dataSource rejection gracefully (no crash)', async () => {
        const errors: CustomEvent[] = [];
        const handler = (e: Event) => errors.push(e as CustomEvent);
        document.addEventListener('flint-tree-view-error', handler);
        const dataSource = {
            getTreeItems: async (): Promise<RichTreeItem[]> => {
                throw new Error('Network error');
            },
            getChildrenCount: () => 0,
        };

        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${[] as RichTreeItem[]} .dataSource=${dataSource}></flint-rich-tree-view>
        `);
        await settle(tree, 100);

        document.removeEventListener('flint-tree-view-error', handler);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].detail.error).toBeInstanceOf(Error);
    });

    it('resets lazy state when dataSource prop is replaced', async () => {
        const ds1Items: RichTreeItem[] = [{ id: 'd1', label: 'From DS1' }];
        const ds1 = {
            getTreeItems: async () => ds1Items,
            getChildrenCount: () => 0,
        };

        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${[] as RichTreeItem[]} .dataSource=${ds1}></flint-rich-tree-view>
        `);
        await settle(tree, 100);

        expect(getItem(tree, 'd1')).not.toBeNull();

        // Replace dataSource — should reset and reload
        const ds2Items: RichTreeItem[] = [{ id: 'd2', label: 'From DS2' }];
        const ds2 = {
            getTreeItems: async () => ds2Items,
            getChildrenCount: () => 0,
        };
        tree.dataSource = ds2;
        await settle(tree, 100);

        expect(getItem(tree, 'd2')).not.toBeNull();
    });

    it('triggers lazy load when expanding item with dataSource', async () => {
        const childItems: RichTreeItem[] = [{ id: 'child-lazy', label: 'Lazy Child' }];
        const parentItems: RichTreeItem[] = [{ id: 'lazy-parent', label: 'Lazy Parent' }];
        const dataSource = {
            getTreeItems: async (id: string | null) => {
                if (id === null) return parentItems;
                return childItems;
            },
            getChildrenCount: () => 1,
        };

        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${parentItems} .dataSource=${dataSource}></flint-rich-tree-view>
        `);
        await settle(tree, 50);

        // Click expand to trigger lazy child load
        const parent = getItem(tree, 'lazy-parent')!;
        parent.shadowRoot!.querySelector<HTMLElement>('.expand-btn')?.click();
        await settle(tree, 100);

        expect(getItem(tree, 'child-lazy')).not.toBeNull();
    });

    it('does not duplicate fetch when already loading', async () => {
        let callCount = 0;
        let resolveRoot!: (items: RichTreeItem[]) => void;
        const rootPromise = new Promise<RichTreeItem[]>(res => { resolveRoot = res; });

        const dataSource = {
            getTreeItems: () => { callCount++; return rootPromise; },
            getChildrenCount: () => 0,
        };

        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${[] as RichTreeItem[]} .dataSource=${dataSource}></flint-rich-tree-view>
        `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 10));

        // Force another update — should not re-trigger the same fetch
        tree.requestUpdate();
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 10));

        expect(callCount).toBe(1); // fetched only once

        resolveRoot([]);
        await settle(tree, 20);
    });
});

// ─── _isAncestorOf deep recursion ─────────────────────────────────────────────

describe('FlintRichTreeView — ancestor detection (nested)', () => {
    it('prevents drop of a grandparent onto its grandchild', async () => {
        const items: RichTreeItem[] = [
            {
                id: 'gp', label: 'Grandparent', children: [
                    {
                        id: 'p', label: 'Parent', children: [
                            { id: 'gc', label: 'Grandchild' },
                        ],
                    },
                ],
            },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);

        // Expand both levels
        getItem(tree, 'gp')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await settle(tree);
        getItem(tree, 'p')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await settle(tree);

        const before = JSON.stringify(tree.getItemTree());
        simulateDrop(tree, 'gp', 'gc', 'inside');
        await settle(tree);

        // Structure should be unchanged
        expect(JSON.stringify(tree.getItemTree())).toBe(before);
    });
});

// ─── Drag: handle-only mode (no handle path) ──────────────────────────────────

describe('FlintRichTreeView — itemsReorderingHandle drag restrictions', () => {
    it('dragstart not from handle is cancelled (tree unchanged)', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering items-reordering-handle></flint-rich-tree-view>
        `);
        await settle(tree);

        const before = tree.getItemTree().map(i => i['id']);

        // Dispatch dragstart directly on the item host (not the handle)
        // composedPath() is empty in jsdom so isHandle detection will fail → preventDefault
        const fromEl = getItem(tree, 'a')!;
        const dt = new DataTransfer();
        fromEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true, dataTransfer: dt }));

        const toEl = getItem(tree, 'c')!;
        toEl.getBoundingClientRect = () => ({
            top: 100, bottom: 136, height: 36, left: 0, right: 200, width: 200,
            x: 0, y: 100, toJSON: () => ({}),
        } as DOMRect);
        toEl.dispatchEvent(new DragEvent('dragover', { bubbles: true, composed: true, dataTransfer: dt, clientY: 130 }));
        toEl.dispatchEvent(new DragEvent('drop', { bubbles: true, composed: true, dataTransfer: dt, clientY: 130 }));
        fromEl.dispatchEvent(new DragEvent('dragend', { bubbles: true, composed: true }));
        await settle(tree);

        expect(tree.getItemTree().map(i => i['id'])).toEqual(before);
    });
});

// ─── Drag: dragover edge cases ─────────────────────────────────────────────────

describe('FlintRichTreeView — dragover edge cases', () => {
    it('dragover with no draggedItemId is a no-op', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);

        const toEl = getItem(tree, 'b')!;
        toEl.getBoundingClientRect = () => ({
            top: 100, bottom: 136, height: 36, left: 0, right: 200, width: 200,
            x: 0, y: 100, toJSON: () => ({}),
        } as DOMRect);

        // Dispatch dragover WITHOUT a prior dragstart → _draggedItemId is null
        expect(() => {
            toEl.dispatchEvent(new DragEvent('dragover', {
                bubbles: true, composed: true, dataTransfer: new DataTransfer(), clientY: 115,
            }));
        }).not.toThrow();
    });

    it('dragover when itemsReordering=false is a no-op', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS}></flint-rich-tree-view>
        `);
        await settle(tree);

        const toEl = getItem(tree, 'b')!;
        expect(() => {
            toEl.dispatchEvent(new DragEvent('dragover', {
                bubbles: true, composed: true, dataTransfer: new DataTransfer(), clientY: 115,
            }));
        }).not.toThrow();
    });
});

// ─── Drag: drop edge cases ────────────────────────────────────────────────────

describe('FlintRichTreeView — drop edge cases', () => {
    it('drop with itemsReordering=false is a no-op', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS}></flint-rich-tree-view>
        `);
        await settle(tree);

        const toEl = getItem(tree, 'b')!;
        expect(() => {
            toEl.dispatchEvent(new DragEvent('drop', { bubbles: true, composed: true }));
        }).not.toThrow();

        // items unchanged
        expect(tree.getItemTree()).toBe(FLAT_ITEMS);
    });

    it('dragend with no matching tree item is handled gracefully', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);

        // Dispatch dragend on the tree root (not a flint-tree-item)
        expect(() => {
            tree.shadowRoot!.querySelector('.tree-root')!.dispatchEvent(
                new DragEvent('dragend', { bubbles: true, composed: true })
            );
        }).not.toThrow();
    });
});

// ─── _cloneItemsTree with custom children key ────────────────────────────────

describe('FlintRichTreeView — _cloneItemsTree with custom children key', () => {
    it('preserves custom children key after reorder', async () => {
        const items: RichTreeItem[] = [
            {
                id: 'p', label: 'Parent', nodes: [
                    { id: 'c1', label: 'Child 1', nodes: [] },
                    { id: 'c2', label: 'Child 2', nodes: [] },
                ],
            },
            { id: 'x', label: 'Extra' },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view
                .items=${items}
                .getItemChildren=${(item: RichTreeItem) => item['nodes'] as RichTreeItem[] | undefined}
                items-reordering
            ></flint-rich-tree-view>
        `);
        await settle(tree);

        // Expand parent so children are visible
        getItem(tree, 'p')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await settle(tree);

        simulateDrop(tree, 'c2', 'c1', 'before');
        await settle(tree);

        const parent = tree.getItemTree()[0];
        const childIds = (parent['nodes'] as RichTreeItem[]).map(c => c['id']);
        expect(childIds).toEqual(['c2', 'c1']);
    });
});

// ─── focusin on non-tree-item ─────────────────────────────────────────────────

describe('FlintRichTreeView — focusin on non-tree-item', () => {
    it('focusin from a div (non-tree-item) in shadow DOM does not throw', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS}></flint-rich-tree-view>
        `);
        await settle(tree);

        const root = tree.shadowRoot!.querySelector('.tree-root')!;
        expect(() => {
            root.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        }).not.toThrow();
    });
});

// ─── getItemOrderedChildrenIds with empty/leaf items ──────────────────────────

describe('FlintRichTreeView — getItemOrderedChildrenIds edge cases', () => {
    it('returns empty array for item with no children array', async () => {
        const items: RichTreeItem[] = [
            { id: 'leaf', label: 'Leaf' }, // no children property at all
        ];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items}></flint-rich-tree-view>
        `);
        await settle(tree);

        expect(tree.getItemOrderedChildrenIds('leaf')).toEqual([]);
    });
});
// ─── Controlled mode collapse ─────────────────────────────────────────────────

describe('FlintRichTreeView — controlled mode collapse', () => {
    it('controlled collapse fires onExpandedItemsChange without the collapsed item', async () => {
        const handler = vi.fn();
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view
                .items=${BASIC_ITEMS}
                .expandedItems=${['1']}
                .onExpandedItemsChange=${handler}
            ></flint-rich-tree-view>
        `);
        await settle(tree);

        // Item '1' is currently expanded; clicking expand button collapses it
        const item1 = getItem(tree, '1')!;
        expect(item1.expanded).toBe(true);

        item1.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith([]); // '1' removed
    });
});

// ─── _isAncestorOf: recursive path (ancestor NOT at root level) ───────────────

describe('FlintRichTreeView — _isAncestorOf recursive path', () => {
    it('prevents dragging a nested parent into its own child (non-root ancestor)', async () => {
        // root → parent → child  (parent is NOT at root level)
        const items: RichTreeItem[] = [
            {
                id: 'root', label: 'Root', children: [
                    {
                        id: 'parent', label: 'Parent', children: [
                            { id: 'child', label: 'Child' },
                        ],
                    },
                ],
            },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);

        // Expand both to make all items visible
        getItem(tree, 'root')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await settle(tree);
        getItem(tree, 'parent')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await settle(tree);

        const before = JSON.stringify(tree.getItemTree());
        // Try to drag 'parent' into 'child' — _isAncestorOf must recurse through 'root' children
        simulateDrop(tree, 'parent', 'child', 'inside');
        await settle(tree);

        // Structure unchanged — parent cannot be dropped into child
        expect(JSON.stringify(tree.getItemTree())).toBe(before);
    });
});

// =============================================================================
// ─── Mutation-killing additions ───────────────────────────────────────────────
// =============================================================================

// ─── Drop position: before / inside thresholds ───────────────────────────────

describe('FlintRichTreeView — dragover position thresholds (before / inside)', () => {
    let tree: FlintRichTreeView;

    beforeEach(async () => {
        tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);
    });

    it('clientY in top 25% of item → drop-position="before"', async () => {
        const fromEl = getItem(tree, 'a')!;
        const toEl = getItem(tree, 'c')!;
        const height = 40;
        const top = 200;
        toEl.getBoundingClientRect = () => ({
            top, bottom: top + height, height, left: 0, right: 200, width: 200,
            x: 0, y: top, toJSON: () => ({})
        } as DOMRect);

        fromEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true, dataTransfer: new DataTransfer() }));
        // top + 6 = 15% of height → below 25% threshold → 'before'
        toEl.dispatchEvent(new DragEvent('dragover', {
            bubbles: true, composed: true, dataTransfer: new DataTransfer(),
            clientY: top + 6,
        }));
        await settle(tree);

        expect(toEl.getAttribute('drop-position')).toBe('before');
    });

    it('clientY in middle of item → drop-position="inside"', async () => {
        const fromEl = getItem(tree, 'a')!;
        const toEl = getItem(tree, 'c')!;
        const height = 40;
        const top = 200;
        toEl.getBoundingClientRect = () => ({
            top, bottom: top + height, height, left: 0, right: 200, width: 200,
            x: 0, y: top, toJSON: () => ({})
        } as DOMRect);

        fromEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true, dataTransfer: new DataTransfer() }));
        // top + 20 = 50% → between 25% and 75% → 'inside'
        toEl.dispatchEvent(new DragEvent('dragover', {
            bubbles: true, composed: true, dataTransfer: new DataTransfer(),
            clientY: top + 20,
        }));
        await settle(tree);

        expect(toEl.getAttribute('drop-position')).toBe('inside');
    });

    it('clientY exactly at 25% boundary → drop-position="inside" (not before)', async () => {
        const fromEl = getItem(tree, 'a')!;
        const toEl = getItem(tree, 'c')!;
        const height = 40;
        const top = 200;
        toEl.getBoundingClientRect = () => ({
            top, bottom: top + height, height, left: 0, right: 200, width: 200,
            x: 0, y: top, toJSON: () => ({})
        } as DOMRect);

        fromEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true, dataTransfer: new DataTransfer() }));
        // top + 10 = exactly 25% → NOT < 0.25 → 'inside'
        toEl.dispatchEvent(new DragEvent('dragover', {
            bubbles: true, composed: true, dataTransfer: new DataTransfer(),
            clientY: top + 10,
        }));
        await settle(tree);

        expect(toEl.getAttribute('drop-position')).toBe('inside');
    });

    it('clientY exactly at 75% boundary → drop-position="inside" (not after)', async () => {
        const fromEl = getItem(tree, 'a')!;
        const toEl = getItem(tree, 'c')!;
        const height = 40;
        const top = 200;
        toEl.getBoundingClientRect = () => ({
            top, bottom: top + height, height, left: 0, right: 200, width: 200,
            x: 0, y: top, toJSON: () => ({})
        } as DOMRect);

        fromEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true, dataTransfer: new DataTransfer() }));
        // top + 30 = exactly 75% → NOT > 0.75 → 'inside'
        toEl.dispatchEvent(new DragEvent('dragover', {
            bubbles: true, composed: true, dataTransfer: new DataTransfer(),
            clientY: top + 30,
        }));
        await settle(tree);

        expect(toEl.getAttribute('drop-position')).toBe('inside');
    });
});

// ─── Exact newIndex in flint-tree-view-item-position-change ───────────────────────────────────

describe('FlintRichTreeView — flint-tree-view-item-position-change exact newIndex', () => {
    it('reports newIndex=2 when moving "a" after "c" (last slot)', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);
        const handler = vi.fn();
        tree.addEventListener('flint-tree-view-item-position-change', handler);

        simulateDrop(tree, 'a', 'c', 'after');
        await settle(tree);

        // [a,b,c] → remove a → [b,c] → insert after c at index 2
        expect(handler.mock.calls[0][0].detail.newIndex).toBe(2);
    });

    it('reports newIndex=0 when moving "c" before "a"', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);
        const handler = vi.fn();
        tree.addEventListener('flint-tree-view-item-position-change', handler);

        simulateDrop(tree, 'c', 'a', 'before');
        await settle(tree);

        // [a,b,c] → remove c → [a,b] → insert before a at index 0
        expect(handler.mock.calls[0][0].detail.newIndex).toBe(0);
    });

    it('reports newIndex=1 when moving "a" after "b"', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);
        const handler = vi.fn();
        tree.addEventListener('flint-tree-view-item-position-change', handler);

        simulateDrop(tree, 'a', 'b', 'after');
        await settle(tree);

        // [a,b,c] → remove a → [b,c] → insert after b (now at 0) at index 1
        expect(handler.mock.calls[0][0].detail.newIndex).toBe(1);
    });

    it('reports newIndex=0 when dropping inside an empty parent', async () => {
        const items: RichTreeItem[] = [
            { id: 'folder', label: 'Folder', children: [] },
            { id: 'file', label: 'File' },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);
        const handler = vi.fn();
        tree.addEventListener('flint-tree-view-item-position-change', handler);

        simulateDrop(tree, 'file', 'folder', 'inside');
        await settle(tree);

        // File becomes the first (and only) child → index 0
        expect(handler.mock.calls[0][0].detail.newParentId).toBe('folder');
        expect(handler.mock.calls[0][0].detail.newIndex).toBe(0);
    });
});

// ─── knownHasChildren: children.length > 0 boundary ─────────────────────────

describe('FlintRichTreeView — knownHasChildren without dataSource', () => {
    it('empty children array → has-children attribute is absent (no expand icon)', async () => {
        const items: RichTreeItem[] = [
            { id: 'empty', label: 'Empty', children: [] },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items}></flint-rich-tree-view>
        `);
        await settle(tree);

        expect(getItem(tree, 'empty')!.hasAttribute('has-children')).toBe(false);
    });

    it('non-empty children array → has-children attribute is present', async () => {
        const items: RichTreeItem[] = [
            { id: 'parent', label: 'Parent', children: [{ id: 'c', label: 'Child' }] },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items}></flint-rich-tree-view>
        `);
        await settle(tree);

        expect(getItem(tree, 'parent')!.hasAttribute('has-children')).toBe(true);
    });

    it('item with no children property → has-children is absent', async () => {
        const items: RichTreeItem[] = [{ id: 'leaf', label: 'Leaf' }];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items}></flint-rich-tree-view>
        `);
        await settle(tree);

        expect(getItem(tree, 'leaf')!.hasAttribute('has-children')).toBe(false);
    });
});

// ─── getChildrenCount boundary: 0 vs non-zero (including -1) ─────────────────

describe('FlintRichTreeView — dataSource getChildrenCount boundary', () => {
    it('getChildrenCount=0 → item has no expand indicator (has-children absent)', async () => {
        const items: RichTreeItem[] = [{ id: 'leaf', label: 'Leaf' }];
        const ds = {
            getTreeItems: async () => [] as RichTreeItem[],
            getChildrenCount: () => 0,
        };
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items} .dataSource=${ds}></flint-rich-tree-view>
        `);
        await settle(tree);

        expect(getItem(tree, 'leaf')!.hasAttribute('has-children')).toBe(false);
    });

    it('getChildrenCount=1 → item has expand indicator (has-children present)', async () => {
        const items: RichTreeItem[] = [{ id: 'parent', label: 'Parent' }];
        const ds = {
            getTreeItems: async (id: string | null) => id ? [{ id: 'child', label: 'Child' }] : items,
            getChildrenCount: () => 1,
        };
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items} .dataSource=${ds}></flint-rich-tree-view>
        `);
        await settle(tree);

        expect(getItem(tree, 'parent')!.hasAttribute('has-children')).toBe(true);
    });

    it('getChildrenCount=-1 (unknown) → item has expand indicator', async () => {
        const items: RichTreeItem[] = [{ id: 'parent', label: 'Parent' }];
        const ds = {
            getTreeItems: async () => [] as RichTreeItem[],
            getChildrenCount: () => -1,
        };
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items} .dataSource=${ds}></flint-rich-tree-view>
        `);
        await settle(tree);

        expect(getItem(tree, 'parent')!.hasAttribute('has-children')).toBe(true);
    });
});

// ─── Character navigation: startIdx = idx + 1 (not idx) ──────────────────────

describe('FlintRichTreeView — first-char navigation startIdx wrapping', () => {
    it('char nav from focused item finds the NEXT match, not the current one', async () => {
        // Two items starting with 'a'; focus on first → pressing 'a' should go to second
        const items: RichTreeItem[] = [
            { id: 'a1', label: 'Apple' },
            { id: 'a2', label: 'Apricot' },
            { id: 'b', label: 'Banana' },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items}></flint-rich-tree-view>
        `);
        await settle(tree);

        const item1 = getItem(tree, 'a1')!;
        item1.focus();
        item1.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
        await tree.updateComplete;

        // Should advance to 'a2', NOT stay on 'a1'
        expect(tree.shadowRoot!.activeElement).toBe(getItem(tree, 'a2'));
    });

    it('char nav wraps from last matching item back to first matching item', async () => {
        const items: RichTreeItem[] = [
            { id: 'a1', label: 'Apple' },
            { id: 'b', label: 'Banana' },
            { id: 'a2', label: 'Avocado' },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items}></flint-rich-tree-view>
        `);
        await settle(tree);

        const itemA2 = getItem(tree, 'a2')!;
        itemA2.setAttribute('tabindex', '0');
        getItem(tree, 'a1')!.setAttribute('tabindex', '-1');
        itemA2.focus();
        itemA2.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
        await tree.updateComplete;

        // 'a2' is last 'a' item → wraps to 'a1'
        expect(tree.shadowRoot!.activeElement).toBe(getItem(tree, 'a1'));
    });

    it('char nav: pressing char when focused item is not in focusable list (idx=-1) starts from index 0', async () => {
        const items: RichTreeItem[] = [
            { id: 'x', label: 'Xray' },
            { id: 'z', label: 'Zebra' },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items}></flint-rich-tree-view>
        `);
        await settle(tree);

        // Disable 'x' so it's not in focusable list → idx will be -1 when 'x' dispatches keydown
        tree.isItemDisabled = (i) => i['id'] === 'x';
        await settle(tree);

        const itemX = getItem(tree, 'x')!;
        itemX.focus();
        itemX.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', bubbles: true }));
        await tree.updateComplete;

        expect(tree.shadowRoot!.activeElement).toBe(getItem(tree, 'z'));
    });
});

// ─── _initRovingTabindex: don't reset if tabindex=0 already exists ────────────

describe('FlintRichTreeView — _initRovingTabindex hasFocusable guard', () => {
    it('does not reset tabindex when an item already has tabindex=0 after disabledItemsFocusable change', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS}></flint-rich-tree-view>
        `);
        await settle(tree);

        // Manually move focus to 'b'
        getItem(tree, 'a')!.setAttribute('tabindex', '-1');
        getItem(tree, 'b')!.setAttribute('tabindex', '0');

        // Trigger _initRovingTabindex by changing disabledItemsFocusable
        tree.disabledItemsFocusable = true;
        await settle(tree);

        // 'b' already had tabindex=0 → should remain
        expect(getItem(tree, 'b')!.getAttribute('tabindex')).toBe('0');
        expect(getItem(tree, 'a')!.getAttribute('tabindex')).not.toBe('0');
    });

    it('sets tabindex=0 on first non-disabled item when none has it yet', async () => {
        const items: RichTreeItem[] = [
            { id: '1', label: 'Alpha' },
            { id: '2', label: 'Beta' },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${items}></flint-rich-tree-view>
        `);
        await settle(tree);

        // Both items should have been initialized; first gets tabindex=0
        expect(getItem(tree, '1')!.getAttribute('tabindex')).toBe('0');
        expect(getItem(tree, '2')!.getAttribute('tabindex')).toBe('-1');
    });

    it('when disabledItemsFocusable=false, skips disabled items for initial tabindex=0', async () => {
        const items: RichTreeItem[] = [
            { id: 'disabled', label: 'Disabled' },
            { id: 'enabled', label: 'Enabled' },
        ];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view
                .items=${items}
                .isItemDisabled=${(i: RichTreeItem) => i['id'] === 'disabled'}
            ></flint-rich-tree-view>
        `);
        await settle(tree);

        // First non-disabled item gets tabindex=0
        expect(getItem(tree, 'disabled')!.getAttribute('tabindex')).not.toBe('0');
        expect(getItem(tree, 'enabled')!.getAttribute('tabindex')).toBe('0');
    });
});

// ─── render(): items.length > 0 with dataSource uses items prop ───────────────

describe('FlintRichTreeView — render with dataSource and non-empty items', () => {
    it('renders from items prop (not lazy cache) when items is non-empty', async () => {
        const staticItems: RichTreeItem[] = [{ id: 'static', label: 'Static' }];
        const ds = {
            getTreeItems: async () => [{ id: 'lazy', label: 'Lazy' }],
            getChildrenCount: () => 0,
        };
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${staticItems} .dataSource=${ds}></flint-rich-tree-view>
        `);
        await settle(tree, 100);

        // items is non-empty → root comes from items, NOT the lazy cache
        expect(getItem(tree, 'static')).not.toBeNull();
        expect(getItem(tree, 'lazy')).toBeNull();
    });

    it('rootLoading indicator only shown when items is empty (not when items has content)', async () => {
        let resolve!: (v: RichTreeItem[]) => void;
        const pending = new Promise<RichTreeItem[]>(r => { resolve = r; });
        const ds = {
            getTreeItems: () => pending,
            getChildrenCount: () => 0,
        };

        // items is NON-empty → no root loading indicator even though dataSource is set
        const staticItems: RichTreeItem[] = [{ id: 's', label: 'S' }];
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${staticItems} .dataSource=${ds}></flint-rich-tree-view>
        `);
        await tree.updateComplete;
        await new Promise(r => setTimeout(r, 20));
        await tree.updateComplete;

        expect(tree.shadowRoot!.querySelector('.lazy-root')).toBeNull();
        resolve([]);
    });
});

// ─── _expansionInitialized: defaultExpandedItems not re-applied ───────────────

describe('FlintRichTreeView — _expansionInitialized prevents re-application', () => {
    it('changing items after collapse does not re-expand defaultExpandedItems', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view
                .items=${BASIC_ITEMS}
                .defaultExpandedItems=${['1']}
            ></flint-rich-tree-view>
        `);
        await settle(tree);
        expect(getItem(tree, '1')?.expanded).toBe(true);

        // Collapse item '1'
        getItem(tree, '1')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;
        expect(getItem(tree, '1')?.expanded).toBe(false);

        // Replace items → _expansionInitialized is true → should NOT re-expand '1'
        tree.items = [...BASIC_ITEMS];
        await settle(tree);

        expect(getItem(tree, '1')?.expanded).toBe(false);
    });

    it('defaultExpandedItems=[] does not expand anything on first render', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view
                .items=${BASIC_ITEMS}
                .defaultExpandedItems=${[] as string[]}
            ></flint-rich-tree-view>
        `);
        await settle(tree);

        getAllItems(tree).forEach(item => {
            expect(item.expanded).toBe(false);
        });
    });
});

// ─── flint-tree-view-item-click and flint-tree-view-expanded-items-change do NOT bubble ──────────────────────

describe('FlintRichTreeView — event bubbling (bubbles=false)', () => {
    it('flint-tree-view-item-click event does not bubble to parent container', async () => {
        const spy = vi.fn();
        const container = await fixture<HTMLDivElement>(html`
            <div @flint-tree-view-item-click=${spy}>
                <flint-rich-tree-view .items=${FLAT_ITEMS}></flint-rich-tree-view>
            </div>
        `);
        const tree = container.querySelector('flint-rich-tree-view') as FlintRichTreeView;
        await settle(tree);

        getItem(tree, 'a')!.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();

        expect(spy).not.toHaveBeenCalled();
    });

    it('flint-tree-view-expanded-items-change event does not bubble to parent container', async () => {
        const spy = vi.fn();
        const container = await fixture<HTMLDivElement>(html`
            <div @flint-tree-view-expanded-items-change=${spy}>
                <flint-rich-tree-view
                    .items=${BASIC_ITEMS}
                    .expandedItems=${[] as string[]}
                ></flint-rich-tree-view>
            </div>
        `);
        const tree = container.querySelector('flint-rich-tree-view') as FlintRichTreeView;
        await settle(tree);

        getItem(tree, '1')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(spy).not.toHaveBeenCalled();
    });

    it('flint-tree-view-item-click event is still dispatched on the tree host itself', async () => {
        const spy = vi.fn();
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS}></flint-rich-tree-view>
        `);
        await settle(tree);
        tree.addEventListener('flint-tree-view-item-click', spy);

        getItem(tree, 'b')!.shadowRoot!.querySelector<HTMLElement>('.item-row')!.click();

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ itemId: 'b' });
    });
});

// ─── _getEffectiveItems: both conditions of the guard ────────────────────────

describe('FlintRichTreeView — _getEffectiveItems reordering guard', () => {
    it('returns original items reference when reordering=false (even if _orderedItems were somehow set)', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS}></flint-rich-tree-view>
        `);
        await settle(tree);

        // No reordering → getItemTree() must return the original reference
        expect(tree.getItemTree()).toBe(FLAT_ITEMS);
    });

    it('returns _orderedItems after drag when reordering=true', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${FLAT_ITEMS} items-reordering></flint-rich-tree-view>
        `);
        await settle(tree);

        simulateDrop(tree, 'b', 'a', 'before');
        await settle(tree);

        const result = tree.getItemTree();
        expect(result).not.toBe(FLAT_ITEMS);
        expect(result.map((i: RichTreeItem) => i['id'])).toEqual(['b', 'a', 'c']);
    });
});

// ─── _isControlled: undefined vs defined expandedItems ───────────────────────

describe('FlintRichTreeView — _isControlled detection', () => {
    it('uncontrolled mode: expandedItems=undefined → changes persist after toggle', async () => {
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view .items=${BASIC_ITEMS}></flint-rich-tree-view>
        `);
        await settle(tree);

        // expandedItems not set → uncontrolled → expansion state IS kept internally
        getItem(tree, '1')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;
        expect(getItem(tree, '1')?.expanded).toBe(true);

        // Second toggle → collapses
        getItem(tree, '1')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;
        expect(getItem(tree, '1')?.expanded).toBe(false);
    });

    it('controlled mode: expandedItems=[] → toggle fires event but item reverts', async () => {
        const spy = vi.fn();
        const tree = await fixture<FlintRichTreeView>(html`
            <flint-rich-tree-view
                .items=${BASIC_ITEMS}
                .expandedItems=${[] as string[]}
            ></flint-rich-tree-view>
        `);
        await settle(tree);
        tree.addEventListener('flint-tree-view-expanded-items-change', spy);

        getItem(tree, '1')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        // Event fired but since parent doesn't update expandedItems, item reverts
        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail.expandedItems).toContain('1');
        expect(getItem(tree, '1')?.expanded).toBe(false);
    });
});
