<script setup lang="ts">
import GameBoard from "./components/GameBoard/GameBoard.vue";
import GridProgress from "./components/GridProgress/GridProgress.vue";
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
import { type Ref, ref, watch } from "vue";
import { type TileData } from "./types/tile-data";

useKeyboardCommands();

const boardStateStore = useBoardState();

const { currentTile, gridSize } = storeToRefs(boardStateStore);
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
  const newOptions: TileData[] = [];

  while (newOptions.length < 3) {
    const newTile = randomTile();

    if (!newOptions.some((tile) => tile.shape.name === newTile.shape.name)) {
      newOptions.push(newTile);
    }
  }
  tileOptions.value = newOptions;
}

setTileOptions();
// This is a hacky way to update our tile option after a user plays a tile
watch(() => boardStateStore.filledSquares, setTileOptions);
</script>

<template>
  <div class="game-screen">
    <GameBoard :scale="10" :gridSize="gridSize" class="board" />

    <div class="controls">
      <PrimaryControls :class="{ hidden: !currentTile }" />
      <TilePicker :tiles="tileOptions" :class="{ hidden: currentTile }" />
    </div>

    <GridProgress class="progress" />
  </div>
</template>

<style scoped>
svg {
  overflow: visible;
  width: 100%;
  height: 100%;
}

.game-screen {
  max-height: 100svh;
  max-width: 100svw;
  padding: 2em;
  display: flex;
  flex-direction: column;
  place-content: center;

  grid-template-rows: 1fr 15em auto;
  width: 100%;
  height: 100%;
}

.board {
  flex-grow: 2;
}

.controls {
  padding-block: 1em;
  flex-grow: 1;
  place-self: center;
  display: grid;
  grid-template-areas: "content";
  place-content: stretch;
}

.controls > * {
  grid-area: content;
}

.hidden {
  visibility: hidden;
  opacity: 0;
}
</style>
