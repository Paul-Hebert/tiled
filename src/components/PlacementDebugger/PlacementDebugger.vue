<script setup lang="ts">
import type { Point } from "../../types/point";
defineProps<{
  scale: number;
  points: Point[];
}>();
</script>

<template>
  <circle
    v-for="point in points"
    :cx="(point.x + 0.5) * scale"
    :cy="(point.y + 0.5) * scale"
    :r="scale / 2"
    fill="black"
  />
</template>
