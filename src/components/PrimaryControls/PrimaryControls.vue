<script setup lang="ts">
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  RotateCcwIcon,
  RotateCwIcon,
} from "lucide-vue-next";
import Button from "../Button/Button.vue";
import { Commands } from "../../types/commands.ts";
defineProps<{ commands: Commands }>();
</script>

<template>
  <div class="controls">
    <Button @click="commands.rotateBlockLeft">
      <RotateCcwIcon aria-label="Rotate counter-clockwise" />
    </Button>
    <Button @click="commands.moveBlockUp">
      <ArrowUpIcon aria-label="Move up" />
    </Button>
    <Button @click="commands.rotateBlockRight">
      <RotateCwIcon aria-label="Rotate clockwise" />
    </Button>
    <Button @click="commands.moveBlockLeft">
      <ArrowLeftIcon aria-label="Move left" />
    </Button>
    <Button @click="commands.moveBlockDown">
      <ArrowDownIcon aria-label="Move down" />
    </Button>
    <Button @click="commands.moveBlockRight">
      <ArrowRightIcon aria-label="Move right" />
    </Button>
    <Button @click="commands.placeBlock" class="place">Place Tile</Button>
  </div>
</template>

<style scoped>
.controls {
  display: grid;
  gap: 0.75em;
  grid-template-areas:
    "rotate-left up rotate-right"
    "left down right"
    "place place place";
}

.place {
  grid-area: place;
}
</style>
