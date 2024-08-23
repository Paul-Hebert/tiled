import { defineStore } from "pinia";
import { ref } from "vue";

export const useMoney = defineStore("money", () => {
  const playerMoney = ref(0);
  const income = ref(0);

  const canAfford = (cost: number) => playerMoney.value >= cost;

  const spend = (cost: number) => {
    if (!canAfford(cost)) {
      throw new Error("Insufficient funds");
    }

    playerMoney.value -= cost;
  };

  const earn = (amount: number) => (playerMoney.value += amount);
  const earnIncome = () => (playerMoney.value += income.value);
  const increaseIncome = (amount: number) => (income.value += amount);
  const setPlayerMoney = (amount: number) => (playerMoney.value = amount);
  const setPlayerIncome = (amount: number) => (income.value = amount);

  return {
    playerMoney,
    spend,
    canAfford,
    earn,
    income,
    earnIncome,
    increaseIncome,
    setPlayerMoney,
    setPlayerIncome,
  };
});
