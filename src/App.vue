<template>
  <marker-popup id="MarkerPopup" v-if="popupVisible"></marker-popup>
  <l-map
    v-model="zoom"
    v-model:zoom="zoom"
    :center="center"
    :options="{ zoomSnap: 0.1, zoomDelta: 0.1 }"
    @pointerdown="handleDown"
    @pointerup="handleUp"
    @pointercancel="handleUp"
    @click="handleClick"
    ref="draggableRoot"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ></l-tile-layer>
    <l-control-layers />

    <l-marker
      @click="deleteMarker"
      v-for="marker in markers"
      :key="marker"
      :lat-lng="marker"
    ></l-marker>
  </l-map>
</template>

<script lang="ts">
import MarkerPopup from "./components/MarkerPopup.vue";
import {
  LMap,
  LTileLayer,
  LMarker,
  LControlLayers,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

import Localbase from "localbase";
let db = new Localbase("db");

export default {
  components: {
    MarkerPopup,
    LMap,
    LTileLayer,
    LMarker,
    LControlLayers,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    db.collection("markers")
      .get()
      .then((markers) => {
        markers.map((markers) => this.markers.push(markers));
      });
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      popupVisible: false,
      zoom: 16,
      id: null,
      center: [50.8311091801179, -0.13301259444431282],
      currentMarker: [],
      markers: [],
      drag: false,
      click: false,
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleMove() {
      if (this.$refs.draggableRoot) {
        this.drag = true;
        this.popupVisible = false;
      }
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleDown() {
      document.addEventListener("pointermove", this.handleMove);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleUp() {
      document.removeEventListener("pointermove", this.handleMove);
      setTimeout(() => (this.drag = false));
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleClick(e: { latlng: { lat: number; lng: number } }) {
      if (!this.drag) {
        this.click = true;
        this.center = [e.latlng.lat, e.latlng.lng];
        this.addMarker(e);
      }
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    addMarker(e: { latlng: { lat: number; lng: number } }) {
      const newMarker = {
        id: Date.now().toString(),
        title: "test-title",
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      db.collection("markers").add(newMarker);
      this.markers.push(newMarker);
      console.log(e);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    deleteMarker(e: { latlng: { lat: number; lng: number } }) {
      this.click = true;
      this.center = e.latlng;
      this.popupVisible = true;
      db.collection("markers").doc(e.latlng).delete();

      const filteredMarkers = this.markers.filter(function (el: {
        lat: number;
        lng: number;
      }) {
        return el.lat != e.latlng.lat && el.lng != e.latlng.lng;
      });
      this.markers = filteredMarkers;
    },
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100vh;
  width: 100vw;
}
#MarkerPopup {
  z-index: 1000;
  display: inline-block;
  position: absolute;
}
</style>
