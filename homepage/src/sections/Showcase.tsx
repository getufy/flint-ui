import React, { useState } from 'react';
import { UiButton } from '../../../packages/react/src/components/UiButton';
import { UiSwitch } from '../../../packages/react/src/components/UiSwitch';
import { UiAlert } from '../../../packages/react/src/components/UiAlert';
import { UiBadge } from '../../../packages/react/src/components/UiBadge';
import { UiChip } from '../../../packages/react/src/components/UiChip';
import { UiAvatar } from '../../../packages/react/src/components/UiAvatar';
import { UiCard } from '../../../packages/react/src/components/UiCard';
import { UiCardContent } from '../../../packages/react/src/components/UiCardContent';
import { UiCardHeader } from '../../../packages/react/src/components/UiCardHeader';
import { UiCardActions } from '../../../packages/react/src/components/UiCardActions';
import { UiAccordion } from '../../../packages/react/src/components/UiAccordion';
import { UiAccordionSummary } from '../../../packages/react/src/components/UiAccordionSummary';
import { UiAccordionDetails } from '../../../packages/react/src/components/UiAccordionDetails';
import { UiTabs } from '../../../packages/react/src/components/UiTabs';
import { UiTab } from '../../../packages/react/src/components/UiTab';
import { UiTabList } from '../../../packages/react/src/components/UiTabList';
import { UiTabPanel } from '../../../packages/react/src/components/UiTabPanel';
import { UiLinearProgress } from '../../../packages/react/src/components/UiLinearProgress';
import { UiCircularProgress } from '../../../packages/react/src/components/UiCircularProgress';
import { UiRating } from '../../../packages/react/src/components/UiRating';
import { UiSlider } from '../../../packages/react/src/components/UiSlider';
import { UiBreadcrumbs } from '../../../packages/react/src/components/UiBreadcrumbs';
import { UiPagination } from '../../../packages/react/src/components/UiPagination';
import { UiLink } from '../../../packages/react/src/components/UiLink';
import { UiCarousel } from '../../../packages/react/src/components/UiCarousel';
import { UiCarouselContent } from '../../../packages/react/src/components/UiCarouselContent';
import { UiCarouselItem } from '../../../packages/react/src/components/UiCarouselItem';
import { UiCarouselPrevious } from '../../../packages/react/src/components/UiCarouselPrevious';
import { UiCarouselNext } from '../../../packages/react/src/components/UiCarouselNext';
import { UiCommand } from '../../../packages/react/src/components/UiCommand';
import { UiCommandInput } from '../../../packages/react/src/components/UiCommandInput';
import { UiCommandList } from '../../../packages/react/src/components/UiCommandList';
import { UiCommandGroup } from '../../../packages/react/src/components/UiCommandGroup';
import { UiCommandItem } from '../../../packages/react/src/components/UiCommandItem';
import { UiCommandSeparator } from '../../../packages/react/src/components/UiCommandSeparator';
import { UiCommandEmpty } from '../../../packages/react/src/components/UiCommandEmpty';
import { UiTextField } from '../../../packages/react/src/components/UiTextField';
import { UiSelect } from '../../../packages/react/src/components/UiSelect';
import { UiCheckbox } from '../../../packages/react/src/components/UiCheckbox';
import { UiTable } from '../../../packages/react/src/components/UiTable';
import { UiTableContainer } from '../../../packages/react/src/components/UiTableContainer';
import { UiTableHead } from '../../../packages/react/src/components/UiTableHead';
import { UiTableBody } from '../../../packages/react/src/components/UiTableBody';
import { UiTableRow } from '../../../packages/react/src/components/UiTableRow';
import { UiTableCell } from '../../../packages/react/src/components/UiTableCell';
import { UiDialog } from '../../../packages/react/src/components/UiDialog';
import { UiDialogTitle } from '../../../packages/react/src/components/UiDialogTitle';
import { UiDialogContent } from '../../../packages/react/src/components/UiDialogContent';
import { UiDialogContentText } from '../../../packages/react/src/components/UiDialogContentText';
import { UiDialogActions } from '../../../packages/react/src/components/UiDialogActions';
import { UiGrid } from '../../../packages/react/src/components/UiGrid';
import { useTheme } from '../ThemeContext';
import { getColors, row, col, sect, maxW } from '../tokens';
import { Heading, ShowCard } from '../components/shared';

type Category = 'all' | 'inputs' | 'data' | 'feedback' | 'navigation' | 'layout';

const categories: { key: Category; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'inputs', label: 'Inputs' },
    { key: 'data', label: 'Data' },
    { key: 'feedback', label: 'Feedback' },
    { key: 'navigation', label: 'Navigation' },
    { key: 'layout', label: 'Layout' },
];

