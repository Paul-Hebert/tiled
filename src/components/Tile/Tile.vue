<script setup lang="ts">
import { computed } from "vue";
import type { TileData } from "../../types/tile-data";
import { Point } from "../../types/point.ts";

export interface TileComponentProps extends TileData {
  scale: number;
  canBePlaced?: boolean;
  invalidPlacement?: boolean;
  id: string | number;
  selected?: boolean;
  bgSprite: Point;
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

const length = computed(() => props.shape.grid.length);

const pathId = computed(() => `path-${props.id}`);
const clipId = computed(() => `clip-${props.id}`);
</script>

<template>
  <svg
    :viewBox="`0 0 ${length * scale} ${length * scale}`"
    class="transform-group tile-wrapper"
    :class="{ canBePlaced, placed }"
    :style="{
      '--x': offset.x,
      '--y': offset.y,
      '--scale': scale,
      '--rotation': `${rotation || 0}deg`,
      '--length': length,
    }"
  >
    <defs>
      <path :id="pathId" :d="path" />
      <clipPath :id="clipId">
        <use :href="`#${pathId}`" />
      </clipPath>
    </defs>
    <g class="rotate-group transform-group">
      <use :href="`#${pathId}`" class="shadow" />

      <g
        class="offset-group transform-group"
        :class="{ 'half-down': invalidPlacement }"
      >
        <g class="transform-group" :class="{ invalidPlacement }">
          <g class="tile" :class="{ selected }">
            <image
              :href="`/split-bg/row-${bgSprite.y}-column-${bgSprite.x}.jpg`"
              :clip-path="`url(#${clipId})`"
              :width="length * scale"
              :height="length * scale"
            />
            <use :href="`#${pathId}`" class="outline" />
          </g>
        </g>
      </g>

      <rect
        class="square-placeholder"
        :width="(length + 2) * scale"
        :height="(length + 2) * scale"
        :x="-1 * scale"
        :y="-1 * scale"
      />
    </g>
  </svg>
</template>

<style scoped>
svg {
  width: calc(var(--square-size) * var(--length));
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
}

.transform-group {
  transition-duration: 0.1s;
  transition-timing-function: var(--move-ease);
  transform-origin: center;
  transform-box: fill-box;
  transform-origin: center;
}

.tile-wrapper {
  --offset-distance: 5%;
  --offset-angle: calc(-135deg - var(--rotation));
  --move-ease: ease-out;

  transition-property: translate;
  translate: calc(var(--x) * var(--square-size))
    calc(var(--y) * var(--square-size));
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
  transition-timing-function: ease-out;
  transition-timing-function: 0.2s;
  transition-property: opacity, scale;
  transform-origin: center;
  transform-box: fill-box;
}

.outline {
  stroke: hsla(100deg, 40%, 50%);
  fill: none;
  stroke-width: 0.25px;
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
  fill: hsl(100deg, 10%, 30%, 0.3);
  transition-property: rotate, fill;
}

.tile-wrapper:not(.canBePlaced, .placed) .shadow {
  fill: hsl(360, 100%, 50%, 0.5);
}

.offset-group.half-down {
  --offset-distance: 2.5%;
}

.invalidPlacement {
  animation: shake-z 0.5s both;
  transform-origin: center;
}

.square-placeholder {
  opacity: 0;
}
</style>
