import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-item';

const meta: Meta = {
    title: 'Utilities/Item',
    component: 'ui-item',
    parameters: {
        docs: {
            description: {
                component: `
A versatile flex-row container for displaying content with media, title, description, and actions.

### Components
- **\`ui-item\`** — Root. Flex-row container with \`variant\` and \`size\` props.
- **\`ui-item-group\`** — Flex-column wrapper for grouping items with consistent spacing.
- **\`ui-item-separator\`** — Horizontal rule for use inside \`ui-item-group\`.
- **\`ui-item-media\`** — Media area (icon, avatar, image). Use \`variant="icon"\` or \`variant="image"\`.
- **\`ui-item-content\`** — Flex-column wrapper for title and description (grows to fill).
- **\`ui-item-title\`** — Item heading text.
- **\`ui-item-description\`** — Supporting descriptive text.
- **\`ui-item-actions\`** — Trailing action buttons or icons.
- **\`ui-item-header\`** — Full-bleed top section (always first child).
- **\`ui-item-footer\`** — Full-bleed bottom section (always last child).

### Basic usage
\`\`\`html
<ui-item variant="outline">
  <ui-item-media variant="icon">
    <svg>...</svg>
  </ui-item-media>
  <ui-item-content>
    <ui-item-title>Title</ui-item-title>
    <ui-item-description>Description</ui-item-description>
  </ui-item-content>
  <ui-item-actions>
    <button>Action</button>
  </ui-item-actions>
</ui-item>
\`\`\`

### CSS Custom Properties
| Property | Default | Description |
|---|---|---|
| \`--ui-item-padding\` | \`16px\` | Internal padding (auto-adjusted per size) |
| \`--ui-item-gap\` | \`12px\` | Gap between flex children |
| \`--ui-item-media-icon-bg\` | \`#f3f4f6\` | Icon variant background |
| \`--ui-item-media-icon-color\` | \`#6b7280\` | Icon variant foreground |
| \`--ui-border-color\` | \`#e5e7eb\` | Outline border + separator color |
| \`--ui-muted-bg\` | \`#f9fafb\` | Muted variant background |
| \`--ui-item-group-gap\` | \`4px\` | Gap between items in a group |
                `,
            },
        },
    },
    argTypes: {
        variant: { control: 'select', options: ['default', 'outline', 'muted'] },
        size:    { control: 'select', options: ['default', 'sm', 'xs'] },
    },
    args: {
        variant: 'default',
        size: 'default',
    },
};

export default meta;
type Story = StoryObj;

/* ── shared icons ──────────────────────────────────────────────────── */

const inboxIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
    </svg>
`;

const shieldIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
`;

const bellIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
    </svg>
`;

const chevronRightIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"></path>
    </svg>
`;

const plusIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"></path><path d="M12 5v14"></path>
    </svg>
`;

const externalIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 3h6v6"></path><path d="M10 14 21 3"></path>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    </svg>
`;

const badgeCheckIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
`;

const musicIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
    </svg>
`;

const btnStyle = `
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px; border-radius: 6px; border: 1px solid #e5e7eb;
    background: #fff; font-size: 0.8125rem; font-weight: 500;
    font-family: var(--ui-font-family, system-ui); cursor: pointer;
    color: var(--ui-text-color, #111827); line-height: 1;
`;

const avatarStyle = (initials: string, color: string) => `
    display: inline-flex; align-items: center; justify-content: center;
    width: 36px; height: 36px; border-radius: 50%;
    background: ${color}; color: #fff; font-size: 0.75rem; font-weight: 600;
    font-family: var(--ui-font-family, system-ui); flex-shrink: 0;
    line-height: 1; user-select: none; ${initials};
`;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
    render: (args) => html`
        <div style="max-width: 480px; padding: 24px;">
            <ui-item variant=${args.variant} size=${args.size}>
                <ui-item-content>
                    <ui-item-title>Basic Item</ui-item-title>
                    <ui-item-description>A simple item with title and description.</ui-item-description>
                </ui-item-content>
                <ui-item-actions>
                    <button style=${btnStyle}>Action</button>
                </ui-item-actions>
            </ui-item>
        </div>
    `,
};

