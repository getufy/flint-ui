import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-resizable.js';

const meta: Meta = {
  title: 'Layout/Resizable',
  component: 'ui-resizable-group',
  parameters: {
    docs: {
      description: {
        component:
          'Accessible resizable panel groups and layouts with keyboard support. ' +
          'Panels can be resized by dragging handles or using arrow keys.',
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
/*  Collapsible Panel                                                 */
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

/* ------------------------------------------------------------------ */
/*  IDE Layout                                                        */
/* ------------------------------------------------------------------ */

export const IDELayout: Story = {
  name: 'IDE Layout',
  render: () => html`
    <div style="height:480px;max-width:900px;border:1px solid var(--ui-border-color,#e4e4e7);border-radius:8px;overflow:hidden;font-family:var(--ui-font-family,system-ui);font-size:13px;">
      <!-- Outer: sidebar | main area -->
      <ui-resizable-group orientation="horizontal">

        <!-- File tree -->
        <ui-resizable-panel .defaultSize=${20} .minSize=${12} .collapsible=${true}>
          <div style="height:100%;background:var(--ui-muted,#f4f4f5);display:flex;flex-direction:column;overflow:hidden;">
            <div style="padding:10px 12px;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--ui-text-color-muted,#71717a);border-bottom:1px solid var(--ui-border-color,#e4e4e7);">Explorer</div>
            ${['src/', '  ui-button.ts', '  ui-input.ts', '  ui-dialog.ts', 'tests/', '  ui-button.test.ts', 'package.json', 'tsconfig.json'].map(f => html`
              <div style="padding:4px 12px;color:var(--ui-text-color,#111827);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${f}</div>
            `)}
          </div>
        </ui-resizable-panel>
        <ui-resizable-handle with-handle></ui-resizable-handle>

        <!-- Editor + terminal -->
        <ui-resizable-panel .defaultSize=${80}>
          <ui-resizable-group orientation="vertical">

            <!-- Editor tabs + content -->
            <ui-resizable-panel .defaultSize=${70} .minSize=${20}>
              <div style="height:100%;display:flex;flex-direction:column;overflow:hidden;">
                <div style="display:flex;gap:1px;background:var(--ui-border-color,#e4e4e7);border-bottom:1px solid var(--ui-border-color,#e4e4e7);">
                  ${['ui-button.ts', 'ui-input.ts'].map((tab, i) => html`
                    <div style="padding:6px 16px;font-size:12px;background:${i === 0 ? 'var(--ui-background,#fff)' : 'var(--ui-muted,#f4f4f5)'};color:${i === 0 ? 'var(--ui-text-color,#111827)' : 'var(--ui-text-color-muted,#71717a)'};cursor:pointer;">${tab}</div>
                  `)}
                </div>
                <div style="flex:1;padding:16px;overflow:auto;background:var(--ui-background,#fff);font-family:monospace;font-size:13px;line-height:1.6;color:var(--ui-text-color,#111827);">
                  <div style="color:#7c3aed;">import</div>
                  <div>&nbsp;&nbsp;<span style="color:#059669;">{ LitElement, html, css }</span></div>
                  <div style="color:#7c3aed;">from <span style="color:#d97706;">'lit'</span>;</div>
                  <br>
                  <div><span style="color:#7c3aed;">@customElement</span>(<span style="color:#d97706;">'ui-button'</span>)</div>
                  <div><span style="color:#7c3aed;">export class</span> UiButton</div>
                  <div>&nbsp;&nbsp;<span style="color:#7c3aed;">extends</span> LitElement {</div>
                  <div>&nbsp;&nbsp;<span style="color:#7c3aed;">override</span> render() {</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#7c3aed;">return</span> html&#96;&lt;button&gt;</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;slot&gt;&lt;/slot&gt;</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/button&gt;&#96;;</div>
                  <div>&nbsp;&nbsp;}</div>
                  <div>}</div>
                </div>
              </div>
            </ui-resizable-panel>
            <ui-resizable-handle with-handle></ui-resizable-handle>

            <!-- Terminal -->
            <ui-resizable-panel .defaultSize=${30} .minSize=${10}>
              <div style="height:100%;background:#0c0c0c;display:flex;flex-direction:column;overflow:hidden;">
                <div style="padding:6px 12px;font-size:11px;color:#a1a1aa;border-bottom:1px solid #27272a;display:flex;gap:16px;">
                  <span style="color:#fff;">TERMINAL</span>
                  <span>PROBLEMS</span>
                  <span>OUTPUT</span>
                </div>
                <div style="flex:1;padding:10px 14px;font-family:monospace;font-size:12px;color:#d4d4d4;overflow:auto;line-height:1.6;">
                  <div><span style="color:#4ade80;">✔</span> Build succeeded in 312ms</div>
                  <div><span style="color:#a1a1aa;">$</span> npm test</div>
                  <div><span style="color:#4ade80;">✔</span> 42 tests passed</div>
                  <div style="color:#a1a1aa;">$ <span style="animation:blink 1s step-end infinite;">▌</span></div>
                </div>
              </div>
            </ui-resizable-panel>

          </ui-resizable-group>
        </ui-resizable-panel>

      </ui-resizable-group>
    </div>
    <p style="font-size:12px;color:var(--ui-text-color-muted,#71717a);margin-top:8px;">
      Drag any handle — the file tree can collapse, and the terminal can be resized vertically.
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
/*  ComplexEventLogging (nested horizontal + vertical)                */
/* ------------------------------------------------------------------ */

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
