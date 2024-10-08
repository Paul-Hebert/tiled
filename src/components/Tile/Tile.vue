<script setup lang="ts">
import { computed } from "vue";
import type { TileData } from "../../types/tile-data";
import StripedPattern from "../Patterns/StripedPattern.vue";

export interface TileComponentProps extends TileData {
  scale: number;
  canBePlaced?: boolean;
  invalidPlacement?: boolean;
  id: number;
  selected?: boolean;
  gridSize: number;
}

const props = defineProps<TileComponentProps>();

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

const squareSize = computed(() => props.shape.grid.length);

const patternId = computed(() => `pattern-${props.id}`);
</script>

<template>
  <g
    class="transform-group tile-wrapper"
    :class="{ canBePlaced, placed }"
    :style="{
      '--x': offset.x,
      '--y': offset.y,
      '--scale': scale,
      '--hue': hue,
      '--rotation': `${rotation || 0}deg`,
      '--grid-size': gridSize,
    }"
  >
    <defs>
      <StripedPattern :scale="scale" :id="patternId" />
    </defs>
    <g class="rotate-group transform-group">
      <path :d="path" class="shadow" />

      <g
        class="offset-group transform-group"
        :class="{ 'half-down': invalidPlacement }"
      >
        <g class="transform-group" :class="{ invalidPlacement }">
          <path
            :d="path"
            class="tile"
            :class="{ selected }"
            :fill="`url(#${patternId})`"
          />
        </g>
      </g>

      <rect
        class="square-placeholder"
        :width="(squareSize + 2) * scale"
        :height="(squareSize + 2) * scale"
        :x="-1 * scale"
        :y="-1 * scale"
      />
    </g>
  </g>
</template>

<style scoped>
.transform-group {
  transition-duration: 0.1s;
  transition-timing-function: var(--move-ease);
  transform-origin: center;
  transform-box: fill-box;
  transform-origin: center;

  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-in-out-back: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.tile-wrapper {
  --offset-distance: 0.125em;
  --offset-angle: calc(-135deg - var(--rotation));
  --move-ease: ease-out;

  --fill-color: hsl(var(--hue), 50%, 80%);
  --stroke-color: hsl(var(--hue), 50%, 60%);

  --scale-modifier: calc(100% / var(--grid-size));

  transition-property: translate;
  translate: calc(var(--x) * var(--scale-modifier))
    calc(var(--y) * var(--scale-modifier));
  transform-box: initial;
}

.rotate-group {
  transition-property: rotate;
  rotate: var(--rotation);
}

.offset-group {
  transition-delay: 0.025s;
  transition-property: translate;
  translate: calc(cos(var(--offset-angle)) * var(--offset-distance))
    calc(sin(var(--offset-angle)) * var(--offset-distance));
}

.rotate-group,
.offset-group {
  transition-timing-function: var(--ease-out-back);
  transition-duration: 0.2s;
}

.tile {
  stroke: var(--stroke-color);
  stroke-width: 0.25px;
  transition-timing-function: ease-out;
  transition-timing-function: 0.2s;
  transition-property: opacity, scale;
  transform-origin: center;
  transform-box: fill-box;
}

.tile.selected {
  animation: tile-selected 0.3s ease-out;
}

.tile-wrapper.placed :is(.tile, .offset-group) {
  transition-timing-function: var(--ease-in-out-back);
  transition-duration: 0.2s;
}

.tile-wrapper:not(.placed) .tile {
  opacity: 0.85;
  scale: 1.02;
}

@keyframes tile-selected {
  from {
    opacity: 0.25;
    scale: 1.25;
  }
}

.tile-wrapper.placed .offset-group {
  --offset-distance: 0;
}

.shadow {
  fill: hsl(var(--hue), 10%, 30%, 0.3);
  transition-property: rotate, fill;
}

.tile-wrapper:not(.canBePlaced, .placed) .shadow {
  fill: hsl(360, 100%, 50%, 0.5);
}

.offset-group.half-down {
  --offset-distance: 0.075em;
}

.invalidPlacement {
  animation: shake-z 0.5s both;
  transform-origin: center;
}

@keyframes shake-z {
  0%,
  100% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  40% {
    transform: rotate(8deg);
  }
  60% {
    transform: rotate(-8deg);
  }
  80% {
    transform: rotate(8deg);
  }
}

.square-placeholder {
  opacity: 0;
}
</style>
