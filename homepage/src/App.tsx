import React from 'react';
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
