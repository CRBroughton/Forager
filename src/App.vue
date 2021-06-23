<template>
  <loading
    @loadingFinished="updateLoading"
    id="loading"
    v-if="loading && Object.keys(home).length !== 0"
  ></loading>
  <welcome-screen
    id="welcomescreen"
    v-if="Object.keys(home).length === 0"
  ></welcome-screen>
  <location-selector
    id="locationselector"
    v-if="Object.keys(home).length === 0"
  ></location-selector>
  <options-menu
    id="optionsmenu"
    v-if="optionsVisible"
    @hideOptions="toggleOptions"
  ></options-menu>
  <side-menu
    @showOptions="toggleOptions"
    @returnHome="getHome"
    @hideTooltips="toggleTooltips"
    @enablePathFinder="enablePathFinder"
    id="basesmallbutton"
    v-if="!loading && Object.keys(home).length !== 0"
    class="flex flex-col absolute"
  ></side-menu>
  <delete-marker
    id="deletemarker"
    v-if="deleteVisible"
    @hideDeletePopup="hideDeletePopup"
  ></delete-marker>
  <distance-viewer
    id="distancepopup"
    v-if="distance !== 0"
    :distance="distance"
    :distanceMiles="distanceMiles"
  ></distance-viewer>
  <add-marker
    id="addmarker"
    v-if="!loading && popupVisible"
    @hideMarkerPopup="toggleMarkerPopup"
    @createMarker="createMarker"
  ></add-marker>
  <l-map
    v-model="zoom"
    v-model:zoom="zoom"
    :center="center"
    :zoomAnimation="false"
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

    <l-polyline ref="path" :lat-lngs="[]" color="black" />

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
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import WelcomeScreen from "./components/WelcomeScreen.vue";
import LocationSelector from "./components/LocationSelector.vue";
import Loading from "./components/Loading.vue";
import SideMenu from "./components/SideMenu.vue";
import AddMarker from "./components/buttons/AddMarker.vue";
import OptionsMenu from "./components/OptionsMenu.vue";
import DeleteMarker from "./components/buttons/DeleteMarker.vue";
import DistanceViewer from "./components/DistanceViewer.vue";

import db from "./Localbase";

