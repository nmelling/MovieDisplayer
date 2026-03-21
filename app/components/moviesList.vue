<script setup lang="ts">
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
