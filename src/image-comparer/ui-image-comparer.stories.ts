import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-image-comparer';

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
    component: 'ui-image-comparer',
    parameters: {
        docs: {
            description: {
                component:
                    'Compare visual differences between two images with a draggable slider. ' +
                    'Use the `before` and `after` slots. Drag or use arrow keys to adjust position.',
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
        <ui-image-comparer .position=${args.position} ?disabled=${args.disabled}>
            <img slot="before" src=${BEFORE} alt="Before" />
            <img slot="after" src=${AFTER} alt="After" />
        </ui-image-comparer>
    `,
};

export const InitialPosition: Story = {
    render: () => html`
        <ui-image-comparer .position=${25}>
            <img slot="before" src=${BEFORE} alt="Before" />
            <img slot="after" src=${AFTER} alt="After" />
        </ui-image-comparer>
    `,
};

export const Disabled: Story = {
    render: () => html`
        <ui-image-comparer disabled .position=${30}>
            <img slot="before" src=${BEFORE} alt="Before" />
            <img slot="after" src=${AFTER} alt="After" />
        </ui-image-comparer>
    `,
};

export const CustomHandle: Story = {
    render: () => html`
        <ui-image-comparer>
            <img slot="before" src=${BEFORE} alt="Before" />
            <img slot="after" src=${AFTER} alt="After" />
            <span slot="handle" style="font-size: 18px; font-weight: bold; color: #333;">⇔</span>
        </ui-image-comparer>
    `,
};

export const CustomStyling: Story = {
    render: () => html`
        <ui-image-comparer
            style="
                --ui-image-comparer-divider-width: 4px;
                --ui-image-comparer-divider-color: #3b82f6;
                --ui-image-comparer-handle-size: 48px;
                --ui-image-comparer-handle-bg: #3b82f6;
                --ui-image-comparer-handle-icon-color: white;
                --ui-image-comparer-handle-border-color: transparent;
                --ui-image-comparer-border-radius: 12px;
            "
        >
            <img slot="before" src=${BEFORE} alt="Before" />
            <img slot="after" src=${AFTER} alt="After" />
        </ui-image-comparer>
    `,
};

export const ForestContrast: Story = {
    name: 'Forest — Color vs High Contrast',
    render: () => html`
        <ui-image-comparer>
            <img slot="before" src=${FOREST_COLOR} alt="Original forest" />
            <img slot="after" src=${FOREST_CONTRAST} alt="High contrast forest" />
        </ui-image-comparer>
    `,
};

export const CityMood: Story = {
    name: 'City — Warm vs Cool Tone',
    render: () => html`
        <ui-image-comparer>
            <img slot="before" src=${CITY_WARM} alt="City warm tones" />
            <img slot="after" src=${CITY_COOL} alt="City cool tones" />
        </ui-image-comparer>
    `,
};

export const PortraitSepia: Story = {
    name: 'Portrait — Color vs Sepia',
    render: () => html`
        <ui-image-comparer>
            <img slot="before" src=${PORTRAIT_COLOR} alt="Portrait color" />
            <img slot="after" src=${PORTRAIT_SEPIA} alt="Portrait sepia" />
        </ui-image-comparer>
    `,
};

export const MountainLake: Story = {
    name: 'Mountain Lake — Sharp vs Soft',
    render: () => html`
        <ui-image-comparer>
            <img slot="before" src=${LAKE_SHARP} alt="Sharp mountain lake" />
            <img slot="after" src=${LAKE_SOFT} alt="Soft mountain lake" />
        </ui-image-comparer>
    `,
};

export const MultipleComparers: Story = {
    name: 'Multiple Comparers',
    render: () => html`
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
                <p style="margin: 0 0 8px; font: 600 13px/1 system-ui; color: #6b7280;">Dog — Color vs B&amp;W</p>
                <ui-image-comparer style="--ui-image-comparer-aspect-ratio: 4/3; width: 100%;" .position=${50}>
                    <img slot="before" src=${BEFORE} alt="Dog color" />
                    <img slot="after" src=${AFTER} alt="Dog grayscale" />
                </ui-image-comparer>
            </div>
            <div>
                <p style="margin: 0 0 8px; font: 600 13px/1 system-ui; color: #6b7280;">Forest — Original vs Contrast</p>
                <ui-image-comparer style="--ui-image-comparer-aspect-ratio: 4/3; width: 100%;" .position=${50}>
                    <img slot="before" src=${FOREST_COLOR} alt="Forest original" />
                    <img slot="after" src=${FOREST_CONTRAST} alt="Forest contrast" />
                </ui-image-comparer>
            </div>
            <div>
                <p style="margin: 0 0 8px; font: 600 13px/1 system-ui; color: #6b7280;">Portrait — Color vs Sepia</p>
                <ui-image-comparer style="--ui-image-comparer-aspect-ratio: 4/3; width: 100%;" .position=${50}>
                    <img slot="before" src=${PORTRAIT_COLOR} alt="Portrait color" />
                    <img slot="after" src=${PORTRAIT_SEPIA} alt="Portrait sepia" />
                </ui-image-comparer>
            </div>
            <div>
                <p style="margin: 0 0 8px; font: 600 13px/1 system-ui; color: #6b7280;">Mountain Lake — Sharp vs Soft</p>
                <ui-image-comparer style="--ui-image-comparer-aspect-ratio: 4/3; width: 100%;" .position=${50}>
                    <img slot="before" src=${LAKE_SHARP} alt="Lake sharp" />
                    <img slot="after" src=${LAKE_SOFT} alt="Lake soft" />
                </ui-image-comparer>
            </div>
        </div>
    `,
};

export const Controlled: Story = {
    render: () => html`
        <div
            @ui-image-comparer-change=${(e: CustomEvent) => {
                const el = (e.currentTarget as HTMLElement).querySelector('ui-image-comparer')!;
                el.position = e.detail.position;
            }}
        >
            <ui-image-comparer .position=${70}>
                <img slot="before" src=${BEFORE} alt="Before" />
                <img slot="after" src=${AFTER} alt="After" />
            </ui-image-comparer>
        </div>
    `,
};
