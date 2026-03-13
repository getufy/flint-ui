import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../stack/ui-stack.js';

const meta: Meta = {
    title: 'Docs/Theme Tokens',
    parameters: {
        layout: 'padded',
        docs: { description: { component: 'All `--ui-*` CSS custom properties. Override any of these on `:root` (or a scoped selector) to theme the library.' } },
    },
};
export default meta;
type Story = StoryObj;

/* ─── helpers ──────────────────────────────────────────────────────────── */

const swatch = (token: string, label?: string) => html`
    <ui-stack direction="row" alignItems="center" gap="12px" style="margin-bottom:8px;">
        <div style="
            width:40px;height:40px;border-radius:6px;flex-shrink:0;
            background:var(${token});
            border:1px solid rgba(0,0,0,0.08);
        "></div>
        <div>
            <code style="font-size:0.8125rem;">${token}</code>
            ${label ? html`<div style="font-size:0.75rem;color:var(--ui-text-color-muted);margin-top:2px;">${label}</div>` : ''}
        </div>
    </ui-stack>
`;

const radiusSwatch = (token: string, label: string) => html`
    <ui-stack direction="row" alignItems="center" gap="12px" style="margin-bottom:8px;">
        <div style="
            width:48px;height:32px;flex-shrink:0;
            background:var(--ui-primary-color-light);
            border:2px solid var(--ui-primary-color);
            border-radius:var(${token});
        "></div>
        <div>
            <code style="font-size:0.8125rem;">${token}</code>
            <div style="font-size:0.75rem;color:var(--ui-text-color-muted);margin-top:2px;">${label}</div>
        </div>
    </ui-stack>
`;

const shadowSwatch = (token: string, label: string) => html`
    <ui-stack direction="row" alignItems="center" gap="12px" style="margin-bottom:12px;">
        <div style="
            width:48px;height:32px;flex-shrink:0;border-radius:6px;
            background:var(--ui-surface-1);
            box-shadow:var(${token});
        "></div>
        <div>
            <code style="font-size:0.8125rem;">${token}</code>
            <div style="font-size:0.75rem;color:var(--ui-text-color-muted);margin-top:2px;">${label}</div>
        </div>
    </ui-stack>
`;

const section = (title: string, content: unknown) => html`
    <section style="margin-bottom:40px;">
        <h3 style="
            font-size:0.6875rem;font-weight:700;letter-spacing:0.08em;
            text-transform:uppercase;color:var(--ui-text-color-muted);
            border-bottom:1px solid var(--ui-border-color);
            padding-bottom:8px;margin:0 0 16px;
        ">${title}</h3>
        ${content}
    </section>
`;

/* ─── stories ──────────────────────────────────────────────────────────── */

export const QuickRebrand: Story = {
    name: '⚡ Quick Rebrand',
    render: () => html`
        <div style="font-family:var(--ui-font-family);color:var(--ui-text-color);max-width:640px;">
            <p style="color:var(--ui-text-color-muted);margin:0 0 16px;">
                Override these <strong>5 variables</strong> on <code>:root</code> to fully rebrand the library.
                Everything else cascades automatically.
            </p>
            <pre style="
                background:var(--ui-surface-2);border-radius:var(--ui-border-radius-md);
                padding:16px;font-size:0.8125rem;line-height:1.7;overflow-x:auto;
                border:1px solid var(--ui-border-color);margin:0;
            "><code>:root {
  --ui-primary-color:        #your-brand;
  --ui-primary-color-hover:  #your-brand-dark;
  --ui-primary-color-active: #your-brand-darker;
  --ui-border-radius-md:     0.375rem;  /* try 0 for sharp, 0.5rem for rounder */
  --ui-font-family:          'Your Font', sans-serif;
}</code></pre>
        </div>
    `,
};

export const Colors: Story = {
    name: '🎨 Colors',
    render: () => html`
        <div style="font-family:var(--ui-font-family);color:var(--ui-text-color);max-width:720px;display:grid;grid-template-columns:1fr 1fr;gap:0 40px;">
            ${section('Primary', html`
                ${swatch('--ui-primary-color', 'Brand color')}
                ${swatch('--ui-primary-color-hover', 'Hover state')}
                ${swatch('--ui-primary-color-active', 'Active / pressed')}
                ${swatch('--ui-primary-color-light', 'Light tint (10%)')}
                ${swatch('--ui-text-color-on-primary', 'Text on primary bg')}
            `)}
            ${section('Accent', html`
                ${swatch('--ui-accent-color', 'Non-primary tint (violet)')}
                ${swatch('--ui-accent-color-hover', 'Hover')}
                ${swatch('--ui-accent-color-light', 'Light tint (10%)')}
                ${swatch('--ui-accent-foreground', 'Text on accent bg')}
            `)}
            ${section('Destructive / Error', html`
                ${swatch('--ui-destructive-color')}
                ${swatch('--ui-destructive-color-hover')}
                ${swatch('--ui-error-color', 'Alias for destructive')}
                ${swatch('--ui-error-bg')}
                ${swatch('--ui-error-text-color')}
                ${swatch('--ui-error-border-color')}
            `)}
            ${section('Secondary', html`
                ${swatch('--ui-secondary-color')}
                ${swatch('--ui-secondary-color-hover')}
                ${swatch('--ui-secondary-color-active')}
            `)}
            ${section('Status — Success', html`
                ${swatch('--ui-success-color')}
                ${swatch('--ui-success-bg')}
                ${swatch('--ui-success-text-color')}
                ${swatch('--ui-success-border-color')}
            `)}
            ${section('Status — Warning', html`
                ${swatch('--ui-warning-color')}
                ${swatch('--ui-warning-bg')}
                ${swatch('--ui-warning-text-color')}
                ${swatch('--ui-warning-border-color')}
            `)}
            ${section('Status — Info', html`
                ${swatch('--ui-info-icon-color')}
                ${swatch('--ui-info-bg')}
                ${swatch('--ui-info-text-color')}
                ${swatch('--ui-info-border-color')}
            `)}
        </div>
    `,
};

