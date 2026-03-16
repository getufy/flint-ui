# Using Flint UI with Angular

This guide covers how to use `@getufy/flint-ui` web components in an Angular application.

## Installation

```bash
npm install @getufy/flint-ui lit
```

## Configure Custom Elements Schema

Angular needs `CUSTOM_ELEMENTS_SCHEMA` to allow unknown HTML tags (like `flint-*`) in templates without throwing template compilation errors.

### Standalone Components (Angular 14+)

Add the schema to each component that uses Flint UI elements:

```ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@getufy/flint-ui/button/flint-button';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <flint-button variant="contained" (flint-button-click)="onClick()">
      Click me
    </flint-button>
  `,
})
export class AppComponent {
  onClick() {
    console.log('clicked');
  }
}
```

### NgModule-based

Add the schema to the module:

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Theme Setup

Import the theme CSS in your global `styles.css` (or `styles.scss`):

```css
@import '@getufy/flint-ui/theme.css';
/* Optional: dark mode */
/* @import '@getufy/flint-ui/theme-dark.css'; */
```

Or add it in `angular.json`:

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/@getufy/flint-ui/src/theme.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

## Property Binding

Use Angular's `[property]` syntax to bind dynamic values:

```ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@getufy/flint-ui/button/flint-button';

@Component({
  selector: 'app-example',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <flint-button
      [variant]="variant"
      [disabled]="isDisabled"
    >
      {{ label }}
    </flint-button>
  `,
})
export class ExampleComponent {
  variant = 'contained';
  isDisabled = false;
  label = 'Submit';
}
```

For object or array properties, bind them as JavaScript values:

```ts
@Component({
  selector: 'app-select-example',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <flint-select
      label="Fruit"
      [options]="options"
    ></flint-select>
  `,
})
export class SelectExampleComponent {
  options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ];
}
```

## Event Handling

Flint UI components dispatch `CustomEvent`s with a `flint-` prefix. Use Angular's `(event)` binding syntax:

```ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@getufy/flint-ui/input/flint-input';
import '@getufy/flint-ui/button/flint-button';

@Component({
  selector: 'app-form',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <flint-input
      placeholder="Enter your name"
      [value]="name"
      (flint-input-change)="onNameChange($event)"
    ></flint-input>

    <flint-button variant="contained" (flint-button-click)="onSubmit()">
      Submit
    </flint-button>

    <p>Hello, {{ name }}</p>
  `,
})
export class FormComponent {
  name = '';

  onNameChange(e: CustomEvent) {
    this.name = e.detail.value;
  }

  onSubmit() {
    console.log('Submitted:', this.name);
  }
}
```

**Note:** Angular event bindings with hyphens (like `(flint-input-change)`) work correctly. The parentheses bind to the DOM event name directly.

## Two-Way Binding

Angular's `[(ngModel)]` does not work with custom elements out of the box. Use the manual event + property binding pattern:

```html
<flint-input
  [value]="name"
  (flint-input-change)="name = $any($event).detail.value"
></flint-input>
```

The `$any()` cast avoids strict template type-checking errors for `CustomEvent.detail`.

## Accessing Component Methods

Use `ViewChild` to get a reference to the custom element:

```ts
import { Component, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@getufy/flint-ui/dialog/flint-dialog';

@Component({
  selector: 'app-dialog-example',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <button (click)="openDialog()">Open Dialog</button>
    <flint-dialog #dialogEl>
      <p>Dialog content</p>
    </flint-dialog>
  `,
})
export class DialogExampleComponent {
  @ViewChild('dialogEl') dialogRef!: ElementRef<HTMLElement>;

  openDialog() {
    (this.dialogRef.nativeElement as any).show();
  }
}
```

## Theming

Override CSS custom properties in `styles.css`:

```css
:root {
  --flint-primary-color: #8b5cf6;
  --flint-font-family: 'Inter', system-ui;
  --flint-border-radius-md: 8px;
}
```

Or scope to a single component:

```html
<flint-button style="--flint-primary-color: #8b5cf6">
  Purple
</flint-button>
```

## Angular SSR Considerations

Angular Universal (and the newer Angular SSR with `@angular/ssr`) runs components on the server where browser APIs like `customElements` and `HTMLElement` are not available.

### Defer Flint UI to Client-Only

Use Angular's `@defer` block (Angular 17+) to skip SSR for Flint UI components:

```html
@defer {
  <flint-button variant="contained">Click me</flint-button>
}
```

For earlier Angular versions, use `isPlatformBrowser` to conditionally render:

```ts
import { Component, Inject, PLATFORM_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <flint-button *ngIf="isBrowser" variant="contained">
      Click me
    </flint-button>
  `,
})
export class ExampleComponent {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
}
```

### Import Components Conditionally

Avoid importing Flint UI at the top level of server-rendered modules. Instead, use dynamic imports:

```ts
if (isPlatformBrowser(this.platformId)) {
  await import('@getufy/flint-ui/button/flint-button');
}
```

## TypeScript

Flint UI ships `HTMLElementTagNameMap` augmentations and typed event exports:

```ts
import type { FlintInputChangeEvent } from '@getufy/flint-ui';

onNameChange(e: FlintInputChangeEvent) {
  console.log(e.detail.value); // fully typed
}
```
