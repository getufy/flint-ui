# Lite UI Component Library - API Reference

This is the comprehensive API documentation for all Lite components. For a visual API explorer, visit `/api` on the homepage.

## Table of Contents

1. [Form Components](#form-components)
   - [Button](#button)
   - [Input](#input)
   - [Select](#select)
   - [Switch](#switch)

2. [Layout Components](#layout-components)
   - [Card](#card)
   - [Container](#container)
   - [Grid](#grid)
   - [Stack](#stack)

3. [Overlay Components](#overlay-components)
   - [Modal](#modal)
   - [Popover](#popover)
   - [Tooltip](#tooltip)

4. [Data Display Components](#data-display-components)
   - [Table](#table)
   - [List](#list)
   - [Badge](#badge)

5. [Navigation Components](#navigation-components)
   - [Tabs](#tabs)
   - [Breadcrumb](#breadcrumb)
   - [Pagination](#pagination)

6. [CSS Custom Properties](#css-custom-properties)

7. [TypeScript Types](#typescript-types)

8. [Accessibility](#accessibility)

---

## Form Components

### Button

A reusable button component for user interactions.

**HTML Usage:**
```html
<ui-button variant="primary">Click Me</ui-button>
<ui-button variant="secondary" size="lg">Large Button</ui-button>
<ui-button disabled>Disabled Button</ui-button>
```

**React Usage:**
```jsx
import { UiButton } from 'lite';

<UiButton variant="primary" onClick={() => console.log('clicked')}>
  Click Me
</UiButton>
```

**Props:**
| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | No | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Button size |
| `disabled` | `boolean` | `false` | No | Disable button interactions |
| `loading` | `boolean` | `false` | No | Show loading state with spinner |
| `fullWidth` | `boolean` | `false` | No | Make button full width of container |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | No | HTML button type |

**Events:**
| Event Name | Detail | Description |
|-----------|--------|-------------|
| `click` | `MouseEvent` | Fired when button is clicked |
| `ui-button-click` | `{ timestamp: number }` | Custom button click event with timestamp |

**CSS Custom Properties:**
```css
--ui-button-padding: 8px 16px;
--ui-button-font-size: 14px;
--ui-button-font-weight: 600;
--ui-button-border-radius: 6px;
--ui-button-background-color: #3b82f6;
--ui-button-text-color: #ffffff;
```

**Accessibility:**
- Keyboard accessible (Tab, Enter/Space to activate)
- Proper `aria-label` support
- Disabled state with `aria-disabled`
- Loading state announced to screen readers

---

### Input

Text input field for user data entry.

**HTML Usage:**
```html
<ui-input type="text" placeholder="Enter text" />
<ui-input type="email" placeholder="your@email.com" required />
<ui-input type="password" placeholder="Enter password" />
```

**React Usage:**
```jsx
import { UiInput } from 'lite';

const [value, setValue] = useState('');

<UiInput
  type="email"
  placeholder="Enter email"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error="Invalid email"
/>
```

**Props:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number'` | `'text'` | Input type |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Input value (controlled) |
| `defaultValue` | `string` | - | Initial value (uncontrolled) |
| `disabled` | `boolean` | `false` | Disable input |
| `required` | `boolean` | `false` | Mark as required |
| `error` | `boolean` | `false` | Show error state |
| `errorMessage` | `string` | - | Error message to display |

**Events:**
| Event Name | Detail | Description |
|-----------|--------|-------------|
| `input` | `InputEvent` | Fired on input change |
| `change` | `Event` | Fired when input loses focus |
| `focus` | `FocusEvent` | Fired when input receives focus |
| `blur` | `FocusEvent` | Fired when input loses focus |

---

### Switch

Toggle switch component for boolean states.

**HTML Usage:**
```html
<ui-switch checked></ui-switch>
<ui-switch label="Enable notifications"></ui-switch>
<ui-switch size="lg" disabled></ui-switch>
```

**React Usage:**
```jsx
import { UiSwitch } from 'lite';

const [enabled, setEnabled] = useState(false);

<UiSwitch
  checked={enabled}
  onChange={(e) => setEnabled(e.detail.checked)}
  label="Dark Mode"
/>
```

**Props:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Toggle state |
| `defaultChecked` | `boolean` | `false` | Initial toggle state |
| `disabled` | `boolean` | `false` | Disable switch |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Switch size |
| `label` | `string` | - | Label text |
| `name` | `string` | - | Form control name |

**Events:**
| Event Name | Detail | Description |
|-----------|--------|-------------|
| `ui-switch-change` | `{ checked: boolean }` | Fired when switch state changes |

---

## Layout Components

### Card

Container for grouped content with elevation.

**HTML Usage:**
```html
<ui-card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</ui-card>

<ui-card variant="outlined">
  <ui-card-header>Header Content</ui-card-header>
  <ui-card-body>Body Content</ui-card-body>
  <ui-card-footer>Footer Content</ui-card-footer>
</ui-card>
```

**Props:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | `'elevated'` | Card visual style |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Content padding |

**CSS Custom Properties:**
```css
--ui-card-background: #ffffff;
--ui-card-border-color: #e5e7eb;
--ui-card-border-radius: 8px;
--ui-card-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
--ui-card-padding: 16px;
```

---

### Grid

Responsive grid layout component.

**HTML Usage:**
```html
<ui-grid cols={12} gap={16}>
  <ui-grid-item cols={12} sm={6} md={4}>
    Item 1
  </ui-grid-item>
  <ui-grid-item cols={12} sm={6} md={4}>
    Item 2
  </ui-grid-item>
</ui-grid>
```

**React Usage:**
```jsx
import { UiGrid } from 'lite';

<UiGrid cols={{ xs: 12, sm: 6, md: 4, lg: 3 }} gap={24}>
  {items.map(item => (
    <div key={item.id}>{item.name}</div>
  ))}
</UiGrid>
```

**Props:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `number \| ResponsiveValue` | `12` | Number of columns |
| `gap` | `number` | `16` | Gap between items (px) |
| `autoFlow` | `'row' \| 'column' \| 'dense'` | `'row'` | Grid auto-flow direction |

---

### Stack

Flexbox container for laying out children in a row or column.

**HTML Usage:**
```html
<ui-stack direction="column" gap={16} align="center">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ui-stack>
```

**Props:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'row' \| 'column'` | `'row'` | Stack direction |
| `gap` | `number` | `8` | Gap between items (px) |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` | Align items |
| `justify` | `'start' \| 'center' \| 'end' \| 'space-between'` | `'start'` | Justify content |

---

## Overlay Components

### Modal

Dialog overlay for focused user interactions.

**HTML Usage:**
```html
<ui-modal open title="Confirm Action">
  <p>Are you sure you want to continue?</p>
  <ui-modal-footer>
    <ui-button>Cancel</ui-button>
    <ui-button variant="primary">Confirm</ui-button>
  </ui-modal-footer>
</ui-modal>
```

**React Usage:**
```jsx
import { UiModal } from 'lite';

const [open, setOpen] = useState(false);

<UiModal
  open={open}
  title="Confirm"
  onClose={() => setOpen(false)}
>
  <p>Confirmation message</p>
</UiModal>
```

**Props:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Control modal visibility |
| `title` | `string` | - | Modal title |
| `closeOnBackdrop` | `boolean` | `true` | Close when clicking backdrop |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Modal size |

**Events:**
| Event Name | Detail | Description |
|-----------|--------|-------------|
| `ui-modal-open` | `{}` | Fired when modal opens |
| `ui-modal-close` | `{}` | Fired when modal closes |

---

## CSS Custom Properties

All Lite components use CSS custom properties for theming. Here are the key properties:

### Color Properties
```css
--ui-primary-color: #3b82f6;
--ui-primary-light: #dbeafe;
--ui-secondary-color: #6b7280;
--ui-success-color: #22c55e;
--ui-warning-color: #f59e0b;
--ui-error-color: #ef4444;
--ui-info-color: #0ea5e9;
```

### Text Properties
```css
--ui-text-color: #111827;
--ui-text-secondary: #6b7280;
--ui-text-muted: #9ca3af;
--ui-font-family: system-ui, -apple-system, sans-serif;
--ui-font-size-sm: 12px;
--ui-font-size-base: 14px;
--ui-font-size-lg: 16px;
```

### Background Properties
```css
--ui-bg-color: #ffffff;
--ui-bg-light: #f9fafb;
--ui-bg-lighter: #f3f4f6;
--ui-border-color: #e5e7eb;
```

### Spacing Properties
```css
--ui-spacing-xs: 4px;
--ui-spacing-sm: 8px;
--ui-spacing-md: 16px;
--ui-spacing-lg: 24px;
--ui-spacing-xl: 32px;
```

### Border Properties
```css
--ui-border-radius-sm: 4px;
--ui-border-radius-md: 6px;
--ui-border-radius-lg: 8px;
--ui-border-width: 1px;
```

---

## TypeScript Types

```typescript
// Component Props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
}

// Responsive Values
type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Event Types
interface ButtonClickEvent extends CustomEvent {
  detail: {
    timestamp: number;
  };
}

interface SwitchChangeEvent extends CustomEvent {
  detail: {
    checked: boolean;
  };
}
```

---

## Accessibility

All Lite components are built with accessibility in mind:

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order is logical and natural
- Escape key closes overlays and modals
- Arrow keys navigate lists and menus

### Screen Reader Support
- Proper ARIA labels on all components
- ARIA live regions for dynamic content
- ARIA descriptions for complex components
- Semantic HTML structure

### Visual Accessibility
- Sufficient color contrast (WCAG AA)
- Focus indicators visible
- Reduced motion support (`prefers-reduced-motion`)
- Proper text sizing and spacing

### Form Accessibility
- All inputs have associated labels
- Error messages linked to form fields
- Required fields properly marked
- Form submission feedback provided

---

## Examples

### Building a Form with Lite

```jsx
import { UiButton, UiInput, UiStack } from 'lite';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <UiStack direction="column" gap={16}>
        <UiInput
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <UiInput
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Your message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        <UiButton variant="primary" type="submit">
          Send Message
        </UiButton>
      </UiStack>
    </form>
  );
}
```

### Creating a Responsive Layout

```jsx
import { UiGrid } from 'lite';

export function ProductGrid() {
  return (
    <UiGrid
      cols={{ xs: 12, sm: 6, md: 4, lg: 3 }}
      gap={24}
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </UiGrid>
  );
}
```

---

## Support

For more information and examples, visit:
- Documentation: https://lite.dev/docs
- Component Showcase: https://lite.dev
- GitHub: https://github.com/anthropics/lite
- Contact: hello@lite.dev
