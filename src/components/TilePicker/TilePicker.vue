<script setup lang="ts">
import type { TileData } from "../../types/tile-data";
import Tile from "../Tile/Tile.vue";
import { useBoardState } from "../../stores/board-state.ts";

const boardStateStore = useBoardState();
const { setCurrentTile } = boardStateStore;

const scale = 10;

defineProps<{ tiles: TileData[] }>();
</script>

<template>
  <h2>Pick a Tile</h2>
  <div class="tile-picker">
    <button
      v-for="tile in tiles"
      :key="tile.id"
      @click="() => setCurrentTile(tile)"
    >
      <svg
        :viewBox="`0 0 ${tile.shape.grid.length * scale} ${
          tile.shape.grid.length * scale
        }`"
        width="100"
        height="100"
      >
        <Tile v-bind="tile" :scale="10" placed />
      </svg>
    </button>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  font-size: 1.5rem;
}
.tile-picker {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

button {
  appearance: none;
  background: none;
  border: none;
  display: grid;
  place-content: center;
  padding: 0;
}

svg {
  width: 100%;
  height: 100%;
}
</style>
