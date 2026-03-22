<script setup lang="ts">
defineProps<{
  movies: Movies
  error: string
}>();

const emit = defineEmits<{
  "fetch-requested": [DoneCallback]
}>();

function onLoad(e: LoadEvent) {
  emit("fetch-requested", e.done);
}
</script>

<template>
  <v-infinite-scroll
    @load="onLoad"
  >
    <v-list-item
      v-for="(movie, index) in movies"
      :key="movie.title"
      :title="movie.title"
      :subtitle="formatDate(movie.release_date)"
      :to="goToMovie(movie.id)"
      link
      class="px-2 rounded-lg hover:bg-surface"
      :class="index % 2 === 0 ? 'bg-surface-variant' : 'bg-surface'"
    >
      <template #prepend>
        <v-avatar size="x-large">
          <v-img
            :alt="`${movie.title}_poster_img`"
            :src="formatSrcImg(movie.poster_path)"
          />
        </v-avatar>
      </template>
      <template #subtitle>
        <span
          class="text-on-surface-variant text-body-2"
        >
          {{ formatDate(movie.release_date) }}
        </span>
      </template>
      <template #append>
        <v-icon
          icon="mdi-open-in-new"
          size="large"
        />
      </template>
    </v-list-item>
    <template #loading>
      <v-progress-circular
        indeterminate
        aria-label="Chargement des éléments"
      />
    </template>
    <template #empty>
      <v-alert
        type="info"
        variant="tonal"
      >
        Aucun résultat supplémentaire
      </v-alert>
    </template>
    <template #error="{ props }">
      <v-alert
        v-if="error"
        type="error"
        variant="tonal"
      >
        <div class="w-full flex justify-between items-center">
          <div>{{ error }}</div>
          <v-btn
            icon="mdi-refresh"
            color="white"
            size="small"
            variant="outlined"
            aria-label="Essayer à nouveau"
            v-bind="props"
          />
        </div>
      </v-alert>
    </template>
  </v-infinite-scroll>
</template>

<style>

</style>
