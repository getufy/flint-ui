/**
 * Typed event map for all `flint-*` custom events.
 *
 * Augments `HTMLElementEventMap` so that `addEventListener('flint-…', …)` is
 * fully typed for vanilla TypeScript consumers.
 *
 * @module
 */

import type { DateRange } from './date-range-picker/date-range-helpers.js';

// ── Detail interfaces ────────────────────────────────────────────────────────

// Input / form controls
export type FlintInputInputEvent = CustomEvent<{ value: string }>;
export type FlintInputChangeEvent = CustomEvent<{ value: string }>;
export type FlintTextFieldInputEvent = CustomEvent<{ value: string }>;
export type FlintTextFieldChangeEvent = CustomEvent<{ value: string }>;
export type FlintTextareaInputEvent = CustomEvent<{ value: string }>;
export type FlintTextareaChangeEvent = CustomEvent<{ value: string }>;
export type FlintSelectChangeEvent = CustomEvent<{ value: string[] }>;
export type FlintAutocompleteChangeEvent = CustomEvent<{ value: string; label: string }>;
export type FlintCheckboxChangeEvent = CustomEvent<{ checked: boolean; value: string; indeterminate: boolean }>;
export type FlintSwitchChangeEvent = CustomEvent<{ checked: boolean }>;
export type FlintSliderChangeEvent = CustomEvent<{ value: number }>;
export type FlintRangeSliderChangeEvent = CustomEvent<{ value: [number, number] }>;
export type FlintRatingChangeEvent = CustomEvent<{ value: number }>;
export type FlintToggleChangeEvent = CustomEvent<{ pressed: boolean }>;
export type FlintToggleButtonChangeEvent = CustomEvent<{ value: string; selected: boolean }>;
export type FlintToggleButtonGroupChangeEvent = CustomEvent<{ value: string | string[] }>;
export type FlintRadioGroupChangeEvent = CustomEvent<{ value: string }>;
export type FlintRadioSelectEvent = CustomEvent<{ value: string }>;
export type FlintTransferListChangeEvent = CustomEvent<{ value: string[] }>;

// OTP
export type FlintOtpChangeEvent = CustomEvent<{ value: string }>;
export type FlintOtpCompleteEvent = CustomEvent<{ value: string }>;

// Date / time
export type FlintDateFieldChangeEvent = CustomEvent<{ value: string }>;
export type FlintDateFieldClearEvent = CustomEvent<undefined>;
export type FlintDatePickerSelectEvent = CustomEvent<{ value: string }>;
export type FlintDatePickerChangeEvent = CustomEvent<{ value: string }>;
export type FlintDateRangePickerSelectEvent = CustomEvent<{ value: DateRange }>;
export type FlintDateRangePickerChangeEvent = CustomEvent<{ value: DateRange }>;
export type FlintDateRangePickerClearEvent = CustomEvent<undefined>;
export type FlintTimeFieldChangeEvent = CustomEvent<{ value: string }>;
export type FlintTimePickerChangeEvent = CustomEvent<{ value: string }>;
export type FlintTimePickerClearEvent = CustomEvent<undefined>;
export type FlintDigitalClockChangeEvent = CustomEvent<{ value: string }>;
export type FlintMultiSectionDigitalClockChangeEvent = CustomEvent<{ value: string }>;
export type FlintTimeClockChangeEvent = CustomEvent<{ value: string }>;
export type FlintTimeClockViewChangeEvent = CustomEvent<{ view: string }>;
export type FlintDesktopTimePickerChangeEvent = CustomEvent<{ value: string }>;
export type FlintMobileTimePickerChangeEvent = CustomEvent<{ value: string }>;
export type FlintStaticTimePickerChangeEvent = CustomEvent<{ value: string }>;

// Dialog / drawer / backdrop
export type FlintDialogCloseEvent = CustomEvent<{ open: false }>;
export type FlintDrawerCloseEvent = CustomEvent<{ open: false }>;
export type FlintBackdropCloseEvent = CustomEvent<{ open: false }>;

