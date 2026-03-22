import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-carousel';
import '../box/flint-box';
import '../paper/flint-paper';

const meta: Meta = {
  title: 'Data Display/Carousel',
  component: 'flint-carousel',
  parameters: {
    a11y: {
        config: {
            rules: [
                { id: 'color-contrast', enabled: false },
            ],
        },
    },
    docs: {
      description: {
        component: `
#### \`<flint-carousel-content>\`

- **Tag**: \`<flint-carousel-content>\`
- **Class**: \`FlintCarouselContent\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`index\` | \`index\` | \`number\` | \`0\` | Zero-based index of the first visible slide. |
| \`itemsPerView\` | \`items-per-view\` | \`number\` | \`1\` | Number of slides visible at once. |
| \`orientation\` | \`orientation\` | \`Orientation\` | \`'horizontal'\` | Slide direction axis. |

#### CSS Parts

| Name | Description |
|---|---|
| \`track\` | The track element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-primary-color\` | — |
| \`--flint-border-radius-md\` | — |

---

#### \`<flint-carousel-item>\`

- **Tag**: \`<flint-carousel-item>\`
- **Class**: \`FlintCarouselItem\`

#### CSS Parts

| Name | Description |
|---|---|
| \`base\` | The component's base wrapper element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-carousel-items-per-view\` | \`1\` |

---

#### \`<flint-carousel-previous>\`

Carousel Previous: navigation button to go to the previous slide.

- **Tag**: \`<flint-carousel-previous>\`
- **Class**: \`FlintCarouselPrevious\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the previous button is disabled. |
| \`orientation\` | \`orientation\` | \`Orientation\` | \`'horizontal'\` | Slide direction axis, inherited from the parent carousel. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Custom icon content, replaces default chevron. |

#### CSS Parts

| Name | Description |
|---|---|
| \`button\` | The button element. |

---

#### \`<flint-carousel-next>\`

Carousel Next: navigation button to go to the next slide.

- **Tag**: \`<flint-carousel-next>\`
- **Class**: \`FlintCarouselNext\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the next button is disabled. |
| \`orientation\` | \`orientation\` | \`Orientation\` | \`'horizontal'\` | Slide direction axis, inherited from the parent carousel. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Custom icon content, replaces default chevron. |

#### CSS Parts

| Name | Description |
|---|---|
| \`button\` | The button element. |

---

#### \`<flint-carousel>\`

Carousel: a slideshow component for cycling through content.

- **Tag**: \`<flint-carousel>\`
- **Class**: \`FlintCarousel\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`loop\` | \`loop\` | \`boolean\` | \`false\` | When true, navigation wraps from last slide back to first and vice versa. |
| \`orientation\` | \`orientation\` | \`Orientation\` | \`'horizontal'\` | Slide direction axis. |
| \`autoplay\` | \`autoplay\` | \`number\` | \`0\` | Auto-advance interval in milliseconds. Set to 0 to disable. |
| \`itemsPerView\` | \`items-per-view\` | \`number\` | \`1\` | Number of slides visible simultaneously. |
| \`label\` | \`label\` | \`string\` | \`'Carousel'\` | Accessible label for the carousel region. |
| \`touch\` | \`touch\` | \`boolean\` | \`true\` | Enable touch/swipe gestures. |
| \`mouseDragging\` | \`mouse-dragging\` | \`boolean\` | \`false\` | Enable mouse-based drag navigation (mousedown/mousemove/mouseup). |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-carousel-change\` | \`&#123; index: number; total: number &#125;\` | Fired when the active slide changes. detail: \`&#123; index: number; total: number &#125;\` |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Carousel content: flint-carousel-content, flint-carousel-previous, flint-carousel-next. |

#### CSS Parts

| Name | Description |
|---|---|
| \`base\` | The component's base wrapper element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-carousel-gap\` | \`0px\` |
| \`--flint-carousel-duration\` | \`0.35s\` |
| \`--flint-carousel-ease\` | \`cubic-bezier(0.25, 0.1, 0.25, 1\` |
| \`--flint-carousel-height\` | \`320px\` |
| \`--flint-carousel-items-per-view\` | \`1\` |

#### Methods

| Method | Description |
|---|---|
| \`next(): void\` | Advance to the next slide. |
| \`previous(): void\` | Go to the previous slide. |
| \`goTo(index: number): void\` | Jump to a specific slide (0-based index). |
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
  { bg: '#2563eb', label: 'Slide 1', color: '#fff' },
  { bg: '#7c3aed', label: 'Slide 2', color: '#fff' },
  { bg: '#059669', label: 'Slide 3', color: '#fff' },
  { bg: '#b45309', label: 'Slide 4', color: '#fff' },
  { bg: '#dc2626', label: 'Slide 5', color: '#fff' },
];

const colorSlide = (s: (typeof slideColors)[number]) => html`
  <flint-carousel-item>
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
        font-family: var(--flint-font-family, system-ui);
        border-radius: 8px;
      "
    >
      ${s.label}
    </div>
  </flint-carousel-item>
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
      ? `--flint-carousel-height: ${verticalH}px; width: 100%;`
      : 'flex: 1 1 0%; min-width: 0;';

    return html`
      <div style="max-width: 560px; padding: 24px; --flint-carousel-gap: ${gapPx}px;">
        <flint-carousel
          .loop=${Boolean(args.loop)}
          .orientation=${String(args.orientation || 'horizontal')}
          .autoplay=${Number(args.autoplay) || 0}
          .itemsPerView=${n}
        >
          <div style=${wrapStyle}>
            <flint-carousel-previous></flint-carousel-previous>
            <flint-carousel-content style=${contentStyle}>
              ${slideColors.map(colorSlide)}
            </flint-carousel-content>
            <flint-carousel-next></flint-carousel-next>
          </div>
        </flint-carousel>
      </div>
    `;
  },
};

Default.play = async ({ canvasElement }) => {
    const carousel = canvasElement.querySelector('flint-carousel') as HTMLElement & { goTo(n: number): void };
    await waitFor(() => expect(carousel).toBeTruthy());
    const nextBtn = canvasElement.querySelector('flint-carousel-next') as HTMLElement;
    if (nextBtn) {
        const btn = nextBtn.shadowRoot!.querySelector('button') as HTMLButtonElement;
        if (btn) {
            await userEvent.click(btn);
        }
    }
};

/* ── WithImages ──────────────────────────────────────────────────────────── */
export const WithImages: Story = {
  render: (args: Record<string, unknown>) => {
    const n = Math.max(1, Number(args.itemsPerView) || 1);
    const gap = n > 1 ? '8px' : '0px';
    return html`
      <div style="max-width: 560px; padding: 24px; --flint-carousel-gap: ${gap};">
        <flint-carousel
          .loop=${Boolean(args.loop)}
          .itemsPerView=${n}
        >
          <div style="display: flex; align-items: center; gap: 12px;">
            <flint-carousel-previous></flint-carousel-previous>
            <flint-carousel-content style="flex: 1 1 0%; min-width: 0;">
              <flint-carousel-item>
                <img
                  .src=${'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
                  alt="Mountain landscape"
                  style="width: 100%; height: 260px; object-fit: cover; display: block; border-radius: 8px;"
                  loading="lazy"
                />
              </flint-carousel-item>
              <flint-carousel-item>
                <img
                  .src=${'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'}
                  alt="Tropical beach"
                  style="width: 100%; height: 260px; object-fit: cover; display: block; border-radius: 8px;"
                  loading="lazy"
                />
              </flint-carousel-item>
              <flint-carousel-item>
                <img
                  .src=${'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80'}
                  alt="Forest path"
                  style="width: 100%; height: 260px; object-fit: cover; display: block; border-radius: 8px;"
                  loading="lazy"
                />
              </flint-carousel-item>
            </flint-carousel-content>
            <flint-carousel-next></flint-carousel-next>
          </div>
        </flint-carousel>
      </div>
    `;
  },
};

/* ── Vertical ────────────────────────────────────────────────────────────── */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 24px;">
      <flint-carousel .orientation=${String(args.orientation || 'vertical')} ?loop=${args.loop}>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <flint-carousel-previous orientation="vertical"></flint-carousel-previous>
          <flint-carousel-content
            orientation="vertical"
            style="--flint-carousel-height: 200px; width: 100%;"
          >
            ${slideColors.slice(0, 3).map(colorSlide)}
          </flint-carousel-content>
          <flint-carousel-next orientation="vertical"></flint-carousel-next>
        </div>
      </flint-carousel>
    </div>
  `,
};

/* ── VerticalMultiple ────────────────────────────────────────────────────── */
export const VerticalMultiple: Story = {
  args: { orientation: 'vertical', itemsPerView: 3 },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 400px; padding: 24px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563; font-family: system-ui;">
        Vertical carousel with three slides visible at once.
      </p>
      <flint-carousel
        .orientation=${String(args.orientation || 'vertical')}
        .itemsPerView=${Number(args.itemsPerView) || 3}
        ?loop=${args.loop}
        style="--flint-carousel-gap: 12px;"
      >
        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <flint-carousel-previous orientation="vertical"></flint-carousel-previous>
          <flint-carousel-content
            orientation="vertical"
            style="--flint-carousel-height: 744px; width: 100%;"
          >
            ${slideColors.map(colorSlide)}
          </flint-carousel-content>
          <flint-carousel-next orientation="vertical"></flint-carousel-next>
        </div>
      </flint-carousel>
    </div>
  `,
};

/* ── Loop ────────────────────────────────────────────────────────────────── */
export const Loop: Story = {
  args: { loop: true },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 560px; padding: 24px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563; font-family: system-ui;">
        Loop is enabled — navigation wraps from the last slide back to the first.
      </p>
      <flint-carousel .loop=${Boolean(args.loop)}>
        <div style="display: flex; align-items: center; gap: 12px;">
          <flint-carousel-previous></flint-carousel-previous>
          <flint-carousel-content style="flex: 1 1 0%; min-width: 0;">
            ${slideColors.map(colorSlide)}
          </flint-carousel-content>
          <flint-carousel-next></flint-carousel-next>
        </div>
      </flint-carousel>
    </div>
  `,
};

/* ── Autoplay ────────────────────────────────────────────────────────────── */
export const Autoplay: Story = {
  args: { loop: true, autoplay: 2000 },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 560px; padding: 24px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563; font-family: system-ui;">
        Slides advance automatically every 2 seconds (loop enabled).
      </p>
      <flint-carousel .loop=${Boolean(args.loop)} .autoplay=${Number(args.autoplay) || 0}>
        <div style="display: flex; align-items: center; gap: 12px;">
          <flint-carousel-previous></flint-carousel-previous>
          <flint-carousel-content style="flex: 1 1 0%; min-width: 0;">
            ${slideColors.map(colorSlide)}
          </flint-carousel-content>
          <flint-carousel-next></flint-carousel-next>
        </div>
      </flint-carousel>
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
          i === currentIndex ? '#2563eb' : 'rgba(0,0,0,0.2)';
      });
    };

    return html`
      <div style="max-width: 560px; padding: 24px;">
        <flint-carousel
          loop
          @flint-carousel-change=${(e: CustomEvent<{ index: number }>) => {
            currentIndex = e.detail.index;
            updateDots(e.currentTarget as HTMLElement);
          }}
        >
          <div style="display: flex; align-items: center; gap: 12px;">
            <flint-carousel-previous></flint-carousel-previous>
            <flint-carousel-content style="flex: 1 1 0%; min-width: 0;">
              ${slideColors.slice(0, total).map(colorSlide)}
            </flint-carousel-content>
            <flint-carousel-next></flint-carousel-next>
          </div>
          <!-- Dot indicators -->
          <div style="display: flex; justify-content: center; gap: 8px; margin-top: 16px;">
            ${Array.from({ length: total }, (_, i) => html`
              <button
                class="dot"
                aria-label="Go to slide ${i + 1}"
                style="
                  width: 8px; height: 8px; border-radius: 50%; border: none;
                  background: ${i === 0 ? '#2563eb' : 'rgba(0,0,0,0.2)'};
                  cursor: pointer; padding: 0; transition: background 0.2s;
                "
                @click=${(e: Event) => {
                  const carousel = (e.currentTarget as HTMLElement)
                    .closest('flint-carousel') as (HTMLElement & { goTo(n: number): void }) | null;
                  carousel?.goTo(i);
                }}
              ></button>
            `)}
          </div>
        </flint-carousel>
      </div>
    `;
  },
};

/* ── OverlayButtons ──────────────────────────────────────────────────────── */
export const OverlayButtons: Story = {
  render: () => html`
    <div style="max-width: 560px; padding: 24px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563; font-family: system-ui;">
        Navigation buttons positioned absolutely over the content.
      </p>
      <flint-carousel loop style="position: relative;">
        <flint-carousel-content>
          ${slideColors.slice(0, 3).map(colorSlide)}
        </flint-carousel-content>
        <flint-carousel-previous
          style="position: absolute; left: 8px; top: 50%; transform: translateY(-50%);"
        ></flint-carousel-previous>
        <flint-carousel-next
          style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%);"
        ></flint-carousel-next>
      </flint-carousel>
    </div>
  `,
};

/* ── MultipleItems ───────────────────────────────────────────────────────── */
export const MultipleItems: Story = {
  args: { itemsPerView: 3 },
  render: (args: Record<string, unknown>) => html`
    <div style="max-width: 720px; padding: 24px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563; font-family: system-ui;">
        Three slides visible at once. Each <code>next()</code> advances by one slide.
        Set <code>--flint-carousel-gap</code> for spacing.
      </p>
      <flint-carousel .itemsPerView=${Number(args.itemsPerView) || 3} ?loop=${args.loop} style="--flint-carousel-gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <flint-carousel-previous></flint-carousel-previous>
          <flint-carousel-content style="flex: 1 1 0%; min-width: 0;">
            ${slideColors.map(colorSlide)}
          </flint-carousel-content>
          <flint-carousel-next></flint-carousel-next>
        </div>
      </flint-carousel>
    </div>
  `,
};

/* ── CardSlider ──────────────────────────────────────────────────────────── */

const cardData = [
  { title: 'Mountains', desc: 'Explore alpine trails and breathtaking peaks.', emoji: '🏔️', accent: '#2563eb' },
  { title: 'Ocean', desc: 'Dive into crystal-clear waters and coral reefs.', emoji: '🌊', accent: '#0284c7' },
  { title: 'Forest', desc: 'Wander through ancient woodland and wildlife.', emoji: '🌲', accent: '#047857' },
  { title: 'Desert', desc: 'Discover vast dunes and starlit nights.', emoji: '🏜️', accent: '#b45309' },
  { title: 'City', desc: 'Uncover culture, architecture and street food.', emoji: '🏙️', accent: '#7c3aed' },
  { title: 'Island', desc: 'Relax on white-sand beaches under the sun.', emoji: '🏝️', accent: '#be185d' },
];

const card = (d: typeof cardData[number]) => html`
  <flint-carousel-item>
    <flint-paper elevation="1" style="padding: 20px; height: 200px; display: flex; flex-direction: column; gap: 8px; font-family: var(--flint-font-family, system-ui);">
      <div style="font-size: 2rem; line-height: 1;">${d.emoji}</div>
      <div style="font-weight: 700; font-size: 1rem; color: ${d.accent};">${d.title}</div>
      <div style="font-size: 0.8rem; color: #4b5563; line-height: 1.4;">${d.desc}</div>
    </flint-paper>
  </flint-carousel-item>
`;

export const CardSlider: Story = {
  render: () => html`
    <flint-box style="max-width: 840px;" p="24px" bgcolor="var(--flint-muted-background, #f9fafb)" borderRadius="16px">
      <h3 style="margin: 0 0 16px; font-size: 1.25rem; font-family: system-ui; color: #111827;">
        Destinations
      </h3>
      <flint-carousel items-per-view="3" style="--flint-carousel-gap: 16px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <flint-carousel-previous></flint-carousel-previous>
          <flint-carousel-content style="flex: 1 1 0%; min-width: 0;">
            ${cardData.map(card)}
          </flint-carousel-content>
          <flint-carousel-next></flint-carousel-next>
        </div>
      </flint-carousel>
    </flint-box>
  `,
};

/* ── TwoItemGrid ─────────────────────────────────────────────────────────── */
export const TwoItemGrid: Story = {
  render: () => html`
    <div style="max-width: 640px; padding: 24px;">
      <p style="margin: 0 0 12px; font-size: 0.875rem; color: #4b5563; font-family: system-ui;">
        Two slides side-by-side with overlay navigation.
      </p>
      <flint-carousel
        items-per-view="2"
        loop
        style="position: relative; --flint-carousel-gap: 16px;"
      >
        <flint-carousel-content>
          ${slideColors.map(colorSlide)}
        </flint-carousel-content>
        <flint-carousel-previous
          style="position: absolute; left: -18px; top: 50%; transform: translateY(-50%);"
        ></flint-carousel-previous>
        <flint-carousel-next
          style="position: absolute; right: -18px; top: 50%; transform: translateY(-50%);"
        ></flint-carousel-next>
      </flint-carousel>
    </div>
  `,
};
