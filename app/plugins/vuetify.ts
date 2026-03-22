// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "~/assets/styles/layers.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    display: {
      mobileBreakpoint: "md",
      thresholds: {
        // repeated in tailwind.css and settings.scss
        xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920, xxl: 2560,
      },
    },
  });
  app.vueApp.use(vuetify);
});
