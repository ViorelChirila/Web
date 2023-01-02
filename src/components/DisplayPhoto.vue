<script>
export default {
  props: ["photo"],
  data() {
    return {
      show: false,
      zoom: false,
      maHeight: 700,
      cov: false,
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
    <v-card-title> Top western road trips </v-card-title>

    <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

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
