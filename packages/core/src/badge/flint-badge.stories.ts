import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-badge';

const meta: Meta = {
    title: 'Data Display/Badge',
    component: 'flint-badge',
    parameters: {
        docs: {
            description: {
                component: `
A badge component that generates a small badge at the top-right of its children.

- **Tag**: \`<flint-badge>\`
- **Class**: \`FlintBadge\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`content\` | \`content\` | \`string\` | \`''\` | Text content displayed inside the badge. |
| \`dot\` | \`dot\` | \`boolean\` | \`false\` | Whether to display a small dot instead of content. |
| \`invisible\` | \`invisible\` | \`boolean\` | \`false\` | Whether the badge is hidden. |
| \`variant\` | \`variant\` | \`'primary' \\| 'secondary' \\| 'error' \\| 'success' \\| 'warning'\` | \`'primary'\` | Color variant of the badge. |
| \`max\` | \`max\` | \`number\` | \`99\` | Maximum numeric value before displaying "max+". |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | The content to which the badge is attached. |

#### CSS Parts

| Name | Description |
|---|---|
| \`base\` | The component's base wrapper element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-badge-background\` | \`var(--flint-primary-color\` |
| \`--flint-badge-color\` | \`var(--flint-text-color-on-primary\` |
| \`--flint-font-family\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-secondary-color\` | — |
| \`--flint-error-color\` | — |
| \`--flint-text-color-on-primary\` | — |
| \`--flint-success-color\` | — |
| \`--flint-warning-color\` | — |
                `,
            },
        },
    },
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
    args: {
        content: '4',
        dot: false,
        invisible: false,
        variant: 'primary',
        max: 99,
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
    render: (args) => html`
    <flint-badge
      .content=${args.content}
      .variant=${args.variant}
      ?dot=${args.dot}
      ?invisible=${args.invisible}
      .max=${args.max}
    >
      ${iconBox}
    </flint-badge>
  `,
};

export const Dot: Story = {
    args: {
        dot: true,
        variant: 'error',
    },
    render: (args) => html`
    <flint-badge ?dot=${args.dot} .variant=${args.variant}>
      <span style="font-size: 24px;">Notifications</span>
    </flint-badge>
  `,
};

export const MaxValue: Story = {
    args: {
        content: '150',
        max: 99,
        variant: 'error',
    },
    render: (args) => html`
    <flint-badge .content=${args.content} .max=${args.max} .variant=${args.variant}>
      <div style="width: 40px; height: 40px; background: #eee; border-radius: 50%;"></div>
    </flint-badge>
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
        <flint-badge .content=${args.content} .variant=${args.variant}>
          ${iconBox}
        </flint-badge>
      </div>
      <div>
        <p style="font-size: 12px; margin: 0 0 8px; color: #666;">Invisible</p>
        <flint-badge .content=${args.content} .variant=${args.variant} ?invisible=${args.invisible}>
          ${iconBox}
        </flint-badge>
      </div>
    </div>
  `,
};

export const Variants: Story = {
    render: (args) => html`
    <div style="display: flex; gap: 32px; padding: 20px; flex-wrap: wrap; align-items: flex-end;">
      <div style="text-align: center;">
        <p style="font-size: 12px; margin: 0 0 12px; color: #666;">primary</p>
        <flint-badge .content=${args.content} variant="primary" .max=${args.max} ?dot=${args.dot} ?invisible=${args.invisible}>
          <div style="width: 30px; height: 30px; background: #f0f0f0;"></div>
        </flint-badge>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 12px; margin: 0 0 12px; color: #666;">secondary</p>
        <flint-badge .content=${args.content} variant="secondary" .max=${args.max} ?dot=${args.dot} ?invisible=${args.invisible}>
          <div style="width: 30px; height: 30px; background: #f0f0f0;"></div>
        </flint-badge>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 12px; margin: 0 0 12px; color: #666;">success</p>
        <flint-badge .content=${args.content} variant="success" .max=${args.max} ?dot=${args.dot} ?invisible=${args.invisible}>
          <div style="width: 30px; height: 30px; background: #f0f0f0;"></div>
        </flint-badge>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 12px; margin: 0 0 12px; color: #666;">warning</p>
        <flint-badge .content=${args.content} variant="warning" .max=${args.max} ?dot=${args.dot} ?invisible=${args.invisible}>
          <div style="width: 30px; height: 30px; background: #f0f0f0;"></div>
        </flint-badge>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 12px; margin: 0 0 12px; color: #666;">error</p>
        <flint-badge .content=${args.content} variant="error" .max=${args.max} ?dot=${args.dot} ?invisible=${args.invisible}>
          <div style="width: 30px; height: 30px; background: #f0f0f0;"></div>
        </flint-badge>
      </div>
    </div>
  `,
};
