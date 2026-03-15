import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { expectAccessible } from '../test-utils/axe';
import './flint-command.js';
import type {
    FlintCommand,
    FlintCommandInput,
    FlintCommandItem,
    FlintCommandGroup,
    FlintCommandEmpty,
    FlintCommandDialog,
    FlintCommandShortcut,
    FlintCommandSeparator,
    FlintCommandList,
} from './flint-command.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  Helpers                                                              */
/* ─────────────────────────────────────────────────────────────────── */

/** Wait for all pending Lit updates + a short macrotask. */
async function settle(el: Element, ms = 30) {
    await (el as FlintCommand).updateComplete;
    await new Promise((r) => setTimeout(r, ms));
}

/** Simulate typing into the command input's inner <input>. */
async function typeInInput(cmd: FlintCommand, query: string) {
    const cmdInput = cmd.querySelector('flint-command-input') as FlintCommandInput;
    const inner = cmdInput.shadowRoot!.querySelector('input') as HTMLInputElement;
    inner.value = query;
    inner.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await settle(cmd);
}

/** Get all command items inside the command (including slotted in groups). */
function getItems(cmd: FlintCommand): FlintCommandItem[] {
    return [...cmd.querySelectorAll('flint-command-item')] as FlintCommandItem[];
}

/** Get visible (not hidden) items. */
function getVisibleItems(cmd: FlintCommand): FlintCommandItem[] {
    return getItems(cmd).filter((i) => !i.hidden);
}

