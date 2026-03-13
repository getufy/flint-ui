import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'system' | 'light' | 'dark';

interface ThemeContextValue {
    dark: boolean;
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
    dark: false,
    mode: 'system',
    setMode: () => {},
});

export function useTheme() {
    return useContext(ThemeContext);
}

/** Resolve system preference to a boolean. */
function getSystemDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<ThemeMode>('system');

    // Resolved dark boolean — derived from mode + system preference
    const [systemDark, setSystemDark] = useState(getSystemDark);
    const dark = mode === 'dark' || (mode === 'system' && systemDark);

    // Follow live system preference changes (only matters when mode === 'system')
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    // Sync classes on <html>.
    //  - 'system': no classes — let the @media (prefers-color-scheme: dark) rule handle it
    //  - 'dark':   .ui-theme-dark
    //  - 'light':  .ui-theme-light — opts out of the @media dark fallback
    useEffect(() => {
        const cl = document.documentElement.classList;
        cl.toggle('ui-theme-dark', mode === 'dark');
        cl.toggle('ui-theme-light', mode === 'light');
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ dark, mode, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
}
