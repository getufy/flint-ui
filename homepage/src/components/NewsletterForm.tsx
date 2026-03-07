import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { getColors, row } from '../tokens';

export function NewsletterForm() {
    const { dark } = useTheme();
    const c = getColors(dark);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setStatus('error');
            setMessage('Please enter a valid email address');
            return;
        }

        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setMessage('Thank you for subscribing!');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
    };

    return (
        <div style={{
            padding: '32px',
            background: c.surface,
            border: `1px solid ${c.border}`,
            borderRadius: 12
        }}>
            <h3 style={{
                fontSize: 20,
                fontWeight: 700,
                margin: '0 0 12px 0',
                color: c.text
            }}>
                Stay updated
            </h3>
            <p style={{
                fontSize: 14,
                color: c.muted,
                margin: '0 0 20px 0'
            }}>
                Subscribe to our newsletter for the latest updates and tips
            </p>

            <form onSubmit={handleSubmit} style={row(12)}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    style={{
                        flex: 1,
                        padding: '10px 14px',
                        fontSize: 14,
                        border: `1px solid ${status === 'error' ? '#ef4444' : c.border}`,
                        borderRadius: 6,
                        background: c.bg,
                        color: c.text,
                        outline: 'none',
                        minWidth: 0
                    }}
                />
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
                        whiteSpace: 'nowrap'
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
                    {status === 'loading' ? 'Subscribing...' : status === 'success' ? '✓ Subscribed' : 'Subscribe'}
                </button>
            </form>

            {message && (
                <p style={{
                    fontSize: 13,
                    color: status === 'success' ? '#22c55e' : '#ef4444',
                    margin: '12px 0 0 0',
                    animation: 'fadeIn 0.3s ease-in'
                }}>
                    {message}
                </p>
            )}
        </div>
    );
}
