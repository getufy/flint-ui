import React, { useState } from 'react';
import { UiButton } from '../../../react/src/components/UiButton';
import { UiDialog } from '../../../react/src/components/UiDialog';
import { UiDialogTitle } from '../../../react/src/components/UiDialogTitle';
import { UiDialogContent } from '../../../react/src/components/UiDialogContent';
import { UiDialogContentText } from '../../../react/src/components/UiDialogContentText';
import { UiDialogActions } from '../../../react/src/components/UiDialogActions';
import { UiSnackbar } from '../../../react/src/components/UiSnackbar';
import { UiTooltip } from '../../../react/src/components/UiTooltip';
import { c, col, card, sect, maxW, grid3 } from '../tokens';
import { Heading } from '../components/shared';

export function Overlays() {
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

                    <div style={card({ ...col(20) })}>
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

                    <div style={card({ ...col(20) })}>
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

                </div>
            </div>
        </section>
    );
}
