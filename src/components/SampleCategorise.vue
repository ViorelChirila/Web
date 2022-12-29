<script>
const categories = [
  { name: "Nature" },
  { name: "People" },
  { name: "Food" },
  { name: "Technology" },
];
const Url =
  "https://api.unsplash.com/photos/random/?client_id=wNsRTVDYYKFyvucwPQKjPM1lNGoffo_j7WkO-FVzp4I&query=";
export default {
  data() {
    return {
      photoData: null,
      categoriesPhoto: [],
      src: [],
      photoInfo: [],
      icons: ["mdi-heart", "mdi-bookmark", "mdi-share-variant"],
      likeBtnCollor: "white",
    };
  },
  methods: {
    fetchPhotosForCategory() {
      for (let i = 0; i < categories.length; i++) {
        fetch(Url + '"' + categories[i].name + '"' + "&count=6")
          .then((response) => response.json())
          .then((data) => {
            this.photoData = data;
            //console.log(this.photoData);
            if (this.photoData != null) {
              for (let j = 0; j < this.photoData.length; j++) {
                // this.src.push(this.photoData[j].urls.regular);
                this.photoInfo.push(this.photoData[j]);
              }
            }
            // console.log(this.src);
            this.categoriesPhoto.push({
              name: categories[i].name,
              // photos: this.src,
              photos: this.photoInfo,
            });
            // this.src = [];
            this.photoInfo = [];
          });
      }
    },
    clicked(ke) {
      // this.likeBtnCollor = "red";
      console.log(this.$refs[ke][0].$props.color);
    },
  },
  mounted() {
    this.fetchPhotosForCategory();
    console.log(this.categoriesPhoto);
    console.log(this.categoriesPhoto.length);
  },
};
</script>
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="mt-2">
        <h2 class="text-center">Here are some photos you can get !</h2>
      </v-col>
    </v-row>
    <v-row justify="center">
      <template v-for="n in 4" :key="n">
        <v-col class="mt-2" cols="12">
          <div v-if="categoriesPhoto.length === 4">
            <strong class="text-h5">{{ categoriesPhoto[n - 1].name }}</strong>
          </div>
          <v-divider></v-divider>
        </v-col>

        <v-col v-for="j in 6" :key="`${n}${j}`" cols="12" md="4" sm="6" xl="3">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :elevation="isHovering ? 12 : 2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              height="100%"
            >
              <v-img
                :src="
                  categoriesPhoto.length === 4
                    ? categoriesPhoto[n - 1].photos[j - 1].urls.regular
                    : 'https://picsum.photos/200/300/?random'
                "
                cover
                height="100%"
                class="d-flex align-end"
              >
                <div
                  class="d-flex justify-space-between align-center pb-2 pt-2 pl-2 pr-2 rounded-t-xl divc"
                  v-if="isHovering"
                >
                  <div class="d-flex justify-space-around align-center">
                    <v-avatar
                      :image="
                        categoriesPhoto.length === 4
                          ? categoriesPhoto[n - 1].photos[j - 1].user
                              .profile_image.medium
                          : 'https://picsum.photos/200/300/?random'
                      "
                      size="50"
                      color="grey"
                      outlined
                    ></v-avatar>
                    <p class="text-white text-h6">
                      {{ categoriesPhoto[n - 1].photos[j - 1].user.name }}
                    </p>
                  </div>
                  <v-btn
                    variant="text"
                    :ref="`${n}${j}`"
                    :key="`${n}${j}`"
                    :class="{ 'show-btns': isHovering }"
                    color="white"
                    @click="clicked(`${n}${j}`)"
                    icon
                    ><v-tooltip activator="parent" location="top">{{
                      categoriesPhoto[n - 1].photos[j - 1].likes
                    }}</v-tooltip>
                    <v-icon icon="mdi-heart"></v-icon>
                  </v-btn>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<style>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
  background-color: rgba(248, 6, 196, 0.5);
}

.divc {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
