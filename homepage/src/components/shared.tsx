import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { getColors, getShadows } from '../tokens';

export function Heading({ title, sub, badge }: { title: React.ReactNode; sub: string; badge?: string }) {
    const { dark } = useTheme();
    const c = getColors(dark);
    return (
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
            {badge && (
                <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 600, color: c.primary, background: c.primaryLight, padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>{badge}</span>
            )}
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 12, color: c.text }}>{title}</h2>
            <p style={{ fontSize: 17, color: c.muted, maxWidth: 520, margin: '0 auto' }}>{sub}</p>
        </div>
    );
}

export function ShowCard({ title, desc, children, span2 = false }: { title: string; desc: string; children: React.ReactNode; span2?: boolean }) {
    const { dark } = useTheme();
    const c = getColors(dark);
    const s = getShadows(dark);
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: c.surface,
                borderRadius: 12,
                boxShadow: hovered ? s.lg : s.md,
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                gridColumn: span2 ? 'span 2' : undefined,
                transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'box-shadow 0.2s, transform 0.2s',
            }}
        >
            <div style={{ background: c.bg, borderRadius: 8, padding: '20px 16px', minHeight: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
                {children}
            </div>
            <div>
                <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: c.text }}>{title}</p>
                <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.5 }}>{desc}</p>
            </div>
        </div>
    );
}
