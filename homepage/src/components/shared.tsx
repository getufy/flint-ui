import React from 'react';
import { useTheme } from '../ThemeContext';
import { getColors } from '../tokens';

export function Heading({ title, sub }: { title: React.ReactNode; sub: string }) {
    const { dark } = useTheme();
    const c = getColors(dark);
    return (
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 12, color: c.text }}>{title}</h2>
            <p style={{ fontSize: 17, color: c.muted, maxWidth: 520, margin: '0 auto' }}>{sub}</p>
        </div>
    );
}

export function ShowCard({ title, desc, children, span2 = false }: { title: string; desc: string; children: React.ReactNode; span2?: boolean }) {
    const { dark } = useTheme();
    const c = getColors(dark);
    return (
        <div style={{ background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16, gridColumn: span2 ? 'span 2' : undefined }}>
            <div style={{ background: c.bg, borderRadius: 8, border: `1px solid ${c.border}`, padding: '20px 16px', minHeight: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
                {children}
            </div>
            <div>
                <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: c.text }}>{title}</p>
                <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.5 }}>{desc}</p>
            </div>
        </div>
    );
}
