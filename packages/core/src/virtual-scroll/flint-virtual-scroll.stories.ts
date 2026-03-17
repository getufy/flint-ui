import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-virtual-scroll';

interface SimpleItem {
    id: number;
    label: string;
}

function makeItems(count: number): SimpleItem[] {
    return Array.from({ length: count }, (_, i) => ({ id: i, label: `Item ${i}` }));
}

const meta: Meta = {
    title: 'Utilities/VirtualScroll',
    component: 'flint-virtual-scroll',
    parameters: {
        docs: {
            description: {
                component: `
A generic virtual scrolling container [§38.1].

- **Tag**: \`<flint-virtual-scroll>\`
- **Class**: \`FlintVirtualScroll\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`items\` | \`items\` | \`T[]\` | \`[]\` | Array of data items to render. |
| \`itemHeight\` | \`item-height\` | \`number\` | \`40\` | Fixed height of each item in pixels. Used for position calculations. |
| \`overscan\` | \`overscan\` | \`number\` | \`5\` | Number of extra items to render above and below the visible area. |
| \`renderItem\` | \`renderItem\` | \`RenderItemFn&lt;T&gt;\` | — | Render function for a single item. Receives the item and its index. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Fallback content shown when items is empty. |
                `,
            },
        },
    },
    argTypes: {
        itemHeight: { control: { type: 'number', min: 20, max: 120, step: 4 } },
        overscan:   { control: { type: 'number', min: 0, max: 20, step: 1 } },
    },
    args: {
        itemHeight: 40,
        overscan: 5,
    },
};

export default meta;
type Story = StoryObj;

const rowStyle = `
    display: flex; align-items: center; padding: 0 16px;
    font-size: 0.875rem; font-family: var(--flint-font-family, system-ui, sans-serif);
    color: var(--flint-text-color, #111827);
    border-bottom: 1px solid var(--flint-border-color, #f3f4f6);
    box-sizing: border-box;
`;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
    render: (args) => {
        const items = makeItems(1000);
        return html`
            <div style="padding: 24px; max-width: 480px;">
                <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563; font-family: system-ui;">
                    1,000 items — only visible rows are in the DOM.
                </p>
                <flint-virtual-scroll
                    .items=${items}
                    .itemHeight=${args.itemHeight}
                    .overscan=${args.overscan}
                    .renderItem=${(item: SimpleItem) => html`
                        <div style="${rowStyle} height: ${args.itemHeight}px;">
                            ${item.label}
                        </div>
                    `}
                    style="height: 400px; border: 1px solid var(--flint-border-color, #e5e7eb); border-radius: 8px; overflow: hidden;"
                >
                    <p style="padding: 16px; color: #6b7280;">No items</p>
                </flint-virtual-scroll>
            </div>
        `;
    },
};

/* ── Large List ──────────────────────────────────────────────────── */
export const LargeList: Story = {
    name: 'Large List',
    render: (args) => {
        const items = makeItems(100_000);
        return html`
            <div style="padding: 24px; max-width: 480px;">
                <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563; font-family: system-ui;">
                    100,000 items — scroll performance remains smooth.
                </p>
                <flint-virtual-scroll
                    .items=${items}
                    .itemHeight=${args.itemHeight}
                    .overscan=${args.overscan}
                    .renderItem=${(item: SimpleItem) => html`
                        <div style="${rowStyle} height: ${args.itemHeight}px;">
                            <span style="min-width: 80px; color: var(--flint-text-color-muted, #6b7280); font-size: 0.75rem;">
                                #${item.id}
                            </span>
                            ${item.label}
                        </div>
                    `}
                    style="height: 500px; border: 1px solid var(--flint-border-color, #e5e7eb); border-radius: 8px; overflow: hidden;"
                >
                    <p style="padding: 16px; color: #6b7280;">No items</p>
                </flint-virtual-scroll>
            </div>
        `;
    },
};

/* ── Custom Item Height ──────────────────────────────────────────── */
export const CustomItemHeight: Story = {
    name: 'Custom Item Height',
    args: { itemHeight: 72 },
    render: (args) => {
        const items = makeItems(500);
        return html`
            <div style="padding: 24px; max-width: 480px;">
                <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563; font-family: system-ui;">
                    Taller rows (72px) with two-line content.
                </p>
                <flint-virtual-scroll
                    .items=${items}
                    .itemHeight=${args.itemHeight}
                    .overscan=${args.overscan}
                    .renderItem=${(item: SimpleItem) => html`
                        <div style="${rowStyle} height: ${args.itemHeight}px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 2px;">
                            <span style="font-weight: 500;">${item.label}</span>
                            <span style="font-size: 0.75rem; color: var(--flint-text-color-muted, #6b7280);">
                                Description for item ${item.id}
                            </span>
                        </div>
                    `}
                    style="height: 400px; border: 1px solid var(--flint-border-color, #e5e7eb); border-radius: 8px; overflow: hidden;"
                >
                    <p style="padding: 16px; color: #6b7280;">No items</p>
                </flint-virtual-scroll>
            </div>
        `;
    },
};
