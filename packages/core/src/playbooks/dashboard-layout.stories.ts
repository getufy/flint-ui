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
import '../app-bar/flint-app-bar.js';
import '../divider/flint-divider.js';
import '../table/flint-table.js';

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
                    { id: 'button-name', enabled: false },
                    { id: 'nested-interactive', enabled: false },
                ],
            },
        },
    },
};

export default meta;
type Story = StoryObj;

const recentOrders = [
    { id: '#ORD-7291', customer: 'Alice Chen',     amount: '$320.00', status: 'Completed' },
    { id: '#ORD-7292', customer: 'Bob Martinez',   amount: '$150.00', status: 'Processing' },
    { id: '#ORD-7293', customer: 'Carol Wu',       amount: '$890.00', status: 'Completed' },
    { id: '#ORD-7294', customer: 'Dave Kim',        amount: '$45.00',  status: 'Pending' },
    { id: '#ORD-7295', customer: 'Eve Patel',       amount: '$210.00', status: 'Completed' },
];

/**
 * A dashboard layout with:
 * 1. An app bar header
 * 2. A dismissible alert banner
 * 3. Stat cards in a responsive grid
 * 4. A recent orders table
 * 5. Badge indicators and action buttons
 */
export const DashboardFlow: Story = {
    render: () => html`
        <!-- App bar -->
        <flint-app-bar title="Dashboard" variant="outlined">
            <span slot="navigation" style="font-weight: 700; font-size: 1.125rem; display: flex; align-items: center; gap: 8px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect></svg>
            </span>
            <span slot="actions" style="display: flex; align-items: center; gap: 8px;">
                <flint-badge content="3" variant="destructive" overlap>
                    <flint-button appearance="text" color="neutral" size="small">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    </flint-button>
                </flint-badge>
            </span>
        </flint-app-bar>

        <flint-container max-width="lg" style="font-family: system-ui; padding-top: 24px; padding-bottom: 32px;">
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

            <div style="margin-top: 24px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between;">
                <h2 style="margin: 0; font-size: 1.25rem; font-weight: 700;">Overview</h2>
                <flint-button appearance="outlined" color="neutral" size="small">Download Report</flint-button>
            </div>

            <!-- Stat Cards Grid -->
            <flint-grid container spacing="3">
                <flint-grid xs="12" sm="6" md="3">
                    <flint-card id="card-revenue">
                        <flint-card-header>
                            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                <span style="font-size: 0.875rem; font-weight: 500; color: var(--flint-text-color-muted, #6b7280);">Revenue</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--flint-text-color-muted, #6b7280)" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </div>
                        </flint-card-header>
                        <flint-card-content>
                            <p style="margin: 0; font-size: 1.75rem; font-weight: 700;">$45,231</p>
                            <p style="margin: 4px 0 0; font-size: 0.75rem; color: #16a34a;">+20.1% from last month</p>
                        </flint-card-content>
                    </flint-card>
                </flint-grid>

                <flint-grid xs="12" sm="6" md="3">
                    <flint-card id="card-users">
                        <flint-card-header>
                            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                <span style="font-size: 0.875rem; font-weight: 500; color: var(--flint-text-color-muted, #6b7280);">Users</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--flint-text-color-muted, #6b7280)" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </div>
                        </flint-card-header>
                        <flint-card-content>
                            <p style="margin: 0; font-size: 1.75rem; font-weight: 700;">2,350</p>
                            <p style="margin: 4px 0 0; font-size: 0.75rem; color: #16a34a;">+180 this week</p>
                        </flint-card-content>
                    </flint-card>
                </flint-grid>

                <flint-grid xs="12" sm="6" md="3">
                    <flint-card id="card-orders">
                        <flint-card-header>
                            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                <span style="font-size: 0.875rem; font-weight: 500; color: var(--flint-text-color-muted, #6b7280);">Orders</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--flint-text-color-muted, #6b7280)" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                            </div>
                        </flint-card-header>
                        <flint-card-content>
                            <p style="margin: 0; font-size: 1.75rem; font-weight: 700;">1,234</p>
                            <p style="margin: 4px 0 0; font-size: 0.75rem; color: #dc2626;">-5.2% from last month</p>
                        </flint-card-content>
                    </flint-card>
                </flint-grid>

                <flint-grid xs="12" sm="6" md="3">
                    <flint-card id="card-conversion">
                        <flint-card-header>
                            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                <span style="font-size: 0.875rem; font-weight: 500; color: var(--flint-text-color-muted, #6b7280);">Conversion</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--flint-text-color-muted, #6b7280)" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                            </div>
                        </flint-card-header>
                        <flint-card-content>
                            <p style="margin: 0; font-size: 1.75rem; font-weight: 700;">3.2%</p>
                            <p style="margin: 4px 0 0; font-size: 0.75rem; color: #16a34a;">+0.4% from last month</p>
                        </flint-card-content>
                    </flint-card>
                </flint-grid>
            </flint-grid>

            <!-- Recent Orders -->
            <div style="margin-top: 32px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                    <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">Recent Orders</h3>
                    <flint-button class="view-btn" appearance="text" color="primary" size="small" data-card="orders">View all</flint-button>
                </div>
                <flint-table-container>
                    <flint-table size="sm">
                        <flint-table-head>
                            <flint-table-row>
                                <flint-table-cell header>Order ID</flint-table-cell>
                                <flint-table-cell header>Customer</flint-table-cell>
                                <flint-table-cell header align="right">Amount</flint-table-cell>
                                <flint-table-cell header align="right">Status</flint-table-cell>
                            </flint-table-row>
                        </flint-table-head>
                        <flint-table-body>
                            ${recentOrders.map(order => html`
                                <flint-table-row>
                                    <flint-table-cell style="font-weight: 500;">${order.id}</flint-table-cell>
                                    <flint-table-cell>${order.customer}</flint-table-cell>
                                    <flint-table-cell align="right">${order.amount}</flint-table-cell>
                                    <flint-table-cell align="right">
                                        <span style="font-size: 0.75rem; font-weight: 500; padding: 2px 8px; border-radius: 12px;
                                            background: ${order.status === 'Completed' ? 'var(--flint-success-color-light, #dcfce7)' : order.status === 'Processing' ? 'var(--flint-info-color-light, #dbeafe)' : 'var(--flint-warning-color-light, #fef3c7)'};
                                            color: ${order.status === 'Completed' ? 'var(--flint-success-color, #166534)' : order.status === 'Processing' ? 'var(--flint-info-color, #1e40af)' : 'var(--flint-warning-color, #92400e)'};">
                                            ${order.status}
                                        </span>
                                    </flint-table-cell>
                                </flint-table-row>
                            `)}
                        </flint-table-body>
                    </flint-table>
                </flint-table-container>
            </div>
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

        // ── Step 3: Verify the recent orders table renders ──────────────
        const orderRows = canvasElement.querySelectorAll('flint-table-body flint-table-row');
        await waitFor(() => {
            expect(orderRows.length).toBe(5);
        });

        // ── Step 4: Verify app bar renders ──────────────────────────────
        const appBar = canvasElement.querySelector('flint-app-bar') as HTMLElement;
        await waitFor(() => {
            expect(appBar).toBeTruthy();
        });

        // ── Step 5: Dismiss the alert ───────────────────────────────────
        const alertCloseBtn = alert.shadowRoot?.querySelector('.close-button') as HTMLElement | null;
        if (alertCloseBtn) {
            await user.click(alertCloseBtn);

            await waitFor(() => {
                expect(alert.style.display).toBe('none');
            });
        }

        // ── Step 6: Verify grid container rendered ──────────────────────
        const gridContainer = canvasElement.querySelector('flint-grid[container]') as HTMLElement;
        await waitFor(() => {
            expect(gridContainer).toBeTruthy();
        });
    },
};
