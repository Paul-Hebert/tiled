<script setup lang="ts">
import { computed } from "vue";
import type { TileData } from "../../types/tile-data";

interface Props extends TileData {
  scale: number;
}

const props = defineProps<Props>();

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
  <g
    class="translate-group"
    :style="{
      '--x': x,
      '--y': y,
      '--scale': scale,
      '--hue': hue,
      '--rotation': `${rotation || 0}deg`,
      '--rotate-origin': props.shape.rotationPoint
        ? `${(0.5 + props.shape.rotationPoint.x) * scale}px ${
            (0.5 + props.shape.rotationPoint.y) * scale
          }px`
        : 'center',
    }"
  >
    <path :d="path" class="shadow" />
    <path :d="path" class="tile" :class="{ placed }" />
  </g>
</template>

<style scoped>
g {
  --move-ease: ease-out;

  transition-duration: 0.1s;
  transition-timing-function: var(--move-ease);
  transform-origin: center;
}

.translate-group {
  transition-property: translate;
  translate: calc(var(--x) * var(--scale) * 1%)
    calc(var(--y) * var(--scale) * 1%);
}

.tile {
  fill: hsl(var(--hue), 50%, 80%);
  stroke: hsl(var(--hue), 50%, 60%);
  stroke-width: 0.5px;
  transition-property: translate, opacity, rotate, scale;
}

.tile:not(.placed) {
  translate: -0.125em -0.125em;
  scale: 1.02;
  opacity: 0.85;
}

.shadow {
  fill: hsl(var(--hue), 10%, 30%, 0.3);
  rotate: var(--rotation);
  transition-property: rotate;
}

.tile,
.shadow {
  transform-box: fill-box;
  transform-origin: var(--rotate-origin);
  rotate: var(--rotation);
  transition-duration: 0.1s;
  transition-timing-function: var(--move-ease);
}
</style>
