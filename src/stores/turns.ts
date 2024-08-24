import { defineStore } from "pinia";
import { ref } from "vue";

export const useTurns = defineStore("turns", () => {
  const turn = ref(0);

  return {
    turn,
    nextTurn: () => turn.value++,
    resetTurns: () => (turn.value = 0),
  };
});
