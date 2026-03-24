<script setup lang="ts">
defineProps<{
  movie: MovieDetails
}>();
</script>

<template>
  <v-card class="pad-5 rounded-xl movie-card w-full">
    <v-row>
      <v-col cols="4">
        <v-img
          :src="formatSrcImg(movie.poster_path ?? movie.backdrop_path)"
          :lazy-src="formatSrcImg(movie.poster_path ?? movie.backdrop_path)"
          :alt="movie.title"
          class="poster-img rounded-md"
          height="250"
        />
      </v-col>
      <v-col>
        <header class="mb-3">
          <h1 class="text-3xl font-bold mb-0">
            {{ movie.title }}
          </h1>

          <section class="flex flex-wrap tgap-2">
            <div class="flex flex-wrap tgap-2 text-sm opacity-80">
              <span>{{ formatDate(movie.release_date) }}</span>
              <span>•</span>
              <span>{{ movie.runtime }} min</span>
            </div>
            <div class="font-weight-bold">
              Directeur: {{ movie.director?.name ?? 'N/C' }}
            </div>
          </section>

          <section class="flex flex-wrap tgap-2">
            <v-chip
              v-for="genre in movie.genres"
              :key="genre.id"
              size="small"
              variant="tonal"
            >
              {{ genre.name }}
            </v-chip>
          </section>

          <section class="flex items-center tgap-2 mb-5">
            <v-rating
              :model-value="movie.vote_average / 2"
              half-increments
              readonly
              size="18"
              color="warning"
            />
            <span class="text-sm">
              {{ movie.vote_average }} / 10
            </span>
            <span class="text-xs opacity-60">
              ({{ movie.vote_count }} votes)
            </span>
          </section>
        </header>
      </v-col>
    </v-row>

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
      <div
        class="overflow-x-auto flex flex-nowrap tgap-2"
        tabindex="0"
      >
        <v-card
          v-for="actor of movie.cast"
          :key="actor.id"
          class="min-w-[150px] max-w-[150px] flex-shrink-0"
        >
          <v-img
            :lazy-src="formatSrcImg(actor.profile_path)"
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
</template>

<style>

</style>
