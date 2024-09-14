import { defineStore } from "pinia";
import { ref } from "vue";

export const useEnergy = defineStore("energy", () => {
  const energy = ref(0);

  const canAfford = (cost: number) => energy.value >= cost;

  const spendEnergy = (cost: number) => {
    if (!canAfford(cost)) {
      throw new Error("Insufficient funds");
    }

    energy.value -= cost;
  };

  const gainEnergy = (amount: number) => (energy.value += amount);
  const setEnergy = (amount: number) => {
    energy.value = amount;
    console.log(energy.value);
  };

  return {
    energy,
    gainEnergy,
    spendEnergy,
    canAfford,
    setEnergy,
  };
});
