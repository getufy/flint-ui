import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-typography';

const meta: Meta = {
    title: 'Data Display/Typography',
    component: 'ui-typography',
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline', 'inherit'],
        },
        color: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'textPrimary', 'textSecondary', 'inherit'],
        },
        align: {
            control: { type: 'select' },
            options: ['left', 'center', 'right', 'justify'],
        },
        noWrap: { control: 'boolean' },
        gutterBottom: { control: 'boolean' },
        paragraph: { control: 'boolean' },
    },
    args: {
        variant: 'body1',
        color: 'textPrimary',
        align: 'left',
        noWrap: false,
        gutterBottom: false,
        paragraph: false,
    },
};
export default meta;

type Story = StoryObj;

const sectionStyles = `
    padding: 24px; background: #fff;
    border: 1px solid #e2e8f0; border-radius: 8px;
    font-family: Inter, sans-serif; display: flex; flex-direction: column; gap: 8px;
`;

/* ================================================================== */
/* Playground                                                          */
/* ================================================================== */
export const Playground: Story = {
    render: (args) => html`
        <div style="${sectionStyles}">
            <ui-typography
                .variant=${args.variant}
                .color=${args.color}
                .align=${args.align}
                ?noWrap=${args.noWrap}
                ?gutterBottom=${args.gutterBottom}
                ?paragraph=${args.paragraph}
            >
                The quick brown fox jumps over the lazy dog.
            </ui-typography>
        </div>
    `,
};

/* ================================================================== */
/* All Variants                                                        */
/* ================================================================== */
export const Variants: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            ${(['h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'subtitle1', 'subtitle2',
                'body1', 'body2',
                'caption', 'overline',
            ] as const).map(v => html`
                <ui-typography .variant=${v}>${v} — The quick brown fox</ui-typography>
            `)}
        </div>
    `,
};

/* ================================================================== */
/* Colors                                                              */
/* ================================================================== */
export const Colors: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            ${(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'textPrimary', 'textSecondary', 'inherit'] as const).map(c => html`
                <ui-typography .color=${c}>${c}: The quick brown fox jumps over the lazy dog.</ui-typography>
            `)}
        </div>
    `,
};

/* ================================================================== */
/* Alignment                                                           */
/* ================================================================== */
export const Alignment: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            ${(['left', 'center', 'right', 'justify'] as const).map(a => html`
                <ui-typography .align=${a}>align="${a}" — The quick brown fox jumps over the lazy dog.</ui-typography>
            `)}
        </div>
    `,
};

/* ================================================================== */
/* NoWrap                                                              */
/* ================================================================== */
export const NoWrap: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <p style="margin:0 0 4px; font-size:12px; color:#64748b;">noWrap=true (truncated)</p>
            <div style="width: 300px; border: 1px dashed #e2e8f0; padding: 8px; border-radius: 4px;">
                <ui-typography noWrap>
                    This text is very long and should be truncated with an ellipsis when noWrap is true.
                </ui-typography>
            </div>
            <p style="margin:8px 0 4px; font-size:12px; color:#64748b;">noWrap=false (wraps normally)</p>
            <div style="width: 300px; border: 1px dashed #e2e8f0; padding: 8px; border-radius: 4px;">
                <ui-typography>
                    This text is very long and will wrap normally when noWrap is false.
                </ui-typography>
            </div>
        </div>
    `,
};

/* ================================================================== */
/* GutterBottom                                                        */
/* ================================================================== */
export const GutterBottom: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <p style="margin:0 0 4px; font-size:12px; color:#64748b;">gutterBottom=true adds 0.35em margin below each item</p>
            <ui-typography variant="h4" gutterBottom>Heading with gutterBottom</ui-typography>
            <ui-typography variant="body1" gutterBottom>Paragraph text with gutterBottom.</ui-typography>
            <ui-typography variant="body2" gutterBottom>Smaller body text with gutterBottom.</ui-typography>
            <ui-typography variant="caption" gutterBottom>Caption text with gutterBottom.</ui-typography>
            <p style="margin:8px 0 4px; font-size:12px; color:#64748b;">gutterBottom=false (default)</p>
            <ui-typography variant="h4">Heading without gutterBottom</ui-typography>
            <ui-typography variant="body1">Paragraph text without gutterBottom.</ui-typography>
        </div>
    `,
};

/* ================================================================== */
/* Paragraph                                                           */
/* ================================================================== */
export const Paragraph: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <p style="margin:0 0 8px; font-size:12px; color:#64748b;">paragraph=true adds 16px bottom margin</p>
            <ui-typography paragraph>
                This is the first paragraph. The <code>paragraph</code> prop adds a 16px bottom margin,
                making it easy to stack text blocks with natural vertical rhythm.
            </ui-typography>
            <ui-typography paragraph>
                This is the second paragraph. Notice the spacing between paragraphs matches typical
                document reading rhythm.
            </ui-typography>
            <ui-typography>
                This last element has no paragraph prop — no extra bottom margin.
            </ui-typography>
        </div>
    `,
};

