import type { PartialTranslation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: PartialTranslation = {
  $code: 'pt',
  $name: 'Português',
  $dir: 'ltr',

  close: 'Fechar',
  copy: 'Copiar',
  copied: 'Copiado!',
  loading: 'Carregando',
  noOptions: 'Nenhuma opção encontrada',
  selectOption: 'Selecionar uma opção',
  search: 'Pesquisar',
  clear: 'Limpar',
  clearInput: 'Limpar campo',
  clearDate: 'Limpar data',
  clearRange: 'Limpar intervalo',
  required: 'Obrigatório',
  optional: 'Opcional',
  progress: 'Progresso',
  suggestions: 'Sugestões',

  numOptionsSelected: (count: number) => {
    if (count === 0) return 'Nenhuma opção selecionada';
    if (count === 1) return '1 opção selecionada';
    return `${count} opções selecionadas`;
  },
  currentPage: (page: number, total: number) => `Página ${page} de ${total}`,
  goToSlide: (slide: number, count: number) => `Ir para o slide ${slide} de ${count}`,
  starRating: (count: number) => count === 1 ? '1 estrela' : `${count} estrelas`,
  stepOfTotal: (current: number, total: number) => `Passo ${current} de ${total}`,
  removeOption: (label: string) => `Remover ${label}`,

  previousMonth: 'Mês anterior',
  nextMonth: 'Próximo mês',
  previousYear: 'Ano anterior',
  nextYear: 'Próximo ano',
  today: 'Hoje',
  calendar: 'Calendário',
  datePicker: 'Seletor de data',
  dateRangePicker: 'Seletor de intervalo de datas',
  selectTime: 'Selecionar hora',
  timePicker: 'Seletor de hora',

  closeDialog: 'Fechar diálogo',
  dismissNotification: 'Dispensar notificação',

  noResults: 'Nenhum resultado encontrado',
  searchPlaceholder: 'Pesquisar...',

  previousSlide: 'Slide anterior',
  nextSlide: 'Próximo slide',

  firstPage: 'Primeira página',
  lastPage: 'Última página',
  previousPage: 'Página anterior',
  nextPage: 'Próxima página',
  pageLabel: (page: number) => `Página ${page}`,
  rowsPerPage: 'Linhas por página:',

  cancel: 'Cancelar',
  ok: 'OK',
  back: 'Voltar',
  next: 'Próximo',

  scrollBack: 'Rolar para trás',
  scrollForward: 'Rolar para frente',
  showAllBreadcrumbs: 'Mostrar todas as migalhas',
  goToPreviousStep: 'Ir para o passo anterior',
  goToNextStep: 'Ir para o próximo passo',

  moveAllRight: 'Mover tudo para a direita',
  moveSelectedRight: 'Mover seleção para a direita',
  moveSelectedLeft: 'Mover seleção para a esquerda',
  moveAllLeft: 'Mover tudo para a esquerda',

  typeCommandOrSearch: 'Digite um comando ou pesquise...',
  searchCommands: 'Pesquisar comandos',
  noResultsFound: 'Nenhum resultado encontrado',
  commandMenu: 'Menu de comandos',
  commandResults: 'Resultados dos comandos',

  selectDate: 'Selecionar data',
  selectDateRange: 'Selecionar intervalo de datas',
  openDatePicker: 'Abrir seletor de data',

  imageComparisonSlider: 'Controle deslizante de comparação de imagens',
  speedDialActions: 'Ações de acesso rápido',
};

export default translation;
registerTranslation(translation);
