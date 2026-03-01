import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-dialog.js';
import { UiDialog } from './ui-dialog.js';
import '../button/ui-button.js';

const meta: Meta = {
  title: 'Feedback/Dialog',
  component: 'ui-dialog',
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
  (document.getElementById(id) as UiDialog | null)!.open = true;
}
function closeDialog(e: Event) {
  (e.target as UiDialog).open = false;
}

// ── Basic ────────────────────────────────────────────────────────────────────
export const Basic: Story = {
  render: (args) => html`
    <div style="height:300px;display:flex;align-items:center;justify-content:center;">
      <ui-button @click=${() => openDialog('basic-dialog')}>Open Dialog</ui-button>

      <ui-dialog
        id="basic-dialog"
        .open=${args.open}
        .transition=${args.transition}
        @close=${closeDialog}
      >
        <ui-dialog-title>Discard draft?</ui-dialog-title>
        <ui-dialog-content>
          <ui-dialog-content-text>
            If you discard this draft, your changes will be permanently lost and cannot be recovered.
          </ui-dialog-content-text>
        </ui-dialog-content>
        <ui-dialog-actions>
          <ui-button variant="secondary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      if (d) d.open = false;
    }}>Cancel</ui-button>
          <ui-button variant="primary" color="error" @click=${(e: Event) => {
      alert('Draft discarded!');
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      if (d) d.open = false;
    }}>Discard</ui-button>
        </ui-dialog-actions>
      </ui-dialog>
    </div>
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
    <div style="height:300px;display:flex;gap:16px;align-items:center;justify-content:center;flex-wrap:wrap;">

      <!-- Trigger buttons for different confirmation types -->
      <ui-button color="error" variant="primary" @click=${() => openDialog('delete-confirm-dialog')}>
        Delete Item
      </ui-button>
      <ui-button variant="secondary" @click=${() => openDialog('publish-confirm-dialog')}>
        Publish Changes
      </ui-button>
      <ui-button variant="secondary" @click=${() => openDialog('logout-confirm-dialog')}>
        Log Out
      </ui-button>

      <!-- ── Delete Confirmation ──────────────────────────────────────────── -->
      <ui-dialog
        id="delete-confirm-dialog"
        disable-backdrop-close
        @confirm=${(e: Event) => {
      alert('Item permanently deleted.');
      (e.target as UiDialog).open = false;
    }}
        @cancel=${(e: Event) => {
      (e.target as UiDialog).open = false;
    }}
      >
        <ui-dialog-title>Delete this item?</ui-dialog-title>
        <ui-dialog-content>
          <ui-dialog-content-text>
            This action is <strong>permanent</strong> and cannot be undone. The item will be removed immediately.
          </ui-dialog-content-text>
        </ui-dialog-content>
        <ui-dialog-actions>
          <ui-button variant="secondary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      d?.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
    }}>Keep Item</ui-button>
          <ui-button variant="primary" color="error" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      d?.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true }));
    }}>Yes, Delete</ui-button>
        </ui-dialog-actions>
      </ui-dialog>

      <!-- ── Publish Confirmation ─────────────────────────────────────────── -->
      <ui-dialog
        id="publish-confirm-dialog"
        disable-backdrop-close
        @confirm=${(e: Event) => {
      alert('Changes published successfully!');
      (e.target as UiDialog).open = false;
    }}
        @cancel=${(e: Event) => {
      (e.target as UiDialog).open = false;
    }}
      >
        <ui-dialog-title>Publish changes?</ui-dialog-title>
        <ui-dialog-content>
          <ui-dialog-content-text>
            Your changes will go live immediately and be visible to all users. Make sure everything looks right before continuing.
          </ui-dialog-content-text>
        </ui-dialog-content>
        <ui-dialog-actions>
          <ui-button variant="secondary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      d?.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
    }}>Review Again</ui-button>
          <ui-button variant="primary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      d?.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true }));
    }}>Publish Now</ui-button>
        </ui-dialog-actions>
      </ui-dialog>

      <!-- ── Logout Confirmation ──────────────────────────────────────────── -->
      <ui-dialog
        id="logout-confirm-dialog"
        disable-backdrop-close
        transition="slide-up"
        @confirm=${(e: Event) => {
      alert('Logged out!');
      (e.target as UiDialog).open = false;
    }}
        @cancel=${(e: Event) => {
      (e.target as UiDialog).open = false;
    }}
      >
        <ui-dialog-title>Log out of your account?</ui-dialog-title>
        <ui-dialog-content>
          <ui-dialog-content-text>
            You will be signed out of all active sessions on this device.
          </ui-dialog-content-text>
        </ui-dialog-content>
        <ui-dialog-actions align="space-between">
          <ui-button variant="secondary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      d?.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
    }}>Stay Signed In</ui-button>
          <ui-button variant="primary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      d?.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true }));
    }}>Log Out</ui-button>
        </ui-dialog-actions>
      </ui-dialog>
    </div>
  `,
};

