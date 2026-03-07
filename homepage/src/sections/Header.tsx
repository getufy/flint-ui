import React from 'react';
import { UiButton } from '../../../react/src/components/UiButton';
import { c, row, maxW } from '../tokens';

export function Header() {
    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${c.border}` }}>
            <div style={{ ...maxW(), height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
                <div style={row(10)}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill={c.primary} /><path d="M8 10l4 4-4 4M14 18h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>storybook-lit</span>
                    <span style={{ fontSize: 11, fontWeight: 600, background: c.primaryLight, color: c.primary, padding: '2px 8px', borderRadius: 20 }}>v1.0</span>
                </div>
                <nav style={row(4)}>
                    {['Components', 'Forms', 'Data', 'Overlays', 'Flow'].map(l => (
                        <a key={l} href={`#s-${l.toLowerCase()}`} style={{ fontSize: 14, fontWeight: 500, color: c.muted, textDecoration: 'none', padding: '6px 12px', borderRadius: 6 }}>{l}</a>
                    ))}
                    <UiButton size="small" variant="secondary">GitHub ↗</UiButton>
                </nav>
            </div>
        </header>
    );
}
