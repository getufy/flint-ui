import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-command.js';
import '../button/flint-button.js';
import '../box/flint-box';
import '../stack/flint-stack';
import type { FlintCommandDialog, FlintCommandInput } from './flint-command.js';

const meta: Meta = {
    title: 'Navigation/Command',
    component: 'flint-command',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                    { id: 'label', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
#### \`<flint-command-shortcut>\`

Displays a keyboard shortcut hint inside a command item. Slot the shortcut string (e.g. \`⌘P\`) as default slot content.

- **Tag**: \`<flint-command-shortcut>\`
- **Class**: \`FlintCommandShortcut\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Shortcut text, e.g. \`⌘P\` or \`Ctrl+K\`. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-border-radius-md\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-font-family\` | — |
| \`--flint-border-color\` | — |
| \`--flint-text-color\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-primary-color\` | — |

---

#### \`<flint-command-separator>\`

A hairline separator between command groups.

- **Tag**: \`<flint-command-separator>\`
- **Class**: \`FlintCommandSeparator\`

---

#### \`<flint-command-item>\`

A single interactive option inside a command menu.

- **Tag**: \`<flint-command-item>\`
- **Class**: \`FlintCommandItem\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Machine-readable value used for filter matching. Falls back to textContent. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the item — non-interactive and skipped in keyboard nav. |
| \`highlighted\` | \`highlighted\` | \`boolean\` | \`false\` | Set by parent \`flint-command\` to indicate keyboard focus. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-command-item-select\` | — | Fired when the item is activated. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Item label text. |
| \`icon\` | Leading icon (16×16). |
| \`shortcut\` | Trailing shortcut hint; prefer \`&lt;flint-command-shortcut&gt;\`. |

#### Methods

| Method | Description |
|---|---|
| \`scrollIntoViewIfNeeded()\` | Scroll this item into view (nearest ancestor scroll container). |

---

#### \`<flint-command-empty>\`

Empty state message shown when no command items match the current query. Managed automatically by the parent \`flint-command\` element.

- **Tag**: \`<flint-command-empty>\`
- **Class**: \`FlintCommandEmpty\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Message text, e.g. "No results found." |

---

#### \`<flint-command-group>\`

A labeled group of command items. The parent \`flint-command\` automatically hides the whole group when all its items are filtered out.

- **Tag**: \`<flint-command-group>\`
- **Class**: \`FlintCommandGroup\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`heading\` | \`heading\` | \`string\` | \`''\` | Label rendered above the group items. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | \`flint-command-item\` elements. |

---

#### \`<flint-command-list>\`

Scrollable list container for command items and groups.

- **Tag**: \`<flint-command-list>\`
- **Class**: \`FlintCommandList\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | \`flint-command-group\`, \`flint-command-item\`, \`flint-command-empty\`, \`flint-command-separator\`. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-command-list-max-height\` | \`300px\` |

---

#### \`<flint-command-input>\`

Search input for the command menu. Dispatches \`_cmd-filter\` events that the parent \`flint-command\` intercepts to apply filtering.

- **Tag**: \`<flint-command-input>\`
- **Class**: \`FlintCommandInput\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`placeholder\` | \`placeholder\` | \`string\` | \`'Type a command or search...'\` | Placeholder text shown when input is empty. |
| \`value\` | \`value\` | \`string\` | \`''\` | Current input value. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`_cmd-filter\` | \`{ query: input.value }\` |  |

#### Methods

| Method | Description |
|---|---|
| \`focus()\` | Focus the inner input element. |
| \`reset()\` | Reset the input value and broadcast an empty filter. |

---

#### \`<flint-command>\`

Root command menu component. Manages search filtering and keyboard navigation. Compose it with \`flint-command-input\`, \`flint-command-list\`, \`flint-command-group\`, \`flint-command-item\`, \`flint-command-separator\`, and \`flint-command-empty\`.

- **Tag**: \`<flint-command>\`
- **Class**: \`FlintCommand\`

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-command-item-select\` | — | Bubbles up from activated items. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Command menu content. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-command-backdrop-bg\` | \`rgba(0, 0, 0, 0.5\` |
| \`--flint-command-z-index\` | \`1400\` |
| \`--flint-command-dialog-width\` | \`512px\` |
| \`--flint-command-bg\` | \`var(--flint-surface-1\` |
| \`--flint-command-panel-border-color\` | \`var(--flint-border-color\` |
| \`--flint-command-highlight-bg\` | \`var(--flint-hover-color\` |
| \`--flint-command-highlight-color\` | \`var(--flint-text-color\` |
| \`--flint-command-list-max-height\` | \`300px\` |
| \`--flint-command-border-color\` | \`var(--flint-border-color\` |

#### Methods

| Method | Description |
|---|---|
| \`reset()\` | Reset search query and restore all items. |

---

#### \`<flint-command-dialog>\`

Modal dialog wrapper for a command menu. Opens with a smooth backdrop + scale animation. Pressing \`Escape\` or clicking the backdrop fires \`flint-command-dialog-close\`.

- **Tag**: \`<flint-command-dialog>\`
- **Class**: \`FlintCommandDialog\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`open\` | \`open\` | \`boolean\` | \`false\` | Controls the open/closed state of the dialog. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-command-dialog-close\` | — | Fired when the dialog should close. detail: \`{ open: false }\` |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Place a \`flint-command\` element here. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-command-dialog-width\` | \`512px\` |
                `,
            },
        },
    },
};

