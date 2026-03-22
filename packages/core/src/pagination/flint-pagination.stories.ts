import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import { FlintPagination } from './flint-pagination';
import './flint-pagination';
import '../box/flint-box';
import '../paper/flint-paper';
import '../stack/flint-stack';

const meta: Meta = {
    title: 'Navigation/Pagination',
    component: 'flint-pagination',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'landmark-unique', enabled: false },
                    { id: 'color-contrast', enabled: false },
                    { id: 'aria-valid-attr-value', enabled: false },
                    { id: 'button-name', enabled: false },
                    { id: 'select-name', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
Pagination component enabling the user to select a specific page from
a range of pages.

- **Tag**: \`<flint-pagination>\`
- **Class**: \`FlintPagination\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`count\` | \`count\` | \`number\` | \`1\` | Total number of pages. |
| \`page\` | \`page\` | \`number\` | \`1\` | The current page (1-based). In controlled mode, update this from the flint-pagination-change event. |
| \`defaultPage\` | \`default-page\` | \`number\` | \`1\` | Initial page for uncontrolled mode. Ignored after first render. |
| \`label\` | \`label\` | \`string\` | \`''\` | Accessible label for the nav landmark (aria-label). |
| \`variant\` | \`variant\` | \`'text' \\| 'outlined'\` | \`'text'\` | Visual style variant of the pagination buttons. |
| \`shape\` | \`shape\` | \`'circular' \\| 'rounded' \\| 'square'\` | \`'circular'\` | Shape of the pagination buttons. |
| \`size\` | \`size\` | \`Size\` | \`'md'\` | Size of the pagination buttons. |
| \`color\` | \`color\` | \`'primary' \\| 'secondary' \\| 'standard'\` | \`'primary'\` | Color theme of the pagination buttons. |
| \`showFirstButton\` | \`show-first-button\` | \`boolean\` | \`false\` | Show first-page button. |
| \`showLastButton\` | \`show-last-button\` | \`boolean\` | \`false\` | Show last-page button. |
| \`hidePrevButton\` | \`hide-prev-button\` | \`boolean\` | \`false\` | Hide previous button. |
| \`hideNextButton\` | \`hide-next-button\` | \`boolean\` | \`false\` | Hide next button. |
| \`siblingCount\` | \`sibling-count\` | \`number\` | \`1\` | Number of sibling pages around the current page. |
| \`boundaryCount\` | \`boundary-count\` | \`number\` | \`1\` | Number of pages always shown at start and end. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disable the whole component. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-pagination-change\` | \`&#123; page: number &#125;\` | Fired when the active page changes. detail: \`&#123; page: number &#125;\` |

#### Slots

| Name | Description |
|---|---|
| \`prev-icon\` | Icon for the previous button (default: chevron left SVG). |
| \`next-icon\` | Icon for the next button (default: chevron right SVG). |
| \`first-icon\` | Icon for the first button (default: skip-to-start SVG). |
| \`last-icon\` | Icon for the last button (default: skip-to-end SVG). |
| \`ellipsis-icon\` | Icon for ellipsis items (default: three-dot SVG). |

#### CSS Parts

| Name | Description |
|---|---|
| \`base\` | The component's base wrapper element. |
| \`button\` | The button element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-pagination-gap\` | \`4px\` |
| \`--flint-pagination-btn-size\` | \`36px\` |
| \`--flint-pagination-btn-radius\` | \`4px\` |
| \`--flint-pagination-btn-font-size\` | \`0.875rem\` |
| \`--flint-pagination-focus-ring-color\` | \`var(--flint-primary-color\` |
| \`--flint-pagination-active-bg\` | \`var(--flint-primary-color\` |
| \`--flint-pagination-active-color\` | \`var(--flint-text-color-on-primary\` |
| \`--flint-pagination-disabled-opacity\` | \`0.38\` |
| \`--flint-pagination-outlined-border\` | \`var(--flint-border-color\` |
| \`--flint-pagination-outlined-hover-bg\` | \`var(--flint-primary-color-light\` |
| \`--flint-pagination-outlined-hover-border\` | \`var(--flint-primary-color\` |
| \`--flint-pagination-active-bg-secondary\` | \`var(--flint-secondary-color\` |
| \`--flint-pagination-active-bg-standard\` | \`var(--flint-text-color\` |
| \`--flint-pagination-btn-radius-rounded\` | \`8px\` |
| \`--flint-pagination-btn-size-sm\` | \`28px\` |
| \`--flint-pagination-btn-font-size-sm\` | \`0.8125rem\` |
| \`--flint-pagination-btn-size-lg\` | \`44px\` |
| \`--flint-pagination-btn-font-size-lg\` | \`0.9375rem\` |
| \`--flint-font-family\` | — |
| \`--flint-text-color\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-text-color-muted\` | — |
                `,
            },
        },
    },
    argTypes: {
        count: { control: { type: 'number', min: 1 } },
        page: { control: { type: 'number', min: 1 } },
        defaultPage: { control: { type: 'number', min: 1 } },
        label: { control: 'text' },
        variant: { control: { type: 'select' }, options: ['text', 'outlined'] },
        shape: { control: { type: 'select' }, options: ['circular', 'rounded', 'square'] },
        size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
        color: { control: { type: 'select' }, options: ['primary', 'secondary', 'standard'] },
        showFirstButton: { control: 'boolean' },
        showLastButton: { control: 'boolean' },
        hidePrevButton: { control: 'boolean' },
        hideNextButton: { control: 'boolean' },
        siblingCount: { control: { type: 'number', min: 0 } },
        boundaryCount: { control: { type: 'number', min: 0 } },
        disabled: { control: 'boolean' },
    },
    args: {
        count: 10,
        page: 1,
        variant: 'text',
        shape: 'circular',
        size: 'md',
        color: 'primary',
        showFirstButton: false,
        showLastButton: false,
        hidePrevButton: false,
        hideNextButton: false,
        siblingCount: 1,
        boundaryCount: 1,
        disabled: false,
        label: '',
    },
};
export default meta;
type Story = StoryObj;

