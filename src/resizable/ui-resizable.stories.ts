import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-resizable.js';
import '../tabs/ui-tabs.js';
import type { UiResizablePanel } from './ui-resizable.js';

const meta: Meta = {
  title: 'Layout/Resizable',
  component: 'ui-resizable-group',
  parameters: {
    docs: {
      description: {
        component:
          'Accessible resizable panel groups and layouts with keyboard support. ' +
          'Panels can be resized by dragging handles or using arrow keys. ' +
          'Use `collapse()`, `expand()`, and `toggle()` on a panel for programmatic control.',
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
/*  shared panel content style                                        */
/* ------------------------------------------------------------------ */

const panelStyle = 'display:flex;align-items:center;justify-content:center;height:100%;padding:24px;font-weight:600;';

/* ------------------------------------------------------------------ */
/*  Playground                                                        */
/* ------------------------------------------------------------------ */

export const Playground: Story = {
  render: (args) => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <ui-resizable-group .orientation=${args.orientation} .dir=${args.dir}>
        <ui-resizable-panel .defaultSize=${50}>
          <div style="${panelStyle}">One</div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${50}>
          <div style="${panelStyle}">Two</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Vertical                                                          */
/* ------------------------------------------------------------------ */

export const Vertical: Story = {
  render: () => html`
    <div style="height:300px;max-width:400px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <ui-resizable-group orientation="vertical">
        <ui-resizable-panel .defaultSize=${25}>
          <div style="${panelStyle}">Header</div>
        </ui-resizable-panel>
        <ui-resizable-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${75}>
          <div style="${panelStyle}">Content</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  With Handle                                                       */
/* ------------------------------------------------------------------ */

export const WithHandle: Story = {
  name: 'With Handle',
  render: () => html`
    <div style="height:200px;max-width:500px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <ui-resizable-group orientation="horizontal">
        <ui-resizable-panel .defaultSize=${25}>
          <div style="${panelStyle}">Sidebar</div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${75}>
          <div style="${panelStyle}">Content</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Nested (Horizontal + Vertical)                                    */
/* ------------------------------------------------------------------ */

export const Nested: Story = {
  render: () => html`
    <div style="height:300px;max-width:600px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <ui-resizable-group orientation="horizontal">
        <ui-resizable-panel .defaultSize=${50}>
          <div style="${panelStyle}">One</div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${50}>
          <ui-resizable-group orientation="vertical">
            <ui-resizable-panel .defaultSize=${25}>
              <div style="${panelStyle}">Two</div>
            </ui-resizable-panel>
            <ui-resizable-handle with-handle></ui-resizable-handle>
            <ui-resizable-panel .defaultSize=${75}>
              <div style="${panelStyle}">Three</div>
            </ui-resizable-panel>
          </ui-resizable-group>
        </ui-resizable-panel>
      </ui-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Three Panels                                                      */
/* ------------------------------------------------------------------ */

export const ThreePanels: Story = {
  name: 'Three Panels',
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <ui-resizable-group orientation="horizontal">
        <ui-resizable-panel .defaultSize=${25}>
          <div style="${panelStyle}">Nav</div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${50}>
          <div style="${panelStyle}">Content</div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${25}>
          <div style="${panelStyle}">Details</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Collapsible (drag-based)                                          */
/* ------------------------------------------------------------------ */

export const Collapsible: Story = {
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <ui-resizable-group orientation="horizontal">
        <ui-resizable-panel .defaultSize=${25} .minSize=${15} .collapsible=${true}>
          <div style="${panelStyle}">Sidebar</div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${75}>
          <div style="${panelStyle}">Content</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    </div>
    <p style="font-size:12px;color:var(--ui-text-color-muted,#71717a);margin-top:8px;">
      Drag the sidebar to its minimum, then keep dragging to snap it fully closed.
    </p>
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
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
        <button
          style="padding:5px 14px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:6px;
                 cursor:pointer;font-size:13px;background:var(--ui-background,#fff);"
          @click=${(e: Event) => {
            const root = (e.target as HTMLElement).closest('[data-collapse-demo]')!;
            const panel = root.querySelector<UiResizablePanel>('[data-sidebar-panel]')!;
            panel.collapse();
          }}
        >Collapse</button>
        <button
          style="padding:5px 14px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:6px;
                 cursor:pointer;font-size:13px;background:var(--ui-background,#fff);"
          @click=${(e: Event) => {
            const root = (e.target as HTMLElement).closest('[data-collapse-demo]')!;
            const panel = root.querySelector<UiResizablePanel>('[data-sidebar-panel]')!;
            panel.expand();
          }}
        >Expand</button>
        <button
          style="padding:5px 14px;border:1px solid var(--ui-primary-color,#3b82f6);border-radius:6px;
                 cursor:pointer;font-size:13px;color:#fff;background:var(--ui-primary-color,#3b82f6);"
          @click=${(e: Event) => {
            const root = (e.target as HTMLElement).closest('[data-collapse-demo]')!;
            const panel = root.querySelector<UiResizablePanel>('[data-sidebar-panel]')!;
            const statusEl = root.querySelector<HTMLElement>('[data-status]')!;
            panel.toggle();
            if (statusEl) statusEl.textContent = panel.collapsed ? 'collapsed' : 'visible';
          }}
        >Toggle</button>
        <span style="font-size:13px;color:var(--ui-text-color-muted,#71717a);">
          Sidebar:
          <strong data-status style="color:var(--ui-text-color,#111827);">visible</strong>
        </span>
      </div>

      <div
        style="height:200px;max-width:600px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:8px;overflow:hidden;"
        @ui-resizable-collapse=${(e: CustomEvent) => {
          const root = (e.currentTarget as HTMLElement).closest('[data-collapse-demo]')!;
          const statusEl = root?.querySelector<HTMLElement>('[data-status]');
          if (statusEl) statusEl.textContent = 'collapsed';
          e.stopPropagation();
        }}
        @ui-resizable-expand=${(e: CustomEvent) => {
          const root = (e.currentTarget as HTMLElement).closest('[data-collapse-demo]')!;
          const statusEl = root?.querySelector<HTMLElement>('[data-status]');
          if (statusEl) statusEl.textContent = 'visible';
          e.stopPropagation();
        }}
      >
        <ui-resizable-group orientation="horizontal">
          <ui-resizable-panel data-sidebar-panel .defaultSize=${30} .minSize=${10}>
            <div style="${panelStyle}background:var(--ui-muted,#f4f4f5);">Sidebar</div>
          </ui-resizable-panel>
          <ui-resizable-handle with-handle></ui-resizable-handle>
          <ui-resizable-panel .defaultSize=${70}>
            <div style="${panelStyle}">Content</div>
          </ui-resizable-panel>
        </ui-resizable-group>
      </div>

      <p style="font-size:12px;color:var(--ui-text-color-muted,#71717a);margin-top:8px;">
        Buttons live <em>outside</em> the resizable group — they stay visible even when the sidebar
        is fully collapsed. The panel fires <code>ui-resizable-collapse</code> /
        <code>ui-resizable-expand</code> events.
      </p>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Min/Max Constraints                                               */
/* ------------------------------------------------------------------ */

export const Constraints: Story = {
  name: 'Min/Max Constraints',
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <ui-resizable-group orientation="horizontal">
        <ui-resizable-panel .defaultSize=${30} .minSize=${20} .maxSize=${60}>
          <div style="${panelStyle}">
            <div style="text-align:center">
              <div>Panel A</div>
              <div style="font-size:12px;font-weight:400;color:var(--ui-text-color-muted,#71717a);">min:20% max:60%</div>
            </div>
          </div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${70} .minSize=${30}>
          <div style="${panelStyle}">
            <div style="text-align:center">
              <div>Panel B</div>
              <div style="font-size:12px;font-weight:400;color:var(--ui-text-color-muted,#71717a);">min:30%</div>
            </div>
          </div>
        </ui-resizable-panel>
      </ui-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  RTL                                                                */
/* ------------------------------------------------------------------ */

export const RTL: Story = {
  name: 'RTL Layout',
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <ui-resizable-group orientation="horizontal" dir="rtl">
        <ui-resizable-panel .defaultSize=${30}>
          <div style="${panelStyle}">Right (30%)</div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${70}>
          <div style="${panelStyle}">Left (70%)</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Disabled Handle                                                    */
/* ------------------------------------------------------------------ */

export const DisabledHandle: Story = {
  name: 'Disabled Handle',
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <ui-resizable-group orientation="horizontal">
        <ui-resizable-panel .defaultSize=${30}>
          <div style="${panelStyle}">Fixed</div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle disabled></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${40}>
          <div style="${panelStyle}">Resizable</div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${30}>
          <div style="${panelStyle}">Resizable</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  Event Logging                                                      */
/* ------------------------------------------------------------------ */

export const EventLogging: Story = {
  name: 'Event Logging',
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <ui-resizable-group
        orientation="horizontal"
        @ui-resizable-change=${(e: CustomEvent) => {
          const output = document.getElementById('resize-log');
          if (output) {
            const sizes = (e.detail.layout as number[]).map((n: number) => `${n.toFixed(1)}%`).join(' | ');
            output.textContent = sizes;
          }
        }}
      >
        <ui-resizable-panel .defaultSize=${50}>
          <div style="${panelStyle}">One</div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${50}>
          <div style="${panelStyle}">Two</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    </div>
    <div style="margin-top:12px;padding:8px 12px;font-family:monospace;font-size:13px;background:var(--ui-muted,#f4f4f5);color:var(--ui-text-color,#111827);border:1px solid var(--ui-border-color,#e4e4e7);border-radius:6px;">
      Layout: <span id="resize-log">50.0% | 50.0%</span>
    </div>
  `,
};

/* ------------------------------------------------------------------ */
/*  IDE Layout                                                         */
/* ------------------------------------------------------------------ */

export const IDELayout: Story = {
  name: 'IDE Layout',
  render: () => html`
    <div
      data-ide
      style="height:520px;max-width:960px;border:1px solid var(--ui-border-color,#e4e4e7);
             border-radius:8px;overflow:hidden;font-family:var(--ui-font-family,system-ui);
             font-size:13px;display:flex;flex-direction:column;"
    >
      <!-- ── Top toolbar (always visible — toggle buttons live here) ── -->
      <div style="display:flex;align-items:center;gap:4px;padding:4px 8px;
                  border-bottom:1px solid var(--ui-border-color,#e4e4e7);
                  background:var(--ui-muted,#f4f4f5);flex-shrink:0;">
        <!-- Sidebar toggle — OUTSIDE the sidebar panel so it works when collapsed -->
        <button
          data-sidebar-toggle
          title="Toggle Explorer sidebar"
          style="border:1px solid var(--ui-border-color,#e4e4e7);background:var(--ui-background,#fff);
                 cursor:pointer;padding:3px 10px;font-size:12px;border-radius:4px;
                 color:var(--ui-text-color,#111827);display:flex;align-items:center;gap:5px;"
          @click=${(e: Event) => {
            const root = (e.target as HTMLElement).closest('[data-ide]')!;
            const panel = root.querySelector<UiResizablePanel>('[data-sidebar]')!;
            const btn = root.querySelector<HTMLElement>('[data-sidebar-toggle]')!;
            panel.toggle();
            btn.setAttribute('title', panel.collapsed ? 'Show Explorer' : 'Hide Explorer');
            btn.querySelector('[data-label]')!.textContent = panel.collapsed ? '› Explorer' : '‹ Explorer';
          }}
        ><span data-label>‹ Explorer</span></button>

        <span style="flex:1;text-align:center;font-size:12px;font-weight:600;
                     color:var(--ui-text-color-muted,#71717a);letter-spacing:.05em;">
          MY IDE
        </span>

        <!-- Terminal toggle — OUTSIDE the terminal panel so it works when collapsed -->
        <button
          data-terminal-toggle
          title="Toggle Terminal"
          style="border:1px solid var(--ui-border-color,#e4e4e7);background:var(--ui-background,#fff);
                 cursor:pointer;padding:3px 10px;font-size:12px;border-radius:4px;
                 color:var(--ui-text-color,#111827);display:flex;align-items:center;gap:5px;"
          @click=${(e: Event) => {
            const root = (e.target as HTMLElement).closest('[data-ide]')!;
            const panel = root.querySelector<UiResizablePanel>('[data-terminal]')!;
            const btn = root.querySelector<HTMLElement>('[data-terminal-toggle]')!;
            panel.toggle();
            btn.setAttribute('title', panel.collapsed ? 'Show Terminal' : 'Hide Terminal');
            btn.querySelector('[data-label]')!.textContent = panel.collapsed ? '▲ Terminal' : '▼ Terminal';
          }}
        ><span data-label>▼ Terminal</span></button>
      </div>

      <!-- ── Main area ── -->
      <div style="flex:1;overflow:hidden;min-height:0;">
        <!-- ── Outer: sidebar | main ── -->
        <ui-resizable-group data-outer orientation="horizontal">

          <!-- ── File tree (collapsible) ── -->
          <ui-resizable-panel data-sidebar .defaultSize=${20} .minSize=${10} .collapsible=${true}>
            <div style="height:100%;background:var(--ui-muted,#f4f4f5);display:flex;flex-direction:column;overflow:hidden;">
              <div style="padding:8px 12px;border-bottom:1px solid var(--ui-border-color,#e4e4e7);
                          font-weight:600;font-size:11px;text-transform:uppercase;
                          letter-spacing:.05em;color:var(--ui-text-color-muted,#71717a);flex-shrink:0;">
                Explorer
              </div>
              ${[
                { label: 'src/', indent: 0, folder: true },
                { label: 'ui-button.ts', indent: 1 },
                { label: 'ui-input.ts',  indent: 1 },
                { label: 'ui-dialog.ts', indent: 1 },
                { label: 'tests/', indent: 0, folder: true },
                { label: 'ui-button.test.ts', indent: 1 },
                { label: 'package.json', indent: 0 },
                { label: 'tsconfig.json', indent: 0 },
              ].map(f => html`
                <div style="padding:4px 12px 4px ${f.indent * 12 + 12}px;
                            color:${f.folder ? 'var(--ui-text-color-muted,#71717a)' : 'var(--ui-text-color,#111827)'};
                            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12px;">
                  ${f.folder ? '📁 ' : ''}${f.label}
                </div>
              `)}
            </div>
          </ui-resizable-panel>
          <ui-resizable-handle with-handle></ui-resizable-handle>

          <!-- ── Main column: editor + terminal ── -->
          <ui-resizable-panel .defaultSize=${80}>
            <ui-resizable-group data-inner orientation="vertical">

              <!-- ── Editor ── -->
              <ui-resizable-panel .defaultSize=${70} .minSize=${20}>
                <div style="height:100%;display:flex;flex-direction:column;overflow:hidden;
                            background:var(--ui-background,#fff);">
                  <ui-tabs value="button" style="flex:1;overflow:hidden;min-height:0;display:flex;flex-direction:column;">
                    <ui-tab-list style="border-bottom:1px solid var(--ui-border-color,#e4e4e7);">
                      <ui-tab value="button">ui-button.ts</ui-tab>
                      <ui-tab value="input">ui-input.ts</ui-tab>
                    </ui-tab-list>

                    <ui-tab-panel value="button" style="flex:1;overflow:auto;min-height:0;">
                      <pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;
                                  line-height:1.7;color:var(--ui-text-color,#111827);
                                  background:var(--ui-background,#fff);"><code
><span style="color:#7c3aed">import</span> <span style="color:#059669">{ LitElement, html, css }</span> <span style="color:#7c3aed">from</span> <span style="color:#d97706">'lit'</span>;
<span style="color:#7c3aed">import</span> <span style="color:#059669">{ customElement, property }</span> <span style="color:#7c3aed">from</span> <span style="color:#d97706">'lit/decorators.js'</span>;

<span style="color:#7c3aed">@customElement</span>(<span style="color:#d97706">'ui-button'</span>)
<span style="color:#7c3aed">export class</span> <span style="color:#0369a1">UiButton</span> <span style="color:#7c3aed">extends</span> LitElement {
  <span style="color:#7c3aed">@property</span>({ reflect: <span style="color:#16a34a">true</span> }) variant = <span style="color:#d97706">'default'</span>;
  <span style="color:#7c3aed">@property</span>({ type: <span style="color:#16a34a">Boolean</span>, reflect: <span style="color:#16a34a">true</span> }) disabled = <span style="color:#16a34a">false</span>;

  <span style="color:#7c3aed">override</span> render() {
    <span style="color:#7c3aed">return</span> html<span style="color:#d97706">\`
      &lt;button class="btn" ?disabled=\${this.disabled}&gt;
        &lt;slot&gt;&lt;/slot&gt;
      &lt;/button&gt;\`</span>;
  }
}</code></pre>
                    </ui-tab-panel>

                    <ui-tab-panel value="input" style="flex:1;overflow:auto;min-height:0;">
                      <pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;
                                  line-height:1.7;color:var(--ui-text-color,#111827);
                                  background:var(--ui-background,#fff);"><code
><span style="color:#7c3aed">import</span> <span style="color:#059669">{ LitElement, html }</span> <span style="color:#7c3aed">from</span> <span style="color:#d97706">'lit'</span>;
<span style="color:#7c3aed">import</span> <span style="color:#059669">{ customElement, property }</span> <span style="color:#7c3aed">from</span> <span style="color:#d97706">'lit/decorators.js'</span>;

<span style="color:#7c3aed">@customElement</span>(<span style="color:#d97706">'ui-input'</span>)
<span style="color:#7c3aed">export class</span> <span style="color:#0369a1">UiInput</span> <span style="color:#7c3aed">extends</span> LitElement {
  <span style="color:#7c3aed">@property</span>() value = <span style="color:#d97706">''</span>;
  <span style="color:#7c3aed">@property</span>() placeholder = <span style="color:#d97706">''</span>;
  <span style="color:#7c3aed">@property</span>({ type: <span style="color:#16a34a">Boolean</span>, reflect: <span style="color:#16a34a">true</span> }) disabled = <span style="color:#16a34a">false</span>;
}</code></pre>
                    </ui-tab-panel>
                  </ui-tabs>
                </div>
              </ui-resizable-panel>
              <ui-resizable-handle with-handle></ui-resizable-handle>

              <!-- ── Terminal (collapsible) ── -->
              <ui-resizable-panel data-terminal .defaultSize=${30} .minSize=${8} .collapsible=${true}>
                <div style="height:100%;background:#0c0c0c;display:flex;flex-direction:column;overflow:hidden;">
                  <div style="display:flex;align-items:center;gap:16px;
                              padding:5px 12px;border-bottom:1px solid #27272a;flex-shrink:0;">
                    <span style="font-size:11px;font-weight:600;color:#fff;text-transform:uppercase;
                                 letter-spacing:.05em;">Terminal</span>
                    <span style="font-size:11px;color:#a1a1aa;">Problems</span>
                    <span style="font-size:11px;color:#a1a1aa;">Output</span>
                  </div>
                  <div style="flex:1;padding:10px 14px;font-family:monospace;font-size:12px;
                              color:#d4d4d4;overflow:auto;line-height:1.6;">
                    <div><span style="color:#4ade80">✔</span> Build complete in 312ms</div>
                    <div><span style="color:#a1a1aa">$</span> npm test</div>
                    <div><span style="color:#4ade80">✔</span> 59 tests passed</div>
                    <div style="margin-top:4px;color:#a1a1aa">$ ▌</div>
                  </div>
                </div>
              </ui-resizable-panel>

            </ui-resizable-group>
          </ui-resizable-panel>

        </ui-resizable-group>
      </div>
    </div>
    <p style="font-size:12px;color:var(--ui-text-color-muted,#71717a);margin-top:8px;">
      Toggle buttons live in the <strong>toolbar</strong> (outside all resizable panels) so they
      remain clickable even when a panel is fully collapsed. Drag handles to resize.
    </p>
  `,
};

/* ------------------------------------------------------------------ */
/*  Custom Theme                                                       */
/* ------------------------------------------------------------------ */

export const CustomTheme: Story = {
  name: 'Custom Theme',
  render: () => html`
    <div style="height:200px;max-width:600px;border:1px solid #e4e4e7;border-radius:8px;overflow:hidden;
      --ui-resizable-handle-size: 6px;
      --ui-resizable-handle-active-size: 18px;
      --ui-resizable-handle-bg: #e2e8f0;
      --ui-resizable-handle-hover-bg: #6366f1;
      --ui-resizable-grip-bg: #f1f5f9;
      --ui-resizable-grip-dot-color: #94a3b8;
      --ui-resizable-handle-transition: 250ms;
    ">
      <ui-resizable-group orientation="horizontal">
        <ui-resizable-panel .defaultSize=${33}>
          <div style="${panelStyle}background:#f8fafc;">Panel A</div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${34}>
          <div style="${panelStyle}background:#f0f9ff;">Panel B</div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>
        <ui-resizable-panel .defaultSize=${33}>
          <div style="${panelStyle}background:#fdf4ff;">Panel C</div>
        </ui-resizable-panel>
      </ui-resizable-group>
    </div>
    <p style="font-size:12px;color:var(--ui-text-color-muted,#71717a);margin-top:8px;">
      All handle appearance is controlled via CSS custom properties:
      <code>--ui-resizable-handle-size</code>, <code>--ui-resizable-handle-hover-bg</code>, etc.
    </p>
  `,
};

/* ------------------------------------------------------------------ */
/*  Complex Event Logging (nested horizontal + vertical)              */
/* ------------------------------------------------------------------ */

const logStyle = 'padding:8px 12px;font-family:monospace;font-size:12px;background:var(--ui-muted,#f4f4f5);color:var(--ui-text-color,#111827);border:1px solid var(--ui-border-color,#e4e4e7);border-radius:6px;';

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
    <div style="height:400px;max-width:800px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:8px;overflow:hidden;">
      <ui-resizable-group
        orientation="horizontal"
        @ui-resizable-change=${(e: CustomEvent) => {
          if ((e.target as HTMLElement).tagName === 'UI-RESIZABLE-GROUP'
            && (e.target as HTMLElement).closest('ui-resizable-group') === null) {
            updateLog('log-outer', e);
          }
        }}
      >
        <!-- Left sidebar -->
        <ui-resizable-panel .defaultSize=${20} .minSize=${10} .collapsible=${true}>
          <div style="${panelStyle}background:var(--ui-muted,#f4f4f5);">
            <div style="text-align:center">
              <div>Sidebar</div>
              <div style="font-size:11px;font-weight:400;color:var(--ui-text-color-muted,#71717a);">min:10% collapsible</div>
            </div>
          </div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>

        <!-- Center: vertical split -->
        <ui-resizable-panel .defaultSize=${55}>
          <ui-resizable-group
            orientation="vertical"
            @ui-resizable-change=${(e: CustomEvent) => {
              e.stopPropagation();
              updateLog('log-center', e);
            }}
          >
            <ui-resizable-panel .defaultSize=${30}>
              <div style="${panelStyle}">
                <div style="text-align:center">
                  <div>Header</div>
                  <div style="font-size:11px;font-weight:400;color:var(--ui-text-color-muted,#71717a);">vertical top</div>
                </div>
              </div>
            </ui-resizable-panel>
            <ui-resizable-handle with-handle></ui-resizable-handle>
            <ui-resizable-panel .defaultSize=${40}>
              <div style="${panelStyle}">
                <div style="text-align:center">
                  <div>Content</div>
                  <div style="font-size:11px;font-weight:400;color:var(--ui-text-color-muted,#71717a);">vertical middle</div>
                </div>
              </div>
            </ui-resizable-panel>
            <ui-resizable-handle with-handle></ui-resizable-handle>
            <ui-resizable-panel .defaultSize=${30}>
              <div style="${panelStyle}">
                <div style="text-align:center">
                  <div>Footer</div>
                  <div style="font-size:11px;font-weight:400;color:var(--ui-text-color-muted,#71717a);">vertical bottom</div>
                </div>
              </div>
            </ui-resizable-panel>
          </ui-resizable-group>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>

        <!-- Right: vertical split -->
        <ui-resizable-panel .defaultSize=${25}>
          <ui-resizable-group
            orientation="vertical"
            @ui-resizable-change=${(e: CustomEvent) => {
              e.stopPropagation();
              updateLog('log-right', e);
            }}
          >
            <ui-resizable-panel .defaultSize=${50}>
              <div style="${panelStyle}">
                <div style="text-align:center">
                  <div>Inspector</div>
                  <div style="font-size:11px;font-weight:400;color:var(--ui-text-color-muted,#71717a);">top</div>
                </div>
              </div>
            </ui-resizable-panel>
            <ui-resizable-handle with-handle></ui-resizable-handle>
            <ui-resizable-panel .defaultSize=${50}>
              <div style="${panelStyle}">
                <div style="text-align:center">
                  <div>Console</div>
                  <div style="font-size:11px;font-weight:400;color:var(--ui-text-color-muted,#71717a);">bottom</div>
                </div>
              </div>
            </ui-resizable-panel>
          </ui-resizable-group>
        </ui-resizable-panel>
      </ui-resizable-group>
    </div>

    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
      <div style="flex:1;min-width:180px;${logStyle}">
        <div style="font-weight:600;margin-bottom:4px;">Outer (horizontal)</div>
        <span id="log-outer">20.0% | 55.0% | 25.0%</span>
      </div>
      <div style="flex:1;min-width:180px;${logStyle}">
        <div style="font-weight:600;margin-bottom:4px;">Center (vertical)</div>
        <span id="log-center">30.0% | 40.0% | 30.0%</span>
      </div>
      <div style="flex:1;min-width:180px;${logStyle}">
        <div style="font-weight:600;margin-bottom:4px;">Right (vertical)</div>
        <span id="log-right">50.0% | 50.0%</span>
      </div>
    </div>
  `,
};
