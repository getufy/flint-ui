# Localization

Flint UI components ship with built-in localization support. All user-facing strings (aria-labels, tooltips, placeholder text) are translatable through the localization system.

## Setting the Language

Set the `lang` attribute on `<html>` to activate a language globally:

```html
<html lang="es">
```

Then import the corresponding language pack:

```ts
import '@getufy/flint-ui/translations/es';
```

That's it. All Flint components will now render in Spanish.

## Available Languages

| Code | Language | Import |
|------|----------|--------|
| `en` | English | Built-in (default) |
| `es` | Spanish | `@getufy/flint-ui/translations/es` |
| `fr` | French | `@getufy/flint-ui/translations/fr` |
| `de` | German | `@getufy/flint-ui/translations/de` |
| `pt` | Portuguese | `@getufy/flint-ui/translations/pt` |
| `ja` | Japanese | `@getufy/flint-ui/translations/ja` |

## Language Resolution

The localization controller resolves the language using this fallback chain:

1. `lang` attribute on the component itself
2. Closest ancestor element with a `lang` attribute
3. `document.documentElement.lang` (`<html lang>`)
4. `navigator.language`
5. `'en'` (English fallback)

Regional variants fall back to base languages automatically (e.g., `es-PE` falls back to `es`, then to `en`).

## Per-Component Locale Override

You can override the language on individual components:

```html
<html lang="en">
  <!-- This component renders in French -->
  <flint-date-picker lang="fr"></flint-date-picker>

  <!-- This section renders in German -->
  <div lang="de">
    <flint-select></flint-select>
    <flint-pagination></flint-pagination>
  </div>
</html>
```

## Creating a Custom Translation

To create your own translation, use `registerTranslation()`:

```ts
import { registerTranslation } from '@getufy/flint-ui';
import type { PartialTranslation } from '@getufy/flint-ui';

const ko: PartialTranslation = {
  $code: 'ko',
  $name: '한국어',
  $dir: 'ltr',

  close: '닫기',
  copy: '복사',
  search: '검색',
  // ... add as many keys as needed
  // Missing keys fall back to English automatically
};

registerTranslation(ko);
```

You don't need to provide every key. Any missing keys will fall back to the English translation.

## Overriding Specific Terms

To override specific terms in a built-in translation:

```ts
import '@getufy/flint-ui/translations/es';
import { registerTranslation } from '@getufy/flint-ui';

// Override just the terms you want to change
registerTranslation({
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',
  close: 'Cerrar ventana', // override the default 'Cerrar'
});
```

## Component Prop Overrides

Some components expose label props that take precedence over localized defaults:

```html
<!-- Uses localized default ("Rows per page:" in English) -->
<flint-table-pagination></flint-table-pagination>

<!-- Uses custom label regardless of language -->
<flint-table-pagination label-rows-per-page="Items per page:"></flint-table-pagination>
```

Components with overridable label props include:

- `flint-copy-button` — `copy-label`, `success-label`
- `flint-table-pagination` — `label-rows-per-page`
- `flint-stepper` — `back-label`, `next-label`

## Date & Number Formatting

Date and number formatting components (`flint-format-date`, `flint-format-number`, `flint-relative-time`) use the browser's `Intl` APIs directly and automatically adapt to the current locale. No language packs are needed for these components.

The date picker's month and day names also use `Intl.DateTimeFormat`, so they automatically display in the correct language.

## RTL Support

Each translation declares its text direction via the `$dir` property (`'ltr'` or `'rtl'`). When creating a translation for an RTL language like Arabic:

```ts
const ar: PartialTranslation = {
  $code: 'ar',
  $name: 'العربية',
  $dir: 'rtl',
  close: 'إغلاق',
  // ...
};
```

Components can read the current direction via `this._localize.dir()` to adjust layout as needed.

## Contributing Translations

To contribute a new language pack, create a file at `packages/core/src/translations/<code>.ts` following the pattern of the existing translations. See the [Translation interface](https://github.com/getufy/flint-ui/blob/main/packages/core/src/utilities/localize.ts) for all available keys.
