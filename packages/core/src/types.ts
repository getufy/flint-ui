// ── Shared types used across multiple components ────────────────────
export type Size = 'sm' | 'md' | 'lg';
export type Orientation = 'horizontal' | 'vertical';
export type Placement = 'top' | 'right' | 'bottom' | 'left';
export type TabPlacement = 'top' | 'bottom' | 'start' | 'end';

// ── Layout breakpoints ──────────────────────────────────────────────
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;
