import React from 'react';
import { UiButton } from '../../../packages/react/src/components/UiButton';
import { UiAlert } from '../../../packages/react/src/components/UiAlert';
import { UiBadge } from '../../../packages/react/src/components/UiBadge';
import { UiChip } from '../../../packages/react/src/components/UiChip';
import { UiAvatar } from '../../../packages/react/src/components/UiAvatar';
import { UiSwitch } from '../../../packages/react/src/components/UiSwitch';
import { UiRating } from '../../../packages/react/src/components/UiRating';
import { UiLinearProgress } from '../../../packages/react/src/components/UiLinearProgress';
import { UiCircularProgress } from '../../../packages/react/src/components/UiCircularProgress';
import { UiCheckbox } from '../../../packages/react/src/components/UiCheckbox';
import { UiSlider } from '../../../packages/react/src/components/UiSlider';
import { UiInputOtp } from '../../../packages/react/src/components/UiInputOtp';
import { UiInputOtpGroup } from '../../../packages/react/src/components/UiInputOtpGroup';
import { UiInputOtpSlot } from '../../../packages/react/src/components/UiInputOtpSlot';
import { UiInputOtpSeparator } from '../../../packages/react/src/components/UiInputOtpSeparator';
import { useTheme } from '../ThemeContext';
import { useBreakpoint } from '../useBreakpoint';
import { getColors, row, col, maxW, gradients, getShadows } from '../tokens';

// ─── Component wall tile definitions ─────────────────────────────────────────
// Each tile is a small card showing a real component. Arranged in columns that
// scroll vertically at different speeds/directions to create a "wall" effect.

function Tile({ children, dark }: { children: React.ReactNode; dark: boolean }) {
    const c = getColors(dark);
    const s = getShadows(dark);
    return (
        <div style={{
            background: c.surface,
            borderRadius: 12,
            boxShadow: s.sm,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 8,
            width: '100%',
        }}>
            {children}
        </div>
    );
}

