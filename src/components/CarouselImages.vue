<script>
export default {
  data() {
    return {
      photoData: null,
      items: [],
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
  },
  mounted() {
    this.loadCarouselPhoto();
  },
};
</script>
<template>
  <v-carousel cycle hide-delimiters :show-arrows="false">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      cover
    ></v-carousel-item>
  </v-carousel>
</template>
