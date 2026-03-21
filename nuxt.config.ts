import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/a11y", "@pinia/nuxt", "@vueuse/nuxt", "@nuxt/eslint"],
  ssr: true,
  devtools: { enabled: true },
  app: {
    head: {
      title: "Movie Displayer",
      htmlAttrs: {
        lang: "fr"
      }
    }
  },
  css: [
    "vuetify/styles",
    "@/assets/styles/tailwind.css",
    "@/assets/styles/utilities.scss",
  ],
  runtimeConfig: {
    tmdbAccessToken: "",
  },
  build: {
    transpile: ["vuetify"],
  },
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [vuetify({ autoImport: true })],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
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
});
