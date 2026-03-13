import React, { useState } from 'react';
import { UiTextField } from '../../../packages/react/src/components/UiTextField';
import { useTheme } from '../ThemeContext';
import { getColors, row, getShadows, sect, maxW, grid3 } from '../tokens';
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
    const s = getShadows(dark);
    const [query, setQuery] = useState('');
    const [hoveredCat, setHoveredCat] = useState<string | null>(null);

    const filtered = query.trim()
        ? cats
            .map(cat => ({ ...cat, items: cat.items.filter(it => it.toLowerCase().includes(query.toLowerCase())) }))
            .filter(cat => cat.items.length > 0)
        : cats;

    const matchCount = filtered.reduce((n, cat) => n + cat.items.length, 0);

    return (
        <section id="s-all-components" style={sect(undefined, c)}>
            <div style={maxW()}>
                <Heading title={<>{totalCount}+ components across 6 categories</>} sub="Every component ships with its own React wrapper, TypeScript types, Storybook stories, and unit tests." badge="Full Library" />

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
                            <div
                                key={cat.name}
                                onMouseEnter={() => setHoveredCat(cat.name)}
                                onMouseLeave={() => setHoveredCat(null)}
                                style={{
                                    background: c.surface,
                                    borderRadius: 12,
                                    boxShadow: hoveredCat === cat.name ? s.lg : s.md,
                                    padding: '20px 24px',
                                    transform: hoveredCat === cat.name ? 'translateY(-2px)' : 'translateY(0)',
                                    transition: 'box-shadow 0.2s, transform 0.2s',
                                }}
                            >
                                <div style={{ ...row(8), marginBottom: 12, justifyContent: 'space-between' }}>
                                    <p style={{ fontWeight: 700, fontSize: 14 }}>{cat.name}</p>
                                    <span style={{ fontSize: 11, background: c.primaryLight, color: c.primary, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>{cat.items.length}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {cat.items.map(it => {
                                        const isMatch = query && it.toLowerCase().includes(query.toLowerCase());
                                        return (
                                            <span
                                                key={it}
                                                style={{
                                                    fontSize: 12, fontFamily: 'monospace',
                                                    color: isMatch ? c.primary : c.muted,
                                                    background: isMatch ? c.primaryLight : `${c.bg}`,
                                                    padding: '3px 10px', borderRadius: 6,
                                                }}
                                            >
                                                {it}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
