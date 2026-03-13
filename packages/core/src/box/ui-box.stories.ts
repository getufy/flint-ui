import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-box';
import '../stack/ui-stack';

const meta: Meta = {
    title: 'Layout/Box',
    component: 'ui-box',
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
        <ui-box
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
        </ui-box>
    `,
};

// ── Basic ────────────────────────────────────────────────────────────────────

export const Basic: Story = {
    render: (args) => html`
        <ui-box
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
        </ui-box>
    `,
};

// ── Nested ───────────────────────────────────────────────────────────────────

export const Nested: Story = {
    render: () => html`
        <ui-box bgcolor="#f5f5f5" p="24px" borderRadius="12px">
            <ui-box bgcolor="primary" color="white" p="12px" borderRadius="6px" mb="12px">
                Header (Box as section header)
            </ui-box>
            <ui-box bgcolor="white" p="12px" borderRadius="6px" border="1px solid #e0e0e0">
                Content area (nested Box)
            </ui-box>
        </ui-box>
    `,
};

// ── Flex row ─────────────────────────────────────────────────────────────────

export const FlexRow: Story = {
    args: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', p: '16px', border: '1px solid #ddd', borderRadius: '8px', bgcolor: '', color: '' },
    render: (args) => html`
        <ui-box
            .display=${args.display || ''}
            .justifyContent=${args.justifyContent || ''}
            .alignItems=${args.alignItems || ''}
            .gap=${args.gap || ''}
            .p=${args.p || ''}
            .border=${args.border || ''}
            .borderRadius=${args.borderRadius || ''}
        >
            <ui-box>Left</ui-box>
            <ui-box>Center</ui-box>
            <ui-box>Right</ui-box>
        </ui-box>
    `,
};

// ── Flex column ──────────────────────────────────────────────────────────────

export const FlexColumn: Story = {
    render: () => html`
        <ui-box
            display="flex"
            flexDirection="column"
            gap="8px"
            p="16px"
            bgcolor="#f9f9f9"
            borderRadius="8px"
            width="200px"
        >
            <ui-box bgcolor="primary" color="white" p="8px" borderRadius="4px">Row 1</ui-box>
            <ui-box bgcolor="primary" color="white" p="8px" borderRadius="4px">Row 2</ui-box>
            <ui-box bgcolor="primary" color="white" p="8px" borderRadius="4px">Row 3</ui-box>
        </ui-box>
    `,
};

// ── Flex wrap ────────────────────────────────────────────────────────────────

export const FlexWrap: Story = {
    render: () => html`
        <ui-box
            display="flex"
            flexWrap="wrap"
            gap="8px"
            p="16px"
            bgcolor="#f5f5f5"
            borderRadius="8px"
        >
            ${[1, 2, 3, 4, 5, 6].map(n => html`
                <ui-box
                    bgcolor="primary"
                    color="white"
                    p="12px"
                    borderRadius="4px"
                    flexBasis="calc(33% - 8px)"
                    flexGrow="1"
                >
                    Item ${n}
                </ui-box>
            `)}
        </ui-box>
    `,
};

// ── Dimensions ───────────────────────────────────────────────────────────────

export const Dimensions: Story = {
    render: () => html`
        <ui-box
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
        </ui-box>
    `,
};

// ── Shadow ───────────────────────────────────────────────────────────────────

export const Shadows: Story = {
    render: () => html`
        <ui-box display="flex" gap="24px" p="32px" flexWrap="wrap">
            <ui-box
                p="16px"
                borderRadius="8px"
                boxShadow="0 1px 3px rgba(0,0,0,0.12)"
                bgcolor="white"
                width="140px"
            >
                Shadow sm
            </ui-box>
            <ui-box
                p="16px"
                borderRadius="8px"
                boxShadow="0 4px 12px rgba(0,0,0,0.15)"
                bgcolor="white"
                width="140px"
            >
                Shadow md
            </ui-box>
            <ui-box
                p="16px"
                borderRadius="8px"
                boxShadow="0 8px 24px rgba(0,0,0,0.18)"
                bgcolor="white"
                width="140px"
            >
                Shadow lg
            </ui-box>
        </ui-box>
    `,
};

// ── Spacing showcase ─────────────────────────────────────────────────────────

export const SpacingShowcase: Story = {
    render: () => html`
        <ui-box display="flex" flexDirection="column" gap="12px" p="24px" bgcolor="#f9fafb" borderRadius="8px">
            <ui-box bgcolor="white" border="1px dashed #ccc" borderRadius="4px" p="12px">
                <strong>p="12px"</strong> — uniform padding
            </ui-box>
            <ui-box bgcolor="white" border="1px dashed #ccc" borderRadius="4px" px="24px" py="8px">
                <strong>px="24px" py="8px"</strong> — axis shorthands
            </ui-box>
            <ui-box bgcolor="white" border="1px dashed #ccc" borderRadius="4px" pt="4px" pr="16px" pb="12px" pl="8px">
                <strong>pt / pr / pb / pl</strong> — all four sides individually
            </ui-box>
        </ui-box>
    `,
};

// ── Component prop ───────────────────────────────────────────────────────────

export const AsSemantic: Story = {
    render: () => html`
        <ui-box component="article" p="20px" bgcolor="white" border="1px solid #e0e0e0" borderRadius="8px">
            <ui-box component="header" pb="12px" mb="12px" border-bottom="1px solid #eee">
                <strong>Article header</strong> (rendered as &lt;header&gt;)
            </ui-box>
            <ui-box component="p" color="#555">
                This paragraph is rendered as a &lt;p&gt; element. Inspect the DOM to verify the semantic tags.
            </ui-box>
        </ui-box>
    `,
};

// ── CSS custom properties ────────────────────────────────────────────────────

export const CssCustomProperties: Story = {
    render: () => html`
        <ui-stack direction="row" gap="16px" style="flex-wrap:wrap;">
            <ui-box
                p="20px"
                borderRadius="8px"
                style="--ui-box-bg: #fef3c7; --ui-box-border: 2px solid #f59e0b; --ui-box-border-radius: 12px;"
            >
                Themed via <code>--ui-box-*</code> CSS custom properties
            </ui-box>
            <ui-box
                p="20px"
                borderRadius="8px"
                style="--ui-box-shadow: 0 4px 16px rgba(59,130,246,0.3); --ui-box-bg: #eff6ff;"
            >
                Custom shadow via <code>--ui-box-shadow</code>
            </ui-box>
        </ui-stack>
    `,
};

// ── Dark mode ────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
    render: () => html`
        <div class="ui-theme-dark" style="background:var(--ui-surface-background, #111827); padding:24px; border-radius:12px;">
            <ui-box display="flex" gap="12px" flexWrap="wrap">
                <ui-box bgcolor="primary" color="white" p="16px" borderRadius="8px">
                    Primary bg
                </ui-box>
                <ui-box
                    bgcolor="#1f2937"
                    color="#f9fafb"
                    p="16px"
                    borderRadius="8px"
                    border="1px solid #374151"
                >
                    Dark surface
                </ui-box>
                <ui-box
                    p="16px"
                    borderRadius="8px"
                    boxShadow="0 4px 12px rgba(0,0,0,0.5)"
                    bgcolor="#111827"
                    color="#e5e7eb"
                    border="1px solid #374151"
                >
                    With shadow
                </ui-box>
            </ui-box>
        </div>
    `,
};