// Alert / snackbar
export type FlintAlertCloseEvent = CustomEvent<{ open: false; severity: string }>;
export type FlintSnackbarOpenEvent = CustomEvent<{ open: true }>;
export type FlintSnackbarCloseEvent = CustomEvent<{ open: false }>;

// Menu
export type FlintMenuItemSelectEvent = CustomEvent<{ value: string; label: string }>;
export type FlintMenuCloseEvent = CustomEvent<{ open: false }>;

// Menubar
export type FlintMenubarItemSelectEvent = CustomEvent<{ value: string }>;
export type FlintMenubarCheckboxChangeEvent = CustomEvent<{ checked: boolean; value: string }>;
export type FlintMenubarRadioSelectEvent = CustomEvent<{ value: string }>;
export type FlintMenubarRadioChangeEvent = CustomEvent<{ value: string }>;
export type FlintMenubarRequestCloseEvent = CustomEvent<{ open: false }>;

// Command
export type FlintCommandItemSelectEvent = CustomEvent<{ value: string }>;
export type FlintCommandDialogCloseEvent = CustomEvent<{ open: false }>;

// Tabs
export type FlintTabClickEvent = CustomEvent<{ value: string }>;
export type FlintTabChangeEvent = CustomEvent<{ value: string }>;

// Accordion
export type FlintAccordionChangeEvent = CustomEvent<{ expanded: boolean }>;
export type FlintAccordionToggleEvent = CustomEvent<undefined>;

// Collapsible
export type FlintCollapsibleChangeEvent = CustomEvent<{ open: boolean }>;

// Navigation menu
export type FlintNavigationMenuTriggerClickEvent = CustomEvent<{ contentId: string; open: boolean }>;
export type FlintNavigationMenuContentToggleEvent = CustomEvent<{ contentId: string; open: boolean }>;

// Tree view
export type FlintTreeViewItemClickEvent = CustomEvent<{ itemId: string }>;
export type FlintTreeViewExpandedItemsChangeEvent = CustomEvent<{ expandedItems: string[] }>;
export type FlintTreeViewItemPositionChangeEvent = CustomEvent<{ itemId: string; newParentId: string | null; newIndex: number }>;
export type FlintTreeViewErrorEvent = CustomEvent<{ message: string; id: string; error: unknown }>;
export type FlintTreeItemToggleEvent = CustomEvent<{ itemId: string; expanded: boolean }>;
export type FlintTreeItemClickEvent = CustomEvent<{ itemId: string }>;

// Carousel
export type FlintCarouselChangeEvent = CustomEvent<{ index: number; total: number }>;

// Pagination
export type FlintPaginationChangeEvent = CustomEvent<{ page: number }>;
export type FlintPaginationPageChangeEvent = CustomEvent<{ page: number }>;
export type FlintPaginationRowsPerPageChangeEvent = CustomEvent<{ rowsPerPage: number }>;

// Chip
export type FlintChipClickEvent = CustomEvent<undefined>;
export type FlintChipDeleteEvent = CustomEvent<{ value: string }>;

// Copy button
export type FlintCopyEvent = CustomEvent<{ value: string }>;
export type FlintCopyErrorEvent = CustomEvent<{ reason: 'empty' | 'clipboard' }>;

// Hover card
export type FlintHoverCardOpenEvent = CustomEvent<{ open: true }>;
export type FlintHoverCardCloseEvent = CustomEvent<{ open: false }>;

// Speed dial
export type FlintSpeedDialActionClickEvent = CustomEvent<{ name: string; tooltipTitle: string }>;
export type FlintSpeedDialOpenEvent = CustomEvent<{ open: true }>;
export type FlintSpeedDialCloseEvent = CustomEvent<{ open: false }>;

// Stepper
export type FlintStepClickEvent = CustomEvent<{ step: number }>;
export type FlintStepChangeEvent = CustomEvent<{ step: number }>;
export type FlintMobileStepBackEvent = CustomEvent<undefined>;
export type FlintMobileStepNextEvent = CustomEvent<undefined>;

