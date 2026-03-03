import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-kbd';

const meta: Meta = {
  title: 'Display/Kbd',
  component: 'ui-kbd',
  parameters: {
    docs: {
      description: {
        component: `
Used to display textual user input from keyboard.

### Components
- **\`ui-kbd\`** — Single keyboard key. Wraps content in a semantic \`<kbd>\` element.
- **\`ui-kbd-group\`** — Flex row that groups multiple \`ui-kbd\` elements for key combinations.

### CSS Custom Properties
| Property | Default | Description |
|---|---|---|
| \`--ui-kbd-bg\` | \`#f9fafb\` | Background colour |
| \`--ui-kbd-border-color\` | \`#e5e7eb\` | Border colour |
| \`--ui-kbd-color\` | \`#374151\` | Text colour |
| \`--ui-kbd-font-family\` | monospace | Font family |
| \`--ui-kbd-radius\` | \`4px\` | Border radius |
| \`--ui-kbd-shadow-color\` | \`#d1d5db\` | Bottom-shadow colour |
| \`--ui-kbd-group-gap\` | \`4px\` | Gap between group items |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/* ── Default ─────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      <ui-kbd>Ctrl</ui-kbd>
      <ui-kbd>⌘</ui-kbd>
      <ui-kbd>⇧</ui-kbd>
      <ui-kbd>⌥</ui-kbd>
      <ui-kbd>⌃</ui-kbd>
      <ui-kbd>⏎</ui-kbd>
      <ui-kbd>Esc</ui-kbd>
      <ui-kbd>Tab</ui-kbd>
    </div>
  `,
};

/* ── Sizes ───────────────────────────────────────────────────────── */
export const Sizes: Story = {
  name: 'Sizes',
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280; font-family: system-ui;">sm</span>
        <ui-kbd size="sm">⌘</ui-kbd>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280; font-family: system-ui;">default</span>
        <ui-kbd>⌘</ui-kbd>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280; font-family: system-ui;">lg</span>
        <ui-kbd size="lg">⌘</ui-kbd>
      </div>
    </div>
  `,
};

/* ── Group ───────────────────────────────────────────────────────── */
export const Group: Story = {
  name: 'Group',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <ui-kbd-group>
        <ui-kbd>⌘</ui-kbd>
        <ui-kbd>⇧</ui-kbd>
        <ui-kbd>⌥</ui-kbd>
        <ui-kbd>⌃</ui-kbd>
      </ui-kbd-group>

      <ui-kbd-group>
        <ui-kbd>Ctrl</ui-kbd>
        <span style="font-family: system-ui; font-size: 0.875rem; color: #6b7280;">+</span>
        <ui-kbd>B</ui-kbd>
      </ui-kbd-group>

      <ui-kbd-group>
        <ui-kbd>Ctrl</ui-kbd>
        <span style="font-family: system-ui; font-size: 0.875rem; color: #6b7280;">+</span>
        <ui-kbd>K</ui-kbd>
      </ui-kbd-group>
    </div>
  `,
};

/* ── InlineText ──────────────────────────────────────────────────── */
export const InlineText: Story = {
  name: 'Inline in Text',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; font-family: system-ui; font-size: 0.875rem; color: #374151; max-width: 420px; line-height: 1.6;">
      <p style="margin: 0;">
        Press <ui-kbd>⌘</ui-kbd> <ui-kbd>K</ui-kbd> to open the command palette.
      </p>
      <p style="margin: 0;">
        Use <ui-kbd-group>
          <ui-kbd>Ctrl</ui-kbd>
          <span style="color: #6b7280;">+</span>
          <ui-kbd>B</ui-kbd>
        </ui-kbd-group> to bold selected text.
      </p>
      <p style="margin: 0;">
        Save your work with <ui-kbd>Ctrl</ui-kbd> + <ui-kbd>S</ui-kbd>.
      </p>
    </div>
  `,
};

/* ── MacModifiers ────────────────────────────────────────────────── */
export const MacModifiers: Story = {
  name: 'Mac Modifier Keys',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start; font-family: system-ui; font-size: 0.875rem;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>⌘</ui-kbd>
        <span style="color: #6b7280;">Command</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>⇧</ui-kbd>
        <span style="color: #6b7280;">Shift</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>⌥</ui-kbd>
        <span style="color: #6b7280;">Option / Alt</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>⌃</ui-kbd>
        <span style="color: #6b7280;">Control</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>⏎</ui-kbd>
        <span style="color: #6b7280;">Return / Enter</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>⌫</ui-kbd>
        <span style="color: #6b7280;">Backspace / Delete</span>
      </div>
    </div>
  `,
};

/* ── ShortcutList ────────────────────────────────────────────────── */
export const ShortcutList: Story = {
  name: 'Shortcut List',
  render: () => html`
    <div style="
      display: flex; flex-direction: column; gap: 0;
      border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;
      font-family: system-ui; font-size: 0.875rem; max-width: 400px;
    ">
      ${([
        { label: 'Copy', keys: ['⌘', 'C'] },
        { label: 'Paste', keys: ['⌘', 'V'] },
        { label: 'Cut', keys: ['⌘', 'X'] },
        { label: 'Undo', keys: ['⌘', 'Z'] },
        { label: 'Redo', keys: ['⌘', '⇧', 'Z'] },
        { label: 'Find', keys: ['⌘', 'F'] },
      ]).map((row, i) => html`
        <div style="
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 16px;
          border-top: ${i > 0 ? '1px solid #f3f4f6' : 'none'};
          background: ${i % 2 === 0 ? '#ffffff' : '#fafafa'};
        ">
          <span style="color: #374151;">${row.label}</span>
          <ui-kbd-group>
            ${row.keys.map(k => html`<ui-kbd size="sm">${k}</ui-kbd>`)}
          </ui-kbd-group>
        </div>
      `)}
    </div>
  `,
};

/* ── CustomStyles ────────────────────────────────────────────────── */
export const CustomStyles: Story = {
  name: 'Custom CSS Properties',
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
      <!-- dark theme -->
      <ui-kbd style="
        --ui-kbd-bg: #1e293b;
        --ui-kbd-border-color: #334155;
        --ui-kbd-color: #e2e8f0;
        --ui-kbd-shadow-color: #0f172a;
      ">⌘</ui-kbd>

      <!-- accent color -->
      <ui-kbd style="
        --ui-kbd-bg: #eff6ff;
        --ui-kbd-border-color: #bfdbfe;
        --ui-kbd-color: #1d4ed8;
        --ui-kbd-shadow-color: #93c5fd;
        --ui-kbd-radius: 6px;
      ">K</ui-kbd>

      <!-- group with dark theme -->
      <ui-kbd-group style="--ui-kbd-group-gap: 2px;">
        <ui-kbd style="
          --ui-kbd-bg: #1e293b;
          --ui-kbd-border-color: #334155;
          --ui-kbd-color: #e2e8f0;
          --ui-kbd-shadow-color: #0f172a;
        ">Ctrl</ui-kbd>
        <ui-kbd style="
          --ui-kbd-bg: #1e293b;
          --ui-kbd-border-color: #334155;
          --ui-kbd-color: #e2e8f0;
          --ui-kbd-shadow-color: #0f172a;
        ">P</ui-kbd>
      </ui-kbd-group>
    </div>
  `,
};