// ── Transitions ──────────────────────────────────────────────────────────────
export const Transitions: Story = {
  render: () => html`
    <div style="height:300px;display:flex;gap:16px;align-items:center;justify-content:center;">
      <ui-button @click=${() => openDialog('slide-up-dialog')}>Slide Up</ui-button>
      <ui-button @click=${() => openDialog('slide-down-dialog')}>Slide Down</ui-button>
      <ui-button @click=${() => openDialog('scale-dialog')}>Scale (default)</ui-button>

      <ui-dialog id="slide-up-dialog" transition="slide-up" @close=${closeDialog}>
        <ui-dialog-title>Slide Up</ui-dialog-title>
        <ui-dialog-content>
          <ui-dialog-content-text>This dialog slides up from below.</ui-dialog-content-text>
        </ui-dialog-content>
        <ui-dialog-actions>
          <ui-button @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      if (d) d.open = false;
    }}>Close</ui-button>
        </ui-dialog-actions>
      </ui-dialog>

      <ui-dialog id="slide-down-dialog" transition="slide-down" @close=${closeDialog}>
        <ui-dialog-title>Slide Down</ui-dialog-title>
        <ui-dialog-content>
          <ui-dialog-content-text>This dialog slides down from above.</ui-dialog-content-text>
        </ui-dialog-content>
        <ui-dialog-actions>
          <ui-button @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      if (d) d.open = false;
    }}>OK</ui-button>
        </ui-dialog-actions>
      </ui-dialog>

      <ui-dialog id="scale-dialog" transition="scale" @close=${closeDialog}>
        <ui-dialog-title>Scale In</ui-dialog-title>
        <ui-dialog-content>
          <ui-dialog-content-text>This dialog scales in from the centre.</ui-dialog-content-text>
        </ui-dialog-content>
        <ui-dialog-actions>
          <ui-button @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      if (d) d.open = false;
    }}>Got it</ui-button>
        </ui-dialog-actions>
      </ui-dialog>
    </div>
  `,
};

// ── Large / Scrolling Content ─────────────────────────────────────────────
export const LargeContent: Story = {
  render: () => html`
    <div style="height:300px;display:flex;align-items:center;justify-content:center;">
      <ui-button @click=${() => openDialog('scroll-dialog')}>Privacy Policy</ui-button>

      <ui-dialog id="scroll-dialog" @close=${closeDialog}>
        <ui-dialog-title>Privacy Policy</ui-dialog-title>
        <ui-dialog-content>
          ${Array.from({ length: 12 }).map((_, i) => html`
            <ui-dialog-content-text>
              ${i + 1}. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et.
            </ui-dialog-content-text>
          `)}
        </ui-dialog-content>
        <ui-dialog-actions>
          <ui-button variant="secondary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      if (d) d.open = false;
    }}>Decline</ui-button>
          <ui-button variant="primary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      if (d) d.open = false;
    }}>I Understand</ui-button>
        </ui-dialog-actions>
      </ui-dialog>
    </div>
  `,
};

// ── Disable Backdrop Close ────────────────────────────────────────────────
export const DisableBackdropClose: Story = {
  render: () => html`
    <div style="height:300px;display:flex;align-items:center;justify-content:center;">
      <ui-button @click=${() => openDialog('locked-dialog')}>Open Locked Dialog</ui-button>

      <ui-dialog id="locked-dialog" disable-backdrop-close @close=${closeDialog}>
        <ui-dialog-title>Action Required</ui-dialog-title>
        <ui-dialog-content>
          <ui-dialog-content-text>
            You must make a choice to continue. Clicking outside this dialog will not close it.
          </ui-dialog-content-text>
        </ui-dialog-content>
        <ui-dialog-actions>
          <ui-button variant="secondary" @click=${(e: Event) => {
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      if (d) d.requestClose();
    }}>Dismiss</ui-button>
          <ui-button variant="primary" @click=${(e: Event) => {
      alert('Confirmed!');
      const d = (e.target as HTMLElement).closest('ui-dialog') as UiDialog;
      if (d) d.requestClose();
    }}>Confirm</ui-button>
        </ui-dialog-actions>
      </ui-dialog>
    </div>
  `,
};
