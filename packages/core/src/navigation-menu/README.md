# Navigation Menu Component

A comprehensive navigation menu component suite built with LitElement, based on Radix UI specifications. Designed for use across multiple projects with full accessibility and keyboard navigation support.

## Components

### flint-navigation-menu
The root container for the navigation menu system. Manages the state of open/closed content and handles click-outside behavior.

**Features:**
- Manages single open content at a time
- Closes menus on click outside
- RTL support
- Event delegation for content toggling

**Properties:**
- `dir: 'ltr' | 'rtl'` - Text direction (default: 'ltr')

**Methods:**
- `openContent(contentId: string)` - Manually open a content panel
- `closeAll()` - Close all open content

### flint-navigation-menu-list
A flex container for menu items. Acts as the direct child of flint-navigation-menu.

**Properties:**
- `gap: number` - Space between items in pixels (default: 8)
- `direction: 'row' | 'column'` - Flex direction (default: 'row')

### flint-navigation-menu-item
Container for a menu item that groups a trigger and its content.

**Properties:**
- `itemId: string` - Unique identifier for the item
- `disabled: boolean` - Disable the entire item (default: false)

### flint-navigation-menu-trigger
Clickable button that opens/closes the associated content panel.

**Features:**
- Click to toggle content visibility
- Keyboard navigation: Enter, Space, ArrowDown
- Proper ARIA attributes (aria-expanded, aria-haspopup, aria-controls)
- Dropdown indicator icon
- Disabled state support

**Properties:**
- `contentId: string` - ID of the associated content element
- `disabled: boolean` - Disable the trigger (default: false)

**Events:**
- `flint-navigation-menu-trigger-click` - Fired when trigger is clicked
  - Detail: `{ contentId: string, open: boolean }`

### flint-navigation-menu-content
Dropdown content panel that appears when a trigger is activated.

**Features:**
- Auto-positioning below trigger
- Keyboard navigation: Escape, Arrow keys, Home, End
- Smooth slide-down animation
- Respects prefers-reduced-motion
- Focus management

**Properties:**
- `id: string` - Unique identifier (required)
- `open: boolean` - Control visibility (default: false)
- `dir: 'ltr' | 'rtl'` - Text direction
- `gap: number` - Space between items (default: 12)

**Events:**
- `flint-navigation-menu-content-toggle` - Fired when open state changes
  - Detail: `{ contentId: string, open: boolean }`

### flint-navigation-menu-link
Direct navigation link item. Use instead of a trigger for simple links without dropdown content.

**Features:**
- Full keyboard accessibility
- Support for target attribute (e.g., '_blank')
- Disabled state with proper visual feedback
- Proper link semantics with role="menuitem"

**Properties:**
- `href: string` - Link URL
- `target: string` - Link target (e.g., '_blank')
- `title: string` - Link title/tooltip
- `disabled: boolean` - Disable the link (default: false)

## Usage Examples

### Basic Menu with Dropdown
```html
<flint-navigation-menu>
  <flint-navigation-menu-list>
    <flint-navigation-menu-item>
      <flint-navigation-menu-trigger content-id="docs">
        Documentation
      </flint-navigation-menu-trigger>
      <flint-navigation-menu-content id="docs">
        <flint-navigation-menu-link href="/docs/getting-started">
          Getting Started
        </flint-navigation-menu-link>
        <flint-navigation-menu-link href="/docs/api">
          API Reference
        </flint-navigation-menu-link>
      </flint-navigation-menu-content>
    </flint-navigation-menu-item>

    <flint-navigation-menu-item>
      <flint-navigation-menu-link href="/blog">Blog</flint-navigation-menu-link>
    </flint-navigation-menu-item>
  </flint-navigation-menu-list>
</flint-navigation-menu>
```

### Multi-Column Layout
```html
<flint-navigation-menu-content id="components">
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
    <flint-navigation-menu-link href="/components/button">
      <div>
        <div style="font-weight: 600;">Button</div>
        <div style="font-size: 12px; color: #666;">Click action</div>
      </div>
    </flint-navigation-menu-link>
    <!-- More items -->
  </div>
</flint-navigation-menu-content>
```

## CSS Custom Properties

### Navigation Menu
- `--flint-navigation-menu-padding` - Menu padding (default: 0)
- `--flint-navigation-menu-gap` - Gap between items (default: 8px)
- `--flint-navigation-menu-bg` - Background color (default: transparent)
- `--flint-navigation-menu-border` - Border style (default: none)

### Trigger
- `--flint-navigation-menu-trigger-padding` - Button padding (default: 8px 12px)
- `--flint-navigation-menu-trigger-font-size` - Font size (default: 14px)
- `--flint-navigation-menu-trigger-color` - Text color (default: inherit)
- `--flint-navigation-menu-trigger-bg` - Background (default: transparent)
- `--flint-navigation-menu-trigger-hover-bg` - Hover background (default: #f0f0f0)
- `--flint-navigation-menu-trigger-border-radius` - Border radius (default: 6px)

### Content
- `--flint-navigation-menu-content-bg` - Background color (default: white)
- `--flint-navigation-menu-content-border` - Border style (default: 1px solid #e5e7eb)
- `--flint-navigation-menu-content-border-radius` - Border radius (default: 8px)
- `--flint-navigation-menu-content-padding` - Padding (default: 16px)
- `--flint-navigation-menu-content-shadow` - Box shadow (default: 0 4px 6px rgba(0,0,0,0.1))
- `--flint-navigation-menu-content-gap` - Gap between items (default: 12px)
- `--flint-navigation-menu-content-min-width` - Minimum width (default: 200px)
- `--flint-navigation-menu-content-z-index` - Z-index (default: 1000)

### Link
- `--flint-navigation-menu-link-padding` - Link padding (default: 8px 12px)
- `--flint-navigation-menu-link-font-size` - Font size (default: 14px)
- `--flint-navigation-menu-link-color` - Text color (default: inherit)
- `--flint-navigation-menu-link-text-decoration` - Text decoration (default: none)
- `--flint-navigation-menu-link-bg` - Background (default: transparent)
- `--flint-navigation-menu-link-hover-bg` - Hover background (default: #f0f0f0)
- `--flint-navigation-menu-link-border-radius` - Border radius (default: 6px)

## Accessibility

### Keyboard Navigation
- **Trigger:**
  - `Enter` or `Space` - Open/close content
  - `ArrowDown` - Move focus to first item in content

- **Content:**
  - `Escape` - Close content and focus trigger
  - `ArrowUp` / `ArrowDown` - Navigate between items
  - `Home` - Jump to first item
  - `End` - Jump to last item

### ARIA Attributes
- Trigger has `aria-expanded`, `aria-haspopup`, and `aria-controls`
- Content has `role="menu"`
- Links have `role="menuitem"`
- Disabled state marked with `aria-disabled`

### Focus Management
- Proper focus trapping within menus
- Focus returns to trigger when closing with Escape
- Tab navigation works correctly

## Testing

The component includes comprehensive test coverage:
- Component rendering
- Click and keyboard interactions
- State management
- Accessibility features
- Event dispatching
- Disabled states

Run tests:
```bash
npm test
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## References

- Based on [Radix UI Navigation Menu](https://www.radix-ui.com/docs/primitives/components/navigation-menu)
- WAI-ARIA Navigation Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
