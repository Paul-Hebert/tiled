<script setup lang="ts">
import { computed } from "vue";
import type { TileData } from "../../types/tile-data";

interface Props extends TileData {
  scale: number;
  canBePlaced?: boolean;
  invalidPlacement?: boolean;
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
    class="translate-group tile-wrapper"
    :class="{ canBePlaced, placed }"
    :style="{
      '--x': offset.x,
      '--y': offset.y,
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
    <path :d="path" class="tile" :class="{ invalidPlacement }" />
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
  translate: -0.125em -0.125em;
  scale: 1.02;
}

.tile-wrapper:not(.placed) .tile {
  opacity: 0.85;
}

.tile-wrapper.placed .tile {
  animation: placed 0.15s both ease-in-out;
}

@keyframes placed {
  10% {
    translate: -0.15em -0.15em;
    scale: 1.04;
  }

  100% {
    translate: 0;
    scale: 1;
  }
}

.shadow {
  fill: hsl(var(--hue), 10%, 30%, 0.3);
  transition-property: rotate;
}

.tile-wrapper:not(.canBePlaced, .placed) .shadow {
  fill: hsl(360, 100%, 50%, 0.5);
}

.tile,
.shadow {
  transform-box: fill-box;
  transform-origin: var(--rotate-origin);
  rotate: var(--rotation);
  transition-duration: 0.1s;
  transition-timing-function: var(--move-ease);
}

.invalidPlacement {
  animation: shake-z 0.5s both;
}

@keyframes shake-z {
  0%,
  100% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  40% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(-10deg);
  }
  80% {
    transform: rotate(10deg);
  }
}
</style>
