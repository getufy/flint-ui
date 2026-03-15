/**
 * SSR smoke tests — verify that key Flint UI components can be rendered
 * on the server via @lit-labs/ssr without crashing.
 *
 * These run in a pure Node environment (no jsdom/browser).
 */
import { describe, it, expect } from 'vitest';
import '@lit-labs/ssr/lib/install-global-dom-shim.js';
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import { html } from 'lit';

// Import component registration modules
import '../button/flint-button.js';
import '../input/flint-input.js';
import '../select/flint-select.js';
import '../tabs/flint-tabs.js';
import '../dialog/flint-dialog.js';
import '../grid/flint-grid.js';
import '../stack/flint-stack.js';
import '../format-date/flint-format-date.js';
import '../format-number/flint-format-number.js';
import '../relative-time/flint-relative-time.js';
import '../badge/flint-badge.js';
import '../card/flint-card.js';
import '../skeleton/flint-skeleton.js';
import '../typography/flint-typography.js';
import '../pagination/flint-pagination.js';

async function ssrRender(template: ReturnType<typeof html>): Promise<string> {
    const result = render(template);
    return collectResult(result);
}

describe('SSR smoke tests', () => {
    it('renders flint-button without crashing', async () => {
        const output = await ssrRender(html`<flint-button>Click me</flint-button>`);
        expect(output).toContain('Click me');
        expect(output).toContain('shadowroot');
    });

    it('renders flint-input without crashing', async () => {
        const output = await ssrRender(html`<flint-input label="Name"></flint-input>`);
        expect(output).toContain('shadowroot');
    });

    it('renders flint-badge without crashing', async () => {
        const output = await ssrRender(html`<flint-badge>5</flint-badge>`);
        expect(output).toContain('5');
    });

    it('renders flint-card without crashing', async () => {
        const output = await ssrRender(html`<flint-card>Card content</flint-card>`);
        expect(output).toContain('Card content');
    });

    it('renders flint-skeleton without crashing', async () => {
        const output = await ssrRender(html`<flint-skeleton></flint-skeleton>`);
        expect(output).toContain('shadowroot');
    });

    it('renders flint-typography without crashing', async () => {
        const output = await ssrRender(html`<flint-typography variant="h1">Hello</flint-typography>`);
        expect(output).toContain('Hello');
    });

    it('renders flint-dialog without crashing', async () => {
        const output = await ssrRender(html`<flint-dialog>Dialog body</flint-dialog>`);
        expect(output).toContain('Dialog body');
    });

    it('renders flint-select without crashing', async () => {
        const output = await ssrRender(html`<flint-select label="Pick one"></flint-select>`);
        expect(output).toContain('shadowroot');
    });

    it('renders flint-tabs without crashing', async () => {
        const output = await ssrRender(html`<flint-tabs></flint-tabs>`);
        expect(output).toContain('shadowroot');
    });

    it('renders flint-grid container without crashing', async () => {
        const output = await ssrRender(html`
            <flint-grid container .spacing=${2}>
                <flint-grid .xs=${6}>Left</flint-grid>
                <flint-grid .xs=${6}>Right</flint-grid>
            </flint-grid>
        `);
        expect(output).toContain('shadowroot');
    });

    it('renders flint-stack without crashing', async () => {
        const output = await ssrRender(html`
            <flint-stack .spacing=${2}>
                <div>Item 1</div>
                <div>Item 2</div>
            </flint-stack>
        `);
        expect(output).toContain('shadowroot');
    });

    it('renders flint-format-date with SSR locale fallback', async () => {
        const output = await ssrRender(html`<flint-format-date date="2025-01-15"></flint-format-date>`);
        expect(output).toContain('2025');
    });

    it('renders flint-format-date with explicit lang', async () => {
        const output = await ssrRender(html`<flint-format-date date="2025-06-15" lang="en"></flint-format-date>`);
        expect(output).toContain('2025');
    });

    it('renders flint-format-number without crashing', async () => {
        const output = await ssrRender(html`<flint-format-number .value=${1234.5}></flint-format-number>`);
        expect(output).toContain('1');
    });

    it('renders flint-format-number with currency', async () => {
        const output = await ssrRender(html`<flint-format-number .value=${42} type="currency" currency="USD" lang="en"></flint-format-number>`);
        expect(output).toContain('42');
    });

    it('renders flint-relative-time without crashing', async () => {
        const output = await ssrRender(html`<flint-relative-time .date=${new Date()}></flint-relative-time>`);
        expect(output).toContain('time');
    });

    it('renders flint-pagination without crashing', async () => {
        const output = await ssrRender(html`<flint-pagination .count=${10}></flint-pagination>`);
        expect(output).toContain('shadowroot');
    });
});
