<script>
import { store } from "../store.js";
export default {
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    takeSearchValue() {
      this.searchValue = store.get();
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
  <h1>Search {{ searchValue }}</h1>
</template>
