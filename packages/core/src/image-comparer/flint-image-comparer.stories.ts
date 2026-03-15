import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-image-comparer';

// Dog — color vs grayscale
const BEFORE = 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=600&q=80';
const AFTER  = 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=600&q=80&sat=-100';

// Forest — original vs high-contrast
const FOREST_COLOR    = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80';
const FOREST_CONTRAST = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80&con=80&sat=40';

// City at dusk — warm vs cool
const CITY_WARM = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80';
const CITY_COOL = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&sat=-40&bri=-10';

// Portrait — color vs sepia-toned
const PORTRAIT_COLOR = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80';
const PORTRAIT_SEPIA = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80&sat=-80&bri=10';

// Mountain lake — sharp vs soft
const LAKE_SHARP = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&sharp=20';
const LAKE_SOFT  = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&blur=100';

const meta: Meta = {
    title: 'Data Display/Image Comparer',
    component: 'flint-image-comparer',
    parameters: {
        docs: {
            description: {
                component: `
\`flint-image-comparer\` — Compare two images side-by-side with a draggable slider.

- **Tag**: \`<flint-image-comparer>\`
- **Class**: \`FlintImageComparer\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`position\` | \`position\` | \`number\` | \`50\` | The position of the divider as a percentage (0–100). |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the comparer is disabled. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-image-comparer-change\` | \`{ position: number }\` | Fired when the position changes. Detail: \`{ position: number }\`. |

#### Slots

| Name | Description |
|---|---|
| \`before\` | The before image (\`&lt;img&gt;\` or \`&lt;svg&gt;\`). |
| \`after\` | The after image (\`&lt;img&gt;\` or \`&lt;svg&gt;\`). |
| \`handle\` | Custom handle content (replaces the default arrows icon). |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-image-comparer-divider-width\` | — |
| \`--flint-image-comparer-divider-color\` | — |
| \`--flint-image-comparer-handle-size\` | — |
| \`--flint-image-comparer-handle-bg\` | — |
| \`--flint-image-comparer-handle-border-color\` | — |
| \`--flint-image-comparer-handle-icon-color\` | — |
| \`--flint-image-comparer-border-radius\` | — |
| \`--flint-image-comparer-aspect-ratio\` | — |
| \`--flint-border-radius-full\` | — |
| \`--flint-shadow-md\` | — |
| \`--flint-primary-focus-ring\` | — |
| \`--flint-shadow-lg\` | — |
                `,
            },
        },
    },
    argTypes: {
        position: { control: { type: 'range', min: 0, max: 100, step: 1 } },
        disabled: { control: 'boolean' },
    },
    args: {
        position: 50,
        disabled: false,
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
        <flint-image-comparer .position=${args.position} ?disabled=${args.disabled}>
            <img slot="before" src=${BEFORE} alt="Before" />
            <img slot="after" src=${AFTER} alt="After" />
        </flint-image-comparer>
    `,
};

export const InitialPosition: Story = {
    args: { position: 25 },
    render: (args) => html`
        <flint-image-comparer .position=${args.position} ?disabled=${args.disabled}>
            <img slot="before" src=${BEFORE} alt="Before" />
            <img slot="after" src=${AFTER} alt="After" />
        </flint-image-comparer>
    `,
};

export const Disabled: Story = {
    args: { disabled: true, position: 30 },
    render: (args) => html`
        <flint-image-comparer ?disabled=${args.disabled} .position=${args.position}>
            <img slot="before" src=${BEFORE} alt="Before" />
            <img slot="after" src=${AFTER} alt="After" />
        </flint-image-comparer>
    `,
};

export const CustomHandle: Story = {
    render: () => html`
        <flint-image-comparer>
            <img slot="before" src=${BEFORE} alt="Before" />
            <img slot="after" src=${AFTER} alt="After" />
            <span slot="handle" style="font-size: 18px; font-weight: bold; color: #333;">⇔</span>
        </flint-image-comparer>
    `,
};

export const CustomStyling: Story = {
    render: () => html`
        <flint-image-comparer
            style="
                --flint-image-comparer-divider-width: 4px;
                --flint-image-comparer-divider-color: #3b82f6;
                --flint-image-comparer-handle-size: 48px;
                --flint-image-comparer-handle-bg: #3b82f6;
                --flint-image-comparer-handle-icon-color: white;
                --flint-image-comparer-handle-border-color: transparent;
                --flint-image-comparer-border-radius: 12px;
            "
        >
            <img slot="before" src=${BEFORE} alt="Before" />
            <img slot="after" src=${AFTER} alt="After" />
        </flint-image-comparer>
    `,
};

export const ForestContrast: Story = {
    name: 'Forest — Color vs High Contrast',
    render: () => html`
        <flint-image-comparer>
            <img slot="before" src=${FOREST_COLOR} alt="Original forest" />
            <img slot="after" src=${FOREST_CONTRAST} alt="High contrast forest" />
        </flint-image-comparer>
    `,
};

export const CityMood: Story = {
    name: 'City — Warm vs Cool Tone',
    render: () => html`
        <flint-image-comparer>
            <img slot="before" src=${CITY_WARM} alt="City warm tones" />
            <img slot="after" src=${CITY_COOL} alt="City cool tones" />
        </flint-image-comparer>
    `,
};

export const PortraitSepia: Story = {
    name: 'Portrait — Color vs Sepia',
    render: () => html`
        <flint-image-comparer>
            <img slot="before" src=${PORTRAIT_COLOR} alt="Portrait color" />
            <img slot="after" src=${PORTRAIT_SEPIA} alt="Portrait sepia" />
        </flint-image-comparer>
    `,
};

export const MountainLake: Story = {
    name: 'Mountain Lake — Sharp vs Soft',
    render: () => html`
        <flint-image-comparer>
            <img slot="before" src=${LAKE_SHARP} alt="Sharp mountain lake" />
            <img slot="after" src=${LAKE_SOFT} alt="Soft mountain lake" />
        </flint-image-comparer>
    `,
};

export const MultipleComparers: Story = {
    name: 'Multiple Comparers',
    render: () => html`
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
                <p style="margin: 0 0 8px; font: 600 13px/1 system-ui; color: #4b5563;">Dog — Color vs B&amp;W</p>
                <flint-image-comparer style="--flint-image-comparer-aspect-ratio: 4/3; width: 100%;" .position=${50}>
                    <img slot="before" src=${BEFORE} alt="Dog color" />
                    <img slot="after" src=${AFTER} alt="Dog grayscale" />
                </flint-image-comparer>
            </div>
            <div>
                <p style="margin: 0 0 8px; font: 600 13px/1 system-ui; color: #4b5563;">Forest — Original vs Contrast</p>
                <flint-image-comparer style="--flint-image-comparer-aspect-ratio: 4/3; width: 100%;" .position=${50}>
                    <img slot="before" src=${FOREST_COLOR} alt="Forest original" />
                    <img slot="after" src=${FOREST_CONTRAST} alt="Forest contrast" />
                </flint-image-comparer>
            </div>
            <div>
                <p style="margin: 0 0 8px; font: 600 13px/1 system-ui; color: #4b5563;">Portrait — Color vs Sepia</p>
                <flint-image-comparer style="--flint-image-comparer-aspect-ratio: 4/3; width: 100%;" .position=${50}>
                    <img slot="before" src=${PORTRAIT_COLOR} alt="Portrait color" />
                    <img slot="after" src=${PORTRAIT_SEPIA} alt="Portrait sepia" />
                </flint-image-comparer>
            </div>
            <div>
                <p style="margin: 0 0 8px; font: 600 13px/1 system-ui; color: #4b5563;">Mountain Lake — Sharp vs Soft</p>
                <flint-image-comparer style="--flint-image-comparer-aspect-ratio: 4/3; width: 100%;" .position=${50}>
                    <img slot="before" src=${LAKE_SHARP} alt="Lake sharp" />
                    <img slot="after" src=${LAKE_SOFT} alt="Lake soft" />
                </flint-image-comparer>
            </div>
        </div>
    `,
};

export const Controlled: Story = {
    render: () => html`
        <div
            @flint-image-comparer-change=${(e: CustomEvent) => {
                const el = (e.currentTarget as HTMLElement).querySelector('flint-image-comparer')!;
                el.position = e.detail.position;
            }}
        >
            <flint-image-comparer .position=${70}>
                <img slot="before" src=${BEFORE} alt="Before" />
                <img slot="after" src=${AFTER} alt="After" />
            </flint-image-comparer>
        </div>
    `,
};
