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

import Localbase from "localbase";
let db = new Localbase("db");

export default {
  components: {
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
        markers.map((markers) => this.markers.push(markers.latlng));
      });
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      zoom: 16,
      id: null,
      // iconWidth: 25,
      // iconHeight: 40,
      center: [50.8311091801179, -0.13301259444431282],
      currentMarker: [],
      markers: [],
    };
  },
  methods: {
    addMarker(e) {
      db.collection("markers").add({
        id: Date.now().toString(),
        latlng: [e.latlng.lat, e.latlng.lng],
      });
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
