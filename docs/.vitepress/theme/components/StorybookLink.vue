<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vitepress';

const STORYBOOK_BASE = 'https://flintui.vercel.app/storybook/';

// Maps doc page slug (from /components/{slug}) to Storybook story ID
const storybookIds: Record<string, string> = {
  'accordion': 'surfaces-accordion',
  'alert': 'feedback-alert',
  'app-bar': 'navigation-app-bar',
  'autocomplete': 'inputs-autocomplete',
  'avatar': 'data-display-avatar',
  'backdrop': 'feedback-backdrop',
  'badge': 'data-display-badge',
  'bottom-navigation': 'navigation-bottom-navigation',
  'box': 'layout-box',
  'breadcrumbs': 'navigation-breadcrumbs',
  'button': 'inputs-button',
  'card': 'surfaces-card',
  'carousel': 'data-display-carousel',
  'checkbox': 'inputs-checkbox',
  'chip': 'data-display-chip',
  'collapsible': 'surfaces-collapsible',
  'command': 'navigation-command',
  'container': 'layout-container',
  'copy-button': 'utilities-copy-button',
  'date-field': 'date-time-date-field',
  'date-picker': 'date-time-date-picker',
  'date-range-picker': 'date-time-date-range-picker',
  'dialog': 'feedback-dialog',
  'divider': 'data-display-divider',
  'drawer': 'navigation-drawer',
  'empty': 'utilities-empty',
  'fab': 'inputs-fab',
  'flint-range-slider': 'inputs-range-slider',
  'format-date': 'utilities-format-date',
  'format-number': 'utilities-format-number',
  'grid': 'layout-grid',
  'hover-card': 'data-display-hover-card',
  'image-comparer': 'data-display-image-comparer',
  'image-list': 'layout-image-list',
  'input': 'inputs-input',
  'input-otp': 'inputs-input-otp',
  'item': 'utilities-item',
  'kbd': 'utilities-kbd',
  'link': 'navigation-link',
  'list': 'data-display-list',
  'menu': 'navigation-menu',
  'menubar': 'navigation-menubar',
  'navigation-menu': 'navigation-navigation-menu',
  'pagination': 'navigation-pagination',
  'paper': 'surfaces-paper',
  'progress': 'feedback-progress',
  'radio': 'inputs-radio-group',
  'rating': 'inputs-rating',
  'relative-time': 'utilities-relative-time',
  'resizable': 'layout-resizable',
  'scroll-area': 'layout-scroll-area',
  'select': 'inputs-select',
  'skeleton': 'feedback-skeleton',
  'slider': 'inputs-slider',
  'snackbar': 'feedback-snackbar',
  'sonner': 'feedback-sonner',
  'speed-dial': 'navigation-speed-dial',
  'split-panel': 'layout-split-panel',
  'stack': 'layout-stack',
  'stepper': 'navigation-stepper',
  'switch': 'inputs-switch',
  'table': 'data-display-table',
  'tabs': 'navigation-tabs',
  'text-field': 'inputs-text-field',
  'textarea': 'inputs-textarea',
  'time-picker': 'date-time-time-picker',
  'toggle': 'inputs-toggle',
  'tooltip': 'data-display-tooltip',
  'transfer-list': 'inputs-transfer-list',
  'tree-view': 'tree-view-simple-tree-view',
  'typography': 'data-display-typography',
  'visually-hidden': 'utilities-visually-hidden',
};

const route = useRoute();

const storybookUrl = computed(() => {
  const match = route.path.match(/\/components\/([^/]+)/);
  if (!match) return null;
  const slug = match[1].replace(/\.html$/, '');
  const id = storybookIds[slug];
  if (!id) return null;
  return `${STORYBOOK_BASE}?path=/docs/${id}--docs`;
});
</script>

<template>
  <a v-if="storybookUrl" :href="storybookUrl" target="_blank" rel="noopener" class="storybook-link">
    View in Storybook &#x2197;
  </a>
</template>

<style scoped>
.storybook-link {
  display: block;
  margin-top: 16px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  transition: background 0.2s ease, color 0.2s ease;
}

.storybook-link:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
}
</style>
