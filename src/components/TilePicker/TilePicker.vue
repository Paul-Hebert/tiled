<script setup lang="ts">
import { computed } from "vue";
import Tile from "../Tile/Tile.vue";
import Button from "../Button/Button.vue";
import BackgroundGrid from "../BackgroundGrid/BackgroundGrid.vue";
import { useBoardState } from "../../stores/board-state.ts";
import { TileData } from "../../types/tile-data.ts";
import { useMoney } from "../../stores/money.ts";

const props = defineProps<{ tiles: TileData[] }>();

const boardStateStore = useBoardState();
const { setCurrentTile } = boardStateStore;

const { canAfford } = useMoney();

const scale = 10;

const biggestTileSize = computed(() =>
  Math.max(...props.tiles.map((tile) => tile.shape.grid.length))
);
</script>

<template>
  <div class="wrapper">
    <h2>Pick a Tile</h2>
    <div class="tile-picker">
      <Button
        v-for="tile in tiles"
        :key="tile.id"
        @click="() => setCurrentTile(tile)"
        class="tile-button"
        :disabled="!canAfford(tile.price)"
      >
        <div v-if="tile.income > 0" class="income">{{ tile.income }}</div>
        <div v-if="tile.price > 0" class="cost">{{ tile.price }}</div>

        <svg
          :viewBox="`0 0 ${biggestTileSize * scale} ${biggestTileSize * scale}`"
          class="tile"
          width="1000"
          height="1000"
        >
          <BackgroundGrid :scale="scale" :size="biggestTileSize" />
          <Tile
            v-bind="tile"
            :offset="{ x: 0, y: 0 }"
            :scale="10"
            placed
            :grid-size="biggestTileSize"
          />
        </svg>

        <div class="can-not-afford" v-if="!canAfford(tile.price)">
          Too expensive!
        </div>
      </Button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  justify-self: center;
  width: 100%;
  max-width: 25em;
  gap: 1em;
  display: grid;
}

.tile-picker {
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  place-content: center;
}

.tile-button {
  border-radius: 0.25em;
  aspect-ratio: 1;
  height: 100%;
  display: flex;
}

svg {
  max-width: 100%;
  max-height: 100%;
}

.cost,
.income {
  --size: 1.5em;

  display: grid;
  place-content: center;
  aspect-ratio: 1;
  width: var(--size);
  position: absolute;
  right: calc(var(--size) * -0.5);
  color: #fff;
  border-radius: 50%;
}

.cost {
  background-color: red;
  top: calc(var(--size) * -0.5);
}

.income {
  background-color: green;
  bottom: calc(var(--size) * -0.5);
}

.can-not-afford {
  background: red;
  position: absolute;
  inset: 0;
  color: #fff;
}
</style>
