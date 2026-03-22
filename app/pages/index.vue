<script setup lang="ts">
const {
  movies,
  loading,
  error,
  noMoreResults,
  setNextPage,
  setSearchQuery,
  retry,
} = await useListMovies();

async function onFetchRequested(doneCb: DoneCallback) {
  // Si on est en erreur, on retente le fetch sur la même page
  if (error.value) await retry();
  else await setNextPage();

  if (error.value) doneCb("error");
  else if (noMoreResults.value) doneCb("empty");
  else doneCb("ok");
}

const searchQuery = ref("");
const DEBOUNCE_MS_DELAY = 700;

const debouncedSetSearch = useDebounceFn(
  () => setSearchQuery(searchQuery.value),
  DEBOUNCE_MS_DELAY,
);

watch(searchQuery, debouncedSetSearch);
</script>

<template>
  <v-container class="min-h-dvh flex flex-col">
    <header class="sticky-header  bg-white">
      <div class="flex items-center justify-center">
        <h1 class="mx-2">
          Liste des films
        </h1>
        <v-progress-circular
          v-show="loading"
          indeterminate
          color="primary"
          aria-label="Chargement des films"
        />
      </div>
      <v-text-field
        v-model="searchQuery"
        label="Rechercher un film"
        variant="underlined"
        prepend-icon="mdi-magnify"
        clearable
      />
    </header>
    <v-container class="flex-1 overflow-y-auto ">
      <MoviesList
        :movies="movies"
        :error="error"
        @fetch-requested="onFetchRequested"
      />
    </v-container>
  </v-container>
</template>

<style lang="scss">
</style>