/* ── Variants ────────────────────────────────────────────────────── */
export const Variants: Story = {
    name: 'Variant',
    render: () => html`
        <div style="max-width: 480px; padding: 24px; display: flex; flex-direction: column; gap: 12px;">
            <p style="margin: 0 0 4px; font-size: 0.8125rem; color: #6b7280; font-family: system-ui;">
                Three visual variants: default, outline, muted.
            </p>
            <ui-item>
                <ui-item-media variant="icon">${inboxIcon}</ui-item-media>
                <ui-item-content>
                    <ui-item-title>Default Variant</ui-item-title>
                    <ui-item-description>Transparent background, no border.</ui-item-description>
                </ui-item-content>
            </ui-item>
            <ui-item variant="outline">
                <ui-item-media variant="icon">${inboxIcon}</ui-item-media>
                <ui-item-content>
                    <ui-item-title>Outline Variant</ui-item-title>
                    <ui-item-description>Outlined style with a visible border.</ui-item-description>
                </ui-item-content>
            </ui-item>
            <ui-item variant="muted">
                <ui-item-media variant="icon">${inboxIcon}</ui-item-media>
                <ui-item-content>
                    <ui-item-title>Muted Variant</ui-item-title>
                    <ui-item-description>Muted background for secondary content.</ui-item-description>
                </ui-item-content>
            </ui-item>
        </div>
    `,
};

/* ── Sizes ───────────────────────────────────────────────────────── */
export const Sizes: Story = {
    name: 'Size',
    render: () => html`
        <div style="max-width: 480px; padding: 24px; display: flex; flex-direction: column; gap: 12px;">
            <p style="margin: 0 0 4px; font-size: 0.8125rem; color: #6b7280; font-family: system-ui;">
                Three size presets: default (16px), sm (12px), xs (8px).
            </p>
            <ui-item variant="outline">
                <ui-item-media variant="icon">${inboxIcon}</ui-item-media>
                <ui-item-content>
                    <ui-item-title>Default Size</ui-item-title>
                    <ui-item-description>Standard 16px padding for most use cases.</ui-item-description>
                </ui-item-content>
            </ui-item>
            <ui-item variant="outline" size="sm">
                <ui-item-media variant="icon">${inboxIcon}</ui-item-media>
                <ui-item-content>
                    <ui-item-title>Small Size</ui-item-title>
                    <ui-item-description>Compact 12px padding for dense layouts.</ui-item-description>
                </ui-item-content>
            </ui-item>
            <ui-item variant="outline" size="xs">
                <ui-item-media variant="icon">${inboxIcon}</ui-item-media>
                <ui-item-content>
                    <ui-item-title>Extra Small Size</ui-item-title>
                    <ui-item-description>Minimal 8px padding.</ui-item-description>
                </ui-item-content>
            </ui-item>
        </div>
    `,
};

/* ── WithMedia ───────────────────────────────────────────────────── */
export const WithMedia: Story = {
    name: 'Media Variants',
    render: () => html`
        <div style="max-width: 480px; padding: 24px; display: flex; flex-direction: column; gap: 12px;">
            <ui-item variant="outline">
                <ui-item-media variant="icon">${shieldIcon}</ui-item-media>
                <ui-item-content>
                    <ui-item-title>Icon Media</ui-item-title>
                    <ui-item-description>Rounded background suited for SVG icons.</ui-item-description>
                </ui-item-content>
            </ui-item>
            <ui-item variant="outline">
                <ui-item-media>
                    <div style=${avatarStyle('ER', '#3b82f6')}>ER</div>
                </ui-item-media>
                <ui-item-content>
                    <ui-item-title>Avatar Media</ui-item-title>
                    <ui-item-description>Default variant wraps avatars or custom elements.</ui-item-description>
                </ui-item-content>
            </ui-item>
            <ui-item variant="outline">
                <ui-item-media variant="image">
                    <img
                        .src=${'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop'}
                        alt="Avatar"
                        style="width:100%;height:100%;object-fit:cover;"
                    />
                </ui-item-media>
                <ui-item-content>
                    <ui-item-title>Image Media</ui-item-title>
                    <ui-item-description>Fixed 40×40 clipping box for thumbnails.</ui-item-description>
                </ui-item-content>
            </ui-item>
        </div>
    `,
};

/* ── SecurityAlert ───────────────────────────────────────────────── */
export const SecurityAlert: Story = {
    name: 'Security Alert',
    render: () => html`
        <div style="max-width: 480px; padding: 24px;">
            <ui-item variant="outline">
                <ui-item-media variant="icon">${shieldIcon}</ui-item-media>
                <ui-item-content>
                    <ui-item-title>Security Alert</ui-item-title>
                    <ui-item-description>New login detected from unknown device.</ui-item-description>
                </ui-item-content>
                <ui-item-actions>
                    <button style=${btnStyle}>Review</button>
                </ui-item-actions>
            </ui-item>
        </div>
    `,
};

