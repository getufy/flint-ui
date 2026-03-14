import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-tree-item.js';
import './flint-simple-tree-view.js';
import '../button/flint-button';
import '../stack/flint-stack.js';
import type { FlintSimpleTreeView } from './flint-simple-tree-view.js';

const meta: Meta = {
    title: 'Tree View/Simple Tree View',
    component: 'flint-simple-tree-view',
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

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
    name: 'Default',
    render: () => html`
    <flint-simple-tree-view>
      <flint-tree-item item-id="1" label="Applications">
        <flint-tree-item item-id="1-1" label="Calendar" ></flint-tree-item>
        <flint-tree-item item-id="1-2" label="Chrome">
          <flint-tree-item item-id="1-2-1" label="History"></flint-tree-item>
          <flint-tree-item item-id="1-2-2" label="Extensions"></flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="1-3" label="Webstorm"></flint-tree-item>
      </flint-tree-item>
      <flint-tree-item item-id="2" label="Documents">
        <flint-tree-item item-id="2-1" label="OSS">
          <flint-tree-item item-id="2-1-1" label="Material UI"></flint-tree-item>
        </flint-tree-item>
      </flint-tree-item>
      <flint-tree-item item-id="3" label="Downloads">
        <flint-tree-item item-id="3-1" label="October"></flint-tree-item>
        <flint-tree-item item-id="3-2" label="November"></flint-tree-item>
      </flint-tree-item>
      <flint-tree-item item-id="4" label="Movies"></flint-tree-item>
      <flint-tree-item item-id="5" label="Music">
        <flint-tree-item item-id="5-1" label="Blues">
          <flint-tree-item item-id="5-1-1" label="B.B. King"></flint-tree-item>
          <flint-tree-item item-id="5-1-2" label="Muddy Waters"></flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="5-2" label="Classic Rock">
          <flint-tree-item item-id="5-2-1" label="Pink Floyd"></flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="5-3" label="Jazz">
          <flint-tree-item item-id="5-3-1" label="Miles Davis"></flint-tree-item>
        </flint-tree-item>
      </flint-tree-item>
    </flint-simple-tree-view>
  `,
};

// ─── Disabled Items ───────────────────────────────────────────────────────────

