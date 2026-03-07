import React, { useState } from 'react';
import { UiTextField } from '../../../react/src/components/UiTextField';
import { useTheme } from '../ThemeContext';
import { getColors, row, card, sect, maxW, grid3 } from '../tokens';
import { Heading } from '../components/shared';

const cats = [
    { name: 'Inputs & Forms',  items: ['Button', 'ButtonGroup', 'ToggleButton', 'Switch', 'Checkbox', 'TextField', 'Input', 'Select', 'Autocomplete', 'Slider', 'RangeSlider', 'Rating', 'Radio', 'InputOTP'] },
    { name: 'Data Display',    items: ['Avatar', 'Badge', 'Chip', 'Typography', 'Divider', 'Table', 'Card', 'List', 'ImageList', 'Empty'] },
    { name: 'Feedback',        items: ['Alert', 'Snackbar', 'Dialog', 'Tooltip', 'HoverCard', 'LinearProgress', 'CircularProgress', 'Skeleton', 'Backdrop'] },
    { name: 'Navigation',      items: ['Tabs', 'Breadcrumbs', 'Pagination', 'BottomNavigation', 'AppBar', 'Drawer', 'Menu', 'Menubar', 'SpeedDial', 'Command', 'Link'] },
    { name: 'Layout & Flow',   items: ['Box', 'Stack', 'Grid', 'Container', 'Paper', 'Collapsible', 'Accordion', 'Fab', 'Stepper'] },
    { name: 'Date & Data',     items: ['SimpleTreeView', 'RichTreeView', 'TransferList', 'DateField', 'DatePicker', 'DateRangePicker', 'TimePicker', 'Kbd'] },
];

const totalCount = cats.reduce((n, cat) => n + cat.items.length, 0);

export function ComponentList() {
    const { dark } = useTheme();
    const c = getColors(dark);
    const [query, setQuery] = useState('');

    const filtered = query.trim()
        ? cats
            .map(cat => ({ ...cat, items: cat.items.filter(it => it.toLowerCase().includes(query.toLowerCase())) }))
            .filter(cat => cat.items.length > 0)
        : cats;

    const matchCount = filtered.reduce((n, cat) => n + cat.items.length, 0);

    return (
        <section style={sect(undefined, c)}>
            <div style={maxW()}>
                <Heading title={<>{totalCount}+ components across 6 categories</>} sub="Every component ships with its own React wrapper, TypeScript types, Storybook stories, and unit tests." />

                <div style={{ maxWidth: 360, margin: '0 auto 40px' }}>
                    <UiTextField
                        placeholder="Filter components…"
                        value={query}
                        onInput={e => setQuery((e.target as HTMLInputElement).value)}
                    />
                    {query && (
                        <p style={{ fontSize: 12, color: c.muted, marginTop: 6, textAlign: 'center' }}>
                            {matchCount} result{matchCount !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
                        </p>
                    )}
                </div>

                {filtered.length === 0 ? (
                    <p style={{ textAlign: 'center', color: c.muted, fontSize: 14 }}>No components match &ldquo;{query}&rdquo;</p>
                ) : (
                    <div style={grid3()}>
                        {filtered.map(cat => (
                            <div key={cat.name} style={card({}, c)}>
                                <div style={{ ...row(8), marginBottom: 12, justifyContent: 'space-between' }}>
                                    <p style={{ fontWeight: 700, fontSize: 14 }}>{cat.name}</p>
                                    <span style={{ fontSize: 11, background: c.primaryLight, color: c.primary, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>{cat.items.length}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {cat.items.map(it => (
                                        <span
                                            key={it}
                                            style={{
                                                fontSize: 12, fontFamily: 'monospace',
                                                color: query && it.toLowerCase().includes(query.toLowerCase()) ? c.primary : c.muted,
                                                background: query && it.toLowerCase().includes(query.toLowerCase()) ? c.primaryLight : c.bg,
                                                border: `1px solid ${query && it.toLowerCase().includes(query.toLowerCase()) ? c.primary : c.border}`,
                                                padding: '2px 8px', borderRadius: 4,
                                            }}
                                        >
                                            {it}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
