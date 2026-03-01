import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-card';
import './ui-card-header';
import './ui-card-media';
import './ui-card-content';
import './ui-card-actions';
import './ui-card-action-area';
import '../button/ui-button';
import '../avatar/ui-avatar';

const meta: Meta = {
  title: 'Surfaces/Card',
  component: 'ui-card',
  parameters: {
    docs: {
      description: {
        component: `
Cards contain content and actions about a single subject.

### Components
- **Card**: a surface-level container for grouping related components.
- **Card Content**: the wrapper for the Card content.
- **Card Header**: an optional wrapper for the Card header.
- **Card Media**: an optional container for displaying images, videos, etc.
- **Card Actions**: an optional wrapper that groups a set of buttons.
- **Card Action Area**: an optional wrapper that allows users to interact with the specified area of the Card.
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    image: { control: 'text' },
    content: { control: 'text' },
    primaryButtonText: { name: 'Primary Button', control: 'text' },
    secondaryButtonText: { name: 'Secondary Button', control: 'text' },
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
    },
    interactive: { control: 'boolean' },
  },
  args: {
    title: 'Modern Card View',
    subtitle: 'By Storybook Lit',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&q=80',
    content: 'This is a beautifully designed card component. It uses compositional elements like header, media, content, and actions.',
    primaryButtonText: 'Explore',
    secondaryButtonText: 'Cancel',
    variant: 'elevated',
    interactive: false,
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <ui-card variant=${args.variant} ?interactive=${args.interactive}>
        ${args.title || args.subtitle ? html`
          <ui-card-header title=${args.title} subtitle=${args.subtitle}></ui-card-header>
        ` : ''}
        ${args.image ? html`
          <ui-card-media image=${args.image} alt="Card image"></ui-card-media>
        ` : ''}
        ${args.content ? html`
          <ui-card-content>
            ${args.content}
          </ui-card-content>
        ` : ''}
        ${args.primaryButtonText || args.secondaryButtonText ? html`
          <ui-card-actions>
            ${args.primaryButtonText ? html`<ui-button variant="primary" size="small" @click=${() => alert('Explore clicked!')}>${args.primaryButtonText}</ui-button>` : ''}
            ${args.secondaryButtonText ? html`<ui-button variant="secondary" size="small">${args.secondaryButtonText}</ui-button>` : ''}
          </ui-card-actions>
        ` : ''}
      </ui-card>
    </div>
  `,
};

export const Outlined: Story = {
  args: { variant: 'outlined' },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <ui-card variant="outlined">
        <ui-card-header title=${args.title} subtitle=${args.subtitle}></ui-card-header>
        <ui-card-media image=${args.image} alt="Card image"></ui-card-media>
        <ui-card-content>${args.content}</ui-card-content>
        <ui-card-actions>
          <ui-button variant="primary" size="small">${args.primaryButtonText}</ui-button>
          <ui-button variant="secondary" size="small">${args.secondaryButtonText}</ui-button>
        </ui-card-actions>
      </ui-card>
    </div>
  `,
};

export const Flat: Story = {
  args: { variant: 'flat' },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <ui-card variant="flat">
        <ui-card-header title=${args.title} subtitle=${args.subtitle}></ui-card-header>
        <ui-card-content>${args.content}</ui-card-content>
        <ui-card-actions>
          <ui-button variant="primary" size="small">${args.primaryButtonText}</ui-button>
        </ui-card-actions>
      </ui-card>
    </div>
  `,
};

export const Interactive: Story = {
  args: { interactive: true, image: '' },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280;">Hover the card to see the elevated shadow.</p>
      <ui-card variant="elevated" interactive>
        <ui-card-header title=${args.title} subtitle=${args.subtitle}></ui-card-header>
        <ui-card-content>${args.content}</ui-card-content>
        <ui-card-actions>
          <ui-button variant="primary" size="small">${args.primaryButtonText}</ui-button>
        </ui-card-actions>
      </ui-card>
    </div>
  `,
};

export const ActionArea: Story = {
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <ui-card variant=${args.variant}>
        <ui-card-action-area @click=${() => alert('Card clicked!')}>
          ${args.image ? html`
            <ui-card-media image=${args.image}></ui-card-media>
          ` : ''}
          <ui-card-content>
            ${args.title ? html`<h3 style="margin: 0 0 8px; font-size: 1.25rem;">${args.title}</h3>` : ''}
            ${args.content ? html`<p style="margin: 0; color: #4b5563;">${args.content}</p>` : ''}
          </ui-card-content>
        </ui-card-action-area>
      </ui-card>
    </div>
  `,
};

export const WithAvatar: Story = {
  args: { image: '' },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <ui-card variant="elevated">
        <ui-card-header title=${args.title} subtitle=${args.subtitle}>
          <ui-avatar slot="avatar" label="AB" style="--ui-avatar-size: 40px;"></ui-avatar>
        </ui-card-header>
        <ui-card-content>${args.content}</ui-card-content>
        <ui-card-actions>
          <ui-button variant="primary" size="small">${args.primaryButtonText}</ui-button>
          <ui-button variant="secondary" size="small">${args.secondaryButtonText}</ui-button>
        </ui-card-actions>
      </ui-card>
    </div>
  `,
};

export const WithHeaderAction: Story = {
  args: { image: '' },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <ui-card variant="elevated">
        <ui-card-header title=${args.title} subtitle=${args.subtitle}>
          <ui-button slot="action" variant="ghost" size="small" @click=${() => alert('Menu clicked!')}>⋯</ui-button>
        </ui-card-header>
        <ui-card-content>${args.content}</ui-card-content>
        <ui-card-actions>
          <ui-button variant="primary" size="small">${args.primaryButtonText}</ui-button>
        </ui-card-actions>
      </ui-card>
    </div>
  `,
};

export const HorizontalLayout: Story = {
  args: { image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&q=80' },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 600px; padding: 20px;">
      <ui-card variant="elevated" style="--ui-card-border-radius: 12px;">
        <div style="display: flex; flex-direction: row;">
          <ui-card-media
            image=${args.image}
            alt="Card image"
            style="--ui-card-media-height: 100%; flex: 0 0 160px;"
          ></ui-card-media>
          <div style="display: flex; flex-direction: column; flex: 1;">
            <ui-card-header title=${args.title} subtitle=${args.subtitle}></ui-card-header>
            <ui-card-content>${args.content}</ui-card-content>
            <ui-card-actions>
              <ui-button variant="primary" size="small">${args.primaryButtonText}</ui-button>
            </ui-card-actions>
          </div>
        </div>
      </ui-card>
    </div>
  `,
};

export const SimpleText: Story = {
  args: {
    image: '',
    title: '',
    subtitle: '',
    content: 'This is a simple text card without any media or headers. Just content.',
    primaryButtonText: '',
    secondaryButtonText: 'Learn More',
  },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <ui-card variant=${args.variant} ?interactive=${args.interactive}>
        <ui-card-content>
          <p style="margin: 0; font-size: 1.125rem;">${args.content}</p>
        </ui-card-content>
        ${args.primaryButtonText || args.secondaryButtonText ? html`
          <ui-card-actions>
            ${args.primaryButtonText ? html`<ui-button variant="primary" size="small">${args.primaryButtonText}</ui-button>` : ''}
            ${args.secondaryButtonText ? html`<ui-button variant="secondary" size="small">${args.secondaryButtonText}</ui-button>` : ''}
          </ui-card-actions>
        ` : ''}
      </ui-card>
    </div>
  `,
};
