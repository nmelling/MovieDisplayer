<script setup lang="ts">
defineProps<{
  movie: MovieDetails
}>();
</script>

<template>
  <v-container class="MovieDetails py-6">
    <v-row density="comfortable">
      <v-col
        cols="12"
        md="4"
      >
        <v-card class="overflow-hidden rounded-xl">
          <v-img
            :src="formatSrcImg(movie.poster_path ?? movie.backdrop_path)"
            :alt="movie.title"
            class="poster-img"
            height="100%"
            cover
          />
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="8"
      >
        <v-card class="pad-5 rounded-xl movie-card">
          <header class="mb-3">
            <h1 class="text-3xl font-bold mb-0">
              {{ movie.title }}
            </h1>

            <section class="flex flex-wrap gap-2">
              <div class="flex flex-wrap gap-2 text-sm opacity-80">
                <span>{{ formatDate(movie.release_date) }}</span>
                <span>•</span>
                <span>{{ movie.runtime }} min</span>
              </div>
              <div class="font-weight-bold">
                Directeur: {{ movie.director?.name ?? 'N/C' }}
              </div>
            </section>

            <section class="flex flex-wrap gap-2">
              <v-chip
                v-for="genre in movie.genres"
                :key="genre.id"
                size="small"
                variant="tonal"
              >
                {{ genre.name }}
              </v-chip>
            </section>
          </header>

          <div class="flex items-center gap-2 mb-5">
            <v-rating
              :model-value="movie.vote_average / 2"
              half-increments
              readonly
              size="18"
              color="orange-lighten-1"
            />
            <span class="text-sm">
              {{ movie.vote_average }} / 10
            </span>
            <span class="text-xs opacity-60">
              ({{ movie.vote_count }} votes)
            </span>
          </div>

          <section class="mb-6">
            <h2 class="text-lg font-semibold mb-2">
              Synopsis
            </h2>
            <p class="text-sm leading-relaxed opacity-90">
              {{ movie.overview }}
            </p>
          </section>

          <section>
            <h2 class="text-lg font-semibold mb-2">
              Acteurs
            </h2>
            <div class="overflow-x-auto flex flex-nowrap gap-2">
              <v-card
                v-for="actor of movie.cast"
                :key="actor.id"
                class="min-w-[150px] max-w-[150px] flex-shrink-0"
              >
                <v-img
                  :src="formatSrcImg(actor.profile_path)"
                  :alt="actor.name"
                  height="200"
                  aspect-ratio="1"
                  cover
                />

                <div class="pad-2 text-sm">
                  <div
                    class="font-medium truncate"
                    :title="actor.name"
                  >
                    {{ actor.name }}
                  </div>
                  <div
                    class="text-xs opacity-70 truncate"
                    :title="actor.character"
                  >
                    {{ actor.character }}
                  </div>
                </div>
              </v-card>
            </div>
          </section>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.poster-img {
  height: 280px;
}

@media (min-width: 960px) {
  .poster-img {
    height: 100%;
    min-height: 520px;
  }
}
</style>
