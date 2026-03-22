import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-fab';
import '../box/flint-box';

const meta: Meta = {
  title: 'Inputs/FAB',
  component: 'flint-fab',
  parameters: {
      docs: {
            description: {
                component: `
A floating action button (FAB) represents the primary action of a screen.

- **Tag**: \`<flint-fab>\`
- **Class**: \`FlintFab\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`extended\` | \`extended\` | \`boolean\` | \`false\` |  |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` |  |
| \`label\` | \`label\` | \`string\` | \`'Action'\` | Accessible label for icon-only (non-extended) FABs. |
| \`position\` | \`position\` | \`'bottom-right' \\| 'bottom-left' \\| 'top-right' \\| 'top-left' \\| 'static'\` | \`'bottom-right'\` |  |

#### Slots

| Name | Description |
|---|---|
| \`icon\` | The icon to display inside the FAB. |
| \`(default)\` | Default slot for icon content (icon-only FAB). |
| \`label\` | The label to display in the extended FAB. |

#### CSS Parts

| Name | Description |
|---|---|
| \`base\` | The component's base wrapper element. |
| \`icon\` | The icon container. |
| \`label\` | The label element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-fab-size\` | — |
| \`--flint-fab-radius\` | — |
| \`--flint-fab-background\` | — |
| \`--flint-fab-color\` | — |
| \`--flint-fab-shadow\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-text-color-on-primary\` | — |
| \`--flint-shadow-lg\` | — |
| \`--flint-shadow-xl\` | — |
| \`--flint-font-family\` | — |
                `,
            },
        },
  },
  argTypes: {
    extended: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    position: {
      control: { type: 'select' },
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'static'],
    },
  },
  args: {
    extended: false,
    disabled: false,
    label: 'Add',
    position: 'static',
  },
};

export default meta;

type Story = StoryObj;

const plusIcon = html`
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
`;

const editIcon = html`
  <svg slot="icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
`;

export const Regular: Story = {
  args: {
    extended: false,
    disabled: false,
    label: 'Add',
    position: 'static',
  },
  render: (args) => html`
    <flint-fab .extended=${args.extended} .disabled=${args.disabled} .label=${args.label} .position=${args.position}>
      ${plusIcon}
    </flint-fab>
  `,
};

Regular.play = async ({ canvasElement }) => {
    const fab = canvasElement.querySelector('flint-fab') as HTMLElement;
    await waitFor(() => expect(fab).toBeTruthy());
    const btn = fab.shadowRoot!.querySelector('button') as HTMLButtonElement;
    if (btn) {
        expect(btn.disabled).toBe(false);
        await userEvent.click(btn);
    }
};

export const Extended: Story = {
  args: {
    extended: true,
    disabled: false,
    position: 'static',
  },
  render: (args) => html`
    <flint-fab .extended=${args.extended} .disabled=${args.disabled} .position=${args.position}>
      ${editIcon}
      <span slot="label">Compose</span>
    </flint-fab>
  `,
};

export const Floating: Story = {
  args: {
    extended: false,
    position: 'bottom-right',
  },
  render: (args) => html`
    <flint-box height="300px" p="20px" bgcolor="var(--flint-muted-background, #f9fafb)" style="border: 1px dashed #ccc; position: relative;">
      <p style="font-family: sans-serif; color: #4b5563; font-size: 14px;">
        The FAB is fixed to the viewport corner specified by the <code>position</code> prop.
        Change the position using the controls panel.
      </p>
      <flint-fab .extended=${args.extended} .position=${args.position} label="Add">
        ${plusIcon}
      </flint-fab>
    </flint-box>
  `,
};

export const Positions: Story = {
  args: {},
  render: (args) => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap; padding: 16px; align-items: center;">
      ${(['bottom-right', 'bottom-left', 'top-right', 'top-left'] as const).map(pos => html`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <flint-fab position="static" ?disabled=${args.disabled} label="${pos}">
            ${plusIcon}
          </flint-fab>
          <span style="font-size: 12px; font-family: sans-serif; color: #4b5563;">${pos}</span>
        </div>
      `)}
    </div>
    <p style="font-size: 12px; font-family: sans-serif; color: #4b5563; margin-top: 16px; padding: 0 16px;">
      Shown as <code>position="static"</code> for demo purposes.
      In production, each value pins the FAB to that corner of the viewport.
    </p>
  `,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => html`
    <div style="display: flex; gap: 24px; align-items: center; padding: 16px;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <flint-fab position="static" ?disabled=${args.disabled} label="Add">
          ${plusIcon}
        </flint-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #4b5563;">enabled</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <flint-fab position="static" ?disabled=${args.disabled} label="Add">
          ${plusIcon}
        </flint-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #4b5563;">disabled</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <flint-fab position="static" extended ?disabled=${args.disabled}>
          ${editIcon}
          <span slot="label">Compose</span>
        </flint-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #4b5563;">extended + disabled</span>
      </div>
    </div>
  `,
};

export const CustomColors: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap; padding: 16px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <flint-fab position="static" label="Add"
          style="--flint-fab-background: #059669; --flint-fab-color: white;">
          ${plusIcon}
        </flint-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #4b5563;">green</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <flint-fab position="static" label="Add"
          style="--flint-fab-background: #f59e0b; --flint-fab-color: #1f2937;">
          ${plusIcon}
        </flint-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #4b5563;">amber</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <flint-fab position="static" label="Add"
          style="--flint-fab-background: #dc2626; --flint-fab-color: white;">
          ${plusIcon}
        </flint-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #4b5563;">red</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <flint-fab position="static" label="Add"
          style="--flint-fab-background: #1f2937; --flint-fab-color: white;">
          ${plusIcon}
        </flint-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #4b5563;">dark</span>
      </div>
    </div>
  `,
};
