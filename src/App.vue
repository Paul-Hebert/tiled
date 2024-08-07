<script setup lang="ts">
import GameBoard from "./components/GameBoard/GameBoard.vue";
import PrimaryControls from "./components/PrimaryControls/PrimaryControls.vue";
</script>

<template>
  <div class="game-screen">
    <GameBoard :scale="10" :gridSize="10" />

    <PrimaryControls class="primary-controls" />
  </div>
</template>

<style scoped>
svg {
  overflow: visible;
  width: 100%;
  height: 100%;
}

.game-screen {
  max-height: 90svh;
  max-width: 95svw;
  padding: 1em;
  display: grid;
  place-content: center;
  grid-template-rows: 1fr auto;
  gap: 1em;
  width: 100%;
  height: 100%;
}

.primary-controls {
  width: min(25em, 95svw);
  place-self: center;
}
</style>
