const originalWarn = console.warn;
console.warn = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Lit is in dev mode')) {
        return;
    }
    originalWarn(...args);
};
