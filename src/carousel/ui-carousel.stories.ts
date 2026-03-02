import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-carousel';

const meta: Meta = {
  title: 'Navigation/Carousel',
  component: 'ui-carousel',
  parameters: {
    docs: {
      description: {
        component: `
A composable carousel (slideshow) component built from five sub-components.

### Components
- **\`ui-carousel\`** — Root container. Owns navigation state, keyboard handling and autoplay.
- **\`ui-carousel-content\`** — The scrolling viewport. Place all slides inside here.
- **\`ui-carousel-item\`** — An individual slide wrapper.
- **\`ui-carousel-previous\`** — "Go back" button. Auto-connects to the nearest \`ui-carousel\` ancestor.
- **\`ui-carousel-next\`** — "Go forward" button. Auto-connects to the nearest \`ui-carousel\` ancestor.

### Keyboard navigation
When the carousel container is focused, use **ArrowLeft / ArrowRight** (horizontal) or **ArrowUp / ArrowDown** (vertical) to navigate slides.
        `,
      },
    },
  },
  argTypes: {
    loop: { control: 'boolean' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    autoplay: {
      control: { type: 'number', min: 0, step: 500 },
      description: 'Auto-advance interval in ms. 0 = disabled.',
    },
    itemsPerView: {
      control: { type: 'number', min: 1, max: 5, step: 1 },
      description: 'Number of slides visible at once.',
    },
  },
  args: {
    loop: false,
    orientation: 'horizontal',
    autoplay: 0,
    itemsPerView: 1,
  },
};

export default meta;
type Story = StoryObj;

/* ── slide helpers ──────────────────────────────────────────────────────── */
const slideColors = [
  { bg: '#3b82f6', label: 'Slide 1', color: '#fff' },
  { bg: '#8b5cf6', label: 'Slide 2', color: '#fff' },
  { bg: '#10b981', label: 'Slide 3', color: '#fff' },
  { bg: '#f59e0b', label: 'Slide 4', color: '#fff' },
  { bg: '#ef4444', label: 'Slide 5', color: '#fff' },
];

const colorSlide = (s: (typeof slideColors)[number]) => html`
  <ui-carousel-item>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 240px;
        background: ${s.bg};
        color: ${s.color};
        font-size: 1.5rem;
        font-weight: 700;
        font-family: var(--ui-font-family, system-ui);
        border-radius: 8px;
      "
    >
      ${s.label}
    </div>
  </ui-carousel-item>
`;

/* ── Default ─────────────────────────────────────────────────────────────── */
export const Default: Story = {
  render: (args: Record<string, unknown>) => {
    const isVertical = args.orientation === 'vertical';
    const n = Math.max(1, Number(args.itemsPerView) || 1);
    const gapPx = n > 1 ? 12 : 0;
    const wrapStyle = isVertical
      ? 'display: flex; flex-direction: column; align-items: center; gap: 12px;'
      : 'display: flex; align-items: center; gap: 12px;';
    // For vertical: container must fit n slides (240px each) plus gaps between them
    const verticalH = n * 240 + (n - 1) * gapPx;
    const contentStyle = isVertical
      ? `--ui-carousel-height: ${verticalH}px; width: 100%;`
      : 'flex: 1 1 0%; min-width: 0;';

    return html`
      <div style="max-width: 560px; padding: 24px; --ui-carousel-gap: ${gapPx}px;">
        <ui-carousel
          .loop=${Boolean(args.loop)}
          .orientation=${String(args.orientation || 'horizontal')}
          .autoplay=${Number(args.autoplay) || 0}
          .itemsPerView=${n}
        >
          <div style=${wrapStyle}>
            <ui-carousel-previous></ui-carousel-previous>
            <ui-carousel-content style=${contentStyle}>
              ${slideColors.map(colorSlide)}
            </ui-carousel-content>
            <ui-carousel-next></ui-carousel-next>
          </div>
        </ui-carousel>
      </div>
    `;
  },
};

/* ── WithImages ──────────────────────────────────────────────────────────── */
export const WithImages: Story = {
  render: (args: Record<string, unknown>) => {
    const n = Math.max(1, Number(args.itemsPerView) || 1);
    const gap = n > 1 ? '8px' : '0px';
    return html`
      <div style="max-width: 560px; padding: 24px; --ui-carousel-gap: ${gap};">
        <ui-carousel
          .loop=${Boolean(args.loop)}
          .itemsPerView=${n}
        >
          <div style="display: flex; align-items: center; gap: 12px;">
            <ui-carousel-previous></ui-carousel-previous>
            <ui-carousel-content style="flex: 1 1 0%; min-width: 0;">
              <ui-carousel-item>
                <img
                  .src=${'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
                  alt="Mountain landscape"
                  style="width: 100%; height: 260px; object-fit: cover; display: block; border-radius: 8px;"
                  loading="lazy"
                />
              </ui-carousel-item>
              <ui-carousel-item>
                <img
                  .src=${'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'}
                  alt="Tropical beach"
                  style="width: 100%; height: 260px; object-fit: cover; display: block; border-radius: 8px;"
                  loading="lazy"
                />
              </ui-carousel-item>
              <ui-carousel-item>
                <img
                  .src=${'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80'}
                  alt="Forest path"
                  style="width: 100%; height: 260px; object-fit: cover; display: block; border-radius: 8px;"
                  loading="lazy"
                />
              </ui-carousel-item>
            </ui-carousel-content>
            <ui-carousel-next></ui-carousel-next>
          </div>
        </ui-carousel>
      </div>
    `;
  },
};

/* ── Vertical ────────────────────────────────────────────────────────────── */
export const Vertical: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 24px;">
      <ui-carousel orientation="vertical">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <ui-carousel-previous orientation="vertical"></ui-carousel-previous>
          <ui-carousel-content
            orientation="vertical"
            style="--ui-carousel-height: 200px; width: 100%;"
          >
            ${slideColors.slice(0, 3).map(colorSlide)}
          </ui-carousel-content>
          <ui-carousel-next orientation="vertical"></ui-carousel-next>
        </div>
      </ui-carousel>
    </div>
  `,
};

/* ── VerticalMultiple ────────────────────────────────────────────────────── */
export const VerticalMultiple: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 24px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
        Vertical carousel with three slides visible at once.
      </p>
      <ui-carousel
        orientation="vertical"
        items-per-view="3"
        style="--ui-carousel-gap: 12px;"
      >
        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <ui-carousel-previous orientation="vertical"></ui-carousel-previous>
          <ui-carousel-content
            orientation="vertical"
            style="--ui-carousel-height: 744px; width: 100%;"
          >
            ${slideColors.map(colorSlide)}
          </ui-carousel-content>
          <ui-carousel-next orientation="vertical"></ui-carousel-next>
        </div>
      </ui-carousel>
    </div>
  `,
};

