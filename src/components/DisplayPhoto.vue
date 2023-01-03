<script>
const client_id = "&client_id=wNsRTVDYYKFyvucwPQKjPM1lNGoffo_j7WkO-FVzp4I";
export default {
  props: ["photo"],
  data() {
    return {
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
    }
  },
};
</script>
<template>
  <v-card class="opaque-content">
    <v-img
      :key="zoom"
      :src="photo.urls.raw"
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
    <div class="d-flex justify-space-between align-center pt-2">
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
      <div>
        <v-btn variant="outlined">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-menu open-on-hover location="start">
          <template v-slot:activator="{ props }">
            <v-btn class="ma-3 pa-2" variant="outlined" v-bind="props">
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
      <v-btn color="orange-lighten-2" variant="text"> Explore </v-btn>

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
          I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<style>
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
</style>
