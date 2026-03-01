import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-badge';

const meta: Meta = {
    title: 'Data Display/Badge',
    component: 'ui-badge',
    argTypes: {
        content: { control: 'text' },
        dot: { control: 'boolean' },
        invisible: { control: 'boolean' },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'success', 'warning'],
        },
        max: { control: 'number' },
    },
};

export default meta;

type Story = StoryObj;

const iconBox = html`
  <div style="width: 40px; height: 40px; background: #eee; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  </div>
`;

export const Basic: Story = {
    args: {
        content: '4',
        variant: 'primary',
        dot: false,
        invisible: false,
        max: 99,
    },
    render: (args) => html`
    <ui-badge
      .content=${args.content}
      .variant=${args.variant}
      ?dot=${args.dot}
      ?invisible=${args.invisible}
      .max=${args.max}
    >
      ${iconBox}
    </ui-badge>
  `,
};

export const Dot: Story = {
    args: {
        dot: true,
        variant: 'error',
    },
    render: (args) => html`
    <ui-badge ?dot=${args.dot} .variant=${args.variant}>
      <span style="font-size: 24px;">Notifications</span>
    </ui-badge>
  `,
};

export const MaxValue: Story = {
    args: {
        content: '150',
        max: 99,
        variant: 'error',
    },
    render: (args) => html`
    <ui-badge .content=${args.content} .max=${args.max} .variant=${args.variant}>
      <div style="width: 40px; height: 40px; background: #eee; border-radius: 50%;"></div>
    </ui-badge>
  `,
};

export const Invisible: Story = {
    args: {
        content: '5',
        invisible: true,
        variant: 'primary',
    },
    render: (args) => html`
    <div style="display: flex; gap: 32px; padding: 20px; align-items: center;">
      <div>
        <p style="font-size: 12px; margin: 0 0 8px; color: #666;">Visible</p>
        <ui-badge .content=${args.content} .variant=${args.variant}>
          ${iconBox}
        </ui-badge>
      </div>
      <div>
        <p style="font-size: 12px; margin: 0 0 8px; color: #666;">Invisible</p>
        <ui-badge .content=${args.content} .variant=${args.variant} ?invisible=${args.invisible}>
          ${iconBox}
        </ui-badge>
      </div>
    </div>
  `,
};

export const Variants: Story = {
    render: () => html`
    <div style="display: flex; gap: 32px; padding: 20px; flex-wrap: wrap; align-items: flex-end;">
      <div style="text-align: center;">
        <p style="font-size: 12px; margin: 0 0 12px; color: #666;">primary</p>
        <ui-badge content="5" variant="primary">
          <div style="width: 30px; height: 30px; background: #f0f0f0;"></div>
        </ui-badge>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 12px; margin: 0 0 12px; color: #666;">secondary</p>
        <ui-badge content="2" variant="secondary">
          <div style="width: 30px; height: 30px; background: #f0f0f0;"></div>
        </ui-badge>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 12px; margin: 0 0 12px; color: #666;">success</p>
        <ui-badge content="1" variant="success">
          <div style="width: 30px; height: 30px; background: #f0f0f0;"></div>
        </ui-badge>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 12px; margin: 0 0 12px; color: #666;">warning</p>
        <ui-badge content="!" variant="warning">
          <div style="width: 30px; height: 30px; background: #f0f0f0;"></div>
        </ui-badge>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 12px; margin: 0 0 12px; color: #666;">error</p>
        <ui-badge content="99" variant="error">
          <div style="width: 30px; height: 30px; background: #f0f0f0;"></div>
        </ui-badge>
      </div>
    </div>
  `,
};
