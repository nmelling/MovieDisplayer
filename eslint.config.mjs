// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/semi": ["error", "always"],
    "@stylistic/comma-dangle": ["error", "always"],
    "@stylistic/object-curly-spacing": ["error", "always"],
    "@stylistic/space-before-function-paren": ["error", "never"]
  },
});
