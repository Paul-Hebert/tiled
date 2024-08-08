<script setup>
import { storeToRefs } from "pinia";
import { useBoardState } from "../../stores/board-state.ts";
const { filledSquares, totalSquares } = storeToRefs(useBoardState());
</script>

<template>
  <progress :value="filledSquares" :max="totalSquares"></progress>
</template>
