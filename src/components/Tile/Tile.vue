<script setup lang="ts">
import { computed } from "vue";
import type { TileData } from "../../types/tile-data";
import StripedPattern from "../Patterns/StripedPattern.vue";

interface Props extends TileData {
  scale: number;
  canBePlaced?: boolean;
  invalidPlacement?: boolean;
  id: number;
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

const squareSize = computed(() => props.shape.grid.length);

const patternId = computed(() => `pattern-${props.id}`);
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
    }"
  >
    <defs>
      <StripedPattern :scale="scale" :id="patternId" />
    </defs>
    <g class="rotate-group translate-group">
      <path :d="path" class="shadow" />

      <g
        class="offset-group translate-group"
        :class="{ 'half-down': invalidPlacement }"
      >
        <g class="translate-group" :class="{ invalidPlacement }">
          <path :d="path" class="tile" :fill="`url(#${patternId})`" />
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
.translate-group {
  transition-duration: 0.1s;
  transition-timing-function: var(--move-ease);
  transform-origin: center;
  transform-box: fill-box;
  transform-origin: center;
}

.tile-wrapper {
  --offset-distance: 0.125em;
  --offset-angle: calc(-135deg - var(--rotation));
  --move-ease: ease-out;

  --fill-color: hsl(var(--hue), 50%, 80%);
  --stroke-color: hsl(var(--hue), 50%, 60%);

  transition-property: translate;
  translate: calc(var(--x) * var(--scale) * 1%)
    calc(var(--y) * var(--scale) * 1%);
  transform-box: initial;
}

.rotate-group {
  transition-property: rotate;
  rotate: var(--rotation);
}

.offset-group {
  transition-property: translate;
  translate: calc(cos(var(--offset-angle)) * var(--offset-distance))
    calc(sin(var(--offset-angle)) * var(--offset-distance));
}

.tile {
  stroke: var(--stroke-color);
  stroke-width: 0.5px;
  transition-property: opacity, scale;
  transform-origin: center;
  transform-box: fill-box;
}

.tile-wrapper:not(.placed) .tile {
  opacity: 0.85;
  scale: 1.02;
}

.tile-wrapper.placed .offset-group {
  --offset-distance: 0;
}

.shadow {
  fill: hsl(var(--hue), 10%, 30%, 0.3);
  transition-property: rotate;
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
