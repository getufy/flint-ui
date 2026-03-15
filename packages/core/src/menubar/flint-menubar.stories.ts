import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-menubar.js';
import type { FlintMenubar, FlintMenubarContent, FlintMenubarTrigger, FlintMenubarCheckboxItem, FlintMenubarRadioGroup } from './flint-menubar.js';

const meta: Meta = {
    title: 'Navigation/Menubar',
    component: 'flint-menubar',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'aria-required-parent', enabled: false },
                    { id: 'aria-required-children', enabled: false },
                    { id: 'color-contrast', enabled: false },
                    { id: 'aria-valid-attr-value', enabled: false },
                    { id: 'aria-required-attr', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
#### \`<flint-menubar-shortcut>\`

Displays a keyboard shortcut hint inside a menu item.

- **Tag**: \`<flint-menubar-shortcut>\`
- **Class**: \`FlintMenubarShortcut\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Shortcut text, e.g. \`⌘T\` or \`Ctrl+N\`. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-text-color\` | — |
| \`--flint-font-family\` | — |
| \`--flint-border-color\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-primary-color\` | — |

---

#### \`<flint-menubar-separator>\`

A hairline separator between menu groups.

- **Tag**: \`<flint-menubar-separator>\`
- **Class**: \`FlintMenubarSeparator\`

---

#### \`<flint-menubar-group>\`

Groups related menu items. Optional \`heading\` shows a label.

- **Tag**: \`<flint-menubar-group>\`
- **Class**: \`FlintMenubarGroup\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`heading\` | \`heading\` | \`string\` | \`''\` | Label text displayed above the group. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

---

#### \`<flint-menubar-item>\`

A single interactive option inside a menubar dropdown.

- **Tag**: \`<flint-menubar-item>\`
- **Class**: \`FlintMenubarItem\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the item is non-interactive. |
| \`highlighted\` | \`highlighted\` | \`boolean\` | \`false\` | Whether the item is visually highlighted (e.g. via keyboard or hover). |
| \`inset\` | \`inset\` | \`boolean\` | \`false\` | Whether the item label is inset to align with checkbox/radio items. |
| \`value\` | \`value\` | \`string\` | \`''\` | Explicit value for the select event. Falls back to label text (excludes shortcut). |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-menubar-item-select\` | — | Fired on activation. detail: \`{ value: string }\` |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Item label text plus optional \`&lt;flint-menubar-shortcut&gt;\`. |

#### Methods

| Method | Description |
|---|---|
| \`select()\` | Activate the item — fires select event. |

---

#### \`<flint-menubar-checkbox-item>\`

A toggleable checkbox menu item.

- **Tag**: \`<flint-menubar-checkbox-item>\`
- **Class**: \`FlintMenubarCheckboxItem\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`checked\` | \`checked\` | \`boolean\` | \`false\` | Whether the checkbox item is currently checked. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the item is non-interactive. |
| \`highlighted\` | \`highlighted\` | \`boolean\` | \`false\` | Whether the item is visually highlighted (e.g. via keyboard or hover). |
| \`value\` | \`value\` | \`string\` | \`''\` | Explicit value for the change event. Falls back to label text (excludes shortcut). |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-menubar-checkbox-change\` | — | detail: \`{ checked: boolean, value: string }\` |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

#### Methods

| Method | Description |
|---|---|
| \`toggle()\` |  |

---

#### \`<flint-menubar-radio-item>\`

A radio option inside a \`<flint-menubar-radio-group>\`.

- **Tag**: \`<flint-menubar-radio-item>\`
- **Class**: \`FlintMenubarRadioItem\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Value identifying this radio option within its group. |
| \`checked\` | \`checked\` | \`boolean\` | \`false\` | Whether this radio item is currently selected. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the item is non-interactive. |
| \`highlighted\` | \`highlighted\` | \`boolean\` | \`false\` | Whether the item is visually highlighted (e.g. via keyboard or hover). |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-menubar-radio-select\` | \`{ value: this.value }\` |  |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

#### Methods

| Method | Description |
|---|---|
| \`select()\` |  |

---

#### \`<flint-menubar-radio-group>\`

Manages single-select radio items.

- **Tag**: \`<flint-menubar-radio-group>\`
- **Class**: \`FlintMenubarRadioGroup\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | The value of the currently selected radio item. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-menubar-radio-change\` | — | detail: \`{ value: string }\` |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

---

#### \`<flint-menubar-sub-content>\`

The dropdown panel of a sub-menu. Positioned to the right of the trigger. Auto-flips left when the panel would overflow the viewport edge.

- **Tag**: \`<flint-menubar-sub-content>\`
- **Class**: \`FlintMenubarSubContent\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`open\` | \`open\` | \`boolean\` | \`false\` | Whether the sub-menu dropdown panel is visible. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

---

#### \`<flint-menubar-sub-trigger>\`

Trigger for a sub-menu. Shows an arrow indicator.

- **Tag**: \`<flint-menubar-sub-trigger>\`
- **Class**: \`FlintMenubarSubTrigger\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`highlighted\` | \`highlighted\` | \`boolean\` | \`false\` | Whether the trigger is visually highlighted (e.g. via keyboard or hover). |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the trigger is non-interactive. |
| \`inset\` | \`inset\` | \`boolean\` | \`false\` | Whether the trigger label is inset to align with checkbox/radio items. |
| \`expanded\` | \`expanded\` | \`boolean\` | \`false\` | Set by the parent \`flint-menubar-sub\` to reflect open state for aria-expanded. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

---

#### \`<flint-menubar-sub>\`

Wraps a sub-trigger and sub-content pair. Opens on hover/focus and ArrowRight; closes on ArrowLeft or blur.

- **Tag**: \`<flint-menubar-sub>\`
- **Class**: \`FlintMenubarSub\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

#### Methods

| Method | Description |
|---|---|
| \`open(): unknown\` |  |
| \`show()\` |  |
| \`showImmediate()\` | Opens the sub-menu immediately without the hover delay. Use for keyboard interactions. |
| \`hide()\` |  |
| \`hideImmediate()\` |  |

---

#### \`<flint-menubar-content>\`

The dropdown content panel for a menubar menu. Positioned absolutely below the trigger.

- **Tag**: \`<flint-menubar-content>\`
- **Class**: \`FlintMenubarContent\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`open\` | \`open\` | \`boolean\` | \`false\` | Whether the content dropdown panel is visible. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-menubar-request-close\` | \`{ open: false }\` |  |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-menubar-content-bg\` | \`var(--flint-surface-1\` |

#### Methods

| Method | Description |
|---|---|
| \`resetHighlight()\` |  |

---

#### \`<flint-menubar-trigger>\`

The trigger button for a menubar menu.

- **Tag**: \`<flint-menubar-trigger>\`
- **Class**: \`FlintMenubarTrigger\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`active\` | \`active\` | \`boolean\` | \`false\` | Whether the trigger's associated menu is currently open. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the trigger is non-interactive. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Trigger label text. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-menubar-trigger-hover-bg\` | \`var(--flint-hover-color\` |

#### Methods

| Method | Description |
|---|---|
| \`setFocusable(v: boolean)\` |  |

---

#### \`<flint-menubar-menu>\`

Wraps a trigger and content pair for a single menu in the menubar.

- **Tag**: \`<flint-menubar-menu>\`
- **Class**: \`FlintMenubarMenu\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables this menu: the trigger is non-interactive and keyboard nav skips it. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

#### Methods

| Method | Description |
|---|---|
| \`trigger(): FlintMenubarTrigger \\| null\` |  |
| \`content(): FlintMenubarContent \\| null\` |  |
| \`open()\` |  |
| \`close()\` |  |
| \`isOpen(): boolean\` |  |

---

#### \`<flint-menubar>\`

A visually persistent horizontal menu bar, common in desktop applications. Hosts one or more \`<flint-menubar-menu>\` children.

- **Tag**: \`<flint-menubar>\`
- **Class**: \`FlintMenubar\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`label\` | \`label\` | \`string\` | \`''\` | Which menu (by index) is currently open. -1 = all closed. */ private _activeIndex = -1; /** Accessible label for the menubar region. Defaults to "Menu bar". |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-menubar-item-select\` | — | Bubbles from items. |
| \`flint-menubar-checkbox-change\` | — | Bubbles from checkbox items. |
| \`flint-menubar-radio-change\` | — | Bubbles from radio groups. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | One or more \`&lt;flint-menubar-menu&gt;\` elements. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-menubar-highlight-bg\` | \`var(--flint-hover-color\` |
| \`--flint-menubar-content-bg\` | \`var(--flint-surface-1\` |
| \`--flint-menubar-trigger-hover-bg\` | \`var(--flint-hover-color\` |
| \`--flint-menubar-bg\` | \`var(--flint-surface-1\` |

#### Methods

| Method | Description |
|---|---|
| \`activeIndex(): number\` | Index of the currently open menu, or -1 if all closed. |
| \`closeAll()\` | Close all menus. |
                `,
            },
        },
    },
};

