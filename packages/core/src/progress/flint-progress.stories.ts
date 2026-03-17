import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-circular-progress';
import './flint-linear-progress';

const meta: Meta = {
    title: 'Feedback/Progress',
    parameters: {
        docs: {
            description: {
                component: `
#### \`<flint-circular-progress>\`

flint-circular-progress: a circular progress indicator (spinner).

- **Tag**: \`<flint-circular-progress>\`
- **Class**: \`FlintCircularProgress\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`mode\` | \`mode\` | \`'determinate' \\| 'indeterminate'\` | \`'indeterminate'\` | Progress mode: determinate shows a specific value, indeterminate shows an animation. |
| \`variant\` | \`variant\` | \`'determinate' \\| 'indeterminate'\` | \`'indeterminate'\` |  |
| \`value\` | \`value\` | \`number\` | \`0\` | Current progress percentage (0-100) for determinate mode. |
| \`size\` | \`size\` | \`number\` | \`40\` | Diameter of the circular indicator in pixels. |
| \`thickness\` | \`thickness\` | \`number\` | \`3.6\` | Stroke width of the circle in pixels. |
| \`color\` | \`color\` | \`'primary' \\| 'success' \\| 'error' \\| 'warning'\` | \`'primary'\` | Color theme of the progress indicator. |
| \`label\` | \`label\` | \`string\` | \`''\` | Accessible label for the progress indicator. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-circular-progress-size\` | — |
| \`--flint-circular-progress-color\` | — |
| \`--flint-circular-progress-thickness\` | \`3.6\` |
| \`--flint-primary-color\` | — |
| \`--flint-primary-color-light\` | — |

---

#### \`<flint-linear-progress>\`

flint-linear-progress: a horizontal progress bar.

- **Tag**: \`<flint-linear-progress>\`
- **Class**: \`FlintLinearProgress\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`mode\` | \`mode\` | \`'determinate' \\| 'indeterminate'\` | \`'indeterminate'\` | Progress mode: determinate shows a specific value, indeterminate shows an animation. |
| \`variant\` | \`variant\` | \`'determinate' \\| 'indeterminate'\` | \`'indeterminate'\` |  |
| \`value\` | \`value\` | \`number\` | \`0\` | Current progress value (0-100). |
| \`height\` | \`height\` | \`number\` | \`4\` | Height of the progress bar in pixels. |
| \`color\` | \`color\` | \`'primary' \\| 'success' \\| 'error' \\| 'warning'\` | \`'primary'\` | Color theme of the progress bar. |
| \`label\` | \`label\` | \`string\` | \`''\` | Accessible label for the progress bar. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-linear-progress-height\` | — |
| \`--flint-linear-progress-bg\` | — |
| \`--flint-linear-progress-color\` | — |
                `,
            },
        },
    },
    argTypes: {
        mode: {
            control: 'select',
            options: ['determinate', 'indeterminate'],
        },
        value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
        max: { control: 'number' },
        color: {
            control: 'select',
            options: ['primary', 'success', 'error', 'warning'],
        },
        size: { control: 'number' },
        thickness: { control: 'number' },
        height: { control: 'number' },
        label: { control: 'text' },
    },
    args: {
        mode: 'indeterminate',
        value: 60,
        max: 100,
        color: 'primary',
        label: '',
        size: 40,
        thickness: 3.6,
        height: 4,
    },
};

export default meta;

type Story = StoryObj;

// ─── Playground ─────────────────────────────────────────────────────────────

export const CircularPlayground: Story = {
    name: 'Circular — Playground',
    render: (args) => html`
    <flint-circular-progress
      .mode="${args.mode}"
      .value="${args.value}"
      .max="${args.max}"
      .size="${args.size}"
      .thickness="${args.thickness}"
      .color="${args.color}"
      .label="${args.label}"
    ></flint-circular-progress>
  `,
};

export const LinearPlayground: Story = {
    name: 'Linear — Playground',
    render: (args) => html`
    <div style="width: 100%; max-width: 400px; padding: 20px;">
      <flint-linear-progress
        .mode="${args.mode}"
        .value="${args.value}"
        .max="${args.max}"
        .height="${args.height}"
        .color="${args.color}"
        .label="${args.label}"
      ></flint-linear-progress>
    </div>
  `,
};

// ─── Circular ───────────────────────────────────────────────────────────────

export const CircularIndeterminate: Story = {
    name: 'Circular — Indeterminate',
    render: () => html`
    <div style="display: flex; gap: 20px; align-items: center;">
      <flint-circular-progress label="Loading"></flint-circular-progress>
      <flint-circular-progress .size="${24}" .thickness="${3}" label="Loading small"></flint-circular-progress>
      <flint-circular-progress .size="${60}" .thickness="${5}" label="Loading large"></flint-circular-progress>
    </div>
  `,
};

