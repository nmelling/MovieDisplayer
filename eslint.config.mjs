// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "no-unused-vars": "off",
    "vue/no-multiple-template-root": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/semi": ["error", "always"],
    "@stylistic/comma-dangle": ["error", "only-multiline"],
    "@stylistic/object-curly-spacing": ["error", "always"],
    "@stylistic/space-before-function-paren": ["error", "never"]
  },
});
