import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../stack/flint-stack.js';

const meta: Meta = {
    title: 'Docs/Theme Tokens',
    parameters: {
        layout: 'padded',
        docs: { description: { component: 'All `--flint-*` CSS custom properties. Override any of these on `:root` (or a scoped selector) to theme the library.' } },
    },
};
export default meta;
type Story = StoryObj;

/* ─── helpers ──────────────────────────────────────────────────────────── */

const swatch = (token: string, label?: string) => html`
    <flint-stack direction="row" alignItems="center" gap="12px" style="margin-bottom:8px;">
        <div style="
            width:40px;height:40px;border-radius:6px;flex-shrink:0;
            background:var(${token});
            border:1px solid rgba(0,0,0,0.08);
        "></div>
        <div>
            <code style="font-size:0.8125rem;">${token}</code>
            ${label ? html`<div style="font-size:0.75rem;color:var(--flint-text-color-muted);margin-top:2px;">${label}</div>` : ''}
        </div>
    </flint-stack>
`;

const radiusSwatch = (token: string, label: string) => html`
    <flint-stack direction="row" alignItems="center" gap="12px" style="margin-bottom:8px;">
        <div style="
            width:48px;height:32px;flex-shrink:0;
            background:var(--flint-primary-color-light);
            border:2px solid var(--flint-primary-color);
            border-radius:var(${token});
        "></div>
        <div>
            <code style="font-size:0.8125rem;">${token}</code>
            <div style="font-size:0.75rem;color:var(--flint-text-color-muted);margin-top:2px;">${label}</div>
        </div>
    </flint-stack>
`;

const shadowSwatch = (token: string, label: string) => html`
    <flint-stack direction="row" alignItems="center" gap="12px" style="margin-bottom:12px;">
        <div style="
            width:48px;height:32px;flex-shrink:0;border-radius:6px;
            background:var(--flint-surface-1);
            box-shadow:var(${token});
        "></div>
        <div>
            <code style="font-size:0.8125rem;">${token}</code>
            <div style="font-size:0.75rem;color:var(--flint-text-color-muted);margin-top:2px;">${label}</div>
        </div>
    </flint-stack>
`;

const section = (title: string, content: unknown) => html`
    <section style="margin-bottom:40px;">
        <h3 style="
            font-size:0.6875rem;font-weight:700;letter-spacing:0.08em;
            text-transform:uppercase;color:var(--flint-text-color-muted);
            border-bottom:1px solid var(--flint-border-color);
            padding-bottom:8px;margin:0 0 16px;
        ">${title}</h3>
        ${content}
    </section>
`;

/* ─── stories ──────────────────────────────────────────────────────────── */

export const QuickRebrand: Story = {
    name: '⚡ Quick Rebrand',
    render: () => html`
        <div style="font-family:var(--flint-font-family);color:var(--flint-text-color);max-width:640px;">
            <p style="color:var(--flint-text-color-muted);margin:0 0 16px;">
                Override these <strong>5 variables</strong> on <code>:root</code> to fully rebrand the library.
                Everything else cascades automatically.
            </p>
            <pre style="
                background:var(--flint-surface-2);border-radius:var(--flint-border-radius-md);
                padding:16px;font-size:0.8125rem;line-height:1.7;overflow-x:auto;
                border:1px solid var(--flint-border-color);margin:0;
            "><code>:root {
  --flint-primary-color:        #your-brand;
  --flint-primary-color-hover:  #your-brand-dark;
  --flint-primary-color-active: #your-brand-darker;
  --flint-border-radius-md:     0.375rem;  /* try 0 for sharp, 0.5rem for rounder */
  --flint-font-family:          'Your Font', sans-serif;
}</code></pre>
        </div>
    `,
};

export const Colors: Story = {
    name: '🎨 Colors',
    render: () => html`
        <div style="font-family:var(--flint-font-family);color:var(--flint-text-color);max-width:720px;display:grid;grid-template-columns:1fr 1fr;gap:0 40px;">
            ${section('Primary', html`
                ${swatch('--flint-primary-color', 'Brand color')}
                ${swatch('--flint-primary-color-hover', 'Hover state')}
                ${swatch('--flint-primary-color-active', 'Active / pressed')}
                ${swatch('--flint-primary-color-light', 'Light tint (10%)')}
                ${swatch('--flint-text-color-on-primary', 'Text on primary bg')}
            `)}
            ${section('Accent', html`
                ${swatch('--flint-accent-color', 'Non-primary tint (violet)')}
                ${swatch('--flint-accent-color-hover', 'Hover')}
                ${swatch('--flint-accent-color-light', 'Light tint (10%)')}
                ${swatch('--flint-accent-foreground', 'Text on accent bg')}
            `)}
            ${section('Destructive / Error', html`
                ${swatch('--flint-destructive-color')}
                ${swatch('--flint-destructive-color-hover')}
                ${swatch('--flint-error-color', 'Alias for destructive')}
                ${swatch('--flint-error-bg')}
                ${swatch('--flint-error-text-color')}
                ${swatch('--flint-error-border-color')}
            `)}
            ${section('Secondary', html`
                ${swatch('--flint-secondary-color')}
                ${swatch('--flint-secondary-color-hover')}
                ${swatch('--flint-secondary-color-active')}
            `)}
            ${section('Status — Success', html`
                ${swatch('--flint-success-color')}
                ${swatch('--flint-success-bg')}
                ${swatch('--flint-success-text-color')}
                ${swatch('--flint-success-border-color')}
            `)}
            ${section('Status — Warning', html`
                ${swatch('--flint-warning-color')}
                ${swatch('--flint-warning-bg')}
                ${swatch('--flint-warning-text-color')}
                ${swatch('--flint-warning-border-color')}
            `)}
            ${section('Status — Info', html`
                ${swatch('--flint-info-icon-color')}
                ${swatch('--flint-info-bg')}
                ${swatch('--flint-info-text-color')}
                ${swatch('--flint-info-border-color')}
            `)}
        </div>
    `,
};

