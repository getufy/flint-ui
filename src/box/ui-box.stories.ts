import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-box';

const meta: Meta = {
    title: 'Layout/Box',
    component: 'ui-box',
    argTypes: {
        component: { control: 'text' },
        // Padding
        p: { control: 'text' },
        pt: { control: 'text' },
        pr: { control: 'text' },
        pb: { control: 'text' },
        pl: { control: 'text' },
        px: { control: 'text' },
        py: { control: 'text' },
        // Margin
        m: { control: 'text' },
        mt: { control: 'text' },
        mr: { control: 'text' },
        mb: { control: 'text' },
        ml: { control: 'text' },
        mx: { control: 'text' },
        my: { control: 'text' },
        // Layout
        display: { control: 'text' },
        flexDirection: { control: 'text' },
        alignItems: { control: 'text' },
        justifyContent: { control: 'text' },
        flexWrap: { control: 'text' },
        flexBasis: { control: 'text' },
        flexGrow: { control: 'text' },
        flexShrink: { control: 'text' },
        gap: { control: 'text' },
        // Color
        bgcolor: { control: 'text' },
        color: { control: 'text' },
        // Visual
        border: { control: 'text' },
        borderRadius: { control: 'text' },
        boxShadow: { control: 'text' },
        width: { control: 'text' },
        height: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
    args: {
        bgcolor: 'primary',
        color: 'white',
        p: '16px',
        borderRadius: '8px',
    },
    render: (args) => html`
    <ui-box
      .component=${args.component || 'div'}
      .bgcolor=${args.bgcolor}
      .color=${args.color}
      .p=${args.p}
      .borderRadius=${args.borderRadius}
    >
      I'm a Box with background color, padding and border radius.
    </ui-box>
  `,
};

export const Nested: Story = {
    render: () => html`
    <ui-box bgcolor="lightgray" p="20px" borderRadius="12px">
      <ui-box bgcolor="primary" color="white" p="10px" borderRadius="4px" mb="10px">
        Header (Box)
      </ui-box>
      <ui-box bgcolor="white" p="10px" borderRadius="4px">
        Content area (Box)
      </ui-box>
    </ui-box>
  `,
};

export const Flex: Story = {
    render: () => html`
    <ui-box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="10px"
      bgcolor="white"
      border="1px solid #ddd"
      borderRadius="8px"
    >
      <ui-box>Left Item</ui-box>
      <ui-box>Right Item</ui-box>
    </ui-box>
  `,
};

export const FlexWithGap: Story = {
    render: () => html`
    <ui-box
      display="flex"
      gap="12px"
      p="16px"
      bgcolor="#f5f5f5"
      borderRadius="8px"
    >
      <ui-box bgcolor="primary" color="white" p="12px" borderRadius="4px">Item 1</ui-box>
      <ui-box bgcolor="primary" color="white" p="12px" borderRadius="4px">Item 2</ui-box>
      <ui-box bgcolor="primary" color="white" p="12px" borderRadius="4px">Item 3</ui-box>
    </ui-box>
  `,
};

export const ComponentProp: Story = {
    args: {
        component: 'section',
    },
    render: (args) => html`
    <ui-box
      .component=${args.component}
      p="16px"
      bgcolor="secondary"
      color="white"
      borderRadius="8px"
    >
      This Box is rendered as a &lt;section&gt; element. Inspect it to see!
    </ui-box>
  `,
};

export const CustomStyle: Story = {
    render: () => html`
    <ui-box
      p="24px"
      border="2px dashed #999"
      borderRadius="8px"
      style="background-color: #f5f5f5; text-align: center;"
    >
      Use the native <code>style</code> attribute for one-off overrides.
    </ui-box>
  `,
};
