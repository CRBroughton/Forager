<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import { provideMapboxStore } from './mapbox'

const home: LngLatLike = [-0.12142408441471342, 50.840021634508254]
const { initMapbox, moveToSelectedPosition } = provideMapboxStore({ home, container: 'map' })

onMounted(async () => {
  await initMapbox()
})

const markerUIHidden = ref(true)
function showAddMarker() {
  moveToSelectedPosition()
  markerUIHidden.value = false
}

function hideAddMarker() {
  markerUIHidden.value = true
}
</script>

<template>
  <div
    id="map" @click="showAddMarker()"
  />
  <ServerHealth />
  <SideMenu />
  <AddMarker :hidden="markerUIHidden" @hide="hideAddMarker" />
</template>

<style>
#map {
  height: 100vh;
  width: 100%;
}
</style>
