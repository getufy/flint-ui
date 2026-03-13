import React, { useState } from 'react';
import { UiButton } from '../../../packages/react/src/components/UiButton';
import { UiSwitch } from '../../../packages/react/src/components/UiSwitch';
import { UiAlert } from '../../../packages/react/src/components/UiAlert';
import { UiBadge } from '../../../packages/react/src/components/UiBadge';
import { UiChip } from '../../../packages/react/src/components/UiChip';
import { UiAvatar } from '../../../packages/react/src/components/UiAvatar';
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
import { UiInputOtp } from '../../../packages/react/src/components/UiInputOtp';
import { UiInputOtpGroup } from '../../../packages/react/src/components/UiInputOtpGroup';
import { UiInputOtpSlot } from '../../../packages/react/src/components/UiInputOtpSlot';
import { UiInputOtpSeparator } from '../../../packages/react/src/components/UiInputOtpSeparator';
import { UiStepper } from '../../../packages/react/src/components/UiStepper';
import { UiStep } from '../../../packages/react/src/components/UiStep';
import { UiStepLabel } from '../../../packages/react/src/components/UiStepLabel';
import { UiTooltip } from '../../../packages/react/src/components/UiTooltip';
import { UiCopyButton } from '../../../packages/react/src/components/UiCopyButton';
import { UiSkeleton } from '../../../packages/react/src/components/UiSkeleton';
import { UiCollapsible } from '../../../packages/react/src/components/UiCollapsible';
import { UiCollapsibleTrigger } from '../../../packages/react/src/components/UiCollapsibleTrigger';
import { UiCollapsibleContent } from '../../../packages/react/src/components/UiCollapsibleContent';
import { UiToggleButton } from '../../../packages/react/src/components/UiToggleButton';
import { UiToggleButtonGroup } from '../../../packages/react/src/components/UiToggleButtonGroup';
import { useTheme } from '../ThemeContext';
import { useBreakpoint } from '../useBreakpoint';
import { getColors, row, col, sect, maxW } from '../tokens';
import { Heading, ShowcaseComposition, ShowcaseCard, CategoryFilter, ComponentStrip, StripItem } from '../components/shared';
import { AnimatedSection } from '../components/AnimatedSection';

type Category = 'all' | 'inputs' | 'data' | 'feedback' | 'navigation' | 'layout';

const categoryDefs: { key: Category; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'inputs', label: 'Inputs' },
    { key: 'data', label: 'Data' },
    { key: 'feedback', label: 'Feedback' },
    { key: 'navigation', label: 'Navigation' },
    { key: 'layout', label: 'Layout' },
];

const tableRows = [
    { name: 'UiButton', cat: 'Input', status: 'stable', tests: 32 },
    { name: 'UiSwitch', cat: 'Input', status: 'stable', tests: 33 },
    { name: 'UiAccordion', cat: 'Layout', status: 'stable', tests: 28 },
    { name: 'UiDatePicker', cat: 'Date', status: 'stable', tests: 61 },
    { name: 'UiRichTreeView', cat: 'Data', status: 'stable', tests: 45 },
    { name: 'UiCommand', cat: 'Navigation', status: 'stable', tests: 31 },
];

// Category assignments for bento grid items
const bentoCategories: Record<string, Category> = {
    buttons: 'inputs', switch: 'inputs', ratingSlider: 'inputs',
    alerts: 'feedback', dialog: 'feedback', progress: 'feedback',
    tabs: 'navigation', carousel: 'navigation',
    accordion: 'layout',
    chips: 'data', avatarBadge: 'data',
};

// Category assignments for strip items
const stripCategories: Record<string, Category> = {
    inputOtp: 'inputs', stepper: 'navigation', skeleton: 'feedback',
    toggleGroup: 'inputs', copyButton: 'inputs', tooltip: 'feedback', collapsible: 'layout',
};