export const CircularDeterminate: Story = {
    name: 'Circular — Determinate',
    render: () => html`
    <div style="display: flex; gap: 20px; align-items: center;">
      <flint-circular-progress mode="determinate" .value="${25}" label="25%"></flint-circular-progress>
      <flint-circular-progress mode="determinate" .value="${50}" label="50%"></flint-circular-progress>
      <flint-circular-progress mode="determinate" .value="${75}" label="75%"></flint-circular-progress>
      <flint-circular-progress mode="determinate" .value="${100}" label="100%"></flint-circular-progress>
    </div>
  `,
};

export const CircularSizes: Story = {
    name: 'Circular — Sizes',
    render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <flint-circular-progress .size="${20}" .thickness="${2.5}" label="20px"></flint-circular-progress>
      <flint-circular-progress .size="${32}" .thickness="${3}" label="32px"></flint-circular-progress>
      <flint-circular-progress .size="${40}" label="40px (default)"></flint-circular-progress>
      <flint-circular-progress .size="${56}" .thickness="${4.5}" label="56px"></flint-circular-progress>
      <flint-circular-progress .size="${80}" .thickness="${6}" label="80px"></flint-circular-progress>
    </div>
  `,
};

// ─── Linear ─────────────────────────────────────────────────────────────────

export const LinearIndeterminate: Story = {
    name: 'Linear — Indeterminate',
    render: () => html`
    <div style="width: 100%; max-width: 400px; padding: 20px;">
      <flint-linear-progress label="Loading"></flint-linear-progress>
    </div>
  `,
};

export const LinearDeterminate: Story = {
    name: 'Linear — Determinate',
    render: () => html`
    <div style="width: 100%; max-width: 400px; padding: 20px; display: flex; flex-direction: column; gap: 20px;">
      <flint-linear-progress mode="determinate" .value="${30}" label="30%"></flint-linear-progress>
      <flint-linear-progress mode="determinate" .value="${60}" label="60%"></flint-linear-progress>
      <flint-linear-progress mode="determinate" .value="${90}" label="90%"></flint-linear-progress>
    </div>
  `,
};

export const LinearSizes: Story = {
    name: 'Linear — Sizes',
    render: () => html`
    <div style="width: 100%; max-width: 400px; padding: 20px; display: flex; flex-direction: column; gap: 16px; font-family: sans-serif; font-size: 12px; color: #666;">
      <div>
        <p style="margin: 0 0 4px">height=2</p>
        <flint-linear-progress mode="determinate" .value="${60}" .height="${2}" label="2px height"></flint-linear-progress>
      </div>
      <div>
        <p style="margin: 0 0 4px">height=4 (default)</p>
        <flint-linear-progress mode="determinate" .value="${60}" label="4px height"></flint-linear-progress>
      </div>
      <div>
        <p style="margin: 0 0 4px">height=8</p>
        <flint-linear-progress mode="determinate" .value="${60}" .height="${8}" label="8px height"></flint-linear-progress>
      </div>
      <div>
        <p style="margin: 0 0 4px">height=12</p>
        <flint-linear-progress mode="determinate" .value="${60}" .height="${12}" label="12px height"></flint-linear-progress>
      </div>
    </div>
  `,
};

// ─── Custom Max ──────────────────────────────────────────────────────────────

export const CustomMax: Story = {
    name: 'Custom Max',
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; padding: 20px; max-width: 440px; font-family: sans-serif;">
      <div>
        <p style="margin: 0 0 12px; font-weight: 600;">Linear — max=200, value=50 (25%)</p>
        <flint-linear-progress mode="determinate" .value="${50}" .max="${200}" label="50 of 200"></flint-linear-progress>
      </div>
      <div>
        <p style="margin: 0 0 12px; font-weight: 600;">Linear — max=10, value=7 (70%)</p>
        <flint-linear-progress mode="determinate" .value="${7}" .max="${10}" label="7 of 10"></flint-linear-progress>
      </div>
      <div>
        <p style="margin: 0 0 12px; font-weight: 600;">Circular — max=50, value=25 (50%)</p>
        <div style="display: flex; gap: 16px; align-items: center;">
          <flint-circular-progress mode="determinate" .value="${25}" .max="${50}" label="25 of 50"></flint-circular-progress>
          <flint-circular-progress mode="determinate" .value="${50}" .max="${50}" label="50 of 50 (full)"></flint-circular-progress>
        </div>
      </div>
    </div>
  `,
};

