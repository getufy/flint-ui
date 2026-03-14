import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-rich-tree-view.js';
import '../button/flint-button';
import '../stack/flint-stack.js';
import type { FlintRichTreeView, RichTreeItem, RichTreeViewDataSource } from './flint-rich-tree-view.js';

const meta: Meta = {
    title: 'Tree View/Rich Tree View - Lazy loading',
    component: 'flint-rich-tree-view',
};

export default meta;
type Story = StoryObj;

// ─── Mock filesystem database ─────────────────────────────────────────────────
//
// Each entry includes a `childCount` field so `getChildrenCount()` can return
// the correct number without having to load the children first.

interface MockNode {
    label: string;
    childCount: number;
    childIds: string[];
}

const MOCK_DB: Record<string, MockNode> = {
    '1':     { label: 'Applications',  childCount: 3,  childIds: ['1-1', '1-2', '1-3'] },
    '1-1':   { label: 'Calendar',      childCount: 0,  childIds: [] },
    '1-2':   { label: 'Chrome',        childCount: 2,  childIds: ['1-2-1', '1-2-2'] },
    '1-2-1': { label: 'History',       childCount: 0,  childIds: [] },
    '1-2-2': { label: 'Extensions',    childCount: 0,  childIds: [] },
    '1-3':   { label: 'Webstorm',      childCount: 0,  childIds: [] },
    '2':     { label: 'Documents',     childCount: 1,  childIds: ['2-1'] },
    '2-1':   { label: 'OSS',           childCount: 1,  childIds: ['2-1-1'] },
    '2-1-1': { label: 'Material UI',   childCount: 0,  childIds: [] },
    '3':     { label: 'Downloads',     childCount: 2,  childIds: ['3-1', '3-2'] },
    '3-1':   { label: 'October',       childCount: 0,  childIds: [] },
    '3-2':   { label: 'November',      childCount: 0,  childIds: [] },
    '4':     { label: 'Movies',        childCount: 0,  childIds: [] },
    '5':     { label: 'Music',         childCount: 3,  childIds: ['5-1', '5-2', '5-3'] },
    '5-1':   { label: 'Blues',         childCount: 2,  childIds: ['5-1-1', '5-1-2'] },
    '5-1-1': { label: 'B.B. King',     childCount: 0,  childIds: [] },
    '5-1-2': { label: 'Muddy Waters',  childCount: 0,  childIds: [] },
    '5-2':   { label: 'Classic Rock',  childCount: 1,  childIds: ['5-2-1'] },
    '5-2-1': { label: 'Pink Floyd',    childCount: 0,  childIds: [] },
    '5-3':   { label: 'Jazz',          childCount: 1,  childIds: ['5-3-1'] },
    '5-3-1': { label: 'Miles Davis',   childCount: 0,  childIds: [] },
};

const ROOT_IDS = ['1', '2', '3', '4', '5'];

/** Simulate a network fetch: resolves after `delay` ms with the requested items. */
async function mockFetch(ids: string[], delay: number): Promise<RichTreeItem[]> {
    await new Promise<void>(r => setTimeout(r, delay));
    return ids.map(id => ({
        id,
        label: MOCK_DB[id].label,
        childCount: MOCK_DB[id].childCount,
    }));
}

/** Build a `RichTreeViewDataSource` backed by the mock database at a given latency. */
function createDataSource(delay: number): RichTreeViewDataSource {
    return {
        getTreeItems: (parentId) => {
            const ids = parentId === null ? ROOT_IDS : (MOCK_DB[parentId]?.childIds ?? []);
            return mockFetch(ids, delay);
        },
        // Each item carries a `childCount` field — return it directly.
        getChildrenCount: (item) => (item['childCount'] as number) ?? 0,
    };
}

// ─── Root items prepopulated (children lazy-loaded) ──────────────────────────

/**
 * The root items are supplied upfront via the `items` prop.
 * Each root item carries a `childCount` so the tree shows an expand arrow
 * before the children are fetched. Children are loaded on first expand.
 */
const INITIAL_ROOT_ITEMS: RichTreeItem[] = ROOT_IDS.map(id => ({
    id,
    label: MOCK_DB[id].label,
    childCount: MOCK_DB[id].childCount,
}));

export const BasicLazyLoading: Story = {
    name: 'Basic usage',
    render: () => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      Root items are provided upfront via <code>items</code>. Children are fetched
      from the server the first time each node is expanded (800 ms simulated delay).
      The <code>getChildrenCount</code> method lets the tree show the expand arrow
      before children are loaded.
    </p>
    <flint-rich-tree-view
      .items=${INITIAL_ROOT_ITEMS}
      .dataSource=${createDataSource(800)}
    ></flint-rich-tree-view>
  `,
};

// ─── Fully lazy root ──────────────────────────────────────────────────────────

export const LazyRoot: Story = {
    name: 'Empty initial items (lazy root)',
    render: () => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      When <code>items</code> is an empty array and <code>dataSource</code> is set,
      <code>getTreeItems(null)</code> is called on first render to fetch the root
      level from the server. Expand any node to lazily load its children.
    </p>
    <flint-rich-tree-view
      .items=${[] as RichTreeItem[]}
      .dataSource=${createDataSource(1000)}
    ></flint-rich-tree-view>
  `,
};

