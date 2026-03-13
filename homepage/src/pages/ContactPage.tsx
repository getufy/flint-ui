import React from 'react';
import { useTheme } from '../ThemeContext';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import { getColors, maxW } from '../tokens';
import { AnimatedSection } from '../components/AnimatedSection';
import { ContactForm } from '../components/ContactForm';

export function ContactPage() {
    const { dark } = useTheme();
    const c = getColors(dark);

    return (
        <div style={{ fontFamily: 'system-ui,-apple-system,sans-serif', color: c.text, background: c.bg, minHeight: '100vh', transition: 'background 0.2s, color 0.2s' }}>
            <Header />

            {/* Hero */}
            <section style={{
                padding: '80px 24px',
                background: `linear-gradient(135deg, ${dark ? c.bg : '#f8fafc'} 0%, ${dark ? c.surface : '#f1f5f9'} 100%)`
            }}>
                <div style={maxW()}>
                    <AnimatedSection animation="slideUp">
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 900,
                            margin: 0,
                            color: c.text
                        }}>
                            Contact Us
                        </h1>
                        <p style={{
                            fontSize: 18,
                            color: c.muted,
                            marginTop: 16,
                            maxWidth: 600
                        }}>
                            Questions, feedback, or partnership opportunities? Reach out and let's connect.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Contact Section */}
            <section style={{ padding: '80px 24px' }}>
                <div style={maxW()}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: 48,
                        marginBottom: 64
                    }}>
                        {/* Contact Info */}
                        <div>
                            <h2 style={{
                                fontSize: 20,
                                fontWeight: 700,
                                marginBottom: 32,
                                color: c.text
                            }}>
                                Get in touch
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                <div>
                                    <h3 style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: c.text,
                                        marginBottom: 8
                                    }}>
                                        Email
                                    </h3>
                                    <a href="mailto:hello@lite.dev" style={{
                                        fontSize: 14,
                                        color: c.primary,
                                        textDecoration: 'none'
                                    }}>
                                        hello@lite.dev
                                    </a>
                                </div>

                                <div>
                                    <h3 style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: c.text,
                                        marginBottom: 8
                                    }}>
                                        GitHub
                                    </h3>
                                    <a href="https://github.com/anthropics/lite" target="_blank" rel="noopener noreferrer" style={{
                                        fontSize: 14,
                                        color: c.primary,
                                        textDecoration: 'none'
                                    }}>
                                        github.com/anthropics/lite
                                    </a>
                                </div>

                                <div>
                                    <h3 style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: c.text,
                                        marginBottom: 8
                                    }}>
                                        Response Time
                                    </h3>
                                    <p style={{
                                        fontSize: 14,
                                        color: c.muted,
                                        margin: 0
                                    }}>
                                        We typically respond within 24 hours
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <AnimatedSection animation="slideUp" delay={0.1}>
                            <ContactForm />
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
