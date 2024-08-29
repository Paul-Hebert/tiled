<script setup lang="ts">
import Tile from "../../Tile/Tile.vue";
import BackgroundGrid from "../../BackgroundGrid/BackgroundGrid.vue";
import { TileData } from "../../../types/tile-data.ts";
import ButtonWithPrice from "./ButtonWithPrice.vue";
import { computed } from "vue";
import { Grid } from "../../../types/grid.ts";
import GridContainer from "../../GridContainer/GridContainer.vue";

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
    <GridContainer :grid-size="gridSize">
      <BackgroundGrid :scale="scale" :grid="grid" :grid-size="gridSize" />
      <Tile
        v-bind="tile"
        :offset="{ x: 0, y: 0 }"
        :scale="10"
        placed
        :grid-size="gridSize"
      />
    </GridContainer>
  </ButtonWithPrice>
</template>

<style scoped>
.tile-button {
  border-radius: 0.25em;
  aspect-ratio: 1;
  display: flex;
}

:deep(.button-inner) {
  place-content: stretch;
}
</style>
