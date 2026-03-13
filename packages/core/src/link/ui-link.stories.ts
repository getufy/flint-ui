import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { UiLink } from './ui-link';
import './ui-link';
import '../box/ui-box';
import '../stack/ui-stack';

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
        rel: { control: 'text' },
        label: { control: 'text' },
        download: { control: 'text' },
        disabled: { control: 'boolean' },
    },
    args: {
        href: '#',
        color: 'primary',
        underline: 'always',
        variant: 'body1',
        disabled: false,
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
                <ui-stack direction="column" gap="12px">
                    ${(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'] as const).map(v => html`
                        <div>
                            <span style="font-size:.7rem;color:#94a3b8;width:90px;display:inline-block;">${v}</span>
                            <ui-link href="#" .variant=${v}>${v} link</ui-link>
                        </div>
                    `)}
                </ui-stack>
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
            <ui-box bgcolor="#fffbeb" border="1px solid #fde68a" borderRadius="6px" p="12px" style="font-size: 0.875rem; color: #92400e;">
                ⚠️ When <code>target="_blank"</code> is set, <code>rel="noopener noreferrer"</code> is automatically applied
                to prevent reverse tabnapping attacks.
            </ui-box>
            <ui-box bgcolor="#eff6ff" border="1px solid #bfdbfe" borderRadius="6px" p="12px" style="font-size: 0.875rem; color: #1e40af;">
                ℹ️ Using <code>rel="noreferrer"</code> also prevents the <em>Referer</em> header from being sent, which may affect analytics.
            </ui-box>
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
            <ui-box bgcolor="var(--ui-muted-background, #f8fafc)" border="1px solid #e2e8f0" borderRadius="6px" p="12px" style="font-size:.875rem;color:#475569;">
                Disabled links have no <code>href</code>, <code>tabindex="-1"</code>, and click events are prevented — inaccessible to both mouse and keyboard.
            </ui-box>
        </div>
    `,
};

/* ================================================================== */
/* Rel                                                                 */
/* ================================================================== */
export const Rel: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <div>
                <div style="${labelStyles}">Custom rel values</div>
                <ui-stack direction="column" gap="12px" style="font-size:.875rem;">
                    <div>
                        <span style="${labelStyles}">rel="nofollow" (SEO — tell crawlers not to follow)</span><br>
                        <ui-link href="https://example.com" rel="nofollow">nofollow link</ui-link>
                    </div>
                    <div>
                        <span style="${labelStyles}">rel="sponsored" (paid/affiliate link)</span><br>
                        <ui-link href="https://example.com" rel="sponsored">sponsored link</ui-link>
                    </div>
                    <div>
                        <span style="${labelStyles}">rel="nofollow" + target="_blank" — merges with noopener noreferrer</span><br>
                        <ui-link href="https://example.com" rel="nofollow" target="_blank">nofollow + new tab</ui-link>
                    </div>
                </div>
            </div>
        </div>
    `,
};

/* ================================================================== */
/* Download                                                            */
/* ================================================================== */
export const Download: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <div>
                <div style="${labelStyles}">download prop — triggers file download instead of navigation</div>
                <ui-stack direction="column" gap="12px">
                    <div>
                        <span style="${labelStyles}">download with filename</span><br>
                        <ui-link href="/assets/report.pdf" download="annual-report-2025.pdf">Download Annual Report (PDF)</ui-link>
                    </div>
                    <div>
                        <span style="${labelStyles}">download without filename (uses server filename)</span><br>
                        <ui-link href="/assets/report.pdf" download="">Download Report</ui-link>
                    </div>
                </div>
            </div>
        </div>
    `,
};

/* ================================================================== */
/* Aria Label (Accessibility)                                          */
/* ================================================================== */
export const AriaLabel: Story = {
    render: () => html`
        <div style="${sectionStyles}">
            <div>
                <div style="${labelStyles}">label prop — provides accessible name for icon-only or ambiguous links</div>
                <ui-stack direction="column" gap="16px">
                    <div>
                        <span style="${labelStyles}">Icon-only link with label</span><br>
                        <ui-link href="#" label="Go to homepage">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </ui-link>
                    </div>
                    <div>
                        <span style="${labelStyles}">Ambiguous "Read more" with descriptive label</span><br>
                        <ui-link href="#" label="Read more about our pricing plans">Read more</ui-link>
                    </div>
                </div>
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
