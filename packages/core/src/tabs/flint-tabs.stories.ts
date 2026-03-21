import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-tabs';
import '../button/flint-button';
import '../paper/flint-paper';
import '../stack/flint-stack';
import '../box/flint-box';

const meta: Meta = {
    title: 'Navigation/Tabs',
    component: 'flint-tabs',
    argTypes: {
        value: { control: 'text', description: 'The currently selected tab value' },
        orientation: { control: { type: 'select' }, options: ['horizontal', 'vertical'] },
        variant: { control: { type: 'select' }, options: ['standard', 'fullWidth', 'scrollable'] },
        centered: { control: 'boolean' },
        'text-color': { control: 'text', description: "'primary' | 'secondary' | 'inherit' | CSS color" },
        'indicator-color': { control: 'text', description: "'primary' | 'secondary' | CSS color" },
        'scroll-buttons': { control: { type: 'select' }, options: ['auto', 'false'] },
    },
    args: {
        value: 'tab1',
        orientation: 'horizontal',
        variant: 'standard',
        centered: false,
        'text-color': 'primary',
        'indicator-color': 'primary',
        'scroll-buttons': 'auto',
    },
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                    { id: 'aria-required-parent', enabled: false },
                    { id: 'aria-required-children', enabled: false },
                    { id: 'aria-valid-attr-value', enabled: false },
                    { id: 'button-name', enabled: false },
                ],
            },
        },
        layout: 'padded',
        docs: {
            description: {
                component: `
#### \`<flint-tab>\`

Tab: an individual tab button within a tab list.

- **Tag**: \`<flint-tab>\`
- **Class**: \`FlintTab\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Unique identifier for this tab. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the tab is disabled. |
| \`selected\` | \`selected\` | \`boolean\` | \`false\` | Whether the tab is currently selected. |
| \`iconPosition\` | \`icon-position\` | \`'top' \\| 'bottom' \\| 'start' \\| 'end'\` | \`'start'\` | Position of the icon slot relative to the label. |
| \`href\` | \`href\` | \`string\` | \`''\` | URL to navigate to, renders the tab as a link. |
| \`fullWidth\` | \`full-width\` | \`boolean\` | \`false\` | Whether the tab stretches to fill available width. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-tab-click\` | — | Fired when the tab is clicked or activated via keyboard. |

#### CSS Parts

| Name | Description |
|---|---|
| \`tab\` | The tab button or anchor element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-tab-border-color\` | \`var(--flint-border-color\` |
| \`--flint-tab-scroll-btn-size\` | \`40px\` |
| \`--flint-tab-indicator-color\` | \`var(--flint-tabs-ind-color, var(--flint-primary-color\` |
| \`--flint-tab-indicator-radius\` | \`3px\` |
| \`--flint-tab-indicator-height\` | \`3px\` |
| \`--flint-tab-indicator-width\` | \`3px\` |
| \`--flint-tab-panel-padding\` | \`24px\` |
| \`--flint-tab-padding-y\` | \`10px\` |
| \`--flint-tab-padding-x\` | \`16px\` |
| \`--flint-tab-min-height\` | \`48px\` |
| \`--flint-tab-font-size\` | \`0.875rem\` |
| \`--flint-tab-font-weight\` | \`500\` |
| \`--flint-tab-inactive-color\` | — |
| \`--flint-tab-active-color\` | — |
| \`--flint-tab-hover-bg\` | \`var(--flint-primary-color-light\` |
| \`--flint-tab-font-weight-active\` | \`600\` |
| \`--flint-tab-disabled-opacity\` | \`0.38\` |
| \`--flint-tab-icon-min-height\` | \`72px\` |
| \`--flint-border-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-background\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-text-color\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-font-family\` | — |
| \`--flint-primary-color-light\` | — |

#### Methods

| Method | Description |
|---|---|
| \`focusInner(): void\` |  |

---

#### \`<flint-tab-panel>\`

Tab Panel: content container shown when its corresponding tab is active.

- **Tag**: \`<flint-tab-panel>\`
- **Class**: \`FlintTabPanel\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Identifier linking this panel to its corresponding tab. |

#### CSS Parts

| Name | Description |
|---|---|
| \`panel\` | The panel content wrapper element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-tab-panel-padding\` | \`24px\` |

---

#### \`<flint-tab-list>\`

- **Tag**: \`<flint-tab-list>\`
- **Class**: \`FlintTabList\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`orientation\` | \`orientation\` | \`Orientation\` | \`'horizontal'\` | Layout direction of the tab list. |
| \`variant\` | \`variant\` | \`'standard' \\| 'fullWidth' \\| 'scrollable'\` | \`'standard'\` | Display variant controlling tab sizing and scrollability. |
| \`centered\` | \`centered\` | \`boolean\` | \`false\` | Whether to center the tabs within the tab list. |
| \`scrollButtons\` | \`scroll-buttons\` | \`'auto' \\| 'false'\` | \`'auto'\` | Whether to show scroll buttons in scrollable mode. |
| \`ariaLabel\` | \`aria-label\` | \`string\` | \`''\` | Accessible label for the tab list. |

#### Methods

| Method | Description |
|---|---|
| \`syncIndicator(): void\` |  |

---

#### \`<flint-tabs>\`

Tabs: container that coordinates tab selection and panel visibility.

- **Tag**: \`<flint-tabs>\`
- **Class**: \`FlintTabs\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Current active tab value (controlled). When set, the component reflects this value and does not manage its own state. |
| \`orientation\` | \`orientation\` | \`Orientation\` | \`'horizontal'\` | Layout direction of the tabs. |
| \`variant\` | \`variant\` | \`'standard' \\| 'fullWidth' \\| 'scrollable'\` | \`'standard'\` | Display variant controlling tab sizing and scrollability. |
| \`centered\` | \`centered\` | \`boolean\` | \`false\` | Whether to center the tabs. |
| \`scrollButtons\` | \`scroll-buttons\` | \`'auto' \\| 'false'\` | \`'auto'\` | Whether to show scroll buttons in scrollable mode. |
| \`textColor\` | \`text-color\` | \`string\` | \`'primary'\` | Text color: 'primary' \\| 'secondary' \\| 'inherit' \\| any CSS color. |
| \`indicatorColor\` | \`indicator-color\` | \`string\` | \`'primary'\` | Indicator color: 'primary' \\| 'secondary' \\| any CSS color. |
| \`defaultValue\` | \`default-value\` | \`string\` | \`''\` | Initial value (uncontrolled). Only used on first render; ignored after mount. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-tab-change\` | \`&#123; value: string &#125;\` | Fired when the active tab changes. detail: \`&#123; value: string &#125;\` |

#### CSS Parts

| Name | Description |
|---|---|
| \`base\` | The tabs root container. |
| \`nav\` | The tab navigation container. |
| \`indicator\` | The active tab indicator element. |
                `,
            },
        },
    },
};
export default meta;
type Story = StoryObj;

