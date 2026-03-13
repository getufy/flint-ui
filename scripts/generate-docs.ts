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

function generateMarkdown(dir: string, components: ComponentInfo[]): string {
  const title = dir
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  let md = `# ${title}\n\n`;

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
    md += `\`\`\`ts\nimport '${comp.tagName.startsWith('ui-') ? 'storybook-lit' : 'storybook-lit'}'; // auto-registers all\n`;
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
