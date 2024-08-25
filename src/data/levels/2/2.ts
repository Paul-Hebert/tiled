import { useFeatureFlags } from "../../../stores/feature-flags";
import { useMessaging } from "../../../stores/messaging";
import { Level } from "../../../types/level";
import MoneyMessage from "./MoneyMessage.vue";

export const level2: Level = {
  title: "Planting the Seed",
  grid: new Array(6).fill(new Array(6).fill(0)),
  tiles: [
    [{ shape: "2-Square" }, { shape: "Little L" }, { shape: "Mid Bar" }],
    [{ shape: "2-Square" }, { shape: "Little L" }, { shape: "Mid Bar" }],
  ],
  events: [
    {
      action: () => {
        const featureFlagsStore = useFeatureFlags();
        const messagingStore = useMessaging();

        featureFlagsStore.enableFeature("money");

        messagingStore.setModalMessage({
          title: "Money, money, money!",
          message: MoneyMessage,
        });
      },
    },
  ],
};
