<script setup lang="ts">
defineProps<{ gridSize: number }>();
</script>

<template>
  <div class="grid-container">
    <div class="grid-container-inner" :style="`--count: ${gridSize}`">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  container-type: inline-size;
  display: grid;
  max-height: 80svh;
  aspect-ratio: 1;
}
.grid-container-inner {
  --square-size: calc(100cqi / var(--count));
}
</style>
