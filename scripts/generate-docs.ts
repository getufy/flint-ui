/**
 * Generates markdown documentation for each component by parsing source files.
 * Usage: npx tsx scripts/generate-docs.ts
 */
import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.resolve('packages/core/src');
const DOCS_DIR = path.resolve('docs/components');

// Directories to skip (not components)
const SKIP = new Set(['docs', 'vite-env.d.ts', 'index.ts', 'theme.css', 'theme-dark.css']);

interface PropInfo {
  name: string;
  type: string;
  default: string;
  reflect: boolean;
  attribute: string;
  description: string;
}

interface EventInfo {
  name: string;
  detail: string;
  description: string;
}

interface SlotInfo {
  name: string;
  description: string;
}

interface CssVarInfo {
  name: string;
  default: string;
}

interface MethodInfo {
  name: string;
  signature: string;
  description: string;
}

interface ComponentInfo {
  tagName: string;
  className: string;
  description: string;
  props: PropInfo[];
  events: EventInfo[];
  slots: SlotInfo[];
  cssVars: CssVarInfo[];
  methods: MethodInfo[];
  formAssociated: boolean;
}

function extractComponents(tsContent: string, cssContent: string): ComponentInfo[] {
  const components: ComponentInfo[] = [];

  // Find all @customElement declarations
  const classRegex = /@customElement\(['"]([^'"]+)['"]\)\s*export\s+class\s+(\w+)\s+extends\s+\w+/g;
  let match;

  while ((match = classRegex.exec(tsContent)) !== null) {
    const tagName = match[1];
    const className = match[2];

    // Look backwards from @customElement to find nearest JSDoc (within 1000 chars)
    let jsdoc = '';
    const before = tsContent.slice(Math.max(0, match.index - 1000), match.index);
    // Find the last /** ... */ block before @customElement (not just the first)
    const jsdocBlocks = [...before.matchAll(/\/\*\*([\s\S]*?)\*\//g)];
    const lastBlock = jsdocBlocks[jsdocBlocks.length - 1];
    if (lastBlock) {
      // Only use it if there's only whitespace between the */ and @customElement
      const afterJsdoc = before.slice(lastBlock.index! + lastBlock[0].length);
      if (/^\s*$/.test(afterJsdoc)) {
        jsdoc = lastBlock[1];
      }
    }

    // Get the class body (find matching braces)
    const classStart = tsContent.indexOf('{', match.index + match[0].length);
    const classBody = extractClassBody(tsContent, classStart);

    const description = extractDescription(jsdoc);
    const props = extractProperties(classBody);
    const events = extractEvents(classBody, jsdoc);
    const slots = extractSlots(classBody, jsdoc);
    const methods = extractMethods(classBody);
    const formAssociated = classBody.includes('static formAssociated = true');

    components.push({
      tagName,
      className,
      description,
      props,
      events,
      slots,
      cssVars: [], // filled from CSS
      methods,
      formAssociated,
    });
  }

  // Extract CSS custom properties from CSS content
  const cssVars = extractCssVars(cssContent);

  // Assign CSS vars to first component (or distribute if multiple)
  if (components.length > 0 && cssVars.length > 0) {
    // Try to match CSS vars to components by prefix
    for (const comp of components) {
      const prefix = `--${comp.tagName}`;
      const matching = cssVars.filter(v => v.name.startsWith(prefix));
      if (matching.length > 0) {
        comp.cssVars = matching;
      }
    }
    // Any unmatched vars go to first component
    const assigned = new Set(components.flatMap(c => c.cssVars.map(v => v.name)));
    const unassigned = cssVars.filter(v => !assigned.has(v.name));
    if (unassigned.length > 0) {
      components[0].cssVars.push(...unassigned);
    }
  }

  return components;
}

function extractClassBody(source: string, braceStart: number): string {
  let depth = 0;
  let i = braceStart;
  for (; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  return source.slice(braceStart, i + 1);
}

function extractDescription(jsdoc: string): string {
  // Get lines before any @tag
  const lines: string[] = [];
  for (const raw of jsdoc.split('\n')) {
    const line = raw.replace(/^\s*\*\s?/, '').trim();
    if (line.startsWith('@')) break; // stop at first tag
    if (line) lines.push(line);
  }
  const desc = lines.join(' ').trim();
  // Safety: if it looks like leaked code, truncate
  if (desc.length > 300 || /\{[\s\S]{20,}/.test(desc)) {
    const firstSentence = desc.match(/^[^.!?]*[.!?]/);
    return firstSentence ? firstSentence[0].trim() : desc.slice(0, 200).trim();
  }
  return desc;
}

function extractProperties(classBody: string): PropInfo[] {
  const props: PropInfo[] = [];
  // Match @property with optional JSDoc comment before it
  const propRegex = /(?:\/\*\*\s*(.*?)\s*\*\/\s*)?@property\(\s*(\{[^}]*\})?\s*\)\s*(?:override\s+)?(\w+)(?:\s*[:?]\s*([^=;]+))?\s*=\s*([^;]+);/g;
  let m;

  while ((m = propRegex.exec(classBody)) !== null) {
    const description = m[1]?.replace(/\*\//g, '').trim() || '';
    const opts = m[2] || '{}';
    const name = m[3];
    const typeAnnotation = m[4]?.trim() || '';
    const defaultVal = m[5]?.trim() || '';

    const reflect = opts.includes('reflect: true') || opts.includes('reflect:true');
    const attrMatch = opts.match(/attribute:\s*'([^']+)'/);
    const attribute = attrMatch ? attrMatch[1] : camelToKebab(name);

    // Determine type
    let type = typeAnnotation;
    if (!type) {
      // Infer from default value
      if (defaultVal === 'false' || defaultVal === 'true') type = 'boolean';
      else if (defaultVal.startsWith("'") || defaultVal.startsWith('"')) type = 'string';
      else if (!isNaN(Number(defaultVal))) type = 'number';
      else type = 'string';
    }

    props.push({ name, type, default: defaultVal, reflect, attribute, description });
  }

  return props;
}

function extractEvents(classBody: string, jsdoc: string): EventInfo[] {
  const events: EventInfo[] = [];
  const seen = new Set<string>();

  // From JSDoc @fires tags
  const firesRegex = /@fires\s+(\S+)\s*-?\s*(.*)/g;
  let m;
  while ((m = firesRegex.exec(jsdoc)) !== null) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      events.push({ name: m[1], detail: '', description: m[2].trim() });
    }
  }

  // From CustomEvent dispatches in code
  const eventRegex = /new\s+CustomEvent\(\s*'([^']+)'/g;
  while ((m = eventRegex.exec(classBody)) !== null) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      // Try to extract detail shape
      const detailMatch = classBody.slice(m.index, m.index + 200).match(/detail:\s*\{([^}]+)\}/);
      const detail = detailMatch ? `{ ${detailMatch[1].trim()} }` : '';
      events.push({ name: m[1], detail, description: '' });
    }
  }

  return events;
}

