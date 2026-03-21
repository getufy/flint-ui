import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { expect, userEvent, waitFor } from 'storybook/test';
import '../tabs/flint-tabs.js';
import '../switch/flint-switch.js';
import '../select/flint-select.js';
import '../button/flint-button.js';
import '../stack/flint-stack.js';
import '../paper/flint-paper.js';

const meta: Meta = {
    title: 'Playbooks/Settings Page',
    parameters: {
        layout: 'padded',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                    { id: 'aria-required-parent', enabled: false },
                    { id: 'aria-required-children', enabled: false },
                    { id: 'aria-valid-attr-value', enabled: false },
                    { id: 'button-name', enabled: false },
                    { id: 'aria-input-field-name', enabled: false },
                    { id: 'select-name', enabled: false },
                    { id: 'label', enabled: false },
                ],
            },
        },
    },
};

export default meta;
type Story = StoryObj;

const themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' },
];

const langOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
];

/**
 * A settings page with tabs, switches, select dropdowns, and a save button.
 * Flow:
 * 1. Navigate between General and Notifications tabs
 * 2. Toggle switches
 * 3. Change select value
 * 4. Click save
 * 5. Verify state persistence across tab switches
 */
export const SettingsFlow: Story = {
    render: () => html`
        <div style="max-width: 600px; font-family: system-ui;">
            <h2 style="margin: 0 0 16px; font-size: 1.25rem; font-weight: 700;">Settings</h2>

            <flint-paper elevation="2" style="overflow: hidden;">
                <flint-tabs id="settings-tabs" value="general"
                    @flint-tab-change=${(e: CustomEvent) => {
                        (e.currentTarget as HTMLElement & { value: string }).value = e.detail.value;
                    }}>
                    <flint-tab-list aria-label="Settings sections">
                        <flint-tab value="general">General</flint-tab>
                        <flint-tab value="notifications">Notifications</flint-tab>
                        <flint-tab value="privacy">Privacy</flint-tab>
                    </flint-tab-list>

                    <flint-tab-panel value="general">
                        <flint-stack direction="column" gap="20px" style="padding: 8px 0;">
                            <flint-select
                                id="theme-select"
                                label="Theme"
                                .options=${themeOptions}
                                .value=${['light']}
                            ></flint-select>

                            <flint-select
                                id="lang-select"
                                label="Language"
                                .options=${langOptions}
                                .value=${['en']}
                            ></flint-select>

                            <flint-switch id="auto-update" label="Auto-update"></flint-switch>
                        </flint-stack>
                    </flint-tab-panel>

                    <flint-tab-panel value="notifications">
                        <flint-stack direction="column" gap="20px" style="padding: 8px 0;">
                            <flint-switch id="email-notifs" label="Email notifications" checked></flint-switch>
                            <flint-switch id="push-notifs" label="Push notifications"></flint-switch>
                            <flint-switch id="sms-notifs" label="SMS alerts"></flint-switch>
                        </flint-stack>
                    </flint-tab-panel>

                    <flint-tab-panel value="privacy">
                        <flint-stack direction="column" gap="20px" style="padding: 8px 0;">
                            <flint-switch id="analytics" label="Allow analytics"></flint-switch>
                            <flint-switch id="cookies" label="Accept cookies" checked></flint-switch>
                        </flint-stack>
                    </flint-tab-panel>
                </flint-tabs>
            </flint-paper>

            <div style="display: flex; justify-content: flex-end; margin-top: 16px; gap: 8px;">
                <flint-button id="settings-cancel" appearance="outlined" color="neutral">Cancel</flint-button>
                <flint-button id="settings-save" appearance="filled" color="primary"
                    @click=${(e: Event) => {
                        const root = (e.target as HTMLElement).closest('div[style]')!.parentElement!;
                        const status = root.querySelector('#settings-status')!;
                        status.textContent = 'Settings saved';
                    }}
                >Save</flint-button>
            </div>

            <p id="settings-status" style="margin: 12px 0 0; font-size: 0.875rem; font-weight: 600; min-height: 20px;"></p>
        </div>
    `,

    play: async ({ canvasElement }) => {
        const user = userEvent.setup({ pointerEventsCheck: 0 });

        const tabs = canvasElement.querySelector('#settings-tabs') as HTMLElement & { value: string };

        // ── Step 1: Verify we start on the General tab ──────────────────
        await waitFor(() => {
            expect(tabs.value).toBe('general');
        });

        // ── Step 2: Toggle auto-update switch on the General tab ────────
        const autoUpdate = canvasElement.querySelector('#auto-update') as HTMLElement & { checked: boolean };
        const autoUpdateWrapper = autoUpdate.shadowRoot!.querySelector('.wrapper') as HTMLElement;
        await user.click(autoUpdateWrapper);

        await waitFor(() => {
            expect(autoUpdate.checked).toBe(true);
        });

        // ── Step 3: Navigate to Notifications tab ───────────────────────
        const notifTab = canvasElement.querySelector('flint-tab[value="notifications"]') as HTMLElement;
        const notifTabBtn = notifTab.shadowRoot!.querySelector('button') as HTMLElement;
        await user.click(notifTabBtn);

        await waitFor(() => {
            expect(tabs.value).toBe('notifications');
        });

        // ── Step 4: Toggle push notifications switch ────────────────────
        const pushNotifs = canvasElement.querySelector('#push-notifs') as HTMLElement & { checked: boolean };
        await waitFor(() => expect(pushNotifs).toBeTruthy());
        const pushWrapper = pushNotifs.shadowRoot!.querySelector('.wrapper') as HTMLElement;
        await user.click(pushWrapper);

        await waitFor(() => {
            expect(pushNotifs.checked).toBe(true);
        });

        // ── Step 5: Verify email notifications is still checked ─────────
        const emailNotifs = canvasElement.querySelector('#email-notifs') as HTMLElement & { checked: boolean };
        await waitFor(() => {
            expect(emailNotifs.checked).toBe(true);
        });

        // ── Step 6: Navigate to Privacy tab ─────────────────────────────
        const privacyTab = canvasElement.querySelector('flint-tab[value="privacy"]') as HTMLElement;
        const privacyTabBtn = privacyTab.shadowRoot!.querySelector('button') as HTMLElement;
        await user.click(privacyTabBtn);

        await waitFor(() => {
            expect(tabs.value).toBe('privacy');
        });

        // ── Step 7: Navigate back to General tab ────────────────────────
        const generalTab = canvasElement.querySelector('flint-tab[value="general"]') as HTMLElement;
        const generalTabBtn = generalTab.shadowRoot!.querySelector('button') as HTMLElement;
        await user.click(generalTabBtn);

        await waitFor(() => {
            expect(tabs.value).toBe('general');
        });

        // ── Step 8: Verify auto-update switch state persisted ───────────
        await waitFor(() => {
            expect(autoUpdate.checked).toBe(true);
        });

        // ── Step 9: Click Save ──────────────────────────────────────────
        const saveBtn = canvasElement.querySelector('#settings-save') as HTMLElement;
        await user.click(saveBtn);

        const status = canvasElement.querySelector('#settings-status') as HTMLElement;
        await waitFor(() => {
            expect(status.textContent).toBe('Settings saved');
        });
    },
};