/* ── Loop ────────────────────────────────────────────────────────────────── */
export const Loop: Story = {
  render: () => html`
    <div style="max-width: 560px; padding: 24px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
        Loop is enabled — navigation wraps from the last slide back to the first.
      </p>
      <ui-carousel loop>
        <div style="display: flex; align-items: center; gap: 12px;">
          <ui-carousel-previous></ui-carousel-previous>
          <ui-carousel-content style="flex: 1 1 0%; min-width: 0;">
            ${slideColors.map(colorSlide)}
          </ui-carousel-content>
          <ui-carousel-next></ui-carousel-next>
        </div>
      </ui-carousel>
    </div>
  `,
};

/* ── Autoplay ────────────────────────────────────────────────────────────── */
export const Autoplay: Story = {
  render: () => html`
    <div style="max-width: 560px; padding: 24px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
        Slides advance automatically every 2 seconds (loop enabled).
      </p>
      <ui-carousel loop autoplay="2000">
        <div style="display: flex; align-items: center; gap: 12px;">
          <ui-carousel-previous></ui-carousel-previous>
          <ui-carousel-content style="flex: 1 1 0%; min-width: 0;">
            ${slideColors.map(colorSlide)}
          </ui-carousel-content>
          <ui-carousel-next></ui-carousel-next>
        </div>
      </ui-carousel>
    </div>
  `,
};

/* ── WithIndicators ──────────────────────────────────────────────────────── */
export const WithIndicators: Story = {
  render: () => {
    let currentIndex = 0;
    const total = 4;

    const updateDots = (carousel: HTMLElement) => {
      const dots =
        carousel.parentElement?.querySelectorAll<HTMLElement>('.dot') ?? [];
      dots.forEach((d, i) => {
        d.style.background =
          i === currentIndex ? '#3b82f6' : 'rgba(0,0,0,0.2)';
      });
    };

    return html`
      <div style="max-width: 560px; padding: 24px;">
        <ui-carousel
          loop
          @ui-carousel-change=${(e: CustomEvent<{ index: number }>) => {
            currentIndex = e.detail.index;
            updateDots(e.currentTarget as HTMLElement);
          }}
        >
          <div style="display: flex; align-items: center; gap: 12px;">
            <ui-carousel-previous></ui-carousel-previous>
            <ui-carousel-content style="flex: 1 1 0%; min-width: 0;">
              ${slideColors.slice(0, total).map(colorSlide)}
            </ui-carousel-content>
            <ui-carousel-next></ui-carousel-next>
          </div>
          <!-- Dot indicators -->
          <div style="display: flex; justify-content: center; gap: 8px; margin-top: 16px;">
            ${Array.from({ length: total }, (_, i) => html`
              <button
                class="dot"
                aria-label="Go to slide ${i + 1}"
                style="
                  width: 8px; height: 8px; border-radius: 50%; border: none;
                  background: ${i === 0 ? '#3b82f6' : 'rgba(0,0,0,0.2)'};
                  cursor: pointer; padding: 0; transition: background 0.2s;
                "
                @click=${(e: Event) => {
                  const carousel = (e.currentTarget as HTMLElement)
                    .closest('ui-carousel') as (HTMLElement & { goTo(n: number): void }) | null;
                  carousel?.goTo(i);
                }}
              ></button>
            `)}
          </div>
        </ui-carousel>
      </div>
    `;
  },
};

