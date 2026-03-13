import React, { useState } from 'react';
import { UiSwitch } from '../../../packages/react/src/components/UiSwitch';
import { UiDivider } from '../../../packages/react/src/components/UiDivider';
import { useTheme } from '../ThemeContext';
import { getColors, row, col, sect, maxW, glass, getShadows } from '../tokens';
import { Heading } from '../components/shared';

export function Interactive() {
    const { dark, setMode } = useTheme();
    const c = getColors(dark);
    const s = getShadows(dark);

    const [notifs, setNotifs] = useState(true);
    const [save, setSave] = useState(false);

    return (
        <section id="s-interactive" style={sect(undefined, c)}>
            <div style={maxW()}>
                <Heading title="Fully interactive" sub="Real Lit components rendered inside React — no mocks, no stubs." badge="Try it" />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                        ...glass(dark),
                        ...col(20),
                        borderRadius: 16,
                        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                        boxShadow: s.xl,
                        padding: '28px 32px',
                        maxWidth: 400,
                        width: '100%',
                        transition: 'background 0.2s, box-shadow 0.2s',
                    }}>
                        <div>
                            <p style={{ fontWeight: 700, fontSize: 17, color: c.text }}>Settings Panel</p>
                            <p style={{ fontSize: 13, color: c.muted }}>Toggles update the live page theme</p>
                        </div>
                        <UiDivider />
                        <div style={col(16)}>
                            <UiSwitch label="Dark mode" checked={dark} onUiSwitchChange={e => setMode((e as CustomEvent<{ checked: boolean }>).detail.checked ? 'dark' : 'light')} />
                            <UiSwitch label="Notifications" checked={notifs} size="md" onUiSwitchChange={e => setNotifs((e as CustomEvent<{ checked: boolean }>).detail.checked)} />
                            <UiSwitch label="Auto-save" checked={save} size="sm" onUiSwitchChange={e => setSave((e as CustomEvent<{ checked: boolean }>).detail.checked)} />
                        </div>
                        <UiDivider />
                        <div style={col(6)}>
                            {[{ l: 'Dark mode', v: dark, color: c.primary }, { l: 'Notifications', v: notifs, color: c.success }, { l: 'Auto-save', v: save, color: c.success }].map(({ l, v, color }) => (
                                <div key={l} style={row(6)}><span style={{ width: 8, height: 8, borderRadius: '50%', background: v ? color : c.muted, display: 'inline-block' }} /><span style={{ fontSize: 12, color: c.muted }}>{l}: <b style={{ color: c.text }}>{v ? 'on' : 'off'}</b></span></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
