import React from 'react';
import { c, maxW } from '../tokens';

export function Stats() {
    const items = [
        { icon: '⚡', v: '100+', l: 'Components' }, { icon: '🔷', v: 'TypeScript', l: 'Fully typed' },
        { icon: '🌐', v: 'Standards', l: 'Custom Elements' }, { icon: '♿', v: 'Accessible', l: 'ARIA compliant' },
        { icon: '🎨', v: 'Themeable', l: 'CSS custom props' }, { icon: '⚛️', v: 'React Ready', l: 'Wrapper included' },
    ];
    return (
        <section style={{ borderBottom: `1px solid ${c.border}`, background: c.surface }}>
            <div style={{ ...maxW(), display: 'grid', gridTemplateColumns: 'repeat(6,1fr)' }}>
                {items.map((s, i) => (
                    <div key={s.l} style={{ padding: '24px 16px', textAlign: 'center', borderRight: i < 5 ? `1px solid ${c.border}` : 'none' }}>
                        <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{s.v}</div>
                        <div style={{ fontSize: 12, color: c.muted }}>{s.l}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
