<script setup lang="ts">
const route = useRoute();

const { data, error } = await useAsyncData(
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
    <template v-if="error">
      <div class="flex h-full w-full justify-center items-center">
        Une erreur est survenue au chargement de la donnée.
      </div>
    </template>
    <template v-else-if="data">
      <MovieDetails :movie="data" />
      <MovieComments />
    </template>
  </v-container>
</template>

<style>

</style>