/* ── LinkItem ────────────────────────────────────────────────────── */
export const LinkItem: Story = {
    name: 'As Link',
    render: () => html`
        <div style="max-width: 480px; padding: 24px; display: flex; flex-direction: column; gap: 8px;">
            <p style="margin: 0 0 8px; font-size: 0.8125rem; color: #6b7280; font-family: system-ui;">
                Wrap <code>ui-item</code> in an anchor for link behaviour.
            </p>
            <a href="#" style="text-decoration: none; display: block;">
                <ui-item variant="outline">
                    <ui-item-content>
                        <ui-item-title>Visit our documentation</ui-item-title>
                        <ui-item-description>Learn how to get started with our components.</ui-item-description>
                    </ui-item-content>
                    <ui-item-actions>${chevronRightIcon}</ui-item-actions>
                </ui-item>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block;">
                <ui-item variant="outline">
                    <ui-item-media>${badgeCheckIcon}</ui-item-media>
                    <ui-item-content>
                        <ui-item-title>Your profile has been verified.</ui-item-title>
                    </ui-item-content>
                    <ui-item-actions>${externalIcon}</ui-item-actions>
                </ui-item>
            </a>
        </div>
    `,
};

/* ── WithHeader ──────────────────────────────────────────────────── */
export const WithHeader: Story = {
    name: 'With Header',
    render: () => html`
        <div style="max-width: 360px; padding: 24px; display: flex; flex-direction: column; gap: 16px;">
            <p style="margin: 0 0 4px; font-size: 0.8125rem; color: #6b7280; font-family: system-ui;">
                <code>ui-item-header</code> bleeds to the item edges (top, left, right).
            </p>
            <ui-item variant="outline">
                <ui-item-header>
                    <img
                        .src=${'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=640&auto=format&fit=crop'}
                        alt="Room"
                        style="width:100%;height:120px;object-fit:cover;display:block;"
                    />
                </ui-item-header>
                <ui-item-content>
                    <ui-item-title>v0-1.5-sm</ui-item-title>
                    <ui-item-description>Everyday tasks and UI generation.</ui-item-description>
                </ui-item-content>
            </ui-item>
            <ui-item variant="outline">
                <ui-item-header>
                    <div style="
                        width: 100%; height: 80px;
                        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                        display: flex; align-items: center; justify-content: center;
                    ">
                        ${bellIcon}
                    </div>
                </ui-item-header>
                <ui-item-content>
                    <ui-item-title>Notifications</ui-item-title>
                    <ui-item-description>Stay up to date with your alerts.</ui-item-description>
                </ui-item-content>
            </ui-item>
        </div>
    `,
};

/* ── WithFooter ──────────────────────────────────────────────────── */
export const WithFooter: Story = {
    name: 'With Footer',
    render: () => html`
        <div style="max-width: 400px; padding: 24px; display: flex; flex-direction: column; gap: 12px;">
            <ui-item variant="outline">
                <ui-item-media variant="icon">${musicIcon}</ui-item-media>
                <ui-item-content>
                    <ui-item-title>Midnight City Lights</ui-item-title>
                    <ui-item-description>Neon Dreams · Electric Nights</ui-item-description>
                </ui-item-content>
                <ui-item-actions>
                    <button style=${btnStyle}>Play</button>
                </ui-item-actions>
                <ui-item-footer>
                    <span style="font-size:0.75rem;color:#9ca3af;">Added 3 days ago · 3:45</span>
                </ui-item-footer>
            </ui-item>
            <ui-item variant="outline">
                <ui-item-media variant="icon">${shieldIcon}</ui-item-media>
                <ui-item-content>
                    <ui-item-title>Pro Plan</ui-item-title>
                    <ui-item-description>Unlimited projects, priority support.</ui-item-description>
                </ui-item-content>
                <ui-item-footer>
                    <span style="font-size:0.75rem;color:#9ca3af;">Renews on March 15, 2026</span>
                </ui-item-footer>
            </ui-item>
        </div>
    `,
};

/* ── ItemGroup ───────────────────────────────────────────────────── */
export const Group: Story = {
    name: 'Item Group',
    render: () => {
        const people = [
            { initials: 'CN', name: 'shadcn', email: 'shadcn@vercel.com',     color: '#3b82f6' },
            { initials: 'LR', name: 'maxleiter', email: 'max@vercel.com',     color: '#8b5cf6' },
            { initials: 'ER', name: 'evilrabbit', email: 'evil@vercel.com',   color: '#10b981' },
        ];

        return html`
            <div style="max-width: 400px; padding: 24px;">
                <ui-item-group>
                    ${people.map((p, i) => html`
                        <ui-item variant="outline">
                            <ui-item-media>
                                <div style=${avatarStyle(p.initials, p.color)}>${p.initials}</div>
                            </ui-item-media>
                            <ui-item-content>
                                <ui-item-title>${p.name}</ui-item-title>
                                <ui-item-description>${p.email}</ui-item-description>
                            </ui-item-content>
                            <ui-item-actions>
                                <button style=${btnStyle} title="Invite">${plusIcon}</button>
                            </ui-item-actions>
                        </ui-item>
                        ${i < people.length - 1 ? html`<ui-item-separator></ui-item-separator>` : ''}
                    `)}
                </ui-item-group>
            </div>
        `;
    },
};

