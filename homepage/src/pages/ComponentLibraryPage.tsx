import React, { useState } from 'react';
import { ThemeProvider } from '../ThemeContext';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import { ComponentPreview } from '../components/ComponentPreview';
import { ComponentCatalog } from '../components/ComponentCatalog';
import { AnimatedSection } from '../components/AnimatedSection';
import { UiButton } from '../../../react/src/components/UiButton';
import { UiSwitch } from '../../../react/src/components/UiSwitch';
import { UiAlert } from '../../../react/src/components/UiAlert';
import { UiBadge } from '../../../react/src/components/UiBadge';
import { UiAvatar } from '../../../react/src/components/UiAvatar';
import { UiChip } from '../../../react/src/components/UiChip';
import { UiCard } from '../../../react/src/components/UiCard';
import { UiCardContent } from '../../../react/src/components/UiCardContent';
import { UiCardHeader } from '../../../react/src/components/UiCardHeader';
import { UiCardActions } from '../../../react/src/components/UiCardActions';
import { UiAccordion } from '../../../react/src/components/UiAccordion';
import { UiAccordionSummary } from '../../../react/src/components/UiAccordionSummary';
import { UiAccordionDetails } from '../../../react/src/components/UiAccordionDetails';
import { UiBreadcrumbs } from '../../../react/src/components/UiBreadcrumbs';
import { UiLink } from '../../../react/src/components/UiLink';
import { UiLinearProgress } from '../../../react/src/components/UiLinearProgress';
import { UiCheckbox } from '../../../react/src/components/UiCheckbox';
import { row, col } from '../tokens';

const componentCatalog = [
    { id: 'button', name: 'Button', description: 'Clickable element with multiple variants', category: 'Forms', tags: ['input', 'action'], icon: '🔘' },
    { id: 'switch', name: 'Switch', description: 'Toggle control for boolean values', category: 'Forms', tags: ['input', 'toggle'], icon: '🔀' },
    { id: 'checkbox', name: 'Checkbox', description: 'Input control for selections', category: 'Forms', tags: ['input', 'selection'], icon: '☑️' },
    { id: 'input', name: 'Input', description: 'Text input field', category: 'Forms', tags: ['text', 'input'], icon: '📝' },
    { id: 'card', name: 'Card', description: 'Content container with structure', category: 'Data Display', tags: ['container', 'layout'], icon: '📇' },
    { id: 'alert', name: 'Alert', description: 'Message display component', category: 'Feedback', tags: ['notification', 'message'], icon: '⚠️' },
    { id: 'badge', name: 'Badge', description: 'Small notification indicator', category: 'Data Display', tags: ['indicator', 'label'], icon: '🏷️' },
    { id: 'chip', name: 'Chip', description: 'Compact element for tags', category: 'Data Display', tags: ['tag', 'label'], icon: '💾' },
    { id: 'accordion', name: 'Accordion', description: 'Expandable content panels', category: 'Navigation', tags: ['collapse', 'expand'], icon: '📂' },
    { id: 'breadcrumbs', name: 'Breadcrumbs', description: 'Navigation path display', category: 'Navigation', tags: ['navigation', 'path'], icon: '🗺️' },
    { id: 'tabs', name: 'Tabs', description: 'Tabbed content interface', category: 'Navigation', tags: ['navigation', 'tabs'], icon: '📑' },
    { id: 'progress', name: 'Progress', description: 'Progress indicator', category: 'Feedback', tags: ['loading', 'progress'], icon: '⏳' },
    { id: 'avatar', name: 'Avatar', description: 'User image display', category: 'Data Display', tags: ['image', 'user'], icon: '👤' },
    { id: 'divider', name: 'Divider', description: 'Visual separator', category: 'Layout', tags: ['separator', 'line'], icon: '➖' },
];

