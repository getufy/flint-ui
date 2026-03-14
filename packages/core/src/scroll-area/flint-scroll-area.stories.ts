import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-scroll-area';

const meta: Meta = {
    title: 'Layout/Scroll Area',
    component: 'flint-scroll-area',
    parameters: {
        docs: {
            description: {
                component: `
#### \`<flint-scroll-bar>\`

Custom overlay scrollbar. Place inside \`flint-scroll-area\` with \`slot="scrollbar"\` for an explicit horizontal or second-axis bar. The parent \`flint-scroll-area\` calls \`setThumb()\` and \`setVisible()\` to keep this element in sync with the viewport's scroll position.

- **Tag**: \`<flint-scroll-bar>\`
- **Class**: \`FlintScrollBar\`

#### Properties

| Property | Attribute | Type | Default |
|---|---|---|---|
| \`orientation\` | \`orientation\` | \`'vertical' \\| 'horizontal'\` | \`'vertical'\` |

#### Slots

| Name | Description |
|---|---|
| \`—\` | none (fully shadow DOM) |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-scrollbar-track-color\` | \`transparent\` |
| \`--flint-scrollbar-thumb-radius\` | \`9999px\` |
| \`--flint-scrollbar-size\` | \`8px\` |
| \`--flint-scrollbar-thumb-color\` | \`rgba(0, 0, 0, 0.35\` |
| \`--flint-scrollbar-thumb-hover-color\` | \`rgba(0, 0, 0, 0.5\` |

#### Methods

| Method | Description |
|---|---|
| \`setThumb(pos: number, size: number)\` | Push updated thumb geometry from the parent scroll area. |
| \`setVisible(visible: boolean)\` | Show or hide the scrollbar (parent controls visibility). |

---

#### \`<flint-scroll-area>\`

- **Tag**: \`<flint-scroll-area>\`
- **Class**: \`FlintScrollArea\`

#### Properties

| Property | Attribute | Type | Default |
|---|---|---|---|
| \`type\` | \`type\` | \`'auto' \\| 'always' \\| 'scroll' \\| 'hover'\` | \`'hover'\` |
| \`dir\` | \`dir\` | \`'ltr' \\| 'rtl'\` | \`'ltr'\` |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |
| \`scrollbar\` |  |

#### Methods

| Method | Description |
|---|---|
| \`scrollTo(optionsOrX?: ScrollToOptions \\| number, y?: number)\` |  |
| \`scrollBy(optionsOrX?: ScrollToOptions \\| number, y?: number)\` |  |
                `,
            },
        },
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['hover', 'auto', 'always', 'scroll'],
        },
        dir: {
            control: 'select',
            options: ['ltr', 'rtl'],
        },
    },
    args: {
        type: 'hover',
        dir: 'ltr',
    },
};

export default meta;
type Story = StoryObj;

/* ── shared helpers ────────────────────────────────────────────────── */

const tags = Array.from({ length: 50 }, (_, i) => `v1.2.0-beta.${50 - i}`);

const separatorStyle = `
    height: 1px; background: var(--flint-border-color, #e4e4e7);
    margin: 8px 0;
`;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
    name: 'Default (vertical)',
    render: (args) => html`
        <flint-scroll-area
            type=${args.type}
            dir=${args.dir}
            style="height: 288px; width: 192px; border: 1px solid var(--flint-border-color, #e4e4e7); border-radius: 6px;"
        >
            <div style="padding: 16px;">
                <h4 style="margin: 0 0 16px; font-size: 0.875rem; font-weight: 600; font-family: var(--flint-font-family, system-ui); color: var(--flint-text-color, #111827);">
                    Tags
                </h4>
                ${tags.map(tag => html`
                    <div style="font-size: 0.875rem; font-family: var(--flint-font-family, system-ui); color: var(--flint-text-color, #111827);">
                        ${tag}
                    </div>
                    <div style=${separatorStyle}></div>
                `)}
            </div>
        </flint-scroll-area>
    `,
};

