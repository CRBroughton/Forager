<template>
  <loading id="loading" v-if="loading && this.home.length !== 0"></loading>
  <welcome-screen v-if="this.home.length === 0"></welcome-screen>
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
import WelcomeScreen from "./components/WelcomeScreen.vue";
import Loading from "./components/Loading.vue";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

import Localbase from "localbase";
let db = new Localbase("db");

export default {
  components: {
    WelcomeScreen,
    MarkerPopup,
    Loading,
    LMap,
    LTileLayer,
    LMarker,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  created() {
    db.collection("markers")
      .get()
      .then((markers) => {
        markers.map((markers) => this.markers.push(markers));
      });
    db.collection("home")
      .get()
      .then((home) => {
        const homeArray = [home[0].lat, home[0].lng];
        home.map(() => this.home.push(homeArray));

        // Adds a small delay due to map not loading the center properly
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));

        const reassignCenter = async () => {
          // this.center = [];
          await delay(50000);
          this.center = [home[0].lat, home[0].lng];
          this.zoom = 16;
          this.loading = false;
          console.log(this.center);
        };
        reassignCenter();
      });
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      loading: true,
      popupVisible: false,
      zoom: 2,
      id: null,
      home: [],
      center: [46.237820128136654, -22.141468687768604],
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

        if (this.home.length === 0) {
          const startLocation = {
            id: Date.now().toString(),
            title: "Home",
            lat: e.latlng.lat,
            lng: e.latlng.lng,
          };

          db.collection("home").add(startLocation);
          this.home = [e.latlng.lat, e.latlng.lng];
          this.zoom = 14;
          return;
        }

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
#loading {
  z-index: 3000;
  position: absolute;
}
#MarkerPopup {
  z-index: 1000;
  display: inline-block;
  position: absolute;
}
</style>
