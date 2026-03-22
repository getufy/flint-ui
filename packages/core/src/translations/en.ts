import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  close: 'Close',
  copy: 'Copy',
  copied: 'Copied!',
  loading: 'Loading',
  noOptions: 'No options found',
  selectOption: 'Select an option',
  search: 'Search',
  clear: 'Clear',
  clearInput: 'Clear input',
  clearDate: 'Clear date',
  clearRange: 'Clear range',
  required: 'Required',
  optional: 'Optional',
  progress: 'Progress',
  suggestions: 'Suggestions',

  numOptionsSelected: (count: number) => {
    if (count === 0) return 'No options selected';
    if (count === 1) return '1 option selected';
    return `${count} options selected`;
  },
  currentPage: (page: number, total: number) => `Page ${page} of ${total}`,
  goToSlide: (slide: number, count: number) => `Go to slide ${slide} of ${count}`,
  starRating: (count: number) => count === 1 ? '1 star' : `${count} stars`,
  stepOfTotal: (current: number, total: number) => `Step ${current} of ${total}`,
  removeOption: (label: string) => `Remove ${label}`,

  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  previousYear: 'Previous year',
  nextYear: 'Next year',
  today: 'Today',
  calendar: 'Calendar',
  datePicker: 'Date picker',
  dateRangePicker: 'Date range picker',
  selectTime: 'Select time',
  timePicker: 'Time picker',

  closeDialog: 'Close dialog',
  dismissNotification: 'Dismiss notification',

  noResults: 'No results found',
  searchPlaceholder: 'Search...',

  previousSlide: 'Previous slide',
  nextSlide: 'Next slide',

  firstPage: 'First page',
  lastPage: 'Last page',
  previousPage: 'Previous page',
  nextPage: 'Next page',
  pageLabel: (page: number) => `Page ${page}`,
  rowsPerPage: 'Rows per page:',

  // Actions
  cancel: 'Cancel',
  ok: 'OK',
  back: 'Back',
  next: 'Next',

  // Navigation
  scrollBack: 'Scroll back',
  scrollForward: 'Scroll forward',
  showAllBreadcrumbs: 'Show all breadcrumbs',
  goToPreviousStep: 'Go to previous step',
  goToNextStep: 'Go to next step',

  // Transfer list
  moveAllRight: 'Move all right',
  moveSelectedRight: 'Move selected right',
  moveSelectedLeft: 'Move selected left',
  moveAllLeft: 'Move all left',

  // Command menu
  typeCommandOrSearch: 'Type a command or search...',
  searchCommands: 'Search commands',
  noResultsFound: 'No results found',
  commandMenu: 'Command menu',
  commandResults: 'Command results',

  // Date picker
  selectDate: 'Select Date',
  selectDateRange: 'Select Date Range',
  openDatePicker: 'Open date picker',

  // Misc
  imageComparisonSlider: 'Image comparison slider',
  speedDialActions: 'Speed dial actions',
};

export default translation;
