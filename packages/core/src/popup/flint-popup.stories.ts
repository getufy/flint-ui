import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-popup';

const meta: Meta = {
    title: 'Utilities/Popup',
    component: 'flint-popup',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
A low-level positioning primitive wrapping [Floating UI](https://floating-ui.com/).
Use it as the positioning engine inside tooltips, dropdowns, selects,
hover cards, and any overlay that needs to stay anchored to a reference element.

When \`active\` is false, all Floating UI listeners are torn down for performance.

### CSS Parts

| Part           | Description                          |
|----------------|--------------------------------------|
| \`popup\`      | The popup container element.         |
| \`arrow\`      | The arrow element.                   |
| \`hover-bridge\`| The transparent hover bridge element.|

### CSS Custom Properties

| Property                          | Default   | Description                       |
|-----------------------------------|-----------|-----------------------------------|
| \`--flint-popup-arrow-size\`      | \`8px\`   | Width and height of the arrow.    |
| \`--flint-popup-arrow-color\`     | \`inherit\`| Background color of the arrow.   |
`,
            },
        },
    },
    argTypes: {
        placement: {
            control: 'select',
            options: [
                'top', 'top-start', 'top-end',
                'right', 'right-start', 'right-end',
                'bottom', 'bottom-start', 'bottom-end',
                'left', 'left-start', 'left-end',
            ],
        },
        strategy: { control: 'select', options: ['absolute', 'fixed'] },
        distance: { control: { type: 'number', min: 0, max: 50 } },
        skidding: { control: { type: 'number', min: -50, max: 50 } },
        flip: { control: 'boolean' },
        shift: { control: 'boolean' },
        arrow: { control: 'boolean' },
        'hover-bridge': { control: 'boolean' },
        sync: { control: 'select', options: ['', 'width', 'height', 'both'] },
        'auto-size': { control: 'select', options: ['', 'horizontal', 'vertical', 'both'] },
    },
};

export default meta;
type Story = StoryObj;

/* ── Shared styles ─────────────────────────────────────────────────── */

const popupContentStyle = `
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 12px 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    font-family: system-ui;
    font-size: 0.875rem;
    color: #111827;
`;

const anchorStyle = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    cursor: pointer;
`;

/* ── Stories ────────────────────────────────────────────────────────── */

export const Default: Story = {
    args: {
        placement: 'bottom',
        distance: 8,
        active: true,
    },
    render: (args) => html`
        <div style="display: flex; justify-content: center; padding: 120px 40px;">
            <flint-popup
                placement=${args.placement}
                .distance=${args.distance}
                ?active=${args.active}
                ?flip=${args.flip}
                ?shift=${args.shift}
                ?arrow=${args.arrow}
            >
                <button slot="anchor" style=${anchorStyle}>Anchor</button>
                <div style=${popupContentStyle}>Popup content</div>
            </flint-popup>
        </div>
    `,
};

export const AllPlacements: Story = {
    render: () => {
        const placements = [
            'top-start', 'top', 'top-end',
            'right-start', 'right', 'right-end',
            'bottom-start', 'bottom', 'bottom-end',
            'left-start', 'left', 'left-end',
        ];
        return html`
            <div style="display: flex; flex-wrap: wrap; gap: 60px; padding: 80px; justify-content: center;">
                ${placements.map(p => html`
                    <flint-popup placement=${p} .distance=${8} active>
                        <div slot="anchor" style="width:80px;height:40px;background:#3b82f6;border-radius:6px;display:flex;align-items:center;justify-content:center;color:white;font-size:0.75rem;">
                            ${p}
                        </div>
                        <div style=${popupContentStyle}>
                            ${p}
                        </div>
                    </flint-popup>
                `)}
            </div>
        `;
    },
};

export const WithArrow: Story = {
    render: () => html`
        <div style="display: flex; gap: 80px; padding: 100px; justify-content: center;">
            ${(['top', 'right', 'bottom', 'left'] as const).map(p => html`
                <flint-popup placement=${p} .distance=${8} arrow active>
                    <button slot="anchor" style=${anchorStyle}>${p}</button>
                    <div style="${popupContentStyle} --flint-popup-arrow-color: white;">
                        Arrow ${p}
                    </div>
                </flint-popup>
            `)}
        </div>
    `,
};

export const FlipBehavior: Story = {
    render: () => html`
        <div style="padding: 20px; font-family: system-ui;">
            <p style="margin-bottom: 12px; color: #6b7280; font-size: 0.875rem;">
                Scroll down — the popup will flip from top to bottom when it runs out of space.
            </p>
            <div style="height: 200px; overflow: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 200px 20px;">
                <div style="display: flex; justify-content: center;">
                    <flint-popup placement="top" .distance=${8} flip active>
                        <button slot="anchor" style=${anchorStyle}>Flip me</button>
                        <div style=${popupContentStyle}>
                            I flip when there's not enough space!
                        </div>
                    </flint-popup>
                </div>
                <div style="height: 400px;"></div>
            </div>
        </div>
    `,
};

export const FixedStrategy: Story = {
    render: () => html`
        <div style="padding: 20px; font-family: system-ui;">
            <p style="margin-bottom: 12px; color: #6b7280; font-size: 0.875rem;">
                The popup escapes the overflow:hidden container using strategy="fixed".
            </p>
            <div style="overflow: hidden; border: 1px solid #e5e7eb; border-radius: 8px; padding: 40px; height: 100px;">
                <flint-popup placement="bottom" strategy="fixed" .distance=${8} active>
                    <button slot="anchor" style=${anchorStyle}>Fixed strategy</button>
                    <div style=${popupContentStyle}>
                        I escape overflow:hidden!
                    </div>
                </flint-popup>
            </div>
        </div>
    `,
};

export const SyncWidth: Story = {
    render: () => html`
        <div style="display: flex; justify-content: center; padding: 40px 40px 200px;">
            <flint-popup placement="bottom" .distance=${4} sync="width" active>
                <button slot="anchor" style="${anchorStyle} width: 250px;">
                    Popup matches my width
                </button>
                <div style="${popupContentStyle} box-sizing: border-box;">
                    This popup is synced to the anchor's width.
                </div>
            </flint-popup>
        </div>
    `,
};

export const HoverBridge: Story = {
    render: () => html`
        <div style="display: flex; justify-content: center; padding: 120px 40px;">
            <flint-popup placement="bottom" .distance=${20} hover-bridge active>
                <button slot="anchor" style=${anchorStyle}>Hover bridge (20px gap)</button>
                <div style=${popupContentStyle}>
                    The transparent bridge spans the 20px gap,<br>
                    keeping the popup accessible while hovering.
                </div>
            </flint-popup>
        </div>
    `,
};
