import { defineStore } from "pinia";
import { ref } from "vue";

export function useResourceStore(name: string) {
  return defineStore(name, () => {
    const resourceCount = ref(0);

    const canAfford = (cost: number) => resourceCount.value >= cost;

    const spend = (cost: number) => {
      if (!canAfford(cost)) {
        throw new Error(`Insufficient ${name}`);
      }

      resourceCount.value -= cost;
    };

    const earn = (amount: number) => (resourceCount.value += amount);
    const setResourceCount = (amount: number) => {
      resourceCount.value = amount;
    };

    return {
      resourceCount,
      spend,
      canAfford,
      earn,
      setResourceCount,
    };
  });
}
