import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-image-list';
import './flint-image-list-item';
import './flint-image-list-item-bar';
import '../button/flint-button';

const meta: Meta = {
  title: 'Layout/Image List',
  component: 'flint-image-list',
  parameters: {
      a11y: {
          config: {
              rules: [
                  { id: 'list', enabled: false },
                  { id: 'aria-required-children', enabled: false },
              ],
          },
      },
      docs: {
            description: {
                component: `
#### \`<flint-image-list-item-bar>\`

A title/subtitle bar for \`flint-image-list-item\`.

- **Tag**: \`<flint-image-list-item-bar>\`
- **Class**: \`FlintImageListItemBar\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`position\` | \`position\` | \`'bottom' \\| 'top' \\| 'below'\` | \`'bottom'\` | Position hint for styling: 'bottom' (default overlay), 'top' (overlay), or 'below' (solid) |

#### Slots

| Name | Description |
|---|---|
| \`title\` | Title text. |
| \`subtitle\` | Subtitle text. |
| \`(default)\` | Action content. |

#### CSS Parts

| Name | Description |
|---|---|
| \`action\` | The action element. |
| \`base\` | The component's base wrapper element. |
| \`content\` | The content container. |
| \`subtitle\` | The subtitle element. |
| \`title\` | The title element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-image-bar-overlay-text\` | \`var(--flint-text-color-on-primary\` |
| \`--flint-font-family\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-text-color\` | — |
| \`--flint-border-color\` | — |
| \`--flint-image-fit\` | \`cover\` |

---

#### \`<flint-image-list-item>\`

A single item inside a \`flint-image-list\`.

- **Tag**: \`<flint-image-list-item>\`
- **Class**: \`FlintImageListItem\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`rows\` | \`rows\` | \`number\` | \`1\` | How many grid rows this item spans (quilted/woven only) |
| \`cols\` | \`cols\` | \`number\` | \`1\` | How many grid columns this item spans (quilted/woven only) |
| \`barPosition\` | \`bar-position\` | \`'overlay' \\| 'below'\` | \`'overlay'\` | Position of the title bar: 'overlay' (default) or 'below' |
| \`weave\` | \`weave\` | \`'odd' \\| 'even'\` | \`'odd'\` | Woven variant: 'odd' or 'even' identity for alternating height |
| \`aspectRatio\` | \`aspect-ratio\` | \`string\` | \`'auto'\` | CSS aspect-ratio for the cell (e.g. "1/1", "4/3", "3/4", "16/9", "9/16"). |
| \`fit\` | \`fit\` | \`ImageFit\` | \`'cover'\` | How the image fills the cell: 'cover' (default, crops to fill) |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Place an \`&lt;img&gt;\` or any content here. |
| \`bar\` | Place a \`flint-image-list-item-bar\` element here. |

#### CSS Parts

| Name | Description |
|---|---|
| \`base\` | The component's base wrapper element. |

---

#### \`<flint-image-list>\`

A container that displays images in an organized grid layout.
Supports standard, quilted, woven, and masonry variants.

- **Tag**: \`<flint-image-list>\`
- **Class**: \`FlintImageList\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`variant\` | \`variant\` | \`ImageListVariant\` | \`'standard'\` | Layout variant |
| \`cols\` | \`cols\` | \`number\` | \`3\` | Number of columns |
| \`gap\` | \`gap\` | \`number\` | \`4\` | Gap between items (in px) |
| \`rowHeight\` | \`rowHeight\` | \`number\` | \`164\` | Row height for non-masonry variants (in px). Ignored when autoRows=true. |
| \`autoRows\` | \`autoRows\` | \`boolean\` | \`false\` | When true, row height is automatic (use with bar-position="below") |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Place \`flint-image-list-item\` elements here. |

#### CSS Parts

| Name | Description |
|---|---|
| \`base\` | The component's base wrapper element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-image-list-gap\` | \`4px\` |
| \`--flint-image-list-row-height\` | \`164px\` |
                `,
            },
        },
  },
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

// Portrait/vertical images — these Unsplash photos are natively portrait-oriented
const PORTRAIT_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80', title: 'Portrait', author: '@slavomira' },
  { url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80', title: 'Fashion', author: '@omarprestegui' },
  { url: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&q=80', title: 'Street', author: '@domenicoloiaglio' },
  { url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80', title: 'Yellow', author: '@priscilladupreez' },
  { url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&q=80', title: 'Person', author: '@jhosnar' },
  { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', title: 'Smile', author: '@brookecagle' },
];

// ── Standard ────────────────────────────────────────────────────────────────
export const Standard: Story = {
  render: (args) => html`
    <flint-image-list
      .variant=${args.variant}
      .cols=${args.cols}
      .gap=${args.gap}
      .rowHeight=${args.rowHeight}
    >
      ${IMAGES.slice(0, 9).map(img => html`
        <flint-image-list-item>
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
        </flint-image-list-item>
      `)}
    </flint-image-list>
  `,
};

// ── Quilted ──────────────────────────────────────────────────────────────────
export const Quilted: Story = {
  args: { variant: 'quilted', cols: 4, rowHeight: 121, gap: 4 },
  render: (args) => html`
    <flint-image-list variant="quilted" .cols=${args.cols} .gap=${args.gap} .rowHeight=${args.rowHeight}>
      <flint-image-list-item rows="2" cols="2">
        <img src="${IMAGES[0].url}" alt="${IMAGES[0].title}" loading="lazy" />
      </flint-image-list-item>
      <flint-image-list-item>
        <img src="${IMAGES[1].url}" alt="${IMAGES[1].title}" loading="lazy" />
      </flint-image-list-item>
      <flint-image-list-item>
        <img src="${IMAGES[2].url}" alt="${IMAGES[2].title}" loading="lazy" />
      </flint-image-list-item>
      <flint-image-list-item>
        <img src="${IMAGES[3].url}" alt="${IMAGES[3].title}" loading="lazy" />
      </flint-image-list-item>
      <flint-image-list-item>
        <img src="${IMAGES[4].url}" alt="${IMAGES[4].title}" loading="lazy" />
      </flint-image-list-item>
      <flint-image-list-item rows="2" cols="2">
        <img src="${IMAGES[5].url}" alt="${IMAGES[5].title}" loading="lazy" />
      </flint-image-list-item>
      <flint-image-list-item>
        <img src="${IMAGES[6].url}" alt="${IMAGES[6].title}" loading="lazy" />
      </flint-image-list-item>
      <flint-image-list-item>
        <img src="${IMAGES[7].url}" alt="${IMAGES[7].title}" loading="lazy" />
      </flint-image-list-item>
    </flint-image-list>
  `,
};

// ── Quilted with Overlay Bars ────────────────────────────────────────────────
export const QuiltedWithBars: Story = {
  args: { variant: 'quilted', cols: 4, rowHeight: 121, gap: 4 },
  render: (args) => html`
    <flint-image-list variant="quilted" .cols=${args.cols} .gap=${args.gap} .rowHeight=${args.rowHeight}>
      <flint-image-list-item rows="2" cols="2">
        <img src="${IMAGES[0].url}" alt="${IMAGES[0].title}" loading="lazy" />
        <flint-image-list-item-bar slot="bar">${IMAGES[0].title}<span slot="subtitle">${IMAGES[0].author}</span></flint-image-list-item-bar>
      </flint-image-list-item>
      <flint-image-list-item>
        <img src="${IMAGES[1].url}" alt="${IMAGES[1].title}" loading="lazy" />
        <flint-image-list-item-bar slot="bar">${IMAGES[1].title}</flint-image-list-item-bar>
      </flint-image-list-item>
      <flint-image-list-item>
        <img src="${IMAGES[2].url}" alt="${IMAGES[2].title}" loading="lazy" />
        <flint-image-list-item-bar slot="bar">${IMAGES[2].title}</flint-image-list-item-bar>
      </flint-image-list-item>
      <flint-image-list-item>
        <img src="${IMAGES[3].url}" alt="${IMAGES[3].title}" loading="lazy" />
        <flint-image-list-item-bar slot="bar">${IMAGES[3].title}</flint-image-list-item-bar>
      </flint-image-list-item>
      <flint-image-list-item>
        <img src="${IMAGES[4].url}" alt="${IMAGES[4].title}" loading="lazy" />
        <flint-image-list-item-bar slot="bar">${IMAGES[4].title}</flint-image-list-item-bar>
      </flint-image-list-item>
      <flint-image-list-item rows="2" cols="2">
        <img src="${IMAGES[5].url}" alt="${IMAGES[5].title}" loading="lazy" />
        <flint-image-list-item-bar slot="bar">${IMAGES[5].title}<span slot="subtitle">${IMAGES[5].author}</span></flint-image-list-item-bar>
      </flint-image-list-item>
      <flint-image-list-item>
        <img src="${IMAGES[6].url}" alt="${IMAGES[6].title}" loading="lazy" />
        <flint-image-list-item-bar slot="bar">${IMAGES[6].title}</flint-image-list-item-bar>
      </flint-image-list-item>
      <flint-image-list-item>
        <img src="${IMAGES[7].url}" alt="${IMAGES[7].title}" loading="lazy" />
        <flint-image-list-item-bar slot="bar">${IMAGES[7].title}</flint-image-list-item-bar>
      </flint-image-list-item>
    </flint-image-list>
  `,
};

// ── Woven ────────────────────────────────────────────────────────────────────
export const Woven: Story = {
  args: { variant: 'woven', cols: 3, rowHeight: 100, gap: 4 },
  render: (args) => html`
    <flint-image-list variant="woven" .cols=${args.cols} .gap=${args.gap} .rowHeight=${args.rowHeight}>
      ${IMAGES.slice(0, 9).map((img, i) => html`
        <flint-image-list-item weave="${i % 2 === 0 ? 'odd' : 'even'}">
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
        </flint-image-list-item>
      `)}
    </flint-image-list>
  `,
};

// ── Masonry ──────────────────────────────────────────────────────────────────
export const Masonry: Story = {
  args: { variant: 'masonry', cols: 3, gap: 8, rowHeight: 164 },
  render: (args) => html`
    <flint-image-list variant="masonry" .cols=${args.cols} .gap=${args.gap}>
      ${IMAGES.slice(0, 9).map(img => html`
        <flint-image-list-item>
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
        </flint-image-list-item>
      `)}
    </flint-image-list>
  `,
};

// ── Vertical / Portrait Images ───────────────────────────────────────────────
export const VerticalImages: Story = {
  name: 'Vertical (Portrait) Images',
  args: { variant: 'standard', cols: 4, gap: 6 },
  render: (args) => html`
    <p style="margin:0 0 12px;font:14px system-ui;color:#4b5563;">
      Portrait images using <code>aspect-ratio="3/4"</code> on items and <code>autoRows</code> on the list.
    </p>
    <flint-image-list variant="standard" .cols=${args.cols} .gap=${args.gap} ?autoRows=${true}>
      ${PORTRAIT_IMAGES.map(img => html`
        <flint-image-list-item aspect-ratio="3/4">
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
          <flint-image-list-item-bar slot="bar">
            ${img.title}
            <span slot="subtitle">${img.author}</span>
          </flint-image-list-item-bar>
        </flint-image-list-item>
      `)}
    </flint-image-list>
  `,
};

// ── Mixed Aspect Ratios ──────────────────────────────────────────────────────
export const MixedAspectRatios: Story = {
  name: 'Mixed Aspect Ratios',
  args: { variant: 'standard', cols: 3, gap: 6 },
  render: (args) => html`
    <p style="margin:0 0 12px;font:14px system-ui;color:#4b5563;">
      Mix of landscape (4/3), square (1/1), and portrait (3/4) cells with <code>autoRows</code>.
    </p>
    <flint-image-list variant="standard" .cols=${args.cols} .gap=${args.gap} ?autoRows=${true}>
      <flint-image-list-item aspect-ratio="4/3">
        <img src="${IMAGES[0].url}" alt="${IMAGES[0].title}" loading="lazy" />
      </flint-image-list-item>
      <flint-image-list-item aspect-ratio="1/1">
        <img src="${IMAGES[1].url}" alt="${IMAGES[1].title}" loading="lazy" />
      </flint-image-list-item>
      <flint-image-list-item aspect-ratio="3/4">
        <img src="${PORTRAIT_IMAGES[0].url}" alt="${PORTRAIT_IMAGES[0].title}" loading="lazy" />
      </flint-image-list-item>
      <flint-image-list-item aspect-ratio="3/4">
        <img src="${PORTRAIT_IMAGES[1].url}" alt="${PORTRAIT_IMAGES[1].title}" loading="lazy" />
      </flint-image-list-item>
      <flint-image-list-item aspect-ratio="4/3">
        <img src="${IMAGES[2].url}" alt="${IMAGES[2].title}" loading="lazy" />
      </flint-image-list-item>
      <flint-image-list-item aspect-ratio="1/1">
        <img src="${IMAGES[3].url}" alt="${IMAGES[3].title}" loading="lazy" />
      </flint-image-list-item>
    </flint-image-list>
  `,
};

// ── With Title Bars (Overlay bottom) ────────────────────────────────────────
export const WithTitleBars: Story = {
  args: { variant: 'standard', cols: 3, gap: 4, rowHeight: 200 },
  render: (args) => html`
    <flint-image-list variant="standard" .cols=${args.cols} .gap=${args.gap} .rowHeight=${args.rowHeight}>
      ${IMAGES.slice(0, 6).map(img => html`
        <flint-image-list-item>
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
          <flint-image-list-item-bar slot="bar">
            ${img.title}
            <span slot="subtitle">${img.author}</span>
            <flint-button slot="action" appearance="text" title="Star" style="font-size:18px;">★</flint-button>
          </flint-image-list-item-bar>
        </flint-image-list-item>
      `)}
    </flint-image-list>
  `,
};

// ── Bar at Top ───────────────────────────────────────────────────────────────
export const BarTop: Story = {
  name: 'Title Bar at Top',
  args: { variant: 'standard', cols: 3, gap: 4, rowHeight: 200 },
  render: (args) => html`
    <flint-image-list variant="standard" .cols=${args.cols} .gap=${args.gap} .rowHeight=${args.rowHeight}>
      ${IMAGES.slice(0, 6).map(img => html`
        <flint-image-list-item>
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
          <flint-image-list-item-bar slot="bar" position="top">
            ${img.title}
            <span slot="subtitle">${img.author}</span>
          </flint-image-list-item-bar>
        </flint-image-list-item>
      `)}
    </flint-image-list>
  `,
};

// ── Title Bar Below Image ────────────────────────────────────────────────────
export const TitleBarBelow: Story = {
  args: { variant: 'standard', cols: 3, gap: 8, rowHeight: 200 },
  render: (args) => html`
    <flint-image-list variant="standard" .cols=${args.cols} .gap=${args.gap} ?autoRows=${true}>
      ${IMAGES.slice(0, 6).map(img => html`
        <flint-image-list-item bar-position="below">
          <img src="${img.url}" alt="${img.title}" loading="lazy" style="height:200px;object-fit:cover;display:block;width:100%;" />
          <flint-image-list-item-bar slot="bar" position="below">
            ${img.title}
            <span slot="subtitle">${img.author}</span>
            <flint-button slot="action" appearance="text" title="Info" style="font-size:18px;">ℹ</flint-button>
          </flint-image-list-item-bar>
        </flint-image-list-item>
      `)}
    </flint-image-list>
  `,
};

// ── Masonry with Title Bars ──────────────────────────────────────────────────
export const MasonryWithTitleBars: Story = {
  args: { variant: 'masonry', cols: 3, gap: 8 },
  render: (args) => html`
    <flint-image-list variant="masonry" .cols=${args.cols} .gap=${args.gap}>
      ${IMAGES.slice(0, 9).map(img => html`
        <flint-image-list-item bar-position="below">
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
          <flint-image-list-item-bar slot="bar" position="below">
            ${img.title}
            <span slot="subtitle">${img.author}</span>
          </flint-image-list-item-bar>
        </flint-image-list-item>
      `)}
    </flint-image-list>
  `,
};

// ── Masonry Portrait ─────────────────────────────────────────────────────────
export const MasonryPortrait: Story = {
  name: 'Masonry — Portrait Images',
  args: { variant: 'masonry', cols: 3, gap: 8 },
  render: (args) => html`
    <p style="margin:0 0 12px;font:14px system-ui;color:#4b5563;">
      Portrait images flow naturally in masonry — no fixed row height needed.
    </p>
    <flint-image-list variant="masonry" .cols=${args.cols} .gap=${args.gap}>
      ${[...PORTRAIT_IMAGES, ...PORTRAIT_IMAGES].map(img => html`
        <flint-image-list-item>
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
        </flint-image-list-item>
      `)}
    </flint-image-list>
  `,
};

// ── Object Fit: Contain ──────────────────────────────────────────────────────
export const FitContain: Story = {
  name: 'Object Fit: Contain',
  args: { variant: 'standard', cols: 3, gap: 4, rowHeight: 220 },
  render: (args) => html`
    <p style="margin:0 0 12px;font:14px system-ui;color:#4b5563;">
      <code>fit="contain"</code> letterboxes images — the dark background reveals empty space around non-matching aspect ratios.
    </p>
    <flint-image-list variant="standard" .cols=${args.cols} .gap=${args.gap} .rowHeight=${args.rowHeight}>
      ${IMAGES.slice(0, 6).map(img => html`
        <flint-image-list-item .fit=${'contain'} style="background:var(--flint-demo-background-dark, #1f2937);">
          <img src="${img.url}" alt="${img.title}" loading="lazy" />
        </flint-image-list-item>
      `)}
    </flint-image-list>
  `,
};
