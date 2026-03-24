import { describe, it, expect, beforeEach } from "vitest";
import { useMovieCommentForm } from "@/composables/useMovieCommentForm";
import { errorMessage } from "@/utils/validators";

describe("useMovieCommentForm", () => {
  describe("success", () => {
    it("Init empty form", () => {
      const { form } = useMovieCommentForm();

      expect(form.value).toEqual({
        username: "",
        message: "",
        rating: 0,
      });
    });

    it("Reset form", () => {
      const { form, reset } = useMovieCommentForm();

      form.value.username = "John";
      form.value.rating = 2;
      form.value.message = "TEST";
      reset();

      expect(form.value.username).toBe("");
      expect(form.value.rating).toBe(0);
      expect(form.value.message).toBe("");
    });

    it("Check correct form pass the validation", async() => {
      const { form, v$ } = useMovieCommentForm();

      form.value.username = "John";
      form.value.message = "Hello world";
      form.value.rating = 5;

      await v$.value.$validate();
      expect(v$.value.$error).toBe(false);
    });
  });

  describe("Check validation errors", () => {
    beforeEach(() => {
      const { reset } = useMovieCommentForm();
      reset();
    });

    it("username errors", async() => {
      const { form, v$, getErrorMessages } = useMovieCommentForm();
      await v$.value.$validate();

      function checkErr(val: string, message: string) {
        form.value.username = val;
        const error = getErrorMessages("username");
        expect(error).toBe(message);
      }

      checkErr("", errorMessage.required$());
      checkErr("A", errorMessage.minLength$(3));
      checkErr("1", [errorMessage.alpha$(), errorMessage.minLength$(3)].join("\n"));
      checkErr("Ceciestunnomutilisateuravecplusdecinquantecaracteres", errorMessage.maxLength$(50));
      checkErr("Jacko Lantern", errorMessage.alpha$());
    });

    it("rating errors", async() => {
      const { form, v$, getErrorMessages } = useMovieCommentForm();
      await v$.value.$validate();

      function checkErr(val: string | number, message: string) {
        // @ts-expect-error For testing string error
        form.value.rating = val;
        const error = getErrorMessages("rating");
        expect(error).toBe(message);
      }

      checkErr("A", [errorMessage.numeric$(), errorMessage.minValue$(0), errorMessage.maxValue$(10)].join("\n"));
      checkErr(-1, [errorMessage.numeric$(), errorMessage.minValue$(0)].join("\n"));
      checkErr(12, errorMessage.maxValue$(10));
    });

    it("message errors", async() => {
      const { form, v$, getErrorMessages } = useMovieCommentForm();
      await v$.value.$validate();

      function checkErr(val: string, message: string) {
        form.value.message = val;
        const error = getErrorMessages("message");
        expect(error).toBe(message);
      }

      checkErr("", errorMessage.required$());
      checkErr("A", errorMessage.minLength$(3));
      checkErr("_", [errorMessage.alphaNumSpaces$(), errorMessage.minLength$(3)].join("\n"));

      const hugeStr = Array
        .from({ length: 502 })
        .map(() => "a")
        .join("");

      checkErr(hugeStr, errorMessage.maxLength$(500));
    });
  });
});
