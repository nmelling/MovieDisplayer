import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"],
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/a11y", "@pinia/nuxt", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  a11y: {
    enabled: true,
    defaultHighlight: true,
    logIssues: true,
    axe: {
      options: {},
      runOptions: {},
    },
  },
  vite: {
    plugins: [vuetify({ autoImport: true })],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
