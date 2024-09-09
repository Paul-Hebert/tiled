import { useResourceStore } from "../composables/use-resource-store";

export const useMoney = () =>  useResourceStore("money");
