import React, { useState } from 'react';
import { UiButton } from '../../../react/src/components/UiButton';
import { UiSwitch } from '../../../react/src/components/UiSwitch';
import { UiAlert } from '../../../react/src/components/UiAlert';
import { UiBadge } from '../../../react/src/components/UiBadge';
import { UiChip } from '../../../react/src/components/UiChip';
import { UiAvatar } from '../../../react/src/components/UiAvatar';
import { UiCard } from '../../../react/src/components/UiCard';
import { UiCardContent } from '../../../react/src/components/UiCardContent';
import { UiCardHeader } from '../../../react/src/components/UiCardHeader';
import { UiCardActions } from '../../../react/src/components/UiCardActions';
import { UiAccordion } from '../../../react/src/components/UiAccordion';
import { UiAccordionSummary } from '../../../react/src/components/UiAccordionSummary';
import { UiAccordionDetails } from '../../../react/src/components/UiAccordionDetails';
import { UiTabs } from '../../../react/src/components/UiTabs';
import { UiTab } from '../../../react/src/components/UiTab';
import { UiTabList } from '../../../react/src/components/UiTabList';
import { UiTabPanel } from '../../../react/src/components/UiTabPanel';
import { UiLinearProgress } from '../../../react/src/components/UiLinearProgress';
import { UiCircularProgress } from '../../../react/src/components/UiCircularProgress';
import { UiRating } from '../../../react/src/components/UiRating';
import { UiSlider } from '../../../react/src/components/UiSlider';
import { UiBreadcrumbs } from '../../../react/src/components/UiBreadcrumbs';
import { UiPagination } from '../../../react/src/components/UiPagination';
import { UiLink } from '../../../react/src/components/UiLink';
import { UiCarousel } from '../../../react/src/components/UiCarousel';
import { UiCarouselContent } from '../../../react/src/components/UiCarouselContent';
import { UiCarouselItem } from '../../../react/src/components/UiCarouselItem';
import { UiCarouselPrevious } from '../../../react/src/components/UiCarouselPrevious';
import { UiCarouselNext } from '../../../react/src/components/UiCarouselNext';
import { UiCommand } from '../../../react/src/components/UiCommand';
import { UiCommandInput } from '../../../react/src/components/UiCommandInput';
import { UiCommandList } from '../../../react/src/components/UiCommandList';
import { UiCommandGroup } from '../../../react/src/components/UiCommandGroup';
import { UiCommandItem } from '../../../react/src/components/UiCommandItem';
import { UiCommandSeparator } from '../../../react/src/components/UiCommandSeparator';
import { UiCommandEmpty } from '../../../react/src/components/UiCommandEmpty';
import { useTheme } from '../ThemeContext';
import { getColors, row, col, sect, maxW, grid3 } from '../tokens';
import { Heading, ShowCard } from '../components/shared';

