<script setup lang="ts">
import BackgroundGrid from "../BackgroundGrid/BackgroundGrid.vue";
import Tile, { type TileComponentProps } from "../Tile/Tile.vue";
import { type ComputedRef, watch, computed } from "vue";
import { useKeyboardCommands } from "../../composables/use-keyboard-commands.ts";
import { getIncrementedId } from "../../helpers/get-incremented-id.ts";
import { shapes } from "../../data/shapes";
import { hues } from "../../data/hues";
import { useBoardState } from "../../stores/board-state.ts";
import { padShapeToSquare } from "../../helpers/pad-shape-to-square.ts";
import { randomItemInArray } from "randomness-helpers";
import { storeToRefs } from "pinia";

const props = defineProps<{ scale: number; gridSize: number }>();

const boardStateStore = useBoardState();

const { currentTile, placedTiles, invalidPlacement, canPlaceTile } =
  storeToRefs(boardStateStore);
const { setCurrentTile, refreshState } = boardStateStore;

refreshState({ _gridSize: props.gridSize });

setCurrentTile({
  offset: { x: 0, y: 0 },
  shape: padShapeToSquare(randomItemInArray(shapes)),
  id: getIncrementedId(),
  hue: randomItemInArray(hues),
});

boardStateStore.$subscribe((_mutation, state) => {
  if (typeof state.currentTile === "undefined") {
    setCurrentTile({
      offset: { x: 0, y: 0 },
      shape: padShapeToSquare(randomItemInArray(shapes)),
      id: getIncrementedId(),
      hue: randomItemInArray(hues),
    });
  }
});

useKeyboardCommands();

const allTiles: ComputedRef<TileComponentProps[]> = computed(() => {
  const tiles = placedTiles.value.map((tile) => ({
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
    });
  }

  return tiles;
});
</script>

<template>
  <svg
    :viewBox="`0 0 ${scale * gridSize} ${scale * gridSize}`"
    width="1000"
    height="1000"
  >
    <BackgroundGrid :size="gridSize" :scale="scale" />
    <Tile v-for="tile in allTiles" v-bind="tile" :key="tile.id" />
  </svg>
</template>
