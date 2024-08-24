import { defineStore, storeToRefs } from "pinia";
import { Level } from "../types/level";
import { computed, ref } from "vue";
import { useBoardState } from "./board-state";
import { useMoney } from "./money";
import { useTurns } from "./turns";
import { level1 } from "../data/levels/level-1";
import { level2 } from "../data/levels/level-2";

export const useLevels = defineStore("levels", () => {
  const boardStateStore = useBoardState();
  const { isComplete: levelIsComplete } = storeToRefs(boardStateStore);
  const { resetTurns } = useTurns();
  const moneyStore = useMoney();

  const levels: Level[] = [level1, level2];

  const currentLevelIndex = ref(0);
  const currentLevel = computed(() => levels[currentLevelIndex.value]);

  function loadLevel(level: number) {
    resetTurns();
    boardStateStore.loadLevel(levels[level]);
    currentLevelIndex.value = level;

    console.log("resetting money");
    moneyStore.setPlayerIncome(0);
    moneyStore.setPlayerMoney(10);
    console.log("money reset");
  }

  const nextLevel = computed(() => levels[currentLevelIndex.value + 1]);
  // TODO: this isn't working...
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

  function restartLevel() {
    console.log("restarting");
    loadLevel(currentLevelIndex.value);
  }

  return {
    levels,
    currentLevel,
    currentLevelIndex,
    loadLevel,
    loadNextLevel,
    gameComplete,
    restartLevel,
  };
});
