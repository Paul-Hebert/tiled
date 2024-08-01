<script setup lang="ts">
import Board from "./components/Board/Board.vue";
import PrimaryControls from "./components/PrimaryControls/PrimaryControls.vue";
import Tile from "./components/Tile/Tile.vue";
import { type Ref, ref } from "vue";
import { shapes } from "./data/shapes";
import { hues } from "./data/hues";
import type { TileData } from "./types/tile-data";
import { randomItemInArray } from "randomness-helpers";
import { useKeyboardCommands } from "./composables/use-keyboard-commands.ts";
import { Commands } from "./types/commands.ts";
import { getIncrementedId } from "./helpers/get-incremented-id.ts";

const scale = 10;
const gridSize = 10;

const placedTiles: Ref<TileData[]> = ref([]);
const currentTile = ref(newTile());

function newTile(): TileData {
  const tile = {
    x: 0,
    y: 0,
    shape: randomItemInArray(shapes),
    id: getIncrementedId(),
    hue: randomItemInArray(hues),
  };

  return tile;
}

const commands: Commands = {
  moveTileLeft: () => (currentTile.value.x -= 1),
  moveTileRight: () => (currentTile.value.x += 1),
  moveTileUp: () => (currentTile.value.y -= 1),
  moveTileDown: () => (currentTile.value.y += 1),
  rotateTileLeft: () =>
    (currentTile.value.rotation = (currentTile.value?.rotation || 0) - 90),
  rotateTileRight: () =>
    (currentTile.value.rotation = (currentTile.value?.rotation || 0) + 90),
  placeTile: () => {
    currentTile.value.placed = true;
    placedTiles.value.push({ ...currentTile.value });
    currentTile.value = newTile();
  },
};

useKeyboardCommands(commands);
</script>

<template>
  <div class="game-screen">
    <svg :viewBox="`0 0 ${scale * gridSize} ${scale * gridSize}`">
      <Board :size="gridSize" :scale="scale" />
      <Tile
        v-for="tile in [...placedTiles, currentTile]"
        v-bind="tile"
        :scale="scale"
        :key="tile.id"
      />
    </svg>

    <PrimaryControls :commands="commands" />
  </div>
</template>

<style scoped>
svg {
  background: #fff;
  overflow: visible;
  width: 100%;
  height: 100%;
}

.game-screen {
  max-width: 90svw;
  max-height: 90svh;
  padding: 1em;
  display: grid;
  place-content: center;
  gap: 1em;
  width: 100%;
  height: 100%;
}
</style>
