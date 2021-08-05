<template>
  <transition name="longFade">
    <loading
      @loadingFinished="updateLoading"
      id="loading"
      v-if="loading && Object.keys(home).length !== 0"
    />
  </transition>
  <welcome-screen id="welcomescreen" v-if="Object.keys(home).length === 0" />
  <location-selector
    id="locationselector"
    v-if="Object.keys(home).length === 0"
  />
  <transition name="shortFade">
    <search id="search" />
  </transition>
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
    @enablePathFinder="enablePathFinder"
    id="basesmallbutton"
    v-if="!loading && Object.keys(home).length !== 0"
    class="flex flex-col absolute"
  />
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
    />
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
    data-test="map"
  >
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
            offset: [-15, -15],
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
import DistanceViewer from "./components/DistanceViewer.vue";
import MarkerPopup from "./components/MarkerPopup.vue";
import DonationPopup from "@/components/DonationPopup.vue";
import Search from "@/components/Search.vue";

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
  showConsoleVersion,
  delay,
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
    DistanceViewer,
    MarkerPopup,
    DonationPopup,
    Search,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    onMounted(() => {
      getHome();
      getGPS();
      getMarkers();
      showConsoleVersion();
    });

    const getMarkers = async () => {
      markers.value = await db.collection("markers").get();
    };

    const getHome = async () => {
      console.log("Running return home...");

      const RetrievedHomeValue = await db.collection("home").get();
      home.value = [RetrievedHomeValue[0].lat, RetrievedHomeValue[0].lng];

      await delay(500);

      center.value = home.value;
      zoom.value = 16;
      loading.value = false;
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
      showConsoleVersion,
      Search,
      delay,
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
#distancepopup {
  z-index: 1000;
  position: absolute;
}
#optionsmenu,
#locationselector,
#donationpopup,
#markerpopup,
#search {
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

.longFade-enter-from {
  opacity: 1;
}
.longFade-enter-to {
  opacity: 1;
}
.longFade-enter-active,
.longFade-leave-active {
  transition: all 0.5s ease;
}

.longFade-leave-from {
  opacity: 1;
}
.longFade-leave-to {
  opacity: 0;
}

#welcomescreen,
#locationselector {
  -webkit-animation: 2s ease 0s normal forwards 1 fadein;
  animation: 2s ease 0s normal forwards 1 fadein;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  66% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadein {
  0% {
    opacity: 0;
  }
  66% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
