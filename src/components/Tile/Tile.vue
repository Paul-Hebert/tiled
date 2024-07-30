<script setup lang="ts">
import { computed } from "vue";
import type { Shape } from "../../types/shape";
import { Point } from "../../types/point";

const props = defineProps<{
  shape: Shape;
  scale: number;
  x: number;
  y: number;
  placed?: boolean;
}>();

const scaledPoints = computed(() =>
  props.shape.outlinePoints.map((point) => ({
    x: point.x * props.scale,
    y: point.y * props.scale,
  }))
);

const path = computed(() => {
  const points = [...scaledPoints.value];
  const firstPoint = points.shift();
  if (!firstPoint) {
    throw new Error("Invalid shape: more than one point required in outline.");
  }

  let path = `M ${firstPoint.x} ${firstPoint.y}`;
  path += points.map((point) => `L ${point.x} ${point.y}`).join(" ");
  path += "Z";
  return path;
});
</script>

<template>
  <g :style="{ '--x': x, '--y': y, '--scale': scale }">
    <path :d="path" class="shadow" />
    <path :d="path" class="tile" :class="{ placed }" />
  </g>
</template>

<style scoped>
g {
  --hue: 120;
  translate: calc(var(--x) * var(--scale) * 1%)
    calc(var(--y) * var(--scale) * 1%);
  transition: translate 0.1s;
}

.tile {
  fill: hsl(var(--hue), 50%, 80%);
  stroke: hsl(var(--hue), 50%, 60%);
  transition: translate 0.1s;
}

.tile:not(.placed) {
  translate: -0.25em -0.25em;
}

.shadow {
  fill: hsl(var(--hue), 10%, 80%, 0.5);
}
</style>
