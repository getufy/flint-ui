import React, { useState } from 'react';
import { UiButton } from '../../../react/src/components/UiButton';
import { c, row, maxW } from '../tokens';

export function Header() {
    const [dark, setDark] = useState(false);

    function toggleDark() {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle('ui-theme-dark', next);
    }

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
                    <button
                        onClick={toggleDark}
                        title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, border: `1px solid ${c.border}`, background: 'transparent', cursor: 'pointer', color: c.muted }}
                    >
                        {dark
                            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        }
                    </button>
                    <UiButton size="small" variant="secondary">GitHub ↗</UiButton>
                </nav>
            </div>
        </header>
    );
}
