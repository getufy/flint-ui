import React, { useState, useEffect } from 'react';
import { UiButton } from '../../../packages/react/src/components/UiButton';
import { UiBadge } from '../../../packages/react/src/components/UiBadge';
import { UiStepper } from '../../../packages/react/src/components/UiStepper';
import { UiStep } from '../../../packages/react/src/components/UiStep';
import { UiStepLabel } from '../../../packages/react/src/components/UiStepLabel';
import { UiStepContent } from '../../../packages/react/src/components/UiStepContent';
import { UiCollapsible } from '../../../packages/react/src/components/UiCollapsible';
import { UiCollapsibleTrigger } from '../../../packages/react/src/components/UiCollapsibleTrigger';
import { UiCollapsibleContent } from '../../../packages/react/src/components/UiCollapsibleContent';
import { UiKbd } from '../../../packages/react/src/components/UiKbd';
import { UiCommandDialog } from '../../../packages/react/src/components/UiCommandDialog';
import { UiCommand } from '../../../packages/react/src/components/UiCommand';
import { UiCommandInput } from '../../../packages/react/src/components/UiCommandInput';
import { UiCommandList } from '../../../packages/react/src/components/UiCommandList';
import { UiCommandGroup } from '../../../packages/react/src/components/UiCommandGroup';
import { UiCommandItem } from '../../../packages/react/src/components/UiCommandItem';
import { UiCommandSeparator } from '../../../packages/react/src/components/UiCommandSeparator';
import { UiCommandEmpty } from '../../../packages/react/src/components/UiCommandEmpty';
import { useTheme } from '../ThemeContext';
import { getColors, row, col, card, sect, maxW, grid2 } from '../tokens';
import { Heading } from '../components/shared';

