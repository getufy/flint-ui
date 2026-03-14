import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FlintLink } from './flint-link';
import './flint-link';
import '../box/flint-box';
import '../stack/flint-stack';

const meta: Meta = {
    title: 'Navigation/Link',
    component: 'flint-link',
    parameters: {
        docs: {
            description: {
                component: `
The Link component allows you to easily customize anchor elements with theme colors and typography styles.

- **Tag**: \`<flint-link>\`
- **Class**: \`FlintLink\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`href\` | \`href\` | \`string\` | \`''\` | The URL of the link. |
| \`target\` | \`target\` | \`'_self' \\| '_blank' \\| '_parent' \\| '_top'\` | \`'_self'\` | Where to open the link. |
| \`rel\` | \`rel\` | \`string\` | \`''\` | Specifies the relationship of the target object. |
| \`color\` | \`color\` | \`\\| 'primary' \\| 'secondary' \\| 'success' \\| 'error' \\| 'warning' \\| 'info'         \\| 'textPrimary' \\| 'textSecondary' \\| 'inherit'\` | \`'primary'\` | The color of the link. |
| \`underline\` | \`underline\` | \`'none' \\| 'hover' \\| 'always'\` | \`'always'\` | Controls the underline behavior. |
| \`variant\` | \`variant\` | \`\\| 'inherit' \\| 'h1' \\| 'h2' \\| 'h3' \\| 'h4' \\| 'h5' \\| 'h6'         \\| 'subtitle1' \\| 'subtitle2' \\| 'body1' \\| 'body2' \\| 'caption' \\| 'overline'\` | \`'inherit'\` | Applies typography variant styles. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | If true, the link is disabled. |
| \`download\` | \`download\` | \`string\` | — | The download attribute. |
| \`label\` | \`label\` | \`string\` | — | The ARIA label. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`click\` | — | Native click event. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Link text or content. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-link-color\` | — |
| \`--flint-link-color-visited\` | — |
| \`--flint-link-color-hover\` | \`var(--flint-primary-color-hover)\` |
| \`--flint-primary-color\` | — |
| \`--flint-primary-color-hover\` | — |
| \`--flint-secondary-color\` | — |
| \`--flint-font-family\` | — |
| \`--flint-success-color\` | — |
| \`--flint-error-color\` | — |
| \`--flint-warning-color\` | — |
| \`--flint-info-icon-color\` | — |
| \`--flint-text-color\` | — |
| \`--flint-text-color-muted\` | — |
                `,
            },
        },
    },
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
const labelStyles = `font-size: 0.7rem; color: #475569; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 6px;`;

/* ================================================================== */
/* Basic                                                               */
/* ================================================================== */
export const Basic: Story = {
    render: (args) => html`
        <div style="${sectionStyles}">
            <p>Paragraph with a <flint-link
                href=${args.href}
                .color=${args.color as FlintLink['color']}
                .underline=${args.underline as FlintLink['underline']}
                .variant=${args.variant as FlintLink['variant']}
                ?disabled=${args.disabled}
            >${args.color} link</flint-link> inside it.</p>

            <p>
                <flint-link href="#" color="inherit" variant="body2">color="inherit" variant="body2"</flint-link>
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
                        <flint-link href="#" .color=${c}>${c}</flint-link>
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
                        <flint-link href="#" underline="none">Link</flint-link>
                    </div>
                    <div>
                        <div style="${labelStyles}">hover</div>
                        <flint-link href="#" underline="hover">Link</flint-link>
                    </div>
                    <div>
                        <div style="${labelStyles}">always (default)</div>
                        <flint-link href="#" underline="always">Link</flint-link>
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
                <flint-stack direction="column" gap="12px">
                    ${(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'] as const).map(v => html`
                        <div>
                            <span style="font-size:.7rem;color:#475569;width:90px;display:inline-block;">${v}</span>
                            <flint-link href="#" .variant=${v}>${v} link</flint-link>
                        </div>
                    `)}
                </flint-stack>
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
                <flint-link href="https://example.com" target="_blank">
                    Open in new tab (safe)
                </flint-link>
            </div>
            <flint-box bgcolor="#fffbeb" border="1px solid #fde68a" borderRadius="6px" p="12px" style="font-size: 0.875rem; color: #92400e;">
                ⚠️ When <code>target="_blank"</code> is set, <code>rel="noopener noreferrer"</code> is automatically applied
                to prevent reverse tabnapping attacks.
            </flint-box>
            <flint-box bgcolor="#eff6ff" border="1px solid #bfdbfe" borderRadius="6px" p="12px" style="font-size: 0.875rem; color: #1e40af;">
                ℹ️ Using <code>rel="noreferrer"</code> also prevents the <em>Referer</em> header from being sent, which may affect analytics.
            </flint-box>
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
                <flint-link href="#" disabled>Disabled Link</flint-link>
                <flint-link href="#" color="secondary" disabled>Disabled Secondary</flint-link>
            </div>
            <flint-box bgcolor="var(--flint-muted-background, #f8fafc)" border="1px solid #e2e8f0" borderRadius="6px" p="12px" style="font-size:.875rem;color:#475569;">
                Disabled links have no <code>href</code>, <code>tabindex="-1"</code>, and click events are prevented — inaccessible to both mouse and keyboard.
            </flint-box>
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
                <flint-stack direction="column" gap="12px" style="font-size:.875rem;">
                    <div>
                        <span style="${labelStyles}">rel="nofollow" (SEO — tell crawlers not to follow)</span><br>
                        <flint-link href="https://example.com" rel="nofollow">nofollow link</flint-link>
                    </div>
                    <div>
                        <span style="${labelStyles}">rel="sponsored" (paid/affiliate link)</span><br>
                        <flint-link href="https://example.com" rel="sponsored">sponsored link</flint-link>
                    </div>
                    <div>
                        <span style="${labelStyles}">rel="nofollow" + target="_blank" — merges with noopener noreferrer</span><br>
                        <flint-link href="https://example.com" rel="nofollow" target="_blank">nofollow + new tab</flint-link>
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
                <flint-stack direction="column" gap="12px">
                    <div>
                        <span style="${labelStyles}">download with filename</span><br>
                        <flint-link href="/assets/report.pdf" download="annual-report-2025.pdf">Download Annual Report (PDF)</flint-link>
                    </div>
                    <div>
                        <span style="${labelStyles}">download without filename (uses server filename)</span><br>
                        <flint-link href="/assets/report.pdf" download="">Download Report</flint-link>
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
                <flint-stack direction="column" gap="16px">
                    <div>
                        <span style="${labelStyles}">Icon-only link with label</span><br>
                        <flint-link href="#" label="Go to homepage">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </flint-link>
                    </div>
                    <div>
                        <span style="${labelStyles}">Ambiguous "Read more" with descriptive label</span><br>
                        <flint-link href="#" label="Read more about our pricing plans">Read more</flint-link>
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
                Links are <flint-link href="#">inline elements</flint-link> that inherit the font size of their parent.
                You can use <flint-link href="#" color="secondary">different colors</flint-link> and
                <flint-link href="#" underline="hover">underline behaviors</flint-link> to match your design system.
                Always set <code>rel="noopener noreferrer"</code> when using
                <flint-link href="https://example.com" target="_blank">external links</flint-link>.
            </p>
        </div>
    `,
};
