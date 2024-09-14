import { defineStore, storeToRefs } from "pinia";
import { Level } from "../types/level";
import { computed, ref } from "vue";
import { useBoardState } from "./board-state";
import { useEnergy } from "./energy";
import { level1 } from "../data/levels/1/1";
import { generateTile } from "../helpers/generate-tile";
import { level2 } from "../data/levels/2/2";

export const useLevels = defineStore("levels", () => {
  const boardStateStore = useBoardState();
  const { isComplete: levelIsComplete } = storeToRefs(boardStateStore);

  const energyStore = useEnergy();

  const levels: Level[] = [level1, level2];

  const currentLevelIndex = ref(0);
  const currentLevel = computed(() => levels[currentLevelIndex.value]);

  function loadLevel(level: number) {
    boardStateStore.loadLevel(levels[level]);
    currentLevelIndex.value = level;

    // Run starting events
    currentLevel.value.events?.forEach((event) => event.action());

    energyStore.setEnergy(40);
  }

  const nextLevel = computed(() => levels[currentLevelIndex.value + 1]);
  const gameComplete = computed(
    () => levelIsComplete.value && !nextLevel.value
  );

  function loadNextLevel() {
    if (nextLevel.value) {
      loadLevel(currentLevelIndex.value + 1);
    } else {
      throw new Error("No more levels!");
    }
  }

  return {
    levels,
    currentLevel,
    currentLevelIndex,
    loadLevel,
    loadNextLevel,
    gameComplete,
  };
});
