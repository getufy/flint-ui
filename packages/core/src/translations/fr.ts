import type { PartialTranslation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: PartialTranslation = {
  $code: 'fr',
  $name: 'Français',
  $dir: 'ltr',

  close: 'Fermer',
  copy: 'Copier',
  copied: 'Copié !',
  loading: 'Chargement',
  noOptions: 'Aucune option trouvée',
  selectOption: 'Sélectionner une option',
  search: 'Rechercher',
  clear: 'Effacer',
  clearInput: 'Effacer le champ',
  clearDate: 'Effacer la date',
  clearRange: 'Effacer la plage',
  required: 'Obligatoire',
  optional: 'Facultatif',
  progress: 'Progression',
  suggestions: 'Suggestions',

  numOptionsSelected: (count: number) => {
    if (count === 0) return 'Aucune option sélectionnée';
    if (count === 1) return '1 option sélectionnée';
    return `${count} options sélectionnées`;
  },
  currentPage: (page: number, total: number) => `Page ${page} sur ${total}`,
  goToSlide: (slide: number, count: number) => `Aller à la diapositive ${slide} sur ${count}`,
  starRating: (count: number) => count === 1 ? '1 étoile' : `${count} étoiles`,
  stepOfTotal: (current: number, total: number) => `Étape ${current} sur ${total}`,
  removeOption: (label: string) => `Supprimer ${label}`,

  previousMonth: 'Mois précédent',
  nextMonth: 'Mois suivant',
  previousYear: 'Année précédente',
  nextYear: 'Année suivante',
  today: "Aujourd'hui",
  calendar: 'Calendrier',
  datePicker: 'Sélecteur de date',
  dateRangePicker: 'Sélecteur de plage de dates',
  selectTime: "Sélectionner l'heure",
  timePicker: "Sélecteur d'heure",

  closeDialog: 'Fermer la boîte de dialogue',
  dismissNotification: 'Fermer la notification',

  noResults: 'Aucun résultat trouvé',
  searchPlaceholder: 'Rechercher...',

  previousSlide: 'Diapositive précédente',
  nextSlide: 'Diapositive suivante',

  firstPage: 'Première page',
  lastPage: 'Dernière page',
  previousPage: 'Page précédente',
  nextPage: 'Page suivante',
  pageLabel: (page: number) => `Page ${page}`,
  rowsPerPage: 'Lignes par page :',

  cancel: 'Annuler',
  ok: 'OK',
  back: 'Retour',
  next: 'Suivant',

  scrollBack: 'Défiler en arrière',
  scrollForward: 'Défiler en avant',
  showAllBreadcrumbs: "Afficher tout le fil d'Ariane",
  goToPreviousStep: "Aller à l'étape précédente",
  goToNextStep: "Aller à l'étape suivante",

  moveAllRight: 'Tout déplacer à droite',
  moveSelectedRight: 'Déplacer la sélection à droite',
  moveSelectedLeft: 'Déplacer la sélection à gauche',
  moveAllLeft: 'Tout déplacer à gauche',

  typeCommandOrSearch: 'Saisir une commande ou rechercher...',
  searchCommands: 'Rechercher des commandes',
  noResultsFound: 'Aucun résultat trouvé',
  commandMenu: 'Menu de commandes',
  commandResults: 'Résultats des commandes',

  selectDate: 'Sélectionner une date',
  selectDateRange: 'Sélectionner une plage de dates',
  openDatePicker: 'Ouvrir le sélecteur de date',

  imageComparisonSlider: 'Curseur de comparaison d\'images',
  speedDialActions: 'Actions rapides',
};

export default translation;
registerTranslation(translation);
