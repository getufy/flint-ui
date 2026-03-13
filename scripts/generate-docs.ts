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
      label: 'States',
      html: `<ui-button disabled>Disabled</ui-button>
<ui-button full-width>Full Width</ui-button>`,
    },
    {
      label: 'Button Group',
      html: `<ui-button-group>
  <ui-button variant="secondary">Left</ui-button>
  <ui-button variant="secondary">Center</ui-button>
  <ui-button variant="secondary">Right</ui-button>
</ui-button-group>`,
    },
    {
      label: 'Toggle Buttons',
      html: `<ui-toggle-button-group exclusive>
  <ui-toggle-button value="left">Left</ui-toggle-button>
  <ui-toggle-button value="center" selected>Center</ui-toggle-button>
  <ui-toggle-button value="right">Right</ui-toggle-button>
</ui-toggle-button-group>`,
    },
  ],
  alert: [
    {
      label: 'Severities',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%">
<ui-alert severity="info" title="Info">This is an informational message.</ui-alert>
<ui-alert severity="success" title="Success">Operation completed successfully.</ui-alert>
<ui-alert severity="warning" title="Warning">Please review before continuing.</ui-alert>
<ui-alert severity="error" title="Error">Something went wrong.</ui-alert>
</div>`,
    },
    {
      label: 'Dismissible',
      html: `<div style="width:100%">
<ui-alert severity="info" title="Dismissible" dismissible>Click the close button to dismiss this alert.</ui-alert>
</div>`,
    },
    {
      label: 'Without Title',
      html: `<div style="width:100%">
<ui-alert severity="success">A simple success alert without a title.</ui-alert>
</div>`,
    },
  ],
  badge: [
    {
      label: 'Content',
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
    {
      label: 'Variants',
      html: `<ui-badge content="3" variant="primary"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>
<ui-badge content="3" variant="secondary"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>
<ui-badge content="3" variant="success"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>
<ui-badge content="3" variant="warning"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>
<ui-badge content="3" variant="error"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>`,
    },
    {
      label: 'Dot',
      html: `<ui-badge dot><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>
<ui-badge dot variant="error"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></ui-badge>`,
    },
  ],
  avatar: [
    {
      label: 'Image',
      html: `<ui-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></ui-avatar>
<ui-avatar src="https://i.pravatar.cc/150?img=2" alt="User 2"></ui-avatar>
<ui-avatar src="https://i.pravatar.cc/150?img=3" alt="User 3"></ui-avatar>`,
    },
    {
      label: 'Initials',
      html: `<ui-avatar>AB</ui-avatar>
<ui-avatar>CD</ui-avatar>
<ui-avatar>EF</ui-avatar>`,
    },
  ],
  chip: [
    {
      label: 'Variants',
      html: `<ui-chip label="Filled" variant="filled"></ui-chip>
<ui-chip label="Outlined" variant="outlined"></ui-chip>
<ui-chip label="Primary" variant="filled" color="primary"></ui-chip>
<ui-chip label="Secondary" variant="filled" color="secondary"></ui-chip>`,
    },
    {
      label: 'Sizes',
      html: `<ui-chip label="Small" size="sm"></ui-chip>
<ui-chip label="Medium" size="md"></ui-chip>
<ui-chip label="Large" size="lg"></ui-chip>`,
    },
    {
      label: 'Interactive',
      html: `<ui-chip label="Clickable" clickable></ui-chip>
<ui-chip label="Deletable" deletable></ui-chip>
<ui-chip label="Both" clickable deletable></ui-chip>
<ui-chip label="Disabled" disabled></ui-chip>`,
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
      label: 'States',
      html: `<ui-switch></ui-switch>
<ui-switch default-checked></ui-switch>
<ui-switch disabled></ui-switch>
<ui-switch default-checked disabled></ui-switch>`,
    },
  ],
  checkbox: [
    {
      label: 'States',
      html: `<ui-checkbox label="Unchecked"></ui-checkbox>
<ui-checkbox label="Checked" checked></ui-checkbox>
<ui-checkbox label="Indeterminate" indeterminate></ui-checkbox>
<ui-checkbox label="Disabled" disabled></ui-checkbox>
<ui-checkbox label="Checked Disabled" checked disabled></ui-checkbox>`,
    },
  ],
  radio: [
    {
      label: 'Basic',
      html: `<ui-radio-group value="a">
  <ui-radio value="a" label="Option A"></ui-radio>
  <ui-radio value="b" label="Option B"></ui-radio>
  <ui-radio value="c" label="Option C"></ui-radio>
</ui-radio-group>`,
    },
    {
      label: 'Disabled',
      html: `<ui-radio-group value="x">
  <ui-radio value="x" label="Selected" disabled></ui-radio>
  <ui-radio value="y" label="Disabled" disabled></ui-radio>
</ui-radio-group>`,
    },
  ],
  input: [
    {
      label: 'Types',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<ui-input label="Text" placeholder="Enter your name"></ui-input>
<ui-input label="Email" type="email" placeholder="you@example.com"></ui-input>
<ui-input label="Password" type="password" value="secret123"></ui-input>
<ui-input label="Search" type="search" placeholder="Search..."></ui-input>
</div>`,
    },
    {
      label: 'States',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<ui-input label="Disabled" disabled value="Cannot edit"></ui-input>
<ui-input label="Readonly" readonly value="Read only value"></ui-input>
<ui-input label="Error" error value="Invalid input" help-text="This field has an error"></ui-input>
</div>`,
    },
    {
      label: 'Sizes',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<ui-input label="Small" size="sm" placeholder="Small"></ui-input>
<ui-input label="Default" placeholder="Default"></ui-input>
<ui-input label="Large" size="lg" placeholder="Large"></ui-input>
</div>`,
    },
  ],
  'text-field': [
    {
      label: 'States',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<ui-text-field label="Name" placeholder="Enter your name"></ui-text-field>
<ui-text-field label="With Help" help-text="This field is required"></ui-text-field>
<ui-text-field label="Error" error help-text="Please enter a valid email"></ui-text-field>
<ui-text-field label="Disabled" disabled value="Cannot edit"></ui-text-field>
</div>`,
    },
  ],
  textarea: [
    {
      label: 'States',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:400px">
<ui-textarea label="Message" placeholder="Type your message..."></ui-textarea>
<ui-textarea label="Disabled" disabled value="This textarea is disabled"></ui-textarea>
</div>`,
    },
  ],
  select: [
    {
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<ui-select label="Fruit" placeholder="Pick one" style="width:220px" data-options="apple:Apple,banana:Banana,cherry:Cherry,grape:Grape,mango:Mango"></ui-select>
<ui-select label="Disabled" disabled placeholder="Disabled" style="width:220px"></ui-select>
</div>`,
    },
  ],
  slider: [
    {
      label: 'Values',
      html: `<div style="display:flex;flex-direction:column;gap:16px;width:100%;max-width:300px">
<ui-slider value="25"></ui-slider>
<ui-slider value="50"></ui-slider>
<ui-slider value="75"></ui-slider>
</div>`,
    },
    {
      label: 'Disabled',
      html: `<div style="width:100%;max-width:300px">
<ui-slider value="40" disabled></ui-slider>
</div>`,
    },
  ],
  rating: [
    {
      label: 'Interactive',
      html: `<ui-rating value="0"></ui-rating>`,
    },
    {
      label: 'Values',
      html: `<ui-rating value="1" readonly></ui-rating>
<ui-rating value="3" readonly></ui-rating>
<ui-rating value="5" readonly></ui-rating>`,
    },
    {
      label: 'Disabled',
      html: `<ui-rating value="3" disabled></ui-rating>`,
    },
  ],
  progress: [
    {
      label: 'Circular Indeterminate',
      html: `<ui-circular-progress></ui-circular-progress>`,
    },
    {
      label: 'Circular Determinate',
      html: `<ui-circular-progress value="0"></ui-circular-progress>
<ui-circular-progress value="25"></ui-circular-progress>
<ui-circular-progress value="50"></ui-circular-progress>
<ui-circular-progress value="75"></ui-circular-progress>
<ui-circular-progress value="100"></ui-circular-progress>`,
    },
    {
      label: 'Linear Indeterminate',
      html: `<div style="width:100%;max-width:400px">
<ui-linear-progress></ui-linear-progress>
</div>`,
    },
    {
      label: 'Linear Determinate',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:400px">
<ui-linear-progress value="30"></ui-linear-progress>
<ui-linear-progress value="60"></ui-linear-progress>
<ui-linear-progress value="100"></ui-linear-progress>
</div>`,
    },
  ],
  skeleton: [
    {
      label: 'Variants',
      html: `<div style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:300px">
<ui-skeleton variant="circular" width="40px" height="40px"></ui-skeleton>
<ui-skeleton variant="text" width="200px"></ui-skeleton>
<ui-skeleton variant="text" width="160px"></ui-skeleton>
<ui-skeleton variant="rectangular" width="100%" height="120px"></ui-skeleton>
</div>`,
    },
    {
      label: 'Card Placeholder',
      html: `<div style="display:flex;gap:12px;width:100%;max-width:300px">
  <ui-skeleton variant="circular" width="48px" height="48px"></ui-skeleton>
  <div style="flex:1;display:flex;flex-direction:column;gap:6px">
    <ui-skeleton variant="text" width="80%"></ui-skeleton>
    <ui-skeleton variant="text" width="60%"></ui-skeleton>
  </div>
</div>`,
    },
  ],
  card: [
    {
      label: 'Default',
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
    {
      label: 'Outlined',
      html: `<div style="max-width:360px;width:100%">
<ui-card variant="outlined">
  <ui-card-header title="Outlined Card" subtitle="With border instead of shadow"></ui-card-header>
  <ui-card-content>
    <p style="margin:0;color:#374151">Useful for less prominent content areas.</p>
  </ui-card-content>
</ui-card>
</div>`,
    },
  ],
  paper: [
    {
      label: 'Elevations',
      html: `<ui-paper elevation="0" style="padding:16px">Elevation 0</ui-paper>
<ui-paper elevation="1" style="padding:16px">Elevation 1</ui-paper>
<ui-paper elevation="3" style="padding:16px">Elevation 3</ui-paper>
<ui-paper elevation="6" style="padding:16px">Elevation 6</ui-paper>
<ui-paper elevation="12" style="padding:16px">Elevation 12</ui-paper>`,
    },
  ],
  accordion: [
    {
      label: 'Basic',
      html: `<div style="width:100%;max-width:500px">
<ui-accordion expanded>
  <ui-accordion-summary>Expanded by default</ui-accordion-summary>
  <ui-accordion-details>This accordion starts open. Click the header to collapse it.</ui-accordion-details>
</ui-accordion>
<ui-accordion>
  <ui-accordion-summary>Collapsed Item</ui-accordion-summary>
  <ui-accordion-details>Click the header above to expand this content.</ui-accordion-details>
</ui-accordion>
<ui-accordion disabled>
  <ui-accordion-summary>Disabled Item</ui-accordion-summary>
  <ui-accordion-details>This item cannot be toggled.</ui-accordion-details>
</ui-accordion>
</div>`,
    },
  ],
  tabs: [
    {
      label: 'Basic',
      html: `<div style="width:100%;max-width:500px">
<ui-tabs value="one">
  <ui-tab-list>
    <ui-tab value="one">Tab One</ui-tab>
    <ui-tab value="two">Tab Two</ui-tab>
    <ui-tab value="three">Tab Three</ui-tab>
  </ui-tab-list>
  <ui-tab-panel value="one"><p style="padding:16px;margin:0">Content for Tab One</p></ui-tab-panel>
  <ui-tab-panel value="two"><p style="padding:16px;margin:0">Content for Tab Two</p></ui-tab-panel>
  <ui-tab-panel value="three"><p style="padding:16px;margin:0">Content for Tab Three</p></ui-tab-panel>
</ui-tabs>
</div>`,
    },
    {
      label: 'With Disabled Tab',
      html: `<div style="width:100%;max-width:500px">
<ui-tabs value="first">
  <ui-tab-list>
    <ui-tab value="first">Active</ui-tab>
    <ui-tab value="second" disabled>Disabled</ui-tab>
    <ui-tab value="third">Also Active</ui-tab>
  </ui-tab-list>
  <ui-tab-panel value="first"><p style="padding:16px;margin:0">First panel content</p></ui-tab-panel>
  <ui-tab-panel value="second"><p style="padding:16px;margin:0">Disabled panel</p></ui-tab-panel>
  <ui-tab-panel value="third"><p style="padding:16px;margin:0">Third panel content</p></ui-tab-panel>
</ui-tabs>
</div>`,
    },
  ],
  divider: [
    {
      label: 'Horizontal',
      html: `<div style="width:100%;max-width:400px">
<p style="margin:0 0 8px">Content above</p>
<ui-divider></ui-divider>
<p style="margin:8px 0 0">Content below</p>
</div>`,
    },
    {
      label: 'Vertical',
      html: `<div style="display:flex;align-items:center;gap:12px;height:40px">
<span>Left</span>
<ui-divider orientation="vertical"></ui-divider>
<span>Right</span>
</div>`,
    },
  ],
  tooltip: [
    {
      label: 'Placements',
      html: `<ui-tooltip label="Top tooltip">
  <ui-button variant="secondary">Top</ui-button>
</ui-tooltip>
<ui-tooltip label="Bottom tooltip" placement="bottom">
  <ui-button variant="secondary">Bottom</ui-button>
</ui-tooltip>
<ui-tooltip label="Left tooltip" placement="left">
  <ui-button variant="secondary">Left</ui-button>
</ui-tooltip>
<ui-tooltip label="Right tooltip" placement="right">
  <ui-button variant="secondary">Right</ui-button>
</ui-tooltip>`,
    },
  ],
  link: [
    {
      label: 'Underline Styles',
      html: `<ui-link href="#">Default</ui-link>
<ui-link href="#" underline="always">Always</ui-link>
<ui-link href="#" underline="none">None</ui-link>`,
    },
    {
      label: 'Colors',
      html: `<ui-link href="#" color="primary">Primary</ui-link>
<ui-link href="#" color="secondary">Secondary</ui-link>
<ui-link href="#" color="inherit">Inherit</ui-link>`,
    },
  ],
  typography: [
    {
      label: 'Headings',
      html: `<div style="display:flex;flex-direction:column;gap:4px;width:100%">
<ui-typography variant="h1">Heading 1</ui-typography>
<ui-typography variant="h2">Heading 2</ui-typography>
<ui-typography variant="h3">Heading 3</ui-typography>
<ui-typography variant="h4">Heading 4</ui-typography>
<ui-typography variant="h5">Heading 5</ui-typography>
<ui-typography variant="h6">Heading 6</ui-typography>
</div>`,
    },
    {
      label: 'Body & Caption',
      html: `<div style="display:flex;flex-direction:column;gap:4px;width:100%">
<ui-typography variant="body1">Body 1 — The quick brown fox jumps over the lazy dog.</ui-typography>
<ui-typography variant="body2">Body 2 — A smaller body text variant for secondary content.</ui-typography>
<ui-typography variant="caption" color="secondary">Caption — Small helper text</ui-typography>
<ui-typography variant="overline">OVERLINE TEXT</ui-typography>
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
      label: 'Pages',
      html: `<ui-pagination count="10" page="1"></ui-pagination>`,
    },
    {
      label: 'Middle Page',
      html: `<ui-pagination count="20" page="10"></ui-pagination>`,
    },
  ],
  dialog: [
    {
      label: 'Basic',
      html: `<ui-button onclick="var d=this.nextElementSibling;d.open=true;d.addEventListener('close',function(){d.open=false},{once:true})">Open Dialog</ui-button>
<ui-dialog>
  <ui-dialog-title>Confirm Action</ui-dialog-title>
  <ui-dialog-content>
    <ui-dialog-content-text>Are you sure you want to proceed? This action cannot be undone.</ui-dialog-content-text>
  </ui-dialog-content>
  <ui-dialog-actions>
    <ui-button variant="secondary" onclick="this.closest('ui-dialog').open=false">Cancel</ui-button>
    <ui-button onclick="this.closest('ui-dialog').open=false">Confirm</ui-button>
  </ui-dialog-actions>
</ui-dialog>`,
    },
    {
      label: 'Destructive',
      html: `<ui-button variant="destructive" onclick="var d=this.nextElementSibling;d.open=true;d.addEventListener('close',function(){d.open=false},{once:true})">Delete Account</ui-button>
<ui-dialog>
  <ui-dialog-title>Delete Account?</ui-dialog-title>
  <ui-dialog-content>
    <ui-dialog-content-text>This will permanently delete your account and all associated data.</ui-dialog-content-text>
  </ui-dialog-content>
  <ui-dialog-actions>
    <ui-button variant="secondary" onclick="this.closest('ui-dialog').open=false">Cancel</ui-button>
    <ui-button variant="destructive" onclick="this.closest('ui-dialog').open=false">Delete</ui-button>
  </ui-dialog-actions>
</ui-dialog>`,
    },
  ],
  drawer: [
    {
      label: 'Left (default)',
      html: `<ui-button onclick="var d=this.nextElementSibling;d.open=true;d.addEventListener('ui-drawer-close',function(){d.open=false},{once:true})">Open Drawer</ui-button>
<ui-drawer>
  <div style="padding:24px;width:280px">
    <h3 style="margin:0 0 16px">Navigation</h3>
    <ui-list>
      <ui-list-item-button><ui-list-item-text primary="Home"></ui-list-item-text></ui-list-item-button>
      <ui-list-item-button><ui-list-item-text primary="Profile"></ui-list-item-text></ui-list-item-button>
      <ui-list-item-button><ui-list-item-text primary="Settings"></ui-list-item-text></ui-list-item-button>
    </ui-list>
  </div>
</ui-drawer>`,
    },
  ],
  snackbar: [
    {
      label: 'Basic',
      html: `<ui-button onclick="this.nextElementSibling.open=true">Show Snackbar</ui-button>
<ui-snackbar message="This is a snackbar message" auto-hide-duration="3000"></ui-snackbar>`,
    },
  ],
  collapsible: [
    {
      label: 'Default Closed',
      html: `<div style="width:100%;max-width:400px">
<ui-collapsible>
  <ui-collapsible-trigger>
    <ui-button variant="secondary" style="width:100%">Click to expand</ui-button>
  </ui-collapsible-trigger>
  <ui-collapsible-content>
    <div style="padding:12px 0;color:#374151">This content is revealed when you click the trigger above.</div>
  </ui-collapsible-content>
</ui-collapsible>
</div>`,
    },
    {
      label: 'Default Open',
      html: `<div style="width:100%;max-width:400px">
<ui-collapsible default-open>
  <ui-collapsible-trigger>
    <ui-button variant="secondary" style="width:100%">Click to collapse</ui-button>
  </ui-collapsible-trigger>
  <ui-collapsible-content>
    <div style="padding:12px 0;color:#374151">This content starts visible and can be collapsed.</div>
  </ui-collapsible-content>
</ui-collapsible>
</div>`,
    },
  ],
  'input-otp': [
    {
      label: '6-digit code',
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
    {
      label: '4-digit code',
      html: `<ui-input-otp length="4">
  <ui-input-otp-group>
    <ui-input-otp-slot index="0"></ui-input-otp-slot>
    <ui-input-otp-slot index="1"></ui-input-otp-slot>
    <ui-input-otp-slot index="2"></ui-input-otp-slot>
    <ui-input-otp-slot index="3"></ui-input-otp-slot>
  </ui-input-otp-group>
</ui-input-otp>`,
    },
  ],
  kbd: [
    {
      label: 'Combinations',
      html: `<ui-kbd>Ctrl</ui-kbd> + <ui-kbd>C</ui-kbd>
<span style="margin:0 16px"></span>
<ui-kbd>Ctrl</ui-kbd> + <ui-kbd>V</ui-kbd>
<span style="margin:0 16px"></span>
<ui-kbd>Shift</ui-kbd> + <ui-kbd>Enter</ui-kbd>
<span style="margin:0 16px"></span>
<ui-kbd>Esc</ui-kbd>`,
    },
  ],
  'copy-button': [
    {
      html: `<ui-copy-button value="Hello, World!">Copy Text</ui-copy-button>
<ui-copy-button value="npm install storybook-lit">Copy Command</ui-copy-button>`,
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
      label: 'Dates',
      html: `<div style="display:flex;flex-direction:column;gap:8px">
<span>1 day ago: <ui-relative-time datetime="${new Date(Date.now() - 86400000).toISOString()}"></ui-relative-time></span>
<span>1 week ago: <ui-relative-time datetime="${new Date(Date.now() - 604800000).toISOString()}"></ui-relative-time></span>
<span>1 month ago: <ui-relative-time datetime="${new Date(Date.now() - 2592000000).toISOString()}"></ui-relative-time></span>
</div>`,
    },
  ],
  'format-date': [
    {
      label: 'Formats',
      html: `<div style="display:flex;flex-direction:column;gap:8px">
<span>Default: <ui-format-date></ui-format-date></span>
<span>Long: <ui-format-date date-style="long"></ui-format-date></span>
<span>Full: <ui-format-date date-style="full"></ui-format-date></span>
</div>`,
    },
  ],
  'format-number': [
    {
      label: 'Formats',
      html: `<div style="display:flex;flex-direction:column;gap:8px">
<span>Currency: <ui-format-number value="1234567.89" style="currency" currency="USD"></ui-format-number></span>
<span>Percent: <ui-format-number value="0.856" style="percent"></ui-format-number></span>
<span>Decimal: <ui-format-number value="1234567.89" style="decimal"></ui-format-number></span>
</div>`,
    },
  ],
  empty: [
    {
      html: `<div style="width:100%;max-width:400px">
<ui-empty>
  <ui-empty-title>No results found</ui-empty-title>
  <ui-empty-description>Try adjusting your search or filter criteria.</ui-empty-description>
  <ui-empty-content>
    <ui-button variant="secondary" size="small">Clear Filters</ui-button>
  </ui-empty-content>
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
    <p style="margin:0 0 12px"><strong>Scrollable Content</strong></p>
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
  <div slot="start" style="padding:16px;background:#f0f9ff;height:100%">Left Panel — Drag the divider</div>
  <div slot="end" style="padding:16px;background:#fef3c7;height:100%">Right Panel</div>
</ui-split-panel>`,
    },
  ],
  toggle: [
    {
      label: 'States',
      html: `<ui-toggle>Default</ui-toggle>
<ui-toggle pressed>Pressed</ui-toggle>
<ui-toggle disabled>Disabled</ui-toggle>`,
    },
  ],
  fab: [
    {
      label: 'Sizes',
      html: `<ui-fab size="small">
  <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
</ui-fab>
<ui-fab>
  <svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
</ui-fab>
<ui-fab size="large">
  <svg slot="icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
</ui-fab>`,
    },
    {
      label: 'Extended',
      html: `<ui-fab extended>
  <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  Add Item
</ui-fab>`,
    },
  ],
  item: [
    {
      html: `<div style="width:100%;max-width:400px">
<ui-item-group>
  <ui-item-header>Settings</ui-item-header>
  <ui-item>
    <ui-item-content>
      <ui-item-title>Profile</ui-item-title>
      <ui-item-description>Update your personal information</ui-item-description>
    </ui-item-content>
  </ui-item>
  <ui-item-separator></ui-item-separator>
  <ui-item>
    <ui-item-content>
      <ui-item-title>Notifications</ui-item-title>
      <ui-item-description>Manage your notification preferences</ui-item-description>
    </ui-item-content>
  </ui-item>
  <ui-item-separator></ui-item-separator>
  <ui-item>
    <ui-item-content>
      <ui-item-title>Security</ui-item-title>
      <ui-item-description>Password and two-factor authentication</ui-item-description>
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
  <ui-list-subheader>Messages</ui-list-subheader>
  <ui-list-item-button selected>
    <ui-list-item-text primary="Inbox" secondary="5 new messages"></ui-list-item-text>
  </ui-list-item-button>
  <ui-list-item-button>
    <ui-list-item-text primary="Drafts" secondary="2 drafts"></ui-list-item-text>
  </ui-list-item-button>
  <ui-list-item-button>
    <ui-list-item-text primary="Sent" secondary="Last sent 2h ago"></ui-list-item-text>
  </ui-list-item-button>
  <ui-list-item-button disabled>
    <ui-list-item-text primary="Spam" secondary="Disabled"></ui-list-item-text>
  </ui-list-item-button>
</ui-list>
</div>`,
    },
  ],
  stepper: [
    {
      label: 'Step 2 of 3',
      html: `<div style="width:100%;max-width:500px">
<ui-stepper active-step="1">
  <ui-step completed>
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
    {
      label: 'All Complete',
      html: `<div style="width:100%;max-width:500px">
<ui-stepper active-step="3">
  <ui-step completed>
    <ui-step-label>Account</ui-step-label>
  </ui-step>
  <ui-step completed>
    <ui-step-label>Details</ui-step-label>
  </ui-step>
  <ui-step completed>
    <ui-step-label>Review</ui-step-label>
  </ui-step>
</ui-stepper>
</div>`,
    },
  ],
  backdrop: [
    {
      html: `<ui-button onclick="var b=this.nextElementSibling;b.open=true;b.addEventListener('close',function(){b.open=false},{once:true})">Show Backdrop</ui-button>
<ui-backdrop>
  <div style="background:white;padding:24px;border-radius:8px;text-align:center">
    <p style="margin:0 0 16px">Click outside or press Escape to close</p>
    <ui-button onclick="this.closest('ui-backdrop').open=false">Close</ui-button>
  </div>
</ui-backdrop>`,
    },
  ],
  'app-bar': [
    {
      label: 'Regular',
      html: `<div style="width:100%;max-width:600px">
<ui-app-bar title="My Application" position="static">
  <span slot="navigation" style="font-size:20px;cursor:pointer">&#9776;</span>
  <div slot="actions">
    <ui-button variant="secondary" size="small">Login</ui-button>
  </div>
</ui-app-bar>
</div>`,
    },
    {
      label: 'Dense',
      html: `<div style="width:100%;max-width:600px">
<ui-app-bar title="Dense Bar" position="static" variant="dense">
  <div slot="actions">
    <ui-button variant="secondary" size="small">Action</ui-button>
  </div>
</ui-app-bar>
</div>`,
    },
  ],
  autocomplete: [
    {
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<ui-autocomplete label="Movie" placeholder="Search movies..." style="width:260px" data-options="shawshank:The Shawshank Redemption,godfather:The Godfather,dark-knight:The Dark Knight,pulp-fiction:Pulp Fiction,forrest-gump:Forrest Gump,inception:Inception,matrix:The Matrix,interstellar:Interstellar"></ui-autocomplete>
<ui-autocomplete label="Disabled" disabled placeholder="Disabled" style="width:260px"></ui-autocomplete>
</div>`,
    },
  ],
  'bottom-navigation': [
    {
      label: 'With Labels',
      html: `<div style="width:100%;max-width:400px">
<ui-bottom-navigation value="recents" show-labels>
  <ui-bottom-navigation-action label="Recents" value="recents">
    <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
  </ui-bottom-navigation-action>
  <ui-bottom-navigation-action label="Favorites" value="favs">
    <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path></svg>
  </ui-bottom-navigation-action>
  <ui-bottom-navigation-action label="Nearby" value="nearby">
    <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  </ui-bottom-navigation-action>
</ui-bottom-navigation>
</div>`,
    },
  ],
  box: [
    {
      label: 'Styles',
      html: `<ui-box bgcolor="primary" color="white" p="16px" border-radius="8px">Primary Box</ui-box>
<ui-box bgcolor="#f3f4f6" p="16px" border-radius="8px">Gray Box</ui-box>
<ui-box p="16px" border-radius="8px" style="border:2px dashed #d1d5db">Dashed Border</ui-box>`,
    },
  ],
  command: [
    {
      html: `<div style="width:100%;max-width:400px">
<ui-command style="border:1px solid #e5e7eb;border-radius:8px">
  <ui-command-input placeholder="Type a command or search..."></ui-command-input>
  <ui-command-list>
    <ui-command-group heading="Suggestions">
      <ui-command-item value="calendar">Calendar</ui-command-item>
      <ui-command-item value="search">Search</ui-command-item>
      <ui-command-item value="settings">Settings</ui-command-item>
    </ui-command-group>
    <ui-command-separator></ui-command-separator>
    <ui-command-group heading="Actions">
      <ui-command-item value="copy">Copy</ui-command-item>
      <ui-command-item value="paste">Paste</ui-command-item>
    </ui-command-group>
    <ui-command-empty>No results found.</ui-command-empty>
  </ui-command-list>
</ui-command>
</div>`,
    },
  ],
  container: [
    {
      label: 'Max Widths',
      html: `<div style="width:100%;display:flex;flex-direction:column;gap:8px">
<ui-container max-width="sm"><ui-paper elevation="1" style="padding:12px;text-align:center">sm</ui-paper></ui-container>
<ui-container max-width="md"><ui-paper elevation="1" style="padding:12px;text-align:center">md</ui-paper></ui-container>
<ui-container max-width="lg"><ui-paper elevation="1" style="padding:12px;text-align:center">lg</ui-paper></ui-container>
</div>`,
    },
  ],
  'date-field': [
    {
      label: 'States',
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<ui-date-field label="Date" value="2025-12-31" style="width:200px"></ui-date-field>
<ui-date-field label="Empty" style="width:200px"></ui-date-field>
<ui-date-field label="Disabled" disabled value="2025-06-15" style="width:200px"></ui-date-field>
</div>`,
    },
  ],
  'date-picker': [
    {
      label: 'States',
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<ui-date-picker label="Pick a date" style="width:260px"></ui-date-picker>
<ui-date-picker label="Disabled" disabled style="width:260px"></ui-date-picker>
</div>`,
    },
  ],
  'date-range-picker': [
    {
      html: `<ui-date-range-picker label="Date range" style="width:340px"></ui-date-range-picker>`,
    },
  ],
  grid: [
    {
      label: 'Responsive Grid',
      html: `<ui-grid container spacing="2" style="width:100%">
  <ui-grid xs="12" md="6"><ui-paper elevation="1" style="padding:16px;text-align:center">xs=12 md=6</ui-paper></ui-grid>
  <ui-grid xs="12" md="6"><ui-paper elevation="1" style="padding:16px;text-align:center">xs=12 md=6</ui-paper></ui-grid>
  <ui-grid xs="6" md="3"><ui-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</ui-paper></ui-grid>
  <ui-grid xs="6" md="3"><ui-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</ui-paper></ui-grid>
  <ui-grid xs="6" md="3"><ui-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</ui-paper></ui-grid>
  <ui-grid xs="6" md="3"><ui-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</ui-paper></ui-grid>
</ui-grid>`,
    },
  ],
  'image-comparer': [
    {
      html: `<ui-image-comparer position="50" style="width:100%;max-width:500px">
  <div slot="before" style="width:100%;height:250px;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:18px">Before</div>
  <div slot="after" style="width:100%;height:250px;background:linear-gradient(135deg,#f093fb,#f5576c);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:18px">After</div>
</ui-image-comparer>`,
    },
  ],
  'image-list': [
    {
      html: `<ui-image-list cols="3" gap="8" style="width:100%;max-width:500px">
  <ui-image-list-item><div style="width:100%;height:120px;background:#dbeafe;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#1e40af;font-weight:600">1</div></ui-image-list-item>
  <ui-image-list-item><div style="width:100%;height:120px;background:#e0e7ff;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#3730a3;font-weight:600">2</div></ui-image-list-item>
  <ui-image-list-item><div style="width:100%;height:120px;background:#ede9fe;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#5b21b6;font-weight:600">3</div></ui-image-list-item>
  <ui-image-list-item><div style="width:100%;height:120px;background:#fce7f3;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#9d174d;font-weight:600">4</div></ui-image-list-item>
  <ui-image-list-item><div style="width:100%;height:120px;background:#fef3c7;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#92400e;font-weight:600">5</div></ui-image-list-item>
  <ui-image-list-item><div style="width:100%;height:120px;background:#d1fae5;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#065f46;font-weight:600">6</div></ui-image-list-item>
</ui-image-list>`,
    },
  ],
  menu: [
    {
      html: `<div style="position:relative;display:inline-block">
<ui-button onclick="var m=this.nextElementSibling;m.open=!m.open;if(m.open)m.addEventListener('ui-menu-close',function(){m.open=false},{once:true})">Open Menu</ui-button>
<ui-menu>
  <ui-menu-item>Profile</ui-menu-item>
  <ui-menu-item>Settings</ui-menu-item>
  <ui-menu-divider></ui-menu-divider>
  <ui-menu-group label="Actions">
    <ui-menu-item>Export</ui-menu-item>
    <ui-menu-item disabled>Delete</ui-menu-item>
  </ui-menu-group>
  <ui-menu-divider></ui-menu-divider>
  <ui-menu-item>Logout</ui-menu-item>
</ui-menu>
</div>`,
    },
  ],
  menubar: [
    {
      html: `<div style="width:100%;max-width:500px">
<ui-menubar>
  <ui-menubar-menu>
    <ui-menubar-trigger>File</ui-menubar-trigger>
    <ui-menubar-content>
      <ui-menubar-item>New <ui-menubar-shortcut>Ctrl+N</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-item>Open <ui-menubar-shortcut>Ctrl+O</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-item>Save <ui-menubar-shortcut>Ctrl+S</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-separator></ui-menubar-separator>
      <ui-menubar-item>Exit</ui-menubar-item>
    </ui-menubar-content>
  </ui-menubar-menu>
  <ui-menubar-menu>
    <ui-menubar-trigger>Edit</ui-menubar-trigger>
    <ui-menubar-content>
      <ui-menubar-item>Undo <ui-menubar-shortcut>Ctrl+Z</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-item>Redo <ui-menubar-shortcut>Ctrl+Y</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-separator></ui-menubar-separator>
      <ui-menubar-item>Cut <ui-menubar-shortcut>Ctrl+X</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-item>Copy <ui-menubar-shortcut>Ctrl+C</ui-menubar-shortcut></ui-menubar-item>
      <ui-menubar-item>Paste <ui-menubar-shortcut>Ctrl+V</ui-menubar-shortcut></ui-menubar-item>
    </ui-menubar-content>
  </ui-menubar-menu>
  <ui-menubar-menu>
    <ui-menubar-trigger>View</ui-menubar-trigger>
    <ui-menubar-content>
      <ui-menubar-item>Zoom In</ui-menubar-item>
      <ui-menubar-item>Zoom Out</ui-menubar-item>
      <ui-menubar-separator></ui-menubar-separator>
      <ui-menubar-item>Full Screen</ui-menubar-item>
    </ui-menubar-content>
  </ui-menubar-menu>
</ui-menubar>
</div>`,
    },
  ],
  'navigation-menu': [
    {
      html: `<ui-navigation-menu>
  <ui-navigation-menu-list>
    <ui-navigation-menu-item>
      <ui-navigation-menu-link href="#">Home</ui-navigation-menu-link>
    </ui-navigation-menu-item>
    <ui-navigation-menu-item>
      <ui-navigation-menu-trigger content-id="nav-docs">Documentation</ui-navigation-menu-trigger>
      <ui-navigation-menu-content id="nav-docs">
        <ui-navigation-menu-link href="#">Getting Started</ui-navigation-menu-link>
        <ui-navigation-menu-link href="#">Components</ui-navigation-menu-link>
        <ui-navigation-menu-link href="#">API Reference</ui-navigation-menu-link>
      </ui-navigation-menu-content>
    </ui-navigation-menu-item>
    <ui-navigation-menu-item>
      <ui-navigation-menu-link href="#">About</ui-navigation-menu-link>
    </ui-navigation-menu-item>
    <ui-navigation-menu-item>
      <ui-navigation-menu-link href="#">Contact</ui-navigation-menu-link>
    </ui-navigation-menu-item>
  </ui-navigation-menu-list>
</ui-navigation-menu>`,
    },
  ],
  resizable: [
    {
      label: 'Horizontal',
      html: `<div style="width:100%;max-width:500px">
<ui-resizable-group orientation="horizontal" style="height:200px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
  <ui-resizable-panel default-size="40">
    <div style="padding:16px;height:100%;background:#f0f9ff;display:flex;align-items:center;justify-content:center">Panel A</div>
  </ui-resizable-panel>
  <ui-resizable-handle with-handle></ui-resizable-handle>
  <ui-resizable-panel default-size="60">
    <div style="padding:16px;height:100%;background:#fefce8;display:flex;align-items:center;justify-content:center">Panel B</div>
  </ui-resizable-panel>
</ui-resizable-group>
</div>`,
    },
    {
      label: 'Three Panels',
      html: `<div style="width:100%;max-width:600px">
<ui-resizable-group orientation="horizontal" style="height:180px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
  <ui-resizable-panel default-size="25">
    <div style="padding:12px;height:100%;background:#f0f9ff;display:flex;align-items:center;justify-content:center;font-size:14px">Sidebar</div>
  </ui-resizable-panel>
  <ui-resizable-handle with-handle></ui-resizable-handle>
  <ui-resizable-panel default-size="50">
    <div style="padding:12px;height:100%;display:flex;align-items:center;justify-content:center;font-size:14px">Main</div>
  </ui-resizable-panel>
  <ui-resizable-handle with-handle></ui-resizable-handle>
  <ui-resizable-panel default-size="25">
    <div style="padding:12px;height:100%;background:#fef3c7;display:flex;align-items:center;justify-content:center;font-size:14px">Detail</div>
  </ui-resizable-panel>
</ui-resizable-group>
</div>`,
    },
  ],
  sonner: [
    {
      label: 'Toast Types',
      html: `<ui-toaster position="bottom-right"></ui-toaster>
<ui-button onclick="import('storybook-lit').then(m=>m.toast('Default toast message'))">Default</ui-button>
<ui-button onclick="import('storybook-lit').then(m=>m.toast.success('Operation successful!'))">Success</ui-button>
<ui-button onclick="import('storybook-lit').then(m=>m.toast.error('Something went wrong'))">Error</ui-button>
<ui-button onclick="import('storybook-lit').then(m=>m.toast.info('Here is some info'))">Info</ui-button>`,
    },
  ],
  'speed-dial': [
    {
      html: `<div style="position:relative;height:200px;width:100%">
<ui-speed-dial style="position:absolute;bottom:16px;right:16px" aria-label="Actions">
  <ui-speed-dial-action tooltip-title="Copy">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
  </ui-speed-dial-action>
  <ui-speed-dial-action tooltip-title="Share">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
  </ui-speed-dial-action>
  <ui-speed-dial-action tooltip-title="Print">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
  </ui-speed-dial-action>
</ui-speed-dial>
</div>`,
    },
  ],
  stack: [
    {
      label: 'Row',
      html: `<ui-stack direction="row" gap="2" align-items="center">
  <ui-paper elevation="1" style="padding:12px">Item 1</ui-paper>
  <ui-paper elevation="1" style="padding:12px">Item 2</ui-paper>
  <ui-paper elevation="1" style="padding:12px">Item 3</ui-paper>
</ui-stack>`,
    },
    {
      label: 'Column',
      html: `<ui-stack direction="column" gap="2" style="width:100%;max-width:200px">
  <ui-paper elevation="1" style="padding:12px;text-align:center">Item 1</ui-paper>
  <ui-paper elevation="1" style="padding:12px;text-align:center">Item 2</ui-paper>
  <ui-paper elevation="1" style="padding:12px;text-align:center">Item 3</ui-paper>
</ui-stack>`,
    },
  ],
  table: [
    {
      html: `<div style="width:100%;max-width:500px">
<ui-table-container>
  <ui-table>
    <ui-table-head>
      <ui-table-row>
        <ui-table-cell header>Name</ui-table-cell>
        <ui-table-cell header>Role</ui-table-cell>
        <ui-table-cell header align="right">Score</ui-table-cell>
      </ui-table-row>
    </ui-table-head>
    <ui-table-body>
      <ui-table-row>
        <ui-table-cell>Alice</ui-table-cell>
        <ui-table-cell>Engineer</ui-table-cell>
        <ui-table-cell align="right">92</ui-table-cell>
      </ui-table-row>
      <ui-table-row selected>
        <ui-table-cell>Bob</ui-table-cell>
        <ui-table-cell>Designer</ui-table-cell>
        <ui-table-cell align="right">87</ui-table-cell>
      </ui-table-row>
      <ui-table-row>
        <ui-table-cell>Carol</ui-table-cell>
        <ui-table-cell>Manager</ui-table-cell>
        <ui-table-cell align="right">95</ui-table-cell>
      </ui-table-row>
      <ui-table-row>
        <ui-table-cell>Dave</ui-table-cell>
        <ui-table-cell>Analyst</ui-table-cell>
        <ui-table-cell align="right">78</ui-table-cell>
      </ui-table-row>
    </ui-table-body>
  </ui-table>
</ui-table-container>
</div>`,
    },
  ],
  'time-picker': [
    {
      label: 'Desktop (Digital Clock Popover)',
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<ui-time-picker label="Time" value="14:30:00" style="width:200px"></ui-time-picker>
<ui-time-picker label="With Seconds" value="09:15:45" seconds style="width:200px"></ui-time-picker>
<ui-time-picker label="Disabled" disabled value="08:00:00" style="width:200px"></ui-time-picker>
</div>`,
    },
    {
      label: 'Mobile (Analog Clock Dialog)',
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<ui-time-picker label="Tap to open clock" variant="mobile" value="10:30:00" style="width:200px"></ui-time-picker>
<ui-time-picker label="With Seconds" variant="mobile" value="15:45:30" seconds style="width:200px"></ui-time-picker>
</div>`,
    },
    {
      label: 'Analog Clock (Standalone)',
      html: `<div style="display:flex;gap:24px;flex-wrap:wrap;align-items:start">
<ui-time-clock value="10:10:00" ampm></ui-time-clock>
<ui-time-clock value="15:45:00"></ui-time-clock>
</div>`,
    },
    {
      label: 'Digital Clock',
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<ui-digital-clock value="14:30:00" ampm></ui-digital-clock>
<ui-digital-clock value="09:15:00"></ui-digital-clock>
</div>`,
    },
    {
      label: 'Multi-Section Digital Clock',
      html: `<ui-multi-section-digital-clock value="14:30:00" ampm></ui-multi-section-digital-clock>`,
    },
    {
      label: 'Static Time Picker',
      html: `<ui-static-time-picker value="11:00:00" ampm></ui-static-time-picker>`,
    },
  ],
  'transfer-list': [
    {
      html: `<div style="width:100%;max-width:550px">
<ui-transfer-list left-title="Available" right-title="Selected" searchable data-options="js:JavaScript,ts:TypeScript,py:Python,rust:Rust,go:Go,java:Java,cpp:C++,ruby:Ruby"></ui-transfer-list>
</div>`,
    },
  ],
  'tree-view': [
    {
      html: `<div style="width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px">
<ui-simple-tree-view>
  <ui-tree-item item-id="1" label="Documents">
    <ui-tree-item item-id="1-1" label="Resume.pdf"></ui-tree-item>
    <ui-tree-item item-id="1-2" label="Cover Letter.pdf"></ui-tree-item>
  </ui-tree-item>
  <ui-tree-item item-id="2" label="Images">
    <ui-tree-item item-id="2-1" label="photo.jpg"></ui-tree-item>
    <ui-tree-item item-id="2-2" label="screenshot.png"></ui-tree-item>
    <ui-tree-item item-id="2-3" label="icon.svg"></ui-tree-item>
  </ui-tree-item>
  <ui-tree-item item-id="3" label="Notes.txt"></ui-tree-item>
</ui-simple-tree-view>
</div>`,
    },
  ],
  'ui-range-slider': [
    {
      html: `<div style="display:flex;flex-direction:column;gap:16px;width:100%;max-width:300px">
<ui-range-slider min="0" max="100" label="Price range" show-value></ui-range-slider>
<ui-range-slider min="0" max="100" label="Disabled" disabled show-value></ui-range-slider>
</div>`,
    },
  ],
  'visually-hidden': [
    {
      html: `<p style="margin:0;color:#374151">The link below has visually hidden text for screen readers:</p>
<a href="#" style="color:var(--ui-primary-color)">
  Download Report
  <ui-visually-hidden>(opens in a new tab)</ui-visually-hidden>
</a>`,
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
  // HTML is passed as a prop (not slot) so Vue doesn't compile the custom elements.
  // Demo.vue injects it via innerHTML, letting Lit fully own the DOM subtree.
  const demos = DEMOS[dir];
  if (demos) {
    for (const demo of demos) {
      const escapedHtml = demo.html
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '');
      const labelAttr = demo.label ? ` label="${demo.label}"` : '';
      md += `<Demo${labelAttr} html="${escapedHtml}" />\n\n`;
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
