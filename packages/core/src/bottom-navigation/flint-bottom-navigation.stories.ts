import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-bottom-navigation';
import './flint-bottom-navigation-action';
import '../box/flint-box';

const meta: Meta = {
    title: 'Navigation/Bottom Navigation',
    component: 'flint-bottom-navigation',
    parameters: {
        docs: {
            description: {
                component: `
#### \`<flint-bottom-navigation-action>\`

Bottom Navigation Action: Individual navigation item.

- **Tag**: \`<flint-bottom-navigation-action>\`
- **Class**: \`FlintBottomNavigationAction\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`label\` | \`label\` | \`string\` | \`''\` | Label text for the action. |
| \`value\` | \`value\` | \`unknown\` | — | Unique value for this action. |
| \`active\` | \`active\` | \`boolean\` | \`false\` | If true, this action is currently selected. (Internal property managed by parent) |
| \`showLabel\` | \`show-label\` | \`boolean\` | \`true\` | Controls label visibility. (Internal property managed by parent) |

#### Slots

| Name | Description |
|---|---|
| \`icon\` | Icon element. |
| \`(default)\` | Label text. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-text-color-muted\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-font-family\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-shadow-lg\` | — |

---

#### \`<flint-bottom-navigation>\`

Bottom Navigation bars allow movement between primary destinations in an app.

- **Tag**: \`<flint-bottom-navigation>\`
- **Class**: \`FlintBottomNavigation\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`unknown\` | — | The value of the currently selected action. |
| \`defaultValue\` | \`default-value\` | \`unknown\` | — | Initial selected value for uncontrolled usage. Has no effect after the element has connected to the DOM. |
| \`showLabels\` | \`show-labels\` | \`boolean\` | \`false\` | If true, all labels are shown at all times. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-bottom-navigation-change\` | — | Dispatched when the selected value changes. detail: \`{ value: number \\| string }\` |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | destinations (flint-bottom-navigation-action). |
                `,
            },
        },
    },
    argTypes: {
        value: { control: 'text' },
        showLabels: { control: 'boolean' },
        label1: { control: 'text', name: 'Item 1 Label' },
        label2: { control: 'text', name: 'Item 2 Label' },
        label3: { control: 'text', name: 'Item 3 Label' },
        label4: { control: 'text', name: 'Item 4 Label' },
    },
    args: {
        value: 'recents',
        showLabels: true,
        label1: 'Recents',
        label2: 'Favorites',
        label3: 'Nearby',
        label4: 'Folder',
    },
};

export default meta;

type Story = StoryObj;

const icons = {
    restore: html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>`,
    favorites: html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
    nearby: html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    folder: html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
};

export const Basic: Story = {
    render: (args) => html`
        <flint-box width="500px" border="1px solid #ddd" bgcolor="var(--flint-muted-background, #f5f5f5)" style="padding-top: 50px;">
            <flint-bottom-navigation
                .value=${args.value}
                ?show-labels=${args.showLabels}
                @flint-bottom-navigation-change=${(e: Event) => {
                    const detail = (e as CustomEvent).detail;
                    console.log('Selection changed to:', detail.value);
                }}
            >
                <flint-bottom-navigation-action label=${args.label1} value="recents">
                    <span slot="icon">${icons.restore}</span>
                </flint-bottom-navigation-action>
                <flint-bottom-navigation-action label=${args.label2} value="favs">
                    <span slot="icon">${icons.favorites}</span>
                </flint-bottom-navigation-action>
                <flint-bottom-navigation-action label=${args.label3} value="nearby">
                    <span slot="icon">${icons.nearby}</span>
                </flint-bottom-navigation-action>
            </flint-bottom-navigation>
        </flint-box>
    `,
};

/**
 * With 4+ actions and show-labels omitted, only the active item shows its label.
 * This is the "shift" pattern: inactive items show icon only.
 */
export const ShiftLabels: Story = {
    args: {
        showLabels: false,
    },
    render: (args) => html`
        <flint-box width="500px" border="1px solid #ddd" bgcolor="var(--flint-muted-background, #f5f5f5)" style="padding-top: 50px;">
            <flint-bottom-navigation
                .value=${args.value}
                ?show-labels=${args.showLabels}
            >
                <flint-bottom-navigation-action label=${args.label1} value="recents">
                    <span slot="icon">${icons.restore}</span>
                </flint-bottom-navigation-action>
                <flint-bottom-navigation-action label=${args.label2} value="favs">
                    <span slot="icon">${icons.favorites}</span>
                </flint-bottom-navigation-action>
                <flint-bottom-navigation-action label=${args.label3} value="nearby">
                    <span slot="icon">${icons.nearby}</span>
                </flint-bottom-navigation-action>
                <flint-bottom-navigation-action label=${args.label4} value="folder">
                    <span slot="icon">${icons.folder}</span>
                </flint-bottom-navigation-action>
            </flint-bottom-navigation>
        </flint-box>
    `,
};

/**
 * Icon-only navigation: 4 actions with no label text and show-labels omitted.
 * Labels are hidden for all items including the active one.
 */
export const WithoutLabels: Story = {
    args: {
        value: 'favs',
        showLabels: false,
    },
    render: (args) => html`
        <flint-box width="500px" border="1px solid #ddd" bgcolor="var(--flint-muted-background, #f5f5f5)" style="padding-top: 50px;">
            <flint-bottom-navigation .value=${args.value} ?show-labels=${args.showLabels}>
                <flint-bottom-navigation-action value="recents">
                    <span slot="icon">${icons.restore}</span>
                </flint-bottom-navigation-action>
                <flint-bottom-navigation-action value="favs">
                    <span slot="icon">${icons.favorites}</span>
                </flint-bottom-navigation-action>
                <flint-bottom-navigation-action value="nearby">
                    <span slot="icon">${icons.nearby}</span>
                </flint-bottom-navigation-action>
                <flint-bottom-navigation-action value="folder">
                    <span slot="icon">${icons.folder}</span>
                </flint-bottom-navigation-action>
            </flint-bottom-navigation>
        </flint-box>
    `,
};
