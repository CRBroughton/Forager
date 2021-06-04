<template>
  <loading id="loading" v-if="loading && this.home.length !== 0"></loading>
  <welcome-screen id="welcome" v-if="this.home.length === 0"></welcome-screen>
  <base-marker-button
    id="basemarkerbutton"
    v-if="!loading"
  ></base-marker-button>
  <base-small-button
    @returnHome="getHome"
    id="basesmallbutton"
    v-if="!loading"
  ></base-small-button>
  <add-marker id="addmarker" v-if="popupVisible"></add-marker>
  <l-map
    v-model="zoom"
    v-model:zoom="zoom"
    :center="center"
    :options="{ zoomSnap: 0.1, zoomDelta: 0.1 }"
    @pointerdown="handleDown"
    @pointerup="handleUp"
    @pointercancel="handleUp"
    @click="handleClick"
    @update:center="centerUpdate"
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
import WelcomeScreen from "./components/WelcomeScreen.vue";
import Loading from "./components/Loading.vue";
import BaseSmallButton from "./components/buttons/BaseSmallButton.vue";
import BaseMarkerButton from "./components/buttons/BaseMarkerButton.vue";
import AddMarker from "./components/buttons/AddMarker.vue";

import db from "./Localbase";

export default {
  components: {
    WelcomeScreen,
    Loading,
    BaseSmallButton,
    BaseMarkerButton,
    AddMarker,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  created() {
    db.collection("markers")
      .get()
      .then((markers) => {
        markers.map((markers) => this.markers.push(markers));
      });
    this.getHome();
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
    centerUpdate(center) {
      this.center = center;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getHome() {
      console.log("Running return home...");
      db.collection("home")
        .get()
        .then((home) => {
          this.home = [];
          const homeArray = [home[0].lat, home[0].lng];
          home.map(() => this.home.push(homeArray));

          // Adds a small delay due to map not loading the center properly
          const delay = (ms) => new Promise((res) => setTimeout(res, ms));

          const reassignCenter = async () => {
            await delay(500);
            this.center = [];
            this.center = homeArray;
            this.zoom = 16;
            this.loading = false;
          };
          reassignCenter();
        });
    },
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
* {
  -webkit-tap-highlight-color: transparent;
}
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
#welcome {
  z-index: 1000;
  display: inline-block;
  position: absolute;
}
#basesmallbutton {
  z-index: 1000;
  display: inline-block;
  position: absolute;
}
#basemarkerbutton {
  z-index: 1000;
  display: inline-block;
  position: absolute;
}
#addmarker {
  z-index: 1000;
  position: absolute;
}
</style>
