import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-fab';

const meta: Meta = {
    title: 'Components/FAB',
    component: 'ui-fab',
    argTypes: {
        extended: { control: 'boolean' },
        disabled: { control: 'boolean' },
        label: { control: 'text' },
        position: {
            control: { type: 'select' },
            options: ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'static'],
        },
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
    <ui-fab .extended=${args.extended} .disabled=${args.disabled} .label=${args.label} .position=${args.position}>
      ${plusIcon}
    </ui-fab>
  `,
};

export const Extended: Story = {
    args: {
        extended: true,
        disabled: false,
        position: 'static',
    },
    render: (args) => html`
    <ui-fab .extended=${args.extended} .disabled=${args.disabled} .position=${args.position}>
      ${editIcon}
      <span slot="label">Compose</span>
    </ui-fab>
  `,
};

export const Floating: Story = {
    args: {
        extended: false,
        position: 'bottom-right',
    },
    render: (args) => html`
    <div style="height: 300px; border: 1px dashed #ccc; position: relative; padding: 20px; background: #f9fafb;">
      <p style="font-family: sans-serif; color: #6b7280; font-size: 14px;">
        The FAB is fixed to the viewport corner specified by the <code>position</code> prop.
        Change the position using the controls panel.
      </p>
      <ui-fab .extended=${args.extended} .position=${args.position} label="Add">
        ${plusIcon}
      </ui-fab>
    </div>
  `,
};

export const Positions: Story = {
    render: () => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap; padding: 16px; align-items: center;">
      ${(['bottom-right', 'bottom-left', 'top-right', 'top-left'] as const).map(pos => html`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <ui-fab position="static" label="${pos}">
            ${plusIcon}
          </ui-fab>
          <span style="font-size: 12px; font-family: sans-serif; color: #6b7280;">${pos}</span>
        </div>
      `)}
    </div>
    <p style="font-size: 12px; font-family: sans-serif; color: #9ca3af; margin-top: 16px; padding: 0 16px;">
      Shown as <code>position="static"</code> for demo purposes.
      In production, each value pins the FAB to that corner of the viewport.
    </p>
  `,
};

export const Disabled: Story = {
    render: () => html`
    <div style="display: flex; gap: 24px; align-items: center; padding: 16px;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <ui-fab position="static" label="Add">
          ${plusIcon}
        </ui-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #6b7280;">enabled</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <ui-fab position="static" disabled label="Add">
          ${plusIcon}
        </ui-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #6b7280;">disabled</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <ui-fab position="static" extended disabled>
          ${editIcon}
          <span slot="label">Compose</span>
        </ui-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #6b7280;">extended + disabled</span>
      </div>
    </div>
  `,
};

export const CustomColors: Story = {
    render: () => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap; padding: 16px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <ui-fab position="static" label="Add"
          style="--ui-fab-background: #10b981; --ui-fab-color: white;">
          ${plusIcon}
        </ui-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #6b7280;">green</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <ui-fab position="static" label="Add"
          style="--ui-fab-background: #f59e0b; --ui-fab-color: #1f2937;">
          ${plusIcon}
        </ui-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #6b7280;">amber</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <ui-fab position="static" label="Add"
          style="--ui-fab-background: #ef4444; --ui-fab-color: white;">
          ${plusIcon}
        </ui-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #6b7280;">red</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <ui-fab position="static" label="Add"
          style="--ui-fab-background: #1f2937; --ui-fab-color: white;">
          ${plusIcon}
        </ui-fab>
        <span style="font-size: 12px; font-family: sans-serif; color: #6b7280;">dark</span>
      </div>
    </div>
  `,
};
