import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-input-otp.js';
import type { UiInputOtp } from './ui-input-otp.js';

type UiInputOtpEl = UiInputOtp;

const meta: Meta = {
    title: 'Inputs/Input OTP',
    component: 'ui-input-otp',
    parameters: {
        docs: {
            description: {
                component: `
Accessible one-time password input with copy/paste support.

### Components
- **\`ui-input-otp\`** — Root. Manages a hidden native \`<input>\` and syncs character slots.
  Fires \`ui-otp-change\` on every keystroke and \`ui-otp-complete\` when all slots are filled.
- **\`ui-input-otp-group\`** — Visual wrapper that renders slots inline with shared borders.
- **\`ui-input-otp-separator\`** — Horizontal bar divider placed between groups.
- **\`ui-input-otp-slot\`** — Individual character cell. Set \`index\` to its position.

### Usage
\`\`\`html
<ui-input-otp max-length="6">
  <ui-input-otp-group>
    <ui-input-otp-slot index="0"></ui-input-otp-slot>
    <ui-input-otp-slot index="1"></ui-input-otp-slot>
    <ui-input-otp-slot index="2"></ui-input-otp-slot>
  </ui-input-otp-group>
  <ui-input-otp-separator></ui-input-otp-separator>
  <ui-input-otp-group>
    <ui-input-otp-slot index="3"></ui-input-otp-slot>
    <ui-input-otp-slot index="4"></ui-input-otp-slot>
    <ui-input-otp-slot index="5"></ui-input-otp-slot>
  </ui-input-otp-group>
</ui-input-otp>
\`\`\`

### Controlled usage
\`\`\`html
<ui-input-otp value="123456" @ui-otp-change="\${e => el.value = e.detail.value}">
  ...
</ui-input-otp>
\`\`\`

### Events
| Event | Detail | Description |
|---|---|---|
| \`ui-otp-change\` | \`{ value: string }\` | Fired on every keystroke |
| \`ui-otp-complete\` | \`{ value: string }\` | Fired when all slots are filled |

### CSS Custom Properties
| Property | Default | Description |
|---|---|---|
| \`--ui-primary-color\` | \`#3b82f6\` | Active slot border / ring colour |
| \`--ui-text-color\`    | \`#111827\` | Text and cursor colour |
| \`--ui-font-family\`   | \`system-ui\` | Slot font family |
                `,
            },
        },
    },
};

export default meta;
type Story = StoryObj;

/* ── shared helpers ──────────────────────────────────────────────── */

const wrapStyle = 'padding: 32px; font-family: system-ui, sans-serif;';
const labelStyle = 'display: block; margin-bottom: 12px; font-size: 0.875rem; font-weight: 500; color: #111827;';
const noteStyle  = 'margin: 0 0 16px; font-size: 0.875rem; color: #6b7280;';

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
    name: 'Default',
    render: () => html`
        <div style=${wrapStyle}>
            <label style=${labelStyle}>One-time password</label>
            <ui-input-otp max-length="6">
                <ui-input-otp-group>
                    <ui-input-otp-slot index="0"></ui-input-otp-slot>
                    <ui-input-otp-slot index="1"></ui-input-otp-slot>
                    <ui-input-otp-slot index="2"></ui-input-otp-slot>
                    <ui-input-otp-slot index="3"></ui-input-otp-slot>
                    <ui-input-otp-slot index="4"></ui-input-otp-slot>
                    <ui-input-otp-slot index="5"></ui-input-otp-slot>
                </ui-input-otp-group>
            </ui-input-otp>
        </div>
    `,
};

/* ── WithSeparator ───────────────────────────────────────────────── */
export const WithSeparator: Story = {
    name: 'With Separator',
    render: () => html`
        <div style=${wrapStyle}>
            <p style=${noteStyle}>Two groups of three separated by a dash.</p>
            <ui-input-otp max-length="6">
                <ui-input-otp-group>
                    <ui-input-otp-slot index="0"></ui-input-otp-slot>
                    <ui-input-otp-slot index="1"></ui-input-otp-slot>
                    <ui-input-otp-slot index="2"></ui-input-otp-slot>
                </ui-input-otp-group>
                <ui-input-otp-separator></ui-input-otp-separator>
                <ui-input-otp-group>
                    <ui-input-otp-slot index="3"></ui-input-otp-slot>
                    <ui-input-otp-slot index="4"></ui-input-otp-slot>
                    <ui-input-otp-slot index="5"></ui-input-otp-slot>
                </ui-input-otp-group>
            </ui-input-otp>
        </div>
    `,
};

