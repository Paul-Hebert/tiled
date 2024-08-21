<script setup lang="ts">
import GameBoard from "./components/GameBoard/GameBoard.vue";
import GridProgress from "./components/GridProgress/GridProgress.vue";
import TilePicker from "./components/TilePicker/TilePicker.vue";
import PrimaryControls from "./components/PrimaryControls/PrimaryControls.vue";
import { getIncrementedId } from "./helpers/get-incremented-id.ts";
import { shapes } from "./data/shapes";
import { hues } from "./data/hues";
import { padShapeToSquare } from "./helpers/pad-shape-to-square.ts";
/* @ts-expect-error */
import { randomItemInArray } from "randomness-helpers";
import { useBoardState } from "./stores/board-state.ts";
import { useKeyboardCommands } from "./composables/use-keyboard-commands.ts";
import { storeToRefs } from "pinia";
import { onMounted, type Ref, ref, watch } from "vue";
import { type TileData } from "./types/tile-data";
import { useLevels } from "./stores/levels.ts";

useKeyboardCommands();

const boardStateStore = useBoardState();
const { currentTile, gridSize } = storeToRefs(boardStateStore);

const levelsStore = useLevels();
const { currentLevel, gameComplete } = storeToRefs(levelsStore);

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
// TODO: In the future increment a "turns" property that we can watch for updates.
watch(() => boardStateStore.filledSquares, setTileOptions);

// Load our starting level
onMounted(() => {
  levelsStore.loadLevel();
});
// And load subsequent levels when the current level clears
// TODO... give the user the option when to proceed.
watch(
  () => gameComplete,
  (gameComplete) => {
    if (gameComplete) {
      // Wait a moment after user placement before announcing victory
      setTimeout(() => {
        alert("You won the game!");
      }, 500);
    }
  }
);
</script>

<template>
  <div class="game-screen">
    <h1>Level {{ currentLevel + 1 }}</h1>

    <GameBoard :scale="10" :gridSize="gridSize" class="board" />

    <GridProgress class="progress" />

    <div class="controls">
      <PrimaryControls
        :class="{ hidden: !currentTile }"
        :inert="!currentTile"
      />
      <TilePicker
        :tiles="tileOptions"
        :class="{ hidden: currentTile }"
        :inert="currentTile"
      />
    </div>
  </div>
</template>

<style scoped>
.game-screen {
  max-height: 100svh;
  max-width: 100svw;
  padding: 1em;
  display: grid;
  grid-template-areas:
    "title"
    "board"
    "progress"
    "controls";
  flex-direction: column;
  place-content: center;
  width: 100%;
  height: 100%;
  z-index: 0;
  position: relative;
  row-gap: 1em;
  column-gap: 2em;
  justify-content: space-around;
  align-content: center;
  grid-template-columns: minmax(0, auto);
  align-self: end;
}

h1 {
  text-align: center;
  grid-area: title;
}

.board {
  overflow: visible;
  pointer-events: none;
  padding-block: 1em;
  grid-area: board;
  width: 100%;
  height: 100%;
}

@media (orientation: landscape) and (width > 800px) {
  .game-screen {
    grid-template-areas:
      "board title"
      "board progress"
      "board controls";
    grid-template-columns: 1fr auto;
    padding: 2em;
    column-gap: 1em;
    grid-template-rows: auto auto 1fr;
  }

  h1 {
    text-align: left;
  }

  .board {
    padding-block: 0;
  }
}

.controls {
  flex-grow: 1;
  place-self: center;
  display: grid;
  grid-template-areas: "content";
  place-content: stretch;
  grid-area: controls;
  align-self: end;
}

.controls > * {
  grid-area: content;
}

.progress {
  grid-area: progress;
}

.hidden {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}
</style>
