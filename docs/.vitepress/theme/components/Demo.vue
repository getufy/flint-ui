<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  label: { type: String, default: '' },
});

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <div class="demo-wrapper">
    <p v-if="label" class="demo-label">{{ label }}</p>
    <div v-if="mounted" class="demo-container">
      <slot />
    </div>
    <div v-else class="demo-container demo-placeholder">
      Loading...
    </div>
  </div>
</template>

<style scoped>
.demo-wrapper {
  margin: 16px 0 24px;
}

.demo-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin: 0 0 8px;
}

.demo-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 24px;
  background: var(--vp-c-bg);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.demo-placeholder {
  color: var(--vp-c-text-3);
  font-size: 14px;
  min-height: 60px;
  justify-content: center;
}
</style>
