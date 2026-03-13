import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-rich-tree-view.js';
import type { UiRichTreeView, RichTreeItem } from './ui-rich-tree-view.js';

const meta: Meta = {
  title: 'Tree View/Rich Tree View - Ordering',
  component: 'ui-rich-tree-view',
  argTypes: {
    itemsReordering: { control: 'boolean' },
    itemsReorderingHandle: { control: 'boolean' },
  },
  args: {
    itemsReordering: true,
    itemsReorderingHandle: false,
  },
};

export default meta;
type Story = StoryObj;

const ORDERING_ITEMS: RichTreeItem[] = [
  {
    id: '1', label: 'Applications', children: [
      { id: '1-1', label: 'Calendar' },
      { id: '1-2', label: 'Chrome' },
      { id: '1-3', label: 'Webstorm' },
    ],
  },
  {
    id: '2', label: 'Documents', children: [
      { id: '2-1', label: 'OSS' },
      { id: '2-2', label: 'Work' },
    ],
  },
  { id: '3', label: 'Downloads' },
  { id: '4', label: 'Movies' },
];

// ─── Basic Reordering ─────────────────────────────────────────────────────────

export const BasicReordering: Story = {
  name: 'Enable drag-and-drop reordering',
  render: (args) => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      Set <code>itemsReordering</code> to <code>true</code> to enable drag-and-drop.
      You can move items between parents or change their order within the same parent.
    </p>
    <ui-rich-tree-view
      .items=${ORDERING_ITEMS}
      ?items-reordering=${args['itemsReordering']}
      @item-position-change=${(e: CustomEvent) => console.log('Position changed:', e.detail)}
    ></ui-rich-tree-view>
  `,
};

// ─── Limit Reordering ─────────────────────────────────────────────────────────

export const LimitReordering: Story = {
  name: 'Limit reordering (leaves only)',
  render: () => {
    const isItemReorderable = (itemId: string) => {
      // Only allow reordering of items that don't have children (leaves)
      const tree = document.getElementById('leaf-reorder-tree') as UiRichTreeView | null;
      if (!tree) return true;
      return tree.getItemOrderedChildrenIds(itemId).length === 0;
    };

    return html`
      <p style="font-size:14px;color:#555;margin-bottom:12px;">
        Use <code>isItemReorderable</code> to prevent dragging specific items.
        In this example, only leaf nodes (items without children) can be dragged.
      </p>
      <ui-rich-tree-view
        id="leaf-reorder-tree"
        .items=${ORDERING_ITEMS}
        items-reordering
        .isItemReorderable=${isItemReorderable}
      ></ui-rich-tree-view>
    `;
  },
};

// ─── Restrict Drop Positions ──────────────────────────────────────────────────

export const RestrictDropPositions: Story = {
  name: 'Restrict drop positions',
  render: () => {
    const canMoveItemToNewPosition = (params: {
      itemId: string;
      targetId: string;
      position: 'before' | 'after' | 'inside';
    }) => {
      const tree = document.getElementById('restrict-tree') as UiRichTreeView | null;
      if (!tree) return true;

      const items = tree.getItemTree();

      // FIX #5: Returns null (not undefined) for items not found, so that
      // root-level items (parentId === null) compare equal to each other.
      const findParentId = (
        id: string,
        currentItems: RichTreeItem[],
        parentId: string | null = null
      ): string | null => {
        for (const item of currentItems) {
          if (item['id'] === id) return parentId;
          if (item['children']) {
            const found = findParentId(id, item['children'] as RichTreeItem[], item['id'] as string);
            if (found !== null) return found;
          }
        }
        // Return null (not undefined) so root items share a comparable sentinel value
        return null;
      };

      const itemParentId = findParentId(params.itemId, items);
      const targetParentId = params.position === 'inside'
        ? params.targetId
        : findParentId(params.targetId, items);

      return itemParentId === targetParentId;
    };

    return html`
      <p style="font-size:14px;color:#555;margin-bottom:12px;">
        Use <code>canMoveItemToNewPosition</code> to restrict where items can be dropped.
        In this example, items can only be reordered <strong>within the same parent</strong>.
      </p>
      <ui-rich-tree-view
        id="restrict-tree"
        .items=${ORDERING_ITEMS}
        items-reordering
        .canMoveItemToNewPosition=${canMoveItemToNewPosition}
      ></ui-rich-tree-view>
    `;
  },
};

// ─── Sync Two Trees ───────────────────────────────────────────────────────────

export const SyncTwoTrees: Story = {
  name: 'Sync two trees',
  render: () => {
    const handlePositionChange = () => {
      const tree1 = document.getElementById('tree-sync-1') as UiRichTreeView | null;
      const tree2 = document.getElementById('tree-sync-2') as UiRichTreeView | null;
      if (tree1 && tree2) {
        // Synchronize the second tree with the first one's state
        tree2.items = [...tree1.getItemTree()];
      }
    };

    return html`
      <p style="font-size:14px;color:#555;margin-bottom:12px;">
        Use <code>getItemTree()</code> to get the entire dataset and synchronize it.
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 14px;">Source Tree (Draggable)</h4>
          <ui-rich-tree-view
            id="tree-sync-1"
            .items=${ORDERING_ITEMS}
            items-reordering
            @item-position-change=${handlePositionChange}
          ></ui-rich-tree-view>
        </div>
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 14px;">Synced Tree (Read-only)</h4>
          <ui-rich-tree-view
            id="tree-sync-2"
            .items=${ORDERING_ITEMS}
          ></ui-rich-tree-view>
        </div>
      </div>
    `;
  },
};

// ─── Custom Drag Handle ───────────────────────────────────────────────────────

export const CustomDragHandle: Story = {
  name: 'Only trigger reordering from a drag handle',
  render: (args) => html`
    <p style="font-size:14px;color:#555;margin-bottom:12px;">
      Set <code>itemsReorderingHandle</code> to <code>true</code> to only trigger reordering
      when dragging from the drag handle icon.
    </p>
    <ui-rich-tree-view
      .items=${ORDERING_ITEMS}
      items-reordering
      ?items-reordering-handle=${args['itemsReorderingHandle'] ?? true}
    ></ui-rich-tree-view>
  `,
  args: {
    itemsReorderingHandle: true,
  },
};