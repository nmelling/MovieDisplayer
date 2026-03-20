<script setup lang="ts">
import MoviesList from "~/components/moviesList.vue";

const MOVIES_URL = "/api/movies/popular";
const MOVIES_KEY = "movies";

const page = ref(1);

const { data, pending } = await useAsyncData(
  `${MOVIES_KEY}_${page.value}`,
  () => $fetch(MOVIES_URL, {
    params: { page: page.value },
  }),
  {
    watch: [page],
  }
);
</script>

<template>
  <header class="flex items-center justify-center">
    <h1 class="mx-2">
      Liste des films
    </h1>
    <v-progress-circular
      v-show="pending"
      indeterminate
      color="primary"
      aria-label="movies list loading"
    />
  </header>
  <v-container>
    <MoviesList :movies="data?.results ?? []" />
  </v-container>
</template>

<style>

</style>
