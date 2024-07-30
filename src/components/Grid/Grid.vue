<script setup lang="ts">
defineProps<{ size: number }>();

const scale = 10;
</script>

<template>
  <svg :viewBox="`0 0 ${scale * size} ${scale * size}`">
    <template v-for="i in size + 1">
      <line
        :x1="0"
        :x2="scale * size"
        :y1="(i - 1) * scale"
        :y2="(i - 1) * scale"
      />
      <line
        :y1="0"
        :y2="scale * size"
        :x1="(i - 1) * scale"
        :x2="(i - 1) * scale"
      />
    </template>
  </svg>
</template>

<style scoped>
svg {
  overflow: visible;
}
line {
  stroke: #ddd;
  stroke-width: 1;
  stroke-linecap: round;
}
</style>
