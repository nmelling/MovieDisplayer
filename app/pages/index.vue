<script setup lang="ts">
import MoviesList from "~/components/moviesList.vue";

const { movies, pending, error, noMoreResults, setNextPage, retry } = await useListMovies();

async function onFetchRequested(doneCb: DoneCallback) {
  // Si on est en erreur, on retente le fetch sur la même page
  if (error.value) await retry();
  else await setNextPage();

  if (error.value) doneCb("error");
  else if (noMoreResults.value) doneCb("empty");
  else doneCb("ok");
}
</script>

<template>
  <v-container class="min-h-dvh flex flex-col">
    <header class="sticky-header  bg-white">
      <div class="flex items-center justify-center">
        <h1 class="mx-2">
          Liste des films
        </h1>
        <v-progress-circular
          v-show="pending"
          indeterminate
          color="primary"
          aria-label="Chargement des films"
        />
      </div>
    </header>
    <v-container class="flex-1 overflow-y-auto ">
      <MoviesList
        :movies="movies"
        :error="error"
        @fetch-requested="onFetchRequested"
      />
    </v-container>
  </v-container>
</template>

<style lang="scss">
</style>
