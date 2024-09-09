<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useBoardState } from "../../stores/board-state.ts";
import { TileData } from "../../types/tile-data.ts";
import { useMoney } from "../../stores/money.ts";
import TilePickerButton from "./subcomponents/TilePickerButton.vue";
import ButtonWithPrice from "./subcomponents/ButtonWithPrice.vue";
import { RefreshCwIcon } from "lucide-vue-next";
import { useFeatureFlags } from "../../stores/feature-flags.ts";
import { storeToRefs } from "pinia";
import { generateTile, GenerateTileArgs } from "../../helpers/generate-tile.ts";
import { useTurns } from "../../stores/turns.ts";
import MoneyInfo from "../MoneyInfo/MoneyInfo.vue";

const props = defineProps<{ tiles: TileData[] }>();
const emit = defineEmits(["refresh"]);

const boardStateStore = useBoardState();
const { setCurrentTile } = boardStateStore;

const featureFlagsStore = useFeatureFlags();
const { features } = storeToRefs(featureFlagsStore);

const { canAfford, spend } = useMoney();

const { turn } = storeToRefs(useTurns());

const scale = 10;

const biggestTileSize = computed(() =>
  Math.max(...props.tiles.map((tile) => tile.shape.grid.length))
);

const patchArgs: GenerateTileArgs = { shape: "Patch", price: 5 };
const patch = ref(generateTile(patchArgs));

watch(
  () => turn.value,
  () => {
    patch.value = generateTile(patchArgs);
  }
);

const resetPrice = 5;
</script>

<template>
  <div class="wrapper">
    <header>
      <h2>Pick a Tile</h2>

      <MoneyInfo class="money-info" v-if="features.money" />
    </header>
    <div class="tile-picker">
      <div class="tiles">
        <TilePickerButton
          @click="setCurrentTile(tile)"
          v-for="tile in tiles"
          :key="tile.id"
          :grid-size="biggestTileSize"
          :scale="scale"
          :tile="tile"
          :canAfford="canAfford(tile.price)"
          class="big-tile-button"
        />
      </div>

      <div class="additional-options" v-if="features.money">
        <TilePickerButton
          v-if="patch"
          @click="setCurrentTile(patch)"
          :grid-size="1"
          :scale="scale / 2"
          :canAfford="canAfford(patch.price)"
          :tile="patch"
        />

        <ButtonWithPrice
          :price="resetPrice"
          :disabled="!canAfford(resetPrice)"
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
  height: clamp(4.5em, 20vh, 7em);
  flex-grow: 0;
  flex-shrink: 1;
}

.refresh-inner {
  display: flex;
  gap: 0.5em;
}

header {
  display: flex;
  justify-content: space-between;
}
</style>
