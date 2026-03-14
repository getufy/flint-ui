<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import StorybookLink from './components/StorybookLink.vue';
</script>

<template>
  <DefaultTheme.Layout>
    <template #aside-outline-after>
      <StorybookLink />
    </template>
  </DefaultTheme.Layout>
</template>
