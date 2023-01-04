<script>
import * as reqOp from "../assets/js/requestOptions.js";
const client_id = "&client_id=wNsRTVDYYKFyvucwPQKjPM1lNGoffo_j7WkO-FVzp4I";
export default {
  props: ["photo"],
  data() {
    return {
      photoData: null,
      show: false,
      zoom: false,
      maHeight: 700,
      cov: false,
      ratio: null,
      items: [
        { text: "Small", subtitle: null, src: null, size: "&force=true&w=640" },
        {
          text: "Medium",
          subtitle: null,
          src: null,
          size: "&force=true&w=1920",
        },
        {
          text: "Large",
          subtitle: null,
          src: null,
          size: "&force=true&w=2400",
        },
        { text: "Original Size", subtitle: null, src: null, size: "" },
      ],
      infos: [
        { title: "Likes", subtitle: "--", icon: "mdi-heart" },
        { title: "Downloads", subtitle: "--", icon: "mdi-download" },
        { title: "Views", subtitle: "--", icon: "mdi-eye" },
      ],
      descriptions: [
        { id: 0, title: "--", icon: "mdi-account" },
        { id: 1, title: "--", icon: "mdi-map-marker" },
        { id: 2, title: "--", icon: "mdi-camera" },
      ],
      cameraInfo: [
        { title: "Aperture", subtitle: "--" },
        { title: "Focal length", subtitle: "--" },
        { title: "Exposure time", subtitle: "--" },
        { title: "ISO", subtitle: "--" },
        { title: "Dimensions", subtitle: "--" },
      ],
    };
  },
  methods: {
    toggleZoom() {
      if (this.zoom === false) {
        this.maHeight = 700;
        this.cov = false;
      } else {
        this.maHeight = "auto";
        this.cov = true;
      }
    },
    calculateAspectRatio() {
      let width = this.photo.width;
      let height = this.photo.height;
      let ratio = height / width;
      return ratio;
    },
    async toDataURL(url) {
      const response = await fetch(url);
      const blob = await response.blob();
      const imageUrl = window.URL.createObjectURL(blob);
      console.log(imageUrl);
      let link = document.createElement("a");
      link.href = imageUrl;
      link.download = "phapp-" + this.photo.id;
      link.click();
    },
    downloadPhoto(linkPh, size) {
      fetch(linkPh)
        .then((response) => response.json())
        .then((data) => {
          let url = data.url;
          url = url + size;
          this.toDataURL(url);
        });
    },
    likePhoto() {
      fetch(
        "https://api.unsplash.com/photos/" + this.photo.id + "/like",
        reqOp.requestOptionPost
      )
        .then((response) => response.json())
        .then((data) => {
          this.sendData(data.photo);
          console.log(data);
        });
    },
    unlikePhoto() {
      fetch(
        "https://api.unsplash.com/photos/" + this.photo.id + "/like",
        reqOp.requestOptionDelete
      )
        .then((response) => response.json())
        .then((data) => {
          this.sendData(data.photo);
          console.log(data);
        });
    },
    likeBtnAction() {
      if (this.photo.liked_by_user) {
        this.unlikePhoto();
      } else {
        this.likePhoto();
      }
    },
    sendData(value) {
      this.$emit("sendData", value);
    },
  },
  mounted() {
    if (this.photo !== null) {
      this.ratio = this.calculateAspectRatio();

      this.items[0].subtitle = "(640 x " + Math.trunc(640 * this.ratio) + ")";
      this.items[0].src = this.photo.links.download_location + client_id;

      this.items[1].subtitle = "(1920 x " + Math.trunc(1920 * this.ratio) + ")";
      this.items[1].src = this.photo.links.download_location + client_id;

      this.items[2].subtitle = "(2400 x " + Math.trunc(2400 * this.ratio) + ")";
      this.items[2].src = this.photo.links.download_location + client_id;

      this.items[3].subtitle =
        "(" + this.photo.width + " x " + this.photo.height + ")";
      this.items[3].src = this.photo.links.download_location + client_id;

      this.infos[0].subtitle = this.photo.likes;
      this.infos[1].subtitle = this.photo.downloads;
      this.infos[2].subtitle = this.photo.views;

      this.descriptions[0].title = this.photo.description
        ? this.photo.description
        : this.photo.alt_description;
      this.descriptions[1].title = this.photo.location.name
        ? this.photo.location.name
        : "--";
      this.descriptions[2].title = this.photo.exif.name
        ? this.photo.exif.name
        : "--";

      this.cameraInfo[0].subtitle = this.photo.exif.aperture
        ? this.photo.exif.aperture
        : "--";
      this.cameraInfo[1].subtitle = this.photo.exif.focal_length
        ? this.photo.exif.focal_length
        : "--";
      this.cameraInfo[2].subtitle = this.photo.exif.exposure_time
        ? this.photo.exif.exposure_time
        : "--";
      this.cameraInfo[3].subtitle = this.photo.exif.iso
        ? this.photo.exif.iso
        : "--";
      this.cameraInfo[4].subtitle =
        this.photo.width + " x " + this.photo.height;
    }
  },
};
</script>
<template>
  <v-card class="opaque-content">
    <v-img
      :key="zoom"
      :src="photo.urls.regular"
      :lazy-src="photo.urls.thumb"
      :max-height="maHeight"
      :cover="cov"
      @click="(zoom = !zoom), toggleZoom()"
      ><template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            indeterminate
            color="grey-lighten-4"
          ></v-progress-circular>
        </div>
      </template>
    </v-img>
    <div class="poz pt-2 pr-2">
      <v-btn @click="(zoom = !zoom), toggleZoom()" icon size="x-small">
        <v-icon v-if="zoom">mdi-magnify-close</v-icon>
        <v-icon v-else>mdi-magnify</v-icon>
      </v-btn>
    </div>
    <!-- <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle> -->
    <div
      class="d-flex flex-sm-column flex-md-row flex-lg-row justify-space-between align-center pt-2"
    >
      <v-list lines="one" class="pa-2">
        <v-list-item :title="photo.user.name" :subtitle="photo.user.username">
          <template v-slot:prepend>
            <v-avatar
              :image="photo.user.profile_image.medium"
              size="60"
              color="grey"
              outlined
            >
            </v-avatar> </template
        ></v-list-item>
      </v-list>
      <div class="d-flex justify-space-around mx-3">
        <v-list density="compact" v-for="item in infos" :key="item.title">
          <v-list-item>
            <template v-slot:prepend>
              <v-icon
                :color="
                  item.icon === 'mdi-heart'
                    ? 'red'
                    : item.icon === 'mdi-download'
                    ? 'blue'
                    : item.icon === 'mdi-eye'
                    ? 'black'
                    : 'black'
                "
                >{{ item.icon }}</v-icon
              >
            </template>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </div>
      <div>
        <v-btn
          class="ma-2 pa-2"
          variant="outlined"
          :color="photo.liked_by_user ? 'red' : 'black'"
          @click="likeBtnAction"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-menu open-on-hover location="start">
          <template v-slot:activator="{ props }">
            <v-btn class="ma-2 pa-2" variant="outlined" v-bind="props">
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
          <v-list :lines="false" density="compact" nav>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              active-color="primary"
              @click="downloadPhoto(item.src, item.size)"
            >
              <v-list-item-title>{{ item.text }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <v-card-actions>
      <v-btn color="orange-lighten-2" variant="text" @click="show = !show">
        Description
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <p v-for="item in descriptions" :key="item.id" class="niceTXT">
            <v-icon class="mr-2" color="grey">{{ item.icon }}</v-icon>
            <span class="font-italic"
              >{{ item.title }}
              <v-tooltip
                v-if="item.icon === 'mdi-camera'"
                activator="parent"
                location="top"
              >
                <v-list
                  lines="one"
                  density="compact"
                  nav
                  class="transparent-content"
                >
                  <v-list-item
                    v-for="item in cameraInfo"
                    :key="item.title"
                    :title="item.title"
                    :subtitle="item.subtitle"
                  ></v-list-item>
                </v-list>
              </v-tooltip>
            </span>
          </p>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<style>
.transparent-content {
  background-color: transparent !important;
  color: white !important;
}
.opaque-content {
  opacity: 1 !important;
}
.btncol {
  background-color: rgba(0, 0, 0, 0.2);
}
.poz {
  position: absolute;
  top: 0;
  right: 0;
}
.niceTXT {
  font-family: "Gambetta", serif;
  letter-spacing: 1px;
  margin-bottom: 0.2rem;
  color: rgb(114, 105, 112);
  outline: none;
}
</style>
