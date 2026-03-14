import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-list';
import '../divider/flint-divider';

const meta: Meta = {
    title: 'Data Display/List',
    component: 'flint-list',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'aria-required-children', enabled: false },
                    { id: 'color-contrast', enabled: false },
                    { id: 'button-name', enabled: false },
                    { id: 'landmark-unique', enabled: false },
                    { id: 'label', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
#### \`<flint-list>\`

flint-list: A wrapper for list items.

- **Tag**: \`<flint-list>\`
- **Class**: \`FlintList\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`disablePadding\` | \`disable-padding\` | \`boolean\` | \`false\` | Whether to disable the default padding on the list. |
| \`dense\` | \`dense\` | \`boolean\` | \`false\` | Whether to use compact spacing for list items. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-list-item-padding\` | \`8px 16px\` |
| \`--flint-list-item-gap\` | \`16px\` |
| \`--flint-hover-color\` | — |
| \`--flint-active-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-primary-color-light\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-font-family\` | — |
| \`--flint-text-color\` | — |
| \`--flint-surface-background\` | \`white\` |

---

#### \`<flint-list-item>\`

flint-list-item: A common list item.

- **Tag**: \`<flint-list-item>\`
- **Class**: \`FlintListItem\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-list-item-padding\` | \`8px 16px\` |
| \`--flint-list-item-gap\` | \`16px\` |

---

#### \`<flint-list-item-button>\`

flint-list-item-button: An action element inside a list item.

- **Tag**: \`<flint-list-item-button>\`
- **Class**: \`FlintListItemButton\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the list item button is disabled. |
| \`selected\` | \`selected\` | \`boolean\` | \`false\` | Whether the list item button is selected. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

---

#### \`<flint-list-item-icon>\`

flint-list-item-icon: An icon wrapper inside a list item.

- **Tag**: \`<flint-list-item-icon>\`
- **Class**: \`FlintListItemIcon\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

---

#### \`<flint-list-item-avatar>\`

flint-list-item-avatar: An avatar wrapper inside a list item.

- **Tag**: \`<flint-list-item-avatar>\`
- **Class**: \`FlintListItemAvatar\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

---

#### \`<flint-list-item-text>\`

flint-list-item-text: A container for text content.

- **Tag**: \`<flint-list-item-text>\`
- **Class**: \`FlintListItemText\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`primary\` | \`primary\` | \`string\` | \`''\` | Primary text content of the list item. |
| \`secondary\` | \`secondary\` | \`string\` | \`''\` | Secondary text content of the list item. |

#### Slots

| Name | Description |
|---|---|
| \`primary\` |  |
| \`secondary\` |  |

---

#### \`<flint-list-subheader>\`

flint-list-subheader: A label for a nested list.

- **Tag**: \`<flint-list-subheader>\`
- **Class**: \`FlintListSubheader\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |
                `,
            },
        },
    },
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-item>
        <flint-list-item-text primary="Item 1"></flint-list-item-text>
      </flint-list-item>
      <flint-list-item>
        <flint-list-item-text primary="Item 2"></flint-list-item-text>
      </flint-list-item>
      <flint-divider></flint-divider>
      <flint-list-item>
        <flint-list-item-text primary="Item 3" secondary="Secondary text here"></flint-list-item-text>
      </flint-list-item>
    </flint-list>
  `,
};

export const Interactive: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-item-button>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
        </flint-list-item-icon>
        <flint-list-item-text primary="Home"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </flint-list-item-icon>
        <flint-list-item-text primary="Profile"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </flint-list-item-icon>
        <flint-list-item-text primary="Settings"></flint-list-item-text>
      </flint-list-item-button>
    </flint-list>
  `,
};

export const WithAvatar: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-subheader>Recent Chats</flint-list-subheader>
      <flint-list-item-button>
        <flint-list-item-avatar>
          <div style="width: 40px; height: 40px; background: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">A</div>
        </flint-list-item-avatar>
        <flint-list-item-text primary="Alice Johnson" secondary="See you later!"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-avatar>
           <div style="width: 40px; height: 40px; background: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">B</div>
        </flint-list-item-avatar>
        <flint-list-item-text primary="Bob Smith" secondary="The report is ready."></flint-list-item-text>
      </flint-list-item-button>
    </flint-list>
  `,
};

export const NestedWithSubheader: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-subheader>Navigation</flint-list-subheader>
      <flint-list-item-button>
        <flint-list-item-text primary="Overview"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-text primary="Analytics"></flint-list-item-text>
      </flint-list-item-button>

      <flint-list-subheader>Account Settings</flint-list-subheader>
      <flint-list-item-button>
        <flint-list-item-text primary="Profile"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-text primary="Security"></flint-list-item-text>
      </flint-list-item-button>
    </flint-list>
  `,
};

export const WithSelected: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-subheader>Navigation</flint-list-subheader>
      <flint-list-item-button selected>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
        </flint-list-item-icon>
        <flint-list-item-text primary="Dashboard"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </flint-list-item-icon>
        <flint-list-item-text primary="Team"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </flint-list-item-icon>
        <flint-list-item-text primary="Projects"></flint-list-item-text>
      </flint-list-item-button>
    </flint-list>
  `,
};

export const WithDisabled: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-item-button>
        <flint-list-item-text primary="Active item"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button disabled>
        <flint-list-item-text primary="Disabled item" secondary="Cannot be clicked"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-text primary="Another active item"></flint-list-item-text>
      </flint-list-item-button>
    </flint-list>
  `,
};

export const Dense: Story = {
    render: () => html`
    <flint-list dense style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-subheader>Dense List</flint-list-subheader>
      <flint-list-item-button>
        <flint-list-item-text primary="Compact item 1"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-text primary="Compact item 2"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-text primary="Compact item 3"></flint-list-item-text>
      </flint-list-item-button>
    </flint-list>
  `,
};

export const WithTrailingActions: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-item-button>
        <flint-list-item-text primary="Alice Johnson" secondary="alice@example.com"></flint-list-item-text>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #4b5563;">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </flint-list-item-icon>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-text primary="Bob Smith" secondary="bob@example.com"></flint-list-item-text>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #4b5563;">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </flint-list-item-icon>
      </flint-list-item-button>
    </flint-list>
  `,
};
