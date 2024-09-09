<script setup lang="ts">
import Button from "../../Button/Button.vue";

defineProps<{ price: number; }>();
</script>

<template>
  <Button>
    <div v-if="price > 0" class="cost">{{ price }}</div>
    <slot />
  </Button>
</template>

<style scoped>
.cost {
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
</style>
