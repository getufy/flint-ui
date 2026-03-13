import React from 'react';
import { useTheme } from '../ThemeContext';
import { getColors, row, col, maxW } from '../tokens';

export function Footer() {
    const { dark } = useTheme();
    const c = getColors(dark);

    // Footer is always dark-toned regardless of theme
    const footerBg = dark ? c.bg : '#0f172a';
    const footerText = dark ? c.muted : '#94a3b8';
    const footerTextBright = dark ? c.text : '#f1f5f9';
    const footerTextDim = dark ? c.muted : '#64748b';

    return (
        <footer style={{ background: footerBg, color: footerText, padding: 'clamp(24px,4vw,36px) clamp(16px,3vw,24px)' }}>
            <div style={{ ...maxW(), display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
                <div style={col(6)}>
                    <div style={row(10)}>
                        <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill={c.primary} /><path d="M8 10l4 4-4 4M14 18h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span style={{ fontWeight: 700, color: footerTextBright }}>lite</span>
                    </div>
                    <p style={{ fontSize: 13 }}>Web Component UI · React wrappers · TypeScript first</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px' }}>
                    {['Components', 'Getting Started', 'Storybook', 'GitHub'].map(l => (
                        <a key={l} href="#" style={{ color: footerText, fontSize: 13, textDecoration: 'none' }}>{l}</a>
                    ))}
                </div>
                <p style={{ fontSize: 12, color: footerTextDim }}>Built with Lit v3 · React 19 · TypeScript · Vite</p>
            </div>
        </footer>
    );
}
