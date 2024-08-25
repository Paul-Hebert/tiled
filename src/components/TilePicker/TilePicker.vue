<script setup lang="ts">
import { computed } from "vue";
import { useBoardState } from "../../stores/board-state.ts";
import { TileData } from "../../types/tile-data.ts";
import { useMoney } from "../../stores/money.ts";
import TilePickerButton from "./subcomponents/TilePickerButton.vue";
import ButtonWithPrice from "./subcomponents/ButtonWithPrice.vue";
import { RefreshCwIcon } from "lucide-vue-next";

const props = defineProps<{ tiles: TileData[] }>();
const emit = defineEmits(["refresh"]);

const boardStateStore = useBoardState();
const { setCurrentTile } = boardStateStore;

const { canAfford, spend } = useMoney();

const scale = 10;

const biggestTileSize = computed(() =>
  Math.max(...props.tiles.map((tile) => tile.shape.grid.length))
);

const patch = computed(() =>
  props.tiles.find((tile) => tile.shape.name === "Patch")
);

const tilesWithoutPatch = computed(() =>
  props.tiles.filter((tile) => tile.shape.name !== "Patch")
);

const resetPrice = 3;
</script>

<template>
  <div class="wrapper">
    <h2>Pick a Tile</h2>
    <div class="tile-picker">
      <div class="tiles">
        <TilePickerButton
          @click="setCurrentTile(tile)"
          v-for="tile in tilesWithoutPatch"
          :key="tile.id"
          :grid-size="biggestTileSize"
          :scale="scale"
          :tile="tile"
          :canAfford="canAfford(tile.price)"
          class="big-tile-button"
        />
      </div>

      <div class="additional-options">
        <TilePickerButton
          v-if="patch"
          @click="setCurrentTile(patch)"
          :grid-size="1"
          :scale="scale / 2"
          :tile="patch"
          :canAfford="canAfford(patch.price)"
        />

        <ButtonWithPrice
          :price="resetPrice"
          :disabled="!canAfford(resetPrice)"
          :income="0"
          class="additional-option"
          @click="
            () => {
              spend(resetPrice);
              emit('refresh');
            }
          "
        >
          <span class="refresh-inner">
            <RefreshCwIcon />
            New Tiles
          </span>
        </ButtonWithPrice>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  justify-self: center;
  width: 100%;
  gap: 1em;
  display: grid;
}

.tile-picker {
  display: grid;
  gap: 1.5em;
}

.tiles {
  display: flex;
  gap: 1em;
  justify-content: space-around;
}

.additional-options {
  display: flex;
  gap: 1em;
  justify-self: center;
}

.big-tile-button {
  flex: 1;
  height: 100%;
  height: clamp(4.5em, 20vh, 8em);
  flex-grow: 0;
  flex-shrink: 1;
}

.refresh-inner {
  display: flex;
  gap: 0.5em;
}
</style>
