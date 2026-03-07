import React, { useState } from 'react';
import { UiButton } from '../../../react/src/components/UiButton';
import { UiSwitch } from '../../../react/src/components/UiSwitch';
import { UiAlert } from '../../../react/src/components/UiAlert';
import { UiBadge } from '../../../react/src/components/UiBadge';
import { UiChip } from '../../../react/src/components/UiChip';
import { UiAvatar } from '../../../react/src/components/UiAvatar';
import { UiDivider } from '../../../react/src/components/UiDivider';
import { UiRating } from '../../../react/src/components/UiRating';
import { UiInputOtp } from '../../../react/src/components/UiInputOtp';
import { UiInputOtpGroup } from '../../../react/src/components/UiInputOtpGroup';
import { UiInputOtpSlot } from '../../../react/src/components/UiInputOtpSlot';
import { UiInputOtpSeparator } from '../../../react/src/components/UiInputOtpSeparator';
import { c, row, col, maxW } from '../tokens';

export function Hero() {
    const [otpVal, setOtpVal] = useState('');
    const [rating, setRating] = useState(4);

    return (
        <section style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1a2744 55%,#0d1f3c 100%)', padding: '80px 24px 96px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse,#3b82f61e 0%,transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ ...maxW(), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
                {/* copy */}
                <div style={col(24)}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#3b82f622', border: '1px solid #3b82f644', borderRadius: 20, padding: '4px 14px', width: 'fit-content' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.success, display: 'inline-block' }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#93c5fd' }}>100+ components · Lit + React</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.2rem,4vw,3.2rem)', fontWeight: 800, lineHeight: 1.15, color: '#f8fafc', letterSpacing: '-1px' }}>
                        Build beautiful UIs with{' '}
                        <span style={{ color: c.primary }}>Web Components</span>
                    </h1>
                    <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, maxWidth: 480 }}>
                        A comprehensive, fully typed UI library built on Lit. Use natively in any framework — or drop in the included React wrappers.
                    </p>
                    <div style={row(12)}>
                        <UiButton size="large" variant="primary">Browse Components</UiButton>
                        <UiButton size="large" variant="secondary">GitHub ↗</UiButton>
                    </div>
                    <div style={{ ...row(12), background: '#0d1117', border: '1px solid #30363d', borderRadius: 8, padding: '10px 16px', width: 'fit-content' }}>
                        <span style={{ color: '#7ee787', fontFamily: 'monospace', fontSize: 13 }}>$</span>
                        <span style={{ color: '#e6edf3', fontFamily: 'monospace', fontSize: 13 }}>npm install storybook-lit</span>
                    </div>
                </div>

                {/* live preview card */}
                <div style={{ background: '#1e293b', borderRadius: 16, border: '1px solid #334155', padding: 28, boxShadow: '0 25px 50px rgba(0,0,0,0.4)', ...col(18) }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#475569', letterSpacing: 1, textTransform: 'uppercase' }}>Live Preview — all interactive</p>

                    <div style={row(8)}>
                        <UiButton size="small" variant="primary">Primary</UiButton>
                        <UiButton size="small" variant="secondary">Secondary</UiButton>
                        <UiButton size="small" variant="destructive">Delete</UiButton>
                    </div>

                    <UiDivider />

                    <div style={{ ...row(16), justifyContent: 'space-between' }}>
                        <UiSwitch label="Dark mode" checked />
                        <div style={row(8)}>
                            <UiBadge content="9+" variant="error"><UiAvatar initials="JD" size="small" /></UiBadge>
                            <UiBadge dot variant="success"><UiAvatar initials="AL" size="small" /></UiBadge>
                        </div>
                    </div>

                    <UiDivider />

                    <UiAlert severity="success" title="All systems go">100+ components production-ready.</UiAlert>

                    <UiDivider />

                    <div style={col(6)}>
                        <p style={{ fontSize: 11, color: '#475569' }}>Rating — click a star</p>
                        <UiRating value={rating} onUiRatingChange={e => setRating((e as CustomEvent<{ value: number }>).detail.value)} />
                    </div>

                    <UiDivider />

                    <div style={col(6)}>
                        <p style={{ fontSize: 11, color: '#475569' }}>OTP Input — click to type</p>
                        <UiInputOtp maxLength={6} onUiOtpChange={e => setOtpVal((e as CustomEvent<{ value: string }>).detail.value)}>
                            <UiInputOtpGroup>
                                <UiInputOtpSlot index={0} /><UiInputOtpSlot index={1} /><UiInputOtpSlot index={2} />
                            </UiInputOtpGroup>
                            <UiInputOtpSeparator />
                            <UiInputOtpGroup>
                                <UiInputOtpSlot index={3} /><UiInputOtpSlot index={4} /><UiInputOtpSlot index={5} />
                            </UiInputOtpGroup>
                        </UiInputOtp>
                        {otpVal && <p style={{ fontSize: 11, color: '#22c55e' }}>Value: {otpVal}</p>}
                    </div>

                    <UiDivider />

                    <div style={row(6)}>
                        {['React', 'TypeScript', 'Lit', 'Vite'].map(t => <UiChip key={t} label={t} variant="outlined" color="primary" clickable />)}
                    </div>
                </div>
            </div>
        </section>
    );
}