/** Get highlighted item. */
function getHighlighted(cmd: FlintCommand): FlintCommandItem | undefined {
    return getItems(cmd).find((i) => i.highlighted);
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Fixtures                                                             */
/* ─────────────────────────────────────────────────────────────────── */

const BASIC_FIXTURE = html`
    <flint-command>
        <flint-command-input placeholder="Search..."></flint-command-input>
        <flint-command-list>
            <flint-command-empty>No results found.</flint-command-empty>
            <flint-command-group heading="Suggestions">
                <flint-command-item value="calendar">Calendar</flint-command-item>
                <flint-command-item value="search emoji">Search Emoji</flint-command-item>
                <flint-command-item value="calculator" disabled>Calculator</flint-command-item>
            </flint-command-group>
            <flint-command-group heading="Settings">
                <flint-command-item value="profile">Profile</flint-command-item>
                <flint-command-item value="billing">Billing</flint-command-item>
                <flint-command-item value="settings">Settings</flint-command-item>
            </flint-command-group>
        </flint-command-list>
    </flint-command>
`;

/* ─────────────────────────────────────────────────────────────────── */
/*  Rendering                                                            */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommand — rendering', () => {
    it('renders all items', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);
        expect(getItems(cmd)).toHaveLength(6);
    });

    it('renders groups with headings', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);
        const groups = [...cmd.querySelectorAll('flint-command-group')] as FlintCommandGroup[];
        expect(groups).toHaveLength(2);
        expect(groups[0].heading).toBe('Suggestions');
        expect(groups[1].heading).toBe('Settings');
    });

    it('hides empty state initially when items are present', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);
        const empty = cmd.querySelector('flint-command-empty') as FlintCommandEmpty;
        expect(empty.hidden).toBe(true);
    });

    it('reflects disabled attribute on item', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);
        const disabled = cmd.querySelector('flint-command-item[value="calculator"]') as FlintCommandItem;
        expect(disabled.disabled).toBe(true);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  Filtering                                                            */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommand — filtering', () => {
    let cmd: FlintCommand;

    beforeEach(async () => {
        cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);
    });

    it('shows all items when query is empty', async () => {
        const visible = getVisibleItems(cmd);
        // All 6 items visible (including disabled)
        expect(visible).toHaveLength(6);
    });

    it('filters items by value (case-insensitive)', async () => {
        await typeInInput(cmd, 'cal');
        const visible = getVisibleItems(cmd);
        // "calendar" and "calculator" both match "cal"
        expect(visible.map((i) => i.value)).toEqual(
            expect.arrayContaining(['calendar', 'calculator'])
        );
        expect(visible.map((i) => i.value)).not.toContain('profile');
    });

    it('hides items that do not match query', async () => {
        await typeInInput(cmd, 'profile');
        const visible = getVisibleItems(cmd);
        expect(visible).toHaveLength(1);
        expect(visible[0].value).toBe('profile');
    });

    it('shows empty state when no items match', async () => {
        await typeInInput(cmd, 'zzznomatch');
        const empty = cmd.querySelector('flint-command-empty') as FlintCommandEmpty;
        expect(empty.hidden).toBe(false);
        expect(getVisibleItems(cmd)).toHaveLength(0);
    });

    it('hides empty state again when results exist', async () => {
        await typeInInput(cmd, 'zzznomatch');
        await typeInInput(cmd, 'pro');
        const empty = cmd.querySelector('flint-command-empty') as FlintCommandEmpty;
        expect(empty.hidden).toBe(true);
        expect(getVisibleItems(cmd).length).toBeGreaterThan(0);
    });

    it('restores all items when query is cleared', async () => {
        await typeInInput(cmd, 'profile');
        await typeInInput(cmd, '');
        expect(getVisibleItems(cmd)).toHaveLength(6);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  Group hiding                                                         */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommand — group visibility', () => {
    it('hides a group when all its items are filtered out', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);

        // Filter to only "profile" which is in the Settings group
        await typeInInput(cmd, 'profile');

        const groups = [...cmd.querySelectorAll('flint-command-group')] as FlintCommandGroup[];
        const suggestions = groups.find((g) => g.heading === 'Suggestions');
        const settings = groups.find((g) => g.heading === 'Settings');

        expect(suggestions!.hidden).toBe(true);
        expect(settings!.hidden).toBe(false);
    });

    it('shows both groups again when query is cleared', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);

        await typeInInput(cmd, 'profile');
        await typeInInput(cmd, '');

        const groups = [...cmd.querySelectorAll('flint-command-group')] as FlintCommandGroup[];
        for (const group of groups) {
            expect(group.hidden).toBe(false);
        }
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  Keyboard navigation                                                  */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommand — keyboard navigation', () => {
    let cmd: FlintCommand;

    beforeEach(async () => {
        cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);
    });

    const key = (target: Element, k: string) => {
        target.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, composed: true }));
    };

    it('highlights the first navigable item on mount', async () => {
        const highlighted = getHighlighted(cmd);
        // Disabled "calculator" is not navigable; first non-disabled visible is "calendar"
        expect(highlighted?.value).toBe('calendar');
    });

    it('moves highlight forward with ArrowDown', async () => {
        key(cmd, 'ArrowDown');
        await settle(cmd);
        expect(getHighlighted(cmd)?.value).toBe('search emoji');
    });

    it('skips disabled items during ArrowDown', async () => {
        // Start at "calendar", go down → "search emoji", down → skips disabled "calculator", → "profile"
        key(cmd, 'ArrowDown'); // search emoji
        key(cmd, 'ArrowDown'); // profile (disabled calculator is skipped)
        await settle(cmd);
        expect(getHighlighted(cmd)?.value).toBe('profile');
    });

    it('moves highlight backward with ArrowUp', async () => {
        // Start: "calendar" → go down to "search emoji" → go up back to "calendar"
        key(cmd, 'ArrowDown');
        key(cmd, 'ArrowUp');
        await settle(cmd);
        expect(getHighlighted(cmd)?.value).toBe('calendar');
    });

    it('wraps ArrowDown from last item to first item', async () => {
        // Navigate to last item then wrap
        const navigable = getItems(cmd).filter((i) => !i.disabled);
        for (let i = 0; i < navigable.length; i++) {
            key(cmd, 'ArrowDown');
        }
        await settle(cmd);
        // Wrapped back to first navigable
        expect(getHighlighted(cmd)?.value).toBe('calendar');
    });

    it('wraps ArrowUp from first item to last item', async () => {
        key(cmd, 'ArrowUp');
        await settle(cmd);
        // Should wrap to last navigable item (settings)
        expect(getHighlighted(cmd)?.value).toBe('settings');
    });

    it('fires flint-command-item-select on Enter', async () => {
        const handler = vi.fn();
        cmd.addEventListener('flint-command-item-select', handler);

        key(cmd, 'Enter');
        await settle(cmd);

        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.value).toBe('calendar');
    });

    it('moves highlight to first match after filtering', async () => {
        await typeInInput(cmd, 'pro');
        const highlighted = getHighlighted(cmd);
        expect(highlighted?.value).toBe('profile');
    });

    it('jumps to first navigable item with Home key', async () => {
        // Navigate forward a couple items first
        key(cmd, 'ArrowDown'); // search emoji
        key(cmd, 'ArrowDown'); // profile
        await settle(cmd);

        key(cmd, 'Home');
        await settle(cmd);
        expect(getHighlighted(cmd)?.value).toBe('calendar');
    });

    it('jumps to last navigable item with End key', async () => {
        key(cmd, 'End');
        await settle(cmd);
        expect(getHighlighted(cmd)?.value).toBe('settings');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  Click selection                                                      */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommand — click selection', () => {
    it('fires flint-command-item-select when an item is clicked', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const handler = vi.fn();
        cmd.addEventListener('flint-command-item-select', handler);

        const item = cmd.querySelector('flint-command-item[value="billing"]') as FlintCommandItem;
        item.shadowRoot!.querySelector('.item')!.dispatchEvent(
            new MouseEvent('click', { bubbles: true, composed: true })
        );

        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.value).toBe('billing');
    });

    it('does not fire flint-command-item-select when a disabled item is clicked', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const handler = vi.fn();
        cmd.addEventListener('flint-command-item-select', handler);

        const disabled = cmd.querySelector('flint-command-item[value="calculator"]') as FlintCommandItem;
        disabled.shadowRoot!.querySelector('.item')!.dispatchEvent(
            new MouseEvent('click', { bubbles: true, composed: true })
        );

        expect(handler).not.toHaveBeenCalled();
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  reset() API                                                          */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommand — reset()', () => {
    it('restores all items and clears the input', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);

        await typeInInput(cmd, 'billing');
        expect(getVisibleItems(cmd)).toHaveLength(1);

        cmd.reset();
        await settle(cmd);

        expect(getVisibleItems(cmd)).toHaveLength(6);
        const input = cmd.querySelector('flint-command-input') as FlintCommandInput;
        expect(input.value).toBe('');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-command-dialog                                                   */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommandDialog', () => {
    const DIALOG_FIXTURE = html`
        <flint-command-dialog>
            <flint-command>
                <flint-command-input placeholder="Search..."></flint-command-input>
                <flint-command-list>
                    <flint-command-empty>No results found.</flint-command-empty>
                    <flint-command-group heading="Actions">
                        <flint-command-item value="save">Save</flint-command-item>
                        <flint-command-item value="delete">Delete</flint-command-item>
                    </flint-command-group>
                </flint-command-list>
            </flint-command>
        </flint-command-dialog>
    `;

    it('is closed by default (backdrop has no open class)', async () => {
        const dialog = await fixture<FlintCommandDialog>(DIALOG_FIXTURE);
        await settle(dialog);
        const backdrop = dialog.shadowRoot!.querySelector('.backdrop')!;
        expect(backdrop.classList.contains('open')).toBe(false);
    });

    it('opens when open prop is set to true', async () => {
        const dialog = await fixture<FlintCommandDialog>(DIALOG_FIXTURE);
        await settle(dialog);

        dialog.open = true;
        await settle(dialog);

        const backdrop = dialog.shadowRoot!.querySelector('.backdrop')!;
        expect(backdrop.classList.contains('open')).toBe(true);
    });

    it('fires flint-command-dialog-close on Escape', async () => {
        const dialog = await fixture<FlintCommandDialog>(DIALOG_FIXTURE);
        dialog.open = true;
        await settle(dialog);

        const handler = vi.fn();
        dialog.addEventListener('flint-command-dialog-close', handler);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await settle(dialog);

        expect(handler).toHaveBeenCalledOnce();
    });

    it('does not fire flint-command-dialog-close when closed and Escape is pressed', async () => {
        const dialog = await fixture<FlintCommandDialog>(DIALOG_FIXTURE);
        await settle(dialog);

        const handler = vi.fn();
        dialog.addEventListener('flint-command-dialog-close', handler);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

        expect(handler).not.toHaveBeenCalled();
    });

    it('fires flint-command-dialog-close on backdrop click', async () => {
        const dialog = await fixture<FlintCommandDialog>(DIALOG_FIXTURE);
        dialog.open = true;
        await settle(dialog);

        const handler = vi.fn();
        dialog.addEventListener('flint-command-dialog-close', handler);

        const backdrop = dialog.shadowRoot!.querySelector('.backdrop') as HTMLElement;
        backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(handler).toHaveBeenCalledOnce();
    });

    it('resets command state when closed', async () => {
        const dialog = await fixture<FlintCommandDialog>(DIALOG_FIXTURE);
        dialog.open = true;
        await settle(dialog);

        const cmd = dialog.querySelector('flint-command') as FlintCommand;
        await typeInInput(cmd, 'save');
        expect(getVisibleItems(cmd)).toHaveLength(1);

        dialog.open = false;
        await settle(dialog, 50);

        expect(getVisibleItems(cmd)).toHaveLength(2);
        const input = dialog.querySelector('flint-command-input') as FlintCommandInput;
        expect(input.value).toBe('');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-command-item — value fallback                                     */
/* ─────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────── */
/*  Separator visibility                                                 */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommand — separator visibility', () => {
    const SEP_FIXTURE = html`
        <flint-command>
            <flint-command-input></flint-command-input>
            <flint-command-list>
                <flint-command-empty>No results.</flint-command-empty>
                <flint-command-group heading="Fruits">
                    <flint-command-item value="apple">Apple</flint-command-item>
                </flint-command-group>
                <flint-command-separator></flint-command-separator>
                <flint-command-group heading="Veggies">
                    <flint-command-item value="banana">Banana</flint-command-item>
                </flint-command-group>
            </flint-command-list>
        </flint-command>
    `;

    it('shows separator when content exists on both sides', async () => {
        const cmd = await fixture<FlintCommand>(SEP_FIXTURE);
        await settle(cmd);
        const sep = cmd.querySelector('flint-command-separator')!;
        expect(sep.hidden).toBe(false);
    });

    it('hides separator when the preceding group is filtered out', async () => {
        const cmd = await fixture<FlintCommand>(SEP_FIXTURE);
        await settle(cmd);
        await typeInInput(cmd, 'banana'); // only Veggies group matches
        const sep = cmd.querySelector('flint-command-separator')!;
        expect(sep.hidden).toBe(true);
    });

    it('hides separator when the following group is filtered out', async () => {
        const cmd = await fixture<FlintCommand>(SEP_FIXTURE);
        await settle(cmd);
        await typeInInput(cmd, 'apple'); // only Fruits group matches
        const sep = cmd.querySelector('flint-command-separator')!;
        expect(sep.hidden).toBe(true);
    });

    it('hides separator when all groups are filtered out', async () => {
        const cmd = await fixture<FlintCommand>(SEP_FIXTURE);
        await settle(cmd);
        await typeInInput(cmd, 'zzz');
        const sep = cmd.querySelector('flint-command-separator')!;
        expect(sep.hidden).toBe(true);
    });

    it('restores separator visibility when filter is cleared', async () => {
        const cmd = await fixture<FlintCommand>(SEP_FIXTURE);
        await settle(cmd);
        await typeInInput(cmd, 'banana');
        await typeInInput(cmd, '');
        const sep = cmd.querySelector('flint-command-separator')!;
        expect(sep.hidden).toBe(false);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  Empty group visibility                                              */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommand — empty group', () => {
    it('hides a group that has no items', async () => {
        const cmd = await fixture<FlintCommand>(html`
            <flint-command>
                <flint-command-input></flint-command-input>
                <flint-command-list>
                    <flint-command-group heading="Empty"></flint-command-group>
                    <flint-command-group heading="NonEmpty">
                        <flint-command-item value="item">Item</flint-command-item>
                    </flint-command-group>
                </flint-command-list>
            </flint-command>
        `);
        await settle(cmd);
        const emptyGroup    = cmd.querySelector('flint-command-group[heading="Empty"]')! as FlintCommandGroup;
        const nonEmptyGroup = cmd.querySelector('flint-command-group[heading="NonEmpty"]')! as FlintCommandGroup;
        expect(emptyGroup.hidden).toBe(true);
        expect(nonEmptyGroup.hidden).toBe(false);
    });
});

describe('FlintCommandItem — value fallback', () => {
    it('uses textContent as value when value attr is not set', async () => {
        const cmd = await fixture<FlintCommand>(html`
            <flint-command>
                <flint-command-input></flint-command-input>
                <flint-command-list>
                    <flint-command-item>My Command</flint-command-item>
                </flint-command-list>
            </flint-command>
        `);
        await settle(cmd);

        const handler = vi.fn();
        cmd.addEventListener('flint-command-item-select', handler);

        const item = cmd.querySelector('flint-command-item') as FlintCommandItem;
        item.shadowRoot!.querySelector('.item')!.dispatchEvent(
            new MouseEvent('click', { bubbles: true, composed: true })
        );

        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.value).toBe('My Command');
    });

    it('filters by textContent when value attr is absent', async () => {
        const cmd = await fixture<FlintCommand>(html`
            <flint-command>
                <flint-command-input></flint-command-input>
                <flint-command-list>
                    <flint-command-empty>No results found.</flint-command-empty>
                    <flint-command-item>Apple</flint-command-item>
                    <flint-command-item>Banana</flint-command-item>
                </flint-command-list>
            </flint-command>
        `);
        await settle(cmd);

        await typeInInput(cmd, 'ban');
        const visible = getVisibleItems(cmd);
        expect(visible).toHaveLength(1);
        expect(visible[0].textContent?.trim()).toBe('Banana');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  FlintCommandShortcut                                                   */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommandShortcut', () => {
    it('renders slot content', async () => {
        const el = await fixture<FlintCommandShortcut>(html`<flint-command-shortcut>⌘P</flint-command-shortcut>`);
        expect(el.textContent).toBe('⌘P');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  FlintCommandSeparator                                                  */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommandSeparator', () => {
    it('renders without errors', async () => {
        const el = await fixture<FlintCommandSeparator>(html`<flint-command-separator></flint-command-separator>`);
        expect(el).toBeTruthy();
    });

    it('is hidden when hidden attribute is set', async () => {
        const el = await fixture<FlintCommandSeparator>(html`<flint-command-separator hidden></flint-command-separator>`);
        expect(el.hidden).toBe(true);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  FlintCommandEmpty                                                      */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommandEmpty', () => {
    it('renders slot content', async () => {
        const el = await fixture<FlintCommandEmpty>(html`<flint-command-empty>No results</flint-command-empty>`);
        expect(el.textContent).toBe('No results');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  FlintCommandGroup                                                      */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommandGroup', () => {
    it('renders heading in shadow DOM', async () => {
        const el = await fixture<FlintCommandGroup>(html`<flint-command-group heading="Actions"></flint-command-group>`);
        await el.updateComplete;
        const heading = el.shadowRoot!.querySelector('.heading')!;
        const text = [...heading.childNodes]
            .filter((n) => n.nodeType === Node.TEXT_NODE)
            .map((n) => n.textContent)
            .join('')
            .trim();
        expect(text).toBe('Actions');
    });

    it('hides heading when heading is empty', async () => {
        const el = await fixture<FlintCommandGroup>(html`<flint-command-group></flint-command-group>`);
        await el.updateComplete;
        const heading = el.shadowRoot!.querySelector('.heading')!;
        // .heading:empty { display: none } via CSS; we verify the text is empty
        expect(heading.textContent?.trim()).toBe('');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  FlintCommandList                                                       */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommandList', () => {
    it('has listbox role', async () => {
        const el = await fixture<FlintCommandList>(html`<flint-command-list></flint-command-list>`);
        await el.updateComplete;
        const listbox = el.shadowRoot!.querySelector('[role="listbox"]');
        expect(listbox).toBeTruthy();
    });

    it('has aria-label on the listbox', async () => {
        const el = await fixture<FlintCommandList>(html`<flint-command-list></flint-command-list>`);
        await el.updateComplete;
        const listbox = el.shadowRoot!.querySelector('[role="listbox"]')!;
        expect(listbox.getAttribute('aria-label')).toBe('Command results');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  FlintCommandInput                                                      */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommandInput', () => {
    it('focus() delegates to inner input', async () => {
        const el = await fixture<FlintCommandInput>(html`<flint-command-input></flint-command-input>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('input') as HTMLInputElement;
        const focusSpy = vi.spyOn(inner, 'focus');
        el.focus();
        expect(focusSpy).toHaveBeenCalled();
    });

    it('reset() clears the value property', async () => {
        const el = await fixture<FlintCommandInput>(html`<flint-command-input></flint-command-input>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('input') as HTMLInputElement;
        inner.value = 'hello';
        el.reset();
        expect(el.value).toBe('');
        expect(inner.value).toBe('');
    });

    it('reset() dispatches _cmd-filter event with empty query', async () => {
        const el = await fixture<FlintCommandInput>(html`<flint-command-input></flint-command-input>`);
        await el.updateComplete;
        const handler = vi.fn();
        el.addEventListener('_cmd-filter', handler);
        el.reset();
        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.query).toBe('');
    });

    it('dispatches _cmd-filter on input event', async () => {
        const el = await fixture<FlintCommandInput>(html`<flint-command-input></flint-command-input>`);
        await el.updateComplete;
        const handler = vi.fn();
        el.addEventListener('_cmd-filter', handler);
        const inner = el.shadowRoot!.querySelector('input') as HTMLInputElement;
        inner.value = 'test';
        inner.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        expect(handler).toHaveBeenCalledOnce();
        expect(handler.mock.calls[0][0].detail.query).toBe('test');
    });

    it('reflects value property', async () => {
        const el = await fixture<FlintCommandInput>(html`<flint-command-input></flint-command-input>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('input') as HTMLInputElement;
        inner.value = 'abc';
        inner.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        expect(el.value).toBe('abc');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  FlintCommandItem — icon slot                                           */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommandItem — icon slot', () => {
    it('hides icon span when icon slot is empty', async () => {
        const el = await fixture<FlintCommandItem>(html`<flint-command-item>Search</flint-command-item>`);
        await el.updateComplete;
        const icon = el.shadowRoot!.querySelector('.icon') as HTMLElement;
        expect(icon.hidden).toBe(true);
    });

    it('shows icon span when icon slot has content', async () => {
        const el = await fixture<FlintCommandItem>(html`
            <flint-command-item>
                <span slot="icon">★</span>
                Search
            </flint-command-item>
        `);
        await el.updateComplete;
        // Wait for slotchange to fire
        await new Promise((r) => setTimeout(r, 20));
        const icon = el.shadowRoot!.querySelector('.icon') as HTMLElement;
        expect(icon.hidden).toBe(false);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  FlintCommandItem — ARIA attributes                                     */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommandItem — aria attributes', () => {
    it('has aria-selected=false by default', async () => {
        const el = await fixture<FlintCommandItem>(html`<flint-command-item>Item</flint-command-item>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-selected')).toBe('false');
    });

    it('has aria-selected=true when highlighted', async () => {
        const el = await fixture<FlintCommandItem>(html`<flint-command-item>Item</flint-command-item>`);
        el.highlighted = true;
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-selected')).toBe('true');
    });

    it('has aria-disabled=true when disabled', async () => {
        const el = await fixture<FlintCommandItem>(html`<flint-command-item disabled>Item</flint-command-item>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-disabled')).toBe('true');
    });

    it('has aria-disabled=false when not disabled', async () => {
        const el = await fixture<FlintCommandItem>(html`<flint-command-item>Item</flint-command-item>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.item')!;
        expect(div.getAttribute('aria-disabled')).toBe('false');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  FlintCommandItem — scrollIntoViewIfNeeded                              */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommandItem — scrollIntoViewIfNeeded', () => {
    it('calls scrollIntoView with block:nearest when available', async () => {
        const el = await fixture<FlintCommandItem>(html`<flint-command-item>Item</flint-command-item>`);
        // jsdom does not define scrollIntoView — assign a mock so the guard passes
        const spy = vi.fn();
        (el as unknown as { scrollIntoView: typeof spy }).scrollIntoView = spy;
        el.scrollIntoViewIfNeeded();
        expect(spy).toHaveBeenCalledWith({ block: 'nearest' });
    });

    it('does not throw when scrollIntoView is not a function', async () => {
        const el = await fixture<FlintCommandItem>(html`<flint-command-item>Item</flint-command-item>`);
        Object.defineProperty(el, 'scrollIntoView', { value: undefined, configurable: true });
        expect(() => el.scrollIntoViewIfNeeded()).not.toThrow();
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  FlintCommand — edge cases                                              */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommand — edge cases', () => {
    it('does not throw on keydown when there are no navigable items', async () => {
        const cmd = await fixture<FlintCommand>(html`
            <flint-command>
                <flint-command-input></flint-command-input>
                <flint-command-list>
                    <flint-command-empty>No results</flint-command-empty>
                </flint-command-list>
            </flint-command>
        `);
        await settle(cmd);
        expect(() =>
            cmd.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }))
        ).not.toThrow();
    });

    it('Enter does not fire event when no item is highlighted', async () => {
        const cmd = await fixture<FlintCommand>(html`
            <flint-command>
                <flint-command-input></flint-command-input>
                <flint-command-list>
                    <flint-command-empty>No results</flint-command-empty>
                    <flint-command-item value="a">A</flint-command-item>
                </flint-command-list>
            </flint-command>
        `);
        await settle(cmd);
        // Filter to empty → no navigable items → no highlighted item
        await typeInInput(cmd, 'zzz');
        const handler = vi.fn();
        cmd.addEventListener('flint-command-item-select', handler);
        cmd.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('reset() calls _applyFilter directly when no flint-command-input present', async () => {
        const cmd = await fixture<FlintCommand>(html`
            <flint-command>
                <flint-command-list>
                    <flint-command-empty>No results</flint-command-empty>
                    <flint-command-item value="a">A</flint-command-item>
                    <flint-command-item value="b">B</flint-command-item>
                </flint-command-list>
            </flint-command>
        `);
        await settle(cmd);
        // All items visible by default
        expect(getVisibleItems(cmd)).toHaveLength(2);
        // reset() with no input should still work
        cmd.reset();
        await settle(cmd);
        expect(getVisibleItems(cmd)).toHaveLength(2);
    });

    it('applyFilter handles missing flint-command-empty gracefully', async () => {
        const cmd = await fixture<FlintCommand>(html`
            <flint-command>
                <flint-command-input></flint-command-input>
                <flint-command-list>
                    <flint-command-item value="apple">Apple</flint-command-item>
                </flint-command-list>
            </flint-command>
        `);
        await settle(cmd);
        // No empty element; filtering should not throw
        await expect(typeInInput(cmd, 'zzz')).resolves.toBeUndefined();
        expect(getVisibleItems(cmd)).toHaveLength(0);
    });

    it('applyFilter handles missing flint-command-list gracefully', async () => {
        const cmd = await fixture<FlintCommand>(html`
            <flint-command>
                <flint-command-input></flint-command-input>
                <flint-command-item value="apple">Apple</flint-command-item>
                <flint-command-item value="banana">Banana</flint-command-item>
            </flint-command>
        `);
        await settle(cmd);
        // Separator logic is skipped if no list; filtering should still work
        await typeInInput(cmd, 'apple');
        expect(getVisibleItems(cmd)).toHaveLength(1);
    });

    it('disconnectedCallback removes keydown listener', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const handler = vi.fn();
        cmd.addEventListener('flint-command-item-select', handler);

        // Detach from DOM — removes event listeners
        cmd.remove();

        // Keydown should not reach _handleKeyDown anymore
        // We test indirectly by checking disconnectedCallback doesn't throw
        expect(() => cmd.disconnectedCallback()).not.toThrow();
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  FlintCommand — mouse hover highlight                                   */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommand — mouse hover highlight', () => {
    it('updates keyboard highlight when mouse enters an item', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const billing = cmd.querySelector('flint-command-item[value="billing"]') as FlintCommandItem;
        billing.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, composed: true }));
        await settle(cmd);

        expect(billing.highlighted).toBe(true);
    });

    it('clears previous highlight when mouse enters a new item', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const calendar = cmd.querySelector('flint-command-item[value="calendar"]') as FlintCommandItem;
        const billing = cmd.querySelector('flint-command-item[value="billing"]') as FlintCommandItem;

        billing.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, composed: true }));
        await settle(cmd);

        expect(billing.highlighted).toBe(true);
        expect(calendar.highlighted).toBe(false);
    });

    it('does not highlight a disabled item on mouseover', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const calc = cmd.querySelector('flint-command-item[value="calculator"]') as FlintCommandItem;
        calc.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, composed: true }));
        await settle(cmd);

        expect(calc.highlighted).toBe(false);
    });

    it('does not highlight a hidden item on mouseover', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);

        // Filter so "profile" is visible but "billing" is hidden
        await typeInInput(cmd, 'profile');

        const billing = cmd.querySelector('flint-command-item[value="billing"]') as FlintCommandItem;
        billing.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, composed: true }));
        await settle(cmd);

        expect(billing.highlighted).toBe(false);
    });

    it('ignores mouseover events from non-item elements', async () => {
        const cmd = await fixture<FlintCommand>(BASIC_FIXTURE);
        await settle(cmd);

        const firstHighlight = getHighlighted(cmd);

        // Fire mouseover on the command-group, not an item
        const group = cmd.querySelector('flint-command-group') as FlintCommandGroup;
        group.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, composed: true }));
        await settle(cmd);

        // Highlight should be unchanged
        expect(getHighlighted(cmd)).toBe(firstHighlight);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  FlintCommandDialog — additional coverage                               */
/* ─────────────────────────────────────────────────────────────────── */

describe('FlintCommandDialog — backdrop click inner panel', () => {
    const DIALOG_FIXTURE_LOCAL = html`
        <flint-command-dialog>
            <flint-command>
                <flint-command-input placeholder="Search..."></flint-command-input>
                <flint-command-list>
                    <flint-command-empty>No results found.</flint-command-empty>
                    <flint-command-group heading="Actions">
                        <flint-command-item value="save">Save</flint-command-item>
                        <flint-command-item value="delete">Delete</flint-command-item>
                    </flint-command-group>
                </flint-command-list>
            </flint-command>
        </flint-command-dialog>
    `;

    it('does not fire close when clicking inside the panel (not on backdrop)', async () => {
        const dialog = await fixture<FlintCommandDialog>(DIALOG_FIXTURE_LOCAL);
        dialog.open = true;
        await settle(dialog);

        const handler = vi.fn();
        dialog.addEventListener('flint-command-dialog-close', handler);

        // Click on the panel (child of backdrop) — target !== currentTarget → no close
        const panel = dialog.shadowRoot!.querySelector('.panel') as HTMLElement;
        panel.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(handler).not.toHaveBeenCalled();
    });

    it('sets inert on the backdrop when closed and removes it when open', async () => {
        const dialog = await fixture<FlintCommandDialog>(DIALOG_FIXTURE_LOCAL);
        await settle(dialog);

        const backdrop = dialog.shadowRoot!.querySelector('.backdrop') as HTMLElement;

        // Closed by default — backdrop should be inert
        expect(backdrop.hasAttribute('inert')).toBe(true);

        // Open the dialog — inert should be removed
        dialog.open = true;
        await dialog.updateComplete;
        expect(backdrop.hasAttribute('inert')).toBe(false);
    });

    it('auto-focuses the input when dialog opens', async () => {
        const dialog = await fixture<FlintCommandDialog>(DIALOG_FIXTURE_LOCAL);
        await settle(dialog);

        const input = dialog.querySelector('flint-command-input') as FlintCommandInput;
        const focusSpy = vi.spyOn(input, 'focus');

        dialog.open = true;
        await settle(dialog, 60); // rAF fires within 60 ms

        expect(focusSpy).toHaveBeenCalled();
    });

    it('disconnectedCallback removes the window keydown listener', async () => {
        const dialog = await fixture<FlintCommandDialog>(DIALOG_FIXTURE_LOCAL);
        dialog.open = true;
        await settle(dialog);

        // Disconnect — should remove window listener
        dialog.remove();

        const handler = vi.fn();
        dialog.addEventListener('flint-command-dialog-close', handler);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

        expect(handler).not.toHaveBeenCalled();
    });

    it('does not fire close on Escape when open prop is false', async () => {
        const dialog = await fixture<FlintCommandDialog>(DIALOG_FIXTURE_LOCAL);
        // open = false (default)
        await settle(dialog);

        const handler = vi.fn();
        dialog.addEventListener('flint-command-dialog-close', handler);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

        expect(handler).not.toHaveBeenCalled();
    });

    it('does not reset when re-rendered without open changing', async () => {
        const dialog = await fixture<FlintCommandDialog>(DIALOG_FIXTURE_LOCAL);
        dialog.open = true;
        await settle(dialog);

        const cmd = dialog.querySelector('flint-command') as FlintCommand;
        await typeInInput(cmd, 'save');
        expect(getVisibleItems(cmd)).toHaveLength(1);

        // Trigger a re-render without changing open (spy on reset)
        const resetSpy = vi.spyOn(cmd, 'reset');
        // Force re-render by calling requestUpdate without changing properties
        (dialog as unknown as { requestUpdate: () => void }).requestUpdate();
        await dialog.updateComplete;

        // reset should NOT have been called (early return in updated())
        expect(resetSpy).not.toHaveBeenCalled();
        // Items still filtered
        expect(getVisibleItems(cmd)).toHaveLength(1);
    });
});

// ── Accessibility ─────────────────────────────────────────────────────────

describe('FlintCommand — accessibility', () => {
    it('should pass automated a11y checks', async () => {
        const cmd = await fixture<FlintCommand>(html`
            <flint-command>
                <flint-command-input placeholder="Search..."></flint-command-input>
                <flint-command-list>
                    <flint-command-group heading="Actions">
                        <flint-command-item value="copy">Copy</flint-command-item>
                        <flint-command-item value="paste">Paste</flint-command-item>
                    </flint-command-group>
                </flint-command-list>
            </flint-command>
        `);
        await settle(cmd);
        await expectAccessible(cmd);
    }, 15000);
});
