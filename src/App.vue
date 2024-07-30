<script setup lang="ts">
import Board from "./components/Board/Board.vue";
import Tile from "./components/Tile/Tile.vue";
import { onMounted, ref } from "vue";
import { shapes } from "./data/shapes";

const scale = 10;
const gridSize = 10;

const pos = ref({ x: 0, y: 0 });
const placed = ref(false);

onMounted(() => {
  document.addEventListener("keydown", (e) => {
    console.log(e);
    switch (e.key) {
      case "ArrowUp":
        pos.value.y -= 1;
        break;
      case "ArrowDown":
        pos.value.y += 1;
        break;
      case "ArrowLeft":
        pos.value.x -= 1;
        break;
      case "ArrowRight":
        pos.value.x += 1;
        break;
      case "Enter":
        placed.value = !placed.value;
        break;
    }
  });
});
</script>

<template>
  <div class="game-screen">
    <svg :viewBox="`0 0 ${scale * gridSize} ${scale * gridSize}`">
      <Board :size="gridSize" :scale="scale" />
      <Tile
        :size="10"
        :scale="scale"
        :x="pos.x"
        :y="pos.y"
        :shape="shapes.T"
        :placed="placed"
      />
    </svg>
  </div>
</template>

<style scoped>
svg {
  overflow: visible;
  width: 100%;
  height: 100%;
}

.game-screen {
  max-width: 90svw;
  max-height: 90svh;
  padding: 1em;
  display: grid;
  place-content: center;
}
</style>