export const Surfaces: Story = {
    name: '🪟 Surfaces',
    render: () => html`
        <div style="font-family:var(--flint-font-family);color:var(--flint-text-color);max-width:480px;">
            ${section('Elevation (light → dark = deeper)', html`
                ${swatch('--flint-background', 'Page / app shell')}
                ${swatch('--flint-surface-1', 'Cards, panels')}
                ${swatch('--flint-surface-2', 'Inputs, subtle backgrounds')}
                ${swatch('--flint-surface-3', 'Selected, active backgrounds')}
                ${swatch('--flint-surface-variant', 'Tinted bg (SVG clock face, etc.)')}
                ${swatch('--flint-muted-background', 'Muted variant backgrounds')}
            `)}
            ${section('Input', html`
                ${swatch('--flint-input-bg', 'Input field background')}
                ${swatch('--flint-input-disabled-bg', 'Disabled field background')}
                ${swatch('--flint-input-readonly-bg', 'Read-only field background')}
            `)}
        </div>
    `,
};

export const Text: Story = {
    name: '✏️ Text',
    render: () => html`
        <div style="font-family:var(--flint-font-family);max-width:480px;">
            ${section('Text colors', html`
                <flint-stack direction="column" gap="6px">
                    ${(['--flint-text-color', '--flint-text-color-muted', '--flint-text-color-subtle', '--flint-text-color-on-primary', '--flint-label-color', '--flint-input-placeholder-color', '--flint-help-text-color'] as const).map(t => html`
                        <flint-stack direction="row" alignItems="center" gap="12px">
                            <span style="color:var(${t});font-size:1.25rem;font-weight:700;width:32px;text-align:center;">Aa</span>
                            <code style="font-size:0.8125rem;color:var(--flint-text-color-muted);">${t}</code>
                        </flint-stack>
                    `)}
                </flint-stack>
            `)}
        </div>
    `,
};

export const Borders: Story = {
    name: '🔲 Borders',
    render: () => html`
        <div style="font-family:var(--flint-font-family);color:var(--flint-text-color);max-width:480px;">
            ${section('Border colors', html`
                ${swatch('--flint-border-color', 'Default border')}
                ${swatch('--flint-input-border-color', 'Input border')}
                ${swatch('--flint-input-border-hover-color', 'Input border on hover')}
                ${swatch('--flint-card-border-color', 'Card border (subtle)')}
            `)}
        </div>
    `,
};

export const Radii: Story = {
    name: '⬛ Border Radius',
    render: () => html`
        <div style="font-family:var(--flint-font-family);color:var(--flint-text-color);max-width:480px;">
            ${section('Radius scale', html`
                ${radiusSwatch('--flint-border-radius-sm', '2px — tiny elements')}
                ${radiusSwatch('--flint-border-radius-md', '6px — buttons, inputs  ← rebrand lever')}
                ${radiusSwatch('--flint-border-radius-lg', '8px — cards, menus')}
                ${radiusSwatch('--flint-border-radius-xl', '12px — modals, popovers')}
                ${radiusSwatch('--flint-border-radius-full', '9999px — pills, chips')}
            `)}
            ${section('Semantic aliases', html`
                <flint-stack direction="column" gap="4px" style="font-size:0.8125rem;color:var(--flint-text-color-muted);">
                    <div><code>--flint-card-border-radius</code> → <code>--flint-border-radius-xl</code></div>
                    <div><code>--flint-input-border-radius</code> → <code>--flint-border-radius-md</code></div>
                </flint-stack>
            `)}
        </div>
    `,
};

export const Shadows: Story = {
    name: '🌫️ Shadows',
    render: () => html`
        <div style="font-family:var(--flint-font-family);color:var(--flint-text-color);max-width:480px;background:var(--flint-surface-2);padding:24px;border-radius:var(--flint-border-radius-lg);">
            ${section('Shadow scale', html`
                ${shadowSwatch('--flint-shadow-sm', 'Subtle lift — chips, badges')}
                ${shadowSwatch('--flint-shadow-md', 'Card elevation')}
                ${shadowSwatch('--flint-shadow-lg', 'Dropdowns, popovers')}
                ${shadowSwatch('--flint-shadow-xl', 'Dialogs, command palette')}
            `)}
        </div>
    `,
};

