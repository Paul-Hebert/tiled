<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMoney } from "../../stores/money.ts";

const { playerMoney, income } = storeToRefs(useMoney());
console.log("wtf");
</script>

<template>
  <div>
    WTF
    <div>Money: {{ playerMoney }}</div>
    <div>Income: {{ income }}</div>
  </div>
</template>
