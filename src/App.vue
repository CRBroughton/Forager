<template>
  <l-map
    v-model="zoom"
    v-model:zoom="zoom"
    :center="center"
    :options="{ zoomSnap: 0.1, zoomDelta: 0.1 }"
    @click="addMarker"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ></l-tile-layer>
    <l-control-layers />

    <l-marker
      v-for="marker in markers"
      :key="marker"
      :lat-lng="marker"
    ></l-marker>
  </l-map>
</template>

<script lang="ts">
import {
  LMap,
  LTileLayer,
  LMarker,
  LControlLayers,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlLayers,
  },
  data() {
    return {
      zoom: 16,
      // iconWidth: 25,
      // iconHeight: 40,
      center: [50.8311091801179, -0.13301259444431282],
      currentMarker: [],
      markers: [[50.8311091801179, -0.13301259444431282]],
    };
  },
  methods: {
    addMarker(e) {
      this.markers.push([e.latlng.lat, e.latlng.lng]);
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
</style>
