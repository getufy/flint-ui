import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-kbd';

const meta: Meta = {
  title: 'Utilities/Kbd',
  component: 'flint-kbd',
  parameters: {
    docs: {
      description: {
        component: `
#### \`<flint-kbd>\`

Displays a single keyboard key or modifier symbol. Renders a semantic \`<kbd>\` element for accessibility.

- **Tag**: \`<flint-kbd>\`
- **Class**: \`FlintKbd\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`size\` | \`size\` | \`'sm' \\| 'default' \\| 'lg'\` | \`'default'\` | Visual size of the key. |
| \`variant\` | \`variant\` | \`'raised' \\| 'flat'\` | \`'raised'\` | Visual style: \`raised\` (default, bottom border + shadow) or \`flat\` (no raised effect). |
| \`label\` | \`label\` | \`string\` | \`''\` | Accessible label forwarded as \`aria-label\` on the inner \`<kbd>\` element. Useful for symbol keys like ⌘. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Key label: text, symbol (⌘ ⇧ ⌥ ⌃ ⏎), or any inline content. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-kbd-group-gap\` | \`4px\` |
| \`--flint-kbd-font-family\` | \`flint-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace\` |
| \`--flint-kbd-color\` | \`var(--flint-label-color\` |
| \`--flint-kbd-bg\` | \`var(--flint-surface-2\` |
| \`--flint-kbd-border-color\` | \`var(--flint-border-color\` |
| \`--flint-kbd-radius\` | \`var(--flint-border-radius-sm\` |
| \`--flint-kbd-shadow-color\` | \`var(--flint-input-border-color\` |

---

#### \`<flint-kbd-group>\`

Groups multiple \`flint-kbd\` elements in a row. Provides a flex container with tight spacing for key combos.

- **Tag**: \`<flint-kbd-group>\`
- **Class**: \`FlintKbdGroup\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | \`flint-kbd\` elements, separators (e.g. \`<span>+</span>\`), or text. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-kbd-group-gap\` | \`4px\` |
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
      <flint-kbd>Ctrl</flint-kbd>
      <flint-kbd>⌘</flint-kbd>
      <flint-kbd>⇧</flint-kbd>
      <flint-kbd>⌥</flint-kbd>
      <flint-kbd>⌃</flint-kbd>
      <flint-kbd>⏎</flint-kbd>
      <flint-kbd>Esc</flint-kbd>
      <flint-kbd>Tab</flint-kbd>
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
        <flint-kbd size="sm">⌘</flint-kbd>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280; font-family: system-ui;">default</span>
        <flint-kbd>⌘</flint-kbd>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280; font-family: system-ui;">lg</span>
        <flint-kbd size="lg">⌘</flint-kbd>
      </div>
    </div>
  `,
};

/* ── Variants ────────────────────────────────────────────────────── */
export const Variants: Story = {
  name: 'Variants',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; font-family: system-ui; font-size: 0.875rem; color: #374151;">
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280;">raised (default) — bottom border + shadow</span>
        <div style="display: flex; gap: 8px;">
          <flint-kbd>⌘</flint-kbd>
          <flint-kbd>⇧</flint-kbd>
          <flint-kbd>K</flint-kbd>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280;">flat — no raised effect, suits inline/menu contexts</span>
        <div style="display: flex; gap: 8px;">
          <flint-kbd variant="flat">⌘</flint-kbd>
          <flint-kbd variant="flat">⇧</flint-kbd>
          <flint-kbd variant="flat">K</flint-kbd>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280;">flat in a menu row</span>
        <div style="border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden; width: 260px;">
          ${(['Bold', 'Italic', 'Underline'] as const).map((label, i) => html`
            <div style="
              display: flex; align-items: center; justify-content: space-between;
              padding: 8px 12px;
              border-top: ${i > 0 ? '1px solid #f3f4f6' : 'none'};
              font-size: 0.875rem;
            ">
              <span>${label}</span>
              <flint-kbd variant="flat" size="sm">${label === 'Bold' ? '⌘ B' : label === 'Italic' ? '⌘ I' : '⌘ U'}</flint-kbd>
            </div>
          `)}
        </div>
      </div>
    </div>
  `,
};

/* ── Group ───────────────────────────────────────────────────────── */
export const Group: Story = {
  name: 'Group',
  args: {
    gap: '4px',
  },
  argTypes: {
    gap: {
      control: 'text',
      description: '`--flint-kbd-group-gap` CSS custom property',
    },
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <flint-kbd-group style="--flint-kbd-group-gap: ${args['gap']}">
        <flint-kbd>⌘</flint-kbd>
        <flint-kbd>⇧</flint-kbd>
        <flint-kbd>⌥</flint-kbd>
        <flint-kbd>⌃</flint-kbd>
      </flint-kbd-group>

      <flint-kbd-group style="--flint-kbd-group-gap: ${args['gap']}">
        <flint-kbd>Ctrl</flint-kbd>
        <span style="font-family: system-ui; font-size: 0.875rem; color: #6b7280;">+</span>
        <flint-kbd>B</flint-kbd>
      </flint-kbd-group>

      <flint-kbd-group style="--flint-kbd-group-gap: ${args['gap']}">
        <flint-kbd>Ctrl</flint-kbd>
        <span style="font-family: system-ui; font-size: 0.875rem; color: #6b7280;">+</span>
        <flint-kbd>K</flint-kbd>
      </flint-kbd-group>
    </div>
  `,
};

/* ── InlineText ──────────────────────────────────────────────────── */
export const InlineText: Story = {
  name: 'Inline in Text',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; font-family: system-ui; font-size: 0.875rem; color: #374151; max-width: 420px; line-height: 1.6;">
      <p style="margin: 0;">
        Press <flint-kbd>⌘</flint-kbd> <flint-kbd>K</flint-kbd> to open the command palette.
      </p>
      <p style="margin: 0;">
        Use <flint-kbd-group>
          <flint-kbd>Ctrl</flint-kbd>
          <span style="color: #6b7280;">+</span>
          <flint-kbd>B</flint-kbd>
        </flint-kbd-group> to bold selected text.
      </p>
      <p style="margin: 0;">
        Save your work with <flint-kbd>Ctrl</flint-kbd> + <flint-kbd>S</flint-kbd>.
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
        <flint-kbd label="Command">⌘</flint-kbd>
        <span style="color: #6b7280;">Command</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd label="Shift">⇧</flint-kbd>
        <span style="color: #6b7280;">Shift</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd label="Option / Alt">⌥</flint-kbd>
        <span style="color: #6b7280;">Option / Alt</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd label="Control">⌃</flint-kbd>
        <span style="color: #6b7280;">Control</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd label="Return / Enter">⏎</flint-kbd>
        <span style="color: #6b7280;">Return / Enter</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd label="Backspace / Delete">⌫</flint-kbd>
        <span style="color: #6b7280;">Backspace / Delete</span>
      </div>
    </div>
  `,
};

/* ── WindowsModifiers ────────────────────────────────────────────── */
export const WindowsModifiers: Story = {
  name: 'Windows / Linux Modifier Keys',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start; font-family: system-ui; font-size: 0.875rem;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd>Ctrl</flint-kbd>
        <span style="color: #6b7280;">Control</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd>Alt</flint-kbd>
        <span style="color: #6b7280;">Alt</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd>Shift</flint-kbd>
        <span style="color: #6b7280;">Shift</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd>Win</flint-kbd>
        <span style="color: #6b7280;">Windows / Super</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd>Del</flint-kbd>
        <span style="color: #6b7280;">Delete</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd>PgUp</flint-kbd>
        <span style="color: #6b7280;">Page Up</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd>PgDn</flint-kbd>
        <span style="color: #6b7280;">Page Down</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd>Home</flint-kbd>
        <span style="color: #6b7280;">Home</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <flint-kbd>End</flint-kbd>
        <span style="color: #6b7280;">End</span>
      </div>
    </div>
  `,
};

/* ── ArrowKeys ───────────────────────────────────────────────────── */
export const ArrowKeys: Story = {
  name: 'Arrow Keys',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; font-family: system-ui; font-size: 0.875rem; color: #374151;">
      <!-- Individual arrows -->
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280;">Individual</span>
        <div style="display: flex; gap: 8px; align-items: center;">
          <flint-kbd label="Up Arrow">↑</flint-kbd>
          <flint-kbd label="Down Arrow">↓</flint-kbd>
          <flint-kbd label="Left Arrow">←</flint-kbd>
          <flint-kbd label="Right Arrow">→</flint-kbd>
        </div>
      </div>

      <!-- Cross layout -->
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280;">Cross layout</span>
        <div style="display: grid; grid-template-columns: repeat(3, auto); grid-template-rows: repeat(2, auto); gap: 4px; width: fit-content;">
          <span></span>
          <flint-kbd label="Up Arrow">↑</flint-kbd>
          <span></span>
          <flint-kbd label="Left Arrow">←</flint-kbd>
          <flint-kbd label="Down Arrow">↓</flint-kbd>
          <flint-kbd label="Right Arrow">→</flint-kbd>
        </div>
      </div>

      <!-- In context -->
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280;">In context</span>
        <p style="margin: 0; line-height: 1.6;">
          Use <flint-kbd label="Left Arrow">←</flint-kbd> <flint-kbd label="Right Arrow">→</flint-kbd> to navigate between slides.
        </p>
        <p style="margin: 0; line-height: 1.6;">
          Press <flint-kbd-group>
            <flint-kbd>Ctrl</flint-kbd>
            <flint-kbd label="Up Arrow">↑</flint-kbd>
          </flint-kbd-group> to jump to the top.
        </p>
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
          <flint-kbd-group>
            ${row.keys.map(k => html`<flint-kbd size="sm">${k}</flint-kbd>`)}
          </flint-kbd-group>
        </div>
      `)}
    </div>
  `,
};

/* ── InlineInTooltip ─────────────────────────────────────────────── */
export const InlineInTooltip: Story = {
  name: 'Inline in Tooltip / Description',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; font-family: system-ui; font-size: 0.875rem; color: #374151; max-width: 340px;">

      <!-- Tooltip bubble -->
      <div style="
        background: #1e293b; color: #f8fafc; border-radius: 8px;
        padding: 10px 14px; line-height: 1.6; position: relative;
      ">
        <p style="margin: 0;">
          Open command palette
          <flint-kbd style="
            --flint-kbd-bg: #334155;
            --flint-kbd-border-color: #475569;
            --flint-kbd-color: #f8fafc;
            --flint-kbd-shadow-color: #0f172a;
          " label="Command">⌘</flint-kbd>
          <flint-kbd style="
            --flint-kbd-bg: #334155;
            --flint-kbd-border-color: #475569;
            --flint-kbd-color: #f8fafc;
            --flint-kbd-shadow-color: #0f172a;
          ">K</flint-kbd>
        </p>
      </div>

      <!-- Help text block -->
      <div style="
        border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px 16px; line-height: 1.8;
      ">
        <p style="margin: 0 0 8px; font-weight: 600; color: #111827;">Keyboard shortcuts</p>
        <p style="margin: 0;">
          Search: <flint-kbd variant="flat" size="sm">⌘</flint-kbd> <flint-kbd variant="flat" size="sm">K</flint-kbd>
        </p>
        <p style="margin: 0;">
          New file: <flint-kbd variant="flat" size="sm">⌘</flint-kbd> <flint-kbd variant="flat" size="sm">N</flint-kbd>
        </p>
        <p style="margin: 0;">
          Save: <flint-kbd variant="flat" size="sm">⌘</flint-kbd> <flint-kbd variant="flat" size="sm">S</flint-kbd>
        </p>
      </div>
    </div>
  `,
};

/* ── CustomStyles ────────────────────────────────────────────────── */
export const CustomStyles: Story = {
  name: 'Custom CSS Properties',
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
      <!-- dark theme -->
      <flint-kbd style="
        --flint-kbd-bg: #1e293b;
        --flint-kbd-border-color: #334155;
        --flint-kbd-color: #e2e8f0;
        --flint-kbd-shadow-color: #0f172a;
      ">⌘</flint-kbd>

      <!-- accent color -->
      <flint-kbd style="
        --flint-kbd-bg: #eff6ff;
        --flint-kbd-border-color: #bfdbfe;
        --flint-kbd-color: #1d4ed8;
        --flint-kbd-shadow-color: #93c5fd;
        --flint-kbd-radius: 6px;
      ">K</flint-kbd>

      <!-- group with dark theme -->
      <flint-kbd-group style="--flint-kbd-group-gap: 2px;">
        <flint-kbd style="
          --flint-kbd-bg: #1e293b;
          --flint-kbd-border-color: #334155;
          --flint-kbd-color: #e2e8f0;
          --flint-kbd-shadow-color: #0f172a;
        ">Ctrl</flint-kbd>
        <flint-kbd style="
          --flint-kbd-bg: #1e293b;
          --flint-kbd-border-color: #334155;
          --flint-kbd-color: #e2e8f0;
          --flint-kbd-shadow-color: #0f172a;
        ">P</flint-kbd>
      </flint-kbd-group>
    </div>
  `,
};
