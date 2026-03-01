import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-typography';

const meta: Meta = {
    title: 'Components/Typography',
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
    args: {
        variant: 'body1',
        color: 'textPrimary',
        align: 'left',
        noWrap: false,
        gutterBottom: false,
        paragraph: false,
    },
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
            ${([
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
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
            ${(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'textPrimary', 'textSecondary'] as const).map(c => html`
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
            <div style="width: 300px; border: 1px dashed #e2e8f0; padding: 8px; border-radius: 4px;">
                <ui-typography noWrap>
                    This text is very long and should be truncated with an ellipsis when noWrap is true.
                </ui-typography>
            </div>
            <div style="width: 300px; border: 1px dashed #e2e8f0; padding: 8px; border-radius: 4px;">
                <ui-typography>
                    This text is very long and will wrap normally when noWrap is false.
                </ui-typography>
            </div>
        </div>
    `,
};

/* ================================================================== */
/* With Links                                                          */
/* ================================================================== */
export const WithLinks: Story = {
    render: () => {
        // Dynamically import for demo
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
