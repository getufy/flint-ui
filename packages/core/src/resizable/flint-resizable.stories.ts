import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-resizable.js';
import '../tabs/flint-tabs.js';
import '../box/flint-box.js';
import '../stack/flint-stack.js';
import '../typography/flint-typography.js';
import '../button/flint-button.js';
import type { FlintResizablePanel } from './flint-resizable.js';

const meta: Meta = {
  title: 'Layout/Resizable',
  component: 'flint-resizable-group',
  parameters: {
      a11y: {
          config: {
              rules: [
                  { id: 'color-contrast', enabled: false },
                  { id: 'button-name', enabled: false },
                  { id: 'nested-interactive', enabled: false },
                  { id: 'aria-required-children', enabled: false },
              ],
          },
      },
      docs: {
            description: {
                component: `
#### \`<flint-resizable-group>\`

Resizable Group: a container that enables resizable panels with draggable handles.

- **Tag**: \`<flint-resizable-group>\`
- **Class**: \`FlintResizableGroup\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`orientation\` | \`orientation\` | \`Orientation\` | \`'horizontal'\` | Layout direction — 'horizontal' (row) or 'vertical' (column). |
| \`dir\` | \`dir\` | \`'ltr' \\| 'rtl'\` | \`'ltr'\` | Text direction for RTL support. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-resizable-collapse\` | — | Fired when a panel is collapsed. |
| \`flint-resizable-expand\` | — | Fired when a collapsed panel is expanded. |
| \`flint-resizable-change\` | — | Fired when panel sizes change via drag or keyboard. |

#### CSS Parts

| Name | Description |
|---|---|
| \`grip\` | The grip element. |

#### Methods

| Method | Description |
|---|---|
| \`getLayout(): number[]\` | Returns a snapshot of panel sizes as percentages (0-100). |

---

#### \`<flint-resizable-panel>\`

- **Tag**: \`<flint-resizable-panel>\`
- **Class**: \`FlintResizablePanel\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`size\` | \`size\` | \`number\` | \`0\` | Current size as percentage (0–100). |
| \`defaultSize\` | \`default-size\` | \`number\` | \`0\` | Default size — applied once on first update. |
| \`minSize\` | \`min-size\` | \`number\` | \`0\` | Minimum size percentage (0–100). |
| \`maxSize\` | \`max-size\` | \`number\` | \`100\` | Maximum size percentage (0–100). |
| \`collapsible\` | \`collapsible\` | \`boolean\` | \`false\` | Whether the panel can collapse to zero size via drag. |
| \`collapsed\` | \`collapsed\` | \`boolean\` | \`false\` | Whether the panel is currently collapsed via the programmatic API. |

#### Methods

| Method | Description |
|---|---|
| \`collapse(): void\` | Collapse this panel to zero size, transferring its space to the adjacent |
| \`expand(): void\` | Expand this panel back to its previous size (or \`defaultSize\` as fallback). |
| \`toggle(): void\` | Toggle between collapsed and expanded states. |

---

#### \`<flint-resizable-handle>\`

- **Tag**: \`<flint-resizable-handle>\`
- **Class**: \`FlintResizableHandle\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`withHandle\` | \`with-handle\` | \`boolean\` | \`false\` | Show a visible drag grip. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disable interaction. |
                `,
            },
        },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
    },
  },
  args: {
    orientation: 'horizontal',
    dir: 'ltr',
  },
};

export default meta;
type Story = StoryObj;

/* ------------------------------------------------------------------ */
/*  Playground                                                        */
/* ------------------------------------------------------------------ */