/* ── design helpers ── */
const wrap = (content: unknown) => html`
    <flint-paper elevation="2" style="font-family:Inter,sans-serif;overflow:hidden;">
        ${content}
    </flint-paper>`;

const panelContent = (title: string, body: string) => html`
    <div style="font-family:Inter,sans-serif;">
        <h3 style="margin:0 0 8px;font-size:1rem;font-weight:600;color:#111827;">${title}</h3>
        <p  style="margin:0;font-size:.875rem;color:#4b5563;line-height:1.6;">${body}</p>
    </div>`;

/* SVG icons used in icon stories */
const iconPhone = html`<svg slot="icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`;
const iconFavorite = html`<svg slot="icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
const iconLocation = html`<svg slot="icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
const iconStar = html`<svg slot="icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
const iconSettings = html`<svg slot="icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>`;
const iconPerson = html`<svg slot="icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
const iconMusic = html`<svg slot="icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
const iconFolder = html`<svg slot="icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;

/* ================================================================== */
/* Playground                                                           */
/* ================================================================== */
export const Playground: Story = {
    render: (args) => html`
        ${wrap(html`
            <flint-tabs
                value="${args['value']}"
                orientation="${args['orientation']}"
                variant="${args['variant']}"
                ?centered="${args['centered']}"
                text-color="${args['text-color']}"
                indicator-color="${args['indicator-color']}"
                scroll-buttons="${args['scroll-buttons']}"
            >
                <flint-tab-list aria-label="Playground tabs">
                    <flint-tab value="tab1">Item One</flint-tab>
                    <flint-tab value="tab2">Item Two</flint-tab>
                    <flint-tab value="tab3">Item Three</flint-tab>
                </flint-tab-list>
                <flint-tab-panel value="tab1">
                    ${panelContent('Item One', 'Use the Controls panel below to explore all Tabs props — orientation, variant, color, centered, and scroll buttons.')}
                </flint-tab-panel>
                <flint-tab-panel value="tab2">
                    ${panelContent('Item Two', 'Switch between tabs to see the animated indicator slide to the active tab.')}
                </flint-tab-panel>
                <flint-tab-panel value="tab3">
                    ${panelContent('Item Three', 'Try vertical orientation and different color tokens.')}
                </flint-tab-panel>
            </flint-tabs>
        `)}`,
};

/* ================================================================== */
/* Basic                                                                */
/* ================================================================== */
export const Basic: Story = {
    render: () => wrap(html`
        <flint-tabs value="one">
            <flint-tab-list aria-label="Basic tabs example">
                <flint-tab value="one">Item One</flint-tab>
                <flint-tab value="two">Item Two</flint-tab>
                <flint-tab value="three">Item Three</flint-tab>
            </flint-tab-list>
            <flint-tab-panel value="one">${panelContent('Item One', 'Tabs make it easy to explore and switch between different views. Click the tabs above to navigate.')}</flint-tab-panel>
            <flint-tab-panel value="two">${panelContent('Item Two', 'Content for Item Two. The indicator slides smoothly from one tab to another.')}</flint-tab-panel>
            <flint-tab-panel value="three">${panelContent('Item Three', 'Content for Item Three. Tab keyboard navigation: use ArrowLeft / ArrowRight to move focus between tabs.')}</flint-tab-panel>
        </flint-tabs>
    `),
};

Basic.play = async ({ canvasElement }) => {
    const tabs = canvasElement.querySelector('flint-tabs') as HTMLElement & { value: string };
    const tabList = canvasElement.querySelector('flint-tab-list') as HTMLElement;
    const tabEls = tabList.querySelectorAll('flint-tab');

    // Tab "one" is initially selected
    await waitFor(() => expect(tabs.value).toBe('one'));

    // Click second tab (target inner button for shadow DOM click propagation)
    const btn1 = tabEls[1].shadowRoot!.querySelector('button')!;
    await userEvent.click(btn1);
    await waitFor(() => expect(tabs.value).toBe('two'));

    // Click third tab
    const btn2 = tabEls[2].shadowRoot!.querySelector('button')!;
    await userEvent.click(btn2);
    await waitFor(() => expect(tabs.value).toBe('three'));

    // Click back to first tab
    const btn0 = tabEls[0].shadowRoot!.querySelector('button')!;
    await userEvent.click(btn0);
    await waitFor(() => expect(tabs.value).toBe('one'));
};

/* ================================================================== */
/* Wrapped Labels                                                       */
/* ================================================================== */
export const WrappedLabels: Story = {
    render: () => wrap(html`
        <flint-tabs value="a">
            <flint-tab-list aria-label="Wrapped label tabs">
                <flint-tab value="a">Short</flint-tab>
                <flint-tab value="b">Somewhat longer label</flint-tab>
                <flint-tab value="c">A very long tab label that wraps</flint-tab>
                <flint-tab value="d">Medium label</flint-tab>
            </flint-tab-list>
            <flint-tab-panel value="a">${panelContent('Short', 'Long labels wrap onto the next line inside their tab. The indicator still aligns correctly.')}</flint-tab-panel>
            <flint-tab-panel value="b">${panelContent('Somewhat longer label', 'Labels flow naturally according to their content width.')}</flint-tab-panel>
            <flint-tab-panel value="c">${panelContent('A very long tab label that wraps', 'This tab has an unusually long label to demonstrate wrapping behaviour.')}</flint-tab-panel>
            <flint-tab-panel value="d">${panelContent('Medium label', 'Medium length content.')}</flint-tab-panel>
        </flint-tabs>
    `),
};

/* ================================================================== */
/* Colored                                                              */
/* ================================================================== */
export const Colored: Story = {
    render: () => html`
        <flint-stack direction="column" gap="24px">
            ${[
            { label: 'Primary (default)', text: 'primary', ind: 'primary' },
            { label: 'Secondary', text: 'secondary', ind: 'secondary' },
            { label: 'Inherit (from parent)', text: 'inherit', ind: 'primary' },
            { label: 'Custom — #b45309 amber', text: '#b45309', ind: '#b45309' },
            { label: 'Custom — #047857 emerald', text: '#047857', ind: '#047857' },
            { label: 'Custom — #dc2626 red', text: '#dc2626', ind: '#dc2626' },
        ].map(c => html`
                <div>
                    <p style="margin:0 0 6px;font-size:.75rem;color:#4b5563;font-weight:600;
                               text-transform:uppercase;letter-spacing:.06em;font-family:Inter,sans-serif;">
                        ${c.label}
                    </p>
                    ${wrap(html`
                        <flint-tabs value="a" text-color="${c.text}" indicator-color="${c.ind}">
                            <flint-tab-list>
                                <flint-tab value="a">Tab One</flint-tab>
                                <flint-tab value="b">Tab Two</flint-tab>
                                <flint-tab value="c">Tab Three</flint-tab>
                            </flint-tab-list>
                            <flint-tab-panel value="a">
                                <p style="font-family:Inter,sans-serif;font-size:.875rem;color:#374151;margin:0;">
                                    text-color="${c.text}" · indicator-color="${c.ind}"
                                </p>
                            </flint-tab-panel>
                            <flint-tab-panel value="b">Tab Two content</flint-tab-panel>
                            <flint-tab-panel value="c">Tab Three content</flint-tab-panel>
                        </flint-tabs>
                    `)}
                </div>
            `)}
        </flint-stack>`,
};

/* ================================================================== */
/* Disabled Tab                                                         */
/* ================================================================== */
export const DisabledTab: Story = {
    render: () => wrap(html`
        <flint-tabs value="active">
            <flint-tab-list aria-label="Tabs with a disabled tab">
                <flint-tab value="active">Active</flint-tab>
                <flint-tab value="disabled" disabled>Disabled</flint-tab>
                <flint-tab value="also">Also Active</flint-tab>
            </flint-tab-list>
            <flint-tab-panel value="active">
                ${panelContent('Active Tab', 'The middle tab is disabled and cannot be selected — it receives a muted style and ignores all click/keyboard events.')}
            </flint-tab-panel>
            <flint-tab-panel value="disabled">You should never see this.</flint-tab-panel>
            <flint-tab-panel value="also">${panelContent('Also Active Tab', 'Arrow-key navigation skips the disabled tab.')}</flint-tab-panel>
        </flint-tabs>
    `),
};

/* ================================================================== */
/* Fixed / Full Width                                                   */
/* ================================================================== */
export const FullWidth: Story = {
    render: () => html`
        <flint-stack direction="column" gap="24px">
            <div>
                <p style="font-family:Inter,sans-serif;font-size:.75rem;color:#4b5563;font-weight:600;
                           text-transform:uppercase;letter-spacing:.06em;margin:0 0 6px;">
                    variant="fullWidth" — 3 tabs
                </p>
                ${wrap(html`
                    <flint-tabs value="recents" variant="fullWidth">
                        <flint-tab-list aria-label="Full width 3 tabs">
                            <flint-tab value="recents">Recents</flint-tab>
                            <flint-tab value="favorites">Favorites</flint-tab>
                            <flint-tab value="nearby">Nearby</flint-tab>
                        </flint-tab-list>
                        <flint-tab-panel value="recents">${panelContent('Recents', 'Each tab takes an equal third of the container width.')}</flint-tab-panel>
                        <flint-tab-panel value="favorites">${panelContent('Favorites', 'Good for mobile viewports where every pixel counts.')}</flint-tab-panel>
                        <flint-tab-panel value="nearby">${panelContent('Nearby', 'The indicator stretches to fill the full tab width.')}</flint-tab-panel>
                    </flint-tabs>
                `)}
            </div>
            <div>
                <p style="font-family:Inter,sans-serif;font-size:.75rem;color:#4b5563;font-weight:600;
                           text-transform:uppercase;letter-spacing:.06em;margin:0 0 6px;">
                    variant="fullWidth" — 2 tabs
                </p>
                ${wrap(html`
                    <flint-tabs value="a" variant="fullWidth">
                        <flint-tab-list aria-label="Full width 2 tabs">
                            <flint-tab value="a">Sign In</flint-tab>
                            <flint-tab value="b">Sign Up</flint-tab>
                        </flint-tab-list>
                        <flint-tab-panel value="a">${panelContent('Sign In', 'Common pattern for auth flows — two equal panels.')}</flint-tab-panel>
                        <flint-tab-panel value="b">${panelContent('Sign Up', 'Indicator spans the full half-width.')}</flint-tab-panel>
                    </flint-tabs>
                `)}
            </div>
        </flint-stack>`,
};

/* ================================================================== */
/* Centered                                                             */
/* ================================================================== */
export const Centered: Story = {
    render: () => wrap(html`
        <flint-tabs value="one" centered>
            <flint-tab-list aria-label="Centered tabs">
                <flint-tab value="one">Item One</flint-tab>
                <flint-tab value="two">Item Two</flint-tab>
                <flint-tab value="three">Item Three</flint-tab>
            </flint-tab-list>
            <flint-tab-panel value="one">${panelContent('Centered Tabs', 'The centered prop makes tabs cluster at the horizontal centre of their container — useful for larger viewports.')}</flint-tab-panel>
            <flint-tab-panel value="two">${panelContent('Item Two', 'Works perfectly with standard variant.')}</flint-tab-panel>
            <flint-tab-panel value="three">${panelContent('Item Three', 'The indicator still aligns perfectly with the active tab.')}</flint-tab-panel>
        </flint-tabs>
    `),
};

/* ================================================================== */
/* Scrollable Tabs                                                      */
/* ================================================================== */
const menuItems = ['Appetizers', 'Soups', 'Salads', 'Mains', 'Pasta', 'Pizza', 'Seafood', 'Grill', 'Vegan', 'Desserts', 'Drinks', 'Specials'];

export const Scrollable: Story = {
    render: () => wrap(html`
        <flint-tabs value="Appetizers" variant="scrollable" scroll-buttons="auto">
            <flint-tab-list aria-label="Scrollable restaurant menu">
                ${menuItems.map(m => html`<flint-tab value="${m}">${m}</flint-tab>`)}
            </flint-tab-list>
            ${menuItems.map(m => html`
                <flint-tab-panel value="${m}">
                    ${panelContent(m, `Content for the ${m} section. Scroll the tab bar left or right using the arrow buttons, shift+scroll-wheel, or a swipe gesture.`)}
                </flint-tab-panel>`)}
        </flint-tabs>
    `),
};

/* ================================================================== */
/* Forced Scroll Buttons vs None                                        */
/* ================================================================== */
export const ScrollButtons: Story = {
    render: () => html`
        <flint-stack direction="column" gap="24px" style="font-family:Inter,sans-serif;">
            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#4b5563;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    scroll-buttons="auto" — arrow buttons appear when tabs overflow
                </p>
                ${wrap(html`
                    <flint-tabs value="Tab 1" variant="scrollable" scroll-buttons="auto">
                        <flint-tab-list aria-label="Auto scroll buttons">
                            ${Array.from({ length: 12 }, (_, i) => html`<flint-tab value="Tab ${i + 1}">Tab ${i + 1}</flint-tab>`)}
                        </flint-tab-list>
                        ${Array.from({ length: 12 }, (_, i) => html`
                            <flint-tab-panel value="Tab ${i + 1}">
                                ${panelContent(`Tab ${i + 1}`, 'Scroll buttons appear at each end of the tab bar. Click them or use the keyboard.')}
                            </flint-tab-panel>`)}
                    </flint-tabs>
                `)}
            </div>

            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#4b5563;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    scroll-buttons="false" — no buttons; scroll via swipe or shift+scroll-wheel
                </p>
                ${wrap(html`
                    <flint-tabs value="Tab 1" variant="scrollable" scroll-buttons="false">
                        <flint-tab-list aria-label="No scroll buttons — native scroll">
                            ${Array.from({ length: 12 }, (_, i) => html`<flint-tab value="Tab ${i + 1}">Tab ${i + 1}</flint-tab>`)}
                        </flint-tab-list>
                        ${Array.from({ length: 12 }, (_, i) => html`
                            <flint-tab-panel value="Tab ${i + 1}">
                                ${panelContent(`Tab ${i + 1}`, 'No scroll arrow buttons are ever shown. Scrolling is entirely through user agent mechanisms (shift+wheel, swipe, etc.).')}
                            </flint-tab-panel>`)}
                    </flint-tabs>
                `)}
            </div>
        </flint-stack>`,
};

/* ================================================================== */
/* Vertical Tabs                                                        */
/* ================================================================== */
export const Vertical: Story = {
    render: () => html`
        <flint-box display="flex" border="1px solid #e5e7eb" borderRadius="12px" style="overflow:hidden;
                    box-shadow:0 2px 8px rgba(0,0,0,.06);background:var(--flint-background, #fff);
                    min-height:280px;">
            <flint-tabs value="one" orientation="vertical" style="display:flex;width:100%;">
                <flint-tab-list aria-label="Vertical tabs" style="width:160px;flex-shrink:0;">
                    <flint-tab value="one">Item One</flint-tab>
                    <flint-tab value="two">Item Two</flint-tab>
                    <flint-tab value="three">Item Three</flint-tab>
                    <flint-tab value="four">Item Four</flint-tab>
                    <flint-tab value="five">Item Five</flint-tab>
                </flint-tab-list>
                <div style="flex:1;">
                    <flint-tab-panel value="one">${panelContent('Item One', 'Use orientation="vertical" to place tabs on the left. The indicator moves vertically.')}</flint-tab-panel>
                    <flint-tab-panel value="two">${panelContent('Item Two', 'Arrow keys Up/Down navigate between vertical tabs.')}</flint-tab-panel>
                    <flint-tab-panel value="three">${panelContent('Item Three', 'Combine with any variant — standard, fullWidth, or scrollable.')}</flint-tab-panel>
                    <flint-tab-panel value="four">${panelContent('Item Four', 'Common pattern for settings pages and dashboards.')}</flint-tab-panel>
                    <flint-tab-panel value="five">${panelContent('Item Five', 'The right border becomes the separator between the tab list and panel.')}</flint-tab-panel>
                </div>
            </flint-tabs>
        </flint-box>`,
};

/* ================================================================== */
/* Vertical Scrollable                                                  */
/* ================================================================== */
export const VerticalScrollable: Story = {
    render: () => html`
        <flint-box display="flex" border="1px solid #e5e7eb" borderRadius="12px" style="overflow:hidden;
                    box-shadow:0 2px 8px rgba(0,0,0,.06);background:var(--flint-background, #fff);
                    height:260px;">
            <flint-tabs value="0" orientation="vertical" variant="scrollable"
                     scroll-buttons="auto" style="display:flex;width:100%;">
                <flint-tab-list aria-label="Vertical scrollable" style="width:160px;flex-shrink:0;">
                    ${Array.from({ length: 10 }, (_, i) => html`<flint-tab value="${i}">Menu ${i + 1}</flint-tab>`)}
                </flint-tab-list>
                <div style="flex:1;overflow:auto;">
                    ${Array.from({ length: 10 }, (_, i) => html`
                        <flint-tab-panel value="${i}">
                            ${panelContent(`Menu ${i + 1}`, `Vertical scrollable tabs — combined with scroll-buttons="auto" for up/down arrow buttons.`)}
                        </flint-tab-panel>`)}
                </div>
            </flint-tabs>
        </flint-box>`,
};

/* ================================================================== */
/* Nav Tabs                                                             */
/* ================================================================== */
export const NavTabs: Story = {
    render: () => html`
        <flint-stack direction="column" gap="24px" style="font-family:Inter,sans-serif;">
            <p style="margin:0;font-size:.875rem;color:#374151;">
                Set <code style="background:var(--flint-muted-background, #f3f4f6);padding:2px 5px;border-radius:4px;">href</code>
                on a tab to render it as an <code style="background:var(--flint-muted-background, #f3f4f6);padding:2px 5px;border-radius:4px;">&lt;a&gt;</code>
                element — perfect for hash-based or client-side navigation.
            </p>
            ${wrap(html`
                <flint-tabs value="home">
                    <flint-tab-list aria-label="Site navigation tabs">
                        <flint-tab value="home"     href="#home">Home</flint-tab>
                        <flint-tab value="portfolio" href="#portfolio">Portfolio</flint-tab>
                        <flint-tab value="about"    href="#about">About</flint-tab>
                        <flint-tab value="contact"  href="#contact">Contact</flint-tab>
                    </flint-tab-list>
                    <flint-tab-panel value="home">
                        ${panelContent('Home', 'Nav tabs render anchor elements. The href navigates the page; clicking also selects the tab.')}
                    </flint-tab-panel>
                    <flint-tab-panel value="portfolio">${panelContent('Portfolio', 'Check your browser\'s address bar — the hash updated!')}</flint-tab-panel>
                    <flint-tab-panel value="about">${panelContent('About', 'Useful for multi-page apps using hash routing.')}</flint-tab-panel>
                    <flint-tab-panel value="contact">${panelContent('Contact', 'All accessibility attributes are preserved on the anchor element.')}</flint-tab-panel>
                </flint-tabs>
            `)}
        </flint-stack>`,
};

/* ================================================================== */
/* Icon Position                                                        */
/* ================================================================== */
export const IconPosition: Story = {
    render: () => html`
        <flint-stack direction="column" gap="24px">
            ${(['top', 'bottom', 'start', 'end'] as const).map(pos => html`
                <div>
                    <p style="font-family:Inter,sans-serif;margin:0 0 6px;font-size:.75rem;color:#4b5563;
                               font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                        icon-position="${pos}"
                    </p>
                    ${wrap(html`
                        <flint-tabs value="calls">
                            <flint-tab-list>
                                <flint-tab value="calls"    icon-position="${pos}">${iconPhone}Calls</flint-tab>
                                <flint-tab value="favorites" icon-position="${pos}">${iconFavorite}Favorites</flint-tab>
                                <flint-tab value="nearby"   icon-position="${pos}">${iconLocation}Nearby</flint-tab>
                            </flint-tab-list>
                            <flint-tab-panel value="calls">${panelContent('Calls', `Icons positioned at: ${pos}`)}</flint-tab-panel>
                            <flint-tab-panel value="favorites">${panelContent('Favorites', `Icon on the ${pos}`)}</flint-tab-panel>
                            <flint-tab-panel value="nearby">${panelContent('Nearby', `Icon on the ${pos}`)}</flint-tab-panel>
                        </flint-tabs>
                    `)}
                </div>`)}
        </flint-stack>`,
};

/* ================================================================== */
/* Icon-Only Tabs                                                       */
/* ================================================================== */
export const IconOnly: Story = {
    render: () => wrap(html`
        <flint-tabs value="music">
            <flint-tab-list aria-label="Media tabs">
                <flint-tab value="music"    title="Music">${iconMusic}</flint-tab>
                <flint-tab value="person"   title="Profile">${iconPerson}</flint-tab>
                <flint-tab value="folder"   title="Files">${iconFolder}</flint-tab>
                <flint-tab value="settings" title="Settings">${iconSettings}</flint-tab>
                <flint-tab value="star"     title="Starred">${iconStar}</flint-tab>
            </flint-tab-list>
            <flint-tab-panel value="music">${panelContent('Music', 'Icon-only tabs — set the title attribute for accessible tooltips.')}</flint-tab-panel>
            <flint-tab-panel value="person">${panelContent('Profile', 'Compact horizontal tabs without text labels.')}</flint-tab-panel>
            <flint-tab-panel value="folder">${panelContent('Files', 'Good for toolbars and sidebars.')}</flint-tab-panel>
            <flint-tab-panel value="settings">${panelContent('Settings', 'Configure the app here.')}</flint-tab-panel>
            <flint-tab-panel value="star">${panelContent('Starred', 'Your starred items.')}</flint-tab-panel>
        </flint-tabs>
    `),
};

/* ================================================================== */
/* Mixed: Icon + Label side-by-side (start position)                  */
/* ================================================================== */
export const WithIcons: Story = {
    render: () => html`
        <flint-stack direction="column" gap="24px">
            ${wrap(html`
                <flint-tabs value="recents" text-color="primary">
                    <flint-tab-list aria-label="Tabs with icons">
                        <flint-tab value="recents"   icon-position="start">${iconPhone}Recents</flint-tab>
                        <flint-tab value="favorites" icon-position="start">${iconFavorite}Favorites</flint-tab>
                        <flint-tab value="nearby"    icon-position="start">${iconLocation}Nearby</flint-tab>
                    </flint-tab-list>
                    <flint-tab-panel value="recents">${panelContent('Recents', 'Icons rendered inline to the left of their label (icon-position="start").')}</flint-tab-panel>
                    <flint-tab-panel value="favorites">${panelContent('Favorites', 'A clean, compact style for desktop navigation.')}</flint-tab-panel>
                    <flint-tab-panel value="nearby">${panelContent('Nearby', 'Works with all color variants and indicator colors.')}</flint-tab-panel>
                </flint-tabs>
            `)}
            ${wrap(html`
                <flint-tabs value="recents" text-color="secondary" indicator-color="secondary">
                    <flint-tab-list aria-label="Tabs with end icons">
                        <flint-tab value="recents"   icon-position="end">${iconPhone}Recents</flint-tab>
                        <flint-tab value="favorites" icon-position="end">${iconFavorite}Favorites</flint-tab>
                        <flint-tab value="nearby"    icon-position="end">${iconLocation}Nearby</flint-tab>
                    </flint-tab-list>
                    <flint-tab-panel value="recents">${panelContent('Recents', 'Icon right of label (icon-position="end") with secondary color theme.')}</flint-tab-panel>
                    <flint-tab-panel value="favorites">${panelContent('Favorites', 'Great for badge indicators placed at the end.')}</flint-tab-panel>
                    <flint-tab-panel value="nearby">${panelContent('Nearby', 'Tab panel content.')}</flint-tab-panel>
                </flint-tabs>
            `)}
        </div>`,
};

/* ================================================================== */
/* Controlled — external state management                              */
/* ================================================================== */
export const Controlled: Story = {
    render: () => html`
        <div data-controlled-demo style="font-family:Inter,sans-serif;">
            <flint-stack direction="row" gap="12px" style="margin-bottom:16px;">
                ${(['a', 'b', 'c'] as const).map(v => html`
                    <button
                        style="padding:8px 16px;border:1px solid #e5e7eb;background:var(--flint-muted-background, #f9fafb);border-radius:6px;cursor:pointer;font-family:Inter,sans-serif;"
                        @click=${(e: MouseEvent) => {
                            const tabs = (e.target as HTMLElement)
                                .closest('[data-controlled-demo]')
                                ?.querySelector('flint-tabs') as (HTMLElement & { value: string }) | null;
                            if (tabs) tabs.value = v;
                        }}>Select ${v.toUpperCase()}</button>
                `)}
            </flint-stack>
            ${wrap(html`
                <flint-tabs value="a"
                    @flint-tab-change=${(e: CustomEvent) => {
                        (e.currentTarget as HTMLElement & { value: string }).value = e.detail.value;
                    }}>
                    <flint-tab-list aria-label="Controlled tabs">
                        <flint-tab value="a">Tab A</flint-tab>
                        <flint-tab value="b">Tab B</flint-tab>
                        <flint-tab value="c">Tab C</flint-tab>
                    </flint-tab-list>
                    <flint-tab-panel value="a">${panelContent('Controlled Tab A', 'Click the buttons above to change the active tab programmatically.')}</flint-tab-panel>
                    <flint-tab-panel value="b">${panelContent('Controlled Tab B', 'External state drives which tab is active — the component just reflects what it receives.')}</flint-tab-panel>
                    <flint-tab-panel value="c">${panelContent('Controlled Tab C', 'Works well with any state manager: Redux, signals, or plain JS.')}</flint-tab-panel>
                </flint-tabs>
            `)}
        </flint-stack>`,
};

/* ================================================================== */
/* Uncontrolled — default-value for initial state                     */
/* ================================================================== */
export const Uncontrolled: Story = {
    render: () => wrap(html`
        <flint-tabs default-value="b">
            <flint-tab-list aria-label="Uncontrolled tabs">
                <flint-tab value="a">Tab A</flint-tab>
                <flint-tab value="b">Tab B</flint-tab>
                <flint-tab value="c">Tab C</flint-tab>
            </flint-tab-list>
            <flint-tab-panel value="a">${panelContent('Uncontrolled Tab A', 'This component uses default-value="b" to initialize with Tab B active.')}</flint-tab-panel>
            <flint-tab-panel value="b">${panelContent('Uncontrolled Tab B', 'No value prop needed — the component manages its own state.')}</flint-tab-panel>
            <flint-tab-panel value="c">${panelContent('Uncontrolled Tab C', 'Good for simple use cases where you don\'t need to track the active tab externally.')}</flint-tab-panel>
        </flint-tabs>
    `),
};

/* ================================================================== */
/* Dark Mode                                                            */
/* ================================================================== */
export const DarkMode: Story = {
    render: () => html`
        <flint-stack direction="column" gap="24px">
            <div class="flint-theme-dark" style="background:var(--flint-surface-background, #111827);padding:0;border-radius:12px;overflow:hidden;
                        border:1px solid #374151;box-shadow:0 2px 8px rgba(0,0,0,.4);">
                <flint-tabs value="tab1">
                    <flint-tab-list aria-label="Dark mode tabs">
                        <flint-tab value="tab1">Dark Tab</flint-tab>
                        <flint-tab value="tab2">Another Tab</flint-tab>
                        <flint-tab value="tab3">Third Tab</flint-tab>
                    </flint-tab-list>
                    <flint-tab-panel value="tab1">
                        <div style="font-family:Inter,sans-serif;">
                            <h3 style="margin:0 0 8px;font-size:1rem;font-weight:600;color:#f9fafb;">Dark Mode</h3>
                            <p style="margin:0;font-size:.875rem;color:#9ca3af;line-height:1.6;">Apply .flint-theme-dark to any ancestor to enable the dark theme. All CSS variables adjust automatically.</p>
                        </div>
                    </flint-tab-panel>
                    <flint-tab-panel value="tab2">
                        <div style="font-family:Inter,sans-serif;">
                            <h3 style="margin:0 0 8px;font-size:1rem;font-weight:600;color:#f9fafb;">Better Contrast</h3>
                            <p style="margin:0;font-size:.875rem;color:#9ca3af;line-height:1.6;">All colors auto-adjust to dark backgrounds for readability.</p>
                        </div>
                    </flint-tab-panel>
                    <flint-tab-panel value="tab3">
                        <div style="font-family:Inter,sans-serif;">
                            <h3 style="margin:0 0 8px;font-size:1rem;font-weight:600;color:#f9fafb;">CSS Variables</h3>
                            <p style="margin:0;font-size:.875rem;color:#9ca3af;line-height:1.6;">Uses CSS custom properties for complete theme flexibility.</p>
                        </div>
                    </flint-tab-panel>
                </flint-tabs>
            </div>
            <p style="font-family:Inter,sans-serif;margin:0;font-size:.875rem;color:#4b5563;">
                Light mode (default) for comparison:
            </p>
            ${wrap(html`
                <flint-tabs value="tab1">
                    <flint-tab-list aria-label="Light mode tabs">
                        <flint-tab value="tab1">Light Tab</flint-tab>
                        <flint-tab value="tab2">Another Tab</flint-tab>
                        <flint-tab value="tab3">Third Tab</flint-tab>
                    </flint-tab-list>
                    <flint-tab-panel value="tab1">${panelContent('Light Mode', 'Default appearance without .flint-theme-dark.')}</flint-tab-panel>
                    <flint-tab-panel value="tab2">${panelContent('Standard Colors', 'Uses the default primary blue palette.')}</flint-tab-panel>
                    <flint-tab-panel value="tab3">${panelContent('Light Theme', 'White background with standard border color.')}</flint-tab-panel>
                </flint-tabs>
            `)}
        </flint-stack>`,
};

/* ================================================================== */
/* Accessibility                                                       */
/* ================================================================== */
export const Accessibility: Story = {
    render: () => wrap(html`
        <div style="font-family:Inter,sans-serif;">
            <div style="margin-bottom:16px;padding:12px;background:var(--flint-info-background, #eff6ff);border-left:4px solid #3b82f6;border-radius:4px;font-size:.875rem;color:#1e40af;">
                <strong>Keyboard Navigation:</strong> Use Arrow Left/Right (horizontal) or Arrow Up/Down (vertical) to navigate tabs. Press Home to go to the first tab, End for the last. Disabled tabs are skipped.
            </div>
            <flint-tabs value="home">
                <flint-tab-list aria-label="Main navigation tabs">
                    <flint-tab value="home">${iconLocation}Home</flint-tab>
                    <flint-tab value="profile">${iconPerson}Profile</flint-tab>
                    <flint-tab value="settings">${iconSettings}Settings</flint-tab>
                </flint-tab-list>
                <flint-tab-panel value="home">${panelContent('Home', 'Tab list has role="tablist" with aria-label. Each tab has role="tab", aria-selected, and aria-controls pointing to its panel.')}</flint-tab-panel>
                <flint-tab-panel value="profile">${panelContent('Profile', 'Tab panels have role="tabpanel" and aria-labelledby pointing back to their tab.')}</flint-tab-panel>
                <flint-tab-panel value="settings">${panelContent('Settings', 'All labels use semantic HTML. Focus management works with shadow DOM. Screen readers announce the tab structure correctly.')}</flint-tab-panel>
            </flint-tabs>
        </div>`,
    ),
};

/* ================================================================== */
/* Tab List Only (filter chips pattern)                                */
/* ================================================================== */
export const TabListOnly: Story = {
    render: () => html`
        <div style="font-family:Inter,sans-serif;">
            <p style="margin:0 0 12px;font-size:.875rem;color:#4b5563;">
                <code style="background:var(--flint-muted-background, #f3f4f6);padding:2px 5px;border-radius:4px;">&lt;flint-tab-list&gt;</code>
                can be used standalone for filter chips, button groups, or other tab-like patterns (no panels needed).
                A <code style="background:var(--flint-muted-background, #f3f4f6);padding:2px 5px;border-radius:4px;">flint-tab-click</code> event
                bubbles out so you can handle selection in your own logic.
            </p>
            ${wrap(html`
                <div @flint-tab-click=${(e: CustomEvent) => {
                    const list = (e.currentTarget as HTMLElement).querySelector('flint-tab-list');
                    if (!list) return;
                    list.querySelectorAll('flint-tab').forEach((t: Element) => {
                        (t as HTMLElement & { selected: boolean }).selected = t.getAttribute('value') === e.detail.value;
                    });
                }}>
                    <flint-tab-list aria-label="Filter tabs">
                        <flint-tab value="all" selected>All Items</flint-tab>
                        <flint-tab value="active">Active</flint-tab>
                        <flint-tab value="archived">Archived</flint-tab>
                        <flint-tab value="deleted">Deleted</flint-tab>
                    </flint-tab-list>
                </div>
            `)}
        </div>`,
};

/* ================================================================== */
/* Dynamic Tabs                                                        */
/* ================================================================== */
export const DynamicTabs: Story = {
    render: () => html`
        <div data-dynamic-demo style="font-family:Inter,sans-serif;">
            <flint-stack direction="row" gap="8px" style="margin-bottom:16px;">
                <flint-button @click=${(e: MouseEvent) => {
                            const container = (e.target as HTMLElement).closest('[data-dynamic-demo]');
                            const tabs = container?.querySelector('flint-tabs');
                            if (!tabs) return;
                            const allTabs = Array.from(tabs.querySelectorAll('flint-tab'));
                            const count = Math.max(...allTabs.map((t) => parseInt(t.getAttribute('value')?.replace('tab-', '') ?? '0') || 0)) + 1;
                            const newTab = document.createElement('flint-tab');
                            newTab.setAttribute('value', `tab-${count}`);
                            newTab.textContent = `Tab ${count}`;
                            const newPanel = document.createElement('flint-tab-panel');
                            newPanel.setAttribute('value', `tab-${count}`);
                            newPanel.innerHTML = `<div style="font-family:Inter,sans-serif;padding:24px;"><h3 style="margin:0 0 8px;font-size:1rem;font-weight:600;color:#111827;">Dynamic Tab ${count}</h3><p style="margin:0;font-size:.875rem;color:#4b5563;">Added at runtime to demonstrate dynamic tab creation.</p></div>`;
                            tabs.querySelector('flint-tab-list')?.appendChild(newTab);
                            tabs.appendChild(newPanel);
                        }}>Add Tab</flint-button>
                <flint-button appearance="filled" color="destructive" @click=${(e: MouseEvent) => {
                            const container = (e.target as HTMLElement).closest('[data-dynamic-demo]');
                            const tabs = container?.querySelector('flint-tabs') as (HTMLElement & { value: string }) | null;
                            if (!tabs) return;
                            const allTabs = tabs.querySelectorAll('flint-tab');
                            if (allTabs.length <= 1) return; // keep at least one tab
                            const lastTab = allTabs[allTabs.length - 1];
                            const lastPanel = tabs.querySelector(`flint-tab-panel[value="${lastTab.getAttribute('value')}"]`);
                            const wasActive = lastTab.getAttribute('value') === tabs.value;
                            lastTab.remove();
                            if (lastPanel) lastPanel.remove();
                            // if removed tab was active, switch to new last tab
                            if (wasActive) {
                                const remaining = tabs.querySelectorAll('flint-tab');
                                const newLast = remaining[remaining.length - 1];
                                if (newLast) tabs.value = newLast.getAttribute('value') ?? '';
                            }
                        }}>Remove Tab</flint-button>
            </flint-stack>
            ${wrap(html`
                <flint-tabs value="tab-1">
                    <flint-tab-list aria-label="Dynamic tabs">
                        <flint-tab value="tab-1">Tab 1</flint-tab>
                        <flint-tab value="tab-2">Tab 2</flint-tab>
                        <flint-tab value="tab-3">Tab 3</flint-tab>
                    </flint-tab-list>
                    <flint-tab-panel value="tab-1">${panelContent('Dynamic Tab 1', 'Use Add/Remove buttons to dynamically add or remove tabs. The component re-syncs automatically.')}</flint-tab-panel>
                    <flint-tab-panel value="tab-2">${panelContent('Dynamic Tab 2', 'When tabs are added or removed, the component updates the tab list and panels.')}</flint-tab-panel>
                    <flint-tab-panel value="tab-3">${panelContent('Dynamic Tab 3', 'This is useful for tabbed interfaces that change content dynamically.')}</flint-tab-panel>
                </flint-tabs>
            `)}
        </div>`,
};

/* ================================================================== */
/* Responsive Tabs                                                     */
/* ================================================================== */
export const Responsive: Story = {
    render: () => html`
        <flint-stack direction="column" gap="24px" style="font-family:Inter,sans-serif;">
            <p style="margin:0;font-size:.875rem;color:#374151;">
                Two common patterns for adapting tabs across screen sizes — choose the one that fits your layout.
            </p>
            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#4b5563;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    variant="scrollable" — natural on mobile, works at any width
                </p>
                ${wrap(html`
                    <flint-tabs value="home" variant="scrollable" scroll-buttons="auto">
                        <flint-tab-list aria-label="Scrollable navigation tabs">
                            <flint-tab value="home">Home</flint-tab>
                            <flint-tab value="products">Products</flint-tab>
                            <flint-tab value="services">Services</flint-tab>
                            <flint-tab value="about">About</flint-tab>
                            <flint-tab value="contact">Contact</flint-tab>
                        </flint-tab-list>
                        <flint-tab-panel value="home">${panelContent('Home', 'Tabs overflow into a scrollable strip with arrow buttons on each side.')}</flint-tab-panel>
                        <flint-tab-panel value="products">${panelContent('Products', 'Explore our wide range of high-quality products.')}</flint-tab-panel>
                        <flint-tab-panel value="services">${panelContent('Services', 'Professional services tailored to your needs.')}</flint-tab-panel>
                        <flint-tab-panel value="about">${panelContent('About', 'Learn about our company and mission.')}</flint-tab-panel>
                        <flint-tab-panel value="contact">${panelContent('Contact', 'Get in touch with us.')}</flint-tab-panel>
                    </flint-tabs>
                `)}
            </div>
            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#4b5563;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    variant="fullWidth" — each tab expands to fill equal space
                </p>
                ${wrap(html`
                    <flint-tabs value="home" variant="fullWidth">
                        <flint-tab-list aria-label="Full-width navigation tabs">
                            <flint-tab value="home">Home</flint-tab>
                            <flint-tab value="products">Products</flint-tab>
                            <flint-tab value="services">Services</flint-tab>
                        </flint-tab-list>
                        <flint-tab-panel value="home">${panelContent('Home', 'Great for mobile layouts where the tab bar should always fill the container width.')}</flint-tab-panel>
                        <flint-tab-panel value="products">${panelContent('Products', 'All tabs share the width equally.')}</flint-tab-panel>
                        <flint-tab-panel value="services">${panelContent('Services', 'The indicator stretches to fill each tab.')}</flint-tab-panel>
                    </flint-tabs>
                `)}
            </div>
        </div>`,
};

/* ================================================================== */
/* Multi-Color Theme Tabs                                              */
/* ================================================================== */
export const MultiColorTheme: Story = {
    render: () => html`
        <flint-stack direction="column" gap="32px" style="font-family:Inter,sans-serif;">
            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#4b5563;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    Interactive Dashboard Tabs
                </p>
                ${wrap(html`
                    <flint-tabs value="overview" text-color="primary" indicator-color="primary">
                        <flint-tab-list aria-label="Dashboard navigation">
                            <flint-tab value="overview">Overview</flint-tab>
                            <flint-tab value="analytics">Analytics</flint-tab>
                            <flint-tab value="reports">Reports</flint-tab>
                            <flint-tab value="settings" disabled>Settings</flint-tab>
                        </flint-tab-list>
                        <flint-tab-panel value="overview">${panelContent('Dashboard Overview', 'Real-time metrics and system status at a glance.')}</flint-tab-panel>
                        <flint-tab-panel value="analytics">${panelContent('Analytics', 'Detailed analytics and performance metrics for your application.')}</flint-tab-panel>
                        <flint-tab-panel value="reports">${panelContent('Reports', 'Generate, view, and export comprehensive reports.')}</flint-tab-panel>
                        <flint-tab-panel value="settings">${panelContent('Settings', 'Configure your dashboard preferences and notifications.')}</flint-tab-panel>
                    </flint-tabs>
                `)}
            </div>

            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#4b5563;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    Accent Color Tabs
                </p>
                ${wrap(html`
                    <flint-tabs value="library" text-color="secondary" indicator-color="secondary">
                        <flint-tab-list aria-label="Content library tabs">
                            <flint-tab value="library">Library</flint-tab>
                            <flint-tab value="recent">Recent</flint-tab>
                            <flint-tab value="saved">Saved</flint-tab>
                        </flint-tab-list>
                        <flint-tab-panel value="library">${panelContent('Content Library', 'Browse your complete content collection.')}</flint-tab-panel>
                        <flint-tab-panel value="recent">${panelContent('Recently Viewed', 'Items you\'ve recently accessed.')}</flint-tab-panel>
                        <flint-tab-panel value="saved">${panelContent('Saved Items', 'Your bookmarks and favorite content.')}</flint-tab-panel>
                    </flint-tabs>
                `)}
            </div>
        </flint-stack>`,
};

/* ================================================================== */
/* Error States                                                        */
/* ================================================================== */
export const ErrorStates: Story = {
    render: () => html`
        <flint-stack direction="column" gap="24px" style="font-family:Inter,sans-serif;">
            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#4b5563;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    Form Tabs with Validation States
                </p>
                ${wrap(html`
                    <flint-tabs value="personal" text-color="primary">
                        <flint-tab-list aria-label="Form steps">
                            <flint-tab value="personal">Personal Info</flint-tab>
                            <flint-tab value="address">Address</flint-tab>
                            <flint-tab value="payment">Payment</flint-tab>
                            <flint-tab value="review">Review</flint-tab>
                        </flint-tab-list>
                        <flint-tab-panel value="personal">
                            ${panelContent('Personal Information', 'Enter your name, email, and phone number. All fields are required.')}
                        </flint-tab-panel>
                        <flint-tab-panel value="address">
                            ${panelContent('Shipping Address', 'Provide your complete shipping address for delivery.')}
                        </flint-tab-panel>
                        <flint-tab-panel value="payment">
                            ${panelContent('Payment Details', 'Enter your payment information securely.')}
                        </flint-tab-panel>
                        <flint-tab-panel value="review">
                            ${panelContent('Review Order', 'Double-check your information before submitting.')}
                        </flint-tab-panel>
                    </flint-tabs>
                `)}
            </div>
        </flint-stack>`,
};

/* ================================================================== */
/* RTL                                                                 */
/* ================================================================== */
export const DefaultRTL: Story = {
    name: 'RTL',
    render: () => html`
        <div dir="rtl" style="text-align: right">
            ${wrap(html`
                <flint-tabs value="tab1">
                    <flint-tab-list aria-label="علامات تبويب RTL">
                        <flint-tab value="tab1">العنصر الأول</flint-tab>
                        <flint-tab value="tab2">العنصر الثاني</flint-tab>
                        <flint-tab value="tab3">العنصر الثالث</flint-tab>
                    </flint-tab-list>
                    <flint-tab-panel value="tab1">${panelContent('العنصر الأول', 'المحتوى يظهر من اليمين إلى اليسار.')}</flint-tab-panel>
                    <flint-tab-panel value="tab2">${panelContent('العنصر الثاني', 'يتحرك المؤشر بسلاسة بين علامات التبويب.')}</flint-tab-panel>
                    <flint-tab-panel value="tab3">${panelContent('العنصر الثالث', 'التنقل بلوحة المفاتيح يعمل بشكل صحيح في وضع RTL.')}</flint-tab-panel>
                </flint-tabs>
            `)}
        </div>
    `,
};
