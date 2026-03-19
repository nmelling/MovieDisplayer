import vuetify, { transformAssetUrls, } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/a11y", "@pinia/nuxt", "@vueuse/nuxt", "@nuxt/eslint",],
  devtools: { enabled: true, },
  css: ["~/assets/css/main.css",],
  build: {
    transpile: ["vuetify",],
  },
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [vuetify({ autoImport: true, },),],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  a11y: {
    enabled: true,
    defaultHighlight: true,
    logIssues: true,
    axe: {
      options: {},
      runOptions: {},
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
},);
