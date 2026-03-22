import { useVuelidate } from "@vuelidate/core";

export function useMovieCommentForm() {
  function makeBlankForm() {
    return {
      username: "",
      message: "",
      rating: 0,
    };
  }

  const form = useState<MovieCommentForm>(() => makeBlankForm());

  const rules = computed(() => ({
    username: {
      alpha: alpha$,
      minLength: minLength$(3),
      maxLength: maxLength$(50),
      required: required$,
    },
    message: {
      alphaNum: alphaNumSpaces$,
      minLength: minLength$(3),
      maxLength: maxLength$(500),
      required: required$,
    },
    rating: {
      numeric: numeric$,
      minValue: minValue$(0),
      maxValue: maxValue$(10),
    },
  }));

  const v$ = useVuelidate(rules, form);

  function reset() {
    form.value = makeBlankForm();
  }

  function getErrorMessages(key: keyof MovieCommentForm) {
    return (v$.value[key].$errors ?? [])
      .map(e => e.$message)
      .filter(Boolean)
      .join("\n");
  }

  return {
    form,
    reset,
    v$,
    getErrorMessages,
  };
}
