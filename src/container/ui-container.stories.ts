import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-container';

const meta: Meta = {
    title: 'Layout/Container',
    component: 'ui-container',
    argTypes: {
        maxWidth: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg', 'xl', false],
        },
        fixed: { control: 'boolean' },
        disableGutters: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj;

const placeholderContent = html`
  <div style="background-color: #cfe8fc; height: 100vh; padding: 24px; border: 1px solid #3b82f6; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-family: Inter, sans-serif; font-size: 1.25rem;">
    Content inside Container
  </div>
`;

const demoBox = (label: string) => html`
  <div style="background-color: #e5e7eb; padding: 20px; text-align: center; font-family: Inter;">
    ${label}
  </div>
`;

export const Basic: Story = {
    args: {
        maxWidth: 'sm',
        fixed: false,
        disableGutters: false,
    },
    render: (args) => html`
    <ui-container
      .maxWidth=${args.maxWidth}
      ?fixed=${args.fixed}
      .disableGutters=${args.disableGutters}
    >
      ${placeholderContent}
    </ui-container>
  `,
};

export const FluidXs: Story = {
    render: () => html`
    <ui-container max-width="xs">
      ${demoBox('maxWidth="xs" — 444px')}
    </ui-container>
  `,
};

export const FluidSm: Story = {
    render: () => html`
    <ui-container max-width="sm">
      ${demoBox('maxWidth="sm" — 600px')}
    </ui-container>
  `,
};

export const FluidMd: Story = {
    render: () => html`
    <ui-container max-width="md">
      ${demoBox('maxWidth="md" — 900px')}
    </ui-container>
  `,
};

export const FluidLg: Story = {
    render: () => html`
    <ui-container max-width="lg">
      ${demoBox('maxWidth="lg" — 1200px (default)')}
    </ui-container>
  `,
};

export const FluidXl: Story = {
    render: () => html`
    <ui-container max-width="xl">
      ${demoBox('maxWidth="xl" — 1536px')}
    </ui-container>
  `,
};

export const NoMaxWidth: Story = {
    render: () => html`
    <ui-container .maxWidth=${false}>
      ${demoBox('maxWidth=false — fully fluid, no max-width constraint')}
    </ui-container>
  `,
};

export const Fixed: Story = {
    render: () => html`
    <ui-container fixed>
      ${demoBox('fixed — steps through breakpoints up to xl')}
    </ui-container>
  `,
};

export const FixedXs: Story = {
    render: () => html`
    <ui-container fixed max-width="xs">
      ${demoBox('fixed + maxWidth="xs" — caps at 444px regardless of viewport')}
    </ui-container>
  `,
};

export const FixedSm: Story = {
    render: () => html`
    <ui-container fixed max-width="sm">
      ${demoBox('fixed + maxWidth="sm" — steps xs→sm, then caps at 600px')}
    </ui-container>
  `,
};

export const FixedMd: Story = {
    render: () => html`
    <ui-container fixed max-width="md">
      ${demoBox('fixed + maxWidth="md" — steps xs→sm→md, then caps at 900px')}
    </ui-container>
  `,
};

export const DisableGutters: Story = {
    render: () => html`
    <ui-container disable-gutters max-width="md">
      ${demoBox('disableGutters — padding removed')}
    </ui-container>
  `,
};

export const DisableGuttersFixed: Story = {
    render: () => html`
    <ui-container disable-gutters fixed max-width="md">
      ${demoBox('disableGutters + fixed — no gutters, snaps to breakpoints')}
    </ui-container>
  `,
};
