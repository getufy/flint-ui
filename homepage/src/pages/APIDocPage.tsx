import React, { useState, useMemo } from 'react';
import { ThemeProvider, useTheme } from '../ThemeContext';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import { getColors, maxW } from '../tokens';
import { AnimatedSection } from '../components/AnimatedSection';

interface ComponentDoc {
    id: string;
    name: string;
    category: string;
    description: string;
    props: Array<{ name: string; type: string; required: boolean; description: string }>;
    events: Array<{ name: string; detail: string; description: string }>;
    cssProps: Array<{ name: string; default: string; description: string }>;
    example: string;
}

const componentDocs: ComponentDoc[] = [
    {
        id: 'button',
        name: 'Button',
        category: 'Form',
        description: 'A reusable button component for user interactions',
        props: [
            { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost'", required: false, description: 'Visual style variant' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", required: false, description: 'Button size' },
            { name: 'disabled', type: 'boolean', required: false, description: 'Disable button interactions' },
            { name: 'loading', type: 'boolean', required: false, description: 'Show loading state' },
        ],
        events: [
            { name: 'click', detail: 'MouseEvent', description: 'Fired when button is clicked' },
            { name: 'ui-button-click', detail: '{ timestamp: number }', description: 'Custom button click event' },
        ],
        cssProps: [
            { name: '--ui-button-padding', default: '8px 16px', description: 'Button padding' },
            { name: '--ui-button-font-size', default: '14px', description: 'Button font size' },
            { name: '--ui-button-border-radius', default: '6px', description: 'Button border radius' },
        ],
        example: '<ui-button variant="primary">Click me</ui-button>',
    },
    {
        id: 'input',
        name: 'Input',
        category: 'Form',
        description: 'Text input field for user data entry',
        props: [
            { name: 'type', type: "'text' | 'email' | 'password' | 'number'", required: false, description: 'Input type' },
            { name: 'placeholder', type: 'string', required: false, description: 'Placeholder text' },
            { name: 'disabled', type: 'boolean', required: false, description: 'Disable input' },
            { name: 'required', type: 'boolean', required: false, description: 'Mark as required' },
            { name: 'value', type: 'string', required: false, description: 'Input value' },
        ],
        events: [
            { name: 'input', detail: 'InputEvent', description: 'Fired on input change' },
            { name: 'change', detail: 'Event', description: 'Fired when input loses focus' },
        ],
        cssProps: [
            { name: '--ui-input-padding', default: '8px 12px', description: 'Input padding' },
            { name: '--ui-input-border-color', default: '#ccc', description: 'Input border color' },
            { name: '--ui-input-border-radius', default: '4px', description: 'Input border radius' },
        ],
        example: '<ui-input type="email" placeholder="Enter email" />',
    },
    {
        id: 'card',
        name: 'Card',
        category: 'Layout',
        description: 'Container for grouped content with elevation',
        props: [
            { name: 'variant', type: "'elevated' | 'outlined' | 'filled'", required: false, description: 'Card visual style' },
            { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", required: false, description: 'Content padding' },
        ],
        events: [],
        cssProps: [
            { name: '--ui-card-background', default: '#fff', description: 'Card background color' },
            { name: '--ui-card-border-radius', default: '8px', description: 'Card border radius' },
            { name: '--ui-card-shadow', default: '0 2px 4px rgba(0,0,0,0.1)', description: 'Card shadow' },
        ],
        example: '<ui-card><h3>Card Title</h3><p>Card content</p></ui-card>',
    },
    {
        id: 'modal',
        name: 'Modal',
        category: 'Overlay',
        description: 'Dialog overlay for focused user interactions',
        props: [
            { name: 'open', type: 'boolean', required: true, description: 'Control modal visibility' },
            { name: 'title', type: 'string', required: false, description: 'Modal title' },
            { name: 'closeOnBackdrop', type: 'boolean', required: false, description: 'Close when clicking backdrop' },
            { name: 'closeOnEscape', type: 'boolean', required: false, description: 'Close on Escape key' },
        ],
        events: [
            { name: 'ui-modal-open', detail: '{}', description: 'Fired when modal opens' },
            { name: 'ui-modal-close', detail: '{}', description: 'Fired when modal closes' },
        ],
        cssProps: [
            { name: '--ui-modal-backdrop-color', default: 'rgba(0,0,0,0.5)', description: 'Backdrop color' },
            { name: '--ui-modal-max-width', default: '500px', description: 'Modal maximum width' },
        ],
        example: '<ui-modal open="true" title="Confirm"><p>Are you sure?</p></ui-modal>',
    },
];

const categories = ['All', 'Form', 'Layout', 'Overlay', 'Data', 'Navigation'];

function APIDocPageInner() {
    const { dark } = useTheme();
    const c = getColors(dark);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedComponent, setSelectedComponent] = useState<ComponentDoc | null>(null);

    const filteredDocs = useMemo(() => {
        return selectedCategory === 'All'
            ? componentDocs
            : componentDocs.filter(doc => doc.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <div style={{ fontFamily: 'system-ui,-apple-system,sans-serif' }}>
            <Header />

            {/* Hero */}
            <section style={{
                padding: '80px 24px',
                background: `linear-gradient(135deg, ${dark ? '#18181b' : '#f8fafc'} 0%, ${dark ? '#27272a' : '#f1f5f9'} 100%)`
            }}>
                <div style={maxW()}>
                    <AnimatedSection animation="slideUp">
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 900,
                            margin: 0,
                            color: c.text
                        }}>
                            API Documentation
                        </h1>
                        <p style={{
                            fontSize: 18,
                            color: c.muted,
                            marginTop: 16,
                            maxWidth: 600
                        }}>
                            Complete reference for all Lite components, props, events, and CSS custom properties
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Content */}
            <section style={{ padding: '80px 24px' }}>
                <div style={maxW()}>
                    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 48 }}>
                        {/* Sidebar */}
                        <div style={{ position: 'sticky', top: 100, height: 'fit-content' }}>
                            <div style={{ marginBottom: 24 }}>
                                <h3 style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: c.muted,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    marginBottom: 12
                                }}>
                                    Categories
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                setSelectedCategory(cat);
                                                setSelectedComponent(null);
                                            }}
                                            style={{
                                                padding: '8px 12px',
                                                border: 'none',
                                                borderRadius: 6,
                                                background: selectedCategory === cat ? c.primary : 'transparent',
                                                color: selectedCategory === cat ? '#fff' : c.text,
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                fontSize: 14,
                                                fontWeight: selectedCategory === cat ? 600 : 500,
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: c.muted,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    marginBottom: 12
                                }}>
                                    Components
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {filteredDocs.map(doc => (
                                        <button
                                            key={doc.id}
                                            onClick={() => setSelectedComponent(doc)}
                                            style={{
                                                padding: '8px 12px',
                                                border: `1px solid ${selectedComponent?.id === doc.id ? c.primary : c.border}`,
                                                borderRadius: 6,
                                                background: selectedComponent?.id === doc.id ? `${c.primary}15` : 'transparent',
                                                color: c.text,
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                fontSize: 14,
                                                fontWeight: selectedComponent?.id === doc.id ? 600 : 500,
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {doc.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div>
                            {selectedComponent ? (
                                <AnimatedSection animation="slideUp">
                                    <div>
                                        <h2 style={{
                                            fontSize: 32,
                                            fontWeight: 700,
                                            marginBottom: 12,
                                            color: c.text
                                        }}>
                                            {selectedComponent.name}
                                        </h2>
                                        <p style={{
                                            fontSize: 16,
                                            color: c.muted,
                                            marginBottom: 32,
                                            lineHeight: 1.6
                                        }}>
                                            {selectedComponent.description}
                                        </p>

                                        {/* Props */}
                                        <div style={{ marginBottom: 48 }}>
                                            <h3 style={{
                                                fontSize: 20,
                                                fontWeight: 700,
                                                marginBottom: 16,
                                                color: c.text
                                            }}>
                                                Props
                                            </h3>
                                            <div style={{
                                                border: `1px solid ${c.border}`,
                                                borderRadius: 8,
                                                overflow: 'hidden'
                                            }}>
                                                {selectedComponent.props.map((prop, idx) => (
                                                    <div
                                                        key={prop.name}
                                                        style={{
                                                            padding: 16,
                                                            borderBottom: idx !== selectedComponent.props.length - 1 ? `1px solid ${c.border}` : 'none',
                                                            background: idx % 2 === 0 ? c.surface : 'transparent'
                                                        }}
                                                    >
                                                        <div style={{
                                                            display: 'flex',
                                                            gap: 12,
                                                            marginBottom: 8,
                                                            alignItems: 'center'
                                                        }}>
                                                            <code style={{
                                                                padding: '4px 8px',
                                                                background: dark ? '#1f2937' : '#f3f4f6',
                                                                borderRadius: 4,
                                                                fontSize: 13,
                                                                color: c.primary,
                                                                fontWeight: 600
                                                            }}>
                                                                {prop.name}
                                                            </code>
                                                            <span style={{
                                                                fontSize: 12,
                                                                color: c.muted,
                                                                fontFamily: 'monospace'
                                                            }}>
                                                                {prop.type}
                                                            </span>
                                                            {prop.required && (
                                                                <span style={{
                                                                    fontSize: 12,
                                                                    padding: '2px 6px',
                                                                    background: '#ef4444',
                                                                    color: '#fff',
                                                                    borderRadius: 3
                                                                }}>
                                                                    Required
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p style={{
                                                            fontSize: 14,
                                                            color: c.muted,
                                                            margin: 0
                                                        }}>
                                                            {prop.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Events */}
                                        {selectedComponent.events.length > 0 && (
                                            <div style={{ marginBottom: 48 }}>
                                                <h3 style={{
                                                    fontSize: 20,
                                                    fontWeight: 700,
                                                    marginBottom: 16,
                                                    color: c.text
                                                }}>
                                                    Events
                                                </h3>
                                                <div style={{
                                                    border: `1px solid ${c.border}`,
                                                    borderRadius: 8,
                                                    overflow: 'hidden'
                                                }}>
                                                    {selectedComponent.events.map((event, idx) => (
                                                        <div
                                                            key={event.name}
                                                            style={{
                                                                padding: 16,
                                                                borderBottom: idx !== selectedComponent.events.length - 1 ? `1px solid ${c.border}` : 'none',
                                                                background: idx % 2 === 0 ? c.surface : 'transparent'
                                                            }}
                                                        >
                                                            <div style={{ marginBottom: 8 }}>
                                                                <code style={{
                                                                    padding: '4px 8px',
                                                                    background: dark ? '#1f2937' : '#f3f4f6',
                                                                    borderRadius: 4,
                                                                    fontSize: 13,
                                                                    color: c.primary,
                                                                    fontWeight: 600
                                                                }}>
                                                                    {event.name}
                                                                </code>
                                                            </div>
                                                            <p style={{
                                                                fontSize: 13,
                                                                color: c.muted,
                                                                margin: '8px 0 0 0',
                                                                fontFamily: 'monospace'
                                                            }}>
                                                                Detail: {event.detail}
                                                            </p>
                                                            <p style={{
                                                                fontSize: 14,
                                                                color: c.muted,
                                                                margin: '8px 0 0 0'
                                                            }}>
                                                                {event.description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* CSS Props */}
                                        {selectedComponent.cssProps.length > 0 && (
                                            <div style={{ marginBottom: 48 }}>
                                                <h3 style={{
                                                    fontSize: 20,
                                                    fontWeight: 700,
                                                    marginBottom: 16,
                                                    color: c.text
                                                }}>
                                                    CSS Custom Properties
                                                </h3>
                                                <div style={{
                                                    border: `1px solid ${c.border}`,
                                                    borderRadius: 8,
                                                    overflow: 'hidden'
                                                }}>
                                                    {selectedComponent.cssProps.map((prop, idx) => (
                                                        <div
                                                            key={prop.name}
                                                            style={{
                                                                padding: 16,
                                                                borderBottom: idx !== selectedComponent.cssProps.length - 1 ? `1px solid ${c.border}` : 'none',
                                                                background: idx % 2 === 0 ? c.surface : 'transparent'
                                                            }}
                                                        >
                                                            <code style={{
                                                                padding: '4px 8px',
                                                                background: dark ? '#1f2937' : '#f3f4f6',
                                                                borderRadius: 4,
                                                                fontSize: 13,
                                                                color: c.primary,
                                                                fontWeight: 600,
                                                                marginBottom: 8,
                                                                display: 'inline-block'
                                                            }}>
                                                                {prop.name}
                                                            </code>
                                                            <p style={{
                                                                fontSize: 13,
                                                                color: c.muted,
                                                                margin: '8px 0 0 0',
                                                                fontFamily: 'monospace'
                                                            }}>
                                                                Default: {prop.default}
                                                            </p>
                                                            <p style={{
                                                                fontSize: 14,
                                                                color: c.muted,
                                                                margin: '8px 0 0 0'
                                                            }}>
                                                                {prop.description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Example */}
                                        <div>
                                            <h3 style={{
                                                fontSize: 20,
                                                fontWeight: 700,
                                                marginBottom: 16,
                                                color: c.text
                                            }}>
                                                Usage Example
                                            </h3>
                                            <pre style={{
                                                padding: 16,
                                                background: dark ? '#1f2937' : '#f3f4f6',
                                                borderRadius: 8,
                                                overflow: 'auto',
                                                color: c.text,
                                                fontFamily: 'monospace',
                                                fontSize: 14,
                                                lineHeight: 1.6
                                            }}>
                                                {selectedComponent.example}
                                            </pre>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                    <p style={{ fontSize: 18, color: c.muted }}>
                                        Select a component to view its API documentation
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export function APIDocPage() {
    return (
        <ThemeProvider>
            <APIDocPageInner />
        </ThemeProvider>
    );
}
