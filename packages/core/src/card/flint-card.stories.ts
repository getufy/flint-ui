import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-card';
import './flint-card-header';
import './flint-card-media';
import './flint-card-content';
import './flint-card-actions';
import './flint-card-action-area';
import '../button/flint-button';
import '../avatar/flint-avatar';

const meta: Meta = {
  title: 'Surfaces/Card',
  component: 'flint-card',
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
    subtitle: 'By Flint UI',
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
      <flint-card variant=${args.variant} ?interactive=${args.interactive}>
        ${args.title || args.subtitle ? html`
          <flint-card-header title=${args.title} subtitle=${args.subtitle}></flint-card-header>
        ` : ''}
        ${args.image ? html`
          <flint-card-media image=${args.image} alt="Card image"></flint-card-media>
        ` : ''}
        ${args.content ? html`
          <flint-card-content>
            ${args.content}
          </flint-card-content>
        ` : ''}
        ${args.primaryButtonText || args.secondaryButtonText ? html`
          <flint-card-actions>
            ${args.primaryButtonText ? html`<flint-button variant="primary" size="small" @click=${() => alert('Explore clicked!')}>${args.primaryButtonText}</flint-button>` : ''}
            ${args.secondaryButtonText ? html`<flint-button variant="secondary" size="small">${args.secondaryButtonText}</flint-button>` : ''}
          </flint-card-actions>
        ` : ''}
      </flint-card>
    </div>
  `,
};

export const Outlined: Story = {
  args: { variant: 'outlined' },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-card variant=${args.variant} ?interactive=${args.interactive}>
        <flint-card-header title=${args.title} subtitle=${args.subtitle}></flint-card-header>
        <flint-card-media image=${args.image} alt="Card image"></flint-card-media>
        <flint-card-content>${args.content}</flint-card-content>
        <flint-card-actions>
          <flint-button variant="primary" size="small">${args.primaryButtonText}</flint-button>
          <flint-button variant="secondary" size="small">${args.secondaryButtonText}</flint-button>
        </flint-card-actions>
      </flint-card>
    </div>
  `,
};

export const Flat: Story = {
  args: { variant: 'flat' },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-card variant=${args.variant} ?interactive=${args.interactive}>
        <flint-card-header title=${args.title} subtitle=${args.subtitle}></flint-card-header>
        <flint-card-content>${args.content}</flint-card-content>
        <flint-card-actions>
          <flint-button variant="primary" size="small">${args.primaryButtonText}</flint-button>
        </flint-card-actions>
      </flint-card>
    </div>
  `,
};

export const Interactive: Story = {
  args: { interactive: true, image: '' },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280;">Hover the card to see the elevated shadow.</p>
      <flint-card variant=${args.variant} ?interactive=${args.interactive}>
        <flint-card-header title=${args.title} subtitle=${args.subtitle}></flint-card-header>
        <flint-card-content>${args.content}</flint-card-content>
        <flint-card-actions>
          <flint-button variant="primary" size="small">${args.primaryButtonText}</flint-button>
        </flint-card-actions>
      </flint-card>
    </div>
  `,
};

export const ActionArea: Story = {
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-card variant=${args.variant}>
        <flint-card-action-area @click=${() => alert('Card clicked!')}>
          ${args.image ? html`
            <flint-card-media image=${args.image}></flint-card-media>
          ` : ''}
          <flint-card-content>
            ${args.title ? html`<h3 style="margin: 0 0 8px; font-size: 1.25rem;">${args.title}</h3>` : ''}
            ${args.content ? html`<p style="margin: 0; color: #4b5563;">${args.content}</p>` : ''}
          </flint-card-content>
        </flint-card-action-area>
      </flint-card>
    </div>
  `,
};

export const WithAvatar: Story = {
  args: { image: '' },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-card variant="elevated">
        <flint-card-header title=${args.title} subtitle=${args.subtitle}>
          <flint-avatar slot="avatar" label="AB" style="--flint-avatar-size: 40px;"></flint-avatar>
        </flint-card-header>
        <flint-card-content>${args.content}</flint-card-content>
        <flint-card-actions>
          <flint-button variant="primary" size="small">${args.primaryButtonText}</flint-button>
          <flint-button variant="secondary" size="small">${args.secondaryButtonText}</flint-button>
        </flint-card-actions>
      </flint-card>
    </div>
  `,
};

export const WithHeaderAction: Story = {
  args: { image: '' },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-card variant="elevated">
        <flint-card-header title=${args.title} subtitle=${args.subtitle}>
          <flint-button slot="action" variant="ghost" size="small" @click=${() => alert('Menu clicked!')}>⋯</flint-button>
        </flint-card-header>
        <flint-card-content>${args.content}</flint-card-content>
        <flint-card-actions>
          <flint-button variant="primary" size="small">${args.primaryButtonText}</flint-button>
        </flint-card-actions>
      </flint-card>
    </div>
  `,
};

export const HorizontalLayout: Story = {
  args: { image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&q=80' },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 600px; padding: 20px;">
      <flint-card variant="elevated" style="--flint-card-border-radius: 12px;">
        <div style="display: flex; flex-direction: row;">
          <flint-card-media
            image=${args.image}
            alt="Card image"
            style="--flint-card-media-height: 100%; flex: 0 0 160px;"
          ></flint-card-media>
          <div style="display: flex; flex-direction: column; flex: 1;">
            <flint-card-header title=${args.title} subtitle=${args.subtitle}></flint-card-header>
            <flint-card-content>${args.content}</flint-card-content>
            <flint-card-actions>
              <flint-button variant="primary" size="small">${args.primaryButtonText}</flint-button>
            </flint-card-actions>
          </div>
        </div>
      </flint-card>
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
      <flint-card variant=${args.variant} ?interactive=${args.interactive}>
        <flint-card-content>
          <p style="margin: 0; font-size: 1.125rem;">${args.content}</p>
        </flint-card-content>
        ${args.primaryButtonText || args.secondaryButtonText ? html`
          <flint-card-actions>
            ${args.primaryButtonText ? html`<flint-button variant="primary" size="small">${args.primaryButtonText}</flint-button>` : ''}
            ${args.secondaryButtonText ? html`<flint-button variant="secondary" size="small">${args.secondaryButtonText}</flint-button>` : ''}
          </flint-card-actions>
        ` : ''}
      </flint-card>
    </div>
  `,
};
