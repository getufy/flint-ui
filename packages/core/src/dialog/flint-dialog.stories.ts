import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-dialog.js';
import { FlintDialog } from './flint-dialog.js';
import '../button/flint-button.js';
import '../box/flint-box.js';
import '../stack/flint-stack.js';

const meta: Meta = {
  title: 'Feedback/Dialog',
  component: 'flint-dialog',
  parameters: {
      docs: {
            description: {
                component: `
#### \`<flint-dialog>\`

flint-dialog: a modal dialog component.

- **Tag**: \`<flint-dialog>\`
- **Class**: \`FlintDialog\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`open\` | \`open\` | \`boolean\` | \`false\` | Controls the open / closed state of the dialog. |
| \`defaultOpen\` | \`default-open\` | \`boolean\` | \`false\` | Initial open state for uncontrolled usage. |
| \`transition\` | \`transition\` | \`'scale' \\| 'slide-up' \\| 'slide-down'\` | \`'scale'\` | Animation style: 'scale' (default), 'slide-up', or 'slide-down'. |
| \`disableBackdropClose\` | \`disable-backdrop-close\` | \`boolean\` | \`false\` | When true, clicking the backdrop will NOT close the dialog. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-dialog-close\` | \`{ open: false }\` | Dispatched when the dialog requests to be closed (backdrop click or an explicit call to \`requestClose()\`). The host is responsible for setting \`open = false\` in response. detail: \`{ open: false }\` |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for dialog content (title, content, actions sub-components). |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-dialog-max-height\` | \`90vh\` |
| \`--flint-dialog-width\` | \`444px\` |
| \`--flint-border-color\` | — |
| \`--flint-font-family\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-text-color\` | — |
| \`--flint-surface-background\` | \`white\` |
| \`--flint-border-radius-xl\` | \`12px\` |
| \`--flint-shadow-xl\` | \`0 20px 25px -5px rgba(0, 0, 0, 0.1\` |

#### Methods

| Method | Description |
|---|---|
| \`requestClose(): void\` | Programmatically request the dialog to close (fires the 'flint-dialog-close' event). |

---

#### \`<flint-dialog-title>\`

flint-dialog-title: heading area of a dialog.
Automatically assigned id="dialog-title" for aria-labelledby.

- **Tag**: \`<flint-dialog-title>\`
- **Class**: \`FlintDialogTitle\`

---

#### \`<flint-dialog-content>\`

flint-dialog-content: scrollable content area of a dialog.

- **Tag**: \`<flint-dialog-content>\`
- **Class**: \`FlintDialogContent\`

---

#### \`<flint-dialog-content-text>\`

flint-dialog-content-text: body text inside a dialog content area.

- **Tag**: \`<flint-dialog-content-text>\`
- **Class**: \`FlintDialogContentText\`

---

#### \`<flint-dialog-actions>\`

flint-dialog-actions: footer button row for a dialog.
Use the \`align\` prop to control button alignment.

- **Tag**: \`<flint-dialog-actions>\`
- **Class**: \`FlintDialogActions\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`align\` | \`align\` | \`'start' \\| 'center' \\| 'end' \\| 'space-between'\` | \`'end'\` | Alignment of action buttons: 'end' (default), 'start', 'center', 'space-between'. |
                `,
            },
        },
  },
  argTypes: {
    open: { control: 'boolean' },
    transition: {
      control: 'select',
      options: ['scale', 'slide-up', 'slide-down'],
    },
    disableBackdropClose: { control: 'boolean' },
  },
  args: {
    open: false,
    transition: 'scale',
    disableBackdropClose: false,
  },
};

export default meta;
type Story = StoryObj;

// ── Helpers ─────────────────────────────────────────────────────────────────
function openDialog(id: string) {
  (document.getElementById(id) as FlintDialog | null)!.open = true;
}
function closeDialog(e: Event) {
  (e.target as FlintDialog).open = false;
}

// ── Basic ────────────────────────────────────────────────────────────────────
export const Basic: Story = {
  render: (args) => html`
    <flint-box display="flex" alignItems="center" justifyContent="center" height="300px">
      <flint-button @click=${() => openDialog('basic-dialog')}>Open Dialog</flint-button>

      <flint-dialog
        id="basic-dialog"
        .open=${args.open}
        .transition=${args.transition}
        @flint-dialog-close=${closeDialog}
      >
        <flint-dialog-title>Discard draft?</flint-dialog-title>
        <flint-dialog-content>
          <flint-dialog-content-text>
            If you discard this draft, your changes will be permanently lost and cannot be recovered.
          </flint-dialog-content-text>
        </flint-dialog-content>
        <flint-dialog-actions>
          <flint-button variant="secondary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      if (d) d.open = false;
    }}>Cancel</flint-button>
          <flint-button variant="primary" color="error" @click=${(e: Event) => {
      alert('Draft discarded!');
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      if (d) d.open = false;
    }}>Discard</flint-button>
        </flint-dialog-actions>
      </flint-dialog>
    </flint-box>
  `,
};

