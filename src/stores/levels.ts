import { defineStore, storeToRefs } from "pinia";
import { Level } from "../types/level";
import { computed, ref } from "vue";
import { useBoardState } from "./board-state";
import { useMoney } from "./money";
import { useTurns } from "./turns";

export const useLevels = defineStore("levels", () => {
  const boardStateStore = useBoardState();
  const { isComplete: levelIsComplete } = storeToRefs(boardStateStore);
  const { resetTurns } = useTurns();
  const moneyStore = useMoney();

  const levels: Level[] = [
    { percentRequiredComplete: 0.75, gridSize: 5 },
    { percentRequiredComplete: 0.75, gridSize: 7 },
    { percentRequiredComplete: 0.9, gridSize: 9 },
  ];

  const currentLevel = ref(0);

  function loadLevel(level: number) {
    resetTurns();
    boardStateStore.loadLevel(levels[level]);
    currentLevel.value = level;

    console.log("resetting money");
    moneyStore.setPlayerIncome(0);
    moneyStore.setPlayerMoney(10);
    console.log("money reset");
  }

  const nextLevel = computed(() => levels[currentLevel.value + 1]);
  // TODO: this isn't working...
  const gameComplete = computed(
    () => levelIsComplete.value && !nextLevel.value
  );

  function loadNextLevel() {
    if (nextLevel.value) {
      loadLevel(currentLevel.value + 1);
    } else {
      throw new Error("No more levels!");
    }
  }

  function restartLevel() {
    console.log("restarting");
    loadLevel(currentLevel.value);
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
