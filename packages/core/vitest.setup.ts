// Suppress Lit dev mode warnings before Lit initializes
(globalThis as any).litIssuedWarnings = new Set(['dev-mode', 'change-in-update', 'multiple-versions']);

const originalWarn = console.warn;
console.warn = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Lit is in dev mode')) {
        return;
    }
    originalWarn(...args);
};
