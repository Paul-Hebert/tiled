<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEnergy } from "../../stores/energy.ts";
import { useVitality } from "../../stores/vitality.ts"

const { energy } = storeToRefs(useEnergy());
const { vitality } = storeToRefs(useVitality());
</script>

<template>
  <div class="player-stats">
    <div>Vitality (HP): {{ vitality }}</div>
    <div>Energy: {{ energy }}</div>
  </div>
</template>

<style scoped>
.player-stats {
  display: flex;
  justify-content: space-between;
  gap: 0.5em;
}
</style>