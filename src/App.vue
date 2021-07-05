<template>
  <transition name="shortFade">
    <loading
      @loadingFinished="updateLoading"
      id="loading"
      v-if="loading && Object.keys(home).length !== 0"
    />
  </transition>
  <transition name="shortFade">
    <welcome-screen id="welcomescreen" v-if="Object.keys(home).length === 0" />
  </transition>
  <location-selector
    id="locationselector"
    v-if="Object.keys(home).length === 0"
  ></location-selector>
  <transition name="shortFade">
    <marker-popup id="markerpopup" v-if="!loading && markerPopupVisible"
  /></transition>
  <transition name="shortFade">
    <donation-popup id="donationpopup" v-if="donationPopupVisible" />
  </transition>
  <transition name="shortFade">
    <options-menu
      id="optionsmenu"
      v-if="optionsVisible"
      @hideOptions="toggleOptions"
    />
  </transition>
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
  <transition name="shortFade">
    <distance-viewer
      id="distancepopup"
      v-if="pathFinderMode"
      :distance="distance"
      :distanceMiles="distanceMiles"
    />
  </transition>
  <transition name="shortFade">
    <add-marker
      id="addmarker"
      v-if="!loading && popupVisible"
      @hideMarkerPopup="toggleMarkerPopup"
      @createMarker="createMarker"
    ></add-marker>
  </transition>
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
        @click="handleMarker"
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
          :content="marker.title + brSpace + marker.dateLastForaged"
        />
      </l-marker>
    </div>
    <div v-else>
      <l-marker
        @click="handleMarker"
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="marker"
      >
      </l-marker>
    </div>
  </l-map>
</template>

<script lang="ts">
import { onMounted } from "@vue/runtime-core";
import WelcomeScreen from "./components/WelcomeScreen.vue";
import LocationSelector from "./components/LocationSelector.vue";
import Loading from "./components/Loading.vue";
import SideMenu from "./components/SideMenu.vue";
import AddMarker from "./components/buttons/AddMarker.vue";
import OptionsMenu from "./components/OptionsMenu.vue";
import DeleteMarker from "./components/buttons/DeleteMarker.vue";
import DistanceViewer from "./components/DistanceViewer.vue";
import MarkerPopup from "./components/MarkerPopup.vue";
import DonationPopup from "@/components/DonationPopup.vue";

import { toggleOptions, optionsVisible } from "./functions/OptionsMenu";
import {
  tooltipVisible,
  toggleTooltips,
  donationPopupVisible,
} from "./functions/SideMenu";
import {
  handleMove,
  handleDown,
  handleUp,
  handleClick,
  draggableRoot,
  click,
  drag,
} from "./functions/MouseClick";

import {
  pathFinderMode,
  result,
  lat1,
  lat2,
  lng1,
  lng2,
  distance,
  distanceMiles,
  enablePathFinder,
  pathFinderCalc,
} from "./functions/Pathfinder";

import {
  loading,
  home,
  center,
  zoom,
  popupVisible,
  deleteVisible,
  path,
  updateLoading,
  centerUpdate,
  getGPS,
} from "./functions/App";

import {
  markers,
  brSpace,
  showCreateMarkerPopup,
  toggleMarkerPopup,
  hideDeletePopup,
  createMarker,
  currentFilteredMarker,
  markerPopupVisible,
  handleMarker,
} from "./functions/Marker";

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
    MarkerPopup,
    DonationPopup,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    onMounted(() => {
      db.collection("markers")
        .get()
        .then((markerData) => {
          markers.value = markerData;
        });
      getHome();
      getGPS();
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
      home,
      center,
      markers,
      drag,
      click,
      path,
      draggableRoot,
      handleMove,
      handleDown,
      handleUp,
      handleClick,
      showCreateMarkerPopup,
      createMarker,
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
      pathFinderMode,
      brSpace,
      currentFilteredMarker,
      markerPopupVisible,
      handleMarker,
      getGPS,
      donationPopupVisible,
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
#locationselector,
#donationpopup,
#markerpopup {
  z-index: 3000;
  position: absolute;
}
#welcomescreen {
  z-index: 5000;
  position: absolute;
}

.shortFade-enter-from {
  opacity: 0;
}
.shortFade-enter-to {
  opacity: 1;
}
.shortFade-enter-active,
.shortFade-leave-active {
  transition: all 0.2s ease;
}

.shortFade-leave-from {
  opacity: 1;
}
.shortFade-leave-to {
  opacity: 0;
}
</style>
