import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { expect, userEvent, waitFor } from 'storybook/test';
import '../dialog/flint-dialog.js';
import '../button/flint-button.js';
import '../pagination/flint-pagination.js';
import '../box/flint-box.js';
import '../stack/flint-stack.js';
import type { FlintDialog } from '../dialog/flint-dialog.js';

const meta: Meta = {
    title: 'Playbooks/Data Explorer',
    parameters: {
        layout: 'padded',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                    { id: 'landmark-unique', enabled: false },
                    { id: 'aria-valid-attr-value', enabled: false },
                    { id: 'button-name', enabled: false },
                    { id: 'select-name', enabled: false },
                ],
            },
        },
    },
};

export default meta;
type Story = StoryObj;

const items = [
    { id: 1, name: 'Project Alpha', status: 'Active', description: 'Core platform development with microservices architecture.' },
    { id: 2, name: 'Project Beta', status: 'Paused', description: 'Mobile app redesign with new design system integration.' },
    { id: 3, name: 'Project Gamma', status: 'Active', description: 'Data pipeline optimization for real-time analytics.' },
    { id: 4, name: 'Project Delta', status: 'Completed', description: 'Cloud migration and infrastructure modernization.' },
    { id: 5, name: 'Project Epsilon', status: 'Active', description: 'Machine learning model deployment and monitoring.' },
];

/**
 * A data explorer page:
 * 1. View a list of items with "View Details" buttons
 * 2. Click "View Details" to open a dialog
 * 3. Read the dialog content and close it
 * 4. Paginate to the next page
 * 5. Verify dialog open/close and pagination state
 */
export const DataExplorerFlow: Story = {
    render: () => html`
        <div style="max-width: 700px; font-family: system-ui;">
            <h2 style="margin: 0 0 16px; font-size: 1.25rem; font-weight: 700;">Data Explorer</h2>

            <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
                    <thead>
                        <tr style="background: #f9fafb;">
                            <th style="padding: 12px 16px; text-align: left; font-weight: 600;">Name</th>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 600;">Status</th>
                            <th style="padding: 12px 16px; text-align: right; font-weight: 600;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(item => html`
                            <tr style="border-top: 1px solid #e5e7eb;">
                                <td style="padding: 12px 16px;">${item.name}</td>
                                <td style="padding: 12px 16px;">
                                    <span style="padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 500;
                                        background: ${item.status === 'Active' ? '#dcfce7' : item.status === 'Paused' ? '#fef3c7' : '#e5e7eb'};
                                        color: ${item.status === 'Active' ? '#166534' : item.status === 'Paused' ? '#92400e' : '#374151'};">
                                        ${item.status}
                                    </span>
                                </td>
                                <td style="padding: 8px 16px; text-align: right;">
                                    <flint-button
                                        class="detail-btn"
                                        appearance="outlined" color="neutral"
                                        size="small"
                                        data-item-id="${item.id}"
                                        @click=${() => {
                                            const dialog = document.getElementById('detail-dialog') as FlintDialog;
                                            const title = document.getElementById('detail-title')!;
                                            const desc = document.getElementById('detail-desc')!;
                                            const statusEl = document.getElementById('detail-status')!;
                                            title.textContent = item.name;
                                            desc.textContent = item.description;
                                            statusEl.textContent = item.status;
                                            dialog.open = true;
                                        }}
                                    >View Details</flint-button>
                                </td>
                            </tr>
                        `)}
                    </tbody>
                </table>
            </div>

            <flint-box display="flex" justifyContent="center" style="margin-top: 16px;">
                <flint-pagination
                    id="data-pagination"
                    count="5"
                    page="1"
                    @flint-pagination-change=${(e: CustomEvent) => {
                        const pag = e.target as HTMLElement & { page: number };
                        pag.page = e.detail.page;
                        const pageDisplay = document.getElementById('page-display')!;
                        pageDisplay.textContent = `Page ${e.detail.page} of 5`;
                    }}
                ></flint-pagination>
            </flint-box>

            <p id="page-display" style="text-align: center; font-size: 0.875rem; color: #6b7280; margin-top: 8px;">
                Page 1 of 5
            </p>

            <flint-dialog id="detail-dialog" @flint-dialog-close=${(e: Event) => {
                (e.target as FlintDialog).open = false;
            }}>
                <flint-dialog-title id="detail-title">Project</flint-dialog-title>
                <flint-dialog-content>
                    <flint-dialog-content-text>
                        <strong>Status: </strong><span id="detail-status"></span>
                    </flint-dialog-content-text>
                    <flint-dialog-content-text id="detail-desc">
                        Description here.
                    </flint-dialog-content-text>
                </flint-dialog-content>
                <flint-dialog-actions>
                    <flint-button id="dialog-close-btn" appearance="outlined" color="neutral" @click=${(e: Event) => {
                        const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
                        if (d) d.open = false;
                    }}>Close</flint-button>
                    <flint-button appearance="filled" color="primary" @click=${(e: Event) => {
                        const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
                        if (d) d.open = false;
                    }}>Edit Project</flint-button>
                </flint-dialog-actions>
            </flint-dialog>
        </div>
    `,

    play: async ({ canvasElement }) => {
        const user = userEvent.setup({ pointerEventsCheck: 0 });

        // ── Step 1: Verify the table renders with items ─────────────────
        await waitFor(() => {
            const rows = canvasElement.querySelectorAll('tbody tr');
            expect(rows.length).toBe(5);
        });

        // ── Step 2: Verify dialog is initially closed ───────────────────
        const dialog = canvasElement.querySelector('#detail-dialog') as FlintDialog;
        expect(dialog.open).toBe(false);

        // ── Step 3: Click "View Details" on the first item ──────────────
        const firstDetailBtn = canvasElement.querySelector('.detail-btn') as HTMLElement;
        await user.click(firstDetailBtn);

        await waitFor(() => {
            expect(dialog.open).toBe(true);
        });

        // ── Step 4: Verify dialog content ───────────────────────────────
        const dialogTitle = canvasElement.querySelector('#detail-title') as HTMLElement;
        const dialogDesc = canvasElement.querySelector('#detail-desc') as HTMLElement;
        const dialogStatus = canvasElement.querySelector('#detail-status') as HTMLElement;

        await waitFor(() => {
            expect(dialogTitle.textContent).toBe('Project Alpha');
            expect(dialogDesc.textContent).toContain('Core platform development');
            expect(dialogStatus.textContent).toBe('Active');
        });

        // ── Step 5: Close the dialog ────────────────────────────────────
        const closeBtn = canvasElement.querySelector('#dialog-close-btn') as HTMLElement;
        await user.click(closeBtn);

        await waitFor(() => {
            expect(dialog.open).toBe(false);
        });

        // ── Step 6: Navigate pagination forward ─────────────────────────
        const pagination = canvasElement.querySelector('#data-pagination') as HTMLElement & { page: number };
        // Find the "next" button inside pagination's shadow DOM
        const nextBtn = pagination.shadowRoot!.querySelector('.page-btn[aria-label="Next page"]') as HTMLElement;
        if (nextBtn) {
            await user.click(nextBtn);

            await waitFor(() => {
                expect(pagination.page).toBe(2);
            });

            // ── Step 7: Verify page display text updated ────────────────
            const pageDisplay = canvasElement.querySelector('#page-display') as HTMLElement;
            await waitFor(() => {
                expect(pageDisplay.textContent).toBe('Page 2 of 5');
            });
        }
    },
};
