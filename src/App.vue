<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import { provideMapboxStore } from './mapbox'
import { usePocketBase } from './pocketbase'

const { pb, refresh, user, username, password, login } = usePocketBase()
const home: LngLatLike = [
  user.value?.lng ?? 0,
  user.value?.lat ?? 0,
]
const { initMapbox, moveToSelectedPosition, addMarkersOnLogin } = provideMapboxStore({ home, container: 'map' })

onMounted(async () => {
  await initMapbox()

  if (pb.authStore.token)
    refresh()

  if (user)
    await addMarkersOnLogin()
})

const markerUIHidden = ref(true)
function showAddMarker() {
  moveToSelectedPosition()
  markerUIHidden.value = false
}

function hideAddMarker() {
  markerUIHidden.value = true
}

const settingsMenu = ref(false)

function closeSettingsMenu() {
  settingsMenu.value = false
}

function openSettingsMenu() {
  settingsMenu.value = true
}

async function loginInUser() {
  await login()
  await addMarkersOnLogin()
}
</script>

<template>
  <div>
    <div
      id="map" @click="showAddMarker()"
    />
    <SettingsMenu v-if="settingsMenu" @close="closeSettingsMenu" />
    <ServerHealth />
    <SideMenu
      :open-settings="openSettingsMenu"
    />
    <AddMarker :hidden="markerUIHidden" @hide="hideAddMarker" />
  </div>
  <div v-if="!user" class="login">
    <input v-model="username" placeholder="enter username">
    <input v-model="password" placeholder="enter password">
    <button class="" @click="loginInUser()">
      Login
    </button>
  </div>
</template>

<style>
#map {
  height: 100vh;
  width: 100%;
}

.login {
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(20px);
  position: absolute;
  top: 0;
  left: 0;
}

.mapboxgl-ctrl {
  position: fixed;
  top: 0;
  left: 150px;
}
</style>
