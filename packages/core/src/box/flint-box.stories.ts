import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-box';
import '../stack/flint-stack';

const meta: Meta = {
    title: 'Layout/Box',
    component: 'flint-box',
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
- **Tag**: \`<flint-box>\`
- **Class**: \`FlintBox\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`component\` | \`component\` | \`string\` | \`'div'\` | The component tag to render |
| \`m\` | \`m\` | \`string \\| undefined\` | — | Margin on all sides. |
| \`mt\` | \`mt\` | \`string \\| undefined\` | — | Margin top. |
| \`mr\` | \`mr\` | \`string \\| undefined\` | — | Margin right. |
| \`mb\` | \`mb\` | \`string \\| undefined\` | — | Margin bottom. |
| \`ml\` | \`ml\` | \`string \\| undefined\` | — | Margin left. |
| \`mx\` | \`mx\` | \`string \\| undefined\` | — | Margin on the horizontal (left and right) axis. |
| \`my\` | \`my\` | \`string \\| undefined\` | — | Margin on the vertical (top and bottom) axis. |
| \`p\` | \`p\` | \`string \\| undefined\` | — | Padding on all sides. |
| \`pt\` | \`pt\` | \`string \\| undefined\` | — | Padding top. |
| \`pr\` | \`pr\` | \`string \\| undefined\` | — | Padding right. |
| \`pb\` | \`pb\` | \`string \\| undefined\` | — | Padding bottom. |
| \`pl\` | \`pl\` | \`string \\| undefined\` | — | Padding left. |
| \`px\` | \`px\` | \`string \\| undefined\` | — | Padding on the horizontal (left and right) axis. |
| \`py\` | \`py\` | \`string \\| undefined\` | — | Padding on the vertical (top and bottom) axis. |
| \`display\` | \`display\` | \`string \\| undefined\` | — | CSS display value. |
| \`flexDirection\` | \`flexDirection\` | \`string \\| undefined\` | — | CSS flex-direction value. |
| \`alignItems\` | \`alignItems\` | \`string \\| undefined\` | — | CSS align-items value. |
| \`justifyContent\` | \`justifyContent\` | \`string \\| undefined\` | — | CSS justify-content value. |
| \`flexWrap\` | \`flexWrap\` | \`string \\| undefined\` | — | CSS flex-wrap value. |
| \`flexBasis\` | \`flexBasis\` | \`string \\| undefined\` | — | CSS flex-basis value. |
| \`flexGrow\` | \`flexGrow\` | \`string \\| undefined\` | — | CSS flex-grow value. |
| \`flexShrink\` | \`flexShrink\` | \`string \\| undefined\` | — | CSS flex-shrink value. |
| \`gap\` | \`gap\` | \`string \\| undefined\` | — | CSS gap between flex or grid items. |
| \`bgcolor\` | \`bgcolor\` | \`string \\| undefined\` | — | Background color. Supports theme tokens 'primary' and 'secondary'. |
| \`color\` | \`color\` | \`string \\| undefined\` | — | Text color. Supports theme tokens 'primary' and 'secondary'. |
| \`border\` | \`border\` | \`string \\| undefined\` | — | CSS border shorthand value. |
| \`borderRadius\` | \`borderRadius\` | \`string \\| undefined\` | — | CSS border-radius value. |
| \`boxShadow\` | \`boxShadow\` | \`string \\| undefined\` | — | CSS box-shadow value. |
| \`width\` | \`width\` | \`string \\| undefined\` | — | CSS width value. |
| \`height\` | \`height\` | \`string \\| undefined\` | — | CSS height value. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-box-warning\` | — | Dispatched when an unknown component tag is used and falls back to div. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-box-bg\` | \`transparent\` |
| \`--flint-box-color\` | \`inherit\` |
| \`--flint-box-border\` | \`none\` |
| \`--flint-box-border-radius\` | \`0\` |
| \`--flint-box-shadow\` | \`none\` |
| \`--flint-box-padding\` | \`0\` |
                `,
            },
        },
    },
    argTypes: {
        component: {
            control: 'select',
            options: [
                'div', 'span', 'section', 'article', 'header', 'footer', 'main',
                'aside', 'nav', 'ul', 'ol', 'li', 'p', 'form', 'fieldset',
                'label', 'figure', 'figcaption', 'address', 'blockquote',
                'details', 'summary', 'dialog',
            ],
        },
        // Padding
        p:  { control: 'text' },
        pt: { control: 'text' },
        pr: { control: 'text' },
        pb: { control: 'text' },
        pl: { control: 'text' },
        px: { control: 'text' },
        py: { control: 'text' },
        // Margin
        m:  { control: 'text' },
        mt: { control: 'text' },
        mr: { control: 'text' },
        mb: { control: 'text' },
        ml: { control: 'text' },
        mx: { control: 'text' },
        my: { control: 'text' },
        // Layout
        display:        { control: 'select', options: ['block', 'flex', 'grid', 'inline', 'inline-flex', 'inline-block', 'none'] },
        flexDirection:  { control: 'select', options: ['row', 'row-reverse', 'column', 'column-reverse'] },
        alignItems:     { control: 'select', options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'] },
        justifyContent: { control: 'select', options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'] },
        flexWrap:       { control: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
        flexBasis:      { control: 'text' },
        flexGrow:       { control: 'text' },
        flexShrink:     { control: 'text' },
        gap:            { control: 'text' },
        // Color
        bgcolor: { control: 'text' },
        color:   { control: 'text' },
        // Visual
        border:       { control: 'text' },
        borderRadius: { control: 'text' },
        boxShadow:    { control: 'text' },
        width:        { control: 'text' },
        height:       { control: 'text' },
    },
    args: {
        bgcolor: 'primary',
        color: 'white',
        p: '16px',
        borderRadius: '8px',
    },
};

export default meta;
type Story = StoryObj;

// ── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
    render: (args) => html`
        <flint-box
            .component=${args.component || 'div'}
            .bgcolor=${args.bgcolor || ''}
            .color=${args.color || ''}
            .p=${args.p || ''}
            .pt=${args.pt || ''}
            .pr=${args.pr || ''}
            .pb=${args.pb || ''}
            .pl=${args.pl || ''}
            .px=${args.px || ''}
            .py=${args.py || ''}
            .m=${args.m || ''}
            .mt=${args.mt || ''}
            .mr=${args.mr || ''}
            .mb=${args.mb || ''}
            .ml=${args.ml || ''}
            .mx=${args.mx || ''}
            .my=${args.my || ''}
            .display=${args.display || ''}
            .flexDirection=${args.flexDirection || ''}
            .alignItems=${args.alignItems || ''}
            .justifyContent=${args.justifyContent || ''}
            .flexWrap=${args.flexWrap || ''}
            .flexBasis=${args.flexBasis || ''}
            .flexGrow=${args.flexGrow || ''}
            .flexShrink=${args.flexShrink || ''}
            .gap=${args.gap || ''}
            .border=${args.border || ''}
            .borderRadius=${args.borderRadius || ''}
            .boxShadow=${args.boxShadow || ''}
            .width=${args.width || ''}
            .height=${args.height || ''}
        >
            I'm a Box — tweak the controls on the left.
        </flint-box>
    `,
};

// ── Basic ────────────────────────────────────────────────────────────────────

export const Basic: Story = {
    render: (args) => html`
        <flint-box
            .bgcolor=${args.bgcolor || ''}
            .color=${args.color || ''}
            .p=${args.p || ''}
            .borderRadius=${args.borderRadius || ''}
            .display=${args.display || ''}
            .border=${args.border || ''}
            .width=${args.width || ''}
            .height=${args.height || ''}
        >
            Box with primary background, white text, padding, and rounded corners.
        </flint-box>
    `,
};

// ── Nested ───────────────────────────────────────────────────────────────────

export const Nested: Story = {
    render: () => html`
        <flint-box bgcolor="#f5f5f5" p="24px" borderRadius="12px">
            <flint-box bgcolor="primary" color="white" p="12px" borderRadius="6px" mb="12px">
                Header (Box as section header)
            </flint-box>
            <flint-box bgcolor="white" p="12px" borderRadius="6px" border="1px solid #e0e0e0">
                Content area (nested Box)
            </flint-box>
        </flint-box>
    `,
};

// ── Flex row ─────────────────────────────────────────────────────────────────

export const FlexRow: Story = {
    args: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', p: '16px', border: '1px solid #ddd', borderRadius: '8px', bgcolor: '', color: '' },
    render: (args) => html`
        <flint-box
            .display=${args.display || ''}
            .justifyContent=${args.justifyContent || ''}
            .alignItems=${args.alignItems || ''}
            .gap=${args.gap || ''}
            .p=${args.p || ''}
            .border=${args.border || ''}
            .borderRadius=${args.borderRadius || ''}
        >
            <flint-box>Left</flint-box>
            <flint-box>Center</flint-box>
            <flint-box>Right</flint-box>
        </flint-box>
    `,
};

// ── Flex column ──────────────────────────────────────────────────────────────

export const FlexColumn: Story = {
    render: () => html`
        <flint-box
            display="flex"
            flexDirection="column"
            gap="8px"
            p="16px"
            bgcolor="#f9f9f9"
            borderRadius="8px"
            width="200px"
        >
            <flint-box bgcolor="primary" color="white" p="8px" borderRadius="4px">Row 1</flint-box>
            <flint-box bgcolor="primary" color="white" p="8px" borderRadius="4px">Row 2</flint-box>
            <flint-box bgcolor="primary" color="white" p="8px" borderRadius="4px">Row 3</flint-box>
        </flint-box>
    `,
};

// ── Flex wrap ────────────────────────────────────────────────────────────────

export const FlexWrap: Story = {
    render: () => html`
        <flint-box
            display="flex"
            flexWrap="wrap"
            gap="8px"
            p="16px"
            bgcolor="#f5f5f5"
            borderRadius="8px"
        >
            ${[1, 2, 3, 4, 5, 6].map(n => html`
                <flint-box
                    bgcolor="primary"
                    color="white"
                    p="12px"
                    borderRadius="4px"
                    flexBasis="calc(33% - 8px)"
                    flexGrow="1"
                >
                    Item ${n}
                </flint-box>
            `)}
        </flint-box>
    `,
};

// ── Dimensions ───────────────────────────────────────────────────────────────

export const Dimensions: Story = {
    render: () => html`
        <flint-box
            width="240px"
            height="120px"
            bgcolor="#e3f2fd"
            border="2px solid #90caf9"
            borderRadius="8px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="#1565c0"
        >
            width: 240px × height: 120px
        </flint-box>
    `,
};

// ── Shadow ───────────────────────────────────────────────────────────────────

export const Shadows: Story = {
    render: () => html`
        <flint-box display="flex" gap="24px" p="32px" flexWrap="wrap">
            <flint-box
                p="16px"
                borderRadius="8px"
                boxShadow="0 1px 3px rgba(0,0,0,0.12)"
                bgcolor="white"
                width="140px"
            >
                Shadow sm
            </flint-box>
            <flint-box
                p="16px"
                borderRadius="8px"
                boxShadow="0 4px 12px rgba(0,0,0,0.15)"
                bgcolor="white"
                width="140px"
            >
                Shadow md
            </flint-box>
            <flint-box
                p="16px"
                borderRadius="8px"
                boxShadow="0 8px 24px rgba(0,0,0,0.18)"
                bgcolor="white"
                width="140px"
            >
                Shadow lg
            </flint-box>
        </flint-box>
    `,
};

// ── Spacing showcase ─────────────────────────────────────────────────────────

export const SpacingShowcase: Story = {
    render: () => html`
        <flint-box display="flex" flexDirection="column" gap="12px" p="24px" bgcolor="#f9fafb" borderRadius="8px">
            <flint-box bgcolor="white" border="1px dashed #ccc" borderRadius="4px" p="12px">
                <strong>p="12px"</strong> — uniform padding
            </flint-box>
            <flint-box bgcolor="white" border="1px dashed #ccc" borderRadius="4px" px="24px" py="8px">
                <strong>px="24px" py="8px"</strong> — axis shorthands
            </flint-box>
            <flint-box bgcolor="white" border="1px dashed #ccc" borderRadius="4px" pt="4px" pr="16px" pb="12px" pl="8px">
                <strong>pt / pr / pb / pl</strong> — all four sides individually
            </flint-box>
        </flint-box>
    `,
};

// ── Component prop ───────────────────────────────────────────────────────────

export const AsSemantic: Story = {
    render: () => html`
        <flint-box component="article" p="20px" bgcolor="white" border="1px solid #e0e0e0" borderRadius="8px">
            <flint-box component="header" pb="12px" mb="12px" border-bottom="1px solid #eee">
                <strong>Article header</strong> (rendered as &lt;header&gt;)
            </flint-box>
            <flint-box component="p" color="#555">
                This paragraph is rendered as a &lt;p&gt; element. Inspect the DOM to verify the semantic tags.
            </flint-box>
        </flint-box>
    `,
};

// ── CSS custom properties ────────────────────────────────────────────────────

export const CssCustomProperties: Story = {
    render: () => html`
        <flint-stack direction="row" gap="16px" style="flex-wrap:wrap;">
            <flint-box
                p="20px"
                borderRadius="8px"
                style="--flint-box-bg: #fef3c7; --flint-box-border: 2px solid #f59e0b; --flint-box-border-radius: 12px;"
            >
                Themed via <code>--flint-box-*</code> CSS custom properties
            </flint-box>
            <flint-box
                p="20px"
                borderRadius="8px"
                style="--flint-box-shadow: 0 4px 16px rgba(59,130,246,0.3); --flint-box-bg: #eff6ff;"
            >
                Custom shadow via <code>--flint-box-shadow</code>
            </flint-box>
        </flint-stack>
    `,
};

// ── Dark mode ────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
    render: () => html`
        <div class="flint-theme-dark" style="background:var(--flint-surface-background, #111827); padding:24px; border-radius:12px;">
            <flint-box display="flex" gap="12px" flexWrap="wrap">
                <flint-box bgcolor="primary" color="white" p="16px" borderRadius="8px">
                    Primary bg
                </flint-box>
                <flint-box
                    bgcolor="#1f2937"
                    color="#f9fafb"
                    p="16px"
                    borderRadius="8px"
                    border="1px solid #374151"
                >
                    Dark surface
                </flint-box>
                <flint-box
                    p="16px"
                    borderRadius="8px"
                    boxShadow="0 4px 12px rgba(0,0,0,0.5)"
                    bgcolor="#111827"
                    color="#4b5563"
                    border="1px solid #374151"
                >
                    With shadow
                </flint-box>
            </flint-box>
        </div>
    `,
};
