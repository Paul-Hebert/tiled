<script setup lang="ts">
import GameBoard from "./components/GameBoard/GameBoard.vue";
import TilePicker from "./components/TilePicker/TilePicker.vue";
import PrimaryControls from "./components/PrimaryControls/PrimaryControls.vue";
import { useBoardState } from "./stores/board-state.ts";
import { useKeyboardCommands } from "./composables/use-keyboard-commands.ts";
import { storeToRefs } from "pinia";
import { computed, ComputedRef, onMounted, type Ref, ref, watch } from "vue";
import { useLevels } from "./stores/levels.ts";
import Button from "./components/Button/Button.vue";
import { TileData } from "./types/tile-data.ts";
/* @ts-expect-error */
import { randomItemInArray, randomInt } from "randomness-helpers";
import MessengerModal from "./components/global/MessengerModal.vue/MessengerModal.vue";
import PlayerStats from "./components/PlayerStats/PlayerStats.vue"

useKeyboardCommands();

const boardStateStore = useBoardState();
const { currentTile, isComplete } = storeToRefs(boardStateStore);

const levelsStore = useLevels();
const { loadTilesForTurn } = levelsStore;
const { currentLevel, currentLevelIndex, gameComplete } =
  storeToRefs(levelsStore);

// Load our starting level
onMounted(() => {
  levelsStore.loadLevel(0);
});

// Game end success message
watch(
  () => gameComplete.value,
  (gameComplete) => {
    if (gameComplete) {
      // Wait a moment after user placement before announcing victory
      setTimeout(() => {
        alert("You won the game!");
      }, 500);
    }
  }
);

let controlStatus: ComputedRef<
  "game-over" | "won" | "picking-tile" | "placing-tile"
> = computed(() => {
  if (gameComplete.value) {
    return "game-over";
  }
  if (isComplete.value) {
    return "won";
  }
  if (currentTile.value) {
    return "placing-tile";
  }
  return "picking-tile";
});
</script>

<template>
  <div class="game-screen">
    <h1>Level {{ currentLevelIndex + 1 }}: {{ currentLevel?.title || "" }}</h1>

    <GameBoard :scale="10" :grid="currentLevel.grid" class="board" />

    <PlayerStats />

    <div class="controls">
      <div
        class="success-wrapper"
        :class="{ shown: controlStatus === 'won' }"
        :inert="controlStatus !== 'won'"
      >
        <Button
          size="large"
          @click="levelsStore.loadNextLevel"
          :class="{ pulse: controlStatus === 'won' }"
        >
          Next Level
        </Button>
      </div>

      <PrimaryControls
        :class="{ shown: controlStatus === 'placing-tile' }"
        :inert="controlStatus !== 'placing-tile'"
      />
      <TilePicker
        :tiles="tileOptions"
        :class="{ shown: controlStatus === 'picking-tile' }"
        :inert="controlStatus !== 'picking-tile'"
        @refresh="setTileOptions"
      />
    </div>

    <MessengerModal />
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
  display: grid;
  align-content: center;
}

@media (orientation: landscape) and (width > 900px) {
  .game-screen {
    grid-template-areas:
      "board title"
      "board progress"
      "board controls";
    grid-template-columns: 1fr 30em;
    padding: 2em;
    column-gap: 1em;
    grid-template-rows: auto auto 1fr;
    justify-content: space-between;
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

.controls > *:not(.shown) {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}

.success-wrapper {
  display: grid;
  place-content: center;
}
</style>
