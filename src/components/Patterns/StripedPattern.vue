<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{ scale: number }>();

const relativeSize = computed(() => props.scale / 3);
</script>

<template>
  <pattern
    patternUnits="userSpaceOnUse"
    patternContentUnits="userSpaceOnUse"
    :width="relativeSize"
    :height="relativeSize"
    :view-box="`-5 -5 ${relativeSize + 5} ${relativeSize + 5}`"
  >
    <rect :width="relativeSize" :height="relativeSize" />
    <line
      :x1="relativeSize / 2"
      :y1="0"
      :x2="relativeSize / 2"
      :y2="relativeSize"
    />
  </pattern>
</template>

<style scoped>
pattern {
  overflow: visible;
  rotate: 45deg;
}
rect {
  fill: var(--fill-color);
}
line {
  stroke: var(--stroke-color);
  opacity: 0.25;
  stroke-width: 1;
  stroke-linecap: butt;
  fill: none;
}
</style>
