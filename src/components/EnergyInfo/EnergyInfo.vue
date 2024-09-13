<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEnergy } from "../../stores/energy.ts";

const { playerEnergy } = storeToRefs(useEnergy());
</script>

<template>
  <div class="energy-info">
    <div>Energy: {{ playerEnergy }}</div>
  </div>
</template>
