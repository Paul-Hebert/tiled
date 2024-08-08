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
  <div class="wrapper">
    <h2>Pick a Tile</h2>
    <div class="tile-picker">
      <button
        v-for="tile in tiles"
        :key="tile.id"
        @click="() => setCurrentTile(tile)"
      >
        <svg
          :viewBox="`0 0 ${biggestTileSize * scale} ${biggestTileSize * scale}`"
        >
          <BackgroundGrid :scale="scale" :size="biggestTileSize" />
          <Tile v-bind="tile" :scale="10" placed />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  font-size: 1.5rem;
  margin: 0;
}

.wrapper {
  justify-self: center;
  max-width: 25em;
}

.tile-picker {
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  justify-content: center;
  place-self: center;
}

button {
  cursor: pointer;
  appearance: none;
  background: none;
  border: none;
  display: grid;
  place-content: center;
  padding: 0.5em;
  height: 100%;
  aspect-ratio: 1;
  max-height: 100%;
  transition-property: outline, background-color;
  transition-timing-function: ease-out;
  transition-duration: 0.1s;
  outline: 0px solid transparent;
}

button:hover,
button:focus-visible {
  outline: 2px solid hsl(200, 50%, 70%);
  background-color: hsl(200, 50%, 90%);
}

svg {
  width: 100%;
  max-height: 100%;
  max-width: 100%;
}
</style>
