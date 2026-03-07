import React from 'react';
import { c, row, col, maxW } from '../tokens';

export function Footer() {
    return (
        <footer style={{ background: c.dark, color: '#94a3b8', padding: '48px 24px' }}>
            <div style={{ ...maxW(), display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
                <div style={col(8)}>
                    <div style={row(10)}>
                        <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill={c.primary} /><path d="M8 10l4 4-4 4M14 18h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span style={{ fontWeight: 700, color: '#f1f5f9' }}>storybook-lit</span>
                    </div>
                    <p style={{ fontSize: 13 }}>Web Component UI · React wrappers · TypeScript first</p>
                </div>
                <div style={row(32)}>
                    {['Components', 'Getting Started', 'Storybook', 'GitHub'].map(l => (
                        <a key={l} href="#" style={{ color: '#94a3b8', fontSize: 13, textDecoration: 'none' }}>{l}</a>
                    ))}
                </div>
                <p style={{ fontSize: 12 }}>Built with Lit v3 · React 19 · TypeScript · Vite</p>
            </div>
        </footer>
    );
}
