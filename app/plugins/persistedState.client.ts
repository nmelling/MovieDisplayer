// plugins/persistedState.client.ts
import { defineNuxtPlugin } from "#app";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export default defineNuxtPlugin(() => {
  const pinia = usePinia();
  pinia.use(piniaPluginPersistedstate);
});
