import React, { useState } from 'react';
import { UiButton } from '../../../packages/react/src/components/UiButton';
import { UiAvatar } from '../../../packages/react/src/components/UiAvatar';
import { UiDialog } from '../../../packages/react/src/components/UiDialog';
import { UiDialogTitle } from '../../../packages/react/src/components/UiDialogTitle';
import { UiDialogContent } from '../../../packages/react/src/components/UiDialogContent';
import { UiDialogContentText } from '../../../packages/react/src/components/UiDialogContentText';
import { UiDialogActions } from '../../../packages/react/src/components/UiDialogActions';
import { UiSnackbar } from '../../../packages/react/src/components/UiSnackbar';
import { UiTooltip } from '../../../packages/react/src/components/UiTooltip';
import { UiHoverCard } from '../../../packages/react/src/components/UiHoverCard';
import { UiHoverCardTrigger } from '../../../packages/react/src/components/UiHoverCardTrigger';
import { UiHoverCardContent } from '../../../packages/react/src/components/UiHoverCardContent';
import { UiChip } from '../../../packages/react/src/components/UiChip';
import { useTheme } from '../ThemeContext';
import { getColors, col, row, card, sect, maxW, grid2 } from '../tokens';
import { Heading } from '../components/shared';

export function Overlays() {
    const { dark } = useTheme();
    const c = getColors(dark);
    const [dlgOpen, setDlgOpen] = useState(false);
    const [snkOpen, setSnkOpen] = useState(false);
    const [snkMsg, setSnkMsg] = useState('');
    const [snkVariant, setSnkVariant] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const toast = (msg: string, v: typeof snkVariant) => { setSnkMsg(msg); setSnkVariant(v); setSnkOpen(true); };

    const team = [
        { initials: 'JD', name: 'Jane Doe',    role: 'Design Engineer',   joined: 'Jan 2024' },
        { initials: 'AL', name: 'Alex Lee',    role: 'Frontend Developer', joined: 'Mar 2024' },
        { initials: 'MK', name: 'Maya Kim',    role: 'Product Manager',    joined: 'Jun 2023' },
    ];

    return (
        <section id="s-overlays" style={sect(c.surface, c)}>
            <div style={maxW()}>
                <Heading title="Overlays & Notifications" sub="Dialog, Snackbar, Tooltip, HoverCard — accessible, keyboard-dismissable, and animated." />
                <div style={grid2()}>

                    <div style={card({ ...col(20) }, c)}>
                        <p style={{ fontWeight: 700, fontSize: 15 }}>Dialog</p>
                        <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.5 }}>Modal dialogs with scale/slide transitions, backdrop click dismiss, and focus trap.</p>
                        <div>
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

                    <div style={card({ ...col(20) }, c)}>
                        <p style={{ fontWeight: 700, fontSize: 15 }}>Snackbar</p>
                        <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.5 }}>Toast notifications — auto-hide, pause-on-hover, anchor position, four variants.</p>
                        <div style={col(8)}>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <UiButton size="small" variant="primary" onClick={() => toast('Changes saved!', 'success')}>Success</UiButton>
                                <UiButton size="small" variant="destructive" onClick={() => toast('Connection failed.', 'error')}>Error</UiButton>
                            </div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <UiButton size="small" variant="secondary" onClick={() => toast('Session expires in 5 min.', 'warning')}>Warning</UiButton>
                                <UiButton size="small" variant="secondary" onClick={() => toast('New feature available!', 'info')}>Info</UiButton>
                            </div>
                        </div>
                        <UiSnackbar open={snkOpen} message={snkMsg} variant={snkVariant} closable autoHideDuration={4000} onUiSnackbarClose={() => setSnkOpen(false)} />
                    </div>

                    <div style={card({ ...col(20) }, c)}>
                        <p style={{ fontWeight: 700, fontSize: 15 }}>Tooltip</p>
                        <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.5 }}>Hover tooltips — top, bottom, left, right placement with optional arrow.</p>
                        <div style={col(12)}>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <UiTooltip label="Tooltip on top" placement="top" arrow><UiButton size="small" variant="secondary">Top ↑</UiButton></UiTooltip>
                                <UiTooltip label="Tooltip on bottom" placement="bottom" arrow><UiButton size="small" variant="secondary">Bottom ↓</UiButton></UiTooltip>
                            </div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <UiTooltip label="Left tooltip" placement="left" arrow><UiButton size="small" variant="secondary">Left ←</UiButton></UiTooltip>
                                <UiTooltip label="Right tooltip" placement="right" arrow><UiButton size="small" variant="secondary">Right →</UiButton></UiTooltip>
                            </div>
                        </div>
                    </div>

                    <div style={card({ ...col(20) }, c)}>
                        <p style={{ fontWeight: 700, fontSize: 15 }}>Hover Card</p>
                        <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.5 }}>Rich popovers on hover — delay in/out, custom side and alignment.</p>
                        <div style={row(16)}>
                            {team.map(m => (
                                <UiHoverCard key={m.initials}>
                                    <UiHoverCardTrigger>
                                        <UiAvatar initials={m.initials} size="medium" style={{ cursor: 'pointer' }} />
                                    </UiHoverCardTrigger>
                                    <UiHoverCardContent side="top" align="center">
                                        <div style={{ ...col(8), padding: 4, minWidth: 180 }}>
                                            <div style={row(8)}>
                                                <UiAvatar initials={m.initials} size="small" />
                                                <div>
                                                    <p style={{ fontWeight: 700, fontSize: 13 }}>{m.name}</p>
                                                    <p style={{ fontSize: 11, color: c.muted }}>{m.role}</p>
                                                </div>
                                            </div>
                                            <UiChip label={`Joined ${m.joined}`} variant="outlined" />
                                        </div>
                                    </UiHoverCardContent>
                                </UiHoverCard>
                            ))}
                        </div>
                        <p style={{ fontSize: 11, color: c.muted }}>Hover an avatar to see the card</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
