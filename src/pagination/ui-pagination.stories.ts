import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { UiPagination } from './ui-pagination';
import './ui-pagination';

const meta: Meta = {
    title: 'Navigation/Pagination',
    component: 'ui-pagination',
    argTypes: {
        count: { control: { type: 'number', min: 1 } },
        page: { control: { type: 'number', min: 1 } },
        variant: { control: { type: 'select' }, options: ['text', 'outlined'] },
        shape: { control: { type: 'select' }, options: ['circular', 'rounded', 'square'] },
        size: { control: { type: 'select' }, options: ['small', 'medium', 'large'] },
        color: { control: { type: 'select' }, options: ['primary', 'secondary', 'standard'] },
        showFirstButton: { control: 'boolean' },
        showLastButton: { control: 'boolean' },
        hidePrevButton: { control: 'boolean' },
        hideNextButton: { control: 'boolean' },
        siblingCount: { control: { type: 'number', min: 0 } },
        boundaryCount: { control: { type: 'number', min: 0 } },
        disabled: { control: 'boolean' },
    },
};
export default meta;
type Story = StoryObj;

const box = (title: string, content: unknown) => html`
    <div style="display:flex;flex-direction:column;gap:8px;padding:0 0 4px;">
        <span style="font-size:.7rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;">${title}</span>
        ${content}
    </div>
`;

const section = (content: unknown) => html`
    <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#fff;border:1px solid #e2e8f0;border-radius:8px;font-family:Inter,sans-serif;">
        ${content}
    </div>
`;



/* ================================================================== */
/* Playground                                                           */
/* ================================================================== */
export const Playground: Story = {
    args: {
        count: 10, page: 1, variant: 'text', shape: 'circular',
        size: 'medium', color: 'primary', showFirstButton: false,
        showLastButton: false, hidePrevButton: false, hideNextButton: false,
        siblingCount: 1, boundaryCount: 1, disabled: false,
    },
    render: (args) => html`
        <div style="padding:24px;background:#fff;border:1px solid #e2e8f0;border-radius:8px;font-family:Inter,sans-serif;">
            <ui-pagination
                count=${args.count}
                page=${args.page}
                .variant=${args.variant}
                .shape=${args.shape}
                .size=${args.size}
                .color=${args.color}
                ?showFirstButton=${args.showFirstButton}
                ?showLastButton=${args.showLastButton}
                ?hidePrevButton=${args.hidePrevButton}
                ?hideNextButton=${args.hideNextButton}
                .siblingCount=${args.siblingCount}
                .boundaryCount=${args.boundaryCount}
                ?disabled=${args.disabled}
                @ui-pagination-change=${(e: CustomEvent) => {
            (e.currentTarget as UiPagination).page = e.detail.page;
        }}
            ></ui-pagination>
        </div>
    `,
};

