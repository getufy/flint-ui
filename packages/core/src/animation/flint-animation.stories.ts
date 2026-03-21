import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-animation.js';
import { FlintAnimation } from './flint-animation.js';

const presetNames = FlintAnimation.presets;

const meta: Meta = {
    title: 'Utilities/Animation',
    component: 'flint-animation',
    parameters: {
        a11y: {
            config: {
                rules: [
                    // Animated elements have partial opacity during transitions,
                    // causing false-positive contrast violations mid-animation.
                    { id: 'color-contrast', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
flint-animation: a declarative wrapper that applies Web Animations API
animations to its slotted content.

- **Tag**: \`<flint-animation>\`
- **Class**: \`FlintAnimation\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`name\` | \`name\` | \`string\` | \`'fade-in'\` | Animation preset name (e.g., 'fade-in', 'slide-up', 'bounce') or |
| \`duration\` | \`duration\` | \`number\` | \`300\` | Duration in milliseconds. |
| \`easing\` | \`easing\` | \`string\` | \`'ease'\` | CSS easing function. |
| \`iterations\` | \`iterations\` | \`number\` | \`1\` | Number of iterations. Use \`Infinity\` for infinite looping. |
| \`delay\` | \`delay\` | \`number\` | \`0\` | Delay before the animation starts, in milliseconds. |
| \`fill\` | \`fill\` | \`FillMode\` | \`'both'\` | Animation fill mode. |
| \`direction\` | \`direction\` | \`PlaybackDirection\` | \`'normal'\` | Animation direction. |
| \`play\` | \`play\` | \`boolean\` | \`false\` | Set to true to trigger/play the animation. |
| \`playOnConnect\` | \`play-on-connect\` | \`boolean\` | \`false\` | Whether to play the animation automatically on first render. |
| \`keyframes\` | \`keyframes\` | \`Keyframe[] \\| null\` | \`null\` | Custom keyframes. When provided, overrides the \`name\` preset. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-animation-finish\` | — | Dispatched when the animation finishes. |
| \`flint-animation-cancel\` | — | Dispatched when the animation is cancelled. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Content to animate. |

#### Methods

| Method | Description |
|---|---|
| \`cancel(): void\` | Programmatically cancel the running animation. |
| \`restart(): void\` | Restart the animation from the beginning. |
                `,
            },
        },
    },
    argTypes: {
        name: {
            control: 'select',
            options: presetNames,
            description: 'Preset animation name.',
        },
        duration: { control: { type: 'number', min: 0, step: 50 }, description: 'Duration in ms.' },
        easing: {
            control: 'select',
            options: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'],
            description: 'CSS easing function.',
        },
        iterations: { control: { type: 'number', min: 1, step: 1 }, description: 'Iteration count.' },
        delay: { control: { type: 'number', min: 0, step: 50 }, description: 'Delay in ms.' },
        fill: {
            control: 'select',
            options: ['none', 'forwards', 'backwards', 'both', 'auto'],
            description: 'Fill mode.',
        },
        direction: {
            control: 'select',
            options: ['normal', 'reverse', 'alternate', 'alternate-reverse'],
            description: 'Play direction.',
        },
        play: { control: 'boolean', description: 'Whether the animation is playing.' },
    },
    args: {
        name: 'fade-in',
        duration: 300,
        easing: 'ease',
        iterations: 1,
        delay: 0,
        fill: 'both',
        direction: 'normal',
        play: true,
    },
};

export default meta;

type Story = StoryObj;

/* ── Shared demo box ────────────────────────────────────────────────── */

const demoBox = html`
    <div style="
        width: 120px;
        height: 120px;
        background: var(--flint-primary-color, #3b82f6);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-family: var(--flint-font-family, system-ui);
    ">Animate</div>
`;

/* ── Stories ─────────────────────────────────────────────────────────── */

export const Default: Story = {
    render: (args) => html`
        <flint-animation
            .name=${args.name}
            .duration=${args.duration}
            .easing=${args.easing}
            .iterations=${args.iterations}
            .delay=${args.delay}
            .fill=${args.fill}
            .direction=${args.direction}
            .play=${args.play}
        >
            ${demoBox}
        </flint-animation>
    `,
};

export const AllPresets: Story = {
    render: () => html`
        <div style="display: flex; flex-wrap: wrap; gap: 24px;">
            ${presetNames.map(
                (preset) => html`
                    <div style="text-align: center;">
                        <flint-animation .name=${preset} .duration=${600} .play=${true} .iterations=${Infinity}>
                            <div style="
                                width: 80px;
                                height: 80px;
                                background: var(--flint-primary-color, #3b82f6);
                                border-radius: 8px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: white;
                                font-size: 11px;
                                font-family: var(--flint-font-family, system-ui);
                            ">${preset}</div>
                        </flint-animation>
                        <div style="margin-top: 8px; font-size: 12px; color: #666; font-family: var(--flint-font-family, system-ui);">${preset}</div>
                    </div>
                `,
            )}
        </div>
    `,
    parameters: {
        docs: {
            description: { story: 'All built-in animation presets playing in an infinite loop.' },
        },
    },
};

export const CustomKeyframes: Story = {
    render: () => {
        const keyframes: Keyframe[] = [
            { transform: 'rotate(0deg) scale(1)', background: '#1e40af' },
            { transform: 'rotate(180deg) scale(1.2)', background: '#ef4444' },
            { transform: 'rotate(360deg) scale(1)', background: '#1e40af' },
        ];
        return html`
            <flint-animation .keyframes=${keyframes} .duration=${1500} .play=${true} .iterations=${Infinity} .easing=${'ease-in-out'}>
                <div style="
                    width: 120px;
                    height: 120px;
                    background: var(--flint-primary-color, #3b82f6);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-family: var(--flint-font-family, system-ui);
                ">Custom</div>
            </flint-animation>
        `;
    },
    parameters: {
        docs: {
            description: { story: 'Providing custom keyframes via the `keyframes` property overrides the `name` preset.' },
        },
    },
};

export const PlayOnConnect: Story = {
    render: () => html`
        <flint-animation name="slide-up" duration="600" play-on-connect>
            <div style="
                padding: 16px 24px;
                background: var(--flint-primary-color, #3b82f6);
                color: white;
                border-radius: 8px;
                font-family: var(--flint-font-family, system-ui);
                display: inline-block;
            ">I animated in on connect!</div>
        </flint-animation>
    `,
    parameters: {
        docs: {
            description: { story: 'Using `play-on-connect` to auto-play the animation when the element first renders.' },
        },
    },
};

export const Looping: Story = {
    render: () => html`
        <flint-animation name="pulse" .duration=${800} .play=${true} .iterations=${Infinity}>
            <div style="
                width: 100px;
                height: 100px;
                background: #ef4444;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                font-family: var(--flint-font-family, system-ui);
            ">Pulse</div>
        </flint-animation>
    `,
    parameters: {
        docs: {
            description: { story: 'Set `iterations` to `Infinity` for a looping animation.' },
        },
    },
};

export const Interactive: Story = {
    render: () => {
        function handleClick(e: Event) {
            const btn = e.currentTarget as HTMLButtonElement;
            const animation = btn.parentElement!.querySelector('flint-animation')!;
            animation.restart();
        }

        return html`
            <div>
                <button
                    @click=${handleClick}
                    style="
                        margin-bottom: 16px;
                        padding: 8px 20px;
                        border-radius: 6px;
                        border: 1px solid #ddd;
                        background: white;
                        cursor: pointer;
                        font-family: var(--flint-font-family, system-ui);
                        font-size: 14px;
                    "
                >Play Animation</button>
                <flint-animation name="bounce" .duration=${600}>
                    ${demoBox}
                </flint-animation>
            </div>
        `;
    },
    parameters: {
        docs: {
            description: { story: 'Click the button to trigger the animation via `restart()`. The animation plays once each time.' },
        },
    },
};
