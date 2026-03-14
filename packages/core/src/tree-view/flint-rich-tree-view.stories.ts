import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-rich-tree-view.js';
import '../button/flint-button';
import '../stack/flint-stack.js';
import type { FlintRichTreeView, RichTreeItem } from './flint-rich-tree-view.js';

const meta: Meta = {
    title: 'Tree View/Rich Tree View - Items',
    component: 'flint-rich-tree-view',
    argTypes: {
        disabledItemsFocusable: {
            control: 'boolean',
            description: 'Whether disabled items can receive keyboard focus',
        },
        expansionTrigger: {
            control: 'select',
            options: ['content', 'iconContainer'],
            description: 'What triggers item expand/collapse',
        },
        onItemClick: { action: 'onItemClick' },
        onExpandedItemsChange: { action: 'onExpandedItemsChange' },
    },
    args: {
        disabledItemsFocusable: false,
        expansionTrigger: 'content',
    },
};

export default meta;
type Story = StoryObj;

// ─── Sample data (defined outside component scope to keep stable references) ──

const FILESYSTEM_ITEMS: RichTreeItem[] = [
    {
        id: '1', label: 'Applications', children: [
            { id: '1-1', label: 'Calendar' },
            {
                id: '1-2', label: 'Chrome', children: [
                    { id: '1-2-1', label: 'History' },
                    { id: '1-2-2', label: 'Extensions' },
                ],
            },
            { id: '1-3', label: 'Webstorm' },
        ],
    },
    {
        id: '2', label: 'Documents', children: [
            {
                id: '2-1', label: 'OSS', children: [
                    { id: '2-1-1', label: 'Material UI' },
                ],
            },
        ],
    },
    {
        id: '3', label: 'Downloads', children: [
            { id: '3-1', label: 'October' },
            { id: '3-2', label: 'November' },
        ],
    },
    { id: '4', label: 'Movies' },
    {
        id: '5', label: 'Music', children: [
            {
                id: '5-1', label: 'Blues', children: [
                    { id: '5-1-1', label: 'B.B. King' },
                    { id: '5-1-2', label: 'Muddy Waters' },
                ],
            },
            {
                id: '5-2', label: 'Classic Rock', children: [
                    { id: '5-2-1', label: 'Pink Floyd' },
                ],
            },
            {
                id: '5-3', label: 'Jazz', children: [
                    { id: '5-3-1', label: 'Miles Davis' },
                ],
            },
        ],
    },
];

const MUI_ITEMS: RichTreeItem[] = [
    {
        id: 'core', label: 'Core', children: [
            { id: 'core-box', label: 'Box' },
            { id: 'core-stack', label: 'Stack' },
            { id: 'core-grid', label: 'Grid' },
        ],
    },
    {
        id: 'inputs', label: 'Inputs', children: [
            { id: 'inputs-btn', label: 'Button' },
            { id: 'inputs-cb', label: 'Checkbox' },
            { id: 'inputs-switch', label: 'Switch' },
        ],
    },
    {
        id: 'pickers', label: 'Pickers', children: [
            { id: 'pickers-date', label: 'Date Picker' },
            { id: 'pickers-time', label: 'Time Picker' },
        ],
    },
];

// ─── Basic Usage ──────────────────────────────────────────────────────────────

export const BasicUsage: Story = {
    name: 'Basic usage',
    render: () => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      Pass an <code>items</code> array. By default, <code>flint-rich-tree-view</code>
      reads <code>id</code>, <code>label</code>, and <code>children</code> from each object.
    </p>
    <flint-rich-tree-view .items=${FILESYSTEM_ITEMS}></flint-rich-tree-view>
  `,
};

// ─── Custom getItemId ─────────────────────────────────────────────────────────

const ITEMS_WITH_INTERNAL_ID: RichTreeItem[] = [
    {
        internalId: 'app', label: 'Applications', children: [
            { internalId: 'app-cal', label: 'Calendar' },
            { internalId: 'app-chrome', label: 'Chrome' },
        ],
    },
    {
        internalId: 'docs', label: 'Documents', children: [
            { internalId: 'docs-oss', label: 'OSS' },
        ],
    },
    { internalId: 'movies', label: 'Movies' },
];

export const CustomItemId: Story = {
    name: 'Custom item ID (getItemId)',
    render: () => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      Items use <code>internalId</code> instead of <code>id</code>.
      Use <code>getItemId</code> to tell the tree where the identifier lives.
    </p>
    <flint-rich-tree-view
      .items=${ITEMS_WITH_INTERNAL_ID}
      .getItemId=${(item: RichTreeItem) => item['internalId'] as string}
    ></flint-rich-tree-view>
  `,
};

