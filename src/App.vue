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
  location.reload()
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
    <div class="login-inputs">
      <h1 class="title">
        Forager
      </h1>
      <input v-model="username" class="login-input" placeholder="enter username">
      <input v-model="password" class="login-input" type="password" placeholder="enter password">
      <button class="login-button" @click="loginInUser()">
        Login
      </button>
    </div>
  </div>
</template>

<style>
.mapboxgl-ctrl-group {
  position: fixed;
  top: 0;
  left: 150px;
}
</style>

<style scoped lang="scss">
.title {
  font-size: 32px;
  font-weight: 500;
}
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

.login-inputs {
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    align-items: center;
    height: 100vh;
    max-width: 500px;
    margin: 0 auto;
    padding-inline: 1em;
}

.login-input {
    height: 30px;
    padding: 1em;
    border-radius: 10px;
    width: 100%;
}

.login-button {
  background: white;
  padding: 1em 1.2em;
  border-radius: 15px;
  width: 100%;

  &:hover {
    background: rgb(240, 240, 240);
  }
}
</style>
