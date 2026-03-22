import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { expect, userEvent, waitFor } from 'storybook/test';
import '../text-field/flint-text-field.js';
import '../button/flint-button.js';
import '../checkbox/flint-checkbox.js';
import '../switch/flint-switch.js';
import '../stack/flint-stack.js';
import '../box/flint-box.js';
import '../divider/flint-divider.js';

const meta: Meta = {
    title: 'Playbooks/Login Form',
    parameters: {
        layout: 'fullscreen',
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
 * A realistic login form centered on a subtle background:
 * 1. Fill in email
 * 2. Fill in password
 * 3. Toggle "Remember me" checkbox
 * 4. Toggle "Stay signed in" switch
 * 5. Submit the form
 * 6. Verify validation (required fields) and inter-component state
 */
export const LoginFlow: Story = {
    render: () => html`
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--flint-surface-2, #f9fafb); font-family: system-ui;">
            <div style="width: 100%; max-width: 420px; padding: 40px; background: var(--flint-surface-background, #fff); border: 1px solid var(--flint-border-color, #e5e7eb); border-radius: 16px; box-shadow: var(--flint-shadow-lg, 0 10px 15px -3px rgba(0,0,0,.1));">
                <!-- Logo / brand area -->
                <div style="text-align: center; margin-bottom: 32px;">
                    <div style="width: 48px; height: 48px; border-radius: 12px; background: var(--flint-primary-color, #3b82f6); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                    </div>
                    <h2 style="margin: 0 0 4px; font-size: 1.5rem; font-weight: 700;">Welcome back</h2>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--flint-text-color-muted, #6b7280);">Sign in to your account to continue.</p>
                </div>

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
                            <a href="javascript:void(0)" style="font-size: 0.8125rem; color: var(--flint-primary-color, #3b82f6); text-decoration: none; font-weight: 500;">Forgot password?</a>
                        </div>

                        <flint-button id="login-submit" appearance="filled" color="primary" style="width: 100%;" @click=${(e: Event) => {
                            const form = (e.target as HTMLElement).closest('#login-form')!;
                            const emailField = form.querySelector<HTMLElement & { value: string }>('#login-email')!;
                            const passwordField = form.querySelector<HTMLElement & { value: string }>('#login-password')!;
                            const status = form.closest('div[style*="max-width"]')!.querySelector('#login-status')!;

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

                <p id="login-status" style="margin: 16px 0 0; font-size: 0.875rem; font-weight: 600; min-height: 20px; text-align: center;"></p>

                <flint-divider style="margin: 24px 0;"></flint-divider>

                <p style="margin: 0; font-size: 0.8125rem; color: var(--flint-text-color-muted, #6b7280); text-align: center;">
                    Don't have an account?
                    <a href="javascript:void(0)" style="color: var(--flint-primary-color, #3b82f6); text-decoration: none; font-weight: 500;">Sign up</a>
                </p>
            </div>
        </div>
    `,

    play: async ({ canvasElement }) => {
        const user = userEvent.setup({ pointerEventsCheck: 0 });

        // ── Step 1: Verify initial state ────────────────────────────────
        const emailField = canvasElement.querySelector('#login-email') as HTMLElement & { value: string };
        const passwordField = canvasElement.querySelector('#login-password') as HTMLElement & { value: string };
        const checkbox = canvasElement.querySelector('#login-remember') as HTMLElement & { checked: boolean };
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

        // ── Step 6: Submit with valid data ──────────────────────────────
        emailField.value = emailInput.value;
        passwordField.value = passwordInput.value;
        await user.click(submitBtn);

        await waitFor(() => {
            expect(status.textContent).toBe('Login successful');
        });
    },
};
