import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './ui-command.js';
import '../button/ui-button.js';
import '../box/ui-box';
import type { UiCommandDialog, UiCommandInput } from './ui-command.js';

const meta: Meta = {
    title: 'Navigation/Command',
    component: 'ui-command',
    parameters: {
        docs: {
            description: {
                component: `
A composable command menu for search and quick actions, built natively with LitElement.

**Components:**
- \`ui-command\` — Root; manages filtering and keyboard navigation
- \`ui-command-input\` — Search input
- \`ui-command-list\` — Scrollable list container
- \`ui-command-group\` — Labeled group of items
- \`ui-command-item\` — Interactive option (slots: \`icon\`, \`shortcut\`)
- \`ui-command-separator\` — Visual divider between groups
- \`ui-command-empty\` — Shown when no items match
- \`ui-command-shortcut\` — Keyboard shortcut hint
- \`ui-command-dialog\` — Modal dialog wrapper

**Keyboard navigation:** ↑ ↓ Arrow keys, Enter to select, Escape to close dialog.
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
    <ui-box p="48px 32px" bgcolor="var(--ui-muted-background, #f8fafc)" border="1px solid #e2e8f0" borderRadius="8px" style="font-family: system-ui, sans-serif; min-height: 200px; display: flex; align-items: flex-start; justify-content: center;">
        ${content}
    </ui-box>
`;

/* ─────────────────────────────────────────────────────────────────── */
/*  Play helpers                                                         */
/* ─────────────────────────────────────────────────────────────────── */

/** Returns the real <input> element inside ui-command-input's shadow root. */
function innerInput(canvas: HTMLElement): HTMLInputElement {
    return canvas
        .querySelector('ui-command-input')!
        .shadowRoot!
        .querySelector('input')!;
}

/** Returns all ui-command-item elements inside the canvas. */
function allItems(canvas: HTMLElement): Element[] {
    return [...canvas.querySelectorAll('ui-command-item')];
}

/** Returns items that are currently visible (hidden attribute absent). */
function visibleItems(canvas: HTMLElement): Element[] {
    return allItems(canvas).filter((i) => !i.hasAttribute('hidden'));
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Basic — inline command menu                                         */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Default rendering of `ui-command` with two groups and a separator.
 *
 * **Interaction test** (play):
 * 1. Type "pro" → only the Profile item in Settings group is visible; Suggestions group is hidden.
 * 2. Clear input → all items restore.
 * 3. Type "zzz" → no items match; empty-state message appears.
 */
export const Basic: Story = {
    name: 'Basic',
    render: () => wrap(html`
        <ui-command style="width:360px;border:1px solid #e5e7eb;border-radius:8px;">
            <ui-command-input placeholder="Type a command or search..."></ui-command-input>
            <ui-command-list>
                <ui-command-empty>No results found.</ui-command-empty>
                <ui-command-group heading="Suggestions">
                    <ui-command-item value="calendar">${iconCalendar}Calendar</ui-command-item>
                    <ui-command-item value="search emoji">${iconSmile}Search Emoji</ui-command-item>
                    <ui-command-item value="calculator" disabled>${iconCalc}Calculator</ui-command-item>
                </ui-command-group>
                <ui-command-separator></ui-command-separator>
                <ui-command-group heading="Settings">
                    <ui-command-item value="profile">
                        ${iconUser}Profile
                        <ui-command-shortcut slot="shortcut">⌘P</ui-command-shortcut>
                    </ui-command-item>
                    <ui-command-item value="billing">
                        ${iconCard}Billing
                        <ui-command-shortcut slot="shortcut">⌘B</ui-command-shortcut>
                    </ui-command-item>
                    <ui-command-item value="settings">
                        ${iconSettings}Settings
                        <ui-command-shortcut slot="shortcut">⌘S</ui-command-shortcut>
                    </ui-command-item>
                </ui-command-group>
            </ui-command-list>
        </ui-command>
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

            const suggestions = canvasElement.querySelector('ui-command-group[heading="Suggestions"]');
            expect(suggestions).toHaveAttribute('hidden');

            const settings = canvasElement.querySelector('ui-command-group[heading="Settings"]');
            expect(settings).not.toHaveAttribute('hidden');

            /* Empty state must be hidden (there is a match). */
            expect(canvasElement.querySelector('ui-command-empty')).toHaveAttribute('hidden');
        });

        /* ── Step 2: clear input → all items back ───────────────────── */
        (canvasElement.querySelector('ui-command-input') as UiCommandInput).reset();

        await waitFor(() => {
            expect(visibleItems(canvasElement)).toHaveLength(6);
            expect(canvasElement.querySelector('ui-command-group[heading="Suggestions"]')).not.toHaveAttribute('hidden');
            expect(canvasElement.querySelector('ui-command-empty')).toHaveAttribute('hidden');
        });

        /* ── Step 3: type "zzz" → no match → empty state shown ─────── */
        await userEvent.type(input, 'zzz');

        await waitFor(() => {
            expect(visibleItems(canvasElement)).toHaveLength(0);
            expect(canvasElement.querySelector('ui-command-empty')).not.toHaveAttribute('hidden');
        });

        /* Restore for a clean visual state. */
        (canvasElement.querySelector('ui-command-input') as UiCommandInput).reset();
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  With Shortcuts                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Items with keyboard shortcut hints rendered via `ui-command-shortcut`.
 *
 * **Interaction test** (play):
 * Click the Billing item and confirm that `ui-command-item-select` fires
 * with `detail.value === "billing"`.
 */
export const WithShortcuts: Story = {
    name: 'With Shortcuts',
    render: () => wrap(html`
        <ui-command style="width:360px;border:1px solid #e5e7eb;border-radius:8px;">
            <ui-command-input placeholder="Search settings..."></ui-command-input>
            <ui-command-list>
                <ui-command-empty>No results found.</ui-command-empty>
                <ui-command-group heading="Settings">
                    <ui-command-item value="profile">
                        ${iconUser}Profile
                        <ui-command-shortcut slot="shortcut">⌘P</ui-command-shortcut>
                    </ui-command-item>
                    <ui-command-item value="billing">
                        ${iconCard}Billing
                        <ui-command-shortcut slot="shortcut">⌘B</ui-command-shortcut>
                    </ui-command-item>
                    <ui-command-item value="settings">
                        ${iconSettings}Settings
                        <ui-command-shortcut slot="shortcut">⌘S</ui-command-shortcut>
                    </ui-command-item>
                </ui-command-group>
            </ui-command-list>
        </ui-command>
    `),

    play: async ({ canvasElement }) => {
        /* Collect the fired event. */
        let selectedValue = '';
        canvasElement.addEventListener('ui-command-item-select', (e) => {
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
 * Multiple labeled groups separated by `ui-command-separator`.
 *
 * **Interaction test** (play):
 * Type "home" → only the Navigation group's "Home" item survives;
 * Suggestions and Settings groups are hidden.
 */
export const WithGroups: Story = {
    name: 'With Groups & Separators',
    render: () => wrap(html`
        <ui-command style="width:380px;border:1px solid #e5e7eb;border-radius:8px;">
            <ui-command-input placeholder="Type a command or search..."></ui-command-input>
            <ui-command-list>
                <ui-command-empty>No results found.</ui-command-empty>
                <ui-command-group heading="Suggestions">
                    <ui-command-item value="calendar">${iconCalendar}Calendar</ui-command-item>
                    <ui-command-item value="search emoji">${iconSmile}Search Emoji</ui-command-item>
                    <ui-command-item value="calculator" disabled>${iconCalc}Calculator</ui-command-item>
                </ui-command-group>
                <ui-command-separator></ui-command-separator>
                <ui-command-group heading="Navigation">
                    <ui-command-item value="home">
                        ${iconHome}Home
                        <ui-command-shortcut slot="shortcut">⌘H</ui-command-shortcut>
                    </ui-command-item>
                    <ui-command-item value="new file">
                        ${iconPlus}New File
                        <ui-command-shortcut slot="shortcut">⌘N</ui-command-shortcut>
                    </ui-command-item>
                    <ui-command-item value="open file">${iconFile}Open File</ui-command-item>
                </ui-command-group>
                <ui-command-separator></ui-command-separator>
                <ui-command-group heading="Settings">
                    <ui-command-item value="profile">
                        ${iconUser}Profile
                        <ui-command-shortcut slot="shortcut">⌘P</ui-command-shortcut>
                    </ui-command-item>
                    <ui-command-item value="billing">
                        ${iconCard}Billing
                        <ui-command-shortcut slot="shortcut">⌘B</ui-command-shortcut>
                    </ui-command-item>
                    <ui-command-item value="settings">
                        ${iconSettings}Settings
                        <ui-command-shortcut slot="shortcut">⌘S</ui-command-shortcut>
                    </ui-command-item>
                </ui-command-group>
            </ui-command-list>
        </ui-command>
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
            expect(canvasElement.querySelector('ui-command-group[heading="Suggestions"]')).toHaveAttribute('hidden');
            expect(canvasElement.querySelector('ui-command-group[heading="Navigation"]')).not.toHaveAttribute('hidden');
            expect(canvasElement.querySelector('ui-command-group[heading="Settings"]')).toHaveAttribute('hidden');
        });

        (canvasElement.querySelector('ui-command-input') as UiCommandInput).reset();
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
        <ui-command style="width:360px;border:1px solid #e5e7eb;border-radius:8px;">
            <ui-command-input placeholder="Use ↑↓ then Enter..."></ui-command-input>
            <ui-command-list>
                <ui-command-empty>No results found.</ui-command-empty>
                <ui-command-group heading="Suggestions">
                    <ui-command-item value="calendar">${iconCalendar}Calendar</ui-command-item>
                    <ui-command-item value="search emoji">${iconSmile}Search Emoji</ui-command-item>
                    <ui-command-item value="calculator" disabled>${iconCalc}Calculator (disabled)</ui-command-item>
                </ui-command-group>
                <ui-command-group heading="Settings">
                    <ui-command-item value="profile">${iconUser}Profile</ui-command-item>
                    <ui-command-item value="billing">${iconCard}Billing</ui-command-item>
                </ui-command-group>
            </ui-command-list>
        </ui-command>
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
        canvasElement.addEventListener('ui-command-item-select', (e) => {
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
 * `ui-command-dialog` wraps the command in a modal overlay.
 * Click the button (or press ⌘K) to open; Escape or backdrop click to close.
 *
 * **Interaction test** (play):
 * 1. Click "Open Menu" → dialog opens (backdrop gains `.open` class).
 * 2. Type "bill" in the auto-focused input → only Billing item visible.
 * 3. Press Enter → `ui-command-item-select` fires with `value = "billing"`.
 * 4. Press Escape → `ui-command-dialog-close` fires; dialog closes.
 * 5. After close the input is reset (filter cleared).
 */
export const Dialog: Story = {
    name: 'Dialog (⌘K)',
    render: () => {
        const openDialog = (e: Event) => {
            const btn = e.currentTarget as HTMLElement;
            const dlg = btn.closest('div')!.querySelector('ui-command-dialog') as UiCommandDialog;
            dlg.open = true;
        };
        const closeDialog = (e: Event) => {
            (e.currentTarget as UiCommandDialog).open = false;
        };
        const onGlobalKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                const dlg = document.querySelector('ui-command-dialog') as UiCommandDialog | null;
                if (dlg) dlg.open = true;
            }
        };

        return html`
            <div
                style="display:flex;flex-direction:column;gap:12px;align-items:center;"
                @keydown=${onGlobalKey}
            >
                <ui-button variant="secondary" size="small" @click=${openDialog}>
                    Open Menu
                    <kbd style="padding:2px 6px;background:#f3f4f6;border:1px solid #d1d5db;border-radius:4px;font-size:0.75rem;color:#6b7280;">⌘K</kbd>
                </ui-button>

                <ui-command-dialog @ui-command-dialog-close=${closeDialog}>
                    <ui-command>
                        <ui-command-input placeholder="Type a command or search..."></ui-command-input>
                        <ui-command-list>
                            <ui-command-empty>No results found.</ui-command-empty>
                            <ui-command-group heading="Suggestions">
                                <ui-command-item value="calendar">${iconCalendar}Calendar</ui-command-item>
                                <ui-command-item value="search emoji">${iconSmile}Search Emoji</ui-command-item>
                                <ui-command-item value="calculator" disabled>${iconCalc}Calculator</ui-command-item>
                            </ui-command-group>
                            <ui-command-separator></ui-command-separator>
                            <ui-command-group heading="Settings">
                                <ui-command-item value="profile">
                                    ${iconUser}Profile
                                    <ui-command-shortcut slot="shortcut">⌘P</ui-command-shortcut>
                                </ui-command-item>
                                <ui-command-item value="billing">
                                    ${iconCard}Billing
                                    <ui-command-shortcut slot="shortcut">⌘B</ui-command-shortcut>
                                </ui-command-item>
                                <ui-command-item value="settings">
                                    ${iconSettings}Settings
                                    <ui-command-shortcut slot="shortcut">⌘S</ui-command-shortcut>
                                </ui-command-item>
                            </ui-command-group>
                        </ui-command-list>
                    </ui-command>
                </ui-command-dialog>
            </div>
        `;
    },

    play: async ({ canvasElement }) => {
        const dialogEl  = canvasElement.querySelector('ui-command-dialog') as UiCommandDialog;
        const backdrop  = dialogEl.shadowRoot!.querySelector('.backdrop')!;
        const openBtn   = canvasElement.querySelector('ui-button')!;

        /* ── 1. Dialog is closed initially ──────────────────────────── */
        expect(backdrop.classList.contains('open')).toBe(false);

        /* ── 2. Click "Open Menu" → dialog opens ─────────────────────── */
        await userEvent.click(openBtn);
        await waitFor(() => {
            expect(backdrop.classList.contains('open')).toBe(true);
        });

        /* ── 3. Input is auto-focused; type "bill" ───────────────────── */
        const cmdInput = canvasElement.querySelector('ui-command-input') as UiCommandInput;
        const input    = cmdInput.shadowRoot!.querySelector('input')!;
        await userEvent.click(input);
        await userEvent.type(input, 'bill');

        await waitFor(() => {
            expect(canvasElement.querySelector('[value="billing"]')).not.toHaveAttribute('hidden');
            expect(canvasElement.querySelector('[value="calendar"]')).toHaveAttribute('hidden');
        });

        /* ── 4. Press Enter → activates "billing" item ───────────────── */
        let selectedValue = '';
        canvasElement.addEventListener('ui-command-item-select', (e) => {
            selectedValue = (e as CustomEvent<{ value: string }>).detail.value;
        });

        await userEvent.keyboard('{Enter}');
        await waitFor(() => {
            expect(selectedValue).toBe('billing');
        });

        /* ── 5. Press Escape → dialog closes and resets ──────────────── */
        await userEvent.keyboard('{Escape}');
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
 * Constrain list height with `--ui-command-list-max-height` to enable scrolling.
 *
 * **Interaction test** (play):
 * Type "edit" → only "Code Editor" and "Image Editor" items match.
 */
export const Scrollable: Story = {
    name: 'Scrollable (Many Items)',
    render: () => wrap(html`
        <ui-command style="width:400px;border:1px solid #e5e7eb;border-radius:8px;--ui-command-list-max-height:240px;">
            <ui-command-input placeholder="Type a command or search..."></ui-command-input>
            <ui-command-list>
                <ui-command-empty>No results found.</ui-command-empty>
                <ui-command-group heading="Navigation">
                    <ui-command-item value="home">${iconHome}Home<ui-command-shortcut slot="shortcut">⌘H</ui-command-shortcut></ui-command-item>
                    <ui-command-item value="new file">${iconPlus}New File<ui-command-shortcut slot="shortcut">⌘N</ui-command-shortcut></ui-command-item>
                    <ui-command-item value="open file">${iconFile}Open File</ui-command-item>
                </ui-command-group>
                <ui-command-separator></ui-command-separator>
                <ui-command-group heading="Tools">
                    <ui-command-item value="code editor">${iconCode}Code Editor</ui-command-item>
                    <ui-command-item value="image editor">${iconImage}Image Editor</ui-command-item>
                    <ui-command-item value="calculator">${iconCalc}Calculator</ui-command-item>
                    <ui-command-item value="calendar">${iconCalendar}Calendar</ui-command-item>
                </ui-command-group>
                <ui-command-separator></ui-command-separator>
                <ui-command-group heading="Account">
                    <ui-command-item value="profile">
                        ${iconUser}Profile
                        <ui-command-shortcut slot="shortcut">⌘P</ui-command-shortcut>
                    </ui-command-item>
                    <ui-command-item value="billing">
                        ${iconCard}Billing
                        <ui-command-shortcut slot="shortcut">⌘B</ui-command-shortcut>
                    </ui-command-item>
                    <ui-command-item value="settings">
                        ${iconSettings}Settings
                        <ui-command-shortcut slot="shortcut">⌘S</ui-command-shortcut>
                    </ui-command-item>
                </ui-command-group>
                <ui-command-separator></ui-command-separator>
                <ui-command-group heading="Suggestions">
                    <ui-command-item value="search emoji">${iconSmile}Search Emoji</ui-command-item>
                    <ui-command-item value="open terminal">${iconCode}Open Terminal</ui-command-item>
                </ui-command-group>
            </ui-command-list>
        </ui-command>
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
            expect(canvasElement.querySelector('ui-command-group[heading="Navigation"]')).toHaveAttribute('hidden');
            expect(canvasElement.querySelector('ui-command-group[heading="Account"]')).toHaveAttribute('hidden');
            expect(canvasElement.querySelector('ui-command-group[heading="Tools"]')).not.toHaveAttribute('hidden');
        });

        (canvasElement.querySelector('ui-command-input') as UiCommandInput).reset();
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
        <ui-command style="width:320px;border:1px solid #e5e7eb;border-radius:8px;">
            <ui-command-input placeholder="Search..."></ui-command-input>
            <ui-command-list>
                <ui-command-empty>No results found.</ui-command-empty>
                <ui-command-group heading="Fruits">
                    <ui-command-item value="apple">Apple</ui-command-item>
                    <ui-command-item value="banana">Banana</ui-command-item>
                    <ui-command-item value="cherry">Cherry</ui-command-item>
                    <ui-command-item value="dragonfruit">Dragonfruit</ui-command-item>
                </ui-command-group>
                <ui-command-separator></ui-command-separator>
                <ui-command-group heading="Vegetables">
                    <ui-command-item value="artichoke">Artichoke</ui-command-item>
                    <ui-command-item value="broccoli">Broccoli</ui-command-item>
                    <ui-command-item value="carrot">Carrot</ui-command-item>
                </ui-command-group>
            </ui-command-list>
        </ui-command>
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

        (canvasElement.querySelector('ui-command-input') as UiCommandInput).reset();
    },
};
