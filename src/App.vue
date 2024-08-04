<script setup lang="ts">
import Board from "./components/Board/Board.vue";
import PrimaryControls from "./components/PrimaryControls/PrimaryControls.vue";
import Tile from "./components/Tile/Tile.vue";
import { computed, type Ref, ref } from "vue";
import { shapes } from "./data/shapes";
import { hues } from "./data/hues";
import type { TileData } from "./types/tile-data";
import { randomItemInArray } from "randomness-helpers";
import { useKeyboardCommands } from "./composables/use-keyboard-commands.ts";
import { Commands } from "./types/commands.ts";
import { getIncrementedId } from "./helpers/get-incremented-id.ts";
import { rotateGrid } from "./helpers/rotate-grid.ts";
import { Grid } from "./types/grid.ts";
import { getActivePointsFromGrid } from "./helpers/get-active-points-from-grid.ts";
import { logGrid } from "./helpers/log-grid.ts";
import { padShapeToSquare } from "./helpers/pad-shape-to-square.ts";

const scale = 10;
const gridSize = 10;

const levelGrid: Grid = Array.from({ length: gridSize }, () =>
  Array.from({ length: gridSize }, () => 0)
);

const placedTiles: Ref<TileData[]> = ref([]);
const currentTile = ref(newTile());

const currentTileGridSquares = computed(() => {
  const rotatedGrid = rotateGrid({
    grid: [...currentTile.value.shape.grid],
    rotation: currentTile.value.rotation,
  });

  return getActivePointsFromGrid({
    grid: rotatedGrid,
    offset: currentTile.value.offset,
  });
});

const canPlaceTile = computed(() => {
  if (!currentTileGridSquares.value) {
    return false;
  }

  return currentTileGridSquares.value.every(
    (point) =>
      point.x >= 0 &&
      point.x < gridSize &&
      point.y >= 0 &&
      point.y < gridSize &&
      levelGrid[point.y][point.x] === 0
  );
});

const invalidPlacement = ref(false);

function newTile(): TileData {
  const tile = {
    offset: { x: 0, y: 0 },
    shape: padShapeToSquare(randomItemInArray(shapes)),
    id: getIncrementedId(),
    hue: randomItemInArray(hues),
  };

  return tile;
}

const commands: Commands = {
  moveTileLeft: () => (currentTile.value.offset.x -= 1),
  moveTileRight: () => (currentTile.value.offset.x += 1),
  moveTileUp: () => (currentTile.value.offset.y -= 1),
  moveTileDown: () => (currentTile.value.offset.y += 1),
  rotateTileLeft: () =>
    (currentTile.value.rotation = (currentTile.value?.rotation || 0) - 90),
  rotateTileRight: () =>
    (currentTile.value.rotation = (currentTile.value?.rotation || 0) + 90),
  placeTile: () => {
    if (!canPlaceTile.value) {
      invalidPlacement.value = true;
      setTimeout(() => {
        invalidPlacement.value = false;
      }, 500);

      return;
    }

    invalidPlacement.value = false;

    currentTileGridSquares.value.forEach((point) => {
      levelGrid[point.y][point.x] = 1;
    });

    logGrid(levelGrid);

    currentTile.value.placed = true;
    placedTiles.value.push({ ...currentTile.value });
    currentTile.value = newTile();
  },
};

useKeyboardCommands(commands);
</script>

<template>
  <div class="game-screen">
    <svg
      :viewBox="`0 0 ${scale * gridSize} ${scale * gridSize}`"
      width="1000"
      height="1000"
    >
      <Board :size="gridSize" :scale="scale" />
      <Tile
        v-for="tile in [
          ...placedTiles,
          {
            ...currentTile,
            canBePlaced: canPlaceTile,
            invalidPlacement,
          },
        ]"
        v-bind="tile"
        :scale="scale"
        :key="tile.id"
      />
    </svg>

    <PrimaryControls class="primary-controls" :commands="commands" />
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