// ─── Unknown children count (-1) ─────────────────────────────────────────────

/**
 * Some APIs don't return a child count in the parent payload. Return -1 from
 * `getChildrenCount` to tell the tree "this item has children, count unknown".
 * The expand arrow is still shown; after the first expand the real count is known.
 */
const UNKNOWN_COUNT_SOURCE: RichTreeViewDataSource = {
    getTreeItems: (parentId) => {
        const ids = parentId === null ? ROOT_IDS : (MOCK_DB[parentId]?.childIds ?? []);
        // Items do NOT carry childCount — the count is unknown until loaded
        return mockFetch(ids, 700).then(items =>
            items.map(({ id, label }) => ({ id, label }))
        );
    },
    // -1 means "has children but count unknown" → always shows the expand arrow
    getChildrenCount: () => -1,
};

export const UnknownChildrenCount: Story = {
    name: 'Unknown children count (getChildrenCount → -1)',
    render: () => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      When the child count is not available in the API response,
      return <code>-1</code> from <code>getChildrenCount</code>. The tree will
      always show the expand arrow. After expanding, if the server returns an
      empty array the arrow disappears.
    </p>
    <flint-rich-tree-view
      .items=${[] as RichTreeItem[]}
      .dataSource=${UNKNOWN_COUNT_SOURCE}
    ></flint-rich-tree-view>
  `,
};

// ─── Adjustable latency ───────────────────────────────────────────────────────

export const AdjustableLatency: Story = {
    name: 'Adjustable request latency',
    render: () => {
        let latency = 800;

        const rebuild = () => {
            const tree = document.getElementById('lazy-latency-tree') as FlintRichTreeView | null;
            const output = document.getElementById('lazy-latency-value');
            if (!tree) return;
            // Assigning a new dataSource clears the lazy cache and re-fetches
            tree.dataSource = createDataSource(latency);
            tree.items = []; // reset to fully lazy so root reloads too
            if (output) output.textContent = `${latency} ms`;
        };

        const onSlider = (e: Event) => {
            latency = Number((e.target as HTMLInputElement).value);
            const output = document.getElementById('lazy-latency-value');
            if (output) output.textContent = `${latency} ms`;
        };

        const onSliderEnd = () => rebuild();

        return html`
      <flint-stack direction="row" alignItems="center" gap="12px" style="margin-bottom:16px;font-family:system-ui,sans-serif;font-size:14px;">
        <label style="display:flex;align-items:center;gap:8px;flex:1;max-width:360px;">
          <span style="white-space:nowrap;">Response latency</span>
          <input
            type="range"
            min="0"
            max="3000"
            step="100"
            .value=${String(latency)}
            style="flex:1;"
            @input=${onSlider}
            @change=${onSliderEnd}
          />
          <span
            id="lazy-latency-value"
            style="min-width:52px;text-align:right;font-variant-numeric:tabular-nums;"
          >${latency} ms</span>
        </label>
        <flint-button @click=${rebuild} style="font-size:13px;">Reload tree</flint-button>
      </flint-stack>

      <p style="font-size:13px;color:#6b7280;margin-bottom:12px;">
        Move the slider and click <strong>Reload tree</strong> to apply a new
        latency. The lazy cache is cleared so every node re-fetches its children.
      </p>

      <flint-rich-tree-view
        id="lazy-latency-tree"
        .items=${[] as RichTreeItem[]}
        .dataSource=${createDataSource(latency)}
      ></flint-rich-tree-view>
    `;
    },
};

// ─── Lazy loading with controlled expansion ───────────────────────────────────

export const LazyWithControlledExpansion: Story = {
    name: 'Lazy loading + controlled expansion',
    render: () => {
        let expandedItems: string[] = [];

        const syncOutput = () => {
            const out = document.getElementById('lazy-controlled-output');
            if (out) out.textContent = JSON.stringify(expandedItems);
        };

        const onExpandedItemsChange = (ids: string[]) => {
            expandedItems = ids;
            const tree = document.getElementById('lazy-controlled-tree') as FlintRichTreeView | null;
            if (tree) tree.expandedItems = expandedItems;
            syncOutput();
        };

        return html`
      <p style="font-size:14px;color:#555;margin-bottom:12px;">
        Lazy loading works alongside controlled expansion.
        Children are fetched when a node is expanded for the first time;
        the parent controls which nodes stay open.
      </p>
      <flint-rich-tree-view
        id="lazy-controlled-tree"
        .items=${INITIAL_ROOT_ITEMS}
        .dataSource=${createDataSource(600)}
        .expandedItems=${expandedItems}
        .onExpandedItemsChange=${onExpandedItemsChange}
      ></flint-rich-tree-view>
      <p style="margin-top:12px;font-size:13px;font-family:monospace;color:#374151;">
        expandedItems: <span id="lazy-controlled-output">[]</span>
      </p>
    `;
    },
};