export default meta;
type Story = StoryObj;

/* ─────────────────────────────────────────────────────────────────── */
/*  Shared icons (inline SVG — no external dependency)                  */
/* ─────────────────────────────────────────────────────────────────── */

const iconCalendar = html`<svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
const iconSmile   = html`<svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`;
const iconCalc    = html`<svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="12" y2="14"></line></svg>`;
const iconUser    = html`<svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
const iconCard    = html`<svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`;
const iconSettings= html`<svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
const iconHome    = html`<svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
const iconFile    = html`<svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;
const iconPlus    = html`<svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
const iconCode    = html`<svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
const iconImage   = html`<svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;

/* ─────────────────────────────────────────────────────────────────── */
/*  Story wrapper                                                        */
/* ─────────────────────────────────────────────────────────────────── */

const wrap = (content: unknown) => html`
    <flint-box p="48px 32px" bgcolor="var(--flint-muted-background, #f8fafc)" border="1px solid #e2e8f0" borderRadius="8px" style="font-family: system-ui, sans-serif; min-height: 200px; display: flex; align-items: flex-start; justify-content: center;">
        ${content}
    </flint-box>
`;

/* ─────────────────────────────────────────────────────────────────── */
/*  Play helpers                                                         */
/* ─────────────────────────────────────────────────────────────────── */

/** Returns the real <input> element inside flint-command-input's shadow root. */
function innerInput(canvas: HTMLElement): HTMLInputElement {
    return canvas
        .querySelector('flint-command-input')!
        .shadowRoot!
        .querySelector('input')!;
}

/** Returns all flint-command-item elements inside the canvas. */
function allItems(canvas: HTMLElement): Element[] {
    return [...canvas.querySelectorAll('flint-command-item')];
}

