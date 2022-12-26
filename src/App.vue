<script>
import HomeApp from "./components/HomeApp.vue";
import SearchPhotos from "./components/SearchPhotos.vue";

const routes = {
  "/": HomeApp,
  "/search": SearchPhotos,
};

export default {
  data() {
    return {
      currentPath: window.location.hash,
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || "/"];
    },
  },
  mounted() {
    window.addEventListener("hashchange", () => {
      this.currentPath = window.location.hash;
    });
  },
};
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-spacer></v-spacer>
      <v-app-bar-title>Photo App</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn href="#/" variant="plain" size="large">Home</v-btn>
      <v-btn href="#/search" variant="plain" size="large">Search</v-btn>
      <v-btn variant="plain" size="large">Categories</v-btn>
      <v-btn variant="plain" size="large">About</v-btn>
      <v-btn variant="plain" size="large">Contact</v-btn>
    </v-app-bar>

    <v-main>
      <!-- <CarouselImages /> -->
      <component :is="currentView" />
    </v-main>
  </v-app>
</template>
<style scoped></style>
