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
    };
  },
  methods: {
    fetchPhotosForCategory() {
      for (let i = 0; i < categories.length; i++) {
        fetch(Url + '"' + categories[i].name + '"' + "&count=4")
          .then((response) => response.json())
          .then((data) => {
            this.photoData = data;
            //console.log(this.photoData);
            if (this.photoData != null) {
              for (let j = 0; j < this.photoData.length; j++) {
                this.src.push(this.photoData[j].urls.regular);
              }
            }
            // console.log(this.src);
            this.categoriesPhoto.push({
              name: categories[i].name,
              photos: this.src,
            });
            this.src = [];
          });
      }
    },

    async fetchPh() {
      for (let i = 0; i < categories.length; i++) {
        const response = await fetch(
          Url + '"' + categories[i].name + '"' + "&count=4"
        );
        const data = await response.json();
        this.photoData = data;
        //console.log(this.photoData);
        if (this.photoData != null) {
          for (let j = 0; j < this.photoData.length; j++) {
            this.src.push(this.photoData[j].urls.regular);
          }
        }
        // console.log(this.src);
        this.categoriesPhoto.push({
          name: categories[i].name,
          photos: this.src,
        });
        this.src = [];
      }
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
  <!-- <div v-if="categoriesPhoto.length > 0">
    {{ categoriesPhoto }}
  </div> -->
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
            <strong>{{ categoriesPhoto[n - 1].name }}</strong>
          </div>
          <v-divider></v-divider>
        </v-col>

        <v-col v-for="j in 4" :key="`${n}${j}`">
          <!-- <v-sheet height="150" color="grey-darken-4"></v-sheet> -->
          <v-card>
            <v-img
              :src="
                categoriesPhoto.length === 4
                  ? categoriesPhoto[n - 1].photos[j - 1]
                  : 'https://picsum.photos/200/300/?random'
              "
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              cover
            >
              <v-card-title class="text-white"
                >Favorite road trips</v-card-title
              >
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                size="small"
                color="surface-variant"
                variant="text"
                icon="mdi-heart"
              ></v-btn>

              <v-btn
                size="small"
                color="surface-variant"
                variant="text"
                icon="mdi-bookmark"
              ></v-btn>

              <v-btn
                size="small"
                color="surface-variant"
                variant="text"
                icon="mdi-share-variant"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
