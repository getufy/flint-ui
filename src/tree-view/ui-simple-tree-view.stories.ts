import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-tree-item.js';
import './ui-simple-tree-view.js';
import type { UiSimpleTreeView } from './ui-simple-tree-view.js';

const meta: Meta = {
    title: 'Tree View/Simple Tree View',
    component: 'ui-simple-tree-view',
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
    <ui-simple-tree-view>
      <ui-tree-item item-id="1" label="Applications">
        <ui-tree-item item-id="1-1" label="Calendar" ></ui-tree-item>
        <ui-tree-item item-id="1-2" label="Chrome">
          <ui-tree-item item-id="1-2-1" label="History"></ui-tree-item>
          <ui-tree-item item-id="1-2-2" label="Extensions"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="1-3" label="Webstorm"></ui-tree-item>
      </ui-tree-item>
      <ui-tree-item item-id="2" label="Documents">
        <ui-tree-item item-id="2-1" label="OSS">
          <ui-tree-item item-id="2-1-1" label="Material UI"></ui-tree-item>
        </ui-tree-item>
      </ui-tree-item>
      <ui-tree-item item-id="3" label="Downloads">
        <ui-tree-item item-id="3-1" label="October"></ui-tree-item>
        <ui-tree-item item-id="3-2" label="November"></ui-tree-item>
      </ui-tree-item>
      <ui-tree-item item-id="4" label="Movies"></ui-tree-item>
      <ui-tree-item item-id="5" label="Music">
        <ui-tree-item item-id="5-1" label="Blues">
          <ui-tree-item item-id="5-1-1" label="B.B. King"></ui-tree-item>
          <ui-tree-item item-id="5-1-2" label="Muddy Waters"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="5-2" label="Classic Rock">
          <ui-tree-item item-id="5-2-1" label="Pink Floyd"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="5-3" label="Jazz">
          <ui-tree-item item-id="5-3-1" label="Miles Davis"></ui-tree-item>
        </ui-tree-item>
      </ui-tree-item>
    </ui-simple-tree-view>
  `,
};

// ─── Disabled Items ───────────────────────────────────────────────────────────

export const DisabledItems: Story = {
    name: 'Disabled items',
    render: () => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      The "Grid" and "Pickers" items are disabled and cannot be clicked or expanded.
    </p>
    <ui-simple-tree-view>
      <ui-tree-item item-id="1" label="Core">
        <ui-tree-item item-id="1-1" label="Box"></ui-tree-item>
        <ui-tree-item item-id="1-2" label="Stack"></ui-tree-item>
        <ui-tree-item item-id="1-3" label="Grid" disabled></ui-tree-item>
      </ui-tree-item>
      <ui-tree-item item-id="2" label="Inputs">
        <ui-tree-item item-id="2-1" label="Button"></ui-tree-item>
        <ui-tree-item item-id="2-2" label="Checkbox"></ui-tree-item>
        <ui-tree-item item-id="2-3" label="Switch"></ui-tree-item>
      </ui-tree-item>
      <ui-tree-item item-id="3" label="Pickers" disabled>
        <ui-tree-item item-id="3-1" label="Date Picker"></ui-tree-item>
        <ui-tree-item item-id="3-2" label="Time Picker"></ui-tree-item>
      </ui-tree-item>
    </ui-simple-tree-view>
  `,
};

// ─── Focusable Disabled Items ─────────────────────────────────────────────────

