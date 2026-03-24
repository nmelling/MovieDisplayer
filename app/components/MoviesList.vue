<script setup lang="ts">
const { movies } = defineProps<{
  movies: Movies
  error: string
}>();

const emit = defineEmits<{
  "fetch-requested": [DoneCallback]
}>();

function onLoad(e: LoadEvent) {
  emit("fetch-requested", e.done);
}

// Logique pour ajout des skeleton rows
// On utilise la ref du container de l'infinite scroll pour avoir une hauteur fixe et visible des lignes
const ContainerRef = useTemplateRef("ContainerRef");

// On défini une hauteur fixe des lignes pour le calcul
const ROW_HEIGHT_PX = 70;
const containerHeight = ref(0);

// On génère un observer en cas de redimensionnement de la page afin d'avoir toujours une hauteur de viewport cohérente
let observer: ResizeObserver | undefined;
onMounted(async() => {
  await nextTick();
  const el = ContainerRef.value;
  if (!el) return;

  // On observe qu'un seul élement, on peut donc déstructurer directement
  observer = new ResizeObserver(([entry]) => {
    if (entry) {
      containerHeight.value = entry.contentRect.height;
    }
  });
  observer.observe(el);
});

// On n'oublie pas de démonter l'observer pour éviter les cumuls et effets de bord
onBeforeUnmount(() => {
  observer?.disconnect();
});

// On génère le nombre de lignes vides à insérer dans le tableau
// Chaque ligne vide prend la même hauteur ROW_HEIGHT_PX
const skeletonRows = computed(() => {
  if (!containerHeight.value) return [];

  const rowCount = Math.round(containerHeight.value / ROW_HEIGHT_PX);
  if (movies.length >= rowCount - 1) return [];
  return Array.from({ length: rowCount - movies.length - 1 }).fill(null);
});
</script>

<template>
  <div
    ref="ContainerRef"
    class="h-full"
  >
    <v-infinite-scroll
      ref="InfiniteScrollRef"
      :empty-text="skeletonRows.length === 0 ? 'Aucun résultat supplémentaire' : ''"
      @load="onLoad"
    >
      <v-list-item
        v-for="(movie, index) in movies"
        :key="movie.id"
        :title="movie.title"
        :subtitle="formatDate(movie.release_date)"
        :to="goToMovie(movie.id)"
        link
        class="px-2 rounded-lg bg-surface hover:bg-surface"
        :class="[
          { 'bg-surface-variant': index % 2 === 0 },
          `h-[${ROW_HEIGHT_PX}px]`,
        ]"
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
            class="hover-scale"
          />
        </template>
      </v-list-item>
      <v-skeleton-loader
        v-for="(_skeleton, index) in skeletonRows"
        :key="index"
        type="list-item-avatar-two-line"
        theme="list-item-avatar-two-line"
        boilerplate
        :class="`h-[${ROW_HEIGHT_PX}px]`"
      />
      <template #loading>
        <v-progress-circular
          indeterminate
          aria-label="Chargement des éléments"
        />
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
  </div>
</template>

<style>

</style>
