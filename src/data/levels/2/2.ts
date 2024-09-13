import { useFeatureFlags } from "../../../stores/feature-flags";
import { useMessaging } from "../../../stores/messaging";
import { Level } from "../../../types/level";
import EnergyMessage from "./EnergyMessage.vue";

export const level2: Level = {
  title: "Planting the Seed",
  grid: new Array(6).fill(new Array(6).fill(0)),
  tiles: [
    [
      { shape: "Cross", income: 1, price: 4 },
      { shape: "Short Bar", income: 1, price: 1 },
      { shape: "Belly", income: 1, price: 3 },
    ],
    [
      { shape: "Long Squiggle", income: 1, price: 4 },
      { shape: "Little L", price: 5 },
      { shape: "Belly", price: 3 },
    ],
    [
      { shape: "Plus", price: 3 },
      { shape: "Short Bar", price: 5 },
      { shape: "Belly", income: 1, price: 6 },
    ],
    [
      { shape: "Long Bar", income: 1, price: 6 },
      { shape: "Mid Bar", price: 2 },
      { shape: "U" },
    ],
    [
      { shape: "Stubby T", income: 1, price: 4 },
      { shape: "Short Bar", income: 0, price: 2 },
      { shape: "Belly" },
    ],
  ],
  events: [
    {
      action: () => {
        const featureFlagsStore = useFeatureFlags();
        const messagingStore = useMessaging();

        featureFlagsStore.enableFeature("energy");

        messagingStore.setModalMessage({
          title: "Energy, energy, energy!",
          message: EnergyMessage,
        });
      },
    },
  ],
};