export const InteractiveOverlays: Story = {
    name: '👆 Interactive Overlays',
    render: () => html`
        <div style="font-family:var(--flint-font-family);color:var(--flint-text-color);max-width:480px;">
            ${section('Hover / active', html`
                <p style="font-size:0.8125rem;color:var(--flint-text-color-muted);margin:0 0 12px;">
                    These are semi-transparent overlays layered on top of the element's background.
                    They automatically work on any surface color.
                </p>
                ${swatch('--flint-hover-color', 'rgba(0,0,0,0.04) light / rgba(255,255,255,0.06) dark')}
                ${swatch('--flint-active-color', 'rgba(0,0,0,0.08) light / rgba(255,255,255,0.12) dark')}
                ${swatch('--flint-primary-focus-ring', 'Focus ring — primary (20% opacity)')}
                ${swatch('--flint-error-focus-ring', 'Focus ring — error (20% opacity)')}
            `)}
            ${section('Backdrop', html`
                ${swatch('--flint-backdrop-color', 'Dialog/drawer overlay')}
            `)}
        </div>
    `,
};

export const Typography: Story = {
    name: '🔤 Typography',
    render: () => html`
        <div style="font-family:var(--flint-font-family);color:var(--flint-text-color);max-width:600px;">
            ${section('Font family', html`
                <p style="font-size:0.8125rem;color:var(--flint-text-color-muted);margin:0 0 8px;">
                    Override <code>--flint-font-family</code> on <code>:root</code> to switch the typeface globally.
                </p>
                <code style="font-size:0.8125rem;">--flint-font-family</code>
                <div style="margin-top:8px;font-family:var(--flint-font-family);font-size:1.25rem;">
                    The quick brown fox jumps over the lazy dog. 0123456789
                </div>
            `)}
        </div>
    `,
};

export const WCAGContrast: Story = {
    name: '♿ WCAG Contrast Notes',
    render: () => html`
        <div style="font-family:var(--flint-font-family);color:var(--flint-text-color);max-width:640px;">
            <p style="color:var(--flint-text-color-muted);margin:0 0 16px;font-size:0.875rem;">
                Contrast ratios for key token pairs. WCAG AA requires <strong>4.5:1</strong> for normal text and
                <strong>3:1</strong> for large text / UI components (≥18pt or 14pt bold).
            </p>

            <table style="width:100%;border-collapse:collapse;font-size:0.8125rem;">
                <thead>
                    <tr style="border-bottom:2px solid var(--flint-border-color);">
                        <th style="text-align:left;padding:8px 12px;color:var(--flint-text-color-muted);font-weight:600;">Pair</th>
                        <th style="text-align:right;padding:8px 12px;color:var(--flint-text-color-muted);font-weight:600;">Ratio</th>
                        <th style="text-align:center;padding:8px 12px;color:var(--flint-text-color-muted);font-weight:600;">Normal AA</th>
                        <th style="text-align:center;padding:8px 12px;color:var(--flint-text-color-muted);font-weight:600;">Large AA</th>
                    </tr>
                </thead>
                <tbody>
                    ${[
                        ['--flint-text-color on --flint-background', '18.1 : 1', '✅', '✅'],
                        ['--flint-text-color-muted on --flint-background', '4.7 : 1', '✅', '✅'],
                        ['--flint-text-color-subtle on --flint-background', '2.8 : 1', '⚠️ hint/disabled', '✅ large'],
                        ['--flint-text-color-on-primary on --flint-primary-color (blue-500)', '3.4 : 1', '⚠️ use for large text / buttons only', '✅'],
                        ['--flint-text-color on --flint-surface-2', '17.5 : 1', '✅', '✅'],
                        ['--flint-text-color on --flint-surface-3', '14.8 : 1', '✅', '✅'],
                        ['dark --flint-text-color on --flint-background', '19.2 : 1', '✅', '✅'],
                        ['dark --flint-text-color-muted on --flint-background', '5.1 : 1', '✅', '✅'],
                    ].map(([pair, ratio, normal, large]) => html`
                        <tr style="border-bottom:1px solid var(--flint-border-color);">
                            <td style="padding:10px 12px;"><code>${pair}</code></td>
                            <td style="padding:10px 12px;text-align:right;font-weight:600;">${ratio}</td>
                            <td style="padding:10px 12px;text-align:center;">${normal}</td>
                            <td style="padding:10px 12px;text-align:center;">${large}</td>
                        </tr>
                    `)}
                </tbody>
            </table>

            <p style="font-size:0.75rem;color:var(--flint-text-color-subtle);margin:12px 0 0;">
                ⚠️ <code>--flint-text-color-on-primary</code> (white) on the default <code>--flint-primary-color</code> (blue-500)
                yields 3.4:1 — passing for large text/buttons (WCAG AA 3:1) but not for small body text.
                If you need normal-text compliance, override <code>--flint-primary-color</code> to a darker shade
                (e.g. blue-600 <code>#2563eb</code> → 4.8:1 ✅) or swap the foreground to a dark color.
            </p>
        </div>
    `,
};
