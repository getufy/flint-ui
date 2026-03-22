import type { Meta, StoryObj } from '@storybook/web-components';
import '../button/flint-button';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import '../button/flint-button';
import './flint-input-otp.js';
import '../button/flint-button';
import type { FlintInputOtp } from './flint-input-otp.js';
import '../button/flint-button';

type FlintInputOtpEl = FlintInputOtp;

const meta: Meta = {
    title: 'Inputs/Input OTP',
    component: 'flint-input-otp',
    parameters: {
        docs: {
            description: {
                component: `
#### \`<flint-input-otp-group>\`

Visual grouping wrapper for \`flint-input-otp-slot\` elements.
Renders slots inline with shared borders.

- **Tag**: \`<flint-input-otp-group>\`
- **Class**: \`FlintInputOtpGroup\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Accepts \`flint-input-otp-slot\` elements. |

#### CSS Parts

| Name | Description |
|---|---|
| \`separator\` | The separator element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-text-color\` | — |
| \`--flint-otp-slot-width\` | \`40px\` |
| \`--flint-otp-slot-height\` | \`48px\` |
| \`--flint-otp-slot-font-size\` | \`1.25rem\` |
| \`--flint-font-family\` | — |
| \`--flint-input-bg\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-otp-slot-radius\` | \`6px\` |
| \`--flint-primary-color\` | — |
| \`--flint-primary-focus-ring\` | — |
| \`--flint-error-color\` | — |
| \`--flint-error-focus-ring\` | — |
| \`--flint-otp-gap\` | \`8px\` |

---

#### \`<flint-input-otp-separator>\`

Visual separator between \`flint-input-otp-group\` elements.
Renders a short horizontal bar.

- **Tag**: \`<flint-input-otp-separator>\`
- **Class**: \`FlintInputOtpSeparator\`

---

#### \`<flint-input-otp-slot>\`

A single character cell in an OTP input.
Place inside \`flint-input-otp-group\`. State is managed by \`flint-input-otp\`.

- **Tag**: \`<flint-input-otp-slot>\`
- **Class**: \`FlintInputOtpSlot\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`index\` | \`index\` | \`number\` | \`0\` | Zero-based position index of this slot. |
| \`char\` | \`char\` | \`string\` | \`''\` | Character displayed. Set by the parent \`flint-input-otp\`. |
| \`active\` | \`active\` | \`boolean\` | \`false\` | Whether the cursor is at this position. Set by the parent \`flint-input-otp\`. |
| \`invalid\` | \`invalid\` | \`boolean\` | \`false\` | Error / invalid state. |

---

#### \`<flint-input-otp>\`

Accessible one-time password input with copy/paste support.
Manages a hidden native \`<input>\` and syncs each \`flint-input-otp-slot\`
with the appropriate character and active-cursor state.

- **Tag**: \`<flint-input-otp>\`
- **Class**: \`FlintInputOtp\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Current OTP value. Reflects to attribute for external observation. |
| \`defaultValue\` | \`default-value\` | \`string\` | \`''\` | Initial uncontrolled value. Has no effect after the first render. |
| \`maxLength\` | \`max-length\` | \`number\` | \`6\` | Total number of character slots. |
| \`pattern\` | \`pattern\` | \`string\` | \`''\` | Per-character regex pattern string. Characters failing the test are |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the OTP input. |
| \`name\` | \`name\` | \`string\` | \`''\` | Form field name used when submitting form data. |
| \`required\` | \`required\` | \`boolean\` | \`false\` | Marks the OTP input as required for form validation. |
| \`label\` | \`label\` | \`string\` | \`'One-time password'\` | Accessible label for the hidden input (used as aria-label). |
| \`description\` | \`description\` | \`string\` | \`''\` | Optional description text for the hidden input (used as aria-describedby). |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-otp-change\` | \`&#123; value: string &#125;\` | Fired on every value change. \`detail: &#123; value: string &#125;\`. |
| \`flint-otp-complete\` | \`&#123; value: string &#125;\` | Fired when \`maxLength\` chars have been entered. \`detail: &#123; value: string &#125;\`. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Accepts \`flint-input-otp-group\`, \`flint-input-otp-separator\`, and \`flint-input-otp-slot\` elements. |
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
const noteStyle  = 'margin: 0 0 16px; font-size: 0.875rem; color: #4b5563;';

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
    name: 'Default',
    render: () => html`
        <div style=${wrapStyle}>
            <label style=${labelStyle}>One-time password</label>
            <flint-input-otp max-length="6">
                <flint-input-otp-group>
                    <flint-input-otp-slot index="0"></flint-input-otp-slot>
                    <flint-input-otp-slot index="1"></flint-input-otp-slot>
                    <flint-input-otp-slot index="2"></flint-input-otp-slot>
                    <flint-input-otp-slot index="3"></flint-input-otp-slot>
                    <flint-input-otp-slot index="4"></flint-input-otp-slot>
                    <flint-input-otp-slot index="5"></flint-input-otp-slot>
                </flint-input-otp-group>
            </flint-input-otp>
        </div>
    `,
};

Default.play = async ({ canvasElement }) => {
    const otp = canvasElement.querySelector('flint-input-otp') as FlintInputOtpEl;

    // Click the host element (its _handleClick forwards focus to the hidden input)
    await userEvent.click(otp);
    // Type via keyboard (hidden input has pointer-events: none, so userEvent.type won't work)
    await userEvent.keyboard('123456');
    await waitFor(() => expect(otp.value).toBe('123456'));
};

/* ── WithSeparator ───────────────────────────────────────────────── */
export const WithSeparator: Story = {
    name: 'With Separator',
    render: () => html`
        <div style=${wrapStyle}>
            <p style=${noteStyle}>Two groups of three separated by a dash.</p>
            <flint-input-otp max-length="6">
                <flint-input-otp-group>
                    <flint-input-otp-slot index="0"></flint-input-otp-slot>
                    <flint-input-otp-slot index="1"></flint-input-otp-slot>
                    <flint-input-otp-slot index="2"></flint-input-otp-slot>
                </flint-input-otp-group>
                <flint-input-otp-separator></flint-input-otp-separator>
                <flint-input-otp-group>
                    <flint-input-otp-slot index="3"></flint-input-otp-slot>
                    <flint-input-otp-slot index="4"></flint-input-otp-slot>
                    <flint-input-otp-slot index="5"></flint-input-otp-slot>
                </flint-input-otp-group>
            </flint-input-otp>
        </div>
    `,
};

/* ── DefaultValue ────────────────────────────────────────────────── */
export const DefaultValue: Story = {
    name: 'Default Value',
    render: () => html`
        <div style=${wrapStyle}>
            <p style=${noteStyle}>Pre-filled via <code>default-value</code> (uncontrolled).</p>
            <flint-input-otp max-length="6" default-value="123456">
                <flint-input-otp-group>
                    <flint-input-otp-slot index="0"></flint-input-otp-slot>
                    <flint-input-otp-slot index="1"></flint-input-otp-slot>
                    <flint-input-otp-slot index="2"></flint-input-otp-slot>
                </flint-input-otp-group>
                <flint-input-otp-separator></flint-input-otp-separator>
                <flint-input-otp-group>
                    <flint-input-otp-slot index="3"></flint-input-otp-slot>
                    <flint-input-otp-slot index="4"></flint-input-otp-slot>
                    <flint-input-otp-slot index="5"></flint-input-otp-slot>
                </flint-input-otp-group>
            </flint-input-otp>
        </div>
    `,
};

/* ── Disabled ────────────────────────────────────────────────────── */
export const Disabled: Story = {
    render: () => html`
        <div style=${wrapStyle}>
            <p style=${noteStyle}>The input is inert when <code>disabled</code>.</p>
            <flint-input-otp max-length="6" value="123456" disabled>
                <flint-input-otp-group>
                    <flint-input-otp-slot index="0"></flint-input-otp-slot>
                    <flint-input-otp-slot index="1"></flint-input-otp-slot>
                    <flint-input-otp-slot index="2"></flint-input-otp-slot>
                </flint-input-otp-group>
                <flint-input-otp-separator></flint-input-otp-separator>
                <flint-input-otp-group>
                    <flint-input-otp-slot index="3"></flint-input-otp-slot>
                    <flint-input-otp-slot index="4"></flint-input-otp-slot>
                    <flint-input-otp-slot index="5"></flint-input-otp-slot>
                </flint-input-otp-group>
            </flint-input-otp>
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
            <flint-input-otp max-length="4" pattern="\\d">
                <flint-input-otp-group>
                    <flint-input-otp-slot index="0"></flint-input-otp-slot>
                    <flint-input-otp-slot index="1"></flint-input-otp-slot>
                    <flint-input-otp-slot index="2"></flint-input-otp-slot>
                    <flint-input-otp-slot index="3"></flint-input-otp-slot>
                </flint-input-otp-group>
            </flint-input-otp>
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
            <flint-input-otp max-length="6" pattern="\\d">
                <flint-input-otp-group>
                    <flint-input-otp-slot index="0"></flint-input-otp-slot>
                    <flint-input-otp-slot index="1"></flint-input-otp-slot>
                    <flint-input-otp-slot index="2"></flint-input-otp-slot>
                </flint-input-otp-group>
                <flint-input-otp-separator></flint-input-otp-separator>
                <flint-input-otp-group>
                    <flint-input-otp-slot index="3"></flint-input-otp-slot>
                    <flint-input-otp-slot index="4"></flint-input-otp-slot>
                    <flint-input-otp-slot index="5"></flint-input-otp-slot>
                </flint-input-otp-group>
            </flint-input-otp>
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
            <flint-input-otp max-length="6" pattern="[a-zA-Z0-9]">
                <flint-input-otp-group>
                    <flint-input-otp-slot index="0"></flint-input-otp-slot>
                    <flint-input-otp-slot index="1"></flint-input-otp-slot>
                    <flint-input-otp-slot index="2"></flint-input-otp-slot>
                </flint-input-otp-group>
                <flint-input-otp-separator></flint-input-otp-separator>
                <flint-input-otp-group>
                    <flint-input-otp-slot index="3"></flint-input-otp-slot>
                    <flint-input-otp-slot index="4"></flint-input-otp-slot>
                    <flint-input-otp-slot index="5"></flint-input-otp-slot>
                </flint-input-otp-group>
            </flint-input-otp>
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
                <flint-input-otp max-length="6" @flint-otp-change=${handleChange}>
                    <flint-input-otp-group>
                        <flint-input-otp-slot index="0"></flint-input-otp-slot>
                        <flint-input-otp-slot index="1"></flint-input-otp-slot>
                        <flint-input-otp-slot index="2"></flint-input-otp-slot>
                    </flint-input-otp-group>
                    <flint-input-otp-separator></flint-input-otp-separator>
                    <flint-input-otp-group>
                        <flint-input-otp-slot index="3"></flint-input-otp-slot>
                        <flint-input-otp-slot index="4"></flint-input-otp-slot>
                        <flint-input-otp-slot index="5"></flint-input-otp-slot>
                    </flint-input-otp-group>
                </flint-input-otp>
                <p id="otp-display" style="margin: 16px 0 0; font-size: 0.875rem; color: #4b5563; text-align: center;">
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
            <flint-input-otp max-length="6" value="000000">
                <flint-input-otp-group>
                    <flint-input-otp-slot index="0" invalid></flint-input-otp-slot>
                    <flint-input-otp-slot index="1" invalid></flint-input-otp-slot>
                    <flint-input-otp-slot index="2" invalid></flint-input-otp-slot>
                </flint-input-otp-group>
                <flint-input-otp-separator></flint-input-otp-separator>
                <flint-input-otp-group>
                    <flint-input-otp-slot index="3" invalid></flint-input-otp-slot>
                    <flint-input-otp-slot index="4" invalid></flint-input-otp-slot>
                    <flint-input-otp-slot index="5" invalid></flint-input-otp-slot>
                </flint-input-otp-group>
            </flint-input-otp>
            <p style="margin: 12px 0 0; font-size: 0.8125rem; color: #dc2626;">
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
            status.style.color = '#4b5563';
            setTimeout(() => {
                status.textContent = e.detail.value === '123456'
                    ? '✓ Code verified!'
                    : '✗ Invalid code. Try again.';
                status.style.color = e.detail.value === '123456' ? '#15803d' : '#dc2626';
            }, 800);
        };

        return html`
            <div style=${wrapStyle}>
                <label style=${labelStyle}>Enter code <code>123456</code> to verify</label>
                <p style=${noteStyle}>Fires <code>flint-otp-complete</code> when all 6 slots are filled.</p>
                <flint-input-otp max-length="6" pattern="\\d" @flint-otp-complete=${handleComplete}>
                    <flint-input-otp-group>
                        <flint-input-otp-slot index="0"></flint-input-otp-slot>
                        <flint-input-otp-slot index="1"></flint-input-otp-slot>
                        <flint-input-otp-slot index="2"></flint-input-otp-slot>
                    </flint-input-otp-group>
                    <flint-input-otp-separator></flint-input-otp-separator>
                    <flint-input-otp-group>
                        <flint-input-otp-slot index="3"></flint-input-otp-slot>
                        <flint-input-otp-slot index="4"></flint-input-otp-slot>
                        <flint-input-otp-slot index="5"></flint-input-otp-slot>
                    </flint-input-otp-group>
                </flint-input-otp>
                <p id="auto-status" style="margin: 16px 0 0; font-size: 0.875rem; color: #4b5563;">
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
            otp.querySelectorAll<HTMLElement & { invalid: boolean }>('flint-input-otp-slot')
                .forEach(slot => { slot.invalid = invalid; });
        };

        const handleVerify = (e: MouseEvent) => {
            const root = (e.currentTarget as HTMLElement).closest('div')!;
            const otp = root.querySelector<FlintInputOtpEl>('flint-input-otp')!;
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
            const otp = root.querySelector<HTMLElement>('flint-input-otp')!;
            const msg = root.querySelector<HTMLElement>('#err-msg')!;
            setInvalid(otp, false);
            msg.style.display = 'none';
        };

        return html`
            <div style=${wrapStyle}>
                <label style=${labelStyle}>Verification code</label>
                <p style=${noteStyle}>Enter <code>000000</code> to verify. Any other code shows an error.</p>
                <flint-input-otp max-length="6" pattern="\\d" @flint-otp-change=${handleChange}>
                    <flint-input-otp-group>
                        <flint-input-otp-slot index="0"></flint-input-otp-slot>
                        <flint-input-otp-slot index="1"></flint-input-otp-slot>
                        <flint-input-otp-slot index="2"></flint-input-otp-slot>
                    </flint-input-otp-group>
                    <flint-input-otp-separator></flint-input-otp-separator>
                    <flint-input-otp-group>
                        <flint-input-otp-slot index="3"></flint-input-otp-slot>
                        <flint-input-otp-slot index="4"></flint-input-otp-slot>
                        <flint-input-otp-slot index="5"></flint-input-otp-slot>
                    </flint-input-otp-group>
                </flint-input-otp>
                <flint-button @click=${handleVerify} style="margin-top: 16px;">Verify</flint-button>
                <p id="err-msg" style="display: none; margin: 10px 0 0; font-size: 0.8125rem; color: #dc2626;"></p>
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
            <flint-input-otp max-length="6">
                <flint-input-otp-group>
                    <flint-input-otp-slot index="0"></flint-input-otp-slot>
                    <flint-input-otp-slot index="1"></flint-input-otp-slot>
                </flint-input-otp-group>
                <flint-input-otp-separator></flint-input-otp-separator>
                <flint-input-otp-group>
                    <flint-input-otp-slot index="2"></flint-input-otp-slot>
                    <flint-input-otp-slot index="3"></flint-input-otp-slot>
                </flint-input-otp-group>
                <flint-input-otp-separator></flint-input-otp-separator>
                <flint-input-otp-group>
                    <flint-input-otp-slot index="4"></flint-input-otp-slot>
                    <flint-input-otp-slot index="5"></flint-input-otp-slot>
                </flint-input-otp-group>
            </flint-input-otp>
        </div>
    `,
};