/* ── DefaultValue ────────────────────────────────────────────────── */
export const DefaultValue: Story = {
    name: 'Default Value',
    render: () => html`
        <div style=${wrapStyle}>
            <p style=${noteStyle}>Pre-filled via <code>default-value</code> (uncontrolled).</p>
            <ui-input-otp max-length="6" default-value="123456">
                <ui-input-otp-group>
                    <ui-input-otp-slot index="0"></ui-input-otp-slot>
                    <ui-input-otp-slot index="1"></ui-input-otp-slot>
                    <ui-input-otp-slot index="2"></ui-input-otp-slot>
                </ui-input-otp-group>
                <ui-input-otp-separator></ui-input-otp-separator>
                <ui-input-otp-group>
                    <ui-input-otp-slot index="3"></ui-input-otp-slot>
                    <ui-input-otp-slot index="4"></ui-input-otp-slot>
                    <ui-input-otp-slot index="5"></ui-input-otp-slot>
                </ui-input-otp-group>
            </ui-input-otp>
        </div>
    `,
};

/* ── Disabled ────────────────────────────────────────────────────── */
export const Disabled: Story = {
    render: () => html`
        <div style=${wrapStyle}>
            <p style=${noteStyle}>The input is inert when <code>disabled</code>.</p>
            <ui-input-otp max-length="6" value="123456" disabled>
                <ui-input-otp-group>
                    <ui-input-otp-slot index="0"></ui-input-otp-slot>
                    <ui-input-otp-slot index="1"></ui-input-otp-slot>
                    <ui-input-otp-slot index="2"></ui-input-otp-slot>
                </ui-input-otp-group>
                <ui-input-otp-separator></ui-input-otp-separator>
                <ui-input-otp-group>
                    <ui-input-otp-slot index="3"></ui-input-otp-slot>
                    <ui-input-otp-slot index="4"></ui-input-otp-slot>
                    <ui-input-otp-slot index="5"></ui-input-otp-slot>
                </ui-input-otp-group>
            </ui-input-otp>
        </div>
    `,
};

/* ── FourDigits ──────────────────────────────────────────────────── */
export const FourDigits: Story = {
    name: 'Four Digits (PIN)',
    render: () => html`
        <div style=${wrapStyle}>
            <label style=${labelStyle}>Enter PIN</label>
            <p style=${noteStyle}>4-digit PIN code with digit-only pattern.</p>
            <ui-input-otp max-length="4" pattern="\\d">
                <ui-input-otp-group>
                    <ui-input-otp-slot index="0"></ui-input-otp-slot>
                    <ui-input-otp-slot index="1"></ui-input-otp-slot>
                    <ui-input-otp-slot index="2"></ui-input-otp-slot>
                    <ui-input-otp-slot index="3"></ui-input-otp-slot>
                </ui-input-otp-group>
            </ui-input-otp>
        </div>
    `,
};

/* ── DigitsOnly ──────────────────────────────────────────────────── */
export const DigitsOnly: Story = {
    name: 'Digits Only',
    render: () => html`
        <div style=${wrapStyle}>
            <p style=${noteStyle}>
                Uses <code>pattern="\\d"</code> — non-digit keystrokes and paste content
                are silently rejected.
            </p>
            <ui-input-otp max-length="6" pattern="\\d">
                <ui-input-otp-group>
                    <ui-input-otp-slot index="0"></ui-input-otp-slot>
                    <ui-input-otp-slot index="1"></ui-input-otp-slot>
                    <ui-input-otp-slot index="2"></ui-input-otp-slot>
                </ui-input-otp-group>
                <ui-input-otp-separator></ui-input-otp-separator>
                <ui-input-otp-group>
                    <ui-input-otp-slot index="3"></ui-input-otp-slot>
                    <ui-input-otp-slot index="4"></ui-input-otp-slot>
                    <ui-input-otp-slot index="5"></ui-input-otp-slot>
                </ui-input-otp-group>
            </ui-input-otp>
        </div>
    `,
};

/* ── Alphanumeric ────────────────────────────────────────────────── */
export const Alphanumeric: Story = {
    render: () => html`
        <div style=${wrapStyle}>
            <p style=${noteStyle}>
                Uses <code>pattern="[a-zA-Z0-9]"</code> — accepts letters and digits.
            </p>
            <ui-input-otp max-length="6" pattern="[a-zA-Z0-9]">
                <ui-input-otp-group>
                    <ui-input-otp-slot index="0"></ui-input-otp-slot>
                    <ui-input-otp-slot index="1"></ui-input-otp-slot>
                    <ui-input-otp-slot index="2"></ui-input-otp-slot>
                </ui-input-otp-group>
                <ui-input-otp-separator></ui-input-otp-separator>
                <ui-input-otp-group>
                    <ui-input-otp-slot index="3"></ui-input-otp-slot>
                    <ui-input-otp-slot index="4"></ui-input-otp-slot>
                    <ui-input-otp-slot index="5"></ui-input-otp-slot>
                </ui-input-otp-group>
            </ui-input-otp>
        </div>
    `,
};

