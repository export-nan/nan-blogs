<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), {
  label: '正在加载图片…',
});
</script>

<template>
  <div class="image-skeleton">
    <span class="image-skeleton__shimmer" aria-hidden="true"></span>
    <span class="image-skeleton__status" role="status" aria-live="polite" aria-atomic="true">{{ label }}</span>
  </div>
</template>

<style scoped>
.image-skeleton {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
  background: var(--vp-c-bg-alt, #e7e9ec);
}

.image-skeleton__shimmer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(100deg, transparent 15%, var(--vp-c-bg-elv, #fff) 50%, transparent 85%);
  opacity: .55;
  transform: translateX(-100%);
  animation: image-skeleton-shimmer 1.8s ease-in-out infinite;
}

.image-skeleton__status {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

@keyframes image-skeleton-shimmer {
  to { transform: translateX(100%); }
}

@media (prefers-reduced-motion: reduce) {
  .image-skeleton__shimmer {
    animation: none;
    opacity: 0;
  }
}
</style>