function extractSlots(classBody: string, jsdoc: string): SlotInfo[] {
  const slots: SlotInfo[] = [];
  const seen = new Set<string>();

  // From JSDoc @slot tags
  const slotRegex = /@slot\s+(\S+)?\s*-?\s*(.*)/g;
  let m;
  while ((m = slotRegex.exec(jsdoc)) !== null) {
    const name = m[1]?.startsWith('-') ? '' : (m[1] || '');
    const desc = m[1]?.startsWith('-') ? `${m[1]} ${m[2]}`.replace(/^-\s*/, '') : m[2];
    if (!seen.has(name)) {
      seen.add(name);
      slots.push({ name, description: desc.trim() });
    }
  }

  // From template: <slot name="xxx">
  const slotElRegex = /<slot\s+name="([^"]+)"/g;
  while ((m = slotElRegex.exec(classBody)) !== null) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      slots.push({ name: m[1], description: '' });
    }
  }

  // Check for default slot
  if (!seen.has('') && /<slot[\s>]/.test(classBody) && /<slot(?:\s+@slotchange[^>]*)?\s*>/.test(classBody)) {
    slots.unshift({ name: '(default)', description: 'Default slot for content' });
  }

  return slots;
}

function extractCssVars(cssContent: string): CssVarInfo[] {
  const vars: CssVarInfo[] = [];
  const seen = new Set<string>();

  // Match var(--ui-xxx, default) and --ui-xxx: value
  const varRegex = /var\(\s*(--ui-[a-z0-9-]+)(?:\s*,\s*([^)]+))?\s*\)/g;
  let m;
  while ((m = varRegex.exec(cssContent)) !== null) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      vars.push({ name: m[1], default: m[2]?.trim() || '' });
    }
  }

  // Also match direct declarations: --ui-xxx: value
  const declRegex = /(--ui-[a-z0-9-]+)\s*:\s*([^;]+);/g;
  while ((m = declRegex.exec(cssContent)) !== null) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      vars.push({ name: m[1], default: m[2].trim() });
    }
  }

  return vars;
}

