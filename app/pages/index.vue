<script setup lang="ts">
import MoviesList from "~/components/moviesList.vue";

const store = useMoviesStore();
if (!store.hydrated) {
  await store.fetch(true);
}
</script>

<template>
  <header class="flex items-center justify-center">
    <h1 class="mx-2">
      Liste des films
    </h1>
    <v-progress-circular
      v-show="store.pending"
      indeterminate
      color="primary"
      aria-label="movies list loading"
    />
  </header>
  <v-container>
    <MoviesList :movies="store.movies" />
  </v-container>
</template>

<style>

</style>
