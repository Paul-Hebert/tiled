import { useFeatureFlags } from "../../stores/feature-flags";
import { Level } from "../../types/level";

export const level1: Level = {
  title: "Fertile Ground",
  grid: new Array(4).fill(new Array(4).fill(0)),
  tiles: [
    [{ shape: "Belly" }, { shape: "Stubby T" }, { shape: "Long Bar" }],
    [{ shape: "2-Square" }, { shape: "Little L" }, { shape: "Mid Bar" }],
    [{ shape: "Belly" }, { shape: "Short Bar" }, { shape: "Little L" }],
    [{ shape: "2-Square" }, { shape: "Little L" }, { shape: "Patch" }],
    [{ shape: "Patch" }, { shape: "Short Bar" }, { shape: "Little L" }],
    [{ shape: "Short Bar" }, { shape: "Little L" }, { shape: "Patch" }],
  ],
  events: [
    {
      action: () => {
        const featureFlagsStore = useFeatureFlags();

        featureFlagsStore.resetFeatures();
      },
    },
  ],
};
