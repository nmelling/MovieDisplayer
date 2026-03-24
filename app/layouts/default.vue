<script setup lang="ts">
import { goToMovies } from "~/utils/navigation";

// Your script logic here
</script>

<template>
  <v-app-bar
    color="primary"
    height="48"
    aria-label="App header"
  >
    <v-app-bar-title class="ms-3">
      <NuxtLink
        :to="goToMovies()"
        class="no-underline text-inherit hover:text-inherit focus:outline-none"
      >
        <v-icon icon="mdi-video-vintage" />
        <span class="ms-1">Movie Displayer</span>
      </NuxtLink>
    </v-app-bar-title>
  </v-app-bar>

  <v-main
    class="d-flex flex-column"
    style="height: 100vh;"
  >
    <slot />
  </v-main>
</template>

<style>

</style>
