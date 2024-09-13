import { defineStore } from "pinia";
import { ref } from "vue";

export const useEnergy = defineStore("energy", () => {
  const playerEnergy = ref(0);

  const canAfford = (cost: number) => playerEnergy.value >= cost;

  const spend = (cost: number) => {
    if (!canAfford(cost)) {
      throw new Error("Insufficient funds");
    }

    playerEnergy.value -= cost;
  };

  const earn = (amount: number) => (playerEnergy.value += amount);
  const setPlayerEnergy = (amount: number) => {
    playerEnergy.value = amount;
    console.log(playerEnergy.value);
  };

  return {
    playerEnergy,
    spend,
    canAfford,
    earn,
    setPlayerEnergy,
  };
});
