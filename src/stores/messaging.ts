import { defineStore } from "pinia";
import { type Ref, ref } from "vue";
import { ModalMessage } from "../components/global/MessengerModal.vue/MessengerModal.vue";

export const useMessaging = defineStore("messaging", () => {
  const modalMessage: Ref<ModalMessage | undefined> = ref();

  const setModalMessage = (message: ModalMessage) =>
    (modalMessage.value = message);

  return { modalMessage, setModalMessage };
});
