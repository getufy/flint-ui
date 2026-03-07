#!/usr/bin/env node
/**
 * extract-css.mjs
 *
 * Extracts `static styles = css`...`` blocks from Lit components,
 * writes them as external .css files, and rewrites the component to
 * import them via `unsafeCSS(import '...?inline')`.
 *
 * Usage:
 *   node scripts/extract-css.mjs              # process all components
 *   node scripts/extract-css.mjs --dry-run    # preview without writing
 *   node scripts/extract-css.mjs src/button/ui-button.ts  # single file
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const isDryRun = process.argv.includes('--dry-run');
const targetFiles = process.argv
  .filter(a => a.endsWith('.ts'))
  .map(a => path.resolve(a));

// ── File discovery ────────────────────────────────────────────────────────────

function getFiles() {
  if (targetFiles.length > 0) return targetFiles;
  const srcDir = path.join(ROOT, 'src');
  const results = [];
  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = path.join(srcDir, entry.name);
    for (const f of readdirSync(dir)) {
      if (f.startsWith('ui-') && f.endsWith('.ts') && !f.includes('.stories.') && !f.includes('.test.')) {
        results.push(path.join(dir, f));
      }
    }
  }
  return results;
}

// ── CSS template-literal extraction ──────────────────────────────────────────

/**
 * Find all `static styles = css`...`` occurrences and return their
 * position and raw CSS content.
 *
 * Returns: Array<{ markerStart, cssStart, backtickEnd, rawCss }>
 *   markerStart  — index of 's' in `static`
 *   cssStart     — index of the char after the opening backtick
 *   backtickEnd  — index of the closing backtick
 *   rawCss       — the CSS text (not trimmed)
 */
function extractStyleBlocks(content) {
  const MARKER = 'static styles = css`';
  const blocks = [];
  let pos = 0;

  while (true) {
    const markerStart = content.indexOf(MARKER, pos);
    if (markerStart === -1) break;

    const cssStart = markerStart + MARKER.length;
    let i = cssStart;
    let depth = 0; // tracks ${} nesting

    while (i < content.length) {
      const ch = content[i];
      if (ch === '\\') { i += 2; continue; }                 // escaped char
      if (ch === '$' && content[i + 1] === '{') { depth++; i += 2; continue; }
      if (depth > 0 && ch === '}') { depth--; i++; continue; }
      if (depth === 0 && ch === '`') break;                   // closing backtick
      i++;
    }

    blocks.push({ markerStart, cssStart, backtickEnd: i, rawCss: content.slice(cssStart, i) });
    pos = i + 1;
  }

  return blocks;
}

// ── Element name extraction ───────────────────────────────────────────────────

/**
 * Return all @customElement('ui-...') tag names in the file, in document order,
 * paired with the char index where they appear.
 */
