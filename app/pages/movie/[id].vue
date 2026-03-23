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
  <v-container class="h-full">
    <div
      v-if="error"
      class="flex h-full w-full justify-center items-center"
    >
      Une erreur est survenue au chargement de la donnée.
    </div>

    <div
      v-else-if="movie"
      class="flex flex-col gap-6 h-full"
    >
      <v-row density="comfortable">
        <v-col cols="12">
          <v-row no-gutter>
            <v-col cols="4">
              <v-card class="overflow-hidden rounded-xl">
                <v-img
                  :src="formatSrcImg(movie.poster_path ?? movie.backdrop_path)"
                  :lazy-src="formatSrcImg(movie.poster_path ?? movie.backdrop_path)"
                  :alt="movie.title"
                  class="poster-img"
                  height="200"
                  cover
                />
              </v-card>
            </v-col>
            <v-col cols="8">
              <section>
                <MovieDetails :movie="movie" />
              </section>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-row no-gutter>
            <v-col cols="4">
              <MovieCommentForm :movie-id="movie.id" />
            </v-col>
            <v-col cols="8">
              <MovieComments :movie-id="movie.id" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped lang="scss">

</style>