// ── Confirmation Dialog ──────────────────────────────────────────────────────
/**
 * A confirmation dialog forces the user to make a deliberate choice.
 * The backdrop is disabled so they cannot dismiss by clicking outside.
 * It fires 'confirm' or 'cancel' custom events so parent components can react.
 */
export const Confirmation: Story = {
  render: () => html`
    <flint-stack direction="row" gap="16px" alignItems="center" justifyContent="center" style="height:300px;flex-wrap:wrap;">

      <!-- Trigger buttons for different confirmation types -->
      <flint-button color="error" variant="primary" @click=${() => openDialog('delete-confirm-dialog')}>
        Delete Item
      </flint-button>
      <flint-button variant="secondary" @click=${() => openDialog('publish-confirm-dialog')}>
        Publish Changes
      </flint-button>
      <flint-button variant="secondary" @click=${() => openDialog('logout-confirm-dialog')}>
        Log Out
      </flint-button>

      <!-- ── Delete Confirmation ──────────────────────────────────────────── -->
      <flint-dialog
        id="delete-confirm-dialog"
        disable-backdrop-close
        @confirm=${(e: Event) => {
      alert('Item permanently deleted.');
      (e.target as FlintDialog).open = false;
    }}
        @cancel=${(e: Event) => {
      (e.target as FlintDialog).open = false;
    }}
      >
        <flint-dialog-title>Delete this item?</flint-dialog-title>
        <flint-dialog-content>
          <flint-dialog-content-text>
            This action is <strong>permanent</strong> and cannot be undone. The item will be removed immediately.
          </flint-dialog-content-text>
        </flint-dialog-content>
        <flint-dialog-actions>
          <flint-button variant="secondary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      d?.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
    }}>Keep Item</flint-button>
          <flint-button variant="primary" color="error" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      d?.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true }));
    }}>Yes, Delete</flint-button>
        </flint-dialog-actions>
      </flint-dialog>

      <!-- ── Publish Confirmation ─────────────────────────────────────────── -->
      <flint-dialog
        id="publish-confirm-dialog"
        disable-backdrop-close
        @confirm=${(e: Event) => {
      alert('Changes published successfully!');
      (e.target as FlintDialog).open = false;
    }}
        @cancel=${(e: Event) => {
      (e.target as FlintDialog).open = false;
    }}
      >
        <flint-dialog-title>Publish changes?</flint-dialog-title>
        <flint-dialog-content>
          <flint-dialog-content-text>
            Your changes will go live immediately and be visible to all users. Make sure everything looks right before continuing.
          </flint-dialog-content-text>
        </flint-dialog-content>
        <flint-dialog-actions>
          <flint-button variant="secondary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      d?.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
    }}>Review Again</flint-button>
          <flint-button variant="primary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      d?.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true }));
    }}>Publish Now</flint-button>
        </flint-dialog-actions>
      </flint-dialog>

      <!-- ── Logout Confirmation ──────────────────────────────────────────── -->
      <flint-dialog
        id="logout-confirm-dialog"
        disable-backdrop-close
        transition="slide-up"
        @confirm=${(e: Event) => {
      alert('Logged out!');
      (e.target as FlintDialog).open = false;
    }}
        @cancel=${(e: Event) => {
      (e.target as FlintDialog).open = false;
    }}
      >
        <flint-dialog-title>Log out of your account?</flint-dialog-title>
        <flint-dialog-content>
          <flint-dialog-content-text>
            You will be signed out of all active sessions on this device.
          </flint-dialog-content-text>
        </flint-dialog-content>
        <flint-dialog-actions align="space-between">
          <flint-button variant="secondary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      d?.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
    }}>Stay Signed In</flint-button>
          <flint-button variant="primary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      d?.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true }));
    }}>Log Out</flint-button>
        </flint-dialog-actions>
      </flint-dialog>
    </flint-stack>
  `,
};

