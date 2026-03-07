import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { getColors } from './tokens';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Stats } from './sections/Stats';
import { Showcase } from './sections/Showcase';
import { Forms } from './sections/Forms';
import { Data } from './sections/Data';
import { Overlays } from './sections/Overlays';
import { Flow } from './sections/Flow';
import { Interactive } from './sections/Interactive';
import { ComponentList } from './sections/ComponentList';
import { Footer } from './sections/Footer';

function AppInner() {
    const { dark } = useTheme();
    const colors = getColors(dark);

    // Prevent browser from auto-scrolling to hash on page load and during navigation
    useEffect(() => {
        window.history.scrollRestoration = 'manual';

        // On initial load, if there's a hash, scroll to top and handle the hash manually
        if (window.location.hash) {
            window.scrollTo(0, 0);
            const id = window.location.hash.slice(1); // Remove '#' prefix
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        }

        // Handle hash changes by scrolling smoothly instead of jumping
        const handleHashChange = () => {
            const id = window.location.hash.slice(1);
            if (id) {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <div style={{ fontFamily: 'system-ui,-apple-system,sans-serif', color: colors.text, background: colors.bg, minHeight: '100vh', transition: 'background 0.2s, color 0.2s' }}>
            <Header />
            <Hero />
            <Stats />
            <Showcase />
            <Forms />
            <Data />
            <Overlays />
            <Flow />
            <Interactive />
            <ComponentList />
            <Footer />
        </div>
    );
}

export function App() {
    return (
        <ThemeProvider>
            <AppInner />
        </ThemeProvider>
    );
}
