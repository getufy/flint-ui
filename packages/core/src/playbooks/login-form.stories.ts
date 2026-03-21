import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { expect, userEvent, waitFor } from 'storybook/test';
import '../text-field/flint-text-field.js';
import '../button/flint-button.js';
import '../checkbox/flint-checkbox.js';
import '../switch/flint-switch.js';
import '../stack/flint-stack.js';
import '../box/flint-box.js';

const meta: Meta = {
    title: 'Playbooks/Login Form',
    parameters: {
        layout: 'centered',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                    { id: 'label', enabled: false },
                ],
            },
        },
    },
};

export default meta;
type Story = StoryObj;

/**
 * A realistic login form flow:
 * 1. Fill in email
 * 2. Fill in password
 * 3. Toggle "Remember me" checkbox
 * 4. Toggle "Stay signed in" switch
 * 5. Submit the form
 * 6. Verify validation (required fields) and inter-component state
 */
export const LoginFlow: Story = {
    render: () => html`
        <div style="width: 380px; padding: 32px; border: 1px solid #e5e7eb; border-radius: 12px; font-family: system-ui;">
            <h2 style="margin: 0 0 8px; font-size: 1.5rem; font-weight: 700;">Sign In</h2>
            <p style="margin: 0 0 24px; font-size: 0.875rem; color: #6b7280;">Enter your credentials to access your account.</p>

            <form id="login-form">
                <flint-stack direction="column" gap="16px">
                    <flint-text-field
                        id="login-email"
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                    ></flint-text-field>

                    <flint-text-field
                        id="login-password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                    ></flint-text-field>

                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <flint-checkbox id="login-remember" label="Remember me"></flint-checkbox>
                        <flint-switch id="login-stay" label="Stay signed in" size="sm"></flint-switch>
                    </div>

                    <flint-button id="login-submit" appearance="filled" color="primary" style="width: 100%;" @click=${(e: Event) => {
                        const form = (e.target as HTMLElement).closest('#login-form')!;
                        const emailField = form.querySelector<HTMLElement & { value: string }>('#login-email')!;
                        const passwordField = form.querySelector<HTMLElement & { value: string }>('#login-password')!;
                        const status = form.closest('div')!.querySelector('#login-status')!;

                        if (!emailField.value || !passwordField.value) {
                            if (!emailField.value) {
                                emailField.setAttribute('error', '');
                                emailField.setAttribute('error-message', 'Email is required');
                            }
                            if (!passwordField.value) {
                                passwordField.setAttribute('error', '');
                                passwordField.setAttribute('error-message', 'Password is required');
                            }
                            status.textContent = 'Validation failed';
                            return;
                        }
                        status.textContent = 'Login successful';
                    }}>
                        Sign In
                    </flint-button>
                </flint-stack>
            </form>

            <p id="login-status" style="margin: 16px 0 0; font-size: 0.875rem; font-weight: 600; min-height: 20px;"></p>
        </div>
    `,

    play: async ({ canvasElement }) => {
        const user = userEvent.setup({ pointerEventsCheck: 0 });

        // ── Step 1: Verify initial state ────────────────────────────────
        const emailField = canvasElement.querySelector('#login-email') as HTMLElement & { value: string };
        const passwordField = canvasElement.querySelector('#login-password') as HTMLElement & { value: string };
        const checkbox = canvasElement.querySelector('#login-remember') as HTMLElement & { checked: boolean };
        const switchEl = canvasElement.querySelector('#login-stay') as HTMLElement & { checked: boolean };
        const submitBtn = canvasElement.querySelector('#login-submit') as HTMLElement;
        const status = canvasElement.querySelector('#login-status') as HTMLElement;

        await waitFor(() => {
            expect(emailField).toBeTruthy();
            expect(passwordField).toBeTruthy();
            expect(submitBtn).toBeTruthy();
        });

        // ── Step 2: Submit empty form -> validation failure ─────────────
        await user.click(submitBtn);

        await waitFor(() => {
            expect(status.textContent).toBe('Validation failed');
        });

        // ── Step 3: Fill in email via shadow DOM input ──────────────────
        const emailInput = emailField.shadowRoot!.querySelector('input')!;
        await user.click(emailInput);
        await user.type(emailInput, 'user@example.com');

        await waitFor(() => {
            expect(emailInput.value).toBe('user@example.com');
        });

        // ── Step 4: Fill in password ────────────────────────────────────
        const passwordInput = passwordField.shadowRoot!.querySelector('input')!;
        await user.click(passwordInput);
        await user.type(passwordInput, 'secret123');

        await waitFor(() => {
            expect(passwordInput.value).toBe('secret123');
        });

        // ── Step 5: Toggle "Remember me" checkbox ───────────────────────
        const checkboxInput = checkbox.shadowRoot!.querySelector('input') as HTMLInputElement;
        await user.click(checkboxInput);

        await waitFor(() => {
            expect(checkbox.checked).toBe(true);
        });

        // ── Step 6: Toggle "Stay signed in" switch ──────────────────────
        const switchWrapper = switchEl.shadowRoot!.querySelector('.wrapper') as HTMLElement;
        await user.click(switchWrapper);

        await waitFor(() => {
            expect(switchEl.checked).toBe(true);
        });

        // ── Step 7: Submit with valid data ──────────────────────────────
        // Sync value properties from inner inputs to the custom elements
        emailField.value = emailInput.value;
        passwordField.value = passwordInput.value;
        await user.click(submitBtn);

        await waitFor(() => {
            expect(status.textContent).toBe('Login successful');
        });
    },
};