// ── Transitions ──────────────────────────────────────────────────────────────
export const Transitions: Story = {
  args: { transition: 'slide-up' },
  render: (args) => html`
    <flint-stack direction="row" gap="16px" alignItems="center" justifyContent="center" style="height:300px;">
      <flint-button @click=${() => openDialog('slide-up-dialog')}>Slide Up</flint-button>
      <flint-button @click=${() => openDialog('slide-down-dialog')}>Slide Down</flint-button>
      <flint-button @click=${() => openDialog('scale-dialog')}>Scale (default)</flint-button>

      <flint-dialog id="slide-up-dialog" .transition=${args.transition} ?disable-backdrop-close=${args.disableBackdropClose} @flint-dialog-close=${closeDialog}>
        <flint-dialog-title>Slide Up</flint-dialog-title>
        <flint-dialog-content>
          <flint-dialog-content-text>This dialog slides up from below.</flint-dialog-content-text>
        </flint-dialog-content>
        <flint-dialog-actions>
          <flint-button @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      if (d) d.open = false;
    }}>Close</flint-button>
        </flint-dialog-actions>
      </flint-dialog>

      <flint-dialog id="slide-down-dialog" transition="slide-down" @flint-dialog-close=${closeDialog}>
        <flint-dialog-title>Slide Down</flint-dialog-title>
        <flint-dialog-content>
          <flint-dialog-content-text>This dialog slides down from above.</flint-dialog-content-text>
        </flint-dialog-content>
        <flint-dialog-actions>
          <flint-button @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      if (d) d.open = false;
    }}>OK</flint-button>
        </flint-dialog-actions>
      </flint-dialog>

      <flint-dialog id="scale-dialog" transition="scale" @flint-dialog-close=${closeDialog}>
        <flint-dialog-title>Scale In</flint-dialog-title>
        <flint-dialog-content>
          <flint-dialog-content-text>This dialog scales in from the centre.</flint-dialog-content-text>
        </flint-dialog-content>
        <flint-dialog-actions>
          <flint-button @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      if (d) d.open = false;
    }}>Got it</flint-button>
        </flint-dialog-actions>
      </flint-dialog>
    </flint-stack>
  `,
};

// ── Large / Scrolling Content ─────────────────────────────────────────────
export const LargeContent: Story = {
  render: () => html`
    <flint-box display="flex" alignItems="center" justifyContent="center" height="300px">
      <flint-button @click=${() => openDialog('scroll-dialog')}>Privacy Policy</flint-button>

      <flint-dialog id="scroll-dialog" @flint-dialog-close=${closeDialog}>
        <flint-dialog-title>Privacy Policy</flint-dialog-title>
        <flint-dialog-content>
          ${Array.from({ length: 12 }).map((_, i) => html`
            <flint-dialog-content-text>
              ${i + 1}. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et.
            </flint-dialog-content-text>
          `)}
        </flint-dialog-content>
        <flint-dialog-actions>
          <flint-button variant="secondary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      if (d) d.open = false;
    }}>Decline</flint-button>
          <flint-button variant="primary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      if (d) d.open = false;
    }}>I Understand</flint-button>
        </flint-dialog-actions>
      </flint-dialog>
    </flint-box>
  `,
};

// ── Nested Dialog ─────────────────────────────────────────────────────────
/**
 * A dialog that opens a second (child) confirmation dialog.
 * Pressing Escape only closes the topmost dialog — the parent stays open.
 * The child uses `disable-backdrop-close` to force an explicit choice.
 */
export const NestedDialog: Story = {
  render: () => html`
    <flint-box display="flex" alignItems="center" justifyContent="center" height="400px">
      <flint-button @click=${() => openDialog('nested-parent-dialog')}>Open Settings</flint-button>

      <!-- Parent dialog -->
      <flint-dialog
        id="nested-parent-dialog"
        @flint-dialog-close=${(e: Event) => { (e.target as FlintDialog).open = false; }}
      >
        <flint-dialog-title>Account Settings</flint-dialog-title>
        <flint-dialog-content>
          <flint-dialog-content-text>
            Manage your account. Dangerous actions will ask for confirmation.
          </flint-dialog-content-text>
          <div style="margin-top:12px;">
            <flint-button
              color="error"
              variant="secondary"
              @click=${() => openDialog('nested-child-dialog')}
            >Delete Account…</flint-button>
          </div>
        </flint-dialog-content>
        <flint-dialog-actions>
          <flint-button variant="secondary" @click=${() => {
    (document.getElementById('nested-parent-dialog') as FlintDialog).open = false;
  }}>Close</flint-button>
        </flint-dialog-actions>
      </flint-dialog>

      <!-- Child confirmation dialog (opened from inside the parent) -->
      <flint-dialog
        id="nested-child-dialog"
        disable-backdrop-close
        transition="slide-up"
        @confirm=${() => {
    alert('Account deleted.');
    (document.getElementById('nested-child-dialog') as FlintDialog).open = false;
    (document.getElementById('nested-parent-dialog') as FlintDialog).open = false;
  }}
        @cancel=${() => {
    (document.getElementById('nested-child-dialog') as FlintDialog).open = false;
  }}
      >
        <flint-dialog-title>Delete your account?</flint-dialog-title>
        <flint-dialog-content>
          <flint-dialog-content-text>
            This is <strong>permanent</strong> and cannot be undone. All your data will be removed immediately.
          </flint-dialog-content-text>
        </flint-dialog-content>
        <flint-dialog-actions>
          <flint-button variant="secondary" @click=${(e: Event) => {
    const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
    d?.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
  }}>Keep Account</flint-button>
          <flint-button variant="primary" color="error" @click=${(e: Event) => {
    const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
    d?.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true }));
  }}>Yes, Delete</flint-button>
        </flint-dialog-actions>
      </flint-dialog>
    </flint-box>
  `,
};

