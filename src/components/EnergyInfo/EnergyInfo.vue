<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEnergy } from "../../stores/energy.ts";

const { energy } = storeToRefs(useEnergy());
</script>

<template>
  <div class="energy-info">
    <div>Energy: {{ energy }}</div>
  </div>
</template>
