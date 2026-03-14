import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-hover-card';
import '../box/flint-box';

const meta: Meta = {
    title: 'Data Display/Hover Card',
    component: 'flint-hover-card',
    parameters: {
        docs: {
            description: {
                component: `
For sighted users to preview content available behind a link or interactive element.

### Components
- **\`flint-hover-card\`** — Root. Manages open/close state with configurable delays. Fires \`flint-hover-card-open\` / \`flint-hover-card-close\`.
- **\`flint-hover-card-trigger\`** — The element that activates the card on hover or focus.
- **\`flint-hover-card-content\`** — The floating card panel. Positioned via \`side\` and \`align\` props.

### Usage
\`\`\`html
<flint-hover-card open-delay="700" close-delay="300">
  <flint-hover-card-trigger>
    <a href="#">@nextjs</a>
  </flint-hover-card-trigger>
  <flint-hover-card-content side="bottom" align="center">
    <p>Rich preview content</p>
  </flint-hover-card-content>
</flint-hover-card>
\`\`\`

### Delays
Use \`open-delay\` and \`close-delay\` to control timing.
The close delay gives the user time to move from the trigger to the card.

### Positioning
Use \`side\` (\`top\` | \`right\` | \`bottom\` | \`left\`) and \`align\` (\`start\` | \`center\` | \`end\`) on \`flint-hover-card-content\`.

### CSS Custom Properties
| Property | Default | Description |
|---|---|---|
| \`--flint-hovercard-bg\` | \`#fff\` | Card background |
| \`--flint-hovercard-border-color\` | \`#e5e7eb\` | Card border color |
| \`--flint-hovercard-radius\` | \`8px\` | Card corner radius |
| \`--flint-hovercard-shadow\` | \`0 4px 16px rgba(0,0,0,.12)\` | Card shadow |
| \`--flint-hovercard-padding\` | \`16px\` | Inner padding |
| \`--flint-hovercard-min-width\` | \`200px\` | Minimum card width |
| \`--flint-hovercard-offset\` | \`8px\` | Gap between trigger and card |
| \`--flint-hovercard-duration\` | \`150ms\` | Fade-in/out duration |
| \`--flint-hovercard-z-index\` | \`1000\` | Stack order |
                `,
            },
        },
    },
    argTypes: {
        openDelay:  { control: { type: 'number' }, description: 'Delay in ms before the card opens' },
        closeDelay: { control: { type: 'number' }, description: 'Delay in ms before the card closes' },
    },
    args: {
        openDelay: 700,
        closeDelay: 300,
    },
};

export default meta;
type Story = StoryObj;

/* ── shared styles ─────────────────────────────────────────────────── */

const wrapStyle = 'padding: 120px 160px; display: flex; justify-content: center; align-items: center;';
const linkStyle = 'color: #3b82f6; text-decoration: underline; font-family: system-ui, sans-serif; font-size: 0.9375rem; cursor: pointer;';
const btnStyle  = 'padding: 8px 16px; border: 1px solid #e5e7eb; border-radius: 6px; background: #fff; cursor: pointer; font-family: system-ui, sans-serif; font-size: 0.875rem;';

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
    render: (args) => html`
        <div style=${wrapStyle}>
            <flint-hover-card .openDelay=${args['openDelay']} .closeDelay=${args['closeDelay']}>
                <flint-hover-card-trigger>
                    <a href="#" style=${linkStyle}>@nextjs</a>
                </flint-hover-card-trigger>
                <flint-hover-card-content style="width: 260px;">
                    <div style="display: flex; flex-direction: column; gap: 12px; font-family: system-ui, sans-serif;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="
                                width: 44px; height: 44px; border-radius: 50%;
                                background: #000; display: flex; align-items: center;
                                justify-content: center; color: #fff;
                                font-size: 1.125rem; font-weight: 700; flex-shrink: 0;
                            ">N</div>
                            <div>
                                <div style="font-weight: 600; font-size: 0.9375rem; color: #111827;">Next.js</div>
                                <div style="font-size: 0.8125rem; color: #6b7280;">@nextjs</div>
                            </div>
                        </div>
                        <p style="margin: 0; font-size: 0.875rem; line-height: 1.5; color: #374151;">
                            The React Framework – created and maintained by @vercel.
                        </p>
                        <div style="font-size: 0.75rem; color: #9ca3af;">
                            Joined December 2021
                        </div>
                    </div>
                </flint-hover-card-content>
            </flint-hover-card>
        </div>
    `,
};

