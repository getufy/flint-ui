import React, { useState } from 'react';
import { UiButton } from '../../../react/src/components/UiButton';
import { UiBadge } from '../../../react/src/components/UiBadge';
import { UiStepper } from '../../../react/src/components/UiStepper';
import { UiStep } from '../../../react/src/components/UiStep';
import { UiStepLabel } from '../../../react/src/components/UiStepLabel';
import { UiStepContent } from '../../../react/src/components/UiStepContent';
import { UiCollapsible } from '../../../react/src/components/UiCollapsible';
import { UiCollapsibleTrigger } from '../../../react/src/components/UiCollapsibleTrigger';
import { UiCollapsibleContent } from '../../../react/src/components/UiCollapsibleContent';
import { UiKbd } from '../../../react/src/components/UiKbd';
import { c, row, col, card, sect, maxW, grid2 } from '../tokens';
import { Heading } from '../components/shared';

export function Flow() {
    const [step, setStep] = useState(0);
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

    return (
        <section id="s-flow" style={sect(c.bg)}>
            <div style={maxW()}>
                <Heading title="Navigation & Flow" sub="Stepper, Collapsible, Keyboard shortcuts — tools for multi-step flows and progressive disclosure." />
                <div style={grid2()}>

                    <div style={card({ ...col(20) })}>
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
                        <div style={card({ ...col(12) })}>
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

                        <div style={card({ ...col(12) })}>
                            <p style={{ fontWeight: 700, fontSize: 15 }}>Keyboard Shortcuts</p>
                            <div style={col(8)}>
                                {[
                                    { keys: ['⌘', 'K'], label: 'Open command palette' },
                                    { keys: ['⌘', 'S'], label: 'Save changes' },
                                    { keys: ['⌘', 'Z'], label: 'Undo' },
                                    { keys: ['⌘', 'Shift', 'Z'], label: 'Redo' },
                                    { keys: ['Esc'], label: 'Dismiss dialog' },
                                ].map(({ keys, label }) => (
                                    <div key={label} style={{ ...row(8), justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: 13, color: c.muted }}>{label}</span>
                                        <div style={row(4)}>{keys.map(k => <UiKbd key={k}>{k}</UiKbd>)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
