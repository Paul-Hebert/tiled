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
import { onMounted, type Ref, ref, watch } from "vue";
import { type TileData } from "./types/tile-data";
import { useLevels } from "./stores/levels.ts";
import Button from "./components/Button/Button.vue";

useKeyboardCommands();

const boardStateStore = useBoardState();
const { currentTile, gridSize, isComplete } = storeToRefs(boardStateStore);

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
    <header>
      <h1>Level {{ currentLevel + 1 }}</h1>

      <Button v-if="isComplete" @click="levelsStore.loadNextLevel()">
        Next Level!
      </Button>
      <Button v-else @click="levelsStore.restartLevel">Restart Level</Button>
    </header>

    <GridProgress class="progress" />

    <GameBoard :scale="10" :gridSize="gridSize" class="board" />

    <div class="controls">
      <PrimaryControls :class="{ hidden: !currentTile }" />
      <TilePicker :tiles="tileOptions" :class="{ hidden: currentTile }" />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
}
</style>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  text-align: center;
  line-height: 1.2;
}

.game-screen {
  max-height: 100svh;
  max-width: 100svw;
  padding: 1em;
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 100%;
  height: 100%;
  z-index: 0;
  position: relative;
  gap: 1em;
}

.board {
  flex-grow: 2;
  overflow: visible;
  pointer-events: none;
  padding-block: 1em;
}

.controls {
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