/* ── Sides ───────────────────────────────────────────────────────── */
export const Sides: Story = {
    name: 'Sides',
    args: { openDelay: 100, closeDelay: 100 },
    render: (args) => html`
        <div style="padding: 160px 80px; display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; align-items: center;">
            ${(['bottom', 'top', 'right', 'left'] as const).map(side => html`
                <flint-hover-card .openDelay=${args['openDelay']} .closeDelay=${args['closeDelay']}>
                    <flint-hover-card-trigger>
                        <button style="${btnStyle} text-transform: capitalize;">${side}</button>
                    </flint-hover-card-trigger>
                    <flint-hover-card-content .side=${side}>
                        <div style="font-family: system-ui, sans-serif;">
                            <div style="font-weight: 600; margin-bottom: 4px; color: #111827;">Hover Card</div>
                            <div style="font-size: 0.8125rem; color: #6b7280; min-width: 160px;">
                                Appears on the <strong>${side}</strong> side.
                            </div>
                        </div>
                    </flint-hover-card-content>
                </flint-hover-card>
            `)}
        </div>
    `,
};

/* ── Alignment ───────────────────────────────────────────────────── */
export const Alignment: Story = {
    name: 'Alignment',
    render: () => html`
        <div style="padding: 120px 80px; display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; align-items: center;">
            ${(['start', 'center', 'end'] as const).map(align => html`
                <flint-hover-card open-delay="100" close-delay="100">
                    <flint-hover-card-trigger>
                        <button style=${btnStyle}>${align}</button>
                    </flint-hover-card-trigger>
                    <flint-hover-card-content side="bottom" .align=${align} style="width: 200px;">
                        <div style="font-family: system-ui, sans-serif;">
                            <div style="font-weight: 600; margin-bottom: 4px; color: #111827;">Aligned: ${align}</div>
                            <div style="font-size: 0.8125rem; color: #6b7280;">
                                Card is aligned to the <strong>${align}</strong> of the trigger.
                            </div>
                        </div>
                    </flint-hover-card-content>
                </flint-hover-card>
            `)}
        </div>
    `,
};

/* ── WithAvatar (profile card) ───────────────────────────────────── */
export const WithAvatar: Story = {
    name: 'Profile Card',
    render: () => html`
        <div style=${wrapStyle}>
            <flint-hover-card open-delay="200" close-delay="200">
                <flint-hover-card-trigger>
                    <div style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-family: system-ui, sans-serif;">
                        <div style="
                            width: 36px; height: 36px; border-radius: 50%;
                            background: linear-gradient(135deg, #6366f1, #8b5cf6);
                            display: flex; align-items: center; justify-content: center;
                            color: #fff; font-size: 0.875rem; font-weight: 600;
                        ">JD</div>
                        <span style="font-size: 0.9375rem; color: #111827; font-weight: 500;">Jane Doe</span>
                    </div>
                </flint-hover-card-trigger>
                <flint-hover-card-content style="width: 280px;">
                    <div style="display: flex; flex-direction: column; gap: 12px; font-family: system-ui, sans-serif;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div style="
                                width: 56px; height: 56px; border-radius: 50%;
                                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                                display: flex; align-items: center; justify-content: center;
                                color: #fff; font-size: 1.25rem; font-weight: 700;
                            ">JD</div>
                            <button style="
                                padding: 6px 14px; border-radius: 6px;
                                background: #111827; color: #fff; border: none;
                                font-size: 0.8125rem; font-family: system-ui; cursor: pointer;
                            ">Follow</button>
                        </div>
                        <div>
                            <div style="font-weight: 600; font-size: 0.9375rem; color: #111827;">Jane Doe</div>
                            <div style="font-size: 0.8125rem; color: #6b7280;">@janedoe</div>
                        </div>
                        <p style="margin: 0; font-size: 0.875rem; line-height: 1.5; color: #374151;">
                            Product designer at Acme. Passionate about design systems, accessibility, and great user experience.
                        </p>
                        <div style="display: flex; gap: 16px; font-size: 0.8125rem;">
                            <span><strong style="color: #111827;">142</strong> <span style="color: #6b7280;">Following</span></span>
                            <span><strong style="color: #111827;">3.2K</strong> <span style="color: #6b7280;">Followers</span></span>
                        </div>
                    </div>
                </flint-hover-card-content>
            </flint-hover-card>
        </div>
    `,
};

