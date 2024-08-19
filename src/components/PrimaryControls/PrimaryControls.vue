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
import Button from "../Button/Button.vue";
import { useCommands } from "../../composables/use-commands";

const commands = useCommands();
</script>

<template>
  <div class="primary-controls">
    <LongPressButton @longPress="commands.rotateTileLeft" class="rotate-left">
      <RotateCcwIcon aria-label="Rotate counter-clockwise" />
    </LongPressButton>
    <LongPressButton @longPress="commands.moveTileUp" class="up">
      <ArrowUpIcon aria-label="Move up" />
    </LongPressButton>
    <LongPressButton @longPress="commands.rotateTileRight" class="rotate-right">
      <RotateCwIcon aria-label="Rotate clockwise" />
    </LongPressButton>
    <LongPressButton @longPress="commands.moveTileLeft" class="left">
      <ArrowLeftIcon aria-label="Move left" />
    </LongPressButton>
    <LongPressButton @longPress="commands.moveTileDown" class="down">
      <ArrowDownIcon aria-label="Move down" />
    </LongPressButton>
    <LongPressButton @longPress="commands.moveTileRight" class="right">
      <ArrowRightIcon aria-label="Move right" />
    </LongPressButton>
    <Button @click="commands.changeTile" class="change"> Change Tile </Button>
    <Button @click="commands.placeTile" class="place"> Place Tile </Button>
  </div>
</template>

<style scoped>
.primary-controls {
  width: 100%;
  display: grid;
  gap: 0.5em;
  grid-template-areas:
    "rotate-left rotate-left up up rotate-right rotate-right"
    "left left down down right right"
    "change change change place place place";
  max-width: 25em;
}

.rotate-left {
  grid-area: rotate-left;
}

.up {
  grid-area: up;
}

.rotate-right {
  grid-area: rotate-right;
}

.left {
  grid-area: left;
}

.down {
  grid-area: down;
}

.right {
  grid-area: right;
}

.change {
  grid-area: change;
}

.place {
  grid-area: place;
}
</style>
