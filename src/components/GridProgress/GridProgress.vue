<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardState } from "../../stores/board-state.ts";
import { useLevels } from "../../stores/levels.ts";
import Button from "../Button/Button.vue";
const { filledSquares, totalSquares, isComplete } = storeToRefs(
  useBoardState()
);

const levelsStore = useLevels();
</script>

<template>
  <div>
    <header v-if="isComplete">
      <h2>Level complete!</h2>
    </header>
    <header v-else>
      <span>
        <h2>{{ filledSquares }}/{{ totalSquares }} spaces filled</h2>
      </span>

      <Button @click="levelsStore.restartLevel">Restart Level</Button>
    </header>

    <progress :value="filledSquares" :max="totalSquares" />
  </div>
</template>

<style scoped>
header {
  display: flex;
  gap: 0.5em;
  justify-content: space-between;
  align-items: center;
}

div {
  display: grid;
  gap: 0.5em;
}

progress {
  display: block;
  width: 100%;
}
</style>