/* ── Controlled ──────────────────────────────────────────────────── */
export const Controlled: Story = {
    render: () => {
        const state = { value: '' };

        const handleChange = (e: CustomEvent<{ value: string }>) => {
            state.value = e.detail.value;
            const display = (e.currentTarget as HTMLElement)
                .closest('div')!
                .querySelector<HTMLElement>('#otp-display');
            if (display) {
                display.textContent = state.value === ''
                    ? 'Enter your one-time password.'
                    : `You entered: ${state.value}`;
            }
        };

        return html`
            <div style=${wrapStyle}>
                <p style=${noteStyle}>Value is reflected in the text below as you type.</p>
                <ui-input-otp max-length="6" @ui-otp-change=${handleChange}>
                    <ui-input-otp-group>
                        <ui-input-otp-slot index="0"></ui-input-otp-slot>
                        <ui-input-otp-slot index="1"></ui-input-otp-slot>
                        <ui-input-otp-slot index="2"></ui-input-otp-slot>
                    </ui-input-otp-group>
                    <ui-input-otp-separator></ui-input-otp-separator>
                    <ui-input-otp-group>
                        <ui-input-otp-slot index="3"></ui-input-otp-slot>
                        <ui-input-otp-slot index="4"></ui-input-otp-slot>
                        <ui-input-otp-slot index="5"></ui-input-otp-slot>
                    </ui-input-otp-group>
                </ui-input-otp>
                <p id="otp-display" style="margin: 16px 0 0; font-size: 0.875rem; color: #6b7280; text-align: center;">
                    Enter your one-time password.
                </p>
            </div>
        `;
    },
};

/* ── Invalid ─────────────────────────────────────────────────────── */
export const Invalid: Story = {
    render: () => html`
        <div style=${wrapStyle}>
            <p style=${noteStyle}>
                Set <code>invalid</code> on individual slots to mark them as erroneous.
            </p>
            <ui-input-otp max-length="6" value="000000">
                <ui-input-otp-group>
                    <ui-input-otp-slot index="0" invalid></ui-input-otp-slot>
                    <ui-input-otp-slot index="1" invalid></ui-input-otp-slot>
                    <ui-input-otp-slot index="2" invalid></ui-input-otp-slot>
                </ui-input-otp-group>
                <ui-input-otp-separator></ui-input-otp-separator>
                <ui-input-otp-group>
                    <ui-input-otp-slot index="3" invalid></ui-input-otp-slot>
                    <ui-input-otp-slot index="4" invalid></ui-input-otp-slot>
                    <ui-input-otp-slot index="5" invalid></ui-input-otp-slot>
                </ui-input-otp-group>
            </ui-input-otp>
            <p style="margin: 12px 0 0; font-size: 0.8125rem; color: #ef4444;">
                Invalid verification code. Please try again.
            </p>
        </div>
    `,
};

/* ── AutoSubmit ──────────────────────────────────────────────────── */
export const AutoSubmit: Story = {
    name: 'Auto Submit on Complete',
    render: () => {
        const handleComplete = (e: CustomEvent<{ value: string }>) => {
            const root = (e.currentTarget as HTMLElement).closest('div')!;
            const status = root.querySelector<HTMLElement>('#auto-status')!;
            status.textContent = 'Verifying…';
            status.style.color = '#6b7280';
            setTimeout(() => {
                status.textContent = e.detail.value === '123456'
                    ? '✓ Code verified!'
                    : '✗ Invalid code. Try again.';
                status.style.color = e.detail.value === '123456' ? '#16a34a' : '#ef4444';
            }, 800);
        };

        return html`
            <div style=${wrapStyle}>
                <label style=${labelStyle}>Enter code <code>123456</code> to verify</label>
                <p style=${noteStyle}>Fires <code>ui-otp-complete</code> when all 6 slots are filled.</p>
                <ui-input-otp max-length="6" pattern="\\d" @ui-otp-complete=${handleComplete}>
                    <ui-input-otp-group>
                        <ui-input-otp-slot index="0"></ui-input-otp-slot>
                        <ui-input-otp-slot index="1"></ui-input-otp-slot>
                        <ui-input-otp-slot index="2"></ui-input-otp-slot>
                    </ui-input-otp-group>
                    <ui-input-otp-separator></ui-input-otp-separator>
                    <ui-input-otp-group>
                        <ui-input-otp-slot index="3"></ui-input-otp-slot>
                        <ui-input-otp-slot index="4"></ui-input-otp-slot>
                        <ui-input-otp-slot index="5"></ui-input-otp-slot>
                    </ui-input-otp-group>
                </ui-input-otp>
                <p id="auto-status" style="margin: 16px 0 0; font-size: 0.875rem; color: #6b7280;">
                    Waiting for input…
                </p>
            </div>
        `;
    },
};

