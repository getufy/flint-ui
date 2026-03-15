/**
 * Autoloader: automatically imports and registers flint-* components
 * when they appear in the DOM. Useful for CDN/lazy-loading scenarios.
 *
 * Usage:
 *   import '@getufy/flint-ui/autoloader';
 *   // Then just use <flint-button>, <flint-card>, etc. in your HTML
 */

// Track pending imports to avoid duplicate requests
const pendingImports = new Set<string>();

function discover(root: Element) {
  // Check the root element itself
  const rootTag = root.tagName.toLowerCase();
  if (rootTag.startsWith('flint-')) {
    void register(rootTag);
  }

  // Check all descendants
  root.querySelectorAll(':not(:defined)').forEach((el) => {
    const tag = el.tagName.toLowerCase();
    if (tag.startsWith('flint-')) {
      void register(tag);
    }
  });
}

/**
 * Maps a tag name like 'flint-button' to its module path.
 * Components follow the pattern: ./component-name/flint-component-name.js
 * Some components are nested differently, so we maintain a tag-to-path map.
 */
function getComponentPath(tagName: string): string | null {
  // Strip "flint-" prefix to get the component directory name
  const name = tagName.replace(/^flint-/, '');
  // The module path follows the subpath export pattern
  return `./${name}/${tagName}.js`;
}

async function register(tagName: string) {
  if (customElements.get(tagName) || pendingImports.has(tagName)) return;

  pendingImports.add(tagName);

  const path = getComponentPath(tagName);
  if (!path) return;

  try {
    // Dynamic import — bundlers handle this correctly
    await import(/* @vite-ignore */ path);
  } catch {
    // Component module not found — silently ignore
    // This handles sub-components that are registered by their parent
  } finally {
    pendingImports.delete(tagName);
  }
}

// SSR guard: autoloader is browser-only
if (typeof document !== 'undefined') {
  const observer = new MutationObserver((mutations) => {
    for (const { addedNodes } of mutations) {
      for (const node of addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        discover(node as Element);
      }
    }
  });

  // Discover any flint-* elements already in the DOM
  discover(document.body);

  // Watch for future additions
  observer.observe(document.body, { childList: true, subtree: true });
}

export { discover };
