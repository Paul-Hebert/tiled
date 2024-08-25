<script setup lang="ts">
import { ref } from "vue";
import Button from "../Button/Button.vue";

const dialog = ref();

defineProps<{
  additionalButtonAction?: () => void;
}>();

defineExpose({ show: () => dialog.value.showModal() });
</script>

<template>
  <dialog ref="dialog">
    <header>
      <h1><slot name="title" /></h1>
    </header>

    <slot />

    <Button
      @click="
        () => {
          dialog.close();
          additionalButtonAction?.();
        }
      "
      class="modal-button"
    >
      <slot name="button-text">Got it!</slot>
    </Button>
  </dialog>
</template>

<style scoped>
dialog[open] {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em;
  border-radius: 0.5em;
  border: none;
  margin: auto;
  max-width: 60ch;
}

::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.modal-button {
  margin-top: 1em;
}
</style>
