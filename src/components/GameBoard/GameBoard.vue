<script setup lang="ts">
import BackgroundGrid from "../BackgroundGrid/BackgroundGrid.vue";
import Tile, { type TileComponentProps } from "../Tile/Tile.vue";
import { type ComputedRef, computed } from "vue";
import { useBoardState } from "../../stores/board-state.ts";
import { storeToRefs } from "pinia";

const props = defineProps<{ scale: number; gridSize: number }>();

const boardStateStore = useBoardState();

const { currentTile, placedTiles, invalidPlacement, canPlaceTile } =
  storeToRefs(boardStateStore);
const { refreshState } = boardStateStore;

refreshState({ _gridSize: props.gridSize });

const allTiles: ComputedRef<TileComponentProps[]> = computed(() => {
  const tiles: TileComponentProps[] = placedTiles.value.map((tile) => ({
    ...tile,
    canBePlaced: false,
    invalidPlacement: false,
    scale: props.scale,
    id: tile.id,
    gridSize: props.gridSize,
  }));

  if (currentTile.value) {
    tiles.push({
      ...currentTile.value,
      canBePlaced: canPlaceTile.value,
      invalidPlacement: invalidPlacement.value,
      scale: props.scale,
      id: currentTile.value.id,
      selected: true,
      gridSize: props.gridSize,
    });
  }

  return tiles;
});
</script>

<template>
  <svg :viewBox="`0 0 ${scale * gridSize} ${scale * gridSize}`">
    <BackgroundGrid :size="gridSize" :scale="scale" />
    <Tile v-for="tile in allTiles" v-bind="tile" :key="tile.id" />
  </svg>
</template>