// ─── Custom getItemLabel ──────────────────────────────────────────────────────

const ITEMS_WITH_NAME: RichTreeItem[] = [
    {
        id: '1', name: 'Applications', children: [
            { id: '1-1', name: 'Calendar' },
            { id: '1-2', name: 'Chrome' },
        ],
    },
    { id: '2', name: 'Documents' },
    { id: '3', name: 'Movies' },
];

export const CustomItemLabel: Story = {
    name: 'Custom item label (getItemLabel)',
    render: () => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      Items use a <code>name</code> property for display text.
      Use <code>getItemLabel</code> to point the tree to the right property.
    </p>
    <flint-rich-tree-view
      .items=${ITEMS_WITH_NAME}
      .getItemLabel=${(item: RichTreeItem) => item['name'] as string}
    ></flint-rich-tree-view>
  `,
};

// ─── Custom getItemChildren ───────────────────────────────────────────────────

const ITEMS_WITH_NODES: RichTreeItem[] = [
    {
        id: '1', label: 'Applications', nodes: [
            { id: '1-1', label: 'Calendar' },
            {
                id: '1-2', label: 'Chrome', nodes: [
                    { id: '1-2-1', label: 'History' },
                ],
            },
        ],
    },
    {
        id: '2', label: 'Documents', nodes: [
            { id: '2-1', label: 'OSS' },
        ],
    },
    { id: '3', label: 'Movies' },
];

export const CustomItemChildren: Story = {
    name: 'Custom item children (getItemChildren)',
    render: () => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      Items use <code>nodes</code> instead of <code>children</code>.
      Use <code>getItemChildren</code> to tell the tree where nested items are.
    </p>
    <flint-rich-tree-view
      .items=${ITEMS_WITH_NODES}
      .getItemChildren=${(item: RichTreeItem) => item['nodes'] as RichTreeItem[] | undefined}
    ></flint-rich-tree-view>
  `,
};

// ─── Disabled Items ───────────────────────────────────────────────────────────

const DISABLED_IDS = new Set(['core-grid', 'pickers']);

