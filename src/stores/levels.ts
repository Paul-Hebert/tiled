import { defineStore, storeToRefs } from "pinia";
import { Level } from "../types/level";
import { computed, ref } from "vue";
import { useBoardState } from "./board-state";
import { useMoney } from "./money";
import { useTurns } from "./turns";
import { level1 } from "../data/levels/1/1";
import { generateTile } from "../helpers/generate-tile";
import { level2 } from "../data/levels/2/2";

export const useLevels = defineStore("levels", () => {
  const boardStateStore = useBoardState();
  const { isComplete: levelIsComplete } = storeToRefs(boardStateStore);

  const turnsStore = useTurns();
  const { resetTurns } = turnsStore;
  const { turn } = storeToRefs(turnsStore);

  const moneyStore = useMoney();

  const levels: Level[] = [level1, level2];

  const currentLevelIndex = ref(0);
  const currentLevel = computed(() => levels[currentLevelIndex.value]);

  function loadLevel(level: number) {
    resetTurns();
    boardStateStore.loadLevel(levels[level]);
    currentLevelIndex.value = level;

    // Run starting events
    currentLevel.value.events?.forEach((event) => event.action());

    moneyStore.setResourceCount(10);
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

  function restartLevel() {
    console.log("restarting");
    loadLevel(currentLevelIndex.value);
  }

  function loadTilesForTurn() {
    const turnTiles = currentLevel.value.tiles;
    let tileIndex = turn.value;

    while (tileIndex >= turnTiles.length) {
      tileIndex -= turnTiles.length;
    }

    // TODO: Is structured clone necessary here?
    return structuredClone(turnTiles[tileIndex]).map((tile) =>
      generateTile(tile)
    );
  }

  return {
    levels,
    currentLevel,
    currentLevelIndex,
    loadLevel,
    loadNextLevel,
    gameComplete,
    restartLevel,
    loadTilesForTurn,
  };
});