// Count items per category
function getCategoryCounts(): { key: string; label: string; count: number }[] {
    const counts: Record<string, number> = { inputs: 0, data: 0, feedback: 0, navigation: 0, layout: 0 };
    Object.values(bentoCategories).forEach(c => counts[c]++);
    Object.values(stripCategories).forEach(c => counts[c]++);
    return categoryDefs.map(d => ({ key: d.key, label: d.label, count: d.key === 'all' ? 0 : (counts[d.key] || 0) }));
}

export function Showcase() {
    const { dark } = useTheme();
    const c = getColors(dark);
    const { isMobile } = useBreakpoint();

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
        { bg: '#22c55e', label: 'Themeable', sub: 'CSS custom props' },
    ];

    const statusColor = (s: string) => s === 'stable' ? 'success' as const : 'warning' as const;

    const show = (cat: Category) => activeTab === 'all' || activeTab === cat;

    return (
        <section id="s-components" style={sect(undefined, c)}>
            <div style={maxW()}>
                <Heading title="Everything you need" sub="Every component is a live Lit custom element wrapped in a typed React component. Click around — they're all interactive." badge="Showcase" />

                {/* ═══ TIER 1: Hero Compositions ═══ */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>

                    {/* Composition 1: Forms */}
                    <div>
                        <AnimatedSection animation="slideUp" delay={0}>
                            <ShowcaseComposition
                                title="Forms that work"
                                description="Build complete forms with validated inputs, selects, sliders, and checkboxes — all form-associated and accessible out of the box."
                                chips={['TextField', 'Select', 'Slider', 'Checkbox', 'Button']}
                            >
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
                            </ShowcaseComposition>
                        </AnimatedSection>
                    </div>

                    {/* Composition 2: Keyboard-first navigation */}
                    <div>
                        <AnimatedSection animation="slideUp" delay={0.15}>
                            <ShowcaseComposition
                                title="Keyboard-first navigation"
                                description="Every navigation component is fully keyboard accessible. Tab, arrow keys, Enter — they all work exactly as expected."
                                chips={['Command', 'Breadcrumbs', 'Pagination']}
                                reverse
                            >
                                <div style={{ ...col(24), width: '100%' }}>
                                    <UiCommand style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', maxWidth: 480 }}>
                                        <UiCommandInput placeholder="Search components..." />
                                        <UiCommandList style={{ maxHeight: 180 }}>
                                            <UiCommandEmpty>No results found.</UiCommandEmpty>
                                            <UiCommandGroup heading="Components">
                                                <UiCommandItem value="button">Button</UiCommandItem>
                                                <UiCommandItem value="switch">Switch</UiCommandItem>
                                                <UiCommandItem value="carousel">Carousel</UiCommandItem>
                                            </UiCommandGroup>
                                            <UiCommandSeparator />
                                            <UiCommandGroup heading="Navigation">
                                                <UiCommandItem value="tabs">Tabs</UiCommandItem>
                                                <UiCommandItem value="breadcrumbs">Breadcrumbs</UiCommandItem>
                                            </UiCommandGroup>
                                        </UiCommandList>
                                    </UiCommand>
                                    <div style={{ ...col(16), alignItems: 'center' }}>
                                        <UiBreadcrumbs>
                                            <UiLink href="#" color="primary">Home</UiLink>
                                            <UiLink href="#" color="primary">Components</UiLink>
                                            <span style={{ fontSize: 14 }}>Pagination</span>
                                        </UiBreadcrumbs>
                                        <UiPagination count={10} page={page} onUiPaginationChange={e => setPage((e as CustomEvent<{ page: number }>).detail.page)} />
                                    </div>
                                </div>
                            </ShowcaseComposition>
                        </AnimatedSection>
                    </div>

                    {/* Composition 3: Display any data */}
                    <div>
                        <AnimatedSection animation="slideUp" delay={0.3}>
                            <ShowcaseComposition
                                title="Display any data"
                                description="Tables, avatars, badges, progress bars — everything you need to present information clearly and beautifully."
                                chips={['Table', 'Avatar', 'Badge', 'Progress']}
                            >
                                <div style={{ ...col(20), width: '100%' }}>
                                    <div style={{ padding: 16, background: c.bg, borderRadius: 8, overflow: 'hidden' }}>
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
                                    <div style={row(16)}>
                                        <UiBadge content="9+" variant="error"><UiAvatar initials="JD" size="medium" /></UiBadge>
                                        <UiBadge content="3" variant="primary"><UiAvatar initials="AL" size="medium" /></UiBadge>
                                        <UiBadge dot variant="success"><UiAvatar initials="MK" size="medium" /></UiBadge>
                                        <div style={{ flex: 1, ...col(8) }}>
                                            <UiLinearProgress variant="determinate" value={72} color="primary" label="72%" />
                                            <UiLinearProgress variant="determinate" value={45} color="success" label="45%" />
                                        </div>
                                    </div>
                                </div>
                            </ShowcaseComposition>
                        </AnimatedSection>
                    </div>
                </div>

                {/* ═══ Category Filter ═══ */}
                <CategoryFilter
                    categories={getCategoryCounts()}
                    active={activeTab}
                    onChange={k => setActiveTab(k as Category)}
                />

                {/* ═══ TIER 2: Bento Grid ═══ */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' : 'repeat(12, 1fr)',
                    gap: 20,
                    position: 'relative',
                }}>
                    {/* Row 1 */}
                    <AnimatedSection animation="scaleUp" delay={0} style={{ gridColumn: isMobile ? undefined : 'span 5', display: show('inputs') ? undefined : 'contents' }}>
                        <ShowcaseCard title="Buttons" desc="Three variants, three sizes, full-width and disabled states." span={5} visible={show('inputs')}>
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
                        </ShowcaseCard>
                    </AnimatedSection>

                    <AnimatedSection animation="scaleUp" delay={0.05} style={{ gridColumn: isMobile ? undefined : 'span 3' }}>
                        <ShowcaseCard title="Switch" desc="Toggle control with sizes and icons." span={3} visible={show('inputs')}>
                            <div style={col(14)}>
                                <UiSwitch label={switchOn ? 'Enabled' : 'Disabled'} checked={switchOn}
                                    onUiSwitchChange={e => setSwitchOn((e as CustomEvent<{ checked: boolean }>).detail.checked)} />
                                <UiSwitch label="Notifications" checked size="sm" />
                                <UiSwitch label="Auto-update" checked size="lg" />
                            </div>
                        </ShowcaseCard>
                    </AnimatedSection>

                    <AnimatedSection animation="scaleUp" delay={0.1} style={{ gridColumn: isMobile ? undefined : 'span 4' }}>
                        <ShowcaseCard title="Rating & Slider" desc="Star rating and slider with live values." span={4} visible={show('inputs')}>
                            <div style={{ ...col(16), width: '100%' }}>
                                <div style={col(6)}>
                                    <p style={{ fontSize: 12, color: c.muted }}>Rating ({ratingVal}/5)</p>
                                    <UiRating value={ratingVal} onUiRatingChange={e => setRatingVal((e as CustomEvent<{ value: number }>).detail.value)} />
                                </div>
                                <div style={col(6)}>
                                    <p style={{ fontSize: 12, color: c.muted }}>Slider — {sliderVal}%</p>
                                    <UiSlider value={sliderVal} showValue onUiSliderChange={e => setSliderVal((e as CustomEvent<{ value: number }>).detail.value)} />
                                </div>
                            </div>
                        </ShowcaseCard>
                    </AnimatedSection>

                    {/* Row 2 */}
                    <AnimatedSection animation="scaleUp" delay={0.15} style={{ gridColumn: isMobile ? undefined : 'span 4' }}>
                        <ShowcaseCard title="Alerts" desc="Four severity levels with title and icons." span={4} visible={show('feedback')}>
                            <div style={{ ...col(8), width: '100%' }}>
                                <UiAlert severity="info" title="Info">New version available.</UiAlert>
                                <UiAlert severity="success" title="Saved">Changes saved.</UiAlert>
                                <UiAlert severity="warning" title="Warning">Review before publishing.</UiAlert>
                                <UiAlert severity="error">Authentication failed.</UiAlert>
                            </div>
                        </ShowcaseCard>
                    </AnimatedSection>

                    <AnimatedSection animation="scaleUp" delay={0.2} style={{ gridColumn: isMobile ? undefined : 'span 4' }}>
                        <ShowcaseCard title="Dialog" desc="Modal with transitions, backdrop dismiss, focus trap." span={4} visible={show('feedback')}>
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
                        </ShowcaseCard>
                    </AnimatedSection>

                    <AnimatedSection animation="scaleUp" delay={0.25} style={{ gridColumn: isMobile ? undefined : 'span 4' }}>
                        <ShowcaseCard title="Progress" desc="Linear bars and circular spinners." span={4} visible={show('feedback')}>
                            <div style={{ ...col(16), width: '100%', alignItems: 'center' }}>
                                <div style={{ width: '100%', ...col(10) }}>
                                    <UiLinearProgress variant="determinate" value={72} color="primary" label="72%" />
                                    <UiLinearProgress variant="determinate" value={45} color="success" label="45%" />
                                    <UiLinearProgress variant="indeterminate" color="primary" />
                                </div>
                                <div style={row(20)}><UiCircularProgress value={65} /><UiCircularProgress value={85} /><UiCircularProgress /></div>
                            </div>
                        </ShowcaseCard>
                    </AnimatedSection>

                    {/* Row 3 */}
                    <AnimatedSection animation="scaleUp" delay={0.3} style={{ gridColumn: isMobile ? undefined : 'span 5' }}>
                        <ShowcaseCard title="Tabs" desc="Keyboard-navigable with ARIA roles." span={5} visible={show('navigation')}>
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
                        </ShowcaseCard>
                    </AnimatedSection>

                    <AnimatedSection animation="scaleUp" delay={0.35} style={{ gridColumn: isMobile ? undefined : 'span 7' }}>
                        <ShowcaseCard title="Carousel" desc="Touch, keyboard, autoplay, loop, items-per-view." span={7} visible={show('navigation')}>
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
                        </ShowcaseCard>
                    </AnimatedSection>

                    {/* Row 4 */}
                    <AnimatedSection animation="scaleUp" delay={0.4} style={{ gridColumn: isMobile ? undefined : 'span 4' }}>
                        <ShowcaseCard title="Accordion" desc="Expandable panels — click each." span={4} visible={show('layout')}>
                            <div style={{ width: '100%' }}>
                                {[
                                    { q: 'What is Lit?', a: 'A simple library for building fast, lightweight web components.' },
                                    { q: 'Why Web Components?', a: 'Works natively in any framework — no adapters needed.' },
                                    { q: 'React support?', a: 'Yes — every component ships with a typed React wrapper.' },
                                ].map(({ q, a }) => (
                                    <UiAccordion key={q}>
                                        <UiAccordionSummary>{q}</UiAccordionSummary>
                                        <UiAccordionDetails><p style={{ fontSize: 13, color: c.muted }}>{a}</p></UiAccordionDetails>
                                    </UiAccordion>
                                ))}
                            </div>
                        </ShowcaseCard>
                    </AnimatedSection>

                    <AnimatedSection animation="scaleUp" delay={0.45} style={{ gridColumn: isMobile ? undefined : 'span 3' }}>
                        <ShowcaseCard title="Chips" desc="Filled, outlined, clickable, deletable." span={3} visible={show('data')}>
                            <div style={col(8)}>
                                <div style={row(6)}>
                                    <UiChip label="React" color="primary" clickable />
                                    <UiChip label="Lit" clickable />
                                </div>
                                <div style={row(6)}>
                                    <UiChip label="Outlined" variant="outlined" color="primary" clickable />
                                    <UiChip label="Deletable" deletable clickable />
                                </div>
                            </div>
                        </ShowcaseCard>
                    </AnimatedSection>

                    <AnimatedSection animation="scaleUp" delay={0.5} style={{ gridColumn: isMobile ? undefined : 'span 5' }}>
                        <ShowcaseCard title="Avatar & Badge" desc="Initials, images, sizes — with count or dot badges." span={5} visible={show('data')}>
                            <div style={row(20)}>
                                <UiBadge content="9+" variant="error"><UiAvatar initials="JD" size="medium" /></UiBadge>
                                <UiBadge content="3" variant="primary"><UiAvatar initials="AL" size="medium" /></UiBadge>
                                <UiBadge dot variant="success"><UiAvatar initials="MK" size="medium" /></UiBadge>
                                <UiAvatar initials="RB" size="large" variant="square" />
                                <UiAvatar initials="XL" size="xlarge" variant="rounded" />
                            </div>
                        </ShowcaseCard>
                    </AnimatedSection>
                </div>

                {/* ═══ TIER 3: Horizontal Scroll Strip ═══ */}
                <div style={{ marginTop: 48 }}>
                    <AnimatedSection animation="slideUp">
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: c.text, marginBottom: 20, textAlign: 'center' }}>And many more...</h3>
                        <ComponentStrip>
                            <StripItem label="Input OTP" visible={show('inputs')}>
                                <UiInputOtp maxLength={6}>
                                    <UiInputOtpGroup>
                                        <UiInputOtpSlot index={0} />
                                        <UiInputOtpSlot index={1} />
                                        <UiInputOtpSlot index={2} />
                                    </UiInputOtpGroup>
                                    <UiInputOtpSeparator />
                                    <UiInputOtpGroup>
                                        <UiInputOtpSlot index={3} />
                                        <UiInputOtpSlot index={4} />
                                        <UiInputOtpSlot index={5} />
                                    </UiInputOtpGroup>
                                </UiInputOtp>
                            </StripItem>

                            <StripItem label="Stepper" visible={show('navigation')}>
                                <UiStepper activeStep={1} style={{ width: '100%' }}>
                                    <UiStep><UiStepLabel>Setup</UiStepLabel></UiStep>
                                    <UiStep><UiStepLabel>Review</UiStepLabel></UiStep>
                                    <UiStep><UiStepLabel>Done</UiStepLabel></UiStep>
                                </UiStepper>
                            </StripItem>

                            <StripItem label="Skeleton" visible={show('feedback')}>
                                <div style={col(8)}>
                                    <UiSkeleton variant="circular" width="40px" height="40px" />
                                    <UiSkeleton variant="text" width="140px" height="14px" />
                                    <UiSkeleton variant="rectangular" width="160px" height="24px" />
                                </div>
                            </StripItem>

                            <StripItem label="Toggle Group" visible={show('inputs')}>
                                <UiToggleButtonGroup value="center">
                                    <UiToggleButton value="left">L</UiToggleButton>
                                    <UiToggleButton value="center">C</UiToggleButton>
                                    <UiToggleButton value="right">R</UiToggleButton>
                                </UiToggleButtonGroup>
                            </StripItem>

                            <StripItem label="Copy Button" visible={show('inputs')}>
                                <UiCopyButton value="npm install storybook-lit" />
                            </StripItem>

                            <StripItem label="Tooltip" visible={show('feedback')}>
                                <UiTooltip label="Hello from Tooltip!">
                                    <UiButton variant="secondary" size="small">Hover me</UiButton>
                                </UiTooltip>
                            </StripItem>

                            <StripItem label="Collapsible" visible={show('layout')}>
                                <UiCollapsible>
                                    <UiCollapsibleTrigger>
                                        <UiButton variant="secondary" size="small">Toggle</UiButton>
                                    </UiCollapsibleTrigger>
                                    <UiCollapsibleContent>
                                        <p style={{ fontSize: 12, color: c.muted, paddingTop: 8 }}>Hidden content revealed!</p>
                                    </UiCollapsibleContent>
                                </UiCollapsible>
                            </StripItem>
                        </ComponentStrip>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
