<script setup>
import DisplayPhoto from "./DisplayPhoto.vue";
</script>

<script>
import { store } from "../store.js";
import * as reqOp from "../assets/js/requestOptions.js";
const Url = "https://api.unsplash.com/search/photos/?";
export default {
  data() {
    return {
      searchValue: "",
      loaded: false,
      loading: false,
      isertedSearchValue: false,
      photoData: null,
      tempData: null,
      selection: [],
      dialog: false,
      send: null,
      nSend: null,
      page: 1,
    };
  },
  methods: {
    takeSearchValue() {
      if (store.get() !== "") {
        this.searchValue = store.get();
        console.log("takeSearchValue");
        this.searchPhotos();
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
        this.searchPhotos();
      }

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
    searchPhotos() {
      console.log("searchPhot/os");
      console.log(this.searchValue);
      if (this.searchValue !== "") {
        console.log("searchPhot/os");
        fetch(
          Url +
            reqOp.client_id +
            "&query=" +
            this.searchValue +
            "&page=" +
            this.page +
            "&per_page=24",
          reqOp.requestOptionsGet
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.photoData = data;
          });
      }
    },
    searchPhotosNext() {
      console.log("searchPhot/os");
      console.log(this.searchValue);
      if (this.searchValue !== "") {
        console.log("searchPhot/os");
        fetch(
          Url +
            reqOp.client_id +
            "&query=" +
            this.searchValue +
            "&page=" +
            this.page +
            "&per_page=24",
          reqOp.requestOptionsGet
        )
          .then((response) => response.json())
          .then((data) => {
            if ("results" in this.photoData && "results" in data) {
              for (let i = 0; i < data.results.length; i++) {
                this.photoData.results.push(data.results[i]);
              }
            }
          });
      }
    },
    getNextPage() {
      window.onscroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          if (this.page <= this.photoData.total_pages) {
            this.page++;
            this.searchPhotosNext();
          }
        }
      };
    },
    likePhoto(n) {
      fetch(
        "https://api.unsplash.com/photos/" +
          this.photoData.results[n - 1].id +
          "/like",
        reqOp.requestOptionPost
      )
        .then((response) => response.json())
        .then((data) => {
          this.tempData = data;
          this.photoData.results[n - 1] = this.tempData.photo;
          console.log(data);
        });
    },
    unlikePhoto(n) {
      fetch(
        "https://api.unsplash.com/photos/" +
          this.photoData.results[n - 1].id +
          "/like",
        reqOp.requestOptionDelete
      )
        .then((response) => response.json())
        .then((data) => {
          this.tempData = data;
          this.photoData.results[n - 1] = this.tempData.photo;
          console.log(data);
        });
    },
    likeBtnAction(n) {
      if (this.photoData.results[n - 1].liked_by_user) {
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
          this.photoData.results[this.nSend - 1] = data;
          this.send = data;
        });
    },
  },

  // mounted() {
  //   console.log("SearchPhotos mounted");
  //   this.emitter.on("search-value-changed", (value) => {
  //     this.searchValue = value.search;
  //   });
  //   console.log(this.searchValue);
  // },
  beforeMount() {
    this.takeSearchValue();
    console.log(this.searchValue);
  },
  mounted() {
    this.getNextPage();
  },
};
</script>

<template>
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
  <!-- <v-container v-else>
    <v-row>
      <v-col v-for="n in 1" :key="n" cols="12" md="4" sm="6">
        <v-card height="200" color="grey-darken-4"></v-card>
      </v-col>
    </v-row>
  </v-container> -->
  <v-container v-else-if="photoData !== null">
    <v-item-group v-model="selection" multiple>
      <v-row v-if="photoData.results.length !== 0">
        <v-col
          v-for="n in photoData.results.length"
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
                    photoData.results.length !== 0
                      ? photoData.results[n - 1].urls.regular
                      : 'https://picsum.photos/200/300/?random'
                  "
                  cover
                  height="100%"
                  class="d-flex align-end"
                  @click="
                    (dialog = true),
                      (send = photoData.results[n - 1]),
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
                          photoData.results.length !== 0
                            ? photoData.results[n - 1].user.profile_image.medium
                            : 'https://picsum.photos/200/300/?random'
                        "
                        size="50"
                        color="grey"
                        outlined
                      ></v-avatar>
                      <p class="text-white text-h6">
                        {{ photoData.results[n - 1].user.name }}
                      </p>
                    </div>
                    <v-btn
                      variant="text"
                      :key="`${n}`"
                      @click.stop="likeBtnAction(n)"
                      :class="{ 'show-btns': isHovering }"
                      :color="
                        photoData.results[n - 1].liked_by_user ? 'red' : 'white'
                      "
                      icon
                      ><v-tooltip activator="parent" location="top">{{
                        photoData.results[n - 1].likes
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
  <v-dialog v-model="dialog">
    <DisplayPhoto v-bind:photo="send" @sendData="receiveData($event)" />
  </v-dialog>
</template>