export default {
  components: {
    WelcomeScreen,
    LocationSelector,
    Loading,
    SideMenu,
    AddMarker,
    OptionsMenu,
    DeleteMarker,
    DistanceViewer,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const loading = ref(true);
    const popupVisible = ref(false);
    const optionsVisible = ref(false);
    const deleteVisible = ref(false);
    const tooltipVisible = ref(true);
    const zoom = ref(2);
    const id = ref(null);
    let home = ref([]);
    let center = ref([46.237820128136654, -22.141468687768604]);
    const currentMarker = ref([]);
    let markers = ref([]);
    const drag = ref(false);
    const click = ref(false);
    const input = ref(null);
    const draggableRoot = ref(null);
    const path = ref();
    const pathFinderMode = ref(false);

    const result = ref();
    const lat1 = ref();
    const lat2 = ref();
    const lng1 = ref();
    const lng2 = ref();
    const distance = ref(0);
    const distanceMiles = ref(0);

    onMounted(() => {
      db.collection("markers")
        .get()
        .then((markerData) => {
          markers.value = markerData;
        });
      getHome();
    });

    const getHome = () => {
      console.log("Running return home...");
      db.collection("home")
        .get()
        .then((homeData) => {
          home.value = [];
          const homeArray = [homeData[0].lat, homeData[0].lng];
          // homeData.map(() => home.value.push(homeArray));
          home.value = homeArray;

          // Adds a small delay due to map not loading the center properly
          const delay = (ms) => new Promise((res) => setTimeout(res, ms));

          const reassignCenter = async () => {
            await delay(500);
            center.value = [];
            center.value = homeArray;
            zoom.value = 16;
            loading.value = false;
          };
          reassignCenter();
        });
    };

    const updateLoading = () => {
      loading.value = false;
      drag.value = false;
      popupVisible.value = false;
    };

    const enablePathFinder = () => {
      pathFinderMode.value = !pathFinderMode.value;
      deleteVisible.value = false;
      console.log("PATHFINDER");
    };

    const pathFinderCalc = () => {
      var p = 0.017453292519943295; // Math.PI / 180
      var c = Math.cos;
      var a =
        0.5 -
        c((lat2.value - lat1.value) * p) / 2 +
        (c(lat1.value * p) *
          c(lat2.value * p) *
          (1 - c((lng2.value - lng1.value) * p))) /
          2;

      // conversion factor
      const factor = 0.621371;

      if (!distance.value) {
        distance.value = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = distance
        distanceMiles.value = distance.value * factor;
        console.log("Distance is: " + distance.value.toFixed(2) + " Km");
        console.log("Distance is: " + distanceMiles.value.toFixed(2) + " Miles");
        return;
      }
      result.value = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = distance
      const journey = distance.value + result.value;
      distance.value = journey;
      distanceMiles.value = distance.value * factor;
      console.log("Distance is: " + distance.value.toFixed(2) + " Km");
      console.log("Distance is: " + distanceMiles.value.toFixed(2) + " Miles");
    };

    const centerUpdate = function (newCenter) {
      const tmpCenter = [newCenter.lat, newCenter.lng];
      center.value = tmpCenter;
    };

    const toggleMarkerPopup = () => {
      popupVisible.value = false;
      deleteVisible.value = false;
    };

    const toggleOptions = () => {
      optionsVisible.value = !optionsVisible.value;
    };

    const toggleTooltips = () => {
      tooltipVisible.value = !tooltipVisible.value;
    };

    const hideDeletePopup = () => {
      deleteVisible.value = !deleteVisible.value;
    };

    const handleMove = () => {
      if (draggableRoot.value) {
        drag.value = true;
        popupVisible.value = false;
      }
    };

    const handleDown = () => {
      document.addEventListener("pointermove", handleMove);
    };

    const handleUp = () => {
      document.removeEventListener("pointermove", handleMove);
      setTimeout(() => (drag.value = false));
    };

    const handleClick = function (e: { latlng: { lat: number; lng: number } }) {
      if (!drag.value) {
        center.value = [e.latlng.lat, e.latlng.lng];
        if (pathFinderMode.value === true) {
          return;
        }
        click.value = true;
        popupVisible.value = true;

        if (Object.keys(home.value).length === 0) {
          const startLocation = {
            id: Date.now().toString(),
            title: "Home",
            lat: e.latlng.lat,
            lng: e.latlng.lng,
          };

          db.collection("home").add(startLocation);
          home.value = [e.latlng.lat, e.latlng.lng];
          zoom.value = 14;
          return;
        }

        showCreateMarkerPopup;
      }
    };

    const showCreateMarkerPopup = () => {
      click.value = true;
      popupVisible.value = true;
    };

    const createMarker = function (input) {
      if (input.value === "") {
        alert("Please enter a object name!");
        return;
      }
      const newMarker = {
        id: Date.now().toString(),
        title: input,
        lat: center.value[0],
        lng: center.value[1],
      };

      db.collection("markers").add(newMarker);
      markers.value.push(newMarker);
      popupVisible.value = false;
      deleteVisible.value = false;
    };

    const deleteMarker = function (e: {
      latlng: { lat: number; lng: number };
    }) {
      center.value = [e.latlng.lat, e.latlng.lng];
      if (pathFinderMode.value === true) {
        const tempLoc = [center.value[0], center.value[1]];
        path.value.leafletObject.addLatLng(tempLoc);

        if (!lat1.value) {
          lat1.value = tempLoc[0];
          lng1.value = tempLoc[1];
          return;
        }

        if (!lat2.value) {
          lat2.value = tempLoc[0];
          lng2.value = tempLoc[1];
          pathFinderCalc();
        }

        if (lat1.value) {
          lat1.value = tempLoc[0];
          lng1.value = tempLoc[1];
          lat2.value = null;
          lng2.value = null;
        }

        return;
      }

      click.value = true;
      popupVisible.value = false;
      deleteVisible.value = true;
      db.collection("markers").doc(e.latlng).delete();

      const filteredMarkers = markers.value.filter(function (el: {
        lat: number;
        lng: number;
      }) {
        return el.lat != e.latlng.lat && el.lng != e.latlng.lng;
      });
      markers.value = filteredMarkers;
    };

    return {
      centerUpdate,
      toggleMarkerPopup,
      toggleOptions,
      toggleTooltips,
      hideDeletePopup,
      getHome,
      loading,
      popupVisible,
      optionsVisible,
      deleteVisible,
      tooltipVisible,
      zoom,
      id,
      home,
      center,
      currentMarker,
      markers,
      drag,
      click,
      path,
      input,
      draggableRoot,
      handleMove,
      handleDown,
      handleUp,
      handleClick,
      showCreateMarkerPopup,
      createMarker,
      deleteMarker,
      updateLoading,
      enablePathFinder,
      pathFinderCalc,
      result,
      lat1,
      lat2,
      lng1,
      lng2,
      distance,
      distanceMiles,
    };
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
#deletemarker,
#distancepopup {
  z-index: 1000;
  position: absolute;
}
#optionsmenu,
#locationselector {
  z-index: 3000;
  position: absolute;
}
#welcomescreen {
  z-index: 5000;
  position: absolute;
}
</style>
