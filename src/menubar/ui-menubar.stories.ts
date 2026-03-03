import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './ui-menubar.js';
import type { UiMenubar, UiMenubarContent, UiMenubarTrigger, UiMenubarCheckboxItem, UiMenubarRadioGroup } from './ui-menubar.js';

const meta: Meta = {
    title: 'Navigation/Menubar',
    component: 'ui-menubar',
    parameters: {
        docs: {
            description: {
                component: `
A visually persistent menu bar common in desktop applications, built natively with LitElement.

**Components:**
- \`ui-menubar\` — Root horizontal bar; manages open state and keyboard nav
- \`ui-menubar-menu\` — Wraps a trigger + content pair
- \`ui-menubar-trigger\` — Button that opens its menu
- \`ui-menubar-content\` — Dropdown panel
- \`ui-menubar-item\` — Interactive menu option
- \`ui-menubar-group\` — Group of related items
- \`ui-menubar-separator\` — Visual divider
- \`ui-menubar-shortcut\` — Keyboard shortcut hint
- \`ui-menubar-checkbox-item\` — Toggleable checkbox option
- \`ui-menubar-radio-group\` — Single-select radio group
- \`ui-menubar-radio-item\` — Radio option
- \`ui-menubar-sub\` — Sub-menu wrapper
- \`ui-menubar-sub-trigger\` — Opens a nested menu
- \`ui-menubar-sub-content\` — Sub-menu dropdown

**Keyboard:** Left/Right arrows navigate menus. Up/Down arrows navigate items. Enter/Space activates. Escape closes.
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

function getMenubar(canvas: HTMLElement): UiMenubar {
    return canvas.querySelector('ui-menubar')!;
}

function getTriggers(canvas: HTMLElement): UiMenubarTrigger[] {
    return Array.from(canvas.querySelectorAll('ui-menubar-trigger'));
}

function getTriggerButton(trigger: UiMenubarTrigger): HTMLButtonElement {
    return trigger.shadowRoot!.querySelector('button')!;
}

function getContent(canvas: HTMLElement, index: number): UiMenubarContent {
    return canvas.querySelectorAll('ui-menubar-content')[index] as UiMenubarContent;
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Default / Full Demo                                                */
/* ─────────────────────────────────────────────────────────────────── */

export const Default: Story = {
    render: () => wrap(html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>File</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-group>
                        <ui-menubar-item>New Tab <ui-menubar-shortcut>⌘T</ui-menubar-shortcut></ui-menubar-item>
                        <ui-menubar-item>New Window <ui-menubar-shortcut>⌘N</ui-menubar-shortcut></ui-menubar-item>
                        <ui-menubar-item disabled>New Incognito Window</ui-menubar-item>
                    </ui-menubar-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-group>
                        <ui-menubar-sub>
                            <ui-menubar-sub-trigger>Share</ui-menubar-sub-trigger>
                            <ui-menubar-sub-content>
                                <ui-menubar-group>
                                    <ui-menubar-item>Email link</ui-menubar-item>
                                    <ui-menubar-item>Messages</ui-menubar-item>
                                    <ui-menubar-item>Notes</ui-menubar-item>
                                </ui-menubar-group>
                            </ui-menubar-sub-content>
                        </ui-menubar-sub>
                    </ui-menubar-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-group>
                        <ui-menubar-item>Print... <ui-menubar-shortcut>⌘P</ui-menubar-shortcut></ui-menubar-item>
                    </ui-menubar-group>
                </ui-menubar-content>
            </ui-menubar-menu>

            <ui-menubar-menu>
                <ui-menubar-trigger>Edit</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-group>
                        <ui-menubar-item>Undo <ui-menubar-shortcut>⌘Z</ui-menubar-shortcut></ui-menubar-item>
                        <ui-menubar-item>Redo <ui-menubar-shortcut>⇧⌘Z</ui-menubar-shortcut></ui-menubar-item>
                    </ui-menubar-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-group>
                        <ui-menubar-sub>
                            <ui-menubar-sub-trigger>Find</ui-menubar-sub-trigger>
                            <ui-menubar-sub-content>
                                <ui-menubar-group>
                                    <ui-menubar-item>Search the web</ui-menubar-item>
                                </ui-menubar-group>
                                <ui-menubar-separator></ui-menubar-separator>
                                <ui-menubar-group>
                                    <ui-menubar-item>Find...</ui-menubar-item>
                                    <ui-menubar-item>Find Next</ui-menubar-item>
                                    <ui-menubar-item>Find Previous</ui-menubar-item>
                                </ui-menubar-group>
                            </ui-menubar-sub-content>
                        </ui-menubar-sub>
                    </ui-menubar-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-group>
                        <ui-menubar-item>Cut</ui-menubar-item>
                        <ui-menubar-item>Copy</ui-menubar-item>
                        <ui-menubar-item>Paste</ui-menubar-item>
                    </ui-menubar-group>
                </ui-menubar-content>
            </ui-menubar-menu>

            <ui-menubar-menu>
                <ui-menubar-trigger>View</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-group>
                        <ui-menubar-checkbox-item>Bookmarks Bar</ui-menubar-checkbox-item>
                        <ui-menubar-checkbox-item checked>Full URLs</ui-menubar-checkbox-item>
                    </ui-menubar-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-group>
                        <ui-menubar-item inset>Reload <ui-menubar-shortcut>⌘R</ui-menubar-shortcut></ui-menubar-item>
                        <ui-menubar-item disabled inset>Force Reload <ui-menubar-shortcut>⇧⌘R</ui-menubar-shortcut></ui-menubar-item>
                    </ui-menubar-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-group>
                        <ui-menubar-item inset>Toggle Fullscreen</ui-menubar-item>
                    </ui-menubar-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-group>
                        <ui-menubar-item inset>Hide Sidebar</ui-menubar-item>
                    </ui-menubar-group>
                </ui-menubar-content>
            </ui-menubar-menu>

            <ui-menubar-menu>
                <ui-menubar-trigger>Profiles</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-radio-group value="benoit">
                        <ui-menubar-radio-item value="andy">Andy</ui-menubar-radio-item>
                        <ui-menubar-radio-item value="benoit">Benoit</ui-menubar-radio-item>
                        <ui-menubar-radio-item value="luis">Luis</ui-menubar-radio-item>
                    </ui-menubar-radio-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-group>
                        <ui-menubar-item inset>Edit...</ui-menubar-item>
                    </ui-menubar-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-group>
                        <ui-menubar-item inset>Add Profile...</ui-menubar-item>
                    </ui-menubar-group>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
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
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>File</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-group>
                        <ui-menubar-item>New Tab <ui-menubar-shortcut>⌘T</ui-menubar-shortcut></ui-menubar-item>
                        <ui-menubar-item>New Window</ui-menubar-item>
                    </ui-menubar-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-group>
                        <ui-menubar-item>Share</ui-menubar-item>
                        <ui-menubar-item>Print</ui-menubar-item>
                    </ui-menubar-group>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Checkbox Items                                                     */
/* ─────────────────────────────────────────────────────────────────── */

export const CheckboxItems: Story = {
    render: () => wrap(html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>View</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-checkbox-item>Always Show Bookmarks Bar</ui-menubar-checkbox-item>
                    <ui-menubar-checkbox-item checked>Always Show Full URLs</ui-menubar-checkbox-item>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item inset>Reload <ui-menubar-shortcut>⌘R</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item disabled inset>Force Reload <ui-menubar-shortcut>⇧⌘R</ui-menubar-shortcut></ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>Format</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-checkbox-item checked>Strikethrough</ui-menubar-checkbox-item>
                    <ui-menubar-checkbox-item>Code</ui-menubar-checkbox-item>
                    <ui-menubar-checkbox-item>Superscript</ui-menubar-checkbox-item>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
    play: async ({ canvasElement }) => {
        const triggers = getTriggers(canvasElement);
        await userEvent.click(getTriggerButton(triggers[0]));
        await waitFor(() => {
            expect(getContent(canvasElement, 0).open).toBe(true);
        });
        // Verify initial checked state
        const checkboxItems = canvasElement.querySelectorAll('ui-menubar-checkbox-item');
        expect((checkboxItems[0] as UiMenubarCheckboxItem).checked).toBe(false);
        expect((checkboxItems[1] as UiMenubarCheckboxItem).checked).toBe(true);
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Radio Items                                                        */
/* ─────────────────────────────────────────────────────────────────── */

export const RadioItems: Story = {
    render: () => wrap(html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>Profiles</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-radio-group value="benoit">
                        <ui-menubar-radio-item value="andy">Andy</ui-menubar-radio-item>
                        <ui-menubar-radio-item value="benoit">Benoit</ui-menubar-radio-item>
                        <ui-menubar-radio-item value="luis">Luis</ui-menubar-radio-item>
                    </ui-menubar-radio-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item inset>Edit...</ui-menubar-item>
                    <ui-menubar-item inset>Add Profile...</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>Theme</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-radio-group value="system">
                        <ui-menubar-radio-item value="light">Light</ui-menubar-radio-item>
                        <ui-menubar-radio-item value="dark">Dark</ui-menubar-radio-item>
                        <ui-menubar-radio-item value="system">System</ui-menubar-radio-item>
                    </ui-menubar-radio-group>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
    play: async ({ canvasElement }) => {
        const triggers = getTriggers(canvasElement);
        await userEvent.click(getTriggerButton(triggers[0]));
        await waitFor(() => {
            expect(getContent(canvasElement, 0).open).toBe(true);
        });
        // Verify initial radio state
        const radioGroup = canvasElement.querySelector('ui-menubar-radio-group') as UiMenubarRadioGroup;
        expect(radioGroup.value).toBe('benoit');
    },
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Submenu                                                            */
/* ─────────────────────────────────────────────────────────────────── */

export const Submenu: Story = {
    render: () => wrap(html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>File</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-sub>
                        <ui-menubar-sub-trigger>Share</ui-menubar-sub-trigger>
                        <ui-menubar-sub-content>
                            <ui-menubar-item>Email link</ui-menubar-item>
                            <ui-menubar-item>Messages</ui-menubar-item>
                            <ui-menubar-item>Notes</ui-menubar-item>
                        </ui-menubar-sub-content>
                    </ui-menubar-sub>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item>Print... <ui-menubar-shortcut>⌘P</ui-menubar-shortcut></ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>Edit</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>Undo <ui-menubar-shortcut>⌘Z</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>Redo <ui-menubar-shortcut>⇧⌘Z</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-sub>
                        <ui-menubar-sub-trigger>Find</ui-menubar-sub-trigger>
                        <ui-menubar-sub-content>
                            <ui-menubar-item>Find...</ui-menubar-item>
                            <ui-menubar-item>Find Next</ui-menubar-item>
                            <ui-menubar-item>Find Previous</ui-menubar-item>
                        </ui-menubar-sub-content>
                    </ui-menubar-sub>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item>Cut</ui-menubar-item>
                    <ui-menubar-item>Copy</ui-menubar-item>
                    <ui-menubar-item>Paste</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Disabled Items                                                     */
/* ─────────────────────────────────────────────────────────────────── */

export const DisabledItems: Story = {
    render: () => wrap(html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>File</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>New Tab</ui-menubar-item>
                    <ui-menubar-item disabled>New Window (disabled)</ui-menubar-item>
                    <ui-menubar-item disabled>Open Recent (disabled)</ui-menubar-item>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item>Print</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Groups with Headings                                               */
/* ─────────────────────────────────────────────────────────────────── */

export const GroupsWithHeadings: Story = {
    render: () => wrap(html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>Actions</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-group heading="Document">
                        <ui-menubar-item>New File</ui-menubar-item>
                        <ui-menubar-item>Open File</ui-menubar-item>
                        <ui-menubar-item>Save</ui-menubar-item>
                    </ui-menubar-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-group heading="Edit">
                        <ui-menubar-item>Cut</ui-menubar-item>
                        <ui-menubar-item>Copy</ui-menubar-item>
                        <ui-menubar-item>Paste</ui-menubar-item>
                    </ui-menubar-group>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Inset Items                                                        */
/* ─────────────────────────────────────────────────────────────────── */

export const InsetItems: Story = {
    render: () => wrap(html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>View</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-checkbox-item checked>Show Toolbar</ui-menubar-checkbox-item>
                    <ui-menubar-checkbox-item>Show Statusbar</ui-menubar-checkbox-item>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item inset>Zoom In <ui-menubar-shortcut>⌘+</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item inset>Zoom Out <ui-menubar-shortcut>⌘-</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item inset>Reset Zoom <ui-menubar-shortcut>⌘0</ui-menubar-shortcut></ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Multiple Menus — IDE-style                                         */
/* ─────────────────────────────────────────────────────────────────── */

export const IDEMenubar: Story = {
    render: () => wrap(html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>File</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>New File <ui-menubar-shortcut>⌘N</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>New Window <ui-menubar-shortcut>⇧⌘N</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item>Open... <ui-menubar-shortcut>⌘O</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>Open Folder...</ui-menubar-item>
                    <ui-menubar-sub>
                        <ui-menubar-sub-trigger>Open Recent</ui-menubar-sub-trigger>
                        <ui-menubar-sub-content>
                            <ui-menubar-item>~/projects/alpha</ui-menubar-item>
                            <ui-menubar-item>~/projects/beta</ui-menubar-item>
                            <ui-menubar-item>~/projects/gamma</ui-menubar-item>
                            <ui-menubar-separator></ui-menubar-separator>
                            <ui-menubar-item>Clear Recently Opened</ui-menubar-item>
                        </ui-menubar-sub-content>
                    </ui-menubar-sub>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item>Save <ui-menubar-shortcut>⌘S</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>Save As... <ui-menubar-shortcut>⇧⌘S</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>Save All</ui-menubar-item>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item>Close Editor <ui-menubar-shortcut>⌘W</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>Close Window <ui-menubar-shortcut>⇧⌘W</ui-menubar-shortcut></ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>

            <ui-menubar-menu>
                <ui-menubar-trigger>Edit</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>Undo <ui-menubar-shortcut>⌘Z</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>Redo <ui-menubar-shortcut>⇧⌘Z</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item>Cut <ui-menubar-shortcut>⌘X</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>Copy <ui-menubar-shortcut>⌘C</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>Paste <ui-menubar-shortcut>⌘V</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-sub>
                        <ui-menubar-sub-trigger>Find</ui-menubar-sub-trigger>
                        <ui-menubar-sub-content>
                            <ui-menubar-item>Find <ui-menubar-shortcut>⌘F</ui-menubar-shortcut></ui-menubar-item>
                            <ui-menubar-item>Find Next <ui-menubar-shortcut>⌘G</ui-menubar-shortcut></ui-menubar-item>
                            <ui-menubar-item>Find Previous <ui-menubar-shortcut>⇧⌘G</ui-menubar-shortcut></ui-menubar-item>
                            <ui-menubar-separator></ui-menubar-separator>
                            <ui-menubar-item>Replace <ui-menubar-shortcut>⌥⌘F</ui-menubar-shortcut></ui-menubar-item>
                        </ui-menubar-sub-content>
                    </ui-menubar-sub>
                </ui-menubar-content>
            </ui-menubar-menu>

            <ui-menubar-menu>
                <ui-menubar-trigger>Selection</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>Select All <ui-menubar-shortcut>⌘A</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>Expand Selection <ui-menubar-shortcut>⇧⌘→</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>Shrink Selection <ui-menubar-shortcut>⇧⌘←</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item>Copy Line Up <ui-menubar-shortcut>⌥⇧↑</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>Copy Line Down <ui-menubar-shortcut>⌥⇧↓</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>Move Line Up <ui-menubar-shortcut>⌥↑</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item>Move Line Down <ui-menubar-shortcut>⌥↓</ui-menubar-shortcut></ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>

            <ui-menubar-menu>
                <ui-menubar-trigger>View</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-checkbox-item checked>Command Palette</ui-menubar-checkbox-item>
                    <ui-menubar-checkbox-item>Open View...</ui-menubar-checkbox-item>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-sub>
                        <ui-menubar-sub-trigger>Appearance</ui-menubar-sub-trigger>
                        <ui-menubar-sub-content>
                            <ui-menubar-checkbox-item checked>Activity Bar</ui-menubar-checkbox-item>
                            <ui-menubar-checkbox-item checked>Status Bar</ui-menubar-checkbox-item>
                            <ui-menubar-checkbox-item>Side Bar</ui-menubar-checkbox-item>
                            <ui-menubar-checkbox-item>Panel</ui-menubar-checkbox-item>
                        </ui-menubar-sub-content>
                    </ui-menubar-sub>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item inset>Zoom In <ui-menubar-shortcut>⌘=</ui-menubar-shortcut></ui-menubar-item>
                    <ui-menubar-item inset>Zoom Out <ui-menubar-shortcut>⌘-</ui-menubar-shortcut></ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>

            <ui-menubar-menu>
                <ui-menubar-trigger>Help</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>Welcome</ui-menubar-item>
                    <ui-menubar-item>Documentation</ui-menubar-item>
                    <ui-menubar-item>Release Notes</ui-menubar-item>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item>Report Issue</ui-menubar-item>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item>About</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Click to Open / Toggle                                             */
/* ─────────────────────────────────────────────────────────────────── */

export const ClickToOpen: Story = {
    render: () => wrap(html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>File</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>New</ui-menubar-item>
                    <ui-menubar-item>Open</ui-menubar-item>
                    <ui-menubar-item>Save</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>Edit</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>Undo</ui-menubar-item>
                    <ui-menubar-item>Redo</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
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
        <p style="margin-bottom: 16px; color: #64748b; font-size: 0.875rem;">
            Click File to open, then hover over Edit to switch menus.
        </p>
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>File</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>New</ui-menubar-item>
                    <ui-menubar-item>Save</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>Edit</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>Undo</ui-menubar-item>
                    <ui-menubar-item>Redo</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>View</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>Zoom In</ui-menubar-item>
                    <ui-menubar-item>Zoom Out</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Keyboard Navigation                                                */
/* ─────────────────────────────────────────────────────────────────── */

export const KeyboardNavigation: Story = {
    render: () => wrap(html`
        <p style="margin-bottom: 16px; color: #64748b; font-size: 0.875rem;">
            Click File, then use ← → to switch menus and ↑ ↓ to navigate items.
        </p>
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>File</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>New Tab</ui-menubar-item>
                    <ui-menubar-item>New Window</ui-menubar-item>
                    <ui-menubar-item>Print</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>Edit</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>Undo</ui-menubar-item>
                    <ui-menubar-item>Redo</ui-menubar-item>
                    <ui-menubar-item>Cut</ui-menubar-item>
                    <ui-menubar-item>Copy</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
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
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>Options</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-checkbox-item checked>Auto-save</ui-menubar-checkbox-item>
                    <ui-menubar-checkbox-item>Spell Check</ui-menubar-checkbox-item>
                    <ui-menubar-checkbox-item checked>Line Numbers</ui-menubar-checkbox-item>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-radio-group value="2">
                        <ui-menubar-radio-item value="2">2 Spaces</ui-menubar-radio-item>
                        <ui-menubar-radio-item value="4">4 Spaces</ui-menubar-radio-item>
                        <ui-menubar-radio-item value="tab">Tab</ui-menubar-radio-item>
                    </ui-menubar-radio-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item inset>Preferences...</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Many Menus                                                         */
/* ─────────────────────────────────────────────────────────────────── */

export const ManyMenus: Story = {
    render: () => wrap(html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>File</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>New</ui-menubar-item>
                    <ui-menubar-item>Open</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>Edit</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>Undo</ui-menubar-item>
                    <ui-menubar-item>Redo</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>View</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>Zoom In</ui-menubar-item>
                    <ui-menubar-item>Zoom Out</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>Go</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>Back</ui-menubar-item>
                    <ui-menubar-item>Forward</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>Run</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>Start Debugging</ui-menubar-item>
                    <ui-menubar-item>Run Without Debugging</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>Terminal</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>New Terminal</ui-menubar-item>
                    <ui-menubar-item>Split Terminal</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>Help</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>About</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Nested Submenus                                                    */
/* ─────────────────────────────────────────────────────────────────── */

export const NestedSubmenus: Story = {
    render: () => wrap(html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>Transform</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-sub>
                        <ui-menubar-sub-trigger>Text</ui-menubar-sub-trigger>
                        <ui-menubar-sub-content>
                            <ui-menubar-item>Uppercase</ui-menubar-item>
                            <ui-menubar-item>Lowercase</ui-menubar-item>
                            <ui-menubar-item>Title Case</ui-menubar-item>
                            <ui-menubar-separator></ui-menubar-separator>
                            <ui-menubar-sub>
                                <ui-menubar-sub-trigger>Encoding</ui-menubar-sub-trigger>
                                <ui-menubar-sub-content>
                                    <ui-menubar-item>UTF-8</ui-menubar-item>
                                    <ui-menubar-item>ASCII</ui-menubar-item>
                                    <ui-menubar-item>ISO-8859-1</ui-menubar-item>
                                </ui-menubar-sub-content>
                            </ui-menubar-sub>
                        </ui-menubar-sub-content>
                    </ui-menubar-sub>
                    <ui-menubar-sub>
                        <ui-menubar-sub-trigger>Sort</ui-menubar-sub-trigger>
                        <ui-menubar-sub-content>
                            <ui-menubar-item>Sort Lines Ascending</ui-menubar-item>
                            <ui-menubar-item>Sort Lines Descending</ui-menubar-item>
                        </ui-menubar-sub-content>
                    </ui-menubar-sub>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item>Trim Trailing Whitespace</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Mixed: Checkbox + Radio + Items                                    */
/* ─────────────────────────────────────────────────────────────────── */

export const MixedContent: Story = {
    render: () => wrap(html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>Settings</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-group heading="Preferences">
                        <ui-menubar-checkbox-item checked>Auto-save</ui-menubar-checkbox-item>
                        <ui-menubar-checkbox-item>Word Wrap</ui-menubar-checkbox-item>
                        <ui-menubar-checkbox-item checked>Minimap</ui-menubar-checkbox-item>
                    </ui-menubar-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-group heading="Theme">
                        <ui-menubar-radio-group value="dark">
                            <ui-menubar-radio-item value="light">Light</ui-menubar-radio-item>
                            <ui-menubar-radio-item value="dark">Dark</ui-menubar-radio-item>
                            <ui-menubar-radio-item value="high-contrast">High Contrast</ui-menubar-radio-item>
                        </ui-menubar-radio-group>
                    </ui-menubar-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-group heading="Font Size">
                        <ui-menubar-radio-group value="14">
                            <ui-menubar-radio-item value="12">12px</ui-menubar-radio-item>
                            <ui-menubar-radio-item value="14">14px</ui-menubar-radio-item>
                            <ui-menubar-radio-item value="16">16px</ui-menubar-radio-item>
                        </ui-menubar-radio-group>
                    </ui-menubar-group>
                    <ui-menubar-separator></ui-menubar-separator>
                    <ui-menubar-item inset>Open Settings... <ui-menubar-shortcut>⌘,</ui-menubar-shortcut></ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Empty Menu                                                         */
/* ─────────────────────────────────────────────────────────────────── */

export const EmptyMenu: Story = {
    render: () => wrap(html`
        <ui-menubar>
            <ui-menubar-menu>
                <ui-menubar-trigger>File</ui-menubar-trigger>
                <ui-menubar-content>
                    <ui-menubar-item>New</ui-menubar-item>
                </ui-menubar-content>
            </ui-menubar-menu>
            <ui-menubar-menu>
                <ui-menubar-trigger>Empty</ui-menubar-trigger>
                <ui-menubar-content>
                </ui-menubar-content>
            </ui-menubar-menu>
        </ui-menubar>
    `),
};
