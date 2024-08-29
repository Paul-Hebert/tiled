<script setup lang="ts">
import BackgroundGrid from "../BackgroundGrid/BackgroundGrid.vue";
import Tile, { type TileComponentProps } from "../Tile/Tile.vue";
import { type ComputedRef, computed } from "vue";
import { useBoardState } from "../../stores/board-state.ts";
import { storeToRefs } from "pinia";
import { Grid } from "../../types/grid.ts";
import GridContainer from "../GridContainer/GridContainer.vue";

const props = defineProps<{ scale: number; grid: Grid }>();

const gridSize = computed(() => props.grid.length);

const boardStateStore = useBoardState();

const { currentTile, placedTiles, invalidPlacement, canPlaceTile } =
  storeToRefs(boardStateStore);

const allTiles: ComputedRef<TileComponentProps[]> = computed(() => {
  const tiles: TileComponentProps[] = placedTiles.value.map((tile) => ({
    ...tile,
    canBePlaced: false,
    invalidPlacement: false,
    scale: props.scale,
    id: tile.id,
  }));

  if (currentTile.value) {
    tiles.push({
      ...currentTile.value,
      canBePlaced: canPlaceTile.value,
      invalidPlacement: invalidPlacement.value,
      scale: props.scale,
      id: currentTile.value.id,
      selected: true,
    });
  }

  return tiles;
});
</script>

<template>
  <div class="game-board">
    <GridContainer :grid-size="gridSize">
      <BackgroundGrid :grid="grid" :scale="scale" :grid-size="gridSize" />
      <Tile v-for="tile in allTiles" v-bind="tile" :key="tile.id" />
    </GridContainer>
  </div>
</template>
