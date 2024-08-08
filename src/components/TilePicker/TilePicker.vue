<script setup lang="ts">
import { computed } from "vue";
import type { TileData } from "../../types/tile-data";
import Tile from "../Tile/Tile.vue";
import BackgroundGrid from "../BackgroundGrid/BackgroundGrid.vue";
import { useBoardState } from "../../stores/board-state.ts";

const props = defineProps<{ tiles: TileData[] }>();

const boardStateStore = useBoardState();
const { setCurrentTile } = boardStateStore;

const scale = 10;

const biggestTileSize = computed(() =>
  Math.max(...props.tiles.map((tile) => tile.shape.grid.length))
);
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
        :viewBox="`0 0 ${biggestTileSize * scale} ${biggestTileSize * scale}`"
        width="100"
        height="100"
      >
        <BackgroundGrid :scale="scale" :size="biggestTileSize" />
        <Tile v-bind="tile" :scale="10" placed />
      </svg>
    </button>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  font-size: 1.5rem;
  margin: 0;
}

.tile-picker {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

button {
  cursor: pointer;
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
