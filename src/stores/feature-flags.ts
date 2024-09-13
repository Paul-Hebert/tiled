import { defineStore } from "pinia";
import { ref } from "vue";

export const useFeatureFlags = defineStore("feature-flags", () => {
  const featuresDefaults = {
    energy: false,
  };

  const features = ref({ ...featuresDefaults });

  return {
    features,
    disableFeature: (feature: keyof typeof featuresDefaults) => {
      features.value[feature] = false;
    },
    enableFeature: (feature: keyof typeof featuresDefaults) => {
      features.value[feature] = true;
    },
    resetFeatures: () => {
      features.value = { ...featuresDefaults };
    },
  };
});
