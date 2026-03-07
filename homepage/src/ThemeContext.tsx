import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextValue {
    dark: boolean;
    setDark: (dark: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({ dark: false, setDark: () => {} });

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [dark, setDarkState] = useState<boolean>(() =>
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );
    const [userOverride, setUserOverride] = useState(false);

    // Apply class to <html> whenever dark changes
    useEffect(() => {
        document.documentElement.classList.toggle('ui-theme-dark', dark);
    }, [dark]);

    // Follow system pref unless user has manually toggled
    useEffect(() => {
        if (userOverride) return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => setDarkState(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [userOverride]);

    function setDark(next: boolean) {
        setUserOverride(true);
        setDarkState(next);
    }

    return (
        <ThemeContext.Provider value={{ dark, setDark }}>
            {children}
        </ThemeContext.Provider>
    );
}
