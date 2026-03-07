import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-scroll-area';

const meta: Meta = {
    title: 'Layout/Scroll Area',
    component: 'ui-scroll-area',
    parameters: {
        docs: {
            description: {
                component: `
Augments native scroll functionality with custom, cross-browser overlay scrollbars.
Native scrollbars are hidden; lightweight custom thumbs render over the content and
sync to the viewport in real time.

### Components
- **\`ui-scroll-area\`** — Root container. Manages the viewport and built-in vertical/horizontal bars.
- **\`ui-scroll-bar\`** — Optional explicit scrollbar. Place with \`slot="scrollbar"\` for extra control.

### Usage
\`\`\`html
<ui-scroll-area style="height: 288px; width: 192px;">
  <div style="padding: 16px;">
    <!-- your content -->
  </div>
</ui-scroll-area>
\`\`\`

### Horizontal scrollbar
\`\`\`html
<ui-scroll-area style="width: 384px;">
  <div style="display: flex; white-space: nowrap;"><!-- wide content --></div>
  <ui-scroll-bar slot="scrollbar" orientation="horizontal"></ui-scroll-bar>
</ui-scroll-area>
\`\`\`

### CSS Custom Properties
| Property | Default | Description |
|---|---|---|
| \`--ui-scrollbar-size\`              | \`8px\`                   | Track width/height |
| \`--ui-scrollbar-thumb-color\`       | \`rgba(0,0,0,.35)\`       | Thumb fill |
| \`--ui-scrollbar-thumb-hover-color\` | \`rgba(0,0,0,.50)\`       | Thumb hover/drag fill |
| \`--ui-scrollbar-thumb-radius\`      | \`9999px\`                | Thumb border radius |
| \`--ui-scrollbar-track-color\`       | \`transparent\`           | Track background |
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
    height: 1px; background: var(--ui-border-color, #e4e4e7);
    margin: 8px 0;
`;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
    name: 'Default (vertical)',
    render: (args) => html`
        <ui-scroll-area
            type=${args.type}
            dir=${args.dir}
            style="height: 288px; width: 192px; border: 1px solid var(--ui-border-color, #e4e4e7); border-radius: 6px;"
        >
            <div style="padding: 16px;">
                <h4 style="margin: 0 0 16px; font-size: 0.875rem; font-weight: 600; font-family: var(--ui-font-family, system-ui); color: var(--ui-text-color, #111827);">
                    Tags
                </h4>
                ${tags.map(tag => html`
                    <div style="font-size: 0.875rem; font-family: var(--ui-font-family, system-ui); color: var(--ui-text-color, #111827);">
                        ${tag}
                    </div>
                    <div style=${separatorStyle}></div>
                `)}
            </div>
        </ui-scroll-area>
    `,
};

/* ── Horizontal ──────────────────────────────────────────────────── */
export const Horizontal: Story = {
    name: 'Horizontal',
    render: () => html`
        <div style="padding: 24px; max-width: 640px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Add <code>ui-scroll-bar</code> with <code>orientation="horizontal"</code>
                for a horizontal scrollbar.
            </p>
            <ui-scroll-area
                type="hover"
                style="width: 100%; border: 1px solid var(--ui-border-color, #e4e4e7); border-radius: 6px;"
            >
                <div style="display: flex; gap: 16px; padding: 16px; white-space: nowrap;">
                    ${Array.from({ length: 8 }, (_, i) => html`
                        <figure style="flex-shrink: 0; margin: 0;">
                            <div style="
                                width: 160px; height: 213px;
                                background: var(--ui-surface-3, #f4f4f5);
                                border-radius: 6px; overflow: hidden;
                                display: flex; align-items: center; justify-content: center;
                                font-size: 2rem;
                            ">
                                🖼️
                            </div>
                            <figcaption style="
                                padding-top: 8px; font-size: 0.75rem;
                                color: var(--ui-text-color-muted, #6b7280);
                                font-family: system-ui;
                            ">
                                Photo by
                                <span style="font-weight: 600; color: var(--ui-text-color, #111827);">
                                    Artist ${i + 1}
                                </span>
                            </figcaption>
                        </figure>
                    `)}
                </div>
                <ui-scroll-bar slot="scrollbar" orientation="horizontal"></ui-scroll-bar>
            </ui-scroll-area>
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
            <ui-scroll-area
                type="always"
                style="height: 288px; width: 192px; border: 1px solid var(--ui-border-color, #e4e4e7); border-radius: 6px;"
            >
                <div style="padding: 16px;">
                    <h4 style="margin: 0 0 16px; font-size: 0.875rem; font-weight: 600; font-family: var(--ui-font-family, system-ui); color: var(--ui-text-color, #111827);">
                        Tags
                    </h4>
                    ${tags.slice(0, 20).map(tag => html`
                        <div style="font-size: 0.875rem; font-family: var(--ui-font-family, system-ui); color: var(--ui-text-color, #111827);">
                            ${tag}
                        </div>
                        <div style=${separatorStyle}></div>
                    `)}
                </div>
            </ui-scroll-area>
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
                        <ui-scroll-area
                            type=${type}
                            style="height: 200px; width: 140px; border: 1px solid var(--ui-border-color, #e4e4e7); border-radius: 6px;"
                        >
                            <div style="padding: 12px;">
                                ${tags.slice(0, 15).map(tag => html`
                                    <div style="font-size: 0.8125rem; font-family: var(--ui-font-family, system-ui); color: var(--ui-text-color, #111827);">
                                        ${tag}
                                    </div>
                                    <div style=${separatorStyle}></div>
                                `)}
                            </div>
                        </ui-scroll-area>
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
            <ui-scroll-area
                type="always"
                dir="rtl"
                style="height: 288px; width: 192px; border: 1px solid var(--ui-border-color, #e4e4e7); border-radius: 6px;"
            >
                <div style="padding: 16px; direction: rtl; text-align: right;">
                    <h4 style="margin: 0 0 16px; font-size: 0.875rem; font-weight: 600; font-family: var(--ui-font-family, system-ui); color: var(--ui-text-color, #111827);">
                        العلامات
                    </h4>
                    ${tags.slice(0, 20).map(tag => html`
                        <div style="font-size: 0.875rem; font-family: var(--ui-font-family, system-ui); color: var(--ui-text-color, #111827);">
                            ${tag}
                        </div>
                        <div style=${separatorStyle}></div>
                    `)}
                </div>
            </ui-scroll-area>
        </div>
    `,
};

/* ── CustomTokens ────────────────────────────────────────────────── */
export const CustomTokens: Story = {
    name: 'Custom Tokens',
    render: () => html`
        <div style="padding: 24px;">
            <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                Override <code>--ui-scrollbar-*</code> tokens on the host element.
            </p>
            <ui-scroll-area
                type="always"
                style="
                    height: 288px; width: 192px;
                    border: 1px solid var(--ui-border-color, #e4e4e7); border-radius: 6px;
                    --ui-scrollbar-size: 12px;
                    --ui-scrollbar-thumb-color: var(--ui-primary-color, #3b82f6);
                    --ui-scrollbar-thumb-hover-color: var(--ui-primary-color-hover, #2563eb);
                    --ui-scrollbar-thumb-radius: 4px;
                    --ui-scrollbar-track-color: rgba(59,130,246,0.08);
                "
            >
                <div style="padding: 16px;">
                    <h4 style="margin: 0 0 16px; font-size: 0.875rem; font-weight: 600; font-family: var(--ui-font-family, system-ui); color: var(--ui-text-color, #111827);">
                        Custom Scrollbar
                    </h4>
                    ${tags.slice(0, 20).map(tag => html`
                        <div style="font-size: 0.875rem; font-family: var(--ui-font-family, system-ui); color: var(--ui-text-color, #111827);">
                            ${tag}
                        </div>
                        <div style=${separatorStyle}></div>
                    `)}
                </div>
            </ui-scroll-area>
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
                <code>ui-scroll-bar[orientation="horizontal"]</code> to show a custom bar.
            </p>
            <ui-scroll-area
                type="always"
                style="height: 200px; width: 320px; border: 1px solid var(--ui-border-color, #e4e4e7); border-radius: 6px;"
            >
                <div style="padding: 16px; width: 600px;">
                    ${Array.from({ length: 20 }, (_, i) => html`
                        <div style="
                            font-size: 0.875rem; font-family: system-ui;
                            color: var(--ui-text-color, #111827);
                            white-space: nowrap; padding: 2px 0;
                        ">
                            Row ${i + 1} — this content is intentionally very wide to demonstrate horizontal scrolling
                        </div>
                    `)}
                </div>
                <ui-scroll-bar slot="scrollbar" orientation="horizontal"></ui-scroll-bar>
            </ui-scroll-area>
        </div>
    `,
};
