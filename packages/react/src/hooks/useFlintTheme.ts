import { useState, useEffect, useCallback } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

interface UseFlintThemeReturn {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    isDark: boolean;
}

/**
 * React hook for controlling Flint UI theme mode.
 * Syncs with the `data-theme` attribute on `document.documentElement`.
 */
export function useFlintTheme(): UseFlintThemeReturn {
    const [mode, setModeState] = useState<ThemeMode>(() => {
        if (typeof document === 'undefined') return 'light';
        return (document.documentElement.getAttribute('data-theme') as ThemeMode) || 'light';
    });

    const [isDark, setIsDark] = useState(false);

    const setMode = useCallback((newMode: ThemeMode) => {
        if (typeof document === 'undefined') return;
        document.documentElement.setAttribute('data-theme', newMode);
        setModeState(newMode);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const updateDark = () => {
            if (mode === 'auto') {
                setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
            } else {
                setIsDark(mode === 'dark');
            }
        };
        updateDark();

        if (mode === 'auto') {
            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            mq.addEventListener('change', updateDark);
            return () => mq.removeEventListener('change', updateDark);
        }
    }, [mode]);

    // Watch for external data-theme changes
    useEffect(() => {
        if (typeof document === 'undefined') return;
        const observer = new MutationObserver(() => {
            const current = document.documentElement.getAttribute('data-theme') as ThemeMode;
            if (current && current !== mode) {
                setModeState(current);
            }
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, [mode]);

    return { mode, setMode, isDark };
}
