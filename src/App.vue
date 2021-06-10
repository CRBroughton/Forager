<template>
  <loading id="loading" v-if="loading && this.home.length !== 0"></loading>
  <welcome-screen id="welcome" v-if="this.home.length === 0"></welcome-screen>
  <options-menu
    id="optionsmenu"
    v-if="optionsVisible"
    @hideOptions="toggleOptions"
  ></options-menu>
  <side-menu
    @showOptions="toggleOptions"
    @returnHome="getHome"
    @hideTooltips="toggleTooltips"
    id="basesmallbutton"
    v-if="!loading"
    class="flex flex-col absolute"
  ></side-menu>
  <delete-marker
    id="deletemarker"
    v-if="deleteVisible"
    @hideDeletePopup="hideDeletePopup"
  ></delete-marker>
  <add-marker
    id="addmarker"
    v-if="popupVisible"
    @hideMarkerPopup="toggleMarkerPopup"
    @createMarker="createMarker"
  ></add-marker>
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

    <div v-if="tooltipVisible">
      <l-marker
        @click="deleteMarker"
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="marker"
      >
        <l-tooltip
          :options="{
            permanent: true,
            interactive: false,
            direction: 'top',
            opacity: 1,
          }"
          :content="marker.title"
        />
      </l-marker>
    </div>
    <div v-else>
      <l-marker
        @click="deleteMarker"
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="marker"
      >
      </l-marker>
    </div>
  </l-map>
</template>

<script lang="ts">
import WelcomeScreen from "./components/WelcomeScreen.vue";
import Loading from "./components/Loading.vue";
import SideMenu from "./components/SideMenu.vue";
import AddMarker from "./components/buttons/AddMarker.vue";
import OptionsMenu from "./components/OptionsMenu.vue";
import DeleteMarker from "./components/buttons/DeleteMarker.vue";

import db from "./Localbase";

export default {
  components: {
    WelcomeScreen,
    Loading,
    SideMenu,
    AddMarker,
    OptionsMenu,
    DeleteMarker,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  created() {
    db.collection("markers")
      .get()
      .then((markers) => {
        markers.map((markers) => this.markers.push(markers));
      });
    this.getHome();
    console.log(this.markers);
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      loading: true,
      popupVisible: false,
      optionsVisible: false,
      deleteVisible: false,
      tooltipVisible: true,
      zoom: 2,
      id: null,
      home: [],
      center: [46.237820128136654, -22.141468687768604],
      currentMarker: [],
      markers: [],
      drag: false,
      click: false,
      input: null,
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    centerUpdate(center) {
      this.center = center;
    },
    toggleMarkerPopup() {
      this.popupVisible = false;
      this.deleteVisible = false;
    },
    toggleOptions() {
      this.optionsVisible = !this.optionsVisible;
    },
    toggleTooltips() {
      this.tooltipVisible = !this.tooltipVisible;
    },
    hideDeletePopup() {
      this.deleteVisible = false;
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

        this.showCreateMarkerPopup();
      }
    },
    showCreateMarkerPopup() {
      this.click = true;
      this.popupVisible = true;
    },
    createMarker(input) {
      if (input === "") {
        alert("Please enter a object name!");
        return;
      }
      const newMarker = {
        id: Date.now().toString(),
        title: input,
        lat: this.center.lat,
        lng: this.center.lng,
      };

      db.collection("markers").add(newMarker);
      this.markers.push(newMarker);
      this.popupVisible = false;
      this.deleteVisible = false;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    deleteMarker(e: { latlng: { lat: number; lng: number } }) {
      this.click = true;
      this.center = e.latlng;
      this.deleteVisible = true;
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
}
#loading,
#MarkerPopup,
#welcome,
#basemarkerbutton,
#basesmallbutton,
#addmarker,
#deletemarker {
  z-index: 1000;
  position: absolute;
}
#optionsmenu {
  z-index: 3000;
  position: absolute;
}
</style>
