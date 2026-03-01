import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-grid';

const meta: Meta = {
  title: 'Layout/Grid',
  component: 'ui-grid',
  // FIX 1: Remove default story padding so containers can go full width
  decorators: [
    (story) => html`
            <div style="padding: 0; width: 100%; box-sizing: border-box;">
                ${story()}
            </div>
        `,
  ],
  argTypes: {
    container: { control: 'boolean' },
    spacing: { control: 'number' },
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse']
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse']
    },
  },
};

export default meta;
type Story = StoryObj;

const itemStyle = 'background-color: #cfe8fc; border: 1px solid #1976d2; padding: 16px; text-align: center; color: #1976d2; font-family: Inter; box-sizing: border-box;';

export const Basic: Story = {
  render: () => html`
    <ui-grid container spacing="2">
      <ui-grid xs="8">
        <div style="${itemStyle}">xs=8</div>
      </ui-grid>
      <ui-grid xs="4">
        <div style="${itemStyle}">xs=4</div>
      </ui-grid>
      <ui-grid xs="4">
        <div style="${itemStyle}">xs=4</div>
      </ui-grid>
      <ui-grid xs="8">
        <div style="${itemStyle}">xs=8</div>
      </ui-grid>
    </ui-grid>
  `,
};

export const MultipleBreakpoints: Story = {
  render: () => html`
    <ui-grid container spacing="2">
      <ui-grid xs="6" md="8">
        <div style="${itemStyle}">xs=6 md=8</div>
      </ui-grid>
      <ui-grid xs="6" md="4">
        <div style="${itemStyle}">xs=6 md=4</div>
      </ui-grid>
      <ui-grid xs="6" md="4">
        <div style="${itemStyle}">xs=6 md=4</div>
      </ui-grid>
      <ui-grid xs="6" md="8">
        <div style="${itemStyle}">xs=6 md=8</div>
      </ui-grid>
    </ui-grid>
  `,
};

export const Spacing: Story = {
  args: {
    spacing: 2,
    container: true,
  },
  render: (args) => html`
    <ui-grid container .spacing=${args.spacing}>
      <ui-grid xs="6">
        <div style="${itemStyle}">Item 1</div>
      </ui-grid>
      <ui-grid xs="6">
        <div style="${itemStyle}">Item 2</div>
      </ui-grid>
    </ui-grid>
  `,
};

export const AutoLayout: Story = {
  render: () => html`
    <ui-grid container spacing="3">
      <!-- FIX 3: Use xs="true" instead of bare xs attribute (empty string ≠ true) -->
      <ui-grid xs="true">
        <div style="${itemStyle}">xs</div>
      </ui-grid>
      <ui-grid xs="6">
        <div style="${itemStyle}">xs=6</div>
      </ui-grid>
      <ui-grid xs="true">
        <div style="${itemStyle}">xs</div>
      </ui-grid>
    </ui-grid>
  `,
};

export const VariableWidth: Story = {
  render: () => html`
    <!-- FIX 2: Use .justifyContent property binding instead of attribute for camelCase props -->
    <ui-grid container spacing="3" .justifyContent=${'center'}>
      <ui-grid xs="auto">
         <div style="${itemStyle}; width: 100px;">Variable width content</div>
      </ui-grid>
      <ui-grid xs="6">
         <div style="${itemStyle}">xs=6</div>
      </ui-grid>
      <ui-grid xs="auto">
         <div style="${itemStyle}; width: 120px;">More content</div>
      </ui-grid>
    </ui-grid>
  `,
};

export const NestedGrid: Story = {
  render: () => html`
    <ui-grid container spacing="2">
      <ui-grid xs="12" md="6">
        <div style="${itemStyle}">Item 1 (xs=12, md=6)</div>
      </ui-grid>
      <ui-grid xs="12" md="6">
        <ui-grid container spacing="1">
           <ui-grid xs="6">
             <div style="background-color: #fce4ec; border: 1px solid #d81b60; padding: 10px; color: #d81b60; box-sizing: border-box;">Nested 1</div>
           </ui-grid>
           <ui-grid xs="6">
             <div style="background-color: #fce4ec; border: 1px solid #d81b60; padding: 10px; color: #d81b60; box-sizing: border-box;">Nested 2</div>
           </ui-grid>
        </ui-grid>
      </ui-grid>
    </ui-grid>
  `,
};

export const Columns: Story = {
  render: () => html`
    <ui-grid container columns="16" spacing="2">
      <ui-grid xs="8">
        <div style="${itemStyle}">size=8 (of 16 cols)</div>
      </ui-grid>
      <ui-grid xs="8">
        <div style="${itemStyle}">size=8 (of 16 cols)</div>
      </ui-grid>
    </ui-grid>
  `,
};

export const Offset: Story = {
  render: () => html`
    <ui-grid container spacing="2">
      <ui-grid xs="4">
        <div style="${itemStyle}">xs=4</div>
      </ui-grid>
      <ui-grid xs="4" .offset=${{ xs: 4 }}>
        <div style="${itemStyle}">xs=4, offset=4</div>
      </ui-grid>
      <ui-grid xs="4" .offset=${{ xs: 'auto' }}>
        <div style="${itemStyle}">xs=4, offset=auto</div>
      </ui-grid>
    </ui-grid>
  `,
};