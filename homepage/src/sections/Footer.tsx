import React from 'react';
import { useTheme } from '../ThemeContext';
import { getColors, row, col, maxW } from '../tokens';

export function Footer() {
    const { dark } = useTheme();
    const c = getColors(dark);

    return (
        <footer style={{ background: dark ? '#09090b' : '#0f172a', color: '#94a3b8', padding: 'clamp(32px,6vw,48px) clamp(16px,3vw,24px)', borderTop: `1px solid ${dark ? '#27272a' : '#1e293b'}` }}>
            <div style={{ ...maxW(), display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32 }}>
                <div style={col(8)}>
                    <div style={row(10)}>
                        <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill={c.primary} /><path d="M8 10l4 4-4 4M14 18h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span style={{ fontWeight: 700, color: '#f1f5f9' }}>lite</span>
                    </div>
                    <p style={{ fontSize: 13 }}>Web Component UI · React wrappers · TypeScript first</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px' }}>
                    {['Components', 'Getting Started', 'Storybook', 'GitHub'].map(l => (
                        <a key={l} href="#" style={{ color: '#94a3b8', fontSize: 13, textDecoration: 'none' }}>{l}</a>
                    ))}
                </div>
                <p style={{ fontSize: 12, color: '#64748b' }}>Built with Lit v3 · React 19 · TypeScript · Vite</p>
            </div>
        </footer>
    );
}
