import React from 'react';
import { UiBadge } from '../../../react/src/components/UiBadge';
import { UiTable } from '../../../react/src/components/UiTable';
import { UiTableContainer } from '../../../react/src/components/UiTableContainer';
import { UiTableHead } from '../../../react/src/components/UiTableHead';
import { UiTableBody } from '../../../react/src/components/UiTableBody';
import { UiTableRow } from '../../../react/src/components/UiTableRow';
import { UiTableCell } from '../../../react/src/components/UiTableCell';
import { UiList } from '../../../react/src/components/UiList';
import { UiListItem } from '../../../react/src/components/UiListItem';
import { UiListItemButton } from '../../../react/src/components/UiListItemButton';
import { UiListItemText } from '../../../react/src/components/UiListItemText';
import { UiListItemIcon } from '../../../react/src/components/UiListItemIcon';
import { UiSkeleton } from '../../../react/src/components/UiSkeleton';
import { c, row, col, card, sect, maxW, grid2 } from '../tokens';
import { Heading } from '../components/shared';

export function Data() {
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
