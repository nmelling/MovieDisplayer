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

export const alpha$ = helpers.withMessage("Caractères alphabétiques uniquement", alpha);
export const alphaNum$ = helpers.withMessage("Caractères alphanumériques uniquement", alphaNum);
export const numeric$ = helpers.withMessage("Nombre uniquement", numeric);
export const required$ = helpers.withMessage("Champ requis", required);
export const minLength$ = (nb: number) => helpers.withMessage(`Minimum ${nb} caractères`, minLength(nb));
export const maxLength$ = (nb: number) => helpers.withMessage(`Maximum ${nb} caractères`, maxLength(nb));
export const minValue$ = (nb: number) => helpers.withMessage(`Valeur minimum: ${nb}`, minValue(nb));
export const maxValue$ = (nb: number) => helpers.withMessage(`Valeur maximum: ${nb}`, maxValue(nb));