export const FocusableDisabledItems: Story = {
    name: 'Focusable disabled items',
    render: (args) => {
        const toggle = (e: Event) => {
            const checked = (e.target as HTMLInputElement).checked;
            const tree = document.getElementById('focusable-tree') as UiSimpleTreeView | null;
            if (tree) tree.disabledItemsFocusable = checked;
        };

        return html`
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;font-size:14px;font-family:system-ui,sans-serif;">
        <label>
          <input type="checkbox" @change=${toggle} .checked=${args['disabledItemsFocusable'] as boolean} />
          disabledItemsFocusable
        </label>
      </div>
      <ui-simple-tree-view id="focusable-tree" ?disabled-items-focusable=${args['disabledItemsFocusable']}>
        <ui-tree-item item-id="1" label="Alpha"></ui-tree-item>
        <ui-tree-item item-id="2" label="Beta" disabled></ui-tree-item>
        <ui-tree-item item-id="3" label="Gamma">
          <ui-tree-item item-id="3-1" label="Delta" disabled></ui-tree-item>
          <ui-tree-item item-id="3-2" label="Epsilon"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="4" label="Zeta" disabled></ui-tree-item>
      </ui-simple-tree-view>
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
      <ui-simple-tree-view .onItemClick=${handleClick}>
        <ui-tree-item item-id="pear" label="Pear">
          <ui-tree-item item-id="pear-1" label="Anjou"></ui-tree-item>
          <ui-tree-item item-id="pear-2" label="Bosc"></ui-tree-item>
          <ui-tree-item item-id="pear-3" label="Concorde"></ui-tree-item>
          <ui-tree-item item-id="pear-4" label="Seckel" disabled></ui-tree-item>
          <ui-tree-item item-id="pear-5" label="Stella"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="apple" label="Apple">
          <ui-tree-item item-id="apple-1" label="Fuji"></ui-tree-item>
          <ui-tree-item item-id="apple-2" label="Gala"></ui-tree-item>
          <ui-tree-item item-id="apple-3" label="Honeycrisp"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="banana" label="Banana"></ui-tree-item>
        <ui-tree-item item-id="grape" label="Grape">
          <ui-tree-item item-id="grape-1" label="Cabernet Sauvignon"></ui-tree-item>
          <ui-tree-item item-id="grape-2" label="Chardonnay"></ui-tree-item>
          <ui-tree-item item-id="grape-3" label="Pinot Noir"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>
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
            const tree = document.getElementById('api-tree') as UiSimpleTreeView | null;
            const input = document.getElementById('id-input') as HTMLInputElement | null;
            const output = document.getElementById('api-output');
            if (!tree || !input || !output) return;

            const id = input.value.trim();
            const el = tree.getItemDOMElement(id);

            // Remove previous highlight
            tree.querySelectorAll('ui-tree-item').forEach(item => {
                (item as HTMLElement).style.outline = '';
            });

            if (el) {
                el.style.outline = '2px solid #3b82f6';
                output.textContent = `Found: <ui-tree-item item-id="${id}"> at DOM element`;
                el.scrollIntoView({ block: 'nearest' });
            } else {
                output.textContent = `No item found with itemId="${id}"`;
            }
        };

        return html`
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:16px;font-size:14px;font-family:system-ui,sans-serif;">
        <input
          id="id-input"
          type="text"
          placeholder='Enter itemId (e.g. "node-2")'
          style="padding:6px 10px;border:1px solid #d1d5db;border-radius:4px;font-size:14px;width:220px;"
        />
        <button
          @click=${highlight}
          style="padding:6px 14px;border-radius:4px;background:#3b82f6;color:white;border:none;cursor:pointer;font-size:14px;"
        >
          getItemDOMElement()
        </button>
      </div>

      <ui-simple-tree-view id="api-tree">
        <ui-tree-item item-id="node-1" label="Node 1">
          <ui-tree-item item-id="node-1-1" label="Node 1.1"></ui-tree-item>
          <ui-tree-item item-id="node-1-2" label="Node 1.2">
            <ui-tree-item item-id="node-1-2-1" label="Node 1.2.1"></ui-tree-item>
          </ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="node-2" label="Node 2">
          <ui-tree-item item-id="node-2-1" label="Node 2.1"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="node-3" label="Node 3"></ui-tree-item>
      </ui-simple-tree-view>

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
    <ui-simple-tree-view .defaultExpandedItems=${['1', '5']}>
      <ui-tree-item item-id="1" label="Applications">
        <ui-tree-item item-id="1-1" label="Calendar"></ui-tree-item>
        <ui-tree-item item-id="1-2" label="Chrome">
          <ui-tree-item item-id="1-2-1" label="History"></ui-tree-item>
          <ui-tree-item item-id="1-2-2" label="Extensions"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="1-3" label="Webstorm"></ui-tree-item>
      </ui-tree-item>
      <ui-tree-item item-id="2" label="Documents">
        <ui-tree-item item-id="2-1" label="OSS">
          <ui-tree-item item-id="2-1-1" label="Material UI"></ui-tree-item>
        </ui-tree-item>
      </ui-tree-item>
      <ui-tree-item item-id="3" label="Downloads">
        <ui-tree-item item-id="3-1" label="October"></ui-tree-item>
        <ui-tree-item item-id="3-2" label="November"></ui-tree-item>
      </ui-tree-item>
      <ui-tree-item item-id="4" label="Movies"></ui-tree-item>
      <ui-tree-item item-id="5" label="Music">
        <ui-tree-item item-id="5-1" label="Blues">
          <ui-tree-item item-id="5-1-1" label="B.B. King"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="5-2" label="Jazz">
          <ui-tree-item item-id="5-2-1" label="Miles Davis"></ui-tree-item>
        </ui-tree-item>
      </ui-tree-item>
    </ui-simple-tree-view>
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
            const tree = document.getElementById('controlled-tree') as UiSimpleTreeView | null;
            if (tree) tree.expandedItems = expandedItems;
            syncOutput();
        };

        const expandAll = () => {
            const tree = document.getElementById('controlled-tree') as UiSimpleTreeView | null;
            if (!tree) return;
            // Collect IDs of all items that have at least one ui-tree-item child
            expandedItems = Array.from(tree.querySelectorAll('ui-tree-item'))
                .filter(el => Array.from(el.children).some(c => c.tagName === 'UI-TREE-ITEM'))
                .map(el => (el as import('./ui-tree-item.js').UiTreeItem).itemId);
            tree.expandedItems = expandedItems;
            syncOutput();
        };

        const collapseAll = () => {
            expandedItems = [];
            const tree = document.getElementById('controlled-tree') as UiSimpleTreeView | null;
            if (tree) tree.expandedItems = expandedItems;
            syncOutput();
        };

        return html`
      <div style="display:flex;gap:8px;margin-bottom:12px;">
        <button
          @click=${expandAll}
          style="padding:6px 14px;border-radius:4px;background:#3b82f6;color:white;border:none;cursor:pointer;font-size:14px;"
        >Expand all</button>
        <button
          @click=${collapseAll}
          style="padding:6px 14px;border-radius:4px;background:#6b7280;color:white;border:none;cursor:pointer;font-size:14px;"
        >Collapse all</button>
      </div>

      <ui-simple-tree-view
        id="controlled-tree"
        .expandedItems=${expandedItems}
        .onExpandedItemsChange=${onExpandedItemsChange}
      >
        <ui-tree-item item-id="1" label="Applications">
          <ui-tree-item item-id="1-1" label="Calendar"></ui-tree-item>
          <ui-tree-item item-id="1-2" label="Chrome">
            <ui-tree-item item-id="1-2-1" label="History"></ui-tree-item>
            <ui-tree-item item-id="1-2-2" label="Extensions"></ui-tree-item>
          </ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="2" label="Documents">
          <ui-tree-item item-id="2-1" label="OSS"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="3" label="Downloads">
          <ui-tree-item item-id="3-1" label="October"></ui-tree-item>
          <ui-tree-item item-id="3-2" label="November"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="4" label="Movies"></ui-tree-item>
        <ui-tree-item item-id="5" label="Music">
          <ui-tree-item item-id="5-1" label="Blues">
            <ui-tree-item item-id="5-1-1" label="B.B. King"></ui-tree-item>
          </ui-tree-item>
          <ui-tree-item item-id="5-2" label="Jazz"></ui-tree-item>
        </ui-tree-item>
      </ui-simple-tree-view>

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
    <ui-simple-tree-view
      expansion-trigger="iconContainer"
      .onItemClick=${(id: string) => {
            const out = document.getElementById('trigger-output');
            if (out) out.textContent = `Last clicked: "${id}"`;
        }}
    >
      <ui-tree-item item-id="1" label="Applications">
        <ui-tree-item item-id="1-1" label="Calendar"></ui-tree-item>
        <ui-tree-item item-id="1-2" label="Chrome">
          <ui-tree-item item-id="1-2-1" label="History"></ui-tree-item>
          <ui-tree-item item-id="1-2-2" label="Extensions"></ui-tree-item>
        </ui-tree-item>
        <ui-tree-item item-id="1-3" label="Webstorm"></ui-tree-item>
      </ui-tree-item>
      <ui-tree-item item-id="2" label="Documents">
        <ui-tree-item item-id="2-1" label="Private"></ui-tree-item>
        <ui-tree-item item-id="2-2" label="OSS"></ui-tree-item>
      </ui-tree-item>
      <ui-tree-item item-id="3" label="Movies"></ui-tree-item>
    </ui-simple-tree-view>

    <p id="trigger-output" style="margin-top:16px;font-size:14px;font-family:system-ui,sans-serif;color:#555;">
      Click an item label (not the arrow) above...
    </p>
  `,
};