export const Playground: Story = {
  render: (args) => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <flint-resizable-group .orientation=${args.orientation} .dir=${args.dir}>
        <flint-resizable-panel .defaultSize=${50}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">One</flint-typography>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Two</flint-typography>
          </flint-box>
        </flint-resizable-panel>
      </flint-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Vertical                                                          */
/* ------------------------------------------------------------------ */

export const Vertical: Story = {
  render: () => html`
    <div style="height:300px;max-width:400px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <flint-resizable-group orientation="vertical">
        <flint-resizable-panel .defaultSize=${25}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Header</flint-typography>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${75}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Content</flint-typography>
          </flint-box>
        </flint-resizable-panel>
      </flint-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  With Handle                                                       */
/* ------------------------------------------------------------------ */

export const WithHandle: Story = {
  name: 'With Handle',
  render: () => html`
    <div style="height:200px;max-width:500px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <flint-resizable-group orientation="horizontal">
        <flint-resizable-panel .defaultSize=${25}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Sidebar</flint-typography>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${75}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Content</flint-typography>
          </flint-box>
        </flint-resizable-panel>
      </flint-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Nested (Horizontal + Vertical)                                    */
/* ------------------------------------------------------------------ */

export const Nested: Story = {
  render: () => html`
    <div style="height:300px;max-width:600px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <flint-resizable-group orientation="horizontal">
        <flint-resizable-panel .defaultSize=${50}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">One</flint-typography>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}>
          <flint-resizable-group orientation="vertical">
            <flint-resizable-panel .defaultSize=${25}>
              <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
                <flint-typography variant="subtitle2">Two</flint-typography>
              </flint-box>
            </flint-resizable-panel>
            <flint-resizable-handle with-handle></flint-resizable-handle>
            <flint-resizable-panel .defaultSize=${75}>
              <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
                <flint-typography variant="subtitle2">Three</flint-typography>
              </flint-box>
            </flint-resizable-panel>
          </flint-resizable-group>
        </flint-resizable-panel>
      </flint-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Three Panels                                                      */
/* ------------------------------------------------------------------ */

export const ThreePanels: Story = {
  name: 'Three Panels',
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <flint-resizable-group orientation="horizontal">
        <flint-resizable-panel .defaultSize=${25}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Nav</flint-typography>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Content</flint-typography>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${25}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Details</flint-typography>
          </flint-box>
        </flint-resizable-panel>
      </flint-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Collapsible (drag-based)                                          */
/* ------------------------------------------------------------------ */

export const Collapsible: Story = {
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <flint-resizable-group orientation="horizontal">
        <flint-resizable-panel .defaultSize=${25} .minSize=${15} .collapsible=${true}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Sidebar</flint-typography>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${75}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Content</flint-typography>
          </flint-box>
        </flint-resizable-panel>
      </flint-resizable-group>
    </div>
    <flint-typography variant="caption" color="textSecondary" style="display:block;margin-top:8px;">
      Drag the sidebar to its minimum, then keep dragging to snap it fully closed.
    </flint-typography>
  `,
};

/* ------------------------------------------------------------------ */
/*  Collapse API                                                      */
/* ------------------------------------------------------------------ */

export const CollapseAPI: Story = {
  name: 'Collapse API',
  render: () => html`
    <div data-collapse-demo>
      <!-- External controls — always visible, never inside a collapsible panel -->
      <flint-stack direction="row" alignItems="center" gap="8px" style="margin-bottom:10px;flex-wrap:wrap;">
        <flint-button
          variant="secondary"
          size="small"
          @click=${(e: Event) => {
            const root = (e.target as HTMLElement).closest('[data-collapse-demo]')!;
            const panel = root.querySelector<FlintResizablePanel>('[data-sidebar-panel]')!;
            panel.collapse();
          }}
        >Collapse</flint-button>
        <flint-button
          variant="secondary"
          size="small"
          @click=${(e: Event) => {
            const root = (e.target as HTMLElement).closest('[data-collapse-demo]')!;
            const panel = root.querySelector<FlintResizablePanel>('[data-sidebar-panel]')!;
            panel.expand();
          }}
        >Expand</flint-button>
        <flint-button
          size="small"
          @click=${(e: Event) => {
            const root = (e.target as HTMLElement).closest('[data-collapse-demo]')!;
            const panel = root.querySelector<FlintResizablePanel>('[data-sidebar-panel]')!;
            const statusEl = root.querySelector<HTMLElement>('[data-status]')!;
            panel.toggle();
            if (statusEl) statusEl.textContent = panel.collapsed ? 'collapsed' : 'visible';
          }}
        >Toggle</flint-button>
        <flint-typography variant="body2" color="textSecondary">
          Sidebar: <strong data-status style="color:var(--flint-text-color,#111827);">visible</strong>
        </flint-typography>
      </flint-stack>

      <div
        style="height:200px;max-width:600px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;"
        @flint-resizable-collapse=${(e: CustomEvent) => {
          const root = (e.currentTarget as HTMLElement).closest('[data-collapse-demo]')!;
          const statusEl = root?.querySelector<HTMLElement>('[data-status]');
          if (statusEl) statusEl.textContent = 'collapsed';
          e.stopPropagation();
        }}
        @flint-resizable-expand=${(e: CustomEvent) => {
          const root = (e.currentTarget as HTMLElement).closest('[data-collapse-demo]')!;
          const statusEl = root?.querySelector<HTMLElement>('[data-status]');
          if (statusEl) statusEl.textContent = 'visible';
          e.stopPropagation();
        }}
      >
        <flint-resizable-group orientation="horizontal">
          <flint-resizable-panel data-sidebar-panel .defaultSize=${30} .minSize=${10} .collapsible=${true}>
            <flint-box bgcolor="var(--flint-muted-background,#f4f4f5)" display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
              <flint-typography variant="subtitle2">Sidebar</flint-typography>
            </flint-box>
          </flint-resizable-panel>
          <flint-resizable-handle with-handle></flint-resizable-handle>
          <flint-resizable-panel .defaultSize=${70}>
            <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
              <flint-typography variant="subtitle2">Content</flint-typography>
            </flint-box>
          </flint-resizable-panel>
        </flint-resizable-group>
      </div>

      <flint-typography variant="caption" color="textSecondary" style="display:block;margin-top:8px;">
        Buttons live <em>outside</em> the resizable group — they stay visible even when the sidebar
        is fully collapsed. The panel fires <code>flint-resizable-collapse</code> /
        <code>flint-resizable-expand</code> events.
      </flint-typography>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Min/Max Constraints                                               */
/* ------------------------------------------------------------------ */

export const Constraints: Story = {
  name: 'Min/Max Constraints',
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <flint-resizable-group orientation="horizontal">
        <flint-resizable-panel .defaultSize=${30} .minSize=${20} .maxSize=${60}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <div style="text-align:center;">
              <flint-typography variant="subtitle2" gutterBottom>Panel A</flint-typography>
              <flint-typography variant="caption" color="textSecondary">min:20% max:60%</flint-typography>
            </div>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${70} .minSize=${30}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <div style="text-align:center;">
              <flint-typography variant="subtitle2" gutterBottom>Panel B</flint-typography>
              <flint-typography variant="caption" color="textSecondary">min:30%</flint-typography>
            </div>
          </flint-box>
        </flint-resizable-panel>
      </flint-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  RTL                                                                */
/* ------------------------------------------------------------------ */

export const RTL: Story = {
  name: 'RTL Layout',
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <flint-resizable-group orientation="horizontal" dir="rtl">
        <flint-resizable-panel .defaultSize=${30}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Right (30%)</flint-typography>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${70}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Left (70%)</flint-typography>
          </flint-box>
        </flint-resizable-panel>
      </flint-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Disabled Handle                                                    */
/* ------------------------------------------------------------------ */

export const DisabledHandle: Story = {
  name: 'Disabled Handle',
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <flint-resizable-group orientation="horizontal">
        <flint-resizable-panel .defaultSize=${30}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Fixed</flint-typography>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle disabled></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${40}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Resizable</flint-typography>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${30}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Resizable</flint-typography>
          </flint-box>
        </flint-resizable-panel>
      </flint-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Event Logging                                                      */
/* ------------------------------------------------------------------ */

export const EventLogging: Story = {
  name: 'Event Logging',
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <flint-resizable-group
        orientation="horizontal"
        @flint-resizable-change=${(e: CustomEvent) => {
          const output = document.getElementById('resize-log');
          if (output) {
            const sizes = (e.detail.layout as number[]).map((n: number) => `${n.toFixed(1)}%`).join(' | ');
            output.textContent = sizes;
          }
        }}
      >
        <flint-resizable-panel .defaultSize=${50}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">One</flint-typography>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${50}>
          <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <flint-typography variant="subtitle2">Two</flint-typography>
          </flint-box>
        </flint-resizable-panel>
      </flint-resizable-group>
    </div>
    <flint-box
      mt="12px" px="12px" py="8px"
      bgcolor="var(--flint-muted-background,#f4f4f5)"
      border="1px solid var(--flint-border-color,#e4e4e7)"
      borderRadius="6px"
    >
      <flint-typography variant="body2" color="textSecondary" style="font-family:monospace;">
        Layout: <span id="resize-log" style="color:var(--flint-text-color,#111827);">50.0% | 50.0%</span>
      </flint-typography>
    </flint-box>
  `,
};

/* ------------------------------------------------------------------ */
/*  IDE Layout                                                         */
/* ------------------------------------------------------------------ */

export const IDELayout: Story = {
  name: 'IDE Layout',
  render: () => html`
    <flint-stack
      data-ide
      direction="column"
      style="height:520px;max-width:960px;border:1px solid var(--flint-border-color,#e4e4e7);
             border-radius:8px;overflow:hidden;font-family:var(--flint-font-family,system-ui);
             font-size:13px;"
    >
      <!-- ── Top toolbar ── -->
      <flint-box
        bgcolor="var(--flint-muted-background,#f4f4f5)"
        display="flex"
        alignItems="center"
        px="12px"
        py="4px"
        style="border-bottom:1px solid var(--flint-border-color,#e4e4e7);flex-shrink:0;"
      >
        <flint-typography variant="overline" color="textSecondary" align="center" style="flex:1;letter-spacing:.05em;">
          MY IDE
        </flint-typography>
      </flint-box>

      <!-- ── Main area ── -->
      <div style="flex:1;overflow:hidden;min-height:0;">
        <!-- ── Outer: sidebar | main ── -->
        <flint-resizable-group data-outer orientation="horizontal">

          <!-- ── File tree (collapsible) ── -->
          <flint-resizable-panel data-sidebar .defaultSize=${20} .minSize=${10} .collapsible=${true}>
            <flint-stack direction="column" bgcolor="var(--flint-muted-background,#f4f4f5)" style="height:100%;overflow:hidden;">
              <div style="padding:8px 12px;border-bottom:1px solid var(--flint-border-color,#e4e4e7);flex-shrink:0;">
                <flint-typography variant="overline" color="textSecondary" style="letter-spacing:.05em;">
                  Explorer
                </flint-typography>
              </div>
              ${[
                { label: 'src/', indent: 0, folder: true },
                { label: 'flint-button.ts', indent: 1 },
                { label: 'flint-input.ts',  indent: 1 },
                { label: 'flint-dialog.ts', indent: 1 },
                { label: 'tests/', indent: 0, folder: true },
                { label: 'flint-button.test.ts', indent: 1 },
                { label: 'package.json', indent: 0 },
                { label: 'tsconfig.json', indent: 0 },
              ].map(f => html`
                <div style="padding:4px 12px 4px ${f.indent * 12 + 12}px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                  <flint-typography variant="body2" color=${f.folder ? 'textSecondary' : 'textPrimary'}>
                    ${f.folder ? '📁 ' : ''}${f.label}
                  </flint-typography>
                </div>
              `)}
            </flint-stack>
          </flint-resizable-panel>
          <flint-resizable-handle with-handle></flint-resizable-handle>

          <!-- ── Main column: editor + terminal ── -->
          <flint-resizable-panel .defaultSize=${80}>
            <flint-resizable-group data-inner orientation="vertical">

              <!-- ── Editor (maxSize 80 prevents terminal handle from going too low) ── -->
              <flint-resizable-panel .defaultSize=${65} .minSize=${20} .maxSize=${80}>
                <flint-stack direction="column" bgcolor="var(--flint-background, #fff)" style="height:100%;overflow:hidden;">
                  <flint-tabs value="button" style="flex:1;overflow:hidden;min-height:0;display:flex;flex-direction:column;">
                    <flint-tab-list style="border-bottom:1px solid var(--flint-border-color,#e4e4e7);">
                      <flint-tab value="button">flint-button.ts</flint-tab>
                      <flint-tab value="input">flint-input.ts</flint-tab>
                    </flint-tab-list>

                    <flint-tab-panel value="button" style="flex:1;overflow:auto;min-height:0;">
                      <pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;
                                  line-height:1.7;color:var(--flint-text-color,#111827);
                                  background:var(--flint-background,#fff);"><code
><span style="color:#7c3aed">import</span> <span style="color:#059669">{ LitElement, html, css }</span> <span style="color:#7c3aed">from</span> <span style="color:#92400e">'lit'</span>;
<span style="color:#7c3aed">import</span> <span style="color:#059669">{ customElement, property }</span> <span style="color:#7c3aed">from</span> <span style="color:#92400e">'lit/decorators.js'</span>;

<span style="color:#7c3aed">@customElement</span>(<span style="color:#92400e">'flint-button'</span>)
<span style="color:#7c3aed">export class</span> <span style="color:#0369a1">FlintButton</span> <span style="color:#7c3aed">extends</span> LitElement {
  <span style="color:#7c3aed">@property</span>({ reflect: <span style="color:#15803d">true</span> }) variant = <span style="color:#92400e">'default'</span>;
  <span style="color:#7c3aed">@property</span>({ type: <span style="color:#15803d">Boolean</span>, reflect: <span style="color:#15803d">true</span> }) disabled = <span style="color:#15803d">false</span>;

  <span style="color:#7c3aed">override</span> render() {
    <span style="color:#7c3aed">return</span> html<span style="color:#92400e">\`
      &lt;button class="btn" ?disabled=\${this.disabled}&gt;
        &lt;slot&gt;&lt;/slot&gt;
      &lt;/button&gt;\`</span>;
  }
}</code></pre>
                    </flint-tab-panel>

                    <flint-tab-panel value="input" style="flex:1;overflow:auto;min-height:0;">
                      <pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;
                                  line-height:1.7;color:var(--flint-text-color,#111827);
                                  background:var(--flint-background,#fff);"><code
><span style="color:#7c3aed">import</span> <span style="color:#059669">{ LitElement, html }</span> <span style="color:#7c3aed">from</span> <span style="color:#92400e">'lit'</span>;
<span style="color:#7c3aed">import</span> <span style="color:#059669">{ customElement, property }</span> <span style="color:#7c3aed">from</span> <span style="color:#92400e">'lit/decorators.js'</span>;

<span style="color:#7c3aed">@customElement</span>(<span style="color:#92400e">'flint-input'</span>)
<span style="color:#7c3aed">export class</span> <span style="color:#0369a1">FlintInput</span> <span style="color:#7c3aed">extends</span> LitElement {
  <span style="color:#7c3aed">@property</span>() value = <span style="color:#92400e">''</span>;
  <span style="color:#7c3aed">@property</span>() placeholder = <span style="color:#92400e">''</span>;
  <span style="color:#7c3aed">@property</span>({ type: <span style="color:#15803d">Boolean</span>, reflect: <span style="color:#15803d">true</span> }) disabled = <span style="color:#15803d">false</span>;
}</code></pre>
                    </flint-tab-panel>
                  </flint-tabs>
                </flint-stack>
              </flint-resizable-panel>
              <flint-resizable-handle with-handle></flint-resizable-handle>

              <!-- ── Terminal (collapsible: drag past minSize to fully collapse) ── -->
              <flint-resizable-panel data-terminal .defaultSize=${35} .minSize=${20} .collapsible=${true}>
                <flint-stack direction="column" style="height:100%;overflow:hidden;">
                  <flint-stack direction="row" alignItems="center" gap="16px"
                    style="padding:5px 12px;border-top:1px solid var(--flint-border-color,#e4e4e7);
                           border-bottom:1px solid var(--flint-border-color,#e4e4e7);
                           background:var(--flint-muted-background,#f4f4f5);flex-shrink:0;">
                    <flint-typography variant="overline" color="textSecondary" style="letter-spacing:.05em;">Terminal</flint-typography>
                    <flint-typography variant="caption" color="textSecondary">Problems</flint-typography>
                    <flint-typography variant="caption" color="textSecondary">Output</flint-typography>
                  </flint-stack>
                  <div style="flex:1;padding:10px 14px;font-family:monospace;font-size:12px;
                              color:var(--flint-text-color,#111827);
                              background:var(--flint-background,#fff);
                              overflow:auto;line-height:1.6;">
                    <div><span style="color:var(--flint-success-color,#15803d);">✔</span> Build complete in 312ms</div>
                    <div><span style="color:var(--flint-text-color-muted,#4b5563);">$</span> npm test</div>
                    <div><span style="color:var(--flint-success-color,#15803d);">✔</span> 59 tests passed</div>
                    <div style="margin-top:4px;color:var(--flint-text-color-muted,#4b5563);">$ ▌</div>
                  </div>
                </flint-stack>
              </flint-resizable-panel>

            </flint-resizable-group>
          </flint-resizable-panel>

        </flint-resizable-group>
      </div>
    </flint-stack>
    <flint-typography variant="caption" color="textSecondary" style="display:block;margin-top:8px;">
      Drag the Explorer handle left past its snap point to collapse it.
      Drag back toward center to expand.
    </flint-typography>
  `,
};

/* ------------------------------------------------------------------ */
/*  Custom Theme                                                       */
/* ------------------------------------------------------------------ */

export const CustomTheme: Story = {
  name: 'Custom Theme',
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid #e4e4e7;border-radius:8px;overflow:hidden;
      --flint-resizable-handle-size: 6px;
      --flint-resizable-handle-active-size: 18px;
      --flint-resizable-handle-bg: #e2e8f0;
      --flint-resizable-handle-hover-bg: #6366f1;
      --flint-resizable-grip-bg: #f1f5f9;
      --flint-resizable-grip-dot-color: #475569;
      --flint-resizable-handle-transition: 250ms;
    ">
      <flint-resizable-group orientation="horizontal">
        <flint-resizable-panel .defaultSize=${33}>
          <flint-box display="flex" alignItems="center" justifyContent="center" p="24px" height="100%" bgcolor="var(--flint-muted-background, #f8fafc)">
            <flint-typography variant="subtitle2">Panel A</flint-typography>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${34}>
          <flint-box display="flex" alignItems="center" justifyContent="center" p="24px" height="100%" bgcolor="#f0f9ff">
            <flint-typography variant="subtitle2">Panel B</flint-typography>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>
        <flint-resizable-panel .defaultSize=${33}>
          <flint-box display="flex" alignItems="center" justifyContent="center" p="24px" height="100%" bgcolor="#fdf4ff">
            <flint-typography variant="subtitle2">Panel C</flint-typography>
          </flint-box>
        </flint-resizable-panel>
      </flint-resizable-group>
    </div>
    <flint-typography variant="caption" color="textSecondary" style="display:block;margin-top:8px;">
      All handle appearance is controlled via CSS custom properties:
      <code>--flint-resizable-handle-size</code>, <code>--flint-resizable-handle-hover-bg</code>, etc.
    </flint-typography>
  `,
};

/* ------------------------------------------------------------------ */
/*  Complex Event Logging (nested horizontal + vertical)              */
/* ------------------------------------------------------------------ */

function updateLog(id: string, e: CustomEvent) {
  const el = document.getElementById(id);
  if (el) {
    const sizes = (e.detail.layout as number[]).map((n: number) => `${n.toFixed(1)}%`).join(' | ');
    el.textContent = sizes;
  }
}

export const ComplexEventLogging: Story = {
  name: 'Complex Event Logging',
  render: () => html`
    <div style="height:400px;max-width:800px;border:1px solid var(--flint-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <flint-resizable-group
        orientation="horizontal"
        @flint-resizable-change=${(e: CustomEvent) => {
          if ((e.target as HTMLElement).tagName === 'FLINT-RESIZABLE-GROUP'
            && (e.target as HTMLElement).closest('flint-resizable-group') === null) {
            updateLog('log-outer', e);
          }
        }}
      >
        <!-- Left sidebar -->
        <flint-resizable-panel .defaultSize=${20} .minSize=${10} .collapsible=${true}>
          <flint-box bgcolor="var(--flint-muted-background,#f4f4f5)" display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
            <div style="text-align:center;">
              <flint-typography variant="subtitle2" gutterBottom>Sidebar</flint-typography>
              <flint-typography variant="caption" color="textSecondary">min:10% collapsible</flint-typography>
            </div>
          </flint-box>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>

        <!-- Center: vertical split -->
        <flint-resizable-panel .defaultSize=${55}>
          <flint-resizable-group
            orientation="vertical"
            @flint-resizable-change=${(e: CustomEvent) => {
              e.stopPropagation();
              updateLog('log-center', e);
            }}
          >
            <flint-resizable-panel .defaultSize=${30}>
              <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
                <div style="text-align:center;">
                  <flint-typography variant="subtitle2" gutterBottom>Header</flint-typography>
                  <flint-typography variant="caption" color="textSecondary">vertical top</flint-typography>
                </div>
              </flint-box>
            </flint-resizable-panel>
            <flint-resizable-handle with-handle></flint-resizable-handle>
            <flint-resizable-panel .defaultSize=${40}>
              <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
                <div style="text-align:center;">
                  <flint-typography variant="subtitle2" gutterBottom>Content</flint-typography>
                  <flint-typography variant="caption" color="textSecondary">vertical middle</flint-typography>
                </div>
              </flint-box>
            </flint-resizable-panel>
            <flint-resizable-handle with-handle></flint-resizable-handle>
            <flint-resizable-panel .defaultSize=${30}>
              <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
                <div style="text-align:center;">
                  <flint-typography variant="subtitle2" gutterBottom>Footer</flint-typography>
                  <flint-typography variant="caption" color="textSecondary">vertical bottom</flint-typography>
                </div>
              </flint-box>
            </flint-resizable-panel>
          </flint-resizable-group>
        </flint-resizable-panel>
        <flint-resizable-handle with-handle></flint-resizable-handle>

        <!-- Right: vertical split -->
        <flint-resizable-panel .defaultSize=${25}>
          <flint-resizable-group
            orientation="vertical"
            @flint-resizable-change=${(e: CustomEvent) => {
              e.stopPropagation();
              updateLog('log-right', e);
            }}
          >
            <flint-resizable-panel .defaultSize=${50}>
              <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
                <div style="text-align:center;">
                  <flint-typography variant="subtitle2" gutterBottom>Inspector</flint-typography>
                  <flint-typography variant="caption" color="textSecondary">top</flint-typography>
                </div>
              </flint-box>
            </flint-resizable-panel>
            <flint-resizable-handle with-handle></flint-resizable-handle>
            <flint-resizable-panel .defaultSize=${50}>
              <flint-box display="flex" alignItems="center" justifyContent="center" height="100%" p="24px">
                <div style="text-align:center;">
                  <flint-typography variant="subtitle2" gutterBottom>Console</flint-typography>
                  <flint-typography variant="caption" color="textSecondary">bottom</flint-typography>
                </div>
              </flint-box>
            </flint-resizable-panel>
          </flint-resizable-group>
        </flint-resizable-panel>
      </flint-resizable-group>
    </div>

    <flint-stack direction="row" gap="8px" style="flex-wrap:wrap;margin-top:12px;">
      <flint-box
        style="flex:1;min-width:180px;"
        px="12px" py="8px"
        bgcolor="var(--flint-muted-background,#f4f4f5)"
        border="1px solid var(--flint-border-color,#e4e4e7)"
        borderRadius="6px"
      >
        <flint-typography variant="body2" style="font-weight:600;margin-bottom:4px;font-family:monospace;">Outer (horizontal)</flint-typography>
        <flint-typography variant="body2" color="textPrimary" style="font-family:monospace;"><span id="log-outer">20.0% | 55.0% | 25.0%</span></flint-typography>
      </flint-box>
      <flint-box
        style="flex:1;min-width:180px;"
        px="12px" py="8px"
        bgcolor="var(--flint-muted-background,#f4f4f5)"
        border="1px solid var(--flint-border-color,#e4e4e7)"
        borderRadius="6px"
      >
        <flint-typography variant="body2" style="font-weight:600;margin-bottom:4px;font-family:monospace;">Center (vertical)</flint-typography>
        <flint-typography variant="body2" color="textPrimary" style="font-family:monospace;"><span id="log-center">30.0% | 40.0% | 30.0%</span></flint-typography>
      </flint-box>
      <flint-box
        style="flex:1;min-width:180px;"
        px="12px" py="8px"
        bgcolor="var(--flint-muted-background,#f4f4f5)"
        border="1px solid var(--flint-border-color,#e4e4e7)"
        borderRadius="6px"
      >
        <flint-typography variant="body2" style="font-weight:600;margin-bottom:4px;font-family:monospace;">Right (vertical)</flint-typography>
        <flint-typography variant="body2" color="textPrimary" style="font-family:monospace;"><span id="log-right">50.0% | 50.0%</span></flint-typography>
      </flint-box>
    </flint-stack>
  `,
};
