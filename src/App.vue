<script setup>
import CarouselImages from "./components/CarouselImages.vue";
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-spacer></v-spacer>
      <v-app-bar-title>Photo App</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn variant="plain" size="large">Home</v-btn>
      <v-btn variant="plain" size="large">Search</v-btn>
      <v-btn variant="plain" size="large">About</v-btn>
      <v-btn variant="plain" size="large">Contact</v-btn>
    </v-app-bar>

    <v-main>
      <CarouselImages />
    </v-main>
  </v-app>
</template>
<style scoped></style>
