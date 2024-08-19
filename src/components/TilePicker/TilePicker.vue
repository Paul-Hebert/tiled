<script setup lang="ts">
import { computed } from "vue";
import type { TileData } from "../../types/tile-data";
import Tile from "../Tile/Tile.vue";
import Button from "../Button/Button.vue";
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
      <Button
        v-for="tile in tiles"
        :key="tile.id"
        @click="() => setCurrentTile(tile)"
        class="tile-button"
      >
        <svg
          :viewBox="`0 0 ${biggestTileSize * scale} ${biggestTileSize * scale}`"
          class="tile"
          width="1000"
          height="1000"
        >
          <BackgroundGrid :scale="scale" :size="biggestTileSize" />
          <Tile v-bind="tile" :scale="10" placed :grid-size="biggestTileSize" />
        </svg>
      </Button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  justify-self: center;
  max-width: min(95svw, 25em);
  gap: 1em;
  display: grid;
}

.tile-picker {
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  place-content: center;
}

.tile-button {
  border-radius: 0.25em;
  aspect-ratio: 1;
  height: 100%;
  display: flex;
}

.tile {
  border: 1px solid #ddd;
  border-radius: 0.125em;
}

svg {
  max-width: 100%;
  max-height: 100%;
}
</style>
