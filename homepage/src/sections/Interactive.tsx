import React, { useState, useEffect } from 'react';
import { UiButton } from '../../../react/src/components/UiButton';
import { UiSwitch } from '../../../react/src/components/UiSwitch';
import { UiAlert } from '../../../react/src/components/UiAlert';
import { UiDivider } from '../../../react/src/components/UiDivider';
import { UiBreadcrumbs } from '../../../react/src/components/UiBreadcrumbs';
import { UiPagination } from '../../../react/src/components/UiPagination';
import { UiLinearProgress } from '../../../react/src/components/UiLinearProgress';
import { UiTypography } from '../../../react/src/components/UiTypography';
import { UiLink } from '../../../react/src/components/UiLink';
import { UiInputOtp } from '../../../react/src/components/UiInputOtp';
import { UiInputOtpGroup } from '../../../react/src/components/UiInputOtpGroup';
import { UiInputOtpSlot } from '../../../react/src/components/UiInputOtpSlot';
import { useTheme } from '../ThemeContext';
import { getColors, row, col, card, sect, maxW, grid3 } from '../tokens';
import { Heading } from '../components/shared';

export function Interactive() {
    const { dark, setDark } = useTheme();
    const c = getColors(dark);

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

                    <div style={{ ...card({ ...col(20) }), background: c.surface, border: `1px solid ${c.border}`, transition: 'background 0.2s, border-color 0.2s' }}>
                        <div>
                            <p style={{ fontWeight: 700, fontSize: 15, color: c.text }}>Settings Panel</p>
                            <p style={{ fontSize: 13, color: c.muted }}>Toggles update the live page theme</p>
                        </div>
                        <UiDivider />
                        <div style={col(16)}>
                            <UiSwitch label="Dark mode" checked={dark} onUiSwitchChange={e => setDark((e as CustomEvent<{ checked: boolean }>).detail.checked)} />
                            <UiSwitch label="Notifications" checked={notifs} size="md" onUiSwitchChange={e => setNotifs((e as CustomEvent<{ checked: boolean }>).detail.checked)} />
                            <UiSwitch label="Auto-save" checked={save} size="sm" onUiSwitchChange={e => setSave((e as CustomEvent<{ checked: boolean }>).detail.checked)} />
                        </div>
                        <UiDivider />
                        <div style={col(6)}>
                            {[{ l: 'Dark mode', v: dark, color: c.primary }, { l: 'Notifications', v: notifs, color: c.success }, { l: 'Auto-save', v: save, color: c.success }].map(({ l, v, color }) => (
                                <div key={l} style={row(6)}><span style={{ width: 8, height: 8, borderRadius: '50%', background: v ? color : c.border, display: 'inline-block' }} /><span style={{ fontSize: 12, color: c.muted }}>{l}: <b style={{ color: c.text }}>{v ? 'on' : 'off'}</b></span></div>
                            ))}
                        </div>
                    </div>

                    <div style={{ ...card({ ...col(20) }), background: c.surface, border: `1px solid ${c.border}` }}>
                        <div><p style={{ fontWeight: 700, fontSize: 15, color: c.text }}>Navigation</p><p style={{ fontSize: 13, color: c.muted }}>Breadcrumbs, Pagination &amp; Typography</p></div>
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

                    <div style={{ ...card({ ...col(20) }), background: c.surface, border: `1px solid ${c.border}` }}>
                        <div><p style={{ fontWeight: 700, fontSize: 15, color: c.text }}>Feedback</p><p style={{ fontSize: 13, color: c.muted }}>Dismissible alerts &amp; OTP input</p></div>
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