function getElementNames(content) {
  const results = [];
  for (const m of content.matchAll(/@customElement\(['"`]([^'"`]+)['"`]\)/g)) {
    results.push({ name: m[1], index: m.index });
  }
  return results;
}

/**
 * For a given `static styles = css`` block starting at `markerStart`,
 * return the nearest preceding @customElement tag name.
 */
function resolveElementName(elementNames, markerStart, fallback) {
  let best = null;
  for (const { name, index } of elementNames) {
    if (index < markerStart) best = name;
    else break;
  }
  return best ?? fallback;
}

// ── Import variable naming ────────────────────────────────────────────────────

/** 'ui-button-group' → 'uiButtonGroupStyles' */
function toImportVar(elementName) {
  return (
    elementName
      .split('-')
      .map((s, i) => (i === 0 ? s : s[0].toUpperCase() + s.slice(1)))
      .join('') + 'Styles'
  );
}

// ── Content rewriting ─────────────────────────────────────────────────────────

/**
 * Rebuild the lit import line to include `unsafeCSS` and optionally
 * drop `css` if it is no longer referenced anywhere in the file.
 */
function rewriteLitImport(content, stillUsesCssTag) {
  return content.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"]lit['"]/,
    (_, imports) => {
      const parts = imports
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      if (!stillUsesCssTag && parts.includes('css')) {
        parts.splice(parts.indexOf('css'), 1);
      }

      if (!parts.includes('unsafeCSS')) {
        // Insert after LitElement / after last Lit core export
        const insertAfter = ['LitElement', 'html', 'css'].find(n => parts.includes(n));
        const idx = insertAfter ? parts.indexOf(insertAfter) + 1 : parts.length;
        parts.splice(idx, 0, 'unsafeCSS');
      }

      return `import { ${parts.join(', ')} } from 'lit'`;
    }
  );
}

/**
 * Insert CSS import lines just after the last `import` statement.
 */
function insertCssImports(content, cssImports) {
  const importMatches = [...content.matchAll(/^import\s+[\s\S]*?from\s+['"][^'"]+['"]\s*;/gm)];
  if (importMatches.length === 0) return cssImports.join('\n') + '\n' + content;

  const last = importMatches[importMatches.length - 1];
  const insertAt = last.index + last[0].length;
  return content.slice(0, insertAt) + '\n' + cssImports.join('\n') + content.slice(insertAt);
}

// ── Main processing ───────────────────────────────────────────────────────────

function processFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, '.ts');

  const blocks = extractStyleBlocks(content);
  if (blocks.length === 0) {
    console.log(`  SKIP  ${path.relative(ROOT, filePath)} — no css\`\` styles`);
    return { status: 'skipped' };
  }

  const elementNames = getElementNames(content);

  // Pair each block with its element name and derived names
  const infos = blocks.map(block => {
    const elementName = resolveElementName(elementNames, block.markerStart, baseName);
    const cssFile = `${elementName}.css`;
    const importVar = toImportVar(elementName);
    return { ...block, elementName, cssFile, importVar };
  });

  // Check for duplicate element names (same CSS file would be written twice)
  const seen = new Set();
  for (const info of infos) {
    if (seen.has(info.cssFile)) {
      console.warn(`  WARN  ${path.relative(ROOT, filePath)} — duplicate element name "${info.elementName}", skipping file`);
      return { status: 'error' };
    }
    seen.add(info.cssFile);
  }

  // Build new TS content — replace blocks from last to first to preserve indices
  let newContent = content;
  for (let i = infos.length - 1; i >= 0; i--) {
    const { markerStart, backtickEnd, importVar } = infos[i];
    newContent =
      newContent.slice(0, markerStart) +
      `static styles = unsafeCSS(${importVar})` +
      newContent.slice(backtickEnd + 1); // +1 skips closing backtick; `;` stays
  }

  // Does any `css` `` usage remain after extraction?
  const stillUsesCssTag = /\bcss`/.test(newContent);

  newContent = rewriteLitImport(newContent, stillUsesCssTag);

  const cssImportLines = infos.map(
    ({ importVar, cssFile }) => `import ${importVar} from './${cssFile}?inline';`
  );
  newContent = insertCssImports(newContent, cssImportLines);

  if (isDryRun) {
    console.log(`  DRY   ${path.relative(ROOT, filePath)}`);
    for (const { cssFile, rawCss } of infos) {
      console.log(`        -> ${cssFile} (${rawCss.trim().length} chars of CSS)`);
    }
    return { status: 'dry' };
  }

  // Write CSS files
  for (const { cssFile, rawCss } of infos) {
    const cssPath = path.join(dir, cssFile);
    if (existsSync(cssPath)) {
      console.warn(`  SKIP  ${cssFile} — already exists, not overwriting`);
      continue;
    }
    writeFileSync(cssPath, rawCss.trim() + '\n', 'utf-8');
    console.log(`  CSS   ${path.relative(ROOT, cssPath)}`);
  }

  // Write updated TS file
  writeFileSync(filePath, newContent, 'utf-8');
  console.log(`  DONE  ${path.relative(ROOT, filePath)}`);

  return { status: 'done', count: infos.length };
}

// ── Entry point ───────────────────────────────────────────────────────────────

const files = getFiles();
console.log(`\nProcessing ${files.length} component file(s)${isDryRun ? ' [DRY RUN]' : ''}...\n`);

let done = 0, skipped = 0, errors = 0;

for (const file of files) {
  const result = processFile(file);
  if (result.status === 'done') done += result.count;
  else if (result.status === 'skipped') skipped++;
  else if (result.status === 'error') errors++;
}

console.log(`\nSummary: ${done} style blocks extracted, ${skipped} files skipped, ${errors} errors`);
if (isDryRun) console.log('(Dry run — no files were written)');
