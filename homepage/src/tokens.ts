import React from 'react';

export const c = {
    primary: '#3b82f6', primaryLight: '#eff6ff',
    dark: '#0f172a', text: '#0f172a',
    muted: '#64748b', border: '#e2e8f0',
    surface: '#ffffff', bg: '#f8fafc',
    success: '#22c55e', warning: '#f59e0b', error: '#ef4444',
};

const cDark = {
    primary: '#60a5fa', primaryLight: 'rgba(96,165,250,0.15)',
    dark: '#09090b', text: '#fafafa',
    muted: '#a1a1aa', border: '#3f3f46',
    surface: '#18181b', bg: '#09090b',
    success: '#34d399', warning: '#fbbf24', error: '#f87171',
};

export function getColors(dark: boolean) {
    return dark ? cDark : c;
}

export const row = (gap = 12): React.CSSProperties => ({ display: 'flex', alignItems: 'center', gap, flexWrap: 'wrap' as const });
export const col = (gap = 12): React.CSSProperties => ({ display: 'flex', flexDirection: 'column', gap });
export const card = (extra: React.CSSProperties = {}): React.CSSProperties => ({ background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`, padding: '20px 24px', ...extra });
export const sect = (bg = c.bg): React.CSSProperties => ({ padding: '80px 24px', background: bg, borderTop: `1px solid ${c.border}` });
export const maxW = (extra: React.CSSProperties = {}): React.CSSProperties => ({ maxWidth: 1200, margin: '0 auto', ...extra });
export const grid3 = (extra: React.CSSProperties = {}): React.CSSProperties => ({ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, ...extra });
export const grid2 = (extra: React.CSSProperties = {}): React.CSSProperties => ({ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, ...extra });