// ── Form Dialog ───────────────────────────────────────────────────────────
/**
 * A dialog containing a form. Closing via Escape or the Cancel button discards
 * changes; Submit dispatches a 'confirm' event so the parent can process data.
 */
export const FormDialog: Story = {
  render: () => html`
    <flint-box display="flex" alignItems="center" justifyContent="center" height="360px">
      <flint-button @click=${() => openDialog('form-dialog')}>Edit Profile</flint-button>

      <flint-dialog id="form-dialog" @flint-dialog-close=${closeDialog}>
        <flint-dialog-title>Edit Profile</flint-dialog-title>
        <flint-dialog-content>
          <flint-stack direction="column" gap="12px" style="padding-top:4px;">
            <label style="display:flex;flex-direction:column;gap:4px;font-size:.875rem;font-weight:500;">
              Full name
              <input id="form-name" type="text" placeholder="Jane Doe"
                style="padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:.9375rem;outline:none;" />
            </label>
            <label style="display:flex;flex-direction:column;gap:4px;font-size:.875rem;font-weight:500;">
              Email
              <input id="form-email" type="email" placeholder="jane@example.com"
                style="padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:.9375rem;outline:none;" />
            </label>
          </flint-stack>
        </flint-dialog-content>
        <flint-dialog-actions>
          <flint-button variant="secondary" @click=${(e: Event) => {
    const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
    if (d) d.open = false;
  }}>Cancel</flint-button>
          <flint-button variant="primary" @click=${(e: Event) => {
    const name = (document.getElementById('form-name') as HTMLInputElement)?.value;
    const email = (document.getElementById('form-email') as HTMLInputElement)?.value;
    alert(`Saved: ${name} <${email}>`);
    const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
    if (d) d.open = false;
  }}>Save Changes</flint-button>
        </flint-dialog-actions>
      </flint-dialog>
    </flint-box>
  `,
};

// ── Alert Dialog ─────────────────────────────────────────────────────────
/**
 * An informational alert with a single "OK" button and no backdrop dismiss.
 * Useful for critical notices that require acknowledgement.
 */
export const Alert: Story = {
  render: () => html`
    <flint-box display="flex" alignItems="center" justifyContent="center" height="300px">
      <flint-button color="error" variant="primary" @click=${() => openDialog('alert-dialog')}>
        Show Alert
      </flint-button>

      <flint-dialog id="alert-dialog" disable-backdrop-close @flint-dialog-close=${closeDialog}>
        <flint-dialog-title>Session Expired</flint-dialog-title>
        <flint-dialog-content>
          <flint-dialog-content-text>
            Your session has expired due to inactivity. Please log in again to continue.
          </flint-dialog-content-text>
        </flint-dialog-content>
        <flint-dialog-actions align="center">
          <flint-button variant="primary" @click=${(e: Event) => {
    const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
    if (d) d.open = false;
  }}>OK, Got It</flint-button>
        </flint-dialog-actions>
      </flint-dialog>
    </flint-box>
  `,
};

// ── Disable Backdrop Close ────────────────────────────────────────────────
export const DisableBackdropClose: Story = {
  args: { disableBackdropClose: true },
  render: (args) => html`
    <flint-box display="flex" alignItems="center" justifyContent="center" height="300px">
      <flint-button @click=${() => openDialog('locked-dialog')}>Open Locked Dialog</flint-button>

      <flint-dialog id="locked-dialog" ?disable-backdrop-close=${args.disableBackdropClose} @flint-dialog-close=${closeDialog}>
        <flint-dialog-title>Action Required</flint-dialog-title>
        <flint-dialog-content>
          <flint-dialog-content-text>
            You must make a choice to continue. Clicking outside this dialog will not close it.
          </flint-dialog-content-text>
        </flint-dialog-content>
        <flint-dialog-actions>
          <flint-button variant="secondary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      if (d) d.requestClose();
    }}>Dismiss</flint-button>
          <flint-button variant="primary" @click=${(e: Event) => {
      alert('Confirmed!');
      const d = (e.target as HTMLElement).closest('flint-dialog') as FlintDialog;
      if (d) d.requestClose();
    }}>Confirm</flint-button>
        </flint-dialog-actions>
      </flint-dialog>
    </flint-box>
  `,
};
