import React, { useState, useEffect } from 'react';

// ── React-wrapped Lit components ─────────────────────────────────────────────
import { UiButton } from '../../react/src/components/UiButton';
import { UiSwitch } from '../../react/src/components/UiSwitch';
import { UiAlert } from '../../react/src/components/UiAlert';
import { UiBadge } from '../../react/src/components/UiBadge';
import { UiChip } from '../../react/src/components/UiChip';
import { UiAvatar } from '../../react/src/components/UiAvatar';
import { UiCard } from '../../react/src/components/UiCard';
import { UiCardContent } from '../../react/src/components/UiCardContent';
import { UiCardHeader } from '../../react/src/components/UiCardHeader';
import { UiCardActions } from '../../react/src/components/UiCardActions';
import { UiAccordion } from '../../react/src/components/UiAccordion';
import { UiAccordionSummary } from '../../react/src/components/UiAccordionSummary';
import { UiAccordionDetails } from '../../react/src/components/UiAccordionDetails';
import { UiTabs } from '../../react/src/components/UiTabs';
import { UiTab } from '../../react/src/components/UiTab';
import { UiTabList } from '../../react/src/components/UiTabList';
import { UiTabPanel } from '../../react/src/components/UiTabPanel';
import { UiLinearProgress } from '../../react/src/components/UiLinearProgress';
import { UiCircularProgress } from '../../react/src/components/UiCircularProgress';
import { UiBreadcrumbs } from '../../react/src/components/UiBreadcrumbs';
import { UiDivider } from '../../react/src/components/UiDivider';
import { UiTypography } from '../../react/src/components/UiTypography';
import { UiPagination } from '../../react/src/components/UiPagination';
// forms
import { UiTextField } from '../../react/src/components/UiTextField';
import { UiSelect } from '../../react/src/components/UiSelect';
import { UiCheckbox } from '../../react/src/components/UiCheckbox';
import { UiSlider } from '../../react/src/components/UiSlider';
import { UiRating } from '../../react/src/components/UiRating';
// data display
import { UiTable } from '../../react/src/components/UiTable';
import { UiTableContainer } from '../../react/src/components/UiTableContainer';
import { UiTableHead } from '../../react/src/components/UiTableHead';
import { UiTableBody } from '../../react/src/components/UiTableBody';
import { UiTableRow } from '../../react/src/components/UiTableRow';
import { UiTableCell } from '../../react/src/components/UiTableCell';
import { UiList } from '../../react/src/components/UiList';
import { UiListItem } from '../../react/src/components/UiListItem';
import { UiListItemButton } from '../../react/src/components/UiListItemButton';
import { UiListItemText } from '../../react/src/components/UiListItemText';
import { UiListItemIcon } from '../../react/src/components/UiListItemIcon';
import { UiSkeleton } from '../../react/src/components/UiSkeleton';
// overlays
import { UiDialog } from '../../react/src/components/UiDialog';
import { UiDialogTitle } from '../../react/src/components/UiDialogTitle';
import { UiDialogContent } from '../../react/src/components/UiDialogContent';
import { UiDialogContentText } from '../../react/src/components/UiDialogContentText';
import { UiDialogActions } from '../../react/src/components/UiDialogActions';
import { UiSnackbar } from '../../react/src/components/UiSnackbar';
import { UiTooltip } from '../../react/src/components/UiTooltip';
// flow
import { UiStepper } from '../../react/src/components/UiStepper';
import { UiStep } from '../../react/src/components/UiStep';
import { UiStepLabel } from '../../react/src/components/UiStepLabel';
import { UiStepContent } from '../../react/src/components/UiStepContent';
import { UiCollapsible } from '../../react/src/components/UiCollapsible';
import { UiCollapsibleTrigger } from '../../react/src/components/UiCollapsibleTrigger';
import { UiCollapsibleContent } from '../../react/src/components/UiCollapsibleContent';
import { UiKbd } from '../../react/src/components/UiKbd';
import { UiLink } from '../../react/src/components/UiLink';
// otp
import { UiInputOtp } from '../../react/src/components/UiInputOtp';
import { UiInputOtpGroup } from '../../react/src/components/UiInputOtpGroup';
import { UiInputOtpSlot } from '../../react/src/components/UiInputOtpSlot';
import { UiInputOtpSeparator } from '../../react/src/components/UiInputOtpSeparator';

// ── tokens ────────────────────────────────────────────────────────────────────
const c = {
    primary: '#3b82f6', primaryLight: '#eff6ff',
    dark: '#0f172a', text: '#0f172a',
    muted: '#64748b', border: '#e2e8f0',
    surface: '#ffffff', bg: '#f8fafc',
    success: '#22c55e', warning: '#f59e0b', error: '#ef4444',
};

