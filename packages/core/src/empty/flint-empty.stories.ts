import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-empty';
import '../button/flint-button.js';
import '../box/flint-box';

const meta: Meta = {
  title: 'Utilities/Empty',
  component: 'flint-empty',
  parameters: {
    docs: {
      description: {
        component: `
An empty-state component composed of six sub-elements.

### Components
- **\`flint-empty\`** — Root container. Centred flex-column with configurable padding and gap.
- **\`flint-empty-header\`** — Groups media, title and description in a centred column.
- **\`flint-empty-media\`** — Media wrapper. Use \`variant="icon"\` for a rounded-background icon badge, or the default for avatars and images.
- **\`flint-empty-title\`** — Heading text for the empty state.
- **\`flint-empty-description\`** — Supporting descriptive text.
- **\`flint-empty-content\`** — Area for actions such as buttons or inputs.

### CSS Custom Properties
| Property | Default | Description |
|---|---|---|
| \`--flint-empty-padding\` | \`32px\` | Inner padding |
| \`--flint-empty-gap\` | \`16px\` | Gap between sections |
| \`--flint-empty-max-width\` | \`480px\` | Max container width |
| \`--flint-empty-media-bg\` | \`#f3f4f6\` | Icon variant background |
| \`--flint-empty-media-color\` | \`#6b7280\` | Icon variant icon colour |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/* ── shared SVG icons ──────────────────────────────────────────────── */

const folderIcon = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
    <path d="M2 10h20"></path>
  </svg>
`;

const cloudIcon = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
  </svg>
`;

const bellIcon = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
  </svg>
`;

const searchIcon = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
`;

const arrowIcon = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 7h10v10"></path><path d="M7 17 17 7"></path>
  </svg>
`;

const plusIcon = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12h14"></path><path d="M12 5v14"></path>
  </svg>
`;

const refreshIcon = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
    <path d="M21 3v5h-5"></path>
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
    <path d="M8 16H3v5"></path>
  </svg>
`;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => html`
    <flint-box display="flex" alignItems="center" justifyContent="center" bgcolor="var(--flint-muted-background, #f9fafb)" borderRadius="12px" style="min-height: 300px;">
      <flint-empty>
        <flint-empty-header>
          <flint-empty-media variant="icon">
            ${folderIcon}
          </flint-empty-media>
          <flint-empty-title>No Projects Yet</flint-empty-title>
          <flint-empty-description>
            You haven't created any projects yet. Get started by creating your first project.
          </flint-empty-description>
        </flint-empty-header>
        <flint-empty-content style="flex-direction: row; justify-content: center; gap: 8px;">
          <flint-button variant="primary" size="small">Create Project</flint-button>
          <flint-button variant="secondary" size="small">Import Project</flint-button>
        </flint-empty-content>
        <flint-button variant="secondary" size="small">Learn More ${arrowIcon}</flint-button>
      </flint-empty>
    </flint-box>
  `,
};

/* ── Outline ─────────────────────────────────────────────────────── */
export const Outline: Story = {
  name: 'Outline',
  render: () => html`
    <div style="display: flex; align-items: center; justify-content: center; min-height: 300px; padding: 24px;">
      <flint-empty style="border: 2px dashed #e5e7eb; border-radius: 12px; width: 100%; max-width: 480px;">
        <flint-empty-header>
          <flint-empty-media variant="icon">
            ${cloudIcon}
          </flint-empty-media>
          <flint-empty-title>Cloud Storage Empty</flint-empty-title>
          <flint-empty-description>
            Upload files to your cloud storage to access them anywhere.
          </flint-empty-description>
        </flint-empty-header>
        <flint-empty-content>
          <flint-button variant="secondary" size="small">Upload Files</flint-button>
        </flint-empty-content>
      </flint-empty>
    </div>
  `,
};

/* ── Background ──────────────────────────────────────────────────── */
export const Background: Story = {
  name: 'Background',
  render: () => html`
    <flint-box display="flex" alignItems="center" justifyContent="center" p="24px" bgcolor="var(--flint-muted-background, #f9fafb)" borderRadius="12px" style="min-height: 300px;">
      <flint-empty style="--flint-empty-media-bg: #e5e7eb;">
        <flint-empty-header>
          <flint-empty-media variant="icon">
            ${bellIcon}
          </flint-empty-media>
          <flint-empty-title>No Notifications</flint-empty-title>
          <flint-empty-description>
            You're all caught up. New notifications will appear here.
          </flint-empty-description>
        </flint-empty-header>
        <flint-empty-content>
          <flint-button variant="secondary" size="small">${refreshIcon} Refresh</flint-button>
        </flint-empty-content>
      </flint-empty>
    </flint-box>
  `,
};

/* ── WithAvatar ──────────────────────────────────────────────────── */
export const WithAvatar: Story = {
  name: 'With Avatar',
  render: () => html`
    <flint-box display="flex" alignItems="center" justifyContent="center" bgcolor="var(--flint-muted-background, #f9fafb)" borderRadius="12px" style="min-height: 300px;">
      <flint-empty>
        <flint-empty-header>
          <flint-empty-media variant="default">
            <div style="
              width: 56px; height: 56px; border-radius: 50%;
              background: #e5e7eb; overflow: hidden;
              display: flex; align-items: center; justify-content: center;
              font-size: 1.25rem; font-weight: 700; color: #6b7280;
              font-family: var(--flint-font-family, system-ui);
            ">LR</div>
          </flint-empty-media>
          <flint-empty-title>User Offline</flint-empty-title>
          <flint-empty-description>
            This user is currently offline. You can leave a message to notify them or try again later.
          </flint-empty-description>
        </flint-empty-header>
        <flint-empty-content>
          <flint-button variant="secondary" size="small">Leave Message</flint-button>
        </flint-empty-content>
      </flint-empty>
    </flint-box>
  `,
};

/* ── AvatarGroup ─────────────────────────────────────────────────── */
export const AvatarGroup: Story = {
  name: 'Avatar Group',
  render: () => html`
    <flint-box display="flex" alignItems="center" justifyContent="center" bgcolor="var(--flint-muted-background, #f9fafb)" borderRadius="12px" style="min-height: 300px;">
      <flint-empty>
        <flint-empty-header>
          <flint-empty-media variant="default">
            <div style="display: flex;">
              ${(['#3b82f6', '#8b5cf6', '#10b981'] as const).map((color, i) => html`
                <div style="
                  width: 44px; height: 44px; border-radius: 50%;
                  background: ${color}; border: 2px solid #f9fafb;
                  display: flex; align-items: center; justify-content: center;
                  font-size: 0.875rem; font-weight: 600; color: #fff;
                  font-family: var(--flint-font-family, system-ui);
                  margin-left: ${i > 0 ? '-10px' : '0'};
                ">${(['CN', 'LR', 'ER'] as const)[i]}</div>
              `)}
            </div>
          </flint-empty-media>
          <flint-empty-title>No Team Members</flint-empty-title>
          <flint-empty-description>
            Invite your team to collaborate on this project.
          </flint-empty-description>
        </flint-empty-header>
        <flint-empty-content>
          <flint-button variant="secondary" size="small">${plusIcon} Invite Members</flint-button>
        </flint-empty-content>
      </flint-empty>
    </flint-box>
  `,
};

/* ── SearchEmpty ─────────────────────────────────────────────────── */
export const SearchEmpty: Story = {
  name: 'Search / 404',
  render: () => html`
    <flint-box display="flex" alignItems="center" justifyContent="center" bgcolor="var(--flint-muted-background, #f9fafb)" borderRadius="12px" style="min-height: 300px;">
      <flint-empty>
        <flint-empty-header>
          <flint-empty-title>404 — Not Found</flint-empty-title>
          <flint-empty-description>
            The page you're looking for doesn't exist. Try searching for what you need below.
          </flint-empty-description>
        </flint-empty-header>
        <flint-empty-content>
          <flint-box display="flex" alignItems="center" border="1px solid #e5e7eb" borderRadius="6px" bgcolor="#fff" style="overflow: hidden; width: 300px;">
            <span style="padding: 0 10px; color: #9ca3af; display: flex; align-items: center;">
              ${searchIcon}
            </span>
            <input
              type="text"
              placeholder="Try searching for pages..."
              style="
                flex: 1; border: none; outline: none; padding: 8px 8px 8px 0;
                font-size: 0.875rem; font-family: var(--flint-font-family, system-ui);
                color: var(--flint-text-color, #111827); background: transparent;
              "
            />
          </flint-box>
          <p style="font-size: 0.8125rem; color: #6b7280; font-family: var(--flint-font-family, system-ui); margin: 0;">
            Need help? <a href="#" style="color: var(--flint-primary-color, #3b82f6);">Contact support</a>
          </p>
        </flint-empty-content>
      </flint-empty>
    </flint-box>
  `,
};

/* ── CustomStyles ────────────────────────────────────────────────── */
export const CustomStyles: Story = {
  name: 'Custom CSS Properties',
  render: () => html`
    <flint-box display="flex" alignItems="center" justifyContent="center" borderRadius="12px" style="min-height: 300px; background: linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%);">
      <flint-empty style="
        --flint-empty-padding: 48px;
        --flint-empty-gap: 24px;
        --flint-empty-max-width: 400px;
        --flint-empty-media-bg: #ede9fe;
        --flint-empty-media-color: #7c3aed;
      ">
        <flint-empty-header>
          <flint-empty-media variant="icon">
            ${folderIcon}
          </flint-empty-media>
          <flint-empty-title>No Results Found</flint-empty-title>
          <flint-empty-description>
            Try adjusting your search or filter to find what you're looking for.
          </flint-empty-description>
        </flint-empty-header>
        <flint-empty-content>
          <flint-button variant="primary" size="small">Clear Filters</flint-button>
        </flint-empty-content>
      </flint-empty>
    </flint-box>
  `,
};
