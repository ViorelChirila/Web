<script setup>
import DisplayPhoto from "./DisplayPhoto.vue";
</script>
<script>
import * as reqOp from "../assets/js/requestOptions.js";
const Url = "https://api.unsplash.com/photos/random/?" + reqOp.client_id;
export default {
  data() {
    return {
      // categories: [
      //   { name: "Nature" },
      //   { name: "People" },
      //   { name: "Architecture" },
      //   { name: "Technology" },
      //   { name: "Objects" },
      //   { name: "Food" },
      //   { name: "Animals" },
      //   { name: "Travel" },
      //   { name: "Fashion" },
      //   { name: "Spirituality" },
      //   { name: "Experimental" },
      //   { name: "Current Events" },
      //   { name: "Film" },
      //   { name: "Fine Art" },
      //   { name: "Health" },
      //   { name: "History" },
      //   { name: "Industry" },
      //   { name: "Interiors" },
      //   { name: "Music" },
      //   { name: "Performing Arts" },
      //   { name: "Sport" },
      //   { name: "Street" },
      //   { name: "Transportation" },
      //   { name: "Urban Exploration" },
      // ],
      categories: [
        { name: "Food" },
        { name: "People" },
        { name: "Animals" },
        { name: "Nature" },
        { name: "Architecture" },
        { name: "Fashion" },
        { name: "Fine Art" },
      ],
      photoData: null,
      tempData: null,
      categoriesPhoto: [],
      photoInfo: [],
      tab: "Food",
      selection: [],
      nSend: null,
      send: null,
      dialog: false,
    };
  },
  methods: {
    fetchPhotos() {
      for (let i = 0; i < this.categories.length; i++) {
        fetch(
          Url + '&query="' + this.categories[i].name + '"' + "&count=30",
          reqOp.requestOptionsGet
        )
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
              name: this.categories[i].name,
              // photos: this.src,
              photos: this.photoInfo,
            });
            // this.src = [];
            this.photoInfo = [];
          });
      }
    },
    findCategory(category) {
      return this.categoriesPhoto.find((item) => item.name === category);
    },
    likePhoto(n) {
      fetch(
        "https://api.unsplash.com/photos/" +
          this.findCategory(this.tab).photos[n - 1].id +
          "/like",
        reqOp.requestOptionPost
      )
        .then((response) => response.json())
        .then((data) => {
          this.tempData = data;
          this.findCategory(this.tab).photos[n - 1] = this.tempData.photo;
          console.log(data);
        });
    },
    unlikePhoto(n) {
      fetch(
        "https://api.unsplash.com/photos/" +
          this.findCategory(this.tab).photos[n - 1].id +
          "/like",
        reqOp.requestOptionDelete
      )
        .then((response) => response.json())
        .then((data) => {
          this.tempData = data;
          this.findCategory(this.tab).photos[n - 1] = this.tempData.photo;
          console.log(data);
        });
    },
    likeBtnAction(n) {
      if (this.findCategory(this.tab).photos[n - 1].liked_by_user) {
        this.unlikePhoto(n);
      } else {
        this.likePhoto(n);
      }
    },
    receiveData(dataRec) {
      fetch(
        "https://api.unsplash.com/photos/" +
          dataRec.id +
          "/?client_id=wNsRTVDYYKFyvucwPQKjPM1lNGoffo_j7WkO-FVzp4I",
        reqOp.requestOptionsGet
      )
        .then((response) => response.json())
        .then((data) => {
          this.findCategory(this.tab).photos[this.nSend - 1] = data;
          this.send = data;
        });
    },
  },
  mounted() {
    this.fetchPhotos();
    console.log(this.categoriesPhoto);
  },
};
</script>
<template>
  <v-tabs
    v-model="tab"
    bg-color="deep-purple-darken-4"
    center-active
    fixed-tabs
    v-if="categoriesPhoto.length === 7"
  >
    <v-tab
      v-for="category in categoriesPhoto"
      :key="category.name"
      :value="category.name"
    >
      {{ category.name }}
    </v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item
      v-for="category in categories"
      :key="category.name"
      :value="category.name"
    >
      <v-container>
        <v-item-group v-model="selection" multiple>
          <v-row>
            <v-col
              v-for="n in findCategory(tab).photos.length"
              :key="n"
              cols="12"
              md="4"
              sm="6"
            >
              <v-item>
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    :elevation="isHovering ? 12 : 2"
                    :class="{ 'on-hover': isHovering }"
                    v-bind="props"
                    height="100%"
                  >
                    <v-img
                      :src="
                        findCategory(tab).photos.length !== 0
                          ? findCategory(tab).photos[n - 1].urls.regular
                          : 'https://picsum.photos/200/300/?random'
                      "
                      cover
                      height="100%"
                      class="d-flex align-end"
                      @click="
                        (dialog = true),
                          (send = findCategory(tab).photos[n - 1]),
                          (nSend = n)
                      "
                    >
                      <div
                        class="d-flex justify-space-between align-center pb-2 pt-2 pl-2 pr-2 rounded-t-xl divc"
                        v-if="isHovering"
                      >
                        <div class="d-flex justify-space-around align-center">
                          <v-avatar
                            :image="
                              findCategory(tab).photos.length !== 0
                                ? findCategory(tab).photos[n - 1].user
                                    .profile_image.medium
                                : 'https://picsum.photos/200/300/?random'
                            "
                            size="50"
                            color="grey"
                            outlined
                          ></v-avatar>
                          <p class="text-white text-h6">
                            {{ findCategory(tab).photos[n - 1].user.name }}
                          </p>
                        </div>
                        <v-btn
                          variant="text"
                          :key="`${n}`"
                          @click.stop="likeBtnAction(n)"
                          :class="{ 'show-btns': isHovering }"
                          :color="
                            findCategory(tab).photos[n - 1].liked_by_user
                              ? 'red'
                              : 'white'
                          "
                          icon
                          ><v-tooltip activator="parent" location="top">{{
                            findCategory(tab).photos[n - 1].likes
                          }}</v-tooltip>
                          <v-icon icon="mdi-heart"></v-icon>
                        </v-btn>
                      </div>
                    </v-img>
                  </v-card>
                </v-hover>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-container>
    </v-window-item>
  </v-window>
  <v-dialog v-model="dialog">
    <DisplayPhoto v-bind:photo="send" @sendData="receiveData($event)" />
  </v-dialog>
</template>
