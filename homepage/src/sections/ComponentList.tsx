import React from 'react';
import { c, row, card, sect, maxW, grid3 } from '../tokens';
import { Heading } from '../components/shared';

export function ComponentList() {
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
