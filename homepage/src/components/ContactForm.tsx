import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { getColors, row } from '../tokens';

export function ContactForm() {
    const { dark } = useTheme();
    const c = getColors(dark);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !subject || !message) {
            setStatus('error');
            setStatusMessage('Please fill in all fields');
            return;
        }

        if (!email.includes('@')) {
            setStatus('error');
            setStatusMessage('Please enter a valid email address');
            return;
        }

        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setStatusMessage('Thank you for reaching out! We will get back to you soon.');
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
    };

    return (
        <div style={{
            padding: '32px',
            background: c.surface,
            border: `1px solid ${c.border}`,
            borderRadius: 12,
            maxWidth: 600
        }}>
            <h2 style={{
                fontSize: 24,
                fontWeight: 700,
                margin: '0 0 12px 0',
                color: c.text
            }}>
                Get in Touch
            </h2>
            <p style={{
                fontSize: 14,
                color: c.muted,
                margin: '0 0 24px 0'
            }}>
                Have a question or want to collaborate? We'd love to hear from you.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                    <label style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 600,
                        color: c.text,
                        marginBottom: 6
                    }}>
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={status === 'loading' || status === 'success'}
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            fontSize: 14,
                            border: `1px solid ${status === 'error' && !name ? '#ef4444' : c.border}`,
                            borderRadius: 6,
                            background: c.bg,
                            color: c.text,
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 600,
                        color: c.text,
                        marginBottom: 6
                    }}>
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === 'loading' || status === 'success'}
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            fontSize: 14,
                            border: `1px solid ${status === 'error' && !email ? '#ef4444' : c.border}`,
                            borderRadius: 6,
                            background: c.bg,
                            color: c.text,
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 600,
                        color: c.text,
                        marginBottom: 6
                    }}>
                        Subject
                    </label>
                    <input
                        type="text"
                        placeholder="What is this about?"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        disabled={status === 'loading' || status === 'success'}
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            fontSize: 14,
                            border: `1px solid ${status === 'error' && !subject ? '#ef4444' : c.border}`,
                            borderRadius: 6,
                            background: c.bg,
                            color: c.text,
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 600,
                        color: c.text,
                        marginBottom: 6
                    }}>
                        Message
                    </label>
                    <textarea
                        placeholder="Your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={status === 'loading' || status === 'success'}
                        style={{
                            width: '100%',
                            minHeight: 120,
                            padding: '10px 14px',
                            fontSize: 14,
                            border: `1px solid ${status === 'error' && !message ? '#ef4444' : c.border}`,
                            borderRadius: 6,
                            background: c.bg,
                            color: c.text,
                            outline: 'none',
                            fontFamily: 'inherit',
                            boxSizing: 'border-box',
                            resize: 'vertical'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    style={{
                        padding: '10px 20px',
                        fontSize: 14,
                        fontWeight: 600,
                        border: 'none',
                        borderRadius: 6,
                        background: c.primary,
                        color: '#ffffff',
                        cursor: status === 'loading' || status === 'success' ? 'not-allowed' : 'pointer',
                        opacity: status === 'loading' || status === 'success' ? 0.6 : 1,
                        transition: 'all 0.2s',
                        alignSelf: 'flex-start'
                    }}
                    onMouseEnter={(e) => {
                        if (status !== 'loading' && status !== 'success') {
                            const el = e.currentTarget as HTMLElement;
                            el.style.opacity = '0.9';
                        }
                    }}
                    onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.opacity = '1';
                    }}
                >
                    {status === 'loading' ? 'Sending...' : status === 'success' ? '✓ Sent' : 'Send Message'}
                </button>

                {statusMessage && (
                    <p style={{
                        fontSize: 13,
                        color: status === 'success' ? '#22c55e' : '#ef4444',
                        margin: '12px 0 0 0',
                        animation: 'fadeIn 0.3s ease-in'
                    }}>
                        {statusMessage}
                    </p>
                )}
            </form>
        </div>
    );
}
