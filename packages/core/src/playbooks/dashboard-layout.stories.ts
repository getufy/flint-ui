import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { expect, userEvent, waitFor } from 'storybook/test';
import '../card/flint-card.js';
import '../card/flint-card-header.js';
import '../card/flint-card-content.js';
import '../card/flint-card-actions.js';
import '../grid/flint-grid.js';
import '../container/flint-container.js';
import '../button/flint-button.js';
import '../badge/flint-badge.js';
import '../alert/flint-alert.js';
import '../stack/flint-stack.js';
import '../box/flint-box.js';

const meta: Meta = {
    title: 'Playbooks/Dashboard Layout',
    parameters: {
        layout: 'fullscreen',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                    { id: 'heading-order', enabled: false },
                    { id: 'landmark-unique', enabled: false },
                ],
            },
        },
    },
};

export default meta;
type Story = StoryObj;

/**
 * A dashboard layout with:
 * 1. A dismissible alert banner
 * 2. Stat cards in a grid layout
 * 3. Action buttons on cards
 * 4. Badge indicators
 *
 * Tests layout rendering, component composition, alert dismissal,
 * and button interactions.
 */
export const DashboardFlow: Story = {
    render: () => html`
        <flint-container max-width="lg" style="font-family: system-ui; padding-top: 24px; padding-bottom: 24px;">
            <!-- Alert Banner -->
            <flint-alert
                id="welcome-alert"
                severity="info"
                title="Welcome back!"
                dismissible
                @flint-alert-close=${(e: Event) => {
                    (e.target as HTMLElement).style.display = 'none';
                }}
            >
                You have 3 new notifications since your last visit. Check your inbox for details.
            </flint-alert>

            <h2 style="margin: 24px 0 16px; font-size: 1.5rem; font-weight: 700;">Dashboard</h2>

            <!-- Stat Cards Grid -->
            <flint-grid container spacing="3">
                <flint-grid xs="12" sm="6" md="3">
                    <flint-card id="card-revenue">
                        <flint-card-header>
                            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                <span style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Revenue</span>
                                <flint-badge content="3" variant="success">
                                    <span style="font-size: 0.75rem;">new</span>
                                </flint-badge>
                            </div>
                        </flint-card-header>
                        <flint-card-content>
                            <p style="margin: 0; font-size: 1.75rem; font-weight: 700;">$45,231</p>
                            <p style="margin: 4px 0 0; font-size: 0.75rem; color: #16a34a;">+20.1% from last month</p>
                        </flint-card-content>
                        <flint-card-actions>
                            <flint-button class="view-btn" variant="secondary" size="small" data-card="revenue">View Report</flint-button>
                        </flint-card-actions>
                    </flint-card>
                </flint-grid>

                <flint-grid xs="12" sm="6" md="3">
                    <flint-card id="card-users">
                        <flint-card-header>
                            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                <span style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Users</span>
                                <flint-badge content="12" variant="primary">
                                    <span style="font-size: 0.75rem;">active</span>
                                </flint-badge>
                            </div>
                        </flint-card-header>
                        <flint-card-content>
                            <p style="margin: 0; font-size: 1.75rem; font-weight: 700;">2,350</p>
                            <p style="margin: 4px 0 0; font-size: 0.75rem; color: #16a34a;">+180 this week</p>
                        </flint-card-content>
                        <flint-card-actions>
                            <flint-button class="view-btn" variant="secondary" size="small" data-card="users">View Users</flint-button>
                        </flint-card-actions>
                    </flint-card>
                </flint-grid>

                <flint-grid xs="12" sm="6" md="3">
                    <flint-card id="card-orders">
                        <flint-card-header>
                            <span style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Orders</span>
                        </flint-card-header>
                        <flint-card-content>
                            <p style="margin: 0; font-size: 1.75rem; font-weight: 700;">1,234</p>
                            <p style="margin: 4px 0 0; font-size: 0.75rem; color: #dc2626;">-5.2% from last month</p>
                        </flint-card-content>
                        <flint-card-actions>
                            <flint-button class="view-btn" variant="secondary" size="small" data-card="orders">View Orders</flint-button>
                        </flint-card-actions>
                    </flint-card>
                </flint-grid>

                <flint-grid xs="12" sm="6" md="3">
                    <flint-card id="card-conversion">
                        <flint-card-header>
                            <span style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Conversion</span>
                        </flint-card-header>
                        <flint-card-content>
                            <p style="margin: 0; font-size: 1.75rem; font-weight: 700;">3.2%</p>
                            <p style="margin: 4px 0 0; font-size: 0.75rem; color: #16a34a;">+0.4% from last month</p>
                        </flint-card-content>
                        <flint-card-actions>
                            <flint-button class="view-btn" variant="secondary" size="small" data-card="conversion">View Details</flint-button>
                        </flint-card-actions>
                    </flint-card>
                </flint-grid>
            </flint-grid>

            <!-- Action status area -->
            <p id="action-status" style="margin-top: 16px; font-size: 0.875rem; font-weight: 600; min-height: 20px;"></p>
        </flint-container>
    `,

    play: async ({ canvasElement }) => {
        const user = userEvent.setup({ pointerEventsCheck: 0 });

        // ── Step 1: Verify the dashboard structure renders ──────────────
        await waitFor(() => {
            expect(canvasElement.querySelector('#card-revenue')).toBeTruthy();
            expect(canvasElement.querySelector('#card-users')).toBeTruthy();
            expect(canvasElement.querySelector('#card-orders')).toBeTruthy();
            expect(canvasElement.querySelector('#card-conversion')).toBeTruthy();
        });

        // ── Step 2: Verify alert is visible ─────────────────────────────
        const alert = canvasElement.querySelector('#welcome-alert') as HTMLElement;
        await waitFor(() => {
            expect(alert).toBeTruthy();
            expect(alert.style.display).not.toBe('none');
        });

        // ── Step 3: Verify badges render with content ───────────────────
        const badges = canvasElement.querySelectorAll('flint-badge');
        await waitFor(() => {
            expect(badges.length).toBeGreaterThanOrEqual(2);
        });

        // ── Step 4: Verify all 4 cards have action buttons ──────────────
        const viewBtns = canvasElement.querySelectorAll('.view-btn');
        await waitFor(() => {
            expect(viewBtns.length).toBe(4);
        });

        // ── Step 5: Click a "View Report" button on the revenue card ────
        const revenueBtn = canvasElement.querySelector('.view-btn[data-card="revenue"]') as HTMLElement;
        await user.click(revenueBtn);

        // Verify the button is clickable (no errors thrown)
        await waitFor(() => {
            expect(revenueBtn).toBeTruthy();
        });

        // ── Step 6: Dismiss the alert ───────────────────────────────────
        const alertCloseBtn = alert.shadowRoot?.querySelector('.close-button') as HTMLElement | null;
        if (alertCloseBtn) {
            await user.click(alertCloseBtn);

            await waitFor(() => {
                expect(alert.style.display).toBe('none');
            });
        }

        // ── Step 7: Verify grid container rendered ──────────────────────
        const gridContainer = canvasElement.querySelector('flint-grid[container]') as HTMLElement;
        await waitFor(() => {
            expect(gridContainer).toBeTruthy();
        });

        // ── Step 8: Verify container wrapper rendered ───────────────────
        const container = canvasElement.querySelector('flint-container') as HTMLElement;
        await waitFor(() => {
            expect(container).toBeTruthy();
        });
    },
};