/* ================================================================== */
/* Basic                                                               */
/* ================================================================== */
export const Basic: Story = {
    render: () => section(html`
        ${box('Default (text)', html`
            <ui-pagination count="10" page="1"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Disabled', html`
            <ui-pagination count="10" page="3" disabled></ui-pagination>
        `)}
        ${box('No boundary (siblingCount=2)', html`
            <ui-pagination count="10" page="6" sibling-count="2"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Outlined                                                            */
/* ================================================================== */
export const Outlined: Story = {
    render: () => section(html`
        ${box('Outlined', html`
            <ui-pagination count="10" page="1" variant="outlined"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Outlined + Rounded', html`
            <ui-pagination count="10" page="4" variant="outlined" shape="rounded"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Rounded                                                             */
/* ================================================================== */
export const Rounded: Story = {
    render: () => section(html`
        ${box('Text + Rounded', html`
            <ui-pagination count="10" page="1" shape="rounded"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Outlined + Rounded', html`
            <ui-pagination count="10" page="3" variant="outlined" shape="rounded"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Text + Square', html`
            <ui-pagination count="10" page="5" shape="square"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Sizes                                                               */
/* ================================================================== */
export const Sizes: Story = {
    render: () => section(html`
        ${box('Small', html`
            <ui-pagination count="10" page="1" size="small"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Medium (default)', html`
            <ui-pagination count="10" page="1"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Large', html`
            <ui-pagination count="10" page="1" size="large"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Buttons                                                             */
/* ================================================================== */
export const Buttons: Story = {
    render: () => section(html`
        ${box('Show first & last buttons', html`
            <ui-pagination count="10" page="5" show-first-button show-last-button
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Hide prev & next buttons', html`
            <ui-pagination count="10" page="5" hide-prev-button hide-next-button
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('All navigation buttons', html`
            <ui-pagination count="10" page="5" show-first-button show-last-button
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Custom Icons                                                        */
/* ================================================================== */
export const CustomIcons: Story = {
    render: () => section(html`
        ${box('Emoji icons (prev/next overridden)', html`
            <ui-pagination
                count="10" page="5"
                prev-icon="&larr;"
                next-icon="&rarr;"
                first-icon="⏮"
                last-icon="⏭"
                show-first-button show-last-button
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Text arrows', html`
            <ui-pagination
                count="10" page="3"
                prev-icon="‹ Prev"
                next-icon="Next ›"
                variant="outlined" shape="rounded"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Pagination Ranges                                                   */
/* ================================================================== */
export const PaginationRanges: Story = {
    render: () => section(html`
        ${box('siblingCount=0', html`
            <ui-pagination count="11" page="6" sibling-count="0"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('siblingCount=1 (default)', html`
            <ui-pagination count="11" page="6" sibling-count="1"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('siblingCount=2', html`
            <ui-pagination count="11" page="6" sibling-count="2"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('boundaryCount=2', html`
            <ui-pagination count="11" page="6" boundary-count="2"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Controlled                                                          */
/* ================================================================== */
export const Controlled: Story = {
    render: () => {
        let page = 3;
        return html`
            <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#fff;border:1px solid #e2e8f0;border-radius:8px;font-family:Inter,sans-serif;">
                <div style="display:flex;align-items:center;gap:12px;font-size:.875rem;color:#64748b;">
                    <span>Current page:</span>
                    <strong id="cp-label" style="font-size:1.1rem;color:#1e293b;">${page}</strong>
                    <span style="color:#94a3b8;">/ 10</span>
                </div>

                <ui-pagination
                    id="cp-pagination"
                    count="10"
                    page=${page}
                    variant="outlined"
                    show-first-button
                    show-last-button
                    @ui-pagination-change=${(e: CustomEvent) => {
                page = e.detail.page;
                (e.currentTarget as UiPagination).page = page;
                const label = document.getElementById('cp-label');
                if (label) label.textContent = String(page);
            }}
                ></ui-pagination>

                <div style="padding:12px 16px;background:#f8fafc;border-radius:6px;font-size:.825rem;color:#64748b;border:1px solid #e2e8f0;">
                    Showing items <strong>${(page - 1) * 10 + 1}–${Math.min(page * 10, 95)}</strong> of <strong>95</strong>
                </div>
            </div>
        `;
    },
};

/* ================================================================== */
/* Colors                                                              */
/* ================================================================== */
export const Colors: Story = {
    render: () => section(html`
        ${box('Primary (default)', html`
            <ui-pagination count="10" page="5" color="primary"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Secondary', html`
            <ui-pagination count="10" page="5" color="secondary"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Standard', html`
            <ui-pagination count="10" page="5" color="standard"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
        ${box('Secondary + Outlined', html`
            <ui-pagination count="10" page="5" color="secondary" variant="outlined"
                @ui-pagination-change=${(e: CustomEvent) => { (e.currentTarget as UiPagination).page = e.detail.page; }}>
            </ui-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Table Pagination Style                                              */
/* ================================================================== */
export const TablePaginationStyle: Story = {
    render: () => {
        let page = 0;
        let rowsPerPage = 5;
        const totalRows = 23;
        const rows = Array.from({ length: totalRows }, (_, i) => ({
            id: i + 1,
            name: ['Alice', 'Bob', 'Charlie', 'Diana', 'Evan', 'Fiona', 'George', 'Hannah',
                'Ivan', 'Julia', 'Kevin', 'Laura', 'Mike', 'Nora', 'Oscar', 'Pam',
                'Quinn', 'Ray', 'Sophia', 'Tom', 'Uma', 'Victor', 'Wendy'][i],
            role: ['Engineer', 'Designer', 'Manager', 'Engineer', 'Designer'][i % 5],
        }));

        function getRows() { return rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage); }
        const totalPages = () => Math.ceil(totalRows / rowsPerPage);

        return html`
            <div style="font-family:Inter,sans-serif;background:#fff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <!-- Table -->
                <table style="width:100%;border-collapse:collapse;font-size:.875rem;">
                    <thead>
                        <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                            <th style="padding:10px 16px;text-align:left;font-weight:600;color:#374151;">#</th>
                            <th style="padding:10px 16px;text-align:left;font-weight:600;color:#374151;">Name</th>
                            <th style="padding:10px 16px;text-align:left;font-weight:600;color:#374151;">Role</th>
                        </tr>
                    </thead>
                    <tbody id="tp-tbody">
                        ${getRows().map(row => html`
                            <tr style="border-bottom:1px solid #f1f5f9;">
                                <td style="padding:10px 16px;color:#6b7280;">${row.id}</td>
                                <td style="padding:10px 16px;color:#111827;">${row.name}</td>
                                <td style="padding:10px 16px;color:#6b7280;">${row.role}</td>
                            </tr>
                        `)}
                    </tbody>
                </table>

                <!-- Pagination bar -->
                <div style="display:flex;align-items:center;justify-content:flex-end;gap:16px;padding:10px 16px;border-top:1px solid #e2e8f0;font-size:.8rem;color:#6b7280;flex-wrap:wrap;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span>Rows per page:</span>
                        <select
                            style="border:1px solid #e2e8f0;border-radius:4px;padding:2px 6px;font-size:.8rem;outline:none;background:#fff;cursor:pointer;"
                            @change=${(e: Event) => {
                rowsPerPage = parseInt((e.target as HTMLSelectElement).value);
                page = 0;
                const el = document.getElementById('tp-pg') as UiPagination;
                const tbody = document.getElementById('tp-tbody');
                if (el) { el.count = totalPages(); el.page = 1; }
                if (tbody) tbody.innerHTML = getRows().map(r =>
                    `<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 16px;color:#6b7280;">${r.id}</td><td style="padding:10px 16px;color:#111827;">${r.name}</td><td style="padding:10px 16px;color:#6b7280;">${r.role}</td></tr>`
                ).join('');
            }}
                        >
                            ${[5, 10, 25].map(n => html`<option value=${n} ?selected=${n === rowsPerPage}>${n}</option>`)}
                        </select>
                    </div>

                    <span id="tp-range">${page * rowsPerPage + 1}–${Math.min((page + 1) * rowsPerPage, totalRows)} of ${totalRows}</span>

                    <ui-pagination
                        id="tp-pg"
                        count=${totalPages()}
                        page=${page + 1}
                        size="small"
                        hide-prev-button
                        hide-next-button
                        @ui-pagination-change=${(e: CustomEvent) => {
                page = e.detail.page - 1;
                (e.currentTarget as UiPagination).page = e.detail.page;
                const range = document.getElementById('tp-range');
                const tbody = document.getElementById('tp-tbody');
                if (range) range.textContent = `${page * rowsPerPage + 1}–${Math.min((page + 1) * rowsPerPage, totalRows)} of ${totalRows}`;
                if (tbody) tbody.innerHTML = getRows().map(r =>
                    `<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 16px;color:#6b7280;">${r.id}</td><td style="padding:10px 16px;color:#111827;">${r.name}</td><td style="padding:10px 16px;color:#6b7280;">${r.role}</td></tr>`
                ).join('');
            }}
                    ></ui-pagination>

                    <div style="display:flex;gap:2px;">
                        <button
                            style="background:none;border:none;cursor:pointer;padding:4px;border-radius:4px;display:flex;align-items:center;color:#374151;"
                            ?disabled=${page === 0}
                            @click=${(e: Event) => {
                if (page <= 0) return;
                page--;
                const el = document.getElementById('tp-pg') as UiPagination;
                const range = document.getElementById('tp-range');
                const tbody = document.getElementById('tp-tbody');
                if (el) el.page = page + 1;
                if (range) range.textContent = `${page * rowsPerPage + 1}–${Math.min((page + 1) * rowsPerPage, totalRows)} of ${totalRows}`;
                if (tbody) tbody.innerHTML = getRows().map(r =>
                    `<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 16px;color:#6b7280;">${r.id}</td><td style="padding:10px 16px;color:#111827;">${r.name}</td><td style="padding:10px 16px;color:#6b7280;">${r.role}</td></tr>`
                ).join('');
                (e.currentTarget as HTMLButtonElement).disabled = page === 0;
            }}
                        ><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button>
                        <button
                            style="background:none;border:none;cursor:pointer;padding:4px;border-radius:4px;display:flex;align-items:center;color:#374151;"
                            ?disabled=${page >= totalPages() - 1}
                            @click=${(e: Event) => {
                if (page >= totalPages() - 1) return;
                page++;
                const el = document.getElementById('tp-pg') as UiPagination;
                const range = document.getElementById('tp-range');
                const tbody = document.getElementById('tp-tbody');
                if (el) el.page = page + 1;
                if (range) range.textContent = `${page * rowsPerPage + 1}–${Math.min((page + 1) * rowsPerPage, totalRows)} of ${totalRows}`;
                if (tbody) tbody.innerHTML = getRows().map(r =>
                    `<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 16px;color:#6b7280;">${r.id}</td><td style="padding:10px 16px;color:#111827;">${r.name}</td><td style="padding:10px 16px;color:#6b7280;">${r.role}</td></tr>`
                ).join('');
                (e.currentTarget as HTMLButtonElement).disabled = page >= totalPages() - 1;
            }}
                        ><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>
                    </div>
                </div>
            </div>
        `;
    },
};
