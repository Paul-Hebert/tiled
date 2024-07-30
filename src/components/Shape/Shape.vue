<script setup lang="ts">
import { computed } from "vue";
type bit = 0 | 1;
const props = defineProps<{
  // e.g.
  // 1 0 0
  // 1 1 1
  // 0 0 1
  shape: Array<Array<bit>>;
  scale: number;
  x: number;
  y: number;
}>();

const height = computed(() => props.shape.length);
const width = computed(() => props.shape[0].length);

const id = "clip-" + crypto.randomUUID();
</script>

<template>
  <g :style="{ '--x': x, '--y': y, '--scale': scale }">
    <defs>
      <clipPath :id="id">
        <template v-for="(row, yIndex) in props.shape">
          <template v-for="(cell, xIndex) in row">
            <rect
              :x="xIndex * scale"
              :y="yIndex * scale"
              :width="scale"
              :height="scale"
              v-if="cell"
            />
          </template>
        </template>
      </clipPath>
    </defs>
    <rect
      :width="width * scale"
      :height="height * scale"
      :clip-path="`url(#${id})`"
    />
  </g>
</template>

<style scoped>
g {
  translate: calc(var(--x) * var(--scale) * 1%)
    calc(var(--y) * var(--scale) * 1%);
  transition: translate 0.1s;
}

rect {
  fill: #ccc;
  filter: drop-shadow(0 0 0.5rem #000);
}
</style>