// The 5 columns of component tiles
function useColumns(dark: boolean) {
    const c = getColors(dark);

    const col1 = [
        <Tile key="btn" dark={dark}>
            <div style={col(8)}>
                <UiButton size="small" variant="primary">Primary</UiButton>
                <UiButton size="small" variant="secondary">Secondary</UiButton>
                <UiButton size="small" variant="destructive">Delete</UiButton>
            </div>
        </Tile>,
        <Tile key="avatar" dark={dark}>
            <div style={row(10)}>
                <UiBadge content="3" variant="primary"><UiAvatar initials="AL" size="medium" /></UiBadge>
                <UiBadge dot variant="success"><UiAvatar initials="MK" size="medium" /></UiBadge>
                <UiAvatar initials="RB" size="medium" variant="square" />
            </div>
        </Tile>,
        <Tile key="alert-s" dark={dark}>
            <div style={{ ...col(6), width: '100%' }}>
                <UiAlert severity="success" title="Saved">Changes saved.</UiAlert>
            </div>
        </Tile>,
        <Tile key="chip1" dark={dark}>
            <div style={row(6)}>
                <UiChip label="React" color="primary" clickable />
                <UiChip label="Lit" clickable />
                <UiChip label="Vite" clickable />
            </div>
        </Tile>,
    ];

    const col2 = [
        <Tile key="switch" dark={dark}>
            <div style={col(10)}>
                <UiSwitch label="Dark mode" checked={dark} />
                <UiSwitch label="Notifications" checked size="sm" />
            </div>
        </Tile>,
        <Tile key="progress" dark={dark}>
            <div style={{ ...col(8), width: '100%' }}>
                <UiLinearProgress variant="determinate" value={72} color="primary" label="72%" />
                <UiLinearProgress variant="determinate" value={45} color="success" label="45%" />
            </div>
        </Tile>,
        <Tile key="rating" dark={dark}>
            <div style={col(4)}>
                <p style={{ fontSize: 11, color: c.muted, margin: 0 }}>Rating</p>
                <UiRating value={4} />
            </div>
        </Tile>,
        <Tile key="alert-w" dark={dark}>
            <div style={{ ...col(6), width: '100%' }}>
                <UiAlert severity="warning" title="Warning">Review before publishing.</UiAlert>
            </div>
        </Tile>,
    ];

    const col3 = [
        <Tile key="otp" dark={dark}>
            <UiInputOtp maxLength={6}>
                <UiInputOtpGroup>
                    <UiInputOtpSlot index={0} /><UiInputOtpSlot index={1} /><UiInputOtpSlot index={2} />
                </UiInputOtpGroup>
                <UiInputOtpSeparator />
                <UiInputOtpGroup>
                    <UiInputOtpSlot index={3} /><UiInputOtpSlot index={4} /><UiInputOtpSlot index={5} />
                </UiInputOtpGroup>
            </UiInputOtp>
        </Tile>,
        <Tile key="badge" dark={dark}>
            <div style={row(12)}>
                <UiBadge content="9+" variant="error"><UiAvatar initials="JD" size="medium" /></UiBadge>
                <UiBadge content="5" variant="primary"><UiAvatar initials="KL" size="medium" /></UiBadge>
            </div>
        </Tile>,
        <Tile key="btn2" dark={dark}>
            <div style={row(8)}>
                <UiButton size="small" variant="primary">Save</UiButton>
                <UiButton size="small" variant="secondary">Cancel</UiButton>
            </div>
        </Tile>,
        <Tile key="circular" dark={dark}>
            <div style={row(16)}>
                <UiCircularProgress value={65} />
                <UiCircularProgress value={85} />
            </div>
        </Tile>,
    ];

    const col4 = [
        <Tile key="slider" dark={dark}>
            <div style={{ ...col(8), width: '100%' }}>
                <p style={{ fontSize: 11, color: c.muted, margin: 0 }}>Volume</p>
                <UiSlider value={60} showValue />
            </div>
        </Tile>,
        <Tile key="chip2" dark={dark}>
            <div style={row(6)}>
                <UiChip label="TypeScript" color="secondary" clickable />
                <UiChip label="Outlined" variant="outlined" color="primary" clickable />
            </div>
        </Tile>,
        <Tile key="alert-i" dark={dark}>
            <div style={{ ...col(6), width: '100%' }}>
                <UiAlert severity="info">New version available.</UiAlert>
            </div>
        </Tile>,
        <Tile key="checkbox" dark={dark}>
            <div style={col(8)}>
                <UiCheckbox label="Checked" checked />
                <UiCheckbox label="Unchecked" />
                <UiCheckbox label="Indeterminate" indeterminate />
            </div>
        </Tile>,
    ];

    const col5 = [
        <Tile key="alert-e" dark={dark}>
            <div style={{ ...col(6), width: '100%' }}>
                <UiAlert severity="error">Auth failed.</UiAlert>
            </div>
        </Tile>,
        <Tile key="sw2" dark={dark}>
            <div style={col(10)}>
                <UiSwitch label="Auto-save" checked size="lg" />
                <UiSwitch label="Offline" disabled />
            </div>
        </Tile>,
        <Tile key="avatar2" dark={dark}>
            <div style={row(10)}>
                <UiAvatar initials="LI" size="large" />
                <UiAvatar initials="XL" size="xlarge" variant="rounded" />
            </div>
        </Tile>,
        <Tile key="progress2" dark={dark}>
            <div style={{ ...col(8), width: '100%' }}>
                <UiLinearProgress variant="determinate" value={88} color="warning" label="88%" />
                <UiLinearProgress variant="indeterminate" color="primary" />
            </div>
        </Tile>,
    ];

    return [col1, col2, col3, col4, col5];
}

// Renders a single scrolling column. Items are duplicated for seamless loop.
function ScrollColumn({ items, direction, speed, offset }: {
    items: React.ReactNode[];
    direction: 'up' | 'down';
    speed: number; // seconds for one full cycle
    offset?: number; // translateY offset to stagger start positions
}) {
    const content = (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            padding: '7px 0',
        }}>
            {items}
        </div>
    );

    return (
        <div style={{
            flex: 1,
            overflow: 'hidden',
            height: '100%',
            minWidth: 0,
        }}>
            <div style={{
                animation: `${direction === 'up' ? 'scrollUp' : 'scrollDown'} ${speed}s linear infinite`,
                transform: offset ? `translateY(${offset}px)` : undefined,
            }}>
                {/* Duplicate for seamless loop */}
                {content}
                {content}
            </div>
        </div>
    );
}

