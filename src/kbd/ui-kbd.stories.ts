import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-kbd';

const meta: Meta = {
  title: 'Utilities/Kbd',
  component: 'ui-kbd',
  parameters: {
    docs: {
      description: {
        component: `
Used to display textual user input from keyboard.

### Components
- **\`ui-kbd\`** — Single keyboard key. Wraps content in a semantic \`<kbd>\` element.
- **\`ui-kbd-group\`** — Flex row that groups multiple \`ui-kbd\` elements for key combinations.

### Props
| Prop | Values | Default | Description |
|---|---|---|---|
| \`size\` | \`sm\` or \`default\` or \`lg\` | \`default\` | Visual size |
| \`variant\` | \`raised\` or \`flat\` | \`raised\` | \`raised\` shows bottom border + shadow; \`flat\` removes them for inline/menu use |
| \`label\` | string | — | Forwarded as \`aria-label\` on \`<kbd>\` — useful for symbol keys |

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

/* ── Variants ────────────────────────────────────────────────────── */
export const Variants: Story = {
  name: 'Variants',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; font-family: system-ui; font-size: 0.875rem; color: #374151;">
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280;">raised (default) — bottom border + shadow</span>
        <div style="display: flex; gap: 8px;">
          <ui-kbd>⌘</ui-kbd>
          <ui-kbd>⇧</ui-kbd>
          <ui-kbd>K</ui-kbd>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280;">flat — no raised effect, suits inline/menu contexts</span>
        <div style="display: flex; gap: 8px;">
          <ui-kbd variant="flat">⌘</ui-kbd>
          <ui-kbd variant="flat">⇧</ui-kbd>
          <ui-kbd variant="flat">K</ui-kbd>
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
              <ui-kbd variant="flat" size="sm">${label === 'Bold' ? '⌘ B' : label === 'Italic' ? '⌘ I' : '⌘ U'}</ui-kbd>
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
      description: '`--ui-kbd-group-gap` CSS custom property',
    },
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <ui-kbd-group style="--ui-kbd-group-gap: ${args['gap']}">
        <ui-kbd>⌘</ui-kbd>
        <ui-kbd>⇧</ui-kbd>
        <ui-kbd>⌥</ui-kbd>
        <ui-kbd>⌃</ui-kbd>
      </ui-kbd-group>

      <ui-kbd-group style="--ui-kbd-group-gap: ${args['gap']}">
        <ui-kbd>Ctrl</ui-kbd>
        <span style="font-family: system-ui; font-size: 0.875rem; color: #6b7280;">+</span>
        <ui-kbd>B</ui-kbd>
      </ui-kbd-group>

      <ui-kbd-group style="--ui-kbd-group-gap: ${args['gap']}">
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
        <ui-kbd label="Command">⌘</ui-kbd>
        <span style="color: #6b7280;">Command</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd label="Shift">⇧</ui-kbd>
        <span style="color: #6b7280;">Shift</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd label="Option / Alt">⌥</ui-kbd>
        <span style="color: #6b7280;">Option / Alt</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd label="Control">⌃</ui-kbd>
        <span style="color: #6b7280;">Control</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd label="Return / Enter">⏎</ui-kbd>
        <span style="color: #6b7280;">Return / Enter</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd label="Backspace / Delete">⌫</ui-kbd>
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
        <ui-kbd>Ctrl</ui-kbd>
        <span style="color: #6b7280;">Control</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>Alt</ui-kbd>
        <span style="color: #6b7280;">Alt</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>Shift</ui-kbd>
        <span style="color: #6b7280;">Shift</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>Win</ui-kbd>
        <span style="color: #6b7280;">Windows / Super</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>Del</ui-kbd>
        <span style="color: #6b7280;">Delete</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>PgUp</ui-kbd>
        <span style="color: #6b7280;">Page Up</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>PgDn</ui-kbd>
        <span style="color: #6b7280;">Page Down</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>Home</ui-kbd>
        <span style="color: #6b7280;">Home</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <ui-kbd>End</ui-kbd>
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
          <ui-kbd label="Up Arrow">↑</ui-kbd>
          <ui-kbd label="Down Arrow">↓</ui-kbd>
          <ui-kbd label="Left Arrow">←</ui-kbd>
          <ui-kbd label="Right Arrow">→</ui-kbd>
        </div>
      </div>

      <!-- Cross layout -->
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280;">Cross layout</span>
        <div style="display: grid; grid-template-columns: repeat(3, auto); grid-template-rows: repeat(2, auto); gap: 4px; width: fit-content;">
          <span></span>
          <ui-kbd label="Up Arrow">↑</ui-kbd>
          <span></span>
          <ui-kbd label="Left Arrow">←</ui-kbd>
          <ui-kbd label="Down Arrow">↓</ui-kbd>
          <ui-kbd label="Right Arrow">→</ui-kbd>
        </div>
      </div>

      <!-- In context -->
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
        <span style="font-size: 0.75rem; color: #6b7280;">In context</span>
        <p style="margin: 0; line-height: 1.6;">
          Use <ui-kbd label="Left Arrow">←</ui-kbd> <ui-kbd label="Right Arrow">→</ui-kbd> to navigate between slides.
        </p>
        <p style="margin: 0; line-height: 1.6;">
          Press <ui-kbd-group>
            <ui-kbd>Ctrl</ui-kbd>
            <ui-kbd label="Up Arrow">↑</ui-kbd>
          </ui-kbd-group> to jump to the top.
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
          <ui-kbd-group>
            ${row.keys.map(k => html`<ui-kbd size="sm">${k}</ui-kbd>`)}
          </ui-kbd-group>
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
          <ui-kbd style="
            --ui-kbd-bg: #334155;
            --ui-kbd-border-color: #475569;
            --ui-kbd-color: #f8fafc;
            --ui-kbd-shadow-color: #0f172a;
          " label="Command">⌘</ui-kbd>
          <ui-kbd style="
            --ui-kbd-bg: #334155;
            --ui-kbd-border-color: #475569;
            --ui-kbd-color: #f8fafc;
            --ui-kbd-shadow-color: #0f172a;
          ">K</ui-kbd>
        </p>
      </div>

      <!-- Help text block -->
      <div style="
        border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px 16px; line-height: 1.8;
      ">
        <p style="margin: 0 0 8px; font-weight: 600; color: #111827;">Keyboard shortcuts</p>
        <p style="margin: 0;">
          Search: <ui-kbd variant="flat" size="sm">⌘</ui-kbd> <ui-kbd variant="flat" size="sm">K</ui-kbd>
        </p>
        <p style="margin: 0;">
          New file: <ui-kbd variant="flat" size="sm">⌘</ui-kbd> <ui-kbd variant="flat" size="sm">N</ui-kbd>
        </p>
        <p style="margin: 0;">
          Save: <ui-kbd variant="flat" size="sm">⌘</ui-kbd> <ui-kbd variant="flat" size="sm">S</ui-kbd>
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
