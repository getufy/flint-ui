import type { PartialTranslation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: PartialTranslation = {
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  close: 'Schließen',
  copy: 'Kopieren',
  copied: 'Kopiert!',
  loading: 'Wird geladen',
  noOptions: 'Keine Optionen gefunden',
  selectOption: 'Option auswählen',
  search: 'Suchen',
  clear: 'Löschen',
  clearInput: 'Eingabe löschen',
  clearDate: 'Datum löschen',
  clearRange: 'Bereich löschen',
  required: 'Erforderlich',
  optional: 'Optional',
  progress: 'Fortschritt',
  suggestions: 'Vorschläge',

  numOptionsSelected: (count: number) => {
    if (count === 0) return 'Keine Optionen ausgewählt';
    if (count === 1) return '1 Option ausgewählt';
    return `${count} Optionen ausgewählt`;
  },
  currentPage: (page: number, total: number) => `Seite ${page} von ${total}`,
  goToSlide: (slide: number, count: number) => `Gehe zu Folie ${slide} von ${count}`,
  starRating: (count: number) => count === 1 ? '1 Stern' : `${count} Sterne`,
  stepOfTotal: (current: number, total: number) => `Schritt ${current} von ${total}`,
  removeOption: (label: string) => `${label} entfernen`,

  previousMonth: 'Vorheriger Monat',
  nextMonth: 'Nächster Monat',
  previousYear: 'Vorheriges Jahr',
  nextYear: 'Nächstes Jahr',
  today: 'Heute',
  calendar: 'Kalender',
  datePicker: 'Datumsauswahl',
  dateRangePicker: 'Datumsbereichsauswahl',
  selectTime: 'Uhrzeit auswählen',
  timePicker: 'Zeitauswahl',

  closeDialog: 'Dialog schließen',
  dismissNotification: 'Benachrichtigung schließen',

  noResults: 'Keine Ergebnisse gefunden',
  searchPlaceholder: 'Suchen...',

  previousSlide: 'Vorherige Folie',
  nextSlide: 'Nächste Folie',

  firstPage: 'Erste Seite',
  lastPage: 'Letzte Seite',
  previousPage: 'Vorherige Seite',
  nextPage: 'Nächste Seite',
  pageLabel: (page: number) => `Seite ${page}`,
  rowsPerPage: 'Zeilen pro Seite:',

  cancel: 'Abbrechen',
  ok: 'OK',
  back: 'Zurück',
  next: 'Weiter',

  scrollBack: 'Zurück scrollen',
  scrollForward: 'Vorwärts scrollen',
  showAllBreadcrumbs: 'Alle Breadcrumbs anzeigen',
  goToPreviousStep: 'Zum vorherigen Schritt',
  goToNextStep: 'Zum nächsten Schritt',

  moveAllRight: 'Alle nach rechts verschieben',
  moveSelectedRight: 'Auswahl nach rechts verschieben',
  moveSelectedLeft: 'Auswahl nach links verschieben',
  moveAllLeft: 'Alle nach links verschieben',

  typeCommandOrSearch: 'Befehl eingeben oder suchen...',
  searchCommands: 'Befehle suchen',
  noResultsFound: 'Keine Ergebnisse gefunden',
  commandMenu: 'Befehlsmenü',
  commandResults: 'Befehlsergebnisse',

  selectDate: 'Datum auswählen',
  selectDateRange: 'Datumsbereich auswählen',
  openDatePicker: 'Datumsauswahl öffnen',

  imageComparisonSlider: 'Bildvergleichs-Schieberegler',
  speedDialActions: 'Schnellzugriffsaktionen',
};

export default translation;
registerTranslation(translation);
