import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  close: 'Close',
  copy: 'Copy',
  loading: 'Loading',
  noOptions: 'No options found',
  selectOption: 'Select an option',
  search: 'Search',
  clear: 'Clear',
  required: 'Required',
  optional: 'Optional',

  numOptionsSelected: (count: number) => {
    if (count === 0) return 'No options selected';
    if (count === 1) return '1 option selected';
    return `${count} options selected`;
  },
  currentPage: (page: number, total: number) => `Page ${page} of ${total}`,
  goToSlide: (slide: number, count: number) => `Go to slide ${slide} of ${count}`,

  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  today: 'Today',

  closeDialog: 'Close dialog',

  noResults: 'No results found',
  searchPlaceholder: 'Search...',

  previousSlide: 'Previous slide',
  nextSlide: 'Next slide',

  firstPage: 'First page',
  lastPage: 'Last page',
  previousPage: 'Previous page',
  nextPage: 'Next page',
  pageLabel: (page: number) => `Page ${page}`,

  // Actions
  cancel: 'Cancel',
  ok: 'OK',

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
};

export default translation;
