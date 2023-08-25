<script setup lang="ts">
import type { LngLatLike, MapMouseEvent } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import { mapBoxStore } from './mapbox'

const home: LngLatLike = [-0.12142408441471342, 50.840021634508254]
const { map, initMapbox } = mapBoxStore({ home, container: 'map' })

onMounted(() => {
  initMapbox()
})

function addMarker() {
  // Create a new marker.
  map?.on('click', (e: MapMouseEvent) => {
    map.flyTo({ center: e.lngLat })
    return new mapboxgl.Marker()
      .setLngLat(e.lngLat)
      .addTo(map)
  })
}

function returnHome() {
  map?.flyTo({ center: home })
}
</script>

<template>
  <div id="map" />
  <SideMenu />
</template>

<style>
#map {
  height: 100vh;
  width: 100%;
}
</style>