export const DisabledItems: Story = {
    name: 'Disabled items',
    render: () => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      The "Grid" and "Pickers" items are disabled and cannot be clicked or expanded.
    </p>
    <flint-simple-tree-view>
      <flint-tree-item item-id="1" label="Core">
        <flint-tree-item item-id="1-1" label="Box"></flint-tree-item>
        <flint-tree-item item-id="1-2" label="Stack"></flint-tree-item>
        <flint-tree-item item-id="1-3" label="Grid" disabled></flint-tree-item>
      </flint-tree-item>
      <flint-tree-item item-id="2" label="Inputs">
        <flint-tree-item item-id="2-1" label="Button"></flint-tree-item>
        <flint-tree-item item-id="2-2" label="Checkbox"></flint-tree-item>
        <flint-tree-item item-id="2-3" label="Switch"></flint-tree-item>
      </flint-tree-item>
      <flint-tree-item item-id="3" label="Pickers" disabled>
        <flint-tree-item item-id="3-1" label="Date Picker"></flint-tree-item>
        <flint-tree-item item-id="3-2" label="Time Picker"></flint-tree-item>
      </flint-tree-item>
    </flint-simple-tree-view>
  `,
};

// ─── Focusable Disabled Items ─────────────────────────────────────────────────

export const FocusableDisabledItems: Story = {
    name: 'Focusable disabled items',
    render: (args) => {
        const toggle = (e: Event) => {
            const checked = (e.target as HTMLInputElement).checked;
            const tree = document.getElementById('focusable-tree') as FlintSimpleTreeView | null;
            if (tree) tree.disabledItemsFocusable = checked;
        };

        return html`
      <flint-stack direction="row" alignItems="center" gap="8px" style="margin-bottom:16px;font-size:14px;font-family:system-ui,sans-serif;">
        <label>
          <input type="checkbox" @change=${toggle} .checked=${args['disabledItemsFocusable'] as boolean} />
          disabledItemsFocusable
        </label>
      </flint-stack>
      <flint-simple-tree-view id="focusable-tree" ?disabled-items-focusable=${args['disabledItemsFocusable']}>
        <flint-tree-item item-id="1" label="Alpha"></flint-tree-item>
        <flint-tree-item item-id="2" label="Beta" disabled></flint-tree-item>
        <flint-tree-item item-id="3" label="Gamma">
          <flint-tree-item item-id="3-1" label="Delta" disabled></flint-tree-item>
          <flint-tree-item item-id="3-2" label="Epsilon"></flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="4" label="Zeta" disabled></flint-tree-item>
      </flint-simple-tree-view>
    `;
    },
    args: {
        disabledItemsFocusable: false,
    },
};

// ─── Track Item Clicks ────────────────────────────────────────────────────────

export const TrackItemClicks: Story = {
    name: 'Track item clicks',
    render: () => {
        const handleClick = (itemId: string) => {
            const output = document.getElementById('click-output');
            if (output) output.textContent = `Last clicked: "${itemId}"`;
        };

        return html`
      <flint-simple-tree-view .onItemClick=${handleClick}>
        <flint-tree-item item-id="pear" label="Pear">
          <flint-tree-item item-id="pear-1" label="Anjou"></flint-tree-item>
          <flint-tree-item item-id="pear-2" label="Bosc"></flint-tree-item>
          <flint-tree-item item-id="pear-3" label="Concorde"></flint-tree-item>
          <flint-tree-item item-id="pear-4" label="Seckel" disabled></flint-tree-item>
          <flint-tree-item item-id="pear-5" label="Stella"></flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="apple" label="Apple">
          <flint-tree-item item-id="apple-1" label="Fuji"></flint-tree-item>
          <flint-tree-item item-id="apple-2" label="Gala"></flint-tree-item>
          <flint-tree-item item-id="apple-3" label="Honeycrisp"></flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="banana" label="Banana"></flint-tree-item>
        <flint-tree-item item-id="grape" label="Grape">
          <flint-tree-item item-id="grape-1" label="Cabernet Sauvignon"></flint-tree-item>
          <flint-tree-item item-id="grape-2" label="Chardonnay"></flint-tree-item>
          <flint-tree-item item-id="grape-3" label="Pinot Noir"></flint-tree-item>
        </flint-tree-item>
      </flint-simple-tree-view>
      <p id="click-output" style="margin-top:16px;font-size:14px;font-family:system-ui,sans-serif;color:#555;">
        Click an item above...
      </p>
    `;
    },
};

// ─── Get Item DOM Element ─────────────────────────────────────────────────────

export const GetItemDOMElement: Story = {
    name: 'Get item DOM element',
    render: () => {
        const highlight = () => {
            const tree = document.getElementById('api-tree') as FlintSimpleTreeView | null;
            const input = document.getElementById('id-input') as HTMLInputElement | null;
            const output = document.getElementById('api-output');
            if (!tree || !input || !output) return;

            const id = input.value.trim();
            const el = tree.getItemDOMElement(id);

            // Remove previous highlight
            tree.querySelectorAll('flint-tree-item').forEach(item => {
                (item as HTMLElement).style.outline = '';
            });

            if (el) {
                el.style.outline = '2px solid #3b82f6';
                output.textContent = `Found: <flint-tree-item item-id="${id}"> at DOM element`;
                el.scrollIntoView({ block: 'nearest' });
            } else {
                output.textContent = `No item found with itemId="${id}"`;
            }
        };

        return html`
      <flint-stack direction="row" gap="8px" alignItems="center" style="margin-bottom:16px;font-size:14px;font-family:system-ui,sans-serif;">
        <input
          id="id-input"
          type="text"
          placeholder='Enter itemId (e.g. "node-2")'
          style="padding:6px 10px;border:1px solid #d1d5db;border-radius:4px;font-size:14px;width:220px;"
        />
        <flint-button @click=${highlight}>getItemDOMElement()</flint-button>
      </flint-stack>

      <flint-simple-tree-view id="api-tree">
        <flint-tree-item item-id="node-1" label="Node 1">
          <flint-tree-item item-id="node-1-1" label="Node 1.1"></flint-tree-item>
          <flint-tree-item item-id="node-1-2" label="Node 1.2">
            <flint-tree-item item-id="node-1-2-1" label="Node 1.2.1"></flint-tree-item>
          </flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="node-2" label="Node 2">
          <flint-tree-item item-id="node-2-1" label="Node 2.1"></flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="node-3" label="Node 3"></flint-tree-item>
      </flint-simple-tree-view>

      <p id="api-output" style="margin-top:16px;font-size:14px;font-family:system-ui,sans-serif;color:#555;">
        Enter an itemId above and click the button...
      </p>
    `;
    },
};

// ─── Default Expanded Items ───────────────────────────────────────────────────

export const DefaultExpandedItems: Story = {
    name: 'Default expanded items',
    render: () => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      "Applications" and "Music" are expanded on mount via <code>defaultExpandedItems</code>.
      The component manages expansion internally from there.
    </p>
    <flint-simple-tree-view .defaultExpandedItems=${['1', '5']}>
      <flint-tree-item item-id="1" label="Applications">
        <flint-tree-item item-id="1-1" label="Calendar"></flint-tree-item>
        <flint-tree-item item-id="1-2" label="Chrome">
          <flint-tree-item item-id="1-2-1" label="History"></flint-tree-item>
          <flint-tree-item item-id="1-2-2" label="Extensions"></flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="1-3" label="Webstorm"></flint-tree-item>
      </flint-tree-item>
      <flint-tree-item item-id="2" label="Documents">
        <flint-tree-item item-id="2-1" label="OSS">
          <flint-tree-item item-id="2-1-1" label="Material UI"></flint-tree-item>
        </flint-tree-item>
      </flint-tree-item>
      <flint-tree-item item-id="3" label="Downloads">
        <flint-tree-item item-id="3-1" label="October"></flint-tree-item>
        <flint-tree-item item-id="3-2" label="November"></flint-tree-item>
      </flint-tree-item>
      <flint-tree-item item-id="4" label="Movies"></flint-tree-item>
      <flint-tree-item item-id="5" label="Music">
        <flint-tree-item item-id="5-1" label="Blues">
          <flint-tree-item item-id="5-1-1" label="B.B. King"></flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="5-2" label="Jazz">
          <flint-tree-item item-id="5-2-1" label="Miles Davis"></flint-tree-item>
        </flint-tree-item>
      </flint-tree-item>
    </flint-simple-tree-view>
  `,
};

