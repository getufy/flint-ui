import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-image-list';
import './ui-image-list-item';
import './ui-image-list-item-bar';

const meta: Meta = {
  title: 'Layout/Image List',
  component: 'ui-image-list',
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'quilted', 'woven', 'masonry'],
    },
    cols: { control: { type: 'number', min: 1, max: 6 } },
    gap: { control: { type: 'number', min: 0, max: 32 } },
    rowHeight: { control: { type: 'number', min: 80, max: 400 } },
  },
  args: {
    variant: 'standard',
    cols: 3,
    gap: 4,
    rowHeight: 164,
  },
};

export default meta;
type Story = StoryObj;

// Curated Unsplash images with consistent, beautiful photos
const IMAGES = [
  { url: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=400&q=80', title: 'Breakfast', author: '@annapelzer' },
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', title: 'Mountains', author: '@samuelzeller' },
  { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80', title: 'Landscape', author: '@eepeng' },
  { url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400&q=80', title: 'Lake', author: '@jamie_fenn' },
  { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80', title: 'Forest', author: '@casey_horner' },
  { url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80', title: 'Dog', author: '@alvannee' },
  { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', title: 'Food', author: '@atasteofwellbeing' },
  { url: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&q=80', title: 'Smoothie', author: '@brenda_godinez' },
  { url: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&q=80', title: 'City', author: '@jamie_fenn' },
  { url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80', title: 'Beach', author: '@pexels' },
  { url: 'https://images.unsplash.com/photo-1544736779-b65bc62f7cfa?w=400&q=80', title: 'Architecture', author: '@iamjillian' },
  { url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&q=80', title: 'Abstract', author: '@pawel_czerwinski' },
];

// ── Standard ───────────────────────────────────────────────────────────────
export const Standard: Story = {
  render: (args) => html`
    <ui-image-list
      .variant=${args.variant}
      .cols=${args.cols}
      .gap=${args.gap}
      .rowHeight=${args.rowHeight}
    >
      ${IMAGES.slice(0, 9).map(img => html`
        <ui-image-list-item>
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
        </ui-image-list-item>
      `)}
    </ui-image-list>
  `,
};

// ── Quilted ─────────────────────────────────────────────────────────────────
export const Quilted: Story = {
  args: { variant: 'quilted', cols: 4, rowHeight: 121, gap: 4 },
  render: (args) => html`
    <ui-image-list variant="quilted" .cols=${args.cols} .gap=${args.gap} .rowHeight=${args.rowHeight}>
      <ui-image-list-item rows="2" cols="2">
        <img src="${IMAGES[0].url}" alt="${IMAGES[0].title}" loading="lazy" />
      </ui-image-list-item>
      <ui-image-list-item>
        <img src="${IMAGES[1].url}" alt="${IMAGES[1].title}" loading="lazy" />
      </ui-image-list-item>
      <ui-image-list-item>
        <img src="${IMAGES[2].url}" alt="${IMAGES[2].title}" loading="lazy" />
      </ui-image-list-item>
      <ui-image-list-item>
        <img src="${IMAGES[3].url}" alt="${IMAGES[3].title}" loading="lazy" />
      </ui-image-list-item>
      <ui-image-list-item>
        <img src="${IMAGES[4].url}" alt="${IMAGES[4].title}" loading="lazy" />
      </ui-image-list-item>
      <ui-image-list-item rows="2" cols="2">
        <img src="${IMAGES[5].url}" alt="${IMAGES[5].title}" loading="lazy" />
      </ui-image-list-item>
      <ui-image-list-item>
        <img src="${IMAGES[6].url}" alt="${IMAGES[6].title}" loading="lazy" />
      </ui-image-list-item>
      <ui-image-list-item>
        <img src="${IMAGES[7].url}" alt="${IMAGES[7].title}" loading="lazy" />
      </ui-image-list-item>
    </ui-image-list>
  `,
};

// ── Woven ───────────────────────────────────────────────────────────────────
export const Woven: Story = {
  args: { variant: 'woven', cols: 3, rowHeight: 100, gap: 4 },
  render: (args) => html`
    <ui-image-list variant="woven" .cols=${args.cols} .gap=${args.gap} .rowHeight=${args.rowHeight}>
      ${IMAGES.slice(0, 9).map((img, i) => html`
        <ui-image-list-item weave="${i % 2 === 0 ? 'odd' : 'even'}">
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
        </ui-image-list-item>
      `)}
    </ui-image-list>
  `,
};

// ── Masonry ─────────────────────────────────────────────────────────────────
export const Masonry: Story = {
  args: { variant: 'masonry', cols: 3, gap: 8, rowHeight: 164 },
  render: (args) => html`
    <ui-image-list variant="masonry" .cols=${args.cols} .gap=${args.gap}>
      ${IMAGES.slice(0, 9).map(img => html`
        <ui-image-list-item>
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
        </ui-image-list-item>
      `)}
    </ui-image-list>
  `,
};

// ── With Title Bars (Overlay) ───────────────────────────────────────────────
export const WithTitleBars: Story = {
  args: { variant: 'standard', cols: 3, gap: 4, rowHeight: 200 },
  render: (args) => html`
    <ui-image-list variant="standard" .cols=${args.cols} .gap=${args.gap} .rowHeight=${args.rowHeight}>
      ${IMAGES.slice(0, 6).map(img => html`
        <ui-image-list-item>
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
          <ui-image-list-item-bar slot="bar">
            ${img.title}
            <span slot="subtitle">${img.author}</span>
            <button slot="action" style="background:none;border:none;cursor:pointer;color:#fff;font-size:18px;" title="Star">★</button>
          </ui-image-list-item-bar>
        </ui-image-list-item>
      `)}
    </ui-image-list>
  `,
};

// ── Title Bar Below Image ───────────────────────────────────────────────────
export const TitleBarBelow: Story = {
  args: { variant: 'standard', cols: 3, gap: 8, rowHeight: 200 },
  render: (args) => html`
    <ui-image-list variant="standard" .cols=${args.cols} .gap=${args.gap} ?autoRows=${true}>
      ${IMAGES.slice(0, 6).map(img => html`
        <ui-image-list-item bar-position="below">
          <img src="${img.url}" alt="${img.title}" loading="lazy" style="height:200px;object-fit:cover;display:block;width:100%;" />
          <ui-image-list-item-bar slot="bar" position="below">
            ${img.title}
            <span slot="subtitle">${img.author}</span>
            <button slot="action" style="background:none;border:none;cursor:pointer;font-size:18px;" title="Info">ℹ</button>
          </ui-image-list-item-bar>
        </ui-image-list-item>
      `)}
    </ui-image-list>
  `,
};

// ── Masonry with Title Bars ─────────────────────────────────────────────────
export const MasonryWithTitleBars: Story = {
  args: { variant: 'masonry', cols: 3, gap: 8 },
  render: (args) => html`
    <ui-image-list variant="masonry" .cols=${args.cols} .gap=${args.gap}>
      ${IMAGES.slice(0, 9).map(img => html`
        <ui-image-list-item bar-position="below">
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
          <ui-image-list-item-bar slot="bar" position="below">
            ${img.title}
            <span slot="subtitle">${img.author}</span>
          </ui-image-list-item-bar>
        </ui-image-list-item>
      `)}
    </ui-image-list>
  `,
};
