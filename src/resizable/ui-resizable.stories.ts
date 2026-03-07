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
