import React, { useState } from 'react';
import { UiButton } from '../../../react/src/components/UiButton';
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
import { UiHoverCard } from '../../../react/src/components/UiHoverCard';
import { UiHoverCardTrigger } from '../../../react/src/components/UiHoverCardTrigger';
import { UiHoverCardContent } from '../../../react/src/components/UiHoverCardContent';
import { UiGrid } from '../../../react/src/components/UiGrid';
import { UiPaper } from '../../../react/src/components/UiPaper';
import { UiStack } from '../../../react/src/components/UiStack';
import { useTheme } from '../ThemeContext';
import { useBreakpoint } from '../useBreakpoint';
import { getColors, row, col, maxW } from '../tokens';

// Hero always renders on a dark gradient background — use light palette for the
// preview card content colors regardless of the page theme.
const c = getColors(false);

export function Hero() {
    const [otpVal, setOtpVal] = useState('');
    const [rating, setRating] = useState(4);
    const { dark } = useTheme();
    const { isMobile, isTablet } = useBreakpoint();

    return (
        <section style={{ background: dark ? 'linear-gradient(135deg,#0f172a 0%,#1a2744 55%,#0d1f3c 100%)' : 'linear-gradient(135deg,#f8fafc 0%,#f1f5f9 55%,#e2e8f0 100%)', padding: isMobile ? '56px 16px 64px' : '80px 24px 96px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: dark ? 'radial-gradient(ellipse,#3b82f61e 0%,transparent 70%)' : 'radial-gradient(ellipse,#3b82f60d 0%,transparent 70%)', pointerEvents: 'none' }} />
            <div style={maxW()}>
                <UiGrid container spacing={isMobile ? 5 : 8} alignItems="center">
                    {/* copy */}
                    <UiGrid xs={12} md={6}>
                        <div style={col(isMobile ? 20 : 24)}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: dark ? '#1e3a8a' : '#dbeafe', border: `1px solid ${dark ? '#3b82f6' : '#bfdbfe'}`, borderRadius: 20, padding: '4px 14px', width: 'fit-content' }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.success, display: 'inline-block' }} />
                                <span style={{ fontSize: 12, fontWeight: 600, color: dark ? '#93c5fd' : '#1e40af' }}>100+ components · Lit + React</span>
                            </div>
                            <h1 style={{ fontSize: 'clamp(1.8rem,5vw,3.2rem)', fontWeight: 800, lineHeight: 1.15, color: dark ? '#f8fafc' : '#0f172a', letterSpacing: '-1px', marginTop: 16 }}>
                                Build beautiful UIs with{' '}
                                <span style={{ color: c.primary }}>Web Components</span>
                            </h1>
                            <p style={{ fontSize: isMobile ? 16 : 18, color: dark ? '#94a3b8' : '#475569', lineHeight: 1.7, maxWidth: 480, marginTop: 16 }}>
                                A comprehensive, fully typed UI library built on Lit. Use natively in any framework — or drop in the included React wrappers.
                            </p>
                            <div style={{ ...row(12), marginTop: 24 }}>
                                <UiButton size="large" variant="primary" onClick={() => document.getElementById('s-components')?.scrollIntoView({ behavior: 'smooth' })}>Browse Components</UiButton>
                                <a href="/docs" style={{ textDecoration: 'none' }}>
                                    <UiButton size="large" variant="secondary">View All Components</UiButton>
                                </a>
                            </div>
                            <div style={{ ...row(12), background: dark ? '#0d1117' : '#f1f5f9', border: `1px solid ${dark ? '#30363d' : '#cbd5e1'}`, borderRadius: 8, padding: '10px 16px', width: 'fit-content', maxWidth: '100%', overflowX: 'auto', marginTop: 20 }}>
                                <span style={{ color: dark ? '#7ee787' : '#0f7938', fontFamily: 'monospace', fontSize: 13 }}>$</span>
                                <span style={{ color: dark ? '#e6edf3' : '#1e293b', fontFamily: 'monospace', fontSize: 13, whiteSpace: 'nowrap' }}>npm install lite</span>
                            </div>
                        </div>
                    </UiGrid>

                    {/* live preview card — hidden on mobile, shown on tablet+ */}
                    {!isMobile && (
                        <UiGrid xs={12} md={6}>
                            <UiPaper elevation={2} style={{ padding: isTablet ? 20 : 28, width: '100%', backgroundColor: dark ? '#1e293b' : undefined }}>
                                <UiStack direction="column" spacing={2}>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: dark ? '#64748b' : '#475569', letterSpacing: 1, textTransform: 'uppercase', margin: 0 }}>Live Preview — all interactive</p>

                                    <div style={row(8)}>
                                        <UiButton size="small" variant="primary">Primary</UiButton>
                                        <UiButton size="small" variant="secondary">Secondary</UiButton>
                                        <UiButton size="small" variant="destructive">Delete</UiButton>
                                    </div>

                                    <UiDivider />

                                    <div style={{ ...row(16), justifyContent: 'space-between' }}>
                                        <UiHoverCard>
                                            <UiHoverCardTrigger>
                                                <div style={{ ...row(8), cursor: 'pointer' }}>
                                                    <UiBadge dot variant="success">
                                                        <UiAvatar initials="LI" size="small" />
                                                    </UiBadge>
                                                    <span style={{ fontSize: 13, color: dark ? '#60a5fa' : '#93c5fd' }}>@lite</span>
                                                </div>
                                            </UiHoverCardTrigger>
                                            <UiHoverCardContent side="top">
                                                <div style={{ ...col(8), padding: 4, minWidth: 200 }}>
                                                    <div style={row(8)}>
                                                        <UiAvatar initials="LI" size="medium" />
                                                        <div>
                                                            <p style={{ fontWeight: 700, fontSize: 13 }}>lite</p>
                                                            <p style={{ fontSize: 12, color: c.muted }}>UI Component Library</p>
                                                        </div>
                                                    </div>
                                                    <p style={{ fontSize: 12, color: c.muted, lineHeight: 1.5 }}>100+ Lit + React components. Hover this card to see it in action.</p>
                                                </div>
                                            </UiHoverCardContent>
                                        </UiHoverCard>
                                        <div style={row(8)}>
                                            <UiBadge content="9+" variant="error"><UiAvatar initials="JD" size="small" /></UiBadge>
                                            <UiBadge dot variant="success"><UiAvatar initials="AL" size="small" /></UiBadge>
                                        </div>
                                    </div>

                                    <UiDivider />

                                    <UiAlert severity="success" title="All systems go">100+ components production-ready.</UiAlert>

                                    <UiDivider />

                                    <div style={col(6)}>
                                        <p style={{ fontSize: 11, color: dark ? '#64748b' : '#475569', margin: 0 }}>Rating — click a star</p>
                                        <UiRating value={rating} onUiRatingChange={e => setRating((e as CustomEvent<{ value: number }>).detail.value)} style={{ '--ui-rating-color': '#3b82f6', '--ui-rating-empty-color': '#3b82f633' } as React.CSSProperties} />
                                    </div>

                                    <UiDivider />

                                    <div style={col(6)}>
                                        <p style={{ fontSize: 11, color: dark ? '#64748b' : '#475569', margin: 0 }}>OTP Input — click to type</p>
                                        <UiInputOtp maxLength={6} onUiOtpChange={e => setOtpVal((e as CustomEvent<{ value: string }>).detail.value)}>
                                            <UiInputOtpGroup>
                                                <UiInputOtpSlot index={0} /><UiInputOtpSlot index={1} /><UiInputOtpSlot index={2} />
                                            </UiInputOtpGroup>
                                            <UiInputOtpSeparator />
                                            <UiInputOtpGroup>
                                                <UiInputOtpSlot index={3} /><UiInputOtpSlot index={4} /><UiInputOtpSlot index={5} />
                                            </UiInputOtpGroup>
                                        </UiInputOtp>
                                        {otpVal && <p style={{ fontSize: 11, color: '#22c55e', margin: 0 }}>Value: {otpVal}</p>}
                                    </div>

                                    <UiDivider />

                                    <div style={row(6)}>
                                        {['React', 'TypeScript', 'Lit', 'Vite'].map(t => <UiChip key={t} label={t} variant="outlined" color="primary" clickable />)}
                                    </div>
                                </UiStack>
                            </UiPaper>
                        </UiGrid>
                    )}
                </UiGrid>
            </div>
        </section>
    );
}