export function Hero() {
    const { dark } = useTheme();
    const { isMobile } = useBreakpoint();
    const c = getColors(dark);
    const columns = useColumns(dark);

    // On mobile show 3 cols, otherwise 5
    const visibleCols = isMobile ? [columns[0], columns[1], columns[2]] : columns;
    const speeds = isMobile ? [28, 34, 30] : [30, 38, 34, 36, 32];
    const directions: ('up' | 'down')[] = isMobile
        ? ['up', 'down', 'up']
        : ['up', 'down', 'up', 'down', 'up'];
    const offsets = isMobile ? [0, -40, -20] : [0, -60, -30, -50, -15];

    // Gradient overlays: top fades from bg at full opacity → transparent,
    // bottom fades from transparent → bg at full opacity
    const bgColor = dark ? '#09090b' : '#f8fafc';

    return (
        <section style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: isMobile ? 520 : 600,
            display: 'flex',
            alignItems: 'center',
        }}>
            {/* ── Scrolling component wall (background) ── */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                gap: 14,
                padding: '0 14px',
                opacity: dark ? 0.35 : 0.45,
            }}>
                {visibleCols.map((items, i) => (
                    <ScrollColumn
                        key={i}
                        items={items}
                        direction={directions[i]}
                        speed={speeds[i]}
                        offset={offsets[i]}
                    />
                ))}
            </div>

            {/* ── Gradient fade overlays ── */}
            {/* Top: solid bg → transparent */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '35%',
                background: `linear-gradient(to bottom, ${bgColor} 0%, ${bgColor}ee 30%, ${bgColor}88 60%, transparent 100%)`,
                pointerEvents: 'none',
                zIndex: 2,
            }} />
            {/* Bottom: transparent → solid bg */}
            <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '35%',
                background: `linear-gradient(to top, ${bgColor} 0%, ${bgColor}ee 30%, ${bgColor}88 60%, transparent 100%)`,
                pointerEvents: 'none',
                zIndex: 2,
            }} />
            {/* Center vignette for text readability */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at center, ${bgColor}cc 0%, ${bgColor}99 35%, transparent 70%)`,
                pointerEvents: 'none',
                zIndex: 2,
            }} />

            {/* ── Hero content (foreground) ── */}
            <div style={{
                position: 'relative',
                zIndex: 3,
                width: '100%',
                padding: isMobile ? '48px 16px' : '64px 24px',
            }}>
                <div style={{ ...maxW(), textAlign: 'center' }}>
                    <div style={col(isMobile ? 20 : 24)}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: dark ? '#1e3a8a' : '#dbeafe', border: `1px solid ${dark ? '#3b82f6' : '#bfdbfe'}`, borderRadius: 20, padding: '4px 14px', width: 'fit-content', margin: '0 auto' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                            <span style={{ fontSize: 12, fontWeight: 600, color: dark ? '#93c5fd' : '#1e40af' }}>100+ components · Lit + React</span>
                        </div>

                        <h1 style={{ fontSize: 'clamp(2rem,5.5vw,3.6rem)', fontWeight: 800, lineHeight: 1.1, color: dark ? '#f8fafc' : '#0f172a', letterSpacing: '-1.5px', marginTop: 16 }}>
                            Build beautiful UIs with{' '}
                            <span style={{
                                background: gradients.textAccent,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>Web Components</span>
                        </h1>

                        <p style={{ fontSize: isMobile ? 16 : 18, color: dark ? '#94a3b8' : '#475569', lineHeight: 1.7, maxWidth: 520, margin: '16px auto 0' }}>
                            A comprehensive, fully typed UI library built on Lit. Use natively in any framework — or drop in the included React wrappers.
                        </p>

                        <div style={{ ...row(12), marginTop: 28, justifyContent: 'center' }}>
                            <UiButton size="large" variant="primary" onClick={() => document.getElementById('s-components')?.scrollIntoView({ behavior: 'smooth' })}>Browse Components</UiButton>
                            <a href="/docs" style={{ textDecoration: 'none' }}>
                                <UiButton size="large" variant="secondary">Documentation</UiButton>
                            </a>
                        </div>

                        <div style={{
                            ...row(12),
                            background: dark ? 'rgba(13,17,23,0.8)' : 'rgba(241,245,249,0.8)',
                            backdropFilter: 'blur(8px)',
                            border: `1px solid ${dark ? '#30363d' : '#cbd5e1'}`,
                            borderRadius: 8,
                            padding: '10px 16px',
                            width: 'fit-content',
                            margin: '20px auto 0',
                        }}>
                            <span style={{ color: dark ? '#7ee787' : '#0f7938', fontFamily: 'monospace', fontSize: 13 }}>$</span>
                            <span style={{ color: dark ? '#e6edf3' : '#1e293b', fontFamily: 'monospace', fontSize: 13, whiteSpace: 'nowrap' }}>npm install lite</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
