import {
  minLength,
  maxLength,
  required,
  alpha,
  alphaNum,
  numeric,
  minValue,
  maxValue,
  helpers,
} from "@vuelidate/validators";

export const errorMessage = {
  alpha$: () => "Caractères alphabétiques uniquement",
  alphaNum$: () => "Caractères alphanumériques uniquement",
  alphaNumSpaces$: () => "Caractères alphanumériques et espaces uniquement",
  numeric$: () => "Nombre uniquement",
  required$: () => "Champ requis",
  minLength$: (nb: number) => `Minimum ${nb} caractères`,
  maxLength$: (nb: number) => `Maximum ${nb} caractères`,
  minValue$: (nb: number) => `Valeur minimum: ${nb}`,
  maxValue$: (nb: number) => `Valeur maximum: ${nb}`,
} as const;

export const alpha$ = () => helpers.withMessage(errorMessage.alpha$(), alpha);
export const alphaNum$ = () => helpers.withMessage(errorMessage.alphaNum$(), alphaNum);
export const alphaNumSpaces$ = () => helpers.withMessage(errorMessage.alphaNumSpaces$(), helpers.regex(/^[a-zA-Z0-9\s]*$/));
export const numeric$ = () => helpers.withMessage(errorMessage.numeric$(), numeric);
export const required$ = () => helpers.withMessage(errorMessage.required$(), required);
export const minLength$ = (nb: number) => helpers.withMessage(errorMessage.minLength$(nb), minLength(nb));
export const maxLength$ = (nb: number) => helpers.withMessage(errorMessage.maxLength$(nb), maxLength(nb));
export const minValue$ = (nb: number) => helpers.withMessage(errorMessage.minValue$(nb), minValue(nb));
export const maxValue$ = (nb: number) => helpers.withMessage(errorMessage.maxValue$(nb), maxValue(nb));
