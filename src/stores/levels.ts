import { defineStore, storeToRefs } from "pinia";
import { Level } from "../types/level";
import { computed, ref } from "vue";
import { useBoardState } from "./board-state";

export const useLevels = defineStore("levels", () => {
  const boardStateStore = useBoardState();
  const { isComplete: levelIsComplete } = storeToRefs(boardStateStore);

  const levels: Level[] = [
    { percentRequiredComplete: 0.5, gridSize: 5 },
    { percentRequiredComplete: 0.75, gridSize: 7 },
    { percentRequiredComplete: 0.9, gridSize: 9 },
  ];

  const currentLevel = ref(0);

  function loadLevel() {
    boardStateStore.loadLevel(levels[currentLevel.value]);
  }

  const nextLevel = computed(() => levels[currentLevel.value + 1]);
  // TODO: this isn't working...
  const gameComplete = computed(
    () => levelIsComplete.value && !nextLevel.value
  );

  function loadNextLevel() {
    if (nextLevel.value) {
      boardStateStore.loadLevel(nextLevel.value);
      currentLevel.value++;
    } else {
      throw new Error("No more levels!");
    }
  }

  function restartLevel() {
    boardStateStore.loadLevel(levels[currentLevel.value]);
  }

  return {
    levels,
    currentLevel,
    loadLevel,
    loadNextLevel,
    gameComplete,
    restartLevel,
  };
});