export function Flow() {
    const { dark } = useTheme();
    const c = getColors(dark);
    const [step, setStep] = useState(0);
    const [cmdOpen, setCmdOpen] = useState(false);

    const steps = [
        { label: 'Create account', desc: 'Enter your email and choose a password.' },
        { label: 'Complete profile', desc: 'Add your name, role, and preferences.' },
        { label: 'Invite team', desc: 'Add colleagues — they can join immediately.' },
        { label: 'Go live 🎉', desc: 'Your workspace is ready.' },
    ];
    const faq = [
        { q: 'Is this library free?', a: 'Yes — fully open source under the ISC license.' },
        { q: 'Works without React?', a: 'Absolutely. Native web components work anywhere.' },
        { q: 'How do I theme it?', a: 'Override any --ui-* CSS custom property on :root.' },
        { q: 'Tree-shakeable?', a: 'Yes — import only what you need.' },
    ];

    // Global ⌘K / Ctrl+K listener
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setCmdOpen(o => !o);
            }
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <section id="s-flow" style={sect(undefined, c)}>
            <div style={maxW()}>
                <Heading title="Navigation & Flow" sub="Stepper, Collapsible, Command Palette — tools for multi-step flows and progressive disclosure." />
                <div style={grid2()}>

                    <div style={card({ ...col(20) }, c)}>
                        <div>
                            <p style={{ fontWeight: 700, fontSize: 15 }}>Multi-step Stepper</p>
                            <p style={{ fontSize: 13, color: c.muted }}>Step {step + 1} of {steps.length}: {steps[step].label}</p>
                        </div>
                        <UiStepper activeStep={step} orientation="vertical">
                            {steps.map((s, i) => (
                                <UiStep key={s.label} stepIndex={i} active={i === step} completed={i < step}>
                                    <UiStepLabel>{s.label}</UiStepLabel>
                                    {i === step && <UiStepContent><p style={{ fontSize: 13, color: c.muted, marginBottom: 12 }}>{s.desc}</p></UiStepContent>}
                                </UiStep>
                            ))}
                        </UiStepper>
                        <div style={row(8)}>
                            <UiButton variant="secondary" disabled={step === 0} onClick={() => setStep(s => s - 1)}>Back</UiButton>
                            <UiButton variant="primary" disabled={step === steps.length - 1} onClick={() => setStep(s => s + 1)}>
                                {step === steps.length - 2 ? 'Finish' : 'Next'}
                            </UiButton>
                            {step === steps.length - 1 && <UiButton variant="secondary" onClick={() => setStep(0)}>Reset</UiButton>}
                        </div>
                    </div>

                    <div style={col(20)}>
                        <div style={card({ ...col(12) }, c)}>
                            <div style={row(8)}>
                                <p style={{ fontWeight: 700, fontSize: 15 }}>FAQ — Collapsible</p>
                                <UiBadge content={String(faq.length)} variant="primary" />
                            </div>
                            {faq.map(({ q, a }) => (
                                <UiCollapsible key={q}>
                                    <UiCollapsibleTrigger>
                                        <div style={{ ...row(0), cursor: 'pointer', padding: '10px 0', borderTop: `1px solid ${c.border}`, justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: 14, fontWeight: 500 }}>{q}</span>
                                            <span style={{ color: c.muted, fontSize: 18 }}>+</span>
                                        </div>
                                    </UiCollapsibleTrigger>
                                    <UiCollapsibleContent>
                                        <p style={{ fontSize: 13, color: c.muted, padding: '8px 0 12px' }}>{a}</p>
                                    </UiCollapsibleContent>
                                </UiCollapsible>
                            ))}
                        </div>

                        <div style={card({ ...col(12) }, c)}>
                            <p style={{ fontWeight: 700, fontSize: 15 }}>Keyboard Shortcuts</p>
                            <div style={col(8)}>
                                {[
                                    { keys: ['⌘', 'K'], label: 'Open command palette', action: () => setCmdOpen(true) },
                                    { keys: ['⌘', 'S'], label: 'Save changes', action: undefined },
                                    { keys: ['⌘', 'Z'], label: 'Undo', action: undefined },
                                    { keys: ['⌘', 'Shift', 'Z'], label: 'Redo', action: undefined },
                                    { keys: ['Esc'], label: 'Dismiss dialog', action: undefined },
                                ].map(({ keys, label, action }) => (
                                    <div
                                        key={label}
                                        onClick={action}
                                        style={{ ...row(8), justifyContent: 'space-between', cursor: action ? 'pointer' : 'default', borderRadius: 6, padding: '4px 6px', margin: '0 -6px', transition: 'background 0.15s' }}
                                        onMouseEnter={action ? e => (e.currentTarget.style.background = c.bg) : undefined}
                                        onMouseLeave={action ? e => (e.currentTarget.style.background = 'transparent') : undefined}
                                    >
                                        <span style={{ fontSize: 13, color: action ? c.primary : c.muted }}>{label}</span>
                                        <div style={row(4)}>{keys.map(k => <UiKbd key={k}>{k}</UiKbd>)}</div>
                                    </div>
                                ))}
                            </div>
                            <UiButton size="small" variant="secondary" onClick={() => setCmdOpen(true)}>Try it — Open Palette</UiButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Command Dialog — opened by ⌘K or the button above */}
            <UiCommandDialog open={cmdOpen} onUiCommandDialogClose={() => setCmdOpen(false)}>
                <UiCommand>
                    <UiCommandInput placeholder="Search components, docs…" />
                    <UiCommandList>
                        <UiCommandEmpty>No results found.</UiCommandEmpty>
                        <UiCommandGroup heading="Components">
                            <UiCommandItem value="button" onUiCommandItemSelect={() => setCmdOpen(false)}>Button</UiCommandItem>
                            <UiCommandItem value="carousel" onUiCommandItemSelect={() => setCmdOpen(false)}>Carousel</UiCommandItem>
                            <UiCommandItem value="datepicker" onUiCommandItemSelect={() => setCmdOpen(false)}>DatePicker</UiCommandItem>
                            <UiCommandItem value="richtreeview" onUiCommandItemSelect={() => setCmdOpen(false)}>RichTreeView</UiCommandItem>
                        </UiCommandGroup>
                        <UiCommandSeparator />
                        <UiCommandGroup heading="Navigation">
                            <UiCommandItem value="storybook" onUiCommandItemSelect={() => setCmdOpen(false)}>Open Storybook ↗</UiCommandItem>
                            <UiCommandItem value="github" onUiCommandItemSelect={() => setCmdOpen(false)}>View on GitHub ↗</UiCommandItem>
                        </UiCommandGroup>
                    </UiCommandList>
                </UiCommand>
            </UiCommandDialog>
        </section>
    );
}
