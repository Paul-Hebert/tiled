<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEnergy } from "../../stores/energy.ts";

const { playerEnergy, income } = storeToRefs(useEnergy());
</script>

<template>
  <div class="energy-info">
    <div>Energy: {{ playerEnergy }}</div>
    <div>Income: {{ income }}</div>
  </div>
</template>

<style scoped>
.energy-info {
  display: flex;
  justify-content: space-between;
  gap: 1em;
}
</style>
