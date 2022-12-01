<script>
export default {
  data() {
    return {
      photoData: null,
    };
  },
  methods: {
    fetchPhoto() {
      const Url =
        "https://api.unsplash.com/photos/random/?client_id=wNsRTVDYYKFyvucwPQKjPM1lNGoffo_j7WkO-FVzp4I";
      fetch(Url)
        .then((response) => response.json())
        .then((data) => {
          this.photoData = data;
        });
    },
  },
};
</script>
<template>
  <div>
    <v-btn @click="fetchPhoto">Get Photo</v-btn>
    <div v-if="photoData">
      <v-img :src="photoData.urls.regular" />
    </div>
  </div>
</template>
