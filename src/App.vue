<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import { mapBoxStore } from './mapbox'

const home: LngLatLike = [-0.12142408441471342, 50.840021634508254]
const { addMarker, addinitMarkers, initMapbox } = mapBoxStore({ home, container: 'map' })

onMounted(() => {
  initMapbox()
  addinitMarkers()
})
</script>

<template>
  <div
    id="map" @click="addMarker()"
  />
  <ServerHealth />
  <SideMenu />
</template>

<style>
#map {
  height: 100vh;
  width: 100%;
}
</style>
