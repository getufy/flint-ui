import type { PartialTranslation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: PartialTranslation = {
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  close: 'Cerrar',
  copy: 'Copiar',
  copied: '¡Copiado!',
  loading: 'Cargando',
  noOptions: 'No se encontraron opciones',
  selectOption: 'Seleccionar una opción',
  search: 'Buscar',
  clear: 'Limpiar',
  clearInput: 'Limpiar campo',
  clearDate: 'Limpiar fecha',
  clearRange: 'Limpiar rango',
  required: 'Obligatorio',
  optional: 'Opcional',
  progress: 'Progreso',
  suggestions: 'Sugerencias',

  numOptionsSelected: (count: number) => {
    if (count === 0) return 'Ninguna opción seleccionada';
    if (count === 1) return '1 opción seleccionada';
    return `${count} opciones seleccionadas`;
  },
  currentPage: (page: number, total: number) => `Página ${page} de ${total}`,
  goToSlide: (slide: number, count: number) => `Ir a la diapositiva ${slide} de ${count}`,
  starRating: (count: number) => count === 1 ? '1 estrella' : `${count} estrellas`,
  stepOfTotal: (current: number, total: number) => `Paso ${current} de ${total}`,
  removeOption: (label: string) => `Eliminar ${label}`,

  previousMonth: 'Mes anterior',
  nextMonth: 'Mes siguiente',
  previousYear: 'Año anterior',
  nextYear: 'Año siguiente',
  today: 'Hoy',
  calendar: 'Calendario',
  datePicker: 'Selector de fecha',
  dateRangePicker: 'Selector de rango de fechas',
  selectTime: 'Seleccionar hora',
  timePicker: 'Selector de hora',

  closeDialog: 'Cerrar diálogo',
  dismissNotification: 'Descartar notificación',

  noResults: 'No se encontraron resultados',
  searchPlaceholder: 'Buscar...',

  previousSlide: 'Diapositiva anterior',
  nextSlide: 'Diapositiva siguiente',

  firstPage: 'Primera página',
  lastPage: 'Última página',
  previousPage: 'Página anterior',
  nextPage: 'Página siguiente',
  pageLabel: (page: number) => `Página ${page}`,
  rowsPerPage: 'Filas por página:',

  cancel: 'Cancelar',
  ok: 'Aceptar',
  back: 'Atrás',
  next: 'Siguiente',

  scrollBack: 'Desplazar atrás',
  scrollForward: 'Desplazar adelante',
  showAllBreadcrumbs: 'Mostrar todas las rutas',
  goToPreviousStep: 'Ir al paso anterior',
  goToNextStep: 'Ir al paso siguiente',

  moveAllRight: 'Mover todo a la derecha',
  moveSelectedRight: 'Mover selección a la derecha',
  moveSelectedLeft: 'Mover selección a la izquierda',
  moveAllLeft: 'Mover todo a la izquierda',

  typeCommandOrSearch: 'Escriba un comando o busque...',
  searchCommands: 'Buscar comandos',
  noResultsFound: 'No se encontraron resultados',
  commandMenu: 'Menú de comandos',
  commandResults: 'Resultados de comandos',

  selectDate: 'Seleccionar fecha',
  selectDateRange: 'Seleccionar rango de fechas',
  openDatePicker: 'Abrir selector de fecha',

  imageComparisonSlider: 'Control deslizante de comparación de imágenes',
  speedDialActions: 'Acciones de acceso rápido',
};

export default translation;
registerTranslation(translation);