export function Showcase() {
    const { dark } = useTheme();
    const c = getColors(dark);

    const [switchOn, setSwitchOn] = useState(false);
    const [sliderVal, setSliderVal] = useState(60);
    const [ratingVal, setRatingVal] = useState(3);
    const [page, setPage] = useState(2);

    const slides = [
        { bg: '#3b82f6', label: 'Components', sub: '100+ ready to use' },
        { bg: '#8b5cf6', label: 'TypeScript', sub: 'Fully typed API' },
        { bg: '#06b6d4', label: 'Accessible', sub: 'ARIA compliant' },
        { bg: '#22c55e', label: 'Themeable',  sub: 'CSS custom props' },
    ];

    return (
        <section id="s-components" style={sect(undefined, c)}>
            <div style={maxW()}>
                <Heading title="Everything you need" sub="Every component is a live Lit custom element wrapped in a typed React component. Click around — they're all interactive." />
                <div style={grid3()}>

                    <ShowCard title="Buttons" desc="Three variants, three sizes, full-width and disabled states.">
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
                    </ShowCard>

                    <ShowCard title="Switch" desc="Toggle control — form-associated, sizes sm/md/lg, icon slots.">
                        <div style={col(14)}>
                            <UiSwitch label={switchOn ? 'Enabled' : 'Disabled'} checked={switchOn}
                                onUiSwitchChange={e => setSwitchOn((e as CustomEvent<{ checked: boolean }>).detail.checked)} />
                            <UiSwitch label="Notifications" checked size="sm" />
                            <UiSwitch label="Auto-update" checked size="lg" />
                            <UiSwitch label="Offline mode" disabled />
                        </div>
                    </ShowCard>

                    <ShowCard title="Alerts" desc="Four severity levels with optional title, icons, and dismiss button.">
                        <div style={{ ...col(8), width: '100%' }}>
                            <UiAlert severity="info" title="Info">New version available.</UiAlert>
                            <UiAlert severity="success" title="Saved">Changes saved successfully.</UiAlert>
                            <UiAlert severity="warning" title="Warning">Review before publishing.</UiAlert>
                            <UiAlert severity="error">Authentication failed.</UiAlert>
                        </div>
                    </ShowCard>

                    <ShowCard title="Avatar & Badge" desc="Avatars with initials, images, variants — overlaid with count or dot badges.">
                        <div style={row(20)}>
                            <UiBadge content="9+" variant="error"><UiAvatar initials="JD" size="medium" /></UiBadge>
                            <UiBadge content="3" variant="primary"><UiAvatar initials="AL" size="medium" /></UiBadge>
                            <UiBadge dot variant="success"><UiAvatar initials="MK" size="medium" /></UiBadge>
                            <UiAvatar initials="RB" size="large" variant="square" />
                            <UiAvatar initials="XL" size="xlarge" variant="rounded" />
                        </div>
                    </ShowCard>

                    <ShowCard title="Chips" desc="Filled and outlined — clickable, deletable, colored, disabled.">
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
                    </ShowCard>

                    <ShowCard title="Cards" desc="Composable card with header, content, media and action slots.">
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
                    </ShowCard>

                    <ShowCard title="Accordion" desc="Expandable panels — click each. Supports disabled and multiple open.">
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
                    </ShowCard>

                    <ShowCard title="Tabs" desc="Keyboard-navigable tabs with ARIA roles and multiple layout variants.">
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
                    </ShowCard>

                    <ShowCard title="Progress" desc="Determinate and indeterminate linear bars and circular spinners.">
                        <div style={{ ...col(16), width: '100%', alignItems: 'center' }}>
                            <div style={{ width: '100%', ...col(10) }}>
                                <UiLinearProgress variant="determinate" value={72} color="primary" label="72%" />
                                <UiLinearProgress variant="determinate" value={45} color="success" label="45%" />
                                <UiLinearProgress variant="determinate" value={88} color="warning" label="88%" />
                                <UiLinearProgress variant="indeterminate" color="primary" />
                            </div>
                            <div style={row(20)}><UiCircularProgress value={65} /><UiCircularProgress value={85} /><UiCircularProgress /></div>
                        </div>
                    </ShowCard>

                    <ShowCard title="Rating & Slider" desc="Star rating with half-precision and slider with live value display.">
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
                    </ShowCard>

                    <ShowCard title="Breadcrumbs & Pagination" desc="Breadcrumb trail with separator and full-featured paginator with keyboard support.">
                        <div style={{ ...col(20), width: '100%', alignItems: 'center' }}>
                            <UiBreadcrumbs>
                                <UiLink href="#" color="primary">Home</UiLink>
                                <UiLink href="#" color="primary">Components</UiLink>
                                <span style={{ fontSize: 14 }}>Pagination</span>
                            </UiBreadcrumbs>
                            <UiPagination count={10} page={page} onUiPaginationChange={e => setPage((e as CustomEvent<{ page: number }>).detail.page)} />
                        </div>
                    </ShowCard>

                    <ShowCard title="Carousel" desc="Keyboard & touch navigation, autoplay, items-per-view, loop, horizontal or vertical.">
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
                    </ShowCard>

                    <ShowCard title="Command Palette" desc="Fuzzy search across commands and items — keyboard-first, accessible." span2>
                        <div style={{ width: '100%', maxWidth: 480 }}>
                            <UiCommand style={{ border: `1px solid ${c.border}`, borderRadius: 8, overflow: 'hidden' }}>
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
                    </ShowCard>

                </div>
            </div>
        </section>
    );
}