export default meta;
type Story = StoryObj;

/* ─────────────────────────────────────────────────────────────────── */
/*  Story wrapper                                                      */
/* ─────────────────────────────────────────────────────────────────── */

const wrap = (content: unknown) => html`
    <div style="
        padding: 48px 32px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-family: system-ui, sans-serif;
        min-height: 280px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    ">${content}</div>
`;

/* ─────────────────────────────────────────────────────────────────── */
/*  Helpers                                                            */
/* ─────────────────────────────────────────────────────────────────── */

function getMenubar(canvas: HTMLElement): FlintMenubar {
    return canvas.querySelector('flint-menubar')!;
}

function getTriggers(canvas: HTMLElement): FlintMenubarTrigger[] {
    return Array.from(canvas.querySelectorAll('flint-menubar-trigger'));
}

function getTriggerButton(trigger: FlintMenubarTrigger): HTMLButtonElement {
    return trigger.shadowRoot!.querySelector('button')!;
}

function getContent(canvas: HTMLElement, index: number): FlintMenubarContent {
    return canvas.querySelectorAll('flint-menubar-content')[index] as FlintMenubarContent;
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Default / Full Demo                                                */
/* ─────────────────────────────────────────────────────────────────── */

export const Default: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-group>
                        <flint-menubar-item>New Tab <flint-menubar-shortcut>⌘T</flint-menubar-shortcut></flint-menubar-item>
                        <flint-menubar-item>New Window <flint-menubar-shortcut>⌘N</flint-menubar-shortcut></flint-menubar-item>
                        <flint-menubar-item disabled>New Incognito Window</flint-menubar-item>
                    </flint-menubar-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-group>
                        <flint-menubar-sub>
                            <flint-menubar-sub-trigger>Share</flint-menubar-sub-trigger>
                            <flint-menubar-sub-content>
                                <flint-menubar-group>
                                    <flint-menubar-item>Email link</flint-menubar-item>
                                    <flint-menubar-item>Messages</flint-menubar-item>
                                    <flint-menubar-item>Notes</flint-menubar-item>
                                </flint-menubar-group>
                            </flint-menubar-sub-content>
                        </flint-menubar-sub>
                    </flint-menubar-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-group>
                        <flint-menubar-item>Print... <flint-menubar-shortcut>⌘P</flint-menubar-shortcut></flint-menubar-item>
                    </flint-menubar-group>
                </flint-menubar-content>
            </flint-menubar-menu>

            <flint-menubar-menu>
                <flint-menubar-trigger>Edit</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-group>
                        <flint-menubar-item>Undo <flint-menubar-shortcut>⌘Z</flint-menubar-shortcut></flint-menubar-item>
                        <flint-menubar-item>Redo <flint-menubar-shortcut>⇧⌘Z</flint-menubar-shortcut></flint-menubar-item>
                    </flint-menubar-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-group>
                        <flint-menubar-sub>
                            <flint-menubar-sub-trigger>Find</flint-menubar-sub-trigger>
                            <flint-menubar-sub-content>
                                <flint-menubar-group>
                                    <flint-menubar-item>Search the web</flint-menubar-item>
                                </flint-menubar-group>
                                <flint-menubar-separator></flint-menubar-separator>
                                <flint-menubar-group>
                                    <flint-menubar-item>Find...</flint-menubar-item>
                                    <flint-menubar-item>Find Next</flint-menubar-item>
                                    <flint-menubar-item>Find Previous</flint-menubar-item>
                                </flint-menubar-group>
                            </flint-menubar-sub-content>
                        </flint-menubar-sub>
                    </flint-menubar-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-group>
                        <flint-menubar-item>Cut</flint-menubar-item>
                        <flint-menubar-item>Copy</flint-menubar-item>
                        <flint-menubar-item>Paste</flint-menubar-item>
                    </flint-menubar-group>
                </flint-menubar-content>
            </flint-menubar-menu>

            <flint-menubar-menu>
                <flint-menubar-trigger>View</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-group>
                        <flint-menubar-checkbox-item>Bookmarks Bar</flint-menubar-checkbox-item>
                        <flint-menubar-checkbox-item checked>Full URLs</flint-menubar-checkbox-item>
                    </flint-menubar-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-group>
                        <flint-menubar-item inset>Reload <flint-menubar-shortcut>⌘R</flint-menubar-shortcut></flint-menubar-item>
                        <flint-menubar-item disabled inset>Force Reload <flint-menubar-shortcut>⇧⌘R</flint-menubar-shortcut></flint-menubar-item>
                    </flint-menubar-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-group>
                        <flint-menubar-item inset>Toggle Fullscreen</flint-menubar-item>
                    </flint-menubar-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-group>
                        <flint-menubar-item inset>Hide Sidebar</flint-menubar-item>
                    </flint-menubar-group>
                </flint-menubar-content>
            </flint-menubar-menu>

            <flint-menubar-menu>
                <flint-menubar-trigger>Profiles</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-radio-group value="benoit">
                        <flint-menubar-radio-item value="andy">Andy</flint-menubar-radio-item>
                        <flint-menubar-radio-item value="benoit">Benoit</flint-menubar-radio-item>
                        <flint-menubar-radio-item value="luis">Luis</flint-menubar-radio-item>
                    </flint-menubar-radio-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-group>
                        <flint-menubar-item inset>Edit...</flint-menubar-item>
                    </flint-menubar-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-group>
                        <flint-menubar-item inset>Add Profile...</flint-menubar-item>
                    </flint-menubar-group>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
    play: async ({ canvasElement }) => {
        const triggers = getTriggers(canvasElement);
        expect(triggers).toHaveLength(4);
        expect(triggers[0].textContent?.trim()).toBe('File');
        expect(triggers[1].textContent?.trim()).toBe('Edit');
        expect(triggers[2].textContent?.trim()).toBe('View');
        expect(triggers[3].textContent?.trim()).toBe('Profiles');
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Simple — Minimal menubar                                           */
/* ─────────────────────────────────────────────────────────────────── */

export const Simple: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-group>
                        <flint-menubar-item>New Tab <flint-menubar-shortcut>⌘T</flint-menubar-shortcut></flint-menubar-item>
                        <flint-menubar-item>New Window</flint-menubar-item>
                    </flint-menubar-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-group>
                        <flint-menubar-item>Share</flint-menubar-item>
                        <flint-menubar-item>Print</flint-menubar-item>
                    </flint-menubar-group>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Checkbox Items                                                     */
/* ─────────────────────────────────────────────────────────────────── */

export const CheckboxItems: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>View</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-checkbox-item>Always Show Bookmarks Bar</flint-menubar-checkbox-item>
                    <flint-menubar-checkbox-item checked>Always Show Full URLs</flint-menubar-checkbox-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item inset>Reload <flint-menubar-shortcut>⌘R</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item disabled inset>Force Reload <flint-menubar-shortcut>⇧⌘R</flint-menubar-shortcut></flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>Format</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-checkbox-item checked>Strikethrough</flint-menubar-checkbox-item>
                    <flint-menubar-checkbox-item>Code</flint-menubar-checkbox-item>
                    <flint-menubar-checkbox-item>Superscript</flint-menubar-checkbox-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
    play: async ({ canvasElement }) => {
        const triggers = getTriggers(canvasElement);
        await userEvent.click(getTriggerButton(triggers[0]));
        await waitFor(() => {
            expect(getContent(canvasElement, 0).open).toBe(true);
        });
        // Verify initial checked state
        const checkboxItems = canvasElement.querySelectorAll('flint-menubar-checkbox-item');
        expect((checkboxItems[0] as FlintMenubarCheckboxItem).checked).toBe(false);
        expect((checkboxItems[1] as FlintMenubarCheckboxItem).checked).toBe(true);
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Radio Items                                                        */
/* ─────────────────────────────────────────────────────────────────── */

export const RadioItems: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>Profiles</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-radio-group value="benoit">
                        <flint-menubar-radio-item value="andy">Andy</flint-menubar-radio-item>
                        <flint-menubar-radio-item value="benoit">Benoit</flint-menubar-radio-item>
                        <flint-menubar-radio-item value="luis">Luis</flint-menubar-radio-item>
                    </flint-menubar-radio-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item inset>Edit...</flint-menubar-item>
                    <flint-menubar-item inset>Add Profile...</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>Theme</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-radio-group value="system">
                        <flint-menubar-radio-item value="light">Light</flint-menubar-radio-item>
                        <flint-menubar-radio-item value="dark">Dark</flint-menubar-radio-item>
                        <flint-menubar-radio-item value="system">System</flint-menubar-radio-item>
                    </flint-menubar-radio-group>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
    play: async ({ canvasElement }) => {
        const triggers = getTriggers(canvasElement);
        await userEvent.click(getTriggerButton(triggers[0]));
        await waitFor(() => {
            expect(getContent(canvasElement, 0).open).toBe(true);
        });
        // Verify initial radio state
        const radioGroup = canvasElement.querySelector('flint-menubar-radio-group') as FlintMenubarRadioGroup;
        expect(radioGroup.value).toBe('benoit');
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Submenu                                                            */
/* ─────────────────────────────────────────────────────────────────── */

export const Submenu: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-sub>
                        <flint-menubar-sub-trigger>Share</flint-menubar-sub-trigger>
                        <flint-menubar-sub-content>
                            <flint-menubar-item>Email link</flint-menubar-item>
                            <flint-menubar-item>Messages</flint-menubar-item>
                            <flint-menubar-item>Notes</flint-menubar-item>
                        </flint-menubar-sub-content>
                    </flint-menubar-sub>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item>Print... <flint-menubar-shortcut>⌘P</flint-menubar-shortcut></flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>Edit</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Undo <flint-menubar-shortcut>⌘Z</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Redo <flint-menubar-shortcut>⇧⌘Z</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-sub>
                        <flint-menubar-sub-trigger>Find</flint-menubar-sub-trigger>
                        <flint-menubar-sub-content>
                            <flint-menubar-item>Find...</flint-menubar-item>
                            <flint-menubar-item>Find Next</flint-menubar-item>
                            <flint-menubar-item>Find Previous</flint-menubar-item>
                        </flint-menubar-sub-content>
                    </flint-menubar-sub>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item>Cut</flint-menubar-item>
                    <flint-menubar-item>Copy</flint-menubar-item>
                    <flint-menubar-item>Paste</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Disabled Items                                                     */
/* ─────────────────────────────────────────────────────────────────── */

export const DisabledItems: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>New Tab</flint-menubar-item>
                    <flint-menubar-item disabled>New Window (disabled)</flint-menubar-item>
                    <flint-menubar-item disabled>Open Recent (disabled)</flint-menubar-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item>Print</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Groups with Headings                                               */
/* ─────────────────────────────────────────────────────────────────── */

export const GroupsWithHeadings: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>Actions</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-group heading="Document">
                        <flint-menubar-item>New File</flint-menubar-item>
                        <flint-menubar-item>Open File</flint-menubar-item>
                        <flint-menubar-item>Save</flint-menubar-item>
                    </flint-menubar-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-group heading="Edit">
                        <flint-menubar-item>Cut</flint-menubar-item>
                        <flint-menubar-item>Copy</flint-menubar-item>
                        <flint-menubar-item>Paste</flint-menubar-item>
                    </flint-menubar-group>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Inset Items                                                        */
/* ─────────────────────────────────────────────────────────────────── */

export const InsetItems: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>View</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-checkbox-item checked>Show Toolbar</flint-menubar-checkbox-item>
                    <flint-menubar-checkbox-item>Show Statusbar</flint-menubar-checkbox-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item inset>Zoom In <flint-menubar-shortcut>⌘+</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item inset>Zoom Out <flint-menubar-shortcut>⌘-</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item inset>Reset Zoom <flint-menubar-shortcut>⌘0</flint-menubar-shortcut></flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Multiple Menus — IDE-style                                         */
/* ─────────────────────────────────────────────────────────────────── */

export const IDEMenubar: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>New File <flint-menubar-shortcut>⌘N</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>New Window <flint-menubar-shortcut>⇧⌘N</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item>Open... <flint-menubar-shortcut>⌘O</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Open Folder...</flint-menubar-item>
                    <flint-menubar-sub>
                        <flint-menubar-sub-trigger>Open Recent</flint-menubar-sub-trigger>
                        <flint-menubar-sub-content>
                            <flint-menubar-item>~/projects/alpha</flint-menubar-item>
                            <flint-menubar-item>~/projects/beta</flint-menubar-item>
                            <flint-menubar-item>~/projects/gamma</flint-menubar-item>
                            <flint-menubar-separator></flint-menubar-separator>
                            <flint-menubar-item>Clear Recently Opened</flint-menubar-item>
                        </flint-menubar-sub-content>
                    </flint-menubar-sub>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item>Save <flint-menubar-shortcut>⌘S</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Save As... <flint-menubar-shortcut>⇧⌘S</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Save All</flint-menubar-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item>Close Editor <flint-menubar-shortcut>⌘W</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Close Window <flint-menubar-shortcut>⇧⌘W</flint-menubar-shortcut></flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>

            <flint-menubar-menu>
                <flint-menubar-trigger>Edit</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Undo <flint-menubar-shortcut>⌘Z</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Redo <flint-menubar-shortcut>⇧⌘Z</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item>Cut <flint-menubar-shortcut>⌘X</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Copy <flint-menubar-shortcut>⌘C</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Paste <flint-menubar-shortcut>⌘V</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-sub>
                        <flint-menubar-sub-trigger>Find</flint-menubar-sub-trigger>
                        <flint-menubar-sub-content>
                            <flint-menubar-item>Find <flint-menubar-shortcut>⌘F</flint-menubar-shortcut></flint-menubar-item>
                            <flint-menubar-item>Find Next <flint-menubar-shortcut>⌘G</flint-menubar-shortcut></flint-menubar-item>
                            <flint-menubar-item>Find Previous <flint-menubar-shortcut>⇧⌘G</flint-menubar-shortcut></flint-menubar-item>
                            <flint-menubar-separator></flint-menubar-separator>
                            <flint-menubar-item>Replace <flint-menubar-shortcut>⌥⌘F</flint-menubar-shortcut></flint-menubar-item>
                        </flint-menubar-sub-content>
                    </flint-menubar-sub>
                </flint-menubar-content>
            </flint-menubar-menu>

            <flint-menubar-menu>
                <flint-menubar-trigger>Selection</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Select All <flint-menubar-shortcut>⌘A</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Expand Selection <flint-menubar-shortcut>⇧⌘→</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Shrink Selection <flint-menubar-shortcut>⇧⌘←</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item>Copy Line Up <flint-menubar-shortcut>⌥⇧↑</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Copy Line Down <flint-menubar-shortcut>⌥⇧↓</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Move Line Up <flint-menubar-shortcut>⌥↑</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Move Line Down <flint-menubar-shortcut>⌥↓</flint-menubar-shortcut></flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>

            <flint-menubar-menu>
                <flint-menubar-trigger>View</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-checkbox-item checked>Command Palette</flint-menubar-checkbox-item>
                    <flint-menubar-checkbox-item>Open View...</flint-menubar-checkbox-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-sub>
                        <flint-menubar-sub-trigger>Appearance</flint-menubar-sub-trigger>
                        <flint-menubar-sub-content>
                            <flint-menubar-checkbox-item checked>Activity Bar</flint-menubar-checkbox-item>
                            <flint-menubar-checkbox-item checked>Status Bar</flint-menubar-checkbox-item>
                            <flint-menubar-checkbox-item>Side Bar</flint-menubar-checkbox-item>
                            <flint-menubar-checkbox-item>Panel</flint-menubar-checkbox-item>
                        </flint-menubar-sub-content>
                    </flint-menubar-sub>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item inset>Zoom In <flint-menubar-shortcut>⌘=</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item inset>Zoom Out <flint-menubar-shortcut>⌘-</flint-menubar-shortcut></flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>

            <flint-menubar-menu>
                <flint-menubar-trigger>Help</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Welcome</flint-menubar-item>
                    <flint-menubar-item>Documentation</flint-menubar-item>
                    <flint-menubar-item>Release Notes</flint-menubar-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item>Report Issue</flint-menubar-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item>About</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Click to Open / Toggle                                             */
/* ─────────────────────────────────────────────────────────────────── */

export const ClickToOpen: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>New</flint-menubar-item>
                    <flint-menubar-item>Open</flint-menubar-item>
                    <flint-menubar-item>Save</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>Edit</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Undo</flint-menubar-item>
                    <flint-menubar-item>Redo</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
    play: async ({ canvasElement }) => {
        const triggers = getTriggers(canvasElement);

        // Click File trigger — opens File menu
        await userEvent.click(getTriggerButton(triggers[0]));
        await waitFor(() => {
            expect(getContent(canvasElement, 0).open).toBe(true);
            expect(getContent(canvasElement, 1).open).toBe(false);
        });

        // Click File trigger again — toggles it closed
        await userEvent.click(getTriggerButton(triggers[0]));
        await waitFor(() => {
            expect(getContent(canvasElement, 0).open).toBe(false);
        });

        // Click Edit trigger — opens Edit
        await userEvent.click(getTriggerButton(triggers[1]));
        await waitFor(() => {
            expect(getContent(canvasElement, 1).open).toBe(true);
            expect(getContent(canvasElement, 0).open).toBe(false);
        });

        // Cleanup
        getMenubar(canvasElement).closeAll();
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Hover Switching                                                    */
/* ─────────────────────────────────────────────────────────────────── */

export const HoverSwitching: Story = {
    render: () => wrap(html`
        <p style="margin-bottom: 16px; color: #475569; font-size: 0.875rem;">
            Click File to open, then hover over Edit to switch menus.
        </p>
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>New</flint-menubar-item>
                    <flint-menubar-item>Save</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>Edit</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Undo</flint-menubar-item>
                    <flint-menubar-item>Redo</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>View</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Zoom In</flint-menubar-item>
                    <flint-menubar-item>Zoom Out</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Keyboard Navigation                                                */
/* ─────────────────────────────────────────────────────────────────── */

export const KeyboardNavigation: Story = {
    render: () => wrap(html`
        <p style="margin-bottom: 16px; color: #475569; font-size: 0.875rem;">
            Click File, then use ← → to switch menus and ↑ ↓ to navigate items.
        </p>
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>New Tab</flint-menubar-item>
                    <flint-menubar-item>New Window</flint-menubar-item>
                    <flint-menubar-item>Print</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>Edit</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Undo</flint-menubar-item>
                    <flint-menubar-item>Redo</flint-menubar-item>
                    <flint-menubar-item>Cut</flint-menubar-item>
                    <flint-menubar-item>Copy</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
    play: async ({ canvasElement }) => {
        const triggers = getTriggers(canvasElement);
        const bar = getMenubar(canvasElement);

        // Open File
        await userEvent.click(getTriggerButton(triggers[0]));
        await waitFor(() => {
            expect(getContent(canvasElement, 0).open).toBe(true);
        });

        // Arrow Right → switches to Edit
        await userEvent.keyboard('{ArrowRight}');
        await waitFor(() => {
            expect(getContent(canvasElement, 0).open).toBe(false);
            expect(getContent(canvasElement, 1).open).toBe(true);
        });

        // Arrow Left → back to File
        await userEvent.keyboard('{ArrowLeft}');
        await waitFor(() => {
            expect(getContent(canvasElement, 0).open).toBe(true);
            expect(getContent(canvasElement, 1).open).toBe(false);
        });

        // Escape → close
        await userEvent.keyboard('{Escape}');
        await waitFor(() => {
            expect(getContent(canvasElement, 0).open).toBe(false);
        });

        bar.closeAll();
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Single Menu                                                        */
/* ─────────────────────────────────────────────────────────────────── */

export const SingleMenu: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>Options</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-checkbox-item checked>Auto-save</flint-menubar-checkbox-item>
                    <flint-menubar-checkbox-item>Spell Check</flint-menubar-checkbox-item>
                    <flint-menubar-checkbox-item checked>Line Numbers</flint-menubar-checkbox-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-radio-group value="2">
                        <flint-menubar-radio-item value="2">2 Spaces</flint-menubar-radio-item>
                        <flint-menubar-radio-item value="4">4 Spaces</flint-menubar-radio-item>
                        <flint-menubar-radio-item value="tab">Tab</flint-menubar-radio-item>
                    </flint-menubar-radio-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item inset>Preferences...</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Many Menus                                                         */
/* ─────────────────────────────────────────────────────────────────── */

export const ManyMenus: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>New</flint-menubar-item>
                    <flint-menubar-item>Open</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>Edit</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Undo</flint-menubar-item>
                    <flint-menubar-item>Redo</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>View</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Zoom In</flint-menubar-item>
                    <flint-menubar-item>Zoom Out</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>Go</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Back</flint-menubar-item>
                    <flint-menubar-item>Forward</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>Run</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Start Debugging</flint-menubar-item>
                    <flint-menubar-item>Run Without Debugging</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>Terminal</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>New Terminal</flint-menubar-item>
                    <flint-menubar-item>Split Terminal</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>Help</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>About</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Nested Submenus                                                    */
/* ─────────────────────────────────────────────────────────────────── */

export const NestedSubmenus: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>Transform</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-sub>
                        <flint-menubar-sub-trigger>Text</flint-menubar-sub-trigger>
                        <flint-menubar-sub-content>
                            <flint-menubar-item>Uppercase</flint-menubar-item>
                            <flint-menubar-item>Lowercase</flint-menubar-item>
                            <flint-menubar-item>Title Case</flint-menubar-item>
                            <flint-menubar-separator></flint-menubar-separator>
                            <flint-menubar-sub>
                                <flint-menubar-sub-trigger>Encoding</flint-menubar-sub-trigger>
                                <flint-menubar-sub-content>
                                    <flint-menubar-item>UTF-8</flint-menubar-item>
                                    <flint-menubar-item>ASCII</flint-menubar-item>
                                    <flint-menubar-item>ISO-8859-1</flint-menubar-item>
                                </flint-menubar-sub-content>
                            </flint-menubar-sub>
                        </flint-menubar-sub-content>
                    </flint-menubar-sub>
                    <flint-menubar-sub>
                        <flint-menubar-sub-trigger>Sort</flint-menubar-sub-trigger>
                        <flint-menubar-sub-content>
                            <flint-menubar-item>Sort Lines Ascending</flint-menubar-item>
                            <flint-menubar-item>Sort Lines Descending</flint-menubar-item>
                        </flint-menubar-sub-content>
                    </flint-menubar-sub>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item>Trim Trailing Whitespace</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Mixed: Checkbox + Radio + Items                                    */
/* ─────────────────────────────────────────────────────────────────── */

export const MixedContent: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>Settings</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-group heading="Preferences">
                        <flint-menubar-checkbox-item checked>Auto-save</flint-menubar-checkbox-item>
                        <flint-menubar-checkbox-item>Word Wrap</flint-menubar-checkbox-item>
                        <flint-menubar-checkbox-item checked>Minimap</flint-menubar-checkbox-item>
                    </flint-menubar-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-group heading="Theme">
                        <flint-menubar-radio-group value="dark">
                            <flint-menubar-radio-item value="light">Light</flint-menubar-radio-item>
                            <flint-menubar-radio-item value="dark">Dark</flint-menubar-radio-item>
                            <flint-menubar-radio-item value="high-contrast">High Contrast</flint-menubar-radio-item>
                        </flint-menubar-radio-group>
                    </flint-menubar-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-group heading="Font Size">
                        <flint-menubar-radio-group value="14">
                            <flint-menubar-radio-item value="12">12px</flint-menubar-radio-item>
                            <flint-menubar-radio-item value="14">14px</flint-menubar-radio-item>
                            <flint-menubar-radio-item value="16">16px</flint-menubar-radio-item>
                        </flint-menubar-radio-group>
                    </flint-menubar-group>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item inset>Open Settings... <flint-menubar-shortcut>⌘,</flint-menubar-shortcut></flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Empty Menu                                                         */
/* ─────────────────────────────────────────────────────────────────── */

export const EmptyMenu: Story = {
    render: () => wrap(html`
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>New</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>Empty</flint-menubar-trigger>
                <flint-menubar-content>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Custom Label (aria-label)                                          */
/* ─────────────────────────────────────────────────────────────────── */

export const CustomLabel: Story = {
    render: () => wrap(html`
        <p style="margin-bottom: 16px; color: #475569; font-size: 0.875rem;">
            This menubar has <code>label="Application Menu"</code> — inspect the
            <code>role="menubar"</code> div to see the custom <code>aria-label</code>.
        </p>
        <flint-menubar label="Application Menu">
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>New</flint-menubar-item>
                    <flint-menubar-item>Open</flint-menubar-item>
                    <flint-menubar-item>Save <flint-menubar-shortcut>⌘S</flint-menubar-shortcut></flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>Edit</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Undo <flint-menubar-shortcut>⌘Z</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Redo <flint-menubar-shortcut>⇧⌘Z</flint-menubar-shortcut></flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
    play: async ({ canvasElement }) => {
        const bar = canvasElement.querySelector('flint-menubar') as FlintMenubar;
        const div = bar.shadowRoot!.querySelector('[role="menubar"]')!;
        expect(div.getAttribute('aria-label')).toBe('Application Menu');
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Disabled Menu                                                      */
/* ─────────────────────────────────────────────────────────────────── */

export const DisabledMenu: Story = {
    render: () => wrap(html`
        <p style="margin-bottom: 16px; color: #475569; font-size: 0.875rem;">
            The <strong>Edit</strong> menu is disabled. Keyboard navigation skips it.
        </p>
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>New <flint-menubar-shortcut>⌘N</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Open <flint-menubar-shortcut>⌘O</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Save <flint-menubar-shortcut>⌘S</flint-menubar-shortcut></flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu disabled>
                <flint-menubar-trigger>Edit</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Undo</flint-menubar-item>
                    <flint-menubar-item>Redo</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>View</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>Zoom In <flint-menubar-shortcut>⌘+</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Zoom Out <flint-menubar-shortcut>⌘-</flint-menubar-shortcut></flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
    play: async ({ canvasElement }) => {
        const triggers = getTriggers(canvasElement);
        // Edit trigger should be disabled
        expect(getTriggerButton(triggers[1]).disabled).toBe(true);
        // File and View triggers should be enabled
        expect(getTriggerButton(triggers[0]).disabled).toBe(false);
        expect(getTriggerButton(triggers[2]).disabled).toBe(false);
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Typeahead Jump                                                     */
/* ─────────────────────────────────────────────────────────────────── */

export const TypeaheadJump: Story = {
    render: () => wrap(html`
        <p style="margin-bottom: 16px; color: #475569; font-size: 0.875rem;">
            Open the File menu, then press <kbd>P</kbd> to jump to <strong>Print</strong>
            or <kbd>N</kbd> to jump to <strong>New Tab</strong>.
        </p>
        <flint-menubar>
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>New Tab <flint-menubar-shortcut>⌘T</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>New Window <flint-menubar-shortcut>⌘N</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item disabled>New Incognito Window</flint-menubar-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-item>Print... <flint-menubar-shortcut>⌘P</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item>Save Page As...</flint-menubar-item>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
    play: async ({ canvasElement }) => {
        const triggers = getTriggers(canvasElement);
        const content = getContent(canvasElement, 0);

        // Open File menu
        await userEvent.click(getTriggerButton(triggers[0]));
        await waitFor(() => { expect(content.open).toBe(true); });

        // Press 'p' — should jump to 'Print...'
        await userEvent.keyboard('p');
        await waitFor(() => {
            const items = Array.from(canvasElement.querySelectorAll<HTMLElement & { highlighted: boolean }>('flint-menubar-item'));
            const highlighted = items.find(i => i.highlighted);
            expect(highlighted?.textContent?.trim().toLowerCase()).toMatch(/^p/);
        });

        getMenubar(canvasElement).closeAll();
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Accessibility Demo                                                 */
/* ─────────────────────────────────────────────────────────────────── */

export const AccessibilityDemo: Story = {
    render: () => wrap(html`
        <p style="margin-bottom: 16px; color: #475569; font-size: 0.875rem;">
            ARIA roles and attributes: <code>role="menubar"</code>,
            <code>role="menuitem"</code>, <code>aria-haspopup</code>,
            <code>aria-expanded</code>, <code>aria-checked</code>,
            <code>aria-disabled</code>.
        </p>
        <flint-menubar label="Demo Application">
            <flint-menubar-menu>
                <flint-menubar-trigger>File</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-item>New <flint-menubar-shortcut>⌘N</flint-menubar-shortcut></flint-menubar-item>
                    <flint-menubar-item disabled>Save (disabled)</flint-menubar-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-sub>
                        <flint-menubar-sub-trigger>Share</flint-menubar-sub-trigger>
                        <flint-menubar-sub-content>
                            <flint-menubar-item>Email</flint-menubar-item>
                            <flint-menubar-item>Messages</flint-menubar-item>
                        </flint-menubar-sub-content>
                    </flint-menubar-sub>
                </flint-menubar-content>
            </flint-menubar-menu>
            <flint-menubar-menu>
                <flint-menubar-trigger>View</flint-menubar-trigger>
                <flint-menubar-content>
                    <flint-menubar-checkbox-item checked>Show Toolbar</flint-menubar-checkbox-item>
                    <flint-menubar-checkbox-item>Show Statusbar</flint-menubar-checkbox-item>
                    <flint-menubar-separator></flint-menubar-separator>
                    <flint-menubar-radio-group value="dark">
                        <flint-menubar-radio-item value="light">Light</flint-menubar-radio-item>
                        <flint-menubar-radio-item value="dark">Dark</flint-menubar-radio-item>
                    </flint-menubar-radio-group>
                </flint-menubar-content>
            </flint-menubar-menu>
        </flint-menubar>
    `),
    play: async ({ canvasElement }) => {
        const bar = canvasElement.querySelector('flint-menubar') as FlintMenubar;
        const menubarDiv = bar.shadowRoot!.querySelector('[role="menubar"]')!;

        // Verify aria-label
        expect(menubarDiv.getAttribute('aria-label')).toBe('Demo Application');

        // Verify triggers have correct ARIA
        const triggers = getTriggers(canvasElement);
        const btn0 = getTriggerButton(triggers[0]);
        expect(btn0.getAttribute('role')).toBe('menuitem');
        expect(btn0.getAttribute('aria-haspopup')).toBe('true');
        expect(btn0.getAttribute('aria-expanded')).toBe('false');

        // Open File menu and verify aria-expanded updates
        await userEvent.click(btn0);
        await waitFor(() => {
            expect(getContent(canvasElement, 0).open).toBe(true);
        });
        await triggers[0].updateComplete;
        expect(getTriggerButton(triggers[0]).getAttribute('aria-expanded')).toBe('true');

        // Verify disabled item has aria-disabled
        const disabledItem = canvasElement.querySelector('flint-menubar-item[disabled]') as HTMLElement;
        const disabledDiv = disabledItem.shadowRoot!.querySelector('.item')!;
        expect(disabledDiv.getAttribute('aria-disabled')).toBe('true');

        bar.closeAll();
    },
};
