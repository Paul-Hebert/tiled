<script setup>
import { storeToRefs } from "pinia";
import { useBoardState } from "../../stores/board-state.ts";
import { useLevels } from "../../stores/levels.ts";
import Button from "../Button/Button.vue";
const {
  filledSquares,
  totalSquares,
  percentRequiredComplete,
  percentComplete,
  isComplete,
} = storeToRefs(useBoardState());

const levelsStore = useLevels();

const { gameComplete } = storeToRefs(levelsStore);
</script>

<template>
  <div>
    <template v-if="gameComplete">
      <h2>You won the game!</h2>
    </template>
    <template v-else>
      <h2 v-if="isComplete">Level complete!</h2>
      <h2 v-else>
        Cover {{ percentRequiredComplete * 100 }}% of the board to win ({{
          Math.ceil(percentComplete * 100)
        }}% complete)
      </h2>

      <progress :value="percentComplete"></progress>
    </template>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  font-size: 1.125rem;
}
div {
  display: grid;
  gap: 0.5em;
}
</style>