// Bottom navigation
export type FlintBottomNavigationChangeEvent = CustomEvent<{ value: string }>;

// Split panel
export type FlintSplitPanelRepositionEvent = CustomEvent<{ position: number; positionInPixels: number }>;

// Resizable
export type FlintResizableCollapseEvent = CustomEvent<{ index: number; layout: number[] }>;
export type FlintResizableExpandEvent = CustomEvent<{ index: number; layout: number[] }>;
export type FlintResizableChangeEvent = CustomEvent<{ layout: number[] }>;

// Image comparer
export type FlintImageComparerChangeEvent = CustomEvent<{ position: number }>;

// Box (dev warning)
export type FlintBoxWarningEvent = CustomEvent<{ message: string }>;

// ── Global event map augmentation ────────────────────────────────────────────

declare global {
    interface HTMLElementEventMap {
        // Input / form controls
        'flint-input-input': FlintInputInputEvent;
        'flint-input-change': FlintInputChangeEvent;
        'flint-text-field-input': FlintTextFieldInputEvent;
        'flint-text-field-change': FlintTextFieldChangeEvent;
        'flint-textarea-input': FlintTextareaInputEvent;
        'flint-textarea-change': FlintTextareaChangeEvent;
        'flint-select-change': FlintSelectChangeEvent;
        'flint-autocomplete-change': FlintAutocompleteChangeEvent;
        'flint-checkbox-change': FlintCheckboxChangeEvent;
        'flint-switch-change': FlintSwitchChangeEvent;
        'flint-slider-change': FlintSliderChangeEvent;
        'flint-range-slider-change': FlintRangeSliderChangeEvent;
        'flint-rating-change': FlintRatingChangeEvent;
        'flint-toggle-change': FlintToggleChangeEvent;
        'flint-toggle-button-change': FlintToggleButtonChangeEvent;
        'flint-toggle-button-group-change': FlintToggleButtonGroupChangeEvent;
        'flint-radio-group-change': FlintRadioGroupChangeEvent;
        'flint-radio-select': FlintRadioSelectEvent;
        'flint-transfer-list-change': FlintTransferListChangeEvent;

        // OTP
        'flint-otp-change': FlintOtpChangeEvent;
        'flint-otp-complete': FlintOtpCompleteEvent;

        // Date / time
        'flint-date-field-change': FlintDateFieldChangeEvent;
        'flint-date-field-clear': FlintDateFieldClearEvent;
        'flint-date-picker-select': FlintDatePickerSelectEvent;
        'flint-date-picker-change': FlintDatePickerChangeEvent;
        'flint-date-range-picker-select': FlintDateRangePickerSelectEvent;
        'flint-date-range-picker-change': FlintDateRangePickerChangeEvent;
        'flint-date-range-picker-clear': FlintDateRangePickerClearEvent;
        'flint-time-field-change': FlintTimeFieldChangeEvent;
        'flint-time-picker-change': FlintTimePickerChangeEvent;
        'flint-time-picker-clear': FlintTimePickerClearEvent;
        'flint-digital-clock-change': FlintDigitalClockChangeEvent;
        'flint-multi-section-digital-clock-change': FlintMultiSectionDigitalClockChangeEvent;
        'flint-time-clock-change': FlintTimeClockChangeEvent;
        'flint-time-clock-view-change': FlintTimeClockViewChangeEvent;
        'flint-desktop-time-picker-change': FlintDesktopTimePickerChangeEvent;
        'flint-mobile-time-picker-change': FlintMobileTimePickerChangeEvent;
        'flint-static-time-picker-change': FlintStaticTimePickerChangeEvent;

        // Dialog / drawer / backdrop
        'flint-dialog-close': FlintDialogCloseEvent;
        'flint-drawer-close': FlintDrawerCloseEvent;
        'flint-backdrop-close': FlintBackdropCloseEvent;

        // Alert / snackbar
        'flint-alert-close': FlintAlertCloseEvent;
        'flint-snackbar-open': FlintSnackbarOpenEvent;
        'flint-snackbar-close': FlintSnackbarCloseEvent;

        // Menu
        'flint-menu-item-select': FlintMenuItemSelectEvent;
        'flint-menu-close': FlintMenuCloseEvent;

        // Menubar
        'flint-menubar-item-select': FlintMenubarItemSelectEvent;
        'flint-menubar-checkbox-change': FlintMenubarCheckboxChangeEvent;
        'flint-menubar-radio-select': FlintMenubarRadioSelectEvent;
        'flint-menubar-radio-change': FlintMenubarRadioChangeEvent;
        'flint-menubar-request-close': FlintMenubarRequestCloseEvent;

        // Command
        'flint-command-item-select': FlintCommandItemSelectEvent;
        'flint-command-dialog-close': FlintCommandDialogCloseEvent;

        // Tabs
        'flint-tab-click': FlintTabClickEvent;
        'flint-tab-change': FlintTabChangeEvent;

        // Accordion
        'flint-accordion-change': FlintAccordionChangeEvent;
        'flint-accordion-toggle': FlintAccordionToggleEvent;

        // Collapsible
        'flint-collapsible-change': FlintCollapsibleChangeEvent;

        // Navigation menu
        'flint-navigation-menu-trigger-click': FlintNavigationMenuTriggerClickEvent;
        'flint-navigation-menu-content-toggle': FlintNavigationMenuContentToggleEvent;

        // Tree view
        'flint-tree-view-item-click': FlintTreeViewItemClickEvent;
        'flint-tree-view-expanded-items-change': FlintTreeViewExpandedItemsChangeEvent;
        'flint-tree-view-item-position-change': FlintTreeViewItemPositionChangeEvent;
        'flint-tree-view-error': FlintTreeViewErrorEvent;
        'flint-tree-item-toggle': FlintTreeItemToggleEvent;
        'flint-tree-item-click': FlintTreeItemClickEvent;

        // Carousel
        'flint-carousel-change': FlintCarouselChangeEvent;

        // Pagination
        'flint-pagination-change': FlintPaginationChangeEvent;
        'flint-pagination-page-change': FlintPaginationPageChangeEvent;
        'flint-pagination-rows-per-page-change': FlintPaginationRowsPerPageChangeEvent;

        // Chip
        'flint-chip-click': FlintChipClickEvent;
        'flint-chip-delete': FlintChipDeleteEvent;

        // Copy button
        'flint-copy': FlintCopyEvent;
        'flint-copy-error': FlintCopyErrorEvent;

        // Hover card
        'flint-hover-card-open': FlintHoverCardOpenEvent;
        'flint-hover-card-close': FlintHoverCardCloseEvent;

        // Speed dial
        'flint-speed-dial-action-click': FlintSpeedDialActionClickEvent;
        'flint-speed-dial-open': FlintSpeedDialOpenEvent;
        'flint-speed-dial-close': FlintSpeedDialCloseEvent;

        // Stepper
        'flint-step-click': FlintStepClickEvent;
        'flint-step-change': FlintStepChangeEvent;
        'flint-mobile-step-back': FlintMobileStepBackEvent;
        'flint-mobile-step-next': FlintMobileStepNextEvent;

        // Bottom navigation
        'flint-bottom-navigation-change': FlintBottomNavigationChangeEvent;

        // Split panel
        'flint-split-panel-reposition': FlintSplitPanelRepositionEvent;

        // Resizable
        'flint-resizable-collapse': FlintResizableCollapseEvent;
        'flint-resizable-expand': FlintResizableExpandEvent;
        'flint-resizable-change': FlintResizableChangeEvent;

        // Image comparer
        'flint-image-comparer-change': FlintImageComparerChangeEvent;

        // Box
        'flint-box-warning': FlintBoxWarningEvent;
    }
}
