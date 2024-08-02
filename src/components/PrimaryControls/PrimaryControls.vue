<script setup lang="ts">
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  RotateCcwIcon,
  RotateCwIcon,
} from "lucide-vue-next";
import LongPressButton from "../LongPressButton/LongPressButton.vue";
import { Commands } from "../../types/commands.ts";
defineProps<{ commands: Commands }>();
</script>

<template>
  <div class="controls">
    <LongPressButton @longPress="commands.rotateTileLeft">
      <RotateCcwIcon aria-label="Rotate counter-clockwise" />
    </LongPressButton>
    <LongPressButton @longPress="commands.moveTileUp">
      <ArrowUpIcon aria-label="Move up" />
    </LongPressButton>
    <LongPressButton @longPress="commands.rotateTileRight">
      <RotateCwIcon aria-label="Rotate clockwise" />
    </LongPressButton>
    <LongPressButton @longPress="commands.moveTileLeft">
      <ArrowLeftIcon aria-label="Move left" />
    </LongPressButton>
    <LongPressButton @longPress="commands.moveTileDown">
      <ArrowDownIcon aria-label="Move down" />
    </LongPressButton>
    <LongPressButton @longPress="commands.moveTileRight">
      <ArrowRightIcon aria-label="Move right" />
    </LongPressButton>
    <LongPressButton @longPress="commands.placeTile" class="place">
      Place Tile
    </LongPressButton>
  </div>
</template>

<style scoped>
.controls {
  display: grid;
  gap: 0.5em;
  grid-template-areas:
    "rotate-left up rotate-right"
    "left down right"
    "place place place";
}

.place {
  grid-area: place;
}
</style>
