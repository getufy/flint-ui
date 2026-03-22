import type { PartialTranslation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: PartialTranslation = {
  $code: 'ja',
  $name: '日本語',
  $dir: 'ltr',

  close: '閉じる',
  copy: 'コピー',
  copied: 'コピーしました',
  loading: '読み込み中',
  noOptions: 'オプションが見つかりません',
  selectOption: 'オプションを選択',
  search: '検索',
  clear: 'クリア',
  clearInput: '入力をクリア',
  clearDate: '日付をクリア',
  clearRange: '範囲をクリア',
  required: '必須',
  optional: '任意',
  progress: '進捗',
  suggestions: '候補',

  numOptionsSelected: (count: number) => {
    if (count === 0) return 'オプション未選択';
    return `${count}件選択中`;
  },
  currentPage: (page: number, total: number) => `${total}ページ中${page}ページ目`,
  goToSlide: (slide: number, count: number) => `${count}枚中${slide}枚目のスライドへ`,
  starRating: (count: number) => `星${count}つ`,
  stepOfTotal: (current: number, total: number) => `${total}ステップ中${current}ステップ目`,
  removeOption: (label: string) => `${label}を削除`,

  previousMonth: '前月',
  nextMonth: '翌月',
  previousYear: '前年',
  nextYear: '翌年',
  today: '今日',
  calendar: 'カレンダー',
  datePicker: '日付選択',
  dateRangePicker: '日付範囲選択',
  selectTime: '時刻を選択',
  timePicker: '時刻選択',

  closeDialog: 'ダイアログを閉じる',
  dismissNotification: '通知を閉じる',

  noResults: '結果が見つかりません',
  searchPlaceholder: '検索...',

  previousSlide: '前のスライド',
  nextSlide: '次のスライド',

  firstPage: '最初のページ',
  lastPage: '最後のページ',
  previousPage: '前のページ',
  nextPage: '次のページ',
  pageLabel: (page: number) => `${page}ページ`,
  rowsPerPage: '表示行数:',

  cancel: 'キャンセル',
  ok: 'OK',
  back: '戻る',
  next: '次へ',

  scrollBack: '前にスクロール',
  scrollForward: '次にスクロール',
  showAllBreadcrumbs: 'すべてのパンくずリストを表示',
  goToPreviousStep: '前のステップへ',
  goToNextStep: '次のステップへ',

  moveAllRight: 'すべて右へ移動',
  moveSelectedRight: '選択項目を右へ移動',
  moveSelectedLeft: '選択項目を左へ移動',
  moveAllLeft: 'すべて左へ移動',

  typeCommandOrSearch: 'コマンドを入力または検索...',
  searchCommands: 'コマンドを検索',
  noResultsFound: '結果が見つかりません',
  commandMenu: 'コマンドメニュー',
  commandResults: 'コマンド結果',

  selectDate: '日付を選択',
  selectDateRange: '日付範囲を選択',
  openDatePicker: '日付選択を開く',

  imageComparisonSlider: '画像比較スライダー',
  speedDialActions: 'クイックアクション',
};

export default translation;
registerTranslation(translation);