const row = (gap = 12): React.CSSProperties => ({ display: 'flex', alignItems: 'center', gap, flexWrap: 'wrap' as const });
const col = (gap = 12): React.CSSProperties => ({ display: 'flex', flexDirection: 'column', gap });
const card = (extra: React.CSSProperties = {}): React.CSSProperties => ({ background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`, padding: '20px 24px', ...extra });
const sect = (bg = c.bg): React.CSSProperties => ({ padding: '80px 24px', background: bg, borderTop: `1px solid ${c.border}` });
const maxW = (extra: React.CSSProperties = {}): React.CSSProperties => ({ maxWidth: 1200, margin: '0 auto', ...extra });
const grid3 = (extra: React.CSSProperties = {}): React.CSSProperties => ({ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, ...extra });
const grid2 = (extra: React.CSSProperties = {}): React.CSSProperties => ({ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, ...extra });

function Heading({ title, sub }: { title: React.ReactNode; sub: string }) {
    return (
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 12 }}>{title}</h2>
            <p style={{ fontSize: 17, color: c.muted, maxWidth: 520, margin: '0 auto' }}>{sub}</p>
        </div>
    );
}

function ShowCard({ title, desc, children, span2 = false }: { title: string; desc: string; children: React.ReactNode; span2?: boolean }) {
    return (
        <div style={{ ...card(), display: 'flex', flexDirection: 'column', gap: 16, gridColumn: span2 ? 'span 2' : undefined }}>
            <div style={{ background: c.bg, borderRadius: 8, border: `1px solid ${c.border}`, padding: '20px 16px', minHeight: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
                {children}
            </div>
            <div>
                <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{title}</p>
                <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.5 }}>{desc}</p>
            </div>
        </div>
    );
}

// ── header ────────────────────────────────────────────────────────────────────
function Header() {
    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${c.border}` }}>
            <div style={{ ...maxW(), height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
                <div style={row(10)}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill={c.primary} /><path d="M8 10l4 4-4 4M14 18h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>storybook-lit</span>
                    <span style={{ fontSize: 11, fontWeight: 600, background: c.primaryLight, color: c.primary, padding: '2px 8px', borderRadius: 20 }}>v1.0</span>
                </div>
                <nav style={row(4)}>
                    {['Components', 'Forms', 'Data', 'Overlays', 'Flow'].map(l => (
                        <a key={l} href={`#s-${l.toLowerCase()}`} style={{ fontSize: 14, fontWeight: 500, color: c.muted, textDecoration: 'none', padding: '6px 12px', borderRadius: 6 }}>{l}</a>
                    ))}
                    <UiButton size="small" variant="secondary">GitHub ↗</UiButton>
                </nav>
            </div>
        </header>
    );
}

