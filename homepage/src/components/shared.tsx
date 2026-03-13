import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import { useBreakpoint } from '../useBreakpoint';
import { getColors, getShadows, glass } from '../tokens';

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

/* ── ShowcaseComposition ── */
export function ShowcaseComposition({ title, description, chips, children, reverse }: {
    title: string; description: string; chips: string[]; children: React.ReactNode; reverse?: boolean;
}) {
    const { dark } = useTheme();
    const c = getColors(dark);
    const { isMobile } = useBreakpoint();

    const textSide = (
        <div style={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: c.text, letterSpacing: '-0.3px' }}>{title}</h3>
            <p style={{ fontSize: 15, color: c.muted, lineHeight: 1.6 }}>{description}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {chips.map(ch => (
                    <span key={ch} style={{ fontSize: 12, fontWeight: 600, background: c.primaryLight, color: c.primary, padding: '4px 12px', borderRadius: 12 }}>{ch}</span>
                ))}
            </div>
        </div>
    );

    const demoSide = (
        <div style={{ flex: '0 0 65%', ...glass(dark), padding: 32, borderRadius: 16, border: `1px solid ${c.border}`, minHeight: 200 }}>
            {children}
        </div>
    );

    if (isMobile) {
        return <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>{demoSide}{textSide}</div>;
    }

    return (
        <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexDirection: reverse ? 'row-reverse' : 'row' }}>
            {textSide}{demoSide}
        </div>
    );
}

/* ── ShowcaseCard ── */
export function ShowcaseCard({ title, desc, span, flush, children, visible = true }: {
    title: string; desc: string; span: number; flush?: boolean; children: React.ReactNode; visible?: boolean;
}) {
    const { dark } = useTheme();
    const c = getColors(dark);
    const s = getShadows(dark);
    const { isMobile } = useBreakpoint();
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                gridColumn: isMobile ? undefined : `span ${span}`,
                background: c.surface,
                border: `1px solid ${hovered ? `${c.primary}33` : c.border}`,
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: hovered ? s.md : s.sm,
                transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s, opacity 0.3s',
                opacity: visible ? 1 : 0.15,
            }}
        >
            <div style={{
                background: flush ? undefined : c.bg,
                borderRadius: flush ? 0 : 8,
                padding: flush ? 0 : '24px 20px',
                margin: flush ? 0 : 8,
                minHeight: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}>
                {children}
            </div>
            <div style={{ padding: '12px 16px 16px' }}>
                <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: c.text }}>{title}</p>
                <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.5 }}>{desc}</p>
            </div>
        </div>
    );
}

/* ── CategoryFilter ── */
export function CategoryFilter({ categories, active, onChange }: {
    categories: { key: string; label: string; count: number }[];
    active: string;
    onChange: (key: string) => void;
}) {
    const { dark } = useTheme();
    const c = getColors(dark);
    const containerRef = useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const activeBtn = container.querySelector(`[data-key="${active}"]`) as HTMLElement | null;
        if (activeBtn) {
            setIndicator({ left: activeBtn.offsetLeft, width: activeBtn.offsetWidth });
        }
    }, [active]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '48px 0 40px' }}>
            <div ref={containerRef} style={{ display: 'inline-flex', gap: 0, background: dark ? '#27272a' : '#f1f5f9', borderRadius: 24, padding: 4, position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    top: 4, left: indicator.left, width: indicator.width, height: 'calc(100% - 8px)',
                    background: dark ? c.border : c.bg,
                    borderRadius: 20,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)',
                }} />
                {categories.map(cat => (
                    <button
                        key={cat.key}
                        data-key={cat.key}
                        onClick={() => onChange(cat.key)}
                        style={{
                            padding: '8px 18px',
                            borderRadius: 20,
                            border: 'none',
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            background: 'transparent',
                            color: active === cat.key ? c.text : c.muted,
                            position: 'relative',
                            zIndex: 1,
                            transition: 'color 0.2s',
                        }}
                    >
                        {cat.label}{cat.key !== 'all' && <span style={{ color: c.muted, fontWeight: 400, marginLeft: 4 }}>({cat.count})</span>}
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ── ComponentStrip ── */
export function ComponentStrip({ children }: { children: React.ReactNode }) {
    const { dark } = useTheme();

    return (
        <div style={{ position: 'relative' }}>
            <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0, width: 48, zIndex: 2,
                background: `linear-gradient(to right, ${dark ? '#09090b' : '#f8fafc'}, transparent)`,
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', top: 0, right: 0, bottom: 0, width: 48, zIndex: 2,
                background: `linear-gradient(to left, ${dark ? '#09090b' : '#f8fafc'}, transparent)`,
                pointerEvents: 'none',
            }} />
            <div style={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                gap: 16,
                paddingBottom: 4,
                scrollbarWidth: 'none',
            }}>
                {children}
            </div>
        </div>
    );
}

/* ── StripItem ── */
export function StripItem({ label, children, visible = true }: { label: string; children: React.ReactNode; visible?: boolean }) {
    const { dark } = useTheme();
    const c = getColors(dark);
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: 200, minHeight: 160, flexShrink: 0,
                scrollSnapAlign: 'start',
                border: `1px solid ${hovered ? `${c.primary}33` : c.border}`,
                borderRadius: 12, padding: 20,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
                transition: 'border-color 0.25s, opacity 0.3s',
                opacity: visible ? 1 : 0.15,
            }}
        >
            {children}
            <span style={{ fontSize: 13, color: c.muted }}>{label}</span>
        </div>
    );
}
