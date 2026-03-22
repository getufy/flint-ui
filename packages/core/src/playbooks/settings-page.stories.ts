import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { expect, userEvent, waitFor } from 'storybook/test';
import '../switch/flint-switch.js';
import '../select/flint-select.js';
import '../button/flint-button.js';
import '../stack/flint-stack.js';
import '../paper/flint-paper.js';
import '../divider/flint-divider.js';
import '../container/flint-container.js';

const meta: Meta = {
    title: 'Playbooks/Settings Page',
    parameters: {
        layout: 'fullscreen',
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

const sections = ['general', 'notifications', 'privacy'] as const;

function switchSection(root: HTMLElement, section: string) {
    // Toggle sections
    sections.forEach(s => {
        const panel = root.querySelector(`#section-${s}`) as HTMLElement | null;
        if (panel) panel.style.display = s === section ? '' : 'none';
    });

    // Toggle nav active state
    root.querySelectorAll<HTMLElement>('.settings-nav-btn').forEach(btn => {
        const isActive = btn.dataset.section === section;
        btn.style.background = isActive ? 'var(--flint-primary-color-light, rgba(59,130,246,0.1))' : 'transparent';
        btn.style.color = isActive ? 'var(--flint-primary-color, #3b82f6)' : 'inherit';
        btn.style.fontWeight = isActive ? '600' : '500';
    });

    // Track which section is active
    const tracker = root.querySelector('#active-section') as HTMLElement | null;
    if (tracker) tracker.dataset.value = section;
}

/**
 * A settings page with a two-column layout:
 * - Left sidebar with nav buttons that switch content sections
 * - Right panel showing General / Notifications / Privacy content
 * - Working switches, selects, and save button
 */
export const SettingsFlow: Story = {
    render: () => html`
        <flint-container max-width="lg" style="font-family: system-ui; padding-top: 32px; padding-bottom: 32px;">
            <!-- Hidden tracker for test assertions -->
            <span id="active-section" data-value="general" style="display: none;"></span>

            <!-- Page header -->
            <div style="margin-bottom: 24px;">
                <h2 style="margin: 0 0 4px; font-size: 1.5rem; font-weight: 700;">Settings</h2>
                <p style="margin: 0; font-size: 0.875rem; color: var(--flint-text-color-muted, #6b7280);">Manage your account preferences and configuration.</p>
            </div>

            <!-- Two-column layout: sidebar + content -->
            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 32px; align-items: start;">
                <!-- Sidebar nav -->
                <nav style="position: sticky; top: 32px;">
                    <flint-stack direction="column" gap="4px">
                        <button class="settings-nav-btn" data-section="general"
                            style="all: unset; cursor: pointer; display: block; width: 100%; box-sizing: border-box; padding: 8px 12px; border-radius: 6px; font-size: 0.875rem; font-weight: 600; background: var(--flint-primary-color-light, rgba(59,130,246,0.1)); color: var(--flint-primary-color, #3b82f6);"
                            @click=${(e: Event) => {
                                const root = (e.currentTarget as HTMLElement).closest('flint-container')!;
                                switchSection(root as HTMLElement, 'general');
                            }}>General</button>
                        <button class="settings-nav-btn" data-section="notifications"
                            style="all: unset; cursor: pointer; display: block; width: 100%; box-sizing: border-box; padding: 8px 12px; border-radius: 6px; font-size: 0.875rem; font-weight: 500; color: inherit;"
                            @click=${(e: Event) => {
                                const root = (e.currentTarget as HTMLElement).closest('flint-container')!;
                                switchSection(root as HTMLElement, 'notifications');
                            }}>Notifications</button>
                        <button class="settings-nav-btn" data-section="privacy"
                            style="all: unset; cursor: pointer; display: block; width: 100%; box-sizing: border-box; padding: 8px 12px; border-radius: 6px; font-size: 0.875rem; font-weight: 500; color: inherit;"
                            @click=${(e: Event) => {
                                const root = (e.currentTarget as HTMLElement).closest('flint-container')!;
                                switchSection(root as HTMLElement, 'privacy');
                            }}>Privacy</button>
                    </flint-stack>
                </nav>

                <!-- Content panel -->
                <div>
                    <!-- ═══ General ═══ -->
                    <div id="section-general">
                        <flint-paper elevation="1" style="padding: 24px;">
                            <h3 style="margin: 0 0 4px; font-size: 1.125rem; font-weight: 600;">General</h3>
                            <p style="margin: 0 0 20px; font-size: 0.8125rem; color: var(--flint-text-color-muted, #6b7280);">Configure your appearance and language preferences.</p>

                            <flint-stack direction="column" gap="20px">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
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
                                </div>

                                <flint-divider></flint-divider>

                                <div style="display: flex; align-items: center; justify-content: space-between;">
                                    <div>
                                        <div style="font-size: 0.875rem; font-weight: 500;">Auto-update</div>
                                        <div style="font-size: 0.8125rem; color: var(--flint-text-color-muted, #6b7280);">Automatically install the latest updates.</div>
                                    </div>
                                    <flint-switch id="auto-update" aria-label="Auto-update"></flint-switch>
                                </div>
                            </flint-stack>
                        </flint-paper>
                    </div>

                    <!-- ═══ Notifications ═══ -->
                    <div id="section-notifications" style="display: none;">
                        <flint-paper elevation="1" style="padding: 24px;">
                            <h3 style="margin: 0 0 4px; font-size: 1.125rem; font-weight: 600;">Notifications</h3>
                            <p style="margin: 0 0 20px; font-size: 0.8125rem; color: var(--flint-text-color-muted, #6b7280);">Choose how you receive notifications.</p>

                            <flint-stack direction="column" gap="16px">
                                <div style="display: flex; align-items: center; justify-content: space-between;">
                                    <div>
                                        <div style="font-size: 0.875rem; font-weight: 500;">Email notifications</div>
                                        <div style="font-size: 0.8125rem; color: var(--flint-text-color-muted, #6b7280);">Receive updates via email.</div>
                                    </div>
                                    <flint-switch id="email-notifs" aria-label="Email notifications" checked></flint-switch>
                                </div>
                                <flint-divider></flint-divider>
                                <div style="display: flex; align-items: center; justify-content: space-between;">
                                    <div>
                                        <div style="font-size: 0.875rem; font-weight: 500;">Push notifications</div>
                                        <div style="font-size: 0.8125rem; color: var(--flint-text-color-muted, #6b7280);">Receive browser push notifications.</div>
                                    </div>
                                    <flint-switch id="push-notifs" aria-label="Push notifications"></flint-switch>
                                </div>
                                <flint-divider></flint-divider>
                                <div style="display: flex; align-items: center; justify-content: space-between;">
                                    <div>
                                        <div style="font-size: 0.875rem; font-weight: 500;">SMS alerts</div>
                                        <div style="font-size: 0.8125rem; color: var(--flint-text-color-muted, #6b7280);">Get critical alerts via SMS.</div>
                                    </div>
                                    <flint-switch id="sms-notifs" aria-label="SMS alerts"></flint-switch>
                                </div>
                            </flint-stack>
                        </flint-paper>
                    </div>

                    <!-- ═══ Privacy ═══ -->
                    <div id="section-privacy" style="display: none;">
                        <flint-paper elevation="1" style="padding: 24px;">
                            <h3 style="margin: 0 0 4px; font-size: 1.125rem; font-weight: 600;">Privacy</h3>
                            <p style="margin: 0 0 20px; font-size: 0.8125rem; color: var(--flint-text-color-muted, #6b7280);">Control how your data is used.</p>

                            <flint-stack direction="column" gap="16px">
                                <div style="display: flex; align-items: center; justify-content: space-between;">
                                    <div>
                                        <div style="font-size: 0.875rem; font-weight: 500;">Allow analytics</div>
                                        <div style="font-size: 0.8125rem; color: var(--flint-text-color-muted, #6b7280);">Help us improve by sharing usage data.</div>
                                    </div>
                                    <flint-switch id="analytics" aria-label="Allow analytics"></flint-switch>
                                </div>
                                <flint-divider></flint-divider>
                                <div style="display: flex; align-items: center; justify-content: space-between;">
                                    <div>
                                        <div style="font-size: 0.875rem; font-weight: 500;">Accept cookies</div>
                                        <div style="font-size: 0.8125rem; color: var(--flint-text-color-muted, #6b7280);">Allow third-party cookies for personalization.</div>
                                    </div>
                                    <flint-switch id="cookies" aria-label="Accept cookies" checked></flint-switch>
                                </div>
                            </flint-stack>
                        </flint-paper>
                    </div>

                    <!-- Actions -->
                    <div style="display: flex; justify-content: flex-end; margin-top: 20px; gap: 8px;">
                        <flint-button id="settings-cancel" appearance="outlined" color="neutral">Cancel</flint-button>
                        <flint-button id="settings-save" appearance="filled" color="primary"
                            @click=${(e: Event) => {
                                const root = (e.target as HTMLElement).closest('flint-container')!;
                                const status = root.querySelector('#settings-status') as HTMLElement;
                                status.textContent = 'Settings saved';
                                status.style.color = 'var(--flint-success-color, #16a34a)';
                            }}
                        >Save changes</flint-button>
                    </div>

                    <p id="settings-status" style="margin: 12px 0 0; font-size: 0.875rem; font-weight: 600; min-height: 20px; text-align: right;"></p>
                </div>
            </div>
        </flint-container>
    `,

    play: async ({ canvasElement }) => {
        const user = userEvent.setup({ pointerEventsCheck: 0 });

        const getActiveSection = () =>
            (canvasElement.querySelector('#active-section') as HTMLElement).dataset.value;

        // ── Step 1: Verify General section is visible ────────────────────
        await waitFor(() => {
            expect(getActiveSection()).toBe('general');
            const generalPanel = canvasElement.querySelector('#section-general') as HTMLElement;
            expect(generalPanel.style.display).not.toBe('none');
        });

        // ── Step 2: Toggle auto-update switch ───────────────────────────
        const autoUpdate = canvasElement.querySelector('#auto-update') as HTMLElement & { checked: boolean };
        const autoUpdateWrapper = autoUpdate.shadowRoot!.querySelector('.wrapper') as HTMLElement;
        await user.click(autoUpdateWrapper);

        await waitFor(() => {
            expect(autoUpdate.checked).toBe(true);
        });

        // ── Step 3: Navigate to Notifications ───────────────────────────
        const notifBtn = canvasElement.querySelector('.settings-nav-btn[data-section="notifications"]') as HTMLElement;
        await user.click(notifBtn);

        await waitFor(() => {
            expect(getActiveSection()).toBe('notifications');
            const notifsPanel = canvasElement.querySelector('#section-notifications') as HTMLElement;
            expect(notifsPanel.style.display).not.toBe('none');
            const generalPanel = canvasElement.querySelector('#section-general') as HTMLElement;
            expect(generalPanel.style.display).toBe('none');
        });

        // ── Step 4: Toggle push notifications ───────────────────────────
        const pushNotifs = canvasElement.querySelector('#push-notifs') as HTMLElement & { checked: boolean };
        const pushWrapper = pushNotifs.shadowRoot!.querySelector('.wrapper') as HTMLElement;
        await user.click(pushWrapper);

        await waitFor(() => {
            expect(pushNotifs.checked).toBe(true);
        });

        // ── Step 5: Email notifications still checked ───────────────────
        const emailNotifs = canvasElement.querySelector('#email-notifs') as HTMLElement & { checked: boolean };
        await waitFor(() => {
            expect(emailNotifs.checked).toBe(true);
        });

        // ── Step 6: Navigate to Privacy ─────────────────────────────────
        const privacyBtn = canvasElement.querySelector('.settings-nav-btn[data-section="privacy"]') as HTMLElement;
        await user.click(privacyBtn);

        await waitFor(() => {
            expect(getActiveSection()).toBe('privacy');
            const privacyPanel = canvasElement.querySelector('#section-privacy') as HTMLElement;
            expect(privacyPanel.style.display).not.toBe('none');
        });

        // ── Step 7: Navigate back to General ────────────────────────────
        const generalBtn = canvasElement.querySelector('.settings-nav-btn[data-section="general"]') as HTMLElement;
        await user.click(generalBtn);

        await waitFor(() => {
            expect(getActiveSection()).toBe('general');
        });

        // ── Step 8: Auto-update switch state persisted ──────────────────
        await waitFor(() => {
            expect(autoUpdate.checked).toBe(true);
        });

        // ── Step 9: Save ────────────────────────────────────────────────
        const saveBtn = canvasElement.querySelector('#settings-save') as HTMLElement;
        await user.click(saveBtn);

        const status = canvasElement.querySelector('#settings-status') as HTMLElement;
        await waitFor(() => {
            expect(status.textContent).toBe('Settings saved');
        });
    },
};