export const DisabledItems: Story = {
    name: 'Disabled items (isItemDisabled)',
    render: () => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      Use <code>isItemDisabled</code> to disable individual items.
      "Grid" and "Pickers" are disabled and cannot be clicked or expanded.
    </p>
    <flint-rich-tree-view
      .items=${MUI_ITEMS}
      .isItemDisabled=${(item: RichTreeItem) => DISABLED_IDS.has(item['id'] as string)}
    ></flint-rich-tree-view>
  `,
};

// ─── Focus Disabled Items ─────────────────────────────────────────────────────

export const FocusableDisabledItems: Story = {
    name: 'Focus disabled items',
    render: (args) => {
        const toggle = (e: Event) => {
            const checked = (e.target as HTMLInputElement).checked;
            const tree = document.getElementById('rich-focusable-tree') as FlintRichTreeView | null;
            if (tree) tree.disabledItemsFocusable = checked;
        };

        return html`
      <flint-stack direction="row" alignItems="center" gap="8px" style="margin-bottom:16px;font-size:14px;font-family:system-ui,sans-serif;">
        <label>
          <input type="checkbox" @change=${toggle} .checked=${args['disabledItemsFocusable'] as boolean} />
          disabledItemsFocusable
        </label>
      </flint-stack>
      <flint-rich-tree-view
        id="rich-focusable-tree"
        ?disabled-items-focusable=${args['disabledItemsFocusable']}
        .items=${MUI_ITEMS}
        .isItemDisabled=${(item: RichTreeItem) => DISABLED_IDS.has(item['id'] as string)}
      ></flint-rich-tree-view>
    `;
    },
    args: {
        disabledItemsFocusable: false,
    },
};

// ─── Track Item Clicks ────────────────────────────────────────────────────────

export const TrackItemClicks: Story = {
    name: 'Track item clicks (onItemClick)',
    render: () => {
        const handleClick = (itemId: string) => {
            const output = document.getElementById('rich-click-output');
            if (output) output.textContent = `Last clicked: "${itemId}"`;
        };

        return html`
      <flint-rich-tree-view .items=${FILESYSTEM_ITEMS} .onItemClick=${handleClick}></flint-rich-tree-view>
      <p id="rich-click-output" style="margin-top:16px;font-size:14px;font-family:system-ui,sans-serif;color:#555;">
        Click an item above...
      </p>
    `;
    },
};

// ─── getItem() API ────────────────────────────────────────────────────────────

export const GetItemById: Story = {
    name: 'Get item by ID (getItem)',
    render: () => {
        const lookup = () => {
            const tree = document.getElementById('rich-get-item-tree') as FlintRichTreeView | null;
            const input = document.getElementById('rich-get-item-input') as HTMLInputElement | null;
            const output = document.getElementById('rich-get-item-output');
            if (!tree || !input || !output) return;

            const id = input.value.trim();
            const item = tree.getItem(id);
            output.textContent = item
                ? JSON.stringify(item, null, 2)
                : `No item found with id="${id}"`;
        };

        return html`
      <flint-stack direction="row" gap="8px" alignItems="center" style="margin-bottom:16px;font-size:14px;font-family:system-ui,sans-serif;">
        <input
          id="rich-get-item-input"
          type="text"
          placeholder='Enter item id (e.g. "5-1")'
          style="padding:6px 10px;border:1px solid #d1d5db;border-radius:4px;font-size:14px;width:220px;"
        />
        <flint-button @click=${lookup}>getItem()</flint-button>
      </flint-stack>
      <flint-rich-tree-view id="rich-get-item-tree" .items=${FILESYSTEM_ITEMS}></flint-rich-tree-view>
      <pre id="rich-get-item-output" style="margin-top:16px;font-size:13px;font-family:monospace;color:#374151;">
        Enter an id above and click the button...
      </pre>
    `;
    },
};

// ─── getItemDOMElement() API ──────────────────────────────────────────────────

export const GetItemDOMElement: Story = {
    name: 'Get item DOM element (getItemDOMElement)',
    render: () => {
        const highlight = () => {
            const tree = document.getElementById('rich-dom-tree') as FlintRichTreeView | null;
            const input = document.getElementById('rich-dom-input') as HTMLInputElement | null;
            const output = document.getElementById('rich-dom-output');
            if (!tree || !input || !output) return;

            const id = input.value.trim();
            // Clear previous highlights (items are in shadow DOM)
            tree.shadowRoot?.querySelectorAll('flint-tree-item').forEach(item => {
                (item as HTMLElement).style.outline = '';
            });

            const el = tree.getItemDOMElement(id);
            if (el) {
                el.style.outline = '2px solid #3b82f6';
                output.textContent = `Found: <flint-tree-item item-id="${id}">`;
                el.scrollIntoView({ block: 'nearest' });
            } else {
                output.textContent = `No item found with id="${id}"`;
            }
        };

        return html`
      <flint-stack direction="row" gap="8px" alignItems="center" style="margin-bottom:16px;font-size:14px;font-family:system-ui,sans-serif;">
        <input
          id="rich-dom-input"
          type="text"
          placeholder='Enter item id (e.g. "2-1")'
          style="padding:6px 10px;border:1px solid #d1d5db;border-radius:4px;font-size:14px;width:220px;"
        />
        <flint-button @click=${highlight}>getItemDOMElement()</flint-button>
      </flint-stack>
      <flint-rich-tree-view id="rich-dom-tree" .items=${FILESYSTEM_ITEMS}></flint-rich-tree-view>
      <p id="rich-dom-output" style="margin-top:16px;font-size:14px;font-family:system-ui,sans-serif;color:#555;">
        Enter an id above and click the button...
      </p>
    `;
    },
};

// ─── getItemTree() API ────────────────────────────────────────────────────────

export const GetItemTree: Story = {
    name: 'Get item tree (getItemTree)',
    render: () => {
        const showTree = () => {
            const tree = document.getElementById('rich-tree-api') as FlintRichTreeView | null;
            const output = document.getElementById('rich-tree-output');
            if (!tree || !output) return;
            output.textContent = JSON.stringify(tree.getItemTree(), null, 2);
        };

        return html`
      <flint-button @click=${showTree} style="margin-bottom:16px;">getItemTree()</flint-button>
      <flint-rich-tree-view id="rich-tree-api" .items=${MUI_ITEMS}></flint-rich-tree-view>
      <pre id="rich-tree-output" style="margin-top:16px;font-size:13px;font-family:monospace;color:#374151;max-height:200px;overflow:auto;">
        Click the button to inspect the item tree...
      </pre>
    `;
    },
};

// ─── setIsItemDisabled() API ──────────────────────────────────────────────────

export const ImperativelyDisableItem: Story = {
    name: 'Imperatively disable item (setIsItemDisabled)',
    render: () => {
        const apply = () => {
            const tree = document.getElementById('rich-disable-tree') as FlintRichTreeView | null;
            const input = document.getElementById('rich-disable-input') as HTMLInputElement | null;
            const checkbox = document.getElementById('rich-disable-checkbox') as HTMLInputElement | null;
            if (!tree || !input || !checkbox) return;
            const id = input.value.trim();
            if (!id) return;
            tree.setIsItemDisabled(id, checkbox.checked);
        };

        return html`
      <flint-stack direction="row" gap="8px" alignItems="center" style="flex-wrap:wrap;margin-bottom:16px;font-size:14px;font-family:system-ui,sans-serif;">
        <input
          id="rich-disable-input"
          type="text"
          placeholder='Item id (e.g. "inputs-btn")'
          style="padding:6px 10px;border:1px solid #d1d5db;border-radius:4px;font-size:14px;width:200px;"
        />
        <label style="display:flex;align-items:center;gap:4px;">
          <input id="rich-disable-checkbox" type="checkbox" checked />
          disabled
        </label>
        <flint-button @click=${apply}>setIsItemDisabled()</flint-button>
      </flint-stack>
      <flint-rich-tree-view id="rich-disable-tree" .items=${MUI_ITEMS}></flint-rich-tree-view>
    `;
    },
};

// ─── Controlled Expansion ─────────────────────────────────────────────────────

export const ControlledExpansion: Story = {
    name: 'Controlled expansion',
    render: () => {
        let expandedItems: string[] = ['1'];

        const syncOutput = () => {
            const out = document.getElementById('rich-controlled-output');
            if (out) out.textContent = JSON.stringify(expandedItems);
        };

        const onExpandedItemsChange = (ids: string[]) => {
            expandedItems = ids;
            const tree = document.getElementById('rich-controlled-tree') as FlintRichTreeView | null;
            if (tree) tree.expandedItems = expandedItems;
            syncOutput();
        };

        const expandAll = () => {
            const tree = document.getElementById('rich-controlled-tree') as FlintRichTreeView | null;
            if (!tree) return;
            // Collect IDs of all items that have at least one child, using the
            // component's own accessors so custom getItemId/getItemChildren are respected
            const collectExpandable = (items: RichTreeItem[]): string[] =>
                items.flatMap(item => {
                    const children = tree.getItemChildren(item) ?? [];
                    return children.length > 0
                        ? [tree.getItemId(item), ...collectExpandable(children)]
                        : [];
                });
            expandedItems = collectExpandable(tree.getItemTree());
            tree.expandedItems = expandedItems;
            syncOutput();
        };

        const collapseAll = () => {
            expandedItems = [];
            const tree = document.getElementById('rich-controlled-tree') as FlintRichTreeView | null;
            if (tree) tree.expandedItems = expandedItems;
            syncOutput();
        };

        return html`
      <flint-stack direction="row" gap="8px" style="margin-bottom:12px;">
        <flint-button @click=${expandAll}>Expand all</flint-button>
        <flint-button @click=${collapseAll}>Collapse all</flint-button>
      </flint-stack>
      <flint-rich-tree-view
        id="rich-controlled-tree"
        .items=${FILESYSTEM_ITEMS}
        .expandedItems=${expandedItems}
        .onExpandedItemsChange=${onExpandedItemsChange}
      ></flint-rich-tree-view>
      <p style="margin-top:12px;font-size:13px;font-family:monospace;color:#374151;">
        expandedItems: <span id="rich-controlled-output">${JSON.stringify(expandedItems)}</span>
      </p>
    `;
    },
};
