import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { UiLink } from './ui-link';
import './ui-link';

const meta: Meta = {
    title: 'Navigation/Link',
    component: 'ui-link',
    argTypes: {
        color: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'textPrimary', 'textSecondary', 'inherit'],
        },
        underline: {
            control: { type: 'select' },
            options: ['none', 'hover', 'always'],
        },
        variant: {
            control: { type: 'select' },
            options: ['inherit', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'],
        },
        href: { control: 'text' },
        target: { control: { type: 'select' }, options: ['_self', '_blank', '_parent', '_top'] },
        disabled: { control: 'boolean' },
    },
};
export default meta;

type Story = StoryObj;

const sectionStyles = `
    display: flex; flex-direction: column; gap: 24px;
    padding: 24px; background: #fff;
    border: 1px solid #e2e8f0; border-radius: 8px; font-family: Inter, sans-serif;
`;
const rowStyles = `display: flex; flex-wrap: wrap; align-items: baseline; gap: 16px;`;
const labelStyles = `font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 6px;`;

/* ================================================================== */
/* Basic                                                               */
/* ================================================================== */
export const Basic: Story = {
    args: {
        href: '#',
        color: 'primary',
        underline: 'always',
        variant: 'body1',
        disabled: false,
    },
    render: (args) => html`
        <div style="${sectionStyles}">
            <p>Paragraph with a <ui-link
                href=${args.href}
                .color=${args.color as UiLink['color']}
                .underline=${args.underline as UiLink['underline']}
                .variant=${args.variant as UiLink['variant']}
                ?disabled=${args.disabled}
            >${args.color} link</ui-link> inside it.</p>

            <p>
                <ui-link href="#" color="inherit" variant="body2">color="inherit" variant="body2"</ui-link>
            </p>
        </div>
    `,
};

/* ================================================================== */
/* Colors                                                              */
/* ================================================================== */
export const Colors: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <div>
                <div style="${labelStyles}">Color</div>
                <div style="${rowStyles}">
                    ${(['primary', 'secondary', 'success', 'error', 'warning', 'info', 'textPrimary', 'textSecondary', 'inherit'] as const).map(c => html`
                        <ui-link href="#" .color=${c}>${c}</ui-link>
                    `)}
                </div>
            </div>
        </div>
    `,
};

/* ================================================================== */
/* Underline                                                           */
/* ================================================================== */
export const Underline: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <div>
                <div style="${labelStyles}">underline</div>
                <div style="${rowStyles}">
                    <div>
                        <div style="${labelStyles}">none</div>
                        <ui-link href="#" underline="none">Link</ui-link>
                    </div>
                    <div>
                        <div style="${labelStyles}">hover</div>
                        <ui-link href="#" underline="hover">Link</ui-link>
                    </div>
                    <div>
                        <div style="${labelStyles}">always (default)</div>
                        <ui-link href="#" underline="always">Link</ui-link>
                    </div>
                </div>
            </div>
        </div>
    `,
};

/* ================================================================== */
/* Typography Variants                                                 */
/* ================================================================== */
export const TypographyVariants: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <div>
                <div style="${labelStyles}">Typography Variants</div>
                <div style="display:flex;flex-direction:column;gap:12px;">
                    ${(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'] as const).map(v => html`
                        <div>
                            <span style="font-size:.7rem;color:#94a3b8;width:90px;display:inline-block;">${v}</span>
                            <ui-link href="#" .variant=${v}>${v} link</ui-link>
                        </div>
                    `)}
                </div>
            </div>
        </div>
    `,
};

/* ================================================================== */
/* Security: target="_blank"                                           */
/* ================================================================== */
export const SecurityTarget: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <div>
                <div style="${labelStyles}">target="_blank" — rel automatically set to "noopener noreferrer"</div>
                <ui-link href="https://example.com" target="_blank">
                    Open in new tab (safe)
                </ui-link>
            </div>
            <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:12px;font-size:.875rem;color:#92400e;">
                ⚠️ When <code>target="_blank"</code> is set, <code>rel="noopener noreferrer"</code> is automatically applied
                to prevent reverse tabnapping attacks.
            </div>
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:12px;font-size:.875rem;color:#1e40af;">
                ℹ️ Using <code>rel="noreferrer"</code> also prevents the <em>Referer</em> header from being sent, which may affect analytics.
            </div>
        </div>
    `,
};

/* ================================================================== */
/* Disabled                                                            */
/* ================================================================== */
export const Disabled: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <div style="${rowStyles}">
                <ui-link href="#" disabled>Disabled Link</ui-link>
                <ui-link href="#" color="secondary" disabled>Disabled Secondary</ui-link>
            </div>
        </div>
    `,
};

/* ================================================================== */
/* In Context                                                          */
/* ================================================================== */
export const InContext: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <p style="font-size:1rem;line-height:1.6;color:#374151;">
                Links are <ui-link href="#">inline elements</ui-link> that inherit the font size of their parent.
                You can use <ui-link href="#" color="secondary">different colors</ui-link> and
                <ui-link href="#" underline="hover">underline behaviors</ui-link> to match your design system.
                Always set <code>rel="noopener noreferrer"</code> when using
                <ui-link href="https://example.com" target="_blank">external links</ui-link>.
            </p>
        </div>
    `,
};
