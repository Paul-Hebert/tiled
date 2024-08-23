<script setup lang="ts">
import Button from "../../Button/Button.vue";

defineProps<{ price: number; income: number }>();
</script>

<template>
  <Button>
    <div v-if="income > 0" class="income">{{ income }}</div>
    <div v-if="price > 0" class="cost">{{ price }}</div>
    <slot />
  </Button>
</template>

<style scoped>
.cost,
.income {
  --size: 1.5em;

  display: grid;
  place-content: center;
  aspect-ratio: 1;
  width: var(--size);
  position: absolute;
  right: calc(var(--size) * -0.5);
  color: #fff;
  border-radius: 50%;
}

.cost {
  background-color: red;
  top: calc(var(--size) * -0.5);
}

.income {
  background-color: green;
  bottom: calc(var(--size) * -0.5);
}
</style>
