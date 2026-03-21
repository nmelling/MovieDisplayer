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
    <template
      v-for="(movie, index) in movies"
      :key="movie.id"
    >
      <div :class="['px-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
        {{ movie }}
      </div>
    </template>
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
