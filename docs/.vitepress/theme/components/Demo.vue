<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { componentsReady } from '../register';

const props = defineProps({
  label: { type: String, default: '' },
  html: { type: String, default: '' },
});

const container = ref<HTMLElement | null>(null);
const mounted = ref(false);

onMounted(async () => {
  mounted.value = true;

  // Wait for Lit custom elements to be registered
  await componentsReady;
  await nextTick();

  if (container.value && props.html) {
    // Inject raw HTML to bypass Vue's VDOM management.
    // This lets Lit own the entire DOM subtree (events, shadow DOM, etc.)
    container.value.innerHTML = props.html;

    // Wait for all custom elements in the container to be defined & upgraded
    const undefinedEls = container.value.querySelectorAll(':not(:defined)');
    if (undefinedEls.length > 0) {
      const tags = new Set(Array.from(undefinedEls).map(el => el.tagName.toLowerCase()));
      await Promise.all([...tags].map(tag => customElements.whenDefined(tag)));
    }

    // Set array properties from data-options="value:label,value:label,..."
    container.value.querySelectorAll('[data-options]').forEach((el) => {
      const raw = el.getAttribute('data-options') || '';
      const options = raw.split(',').map((pair) => {
        const [value, ...labelParts] = pair.split(':');
        return { value: value.trim(), label: labelParts.join(':').trim() };
      });
      (el as any).options = options;
    });
  }
});
</script>

<template>
  <div class="demo-wrapper">
    <p v-if="label" class="demo-label">{{ label }}</p>
    <div v-if="mounted" ref="container" class="demo-container"></div>
    <div v-else class="demo-container demo-placeholder">Loading...</div>
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
}

.demo-placeholder {
  color: var(--vp-c-text-3);
  font-size: 14px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