const box = (title: string, content: unknown) => html`
    <flint-stack direction="column" gap="8px" p="0 0 4px">
        <span style="font-size:.7rem;color:#475569;text-transform:uppercase;letter-spacing:.06em;">${title}</span>
        ${content}
    </flint-stack>
`;

const section = (content: unknown) => html`
    <flint-paper elevation="1">
        <flint-stack direction="column" gap="24px" p="24px" style="font-family:Inter,sans-serif;">
            ${content}
        </flint-stack>
    </flint-paper>
`;

/* ================================================================== */
/* Playground                                                           */
/* ================================================================== */
export const Playground: Story = {
    render: (args) => html`
        <flint-paper elevation="1" style="padding:24px;font-family:Inter,sans-serif;">
            <flint-pagination
                count=${args.count}
                page=${args.page}
                .variant=${args.variant}
                .shape=${args.shape}
                .size=${args.size}
                .color=${args.color}
                ?show-first-button=${args.showFirstButton}
                ?show-last-button=${args.showLastButton}
                ?hide-prev-button=${args.hidePrevButton}
                ?hide-next-button=${args.hideNextButton}
                .siblingCount=${args.siblingCount}
                .boundaryCount=${args.boundaryCount}
                ?disabled=${args.disabled}
                .label=${args.label}
                @flint-pagination-change=${(e: CustomEvent) => {
            (e.currentTarget as FlintPagination).page = e.detail.page;
        }}
            ></flint-pagination>
        </flint-paper>
    `,
};

Playground.play = async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector('flint-pagination') as FlintPagination;
    await waitFor(() => expect(pagination).toBeTruthy());

    // Find page buttons in shadow DOM
    const buttons = pagination.shadowRoot!.querySelectorAll('button:not([aria-label])');
    expect(buttons.length).toBeGreaterThan(0);

    // Click page 2 button
    const page2 = Array.from(pagination.shadowRoot!.querySelectorAll('button')).find(b => b.textContent?.trim() === '2');
    if (page2) {
        await userEvent.click(page2);
        await waitFor(() => expect(pagination.page).toBe(2));
    }
};

