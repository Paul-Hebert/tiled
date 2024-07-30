<script setup lang="ts">
import Grid from "./components/Grid/Grid.vue";
import Shape from "./components/Shape/Shape.vue";
import { onMounted, ref } from "vue";

const scale = 10;
const gridSize = 10;

const pos = ref({ x: 0, y: 0 });

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
    }
  });
});
</script>

<template>
  <div class="game-screen">
    <svg :viewBox="`0 0 ${scale * gridSize} ${scale * gridSize}`">
      <Grid :size="gridSize" :scale="scale" />
      <Shape
        :size="10"
        :scale="scale"
        :x="pos.x"
        :y="pos.y"
        :shape="[
          [0, 0, 1],
          [1, 1, 1],
          [0, 0, 1],
        ]"
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
  overflow: hidden;
  display: grid;
  place-content: center;
}
</style>
