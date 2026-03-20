<script setup lang="ts">
import type { TMDB } from "tmdb-ts";

type Movies = Awaited<ReturnType<TMDB["movies"]["popular"]>>["results"];

defineProps<{
  movies: Movies
}>();
</script>

<template>
  <div class="container">
    {{ movies }}
  </div>
</template>

<style>

</style>
