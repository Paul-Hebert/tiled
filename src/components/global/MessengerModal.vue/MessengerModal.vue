<script setup lang="ts">
import { type Component, nextTick, type Ref, ref, watch } from "vue";
import Modal from "../../Modal/Modal.vue";
import { useMessaging } from "../../../stores/messaging.ts";

const modal = ref();

export interface ModalMessage {
  message: Component;
  title: string;
  additionalButtonAction?: () => void;
}

const message: Ref<ModalMessage | undefined> = ref();

const messagingStore = useMessaging();

watch(
  () => messagingStore.modalMessage,
  (newMessage) => {
    message.value = newMessage;

    nextTick(() => modal.value.show());
  }
);
</script>

<template>
  <Modal
    v-if="message"
    :additional-button-action="message.additionalButtonAction"
    ref="modal"
  >
    <template #title>{{ message.title }}</template>
    <component :is="message.message" />
  </Modal>
</template>