/* ── Horizontal ──────────────────────────────────────────────────── */
export const Horizontal: Story = {
    name: 'Horizontal',
    render: () => html`
        <div style="padding: 24px; max-width: 640px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Add <code>flint-scroll-bar</code> with <code>orientation="horizontal"</code>
                for a horizontal scrollbar.
            </p>
            <flint-scroll-area
                type="hover"
                style="width: 100%; border: 1px solid var(--flint-border-color, #e4e4e7); border-radius: 6px;"
            >
                <div style="display: flex; gap: 16px; padding: 16px; white-space: nowrap;">
                    ${Array.from({ length: 8 }, (_, i) => html`
                        <figure style="flex-shrink: 0; margin: 0;">
                            <div style="
                                width: 160px; height: 213px;
                                background: var(--flint-surface-3, #f4f4f5);
                                border-radius: 6px; overflow: hidden;
                                display: flex; align-items: center; justify-content: center;
                                font-size: 2rem;
                            ">
                                🖼️
                            </div>
                            <figcaption style="
                                padding-top: 8px; font-size: 0.75rem;
                                color: var(--flint-text-color-muted, #6b7280);
                                font-family: system-ui;
                            ">
                                Photo by
                                <span style="font-weight: 600; color: var(--flint-text-color, #111827);">
                                    Artist ${i + 1}
                                </span>
                            </figcaption>
                        </figure>
                    `)}
                </div>
                <flint-scroll-bar slot="scrollbar" orientation="horizontal"></flint-scroll-bar>
            </flint-scroll-area>
        </div>
    `,
};

/* ── AlwaysVisible ───────────────────────────────────────────────── */
export const AlwaysVisible: Story = {
    name: 'Always Visible',
    render: () => html`
        <div style="padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                <code>type="always"</code> — scrollbar is visible at all times.
            </p>
            <flint-scroll-area
                type="always"
                style="height: 288px; width: 192px; border: 1px solid var(--flint-border-color, #e4e4e7); border-radius: 6px;"
            >
                <div style="padding: 16px;">
                    <h4 style="margin: 0 0 16px; font-size: 0.875rem; font-weight: 600; font-family: var(--flint-font-family, system-ui); color: var(--flint-text-color, #111827);">
                        Tags
                    </h4>
                    ${tags.slice(0, 20).map(tag => html`
                        <div style="font-size: 0.875rem; font-family: var(--flint-font-family, system-ui); color: var(--flint-text-color, #111827);">
                            ${tag}
                        </div>
                        <div style=${separatorStyle}></div>
                    `)}
                </div>
            </flint-scroll-area>
        </div>
    `,
};

/* ── TypeShowcase ────────────────────────────────────────────────── */
export const TypeShowcase: Story = {
    name: 'Type Comparison',
    render: () => {
        const types = ['hover', 'auto', 'always', 'scroll'] as const;
        return html`
            <div style="display: flex; gap: 24px; flex-wrap: wrap; padding: 24px;">
                ${types.map(type => html`
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <code style="font-size: 0.75rem; color: #6b7280; font-family: monospace;">
                            type="${type}"
                        </code>
                        <flint-scroll-area
                            type=${type}
                            style="height: 200px; width: 140px; border: 1px solid var(--flint-border-color, #e4e4e7); border-radius: 6px;"
                        >
                            <div style="padding: 12px;">
                                ${tags.slice(0, 15).map(tag => html`
                                    <div style="font-size: 0.8125rem; font-family: var(--flint-font-family, system-ui); color: var(--flint-text-color, #111827);">
                                        ${tag}
                                    </div>
                                    <div style=${separatorStyle}></div>
                                `)}
                            </div>
                        </flint-scroll-area>
                    </div>
                `)}
            </div>
        `;
    },
};

/* ── RTL ─────────────────────────────────────────────────────────── */
export const RTL: Story = {
    name: 'RTL Direction',
    render: () => html`
        <div style="padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                <code>dir="rtl"</code> — vertical scrollbar moves to the left side.
            </p>
            <flint-scroll-area
                type="always"
                dir="rtl"
                style="height: 288px; width: 192px; border: 1px solid var(--flint-border-color, #e4e4e7); border-radius: 6px;"
            >
                <div style="padding: 16px; direction: rtl; text-align: right;">
                    <h4 style="margin: 0 0 16px; font-size: 0.875rem; font-weight: 600; font-family: var(--flint-font-family, system-ui); color: var(--flint-text-color, #111827);">
                        العلامات
                    </h4>
                    ${tags.slice(0, 20).map(tag => html`
                        <div style="font-size: 0.875rem; font-family: var(--flint-font-family, system-ui); color: var(--flint-text-color, #111827);">
                            ${tag}
                        </div>
                        <div style=${separatorStyle}></div>
                    `)}
                </div>
            </flint-scroll-area>
        </div>
    `,
};

/* ── CustomTokens ────────────────────────────────────────────────── */
export const CustomTokens: Story = {
    name: 'Custom Tokens',
    render: () => html`
        <div style="padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Override <code>--flint-scrollbar-*</code> tokens on the host element.
            </p>
            <flint-scroll-area
                type="always"
                style="
                    height: 288px; width: 192px;
                    border: 1px solid var(--flint-border-color, #e4e4e7); border-radius: 6px;
                    --flint-scrollbar-size: 12px;
                    --flint-scrollbar-thumb-color: var(--flint-primary-color, #3b82f6);
                    --flint-scrollbar-thumb-hover-color: var(--flint-primary-color-hover, #2563eb);
                    --flint-scrollbar-thumb-radius: 4px;
                    --flint-scrollbar-track-color: rgba(59,130,246,0.08);
                "
            >
                <div style="padding: 16px;">
                    <h4 style="margin: 0 0 16px; font-size: 0.875rem; font-weight: 600; font-family: var(--flint-font-family, system-ui); color: var(--flint-text-color, #111827);">
                        Custom Scrollbar
                    </h4>
                    ${tags.slice(0, 20).map(tag => html`
                        <div style="font-size: 0.875rem; font-family: var(--flint-font-family, system-ui); color: var(--flint-text-color, #111827);">
                            ${tag}
                        </div>
                        <div style=${separatorStyle}></div>
                    `)}
                </div>
            </flint-scroll-area>
        </div>
    `,
};

/* ── BothAxes ────────────────────────────────────────────────────── */
export const BothAxes: Story = {
    name: 'Both Axes',
    render: () => html`
        <div style="padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Horizontal overflow is detected automatically. Add a
                <code>flint-scroll-bar[orientation="horizontal"]</code> to show a custom bar.
            </p>
            <flint-scroll-area
                type="always"
                style="height: 200px; width: 320px; border: 1px solid var(--flint-border-color, #e4e4e7); border-radius: 6px;"
            >
                <div style="padding: 16px; width: 600px;">
                    ${Array.from({ length: 20 }, (_, i) => html`
                        <div style="
                            font-size: 0.875rem; font-family: system-ui;
                            color: var(--flint-text-color, #111827);
                            white-space: nowrap; padding: 2px 0;
                        ">
                            Row ${i + 1} — this content is intentionally very wide to demonstrate horizontal scrolling
                        </div>
                    `)}
                </div>
                <flint-scroll-bar slot="scrollbar" orientation="horizontal"></flint-scroll-bar>
            </flint-scroll-area>
        </div>
    `,
};

/* ── Nested ──────────────────────────────────────────────────────── */
export const Nested: Story = {
    name: 'Nested Scroll Areas',
    render: () => html`
        <div style="padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Scroll areas can be nested. Each manages its own scrollbars independently.
            </p>
            <flint-scroll-area
                type="always"
                style="height: 300px; width: 400px; border: 1px solid var(--flint-border-color, #e4e4e7); border-radius: 6px;"
            >
                <div style="padding: 16px;">
                    <h4 style="margin: 0 0 12px; font-size: 0.875rem; font-weight: 600; font-family: system-ui; color: var(--flint-text-color, #111827);">
                        Outer scroll area
                    </h4>
                    ${Array.from({ length: 5 }, (_, i) => html`
                        <div style="font-size: 0.875rem; font-family: system-ui; color: var(--flint-text-color, #111827); padding: 4px 0;">
                            Outer item ${i + 1}
                        </div>
                    `)}
                    <flint-scroll-area
                        type="always"
                        style="
                            height: 150px; margin: 12px 0;
                            border: 1px solid var(--flint-border-color, #e4e4e7); border-radius: 4px;
                            --flint-scrollbar-thumb-color: var(--flint-primary-color, #3b82f6);
                        "
                    >
                        <div style="padding: 12px;">
                            <h5 style="margin: 0 0 8px; font-size: 0.8125rem; font-weight: 600; font-family: system-ui; color: var(--flint-text-color, #111827);">
                                Inner scroll area
                            </h5>
                            ${Array.from({ length: 20 }, (_, j) => html`
                                <div style="font-size: 0.8125rem; font-family: system-ui; color: var(--flint-text-color-muted, #6b7280); padding: 2px 0;">
                                    Nested item ${j + 1}
                                </div>
                            `)}
                        </div>
                    </flint-scroll-area>
                    ${Array.from({ length: 20 }, (_, i) => html`
                        <div style="font-size: 0.875rem; font-family: system-ui; color: var(--flint-text-color, #111827); padding: 4px 0;">
                            Outer item ${i + 6}
                        </div>
                    `)}
                </div>
            </flint-scroll-area>
        </div>
    `,
};

/* ── DarkMode ────────────────────────────────────────────────────── */
export const DarkMode: Story = {
    name: 'Dark Mode',
    render: () => html`
        <div
            class="flint-theme-dark"
            style="
                padding: 24px; background: #1a1a2e; border-radius: 8px;
                --flint-text-color: #e5e7eb; --flint-text-color-muted: #9ca3af;
                --flint-border-color: #374151; --flint-surface-3: #1f2937;
                --flint-scrollbar-thumb-color: rgba(255,255,255,0.35);
                --flint-scrollbar-thumb-hover-color: rgba(255,255,255,0.50);
            "
        >
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: var(--flint-text-color-muted); font-family: system-ui;">
                Dark mode uses inverted scrollbar thumb colors via <code style="color: #93c5fd;">--flint-scrollbar-thumb-color</code>.
            </p>
            <flint-scroll-area
                type="always"
                style="height: 288px; width: 192px; border: 1px solid var(--flint-border-color); border-radius: 6px;"
            >
                <div style="padding: 16px;">
                    <h4 style="margin: 0 0 16px; font-size: 0.875rem; font-weight: 600; font-family: system-ui; color: var(--flint-text-color);">
                        Tags
                    </h4>
                    ${tags.slice(0, 25).map(tag => html`
                        <div style="font-size: 0.875rem; font-family: system-ui; color: var(--flint-text-color);">
                            ${tag}
                        </div>
                        <div style="height: 1px; background: var(--flint-border-color); margin: 8px 0;"></div>
                    `)}
                </div>
            </flint-scroll-area>
        </div>
    `,
};

/* ── ScrollType ──────────────────────────────────────────────────── */
export const ScrollType: Story = {
    name: 'Scroll Type (auto-hide)',
    render: () => html`
        <div style="padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                <code>type="scroll"</code> — scrollbar appears only while actively scrolling,
                then fades after 600ms.
            </p>
            <flint-scroll-area
                type="scroll"
                style="height: 288px; width: 192px; border: 1px solid var(--flint-border-color, #e4e4e7); border-radius: 6px;"
            >
                <div style="padding: 16px;">
                    <h4 style="margin: 0 0 16px; font-size: 0.875rem; font-weight: 600; font-family: system-ui; color: var(--flint-text-color, #111827);">
                        Scroll me!
                    </h4>
                    ${tags.map(tag => html`
                        <div style="font-size: 0.875rem; font-family: system-ui; color: var(--flint-text-color, #111827);">
                            ${tag}
                        </div>
                        <div style=${separatorStyle}></div>
                    `)}
                </div>
            </flint-scroll-area>
        </div>
    `,
};

/* ── ChatExample ─────────────────────────────────────────────────── */
export const ChatExample: Story = {
    name: 'Chat Window',
    render: () => {
        const messages = [
            { from: 'Alice', text: 'Hey, have you seen the new release?', time: '10:01' },
            { from: 'Bob', text: 'Not yet! What changed?', time: '10:02' },
            { from: 'Alice', text: 'They added custom scrollbars with CSS custom properties.', time: '10:03' },
            { from: 'Bob', text: 'Nice! Is it accessible?', time: '10:03' },
            { from: 'Alice', text: 'Yes, ARIA scrollbar roles and keyboard support.', time: '10:04' },
            { from: 'Bob', text: 'What about RTL support?', time: '10:05' },
            { from: 'Alice', text: 'Fully supported. The vertical bar flips to the left side.', time: '10:05' },
            { from: 'Bob', text: 'How about performance?', time: '10:06' },
            { from: 'Alice', text: 'ResizeObserver keeps everything in sync. No polling.', time: '10:06' },
            { from: 'Bob', text: 'Awesome, I will try it today.', time: '10:07' },
            { from: 'Alice', text: 'Let me know if you run into anything!', time: '10:08' },
            { from: 'Bob', text: 'Will do. Thanks!', time: '10:08' },
        ];
        return html`
            <div style="padding: 24px;">
                <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                    A chat window using <code>type="auto"</code> — scrollbar visible when content overflows.
                </p>
                <div style="width: 320px; border: 1px solid var(--flint-border-color, #e4e4e7); border-radius: 8px; overflow: hidden;">
                    <div style="padding: 12px 16px; border-bottom: 1px solid var(--flint-border-color, #e4e4e7); font-weight: 600; font-size: 0.875rem; font-family: system-ui; color: var(--flint-text-color, #111827);">
                        Chat
                    </div>
                    <flint-scroll-area type="auto" style="height: 280px;">
                        <div style="padding: 12px 16px; display: flex; flex-direction: column; gap: 8px;">
                            ${messages.map(m => html`
                                <div style="display: flex; gap: 8px; align-items: flex-start;">
                                    <div style="
                                        flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%;
                                        background: ${m.from === 'Alice' ? 'var(--flint-primary-color, #3b82f6)' : '#6b7280'};
                                        display: flex; align-items: center; justify-content: center;
                                        color: white; font-size: 0.6875rem; font-weight: 600; font-family: system-ui;
                                    ">${m.from[0]}</div>
                                    <div style="flex: 1; min-width: 0;">
                                        <div style="display: flex; align-items: baseline; gap: 6px;">
                                            <span style="font-size: 0.8125rem; font-weight: 600; font-family: system-ui; color: var(--flint-text-color, #111827);">
                                                ${m.from}
                                            </span>
                                            <span style="font-size: 0.6875rem; color: #9ca3af; font-family: system-ui;">
                                                ${m.time}
                                            </span>
                                        </div>
                                        <div style="font-size: 0.8125rem; font-family: system-ui; color: var(--flint-text-color, #111827); margin-top: 2px;">
                                            ${m.text}
                                        </div>
                                    </div>
                                </div>
                            `)}
                        </div>
                    </flint-scroll-area>
                </div>
            </div>
        `;
    },
};
