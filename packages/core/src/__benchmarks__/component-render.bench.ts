import { bench, describe, afterEach } from 'vitest';
import { fixture, fixtureCleanup } from '@open-wc/testing';
import { html } from 'lit';

/* ── Import components under test ─────────────────────────────── */
import '../button/flint-button.js';
import '../input/flint-input.js';
import '../select/flint-select.js';
import '../checkbox/flint-checkbox.js';
import '../tabs/flint-tabs.js';
import '../accordion/flint-accordion.js';
import '../badge/flint-badge.js';
import '../chip/flint-chip.js';
import '../avatar/flint-avatar.js';
import '../tooltip/flint-tooltip.js';

describe('Component render performance', () => {
    afterEach(() => fixtureCleanup());

    bench('flint-button — create & first render', async () => {
        await fixture(html`<flint-button>Click me</flint-button>`);
    });

    bench('flint-input — create & first render', async () => {
        await fixture(html`<flint-input label="Name"></flint-input>`);
    });

    bench('flint-select — create & first render', async () => {
        await fixture(html`<flint-select label="Choose"></flint-select>`);
    });

    bench('flint-checkbox — create & first render', async () => {
        await fixture(html`<flint-checkbox>Accept</flint-checkbox>`);
    });

    bench('flint-tabs — create with 5 tabs', async () => {
        await fixture(html`
            <flint-tabs value="tab1">
                <flint-tab-list>
                    <flint-tab value="tab1">Tab 1</flint-tab>
                    <flint-tab value="tab2">Tab 2</flint-tab>
                    <flint-tab value="tab3">Tab 3</flint-tab>
                    <flint-tab value="tab4">Tab 4</flint-tab>
                    <flint-tab value="tab5">Tab 5</flint-tab>
                </flint-tab-list>
                <flint-tab-panel value="tab1">Panel 1</flint-tab-panel>
                <flint-tab-panel value="tab2">Panel 2</flint-tab-panel>
                <flint-tab-panel value="tab3">Panel 3</flint-tab-panel>
                <flint-tab-panel value="tab4">Panel 4</flint-tab-panel>
                <flint-tab-panel value="tab5">Panel 5</flint-tab-panel>
            </flint-tabs>
        `);
    });

    bench('flint-accordion — create with 3 items', async () => {
        await fixture(html`
            <div>
                <flint-accordion>
                    <flint-accordion-summary>Item 1</flint-accordion-summary>
                    <flint-accordion-details>Content 1</flint-accordion-details>
                </flint-accordion>
                <flint-accordion>
                    <flint-accordion-summary>Item 2</flint-accordion-summary>
                    <flint-accordion-details>Content 2</flint-accordion-details>
                </flint-accordion>
                <flint-accordion>
                    <flint-accordion-summary>Item 3</flint-accordion-summary>
                    <flint-accordion-details>Content 3</flint-accordion-details>
                </flint-accordion>
            </div>
        `);
    });

    bench('flint-badge — create & first render', async () => {
        await fixture(html`<flint-badge content="5">Notifications</flint-badge>`);
    });

    bench('flint-chip — create & first render', async () => {
        await fixture(html`<flint-chip label="Tag"></flint-chip>`);
    });

    bench('flint-avatar — create & first render', async () => {
        await fixture(html`<flint-avatar alt="User">U</flint-avatar>`);
    });

    bench('flint-tooltip — create & first render', async () => {
        await fixture(html`<flint-tooltip label="Helpful tip"><span>Hover me</span></flint-tooltip>`);
    });
});

describe('Batch render performance', () => {
    afterEach(() => fixtureCleanup());

    bench('render 50 buttons', async () => {
        const items = Array.from({ length: 50 }, (_, i) => i);
        await fixture(html`<div>${items.map(i => html`<flint-button>Button ${i}</flint-button>`)}</div>`);
    });

    bench('render 20 inputs', async () => {
        const items = Array.from({ length: 20 }, (_, i) => i);
        await fixture(html`<div>${items.map(i => html`<flint-input label="Input ${i}"></flint-input>`)}</div>`);
    });

    bench('render 30 chips', async () => {
        const items = Array.from({ length: 30 }, (_, i) => i);
        await fixture(html`<div>${items.map(i => html`<flint-chip label="Chip ${i}"></flint-chip>`)}</div>`);
    });
});
