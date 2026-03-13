import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';
import { getColors, maxW } from '../tokens';

const items = [
    { color: '#3b82f6', v: '100+',       l: 'COMPONENTS' },
    { color: '#8b5cf6', v: 'TypeScript',  l: 'FULLY TYPED' },
    { color: '#06b6d4', v: 'Standards',   l: 'CUSTOM ELEMENTS' },
    { color: '#22c55e', v: 'Accessible',  l: 'ARIA COMPLIANT' },
    { color: '#f59e0b', v: 'Themeable',   l: 'CSS CUSTOM PROPS' },
    { color: '#ec4899', v: 'React Ready', l: 'WRAPPER INCLUDED' },
];

function CountUp({ target }: { target: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                const start = performance.now();
                const duration = 1200;
                const step = (now: number) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                    setCount(Math.round(eased * target));
                    if (progress < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            }
        }, { threshold: 0.5 });
        observer.observe(el);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref}>{count}+</span>;
}

export function Stats() {
    const { dark } = useTheme();
    const c = getColors(dark);

    return (
        <section style={{ background: c.surface, padding: '32px 0' }}>
            <div style={{ ...maxW(), display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 8 }}>
                {items.map(s => (
                    <div key={s.l} style={{ padding: '24px 16px', textAlign: 'center' }}>
                        <div style={{ fontSize: 28, fontWeight: 800, color: c.text, marginBottom: 6, letterSpacing: '-0.5px' }}>
                            {s.v === '100+' ? <CountUp target={100} /> : s.v}
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: s.color, letterSpacing: '0.5px' }}>{s.l}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
