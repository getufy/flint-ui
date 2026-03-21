import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

// Component imports
import '../input/flint-input';
import '../select/flint-select';
import '../tabs/flint-tabs';
import '../drawer/flint-drawer';
import '../navigation-menu/flint-navigation-menu';
import '../navigation-menu/flint-navigation-menu-list';
import '../navigation-menu/flint-navigation-menu-item';
import '../navigation-menu/flint-navigation-menu-trigger';
import '../navigation-menu/flint-navigation-menu-content';
import '../navigation-menu/flint-navigation-menu-link';
import '../date-picker/flint-date-picker';
import '../breadcrumbs/flint-breadcrumbs';
import '../button/flint-button';
import '../stack/flint-stack';
import '../pagination/flint-pagination';

/**
 * RTL (right-to-left) story variants for key interactive components.
 *
 * Each story wraps its content in a `dir="rtl"` container so the layout
 * mirrors correctly regardless of the global direction toolbar setting.
 *
 * Use the **Direction** toolbar button (top bar) to toggle the entire
 * Storybook between LTR, RTL, and Auto modes.
 */
const meta: Meta = {
  title: 'RTL/RTL Layouts',
  parameters: {
    layout: 'padded',
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: false },
          { id: 'landmark-unique', enabled: false },
          { id: 'aria-required-attr', enabled: false },
          { id: 'aria-required-children', enabled: false },
          { id: 'aria-input-field-name', enabled: false },
          { id: 'select-name', enabled: false },
          { id: 'aria-required-parent', enabled: false },
          { id: 'aria-valid-attr-value', enabled: false },
          { id: 'button-name', enabled: false },
          { id: 'aria-hidden-focus', enabled: false },
          { id: 'aria-allowed-attr', enabled: false },
        ],
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/* ── Helper: force RTL on the story wrapper ────────────────────────── */

const rtlDecorator = (story: () => unknown) =>
  html`<div dir="rtl" style="font-family: var(--flint-font-family); width: 100%;">${story()}</div>`;

/* ================================================================== */
/*  Input / TextField                                                   */
/* ================================================================== */

export const InputRTL: Story = {
  name: 'Input',
  decorators: [rtlDecorator],
  render: () => html`
    <flint-stack direction="column" gap="16">
      <flint-input
        label="البريد الإلكتروني"
        placeholder="أدخل بريدك الإلكتروني"
        helper-text="سنستخدم هذا البريد للتواصل معك"
      ></flint-input>
      <flint-input
        label="كلمة المرور"
        type="password"
        placeholder="أدخل كلمة المرور"
        error
        error-message="كلمة المرور مطلوبة"
      ></flint-input>
      <flint-input
        label="البحث"
        placeholder="ابحث هنا..."
      >
        <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
        </svg>
      </flint-input>
    </flint-stack>
  `,
};

/* ================================================================== */
/*  Select                                                              */
/* ================================================================== */

export const SelectRTL: Story = {
  name: 'Select',
  decorators: [rtlDecorator],
  render: () => html`
    <div style="max-width: 400px;">
      <flint-select
        label="اختر الدولة"
        placeholder="اختر..."
        .options=${[
          { label: 'مصر', value: 'eg' },
          { label: 'السعودية', value: 'sa' },
          { label: 'الإمارات', value: 'ae' },
          { label: 'الأردن', value: 'jo' },
          { label: 'لبنان', value: 'lb' },
          { label: 'المغرب', value: 'ma' },
        ]}
      ></flint-select>
    </div>
  `,
};

/* ================================================================== */
/*  Tabs                                                                */
/* ================================================================== */

export const TabsRTL: Story = {
  name: 'Tabs',
  decorators: [rtlDecorator],
  render: () => html`
    <flint-tabs value="tab1">
      <flint-tab value="tab1" label="الرئيسية"></flint-tab>
      <flint-tab value="tab2" label="الملف الشخصي"></flint-tab>
      <flint-tab value="tab3" label="الإعدادات"></flint-tab>
      <flint-tab value="tab4" label="الإشعارات"></flint-tab>
      <flint-tab-panel value="tab1">
        <p>محتوى الصفحة الرئيسية. هذا النص يُعرض من اليمين إلى اليسار.</p>
      </flint-tab-panel>
      <flint-tab-panel value="tab2">
        <p>محتوى الملف الشخصي.</p>
      </flint-tab-panel>
      <flint-tab-panel value="tab3">
        <p>محتوى الإعدادات.</p>
      </flint-tab-panel>
      <flint-tab-panel value="tab4">
        <p>محتوى الإشعارات.</p>
      </flint-tab-panel>
    </flint-tabs>
  `,
};

/* ================================================================== */
/*  Drawer                                                              */
/* ================================================================== */

export const DrawerRTL: Story = {
  name: 'Drawer',
  decorators: [rtlDecorator],
  render: () => html`
    <div style="position: relative; height: 400px; border: 1px solid var(--flint-border-color); border-radius: 8px; overflow: hidden;">
      <flint-drawer .open=${true} container placement="right" label="القائمة">
        <flint-stack direction="column" gap="8" style="padding: 16px;">
          <h3 style="margin: 0;">القائمة الجانبية</h3>
          <p style="margin: 0; color: var(--flint-text-color-muted);">هذا الدرج يظهر من الجهة اليمنى في وضع RTL.</p>
          <flint-button appearance="filled" color="primary" full-width>حفظ</flint-button>
          <flint-button appearance="outlined" color="neutral" full-width>إلغاء</flint-button>
        </flint-stack>
      </flint-drawer>
      <div style="padding: 24px; margin-right: 256px;">
        <h2 style="margin-top: 0;">المحتوى الرئيسي</h2>
        <p>هذا هو المحتوى الرئيسي للصفحة بجانب الدرج.</p>
      </div>
    </div>
  `,
};

