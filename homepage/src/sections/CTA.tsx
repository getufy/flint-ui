import React from 'react';
import { UiButton } from '../../../packages/react/src/components/UiButton';
import { maxW, row, col, gradients } from '../tokens';

export function CTA() {
    return (
        <section style={{ background: gradients.cta, padding: 'clamp(48px,8vw,80px) clamp(16px,3vw,24px)' }}>
            <div style={{ ...maxW(), textAlign: 'center' }}>
                <div style={col(24)}>
                    <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
                        Start building with lite
                    </h2>
                    <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', maxWidth: 480, margin: '0 auto' }}>
                        100+ production-ready components. TypeScript. React wrappers. Dark mode. All free and open source.
                    </p>

                    <div style={{ ...row(12), background: 'rgba(0,0,0,0.2)', borderRadius: 8, padding: '10px 16px', width: 'fit-content', margin: '0 auto', maxWidth: '100%', overflowX: 'auto' }}>
                        <span style={{ color: '#7ee787', fontFamily: 'monospace', fontSize: 13 }}>$</span>
                        <span style={{ color: '#ffffff', fontFamily: 'monospace', fontSize: 13, whiteSpace: 'nowrap' }}>npm install lite</span>
                    </div>

                    <div style={{ ...row(12), justifyContent: 'center' }}>
                        <a href="/docs" style={{ textDecoration: 'none' }}>
                            <UiButton size="large" variant="secondary">Get Started</UiButton>
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <UiButton size="large" variant="secondary">GitHub</UiButton>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
