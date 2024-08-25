<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMoney } from "../../stores/money.ts";

const { playerMoney, income } = storeToRefs(useMoney());
</script>

<template>
  <div class="money-info">
    <div>Money: {{ playerMoney }}</div>
    <div>Income: {{ income }}</div>
  </div>
</template>

<style scoped>
.money-info {
  display: flex;
  justify-content: space-between;
  gap: 1em;
}
</style>