/* ── OverlayButtons ──────────────────────────────────────────────────────── */
export const OverlayButtons: Story = {
  render: () => html`
    <div style="max-width: 560px; padding: 24px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
        Navigation buttons positioned absolutely over the content.
      </p>
      <ui-carousel loop style="position: relative;">
        <ui-carousel-content>
          ${slideColors.slice(0, 3).map(colorSlide)}
        </ui-carousel-content>
        <ui-carousel-previous
          style="position: absolute; left: 8px; top: 50%; transform: translateY(-50%);"
        ></ui-carousel-previous>
        <ui-carousel-next
          style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%);"
        ></ui-carousel-next>
      </ui-carousel>
    </div>
  `,
};

/* ── MultipleItems ───────────────────────────────────────────────────────── */
export const MultipleItems: Story = {
  render: () => html`
    <div style="max-width: 720px; padding: 24px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
        Three slides visible at once. Each <code>next()</code> advances by one slide.
        Set <code>--ui-carousel-gap</code> for spacing.
      </p>
      <ui-carousel items-per-view="3" style="--ui-carousel-gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <ui-carousel-previous></ui-carousel-previous>
          <ui-carousel-content style="flex: 1 1 0%; min-width: 0;">
            ${slideColors.map(colorSlide)}
          </ui-carousel-content>
          <ui-carousel-next></ui-carousel-next>
        </div>
      </ui-carousel>
    </div>
  `,
};

/* ── CardSlider ──────────────────────────────────────────────────────────── */

const cardData = [
  { title: 'Mountains', desc: 'Explore alpine trails and breathtaking peaks.', emoji: '🏔️', accent: '#3b82f6' },
  { title: 'Ocean', desc: 'Dive into crystal-clear waters and coral reefs.', emoji: '🌊', accent: '#0ea5e9' },
  { title: 'Forest', desc: 'Wander through ancient woodland and wildlife.', emoji: '🌲', accent: '#10b981' },
  { title: 'Desert', desc: 'Discover vast dunes and starlit nights.', emoji: '🏜️', accent: '#f59e0b' },
  { title: 'City', desc: 'Uncover culture, architecture and street food.', emoji: '🏙️', accent: '#8b5cf6' },
  { title: 'Island', desc: 'Relax on white-sand beaches under the sun.', emoji: '🏝️', accent: '#ec4899' },
];

const card = (d: typeof cardData[number]) => html`
  <ui-carousel-item>
    <div style="
      padding: 20px;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      height: 200px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-family: var(--ui-font-family, system-ui);
    ">
      <div style="font-size: 2rem; line-height: 1;">${d.emoji}</div>
      <div style="font-weight: 700; font-size: 1rem; color: ${d.accent};">${d.title}</div>
      <div style="font-size: 0.8rem; color: #6b7280; line-height: 1.4;">${d.desc}</div>
    </div>
  </ui-carousel-item>
`;

export const CardSlider: Story = {
  render: () => html`
    <div style="max-width: 840px; padding: 24px; background: #f9fafb; border-radius: 16px;">
      <h3 style="margin: 0 0 16px; font-size: 1.25rem; font-family: system-ui; color: #111827;">
        Destinations
      </h3>
      <ui-carousel items-per-view="3" style="--ui-carousel-gap: 16px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <ui-carousel-previous></ui-carousel-previous>
          <ui-carousel-content style="flex: 1 1 0%; min-width: 0;">
            ${cardData.map(card)}
          </ui-carousel-content>
          <ui-carousel-next></ui-carousel-next>
        </div>
      </ui-carousel>
    </div>
  `,
};

/* ── TwoItemGrid ─────────────────────────────────────────────────────────── */
export const TwoItemGrid: Story = {
  render: () => html`
    <div style="max-width: 640px; padding: 24px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
        Two slides side-by-side with overlay navigation.
      </p>
      <ui-carousel
        items-per-view="2"
        loop
        style="position: relative; --ui-carousel-gap: 16px;"
      >
        <ui-carousel-content>
          ${slideColors.map(colorSlide)}
        </ui-carousel-content>
        <ui-carousel-previous
          style="position: absolute; left: -18px; top: 50%; transform: translateY(-50%);"
        ></ui-carousel-previous>
        <ui-carousel-next
          style="position: absolute; right: -18px; top: 50%; transform: translateY(-50%);"
        ></ui-carousel-next>
      </ui-carousel>
    </div>
  `,
};
