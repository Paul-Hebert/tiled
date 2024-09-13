import { useMessaging } from "../../../stores/messaging";
import { Level } from "../../../types/level";
import EnergyMessage from "./EnergyMessage.vue";

export const level2: Level = {
  title: "Planting the Seed",
  grid: new Array(6).fill(new Array(6).fill(0)),
  tiles: [
    [
      { shape: "Cross", price: 4 },
      { shape: "Short Bar", price: 1 },
      { shape: "Belly", price: 3 },
    ],
    [
      { shape: "Long Squiggle", price: 4 },
      { shape: "Little L", price: 5 },
      { shape: "Belly", price: 3 },
    ],
    [
      { shape: "Plus", price: 3 },
      { shape: "Short Bar", price: 5 },
      { shape: "Belly", price: 6 },
    ],
    [
      { shape: "Long Bar", price: 6 },
      { shape: "Mid Bar", price: 2 },
      { shape: "U" },
    ],
    [
      { shape: "Stubby T", price: 4 },
      { shape: "Short Bar", price: 2 },
      { shape: "Belly" },
    ],
  ],
  events: [
    {
      action: () => {
        const messagingStore = useMessaging();

        messagingStore.setModalMessage({
          title: "Energy, energy, energy!",
          message: EnergyMessage,
        });
      },
    },
  ],
};
