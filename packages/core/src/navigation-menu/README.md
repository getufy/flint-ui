# Navigation Menu Component

A comprehensive navigation menu component suite built with LitElement, based on Radix UI specifications. Designed for use across multiple projects with full accessibility and keyboard navigation support.

## Components

### ui-navigation-menu
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

### ui-navigation-menu-list
A flex container for menu items. Acts as the direct child of ui-navigation-menu.

**Properties:**
- `gap: number` - Space between items in pixels (default: 8)
- `direction: 'row' | 'column'` - Flex direction (default: 'row')

### ui-navigation-menu-item
Container for a menu item that groups a trigger and its content.

**Properties:**
- `itemId: string` - Unique identifier for the item
- `disabled: boolean` - Disable the entire item (default: false)

### ui-navigation-menu-trigger
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
- `ui-navigation-menu-trigger-click` - Fired when trigger is clicked
  - Detail: `{ contentId: string, open: boolean }`

### ui-navigation-menu-content
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
- `ui-navigation-menu-content-toggle` - Fired when open state changes
  - Detail: `{ contentId: string, open: boolean }`

### ui-navigation-menu-link
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
<ui-navigation-menu>
  <ui-navigation-menu-list>
    <ui-navigation-menu-item>
      <ui-navigation-menu-trigger content-id="docs">
        Documentation
      </ui-navigation-menu-trigger>
      <ui-navigation-menu-content id="docs">
        <ui-navigation-menu-link href="/docs/getting-started">
          Getting Started
        </ui-navigation-menu-link>
        <ui-navigation-menu-link href="/docs/api">
          API Reference
        </ui-navigation-menu-link>
      </ui-navigation-menu-content>
    </ui-navigation-menu-item>

    <ui-navigation-menu-item>
      <ui-navigation-menu-link href="/blog">Blog</ui-navigation-menu-link>
    </ui-navigation-menu-item>
  </ui-navigation-menu-list>
</ui-navigation-menu>
```

### Multi-Column Layout
```html
<ui-navigation-menu-content id="components">
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
    <ui-navigation-menu-link href="/components/button">
      <div>
        <div style="font-weight: 600;">Button</div>
        <div style="font-size: 12px; color: #666;">Click action</div>
      </div>
    </ui-navigation-menu-link>
    <!-- More items -->
  </div>
</ui-navigation-menu-content>
```

## CSS Custom Properties

### Navigation Menu
- `--ui-navigation-menu-padding` - Menu padding (default: 0)
- `--ui-navigation-menu-gap` - Gap between items (default: 8px)
- `--ui-navigation-menu-bg` - Background color (default: transparent)
- `--ui-navigation-menu-border` - Border style (default: none)

### Trigger
- `--ui-navigation-menu-trigger-padding` - Button padding (default: 8px 12px)
- `--ui-navigation-menu-trigger-font-size` - Font size (default: 14px)
- `--ui-navigation-menu-trigger-color` - Text color (default: inherit)
- `--ui-navigation-menu-trigger-bg` - Background (default: transparent)
- `--ui-navigation-menu-trigger-hover-bg` - Hover background (default: #f0f0f0)
- `--ui-navigation-menu-trigger-border-radius` - Border radius (default: 6px)

### Content
- `--ui-navigation-menu-content-bg` - Background color (default: white)
- `--ui-navigation-menu-content-border` - Border style (default: 1px solid #e5e7eb)
- `--ui-navigation-menu-content-border-radius` - Border radius (default: 8px)
- `--ui-navigation-menu-content-padding` - Padding (default: 16px)
- `--ui-navigation-menu-content-shadow` - Box shadow (default: 0 4px 6px rgba(0,0,0,0.1))
- `--ui-navigation-menu-content-gap` - Gap between items (default: 12px)
- `--ui-navigation-menu-content-min-width` - Minimum width (default: 200px)
- `--ui-navigation-menu-content-z-index` - Z-index (default: 1000)

### Link
- `--ui-navigation-menu-link-padding` - Link padding (default: 8px 12px)
- `--ui-navigation-menu-link-font-size` - Font size (default: 14px)
- `--ui-navigation-menu-link-color` - Text color (default: inherit)
- `--ui-navigation-menu-link-text-decoration` - Text decoration (default: none)
- `--ui-navigation-menu-link-bg` - Background (default: transparent)
- `--ui-navigation-menu-link-hover-bg` - Hover background (default: #f0f0f0)
- `--ui-navigation-menu-link-border-radius` - Border radius (default: 6px)

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
