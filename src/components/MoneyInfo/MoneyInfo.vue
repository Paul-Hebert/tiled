<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMoney } from "../../stores/money.ts";

const { resourceCount } = storeToRefs(useMoney());
</script>

<template>
  <div class="money-info">
    Money: {{ resourceCount }}
  </div>
</template>
