<script>
export default {
  data() {
    return {
      photoData: null,
      items: [],
      loaded: false,
      loading: false,
      searchInput: "",
    };
  },
  methods: {
    loadCarouselPhoto() {
      const Url =
        "https://api.unsplash.com/photos/random?client_id=wNsRTVDYYKFyvucwPQKjPM1lNGoffo_j7WkO-FVzp4I&count=5";
      fetch(Url)
        .then((response) => response.json())
        .then((data) => {
          this.photoData = data;
          console.log(this.photoData);
          if (this.photoData != null) {
            for (let i = 0; i < this.photoData.length; i++) {
              this.items.push({
                src: this.photoData[i].urls.regular,
              });
            }
          }
          console.log(this.items);
        });
    },
    onClick() {
      this.loading = true;
      console.log(this.searchInput);
      window.location.href = "#/search";

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
  },
  mounted() {
    this.loadCarouselPhoto();
  },
};
</script>
<template>
  <v-carousel cycle hide-delimiters :show-arrows="false">
    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover>
    </v-carousel-item>
    <v-container class="stay" fluid>
      <v-row class="justify-center">
        <v-col cols="12" sm="6" md="4">
          <v-card color="grey-darken-4" variant="tonal">
            <v-card-title class="text-center">
              We have the photo you need
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            bg-color="grey-lighten-2"
            :loading="loading"
            density="compact"
            variant="outlined"
            label="Search images"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:append-inner="onClick"
            @keyup.enter="onClick"
            type="input"
            v-model="searchInput"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-carousel>
</template>
<style>
.stay {
  position: absolute;
  top: 25%;
}

.v-text-field {
  transition: opacity 0.4s ease-in-out;
}

.v-text-field:not(.on-hover) {
  opacity: 0.6;
}

.v-card-title {
  color: rgb(141, 101, 138);
}
</style>