/* ── CustomDelays ─────────────────────────────────────────────────── */
export const CustomDelays: Story = {
    name: 'Custom Delays',
    render: () => html`
        <div style="padding: 120px 80px; display: flex; gap: 32px; flex-wrap: wrap; justify-content: center; align-items: center;">
            <div style="text-align: center; font-family: system-ui, sans-serif;">
                <flint-hover-card open-delay="0" close-delay="0">
                    <flint-hover-card-trigger>
                        <button style=${btnStyle}>Instant (0ms / 0ms)</button>
                    </flint-hover-card-trigger>
                    <flint-hover-card-content>
                        <div style="font-family: system-ui, sans-serif; color: #111827;">
                            <div style="font-weight: 600; margin-bottom: 4px;">Instant</div>
                            <div style="font-size: 0.8125rem; color: #6b7280;">openDelay=0, closeDelay=0</div>
                        </div>
                    </flint-hover-card-content>
                </flint-hover-card>
                <p style="margin: 8px 0 0; font-size: 0.75rem; color: #9ca3af;">Opens &amp; closes immediately</p>
            </div>

            <div style="text-align: center; font-family: system-ui, sans-serif;">
                <flint-hover-card open-delay="700" close-delay="300">
                    <flint-hover-card-trigger>
                        <button style=${btnStyle}>Default (700ms / 300ms)</button>
                    </flint-hover-card-trigger>
                    <flint-hover-card-content>
                        <div style="font-family: system-ui, sans-serif; color: #111827;">
                            <div style="font-weight: 600; margin-bottom: 4px;">Default timing</div>
                            <div style="font-size: 0.8125rem; color: #6b7280;">openDelay=700, closeDelay=300</div>
                        </div>
                    </flint-hover-card-content>
                </flint-hover-card>
                <p style="margin: 8px 0 0; font-size: 0.75rem; color: #9ca3af;">Intentional hover only</p>
            </div>

            <div style="text-align: center; font-family: system-ui, sans-serif;">
                <flint-hover-card open-delay="200" close-delay="800">
                    <flint-hover-card-trigger>
                        <button style=${btnStyle}>Slow close (200ms / 800ms)</button>
                    </flint-hover-card-trigger>
                    <flint-hover-card-content>
                        <div style="font-family: system-ui, sans-serif; color: #111827;">
                            <div style="font-weight: 600; margin-bottom: 4px;">Slow close</div>
                            <div style="font-size: 0.8125rem; color: #6b7280;">openDelay=200, closeDelay=800</div>
                        </div>
                    </flint-hover-card-content>
                </flint-hover-card>
                <p style="margin: 8px 0 0; font-size: 0.75rem; color: #9ca3af;">Stays open longer after leaving</p>
            </div>
        </div>
    `,
};

/* ── KeyboardFocus ──────────────────────────────────────────────── */
export const KeyboardFocus: Story = {
    name: 'Keyboard / Focus',
    render: () => html`
        <div style="padding: 120px 80px; display: flex; flex-direction: column; align-items: center; gap: 16px; font-family: system-ui, sans-serif;">
            <p style="margin: 0 0 8px; font-size: 0.875rem; color: #6b7280;">Tab to the link to open the card via keyboard focus.</p>
            <flint-hover-card open-delay="0" close-delay="200">
                <flint-hover-card-trigger>
                    <a href="#" style=${linkStyle} tabindex="0">@nextjs</a>
                </flint-hover-card-trigger>
                <flint-hover-card-content style="width: 240px;">
                    <div style="font-family: system-ui, sans-serif;">
                        <div style="font-weight: 600; margin-bottom: 4px; color: #111827;">Next.js</div>
                        <div style="font-size: 0.8125rem; color: #6b7280; line-height: 1.5;">
                            Opens on focus (keyboard) and on hover (mouse).
                            Closes when focus leaves.
                        </div>
                    </div>
                </flint-hover-card-content>
            </flint-hover-card>
        </div>
    `,
};

/* ── Events ──────────────────────────────────────────────────────── */
export const Events: Story = {
    name: 'Events',
    render: () => {
        const log = (msg: string) => {
            const el = document.getElementById('hc-log');
            if (el) {
                const line = document.createElement('div');
                line.textContent = `${new Date().toLocaleTimeString()} — ${msg}`;
                line.style.cssText = 'font-size: 0.8125rem; color: #374151; padding: 2px 0; border-bottom: 1px solid #f3f4f6;';
                el.prepend(line);
                if (el.children.length > 5) el.lastElementChild?.remove();
            }
        };

        return html`
            <div style="padding: 120px 80px; display: flex; flex-direction: column; align-items: center; gap: 24px; font-family: system-ui, sans-serif;">
                <flint-hover-card
                    open-delay="300"
                    close-delay="200"
                    @flint-hover-card-open=${() => log('flint-hover-card-open fired')}
                    @flint-hover-card-close=${() => log('flint-hover-card-close fired')}
                >
                    <flint-hover-card-trigger>
                        <button style=${btnStyle}>Hover to see events</button>
                    </flint-hover-card-trigger>
                    <flint-hover-card-content>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px; color: #111827;">Event log</div>
                            <div style="font-size: 0.8125rem; color: #6b7280;">Open/close events are logged below.</div>
                        </div>
                    </flint-hover-card-content>
                </flint-hover-card>

                <flint-box border="1px solid #e5e7eb" borderRadius="8px" style="width: 320px; overflow: hidden;">
                    <flint-box p="8px 12px" bgcolor="var(--flint-muted-background, #f9fafb)" style="font-size: 0.75rem; font-weight: 600; color: #6b7280; border-bottom: 1px solid #e5e7eb;">
                        Event log
                    </flint-box>
                    <flint-box id="hc-log" p="8px 12px" style="min-height: 80px;">
                        <div style="font-size: 0.8125rem; color: #9ca3af; font-style: italic;">
                            Hover the button to see events…
                        </div>
                    </flint-box>
                </flint-box>
            </div>
        `;
    },
};
