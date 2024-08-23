<script setup lang="ts">
import GameBoard from "./components/GameBoard/GameBoard.vue";
import GridProgress from "./components/GridProgress/GridProgress.vue";
import TilePicker from "./components/TilePicker/TilePicker.vue";
import MoneyInfo from "./components/MoneyInfo/MoneyInfo.vue";
import PrimaryControls from "./components/PrimaryControls/PrimaryControls.vue";
import { getIncrementedId } from "./helpers/get-incremented-id.ts";
import { shapes } from "./data/shapes";
import { hues } from "./data/hues";
import { padShapeToSquare } from "./helpers/pad-shape-to-square.ts";
/* @ts-expect-error */
import { randomItemInArray, randomInt } from "randomness-helpers";
import { useBoardState } from "./stores/board-state.ts";
import { useKeyboardCommands } from "./composables/use-keyboard-commands.ts";
import { storeToRefs } from "pinia";
import { computed, ComputedRef, onMounted, type Ref, ref, watch } from "vue";
import { useLevels } from "./stores/levels.ts";
import Button from "./components/Button/Button.vue";
import { TileData } from "./types/tile-data.ts";
import { useMoney } from "./stores/money.ts";

const moneyStore = useMoney();

useKeyboardCommands();

const instructionsDialog = ref();

const boardStateStore = useBoardState();
const { currentTile, gridSize, isComplete } = storeToRefs(boardStateStore);

const levelsStore = useLevels();
const { currentLevel, gameComplete } = storeToRefs(levelsStore);

const tileOptions: Ref<TileData[]> = ref([]);

function randomTile(): TileData {
  return {
    shape: padShapeToSquare(randomItemInArray(shapes)),
    id: getIncrementedId(),
    hue: randomItemInArray(hues),
    price: randomInt(1, 4),
    income: randomItemInArray([0, 0, 0, 1, 2]),
    offset: { x: 0, y: 0 },
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
watch(
  () => boardStateStore.filledSquares,
  () => {
    setTileOptions();
    moneyStore.earnIncome();
  }
);

// Load our starting level
onMounted(() => {
  levelsStore.loadLevel(0);

  instructionsDialog.value.showModal();
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

let controlStatus: ComputedRef<"won" | "picking-tile" | "placing-tile"> =
  computed(() => {
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
  <dialog ref="instructionsDialog">
    <h1>Fill the board with shapes</h1>
    <p>
      Select shapes and place them on the board. You can move shapes using the
      buttons on the screen, or using your keyboard.
    </p>

    <ul>
      <li>Use the arrow keys to move the selected shape.</li>
      <li>Use the space bar to rotate the selected shape.</li>
      <li>Use the enter key to place the selected shape.</li>
    </ul>

    <p>Shapes cannot overlap other shapes of extend off the board.</p>

    <p>
      Each level will require you to fill a certain percentage of the board.
    </p>

    <p>If you get stuck, you can restart the level to try again.</p>

    <Button @click="instructionsDialog.close()">Got it!</Button>
  </dialog>

  <div class="game-screen">
    <h1>Level {{ currentLevel + 1 }}</h1>

    <GameBoard :scale="10" :gridSize="gridSize" class="board" />

    <GridProgress class="progress" />

    <MoneyInfo class="money-info" />

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
    "money-info"
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

@media (orientation: landscape) and (width > 900px) {
  .game-screen {
    grid-template-areas:
      "board title"
      "board progress"
      "board money-info"
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

.controls > *:not(.shown) {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}

dialog[open] {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em;
  border-radius: 0.5em;
  border: none;
  margin: auto;
  max-width: 60ch;
}

::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.success-wrapper {
  display: grid;
  place-content: center;
}

.money-info {
  grid-area: money-info;
  align-self: end;
}
</style>
