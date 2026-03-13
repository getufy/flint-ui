import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-circular-progress';
import './ui-linear-progress';

const meta: Meta = {
    title: 'Feedback/Progress',
    argTypes: {
        variant: {
            control: 'select',
            options: ['determinate', 'indeterminate'],
        },
        value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
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
        variant: 'indeterminate',
        value: 60,
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
    <ui-circular-progress
      .variant="${args.variant}"
      .value="${args.value}"
      .size="${args.size}"
      .thickness="${args.thickness}"
      .color="${args.color}"
      .label="${args.label}"
    ></ui-circular-progress>
  `,
};

export const LinearPlayground: Story = {
    name: 'Linear — Playground',
    render: (args) => html`
    <div style="width: 100%; max-width: 400px; padding: 20px;">
      <ui-linear-progress
        .variant="${args.variant}"
        .value="${args.value}"
        .height="${args.height}"
        .color="${args.color}"
        .label="${args.label}"
      ></ui-linear-progress>
    </div>
  `,
};

// ─── Circular ───────────────────────────────────────────────────────────────

export const CircularIndeterminate: Story = {
    name: 'Circular — Indeterminate',
    render: () => html`
    <div style="display: flex; gap: 20px; align-items: center;">
      <ui-circular-progress label="Loading"></ui-circular-progress>
      <ui-circular-progress .size="${24}" .thickness="${3}" label="Loading small"></ui-circular-progress>
      <ui-circular-progress .size="${60}" .thickness="${5}" label="Loading large"></ui-circular-progress>
    </div>
  `,
};

export const CircularDeterminate: Story = {
    name: 'Circular — Determinate',
    render: () => html`
    <div style="display: flex; gap: 20px; align-items: center;">
      <ui-circular-progress variant="determinate" .value="${25}" label="25%"></ui-circular-progress>
      <ui-circular-progress variant="determinate" .value="${50}" label="50%"></ui-circular-progress>
      <ui-circular-progress variant="determinate" .value="${75}" label="75%"></ui-circular-progress>
      <ui-circular-progress variant="determinate" .value="${100}" label="100%"></ui-circular-progress>
    </div>
  `,
};

export const CircularSizes: Story = {
    name: 'Circular — Sizes',
    render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <ui-circular-progress .size="${20}" .thickness="${2.5}" label="20px"></ui-circular-progress>
      <ui-circular-progress .size="${32}" .thickness="${3}" label="32px"></ui-circular-progress>
      <ui-circular-progress .size="${40}" label="40px (default)"></ui-circular-progress>
      <ui-circular-progress .size="${56}" .thickness="${4.5}" label="56px"></ui-circular-progress>
      <ui-circular-progress .size="${80}" .thickness="${6}" label="80px"></ui-circular-progress>
    </div>
  `,
};

// ─── Linear ─────────────────────────────────────────────────────────────────

export const LinearIndeterminate: Story = {
    name: 'Linear — Indeterminate',
    render: () => html`
    <div style="width: 100%; max-width: 400px; padding: 20px;">
      <ui-linear-progress label="Loading"></ui-linear-progress>
    </div>
  `,
};

export const LinearDeterminate: Story = {
    name: 'Linear — Determinate',
    render: () => html`
    <div style="width: 100%; max-width: 400px; padding: 20px; display: flex; flex-direction: column; gap: 20px;">
      <ui-linear-progress variant="determinate" .value="${30}" label="30%"></ui-linear-progress>
      <ui-linear-progress variant="determinate" .value="${60}" label="60%"></ui-linear-progress>
      <ui-linear-progress variant="determinate" .value="${90}" label="90%"></ui-linear-progress>
    </div>
  `,
};

export const LinearSizes: Story = {
    name: 'Linear — Sizes',
    render: () => html`
    <div style="width: 100%; max-width: 400px; padding: 20px; display: flex; flex-direction: column; gap: 16px; font-family: sans-serif; font-size: 12px; color: #666;">
      <div>
        <p style="margin: 0 0 4px">height=2</p>
        <ui-linear-progress variant="determinate" .value="${60}" .height="${2}" label="2px height"></ui-linear-progress>
      </div>
      <div>
        <p style="margin: 0 0 4px">height=4 (default)</p>
        <ui-linear-progress variant="determinate" .value="${60}" label="4px height"></ui-linear-progress>
      </div>
      <div>
        <p style="margin: 0 0 4px">height=8</p>
        <ui-linear-progress variant="determinate" .value="${60}" .height="${8}" label="8px height"></ui-linear-progress>
      </div>
      <div>
        <p style="margin: 0 0 4px">height=12</p>
        <ui-linear-progress variant="determinate" .value="${60}" .height="${12}" label="12px height"></ui-linear-progress>
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
          <ui-circular-progress color="primary" label="Primary"></ui-circular-progress>
          <ui-circular-progress color="success" label="Success"></ui-circular-progress>
          <ui-circular-progress color="error" label="Error"></ui-circular-progress>
          <ui-circular-progress color="warning" label="Warning"></ui-circular-progress>
        </div>
        <div style="display: flex; gap: 16px; align-items: center; margin-top: 12px;">
          <ui-circular-progress variant="determinate" .value="${70}" color="primary" label="Primary 70%"></ui-circular-progress>
          <ui-circular-progress variant="determinate" .value="${70}" color="success" label="Success 70%"></ui-circular-progress>
          <ui-circular-progress variant="determinate" .value="${70}" color="error" label="Error 70%"></ui-circular-progress>
          <ui-circular-progress variant="determinate" .value="${70}" color="warning" label="Warning 70%"></ui-circular-progress>
        </div>
      </div>
      <div>
        <p style="margin: 0 0 12px; font-weight: 600;">Linear</p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <ui-linear-progress variant="determinate" .value="${60}" color="primary" label="Primary"></ui-linear-progress>
          <ui-linear-progress variant="determinate" .value="${60}" color="success" label="Success"></ui-linear-progress>
          <ui-linear-progress variant="determinate" .value="${60}" color="error" label="Error"></ui-linear-progress>
          <ui-linear-progress variant="determinate" .value="${60}" color="warning" label="Warning"></ui-linear-progress>
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
          <ui-circular-progress label="Loading user profile"></ui-circular-progress>
          <ui-linear-progress label="Uploading file" variant="determinate" .value="${45}"></ui-linear-progress>
        </div>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-weight: 600;">Paired with visible text (aria-labelledby)</p>
        <p style="margin: 0 0 8px; color: #666;">Use aria-labelledby when a visible label is already present.</p>
        <p id="upload-label" style="margin: 0 0 6px;">Uploading files… 72%</p>
        <ui-linear-progress
          variant="determinate"
          .value="${72}"
          style="--ui-linear-progress-height: 6px"
        ></ui-linear-progress>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-weight: 600;">Indeterminate (no value announced)</p>
        <p style="margin: 0 0 8px; color: #666;">aria-valuenow is omitted for indeterminate — correct per ARIA spec.</p>
        <div style="display: flex; gap: 16px; align-items: center;">
          <ui-circular-progress label="Processing"></ui-circular-progress>
          <ui-linear-progress label="Processing"></ui-linear-progress>
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
        <ui-circular-progress .size="${24}" .thickness="${3}" label="Loading"></ui-circular-progress>
      </div>
      <div>
        <h4 style="margin: 0 0 8px">Linear — Background upload</h4>
        <p style="font-size: 13px; color: #666; margin: 0 0 8px">Uploading files… 45%</p>
        <ui-linear-progress variant="determinate" .value="${45}" label="Upload 45%"></ui-linear-progress>
      </div>
      <div>
        <h4 style="margin: 0 0 8px">Circular — Success state</h4>
        <ui-circular-progress variant="determinate" .value="${100}" color="success" label="Complete"></ui-circular-progress>
      </div>
      <div>
        <h4 style="margin: 0 0 8px">Linear — Error state</h4>
        <ui-linear-progress variant="determinate" .value="${30}" color="error" label="Upload failed at 30%"></ui-linear-progress>
      </div>
    </div>
  `,
};
