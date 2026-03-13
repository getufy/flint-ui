import React from 'react';
import { useTheme } from '../ThemeContext';
import { getColors, getShadows, sect, maxW } from '../tokens';
import { Heading } from '../components/shared';

const features = [
    { title: 'Framework Agnostic', desc: 'Built on Web Components — works in React, Vue, Angular, Svelte, or vanilla JS. No lock-in.', color: '#3b82f6', span: 2 },
    { title: 'Fully Typed', desc: 'Complete TypeScript definitions for every component, prop, event, and slot.', color: '#8b5cf6', span: 1 },
    { title: 'Accessible', desc: 'ARIA roles, keyboard navigation, focus management, and screen reader support built in.', color: '#22c55e', span: 1 },
    { title: 'Themeable', desc: 'CSS custom properties for colors, spacing, and typography. Dark mode included.', color: '#f59e0b', span: 1 },
    { title: 'Tree-shakeable', desc: 'Import only the components you use. Each one is independently bundleable.', color: '#06b6d4', span: 1 },
    { title: 'React Ready', desc: 'Auto-generated React wrappers with forwardRef, event forwarding, and full type safety.', color: '#ec4899', span: 2 },
];

export function Bento() {
    const { dark } = useTheme();
    const c = getColors(dark);
    const s = getShadows(dark);

    return (
        <section id="s-features" style={sect(c.surface, c)}>
            <div style={maxW()}>
                <Heading title="Built for production" sub="Every feature designed to help you ship faster and maintain less." badge="Features" />
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                    gap: 20,
                }}>
                    {features.map(f => (
                        <div
                            key={f.title}
                            style={{
                                gridColumn: f.span === 2 ? 'span 2' : undefined,
                                background: c.surface,
                                borderRadius: 16,
                                boxShadow: s.md,
                                padding: '32px 28px',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'box-shadow 0.2s',
                            }}
                        >
                            {/* Subtle color tint */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                                background: `linear-gradient(90deg, ${f.color}, ${f.color}88)`,
                                borderRadius: '16px 16px 0 0',
                            }} />
                            <div style={{
                                width: 40, height: 40, borderRadius: 10,
                                background: `${f.color}15`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: 16, fontSize: 20,
                            }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: f.color }} />
                            </div>
                            <h3 style={{ fontWeight: 700, fontSize: 18, color: c.text, marginBottom: 8 }}>{f.title}</h3>
                            <p style={{ fontSize: 14, color: c.muted, lineHeight: 1.6 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
