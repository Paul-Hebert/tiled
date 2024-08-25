<script setup lang="ts">
import { random } from "randomness-helpers";
import { Grid } from "../../types/grid.ts";
defineProps<{ grid: Grid; scale: number }>();
</script>

<template>
  <g class="board">
    <template v-for="(row, y) in grid">
      <template v-for="(cell, x) in row">
        <rect
          :x="x * scale"
          :y="y * scale"
          :width="scale"
          :height="scale"
          v-if="cell !== null"
          :style="{ rotate: `${random(-1, 1)}deg` }"
        />
      </template>
    </template>
  </g>
</template>

<style scoped>
rect {
  fill: #eee;
  scale: 0.9;
  transform-origin: center;
  transform-box: fill-box;
  rx: 0.4px;
}
</style>
