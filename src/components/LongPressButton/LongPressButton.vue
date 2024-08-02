<script setup lang="ts">
import { ref } from "vue";
import Button from "../Button/Button.vue";

const emit = defineEmits(["longPress"]);

const interval = ref();

function startLongPress() {
  emit("longPress");

  interval.value = setInterval(() => {
    emit("longPress");
  }, 150);
}

function endLongPress() {
  clearInterval(interval.value);
}
</script>

<template>
  <Button
    @pointerdown="startLongPress"
    @pointerup="endLongPress"
    @touchstart.prevent="() => {}"
    @touchmove.prevent="() => {}"
    @touchend.prevent="() => {}"
    @touchcancel.prevent="() => {}"
  >
    <slot />
  </Button>
</template>
