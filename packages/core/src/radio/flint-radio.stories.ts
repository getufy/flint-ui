import type { Meta, StoryObj } from '@storybook/web-components';
import '../button/flint-button';
import { html } from 'lit';
import '../button/flint-button';
import './flint-radio';
import '../button/flint-button';

const meta: Meta = {
    title: 'Inputs/Radio Group',
    component: 'flint-radio-group',
    parameters: {
        docs: {
            description: {
                component: `
#### \`<flint-radio-group>\`

- **Tag**: \`<flint-radio-group>\`
- **Class**: \`FlintRadioGroup\`
- **Form Associated**: Yes

#### Properties

| Property | Attribute | Type | Default |
|---|---|---|---|
| \`label\` | \`label\` | \`string\` | \`''\` |
| \`name\` | \`name\` | \`string\` | \`''\` |
| \`value\` | \`value\` | \`string\` | \`''\` |
| \`defaultValue\` | \`default-value\` | \`string\` | \`''\` |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` |
| \`required\` | \`required\` | \`boolean\` | \`false\` |
| \`orientation\` | \`orientation\` | \`RadioOrientation\` | \`'vertical'\` |
| \`size\` | \`size\` | \`RadioSize\` | \`'md'\` |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-radio-group-change\` | \`{ value }\` |  |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-radio-group-gap\` | \`8px\` |
| \`--flint-font-family\` | — |
| \`--flint-text-color\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-primary-focus-ring\` | — |

---

#### \`<flint-radio>\`

- **Tag**: \`<flint-radio>\`
- **Class**: \`FlintRadio\`

#### Properties

| Property | Attribute | Type | Default |
|---|---|---|---|
| \`checked\` | \`checked\` | \`boolean\` | \`false\` |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` |
| \`required\` | \`required\` | \`boolean\` | \`false\` |
| \`name\` | \`name\` | \`string\` | \`''\` |
| \`value\` | \`value\` | \`string\` | \`''\` |
| \`label\` | \`label\` | \`string\` | \`''\` |
| \`size\` | \`size\` | \`RadioSize\` | \`'md'\` |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-radio-select\` | \`{ value: this.value }\` |  |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-radio-disabled-opacity\` | \`0.5\` |
| \`--flint-radio-group-gap\` | \`8px\` |
| \`--flint-radio-size\` | \`18px\` |
| \`--flint-radio-gap\` | \`8px\` |
| \`--flint-radio-size-sm\` | \`14px\` |
| \`--flint-radio-size-lg\` | \`22px\` |
| \`--flint-radio-dot-size\` | \`8px\` |
| \`--flint-radio-dot-size-sm\` | \`6px\` |
| \`--flint-radio-dot-size-lg\` | \`10px\` |
| \`--flint-radio-label-font-size\` | \`14px\` |
| \`--flint-radio-label-font-size-sm\` | \`12px\` |
| \`--flint-radio-label-font-size-lg\` | \`16px\` |

#### Methods

| Method | Description |
|---|---|
| \`focus(options?: FocusOptions)\` |  |
                `,
            },
        },
    },
    argTypes: {
        name: { control: 'text' },
        value: { control: 'text' },
        label: { control: 'text' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        orientation: { control: 'select', options: ['vertical', 'horizontal'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
    },
    args: {
        name: 'playground',
        value: 'b',
        label: 'Choose an option',
        disabled: false,
        required: false,
        orientation: 'vertical',
        size: 'md',
    },
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
    render: (args) => html`
        <flint-radio-group
            .name=${args['name']}
            .value=${args['value']}
            .label=${args['label']}
            ?disabled=${args['disabled']}
            ?required=${args['required']}
            .orientation=${args['orientation']}
            .size=${args['size']}
            @flint-radio-group-change=${(e: CustomEvent) => console.log('Changed:', e.detail.value)}
        >
            <flint-radio value="a" label="Option A"></flint-radio>
            <flint-radio value="b" label="Option B"></flint-radio>
            <flint-radio value="c" label="Option C"></flint-radio>
        </flint-radio-group>
    `,
};

export const Default: Story = {
    render: () => html`
        <flint-radio-group name="gender" value="female" @flint-radio-group-change=${(e: CustomEvent) => console.log('Selection changed:', e.detail.value)}>
            <flint-radio value="female" label="Female"></flint-radio>
            <flint-radio value="male" label="Male"></flint-radio>
            <flint-radio value="other" label="Other"></flint-radio>
        </flint-radio-group>
    `,
};

export const Orientation: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 24px;">
            <div>
                <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280;">Vertical (default)</p>
                <flint-radio-group name="vert" value="1">
                    <flint-radio value="1" label="Option 1"></flint-radio>
                    <flint-radio value="2" label="Option 2"></flint-radio>
                    <flint-radio value="3" label="Option 3"></flint-radio>
                </flint-radio-group>
            </div>
            <div>
                <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280;">Horizontal</p>
                <flint-radio-group name="horiz" value="1" orientation="horizontal">
                    <flint-radio value="1" label="Option 1"></flint-radio>
                    <flint-radio value="2" label="Option 2"></flint-radio>
                    <flint-radio value="3" label="Option 3"></flint-radio>
                </flint-radio-group>
            </div>
        </div>
    `,
};

export const Sizes: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 24px;">
            <div>
                <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280;">Small</p>
                <flint-radio-group name="sm" value="1" size="sm">
                    <flint-radio value="1" label="Option 1"></flint-radio>
                    <flint-radio value="2" label="Option 2"></flint-radio>
                </flint-radio-group>
            </div>
            <div>
                <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280;">Medium (default)</p>
                <flint-radio-group name="md" value="1" size="md">
                    <flint-radio value="1" label="Option 1"></flint-radio>
                    <flint-radio value="2" label="Option 2"></flint-radio>
                </flint-radio-group>
            </div>
            <div>
                <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280;">Large</p>
                <flint-radio-group name="lg" value="1" size="lg">
                    <flint-radio value="1" label="Option 1"></flint-radio>
                    <flint-radio value="2" label="Option 2"></flint-radio>
                </flint-radio-group>
            </div>
        </div>
    `,
};

export const DisabledOption: Story = {
    render: () => html`
        <flint-radio-group name="disabled-option" value="active">
            <flint-radio value="active" label="Active Option"></flint-radio>
            <flint-radio value="disabled" label="Disabled Option" disabled></flint-radio>
            <flint-radio value="other" label="Another Option"></flint-radio>
        </flint-radio-group>
    `,
};

export const GroupDisabled: Story = {
    render: () => html`
        <flint-radio-group name="group-disabled" value="b" disabled>
            <flint-radio value="a" label="Option A"></flint-radio>
            <flint-radio value="b" label="Option B"></flint-radio>
            <flint-radio value="c" label="Option C"></flint-radio>
        </flint-radio-group>
    `,
};

export const Required: Story = {
    render: () => html`
        <form @submit=${(e: Event) => { e.preventDefault(); alert('Submitted!'); }}>
            <flint-radio-group name="plan" required label="Choose a plan">
                <flint-radio value="free" label="Free"></flint-radio>
                <flint-radio value="pro" label="Pro"></flint-radio>
                <flint-radio value="enterprise" label="Enterprise"></flint-radio>
            </flint-radio-group>
            <flint-button type="submit" style="margin-top: 12px;">Submit</flint-button>
        </form>
    `,
};

export const Uncontrolled: Story = {
    render: () => html`
        <flint-radio-group name="uncontrolled" default-value="b" @flint-radio-group-change=${(e: CustomEvent) => console.log('Changed:', e.detail.value)}>
            <flint-radio value="a" label="Option A"></flint-radio>
            <flint-radio value="b" label="Option B (default)"></flint-radio>
            <flint-radio value="c" label="Option C"></flint-radio>
        </flint-radio-group>
    `,
};

export const Controlled: Story = {
    render: () => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `<p style="margin: 0 0 8px; font-size: 14px;">Selected: <strong id="display">b</strong></p>`;
        const group = document.createElement('flint-radio-group') as HTMLElement & { value: string };
        group.setAttribute('name', 'controlled');
        group.setAttribute('value', 'b');
        group.innerHTML = `
            <flint-radio value="a" label="Option A"></flint-radio>
            <flint-radio value="b" label="Option B"></flint-radio>
            <flint-radio value="c" label="Option C"></flint-radio>
        `;
        group.addEventListener('flint-radio-group-change', (e: Event) => {
            const ce = e as CustomEvent;
            group.value = ce.detail.value;
            wrapper.querySelector('#display')!.textContent = ce.detail.value;
        });
        wrapper.appendChild(group);
        return wrapper;
    },
};

export const CustomLabel: Story = {
    render: () => html`
        <flint-radio-group name="plan" value="pro">
            <flint-radio value="basic">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600;">Basic Plan</span>
                    <span style="font-size: 12px; color: var(--flint-text-color-muted, #6b7280);">Free for individuals</span>
                </div>
            </flint-radio>
            <flint-radio value="pro">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600;">Pro Plan</span>
                    <span style="font-size: 12px; color: var(--flint-text-color-muted, #6b7280);">$19/month for teams</span>
                </div>
            </flint-radio>
        </flint-radio-group>
    `,
};