/** Returns items that are currently visible (hidden attribute absent). */
function visibleItems(canvas: HTMLElement): Element[] {
    return allItems(canvas).filter((i) => !i.hasAttribute('hidden'));
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Basic — inline command menu                                         */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Default rendering of `flint-command` with two groups and a separator.
 *
 * **Interaction test** (play):
 * 1. Type "pro" → only the Profile item in Settings group is visible; Suggestions group is hidden.
 * 2. Clear input → all items restore.
 * 3. Type "zzz" → no items match; empty-state message appears.
 */
export const Basic: Story = {
    name: 'Basic',
    render: () => wrap(html`
        <flint-command style="width:360px;border:1px solid #e5e7eb;border-radius:8px;">
            <flint-command-input placeholder="Type a command or search..."></flint-command-input>
            <flint-command-list>
                <flint-command-empty>No results found.</flint-command-empty>
                <flint-command-group heading="Suggestions">
                    <flint-command-item value="calendar">${iconCalendar}Calendar</flint-command-item>
                    <flint-command-item value="search emoji">${iconSmile}Search Emoji</flint-command-item>
                    <flint-command-item value="calculator" disabled>${iconCalc}Calculator</flint-command-item>
                </flint-command-group>
                <flint-command-separator></flint-command-separator>
                <flint-command-group heading="Settings">
                    <flint-command-item value="profile">
                        ${iconUser}Profile
                        <flint-command-shortcut slot="shortcut">⌘P</flint-command-shortcut>
                    </flint-command-item>
                    <flint-command-item value="billing">
                        ${iconCard}Billing
                        <flint-command-shortcut slot="shortcut">⌘B</flint-command-shortcut>
                    </flint-command-item>
                    <flint-command-item value="settings">
                        ${iconSettings}Settings
                        <flint-command-shortcut slot="shortcut">⌘S</flint-command-shortcut>
                    </flint-command-item>
                </flint-command-group>
            </flint-command-list>
        </flint-command>
    `),

    play: async ({ canvasElement }) => {
        const input = innerInput(canvasElement);

        /* ── Step 1: type "pro" ──────────────────────────────────────── */
        await userEvent.type(input, 'pro');

        /* Only "profile" matches; Suggestions group disappears. */
        await waitFor(() => {
            expect(canvasElement.querySelector('[value="profile"]')).not.toHaveAttribute('hidden');
            expect(canvasElement.querySelector('[value="calendar"]')).toHaveAttribute('hidden');
            expect(canvasElement.querySelector('[value="billing"]')).toHaveAttribute('hidden');

            const suggestions = canvasElement.querySelector('flint-command-group[heading="Suggestions"]');
            expect(suggestions).toHaveAttribute('hidden');

            const settings = canvasElement.querySelector('flint-command-group[heading="Settings"]');
            expect(settings).not.toHaveAttribute('hidden');

            /* Empty state must be hidden (there is a match). */
            expect(canvasElement.querySelector('flint-command-empty')).toHaveAttribute('hidden');
        });

        /* ── Step 2: clear input → all items back ───────────────────── */
        (canvasElement.querySelector('flint-command-input') as FlintCommandInput).reset();

        await waitFor(() => {
            expect(visibleItems(canvasElement)).toHaveLength(6);
            expect(canvasElement.querySelector('flint-command-group[heading="Suggestions"]')).not.toHaveAttribute('hidden');
            expect(canvasElement.querySelector('flint-command-empty')).toHaveAttribute('hidden');
        });

        /* ── Step 3: type "zzz" → no match → empty state shown ─────── */
        await userEvent.type(input, 'zzz');

        await waitFor(() => {
            expect(visibleItems(canvasElement)).toHaveLength(0);
            expect(canvasElement.querySelector('flint-command-empty')).not.toHaveAttribute('hidden');
        });

        /* Restore for a clean visual state. */
        (canvasElement.querySelector('flint-command-input') as FlintCommandInput).reset();
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  With Shortcuts                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Items with keyboard shortcut hints rendered via `flint-command-shortcut`.
 *
 * **Interaction test** (play):
 * Click the Billing item and confirm that `flint-command-item-select` fires
 * with `detail.value === "billing"`.
 */
export const WithShortcuts: Story = {
    name: 'With Shortcuts',
    render: () => wrap(html`
        <flint-command style="width:360px;border:1px solid #e5e7eb;border-radius:8px;">
            <flint-command-input placeholder="Search settings..."></flint-command-input>
            <flint-command-list>
                <flint-command-empty>No results found.</flint-command-empty>
                <flint-command-group heading="Settings">
                    <flint-command-item value="profile">
                        ${iconUser}Profile
                        <flint-command-shortcut slot="shortcut">⌘P</flint-command-shortcut>
                    </flint-command-item>
                    <flint-command-item value="billing">
                        ${iconCard}Billing
                        <flint-command-shortcut slot="shortcut">⌘B</flint-command-shortcut>
                    </flint-command-item>
                    <flint-command-item value="settings">
                        ${iconSettings}Settings
                        <flint-command-shortcut slot="shortcut">⌘S</flint-command-shortcut>
                    </flint-command-item>
                </flint-command-group>
            </flint-command-list>
        </flint-command>
    `),

    play: async ({ canvasElement }) => {
        /* Collect the fired event. */
        let selectedValue = '';
        canvasElement.addEventListener('flint-command-item-select', (e) => {
            selectedValue = (e as CustomEvent<{ value: string }>).detail.value;
        });

        /* Click the inner .item div inside the billing item's shadow root. */
        const billingItem = canvasElement.querySelector('[value="billing"]')!;
        const billingRow  = billingItem.shadowRoot!.querySelector('.item') as HTMLElement;
        await userEvent.click(billingRow);

        await waitFor(() => {
            expect(selectedValue).toBe('billing');
        });
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  With Groups & Separators                                             */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Multiple labeled groups separated by `flint-command-separator`.
 *
 * **Interaction test** (play):
 * Type "home" → only the Navigation group's "Home" item survives;
 * Suggestions and Settings groups are hidden.
 */
export const WithGroups: Story = {
    name: 'With Groups & Separators',
    render: () => wrap(html`
        <flint-command style="width:380px;border:1px solid #e5e7eb;border-radius:8px;">
            <flint-command-input placeholder="Type a command or search..."></flint-command-input>
            <flint-command-list>
                <flint-command-empty>No results found.</flint-command-empty>
                <flint-command-group heading="Suggestions">
                    <flint-command-item value="calendar">${iconCalendar}Calendar</flint-command-item>
                    <flint-command-item value="search emoji">${iconSmile}Search Emoji</flint-command-item>
                    <flint-command-item value="calculator" disabled>${iconCalc}Calculator</flint-command-item>
                </flint-command-group>
                <flint-command-separator></flint-command-separator>
                <flint-command-group heading="Navigation">
                    <flint-command-item value="home">
                        ${iconHome}Home
                        <flint-command-shortcut slot="shortcut">⌘H</flint-command-shortcut>
                    </flint-command-item>
                    <flint-command-item value="new file">
                        ${iconPlus}New File
                        <flint-command-shortcut slot="shortcut">⌘N</flint-command-shortcut>
                    </flint-command-item>
                    <flint-command-item value="open file">${iconFile}Open File</flint-command-item>
                </flint-command-group>
                <flint-command-separator></flint-command-separator>
                <flint-command-group heading="Settings">
                    <flint-command-item value="profile">
                        ${iconUser}Profile
                        <flint-command-shortcut slot="shortcut">⌘P</flint-command-shortcut>
                    </flint-command-item>
                    <flint-command-item value="billing">
                        ${iconCard}Billing
                        <flint-command-shortcut slot="shortcut">⌘B</flint-command-shortcut>
                    </flint-command-item>
                    <flint-command-item value="settings">
                        ${iconSettings}Settings
                        <flint-command-shortcut slot="shortcut">⌘S</flint-command-shortcut>
                    </flint-command-item>
                </flint-command-group>
            </flint-command-list>
        </flint-command>
    `),

    play: async ({ canvasElement }) => {
        const input = innerInput(canvasElement);

        await userEvent.type(input, 'home');

        await waitFor(() => {
            /* "Home" item is visible. */
            expect(canvasElement.querySelector('[value="home"]')).not.toHaveAttribute('hidden');

            /* Items in other groups are hidden. */
            expect(canvasElement.querySelector('[value="calendar"]')).toHaveAttribute('hidden');
            expect(canvasElement.querySelector('[value="profile"]')).toHaveAttribute('hidden');

            /* Only the Navigation group is visible. */
            expect(canvasElement.querySelector('flint-command-group[heading="Suggestions"]')).toHaveAttribute('hidden');
            expect(canvasElement.querySelector('flint-command-group[heading="Navigation"]')).not.toHaveAttribute('hidden');
            expect(canvasElement.querySelector('flint-command-group[heading="Settings"]')).toHaveAttribute('hidden');
        });

        (canvasElement.querySelector('flint-command-input') as FlintCommandInput).reset();
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Keyboard Navigation                                                  */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Demonstrates full keyboard interaction:
 * - **↓** / **↑** move the highlight between items.
 * - **Enter** activates the highlighted item.
 * - Disabled items are automatically skipped.
 *
 * **Interaction test** (play):
 * 1. First item is highlighted on mount.
 * 2. ArrowDown cycles forward, skipping disabled.
 * 3. Enter activates the highlighted item.
 */
export const KeyboardNavigation: Story = {
    name: 'Keyboard Navigation',
    render: () => wrap(html`
        <flint-command style="width:360px;border:1px solid #e5e7eb;border-radius:8px;">
            <flint-command-input placeholder="Use ↑↓ then Enter..."></flint-command-input>
            <flint-command-list>
                <flint-command-empty>No results found.</flint-command-empty>
                <flint-command-group heading="Suggestions">
                    <flint-command-item value="calendar">${iconCalendar}Calendar</flint-command-item>
                    <flint-command-item value="search emoji">${iconSmile}Search Emoji</flint-command-item>
                    <flint-command-item value="calculator" disabled>${iconCalc}Calculator (disabled)</flint-command-item>
                </flint-command-group>
                <flint-command-group heading="Settings">
                    <flint-command-item value="profile">${iconUser}Profile</flint-command-item>
                    <flint-command-item value="billing">${iconCard}Billing</flint-command-item>
                </flint-command-group>
            </flint-command-list>
        </flint-command>
    `),

    play: async ({ canvasElement }) => {
        const input = innerInput(canvasElement);

        /* Focus the input so keyboard events are routed. */
        await userEvent.click(input);

        /* ── On mount the first navigable item is highlighted ─────── */
        await waitFor(() => {
            expect(canvasElement.querySelector('[value="calendar"]')).toHaveAttribute('highlighted');
        });

        /* ── ArrowDown: calendar → search emoji ─────────────────────── */
        await userEvent.keyboard('{ArrowDown}');
        await waitFor(() => {
            expect(canvasElement.querySelector('[value="search emoji"]')).toHaveAttribute('highlighted');
            expect(canvasElement.querySelector('[value="calendar"]')).not.toHaveAttribute('highlighted');
        });

        /* ── ArrowDown again: skips disabled "calculator" → profile ─── */
        await userEvent.keyboard('{ArrowDown}');
        await waitFor(() => {
            expect(canvasElement.querySelector('[value="profile"]')).toHaveAttribute('highlighted');
            expect(canvasElement.querySelector('[value="calculator"]')).not.toHaveAttribute('highlighted');
        });

        /* ── ArrowDown: profile → billing ───────────────────────────── */
        await userEvent.keyboard('{ArrowDown}');
        await waitFor(() => {
            expect(canvasElement.querySelector('[value="billing"]')).toHaveAttribute('highlighted');
        });

        /* ── ArrowDown wraps: billing → calendar ────────────────────── */
        await userEvent.keyboard('{ArrowDown}');
        await waitFor(() => {
            expect(canvasElement.querySelector('[value="calendar"]')).toHaveAttribute('highlighted');
        });

        /* ── ArrowUp wraps: calendar → billing (last item) ──────────── */
        await userEvent.keyboard('{ArrowUp}');
        await waitFor(() => {
            expect(canvasElement.querySelector('[value="billing"]')).toHaveAttribute('highlighted');
        });

        /* ── ArrowUp back to profile ─────────────────────────────────── */
        await userEvent.keyboard('{ArrowUp}');
        await waitFor(() => {
            expect(canvasElement.querySelector('[value="profile"]')).toHaveAttribute('highlighted');
        });

        /* ── Enter activates the highlighted item ────────────────────── */
        let selectedValue = '';
        canvasElement.addEventListener('flint-command-item-select', (e) => {
            selectedValue = (e as CustomEvent<{ value: string }>).detail.value;
        });

        await userEvent.keyboard('{Enter}');
        await waitFor(() => {
            expect(selectedValue).toBe('profile');
        });

        /* ── Home key: jumps to first navigable item ─────────────────── */
        await userEvent.keyboard('{Home}');
        await waitFor(() => {
            expect(canvasElement.querySelector('[value="calendar"]')).toHaveAttribute('highlighted');
            expect(canvasElement.querySelector('[value="profile"]')).not.toHaveAttribute('highlighted');
        });

        /* ── End key: jumps to last navigable item ───────────────────── */
        await userEvent.keyboard('{End}');
        await waitFor(() => {
            expect(canvasElement.querySelector('[value="billing"]')).toHaveAttribute('highlighted');
            expect(canvasElement.querySelector('[value="calendar"]')).not.toHaveAttribute('highlighted');
        });
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Dialog (⌘K)                                                         */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * `flint-command-dialog` wraps the command in a modal overlay.
 * Click the button (or press ⌘K) to open; Escape or backdrop click to close.
 *
 * **Interaction test** (play):
 * 1. Click "Open Menu" → dialog opens (backdrop gains `.open` class).
 * 2. Type "bill" in the auto-focused input → only Billing item visible.
 * 3. Press Enter → `flint-command-item-select` fires with `value = "billing"`.
 * 4. Press Escape → `flint-command-dialog-close` fires; dialog closes.
 * 5. After close the input is reset (filter cleared).
 */
export const Dialog: Story = {
    name: 'Dialog (⌘K)',
    render: () => {
        const openDialog = (e: Event) => {
            const btn = e.currentTarget as HTMLElement;
            const dlg = btn.closest('div')!.querySelector('flint-command-dialog') as FlintCommandDialog;
            dlg.open = true;
        };
        const closeDialog = (e: Event) => {
            (e.currentTarget as FlintCommandDialog).open = false;
        };
        const onGlobalKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                const dlg = document.querySelector('flint-command-dialog') as FlintCommandDialog | null;
                if (dlg) dlg.open = true;
            }
        };

        return html`
            <flint-stack
                direction="column"
                gap="12px"
                alignItems="center"
                @keydown=${onGlobalKey}
            >
                <flint-button variant="secondary" size="small" @click=${openDialog}>
                    Open Menu
                    <kbd style="padding:2px 6px;background:var(--flint-muted-background, #f3f4f6);border:1px solid #d1d5db;border-radius:4px;font-size:0.75rem;color:#4b5563;">⌘K</kbd>
                </flint-button>

                <flint-command-dialog @flint-command-dialog-close=${closeDialog}>
                    <flint-command>
                        <flint-command-input placeholder="Type a command or search..."></flint-command-input>
                        <flint-command-list>
                            <flint-command-empty>No results found.</flint-command-empty>
                            <flint-command-group heading="Suggestions">
                                <flint-command-item value="calendar">${iconCalendar}Calendar</flint-command-item>
                                <flint-command-item value="search emoji">${iconSmile}Search Emoji</flint-command-item>
                                <flint-command-item value="calculator" disabled>${iconCalc}Calculator</flint-command-item>
                            </flint-command-group>
                            <flint-command-separator></flint-command-separator>
                            <flint-command-group heading="Settings">
                                <flint-command-item value="profile">
                                    ${iconUser}Profile
                                    <flint-command-shortcut slot="shortcut">⌘P</flint-command-shortcut>
                                </flint-command-item>
                                <flint-command-item value="billing">
                                    ${iconCard}Billing
                                    <flint-command-shortcut slot="shortcut">⌘B</flint-command-shortcut>
                                </flint-command-item>
                                <flint-command-item value="settings">
                                    ${iconSettings}Settings
                                    <flint-command-shortcut slot="shortcut">⌘S</flint-command-shortcut>
                                </flint-command-item>
                            </flint-command-group>
                        </flint-command-list>
                    </flint-command>
                </flint-command-dialog>
            </flint-stack>
        `;
    },

    play: async ({ canvasElement }) => {
        const dialogEl  = canvasElement.querySelector('flint-command-dialog') as FlintCommandDialog;
        const backdrop  = dialogEl.shadowRoot!.querySelector('.backdrop')!;
        const openBtn   = canvasElement.querySelector('flint-button')!;

        /* ── 1. Dialog is closed initially ──────────────────────────── */
        expect(backdrop.classList.contains('open')).toBe(false);

        /* ── 2. Click "Open Menu" → dialog opens ─────────────────────── */
        await userEvent.click(openBtn);
        await waitFor(() => {
            expect(backdrop.classList.contains('open')).toBe(true);
        });

        /* ── 3. Input is auto-focused; type "bill" ───────────────────── */
        const cmdEl    = canvasElement.querySelector('flint-command')!;
        const cmdInput = canvasElement.querySelector('flint-command-input') as FlintCommandInput;
        const input    = cmdInput.shadowRoot!.querySelector('input')!;
        await userEvent.click(input);

        // Set value and dispatch input event to ensure filtering triggers
        // (userEvent.type into shadow DOM inputs can be unreliable in browser tests)
        input.value = 'bill';
        input.dispatchEvent(new Event('input', { bubbles: true }));

        await waitFor(() => {
            expect(canvasElement.querySelector('[value="billing"]')).not.toHaveAttribute('hidden');
            expect(canvasElement.querySelector('[value="calendar"]')).toHaveAttribute('hidden');
        });

        /* ── 4. Press Enter → activates "billing" item ───────────────── */
        let selectedValue = '';
        canvasElement.addEventListener('flint-command-item-select', (e) => {
            selectedValue = (e as CustomEvent<{ value: string }>).detail.value;
        });

        input.focus();
        cmdEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        await waitFor(() => {
            expect(selectedValue).toBe('billing');
        });

        /* ── 5. Press Escape → dialog closes and resets ──────────────── */
        cmdEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
        await waitFor(() => {
            expect(backdrop.classList.contains('open')).toBe(false);
        });

        /* After close, reset() restores all items and clears the input. */
        await waitFor(() => {
            expect(input.value).toBe('');
            expect(canvasElement.querySelector('[value="calendar"]')).not.toHaveAttribute('hidden');
        });
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Scrollable — many items                                              */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Constrain list height with `--flint-command-list-max-height` to enable scrolling.
 *
 * **Interaction test** (play):
 * Type "edit" → only "Code Editor" and "Image Editor" items match.
 */
export const Scrollable: Story = {
    name: 'Scrollable (Many Items)',
    render: () => wrap(html`
        <flint-command style="width:400px;border:1px solid #e5e7eb;border-radius:8px;--flint-command-list-max-height:240px;">
            <flint-command-input placeholder="Type a command or search..."></flint-command-input>
            <flint-command-list>
                <flint-command-empty>No results found.</flint-command-empty>
                <flint-command-group heading="Navigation">
                    <flint-command-item value="home">${iconHome}Home<flint-command-shortcut slot="shortcut">⌘H</flint-command-shortcut></flint-command-item>
                    <flint-command-item value="new file">${iconPlus}New File<flint-command-shortcut slot="shortcut">⌘N</flint-command-shortcut></flint-command-item>
                    <flint-command-item value="open file">${iconFile}Open File</flint-command-item>
                </flint-command-group>
                <flint-command-separator></flint-command-separator>
                <flint-command-group heading="Tools">
                    <flint-command-item value="code editor">${iconCode}Code Editor</flint-command-item>
                    <flint-command-item value="image editor">${iconImage}Image Editor</flint-command-item>
                    <flint-command-item value="calculator">${iconCalc}Calculator</flint-command-item>
                    <flint-command-item value="calendar">${iconCalendar}Calendar</flint-command-item>
                </flint-command-group>
                <flint-command-separator></flint-command-separator>
                <flint-command-group heading="Account">
                    <flint-command-item value="profile">
                        ${iconUser}Profile
                        <flint-command-shortcut slot="shortcut">⌘P</flint-command-shortcut>
                    </flint-command-item>
                    <flint-command-item value="billing">
                        ${iconCard}Billing
                        <flint-command-shortcut slot="shortcut">⌘B</flint-command-shortcut>
                    </flint-command-item>
                    <flint-command-item value="settings">
                        ${iconSettings}Settings
                        <flint-command-shortcut slot="shortcut">⌘S</flint-command-shortcut>
                    </flint-command-item>
                </flint-command-group>
                <flint-command-separator></flint-command-separator>
                <flint-command-group heading="Suggestions">
                    <flint-command-item value="search emoji">${iconSmile}Search Emoji</flint-command-item>
                    <flint-command-item value="open terminal">${iconCode}Open Terminal</flint-command-item>
                </flint-command-group>
            </flint-command-list>
        </flint-command>
    `),

    play: async ({ canvasElement }) => {
        const input = innerInput(canvasElement);

        await userEvent.type(input, 'edit');

        await waitFor(() => {
            /* Both editor items match "edit". */
            expect(canvasElement.querySelector('[value="code editor"]')).not.toHaveAttribute('hidden');
            expect(canvasElement.querySelector('[value="image editor"]')).not.toHaveAttribute('hidden');

            /* Everything else is hidden. */
            expect(canvasElement.querySelector('[value="home"]')).toHaveAttribute('hidden');
            expect(canvasElement.querySelector('[value="calculator"]')).toHaveAttribute('hidden');
            expect(canvasElement.querySelector('[value="profile"]')).toHaveAttribute('hidden');

            /* Groups with no matches are hidden. */
            expect(canvasElement.querySelector('flint-command-group[heading="Navigation"]')).toHaveAttribute('hidden');
            expect(canvasElement.querySelector('flint-command-group[heading="Account"]')).toHaveAttribute('hidden');
            expect(canvasElement.querySelector('flint-command-group[heading="Tools"]')).not.toHaveAttribute('hidden');
        });

        (canvasElement.querySelector('flint-command-input') as FlintCommandInput).reset();
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Plain Text Items                                                     */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Items without icons — plain text labels only.
 *
 * **Interaction test** (play):
 * Type "ch" → matches "Cherry" (Fruits) and "Artichoke" (Vegetables); rest hidden.
 */
export const PlainText: Story = {
    name: 'Plain Text Items',
    render: () => wrap(html`
        <flint-command style="width:320px;border:1px solid #e5e7eb;border-radius:8px;">
            <flint-command-input placeholder="Search..."></flint-command-input>
            <flint-command-list>
                <flint-command-empty>No results found.</flint-command-empty>
                <flint-command-group heading="Fruits">
                    <flint-command-item value="apple">Apple</flint-command-item>
                    <flint-command-item value="banana">Banana</flint-command-item>
                    <flint-command-item value="cherry">Cherry</flint-command-item>
                    <flint-command-item value="dragonfruit">Dragonfruit</flint-command-item>
                </flint-command-group>
                <flint-command-separator></flint-command-separator>
                <flint-command-group heading="Vegetables">
                    <flint-command-item value="artichoke">Artichoke</flint-command-item>
                    <flint-command-item value="broccoli">Broccoli</flint-command-item>
                    <flint-command-item value="carrot">Carrot</flint-command-item>
                </flint-command-group>
            </flint-command-list>
        </flint-command>
    `),

    play: async ({ canvasElement }) => {
        const input = innerInput(canvasElement);

        /* "ch" matches "cherry" (ch-erry) and "artichoke" (arti-ch-oke) across both groups */
        await userEvent.type(input, 'ch');

        await waitFor(() => {
            expect(canvasElement.querySelector('[value="cherry"]')).not.toHaveAttribute('hidden');
            expect(canvasElement.querySelector('[value="artichoke"]')).not.toHaveAttribute('hidden');
            expect(canvasElement.querySelector('[value="apple"]')).toHaveAttribute('hidden');
            expect(canvasElement.querySelector('[value="banana"]')).toHaveAttribute('hidden');
            expect(canvasElement.querySelector('[value="broccoli"]')).toHaveAttribute('hidden');
            expect(canvasElement.querySelector('[value="carrot"]')).toHaveAttribute('hidden');
        });

        (canvasElement.querySelector('flint-command-input') as FlintCommandInput).reset();
    },
};
