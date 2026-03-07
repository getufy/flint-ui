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

type Colors = typeof c;

export const row = (gap = 12): React.CSSProperties => ({ display: 'flex', alignItems: 'center', gap, flexWrap: 'wrap' as const });
export const col = (gap = 12): React.CSSProperties => ({ display: 'flex', flexDirection: 'column', gap });
export const card = (extra: React.CSSProperties = {}, colors: Colors = c): React.CSSProperties => ({ background: colors.surface, borderRadius: 12, border: `1px solid ${colors.border}`, padding: '20px 24px', ...extra });
// clamp() for padding means no JS breakpoint needed: scales from 48px → 80px vertically, 16px → 24px horizontally
export const sect = (bg?: string, colors: Colors = c): React.CSSProperties => ({ padding: 'clamp(48px,8vw,80px) clamp(16px,3vw,24px)', background: bg ?? colors.bg, borderTop: `1px solid ${colors.border}` });
export const maxW = (extra: React.CSSProperties = {}): React.CSSProperties => ({ maxWidth: 1200, margin: '0 auto', ...extra });
// auto-fit/minmax lets columns wrap naturally: 3-up on wide, 2-up on mid, 1-up on narrow
export const grid3 = (extra: React.CSSProperties = {}): React.CSSProperties => ({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: 20, ...extra });
export const grid2 = (extra: React.CSSProperties = {}): React.CSSProperties => ({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 24, ...extra });
