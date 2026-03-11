import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-tabs';
import '../paper/ui-paper';

const meta: Meta = {
    title: 'Navigation/Tabs',
    component: 'ui-tabs',
    argTypes: {
        value: { control: 'text', description: 'The currently selected tab value' },
        orientation: { control: { type: 'select' }, options: ['horizontal', 'vertical'] },
        variant: { control: { type: 'select' }, options: ['standard', 'fullWidth', 'scrollable'] },
        centered: { control: 'boolean' },
        'text-color': { control: 'text', description: "'primary' | 'secondary' | 'inherit' | CSS color" },
        'indicator-color': { control: 'text', description: "'primary' | 'secondary' | CSS color" },
        'scroll-buttons': { control: { type: 'select' }, options: ['auto', 'false'] },
    },
    parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

/* ── design helpers ── */
const wrap = (content: unknown) => html`
    <ui-paper elevation="2" style="font-family:Inter,sans-serif;overflow:hidden;">
        ${content}
    </ui-paper>`;

const panelContent = (title: string, body: string) => html`
    <div style="font-family:Inter,sans-serif;">
        <h3 style="margin:0 0 8px;font-size:1rem;font-weight:600;color:#111827;">${title}</h3>
        <p  style="margin:0;font-size:.875rem;color:#6b7280;line-height:1.6;">${body}</p>
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
    args: {
        value: 'tab1',
        orientation: 'horizontal',
        variant: 'standard',
        centered: false,
        'text-color': 'primary',
        'indicator-color': 'primary',
        'scroll-buttons': 'auto',
    },
    render: (args) => html`
        ${wrap(html`
            <ui-tabs
                value="${args['value']}"
                orientation="${args['orientation']}"
                variant="${args['variant']}"
                ?centered="${args['centered']}"
                text-color="${args['text-color']}"
                indicator-color="${args['indicator-color']}"
                scroll-buttons="${args['scroll-buttons']}"
            >
                <ui-tab-list aria-label="Playground tabs">
                    <ui-tab value="tab1">Item One</ui-tab>
                    <ui-tab value="tab2">Item Two</ui-tab>
                    <ui-tab value="tab3">Item Three</ui-tab>
                </ui-tab-list>
                <ui-tab-panel value="tab1">
                    ${panelContent('Item One', 'Use the Controls panel below to explore all Tabs props — orientation, variant, color, centered, and scroll buttons.')}
                </ui-tab-panel>
                <ui-tab-panel value="tab2">
                    ${panelContent('Item Two', 'Switch between tabs to see the animated indicator slide to the active tab.')}
                </ui-tab-panel>
                <ui-tab-panel value="tab3">
                    ${panelContent('Item Three', 'Try vertical orientation and different color tokens.')}
                </ui-tab-panel>
            </ui-tabs>
        `)}`,
};

/* ================================================================== */
/* Basic                                                                */
/* ================================================================== */
export const Basic: Story = {
    render: () => wrap(html`
        <ui-tabs value="one">
            <ui-tab-list aria-label="Basic tabs example">
                <ui-tab value="one">Item One</ui-tab>
                <ui-tab value="two">Item Two</ui-tab>
                <ui-tab value="three">Item Three</ui-tab>
            </ui-tab-list>
            <ui-tab-panel value="one">${panelContent('Item One', 'Tabs make it easy to explore and switch between different views. Click the tabs above to navigate.')}</ui-tab-panel>
            <ui-tab-panel value="two">${panelContent('Item Two', 'Content for Item Two. The indicator slides smoothly from one tab to another.')}</ui-tab-panel>
            <ui-tab-panel value="three">${panelContent('Item Three', 'Content for Item Three. Tab keyboard navigation: use ArrowLeft / ArrowRight to move focus between tabs.')}</ui-tab-panel>
        </ui-tabs>
    `),
};

/* ================================================================== */
/* Wrapped Labels                                                       */
/* ================================================================== */
export const WrappedLabels: Story = {
    render: () => wrap(html`
        <ui-tabs value="a">
            <ui-tab-list aria-label="Wrapped label tabs">
                <ui-tab value="a">Short</ui-tab>
                <ui-tab value="b">Somewhat longer label</ui-tab>
                <ui-tab value="c">A very long tab label that wraps</ui-tab>
                <ui-tab value="d">Medium label</ui-tab>
            </ui-tab-list>
            <ui-tab-panel value="a">${panelContent('Short', 'Long labels wrap onto the next line inside their tab. The indicator still aligns correctly.')}</ui-tab-panel>
            <ui-tab-panel value="b">${panelContent('Somewhat longer label', 'Labels flow naturally according to their content width.')}</ui-tab-panel>
            <ui-tab-panel value="c">${panelContent('A very long tab label that wraps', 'This tab has an unusually long label to demonstrate wrapping behaviour.')}</ui-tab-panel>
            <ui-tab-panel value="d">${panelContent('Medium label', 'Medium length content.')}</ui-tab-panel>
        </ui-tabs>
    `),
};

/* ================================================================== */
/* Colored                                                              */
/* ================================================================== */
export const Colored: Story = {
    render: () => html`
        <div style="display:flex;flex-direction:column;gap:24px;">
            ${[
            { label: 'Primary (default)', text: 'primary', ind: 'primary' },
            { label: 'Secondary', text: 'secondary', ind: 'secondary' },
            { label: 'Inherit (from parent)', text: 'inherit', ind: 'primary' },
            { label: 'Custom — #f59e0b amber', text: '#f59e0b', ind: '#f59e0b' },
            { label: 'Custom — #10b981 emerald', text: '#10b981', ind: '#10b981' },
            { label: 'Custom — #ef4444 red', text: '#ef4444', ind: '#ef4444' },
        ].map(c => html`
                <div>
                    <p style="margin:0 0 6px;font-size:.75rem;color:#6b7280;font-weight:600;
                               text-transform:uppercase;letter-spacing:.06em;font-family:Inter,sans-serif;">
                        ${c.label}
                    </p>
                    ${wrap(html`
                        <ui-tabs value="a" text-color="${c.text}" indicator-color="${c.ind}">
                            <ui-tab-list>
                                <ui-tab value="a">Tab One</ui-tab>
                                <ui-tab value="b">Tab Two</ui-tab>
                                <ui-tab value="c">Tab Three</ui-tab>
                            </ui-tab-list>
                            <ui-tab-panel value="a">
                                <p style="font-family:Inter,sans-serif;font-size:.875rem;color:#374151;margin:0;">
                                    text-color="${c.text}" · indicator-color="${c.ind}"
                                </p>
                            </ui-tab-panel>
                            <ui-tab-panel value="b">Tab Two content</ui-tab-panel>
                            <ui-tab-panel value="c">Tab Three content</ui-tab-panel>
                        </ui-tabs>
                    `)}
                </div>
            `)}
        </div>`,
};

/* ================================================================== */
/* Disabled Tab                                                         */
/* ================================================================== */
export const DisabledTab: Story = {
    render: () => wrap(html`
        <ui-tabs value="active">
            <ui-tab-list aria-label="Tabs with a disabled tab">
                <ui-tab value="active">Active</ui-tab>
                <ui-tab value="disabled" disabled>Disabled</ui-tab>
                <ui-tab value="also">Also Active</ui-tab>
            </ui-tab-list>
            <ui-tab-panel value="active">
                ${panelContent('Active Tab', 'The middle tab is disabled and cannot be selected — it receives a muted style and ignores all click/keyboard events.')}
            </ui-tab-panel>
            <ui-tab-panel value="disabled">You should never see this.</ui-tab-panel>
            <ui-tab-panel value="also">${panelContent('Also Active Tab', 'Arrow-key navigation skips the disabled tab.')}</ui-tab-panel>
        </ui-tabs>
    `),
};

/* ================================================================== */
/* Fixed / Full Width                                                   */
/* ================================================================== */
export const FullWidth: Story = {
    render: () => html`
        <div style="display:flex;flex-direction:column;gap:24px;">
            <div>
                <p style="font-family:Inter,sans-serif;font-size:.75rem;color:#6b7280;font-weight:600;
                           text-transform:uppercase;letter-spacing:.06em;margin:0 0 6px;">
                    variant="fullWidth" — 3 tabs
                </p>
                ${wrap(html`
                    <ui-tabs value="recents" variant="fullWidth">
                        <ui-tab-list aria-label="Full width 3 tabs">
                            <ui-tab value="recents">Recents</ui-tab>
                            <ui-tab value="favorites">Favorites</ui-tab>
                            <ui-tab value="nearby">Nearby</ui-tab>
                        </ui-tab-list>
                        <ui-tab-panel value="recents">${panelContent('Recents', 'Each tab takes an equal third of the container width.')}</ui-tab-panel>
                        <ui-tab-panel value="favorites">${panelContent('Favorites', 'Good for mobile viewports where every pixel counts.')}</ui-tab-panel>
                        <ui-tab-panel value="nearby">${panelContent('Nearby', 'The indicator stretches to fill the full tab width.')}</ui-tab-panel>
                    </ui-tabs>
                `)}
            </div>
            <div>
                <p style="font-family:Inter,sans-serif;font-size:.75rem;color:#6b7280;font-weight:600;
                           text-transform:uppercase;letter-spacing:.06em;margin:0 0 6px;">
                    variant="fullWidth" — 2 tabs
                </p>
                ${wrap(html`
                    <ui-tabs value="a" variant="fullWidth">
                        <ui-tab-list aria-label="Full width 2 tabs">
                            <ui-tab value="a">Sign In</ui-tab>
                            <ui-tab value="b">Sign Up</ui-tab>
                        </ui-tab-list>
                        <ui-tab-panel value="a">${panelContent('Sign In', 'Common pattern for auth flows — two equal panels.')}</ui-tab-panel>
                        <ui-tab-panel value="b">${panelContent('Sign Up', 'Indicator spans the full half-width.')}</ui-tab-panel>
                    </ui-tabs>
                `)}
            </div>
        </div>`,
};

/* ================================================================== */
/* Centered                                                             */
/* ================================================================== */
export const Centered: Story = {
    render: () => wrap(html`
        <ui-tabs value="one" centered>
            <ui-tab-list aria-label="Centered tabs">
                <ui-tab value="one">Item One</ui-tab>
                <ui-tab value="two">Item Two</ui-tab>
                <ui-tab value="three">Item Three</ui-tab>
            </ui-tab-list>
            <ui-tab-panel value="one">${panelContent('Centered Tabs', 'The centered prop makes tabs cluster at the horizontal centre of their container — useful for larger viewports.')}</ui-tab-panel>
            <ui-tab-panel value="two">${panelContent('Item Two', 'Works perfectly with standard variant.')}</ui-tab-panel>
            <ui-tab-panel value="three">${panelContent('Item Three', 'The indicator still aligns perfectly with the active tab.')}</ui-tab-panel>
        </ui-tabs>
    `),
};

/* ================================================================== */
/* Scrollable Tabs                                                      */
/* ================================================================== */
const menuItems = ['Appetizers', 'Soups', 'Salads', 'Mains', 'Pasta', 'Pizza', 'Seafood', 'Grill', 'Vegan', 'Desserts', 'Drinks', 'Specials'];

export const Scrollable: Story = {
    render: () => wrap(html`
        <ui-tabs value="Appetizers" variant="scrollable" scroll-buttons="auto">
            <ui-tab-list aria-label="Scrollable restaurant menu">
                ${menuItems.map(m => html`<ui-tab value="${m}">${m}</ui-tab>`)}
            </ui-tab-list>
            ${menuItems.map(m => html`
                <ui-tab-panel value="${m}">
                    ${panelContent(m, `Content for the ${m} section. Scroll the tab bar left or right using the arrow buttons, shift+scroll-wheel, or a swipe gesture.`)}
                </ui-tab-panel>`)}
        </ui-tabs>
    `),
};

/* ================================================================== */
/* Forced Scroll Buttons vs None                                        */
/* ================================================================== */
export const ScrollButtons: Story = {
    render: () => html`
        <div style="display:flex;flex-direction:column;gap:24px;font-family:Inter,sans-serif;">
            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    scroll-buttons="auto" — arrow buttons appear when tabs overflow
                </p>
                ${wrap(html`
                    <ui-tabs value="Tab 1" variant="scrollable" scroll-buttons="auto">
                        <ui-tab-list aria-label="Auto scroll buttons">
                            ${Array.from({ length: 12 }, (_, i) => html`<ui-tab value="Tab ${i + 1}">Tab ${i + 1}</ui-tab>`)}
                        </ui-tab-list>
                        ${Array.from({ length: 12 }, (_, i) => html`
                            <ui-tab-panel value="Tab ${i + 1}">
                                ${panelContent(`Tab ${i + 1}`, 'Scroll buttons appear at each end of the tab bar. Click them or use the keyboard.')}
                            </ui-tab-panel>`)}
                    </ui-tabs>
                `)}
            </div>

            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    scroll-buttons="false" — no buttons; scroll via swipe or shift+scroll-wheel
                </p>
                ${wrap(html`
                    <ui-tabs value="Tab 1" variant="scrollable" scroll-buttons="false">
                        <ui-tab-list aria-label="No scroll buttons — native scroll">
                            ${Array.from({ length: 12 }, (_, i) => html`<ui-tab value="Tab ${i + 1}">Tab ${i + 1}</ui-tab>`)}
                        </ui-tab-list>
                        ${Array.from({ length: 12 }, (_, i) => html`
                            <ui-tab-panel value="Tab ${i + 1}">
                                ${panelContent(`Tab ${i + 1}`, 'No scroll arrow buttons are ever shown. Scrolling is entirely through user agent mechanisms (shift+wheel, swipe, etc.).')}
                            </ui-tab-panel>`)}
                    </ui-tabs>
                `)}
            </div>
        </div>`,
};

/* ================================================================== */
/* Vertical Tabs                                                        */
/* ================================================================== */
export const Vertical: Story = {
    render: () => html`
        <div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;
                    box-shadow:0 2px 8px rgba(0,0,0,.06);background:#fff;
                    display:flex;min-height:280px;">
            <ui-tabs value="one" orientation="vertical" style="display:flex;width:100%;">
                <ui-tab-list aria-label="Vertical tabs" style="width:160px;flex-shrink:0;">
                    <ui-tab value="one">Item One</ui-tab>
                    <ui-tab value="two">Item Two</ui-tab>
                    <ui-tab value="three">Item Three</ui-tab>
                    <ui-tab value="four">Item Four</ui-tab>
                    <ui-tab value="five">Item Five</ui-tab>
                </ui-tab-list>
                <div style="flex:1;">
                    <ui-tab-panel value="one">${panelContent('Item One', 'Use orientation="vertical" to place tabs on the left. The indicator moves vertically.')}</ui-tab-panel>
                    <ui-tab-panel value="two">${panelContent('Item Two', 'Arrow keys Up/Down navigate between vertical tabs.')}</ui-tab-panel>
                    <ui-tab-panel value="three">${panelContent('Item Three', 'Combine with any variant — standard, fullWidth, or scrollable.')}</ui-tab-panel>
                    <ui-tab-panel value="four">${panelContent('Item Four', 'Common pattern for settings pages and dashboards.')}</ui-tab-panel>
                    <ui-tab-panel value="five">${panelContent('Item Five', 'The right border becomes the separator between the tab list and panel.')}</ui-tab-panel>
                </div>
            </ui-tabs>
        </div>`,
};

/* ================================================================== */
/* Vertical Scrollable                                                  */
/* ================================================================== */
export const VerticalScrollable: Story = {
    render: () => html`
        <div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;
                    box-shadow:0 2px 8px rgba(0,0,0,.06);background:#fff;
                    display:flex;height:260px;">
            <ui-tabs value="0" orientation="vertical" variant="scrollable"
                     scroll-buttons="auto" style="display:flex;width:100%;">
                <ui-tab-list aria-label="Vertical scrollable" style="width:160px;flex-shrink:0;">
                    ${Array.from({ length: 10 }, (_, i) => html`<ui-tab value="${i}">Menu ${i + 1}</ui-tab>`)}
                </ui-tab-list>
                <div style="flex:1;overflow:auto;">
                    ${Array.from({ length: 10 }, (_, i) => html`
                        <ui-tab-panel value="${i}">
                            ${panelContent(`Menu ${i + 1}`, `Vertical scrollable tabs — combined with scroll-buttons="auto" for up/down arrow buttons.`)}
                        </ui-tab-panel>`)}
                </div>
            </ui-tabs>
        </div>`,
};

/* ================================================================== */
/* Nav Tabs                                                             */
/* ================================================================== */
export const NavTabs: Story = {
    render: () => html`
        <div style="font-family:Inter,sans-serif;display:flex;flex-direction:column;gap:24px;">
            <p style="margin:0;font-size:.875rem;color:#374151;">
                Set <code style="background:#f3f4f6;padding:2px 5px;border-radius:4px;">href</code>
                on a tab to render it as an <code style="background:#f3f4f6;padding:2px 5px;border-radius:4px;">&lt;a&gt;</code>
                element — perfect for hash-based or client-side navigation.
            </p>
            ${wrap(html`
                <ui-tabs value="home">
                    <ui-tab-list aria-label="Site navigation tabs">
                        <ui-tab value="home"     href="#home">Home</ui-tab>
                        <ui-tab value="portfolio" href="#portfolio">Portfolio</ui-tab>
                        <ui-tab value="about"    href="#about">About</ui-tab>
                        <ui-tab value="contact"  href="#contact">Contact</ui-tab>
                    </ui-tab-list>
                    <ui-tab-panel value="home">
                        ${panelContent('Home', 'Nav tabs render anchor elements. The href navigates the page; clicking also selects the tab.')}
                    </ui-tab-panel>
                    <ui-tab-panel value="portfolio">${panelContent('Portfolio', 'Check your browser\'s address bar — the hash updated!')}</ui-tab-panel>
                    <ui-tab-panel value="about">${panelContent('About', 'Useful for multi-page apps using hash routing.')}</ui-tab-panel>
                    <ui-tab-panel value="contact">${panelContent('Contact', 'All accessibility attributes are preserved on the anchor element.')}</ui-tab-panel>
                </ui-tabs>
            `)}
        </div>`,
};

/* ================================================================== */
/* Icon Position                                                        */
/* ================================================================== */
export const IconPosition: Story = {
    render: () => html`
        <div style="display:flex;flex-direction:column;gap:24px;">
            ${(['top', 'bottom', 'start', 'end'] as const).map(pos => html`
                <div>
                    <p style="font-family:Inter,sans-serif;margin:0 0 6px;font-size:.75rem;color:#6b7280;
                               font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                        icon-position="${pos}"
                    </p>
                    ${wrap(html`
                        <ui-tabs value="calls">
                            <ui-tab-list>
                                <ui-tab value="calls"    icon-position="${pos}">${iconPhone}Calls</ui-tab>
                                <ui-tab value="favorites" icon-position="${pos}">${iconFavorite}Favorites</ui-tab>
                                <ui-tab value="nearby"   icon-position="${pos}">${iconLocation}Nearby</ui-tab>
                            </ui-tab-list>
                            <ui-tab-panel value="calls">${panelContent('Calls', `Icons positioned at: ${pos}`)}</ui-tab-panel>
                            <ui-tab-panel value="favorites">${panelContent('Favorites', `Icon on the ${pos}`)}</ui-tab-panel>
                            <ui-tab-panel value="nearby">${panelContent('Nearby', `Icon on the ${pos}`)}</ui-tab-panel>
                        </ui-tabs>
                    `)}
                </div>`)}
        </div>`,
};

/* ================================================================== */
/* Icon-Only Tabs                                                       */
/* ================================================================== */
export const IconOnly: Story = {
    render: () => wrap(html`
        <ui-tabs value="music">
            <ui-tab-list aria-label="Media tabs">
                <ui-tab value="music"    title="Music">${iconMusic}</ui-tab>
                <ui-tab value="person"   title="Profile">${iconPerson}</ui-tab>
                <ui-tab value="folder"   title="Files">${iconFolder}</ui-tab>
                <ui-tab value="settings" title="Settings">${iconSettings}</ui-tab>
                <ui-tab value="star"     title="Starred">${iconStar}</ui-tab>
            </ui-tab-list>
            <ui-tab-panel value="music">${panelContent('Music', 'Icon-only tabs — set the title attribute for accessible tooltips.')}</ui-tab-panel>
            <ui-tab-panel value="person">${panelContent('Profile', 'Compact horizontal tabs without text labels.')}</ui-tab-panel>
            <ui-tab-panel value="folder">${panelContent('Files', 'Good for toolbars and sidebars.')}</ui-tab-panel>
            <ui-tab-panel value="settings">${panelContent('Settings', 'Configure the app here.')}</ui-tab-panel>
            <ui-tab-panel value="star">${panelContent('Starred', 'Your starred items.')}</ui-tab-panel>
        </ui-tabs>
    `),
};

/* ================================================================== */
/* Mixed: Icon + Label side-by-side (start position)                  */
/* ================================================================== */
export const WithIcons: Story = {
    render: () => html`
        <div style="display:flex;flex-direction:column;gap:24px;">
            ${wrap(html`
                <ui-tabs value="recents" text-color="primary">
                    <ui-tab-list aria-label="Tabs with icons">
                        <ui-tab value="recents"   icon-position="start">${iconPhone}Recents</ui-tab>
                        <ui-tab value="favorites" icon-position="start">${iconFavorite}Favorites</ui-tab>
                        <ui-tab value="nearby"    icon-position="start">${iconLocation}Nearby</ui-tab>
                    </ui-tab-list>
                    <ui-tab-panel value="recents">${panelContent('Recents', 'Icons rendered inline to the left of their label (icon-position="start").')}</ui-tab-panel>
                    <ui-tab-panel value="favorites">${panelContent('Favorites', 'A clean, compact style for desktop navigation.')}</ui-tab-panel>
                    <ui-tab-panel value="nearby">${panelContent('Nearby', 'Works with all color variants and indicator colors.')}</ui-tab-panel>
                </ui-tabs>
            `)}
            ${wrap(html`
                <ui-tabs value="recents" text-color="secondary" indicator-color="secondary">
                    <ui-tab-list aria-label="Tabs with end icons">
                        <ui-tab value="recents"   icon-position="end">${iconPhone}Recents</ui-tab>
                        <ui-tab value="favorites" icon-position="end">${iconFavorite}Favorites</ui-tab>
                        <ui-tab value="nearby"    icon-position="end">${iconLocation}Nearby</ui-tab>
                    </ui-tab-list>
                    <ui-tab-panel value="recents">${panelContent('Recents', 'Icon right of label (icon-position="end") with secondary color theme.')}</ui-tab-panel>
                    <ui-tab-panel value="favorites">${panelContent('Favorites', 'Great for badge indicators placed at the end.')}</ui-tab-panel>
                    <ui-tab-panel value="nearby">${panelContent('Nearby', 'Tab panel content.')}</ui-tab-panel>
                </ui-tabs>
            `)}
        </div>`,
};

/* ================================================================== */
/* Controlled — external state management                              */
/* ================================================================== */
export const Controlled: Story = {
    render: () => html`
        <div data-controlled-demo style="font-family:Inter,sans-serif;">
            <div style="display:flex;gap:12px;margin-bottom:16px;">
                ${(['a', 'b', 'c'] as const).map(v => html`
                    <button
                        style="padding:8px 16px;border:1px solid #e5e7eb;background:#f9fafb;border-radius:6px;cursor:pointer;font-family:Inter,sans-serif;"
                        @click=${(e: MouseEvent) => {
                            const tabs = (e.target as HTMLElement)
                                .closest('[data-controlled-demo]')
                                ?.querySelector('ui-tabs') as (HTMLElement & { value: string }) | null;
                            if (tabs) tabs.value = v;
                        }}>Select ${v.toUpperCase()}</button>
                `)}
            </div>
            ${wrap(html`
                <ui-tabs value="a"
                    @ui-tab-change=${(e: CustomEvent) => {
                        (e.currentTarget as HTMLElement & { value: string }).value = e.detail.value;
                    }}>
                    <ui-tab-list aria-label="Controlled tabs">
                        <ui-tab value="a">Tab A</ui-tab>
                        <ui-tab value="b">Tab B</ui-tab>
                        <ui-tab value="c">Tab C</ui-tab>
                    </ui-tab-list>
                    <ui-tab-panel value="a">${panelContent('Controlled Tab A', 'Click the buttons above to change the active tab programmatically.')}</ui-tab-panel>
                    <ui-tab-panel value="b">${panelContent('Controlled Tab B', 'External state drives which tab is active — the component just reflects what it receives.')}</ui-tab-panel>
                    <ui-tab-panel value="c">${panelContent('Controlled Tab C', 'Works well with any state manager: Redux, signals, or plain JS.')}</ui-tab-panel>
                </ui-tabs>
            `)}
        </div>`,
};

/* ================================================================== */
/* Uncontrolled — default-value for initial state                     */
/* ================================================================== */
export const Uncontrolled: Story = {
    render: () => wrap(html`
        <ui-tabs default-value="b">
            <ui-tab-list aria-label="Uncontrolled tabs">
                <ui-tab value="a">Tab A</ui-tab>
                <ui-tab value="b">Tab B</ui-tab>
                <ui-tab value="c">Tab C</ui-tab>
            </ui-tab-list>
            <ui-tab-panel value="a">${panelContent('Uncontrolled Tab A', 'This component uses default-value="b" to initialize with Tab B active.')}</ui-tab-panel>
            <ui-tab-panel value="b">${panelContent('Uncontrolled Tab B', 'No value prop needed — the component manages its own state.')}</ui-tab-panel>
            <ui-tab-panel value="c">${panelContent('Uncontrolled Tab C', 'Good for simple use cases where you don\'t need to track the active tab externally.')}</ui-tab-panel>
        </ui-tabs>
    `),
};

/* ================================================================== */
/* Dark Mode                                                            */
/* ================================================================== */
export const DarkMode: Story = {
    render: () => html`
        <div style="display:flex;flex-direction:column;gap:24px;">
            <div class="ui-theme-dark" style="background:#111827;padding:0;border-radius:12px;overflow:hidden;
                        border:1px solid #374151;box-shadow:0 2px 8px rgba(0,0,0,.4);">
                <ui-tabs value="tab1">
                    <ui-tab-list aria-label="Dark mode tabs">
                        <ui-tab value="tab1">Dark Tab</ui-tab>
                        <ui-tab value="tab2">Another Tab</ui-tab>
                        <ui-tab value="tab3">Third Tab</ui-tab>
                    </ui-tab-list>
                    <ui-tab-panel value="tab1">
                        <div style="font-family:Inter,sans-serif;">
                            <h3 style="margin:0 0 8px;font-size:1rem;font-weight:600;color:#f9fafb;">Dark Mode</h3>
                            <p style="margin:0;font-size:.875rem;color:#9ca3af;line-height:1.6;">Apply .ui-theme-dark to any ancestor to enable the dark theme. All CSS variables adjust automatically.</p>
                        </div>
                    </ui-tab-panel>
                    <ui-tab-panel value="tab2">
                        <div style="font-family:Inter,sans-serif;">
                            <h3 style="margin:0 0 8px;font-size:1rem;font-weight:600;color:#f9fafb;">Better Contrast</h3>
                            <p style="margin:0;font-size:.875rem;color:#9ca3af;line-height:1.6;">All colors auto-adjust to dark backgrounds for readability.</p>
                        </div>
                    </ui-tab-panel>
                    <ui-tab-panel value="tab3">
                        <div style="font-family:Inter,sans-serif;">
                            <h3 style="margin:0 0 8px;font-size:1rem;font-weight:600;color:#f9fafb;">CSS Variables</h3>
                            <p style="margin:0;font-size:.875rem;color:#9ca3af;line-height:1.6;">Uses CSS custom properties for complete theme flexibility.</p>
                        </div>
                    </ui-tab-panel>
                </ui-tabs>
            </div>
            <p style="font-family:Inter,sans-serif;margin:0;font-size:.875rem;color:#6b7280;">
                Light mode (default) for comparison:
            </p>
            ${wrap(html`
                <ui-tabs value="tab1">
                    <ui-tab-list aria-label="Light mode tabs">
                        <ui-tab value="tab1">Light Tab</ui-tab>
                        <ui-tab value="tab2">Another Tab</ui-tab>
                        <ui-tab value="tab3">Third Tab</ui-tab>
                    </ui-tab-list>
                    <ui-tab-panel value="tab1">${panelContent('Light Mode', 'Default appearance without .ui-theme-dark.')}</ui-tab-panel>
                    <ui-tab-panel value="tab2">${panelContent('Standard Colors', 'Uses the default primary blue palette.')}</ui-tab-panel>
                    <ui-tab-panel value="tab3">${panelContent('Light Theme', 'White background with standard border color.')}</ui-tab-panel>
                </ui-tabs>
            `)}
        </div>`,
};

/* ================================================================== */
/* Accessibility                                                       */
/* ================================================================== */
export const Accessibility: Story = {
    render: () => wrap(html`
        <div style="font-family:Inter,sans-serif;">
            <div style="margin-bottom:16px;padding:12px;background:#eff6ff;border-left:4px solid #3b82f6;border-radius:4px;font-size:.875rem;color:#1e40af;">
                <strong>Keyboard Navigation:</strong> Use Arrow Left/Right (horizontal) or Arrow Up/Down (vertical) to navigate tabs. Press Home to go to the first tab, End for the last. Disabled tabs are skipped.
            </div>
            <ui-tabs value="home">
                <ui-tab-list aria-label="Main navigation tabs">
                    <ui-tab value="home">${iconLocation}Home</ui-tab>
                    <ui-tab value="profile">${iconPerson}Profile</ui-tab>
                    <ui-tab value="settings">${iconSettings}Settings</ui-tab>
                </ui-tab-list>
                <ui-tab-panel value="home">${panelContent('Home', 'Tab list has role="tablist" with aria-label. Each tab has role="tab", aria-selected, and aria-controls pointing to its panel.')}</ui-tab-panel>
                <ui-tab-panel value="profile">${panelContent('Profile', 'Tab panels have role="tabpanel" and aria-labelledby pointing back to their tab.')}</ui-tab-panel>
                <ui-tab-panel value="settings">${panelContent('Settings', 'All labels use semantic HTML. Focus management works with shadow DOM. Screen readers announce the tab structure correctly.')}</ui-tab-panel>
            </ui-tabs>
        </div>`,
    ),
};

/* ================================================================== */
/* Tab List Only (filter chips pattern)                                */
/* ================================================================== */
export const TabListOnly: Story = {
    render: () => html`
        <div style="font-family:Inter,sans-serif;">
            <p style="margin:0 0 12px;font-size:.875rem;color:#6b7280;">
                <code style="background:#f3f4f6;padding:2px 5px;border-radius:4px;">&lt;ui-tab-list&gt;</code>
                can be used standalone for filter chips, button groups, or other tab-like patterns (no panels needed).
                A <code style="background:#f3f4f6;padding:2px 5px;border-radius:4px;">ui-tab-click</code> event
                bubbles out so you can handle selection in your own logic.
            </p>
            ${wrap(html`
                <div @ui-tab-click=${(e: CustomEvent) => {
                    const list = (e.currentTarget as HTMLElement).querySelector('ui-tab-list');
                    if (!list) return;
                    list.querySelectorAll('ui-tab').forEach((t: Element) => {
                        (t as HTMLElement & { selected: boolean }).selected = t.getAttribute('value') === e.detail.value;
                    });
                }}>
                    <ui-tab-list aria-label="Filter tabs">
                        <ui-tab value="all" selected>All Items</ui-tab>
                        <ui-tab value="active">Active</ui-tab>
                        <ui-tab value="archived">Archived</ui-tab>
                        <ui-tab value="deleted">Deleted</ui-tab>
                    </ui-tab-list>
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
            <div style="display:flex;gap:8px;margin-bottom:16px;">
                <button style="padding:8px 16px;border:1px solid #e5e7eb;background:#3b82f6;color:white;border-radius:6px;cursor:pointer;"
                        @click=${(e: MouseEvent) => {
                            const container = (e.target as HTMLElement).closest('[data-dynamic-demo]');
                            const tabs = container?.querySelector('ui-tabs');
                            if (!tabs) return;
                            const allTabs = Array.from(tabs.querySelectorAll('ui-tab'));
                            const count = Math.max(...allTabs.map((t) => parseInt(t.getAttribute('value')?.replace('tab-', '') ?? '0') || 0)) + 1;
                            const newTab = document.createElement('ui-tab');
                            newTab.setAttribute('value', `tab-${count}`);
                            newTab.textContent = `Tab ${count}`;
                            const newPanel = document.createElement('ui-tab-panel');
                            newPanel.setAttribute('value', `tab-${count}`);
                            newPanel.innerHTML = `<div style="font-family:Inter,sans-serif;padding:24px;"><h3 style="margin:0 0 8px;font-size:1rem;font-weight:600;color:#111827;">Dynamic Tab ${count}</h3><p style="margin:0;font-size:.875rem;color:#6b7280;">Added at runtime to demonstrate dynamic tab creation.</p></div>`;
                            tabs.querySelector('ui-tab-list')?.appendChild(newTab);
                            tabs.appendChild(newPanel);
                        }}>Add Tab</button>
                <button style="padding:8px 16px;border:1px solid #e5e7eb;background:#ef4444;color:white;border-radius:6px;cursor:pointer;"
                        @click=${(e: MouseEvent) => {
                            const container = (e.target as HTMLElement).closest('[data-dynamic-demo]');
                            const tabs = container?.querySelector('ui-tabs') as (HTMLElement & { value: string }) | null;
                            if (!tabs) return;
                            const allTabs = tabs.querySelectorAll('ui-tab');
                            if (allTabs.length <= 1) return; // keep at least one tab
                            const lastTab = allTabs[allTabs.length - 1];
                            const lastPanel = tabs.querySelector(`ui-tab-panel[value="${lastTab.getAttribute('value')}"]`);
                            const wasActive = lastTab.getAttribute('value') === tabs.value;
                            lastTab.remove();
                            if (lastPanel) lastPanel.remove();
                            // if removed tab was active, switch to new last tab
                            if (wasActive) {
                                const remaining = tabs.querySelectorAll('ui-tab');
                                const newLast = remaining[remaining.length - 1];
                                if (newLast) tabs.value = newLast.getAttribute('value') ?? '';
                            }
                        }}>Remove Tab</button>
            </div>
            ${wrap(html`
                <ui-tabs value="tab-1">
                    <ui-tab-list aria-label="Dynamic tabs">
                        <ui-tab value="tab-1">Tab 1</ui-tab>
                        <ui-tab value="tab-2">Tab 2</ui-tab>
                        <ui-tab value="tab-3">Tab 3</ui-tab>
                    </ui-tab-list>
                    <ui-tab-panel value="tab-1">${panelContent('Dynamic Tab 1', 'Use Add/Remove buttons to dynamically add or remove tabs. The component re-syncs automatically.')}</ui-tab-panel>
                    <ui-tab-panel value="tab-2">${panelContent('Dynamic Tab 2', 'When tabs are added or removed, the component updates the tab list and panels.')}</ui-tab-panel>
                    <ui-tab-panel value="tab-3">${panelContent('Dynamic Tab 3', 'This is useful for tabbed interfaces that change content dynamically.')}</ui-tab-panel>
                </ui-tabs>
            `)}
        </div>`,
};

/* ================================================================== */
/* Responsive Tabs                                                     */
/* ================================================================== */
export const Responsive: Story = {
    render: () => html`
        <div style="font-family:Inter,sans-serif;display:flex;flex-direction:column;gap:24px;">
            <p style="margin:0;font-size:.875rem;color:#374151;">
                Two common patterns for adapting tabs across screen sizes — choose the one that fits your layout.
            </p>
            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    variant="scrollable" — natural on mobile, works at any width
                </p>
                ${wrap(html`
                    <ui-tabs value="home" variant="scrollable" scroll-buttons="auto">
                        <ui-tab-list aria-label="Scrollable navigation tabs">
                            <ui-tab value="home">Home</ui-tab>
                            <ui-tab value="products">Products</ui-tab>
                            <ui-tab value="services">Services</ui-tab>
                            <ui-tab value="about">About</ui-tab>
                            <ui-tab value="contact">Contact</ui-tab>
                        </ui-tab-list>
                        <ui-tab-panel value="home">${panelContent('Home', 'Tabs overflow into a scrollable strip with arrow buttons on each side.')}</ui-tab-panel>
                        <ui-tab-panel value="products">${panelContent('Products', 'Explore our wide range of high-quality products.')}</ui-tab-panel>
                        <ui-tab-panel value="services">${panelContent('Services', 'Professional services tailored to your needs.')}</ui-tab-panel>
                        <ui-tab-panel value="about">${panelContent('About', 'Learn about our company and mission.')}</ui-tab-panel>
                        <ui-tab-panel value="contact">${panelContent('Contact', 'Get in touch with us.')}</ui-tab-panel>
                    </ui-tabs>
                `)}
            </div>
            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    variant="fullWidth" — each tab expands to fill equal space
                </p>
                ${wrap(html`
                    <ui-tabs value="home" variant="fullWidth">
                        <ui-tab-list aria-label="Full-width navigation tabs">
                            <ui-tab value="home">Home</ui-tab>
                            <ui-tab value="products">Products</ui-tab>
                            <ui-tab value="services">Services</ui-tab>
                        </ui-tab-list>
                        <ui-tab-panel value="home">${panelContent('Home', 'Great for mobile layouts where the tab bar should always fill the container width.')}</ui-tab-panel>
                        <ui-tab-panel value="products">${panelContent('Products', 'All tabs share the width equally.')}</ui-tab-panel>
                        <ui-tab-panel value="services">${panelContent('Services', 'The indicator stretches to fill each tab.')}</ui-tab-panel>
                    </ui-tabs>
                `)}
            </div>
        </div>`,
};

/* ================================================================== */
/* Multi-Color Theme Tabs                                              */
/* ================================================================== */
export const MultiColorTheme: Story = {
    render: () => html`
        <div style="display:flex;flex-direction:column;gap:32px;font-family:Inter,sans-serif;">
            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    Interactive Dashboard Tabs
                </p>
                ${wrap(html`
                    <ui-tabs value="overview" text-color="primary" indicator-color="primary">
                        <ui-tab-list aria-label="Dashboard navigation">
                            <ui-tab value="overview">Overview</ui-tab>
                            <ui-tab value="analytics">Analytics</ui-tab>
                            <ui-tab value="reports">Reports</ui-tab>
                            <ui-tab value="settings" disabled>Settings</ui-tab>
                        </ui-tab-list>
                        <ui-tab-panel value="overview">${panelContent('Dashboard Overview', 'Real-time metrics and system status at a glance.')}</ui-tab-panel>
                        <ui-tab-panel value="analytics">${panelContent('Analytics', 'Detailed analytics and performance metrics for your application.')}</ui-tab-panel>
                        <ui-tab-panel value="reports">${panelContent('Reports', 'Generate, view, and export comprehensive reports.')}</ui-tab-panel>
                        <ui-tab-panel value="settings">${panelContent('Settings', 'Configure your dashboard preferences and notifications.')}</ui-tab-panel>
                    </ui-tabs>
                `)}
            </div>

            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    Accent Color Tabs
                </p>
                ${wrap(html`
                    <ui-tabs value="library" text-color="secondary" indicator-color="secondary">
                        <ui-tab-list aria-label="Content library tabs">
                            <ui-tab value="library">Library</ui-tab>
                            <ui-tab value="recent">Recent</ui-tab>
                            <ui-tab value="saved">Saved</ui-tab>
                        </ui-tab-list>
                        <ui-tab-panel value="library">${panelContent('Content Library', 'Browse your complete content collection.')}</ui-tab-panel>
                        <ui-tab-panel value="recent">${panelContent('Recently Viewed', 'Items you\'ve recently accessed.')}</ui-tab-panel>
                        <ui-tab-panel value="saved">${panelContent('Saved Items', 'Your bookmarks and favorite content.')}</ui-tab-panel>
                    </ui-tabs>
                `)}
            </div>
        </div>`,
};

/* ================================================================== */
/* Error States                                                        */
/* ================================================================== */
export const ErrorStates: Story = {
    render: () => html`
        <div style="font-family:Inter,sans-serif;display:flex;flex-direction:column;gap:24px;">
            <div>
                <p style="margin:0 0 6px;font-size:.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">
                    Form Tabs with Validation States
                </p>
                ${wrap(html`
                    <ui-tabs value="personal" text-color="primary">
                        <ui-tab-list aria-label="Form steps">
                            <ui-tab value="personal">Personal Info</ui-tab>
                            <ui-tab value="address">Address</ui-tab>
                            <ui-tab value="payment">Payment</ui-tab>
                            <ui-tab value="review">Review</ui-tab>
                        </ui-tab-list>
                        <ui-tab-panel value="personal">
                            ${panelContent('Personal Information', 'Enter your name, email, and phone number. All fields are required.')}
                        </ui-tab-panel>
                        <ui-tab-panel value="address">
                            ${panelContent('Shipping Address', 'Provide your complete shipping address for delivery.')}
                        </ui-tab-panel>
                        <ui-tab-panel value="payment">
                            ${panelContent('Payment Details', 'Enter your payment information securely.')}
                        </ui-tab-panel>
                        <ui-tab-panel value="review">
                            ${panelContent('Review Order', 'Double-check your information before submitting.')}
                        </ui-tab-panel>
                    </ui-tabs>
                `)}
            </div>
        </div>`,
};
