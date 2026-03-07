import React from 'react';
import { useTheme } from '../ThemeContext';
import { getColors, maxW } from '../tokens';

const items = [
    { color: '#3b82f6', v: '100+',       l: 'Components' },
    { color: '#8b5cf6', v: 'TypeScript',  l: 'Fully typed' },
    { color: '#06b6d4', v: 'Standards',   l: 'Custom Elements' },
    { color: '#22c55e', v: 'Accessible',  l: 'ARIA compliant' },
    { color: '#f59e0b', v: 'Themeable',   l: 'CSS custom props' },
    { color: '#ec4899', v: 'React Ready', l: 'Wrapper included' },
];

export function Stats() {
    const { dark } = useTheme();
    const c = getColors(dark);

    return (
        <section style={{ borderBottom: `1px solid ${c.border}`, background: c.surface }}>
            <div style={{ ...maxW(), display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))' }}>
                {items.map((s, i) => (
                    <div key={s.l} style={{ padding: '24px 16px', textAlign: 'center', borderRight: i < items.length - 1 ? `1px solid ${c.border}` : 'none' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, display: 'inline-block', flexShrink: 0 }} />
                            <span style={{ fontWeight: 700, fontSize: 14, color: c.text }}>{s.v}</span>
                        </div>
                        <div style={{ fontSize: 12, color: c.muted }}>{s.l}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