// ── hero ──────────────────────────────────────────────────────────────────────
function Hero() {
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

// ── stats bar ─────────────────────────────────────────────────────────────────
function Stats() {
    const items = [
        { icon: '⚡', v: '100+', l: 'Components' }, { icon: '🔷', v: 'TypeScript', l: 'Fully typed' },
        { icon: '🌐', v: 'Standards', l: 'Custom Elements' }, { icon: '♿', v: 'Accessible', l: 'ARIA compliant' },
        { icon: '🎨', v: 'Themeable', l: 'CSS custom props' }, { icon: '⚛️', v: 'React Ready', l: 'Wrapper included' },
    ];
    return (
        <section style={{ borderBottom: `1px solid ${c.border}`, background: c.surface }}>
            <div style={{ ...maxW(), display: 'grid', gridTemplateColumns: 'repeat(6,1fr)' }}>
                {items.map((s, i) => (
                    <div key={s.l} style={{ padding: '24px 16px', textAlign: 'center', borderRight: i < 5 ? `1px solid ${c.border}` : 'none' }}>
                        <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{s.v}</div>
                        <div style={{ fontSize: 12, color: c.muted }}>{s.l}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ── component showcase ────────────────────────────────────────────────────────
function Showcase() {
    const [switchOn, setSwitchOn] = useState(false);
    const [sliderVal, setSliderVal] = useState(60);
    const [ratingVal, setRatingVal] = useState(3);
    const [page, setPage] = useState(2);

    return (
        <section id="s-components" style={sect(c.bg)}>
            <div style={maxW()}>
                <Heading title="Everything you need" sub="Every component is a live Lit custom element wrapped in a typed React component. Click around — they're all interactive." />
                <div style={grid3()}>

                    <ShowCard title="Buttons" desc="Three variants, three sizes, full-width and disabled states.">
                        <div style={col(10)}>
                            <div style={row(8)}>
                                <UiButton size="small" variant="primary">Small</UiButton>
                                <UiButton size="medium" variant="primary">Medium</UiButton>
                                <UiButton size="large" variant="primary">Large</UiButton>
                            </div>
                            <div style={row(8)}>
                                <UiButton variant="secondary">Secondary</UiButton>
                                <UiButton variant="destructive">Delete</UiButton>
                                <UiButton disabled>Disabled</UiButton>
                            </div>
                        </div>
                    </ShowCard>

                    <ShowCard title="Switch" desc="Toggle control — form-associated, sizes sm/md/lg, icon slots.">
                        <div style={col(14)}>
                            <UiSwitch label={switchOn ? 'Enabled' : 'Disabled'} checked={switchOn}
                                onUiSwitchChange={e => setSwitchOn((e as CustomEvent<{ checked: boolean }>).detail.checked)} />
                            <UiSwitch label="Notifications" checked size="sm" />
                            <UiSwitch label="Auto-update" checked size="lg" />
                            <UiSwitch label="Offline mode" disabled />
                        </div>
                    </ShowCard>

                    <ShowCard title="Alerts" desc="Four severity levels with optional title, icons, and dismiss button.">
                        <div style={{ ...col(8), width: '100%' }}>
                            <UiAlert severity="info" title="Info">New version available.</UiAlert>
                            <UiAlert severity="success" title="Saved">Changes saved successfully.</UiAlert>
                            <UiAlert severity="warning" title="Warning">Review before publishing.</UiAlert>
                            <UiAlert severity="error">Authentication failed.</UiAlert>
                        </div>
                    </ShowCard>

                    <ShowCard title="Avatar & Badge" desc="Avatars with initials, images, variants — overlaid with count or dot badges.">
                        <div style={row(20)}>
                            <UiBadge content="9+" variant="error"><UiAvatar initials="JD" size="medium" /></UiBadge>
                            <UiBadge content="3" variant="primary"><UiAvatar initials="AL" size="medium" /></UiBadge>
                            <UiBadge dot variant="success"><UiAvatar initials="MK" size="medium" /></UiBadge>
                            <UiAvatar initials="RB" size="large" variant="square" />
                            <UiAvatar initials="XL" size="xlarge" variant="rounded" />
                        </div>
                    </ShowCard>

                    <ShowCard title="Chips" desc="Filled and outlined — clickable, deletable, colored, disabled.">
                        <div style={col(10)}>
                            <div style={row(6)}>
                                <UiChip label="React" color="primary" clickable />
                                <UiChip label="TypeScript" color="secondary" clickable />
                                <UiChip label="Lit" clickable />
                                <UiChip label="Vite" clickable />
                            </div>
                            <div style={row(6)}>
                                <UiChip label="Outlined" variant="outlined" color="primary" clickable />
                                <UiChip label="Deletable" deletable clickable />
                                <UiChip label="Disabled" disabled />
                            </div>
                        </div>
                    </ShowCard>

                    <ShowCard title="Cards" desc="Composable card with header, content, media and action slots.">
                        <UiCard style={{ width: '100%', maxWidth: 280 }}>
                            <UiCardHeader>
                                <div style={row(8)}>
                                    <UiAvatar initials="SL" size="small" />
                                    <div><p style={{ fontWeight: 600, fontSize: 13 }}>storybook-lit</p><p style={{ fontSize: 11, color: c.muted }}>2 hours ago</p></div>
                                </div>
                            </UiCardHeader>
                            <UiCardContent><p style={{ fontSize: 13, color: c.muted }}>A comprehensive Lit + React component library for modern UIs.</p></UiCardContent>
                            <UiCardActions>
                                <UiButton size="small" variant="primary">Learn more</UiButton>
                                <UiButton size="small" variant="secondary">Share</UiButton>
                            </UiCardActions>
                        </UiCard>
                    </ShowCard>

                    <ShowCard title="Accordion" desc="Expandable panels — click each. Supports disabled and multiple open.">
                        <div style={{ width: '100%' }}>
                            {[
                                { q: 'What is Lit?', a: 'A simple library for building fast, lightweight web components.' },
                                { q: 'Why Web Components?', a: 'Works natively in any framework — no adapters needed.' },
                                { q: 'React support?', a: 'Yes — every component ships with a typed React forwardRef wrapper.' },
                            ].map(({ q, a }) => (
                                <UiAccordion key={q}>
                                    <UiAccordionSummary>{q}</UiAccordionSummary>
                                    <UiAccordionDetails><p style={{ fontSize: 13, color: c.muted }}>{a}</p></UiAccordionDetails>
                                </UiAccordion>
                            ))}
                        </div>
                    </ShowCard>

                    <ShowCard title="Tabs" desc="Keyboard-navigable tabs with ARIA roles and multiple layout variants.">
                        <div style={{ width: '100%' }}>
                            <UiTabs value="overview">
                                <UiTabList>
                                    <UiTab value="overview">Overview</UiTab>
                                    <UiTab value="api">API</UiTab>
                                    <UiTab value="examples">Examples</UiTab>
                                </UiTabList>
                                <UiTabPanel value="overview"><p style={{ fontSize: 13, color: c.muted, padding: '12px 0' }}>Component overview and description.</p></UiTabPanel>
                                <UiTabPanel value="api"><p style={{ fontSize: 13, color: c.muted, padding: '12px 0' }}>Props, events, and methods reference.</p></UiTabPanel>
                                <UiTabPanel value="examples"><p style={{ fontSize: 13, color: c.muted, padding: '12px 0' }}>Live usage examples and playground.</p></UiTabPanel>
                            </UiTabs>
                        </div>
                    </ShowCard>

                    <ShowCard title="Progress" desc="Determinate and indeterminate linear bars and circular spinners.">
                        <div style={{ ...col(16), width: '100%', alignItems: 'center' }}>
                            <div style={{ width: '100%', ...col(10) }}>
                                <UiLinearProgress variant="determinate" value={72} color="primary" label="72%" />
                                <UiLinearProgress variant="determinate" value={45} color="success" label="45%" />
                                <UiLinearProgress variant="determinate" value={88} color="warning" label="88%" />
                                <UiLinearProgress variant="indeterminate" color="primary" />
                            </div>
                            <div style={row(20)}><UiCircularProgress value={65} /><UiCircularProgress value={85} /><UiCircularProgress /></div>
                        </div>
                    </ShowCard>

                    <ShowCard title="Rating & Slider" desc="Star rating with half-precision and slider with live value display.">
                        <div style={{ ...col(16), width: '100%' }}>
                            <div style={col(6)}>
                                <p style={{ fontSize: 12, color: c.muted }}>Rating ({ratingVal}/5) — click a star</p>
                                <UiRating value={ratingVal} onUiRatingChange={e => setRatingVal((e as CustomEvent<{ value: number }>).detail.value)} />
                            </div>
                            <div style={col(6)}>
                                <p style={{ fontSize: 12, color: c.muted }}>Slider — {sliderVal}%</p>
                                <UiSlider value={sliderVal} showValue onUiSliderChange={e => setSliderVal((e as CustomEvent<{ value: number }>).detail.value)} />
                            </div>
                            <UiSlider value={30} disabled label="Disabled" />
                        </div>
                    </ShowCard>

                    <ShowCard title="Skeleton" desc="Animated loading placeholders in text, circular, rectangular, rounded variants.">
                        <div style={{ ...col(12), width: '100%' }}>
                            <div style={row(12)}>
                                <UiSkeleton variant="circular" width="40px" height="40px" />
                                <div style={{ ...col(6), flex: 1 }}>
                                    <UiSkeleton variant="text" width="80%" />
                                    <UiSkeleton variant="text" width="60%" />
                                </div>
                            </div>
                            <UiSkeleton variant="rectangular" width="100%" height="80px" />
                            <div style={row(8)}>
                                <UiSkeleton variant="rounded" width="30%" height="32px" />
                                <UiSkeleton variant="rounded" width="30%" height="32px" />
                                <UiSkeleton variant="rounded" width="30%" height="32px" />
                            </div>
                        </div>
                    </ShowCard>

                    <ShowCard title="Breadcrumbs & Pagination" desc="Breadcrumb trail with separator and full-featured paginator with keyboard support.">
                        <div style={{ ...col(20), width: '100%', alignItems: 'center' }}>
                            <UiBreadcrumbs>
                                <UiLink href="#" color="primary">Home</UiLink>
                                <UiLink href="#" color="primary">Components</UiLink>
                                <span style={{ fontSize: 14 }}>Pagination</span>
                            </UiBreadcrumbs>
                            <UiPagination count={10} page={page} onUiPaginationChange={e => setPage((e as CustomEvent<{ page: number }>).detail.page)} />
                        </div>
                    </ShowCard>

                </div>
            </div>
        </section>
    );
}

// ── forms section ─────────────────────────────────────────────────────────────
function Forms() {
    const [name, setName] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [budget, setBudget] = useState(50);
    const [exp, setExp] = useState(3);
    const [submitted, setSubmitted] = useState(false);

    const fwOptions = [
        { value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' }, { value: 'svelte', label: 'Svelte' },
    ];

    return (
        <section id="s-forms" style={sect(c.surface)}>
            <div style={maxW()}>
                <Heading title={<>Forms &amp; Inputs</>} sub="TextField, Select, Checkbox, Slider, Rating — all form-associated and fully accessible." />
                <div style={grid2()}>
                    {/* live form */}
                    <div style={card({ ...col(20) })}>
                        <div>
                            <p style={{ fontWeight: 700, fontSize: 16 }}>Create Account</p>
                            <p style={{ fontSize: 13, color: c.muted }}>A fully interactive form using Lit components in React.</p>
                        </div>
                        {submitted ? (
                            <div style={col(12)}>
                                <UiAlert severity="success" title="Account created!">Welcome, {name || 'friend'}! Check your email to confirm.</UiAlert>
                                <UiButton size="small" variant="secondary" onClick={() => { setSubmitted(false); setName(''); setAgreed(false); }}>Reset form</UiButton>
                            </div>
                        ) : (
                            <div style={col(16)}>
                                <UiTextField label="Full name" placeholder="Jane Doe" onInput={e => setName((e.target as HTMLInputElement).value)} />
                                <UiTextField label="Email" type="email" placeholder="jane@example.com" />
                                <UiTextField label="Password" type="password" placeholder="••••••••" helperText="At least 8 characters." />
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <UiSelect label="Primary framework" placeholder="Choose one" {...{ options: fwOptions } as any} />
                                <div style={col(6)}>
                                    <p style={{ fontSize: 13, fontWeight: 500 }}>Monthly budget: ${budget}</p>
                                    <UiSlider value={budget} min={10} max={200} step={10} showValue
                                        onUiSliderChange={e => setBudget((e as CustomEvent<{ value: number }>).detail.value)} />
                                </div>
                                <div style={col(6)}>
                                    <p style={{ fontSize: 13, fontWeight: 500 }}>Experience level ({exp}/5)</p>
                                    <UiRating value={exp} onUiRatingChange={e => setExp((e as CustomEvent<{ value: number }>).detail.value)} />
                                </div>
                                <UiCheckbox label="I agree to the Terms of Service and Privacy Policy" checked={agreed} onChange={() => setAgreed(a => !a)} />
                                <UiButton variant="primary" disabled={!agreed} onClick={() => setSubmitted(true)}>Create Account</UiButton>
                            </div>
                        )}
                    </div>

                    {/* state showcase */}
                    <div style={col(20)}>
                        <div style={card({ ...col(16) })}>
                            <p style={{ fontWeight: 700, fontSize: 15 }}>Input States</p>
                            <UiTextField label="Default" placeholder="Normal state" />
                            <UiTextField label="With helper" placeholder="Start typing…" helperText="Provides additional context." />
                            <UiTextField label="Error state" value="bad@email" error errorMessage="Enter a valid email address." />
                            <UiTextField label="Disabled" value="Cannot be edited" disabled />
                            <UiTextField label="Filled variant" placeholder="Filled style" variant="filled" />
                        </div>
                        <div style={card({ ...col(16) })}>
                            <p style={{ fontWeight: 700, fontSize: 15 }}>Checkboxes</p>
                            <div style={row(24)}>
                                <div style={col(10)}>
                                    <UiCheckbox label="Unchecked" />
                                    <UiCheckbox label="Checked" checked />
                                    <UiCheckbox label="Indeterminate" indeterminate />
                                </div>
                                <div style={col(10)}>
                                    <UiCheckbox label="Disabled" disabled />
                                    <UiCheckbox label="Disabled ✓" checked disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ── data section ──────────────────────────────────────────────────────────────
function Data() {
    const rows = [
        { name: 'UiButton', cat: 'Input', status: 'stable', tests: 32 },
        { name: 'UiSwitch', cat: 'Input', status: 'stable', tests: 33 },
        { name: 'UiAccordion', cat: 'Layout', status: 'stable', tests: 28 },
        { name: 'UiDatePicker', cat: 'Date', status: 'stable', tests: 61 },
        { name: 'UiRichTreeView', cat: 'Data', status: 'stable', tests: 45 },
        { name: 'UiCommand', cat: 'Navigation', status: 'stable', tests: 31 },
    ];
    const statusColor = (s: string) => s === 'stable' ? 'success' : 'warning';

    return (
        <section id="s-data" style={sect(c.bg)}>
            <div style={maxW()}>
                <Heading title="Data Display" sub="Table, List, and Skeleton components for structured data and loading states." />
                <div style={grid2()}>
                    <div style={card({ overflow: 'hidden', padding: 0 })}>
                        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${c.border}`, ...row(8) }}>
                            <p style={{ fontWeight: 700, fontSize: 15 }}>Component Catalog</p>
                            <UiBadge content={String(rows.length)} variant="primary" />
                        </div>
                        <UiTableContainer>
                            <UiTable>
                                <UiTableHead>
                                    <UiTableRow>
                                        <UiTableCell header>Component</UiTableCell>
                                        <UiTableCell header>Category</UiTableCell>
                                        <UiTableCell header>Status</UiTableCell>
                                        <UiTableCell header align="right">Tests</UiTableCell>
                                    </UiTableRow>
                                </UiTableHead>
                                <UiTableBody>
                                    {rows.map(r => (
                                        <UiTableRow key={r.name}>
                                            <UiTableCell><span style={{ fontFamily: 'monospace', fontSize: 13 }}>{r.name}</span></UiTableCell>
                                            <UiTableCell>{r.cat}</UiTableCell>
                                            <UiTableCell><UiBadge content={r.status} variant={statusColor(r.status)} /></UiTableCell>
                                            <UiTableCell align="right"><span style={{ fontSize: 13, color: c.muted }}>{r.tests}</span></UiTableCell>
                                        </UiTableRow>
                                    ))}
                                </UiTableBody>
                            </UiTable>
                        </UiTableContainer>
                    </div>

                    <div style={col(20)}>
                        <div style={card({ padding: 0, overflow: 'hidden' })}>
                            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${c.border}` }}>
                                <p style={{ fontWeight: 700, fontSize: 15 }}>List</p>
                            </div>
                            <UiList>
                                {[
                                    { icon: '📦', p: 'Components', s: '100+ ready-to-use elements' },
                                    { icon: '🎨', p: 'Theming', s: 'CSS custom properties' },
                                    { icon: '♿', p: 'Accessibility', s: 'ARIA roles & keyboard nav' },
                                    { icon: '⚛️', p: 'React Wrappers', s: 'Auto-generated, fully typed' },
                                    { icon: '🧪', p: 'Tested', s: '1000+ unit & browser tests' },
                                ].map(({ icon, p, s }) => (
                                    <UiListItem key={p}>
                                        <UiListItemButton>
                                            <UiListItemIcon>{icon}</UiListItemIcon>
                                            <UiListItemText primary={p} secondary={s} />
                                        </UiListItemButton>
                                    </UiListItem>
                                ))}
                            </UiList>
                        </div>
                        <div style={card({ ...col(16) })}>
                            <p style={{ fontWeight: 700, fontSize: 15 }}>Skeleton Loading</p>
                            <div style={row(12)}><UiSkeleton variant="circular" width="48px" height="48px" /><div style={{ ...col(6), flex: 1 }}><UiSkeleton variant="text" width="70%" /><UiSkeleton variant="text" width="50%" /></div></div>
                            <UiSkeleton variant="rectangular" width="100%" height="90px" />
                            <div style={row(8)}><UiSkeleton variant="rounded" width="80px" height="30px" /><UiSkeleton variant="rounded" width="80px" height="30px" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ── overlays section ──────────────────────────────────────────────────────────
function Overlays() {
    const [dlgOpen, setDlgOpen] = useState(false);
    const [snkOpen, setSnkOpen] = useState(false);
    const [snkMsg, setSnkMsg] = useState('');
    const [snkVariant, setSnkVariant] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const toast = (msg: string, v: typeof snkVariant) => { setSnkMsg(msg); setSnkVariant(v); setSnkOpen(true); };

    return (
        <section id="s-overlays" style={sect(c.surface)}>
            <div style={maxW()}>
                <Heading title="Overlays & Notifications" sub="Dialog, Snackbar, and Tooltip — accessible, keyboard-dismissable, and animated." />
                <div style={grid3()}>

                    <div style={card({ ...col(20) })}>
                        <p style={{ fontWeight: 700, fontSize: 15 }}>Dialog</p>
                        <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.5 }}>Modal dialogs with scale/slide transitions, backdrop click dismiss, and focus trap.</p>
                        <div style={row(8)}>
                            <UiButton variant="primary" onClick={() => setDlgOpen(true)}>Open Dialog</UiButton>
                        </div>
                        <UiDialog open={dlgOpen} onClose={() => setDlgOpen(false)}>
                            <UiDialogTitle>Delete component?</UiDialogTitle>
                            <UiDialogContent>
                                <UiDialogContentText>This will permanently remove the component and all associated files. This action cannot be undone.</UiDialogContentText>
                            </UiDialogContent>
                            <UiDialogActions>
                                <UiButton variant="secondary" onClick={() => setDlgOpen(false)}>Cancel</UiButton>
                                <UiButton variant="destructive" onClick={() => setDlgOpen(false)}>Delete</UiButton>
                            </UiDialogActions>
                        </UiDialog>
                    </div>

                    <div style={card({ ...col(20) })}>
                        <p style={{ fontWeight: 700, fontSize: 15 }}>Snackbar</p>
                        <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.5 }}>Toast notifications — auto-hide, pause-on-hover, anchor position, four variants.</p>
                        <div style={col(8)}>
                            <div style={row(8)}>
                                <UiButton size="small" variant="primary" onClick={() => toast('Changes saved!', 'success')}>Success</UiButton>
                                <UiButton size="small" variant="destructive" onClick={() => toast('Connection failed.', 'error')}>Error</UiButton>
                            </div>
                            <div style={row(8)}>
                                <UiButton size="small" variant="secondary" onClick={() => toast('Session expires in 5 min.', 'warning')}>Warning</UiButton>
                                <UiButton size="small" variant="secondary" onClick={() => toast('New feature available!', 'info')}>Info</UiButton>
                            </div>
                        </div>
                        <UiSnackbar open={snkOpen} message={snkMsg} variant={snkVariant} closable autoHideDuration={4000} onUiSnackbarClose={() => setSnkOpen(false)} />
                    </div>

                    <div style={card({ ...col(20) })}>
                        <p style={{ fontWeight: 700, fontSize: 15 }}>Tooltip</p>
                        <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.5 }}>Hover tooltips — top, bottom, left, right placement with optional arrow.</p>
                        <div style={col(12)}>
                            <div style={row(8)}>
                                <UiTooltip label="Tooltip on top" placement="top" arrow><UiButton size="small" variant="secondary">Top ↑</UiButton></UiTooltip>
                                <UiTooltip label="Tooltip on bottom" placement="bottom" arrow><UiButton size="small" variant="secondary">Bottom ↓</UiButton></UiTooltip>
                            </div>
                            <div style={row(8)}>
                                <UiTooltip label="Left tooltip" placement="left" arrow><UiButton size="small" variant="secondary">Left ←</UiButton></UiTooltip>
                                <UiTooltip label="Right tooltip" placement="right" arrow><UiButton size="small" variant="secondary">Right →</UiButton></UiTooltip>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

// ── flow section ──────────────────────────────────────────────────────────────
function Flow() {
    const [step, setStep] = useState(0);
    const steps = [
        { label: 'Create account', desc: 'Enter your email and choose a password.' },
        { label: 'Complete profile', desc: 'Add your name, role, and preferences.' },
        { label: 'Invite team', desc: 'Add colleagues — they can join immediately.' },
        { label: 'Go live 🎉', desc: 'Your workspace is ready.' },
    ];
    const faq = [
        { q: 'Is this library free?', a: 'Yes — fully open source under the ISC license.' },
        { q: 'Works without React?', a: 'Absolutely. Native web components work anywhere.' },
        { q: 'How do I theme it?', a: 'Override any --ui-* CSS custom property on :root.' },
        { q: 'Tree-shakeable?', a: 'Yes — import only what you need.' },
    ];

    return (
        <section id="s-flow" style={sect(c.bg)}>
            <div style={maxW()}>
                <Heading title="Navigation & Flow" sub="Stepper, Collapsible, Keyboard shortcuts — tools for multi-step flows and progressive disclosure." />
                <div style={grid2()}>

                    <div style={card({ ...col(20) })}>
                        <div>
                            <p style={{ fontWeight: 700, fontSize: 15 }}>Multi-step Stepper</p>
                            <p style={{ fontSize: 13, color: c.muted }}>Step {step + 1} of {steps.length}: {steps[step].label}</p>
                        </div>
                        <UiStepper activeStep={step} orientation="vertical">
                            {steps.map((s, i) => (
                                <UiStep key={s.label} stepIndex={i} active={i === step} completed={i < step}>
                                    <UiStepLabel>{s.label}</UiStepLabel>
                                    {i === step && <UiStepContent><p style={{ fontSize: 13, color: c.muted, marginBottom: 12 }}>{s.desc}</p></UiStepContent>}
                                </UiStep>
                            ))}
                        </UiStepper>
                        <div style={row(8)}>
                            <UiButton variant="secondary" disabled={step === 0} onClick={() => setStep(s => s - 1)}>Back</UiButton>
                            <UiButton variant="primary" disabled={step === steps.length - 1} onClick={() => setStep(s => s + 1)}>
                                {step === steps.length - 2 ? 'Finish' : 'Next'}
                            </UiButton>
                            {step === steps.length - 1 && <UiButton variant="secondary" onClick={() => setStep(0)}>Reset</UiButton>}
                        </div>
                    </div>

                    <div style={col(20)}>
                        <div style={card({ ...col(12) })}>
                            <div style={row(8)}>
                                <p style={{ fontWeight: 700, fontSize: 15 }}>FAQ — Collapsible</p>
                                <UiBadge content={String(faq.length)} variant="primary" />
                            </div>
                            {faq.map(({ q, a }) => (
                                <UiCollapsible key={q}>
                                    <UiCollapsibleTrigger>
                                        <div style={{ ...row(0), cursor: 'pointer', padding: '10px 0', borderTop: `1px solid ${c.border}`, justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: 14, fontWeight: 500 }}>{q}</span>
                                            <span style={{ color: c.muted, fontSize: 18 }}>+</span>
                                        </div>
                                    </UiCollapsibleTrigger>
                                    <UiCollapsibleContent>
                                        <p style={{ fontSize: 13, color: c.muted, padding: '8px 0 12px' }}>{a}</p>
                                    </UiCollapsibleContent>
                                </UiCollapsible>
                            ))}
                        </div>

                        <div style={card({ ...col(12) })}>
                            <p style={{ fontWeight: 700, fontSize: 15 }}>Keyboard Shortcuts</p>
                            <div style={col(8)}>
                                {[
                                    { keys: ['⌘', 'K'], label: 'Open command palette' },
                                    { keys: ['⌘', 'S'], label: 'Save changes' },
                                    { keys: ['⌘', 'Z'], label: 'Undo' },
                                    { keys: ['⌘', 'Shift', 'Z'], label: 'Redo' },
                                    { keys: ['Esc'], label: 'Dismiss dialog' },
                                ].map(({ keys, label }) => (
                                    <div key={label} style={{ ...row(8), justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: 13, color: c.muted }}>{label}</span>
                                        <div style={row(4)}>{keys.map(k => <UiKbd key={k}>{k}</UiKbd>)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ── interactive section ───────────────────────────────────────────────────────
function Interactive() {
    const [dark, setDark] = useState(false);
    const [notifs, setNotifs] = useState(true);
    const [save, setSave] = useState(false);
    const [pg, setPg] = useState(3);
    const [alertOn, setAlertOn] = useState(true);
    const [progress, setProgress] = useState(68);

    useEffect(() => {
        const id = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 2), 300);
        return () => clearInterval(id);
    }, []);

    return (
        <section style={sect(c.surface)}>
            <div style={maxW()}>
                <Heading title="Fully interactive" sub="Real Lit components rendered inside React — no mocks, no stubs." />
                <div style={grid3()}>

                    <div style={card({ ...col(20), background: dark ? '#1e293b' : c.surface, border: `1px solid ${dark ? '#334155' : c.border}`, transition: 'background 0.3s, border-color 0.3s' })}>
                        <div><p style={{ fontWeight: 700, fontSize: 15, color: dark ? '#f8fafc' : c.text }}>Settings Panel</p><p style={{ fontSize: 13, color: dark ? '#94a3b8' : c.muted }}>State reflected live below</p></div>
                        <UiDivider />
                        <div style={col(16)}>
                            <UiSwitch label="Dark mode" checked={dark} onUiSwitchChange={e => setDark((e as CustomEvent<{ checked: boolean }>).detail.checked)} />
                            <UiSwitch label="Notifications" checked={notifs} size="md" onUiSwitchChange={e => setNotifs((e as CustomEvent<{ checked: boolean }>).detail.checked)} />
                            <UiSwitch label="Auto-save" checked={save} size="sm" onUiSwitchChange={e => setSave((e as CustomEvent<{ checked: boolean }>).detail.checked)} />
                        </div>
                        <UiDivider />
                        <div style={col(6)}>
                            {[{ l: 'Dark mode', v: dark, color: c.primary }, { l: 'Notifications', v: notifs, color: c.success }, { l: 'Auto-save', v: save, color: c.success }].map(({ l, v, color }) => (
                                <div key={l} style={row(6)}><span style={{ width: 8, height: 8, borderRadius: '50%', background: v ? color : (dark ? '#334155' : c.border), display: 'inline-block' }} /><span style={{ fontSize: 12, color: dark ? '#94a3b8' : c.muted }}>{l}: <b style={{ color: dark ? '#f8fafc' : undefined }}>{v ? 'on' : 'off'}</b></span></div>
                            ))}
                        </div>
                    </div>

                    <div style={card({ ...col(20) })}>
                        <div><p style={{ fontWeight: 700, fontSize: 15 }}>Navigation</p><p style={{ fontSize: 13, color: c.muted }}>Breadcrumbs, Pagination &amp; Typography</p></div>
                        <UiDivider />
                        <UiBreadcrumbs><UiLink href="#" color="primary">Home</UiLink><UiLink href="#" color="primary">Components</UiLink><span style={{ fontSize: 13 }}>Interactive</span></UiBreadcrumbs>
                        <UiPagination count={10} page={pg} onUiPaginationChange={e => setPg((e as CustomEvent<{ page: number }>).detail.page)} />
                        <UiDivider />
                        <div style={col(6)}>
                            <p style={{ fontSize: 12, color: c.muted }}>Animated progress — {progress}%</p>
                            <UiLinearProgress variant="determinate" value={progress} color="primary" />
                        </div>
                        <UiDivider />
                        <div style={col(6)}>
                            <UiTypography variant="h6">Heading H6</UiTypography>
                            <UiTypography variant="body1">Body text — regular weight</UiTypography>
                            <UiTypography variant="caption" color="secondary">Caption — muted smaller text</UiTypography>
                        </div>
                    </div>

                    <div style={card({ ...col(20) })}>
                        <div><p style={{ fontWeight: 700, fontSize: 15 }}>Feedback</p><p style={{ fontSize: 13, color: c.muted }}>Dismissible alerts &amp; OTP input</p></div>
                        <UiDivider />
                        <div style={col(8)}>
                            {alertOn ? (
                                <UiAlert severity="info" title="Did you know?" dismissible onUiAlertClose={() => setAlertOn(false)}>Click × to dismiss. State tracked in React.</UiAlert>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '8px 0' }}><UiButton size="small" variant="secondary" onClick={() => setAlertOn(true)}>Restore alert</UiButton></div>
                            )}
                            <UiAlert severity="success">Custom element registered ✓</UiAlert>
                            <UiAlert severity="warning">Props synced via useEffect</UiAlert>
                        </div>
                        <UiDivider />
                        <div style={col(8)}>
                            <p style={{ fontSize: 12, color: c.muted }}>OTP Input — try typing</p>
                            <UiInputOtp maxLength={4}>
                                <UiInputOtpGroup>
                                    <UiInputOtpSlot index={0} /><UiInputOtpSlot index={1} /><UiInputOtpSlot index={2} /><UiInputOtpSlot index={3} />
                                </UiInputOtpGroup>
                            </UiInputOtp>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ── component list ────────────────────────────────────────────────────────────
function ComponentList() {
    const cats = [
        { name: 'Inputs & Forms', items: ['Button', 'ButtonGroup', 'ToggleButton', 'Switch', 'Checkbox', 'TextField', 'Input', 'Select', 'Autocomplete', 'Slider', 'RangeSlider', 'Rating', 'Radio', 'InputOTP'] },
        { name: 'Data Display', items: ['Avatar', 'Badge', 'Chip', 'Typography', 'Divider', 'Table', 'Card', 'List', 'ImageList', 'Empty'] },
        { name: 'Feedback', items: ['Alert', 'Snackbar', 'Dialog', 'Tooltip', 'HoverCard', 'LinearProgress', 'CircularProgress', 'Skeleton', 'Backdrop'] },
        { name: 'Navigation', items: ['Tabs', 'Breadcrumbs', 'Pagination', 'BottomNavigation', 'AppBar', 'Drawer', 'Menu', 'Menubar', 'SpeedDial', 'Command', 'Link'] },
        { name: 'Layout & Flow', items: ['Box', 'Stack', 'Grid', 'Container', 'Paper', 'Collapsible', 'Accordion', 'Fab', 'Stepper'] },
        { name: 'Date & Data', items: ['SimpleTreeView', 'RichTreeView', 'TransferList', 'DateField', 'DatePicker', 'DateRangePicker', 'TimePicker', 'Kbd'] },
    ];
    return (
        <section style={sect(c.bg)}>
            <div style={maxW()}>
                <Heading title={<>100+ components across 6 categories</>} sub="Every component ships with its own React wrapper, TypeScript types, Storybook stories, and unit tests." />
                <div style={grid3()}>
                    {cats.map(cat => (
                        <div key={cat.name} style={card()}>
                            <div style={{ ...row(8), marginBottom: 12, justifyContent: 'space-between' }}>
                                <p style={{ fontWeight: 700, fontSize: 14 }}>{cat.name}</p>
                                <span style={{ fontSize: 11, background: c.primaryLight, color: c.primary, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>{cat.items.length}</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {cat.items.map(it => <span key={it} style={{ fontSize: 12, fontFamily: 'monospace', color: c.muted, background: c.bg, border: `1px solid ${c.border}`, padding: '2px 8px', borderRadius: 4 }}>{it}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── footer ────────────────────────────────────────────────────────────────────
function Footer() {
    return (
        <footer style={{ background: c.dark, color: '#94a3b8', padding: '48px 24px' }}>
            <div style={{ ...maxW(), display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
                <div style={col(8)}>
                    <div style={row(10)}>
                        <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill={c.primary} /><path d="M8 10l4 4-4 4M14 18h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span style={{ fontWeight: 700, color: '#f1f5f9' }}>storybook-lit</span>
                    </div>
                    <p style={{ fontSize: 13 }}>Web Component UI · React wrappers · TypeScript first</p>
                </div>
                <div style={row(32)}>
                    {['Components', 'Getting Started', 'Storybook', 'GitHub'].map(l => (
                        <a key={l} href="#" style={{ color: '#94a3b8', fontSize: 13, textDecoration: 'none' }}>{l}</a>
                    ))}
                </div>
                <p style={{ fontSize: 12 }}>Built with Lit v3 · React 19 · TypeScript · Vite</p>
            </div>
        </footer>
    );
}

// ── app ───────────────────────────────────────────────────────────────────────
export function App() {
    return (
        <div style={{ fontFamily: 'system-ui,-apple-system,sans-serif', color: c.text }}>
            <Header />
            <Hero />
            <Stats />
            <Showcase />
            <Forms />
            <Data />
            <Overlays />
            <Flow />
            <Interactive />
            <ComponentList />
            <Footer />
        </div>
    );
}
