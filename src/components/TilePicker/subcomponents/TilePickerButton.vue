<script setup lang="ts">
import Tile from "../../Tile/Tile.vue";
import BackgroundGrid from "../../BackgroundGrid/BackgroundGrid.vue";
import { TileData } from "../../../types/tile-data.ts";
import ButtonWithPrice from "./ButtonWithPrice.vue";
import { computed } from "vue";
import { Grid } from "../../../types/grid.ts";

const props = defineProps<{
  tile: TileData;
  gridSize: number;
  scale: number;
  canAfford: boolean;
}>();

const grid = computed(
  (): Grid =>
    Array.from({ length: props.gridSize }, () => Array(props.gridSize).fill(0))
);
</script>

<template>
  <ButtonWithPrice
    :price="tile.price"
    :income="tile.income"
    class="tile-button"
    :disabled="!canAfford"
  >
    <svg
      :viewBox="`0 0 ${gridSize * scale} ${gridSize * scale}`"
      class="tile"
      width="1000"
      height="1000"
    >
      <BackgroundGrid :scale="scale" :grid="grid" />
      <Tile
        v-bind="tile"
        :offset="{ x: 0, y: 0 }"
        :scale="10"
        placed
        :grid-size="gridSize"
      />
    </svg>
  </ButtonWithPrice>
</template>

<style scoped>
.tile-button {
  border-radius: 0.25em;
  aspect-ratio: 1;
  display: flex;
}

svg {
  max-width: 100%;
  max-height: 100%;
}
</style>