export const Surfaces: Story = {
    name: '🪟 Surfaces',
    render: () => html`
        <div style="font-family:var(--ui-font-family);color:var(--ui-text-color);max-width:480px;">
            ${section('Elevation (light → dark = deeper)', html`
                ${swatch('--ui-background', 'Page / app shell')}
                ${swatch('--ui-surface-1', 'Cards, panels')}
                ${swatch('--ui-surface-2', 'Inputs, subtle backgrounds')}
                ${swatch('--ui-surface-3', 'Selected, active backgrounds')}
                ${swatch('--ui-surface-variant', 'Tinted bg (SVG clock face, etc.)')}
                ${swatch('--ui-muted-background', 'Muted variant backgrounds')}
            `)}
            ${section('Input', html`
                ${swatch('--ui-input-bg', 'Input field background')}
                ${swatch('--ui-input-disabled-bg', 'Disabled field background')}
                ${swatch('--ui-input-readonly-bg', 'Read-only field background')}
            `)}
        </div>
    `,
};

export const Text: Story = {
    name: '✏️ Text',
    render: () => html`
        <div style="font-family:var(--ui-font-family);max-width:480px;">
            ${section('Text colors', html`
                <ui-stack direction="column" gap="6px">
                    ${(['--ui-text-color', '--ui-text-color-muted', '--ui-text-color-subtle', '--ui-text-color-on-primary', '--ui-label-color', '--ui-input-placeholder-color', '--ui-help-text-color'] as const).map(t => html`
                        <ui-stack direction="row" alignItems="center" gap="12px">
                            <span style="color:var(${t});font-size:1.25rem;font-weight:700;width:32px;text-align:center;">Aa</span>
                            <code style="font-size:0.8125rem;color:var(--ui-text-color-muted);">${t}</code>
                        </ui-stack>
                    `)}
                </ui-stack>
            `)}
        </div>
    `,
};

export const Borders: Story = {
    name: '🔲 Borders',
    render: () => html`
        <div style="font-family:var(--ui-font-family);color:var(--ui-text-color);max-width:480px;">
            ${section('Border colors', html`
                ${swatch('--ui-border-color', 'Default border')}
                ${swatch('--ui-input-border-color', 'Input border')}
                ${swatch('--ui-input-border-hover-color', 'Input border on hover')}
                ${swatch('--ui-card-border-color', 'Card border (subtle)')}
            `)}
        </div>
    `,
};

export const Radii: Story = {
    name: '⬛ Border Radius',
    render: () => html`
        <div style="font-family:var(--ui-font-family);color:var(--ui-text-color);max-width:480px;">
            ${section('Radius scale', html`
                ${radiusSwatch('--ui-border-radius-sm', '2px — tiny elements')}
                ${radiusSwatch('--ui-border-radius-md', '6px — buttons, inputs  ← rebrand lever')}
                ${radiusSwatch('--ui-border-radius-lg', '8px — cards, menus')}
                ${radiusSwatch('--ui-border-radius-xl', '12px — modals, popovers')}
                ${radiusSwatch('--ui-border-radius-full', '9999px — pills, chips')}
            `)}
            ${section('Semantic aliases', html`
                <ui-stack direction="column" gap="4px" style="font-size:0.8125rem;color:var(--ui-text-color-muted);">
                    <div><code>--ui-card-border-radius</code> → <code>--ui-border-radius-xl</code></div>
                    <div><code>--ui-input-border-radius</code> → <code>--ui-border-radius-md</code></div>
                </ui-stack>
            `)}
        </div>
    `,
};

export const Shadows: Story = {
    name: '🌫️ Shadows',
    render: () => html`
        <div style="font-family:var(--ui-font-family);color:var(--ui-text-color);max-width:480px;background:var(--ui-surface-2);padding:24px;border-radius:var(--ui-border-radius-lg);">
            ${section('Shadow scale', html`
                ${shadowSwatch('--ui-shadow-sm', 'Subtle lift — chips, badges')}
                ${shadowSwatch('--ui-shadow-md', 'Card elevation')}
                ${shadowSwatch('--ui-shadow-lg', 'Dropdowns, popovers')}
                ${shadowSwatch('--ui-shadow-xl', 'Dialogs, command palette')}
            `)}
        </div>
    `,
};

