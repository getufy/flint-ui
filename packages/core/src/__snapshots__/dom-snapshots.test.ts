import { describe, it, expect, afterEach } from 'vitest';
import { fixture, fixtureCleanup } from '@open-wc/testing';
import { html } from 'lit';

/* ── Import components ───────────────────────────────────────── */
import '../button/flint-button.js';
import '../input/flint-input.js';
import '../badge/flint-badge.js';
import '../chip/flint-chip.js';
import '../avatar/flint-avatar.js';
import '../alert/flint-alert.js';
import '../divider/flint-divider.js';
import '../skeleton/flint-skeleton.js';
import '../switch/flint-switch.js';
import '../checkbox/flint-checkbox.js';
import '../tooltip/flint-tooltip.js';
import '../link/flint-link.js';
import '../typography/flint-typography.js';
import '../kbd/flint-kbd.js';
import '../pagination/flint-pagination.js';
import '../rating/flint-rating.js';

/**
 * Normalize non-deterministic parts of shadow DOM innerHTML so snapshots
 * are stable across runs:
 * - Auto-generated IDs like `flint-input-42` → `flint-input-[id]`
 * - Lit internal markers like `<!--?lit$004503173$-->` → `<!--?lit$[hash]$-->`
 * - Lit binding markers like `<!--lit-part ABC123-->` → `<!--lit-part [hash]-->`
 */
function normalizeHtml(html: string): string {
    return html
        .replace(/flint-([a-z-]+)-(\d+)/g, 'flint-$1-[id]')
        .replace(/lit\$\d+\$/g, 'lit$[hash]$')
        .replace(/<!--lit-part\s+[\w/+=]+-->/g, '<!--lit-part [hash]-->')
        .replace(/<!--\?lit\$[\w]+\$-->/g, '<!--?lit$[hash]$-->');
}

/**
 * DOM structure snapshot tests.
 *
 * These snapshots capture the shadow DOM structure of components to detect
 * unintended changes. If a snapshot fails after an intentional change,
 * run `npx vitest run --project components -u` to update them.
 */
describe('DOM snapshots', () => {
    afterEach(() => fixtureCleanup());

    it('flint-button — default', async () => {
        const el = await fixture(html`<flint-button>Click</flint-button>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-button — variant outlined', async () => {
        const el = await fixture(html`<flint-button variant="outlined">Click</flint-button>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-button — disabled', async () => {
        const el = await fixture(html`<flint-button disabled>Click</flint-button>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-input — default', async () => {
        const el = await fixture(html`<flint-input label="Name"></flint-input>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-input — with placeholder', async () => {
        const el = await fixture(html`<flint-input label="Email" placeholder="you@example.com"></flint-input>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-badge — default', async () => {
        const el = await fixture(html`<flint-badge content="5"><span>Mail</span></flint-badge>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-chip — default', async () => {
        const el = await fixture(html`<flint-chip label="Tag"></flint-chip>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-chip — deletable', async () => {
        const el = await fixture(html`<flint-chip label="Tag" deletable></flint-chip>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-avatar — with text', async () => {
        const el = await fixture(html`<flint-avatar alt="John">J</flint-avatar>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-alert — default', async () => {
        const el = await fixture(html`<flint-alert>Alert message</flint-alert>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-alert — severity error', async () => {
        const el = await fixture(html`<flint-alert severity="error">Error!</flint-alert>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-divider — default', async () => {
        const el = await fixture(html`<flint-divider></flint-divider>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-skeleton — default', async () => {
        const el = await fixture(html`<flint-skeleton></flint-skeleton>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-skeleton — circular', async () => {
        const el = await fixture(html`<flint-skeleton variant="circular"></flint-skeleton>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-switch — default', async () => {
        const el = await fixture(html`<flint-switch></flint-switch>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-checkbox — default', async () => {
        const el = await fixture(html`<flint-checkbox>Accept terms</flint-checkbox>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-tooltip — default', async () => {
        const el = await fixture(html`<flint-tooltip label="Tip"><span>Hover</span></flint-tooltip>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-link — default', async () => {
        const el = await fixture(html`<flint-link href="#">Link text</flint-link>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-typography — default', async () => {
        const el = await fixture(html`<flint-typography>Hello</flint-typography>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-kbd — default', async () => {
        const el = await fixture(html`<flint-kbd>Ctrl+C</flint-kbd>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-pagination — default', async () => {
        const el = await fixture(html`<flint-pagination count="10"></flint-pagination>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-rating — default', async () => {
        const el = await fixture(html`<flint-rating></flint-rating>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });

    it('flint-rating — with value', async () => {
        const el = await fixture(html`<flint-rating value="3"></flint-rating>`);
        expect(normalizeHtml(el.shadowRoot!.innerHTML)).toMatchSnapshot();
    });
});
