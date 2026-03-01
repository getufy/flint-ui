import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-tree-item.js';
import './ui-rich-tree-view.js';
import type { UiTreeItem } from './ui-tree-item.js';
import type { UiRichTreeView, RichTreeItem } from './ui-rich-tree-view.js';

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
function getItem(tree: UiRichTreeView, id: string): UiTreeItem | null {
    return tree.shadowRoot!.querySelector(`ui-tree-item[item-id="${id}"]`) as UiTreeItem | null;
}

function getAllItems(tree: UiRichTreeView): UiTreeItem[] {
    return Array.from(tree.shadowRoot!.querySelectorAll('ui-tree-item')) as UiTreeItem[];
}

async function settle(tree: UiRichTreeView, ms = 20) {
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

describe('UiRichTreeView — basic rendering', () => {
    let tree: UiRichTreeView;

    beforeEach(async () => {
        tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${BASIC_ITEMS}></ui-rich-tree-view>
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

describe('UiRichTreeView — custom property accessors', () => {
    it('getItemId maps a custom id field', async () => {
        const items: RichTreeItem[] = [
            { internalId: 'foo', label: 'Foo', children: [{ internalId: 'bar', label: 'Bar' }] },
        ];
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view
        .items=${items}
        .getItemId=${(item: RichTreeItem) => item['internalId'] as string}
      ></ui-rich-tree-view>
    `);
        await settle(tree);

        expect(getItem(tree, 'foo')).not.toBeNull();
        expect(getItem(tree, 'bar')).not.toBeNull();
    });

    it('getItemLabel maps a custom label field', async () => {
        const items: RichTreeItem[] = [{ id: '1', name: 'Custom Name' }];
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view
        .items=${items}
        .getItemLabel=${(item: RichTreeItem) => item['name'] as string}
      ></ui-rich-tree-view>
    `);
        await settle(tree);

        const domItem = getItem(tree, '1');
        expect(domItem?.label).toBe('Custom Name');
    });

    it('getItemChildren maps a custom children field', async () => {
        const items: RichTreeItem[] = [
            { id: '1', label: 'Parent', nodes: [{ id: '1-1', label: 'Child', nodes: [] }] },
        ];
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view
        .items=${items}
        .getItemChildren=${(item: RichTreeItem) => item['nodes'] as RichTreeItem[] | undefined}
      ></ui-rich-tree-view>
    `);
        await settle(tree);

        expect(getItem(tree, '1-1')).not.toBeNull();
    });
});

// ─── isItemDisabled ───────────────────────────────────────────────────────────

describe('UiRichTreeView — isItemDisabled', () => {
    it('marks items as disabled when isItemDisabled returns true', async () => {
        const items: RichTreeItem[] = [
            { id: '1', label: 'Enabled' },
            { id: '2', label: 'Disabled' },
        ];
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view
        .items=${items}
        .isItemDisabled=${(item: RichTreeItem) => item['id'] === '2'}
      ></ui-rich-tree-view>
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
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view
        .items=${items}
        .isItemDisabled=${(item: RichTreeItem) => item['id'] === '2'}
      ></ui-rich-tree-view>
    `);
        await settle(tree);

        expect(getItem(tree, '2')?.getAttribute('tabindex')).toBe('-1');
    });
});

// ─── Public API: getItem ──────────────────────────────────────────────────────

describe('UiRichTreeView — getItem()', () => {
    let tree: UiRichTreeView;

    beforeEach(async () => {
        tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${BASIC_ITEMS}></ui-rich-tree-view>
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

describe('UiRichTreeView — getItemDOMElement()', () => {
    let tree: UiRichTreeView;

    beforeEach(async () => {
        tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${BASIC_ITEMS}></ui-rich-tree-view>
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

describe('UiRichTreeView — getItemTree()', () => {
    it('returns the items array', async () => {
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${BASIC_ITEMS}></ui-rich-tree-view>
    `);
        await settle(tree);
        expect(tree.getItemTree()).toBe(BASIC_ITEMS);
    });

    it('reflects updated items after assignment', async () => {
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${BASIC_ITEMS}></ui-rich-tree-view>
    `);
        await settle(tree);

        const newItems: RichTreeItem[] = [{ id: 'x', label: 'X' }];
        tree.items = newItems;
        await settle(tree);

        expect(tree.getItemTree()).toBe(newItems);
    });
});

// ─── Public API: setIsItemDisabled ────────────────────────────────────────────

describe('UiRichTreeView — setIsItemDisabled()', () => {
    let tree: UiRichTreeView;

    beforeEach(async () => {
        tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${FLAT_ITEMS}></ui-rich-tree-view>
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

describe('UiRichTreeView — onItemClick', () => {
    let tree: UiRichTreeView;

    beforeEach(async () => {
        tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${FLAT_ITEMS}></ui-rich-tree-view>
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

    it('dispatches item-click event on the host', async () => {
        const handler = vi.fn();
        tree.addEventListener('item-click', handler);

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

describe('UiRichTreeView — expansion (uncontrolled)', () => {
    it('defaultExpandedItems expands items on mount', async () => {
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view
        .items=${BASIC_ITEMS}
        .defaultExpandedItems=${['1', '2']}
      ></ui-rich-tree-view>
    `);
        await settle(tree);

        expect(getItem(tree, '1')?.expanded).toBe(true);
        expect(getItem(tree, '2')?.expanded).toBe(true);
        expect(getItem(tree, '3')?.expanded).toBe(false);
    });

    it('clicking expand button toggles expansion in uncontrolled mode', async () => {
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${BASIC_ITEMS}></ui-rich-tree-view>
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

describe('UiRichTreeView — expansion (controlled)', () => {
    it('expandedItems controls which items are expanded', async () => {
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${BASIC_ITEMS} .expandedItems=${['1']}></ui-rich-tree-view>
    `);
        await settle(tree);

        expect(getItem(tree, '1')?.expanded).toBe(true);
        expect(getItem(tree, '2')?.expanded).toBe(false);
    });

    it('changing expandedItems prop syncs to DOM items', async () => {
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${BASIC_ITEMS} .expandedItems=${[] as string[]}></ui-rich-tree-view>
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
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view
        .items=${BASIC_ITEMS}
        .expandedItems=${[] as string[]}
        .onExpandedItemsChange=${handler}
      ></ui-rich-tree-view>
    `);
        await settle(tree);

        getItem(tree, '1')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith(['1']);
    });

    it('dispatches expanded-items-change event', async () => {
        const handler = vi.fn();
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${BASIC_ITEMS} .expandedItems=${[] as string[]}></ui-rich-tree-view>
    `);
        await settle(tree);
        tree.addEventListener('expanded-items-change', handler);

        getItem(tree, '1')!.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail).toEqual({ expandedItems: ['1'] });
    });

    it('controlled mode reverts toggle when parent does not update expandedItems', async () => {
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${BASIC_ITEMS} .expandedItems=${[] as string[]}></ui-rich-tree-view>
    `);
        await settle(tree);

        const item1 = getItem(tree, '1')!;
        item1.shadowRoot!.querySelector<HTMLElement>('.expand-btn')!.click();
        await tree.updateComplete;

        expect(item1.expanded).toBe(false); // reverted
    });
});

// ─── Keyboard navigation ──────────────────────────────────────────────────────

describe('UiRichTreeView — keyboard navigation', () => {
    let tree: UiRichTreeView;

    beforeEach(async () => {
        tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${FLAT_ITEMS}></ui-rich-tree-view>
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

describe('UiRichTreeView — keyboard expansion', () => {
    let tree: UiRichTreeView;

    beforeEach(async () => {
        tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view .items=${BASIC_ITEMS}></ui-rich-tree-view>
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

describe('UiRichTreeView — disabledItemsFocusable', () => {
    it('true: disabled items included in roving tabindex', async () => {
        const items: RichTreeItem[] = [
            { id: '1', label: 'Alpha' },
            { id: '2', label: 'Beta' },
        ];
        const tree = await fixture<UiRichTreeView>(html`
      <ui-rich-tree-view
        .items=${items}
        .isItemDisabled=${(i: RichTreeItem) => i['id'] === '2'}
        disabled-items-focusable
      ></ui-rich-tree-view>
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
 * Events are dispatched on the `ui-tree-item` HOST elements (not their inner
 * shadow DOM rows) because jsdom does not populate `composedPath()` correctly
 * for events that cross shadow boundaries. The component's `_getTreeItemFromEvent`
 * has a matching fallback that reads `e.target` directly for this case.
 *
 * `getBoundingClientRect` is stubbed on the host element because that is the
 * element returned by `_getTreeItemFromEvent` and used in `_handleDragOver`.
 */
function simulateDrop(
    tree: UiRichTreeView,
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

    // Dispatch on the ui-tree-item HOST so e.target is the host element,
    // letting _getTreeItemFromEvent find it via the e.target fallback.
    fromEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true, dataTransfer: dt }));
    toEl.dispatchEvent(new DragEvent('dragover', { bubbles: true, composed: true, dataTransfer: dt, clientY }));
    toEl.dispatchEvent(new DragEvent('drop', { bubbles: true, composed: true, dataTransfer: dt, clientY }));
    fromEl.dispatchEvent(new DragEvent('dragend', { bubbles: true, composed: true }));
}

// ─── itemsReordering prop ─────────────────────────────────────────────────────

describe('UiRichTreeView — itemsReordering prop', () => {
    it('items are not draggable by default (itemsReordering=false)', async () => {
        const tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${FLAT_ITEMS}></ui-rich-tree-view>
        `);
        await settle(tree);

        const row = getItem(tree, 'a')!.shadowRoot!.querySelector<HTMLElement>('.item-row')!;
        expect(row.getAttribute('draggable')).not.toBe('true');
    });

    it('items are draggable when itemsReordering=true', async () => {
        const tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${FLAT_ITEMS} items-reordering></ui-rich-tree-view>
        `);
        await settle(tree);

        const row = getItem(tree, 'a')!.shadowRoot!.querySelector<HTMLElement>('.item-row')!;
        expect(row.getAttribute('draggable')).toBe('true');
    });

    it('getItemTree() returns original items when no reordering has occurred', async () => {
        const tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${FLAT_ITEMS} items-reordering></ui-rich-tree-view>
        `);
        await settle(tree);
        // Before any drag, should still be the original reference
        expect(tree.getItemTree()).toBe(FLAT_ITEMS);
    });
});

// ─── Basic reordering ─────────────────────────────────────────────────────────

describe('UiRichTreeView — basic reordering', () => {
    let tree: UiRichTreeView;

    beforeEach(async () => {
        tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${FLAT_ITEMS} items-reordering></ui-rich-tree-view>
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
        const innerTree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${items} items-reordering></ui-rich-tree-view>
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
        const innerTree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${items} items-reordering></ui-rich-tree-view>
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

// ─── item-position-change event ───────────────────────────────────────────────

describe('UiRichTreeView — item-position-change event', () => {
    let tree: UiRichTreeView;

    beforeEach(async () => {
        tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${FLAT_ITEMS} items-reordering></ui-rich-tree-view>
        `);
        await settle(tree);
    });

    it('fires item-position-change with correct itemId and newIndex', async () => {
        const handler = vi.fn();
        tree.addEventListener('item-position-change', handler);

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
        const innerTree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${items} items-reordering></ui-rich-tree-view>
        `);
        await settle(innerTree);

        const handler = vi.fn();
        innerTree.addEventListener('item-position-change', handler);

        simulateDrop(innerTree, 'file', 'folder', 'inside');
        await settle(innerTree);

        expect(handler.mock.calls[0][0].detail.newParentId).toBe('folder');
    });

    it('does not fire when drag is cancelled (dragend with no drop)', async () => {
        const handler = vi.fn();
        tree.addEventListener('item-position-change', handler);

        const fromEl = getItem(tree, 'a')!;
        fromEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true }));
        fromEl.dispatchEvent(new DragEvent('dragend', { bubbles: true, composed: true }));
        await settle(tree);

        expect(handler).not.toHaveBeenCalled();
    });
});

// ─── getItemOrderedChildrenIds ────────────────────────────────────────────────

describe('UiRichTreeView — getItemOrderedChildrenIds()', () => {
    let tree: UiRichTreeView;

    beforeEach(async () => {
        tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${BASIC_ITEMS} items-reordering></ui-rich-tree-view>
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

describe('UiRichTreeView — isItemReorderable', () => {
    it('non-reorderable items have draggable=false on their row', async () => {
        const tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view
                .items=${FLAT_ITEMS}
                items-reordering
                .isItemReorderable=${(id: string) => id !== 'b'}
            ></ui-rich-tree-view>
        `);
        await settle(tree);

        const rowA = getItem(tree, 'a')!.shadowRoot!.querySelector<HTMLElement>('.item-row')!;
        const rowB = getItem(tree, 'b')!.shadowRoot!.querySelector<HTMLElement>('.item-row')!;

        expect(rowA.getAttribute('draggable')).toBe('true');
        expect(rowB.getAttribute('draggable')).not.toBe('true');
    });

    it('dragging a non-reorderable item does not change the tree', async () => {
        const tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view
                .items=${FLAT_ITEMS}
                items-reordering
                .isItemReorderable=${(id: string) => id !== 'b'}
            ></ui-rich-tree-view>
        `);
        await settle(tree);

        const before = tree.getItemTree().map(i => i['id']);
        simulateDrop(tree, 'b', 'c', 'after');
        await settle(tree);

        expect(tree.getItemTree().map(i => i['id'])).toEqual(before);
    });
});

// ─── canMoveItemToNewPosition ─────────────────────────────────────────────────

describe('UiRichTreeView — canMoveItemToNewPosition', () => {
    it('blocks moves that fail the validator, leaving tree unchanged', async () => {
        // Only allow reordering within the same parent (root-only rule for simplicity)
        const canMove = vi.fn().mockReturnValue(false);

        const tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view
                .items=${FLAT_ITEMS}
                items-reordering
                .canMoveItemToNewPosition=${canMove}
            ></ui-rich-tree-view>
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

        const tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view
                .items=${FLAT_ITEMS}
                items-reordering
                .canMoveItemToNewPosition=${canMove}
            ></ui-rich-tree-view>
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

describe('UiRichTreeView — drop position visual state', () => {
    let tree: UiRichTreeView;

    beforeEach(async () => {
        tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${FLAT_ITEMS} items-reordering></ui-rich-tree-view>
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

describe('UiRichTreeView — itemsReorderingHandle', () => {
    it('shows drag handle icon when itemsReorderingHandle=true', async () => {
        const tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${FLAT_ITEMS} items-reordering items-reordering-handle></ui-rich-tree-view>
        `);
        await settle(tree);

        const handle = getItem(tree, 'a')!.shadowRoot!.querySelector('[data-drag-handle]');
        expect(handle).not.toBeNull();
    });

    it('does not show drag handle when itemsReorderingHandle=false', async () => {
        const tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${FLAT_ITEMS} items-reordering></ui-rich-tree-view>
        `);
        await settle(tree);

        const handle = getItem(tree, 'a')!.shadowRoot!.querySelector('[data-drag-handle]');
        expect(handle).toBeNull();
    });

    it('row is NOT draggable when handle mode is on (only handle is)', async () => {
        const tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${FLAT_ITEMS} items-reordering items-reordering-handle></ui-rich-tree-view>
        `);
        await settle(tree);

        const row = getItem(tree, 'a')!.shadowRoot!.querySelector<HTMLElement>('.item-row')!;
        const handle = getItem(tree, 'a')!.shadowRoot!.querySelector<HTMLElement>('[data-drag-handle]')!;

        expect(row.getAttribute('draggable')).not.toBe('true');
        expect(handle.getAttribute('draggable')).toBe('true');
    });
});

// ─── getItemTree() after reorder ──────────────────────────────────────────────

describe('UiRichTreeView — getItemTree() after reordering', () => {
    it('returns reordered clone, not original items reference', async () => {
        const tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${FLAT_ITEMS} items-reordering></ui-rich-tree-view>
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
        const tree = await fixture<UiRichTreeView>(html`
            <ui-rich-tree-view .items=${items} items-reordering></ui-rich-tree-view>
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