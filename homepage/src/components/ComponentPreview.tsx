import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { getColors } from '../tokens';

interface CodeExample {
    label: string;
    code: string;
    language?: string;
}

interface ComponentPreviewProps {
    title: string;
    description: string;
    children: React.ReactNode;
    examples?: CodeExample[];
}

export function ComponentPreview({
    title,
    description,
    children,
    examples = []
}: ComponentPreviewProps) {
    const { dark } = useTheme();
    const c = getColors(dark);
    const [activeExample, setActiveExample] = useState(0);

    return (
        <div style={{
            background: c.surface,
            borderRadius: 12,
            border: `1px solid ${c.border}`,
            overflow: 'hidden',
            marginBottom: 40
        }}>
            {/* Header */}
            <div style={{
                padding: '24px',
                borderBottom: `1px solid ${c.border}`,
                background: dark ? '#18181b' : '#f8fafc'
            }}>
                <h3 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    margin: '0 0 8px 0',
                    color: c.text
                }}>
                    {title}
                </h3>
                <p style={{
                    fontSize: 14,
                    color: c.muted,
                    margin: 0,
                    lineHeight: 1.5
                }}>
                    {description}
                </p>
            </div>

            {/* Preview */}
            <div style={{
                padding: '32px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 200,
                background: c.bg,
                borderBottom: examples.length > 0 ? `1px solid ${c.border}` : 'none'
            }}>
                {children}
            </div>

            {/* Code Examples */}
            {examples.length > 0 && (
                <div>
                    {/* Tabs */}
                    <div style={{
                        display: 'flex',
                        borderBottom: `1px solid ${c.border}`,
                        background: c.surface
                    }}>
                        {examples.map((example, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveExample(idx)}
                                style={{
                                    padding: '12px 16px',
                                    border: 'none',
                                    background: activeExample === idx ? c.bg : 'transparent',
                                    color: activeExample === idx ? c.primary : c.muted,
                                    fontWeight: activeExample === idx ? 600 : 400,
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    borderBottom: activeExample === idx ? `2px solid ${c.primary}` : 'none',
                                    marginBottom: activeExample === idx ? '-1px' : 0
                                }}
                            >
                                {example.label}
                            </button>
                        ))}
                    </div>

                    {/* Code */}
                    <pre style={{
                        padding: '16px 24px',
                        margin: 0,
                        background: dark ? '#1e293b' : '#f8fafc',
                        color: dark ? '#e2e8f0' : '#0f172a',
                        fontSize: 13,
                        fontFamily: 'monospace',
                        overflow: 'auto',
                        lineHeight: 1.6
                    }}>
                        <code>{examples[activeExample]?.code}</code>
                    </pre>

                    {/* Copy button */}
                    <div style={{
                        padding: '12px 24px',
                        background: c.surface,
                        borderTop: `1px solid ${c.border}`,
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(examples[activeExample]?.code || '');
                            }}
                            style={{
                                padding: '8px 16px',
                                fontSize: 13,
                                fontWeight: 600,
                                border: `1px solid ${c.border}`,
                                borderRadius: 6,
                                background: 'transparent',
                                color: c.muted,
                                cursor: 'pointer'
                            }}
                        >
                            Copy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
