/**
 * Generates markdown documentation for each component.
 * Data source: Custom Elements Manifest (packages/core/dist/custom-elements.json)
 * Usage: npx tsx scripts/generate-docs.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseCem } from './lib/parse-cem.js';
import type { ComponentMeta } from './lib/types.js';

const SRC_DIR = path.resolve('packages/core/src');
const DOCS_DIR = path.resolve('docs/components');
const CEM_PATH = path.resolve('packages/core/dist/custom-elements.json');

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

interface CssPartInfo {
  name: string;
  description: string;
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
  cssParts: CssPartInfo[];
  cssVars: CssVarInfo[];
  methods: MethodInfo[];
  formAssociated: boolean;
}

/**
 * Convert CEM-derived ComponentMeta to the docs generator's ComponentInfo format.
 */
function cemToComponentInfo(meta: ComponentMeta): ComponentInfo {
  return {
    tagName: meta.tagName,
    className: meta.className,
    description: meta.description,
    props: meta.props.map(p => ({
      name: p.name,
      type: p.tsType,
      default: p.defaultValue,
      reflect: p.reflect,
      attribute: p.attribute,
      description: p.description,
    })),
    events: meta.events.map(e => ({
      name: e.domName,
      detail: e.detailType ?? '',
      description: e.description,
    })),
    slots: meta.slots.map(s => ({
      name: s.name,
      description: s.description,
    })),
    cssParts: meta.cssParts.map(p => ({
      name: p.name,
      description: p.description,
    })),
    cssVars: meta.cssProperties.map(c => ({
      name: c.name,
      default: c.defaultValue === '—' ? '' : c.defaultValue,
    })),
    methods: meta.methods.map(m => ({
      name: m.signature.split('(')[0],
      signature: m.signature,
      description: m.description,
    })),
    formAssociated: false, // Could be derived from CEM if needed
  };
}

/**
 * Read all component metadata from CEM, grouped by source directory.
 * Returns Map<dirName, ComponentInfo[]>.
 */
function readComponentsFromCem(): Map<string, ComponentInfo[]> {
  const allMeta = parseCem({ cemPath: CEM_PATH });
  const groups = new Map<string, ComponentInfo[]>();

  for (const meta of allMeta) {
    // Extract directory from source path: "src/button/flint-button.component.ts" → "button"
    const dir = meta.sourceFile.replace(/^src\//, '').split('/')[0];
    if (!groups.has(dir)) groups.set(dir, []);
    groups.get(dir)!.push(cemToComponentInfo(meta));
  }

  // Also augment with CSS vars from actual CSS files (CEM may not capture all)
  for (const [dir, components] of groups) {
    const dirPath = path.join(SRC_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;
    const cssFiles = fs.readdirSync(dirPath).filter(f => f.endsWith('.css'));
    if (cssFiles.length === 0) continue;

    let cssContent = '';
    for (const f of cssFiles) {
      cssContent += fs.readFileSync(path.join(dirPath, f), 'utf-8') + '\n';
    }

    const cssVars = extractCssVars(cssContent);
    if (cssVars.length === 0) continue;

    // Distribute CSS vars to components by tag-name prefix
    for (const comp of components) {
      const prefix = `--${comp.tagName}`;
      const matching = cssVars.filter(v => v.name.startsWith(prefix));
      if (matching.length > 0) {
        // Merge with existing, avoiding duplicates
        const existing = new Set(comp.cssVars.map(v => v.name));
        for (const v of matching) {
          if (!existing.has(v.name)) comp.cssVars.push(v);
        }
      }
    }
    // Unmatched vars go to first component
    const assigned = new Set(components.flatMap(c => c.cssVars.map(v => v.name)));
    const unassigned = cssVars.filter(v => !assigned.has(v.name));
    if (unassigned.length > 0 && components.length > 0) {
      const existing = new Set(components[0].cssVars.map(v => v.name));
      for (const v of unassigned) {
        if (!existing.has(v.name)) components[0].cssVars.push(v);
      }
    }
  }

  return groups;
}

// Keep for CSS var augmentation
function extractCssVars(cssContent: string): CssVarInfo[] {
  const vars: CssVarInfo[] = [];
  const seen = new Set<string>();
  const varRegex = /var\(\s*(--flint-[a-z0-9-]+)(?:\s*,\s*([^)]+))?\s*\)/g;
  let m;
  while ((m = varRegex.exec(cssContent)) !== null) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      vars.push({ name: m[1], default: m[2]?.trim() || '' });
    }
  }
  const declRegex = /(--flint-[a-z0-9-]+)\s*:\s*([^;]+);/g;
  while ((m = declRegex.exec(cssContent)) !== null) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      vars.push({ name: m[1], default: m[2].trim() });
    }
  }
  return vars;
}

