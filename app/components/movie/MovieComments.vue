<script setup lang="ts">
const { movieId } = defineProps<{
  movieId: number
}>();

const { commentsByMovie } = useMovieCommentsStore();

const comments = commentsByMovie(movieId);
</script>

<template>
  <v-container>
    <h2 class="text-center">
      Commentaires({{ comments.length }})
    </h2>
    <v-list
      :items="comments"
      lines="three"
    >
      <template #title="props">
        <div class="flex items-center gap-2">
          <v-rating
            :model-value="props.item.rating"
            half-increments
            color="warning"
            readonly
            size="18"
          />
          <div
            :title="props.item.username"
            class="truncate"
          >
            {{ props.item.username }}
          </div>
        </div>
      </template>
      <template #subtitle="props">
        <div>{{ formatDate(props.item.createdTs) }}</div>
        <div>{{ props.item.message }}</div>
      </template>
    </v-list>
  </v-container>
</template>

<style>

</style>
