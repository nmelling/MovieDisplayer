<script setup lang="ts">
const route = useRoute();

const { data: movie, error } = await useAsyncData(
  () => $fetch("/api/movies/findOne", {
    query: {
      id: route.params.id,
    }
  }),
  {
    server: true,
  }
);
</script>

<template>
  <v-container>
    <div
      v-if="error"
      class="flex h-full w-full justify-center items-center"
    >
      Une erreur est survenue au chargement de la donnée.
    </div>
    <v-row
      v-else-if="movie"
      density="comfortable"
    >
      <MovieDetails :movie="movie" />
      <MovieComments :movie-id="movie.id" />
    </v-row>
  </v-container>
</template>

<style>

</style>
