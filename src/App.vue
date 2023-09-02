<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import { provideMapboxStore } from './mapbox'
import { providePocketBaseStore } from './pocketbase'

const { pb, refresh, user, username, password, login, updateDisclaimerAgreement } = providePocketBaseStore()
const home: LngLatLike = [
  user.value?.lng ?? 0,
  user.value?.lat ?? 0,
]
const { initMapbox, markerUIHidden } = provideMapboxStore({ home, container: 'map' })

onMounted(async () => {
  if (pb.authStore.token && user.value && user.value.disclaimerAgreed) {
    initMapbox()
    refresh()
  }
})

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
  location.reload()
}

async function agree() {
  await updateDisclaimerAgreement()
  location.reload()
  await initMapbox()
}
</script>

<template>
  <div v-if="!user" class="login">
    <LoginForm>
      <input v-model="username" class="login-input" placeholder="enter username">
      <input v-model="password" class="login-input" type="password" placeholder="enter password">
      <button class="login-button" @click="loginInUser()">
        Login
      </button>
    </LoginForm>
  </div>
  <div v-if="user && !user.disclaimerAgreed" class="login">
    <LoginForm>
      <Disclaimer />
      <button class="login-button" @click="agree">
        I understand
      </button>
    </LoginForm>
  </div>
  <div v-if="user && user.disclaimerAgreed">
    <div
      id="map"
    />
    <Transition name="slide">
      <SettingsMenu v-if="settingsMenu" @close="closeSettingsMenu" />
    </Transition>
    <ServerHealth />
    <SideMenu
      :open-settings="openSettingsMenu"
    />
    <Transition name="slide">
      <AddMarker :hidden="markerUIHidden" @hide="hideAddMarker" />
    </Transition>
    <Transition name="slide">
      <ItemDetails />
    </Transition>
  </div>
</template>

<style>
.mapboxgl-ctrl-group {
  position: fixed;
  top: 35px;
  left: 11px;
}
</style>

<style scoped lang="scss">
#map {
  height: 100vh;
  width: 100%;
}

.login {
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: #24f03f33;
  backdrop-filter: blur(20px);
  position: absolute;
  top: 0;
  left: 0;
}

.login-input {
    height: 50px;
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

.slide-enter-active {
  transition: all 0.2s ease-out;
}

.slide-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}
</style>