function ComponentLibraryPageInner() {
    const [switchOn, setSwitchOn] = useState(false);

    return (
        <div style={{ fontFamily: 'system-ui,-apple-system,sans-serif' }}>
            <Header />

            {/* Hero Section */}
            <section style={{
                padding: '80px 24px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <h1 style={{
                        fontSize: 'clamp(2rem,6vw,3.5rem)',
                        fontWeight: 900,
                        margin: '0 0 16px 0',
                        letterSpacing: '-1px'
                    }}>
                        Ready to use components
                    </h1>
                    <p style={{
                        fontSize: 18,
                        color: '#64748b',
                        margin: '0 0 32px 0',
                        maxWidth: 600,
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        100+ fully-typed React components and Lit web components.
                        Production-ready with Material Design principles.
                    </p>
                    <code style={{
                        background: '#1e293b',
                        color: '#e2e8f0',
                        padding: '12px 16px',
                        borderRadius: 8,
                        display: 'inline-block',
                        fontFamily: 'monospace',
                        fontSize: 14
                    }}>
                        $ npm install lite
                    </code>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 32,
                        fontWeight: 800,
                        textAlign: 'center',
                        marginBottom: 60
                    }}>
                        Why choose lite?
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 40
                    }}>
                        {[
                            {
                                title: '100+ Components',
                                desc: 'A comprehensive collection of UI components covering all common use cases from forms to navigation.',
                                icon: '📦'
                            },
                            {
                                title: 'Framework Agnostic',
                                desc: 'Built with Web Components and Lit. Works natively in any framework or vanilla JavaScript.',
                                icon: '🌐'
                            },
                            {
                                title: 'Fully Typed',
                                desc: 'Complete TypeScript support with strict typing. Includes React wrappers for seamless integration.',
                                icon: '✨'
                            },
                            {
                                title: 'Accessible',
                                desc: 'WCAG compliant with full keyboard navigation, ARIA labels, and semantic HTML.',
                                icon: '♿'
                            },
                            {
                                title: 'Themeable',
                                desc: 'Customize every aspect using CSS custom properties. Build your design system effortlessly.',
                                icon: '🎨'
                            },
                            {
                                title: 'Production Ready',
                                desc: 'Battle-tested components with comprehensive test coverage and real-world usage.',
                                icon: '🚀'
                            }
                        ].map((feature, idx) => (
                            <AnimatedSection key={idx} animation="slideUp" delay={idx * 0.1}>
                                <div style={{
                                    padding: 24,
                                    border: '1px solid #e2e8f0',
                                    borderRadius: 12,
                                    background: '#ffffff',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                                    el.style.transform = 'translateY(-4px)';
                                }}
                                onMouseLeave={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.boxShadow = 'none';
                                    el.style.transform = 'translateY(0)';
                                }}>
                                    <div style={{ fontSize: 32, marginBottom: 12 }}>{feature.icon}</div>
                                    <h3 style={{
                                        fontSize: 18,
                                        fontWeight: 700,
                                        margin: '0 0 12px 0'
                                    }}>
                                        {feature.title}
                                    </h3>
                                    <p style={{
                                        fontSize: 14,
                                        color: '#64748b',
                                        lineHeight: 1.6,
                                        margin: 0
                                    }}>
                                        {feature.desc}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Component Categories */}
            <section style={{
                padding: '80px 24px',
                background: '#f8fafc'
            }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 32,
                        fontWeight: 800,
                        textAlign: 'center',
                        marginBottom: 60
                    }}>
                        Component Categories
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 32
                    }}>
                        {[
                            { name: 'Forms', count: '15+', icon: '📝' },
                            { name: 'Navigation', count: '12+', icon: '🧭' },
                            { name: 'Data Display', count: '18+', icon: '📊' },
                            { name: 'Feedback', count: '10+', icon: '💬' },
                            { name: 'Overlays', count: '8+', icon: '🎭' },
                            { name: 'Utilities', count: '20+', icon: '⚙️' }
                        ].map((cat, idx) => (
                            <div key={idx} style={{
                                padding: 32,
                                background: '#ffffff',
                                borderRadius: 12,
                                border: '1px solid #e2e8f0',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                            }}>
                                <div style={{ fontSize: 40, marginBottom: 12 }}>{cat.icon}</div>
                                <h3 style={{
                                    fontSize: 18,
                                    fontWeight: 700,
                                    margin: '0 0 8px 0'
                                }}>
                                    {cat.name}
                                </h3>
                                <p style={{
                                    fontSize: 14,
                                    color: '#64748b',
                                    margin: 0
                                }}>
                                    {cat.count} components
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Showcase with Code */}
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 32,
                        fontWeight: 800,
                        textAlign: 'center',
                        marginBottom: 60
                    }}>
                        Built with best practices
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 40,
                        alignItems: 'center',
                        marginBottom: 80
                    }}>
                        <div>
                            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                                TypeScript First
                            </h3>
                            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7 }}>
                                Every component is built with TypeScript from the ground up.
                                Full type safety and IntelliSense support in your IDE.
                            </p>
                        </div>
                        <div style={{
                            background: '#1e293b',
                            padding: 24,
                            borderRadius: 12,
                            fontFamily: 'monospace',
                            fontSize: 13,
                            color: '#e2e8f0',
                            overflow: 'auto'
                        }}>
{`import { UiButton } from 'lite';

export function App() {
  return (
    <UiButton
      variant="primary"
      size="large"
    >
      Click me
    </UiButton>
  );
}`}
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 40,
                        alignItems: 'center'
                    }}>
                        <div style={{
                            background: '#1e293b',
                            padding: 24,
                            borderRadius: 12,
                            fontFamily: 'monospace',
                            fontSize: 13,
                            color: '#e2e8f0',
                            overflow: 'auto',
                            order: -1
                        }}>
{`import { UiGrid, UiCard } from 'lite';

export function Layout() {
  return (
    <UiGrid container spacing={2}>
      <UiGrid xs={12} md={6}>
        <UiCard>
          Responsive grid
        </UiCard>
      </UiGrid>
    </UiGrid>
  );
}`}
                        </div>
                        <div>
                            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                                Responsive by default
                            </h3>
                            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7 }}>
                                Every component handles different screen sizes gracefully.
                                Built-in responsive utilities make layouts effortless.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Comparison */}
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 32,
                        fontWeight: 800,
                        textAlign: 'center',
                        marginBottom: 60
                    }}>
                        How lite compares
                    </h2>

                    <div style={{
                        overflowX: 'auto'
                    }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            minWidth: 600
                        }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Feature</th>
                                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600 }}>lite</th>
                                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Material UI</th>
                                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Chakra</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'Framework Agnostic', lite: true, mui: false, chakra: false },
                                    { feature: '100+ Components', lite: true, mui: true, chakra: false },
                                    { feature: 'Full TypeScript', lite: true, mui: true, chakra: true },
                                    { feature: 'Web Components', lite: true, mui: false, chakra: false },
                                    { feature: 'React Wrappers', lite: true, mui: false, chakra: true },
                                    { feature: 'Zero Runtime CSS', lite: false, mui: false, chakra: false },
                                    { feature: 'Tree-Shakeable', lite: true, mui: true, chakra: true },
                                    { feature: 'Headless Option', lite: false, mui: false, chakra: true }
                                ].map((row, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '16px', fontWeight: 500 }}>{row.feature}</td>
                                        <td style={{ padding: '16px', textAlign: 'center' }}>{row.lite ? '✅' : '❌'}</td>
                                        <td style={{ padding: '16px', textAlign: 'center', color: '#64748b' }}>{row.mui ? '✅' : '❌'}</td>
                                        <td style={{ padding: '16px', textAlign: 'center', color: '#64748b' }}>{row.chakra ? '✅' : '❌'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section style={{
                padding: '80px 24px',
                background: '#f8fafc',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 32,
                        fontWeight: 800,
                        marginBottom: 48
                    }}>
                        Trusted by developers worldwide
                    </h2>
                    <p style={{
                        fontSize: 18,
                        color: '#64748b',
                        marginBottom: 48
                    }}>
                        Join thousands of developers building amazing UIs with lite
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                        gap: 32,
                        alignItems: 'center'
                    }}>
                        {['⚡ Startup', '💼 Enterprise', '🎓 Education', '🏢 Agency', '🔬 Research', '🎮 Gaming'].map((org, idx) => (
                            <div key={idx} style={{
                                padding: 16,
                                background: '#ffffff',
                                borderRadius: 12,
                                border: '1px solid #e2e8f0',
                                fontSize: 13,
                                fontWeight: 600,
                                color: '#64748b'
                            }}>
                                {org}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Component Examples */}
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 32,
                        fontWeight: 800,
                        textAlign: 'center',
                        marginBottom: 60
                    }}>
                        Component Showcase
                    </h2>

                    <ComponentPreview
                        title="Button"
                        description="Clickable button component with multiple variants and sizes"
                        examples={[
                            {
                                label: 'Primary',
                                code: `<UiButton variant="primary">
  Click me
</UiButton>`
                            },
                            {
                                label: 'Variants',
                                code: `<>
  <UiButton variant="primary">Primary</UiButton>
  <UiButton variant="secondary">Secondary</UiButton>
  <UiButton variant="destructive">Delete</UiButton>
</>`
                            },
                            {
                                label: 'Sizes',
                                code: `<>
  <UiButton size="small">Small</UiButton>
  <UiButton size="medium">Medium</UiButton>
  <UiButton size="large">Large</UiButton>
</>`
                            }
                        ]}
                    >
                        <div style={row(12)}>
                            <UiButton variant="primary">Primary</UiButton>
                            <UiButton variant="secondary">Secondary</UiButton>
                            <UiButton variant="destructive">Delete</UiButton>
                        </div>
                    </ComponentPreview>

                    <ComponentPreview
                        title="Switch"
                        description="Toggle control for boolean values"
                        examples={[
                            {
                                label: 'Basic',
                                code: `const [checked, setChecked] = useState(false);

<UiSwitch
  checked={checked}
  onUiSwitchChange={(e) => setChecked(e.detail.checked)}
  label="Enable notifications"
/>`
                            },
                            {
                                label: 'Sizes',
                                code: `<>
  <UiSwitch size="sm" label="Small" />
  <UiSwitch size="md" label="Medium" />
  <UiSwitch size="lg" label="Large" />
</>`
                            }
                        ]}
                    >
                        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                            <UiSwitch
                                checked={switchOn}
                                onUiSwitchChange={(e: CustomEvent<{ checked: boolean }>) => setSwitchOn(e.detail.checked)}
                                label={switchOn ? 'Enabled' : 'Disabled'}
                            />
                        </div>
                    </ComponentPreview>

                    <ComponentPreview
                        title="Alert"
                        description="Display important messages with different severity levels"
                        examples={[
                            {
                                label: 'Variants',
                                code: `<>
  <UiAlert severity="info" title="Info">
    New version available.
  </UiAlert>
  <UiAlert severity="success" title="Success">
    Changes saved successfully.
  </UiAlert>
  <UiAlert severity="warning" title="Warning">
    Review before publishing.
  </UiAlert>
  <UiAlert severity="error" title="Error">
    Authentication failed.
  </UiAlert>
</>`
                            }
                        ]}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 400 }}>
                            <UiAlert severity="success" title="All systems go">
                                100+ components production-ready.
                            </UiAlert>
                        </div>
                    </ComponentPreview>

                    <ComponentPreview
                        title="Badge & Avatar"
                        description="Avatar with initials and badge overlays"
                        examples={[
                            {
                                label: 'Basic',
                                code: `<>
  <UiAvatar initials="JD" size="medium" />
  <UiBadge dot variant="success">
    <UiAvatar initials="AL" size="medium" />
  </UiBadge>
  <UiBadge content="9+" variant="error">
    <UiAvatar initials="MK" size="medium" />
  </UiBadge>
</>`
                            }
                        ]}
                    >
                        <div style={row(24)}>
                            <UiAvatar initials="JD" size="medium" />
                            <UiBadge dot variant="success">
                                <UiAvatar initials="AL" size="medium" />
                            </UiBadge>
                            <UiBadge content="9+" variant="error">
                                <UiAvatar initials="MK" size="medium" />
                            </UiBadge>
                        </div>
                    </ComponentPreview>

                    <ComponentPreview
                        title="Chip"
                        description="Small, interactive elements for filtering or tags"
                        examples={[
                            {
                                label: 'Variants',
                                code: `<>
  <UiChip label="React" color="primary" clickable />
  <UiChip label="TypeScript" color="secondary" clickable />
  <UiChip label="Lit" clickable />
  <UiChip label="Outlined" variant="outlined" color="primary" clickable />
</>`
                            }
                        ]}
                    >
                        <div style={row(8)}>
                            <UiChip label="React" color="primary" clickable />
                            <UiChip label="TypeScript" color="secondary" clickable />
                            <UiChip label="Lit" clickable />
                        </div>
                    </ComponentPreview>

                    <ComponentPreview
                        title="Card"
                        description="Container for grouped content with header, content, and actions"
                        examples={[
                            {
                                label: 'Basic',
                                code: `<UiCard style={{ width: '100%', maxWidth: 300 }}>
  <UiCardHeader>
    <h3>Card Title</h3>
  </UiCardHeader>
  <UiCardContent>
    <p>Card content goes here</p>
  </UiCardContent>
  <UiCardActions>
    <UiButton variant="primary">Action</UiButton>
  </UiCardActions>
</UiCard>`
                            }
                        ]}
                    >
                        <UiCard style={{ width: '100%', maxWidth: 300 }}>
                            <UiCardHeader>
                                <h3 style={{ margin: 0, fontSize: 16 }}>Component Card</h3>
                            </UiCardHeader>
                            <UiCardContent>
                                <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>Cards are perfect for displaying grouped content</p>
                            </UiCardContent>
                            <UiCardActions>
                                <UiButton size="small" variant="primary">Learn More</UiButton>
                            </UiCardActions>
                        </UiCard>
                    </ComponentPreview>

                    <ComponentPreview
                        title="Accordion"
                        description="Collapsible panels for organizing content"
                        examples={[
                            {
                                label: 'Basic',
                                code: `<>
  <UiAccordion>
    <UiAccordionSummary>
      What is lite?
    </UiAccordionSummary>
    <UiAccordionDetails>
      Lite is a comprehensive UI component library...
    </UiAccordionDetails>
  </UiAccordion>
</>`
                            }
                        ]}
                    >
                        <div style={{ width: '100%', maxWidth: 400 }}>
                            <UiAccordion>
                                <UiAccordionSummary>What is lite?</UiAccordionSummary>
                                <UiAccordionDetails>
                                    <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>Lite is a comprehensive UI component library built with Lit and React wrappers.</p>
                                </UiAccordionDetails>
                            </UiAccordion>
                            <UiAccordion>
                                <UiAccordionSummary>Which frameworks does it support?</UiAccordionSummary>
                                <UiAccordionDetails>
                                    <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>It works natively in any framework with Web Components and includes React wrappers.</p>
                                </UiAccordionDetails>
                            </UiAccordion>
                        </div>
                    </ComponentPreview>

                    <ComponentPreview
                        title="Breadcrumbs & Links"
                        description="Navigation helpers for showing page hierarchy"
                        examples={[
                            {
                                label: 'Breadcrumbs',
                                code: `<UiBreadcrumbs>
  <UiLink href="#" color="primary">Home</UiLink>
  <UiLink href="#" color="primary">Components</UiLink>
  <span>Buttons</span>
</UiBreadcrumbs>`
                            }
                        ]}
                    >
                        <UiBreadcrumbs>
                            <UiLink href="#" color="primary">Home</UiLink>
                            <UiLink href="#" color="primary">Components</UiLink>
                            <span style={{ fontSize: 14 }}>Buttons</span>
                        </UiBreadcrumbs>
                    </ComponentPreview>

                    <ComponentPreview
                        title="Progress"
                        description="Visual indicators for loading and completion"
                        examples={[
                            {
                                label: 'Determinate',
                                code: `<UiLinearProgress
  variant="determinate"
  value={65}
  color="primary"
  label="65%"
/>`
                            },
                            {
                                label: 'Multiple',
                                code: `<>
  <UiLinearProgress variant="determinate" value={30} color="primary" />
  <UiLinearProgress variant="determinate" value={60} color="success" />
  <UiLinearProgress variant="determinate" value={90} color="warning" />
</>`
                            }
                        ]}
                    >
                        <div style={{ width: '100%', maxWidth: 400, ...col(16) }}>
                            <UiLinearProgress variant="determinate" value={45} color="primary" label="45%" />
                            <UiLinearProgress variant="determinate" value={75} color="success" label="75%" />
                        </div>
                    </ComponentPreview>

                    <ComponentPreview
                        title="Checkbox"
                        description="Input control for binary choices"
                        examples={[
                            {
                                label: 'Basic',
                                code: `const [checked, setChecked] = useState(false);

<UiCheckbox
  checked={checked}
  onChange={() => setChecked(!checked)}
  label="I agree to the terms"
/>`
                            }
                        ]}
                    >
                        <div style={col(12)}>
                            <UiCheckbox label="Feature enabled" defaultChecked />
                            <UiCheckbox label="Send notifications" />
                            <UiCheckbox label="Disabled option" disabled />
                        </div>
                    </ComponentPreview>
                </div>
            </section>

            {/* Component Catalog Section */}
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 32,
                        fontWeight: 800,
                        textAlign: 'center',
                        marginBottom: 60
                    }}>
                        Browse all components
                    </h2>
                    <ComponentCatalog items={componentCatalog} />
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '80px 24px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
            }}>
                <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: 32,
                        fontWeight: 800,
                        marginBottom: 24,
                        color: '#ffffff'
                    }}>
                        Ready to get started?
                    </h2>
                    <p style={{
                        fontSize: 18,
                        color: '#dbeafe',
                        marginBottom: 32
                    }}>
                        Explore our component library and start building beautiful interfaces today.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <button style={{
                                padding: '14px 36px',
                                fontSize: 16,
                                fontWeight: 600,
                                border: 'none',
                                borderRadius: 8,
                                background: '#ffffff',
                                color: '#1e40af',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.transform = 'translateY(-2px)';
                                el.style.boxShadow = '0 12px 20px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.transform = 'translateY(0)';
                                el.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                            }}>
                                Explore Components
                            </button>
                        </a>
                        <button style={{
                            padding: '14px 36px',
                            fontSize: 16,
                            fontWeight: 600,
                            border: '2px solid #ffffff',
                            borderRadius: 8,
                            background: 'transparent',
                            color: '#ffffff',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = '#ffffff';
                            el.style.color = '#1e40af';
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = 'transparent';
                            el.style.color = '#ffffff';
                        }}>
                            View Storybook
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export function ComponentLibraryPage() {
    return (
        <ThemeProvider>
            <ComponentLibraryPageInner />
        </ThemeProvider>
    );
}
