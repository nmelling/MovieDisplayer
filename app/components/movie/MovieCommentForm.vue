<script setup lang="ts">
const { movieId } = defineProps<{
  movieId: number
}>();

const { form, reset, v$, getErrorMessages } = useMovieCommentForm();
const { storeComment } = useMovieCommentsStore();

function onClickReset() {
  reset();
  v$.value.$reset();
}

function onSubmit() {
  const isValid = v$.value.$validate();
  if (!isValid) {
    return;
  }
  storeComment(form.value, movieId);
  onClickReset();
}
</script>

<template>
  <v-container>
    <h2 class="text-center">
      Ajouter un commentaire
    </h2>
    <v-form
      @submit.prevent="onSubmit"
    >
      <v-text-field
        v-model="form.username"
        label="Nom d'utilisateur"
        variant="underlined"
        prepend-icon="mdi-account"
        clearable
        :error="v$.username.$error"
        :error-messages="getErrorMessages('username')"
        @blur="v$.username.$touch()"
      />
      <section class="flex items-center flex-nowrap gap-2">
        <div class="opacity-80">
          ({{ form.rating }})
        </div>
        <v-rating
          v-model="form.rating"
          half-increments
          hover
          size="18"
          length="5"
          color="warning"
          :error="v$.rating.$error"
          :error-messages="getErrorMessages('rating')"
          @blur="v$.rating.$touch()"
        />
      </section>
      <v-textarea
        v-model="form.message"
        label="Commentaire"
        variant="underlined"
        prepend-icon="mdi-comment-text-multiple"
        clearable
        :error="v$.message.$error"
        :error-messages="getErrorMessages('message')"
        @blur="v$.message.$touch()"
      />
      <v-row density="comfortable">
        <v-col
          cols="12"
          md="6"
        >
          <v-btn
            class="mt-2"
            type="button"
            block
            @click="onClickReset"
          >
            Annuler
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-btn
            class="mt-2"
            type="submit"
            block
            color="primary"
            :disabled="v$.$invalid"
          >
            Soumettre
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<style>

</style>
