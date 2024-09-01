<script setup lang="ts">
import { computed } from "vue";
import TileBackgroundImage from "../../images/tile-background-shrunk.jpg";
import { random } from "randomness-helpers";
const props = defineProps<{ scale: number }>();

const relativeSize = computed(() => props.scale * 5);
</script>

<template>
  <image
    :href="TileBackgroundImage"
    :x="(relativeSize / random(2, 10)) * -1"
    :y="(relativeSize / random(2, 10)) * -1"
    :width="relativeSize"
    :height="relativeSize"
  />
</template>

<style scoped></style>