/* ================================================================== */
/* Component Override                                                  */
/* ================================================================== */
export const ComponentOverride: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <p style="margin:0 0 8px; font-size:12px; color:#64748b;">
                The <code>component</code> prop overrides the rendered HTML tag while keeping the
                variant styling. Useful for SEO or accessibility when semantic tag must differ from visual style.
            </p>
            <ui-typography variant="h1" .component=${'h3'}>
                h1 style, rendered as &lt;h3&gt; (component="h3")
            </ui-typography>
            <ui-typography variant="subtitle1" .component=${'p'}>
                subtitle1 style, rendered as &lt;p&gt; (component="p")
            </ui-typography>
            <ui-typography variant="body1" .component=${'span'}>
                body1 style, rendered as &lt;span&gt; (component="span")
            </ui-typography>
            <ui-typography variant="body2" .component=${'div'}>
                body2 style, rendered as &lt;div&gt; (component="div")
            </ui-typography>
        </div>
    `,
};

/* ================================================================== */
/* Inherit Variant                                                     */
/* ================================================================== */
export const InheritVariant: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <p style="margin:0 0 8px; font-size:12px; color:#64748b;">
                <code>variant="inherit"</code> renders a &lt;p&gt; tag with no variant class,
                inheriting font size and weight from the parent.
            </p>
            <div style="font-size: 24px; font-weight: 700; color: #3b82f6;">
                Parent with large bold blue text —
                <ui-typography variant="inherit" color="inherit">
                    this child inherits everything.
                </ui-typography>
            </div>
        </div>
    `,
};

/* ================================================================== */
/* Dark Mode                                                           */
/* ================================================================== */
export const DarkMode: Story = {
    render: () => html`
        <div class="ui-theme-dark" style="padding: 24px; background: #09090b; border-radius: 8px; display: flex; flex-direction: column; gap: 8px;">
            ${(['h3', 'subtitle1', 'body1', 'body2', 'caption'] as const).map(v => html`
                <ui-typography .variant=${v}>${v} — Dark mode typography</ui-typography>
            `)}
            <ui-typography color="primary">primary color in dark mode</ui-typography>
            <ui-typography color="secondary">secondary color in dark mode</ui-typography>
            <ui-typography color="textSecondary">textSecondary color in dark mode</ui-typography>
        </div>
    `,
};

/* ================================================================== */
/* With Links                                                          */
/* ================================================================== */
export const WithLinks: Story = {
    render: () => {
        import('../link/ui-link');
        return html`
            <div style="${sectionStyles}">
                <ui-typography variant="h5" gutterBottom>Typography with Links</ui-typography>
                <ui-typography variant="body1">
                    Typography works great as a parent for
                    <ui-link href="#">link components</ui-link>
                    which inherit the parent's font size and weight by default.
                </ui-typography>
                <ui-typography variant="body2" color="textSecondary">
                    You can also use <ui-link href="#" color="inherit" underline="hover">inherit color links</ui-link> inside muted text.
                </ui-typography>
            </div>
        `;
    },
};

/* ================================================================== */
/* Accessibility                                                       */
/* ================================================================== */
export const Accessibility: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <p style="margin:0 0 8px; font-size:12px; color:#64748b;">
                Proper semantic heading hierarchy — h1 → h2 → h3 for screen readers and SEO.
            </p>
            <ui-typography variant="h1">Page Title (h1)</ui-typography>
            <ui-typography variant="h2">Section Heading (h2)</ui-typography>
            <ui-typography variant="h3">Sub-section Heading (h3)</ui-typography>
            <ui-typography variant="body1">Body content under the heading. Use semantic variants for correct document outline.</ui-typography>
            <ui-typography variant="caption" color="textSecondary">Caption or helper text (span).</ui-typography>
        </div>
    `,
};