/* ── MusicList ───────────────────────────────────────────────────── */
export const MusicList: Story = {
    name: 'Music List',
    render: () => {
        const songs = [
            { title: 'Midnight City Lights', artist: 'Neon Dreams',     duration: '3:45', color: '#3b82f6' },
            { title: 'Coffee Shop Conversations', artist: 'Morning Brew', duration: '4:05', color: '#8b5cf6' },
            { title: 'Digital Rain',         artist: 'Cyber Symphony',   duration: '3:30', color: '#10b981' },
        ];

        return html`
            <div style="max-width: 480px; padding: 24px;">
                <ui-item-group style="--ui-item-group-gap: 6px;">
                    ${songs.map(s => html`
                        <ui-item variant="outline" size="sm">
                            <ui-item-media variant="icon">
                                <div style="
                                    width: 32px; height: 32px; border-radius: 6px;
                                    background: ${s.color}22; color: ${s.color};
                                    display: flex; align-items: center; justify-content: center;
                                ">${musicIcon}</div>
                            </ui-item-media>
                            <ui-item-content>
                                <ui-item-title>${s.title}</ui-item-title>
                                <ui-item-description>${s.artist}</ui-item-description>
                            </ui-item-content>
                            <ui-item-content style="flex: 0 0 auto; text-align: right;">
                                <ui-item-description>${s.duration}</ui-item-description>
                            </ui-item-content>
                        </ui-item>
                    `)}
                </ui-item-group>
            </div>
        `;
    },
};

/* ── Notifications ───────────────────────────────────────────────── */
export const Notifications: Story = {
    name: 'Notifications',
    render: () => {
        const items = [
            { icon: shieldIcon, color: '#ef4444', title: 'Security Alert', desc: 'Unusual login from Berlin, DE.', time: '2m ago' },
            { icon: bellIcon,   color: '#f59e0b', title: 'Reminder',       desc: 'Team standup starts in 5 minutes.', time: '5m ago' },
            { icon: inboxIcon,  color: '#3b82f6', title: 'New Message',    desc: 'You have 3 unread messages.', time: '12m ago' },
        ];

        return html`
            <div style="max-width: 400px; padding: 24px;">
                <p style="margin: 0 0 12px; font-weight: 600; font-family: system-ui; font-size: 0.9375rem; color: #111827;">
                    Notifications
                </p>
                <ui-item-group>
                    ${items.map(n => html`
                        <ui-item variant="muted">
                            <ui-item-media variant="icon" style="--ui-item-media-icon-bg: ${n.color}22; --ui-item-media-icon-color: ${n.color};">
                                ${n.icon}
                            </ui-item-media>
                            <ui-item-content>
                                <ui-item-title>${n.title}</ui-item-title>
                                <ui-item-description>${n.desc}</ui-item-description>
                            </ui-item-content>
                            <ui-item-actions>
                                <span style="font-size:0.75rem;color:#9ca3af;white-space:nowrap;">${n.time}</span>
                            </ui-item-actions>
                        </ui-item>
                    `)}
                </ui-item-group>
            </div>
        `;
    },
};

/* ── CustomProperties ────────────────────────────────────────────── */
export const CustomProperties: Story = {
    name: 'CSS Custom Properties',
    render: () => html`
        <div style="max-width: 480px; padding: 24px; display: flex; flex-direction: column; gap: 12px;">
            <p style="margin: 0 0 4px; font-size: 0.8125rem; color: #6b7280; font-family: system-ui;">
                Override CSS custom properties for theming.
            </p>
            <ui-item variant="outline" style="
                --ui-item-padding: 20px;
                --ui-item-gap: 16px;
                --ui-item-media-icon-bg: #ede9fe;
                --ui-item-media-icon-color: #7c3aed;
                --ui-border-color: #c4b5fd;
                border-radius: 12px;
            ">
                <ui-item-media variant="icon">${bellIcon}</ui-item-media>
                <ui-item-content>
                    <ui-item-title>Purple Theme</ui-item-title>
                    <ui-item-description>Custom padding, gap, icon colour, and border.</ui-item-description>
                </ui-item-content>
                <ui-item-actions>
                    <button style="
                        padding: 6px 14px; border-radius: 8px;
                        border: 1px solid #c4b5fd; background: #ede9fe;
                        color: #7c3aed; font-size: 0.8125rem; font-weight: 500;
                        font-family: system-ui; cursor: pointer;
                    ">Subscribe</button>
                </ui-item-actions>
            </ui-item>
        </div>
    `,
};