// Legacy function kept for reference but no longer called from main
function _extractComponents(tsContent: string, cssContent: string): ComponentInfo[] {
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
  // Match @property with optional JSDoc comment before it (supports multi-line JSDoc)
  // Capture the entire tail after the prop name (type + default) as one group, then split later
  const propRegex = /(?:\/\*\*([\s\S]*?)\*\/\s*)?@property\(\s*(\{[^}]*\})?\s*\)\s*(?:override\s+)?(\w+)\??([\s\S]*?);/g;
  let m;

  while ((m = propRegex.exec(classBody)) !== null) {
    // Clean multi-line JSDoc: strip leading * and join into one line
    const rawDoc = m[1] || '';
    const description = rawDoc
      .split('\n')
      .map(line => line.replace(/^\s*\*\s?/, '').trim())
      .filter(line => line && !line.startsWith('@'))
      .join(' ')
      .trim();
    const opts = m[2] || '{}';
    const name = m[3];

    // Parse the tail: could be `: Type = default` or `= default` or just `: Type`
    const tail = m[4]?.trim() || '';
    let typeAnnotation = '';
    let defaultVal = '';

    if (tail.includes('=')) {
      // Find the last top-level `=` (not inside parens/generics)
      let depth = 0;
      let lastEqIdx = -1;
      for (let i = 0; i < tail.length; i++) {
        const ch = tail[i];
        if (ch === '(' || ch === '<') depth++;
        else if (ch === ')' || ch === '>') depth--;
        else if (ch === '=' && depth === 0 && tail[i + 1] !== '>') {
          lastEqIdx = i;
        }
      }
      if (lastEqIdx >= 0) {
        const beforeEq = tail.slice(0, lastEqIdx).trim();
        defaultVal = tail.slice(lastEqIdx + 1).trim();
        // Strip leading `:` or `?:` from the type annotation
        typeAnnotation = beforeEq.replace(/^[:?]+\s*/, '').trim();
      }
    } else if (tail.startsWith(':')) {
      typeAnnotation = tail.slice(1).trim();
    }

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

  // Public methods and getters: line-by-line approach with JSDoc tracking
  const lines = classBody.split('\n');
  let pendingDoc = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Collect single-line JSDoc: /** text */
    const singleJsDoc = line.match(/^\/\*\*\s*(.*?)\s*\*\/$/);
    if (singleJsDoc) {
      pendingDoc = singleJsDoc[1].replace(/@\w+.*/g, '').trim();
      continue;
    }

    // Detect start of multi-line JSDoc: /**
    if (line.startsWith('/**')) {
      const docLines: string[] = [];
      for (let j = i + 1; j < lines.length; j++) {
        const dl = lines[j].trim();
        if (dl.endsWith('*/') || dl === '*/') break;
        const cleaned = dl.replace(/^\*\s?/, '').trim();
        if (cleaned && !cleaned.startsWith('@')) docLines.push(cleaned);
      }
      pendingDoc = docLines.join(' ').trim();
      continue;
    }

    // Match getter: get name(): ReturnType {
    const getterMatch = line.match(/^(?:override\s+)?get\s+(\w+)\s*\(\s*\)(?:\s*:\s*(.+?))?\s*\{/);
    if (getterMatch) {
      const name = getterMatch[1];
      const returnType = getterMatch[2]?.trim() || 'unknown';
      if (!name.startsWith('_') && !skipMethods.has(name) && !seen.has(name)) {
        seen.add(name);
        methods.push({ name, signature: `${name}(): ${returnType}`, description: pendingDoc });
      }
      pendingDoc = '';
      continue;
    }

    // Match method: name(params): ReturnType {
    const methodMatch = line.match(/^(?:override\s+)?(\w+)\s*\(([^)]*)\)(?:\s*:\s*([^\s{]+))?\s*\{/);
    if (methodMatch) {
      const name = methodMatch[1];
      const params = methodMatch[2]?.trim() || '';
      const returnType = methodMatch[3]?.trim() || 'void';
      if (!name.startsWith('_') && !skipMethods.has(name) && !seen.has(name)
          && !name.startsWith('handle') && !name.startsWith('on')) {
        seen.add(name);
        methods.push({
          name,
          signature: `${name}(${params})${returnType !== 'void' ? `: ${returnType}` : ''}`,
          description: pendingDoc,
        });
      }
      pendingDoc = '';
      continue;
    }

    // Reset pending doc if line is not JSDoc continuation
    if (!line.startsWith('*') && line !== '') {
      pendingDoc = '';
    }
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
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap">
<flint-button variant="primary">Primary</flint-button>
<flint-button variant="secondary">Secondary</flint-button>
<flint-button variant="destructive">Destructive</flint-button>
</div>`,
    },
    {
      label: 'Sizes',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
<flint-button size="small">Small</flint-button>
<flint-button size="medium">Medium</flint-button>
<flint-button size="large">Large</flint-button>
</div>`,
    },
    {
      label: 'States',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
<flint-button disabled>Disabled</flint-button>
<flint-button full-width>Full Width</flint-button>
</div>`,
    },
    {
      label: 'Button Group',
      html: `<flint-button-group>
  <flint-button variant="secondary">Left</flint-button>
  <flint-button variant="secondary">Center</flint-button>
  <flint-button variant="secondary">Right</flint-button>
</flint-button-group>`,
    },
    {
      label: 'Toggle Buttons',
      html: `<flint-toggle-button-group exclusive>
  <flint-toggle-button value="left">Left</flint-toggle-button>
  <flint-toggle-button value="center" selected>Center</flint-toggle-button>
  <flint-toggle-button value="right">Right</flint-toggle-button>
</flint-toggle-button-group>`,
    },
  ],
  alert: [
    {
      label: 'Severities',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%">
<flint-alert severity="info" title="Info">This is an informational message.</flint-alert>
<flint-alert severity="success" title="Success">Operation completed successfully.</flint-alert>
<flint-alert severity="warning" title="Warning">Please review before continuing.</flint-alert>
<flint-alert severity="error" title="Error">Something went wrong.</flint-alert>
</div>`,
    },
    {
      label: 'Dismissible',
      html: `<div style="width:100%">
<flint-alert severity="info" title="Dismissible" dismissible>Click the close button to dismiss this alert.</flint-alert>
</div>`,
    },
    {
      label: 'Without Title',
      html: `<div style="width:100%">
<flint-alert severity="success">A simple success alert without a title.</flint-alert>
</div>`,
    },
  ],
  badge: [
    {
      label: 'Content',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap">
<flint-badge content="4">
  <div style="width:40px;height:40px;border-radius:8px;background:#e5e7eb;display:flex;align-items:center;justify-content:center">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
  </div>
</flint-badge>
<flint-badge content="99+" variant="error">
  <div style="width:40px;height:40px;border-radius:8px;background:#e5e7eb;display:flex;align-items:center;justify-content:center">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
  </div>
</flint-badge>
</div>`,
    },
    {
      label: 'Variants',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap">
<flint-badge content="3" variant="primary"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge>
<flint-badge content="3" variant="secondary"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge>
<flint-badge content="3" variant="success"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge>
<flint-badge content="3" variant="warning"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge>
<flint-badge content="3" variant="error"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge>
</div>`,
    },
    {
      label: 'Dot',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-badge dot><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge>
<flint-badge dot variant="error"><div style="width:30px;height:30px;border-radius:6px;background:#e5e7eb"></div></flint-badge></div>`,
    },
  ],
  avatar: [
    {
      label: 'Image',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></flint-avatar>
<flint-avatar src="https://i.pravatar.cc/150?img=2" alt="User 2"></flint-avatar>
<flint-avatar src="https://i.pravatar.cc/150?img=3" alt="User 3"></flint-avatar></div>`,
    },
    {
      label: 'Initials',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-avatar>AB</flint-avatar>
<flint-avatar>CD</flint-avatar>
<flint-avatar>EF</flint-avatar></div>`,
    },
  ],
  chip: [
    {
      label: 'Variants',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-chip label="Filled" variant="filled"></flint-chip>
<flint-chip label="Outlined" variant="outlined"></flint-chip>
<flint-chip label="Primary" variant="filled" color="primary"></flint-chip>
<flint-chip label="Secondary" variant="filled" color="secondary"></flint-chip></div>`,
    },
    {
      label: 'Sizes',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><flint-chip label="Small" size="sm"></flint-chip>
<flint-chip label="Medium" size="md"></flint-chip>
<flint-chip label="Large" size="lg"></flint-chip></div>`,
    },
    {
      label: 'Interactive',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-chip label="Clickable" clickable></flint-chip>
<flint-chip label="Deletable" deletable></flint-chip>
<flint-chip label="Both" clickable deletable></flint-chip>
<flint-chip label="Disabled" disabled></flint-chip></div>`,
    },
  ],
  switch: [
    {
      label: 'Sizes',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><flint-switch size="sm"></flint-switch>
<flint-switch size="md"></flint-switch>
<flint-switch size="lg"></flint-switch></div>`,
    },
    {
      label: 'States',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-switch></flint-switch>
<flint-switch default-checked></flint-switch>
<flint-switch disabled></flint-switch>
<flint-switch default-checked disabled></flint-switch></div>`,
    },
  ],
  checkbox: [
    {
      label: 'States',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-checkbox label="Unchecked"></flint-checkbox>
<flint-checkbox label="Checked" checked></flint-checkbox>
<flint-checkbox label="Indeterminate" indeterminate></flint-checkbox>
<flint-checkbox label="Disabled" disabled></flint-checkbox>
<flint-checkbox label="Checked Disabled" checked disabled></flint-checkbox></div>`,
    },
  ],
  radio: [
    {
      label: 'Basic',
      html: `<flint-radio-group value="a">
  <flint-radio value="a" label="Option A"></flint-radio>
  <flint-radio value="b" label="Option B"></flint-radio>
  <flint-radio value="c" label="Option C"></flint-radio>
</flint-radio-group>`,
    },
    {
      label: 'Disabled',
      html: `<flint-radio-group value="x">
  <flint-radio value="x" label="Selected" disabled></flint-radio>
  <flint-radio value="y" label="Disabled" disabled></flint-radio>
</flint-radio-group>`,
    },
  ],
  input: [
    {
      label: 'Types',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<flint-input label="Text" placeholder="Enter your name"></flint-input>
<flint-input label="Email" type="email" placeholder="you@example.com"></flint-input>
<flint-input label="Password" type="password" value="secret123"></flint-input>
<flint-input label="Search" type="search" placeholder="Search..."></flint-input>
</div>`,
    },
    {
      label: 'States',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<flint-input label="Disabled" disabled value="Cannot edit"></flint-input>
<flint-input label="Readonly" readonly value="Read only value"></flint-input>
<flint-input label="Error" error value="Invalid input" help-text="This field has an error"></flint-input>
</div>`,
    },
    {
      label: 'Sizes',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<flint-input label="Small" size="sm" placeholder="Small"></flint-input>
<flint-input label="Default" placeholder="Default"></flint-input>
<flint-input label="Large" size="lg" placeholder="Large"></flint-input>
</div>`,
    },
  ],
  'text-field': [
    {
      label: 'States',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
<flint-text-field label="Name" placeholder="Enter your name"></flint-text-field>
<flint-text-field label="With Help" help-text="This field is required"></flint-text-field>
<flint-text-field label="Error" error help-text="Please enter a valid email"></flint-text-field>
<flint-text-field label="Disabled" disabled value="Cannot edit"></flint-text-field>
</div>`,
    },
  ],
  textarea: [
    {
      label: 'States',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:400px">
<flint-textarea label="Message" placeholder="Type your message..."></flint-textarea>
<flint-textarea label="Disabled" disabled value="This textarea is disabled"></flint-textarea>
</div>`,
    },
  ],
  select: [
    {
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<flint-select label="Fruit" placeholder="Pick one" style="width:220px" data-options="apple:Apple,banana:Banana,cherry:Cherry,grape:Grape,mango:Mango"></flint-select>
<flint-select label="Disabled" disabled placeholder="Disabled" style="width:220px"></flint-select>
</div>`,
    },
  ],
  slider: [
    {
      label: 'Values',
      html: `<div style="display:flex;flex-direction:column;gap:16px;width:100%;max-width:300px">
<flint-slider value="25"></flint-slider>
<flint-slider value="50"></flint-slider>
<flint-slider value="75"></flint-slider>
</div>`,
    },
    {
      label: 'Disabled',
      html: `<div style="width:100%;max-width:300px">
<flint-slider value="40" disabled></flint-slider>
</div>`,
    },
  ],
  rating: [
    {
      label: 'Interactive',
      html: `<flint-rating value="0"></flint-rating>`,
    },
    {
      label: 'Values',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-rating value="1" readonly></flint-rating>
<flint-rating value="3" readonly></flint-rating>
<flint-rating value="5" readonly></flint-rating></div>`,
    },
    {
      label: 'Disabled',
      html: `<flint-rating value="3" disabled></flint-rating>`,
    },
  ],
  progress: [
    {
      label: 'Circular Indeterminate',
      html: `<flint-circular-progress></flint-circular-progress>`,
    },
    {
      label: 'Circular Determinate',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><flint-circular-progress value="0"></flint-circular-progress>
<flint-circular-progress value="25"></flint-circular-progress>
<flint-circular-progress value="50"></flint-circular-progress>
<flint-circular-progress value="75"></flint-circular-progress>
<flint-circular-progress value="100"></flint-circular-progress></div>`,
    },
    {
      label: 'Linear Indeterminate',
      html: `<div style="width:100%;max-width:400px">
<flint-linear-progress></flint-linear-progress>
</div>`,
    },
    {
      label: 'Linear Determinate',
      html: `<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:400px">
<flint-linear-progress value="30"></flint-linear-progress>
<flint-linear-progress value="60"></flint-linear-progress>
<flint-linear-progress value="100"></flint-linear-progress>
</div>`,
    },
  ],
  skeleton: [
    {
      label: 'Variants',
      html: `<div style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:300px">
<flint-skeleton variant="circular" width="40px" height="40px"></flint-skeleton>
<flint-skeleton variant="text" width="200px"></flint-skeleton>
<flint-skeleton variant="text" width="160px"></flint-skeleton>
<flint-skeleton variant="rectangular" width="100%" height="120px"></flint-skeleton>
</div>`,
    },
    {
      label: 'Card Placeholder',
      html: `<div style="display:flex;gap:12px;width:100%;max-width:300px">
  <flint-skeleton variant="circular" width="48px" height="48px"></flint-skeleton>
  <div style="flex:1;display:flex;flex-direction:column;gap:6px">
    <flint-skeleton variant="text" width="80%"></flint-skeleton>
    <flint-skeleton variant="text" width="60%"></flint-skeleton>
  </div>
</div>`,
    },
  ],
  card: [
    {
      label: 'Default',
      html: `<div style="max-width:360px;width:100%">
<flint-card>
  <flint-card-header title="Card Title" subtitle="Subtitle text"></flint-card-header>
  <flint-card-content>
    <p style="margin:0;color:#374151">This is a card with header, content, and action buttons.</p>
  </flint-card-content>
  <flint-card-actions>
    <flint-button variant="secondary" size="small">Cancel</flint-button>
    <flint-button size="small">Action</flint-button>
  </flint-card-actions>
</flint-card>
</div>`,
    },
    {
      label: 'Outlined',
      html: `<div style="max-width:360px;width:100%">
<flint-card variant="outlined">
  <flint-card-header title="Outlined Card" subtitle="With border instead of shadow"></flint-card-header>
  <flint-card-content>
    <p style="margin:0;color:#374151">Useful for less prominent content areas.</p>
  </flint-card-content>
</flint-card>
</div>`,
    },
  ],
  paper: [
    {
      label: 'Elevations',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-paper elevation="0" style="padding:16px">Elevation 0</flint-paper>
<flint-paper elevation="1" style="padding:16px">Elevation 1</flint-paper>
<flint-paper elevation="3" style="padding:16px">Elevation 3</flint-paper>
<flint-paper elevation="6" style="padding:16px">Elevation 6</flint-paper>
<flint-paper elevation="12" style="padding:16px">Elevation 12</flint-paper></div>`,
    },
  ],
  accordion: [
    {
      label: 'Basic',
      html: `<div style="width:100%;max-width:500px">
<flint-accordion expanded>
  <flint-accordion-summary>Expanded by default</flint-accordion-summary>
  <flint-accordion-details>This accordion starts open. Click the header to collapse it.</flint-accordion-details>
</flint-accordion>
<flint-accordion>
  <flint-accordion-summary>Collapsed Item</flint-accordion-summary>
  <flint-accordion-details>Click the header above to expand this content.</flint-accordion-details>
</flint-accordion>
<flint-accordion disabled>
  <flint-accordion-summary>Disabled Item</flint-accordion-summary>
  <flint-accordion-details>This item cannot be toggled.</flint-accordion-details>
</flint-accordion>
</div>`,
    },
  ],
  tabs: [
    {
      label: 'Basic',
      html: `<div style="width:100%;max-width:500px">
<flint-tabs value="one">
  <flint-tab-list>
    <flint-tab value="one">Tab One</flint-tab>
    <flint-tab value="two">Tab Two</flint-tab>
    <flint-tab value="three">Tab Three</flint-tab>
  </flint-tab-list>
  <flint-tab-panel value="one"><p style="padding:16px;margin:0">Content for Tab One</p></flint-tab-panel>
  <flint-tab-panel value="two"><p style="padding:16px;margin:0">Content for Tab Two</p></flint-tab-panel>
  <flint-tab-panel value="three"><p style="padding:16px;margin:0">Content for Tab Three</p></flint-tab-panel>
</flint-tabs>
</div>`,
    },
    {
      label: 'With Disabled Tab',
      html: `<div style="width:100%;max-width:500px">
<flint-tabs value="first">
  <flint-tab-list>
    <flint-tab value="first">Active</flint-tab>
    <flint-tab value="second" disabled>Disabled</flint-tab>
    <flint-tab value="third">Also Active</flint-tab>
  </flint-tab-list>
  <flint-tab-panel value="first"><p style="padding:16px;margin:0">First panel content</p></flint-tab-panel>
  <flint-tab-panel value="second"><p style="padding:16px;margin:0">Disabled panel</p></flint-tab-panel>
  <flint-tab-panel value="third"><p style="padding:16px;margin:0">Third panel content</p></flint-tab-panel>
</flint-tabs>
</div>`,
    },
  ],
  divider: [
    {
      label: 'Horizontal',
      html: `<div style="width:100%;max-width:400px">
<p style="margin:0 0 8px">Content above</p>
<flint-divider></flint-divider>
<p style="margin:8px 0 0">Content below</p>
</div>`,
    },
    {
      label: 'Vertical',
      html: `<div style="display:flex;align-items:center;gap:12px;height:40px">
<span>Left</span>
<flint-divider orientation="vertical"></flint-divider>
<span>Right</span>
</div>`,
    },
  ],
  tooltip: [
    {
      label: 'Placements',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-tooltip label="Top tooltip">
  <flint-button variant="secondary">Top</flint-button>
</flint-tooltip>
<flint-tooltip label="Bottom tooltip" placement="bottom">
  <flint-button variant="secondary">Bottom</flint-button>
</flint-tooltip>
<flint-tooltip label="Left tooltip" placement="left">
  <flint-button variant="secondary">Left</flint-button>
</flint-tooltip>
<flint-tooltip label="Right tooltip" placement="right">
  <flint-button variant="secondary">Right</flint-button>
</flint-tooltip></div>`,
    },
  ],
  link: [
    {
      label: 'Underline Styles',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-link href="#">Default</flint-link>
<flint-link href="#" underline="always">Always</flint-link>
<flint-link href="#" underline="none">None</flint-link></div>`,
    },
    {
      label: 'Colors',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-link href="#" color="primary">Primary</flint-link>
<flint-link href="#" color="secondary">Secondary</flint-link>
<flint-link href="#" color="inherit">Inherit</flint-link></div>`,
    },
  ],
  typography: [
    {
      label: 'Headings',
      html: `<div style="display:flex;flex-direction:column;gap:4px;width:100%">
<flint-typography variant="h1">Heading 1</flint-typography>
<flint-typography variant="h2">Heading 2</flint-typography>
<flint-typography variant="h3">Heading 3</flint-typography>
<flint-typography variant="h4">Heading 4</flint-typography>
<flint-typography variant="h5">Heading 5</flint-typography>
<flint-typography variant="h6">Heading 6</flint-typography>
</div>`,
    },
    {
      label: 'Body & Caption',
      html: `<div style="display:flex;flex-direction:column;gap:4px;width:100%">
<flint-typography variant="body1">Body 1 — The quick brown fox jumps over the lazy dog.</flint-typography>
<flint-typography variant="body2">Body 2 — A smaller body text variant for secondary content.</flint-typography>
<flint-typography variant="caption" color="secondary">Caption — Small helper text</flint-typography>
<flint-typography variant="overline">OVERLINE TEXT</flint-typography>
</div>`,
    },
  ],
  breadcrumbs: [
    {
      html: `<flint-breadcrumbs>
  <a href="#">Home</a>
  <a href="#">Products</a>
  <span>Current Page</span>
</flint-breadcrumbs>`,
    },
  ],
  pagination: [
    {
      label: 'Pages',
      html: `<flint-pagination count="10" page="1"></flint-pagination>`,
    },
    {
      label: 'Middle Page',
      html: `<flint-pagination count="20" page="10"></flint-pagination>`,
    },
  ],
  dialog: [
    {
      label: 'Basic',
      html: `<flint-button onclick="var d=this.nextElementSibling;d.open=true;d.addEventListener('flint-dialog-close',function(){d.open=false},{once:true})">Open Dialog</flint-button>
<flint-dialog>
  <flint-dialog-title>Confirm Action</flint-dialog-title>
  <flint-dialog-content>
    <flint-dialog-content-text>Are you sure you want to proceed? This action cannot be undone.</flint-dialog-content-text>
  </flint-dialog-content>
  <flint-dialog-actions>
    <flint-button variant="secondary" onclick="this.closest('flint-dialog').open=false">Cancel</flint-button>
    <flint-button onclick="this.closest('flint-dialog').open=false">Confirm</flint-button>
  </flint-dialog-actions>
</flint-dialog>`,
    },
    {
      label: 'Destructive',
      html: `<flint-button variant="destructive" onclick="var d=this.nextElementSibling;d.open=true;d.addEventListener('flint-dialog-close',function(){d.open=false},{once:true})">Delete Account</flint-button>
<flint-dialog>
  <flint-dialog-title>Delete Account?</flint-dialog-title>
  <flint-dialog-content>
    <flint-dialog-content-text>This will permanently delete your account and all associated data.</flint-dialog-content-text>
  </flint-dialog-content>
  <flint-dialog-actions>
    <flint-button variant="secondary" onclick="this.closest('flint-dialog').open=false">Cancel</flint-button>
    <flint-button variant="destructive" onclick="this.closest('flint-dialog').open=false">Delete</flint-button>
  </flint-dialog-actions>
</flint-dialog>`,
    },
  ],
  drawer: [
    {
      label: 'Left (default)',
      html: `<flint-button onclick="var d=this.nextElementSibling;d.open=true;d.addEventListener('flint-drawer-close',function(){d.open=false},{once:true})">Open Drawer</flint-button>
<flint-drawer>
  <div style="padding:24px;width:280px">
    <h3 style="margin:0 0 16px">Navigation</h3>
    <flint-list>
      <flint-list-item-button><flint-list-item-text primary="Home"></flint-list-item-text></flint-list-item-button>
      <flint-list-item-button><flint-list-item-text primary="Profile"></flint-list-item-text></flint-list-item-button>
      <flint-list-item-button><flint-list-item-text primary="Settings"></flint-list-item-text></flint-list-item-button>
    </flint-list>
  </div>
</flint-drawer>`,
    },
  ],
  snackbar: [
    {
      label: 'Basic',
      html: `<flint-button onclick="this.nextElementSibling.open=true">Show Snackbar</flint-button>
<flint-snackbar message="This is a snackbar message" auto-hide-duration="3000"></flint-snackbar>`,
    },
  ],
  collapsible: [
    {
      label: 'Default Closed',
      html: `<div style="width:100%;max-width:400px">
<flint-collapsible>
  <flint-collapsible-trigger>
    <flint-button variant="secondary" style="width:100%">Click to expand</flint-button>
  </flint-collapsible-trigger>
  <flint-collapsible-content>
    <div style="padding:12px 0;color:#374151">This content is revealed when you click the trigger above.</div>
  </flint-collapsible-content>
</flint-collapsible>
</div>`,
    },
    {
      label: 'Default Open',
      html: `<div style="width:100%;max-width:400px">
<flint-collapsible default-open>
  <flint-collapsible-trigger>
    <flint-button variant="secondary" style="width:100%">Click to collapse</flint-button>
  </flint-collapsible-trigger>
  <flint-collapsible-content>
    <div style="padding:12px 0;color:#374151">This content starts visible and can be collapsed.</div>
  </flint-collapsible-content>
</flint-collapsible>
</div>`,
    },
  ],
  'input-otp': [
    {
      label: '6-digit code',
      html: `<flint-input-otp length="6">
  <flint-input-otp-group>
    <flint-input-otp-slot index="0"></flint-input-otp-slot>
    <flint-input-otp-slot index="1"></flint-input-otp-slot>
    <flint-input-otp-slot index="2"></flint-input-otp-slot>
  </flint-input-otp-group>
  <flint-input-otp-separator></flint-input-otp-separator>
  <flint-input-otp-group>
    <flint-input-otp-slot index="3"></flint-input-otp-slot>
    <flint-input-otp-slot index="4"></flint-input-otp-slot>
    <flint-input-otp-slot index="5"></flint-input-otp-slot>
  </flint-input-otp-group>
</flint-input-otp>`,
    },
    {
      label: '4-digit code',
      html: `<flint-input-otp length="4">
  <flint-input-otp-group>
    <flint-input-otp-slot index="0"></flint-input-otp-slot>
    <flint-input-otp-slot index="1"></flint-input-otp-slot>
    <flint-input-otp-slot index="2"></flint-input-otp-slot>
    <flint-input-otp-slot index="3"></flint-input-otp-slot>
  </flint-input-otp-group>
</flint-input-otp>`,
    },
  ],
  kbd: [
    {
      label: 'Combinations',
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center"><span><flint-kbd>Ctrl</flint-kbd> + <flint-kbd>C</flint-kbd></span>
<span><flint-kbd>Ctrl</flint-kbd> + <flint-kbd>V</flint-kbd></span>
<span><flint-kbd>Shift</flint-kbd> + <flint-kbd>Enter</flint-kbd></span>
<flint-kbd>Esc</flint-kbd></div>`,
    },
  ],
  'copy-button': [
    {
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-copy-button value="Hello, World!">Copy Text</flint-copy-button>
<flint-copy-button value="npm install @getufy/flint-ui">Copy Command</flint-copy-button></div>`,
    },
  ],
  'hover-card': [
    {
      html: `<flint-hover-card>
  <flint-hover-card-trigger>
    <flint-link href="#">Hover over me</flint-link>
  </flint-hover-card-trigger>
  <flint-hover-card-content>
    <div style="padding:12px">
      <p style="margin:0;font-weight:600">Hover Card</p>
      <p style="margin:4px 0 0;color:#6b7280;font-size:14px">Additional information shown on hover.</p>
    </div>
  </flint-hover-card-content>
</flint-hover-card>`,
    },
  ],
  'relative-time': [
    {
      label: 'Dates',
      html: `<div style="display:flex;flex-direction:column;gap:8px">
<span>1 day ago: <flint-relative-time datetime="${new Date(Date.now() - 86400000).toISOString()}"></flint-relative-time></span>
<span>1 week ago: <flint-relative-time datetime="${new Date(Date.now() - 604800000).toISOString()}"></flint-relative-time></span>
<span>1 month ago: <flint-relative-time datetime="${new Date(Date.now() - 2592000000).toISOString()}"></flint-relative-time></span>
</div>`,
    },
  ],
  'format-date': [
    {
      label: 'Formats',
      html: `<div style="display:flex;flex-direction:column;gap:8px">
<span>Default: <flint-format-date></flint-format-date></span>
<span>Long: <flint-format-date date-style="long"></flint-format-date></span>
<span>Full: <flint-format-date date-style="full"></flint-format-date></span>
</div>`,
    },
  ],
  'format-number': [
    {
      label: 'Formats',
      html: `<div style="display:flex;flex-direction:column;gap:8px">
<span>Currency: <flint-format-number value="1234567.89" style="currency" currency="USD"></flint-format-number></span>
<span>Percent: <flint-format-number value="0.856" style="percent"></flint-format-number></span>
<span>Decimal: <flint-format-number value="1234567.89" style="decimal"></flint-format-number></span>
</div>`,
    },
  ],
  empty: [
    {
      html: `<div style="width:100%;max-width:400px">
<flint-empty>
  <flint-empty-title>No results found</flint-empty-title>
  <flint-empty-description>Try adjusting your search or filter criteria.</flint-empty-description>
  <flint-empty-content>
    <flint-button variant="secondary" size="small">Clear Filters</flint-button>
  </flint-empty-content>
</flint-empty>
</div>`,
    },
  ],
  carousel: [
    {
      html: `<div style="width:100%;max-width:500px">
<flint-carousel>
  <flint-carousel-content>
    <flint-carousel-item><div style="background:#e0e7ff;border-radius:8px;height:200px;display:flex;align-items:center;justify-content:center;font-weight:600;color:#3730a3">Slide 1</div></flint-carousel-item>
    <flint-carousel-item><div style="background:#dbeafe;border-radius:8px;height:200px;display:flex;align-items:center;justify-content:center;font-weight:600;color:#1e40af">Slide 2</div></flint-carousel-item>
    <flint-carousel-item><div style="background:#e0f2fe;border-radius:8px;height:200px;display:flex;align-items:center;justify-content:center;font-weight:600;color:#0369a1">Slide 3</div></flint-carousel-item>
  </flint-carousel-content>
  <flint-carousel-previous></flint-carousel-previous>
  <flint-carousel-next></flint-carousel-next>
</flint-carousel>
</div>`,
    },
  ],
  'scroll-area': [
    {
      html: `<flint-scroll-area style="height:200px;width:100%;max-width:350px;border:1px solid #e5e7eb;border-radius:8px">
  <div style="padding:16px">
    <p style="margin:0 0 12px"><strong>Scrollable Content</strong></p>
    <p style="margin:0 0 12px">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <p style="margin:0 0 12px">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p style="margin:0 0 12px">Ut enim ad minim veniam, quis nostrud exercitation.</p>
    <p style="margin:0 0 12px">Duis aute irure dolor in reprehenderit in voluptate.</p>
    <p style="margin:0 0 12px">Excepteur sint occaecat cupidatat non proident.</p>
    <p style="margin:0">Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
</flint-scroll-area>`,
    },
  ],
  'split-panel': [
    {
      html: `<flint-split-panel style="height:200px;width:100%;max-width:500px;border:1px solid #e5e7eb;border-radius:8px">
  <div slot="start" style="padding:16px;background:#f0f9ff;height:100%">Left Panel — Drag the divider</div>
  <div slot="end" style="padding:16px;background:#fef3c7;height:100%">Right Panel</div>
</flint-split-panel>`,
    },
  ],
  toggle: [
    {
      label: 'States',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><flint-toggle>Default</flint-toggle>
<flint-toggle pressed>Pressed</flint-toggle>
<flint-toggle disabled>Disabled</flint-toggle></div>`,
    },
  ],
  fab: [
    {
      label: 'Sizes',
      html: `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><flint-fab size="small">
  <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
</flint-fab>
<flint-fab>
  <svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
</flint-fab>
<flint-fab size="large">
  <svg slot="icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
</flint-fab></div>`,
    },
    {
      label: 'Extended',
      html: `<flint-fab extended>
  <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  Add Item
</flint-fab>`,
    },
  ],
  item: [
    {
      html: `<div style="width:100%;max-width:400px">
<flint-item-group>
  <flint-item-header>Settings</flint-item-header>
  <flint-item>
    <flint-item-content>
      <flint-item-title>Profile</flint-item-title>
      <flint-item-description>Update your personal information</flint-item-description>
    </flint-item-content>
  </flint-item>
  <flint-item-separator></flint-item-separator>
  <flint-item>
    <flint-item-content>
      <flint-item-title>Notifications</flint-item-title>
      <flint-item-description>Manage your notification preferences</flint-item-description>
    </flint-item-content>
  </flint-item>
  <flint-item-separator></flint-item-separator>
  <flint-item>
    <flint-item-content>
      <flint-item-title>Security</flint-item-title>
      <flint-item-description>Password and two-factor authentication</flint-item-description>
    </flint-item-content>
  </flint-item>
</flint-item-group>
</div>`,
    },
  ],
  list: [
    {
      html: `<div style="width:100%;max-width:360px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
<flint-list>
  <flint-list-subheader>Messages</flint-list-subheader>
  <flint-list-item-button selected>
    <flint-list-item-text primary="Inbox" secondary="5 new messages"></flint-list-item-text>
  </flint-list-item-button>
  <flint-list-item-button>
    <flint-list-item-text primary="Drafts" secondary="2 drafts"></flint-list-item-text>
  </flint-list-item-button>
  <flint-list-item-button>
    <flint-list-item-text primary="Sent" secondary="Last sent 2h ago"></flint-list-item-text>
  </flint-list-item-button>
  <flint-list-item-button disabled>
    <flint-list-item-text primary="Spam" secondary="Disabled"></flint-list-item-text>
  </flint-list-item-button>
</flint-list>
</div>`,
    },
  ],
  stepper: [
    {
      label: 'Step 2 of 3',
      html: `<div style="width:100%;max-width:500px">
<flint-stepper active-step="1">
  <flint-step completed>
    <flint-step-label>Account</flint-step-label>
  </flint-step>
  <flint-step>
    <flint-step-label>Details</flint-step-label>
  </flint-step>
  <flint-step>
    <flint-step-label>Review</flint-step-label>
  </flint-step>
</flint-stepper>
</div>`,
    },
    {
      label: 'All Complete',
      html: `<div style="width:100%;max-width:500px">
<flint-stepper active-step="3">
  <flint-step completed>
    <flint-step-label>Account</flint-step-label>
  </flint-step>
  <flint-step completed>
    <flint-step-label>Details</flint-step-label>
  </flint-step>
  <flint-step completed>
    <flint-step-label>Review</flint-step-label>
  </flint-step>
</flint-stepper>
</div>`,
    },
    {
      label: 'Vertical',
      html: `<div style="width:100%;max-width:400px">
<flint-stepper orientation="vertical" active-step="1">
  <flint-step completed>
    <flint-step-label>Create account</flint-step-label>
    <p style="margin:0;color:#6b7280;font-size:14px">Account created successfully.</p>
  </flint-step>
  <flint-step>
    <flint-step-label>Personal details</flint-step-label>
    <p style="margin:0;color:#6b7280;font-size:14px">Fill in your name, email, and phone number.</p>
  </flint-step>
  <flint-step>
    <flint-step-label>Review & submit</flint-step-label>
  </flint-step>
</flint-stepper>
</div>`,
    },
  ],
  backdrop: [
    {
      html: `<flint-button onclick="var b=this.nextElementSibling;b.open=true;b.addEventListener('flint-backdrop-close',function(){b.open=false},{once:true})">Show Backdrop</flint-button>
<flint-backdrop>
  <div style="background:white;padding:24px;border-radius:8px;text-align:center">
    <p style="margin:0 0 16px">Click outside or press Escape to close</p>
    <flint-button onclick="this.closest('flint-backdrop').open=false">Close</flint-button>
  </div>
</flint-backdrop>`,
    },
  ],
  'app-bar': [
    {
      label: 'Regular',
      html: `<div style="width:100%;max-width:600px">
<flint-app-bar title="My Application" position="static">
  <span slot="navigation" style="font-size:20px;cursor:pointer">&#9776;</span>
  <div slot="actions">
    <flint-button variant="secondary" size="small">Login</flint-button>
  </div>
</flint-app-bar>
</div>`,
    },
    {
      label: 'Dense',
      html: `<div style="width:100%;max-width:600px">
<flint-app-bar title="Dense Bar" position="static" variant="dense">
  <div slot="actions">
    <flint-button variant="secondary" size="small">Action</flint-button>
  </div>
</flint-app-bar>
</div>`,
    },
  ],
  autocomplete: [
    {
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<flint-autocomplete label="Movie" placeholder="Search movies..." style="width:260px" data-options="shawshank:The Shawshank Redemption,godfather:The Godfather,dark-knight:The Dark Knight,pulp-fiction:Pulp Fiction,forrest-gump:Forrest Gump,inception:Inception,matrix:The Matrix,interstellar:Interstellar"></flint-autocomplete>
<flint-autocomplete label="Disabled" disabled placeholder="Disabled" style="width:260px"></flint-autocomplete>
</div>`,
    },
  ],
  'bottom-navigation': [
    {
      label: 'With Labels',
      html: `<div style="width:100%;max-width:400px">
<flint-bottom-navigation value="recents" show-labels>
  <flint-bottom-navigation-action label="Recents" value="recents">
    <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
  </flint-bottom-navigation-action>
  <flint-bottom-navigation-action label="Favorites" value="favs">
    <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path></svg>
  </flint-bottom-navigation-action>
  <flint-bottom-navigation-action label="Nearby" value="nearby">
    <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  </flint-bottom-navigation-action>
</flint-bottom-navigation>
</div>`,
    },
  ],
  box: [
    {
      label: 'Styles',
      html: `<flint-box bgcolor="primary" color="white" p="16px" border-radius="8px">Primary Box</flint-box>
<flint-box bgcolor="#f3f4f6" p="16px" border-radius="8px">Gray Box</flint-box>
<flint-box p="16px" border-radius="8px" style="border:2px dashed #d1d5db">Dashed Border</flint-box>`,
    },
  ],
  command: [
    {
      html: `<div style="width:100%;max-width:400px">
<flint-command style="border:1px solid #e5e7eb;border-radius:8px">
  <flint-command-input placeholder="Type a command or search..."></flint-command-input>
  <flint-command-list>
    <flint-command-group heading="Suggestions">
      <flint-command-item value="calendar">Calendar</flint-command-item>
      <flint-command-item value="search">Search</flint-command-item>
      <flint-command-item value="settings">Settings</flint-command-item>
    </flint-command-group>
    <flint-command-separator></flint-command-separator>
    <flint-command-group heading="Actions">
      <flint-command-item value="copy">Copy</flint-command-item>
      <flint-command-item value="paste">Paste</flint-command-item>
    </flint-command-group>
    <flint-command-empty>No results found.</flint-command-empty>
  </flint-command-list>
</flint-command>
</div>`,
    },
  ],
  container: [
    {
      label: 'Max Widths',
      html: `<div style="width:100%;display:flex;flex-direction:column;gap:8px">
<flint-container max-width="sm"><flint-paper elevation="1" style="padding:12px;text-align:center">sm</flint-paper></flint-container>
<flint-container max-width="md"><flint-paper elevation="1" style="padding:12px;text-align:center">md</flint-paper></flint-container>
<flint-container max-width="lg"><flint-paper elevation="1" style="padding:12px;text-align:center">lg</flint-paper></flint-container>
</div>`,
    },
  ],
  'date-field': [
    {
      label: 'States',
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<flint-date-field label="Date" value="2025-12-31" style="width:200px"></flint-date-field>
<flint-date-field label="Empty" style="width:200px"></flint-date-field>
<flint-date-field label="Disabled" disabled value="2025-06-15" style="width:200px"></flint-date-field>
</div>`,
    },
  ],
  'date-picker': [
    {
      label: 'States',
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<flint-date-picker label="Pick a date" style="width:260px"></flint-date-picker>
<flint-date-picker label="Disabled" disabled style="width:260px"></flint-date-picker>
</div>`,
    },
  ],
  'date-range-picker': [
    {
      label: 'Basic',
      html: `<flint-date-range-picker label="Date range" style="width:340px"></flint-date-range-picker>`,
    },
    {
      label: 'With Shortcuts',
      html: `<flint-date-range-picker label="Date range" shortcuts style="width:340px"></flint-date-range-picker>`,
    },
    {
      label: 'Static with Shortcuts',
      html: `<flint-date-range-picker variant="static" shortcuts></flint-date-range-picker>`,
    },
  ],
  grid: [
    {
      label: 'Responsive Grid',
      html: `<flint-grid container spacing="2" style="width:100%">
  <flint-grid xs="12" md="6"><flint-paper elevation="1" style="padding:16px;text-align:center">xs=12 md=6</flint-paper></flint-grid>
  <flint-grid xs="12" md="6"><flint-paper elevation="1" style="padding:16px;text-align:center">xs=12 md=6</flint-paper></flint-grid>
  <flint-grid xs="6" md="3"><flint-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</flint-paper></flint-grid>
  <flint-grid xs="6" md="3"><flint-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</flint-paper></flint-grid>
  <flint-grid xs="6" md="3"><flint-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</flint-paper></flint-grid>
  <flint-grid xs="6" md="3"><flint-paper elevation="1" style="padding:16px;text-align:center">xs=6 md=3</flint-paper></flint-grid>
</flint-grid>`,
    },
  ],
  'image-comparer': [
    {
      html: `<flint-image-comparer position="50" style="width:100%;max-width:500px">
  <div slot="before" style="width:100%;height:250px;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:18px">Before</div>
  <div slot="after" style="width:100%;height:250px;background:linear-gradient(135deg,#f093fb,#f5576c);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:18px">After</div>
</flint-image-comparer>`,
    },
  ],
  'image-list': [
    {
      html: `<flint-image-list cols="3" gap="8" style="width:100%;max-width:500px">
  <flint-image-list-item><div style="width:100%;height:120px;background:#dbeafe;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#1e40af;font-weight:600">1</div></flint-image-list-item>
  <flint-image-list-item><div style="width:100%;height:120px;background:#e0e7ff;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#3730a3;font-weight:600">2</div></flint-image-list-item>
  <flint-image-list-item><div style="width:100%;height:120px;background:#ede9fe;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#5b21b6;font-weight:600">3</div></flint-image-list-item>
  <flint-image-list-item><div style="width:100%;height:120px;background:#fce7f3;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#9d174d;font-weight:600">4</div></flint-image-list-item>
  <flint-image-list-item><div style="width:100%;height:120px;background:#fef3c7;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#92400e;font-weight:600">5</div></flint-image-list-item>
  <flint-image-list-item><div style="width:100%;height:120px;background:#d1fae5;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#065f46;font-weight:600">6</div></flint-image-list-item>
</flint-image-list>`,
    },
  ],
  menu: [
    {
      html: `<div style="position:relative;display:inline-block">
<flint-button onclick="var m=this.nextElementSibling;m.open=!m.open;if(m.open)m.addEventListener('flint-menu-close',function(){m.open=false},{once:true})">Open Menu</flint-button>
<flint-menu>
  <flint-menu-item>Profile</flint-menu-item>
  <flint-menu-item>Settings</flint-menu-item>
  <flint-menu-divider></flint-menu-divider>
  <flint-menu-group label="Actions">
    <flint-menu-item>Export</flint-menu-item>
    <flint-menu-item disabled>Delete</flint-menu-item>
  </flint-menu-group>
  <flint-menu-divider></flint-menu-divider>
  <flint-menu-item>Logout</flint-menu-item>
</flint-menu>
</div>`,
    },
  ],
  menubar: [
    {
      html: `<div style="width:100%;max-width:500px">
<flint-menubar>
  <flint-menubar-menu>
    <flint-menubar-trigger>File</flint-menubar-trigger>
    <flint-menubar-content>
      <flint-menubar-item>New <flint-menubar-shortcut>Ctrl+N</flint-menubar-shortcut></flint-menubar-item>
      <flint-menubar-item>Open <flint-menubar-shortcut>Ctrl+O</flint-menubar-shortcut></flint-menubar-item>
      <flint-menubar-item>Save <flint-menubar-shortcut>Ctrl+S</flint-menubar-shortcut></flint-menubar-item>
      <flint-menubar-separator></flint-menubar-separator>
      <flint-menubar-item>Exit</flint-menubar-item>
    </flint-menubar-content>
  </flint-menubar-menu>
  <flint-menubar-menu>
    <flint-menubar-trigger>Edit</flint-menubar-trigger>
    <flint-menubar-content>
      <flint-menubar-item>Undo <flint-menubar-shortcut>Ctrl+Z</flint-menubar-shortcut></flint-menubar-item>
      <flint-menubar-item>Redo <flint-menubar-shortcut>Ctrl+Y</flint-menubar-shortcut></flint-menubar-item>
      <flint-menubar-separator></flint-menubar-separator>
      <flint-menubar-item>Cut <flint-menubar-shortcut>Ctrl+X</flint-menubar-shortcut></flint-menubar-item>
      <flint-menubar-item>Copy <flint-menubar-shortcut>Ctrl+C</flint-menubar-shortcut></flint-menubar-item>
      <flint-menubar-item>Paste <flint-menubar-shortcut>Ctrl+V</flint-menubar-shortcut></flint-menubar-item>
    </flint-menubar-content>
  </flint-menubar-menu>
  <flint-menubar-menu>
    <flint-menubar-trigger>View</flint-menubar-trigger>
    <flint-menubar-content>
      <flint-menubar-item>Zoom In</flint-menubar-item>
      <flint-menubar-item>Zoom Out</flint-menubar-item>
      <flint-menubar-separator></flint-menubar-separator>
      <flint-menubar-item>Full Screen</flint-menubar-item>
    </flint-menubar-content>
  </flint-menubar-menu>
</flint-menubar>
</div>`,
    },
  ],
  'navigation-menu': [
    {
      html: `<flint-navigation-menu>
  <flint-navigation-menu-list>
    <flint-navigation-menu-item>
      <flint-navigation-menu-link href="#">Home</flint-navigation-menu-link>
    </flint-navigation-menu-item>
    <flint-navigation-menu-item>
      <flint-navigation-menu-trigger content-id="nav-docs">Documentation</flint-navigation-menu-trigger>
      <flint-navigation-menu-content id="nav-docs">
        <flint-navigation-menu-link href="#">Getting Started</flint-navigation-menu-link>
        <flint-navigation-menu-link href="#">Components</flint-navigation-menu-link>
        <flint-navigation-menu-link href="#">API Reference</flint-navigation-menu-link>
      </flint-navigation-menu-content>
    </flint-navigation-menu-item>
    <flint-navigation-menu-item>
      <flint-navigation-menu-link href="#">About</flint-navigation-menu-link>
    </flint-navigation-menu-item>
    <flint-navigation-menu-item>
      <flint-navigation-menu-link href="#">Contact</flint-navigation-menu-link>
    </flint-navigation-menu-item>
  </flint-navigation-menu-list>
</flint-navigation-menu>`,
    },
  ],
  resizable: [
    {
      label: 'Horizontal',
      html: `<div style="width:100%;max-width:500px">
<flint-resizable-group orientation="horizontal" style="height:200px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
  <flint-resizable-panel default-size="40">
    <div style="padding:16px;height:100%;background:#f0f9ff;display:flex;align-items:center;justify-content:center">Panel A</div>
  </flint-resizable-panel>
  <flint-resizable-handle with-handle></flint-resizable-handle>
  <flint-resizable-panel default-size="60">
    <div style="padding:16px;height:100%;background:#fefce8;display:flex;align-items:center;justify-content:center">Panel B</div>
  </flint-resizable-panel>
</flint-resizable-group>
</div>`,
    },
    {
      label: 'Three Panels',
      html: `<div style="width:100%;max-width:600px">
<flint-resizable-group orientation="horizontal" style="height:180px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
  <flint-resizable-panel default-size="25">
    <div style="padding:12px;height:100%;background:#f0f9ff;display:flex;align-items:center;justify-content:center;font-size:14px">Sidebar</div>
  </flint-resizable-panel>
  <flint-resizable-handle with-handle></flint-resizable-handle>
  <flint-resizable-panel default-size="50">
    <div style="padding:12px;height:100%;display:flex;align-items:center;justify-content:center;font-size:14px">Main</div>
  </flint-resizable-panel>
  <flint-resizable-handle with-handle></flint-resizable-handle>
  <flint-resizable-panel default-size="25">
    <div style="padding:12px;height:100%;background:#fef3c7;display:flex;align-items:center;justify-content:center;font-size:14px">Detail</div>
  </flint-resizable-panel>
</flint-resizable-group>
</div>`,
    },
  ],
  sonner: [
    {
      label: 'Toast Types',
      html: `<flint-toaster position="bottom-right"></flint-toaster>
<div style="display:flex;gap:8px;flex-wrap:wrap">
<flint-button variant="secondary" onclick="window.__storybook_lit.toast('Default toast message')">Default</flint-button>
<flint-button variant="primary" onclick="window.__storybook_lit.toast.success('Operation successful!')">Success</flint-button>
<flint-button variant="destructive" onclick="window.__storybook_lit.toast.error('Something went wrong')">Error</flint-button>
<flint-button variant="secondary" onclick="window.__storybook_lit.toast.info('Here is some info')">Info</flint-button>
<flint-button variant="secondary" onclick="window.__storybook_lit.toast.warning('Careful with that!')">Warning</flint-button>
</div>`,
    },
  ],
  'speed-dial': [
    {
      html: `<div style="position:relative;height:200px;width:100%">
<flint-speed-dial style="position:absolute;bottom:16px;right:16px" aria-label="Actions">
  <flint-speed-dial-action tooltip-title="Copy">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
  </flint-speed-dial-action>
  <flint-speed-dial-action tooltip-title="Share">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
  </flint-speed-dial-action>
  <flint-speed-dial-action tooltip-title="Print">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
  </flint-speed-dial-action>
</flint-speed-dial>
</div>`,
    },
  ],
  stack: [
    {
      label: 'Row',
      html: `<flint-stack direction="row" gap="2" align-items="center">
  <flint-paper elevation="1" style="padding:12px">Item 1</flint-paper>
  <flint-paper elevation="1" style="padding:12px">Item 2</flint-paper>
  <flint-paper elevation="1" style="padding:12px">Item 3</flint-paper>
</flint-stack>`,
    },
    {
      label: 'Column',
      html: `<flint-stack direction="column" gap="2" style="width:100%;max-width:200px">
  <flint-paper elevation="1" style="padding:12px;text-align:center">Item 1</flint-paper>
  <flint-paper elevation="1" style="padding:12px;text-align:center">Item 2</flint-paper>
  <flint-paper elevation="1" style="padding:12px;text-align:center">Item 3</flint-paper>
</flint-stack>`,
    },
  ],
  table: [
    {
      html: `<div style="width:100%;max-width:500px">
<flint-table-container>
  <flint-table>
    <flint-table-head>
      <flint-table-row>
        <flint-table-cell header>Name</flint-table-cell>
        <flint-table-cell header>Role</flint-table-cell>
        <flint-table-cell header align="right">Score</flint-table-cell>
      </flint-table-row>
    </flint-table-head>
    <flint-table-body>
      <flint-table-row>
        <flint-table-cell>Alice</flint-table-cell>
        <flint-table-cell>Engineer</flint-table-cell>
        <flint-table-cell align="right">92</flint-table-cell>
      </flint-table-row>
      <flint-table-row selected>
        <flint-table-cell>Bob</flint-table-cell>
        <flint-table-cell>Designer</flint-table-cell>
        <flint-table-cell align="right">87</flint-table-cell>
      </flint-table-row>
      <flint-table-row>
        <flint-table-cell>Carol</flint-table-cell>
        <flint-table-cell>Manager</flint-table-cell>
        <flint-table-cell align="right">95</flint-table-cell>
      </flint-table-row>
      <flint-table-row>
        <flint-table-cell>Dave</flint-table-cell>
        <flint-table-cell>Analyst</flint-table-cell>
        <flint-table-cell align="right">78</flint-table-cell>
      </flint-table-row>
    </flint-table-body>
  </flint-table>
</flint-table-container>
</div>`,
    },
  ],
  'time-picker': [
    {
      label: 'Desktop (Digital Clock Popover)',
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<flint-time-picker label="Time" value="14:30:00" style="width:200px"></flint-time-picker>
<flint-time-picker label="With Seconds" value="09:15:45" seconds style="width:200px"></flint-time-picker>
<flint-time-picker label="Disabled" disabled value="08:00:00" style="width:200px"></flint-time-picker>
</div>`,
    },
    {
      label: 'Mobile (Analog Clock Dialog)',
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<flint-time-picker label="Tap to open clock" variant="mobile" value="10:30:00" style="width:200px"></flint-time-picker>
<flint-time-picker label="With Seconds" variant="mobile" value="15:45:30" seconds style="width:200px"></flint-time-picker>
</div>`,
    },
    {
      label: 'Analog Clock (Standalone)',
      html: `<div style="display:flex;gap:24px;flex-wrap:wrap;align-items:start">
<flint-time-clock value="10:10:00" ampm></flint-time-clock>
<flint-time-clock value="15:45:00"></flint-time-clock>
</div>`,
    },
    {
      label: 'Digital Clock',
      html: `<div style="display:flex;gap:16px;flex-wrap:wrap">
<flint-digital-clock value="14:30:00" ampm></flint-digital-clock>
<flint-digital-clock value="09:15:00"></flint-digital-clock>
</div>`,
    },
    {
      label: 'Multi-Section Digital Clock',
      html: `<flint-multi-section-digital-clock value="14:30:00" ampm></flint-multi-section-digital-clock>`,
    },
    {
      label: 'Static Time Picker',
      html: `<flint-static-time-picker value="11:00:00" ampm></flint-static-time-picker>`,
    },
  ],
  'transfer-list': [
    {
      html: `<div style="width:100%;max-width:550px">
<flint-transfer-list left-title="Available" right-title="Selected" searchable data-options="js:JavaScript,ts:TypeScript,py:Python,rust:Rust,go:Go,java:Java,cpp:C++,ruby:Ruby"></flint-transfer-list>
</div>`,
    },
  ],
  'tree-view': [
    {
      label: 'Simple Tree View',
      html: `<div style="width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px">
<flint-simple-tree-view>
  <flint-tree-item item-id="1" label="Documents">
    <flint-tree-item item-id="1-1" label="Resume.pdf"></flint-tree-item>
    <flint-tree-item item-id="1-2" label="Cover Letter.pdf"></flint-tree-item>
  </flint-tree-item>
  <flint-tree-item item-id="2" label="Images">
    <flint-tree-item item-id="2-1" label="photo.jpg"></flint-tree-item>
    <flint-tree-item item-id="2-2" label="screenshot.png"></flint-tree-item>
    <flint-tree-item item-id="2-3" label="icon.svg"></flint-tree-item>
  </flint-tree-item>
  <flint-tree-item item-id="3" label="Notes.txt"></flint-tree-item>
</flint-simple-tree-view>
</div>`,
    },
    {
      label: 'Rich Tree View',
      html: `<div style="width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px">
<flint-rich-tree-view data-props='{"items":[{"id":"src","label":"src","children":[{"id":"components","label":"components","children":[{"id":"app","label":"App.tsx"},{"id":"header","label":"Header.tsx"},{"id":"footer","label":"Footer.tsx"}]},{"id":"utils","label":"utils","children":[{"id":"helpers","label":"helpers.ts"},{"id":"constants","label":"constants.ts"}]},{"id":"index","label":"index.ts"}]},{"id":"public","label":"public","children":[{"id":"favicon","label":"favicon.ico"},{"id":"robots","label":"robots.txt"}]},{"id":"pkg","label":"package.json"},{"id":"readme","label":"README.md"}],"defaultExpandedItems":["src","components"]}'></flint-rich-tree-view>
</div>`,
    },
    {
      label: 'Rich Tree View with Drag & Drop Reordering',
      html: `<div style="width:100%;max-width:300px;border:1px solid #e5e7eb;border-radius:8px;padding:8px">
<flint-rich-tree-view items-reordering items-reordering-handle data-props='{"items":[{"id":"todo","label":"To Do","children":[{"id":"t1","label":"Design homepage"},{"id":"t2","label":"Write tests"},{"id":"t3","label":"Fix bug #42"}]},{"id":"progress","label":"In Progress","children":[{"id":"p1","label":"API integration"},{"id":"p2","label":"Code review"}]},{"id":"done","label":"Done","children":[{"id":"d1","label":"Setup project"},{"id":"d2","label":"Create database schema"}]}],"defaultExpandedItems":["todo","progress","done"]}'></flint-rich-tree-view>
</div>`,
    },
  ],
  'flint-range-slider': [
    {
      html: `<div style="display:flex;flex-direction:column;gap:16px;width:100%;max-width:300px">
<flint-range-slider min="0" max="100" label="Price range" show-value></flint-range-slider>
<flint-range-slider min="0" max="100" label="Disabled" disabled show-value></flint-range-slider>
</div>`,
    },
  ],
  'visually-hidden': [
    {
      html: `<p style="margin:0;color:#374151">The link below has visually hidden text for screen readers:</p>
<a href="#" style="color:var(--flint-primary-color)">
  Download Report
  <flint-visually-hidden>(opens in a new tab)</flint-visually-hidden>
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
      // Use single-quoted attribute to avoid Vue's parser decoding &quot; entities
      // inside double-quoted attributes, which breaks the attribute boundary
      // for HTML content containing nested quotes (e.g. style="..." or onclick="...").
      const escapedHtml = demo.html
        .replace(/\\/g, '\\\\')
        .replace(/'/g, '&#39;')
        .replace(/\n/g, '');
      const labelAttr = demo.label ? ` label="${demo.label}"` : '';
      md += `<Demo${labelAttr} html='${escapedHtml}' />\n\n`;
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
    md += `\`\`\`ts\nimport '@getufy/flint-ui'; // auto-registers all\n`;
    md += `// or\nimport { ${comp.className} } from '@getufy/flint-ui';\n\`\`\`\n\n`;

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

    // CSS Parts
    if (comp.cssParts.length > 0) {
      md += `### CSS Parts\n\n`;
      md += `| Name | Description |\n`;
      md += `| --- | --- |\n`;
      for (const p of comp.cssParts) {
        md += `| \`${p.name}\` | ${escapeTable(p.description)} |\n`;
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
  return s
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}

function generateSidebar(dirs: string[]): object[] {
  const categories: Record<string, string[]> = {
    'Form Controls': ['button', 'checkbox', 'input', 'input-otp', 'radio', 'rating', 'select', 'slider', 'switch', 'text-field', 'textarea', 'toggle', 'flint-range-slider', 'date-field', 'date-picker', 'date-range-picker', 'time-picker', 'autocomplete', 'transfer-list'],
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

// ─── Storybook Docs Injection ────────────────────────────────────────

function generateStoryDocs(components: ComponentInfo[]): string {
  let md = '';

  for (let i = 0; i < components.length; i++) {
    const comp = components[i];

    if (components.length > 1) {
      md += `#### \`<${comp.tagName}>\`\n\n`;
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

    if (comp.props.length > 0) {
      md += `#### Properties\n\n`;
      md += `| Property | Attribute | Type | Default | Description |\n`;
      md += `|---|---|---|---|---|\n`;
      for (const p of comp.props) {
        const typeStr = `\`${escapeTable(p.type)}\``;
        const defaultStr = p.default ? `\`${escapeTable(p.default)}\`` : '—';
        const desc = escapeTable(p.description);
        md += `| \`${p.name}\` | \`${p.attribute}\` | ${typeStr} | ${defaultStr} | ${desc} |\n`;
      }
      md += `\n`;
    }

    if (comp.events.length > 0) {
      md += `#### Events\n\n`;
      md += `| Event | Detail | Description |\n`;
      md += `|---|---|---|\n`;
      for (const e of comp.events) {
        md += `| \`${e.name}\` | ${e.detail ? `\`${escapeTable(e.detail)}\`` : '—'} | ${escapeTable(e.description)} |\n`;
      }
      md += `\n`;
    }

    if (comp.slots.length > 0) {
      md += `#### Slots\n\n`;
      md += `| Name | Description |\n`;
      md += `|---|---|\n`;
      for (const s of comp.slots) {
        md += `| \`${s.name || '(default)'}\` | ${escapeTable(s.description)} |\n`;
      }
      md += `\n`;
    }

    if (comp.cssParts.length > 0) {
      md += `#### CSS Parts\n\n`;
      md += `| Name | Description |\n`;
      md += `|---|---|\n`;
      for (const p of comp.cssParts) {
        md += `| \`${p.name}\` | ${escapeTable(p.description)} |\n`;
      }
      md += `\n`;
    }

    if (comp.cssVars.length > 0) {
      md += `#### CSS Custom Properties\n\n`;
      md += `| Property | Default |\n`;
      md += `|---|---|\n`;
      for (const v of comp.cssVars) {
        md += `| \`${v.name}\` | ${v.default ? `\`${escapeTable(v.default)}\`` : '—'} |\n`;
      }
      md += `\n`;
    }

    if (comp.methods.length > 0) {
      md += `#### Methods\n\n`;
      md += `| Method | Description |\n`;
      md += `|---|---|\n`;
      for (const m of comp.methods) {
        md += `| \`${escapeTable(m.signature)}\` | ${escapeTable(m.description)} |\n`;
      }
      md += `\n`;
    }

    if (i < components.length - 1) {
      md += `---\n\n`;
    }
  }

  return md.trim();
}

function updateStoryFile(dirPath: string, components: ComponentInfo[]) {
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.stories.ts'));
  if (files.length === 0) return;

  const docsContent = generateStoryDocs(components);

  // Escape for JS template literal
  const escaped = docsContent
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');

  // Pick the main story file (matches dir name)
  const dirName = path.basename(dirPath);
  const mainFile = files.find(f => f === `flint-${dirName}.stories.ts`) || files[0];
  const filePath = path.join(dirPath, mainFile);
  let content = fs.readFileSync(filePath, 'utf-8');

  const docsPropBlock = `docs: {\n            description: {\n                component: \`\n${escaped}\n                \`,\n            },\n        }`;

  // Extract the meta object portion (between `const meta` and `export default meta`)
  const metaStart = content.indexOf('const meta');
  const metaEnd = content.indexOf('export default meta');
  if (metaStart === -1 || metaEnd === -1) return;
  const metaSection = content.slice(metaStart, metaEnd);

  // Check if the meta parameters already has a docs.description.component (any format)
  const hasDocsDescAny = /docs:\s*\{[\s\S]*?description:\s*\{[\s\S]*?component:/.test(metaSection);
  // Check specifically for template literal format (which we can update in-place)
  const hasDocsDescTemplateLiteral = /docs:\s*\{[\s\S]*?description:\s*\{[\s\S]*?component:\s*`/.test(metaSection);

  // Case 1: Already has docs.description.component with template literal — replace content
  if (hasDocsDescTemplateLiteral) {
    // Find the component template literal within docs.description using manual scanning
    // (regex can't reliably handle escaped backticks inside template literals)
    const descIdx = metaSection.indexOf('description:');
    const compIdx = descIdx !== -1 ? metaSection.indexOf('component:', descIdx) : -1;
    const openBacktick = compIdx !== -1 ? metaSection.indexOf('`', compIdx + 10) : -1;
    if (openBacktick !== -1) {
      // Scan forward to find the matching closing backtick (skip escaped ones)
      let i = openBacktick + 1;
      while (i < metaSection.length) {
        if (metaSection[i] === '\\') {
          i += 2; // skip escaped character
        } else if (metaSection[i] === '`') {
          break; // found closing backtick
        } else {
          i++;
        }
      }
      if (i < metaSection.length) {
        const updatedMeta = metaSection.slice(0, openBacktick + 1) +
          '\n' + escaped + '\n                ' +
          metaSection.slice(i);
        content = content.slice(0, metaStart) + updatedMeta + content.slice(metaEnd);
      }
    }
  } else if (hasDocsDescAny) {
    // Case 1b: Has docs.description.component but NOT as template literal (string/concat)
    // Remove the old docs: block and add fresh one
    let updatedMeta = metaSection.replace(
      /(\s*)docs:\s*\{[\s\S]*?description:\s*\{[\s\S]*?\},?\s*\},?\n/,
      `$1${docsPropBlock},\n`
    );
    content = content.slice(0, metaStart) + updatedMeta + content.slice(metaEnd);
  } else if (/\n\s{2,4}parameters:\s*\{/.test(metaSection)) {
    // Case 2: Has parameters in meta but no docs — add docs block
    const updatedMeta = metaSection.replace(
      /(\n(\s{2,4})parameters:\s*\{)\s*\n/,
      `$1\n$2    ${docsPropBlock},\n`
    );
    content = content.slice(0, metaStart) + updatedMeta + content.slice(metaEnd);
  } else if (/\n\s{2,4}component:\s*'/.test(metaSection)) {
    // Case 3: Has component: but no parameters — add after component: line
    const updatedMeta = metaSection.replace(
      /(\n(\s{2,4})component:\s*'[^']+',?)\n/,
      `$1\n$2parameters: {\n$2    ${docsPropBlock},\n$2},\n`
    );
    content = content.slice(0, metaStart) + updatedMeta + content.slice(metaEnd);
  } else if (/\n\s{2,4}title:\s*'/.test(metaSection)) {
    // Case 4: No component: line (e.g., progress) — add after title: line
    const updatedMeta = metaSection.replace(
      /(\n(\s{2,4})title:\s*'[^']+',?)\n/,
      `$1\n$2parameters: {\n$2    ${docsPropBlock},\n$2},\n`
    );
    content = content.slice(0, metaStart) + updatedMeta + content.slice(metaEnd);
  }

  fs.writeFileSync(filePath, content);
}

// ─── Main ───────────────────────────────────────────────────────────

function main() {
  // Ensure output dir
  fs.mkdirSync(DOCS_DIR, { recursive: true });

  // Read component metadata from CEM (single source of truth)
  console.log('Reading Custom Elements Manifest...');
  const componentGroups = readComponentsFromCem();

  const processedDirs: string[] = [];

  for (const [dir, components] of componentGroups) {
    if (components.length === 0) continue;

    const markdown = generateMarkdown(dir, components);
    const outPath = path.join(DOCS_DIR, `${dir}.md`);
    fs.writeFileSync(outPath, markdown);

    // Inject docs into Storybook story files
    const dirPath = path.join(SRC_DIR, dir);
    if (fs.existsSync(dirPath)) {
      updateStoryFile(dirPath, components);
    }

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
