<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import DefaultTheme from 'vitepress/theme';
import StorybookLink from './components/StorybookLink.vue';

// Sync VitePress `.dark` class with Flint UI `.flint-theme-dark`
let observer: MutationObserver | undefined;

function syncDarkClass() {
  document.documentElement.classList.toggle(
    'flint-theme-dark',
    document.documentElement.classList.contains('dark'),
  );
}

onMounted(() => {
  syncDarkClass();
  observer = new MutationObserver(syncDarkClass);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <DefaultTheme.Layout>
    <template #aside-outline-after>
      <StorybookLink />
    </template>

    <template #not-found>
      <div class="not-found">
        <p class="code">404</p>
        <h1 class="title">Page not found</h1>
        <p class="description">The page you're looking for doesn't exist or has been moved.</p>
        <div class="actions">
          <a href="/" class="link">Go to Home</a>
          <a href="/components/button" class="link">Browse Components</a>
        </div>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 64px 24px;
}

.not-found .code {
  font-size: 64px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0;
  line-height: 1;
}

.not-found .title {
  font-size: 24px;
  font-weight: 600;
  margin: 16px 0 8px;
  color: var(--vp-c-text-1);
}

.not-found .description {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0 0 32px;
}

.not-found .actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.not-found .link {
  display: inline-block;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  text-decoration: none;
  color: #fff;
  background: var(--vp-c-brand-1);
  transition: background 0.2s ease;
}

.not-found .link:hover {
  background: var(--vp-c-brand-2);
}
</style>