/* ================================================================== */
/*  Navigation Menu                                                     */
/* ================================================================== */

export const NavigationMenuRTL: Story = {
  name: 'Navigation Menu',
  decorators: [rtlDecorator],
  render: () => html`
    <flint-navigation-menu>
      <flint-navigation-menu-list>
        <flint-navigation-menu-item>
          <flint-navigation-menu-trigger>المنتجات</flint-navigation-menu-trigger>
          <flint-navigation-menu-content>
            <div style="padding: 16px; min-width: 200px;">
              <flint-navigation-menu-link href="#">الميزات</flint-navigation-menu-link>
              <flint-navigation-menu-link href="#">الأسعار</flint-navigation-menu-link>
              <flint-navigation-menu-link href="#">التكاملات</flint-navigation-menu-link>
            </div>
          </flint-navigation-menu-content>
        </flint-navigation-menu-item>
        <flint-navigation-menu-item>
          <flint-navigation-menu-trigger>الموارد</flint-navigation-menu-trigger>
          <flint-navigation-menu-content>
            <div style="padding: 16px; min-width: 200px;">
              <flint-navigation-menu-link href="#">التوثيق</flint-navigation-menu-link>
              <flint-navigation-menu-link href="#">الدروس</flint-navigation-menu-link>
              <flint-navigation-menu-link href="#">المدونة</flint-navigation-menu-link>
            </div>
          </flint-navigation-menu-content>
        </flint-navigation-menu-item>
        <flint-navigation-menu-item>
          <flint-navigation-menu-link href="#">تواصل معنا</flint-navigation-menu-link>
        </flint-navigation-menu-item>
      </flint-navigation-menu-list>
    </flint-navigation-menu>
  `,
};

/* ================================================================== */
/*  Date Picker                                                         */
/* ================================================================== */

export const DatePickerRTL: Story = {
  name: 'Date Picker',
  decorators: [rtlDecorator],
  render: () => html`
    <div style="max-width: 320px;">
      <flint-date-picker
        label="تاريخ الميلاد"
        placeholder="اختر التاريخ"
      ></flint-date-picker>
    </div>
  `,
};

/* ================================================================== */
/*  Breadcrumbs                                                         */
/* ================================================================== */

export const BreadcrumbsRTL: Story = {
  name: 'Breadcrumbs',
  decorators: [rtlDecorator],
  render: () => html`
    <flint-breadcrumbs>
      <a href="#">الرئيسية</a>
      <a href="#">المنتجات</a>
      <a href="#">الإلكترونيات</a>
      <span aria-current="page">الهواتف الذكية</span>
    </flint-breadcrumbs>
  `,
};

/* ================================================================== */
/*  Pagination                                                          */
/* ================================================================== */

export const PaginationRTL: Story = {
  name: 'Pagination',
  decorators: [rtlDecorator],
  render: () => html`
    <flint-pagination count="10" page="3"></flint-pagination>
  `,
};

/* ================================================================== */
/*  Buttons with Icons (prefix/suffix swap)                             */
/* ================================================================== */

export const ButtonsRTL: Story = {
  name: 'Buttons with Icons',
  decorators: [rtlDecorator],
  render: () => html`
    <flint-stack direction="row" gap="12" align="center">
      <flint-button appearance="filled" color="primary">
        <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
        </svg>
        التالي
      </flint-button>
      <flint-button appearance="outlined" color="neutral">
        السابق
        <svg slot="suffix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path>
        </svg>
      </flint-button>
      <flint-button appearance="filled" color="primary" loading>جارٍ الحفظ...</flint-button>
    </flint-stack>
  `,
};

/* ================================================================== */
/*  Form Layout (composite)                                             */
/* ================================================================== */

export const FormLayoutRTL: Story = {
  name: 'Form Layout',
  decorators: [rtlDecorator],
  render: () => html`
    <div style="max-width: 500px; padding: 24px; background: var(--flint-surface-background); border: 1px solid var(--flint-border-color); border-radius: 12px;">
      <h2 style="margin-top: 0; margin-bottom: 20px;">تسجيل حساب جديد</h2>
      <flint-stack direction="column" gap="16">
        <flint-input
          label="الاسم الكامل"
          placeholder="أدخل اسمك الكامل"
          required
        ></flint-input>
        <flint-input
          label="البريد الإلكتروني"
          type="email"
          placeholder="example@domain.com"
          required
        ></flint-input>
        <flint-select
          label="الدولة"
          placeholder="اختر دولتك"
          .options=${[
            { label: 'مصر', value: 'eg' },
            { label: 'السعودية', value: 'sa' },
            { label: 'الإمارات', value: 'ae' },
          ]}
        ></flint-select>
        <flint-input
          label="كلمة المرور"
          type="password"
          placeholder="أدخل كلمة المرور"
          required
        ></flint-input>
        <div style="display: flex; justify-content: flex-start; gap: 12px; margin-top: 8px;">
          <flint-button appearance="filled" color="primary">إنشاء الحساب</flint-button>
          <flint-button appearance="outlined" color="neutral">إلغاء</flint-button>
        </div>
      </flint-stack>
    </div>
  `,
};
