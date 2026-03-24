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
  <v-container class="max-w-full">
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
      <v-col cols="12">
        <v-row no-gutter>
          <v-col
            cols="12"
            md="8"
          >
            <MovieDetails :movie="movie" />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <div>
              <MovieCommentForm :movie-id="movie.id" />
              <div class="max-h-[50vh] overflow-y-auto">
                <MovieComments :movie-id="movie.id" />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">

</style>
