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
import { UiSkeleton } from '../../../react/src/components/UiSkeleton';
import { UiBreadcrumbs } from '../../../react/src/components/UiBreadcrumbs';
import { UiPagination } from '../../../react/src/components/UiPagination';
import { UiLink } from '../../../react/src/components/UiLink';
import { c, row, col, sect, maxW, grid3 } from '../tokens';
import { Heading, ShowCard } from '../components/shared';

export function Showcase() {
    const [switchOn, setSwitchOn] = useState(false);
    const [sliderVal, setSliderVal] = useState(60);
    const [ratingVal, setRatingVal] = useState(3);
    const [page, setPage] = useState(2);

    return (
        <section id="s-components" style={sect(c.bg)}>
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
                                    <UiAvatar initials="SL" size="small" />
                                    <div><p style={{ fontWeight: 600, fontSize: 13 }}>storybook-lit</p><p style={{ fontSize: 11, color: c.muted }}>2 hours ago</p></div>
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

                    <ShowCard title="Skeleton" desc="Animated loading placeholders in text, circular, rectangular, rounded variants.">
                        <div style={{ ...col(12), width: '100%' }}>
                            <div style={row(12)}>
                                <UiSkeleton variant="circular" width="40px" height="40px" />
                                <div style={{ ...col(6), flex: 1 }}>
                                    <UiSkeleton variant="text" width="80%" />
                                    <UiSkeleton variant="text" width="60%" />
                                </div>
                            </div>
                            <UiSkeleton variant="rectangular" width="100%" height="80px" />
                            <div style={row(8)}>
                                <UiSkeleton variant="rounded" width="30%" height="32px" />
                                <UiSkeleton variant="rounded" width="30%" height="32px" />
                                <UiSkeleton variant="rounded" width="30%" height="32px" />
                            </div>
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

                </div>
            </div>
        </section>
    );
}
