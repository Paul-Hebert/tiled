<script setup>
import { storeToRefs } from "pinia";
import { useBoardState } from "../../stores/board-state.ts";
const {
  filledSquares,
  totalSquares,
  percentRequiredComplete,
  percentComplete,
} = storeToRefs(useBoardState());
</script>

<template>
  <div>
    <h2>
      Cover {{ percentRequiredComplete * 100 }}% of the board to win ({{
        Math.ceil(percentComplete * 100)
      }}% complete)
    </h2>
    <progress :value="percentComplete"></progress>
  </div>
</template>

<style scoped>
div {
  display: grid;
  gap: 0.5em;
}
</style>
