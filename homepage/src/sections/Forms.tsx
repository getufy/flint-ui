import React, { useState } from 'react';
import { UiButton } from '../../../react/src/components/UiButton';
import { UiAlert } from '../../../react/src/components/UiAlert';
import { UiTextField } from '../../../react/src/components/UiTextField';
import { UiSelect } from '../../../react/src/components/UiSelect';
import { UiCheckbox } from '../../../react/src/components/UiCheckbox';
import { UiSlider } from '../../../react/src/components/UiSlider';
import { UiInputOtp } from '../../../react/src/components/UiInputOtp';
import { UiInputOtpGroup } from '../../../react/src/components/UiInputOtpGroup';
import { UiInputOtpSlot } from '../../../react/src/components/UiInputOtpSlot';
import { UiInputOtpSeparator } from '../../../react/src/components/UiInputOtpSeparator';
import { c, row, col, card, sect, maxW, grid2 } from '../tokens';
import { Heading } from '../components/shared';

export function Forms() {
    const [name, setName] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [budget, setBudget] = useState(50);
    const [submitted, setSubmitted] = useState(false);
    const [otpVal, setOtpVal] = useState('');
    const [otpComplete, setOtpComplete] = useState(false);

    const fwOptions = [
        { value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' }, { value: 'svelte', label: 'Svelte' },
    ];

    return (
        <section id="s-forms" style={sect(c.surface)}>
            <div style={maxW()}>
                <Heading title={<>Forms &amp; Inputs</>} sub="TextField, Select, Checkbox, Slider, OTP — all form-associated and fully accessible." />
                <div style={grid2()}>
                    {/* live form */}
                    <div style={card({ ...col(20) })}>
                        <div>
                            <p style={{ fontWeight: 700, fontSize: 16 }}>Create Account</p>
                            <p style={{ fontSize: 13, color: c.muted }}>A fully interactive form using Lit components in React.</p>
                        </div>
                        {submitted ? (
                            <div style={col(12)}>
                                <UiAlert severity="success" title="Account created!">Welcome, {name || 'friend'}! Check your email to confirm.</UiAlert>
                                <UiButton size="small" variant="secondary" onClick={() => { setSubmitted(false); setName(''); setAgreed(false); }}>Reset form</UiButton>
                            </div>
                        ) : (
                            <div style={col(16)}>
                                <UiTextField label="Full name" placeholder="Jane Doe" onInput={e => setName((e.target as HTMLInputElement).value)} />
                                <UiTextField label="Email" type="email" placeholder="jane@example.com" />
                                <UiTextField label="Password" type="password" placeholder="••••••••" helperText="At least 8 characters." />
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <UiSelect label="Primary framework" placeholder="Choose one" {...{ options: fwOptions } as any} />
                                <div style={col(6)}>
                                    <p style={{ fontSize: 13, fontWeight: 500 }}>Monthly budget: ${budget}</p>
                                    <UiSlider value={budget} min={10} max={200} step={10} showValue
                                        onUiSliderChange={e => setBudget((e as CustomEvent<{ value: number }>).detail.value)} />
                                </div>
                                <UiCheckbox label="I agree to the Terms of Service and Privacy Policy" checked={agreed} onChange={() => setAgreed(a => !a)} />
                                <UiButton variant="primary" disabled={!agreed} onClick={() => setSubmitted(true)}>Create Account</UiButton>
                            </div>
                        )}
                    </div>

                    {/* right column */}
                    <div style={col(20)}>
                        <div style={card({ ...col(16) })}>
                            <p style={{ fontWeight: 700, fontSize: 15 }}>Input States</p>
                            <UiTextField label="Default" placeholder="Normal state" />
                            <UiTextField label="With helper" placeholder="Start typing…" helperText="Provides additional context." />
                            <UiTextField label="Error state" value="bad@email" error errorMessage="Enter a valid email address." />
                            <UiTextField label="Disabled" value="Cannot be edited" disabled />
                            <UiTextField label="Filled variant" placeholder="Filled style" variant="filled" />
                        </div>

                        <div style={card({ ...col(16) })}>
                            <p style={{ fontWeight: 700, fontSize: 15 }}>OTP Input</p>
                            <p style={{ fontSize: 13, color: c.muted }}>Click the slots and type — paste works too.</p>
                            <div style={col(12)}>
                                <UiInputOtp
                                    maxLength={6}
                                    onUiOtpChange={e => setOtpVal((e as CustomEvent<{ value: string }>).detail.value)}
                                    onUiOtpComplete={e => setOtpComplete(!!(e as CustomEvent<{ value: string }>).detail.value)}
                                >
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
                                {otpVal && (
                                    <div style={row(8)}>
                                        <span style={{ fontSize: 12, color: c.muted }}>Value: <b style={{ fontFamily: 'monospace' }}>{otpVal}</b></span>
                                        {otpComplete && <span style={{ fontSize: 12, color: c.success, fontWeight: 600 }}>Complete ✓</span>}
                                    </div>
                                )}
                            </div>

                            <div style={{ ...row(24), marginTop: 4 }}>
                                <div style={col(10)}>
                                    <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Checkboxes</p>
                                    <UiCheckbox label="Unchecked" />
                                    <UiCheckbox label="Checked" checked />
                                    <UiCheckbox label="Indeterminate" indeterminate />
                                </div>
                                <div style={col(10)}>
                                    <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Disabled</p>
                                    <UiCheckbox label="Disabled" disabled />
                                    <UiCheckbox label="Disabled ✓" checked disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
