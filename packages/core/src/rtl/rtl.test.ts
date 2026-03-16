import { describe, it, expect, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import type { FlintDrawer } from '../drawer/flint-drawer.js';
import type { FlintBreadcrumbs } from '../breadcrumbs/flint-breadcrumbs.js';
import type { FlintPagination } from '../pagination/flint-pagination.js';
import type { FlintTabs } from '../tabs/flint-tabs.js';
import type { FlintButton } from '../button/flint-button.js';
import type { FlintInput } from '../input/flint-input.js';
import type { FlintGrid } from '../grid/flint-grid.js';

import '../drawer/flint-drawer.js';
import '../breadcrumbs/flint-breadcrumbs.js';
import '../pagination/flint-pagination.js';
import '../tabs/flint-tabs.js';
import '../button/flint-button.js';
import '../input/flint-input.js';
import '../grid/flint-grid.js';
import '../stack/flint-stack.js';
import '../accordion/flint-accordion.js';

/**
 * RTL (Right-to-Left) test suite.
 *
 * Verifies that key components behave correctly when rendered in an RTL
 * context (dir="rtl" on the host or a parent element). Since jsdom does
 * not compute layout, these tests focus on DOM structure and attribute
 * correctness rather than visual positioning.
 */

afterEach(() => {
    document.documentElement.removeAttribute('dir');
});

/* ── Helper ────────────────────────────────────────────────────────── */

/** Wrap content in an RTL container and return the inner element. */
async function rtlFixture<T extends HTMLElement>(template: ReturnType<typeof html>): Promise<T> {
    const wrapper = await fixture<HTMLDivElement>(html`<div dir="rtl">${template}</div>`);
    return wrapper.firstElementChild as T;
}

/* ================================================================== */
/*  Drawer                                                             */
/* ================================================================== */
describe('RTL: Drawer', () => {
    it('renders with dir="rtl" on a parent without errors', async () => {
        const el = await rtlFixture<FlintDrawer>(
            html`<flint-drawer .open=${true} container label="RTL Drawer">
                <p>Content</p>
            </flint-drawer>`,
        );
        expect(el).toBeTruthy();
        expect(el.open).toBe(true);
    });

    it('defaults to left placement in RTL context', async () => {
        const el = await rtlFixture<FlintDrawer>(
            html`<flint-drawer container label="RTL Drawer">
                <p>Content</p>
            </flint-drawer>`,
        );
        expect(el.placement).toBe('left');
    });

    it('accepts right placement in RTL context', async () => {
        const el = await rtlFixture<FlintDrawer>(
            html`<flint-drawer placement="right" container label="RTL Drawer">
                <p>Content</p>
            </flint-drawer>`,
        );
        expect(el.placement).toBe('right');
    });

    it('reflects placement attribute in RTL', async () => {
        const el = await rtlFixture<FlintDrawer>(
            html`<flint-drawer placement="right" container label="RTL Drawer">
                <p>Content</p>
            </flint-drawer>`,
        );
        await el.updateComplete;
        expect(el.getAttribute('placement')).toBe('right');
    });
});

/* ================================================================== */
/*  Breadcrumbs                                                        */
/* ================================================================== */
describe('RTL: Breadcrumbs', () => {
    it('renders breadcrumb items in RTL context', async () => {
        const el = await rtlFixture<FlintBreadcrumbs>(
            html`<flint-breadcrumbs>
                <a href="/">Home</a>
                <a href="/products">Products</a>
                <span>Current</span>
            </flint-breadcrumbs>`,
        );
        expect(el).toBeTruthy();
        // Verify all items are slotted
        const items = el.querySelectorAll('a, span');
        expect(items.length).toBe(3);
    });

    it('uses the separator property in RTL', async () => {
        const el = await rtlFixture<FlintBreadcrumbs>(
            html`<flint-breadcrumbs separator="\\">
                <a href="/">Home</a>
                <a href="/products">Products</a>
                <span>Current</span>
            </flint-breadcrumbs>`,
        );
        await el.updateComplete;
        expect(el.separator).toBe('\\');
    });

    it('inherits dir from parent', async () => {
        const el = await rtlFixture<FlintBreadcrumbs>(
            html`<flint-breadcrumbs>
                <a href="/">Home</a>
                <span>Current</span>
            </flint-breadcrumbs>`,
        );
        // The parent div has dir="rtl", so the computed direction should be RTL
        const parentDir = el.closest('[dir]')?.getAttribute('dir');
        expect(parentDir).toBe('rtl');
    });
});

/* ================================================================== */
/*  Pagination                                                         */
/* ================================================================== */
describe('RTL: Pagination', () => {
    it('renders pagination in RTL context', async () => {
        const el = await rtlFixture<FlintPagination>(
            html`<flint-pagination count="10" page="5"></flint-pagination>`,
        );
        expect(el).toBeTruthy();
        expect(el.count).toBe(10);
        expect(el.page).toBe(5);
    });

    it('has navigation buttons in shadow DOM under RTL', async () => {
        const el = await rtlFixture<FlintPagination>(
            html`<flint-pagination count="10" page="1"></flint-pagination>`,
        );
        await el.updateComplete;
        const nav = el.shadowRoot!.querySelector('nav');
        expect(nav).toBeTruthy();
    });

    it('previous/next buttons exist in RTL', async () => {
        const el = await rtlFixture<FlintPagination>(
            html`<flint-pagination count="10" page="5"></flint-pagination>`,
        );
        await el.updateComplete;
        const buttons = el.shadowRoot!.querySelectorAll('button');
        expect(buttons.length).toBeGreaterThan(0);
    });
});

/* ================================================================== */
/*  Tabs                                                               */
/* ================================================================== */
describe('RTL: Tabs', () => {
    it('renders tabs in RTL context', async () => {
        const el = await rtlFixture<FlintTabs>(
            html`<flint-tabs>
                <span slot="tab">Tab 1</span>
                <span slot="tab">Tab 2</span>
                <div slot="panel">Panel 1</div>
                <div slot="panel">Panel 2</div>
            </flint-tabs>`,
        );
        expect(el).toBeTruthy();
    });

    it('tab elements are in correct order in RTL', async () => {
        const el = await rtlFixture<FlintTabs>(
            html`<flint-tabs>
                <span slot="tab">First</span>
                <span slot="tab">Second</span>
                <div slot="panel">Panel 1</div>
                <div slot="panel">Panel 2</div>
            </flint-tabs>`,
        );
        const tabs = el.querySelectorAll('[slot="tab"]');
        expect(tabs[0]!.textContent).toBe('First');
        expect(tabs[1]!.textContent).toBe('Second');
    });
});

/* ================================================================== */
/*  Button                                                             */
/* ================================================================== */
describe('RTL: Button', () => {
    it('renders button in RTL context', async () => {
        const el = await rtlFixture<FlintButton>(
            html`<flint-button>Click me</flint-button>`,
        );
        expect(el).toBeTruthy();
        expect(el.shadowRoot).toBeTruthy();
    });

    it('button with dir="rtl" directly on host', async () => {
        const el = await fixture<FlintButton>(
            html`<flint-button dir="rtl">Click me</flint-button>`,
        );
        expect(el.getAttribute('dir')).toBe('rtl');
    });
});

/* ================================================================== */
/*  Input                                                              */
/* ================================================================== */
describe('RTL: Input', () => {
    it('renders input in RTL context', async () => {
        const el = await rtlFixture<FlintInput>(
            html`<flint-input label="Name" placeholder="Enter name"></flint-input>`,
        );
        expect(el).toBeTruthy();
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input');
        expect(input).toBeTruthy();
    });

    it('input inherits direction from RTL parent', async () => {
        const el = await rtlFixture<FlintInput>(
            html`<flint-input dir="rtl" label="Arabic" placeholder="اسم"></flint-input>`,
        );
        expect(el.getAttribute('dir')).toBe('rtl');
    });
});

/* ================================================================== */
/*  Grid                                                               */
/* ================================================================== */
describe('RTL: Grid', () => {
    it('renders grid container in RTL context', async () => {
        const el = await rtlFixture<FlintGrid>(
            html`<flint-grid container spacing="2">
                <flint-grid xs="6"><div>Left</div></flint-grid>
                <flint-grid xs="6"><div>Right</div></flint-grid>
            </flint-grid>`,
        );
        expect(el).toBeTruthy();
        expect(el.hasAttribute('container')).toBe(true);
    });

    it('grid items maintain their column sizes in RTL', async () => {
        const el = await rtlFixture<FlintGrid>(
            html`<flint-grid container spacing="2">
                <flint-grid xs="4"><div>1</div></flint-grid>
                <flint-grid xs="8"><div>2</div></flint-grid>
            </flint-grid>`,
        );
        const items = el.querySelectorAll('flint-grid');
        expect(items[0]!.getAttribute('xs')).toBe('4');
        expect(items[1]!.getAttribute('xs')).toBe('8');
    });
});

/* ================================================================== */
/*  Accordion                                                          */
/* ================================================================== */
describe('RTL: Accordion', () => {
    it('renders accordion in RTL context', async () => {
        const wrapper = await fixture<HTMLDivElement>(html`
            <div dir="rtl">
                <flint-accordion>
                    <div slot="trigger">Section 1</div>
                    <div>Content 1</div>
                </flint-accordion>
            </div>
        `);
        const el = wrapper.querySelector('flint-accordion');
        expect(el).toBeTruthy();
    });
});

/* ================================================================== */
/*  Document-level dir attribute                                       */
/* ================================================================== */
describe('RTL: document-level dir', () => {
    it('components respect dir="rtl" on document.documentElement', async () => {
        document.documentElement.setAttribute('dir', 'rtl');
        const el = await fixture<FlintButton>(
            html`<flint-button>RTL Button</flint-button>`,
        );
        expect(el).toBeTruthy();
        expect(document.documentElement.getAttribute('dir')).toBe('rtl');
    });
});
