import { defineStore } from "pinia";
import { ref } from "vue";

export const useVitality = defineStore("vitality", () => {
  const vitality = ref(100);

  const loseVitality = (amount: number) => {
    vitality.value -= amount;
  };
  const gainVitality = (amount: number) => (vitality.value += amount);

  const setVitality = (amount: number) => {
    vitality.value = amount;
  };

  return {
    vitality,
    loseVitality,
    gainVitality,
    setVitality,
  };
});
