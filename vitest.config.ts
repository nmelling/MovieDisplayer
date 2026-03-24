import { defineVitestConfig } from "@nuxt/test-utils/config";
import { fileURLToPath } from "node:url";

export default defineVitestConfig({
  // To bypass bun:test error (cf: https://github.com/nuxt/test-utils/issues/1490)
  plugins: [
    {
      name: "ignore-bun-test",
      enforce: "pre",
      resolveId(id) {
        if (id === "bun:test") {
          return { id: "bun:test", external: true };
        }
      }
    }
  ],
  test: {
    environment: "nuxt",
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL("./", import.meta.url)),
        domEnvironment: "happy-dom",
      }
    },
  },
});