const tableRows = [
    { name: 'UiButton',      cat: 'Input',      status: 'stable', tests: 32 },
    { name: 'UiSwitch',      cat: 'Input',      status: 'stable', tests: 33 },
    { name: 'UiAccordion',   cat: 'Layout',     status: 'stable', tests: 28 },
    { name: 'UiDatePicker',  cat: 'Date',       status: 'stable', tests: 61 },
    { name: 'UiRichTreeView',cat: 'Data',       status: 'stable', tests: 45 },
    { name: 'UiCommand',     cat: 'Navigation', status: 'stable', tests: 31 },
];

export function Showcase() {
    const { dark } = useTheme();
    const c = getColors(dark);

    const [activeTab, setActiveTab] = useState<Category>('all');
    const [switchOn, setSwitchOn] = useState(false);
    const [sliderVal, setSliderVal] = useState(60);
    const [ratingVal, setRatingVal] = useState(3);
    const [page, setPage] = useState(2);
    const [dlgOpen, setDlgOpen] = useState(false);

    // Form state
    const [formName, setFormName] = useState('');
    const [formAgreed, setFormAgreed] = useState(false);
    const [formBudget, setFormBudget] = useState(50);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const fwOptions = [
        { value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' }, { value: 'svelte', label: 'Svelte' },
    ];

    const slides = [
        { bg: '#3b82f6', label: 'Components', sub: '100+ ready to use' },
        { bg: '#8b5cf6', label: 'TypeScript', sub: 'Fully typed API' },
        { bg: '#06b6d4', label: 'Accessible', sub: 'ARIA compliant' },
        { bg: '#22c55e', label: 'Themeable',  sub: 'CSS custom props' },
    ];

    const statusColor = (s: string) => s === 'stable' ? 'success' as const : 'warning' as const;

    const show = (cat: Category) => activeTab === 'all' || activeTab === cat;

    return (
        <section id="s-components" style={sect(undefined, c)}>
            <div style={maxW()}>
                <Heading title="Everything you need" sub="Every component is a live Lit custom element wrapped in a typed React component. Click around — they're all interactive." badge="Showcase" />

                {/* Tab bar */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
                    <div style={{ display: 'inline-flex', gap: 4, background: dark ? '#27272a' : '#f1f5f9', borderRadius: 24, padding: 4 }}>
                        {categories.map(cat => (
                            <button
                                key={cat.key}
                                onClick={() => setActiveTab(cat.key)}
                                style={{
                                    padding: '8px 18px',
                                    borderRadius: 20,
                                    border: 'none',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    background: activeTab === cat.key ? (dark ? '#3f3f46' : '#ffffff') : 'transparent',
                                    color: activeTab === cat.key ? c.text : c.muted,
                                    boxShadow: activeTab === cat.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <UiGrid container spacing={2.5}>

                    {/* INPUTS */}
                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('inputs') ? undefined : 'none' }}><ShowCard title="Buttons" desc="Three variants, three sizes, full-width and disabled states.">
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
                    </ShowCard></UiGrid>

                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('inputs') ? undefined : 'none' }}><ShowCard title="Switch" desc="Toggle control — form-associated, sizes sm/md/lg, icon slots.">
                        <div style={col(14)}>
                            <UiSwitch label={switchOn ? 'Enabled' : 'Disabled'} checked={switchOn}
                                onUiSwitchChange={e => setSwitchOn((e as CustomEvent<{ checked: boolean }>).detail.checked)} />
                            <UiSwitch label="Notifications" checked size="sm" />
                            <UiSwitch label="Auto-update" checked size="lg" />
                            <UiSwitch label="Offline mode" disabled />
                        </div>
                    </ShowCard></UiGrid>

                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('inputs') ? undefined : 'none' }}><ShowCard title="Rating & Slider" desc="Star rating with half-precision and slider with live value display.">
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
                    </ShowCard></UiGrid>

                    {/* Create Account Form — from Forms section */}
                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('inputs') ? undefined : 'none' }}><ShowCard title="Create Account" desc="A fully interactive form using Lit components in React.">
                        <div style={{ width: '100%' }}>
                            {formSubmitted ? (
                                <div style={col(12)}>
                                    <UiAlert severity="success" title="Account created!">Welcome, {formName || 'friend'}!</UiAlert>
                                    <UiButton size="small" variant="secondary" onClick={() => { setFormSubmitted(false); setFormName(''); setFormAgreed(false); }}>Reset form</UiButton>
                                </div>
                            ) : (
                                <div style={col(12)}>
                                    <UiTextField label="Full name" placeholder="Jane Doe" onInput={e => setFormName((e.target as HTMLInputElement).value)} />
                                    <UiTextField label="Email" type="email" placeholder="jane@example.com" />
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    <UiSelect label="Framework" placeholder="Choose one" {...{ options: fwOptions } as any} />
                                    <div style={col(4)}>
                                        <p style={{ fontSize: 12, fontWeight: 500 }}>Budget: ${formBudget}</p>
                                        <UiSlider value={formBudget} min={10} max={200} step={10} showValue onUiSliderChange={e => setFormBudget((e as CustomEvent<{ value: number }>).detail.value)} />
                                    </div>
                                    <UiCheckbox label="I agree to Terms" checked={formAgreed} onChange={() => setFormAgreed(a => !a)} />
                                    <UiButton variant="primary" disabled={!formAgreed} onClick={() => setFormSubmitted(true)}>Create Account</UiButton>
                                </div>
                            )}
                        </div>
                    </ShowCard></UiGrid>

                    {/* FEEDBACK */}
                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('feedback') ? undefined : 'none' }}><ShowCard title="Alerts" desc="Four severity levels with optional title, icons, and dismiss button.">
                        <div style={{ ...col(8), width: '100%' }}>
                            <UiAlert severity="info" title="Info">New version available.</UiAlert>
                            <UiAlert severity="success" title="Saved">Changes saved successfully.</UiAlert>
                            <UiAlert severity="warning" title="Warning">Review before publishing.</UiAlert>
                            <UiAlert severity="error">Authentication failed.</UiAlert>
                        </div>
                    </ShowCard></UiGrid>

                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('feedback') ? undefined : 'none' }}><ShowCard title="Progress" desc="Determinate and indeterminate linear bars and circular spinners.">
                        <div style={{ ...col(16), width: '100%', alignItems: 'center' }}>
                            <div style={{ width: '100%', ...col(10) }}>
                                <UiLinearProgress variant="determinate" value={72} color="primary" label="72%" />
                                <UiLinearProgress variant="determinate" value={45} color="success" label="45%" />
                                <UiLinearProgress variant="determinate" value={88} color="warning" label="88%" />
                                <UiLinearProgress variant="indeterminate" color="primary" />
                            </div>
                            <div style={row(20)}><UiCircularProgress value={65} /><UiCircularProgress value={85} /><UiCircularProgress /></div>
                        </div>
                    </ShowCard></UiGrid>

                    {/* Dialog — from Overlays section */}
                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('feedback') ? undefined : 'none' }}><ShowCard title="Dialog" desc="Modal dialogs with transitions, backdrop dismiss, and focus trap.">
                        <div style={col(12)}>
                            <UiButton variant="primary" onClick={() => setDlgOpen(true)}>Open Dialog</UiButton>
                            <p style={{ fontSize: 12, color: c.muted }}>Click to see a confirmation dialog</p>
                        </div>
                        <UiDialog open={dlgOpen} onClose={() => setDlgOpen(false)}>
                            <UiDialogTitle>Delete component?</UiDialogTitle>
                            <UiDialogContent>
                                <UiDialogContentText>This will permanently remove the component. This action cannot be undone.</UiDialogContentText>
                            </UiDialogContent>
                            <UiDialogActions>
                                <UiButton variant="secondary" onClick={() => setDlgOpen(false)}>Cancel</UiButton>
                                <UiButton variant="destructive" onClick={() => setDlgOpen(false)}>Delete</UiButton>
                            </UiDialogActions>
                        </UiDialog>
                    </ShowCard></UiGrid>

                    {/* DATA */}
                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('data') ? undefined : 'none' }}><ShowCard title="Avatar & Badge" desc="Avatars with initials, images, variants — overlaid with count or dot badges.">
                        <div style={row(20)}>
                            <UiBadge content="9+" variant="error"><UiAvatar initials="JD" size="medium" /></UiBadge>
                            <UiBadge content="3" variant="primary"><UiAvatar initials="AL" size="medium" /></UiBadge>
                            <UiBadge dot variant="success"><UiAvatar initials="MK" size="medium" /></UiBadge>
                            <UiAvatar initials="RB" size="large" variant="square" />
                            <UiAvatar initials="XL" size="xlarge" variant="rounded" />
                        </div>
                    </ShowCard></UiGrid>

                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('data') ? undefined : 'none' }}><ShowCard title="Chips" desc="Filled and outlined — clickable, deletable, colored, disabled.">
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
                    </ShowCard></UiGrid>

                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('data') ? undefined : 'none' }}><ShowCard title="Cards" desc="Composable card with header, content, media and action slots.">
                        <UiCard style={{ width: '100%', maxWidth: 280 }}>
                            <UiCardHeader>
                                <div style={row(8)}>
                                    <UiAvatar initials="LI" size="small" />
                                    <div><p style={{ fontWeight: 600, fontSize: 13 }}>lite</p><p style={{ fontSize: 11, color: c.muted }}>2 hours ago</p></div>
                                </div>
                            </UiCardHeader>
                            <UiCardContent><p style={{ fontSize: 13, color: c.muted }}>A comprehensive Lit + React component library for modern UIs.</p></UiCardContent>
                            <UiCardActions>
                                <UiButton size="small" variant="primary">Learn more</UiButton>
                                <UiButton size="small" variant="secondary">Share</UiButton>
                            </UiCardActions>
                        </UiCard>
                    </ShowCard></UiGrid>

                    {/* Table — from Data section */}
                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('data') ? undefined : 'none' }}><ShowCard title="Table" desc="Component catalog with sortable columns and status badges." span2>
                        <div style={{ width: '100%', overflow: 'hidden' }}>
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
                                        {tableRows.map(r => (
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
                    </ShowCard></UiGrid>

                    {/* LAYOUT */}
                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('layout') ? undefined : 'none' }}><ShowCard title="Accordion" desc="Expandable panels — click each. Supports disabled and multiple open.">
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
                    </ShowCard></UiGrid>

                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('layout') ? undefined : 'none' }}><ShowCard title="Carousel" desc="Keyboard & touch navigation, autoplay, items-per-view, loop, horizontal or vertical.">
                        <div style={{ width: '100%', position: 'relative' }}>
                            <UiCarousel loop style={{ width: '100%' }}>
                                <UiCarouselContent>
                                    {slides.map(s => (
                                        <UiCarouselItem key={s.label}>
                                            <div style={{ background: s.bg, borderRadius: 8, padding: '28px 16px', textAlign: 'center', color: '#fff' }}>
                                                <p style={{ fontWeight: 700, fontSize: 15 }}>{s.label}</p>
                                                <p style={{ fontSize: 12, opacity: 0.85 }}>{s.sub}</p>
                                            </div>
                                        </UiCarouselItem>
                                    ))}
                                </UiCarouselContent>
                                <UiCarouselPrevious />
                                <UiCarouselNext />
                            </UiCarousel>
                        </div>
                    </ShowCard></UiGrid>

                    {/* NAVIGATION */}
                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('navigation') ? undefined : 'none' }}><ShowCard title="Tabs" desc="Keyboard-navigable tabs with ARIA roles and multiple layout variants.">
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
                    </ShowCard></UiGrid>

                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('navigation') ? undefined : 'none' }}><ShowCard title="Breadcrumbs & Pagination" desc="Breadcrumb trail with separator and full-featured paginator with keyboard support.">
                        <div style={{ ...col(20), width: '100%', alignItems: 'center' }}>
                            <UiBreadcrumbs>
                                <UiLink href="#" color="primary">Home</UiLink>
                                <UiLink href="#" color="primary">Components</UiLink>
                                <span style={{ fontSize: 14 }}>Pagination</span>
                            </UiBreadcrumbs>
                            <UiPagination count={10} page={page} onUiPaginationChange={e => setPage((e as CustomEvent<{ page: number }>).detail.page)} />
                        </div>
                    </ShowCard></UiGrid>

                    <UiGrid xs={12} sm={6} md={4} style={{ display: show('navigation') ? undefined : 'none' }}><ShowCard title="Command Palette" desc="Fuzzy search across commands and items — keyboard-first, accessible." span2>
                        <div style={{ width: '100%', maxWidth: 480 }}>
                            <UiCommand style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                                <UiCommandInput placeholder="Search components..." />
                                <UiCommandList style={{ maxHeight: 220 }}>
                                    <UiCommandEmpty>No results found.</UiCommandEmpty>
                                    <UiCommandGroup heading="Components">
                                        <UiCommandItem value="button">Button</UiCommandItem>
                                        <UiCommandItem value="switch">Switch</UiCommandItem>
                                        <UiCommandItem value="carousel">Carousel</UiCommandItem>
                                        <UiCommandItem value="datepicker">DatePicker</UiCommandItem>
                                    </UiCommandGroup>
                                    <UiCommandSeparator />
                                    <UiCommandGroup heading="Navigation">
                                        <UiCommandItem value="tabs">Tabs</UiCommandItem>
                                        <UiCommandItem value="breadcrumbs">Breadcrumbs</UiCommandItem>
                                        <UiCommandItem value="command">Command</UiCommandItem>
                                    </UiCommandGroup>
                                </UiCommandList>
                            </UiCommand>
                        </div>
                    </ShowCard></UiGrid>

                </UiGrid>
            </div>
        </section>
    );
}
