import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-container';

const meta: Meta = {
    title: 'Layout/Container',
    component: 'flint-container',
    parameters: {
        docs: {
            description: {
                component: `
- **Tag**: \`<flint-container>\`
- **Class**: \`FlintContainer\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`maxWidth\` | \`max-width\` | \`ContainerMaxWidth\` | \`'lg'\` | Determine the max-width of the container. |
| \`disableGutters\` | \`disable-gutters\` | \`boolean\` | \`false\` | If \`true\`, the left and right padding is removed. |
| \`fixed\` | \`fixed\` | \`boolean\` | \`false\` | Set the max-width to match the min-width of the current breakpoint. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-container-padding\` | \`16px\` |
| \`--flint-container-padding-sm\` | \`24px\` |
| \`--flint-container-xs\` | \`444px\` |
| \`--flint-container-sm\` | \`600px\` |
| \`--flint-container-md\` | \`900px\` |
| \`--flint-container-lg\` | \`1200px\` |
| \`--flint-container-xl\` | \`1536px\` |
                `,
            },
        },
    },
    argTypes: {
        maxWidth: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg', 'xl', false],
        },
        fixed: { control: 'boolean' },
        disableGutters: { control: 'boolean' },
    },
    args: {
        maxWidth: 'sm',
        fixed: false,
        disableGutters: false,
    },
};

export default meta;
type Story = StoryObj;

const placeholderContent = html`
  <div style="background-color: #dbeafe; height: 100vh; padding: 24px; border: 1px solid #3b82f6; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-family: Inter, sans-serif; font-size: 1.25rem;">
    Content inside Container
  </div>
`;

const demoBox = (label: string) => html`
  <div style="background-color: #e5e7eb; padding: 20px; text-align: center; font-family: Inter;">
    ${label}
  </div>
`;

export const Basic: Story = {
    render: (args) => html`
    <flint-container
      .maxWidth=${args.maxWidth}
      ?fixed=${args.fixed}
      .disableGutters=${args.disableGutters}
    >
      ${placeholderContent}
    </flint-container>
  `,
};

export const FluidXs: Story = {
    args: { maxWidth: 'xs' },
    render: (args) => html`
    <flint-container .maxWidth=${args.maxWidth} ?fixed=${args.fixed} .disableGutters=${args.disableGutters}>
      ${demoBox('maxWidth="xs" — 444px')}
    </flint-container>
  `,
};

export const FluidSm: Story = {
    args: { maxWidth: 'sm' },
    render: (args) => html`
    <flint-container .maxWidth=${args.maxWidth} ?fixed=${args.fixed} .disableGutters=${args.disableGutters}>
      ${demoBox('maxWidth="sm" — 600px')}
    </flint-container>
  `,
};

export const FluidMd: Story = {
    args: { maxWidth: 'md' },
    render: (args) => html`
    <flint-container .maxWidth=${args.maxWidth} ?fixed=${args.fixed} .disableGutters=${args.disableGutters}>
      ${demoBox('maxWidth="md" — 900px')}
    </flint-container>
  `,
};

export const FluidLg: Story = {
    args: { maxWidth: 'lg' },
    render: (args) => html`
    <flint-container .maxWidth=${args.maxWidth} ?fixed=${args.fixed} .disableGutters=${args.disableGutters}>
      ${demoBox('maxWidth="lg" — 1200px (default)')}
    </flint-container>
  `,
};

export const FluidXl: Story = {
    args: { maxWidth: 'xl' },
    render: (args) => html`
    <flint-container .maxWidth=${args.maxWidth} ?fixed=${args.fixed} .disableGutters=${args.disableGutters}>
      ${demoBox('maxWidth="xl" — 1536px')}
    </flint-container>
  `,
};

export const NoMaxWidth: Story = {
    args: { maxWidth: false },
    render: (args) => html`
    <flint-container .maxWidth=${args.maxWidth} ?fixed=${args.fixed} .disableGutters=${args.disableGutters}>
      ${demoBox('maxWidth=false — fully fluid, no max-width constraint')}
    </flint-container>
  `,
};

export const Fixed: Story = {
    args: { fixed: true, maxWidth: 'xl' },
    render: (args) => html`
    <flint-container .maxWidth=${args.maxWidth} ?fixed=${args.fixed} .disableGutters=${args.disableGutters}>
      ${demoBox('fixed — steps through breakpoints up to xl')}
    </flint-container>
  `,
};

export const FixedXs: Story = {
    args: { fixed: true, maxWidth: 'xs' },
    render: (args) => html`
    <flint-container .maxWidth=${args.maxWidth} ?fixed=${args.fixed} .disableGutters=${args.disableGutters}>
      ${demoBox('fixed + maxWidth="xs" — caps at 444px regardless of viewport')}
    </flint-container>
  `,
};

export const FixedSm: Story = {
    args: { fixed: true, maxWidth: 'sm' },
    render: (args) => html`
    <flint-container .maxWidth=${args.maxWidth} ?fixed=${args.fixed} .disableGutters=${args.disableGutters}>
      ${demoBox('fixed + maxWidth="sm" — steps xs→sm, then caps at 600px')}
    </flint-container>
  `,
};

export const FixedMd: Story = {
    args: { fixed: true, maxWidth: 'md' },
    render: (args) => html`
    <flint-container .maxWidth=${args.maxWidth} ?fixed=${args.fixed} .disableGutters=${args.disableGutters}>
      ${demoBox('fixed + maxWidth="md" — steps xs→sm→md, then caps at 900px')}
    </flint-container>
  `,
};

export const DisableGutters: Story = {
    args: { disableGutters: true, maxWidth: 'md' },
    render: (args) => html`
    <flint-container .maxWidth=${args.maxWidth} ?fixed=${args.fixed} .disableGutters=${args.disableGutters}>
      ${demoBox('disableGutters — padding removed')}
    </flint-container>
  `,
};

export const DisableGuttersFixed: Story = {
    args: { disableGutters: true, fixed: true, maxWidth: 'md' },
    render: (args) => html`
    <flint-container .maxWidth=${args.maxWidth} ?fixed=${args.fixed} .disableGutters=${args.disableGutters}>
      ${demoBox('disableGutters + fixed — no gutters, snaps to breakpoints')}
    </flint-container>
  `,
};