export const InteractiveOverlays: Story = {
    name: '👆 Interactive Overlays',
    render: () => html`
        <div style="font-family:var(--ui-font-family);color:var(--ui-text-color);max-width:480px;">
            ${section('Hover / active', html`
                <p style="font-size:0.8125rem;color:var(--ui-text-color-muted);margin:0 0 12px;">
                    These are semi-transparent overlays layered on top of the element's background.
                    They automatically work on any surface color.
                </p>
                ${swatch('--ui-hover-color', 'rgba(0,0,0,0.04) light / rgba(255,255,255,0.06) dark')}
                ${swatch('--ui-active-color', 'rgba(0,0,0,0.08) light / rgba(255,255,255,0.12) dark')}
                ${swatch('--ui-primary-focus-ring', 'Focus ring — primary (20% opacity)')}
                ${swatch('--ui-error-focus-ring', 'Focus ring — error (20% opacity)')}
            `)}
            ${section('Backdrop', html`
                ${swatch('--ui-backdrop-color', 'Dialog/drawer overlay')}
            `)}
        </div>
    `,
};

export const Typography: Story = {
    name: '🔤 Typography',
    render: () => html`
        <div style="font-family:var(--ui-font-family);color:var(--ui-text-color);max-width:600px;">
            ${section('Font family', html`
                <p style="font-size:0.8125rem;color:var(--ui-text-color-muted);margin:0 0 8px;">
                    Override <code>--ui-font-family</code> on <code>:root</code> to switch the typeface globally.
                </p>
                <code style="font-size:0.8125rem;">--ui-font-family</code>
                <div style="margin-top:8px;font-family:var(--ui-font-family);font-size:1.25rem;">
                    The quick brown fox jumps over the lazy dog. 0123456789
                </div>
            `)}
        </div>
    `,
};

export const WCAGContrast: Story = {
    name: '♿ WCAG Contrast Notes',
    render: () => html`
        <div style="font-family:var(--ui-font-family);color:var(--ui-text-color);max-width:640px;">
            <p style="color:var(--ui-text-color-muted);margin:0 0 16px;font-size:0.875rem;">
                Contrast ratios for key token pairs. WCAG AA requires <strong>4.5:1</strong> for normal text and
                <strong>3:1</strong> for large text / UI components (≥18pt or 14pt bold).
            </p>

            <table style="width:100%;border-collapse:collapse;font-size:0.8125rem;">
                <thead>
                    <tr style="border-bottom:2px solid var(--ui-border-color);">
                        <th style="text-align:left;padding:8px 12px;color:var(--ui-text-color-muted);font-weight:600;">Pair</th>
                        <th style="text-align:right;padding:8px 12px;color:var(--ui-text-color-muted);font-weight:600;">Ratio</th>
                        <th style="text-align:center;padding:8px 12px;color:var(--ui-text-color-muted);font-weight:600;">Normal AA</th>
                        <th style="text-align:center;padding:8px 12px;color:var(--ui-text-color-muted);font-weight:600;">Large AA</th>
                    </tr>
                </thead>
                <tbody>
                    ${[
                        ['--ui-text-color on --ui-background', '18.1 : 1', '✅', '✅'],
                        ['--ui-text-color-muted on --ui-background', '4.7 : 1', '✅', '✅'],
                        ['--ui-text-color-subtle on --ui-background', '2.8 : 1', '⚠️ hint/disabled', '✅ large'],
                        ['--ui-text-color-on-primary on --ui-primary-color (blue-500)', '3.4 : 1', '⚠️ use for large text / buttons only', '✅'],
                        ['--ui-text-color on --ui-surface-2', '17.5 : 1', '✅', '✅'],
                        ['--ui-text-color on --ui-surface-3', '14.8 : 1', '✅', '✅'],
                        ['dark --ui-text-color on --ui-background', '19.2 : 1', '✅', '✅'],
                        ['dark --ui-text-color-muted on --ui-background', '5.1 : 1', '✅', '✅'],
                    ].map(([pair, ratio, normal, large]) => html`
                        <tr style="border-bottom:1px solid var(--ui-border-color);">
                            <td style="padding:10px 12px;"><code>${pair}</code></td>
                            <td style="padding:10px 12px;text-align:right;font-weight:600;">${ratio}</td>
                            <td style="padding:10px 12px;text-align:center;">${normal}</td>
                            <td style="padding:10px 12px;text-align:center;">${large}</td>
                        </tr>
                    `)}
                </tbody>
            </table>

            <p style="font-size:0.75rem;color:var(--ui-text-color-subtle);margin:12px 0 0;">
                ⚠️ <code>--ui-text-color-on-primary</code> (white) on the default <code>--ui-primary-color</code> (blue-500)
                yields 3.4:1 — passing for large text/buttons (WCAG AA 3:1) but not for small body text.
                If you need normal-text compliance, override <code>--ui-primary-color</code> to a darker shade
                (e.g. blue-600 <code>#2563eb</code> → 4.8:1 ✅) or swap the foreground to a dark color.
            </p>
        </div>
    `,
};