// ─── Controlled Expansion ─────────────────────────────────────────────────────

export const ControlledExpansion: Story = {
    name: 'Controlled expansion',
    render: () => {
        // Controlled state lives outside the component
        let expandedItems: string[] = ['1'];

        const syncOutput = () => {
            const out = document.getElementById('controlled-output');
            if (out) out.textContent = JSON.stringify(expandedItems);
        };

        const onExpandedItemsChange = (ids: string[]) => {
            expandedItems = ids;
            const tree = document.getElementById('controlled-tree') as FlintSimpleTreeView | null;
            if (tree) tree.expandedItems = expandedItems;
            syncOutput();
        };

        const expandAll = () => {
            const tree = document.getElementById('controlled-tree') as FlintSimpleTreeView | null;
            if (!tree) return;
            // Collect IDs of all items that have at least one flint-tree-item child
            expandedItems = Array.from(tree.querySelectorAll('flint-tree-item'))
                .filter(el => Array.from(el.children).some(c => c.tagName === 'FLINT-TREE-ITEM'))
                .map(el => (el as import('./flint-tree-item.js').FlintTreeItem).itemId);
            tree.expandedItems = expandedItems;
            syncOutput();
        };

        const collapseAll = () => {
            expandedItems = [];
            const tree = document.getElementById('controlled-tree') as FlintSimpleTreeView | null;
            if (tree) tree.expandedItems = expandedItems;
            syncOutput();
        };

        return html`
      <flint-stack direction="row" gap="8px" style="margin-bottom:12px;">
        <flint-button @click=${expandAll}>Expand all</flint-button>
        <flint-button @click=${collapseAll}>Collapse all</flint-button>
      </flint-stack>

      <flint-simple-tree-view
        id="controlled-tree"
        .expandedItems=${expandedItems}
        .onExpandedItemsChange=${onExpandedItemsChange}
      >
        <flint-tree-item item-id="1" label="Applications">
          <flint-tree-item item-id="1-1" label="Calendar"></flint-tree-item>
          <flint-tree-item item-id="1-2" label="Chrome">
            <flint-tree-item item-id="1-2-1" label="History"></flint-tree-item>
            <flint-tree-item item-id="1-2-2" label="Extensions"></flint-tree-item>
          </flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="2" label="Documents">
          <flint-tree-item item-id="2-1" label="OSS"></flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="3" label="Downloads">
          <flint-tree-item item-id="3-1" label="October"></flint-tree-item>
          <flint-tree-item item-id="3-2" label="November"></flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="4" label="Movies"></flint-tree-item>
        <flint-tree-item item-id="5" label="Music">
          <flint-tree-item item-id="5-1" label="Blues">
            <flint-tree-item item-id="5-1-1" label="B.B. King"></flint-tree-item>
          </flint-tree-item>
          <flint-tree-item item-id="5-2" label="Jazz"></flint-tree-item>
        </flint-tree-item>
      </flint-simple-tree-view>

      <p style="margin-top:12px;font-size:13px;font-family:monospace;color:#374151;">
        expandedItems: <span id="controlled-output">${JSON.stringify(expandedItems)}</span>
      </p>
    `;
    },
};

