import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";
import { Grid } from "../types/grid";
import { TileData } from "../types/tile-data";
import { getActivePointsFromGrid } from "../helpers/get-active-points-from-grid";
import { rotateGrid } from "../helpers/rotate-grid";
import { Level } from "../types/level";
import { useMoney } from "./money";

export const useBoardState = defineStore("board-state", () => {
  const levelGrid: Ref<Grid> = ref([[]]);
  const currentTile: Ref<TileData | undefined> = ref();
  const placedTiles: Ref<TileData[]> = ref([]);

  const { spend, increaseIncome } = useMoney();

  function loadLevel(level: Level) {
    percentRequiredComplete.value = level.percentRequiredComplete;
    gridSize.value = level.gridSize;

    levelGrid.value = Array.from({ length: level.gridSize }, () =>
      Array.from({ length: level.gridSize }, () => 0)
    );

    currentTile.value = undefined;
    placedTiles.value = [];
  }

  // Configuration
  const gridSize = ref(5);
  const percentRequiredComplete = ref(0.75);

  const totalSquares = computed(() => gridSize.value * gridSize.value);
  const filledSquares = computed(
    () => levelGrid.value.flat().filter((x) => x === 1).length
  );
  const percentComplete = computed(
    () => filledSquares.value / totalSquares.value
  );
  const isComplete = computed(
    () => percentComplete.value >= percentRequiredComplete.value
  );

  const currentTileGridSquares = computed(() => {
    if (!currentTile.value) return [];
    const rotatedGrid = rotateGrid({
      grid: [...currentTile.value.shape.grid],
      rotation: currentTile.value.rotation,
    });

    return getActivePointsFromGrid({
      grid: rotatedGrid,
      offset: currentTile.value.offset,
    });
  });

  const canPlaceTile = computed(() => {
    if (!currentTileGridSquares.value) {
      return false;
    }

    return currentTileGridSquares.value.every(
      (point) =>
        point.x >= 0 &&
        point.x < gridSize.value &&
        point.y >= 0 &&
        point.y < gridSize.value &&
        levelGrid.value[point.y][point.x] === 0
    );
  });

  const invalidPlacement = ref(false);

  function setCurrentTile(tile?: TileData) {
    currentTile.value = tile;
  }

  function placeCurrentTile() {
    if (!canPlaceTile.value || !currentTile.value) {
      invalidPlacement.value = true;
      setTimeout(() => {
        invalidPlacement.value = false;
      }, 500);

      return;
    }

    invalidPlacement.value = false;

    currentTileGridSquares.value.forEach((point) => {
      levelGrid.value[point.y][point.x] = 1;
    });

    spend(currentTile.value.price);
    increaseIncome(currentTile.value.income);

    currentTile.value.placed = true;
    placedTiles.value.push({ ...currentTile.value });
    currentTile.value = undefined;
  }

  return {
    totalSquares,
    filledSquares,
    levelGrid,
    currentTile,
    placedTiles,
    invalidPlacement,
    canPlaceTile,
    percentRequiredComplete,
    percentComplete,
    isComplete,
    gridSize,
    loadLevel,
    setCurrentTile,
    placeCurrentTile,
  };
});
