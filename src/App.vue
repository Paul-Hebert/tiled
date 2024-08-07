<script setup lang="ts">
import GameBoard from "./components/GameBoard/GameBoard.vue";
import TilePicker from "./components/TilePicker/TilePicker.vue";
import PrimaryControls from "./components/PrimaryControls/PrimaryControls.vue";
import { getIncrementedId } from "./helpers/get-incremented-id.ts";
import { shapes } from "./data/shapes";
import { hues } from "./data/hues";
import { padShapeToSquare } from "./helpers/pad-shape-to-square.ts";
import { randomItemInArray } from "randomness-helpers";
import { useBoardState } from "./stores/board-state.ts";
import { useKeyboardCommands } from "./composables/use-keyboard-commands.ts";
import { storeToRefs } from "pinia";
import { type Ref, ref } from "vue";
import { type TileData } from "./types/tile-data";

useKeyboardCommands();

const boardStateStore = useBoardState();

const { currentTile } = storeToRefs(boardStateStore);
const tileOptions: Ref<TileData[]> = ref([]);

function randomTile() {
  return {
    offset: { x: 0, y: 0 },
    shape: padShapeToSquare(randomItemInArray(shapes)),
    id: getIncrementedId(),
    hue: randomItemInArray(hues),
  };
}

function setTileOptions() {
  tileOptions.value = [randomTile(), randomTile(), randomTile()];
}

boardStateStore.$subscribe((_mutation, state) => {
  if (typeof state.currentTile === "undefined") {
    setTileOptions();
  }
});
</script>

<template>
  <div class="game-screen">
    <GameBoard :scale="10" :gridSize="10" />

    <PrimaryControls class="primary-controls" v-if="currentTile" />
    <TilePicker :tiles="tileOptions" v-else />
  </div>
</template>

<style scoped>
svg {
  overflow: visible;
  width: 100%;
  height: 100%;
}

.game-screen {
  max-height: 90svh;
  max-width: 95svw;
  padding: 1em;
  display: grid;
  place-content: center;
  grid-template-rows: 1fr auto;
  gap: 1em;
  width: 100%;
  height: 100%;
}

.primary-controls {
  width: min(25em, 95svw);
  place-self: center;
}
</style>