// ─── Expansion Trigger — Icon Container ───────────────────────────────────────

export const ExpansionTriggerIconContainer: Story = {
    name: 'Limit expansion to icon container',
    render: () => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      With <code>expansion-trigger="iconContainer"</code>, only clicking the
      arrow icon expands or collapses the item. Clicking the label text only
      activates the item (fires <code>onItemClick</code>).
    </p>
    <flint-simple-tree-view
      expansion-trigger="iconContainer"
      .onItemClick=${(id: string) => {
            const out = document.getElementById('trigger-output');
            if (out) out.textContent = `Last clicked: "${id}"`;
        }}
    >
      <flint-tree-item item-id="1" label="Applications">
        <flint-tree-item item-id="1-1" label="Calendar"></flint-tree-item>
        <flint-tree-item item-id="1-2" label="Chrome">
          <flint-tree-item item-id="1-2-1" label="History"></flint-tree-item>
          <flint-tree-item item-id="1-2-2" label="Extensions"></flint-tree-item>
        </flint-tree-item>
        <flint-tree-item item-id="1-3" label="Webstorm"></flint-tree-item>
      </flint-tree-item>
      <flint-tree-item item-id="2" label="Documents">
        <flint-tree-item item-id="2-1" label="Private"></flint-tree-item>
        <flint-tree-item item-id="2-2" label="OSS"></flint-tree-item>
      </flint-tree-item>
      <flint-tree-item item-id="3" label="Movies"></flint-tree-item>
    </flint-simple-tree-view>

    <p id="trigger-output" style="margin-top:16px;font-size:14px;font-family:system-ui,sans-serif;color:#555;">
      Click an item label (not the arrow) above...
    </p>
  `,
};
