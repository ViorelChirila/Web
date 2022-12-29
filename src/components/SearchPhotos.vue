<script>
import { store } from "../store.js";
export default {
  data() {
    return {
      searchValue: "",
      loaded: false,
      loading: false,
      isertedSearchValue: false,
    };
  },
  methods: {
    takeSearchValue() {
      if (store.get() !== "") {
        this.searchValue = store.get();
        this.isertedSearchValue = true;
        store.insert("");
      }
    },
    onClick() {
      this.loading = true;
      if (this.searchValue === "") {
        this.isertedSearchValue = false;
      } else {
        this.isertedSearchValue = true;
      }

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
  },
  // mounted() {
  //   console.log("SearchPhotos mounted");
  //   this.emitter.on("search-value-changed", (value) => {
  //     this.searchValue = value.search;
  //   });
  //   console.log(this.searchValue);
  // },
  mounted() {
    this.takeSearchValue();
    console.log(this.searchValue);
  },
};
</script>

<template>
  <!-- <h1>Search {{ searchValue }}</h1> -->
  <!-- <v-container>
    <v-row>
      <v-col v-for="n in 24" :key="n" cols="12" md="3" sm="6">
        <v-card height="200" color="grey-darken-4"></v-card>
      </v-col>
    </v-row>
  </v-container> -->
  <v-card class="mx-auto elevation-0 pt-5" max-width="800">
    <v-card-text>
      <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="Search images"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
        @keyup.enter="onClick"
        type="input"
        v-model="searchValue"
        theme="dark"
      ></v-text-field>
    </v-card-text>
  </v-card>
  <h1 v-if="isertedSearchValue === false">
    You haven't searched for anything yet!
  </h1>
</template>