/* ================================================================== */
/* Basic                                                               */
/* ================================================================== */
export const Basic: Story = {
    render: () => section(html`
        ${box('Default (text)', html`
            <flint-pagination count="10" page="1"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('Disabled', html`
            <flint-pagination count="10" page="3" disabled></flint-pagination>
        `)}
        ${box('No boundary (siblingCount=2)', html`
            <flint-pagination count="10" page="6" sibling-count="2"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Outlined                                                            */
/* ================================================================== */
export const Outlined: Story = {
    render: () => section(html`
        ${box('Outlined', html`
            <flint-pagination count="10" page="1" variant="outlined"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('Outlined + Rounded', html`
            <flint-pagination count="10" page="4" variant="outlined" shape="rounded"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Rounded                                                             */
/* ================================================================== */
export const Rounded: Story = {
    render: () => section(html`
        ${box('Text + Rounded', html`
            <flint-pagination count="10" page="1" shape="rounded"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('Outlined + Rounded', html`
            <flint-pagination count="10" page="3" variant="outlined" shape="rounded"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('Text + Square', html`
            <flint-pagination count="10" page="5" shape="square"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Sizes                                                               */
/* ================================================================== */
export const Sizes: Story = {
    render: () => section(html`
        ${box('Small', html`
            <flint-pagination count="10" page="1" size="sm"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('Medium (default)', html`
            <flint-pagination count="10" page="1"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('Large', html`
            <flint-pagination count="10" page="1" size="lg"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Buttons                                                             */
/* ================================================================== */
export const Buttons: Story = {
    render: () => section(html`
        ${box('Show first & last buttons', html`
            <flint-pagination count="10" page="5" show-first-button show-last-button
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('Hide prev & next buttons', html`
            <flint-pagination count="10" page="5" hide-prev-button hide-next-button
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('All four navigation buttons', html`
            <flint-pagination count="10" page="5" show-first-button show-last-button
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Custom Icons (via slots)                                            */
/* ================================================================== */
export const CustomIcons: Story = {
    render: () => section(html`
        ${box('Emoji prev/next via slots', html`
            <flint-pagination count="10" page="5" show-first-button show-last-button
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
                <span slot="first-icon">⏮</span>
                <span slot="prev-icon">←</span>
                <span slot="next-icon">→</span>
                <span slot="last-icon">⏭</span>
            </flint-pagination>
        `)}
        ${box('Text labels via slots', html`
            <flint-pagination count="10" page="3" variant="outlined" shape="rounded"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
                <span slot="prev-icon" style="font-size:.8rem;padding:0 4px;">‹ Prev</span>
                <span slot="next-icon" style="font-size:.8rem;padding:0 4px;">Next ›</span>
            </flint-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Pagination Ranges                                                   */
/* ================================================================== */
export const PaginationRanges: Story = {
    render: () => section(html`
        ${box('siblingCount=0', html`
            <flint-pagination count="11" page="6" sibling-count="0"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('siblingCount=1 (default)', html`
            <flint-pagination count="11" page="6" sibling-count="1"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('siblingCount=2', html`
            <flint-pagination count="11" page="6" sibling-count="2"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('boundaryCount=2', html`
            <flint-pagination count="11" page="6" boundary-count="2"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Controlled                                                          */
/* ================================================================== */
export const Controlled: Story = {
    render: () => {
        let page = 3;

        const handleChange = (e: CustomEvent) => {
            page = e.detail.page;
            const container = e.currentTarget as HTMLElement;
            const pagination = container.querySelector<FlintPagination>('flint-pagination');
            const label = container.querySelector<HTMLElement>('#cp-label');
            const range = container.querySelector<HTMLElement>('#cp-range');
            if (pagination) pagination.page = page;
            if (label) label.textContent = String(page);
            if (range) range.textContent = `${(page - 1) * 10 + 1}–${Math.min(page * 10, 95)} of 95`;
        };

        return html`
            <flint-paper elevation="1" @flint-pagination-change=${handleChange}>
                <flint-stack direction="column" gap="16px" p="24px" style="font-family:Inter,sans-serif;">
                    <flint-stack direction="row" alignItems="center" gap="12px" fontSize=".875rem" color="#475569">
                        <span>Current page:</span>
                        <strong id="cp-label" style="font-size:1.1rem;color:#1e293b;">${page}</strong>
                        <span style="color:#475569;">/ 10</span>
                    </flint-stack>

                <flint-pagination
                    count="10"
                    page=${page}
                    variant="outlined"
                    show-first-button
                    show-last-button
                ></flint-pagination>

                    <flint-box bgcolor="var(--flint-muted-background, #f8fafc)" borderRadius="6px" p="12px 16px" style="font-size:.825rem;color:#475569;border:1px solid #e2e8f0;">
                        Showing items <strong id="cp-range">${(page - 1) * 10 + 1}–${Math.min(page * 10, 95)} of 95</strong>
                    </flint-box>
                </flint-stack>
            </flint-paper>
        `;
    },
};

/* ================================================================== */
/* Uncontrolled (defaultPage)                                          */
/* ================================================================== */
export const Uncontrolled: Story = {
    render: () => section(html`
        ${box('defaultPage=5 — no event handler needed', html`
            <flint-pagination count="10" default-page="5"></flint-pagination>
        `)}
        ${box('defaultPage=3 + outlined', html`
            <flint-pagination count="10" default-page="3" variant="outlined" show-first-button show-last-button></flint-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Colors                                                              */
/* ================================================================== */
export const Colors: Story = {
    render: () => section(html`
        ${box('Primary (default)', html`
            <flint-pagination count="10" page="5" color="primary"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('Secondary', html`
            <flint-pagination count="10" page="5" color="secondary"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('Standard', html`
            <flint-pagination count="10" page="5" color="standard"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('Secondary + Outlined', html`
            <flint-pagination count="10" page="5" color="secondary" variant="outlined"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Edge Cases                                                          */
/* ================================================================== */
export const EdgeCases: Story = {
    render: () => section(html`
        ${box('count=1 — single page, all nav disabled', html`
            <flint-pagination count="1" page="1" show-first-button show-last-button></flint-pagination>
        `)}
        ${box('count=2 — minimal', html`
            <flint-pagination count="2" page="1"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('count=100, page=50 — large range with both ellipses', html`
            <flint-pagination count="100" page="50" show-first-button show-last-button
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('count=100, page=1 — at start', html`
            <flint-pagination count="100" page="1"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('count=100, page=100 — at end', html`
            <flint-pagination count="100" page="100"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
    `),
};

/* ================================================================== */
/* Accessibility Demo                                                  */
/* ================================================================== */
export const Accessibility: Story = {
    render: () => section(html`
        ${box('Custom aria-label for context (label prop)', html`
            <flint-pagination count="10" page="3" label="article pages"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('Custom aria-label — search results', html`
            <flint-pagination count="20" page="5" label="search result pages" variant="outlined"
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
        ${box('All navigation buttons with descriptive label', html`
            <flint-pagination count="10" page="5"
                label="product listing pages"
                show-first-button show-last-button
                @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
            </flint-pagination>
        `)}
    `),
};

/* ================================================================== */
/* RTL                                                                 */
/* ================================================================== */
export const DefaultRTL: Story = {
    name: 'RTL',
    render: () => html`
        <div dir="rtl" style="text-align: right">
            ${section(html`
                ${box('صفحات من اليمين إلى اليسار', html`
                    <flint-pagination count="10" page="5" show-first-button show-last-button
                        @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
                    </flint-pagination>
                `)}
                ${box('مخطط تفصيلي', html`
                    <flint-pagination count="10" page="3" variant="outlined" shape="rounded"
                        @flint-pagination-change=${(e: CustomEvent) => { (e.currentTarget as FlintPagination).page = e.detail.page; }}>
                    </flint-pagination>
                `)}
            `)}
        </div>
    `,
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

        // Single source of truth for all DOM updates
        function syncAll() {
            const pg = document.getElementById('tp-pg') as FlintPagination | null;
            const range = document.getElementById('tp-range');
            const tbody = document.getElementById('tp-tbody');
            const prevBtn = document.getElementById('tp-prev') as HTMLButtonElement | null;
            const nextBtn = document.getElementById('tp-next') as HTMLButtonElement | null;
            const rowStr = getRows().map(r =>
                `<tr style="border-bottom:1px solid #f1f5f9;">` +
                `<td style="padding:10px 16px;color:#4b5563;">${r.id}</td>` +
                `<td style="padding:10px 16px;color:#111827;">${r.name}</td>` +
                `<td style="padding:10px 16px;color:#4b5563;">${r.role}</td></tr>`
            ).join('');
            if (pg) { pg.count = totalPages(); pg.page = page + 1; }
            if (range) range.textContent = `${page * rowsPerPage + 1}–${Math.min((page + 1) * rowsPerPage, totalRows)} of ${totalRows}`;
            if (tbody) tbody.innerHTML = rowStr;
            if (prevBtn) prevBtn.disabled = page === 0;
            if (nextBtn) nextBtn.disabled = page >= totalPages() - 1;
        }

        return html`
            <flint-paper elevation="1" style="font-family:Inter,sans-serif;overflow:hidden;">
                <!-- Table -->
                <table style="width:100%;border-collapse:collapse;font-size:.875rem;">
                    <thead>
                        <tr style="background:var(--flint-muted-background, #f8fafc);border-bottom:1px solid #e2e8f0;">
                            <th style="padding:10px 16px;text-align:left;font-weight:600;color:#374151;">#</th>
                            <th style="padding:10px 16px;text-align:left;font-weight:600;color:#374151;">Name</th>
                            <th style="padding:10px 16px;text-align:left;font-weight:600;color:#374151;">Role</th>
                        </tr>
                    </thead>
                    <tbody id="tp-tbody">
                        ${getRows().map(row => html`
                            <tr style="border-bottom:1px solid #f1f5f9;">
                                <td style="padding:10px 16px;color:#4b5563;">${row.id}</td>
                                <td style="padding:10px 16px;color:#111827;">${row.name}</td>
                                <td style="padding:10px 16px;color:#4b5563;">${row.role}</td>
                            </tr>
                        `)}
                    </tbody>
                </table>

                <!-- Pagination bar -->
                <flint-stack direction="row" alignItems="center" justifyContent="flex-end" gap="16px" p="10px 16px" borderTop="1px solid #e2e8f0" fontSize=".8rem" color="#4b5563" style="flex-wrap:wrap;">
                    <flint-stack direction="row" alignItems="center" gap="8px">
                        <span>Rows per page:</span>
                        <select
                            style="border:1px solid #e2e8f0;border-radius:4px;padding:2px 6px;font-size:.8rem;outline:none;background:var(--flint-background, #fff);cursor:pointer;"
                            @change=${(e: Event) => {
                rowsPerPage = parseInt((e.target as HTMLSelectElement).value);
                page = 0;
                syncAll();
            }}
                        >
                            ${[5, 10, 25].map(n => html`<option value=${n} ?selected=${n === rowsPerPage}>${n}</option>`)}
                        </select>
                    </flint-stack>

                    <span id="tp-range">${page * rowsPerPage + 1}–${Math.min((page + 1) * rowsPerPage, totalRows)} of ${totalRows}</span>

                    <flint-pagination
                        id="tp-pg"
                        count=${totalPages()}
                        page=${page + 1}
                        size="sm"
                        hide-prev-button
                        hide-next-button
                        @flint-pagination-change=${(e: CustomEvent) => {
                page = e.detail.page - 1;
                syncAll();
            }}
                    ></flint-pagination>

                    <flint-stack direction="row" gap="2px">
                        <button
                            id="tp-prev"
                            style="background:none;border:none;cursor:pointer;padding:4px;border-radius:4px;display:flex;align-items:center;color:#374151;"
                            ?disabled=${page === 0}
                            @click=${() => { if (page > 0) { page--; syncAll(); } }}
                        ><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button>
                        <button
                            id="tp-next"
                            style="background:none;border:none;cursor:pointer;padding:4px;border-radius:4px;display:flex;align-items:center;color:#374151;"
                            ?disabled=${page >= totalPages() - 1}
                            @click=${() => { if (page < totalPages() - 1) { page++; syncAll(); } }}
                        ><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>
                    </flint-stack>
                </flint-stack>
            </flint-paper>
        `;
    },
};