function extractMethods(classBody: string): MethodInfo[] {
  const methods: MethodInfo[] = [];
  const seen = new Set<string>();

  // Skip private/internal/lifecycle methods and keywords
  const skipMethods = new Set([
    'render', 'connectedCallback', 'disconnectedCallback', 'firstUpdated',
    'updated', 'willUpdate', 'attributeChangedCallback', 'formResetCallback',
    'formStateRestoreCallback', 'formDisabledCallback', 'formAssociatedCallback',
    'createRenderRoot', 'performUpdate', 'requestUpdate', 'scheduleUpdate',
    // JS keywords that can appear before parentheses
    'if', 'else', 'for', 'while', 'switch', 'catch', 'return', 'throw', 'new', 'delete', 'typeof', 'void', 'super', 'constructor',
  ]);

  // Public methods: no private/protected, not starting with _
  const methodRegex = /(?:\/\*\*\s*(.*?)\s*\*\/\s*)?(?:override\s+)?(\w+)\s*\(([^)]*)\)(?:\s*:\s*([^\s{]+))?\s*\{/g;
  let m;
  while ((m = methodRegex.exec(classBody)) !== null) {
    const description = m[1]?.replace(/\*\//g, '').replace(/@\w+.*/g, '').trim() || '';
    const name = m[2];
    const params = m[3]?.trim() || '';
    const returnType = m[4]?.trim() || 'void';

    // Skip private, underscore-prefixed, lifecycle, event handlers, and keywords
    if (name.startsWith('_') || skipMethods.has(name) || description.includes('@internal')) continue;
    if (name.startsWith('handle') || name.startsWith('on')) continue;
    if (seen.has(name)) continue;

    seen.add(name);
    methods.push({
      name,
      signature: `${name}(${params})${returnType !== 'void' ? `: ${returnType}` : ''}`,
      description,
    });
  }

  return methods;
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// ─── Live Demo Snippets ─────────────────────────────────────────────
// Hand-crafted HTML demos for components. Key = directory name.
// Each entry is an array of { label?, html } for that page.
const DEMOS: Record<string, { label?: string; html: string }[]> = {
  button: [
    {
      label: 'Variants',
      html: `<ui-button variant="primary">Primary</ui-button>
<ui-button variant="secondary">Secondary</ui-button>
<ui-button variant="destructive">Destructive</ui-button>`,
    },
    {
      label: 'Sizes',
      html: `<ui-button size="small">Small</ui-button>
<ui-button size="medium">Medium</ui-button>
<ui-button size="large">Large</ui-button>`,
    },
    {
      label: 'Disabled',
      html: `<ui-button disabled>Disabled</ui-button>`,
    },
  ],
  alert: [
    {
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%">
<ui-alert severity="info" title="Info">This is an informational message.</ui-alert>
<ui-alert severity="success" title="Success">Operation completed successfully.</ui-alert>
<ui-alert severity="warning" title="Warning">Please review before continuing.</ui-alert>
<ui-alert severity="error" title="Error">Something went wrong.</ui-alert>
</div>`,
    },
  ],
  badge: [
    {
      html: `<ui-badge content="4">
  <div style="width:40px;height:40px;border-radius:8px;background:#e5e7eb;display:flex;align-items:center;justify-content:center">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
  </div>
</ui-badge>
<ui-badge content="99+" variant="error">
  <div style="width:40px;height:40px;border-radius:8px;background:#e5e7eb;display:flex;align-items:center;justify-content:center">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
  </div>
</ui-badge>`,
    },
  ],
  avatar: [
    {
      html: `<ui-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></ui-avatar>
<ui-avatar src="https://i.pravatar.cc/150?img=2" alt="User 2"></ui-avatar>
<ui-avatar>AB</ui-avatar>`,
    },
  ],
  chip: [
    {
      label: 'Variants',
      html: `<ui-chip variant="filled">Filled</ui-chip>
<ui-chip variant="outlined">Outlined</ui-chip>
<ui-chip variant="filled" color="primary">Primary</ui-chip>
<ui-chip variant="filled" color="secondary">Secondary</ui-chip>
<ui-chip deletable>Deletable</ui-chip>`,
    },
  ],
  switch: [
    {
      label: 'Sizes',
      html: `<ui-switch size="sm"></ui-switch>
<ui-switch size="md"></ui-switch>
<ui-switch size="lg"></ui-switch>`,
    },
    {
      label: 'Checked',
      html: `<ui-switch default-checked></ui-switch>
<ui-switch default-checked disabled></ui-switch>`,
    },
  ],
  checkbox: [
    {
      html: `<ui-checkbox label="Option A"></ui-checkbox>
<ui-checkbox label="Option B" checked></ui-checkbox>
<ui-checkbox label="Disabled" disabled></ui-checkbox>`,
    },
  ],
  radio: [
    {
      html: `<ui-radio-group value="a">
  <ui-radio value="a" label="Option A"></ui-radio>
  <ui-radio value="b" label="Option B"></ui-radio>
  <ui-radio value="c" label="Option C"></ui-radio>
</ui-radio-group>`,
    },
  ],
  input: [
    {
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<ui-input label="Name" placeholder="Enter your name"></ui-input>
<ui-input label="Email" type="email" placeholder="you@example.com"></ui-input>
<ui-input label="Disabled" disabled value="Cannot edit"></ui-input>
</div>`,
    },
  ],
  'text-field': [
    {
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<ui-text-field label="Name" placeholder="Enter your name"></ui-text-field>
<ui-text-field label="With help" help-text="This field is required"></ui-text-field>
</div>`,
    },
  ],
  textarea: [
    {
      html: `<ui-textarea label="Message" placeholder="Type your message..." style="width:100%;max-width:400px"></ui-textarea>`,
    },
  ],
  select: [
    {
      html: `<ui-select label="Fruit" placeholder="Pick one" style="width:200px"></ui-select>`,
    },
  ],
  slider: [
    {
      html: `<div style="width:100%;max-width:300px">
<ui-slider value="40"></ui-slider>
</div>`,
    },
  ],
  rating: [
    {
      html: `<ui-rating value="3"></ui-rating>
<ui-rating value="4" readonly></ui-rating>`,
    },
  ],
  progress: [
    {
      label: 'Circular',
      html: `<ui-circular-progress></ui-circular-progress>
<ui-circular-progress value="25"></ui-circular-progress>
<ui-circular-progress value="75"></ui-circular-progress>`,
    },
    {
      label: 'Linear',
      html: `<div style="width:100%;max-width:400px">
<ui-linear-progress value="60"></ui-linear-progress>
</div>`,
    },
  ],
  skeleton: [
    {
      html: `<div style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:300px">
<ui-skeleton variant="circular" width="40px" height="40px"></ui-skeleton>
<ui-skeleton variant="text" width="200px"></ui-skeleton>
<ui-skeleton variant="text" width="160px"></ui-skeleton>
<ui-skeleton variant="rectangular" width="100%" height="120px"></ui-skeleton>
</div>`,
    },
  ],
  card: [
    {
      html: `<div style="max-width:360px;width:100%">
<ui-card>
  <ui-card-header title="Card Title" subtitle="Subtitle text"></ui-card-header>
  <ui-card-content>
    <p style="margin:0;color:#374151">This is a card with header, content, and action buttons.</p>
  </ui-card-content>
  <ui-card-actions>
    <ui-button variant="secondary" size="small">Cancel</ui-button>
    <ui-button size="small">Action</ui-button>
  </ui-card-actions>
</ui-card>
</div>`,
    },
  ],
  paper: [
    {
      html: `<ui-paper elevation="1" style="padding:16px">Elevation 1</ui-paper>
<ui-paper elevation="3" style="padding:16px">Elevation 3</ui-paper>
<ui-paper elevation="6" style="padding:16px">Elevation 6</ui-paper>`,
    },
  ],
  accordion: [
    {
      html: `<div style="width:100%;max-width:500px">
<ui-accordion>
  <ui-accordion-summary>Accordion Item 1</ui-accordion-summary>
  <ui-accordion-details>Content for the first item. Click the header to expand or collapse.</ui-accordion-details>
</ui-accordion>
<ui-accordion>
  <ui-accordion-summary>Accordion Item 2</ui-accordion-summary>
  <ui-accordion-details>Content for the second item. Each accordion operates independently.</ui-accordion-details>
</ui-accordion>
<ui-accordion disabled>
  <ui-accordion-summary>Disabled Item</ui-accordion-summary>
  <ui-accordion-details>This item cannot be expanded.</ui-accordion-details>
</ui-accordion>
</div>`,
    },
  ],
  tabs: [
    {
      html: `<div style="width:100%;max-width:500px">
<ui-tabs>
  <ui-tab-list>
    <ui-tab>Tab One</ui-tab>
    <ui-tab>Tab Two</ui-tab>
    <ui-tab>Tab Three</ui-tab>
  </ui-tab-list>
  <ui-tab-panel><p style="padding:16px;margin:0">Content for Tab One</p></ui-tab-panel>
  <ui-tab-panel><p style="padding:16px;margin:0">Content for Tab Two</p></ui-tab-panel>
  <ui-tab-panel><p style="padding:16px;margin:0">Content for Tab Three</p></ui-tab-panel>
</ui-tabs>
</div>`,
    },
  ],
  divider: [
    {
      html: `<div style="width:100%;max-width:400px">
<p style="margin:0 0 8px">Content above</p>
<ui-divider></ui-divider>
<p style="margin:8px 0 0">Content below</p>
</div>`,
    },
  ],
  tooltip: [
    {
      html: `<ui-tooltip content="This is a tooltip">
  <ui-button>Hover me</ui-button>
</ui-tooltip>`,
    },
  ],
  link: [
    {
      html: `<ui-link href="#">Default Link</ui-link>
<ui-link href="#" underline="always">Always Underline</ui-link>
<ui-link href="#" color="secondary">Secondary</ui-link>`,
    },
  ],
  typography: [
    {
      html: `<div style="display:flex;flex-direction:column;gap:8px;width:100%">
<ui-typography variant="h4">Heading 4</ui-typography>
<ui-typography variant="body1">Body 1 — The quick brown fox jumps over the lazy dog.</ui-typography>
<ui-typography variant="caption" color="secondary">Caption text</ui-typography>
</div>`,
    },
  ],
  breadcrumbs: [
    {
      html: `<ui-breadcrumbs>
  <a href="#">Home</a>
  <a href="#">Products</a>
  <span>Current Page</span>
</ui-breadcrumbs>`,
    },
  ],
  pagination: [
    {
      html: `<ui-pagination count="10" page="3"></ui-pagination>`,
    },
  ],
  dialog: [
    {
      html: `<ui-button onclick="this.nextElementSibling.open=true">Open Dialog</ui-button>
<ui-dialog>
  <ui-dialog-title>Dialog Title</ui-dialog-title>
  <ui-dialog-content>
    <ui-dialog-content-text>This is a dialog. Click outside or press Escape to close.</ui-dialog-content-text>
  </ui-dialog-content>
  <ui-dialog-actions>
    <ui-button variant="secondary" onclick="this.closest('ui-dialog').open=false">Cancel</ui-button>
    <ui-button onclick="this.closest('ui-dialog').open=false">Confirm</ui-button>
  </ui-dialog-actions>
</ui-dialog>`,
    },
  ],
  drawer: [
    {
      html: `<ui-button onclick="this.nextElementSibling.open=true">Open Drawer</ui-button>
<ui-drawer>
  <div style="padding:24px;width:280px">
    <h3 style="margin:0 0 16px">Drawer Content</h3>
    <p style="margin:0;color:#374151">Click outside to close.</p>
  </div>
</ui-drawer>`,
    },
  ],
  snackbar: [
    {
      html: `<ui-button onclick="this.nextElementSibling.open=true">Show Snackbar</ui-button>
<ui-snackbar message="This is a snackbar message" auto-hide-duration="3000"></ui-snackbar>`,
    },
  ],
  collapsible: [
    {
      html: `<div style="width:100%;max-width:400px">
<ui-collapsible>
  <ui-collapsible-trigger>
    <ui-button variant="secondary" style="width:100%">Toggle Content</ui-button>
  </ui-collapsible-trigger>
  <ui-collapsible-content>
    <div style="padding:12px 0;color:#374151">This content can be expanded and collapsed.</div>
  </ui-collapsible-content>
</ui-collapsible>
</div>`,
    },
  ],
  'input-otp': [
    {
      html: `<ui-input-otp length="6">
  <ui-input-otp-group>
    <ui-input-otp-slot index="0"></ui-input-otp-slot>
    <ui-input-otp-slot index="1"></ui-input-otp-slot>
    <ui-input-otp-slot index="2"></ui-input-otp-slot>
  </ui-input-otp-group>
  <ui-input-otp-separator></ui-input-otp-separator>
  <ui-input-otp-group>
    <ui-input-otp-slot index="3"></ui-input-otp-slot>
    <ui-input-otp-slot index="4"></ui-input-otp-slot>
    <ui-input-otp-slot index="5"></ui-input-otp-slot>
  </ui-input-otp-group>
</ui-input-otp>`,
    },
  ],
  kbd: [
    {
      html: `<ui-kbd>Ctrl</ui-kbd> + <ui-kbd>C</ui-kbd>
<span style="margin:0 12px"></span>
<ui-kbd>Shift</ui-kbd> + <ui-kbd>Enter</ui-kbd>`,
    },
  ],
  'copy-button': [
    {
      html: `<ui-copy-button value="Hello, World!">Copy Text</ui-copy-button>`,
    },
  ],
  'hover-card': [
    {
      html: `<ui-hover-card>
  <ui-hover-card-trigger>
    <ui-link href="#">Hover over me</ui-link>
  </ui-hover-card-trigger>
  <ui-hover-card-content>
    <div style="padding:12px">
      <p style="margin:0;font-weight:600">Hover Card</p>
      <p style="margin:4px 0 0;color:#6b7280;font-size:14px">Additional information shown on hover.</p>
    </div>
  </ui-hover-card-content>
</ui-hover-card>`,
    },
  ],
  'relative-time': [
    {
      html: `<ui-relative-time datetime="2025-01-01T00:00:00Z"></ui-relative-time>`,
    },
  ],
  'format-date': [
    {
      html: `<ui-format-date></ui-format-date>`,
    },
  ],
  'format-number': [
    {
      html: `<ui-format-number value="1234567.89" style="currency" currency="USD"></ui-format-number>`,
    },
  ],
  empty: [
    {
      html: `<div style="width:100%;max-width:400px">
<ui-empty>
  <ui-empty-title>No results found</ui-empty-title>
  <ui-empty-description>Try adjusting your search or filter criteria.</ui-empty-description>
</ui-empty>
</div>`,
    },
  ],
  carousel: [
    {
      html: `<div style="width:100%;max-width:500px">
<ui-carousel>
  <ui-carousel-content>
    <ui-carousel-item><div style="background:#e0e7ff;border-radius:8px;height:200px;display:flex;align-items:center;justify-content:center;font-weight:600;color:#3730a3">Slide 1</div></ui-carousel-item>
    <ui-carousel-item><div style="background:#dbeafe;border-radius:8px;height:200px;display:flex;align-items:center;justify-content:center;font-weight:600;color:#1e40af">Slide 2</div></ui-carousel-item>
    <ui-carousel-item><div style="background:#e0f2fe;border-radius:8px;height:200px;display:flex;align-items:center;justify-content:center;font-weight:600;color:#0369a1">Slide 3</div></ui-carousel-item>
  </ui-carousel-content>
  <ui-carousel-previous></ui-carousel-previous>
  <ui-carousel-next></ui-carousel-next>
</ui-carousel>
</div>`,
    },
  ],
  'scroll-area': [
    {
      html: `<ui-scroll-area style="height:200px;width:100%;max-width:350px;border:1px solid #e5e7eb;border-radius:8px">
  <div style="padding:16px">
    <p style="margin:0 0 12px">Scroll down to see more content.</p>
    <p style="margin:0 0 12px">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <p style="margin:0 0 12px">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p style="margin:0 0 12px">Ut enim ad minim veniam, quis nostrud exercitation.</p>
    <p style="margin:0 0 12px">Duis aute irure dolor in reprehenderit in voluptate.</p>
    <p style="margin:0 0 12px">Excepteur sint occaecat cupidatat non proident.</p>
    <p style="margin:0">Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
</ui-scroll-area>`,
    },
  ],
  'split-panel': [
    {
      html: `<ui-split-panel style="height:200px;width:100%;max-width:500px;border:1px solid #e5e7eb;border-radius:8px">
  <div slot="start" style="padding:16px;background:#f0f9ff">Left Panel</div>
  <div slot="end" style="padding:16px;background:#fef3c7">Right Panel</div>
</ui-split-panel>`,
    },
  ],
  toggle: [
    {
      html: `<ui-toggle>Toggle</ui-toggle>
<ui-toggle pressed>Pressed</ui-toggle>`,
    },
  ],
  fab: [
    {
      html: `<ui-fab>
  <svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
</ui-fab>`,
    },
  ],
  item: [
    {
      html: `<div style="width:100%;max-width:400px">
<ui-item-group>
  <ui-item>
    <ui-item-content>
      <ui-item-title>Item Title</ui-item-title>
      <ui-item-description>A short description of this item.</ui-item-description>
    </ui-item-content>
  </ui-item>
  <ui-item-separator></ui-item-separator>
  <ui-item>
    <ui-item-content>
      <ui-item-title>Another Item</ui-item-title>
      <ui-item-description>Another description here.</ui-item-description>
    </ui-item-content>
  </ui-item>
</ui-item-group>
</div>`,
    },
  ],
  list: [
    {
      html: `<div style="width:100%;max-width:360px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
<ui-list>
  <ui-list-item-button>
    <ui-list-item-text primary="Inbox" secondary="5 new messages"></ui-list-item-text>
  </ui-list-item-button>
  <ui-list-item-button>
    <ui-list-item-text primary="Drafts" secondary="2 drafts"></ui-list-item-text>
  </ui-list-item-button>
  <ui-list-item-button>
    <ui-list-item-text primary="Sent" secondary="Last sent 2h ago"></ui-list-item-text>
  </ui-list-item-button>
</ui-list>
</div>`,
    },
  ],
  stepper: [
    {
      html: `<div style="width:100%;max-width:500px">
<ui-stepper active-step="1">
  <ui-step>
    <ui-step-label>Account</ui-step-label>
  </ui-step>
  <ui-step>
    <ui-step-label>Details</ui-step-label>
  </ui-step>
  <ui-step>
    <ui-step-label>Review</ui-step-label>
  </ui-step>
</ui-stepper>
</div>`,
    },
  ],
  backdrop: [
    {
      html: `<ui-button onclick="this.nextElementSibling.open=true">Show Backdrop</ui-button>
<ui-backdrop>
  <div style="background:white;padding:24px;border-radius:8px;text-align:center">
    <p style="margin:0 0 16px">Click outside to close</p>
    <ui-button onclick="this.closest('ui-backdrop').open=false">Close</ui-button>
  </div>
</ui-backdrop>`,
    },
  ],
};

function generateMarkdown(dir: string, components: ComponentInfo[]): string {
  const title = dir
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  let md = `# ${title}\n\n`;

  // Insert live demos at the top of the page (before component details)
  const demos = DEMOS[dir];
  if (demos) {
    for (const demo of demos) {
      if (demo.label) {
        md += `<Demo label="${demo.label}">\n\n${demo.html}\n\n</Demo>\n\n`;
      } else {
        md += `<Demo>\n\n${demo.html}\n\n</Demo>\n\n`;
      }
    }
  }

  for (const comp of components) {
    if (components.length > 1) {
      md += `## \`<${comp.tagName}>\`\n\n`;
    }

    if (comp.description) {
      md += `${comp.description}\n\n`;
    }

    md += `- **Tag**: \`<${comp.tagName}>\`\n`;
    md += `- **Class**: \`${comp.className}\`\n`;
    if (comp.formAssociated) {
      md += `- **Form Associated**: Yes\n`;
    }
    md += `\n`;

    // Import
    md += `### Import\n\n`;
    md += `\`\`\`ts\nimport 'storybook-lit'; // auto-registers all\n`;
    md += `// or\nimport { ${comp.className} } from 'storybook-lit';\n\`\`\`\n\n`;

    // Basic usage
    md += `### Usage\n\n`;
    md += `\`\`\`html\n<${comp.tagName}></${comp.tagName}>\n\`\`\`\n\n`;

    // Properties
    if (comp.props.length > 0) {
      md += `### Properties\n\n`;
      md += `| Property | Attribute | Type | Default | Description |\n`;
      md += `| --- | --- | --- | --- | --- |\n`;
      for (const p of comp.props) {
        const typeStr = `\`${escapeTable(p.type)}\``;
        const defaultStr = p.default ? `\`${escapeTable(p.default)}\`` : '—';
        const desc = escapeTable(p.description);
        md += `| \`${p.name}\` | \`${p.attribute}\` | ${typeStr} | ${defaultStr} | ${desc} |\n`;
      }
      md += `\n`;
    }

    // Events
    if (comp.events.length > 0) {
      md += `### Events\n\n`;
      md += `| Event | Detail | Description |\n`;
      md += `| --- | --- | --- |\n`;
      for (const e of comp.events) {
        md += `| \`${e.name}\` | ${e.detail ? `\`${escapeTable(e.detail)}\`` : '—'} | ${escapeTable(e.description)} |\n`;
      }
      md += `\n`;
    }

    // Slots
    if (comp.slots.length > 0) {
      md += `### Slots\n\n`;
      md += `| Name | Description |\n`;
      md += `| --- | --- |\n`;
      for (const s of comp.slots) {
        md += `| \`${s.name || '(default)'}\` | ${escapeTable(s.description)} |\n`;
      }
      md += `\n`;
    }

    // CSS Custom Properties
    if (comp.cssVars.length > 0) {
      md += `### CSS Custom Properties\n\n`;
      md += `| Property | Default |\n`;
      md += `| --- | --- |\n`;
      for (const v of comp.cssVars) {
        md += `| \`${v.name}\` | ${v.default ? `\`${escapeTable(v.default)}\`` : '—'} |\n`;
      }
      md += `\n`;
    }

    // Methods
    if (comp.methods.length > 0) {
      md += `### Methods\n\n`;
      md += `| Method | Description |\n`;
      md += `| --- | --- |\n`;
      for (const m of comp.methods) {
        md += `| \`${escapeTable(m.signature)}\` | ${escapeTable(m.description)} |\n`;
      }
      md += `\n`;
    }

    md += `---\n\n`;
  }

  return md.trim() + '\n';
}

function escapeTable(s: string): string {
  return s.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function generateSidebar(dirs: string[]): object[] {
  const categories: Record<string, string[]> = {
    'Form Controls': ['button', 'checkbox', 'input', 'input-otp', 'radio', 'rating', 'select', 'slider', 'switch', 'text-field', 'textarea', 'toggle', 'ui-range-slider', 'date-field', 'date-picker', 'date-range-picker', 'time-picker', 'autocomplete', 'transfer-list'],
    'Data Display': ['avatar', 'badge', 'chip', 'empty', 'image-list', 'item', 'list', 'table', 'tooltip', 'tree-view', 'typography', 'kbd', 'format-date', 'format-number', 'relative-time'],
    'Navigation': ['app-bar', 'bottom-navigation', 'breadcrumbs', 'link', 'menu', 'menubar', 'navigation-menu', 'pagination', 'speed-dial', 'stepper', 'tabs'],
    'Feedback': ['alert', 'dialog', 'drawer', 'progress', 'skeleton', 'snackbar', 'sonner', 'backdrop'],
    'Layout': ['accordion', 'box', 'card', 'carousel', 'collapsible', 'command', 'container', 'divider', 'grid', 'hover-card', 'image-comparer', 'paper', 'resizable', 'scroll-area', 'split-panel', 'stack'],
    'Utility': ['copy-button', 'docs', 'fab', 'visually-hidden'],
  };

  const sidebar: object[] = [];

  for (const [category, componentNames] of Object.entries(categories)) {
    const items = componentNames
      .filter(name => dirs.includes(name))
      .map(name => ({
        text: name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        link: `/components/${name}`,
      }));

    if (items.length > 0) {
      sidebar.push({ text: category, collapsed: false, items });
    }
  }

  // Catch any uncategorized
  const allCategorized = new Set(Object.values(categories).flat());
  const uncategorized = dirs.filter(d => !allCategorized.has(d));
  if (uncategorized.length > 0) {
    sidebar.push({
      text: 'Other',
      collapsed: false,
      items: uncategorized.map(name => ({
        text: name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        link: `/components/${name}`,
      })),
    });
  }

  return sidebar;
}

// ─── Main ───────────────────────────────────────────────────────────

function main() {
  // Ensure output dir
  fs.mkdirSync(DOCS_DIR, { recursive: true });

  const entries = fs.readdirSync(SRC_DIR).filter(e => {
    if (SKIP.has(e)) return false;
    const full = path.join(SRC_DIR, e);
    return fs.statSync(full).isDirectory();
  });

  const processedDirs: string[] = [];

  for (const dir of entries) {
    const dirPath = path.join(SRC_DIR, dir);

    // Read all .ts files (excluding test and stories)
    const tsFiles = fs.readdirSync(dirPath).filter(f =>
      f.endsWith('.ts') && !f.includes('.test.') && !f.includes('.stories.')
    );
    const cssFiles = fs.readdirSync(dirPath).filter(f => f.endsWith('.css'));

    let tsContent = '';
    for (const f of tsFiles) {
      tsContent += fs.readFileSync(path.join(dirPath, f), 'utf-8') + '\n';
    }

    let cssContent = '';
    for (const f of cssFiles) {
      cssContent += fs.readFileSync(path.join(dirPath, f), 'utf-8') + '\n';
    }

    const components = extractComponents(tsContent, cssContent);
    if (components.length === 0) continue;

    const markdown = generateMarkdown(dir, components);
    const outPath = path.join(DOCS_DIR, `${dir}.md`);
    fs.writeFileSync(outPath, markdown);
    processedDirs.push(dir);
    console.log(`  ✓ ${dir} (${components.length} component${components.length > 1 ? 's' : ''})`);
  }

  // Generate sidebar config
  const sidebar = generateSidebar(processedDirs);
  const sidebarPath = path.join('docs', '.vitepress', 'sidebar.json');
  fs.writeFileSync(sidebarPath, JSON.stringify(sidebar, null, 2));
  console.log(`\n✓ Generated docs for ${processedDirs.length} components`);
  console.log(`✓ Sidebar config written to ${sidebarPath}`);
}

main();