/* ── InteractiveError ────────────────────────────────────────────── */
export const InteractiveError: Story = {
    name: 'Interactive Error State',
    render: () => {
        const setInvalid = (otp: HTMLElement, invalid: boolean) => {
            otp.querySelectorAll<HTMLElement & { invalid: boolean }>('ui-input-otp-slot')
                .forEach(slot => { slot.invalid = invalid; });
        };

        const handleVerify = (e: MouseEvent) => {
            const root = (e.currentTarget as HTMLElement).closest('div')!;
            const otp = root.querySelector<UiInputOtpEl>('ui-input-otp')!;
            const msg = root.querySelector<HTMLElement>('#err-msg')!;
            if (otp.value.length < 6) {
                msg.textContent = 'Please enter all 6 digits.';
                msg.style.display = 'block';
                return;
            }
            if (otp.value !== '000000') {
                setInvalid(otp, true);
                msg.textContent = 'Invalid code. Please try again.';
                msg.style.display = 'block';
            } else {
                setInvalid(otp, false);
                msg.style.display = 'none';
                msg.textContent = '';
                alert('Verified!');
            }
        };

        const handleChange = (e: CustomEvent) => {
            const root = (e.currentTarget as HTMLElement).closest('div')!;
            const otp = root.querySelector<HTMLElement>('ui-input-otp')!;
            const msg = root.querySelector<HTMLElement>('#err-msg')!;
            setInvalid(otp, false);
            msg.style.display = 'none';
        };

        return html`
            <div style=${wrapStyle}>
                <label style=${labelStyle}>Verification code</label>
                <p style=${noteStyle}>Enter <code>000000</code> to verify. Any other code shows an error.</p>
                <ui-input-otp max-length="6" pattern="\\d" @ui-otp-change=${handleChange}>
                    <ui-input-otp-group>
                        <ui-input-otp-slot index="0"></ui-input-otp-slot>
                        <ui-input-otp-slot index="1"></ui-input-otp-slot>
                        <ui-input-otp-slot index="2"></ui-input-otp-slot>
                    </ui-input-otp-group>
                    <ui-input-otp-separator></ui-input-otp-separator>
                    <ui-input-otp-group>
                        <ui-input-otp-slot index="3"></ui-input-otp-slot>
                        <ui-input-otp-slot index="4"></ui-input-otp-slot>
                        <ui-input-otp-slot index="5"></ui-input-otp-slot>
                    </ui-input-otp-group>
                </ui-input-otp>
                <button
                    @click=${handleVerify}
                    style="margin-top: 16px; padding: 8px 20px; background: #3b82f6; color: #fff; border: none; border-radius: 6px; font-size: 0.875rem; cursor: pointer;"
                >Verify</button>
                <p id="err-msg" style="display: none; margin: 10px 0 0; font-size: 0.8125rem; color: #ef4444;"></p>
            </div>
        `;
    },
};

/* ── ThreeGroups ─────────────────────────────────────────────────── */
export const ThreeGroups: Story = {
    name: 'Three Groups',
    render: () => html`
        <div style=${wrapStyle}>
            <p style=${noteStyle}>Three pairs of two slots each.</p>
            <ui-input-otp max-length="6">
                <ui-input-otp-group>
                    <ui-input-otp-slot index="0"></ui-input-otp-slot>
                    <ui-input-otp-slot index="1"></ui-input-otp-slot>
                </ui-input-otp-group>
                <ui-input-otp-separator></ui-input-otp-separator>
                <ui-input-otp-group>
                    <ui-input-otp-slot index="2"></ui-input-otp-slot>
                    <ui-input-otp-slot index="3"></ui-input-otp-slot>
                </ui-input-otp-group>
                <ui-input-otp-separator></ui-input-otp-separator>
                <ui-input-otp-group>
                    <ui-input-otp-slot index="4"></ui-input-otp-slot>
                    <ui-input-otp-slot index="5"></ui-input-otp-slot>
                </ui-input-otp-group>
            </ui-input-otp>
        </div>
    `,
};