// ─── Colors ──────────────────────────────────────────────────────────────────

export const CustomColors: Story = {
    name: 'Colors',
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; padding: 20px; max-width: 440px; font-family: sans-serif;">
      <div>
        <p style="margin: 0 0 12px; font-weight: 600;">Circular</p>
        <div style="display: flex; gap: 16px; align-items: center;">
          <flint-circular-progress color="primary" label="Primary"></flint-circular-progress>
          <flint-circular-progress color="success" label="Success"></flint-circular-progress>
          <flint-circular-progress color="error" label="Error"></flint-circular-progress>
          <flint-circular-progress color="warning" label="Warning"></flint-circular-progress>
        </div>
        <div style="display: flex; gap: 16px; align-items: center; margin-top: 12px;">
          <flint-circular-progress mode="determinate" .value="${70}" color="primary" label="Primary 70%"></flint-circular-progress>
          <flint-circular-progress mode="determinate" .value="${70}" color="success" label="Success 70%"></flint-circular-progress>
          <flint-circular-progress mode="determinate" .value="${70}" color="error" label="Error 70%"></flint-circular-progress>
          <flint-circular-progress mode="determinate" .value="${70}" color="warning" label="Warning 70%"></flint-circular-progress>
        </div>
      </div>
      <div>
        <p style="margin: 0 0 12px; font-weight: 600;">Linear</p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <flint-linear-progress mode="determinate" .value="${60}" color="primary" label="Primary"></flint-linear-progress>
          <flint-linear-progress mode="determinate" .value="${60}" color="success" label="Success"></flint-linear-progress>
          <flint-linear-progress mode="determinate" .value="${60}" color="error" label="Error"></flint-linear-progress>
          <flint-linear-progress mode="determinate" .value="${60}" color="warning" label="Warning"></flint-linear-progress>
        </div>
      </div>
    </div>
  `,
};

// ─── Accessibility ────────────────────────────────────────────────────────────

export const Accessibility: Story = {
    name: 'Accessibility',
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; padding: 20px; max-width: 440px; font-family: sans-serif; font-size: 14px;">
      <div>
        <p style="margin: 0 0 8px; font-weight: 600;">label prop (aria-label)</p>
        <p style="margin: 0 0 8px; color: #666;">Screen readers will announce the label.</p>
        <div style="display: flex; gap: 16px; align-items: center;">
          <flint-circular-progress label="Loading user profile"></flint-circular-progress>
          <flint-linear-progress label="Uploading file" mode="determinate" .value="${45}"></flint-linear-progress>
        </div>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-weight: 600;">Paired with visible text (aria-labelledby)</p>
        <p style="margin: 0 0 8px; color: #666;">Use aria-labelledby when a visible label is already present.</p>
        <p id="upload-label" style="margin: 0 0 6px;">Uploading files… 72%</p>
        <flint-linear-progress
          mode="determinate"
          .value="${72}"
          style="--flint-linear-progress-height: 6px"
        ></flint-linear-progress>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-weight: 600;">Indeterminate (no value announced)</p>
        <p style="margin: 0 0 8px; color: #666;">aria-valuenow is omitted for indeterminate — correct per ARIA spec.</p>
        <div style="display: flex; gap: 16px; align-items: center;">
          <flint-circular-progress label="Processing"></flint-circular-progress>
          <flint-linear-progress label="Processing"></flint-linear-progress>
        </div>
      </div>
    </div>
  `,
};

// ─── Integration ─────────────────────────────────────────────────────────────

export const Integration: Story = {
    name: 'Integration',
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 40px; padding: 20px; max-width: 400px; font-family: sans-serif;">
      <div>
        <h4 style="margin: 0 0 8px">Circular — Small spinner</h4>
        <flint-circular-progress .size="${24}" .thickness="${3}" label="Loading"></flint-circular-progress>
      </div>
      <div>
        <h4 style="margin: 0 0 8px">Linear — Background upload</h4>
        <p style="font-size: 13px; color: #666; margin: 0 0 8px">Uploading files… 45%</p>
        <flint-linear-progress mode="determinate" .value="${45}" label="Upload 45%"></flint-linear-progress>
      </div>
      <div>
        <h4 style="margin: 0 0 8px">Circular — Success state</h4>
        <flint-circular-progress mode="determinate" .value="${100}" color="success" label="Complete"></flint-circular-progress>
      </div>
      <div>
        <h4 style="margin: 0 0 8px">Linear — Error state</h4>
        <flint-linear-progress mode="determinate" .value="${30}" color="error" label="Upload failed at 30%"></flint-linear-progress>
      </div>
    </div>
  `,
};
