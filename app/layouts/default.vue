<script setup lang="ts">
// Your script logic here
</script>

<template>
  <v-app-bar
    color="primary"
    height="48"
  >
    <v-app-bar-title class="text-h6 ms-3">
      <v-icon icon="mdi-apps" />
      <span class="ms-1">My Application</span>
    </v-app-bar-title>
  </v-app-bar>

  <v-main>
    <slot />
  </v-main>
</template>

<style>

</style>
